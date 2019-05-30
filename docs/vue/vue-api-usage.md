# Vue高级用法

总结Vue的高级用法，其中绝大部分也应用在[yi-ui](https://github.com/lq782655835/yi-ui)组件库中。

## [v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

``` html
<input v-model="searchText">

<!-- 等价于：-->
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

## [Vue.extend](https://cn.vuejs.org/v2/api/index.html#Vue-extend)

使用基础 Vue 构造器，创建一个“子类”。简单说，就是基于一个Object可返回Vue的子类，可实例化后进行挂载。

``` js
Modal.alert = content =>
    new Promise(resolve => {
        const Ctor = Vue.component('UModal')
        if (!Ctor) return

        let instance = new Ctor({
            propsData: { content, type: ModalType.ALERT, showClose: false, cancelButton: '' }
        })
        instance.$on('ok', () => resolve())
        instance.open()
    })

// 实例open
open() {
    if (!this.$el) this.$mount(document.createElement('div'))
}
```

## [provide/inject](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)

provide 和 inject 主要为高阶插件/组件库提供用例。与 React 的上下文特性很相似。实现原理：[Vue2.x源码分析 - inject/provide](./vue-code-7.inject-provide.md)

``` js
export default {
    name: 'u-form',
    props: {
        title: String,
        labelWidth: String,
        contentWidth: String,
        okButton: { type: String, default: '确定' },
        cancelButton: { type: String, default: '取消' }
    },
    provide() {
        return {
            uForm: this
        }
    }
}
```

``` js
export default {
    name: 'u-form-item',
    props: {
        label: String,
        error: String,
        required: Boolean,
        tip: String
    },
    data() {
        return {
            leftSty: {},
            rightSty: {}
        }
    },
    inject: ['uForm'],
    created() {
        this.uForm.labelWidth && (this.leftSty.width = this.uForm.labelWidth)
        this.uForm.contentWidth && (this.rightSty.width = this.uForm.contentWidth)
    }
}
```

## [vm.$nextTick()](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

将回调延迟到下次 DOM 更新循环之后执行。实现原理：[Vue2.x源码分析 - Vue.nextTick](./vue-code-6.nextTick.md)

尽管MVVM框架并不推荐访问DOM，但有时候确实会有这样的需求，尤其是和第三方插件进行配合的时候，免不了要进行DOM操作。而nextTick就提供了一个桥梁，确保我们操作的是更新后的DOM。

``` html
// template
<template>
    <h ref="someElement">{{message}}</h>
</template>

<script>
export default {
    data: () => { message: 'oldValue'}
    methods: {
        example: function () {
        // 修改数据
        this.message = 'changed'
        // DOM 还没有更新。此时如果拿DOM元素的innerHTML，依然会是'oldValue'
        this.$nextTick(function () {
            // DOM 现在更新了，可以拿到最新的DOM元素了
            this.$refs['someElement'].innerHTML // 此时可以拿到最新的innerHTML值：'changed'
        })
        }
    }
}
</script>
```

## [this.$once('hook:beforeDestroy',callback)](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8)

程序化的事件侦听器。实现原理：[Vue2.x源码分析 - 组件系统](https://lq782655835.github.io/blogs/vue/vue-code-5.component.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

``` js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

## 其他

### 组件prop为boolean

如果prop是Boolean值，如果prop有展示但未赋值意味着 `true`。

``` html
<blog-post is-published></blog-post>

<!-- 等价于 -->
<blog-post :is-published="true"></blog-post>
```

### vm.$attrs/vm.$listeners

这两个变量挂载到组件实例this上，避免组件属性逐层透传。

``` html
// base component: u-link.vue
<a v-bind="$attrs"
   v-on="$listeners">
   <slot></slot>
</h>

// high component
<u-link name="123" attr1="123">test</u-link>

// 等价于
<a name="123" attr1="123">
   <slot></slot>
</a>
```

## 待更
### watch deep/immediate

### scss /deep/