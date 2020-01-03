# Vue 手写render

## Vue实例

* 属性
    * vm.$el/vm.$refs
    * vm.$options/m.$parent/vm.$root
    * vm.$children
    * vm.$slots
    * vm.$attrs/vm.$listeners
* 方法
    * vm.$once( event, callback )
    * vm.$watch( expOrFn, callback, [options] )
    * vm.$nextTick( [callback] )
* 生命周期
    * vm.$forceUpdate
    * vm.$destroy()

    * vm.$mount( [elementOrSelector] )/Vue.extend
    ``` js
    var MyComponent = Vue.extend({
    template: '<div>Hello!</div>'
    })

    // 创建并挂载到 #app (会替换 #app)
    new MyComponent().$mount('#app')

    // 同上
    new MyComponent({ el: '#app' })

    // 或者，在文档之外渲染并且随后挂载
    var component = new MyComponent().$mount()
    document.getElementById('app').appendChild(component.$el)
    ```

## render

* this.$slots.default
* this.[props]
* `createElement(type，[data], children)`
    * second params - data
        * props: {}
        * on: { click: handler }
        * scopedSlots: { default: props => createElement('span', props.text) }
    * children
        * this.$slot.default
``` js
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

## functional

Vue.js 组件提供了一个 functional  开关，设置为 true 后，就可以让组件变为无状态、无实例的函数化组件。因为只是函数，所以渲染的开销相对来说，较小。

函数化的组件中的 Render 函数，提供了第二个参数 context 作为上下文，data、props、slots、children 以及 parent 都可以通过 context 来访问。

> 将组件标记为 functional，这意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。

组件需要的一切都是通过 `context` 参数传递，它是一个包括如下字段的对象：

* `props`：提供所有 prop 的对象
* `children`: VNode 子节点的数组
* `slots`: `一个函数`，返回了包含所有插槽的对象
* `scopedSlots`: (2.6.0+) 一个暴露传入的作用域插槽的`对象`。也以函数形式暴露普通插槽。
* `data`：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
    * attr
    * staticClass
    * on...
    * props
* `listeners`: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
* parent：对父组件的引用
* injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。

在添加 functional: true 之后，需要更新我们的锚点标题组件的渲染函数，为其增加 context 参数，并将 this.$slots.default 更新为 context.children，然后将 this.level 更新为 context.props.level。

``` html
<template functional>
  <div
    v-bind="data.attrs"
    v-on="listeners"
    :class="[data.staticClass, 'el-divider', `el-divider--${props.direction}`]"
  >
    <div
      v-if="slots().default && props.direction !== 'vertical'"
      :class="['el-divider__text', `is-${props.contentPosition}`]"
     >
      <slot />
    </div>
  </div>
</template>
```

``` js
Vue.component('my-functional-button', {
  functional: true,
  render: function (createElement, context) {
    // 完全透传任何特性、事件监听器、子节点等。
    return createElement('button', context.data, context.children)
  }
})
```

## VNode

* Vue组件获得VNode
    * this.$slots.default // 子节点数组
* VNode
    * componentOptions
        * tag


``` js
computed: {
      isVertical() {
        if (this.direction === 'vertical') {
          return true;
        } else if (this.direction === 'horizontal') {
          return false;
        }
        return this.$slots && this.$slots.default
          ? this.$slots.default.some(vnode => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === 'el-header' || tag === 'el-footer';
          })
          : false;
      }
    }
```
