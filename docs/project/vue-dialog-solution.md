# Vue Dialog弹窗解决方案

在做业务代码的modal弹窗时，总是围绕visible变量以及控制visible变量逻辑，能否简化弹窗相关逻辑呢？

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

* Dialog弹窗过多时，visible变量也相应增加
* 每个Dialog在组件中都需要注册并相应的初始化，繁琐并增加页面组件初始化时间
* visible变量控制繁琐

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

核心使用`Vue.extend()`这个API。

待更新

代码可以见：https://github.com/lq782655835/el-dialog-helper/blob/master/src/components/dialog.js