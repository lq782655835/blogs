# Vue Dialog弹窗解决方案

在做业务代码的modal弹窗时，总是围绕visible变量以及控制visible变量逻辑，能否简化弹窗相关逻辑呢？

如果想直接使用该解决方案，可以安装对应npm包，详细说明文档请在github中查看：[@springleo/el-dialog-helper](https://github.com/lq782655835/el-dialog-helper)

该方案配合ElementUI或AntdV等组件库的modal组件更佳。

## 背景

在业务中，如下代码一定不会陌生：

``` js
<template>
    <div>
        your page logic
        <Dialog1
            :visible="dialogVisible1"
            :id="id" :name="name" ...
            @close="() => dialogVisible1 = false" />
        <Dialog1
            :visible="dialogVisible1"
            :id="id" :name="name" ...
            @close="() => dialogVisible1 = false" />
        <Dialog1
            :visible="dialogVisible1"
            :id="id" :name="name" ...
            @close="() => dialogVisible1 = false" />
        ...
    </div>
</template>

<script>
import Dialog1 from './dialog1'
import Dialog2 from './dialog2'
import Dialog3 from './dialog3'

export default {
    components: { Dialog1, Dialog2, Dialog3, ... }
    data() {
        return {
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible3: false,
            ...
        }
    },
    methods: {
        openDialog1() { this.dialogVisible1 = true },
        openDialog2() { this.dialogVisible2 = true },
        openDialog3() { this.dialogVisible3 = true },
        ...
    }
}
</script>
```

它存在的问题在于：

1. Dialog弹窗过多时，visible变量也相应增加
1. 每个Dialog在组件中都需要注册并相应的初始化，繁琐并增加页面组件初始化时间
1. visible变量控制繁琐

有没有更好的方式呢？

## 好的方案

作为参照，我们可以很快联想到各个组件库的$confirm实现ConfirmDialog的实现。

它们主要实现方式一致，主要体现在API不同：

如使用Promise方式的`ElementUI $confirm API`：

``` js
this.$confirm(props)
    .then(() => {})
    .catch(() => {})
```

另外一种是使用回调函数的方式，如`Antdv $confirm API`

``` js
this.$confirm({
    ...props,
    onOk: () => {},
    onCancel: () => {},
})
```

但ConfirmDialog是有固定的业务组件，而我们定义的Dialog是无法确定的，有没有办法让`自定义Dialog拥有Promise API的调用方式`?

## 目标

从个人业务实践角度讲，较好的目标API是`使用js API调用弹窗 + Promise API进行控制回调`。如下：

``` js
import Dialog1 from 'dialog1'

this.$openDialog(Dialog1)(props)
    .then(data => {})
    .catch(err => {})
```

$confirm是因为有固定流程以及样式的ConfirmDialog组件，所以实现起来较为明确而简单，底层源码里也是直接引入[ConfirmDialog](https://github.com/vueComponent/ant-design-vue/blob/master/components/modal/confirm.js)组件，在这之上再进行包装。

但我们这里需要做通用的Dialog弹窗方式，该如何实现呢？

## 实现机制

要实现上述API的Dialog弹窗解决方案，需要做到2步： 1. dialog组件自动挂载到页面 2. API设计Promise化

### 1. dialog组件自动挂载到页面

通过vue源码我们知道，一个.vue文件，其实就是个Object对象（tempalte模板会被编译为对象的render函数）。同时也知道Vue Option API是通过new Vue({ Option API })方式转换为组件实例的。

此时我们这里如何把Object对象转换为Vue组件呢？Vue官方提供了[Vue.extend](https://cn.vuejs.org/v2/api/#Vue-extend)这个API来返回Vue构造器。有了该构造函数，只需要实例化即可把Object Vue对象转为真正的具有上下文关系的Vue组件。同时执行`$mount()`方法即可挂载到指定节点上，并在UI上更新。

``` js
const $openDialog = (component, propsData) => {
    const ComponentConstructor = Vue.extend(component);
    let instance = new ComponentConstructor({
      propsData,
    }).$mount(document.body);
    return instance
}
```

### 2. API设计Promise化

以上只是考虑了通过js api方式，手动添加Dialog，还需要考虑当用户关闭弹窗时，如何正常销毁Dialog。同时考虑到现实业务中，弹窗关闭通常都由弹窗内逻辑控制，所以需要设计相关API，把弹窗内逻辑和当前页逻辑进行解耦。

销毁Dialog的DOM，必然需要找到包裹的parent DOM，所以需要使用闭包来保存parent DOM。

Vue2.x组件实例本身也是一个发布订阅系统，其支持通过`$emit`和`$once`方式进行事件发布和订阅。所以当Dialog弹窗内完成业务时，只需要发布关闭事件即可，完全的业务方自主可控。同时为了业务方使用简化，API设计为Promise，使用.then/.catch来代替弹窗业务成功/失败。

``` js
const $openDialog = (component) => {
  // 闭包存储
  const div = document.createElement('div');
  const el = document.createElement('div');
  div.appendChild(el);
  document.body.appendChild(div);

  const ComponentConstructor = Vue.extend(component);
  return (propsData = {}, parent = undefined) => {
    // 手动弹窗
    let instance = new ComponentConstructor({
      propsData,
      parent, // 父级上下文，设置了此参数可获得$store/$router等Provide对象
    }).$mount(el);

    // 关闭弹窗
    const destroyDialog = () => {
      if (instance && div.parentNode) {
        instance.$destroy();
        instance = null
        div.parentNode && div.parentNode.removeChild(div);
      }
    };

    // 使用.then/.catch来代替弹窗业务成功/失败
    return new Promise((resolve, reject) => {
      instance.$once("done", data => {
        destroyDialog();
        resolve(data);
      });
      instance.$once("cancel", data => {
        destroyDialog();
        reject(data);
      });
    });
  }
}
```

另外方案中还考虑了antdv/element-ui modal的便捷性，增加了visible控制，最终的解决方案源码可以看 [lq782655835/el-dialog-helper](https://github.com/lq782655835/el-dialog-helper)
