# Vue3 rfcs导读

为了对即将到来的vue3有个全面的认识，通读[Vue3 rfcs](https://github.com/vuejs/rfcs)（意见修改稿）是有必要的。但原版英文内容比较长，通读时间比较耗时。这里笔者根据原文内容总结输出，方便大家对Vue3细节改动有个全局的认识。更多详细设计请在每个章节链接进去查看。

## 1. [componsition api](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)

核心变动，增加`setup选项`，更多动机和设计看[官方教程](https://vue-composition-api-rfc.netlify.app/)

``` js
// 基础示例
<template>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
```

## 2. slot统一

1. 模板上slot和slot-scope统一为`v-slot`
1. 模板上支持`v-slot`简写为`#`
1. this.$slots和this.$scopedSlots`统一为this.$slots`，并且暴露为funciton函数。（ps：集合了this.$slots和this.$scopedSlots各自特点）

相关rfcs：
1. https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md
1. https://github.com/vuejs/rfcs/blob/master/active-rfcs/0002-slot-syntax-shorthand.md
1. https://github.com/vuejs/rfcs/blob/master/active-rfcs/0006-slots-unification.md

## 3. [动态指令参数](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0003-dynamic-directive-arguments.md)

指令参数支持动态设置

``` html
<div v-bind:[key]="value"></div>
<div v-on:[event]="handler"></div>
```

## 4. v-model变动

1. v-model支持参数: 使用`v-model:arg`语法 代替`:arg.sync`
1. 不带参数的v-model，默认事件名为`update:modelValue`，而不是以前的事件名：input。（ps：主要还是统一上一条变动）

相关rfcs:
1. https://github.com/vuejs/rfcs/blob/master/active-rfcs/0005-replace-v-bind-sync-with-v-model-argument.md
1. https://github.com/vuejs/rfcs/blob/master/active-rfcs/0011-v-model-api-change.md

``` html
<!--模版里不再有.sync语法-->
<MyComponent v-model:title="title" />
```

## 5. [functional api去除](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0007-functional-async-api-change.md)

关键点：
1. 不再需要有functional选项api
2. `函数式组件不再是对象，而变成类React函数式`
3. 入参有变化

``` js
// 基本展示
import { h } from 'vue'

const FunctionalComp = (props, { slots, attrs, emit }) => {
  return h('div', `Hello! ${props.name}`)
}
```

## 6. [全局api tree shaking](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0004-global-api-treeshaking.md)

所有挂载在Vue对象的方法，都单独出去了，比如Vue.nextTick、Vue.observable

## 7. [render api修改](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0008-render-function-api-change.md)

关键点：
1. `h函数全局导入`
1. `h函数参数统一`，不管是有状态的组件还是函数式组件
1. `VNodes数据结构优化展平`（ps：非常实用的改动，写jsx简单了）

``` js
// 全局导入 `h`函数
import { h } from 'vue'

export default {
  render() {
    return h(
      'div',
      // // vnode数据结构更直观
      {
        id: 'app',
        onClick() {
          console.log('hello')
        }
      },
      [
        h('span', 'child')
      ]
    )
  }
}
```

## 8. [增加createApp api](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0009-global-api-change.md)

创建app实例，而不是像以前共享同一个Vue实例

``` js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.isCustomElement = tag => tag.startsWith('app-')
app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.config.globalProperties.customProperty = () => {}

app.mount(App, '#app')
```

## 9. [自定义指令api变更](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0012-custom-directive-api-change.md)

自定义指令跟vue hook命名一致

``` js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```

## 10. [废弃keycode修饰符](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0014-drop-keycode-support.md)

因为[KeyboardEvent.keyCode](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode)已经被废弃，故在vue3中移除

## 11. [移除filter api](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0015-remove-filters.md)

使用`方法或computed`代替filter

``` html
<!-- before -->
{{ msg | format }}

<!-- after -->
{{ format(msg) }}
```

## 12. [组件过渡类名重命名](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0018-transition-class-change.md)

from/to名称对称，更好理解

1. v-enter 重命名为 `v-enter-from`
1. v-leave 重命名为 `v-leave-from`

``` css
.v-enter-from, .v-leave-to {
  opacity: 0;
}
.v-enter-active {
  opacity: 0.5;
}
.v-leave-from, .v-enter-to {
  opacity: 1
}
.v-leave-active {
  opacity: 0.5;
}
```

> 对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 \<transition>，则 v- 是这些类名的默认前缀。如果你使用了 \<transition name="my-transition">，那么 v-enter-from 会替换为 my-transition-enter-from

## 13. [响应式data api只支持function方式](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0019-remove-data-object-declaration.md)

以前2.x响应式data定义，支持object和function方式（当然大部分人约定俗成的都使用function方式），在vue3中强制data只能用function。

因为如果使用object定义data时，当有多个组件实例共用同一个引用类型data，容易造成错乱。

``` js
import { createApp, h } from 'vue'

createApp().mount({
  data() { // data一定是个函数
    return {
      counter: 1,
    }
  },
  render() {
    return [
      h('span', this.counter),
      h('button', {
        onClick: () => { this.counter++ }
      }),
    ]
  },
}, '#app')
```

## 14. [移除$on, $off, $once](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0020-events-api-change.md)

Vue3不再提供事件发布接口，如果有发布事件需要，可以使用[mitt](https://github.com/developit/mitt)库代替

## 15. [嵌套路由meta自动合并](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0022-router-merge-meta-routelocation.md)

以前处理页面权限时，常使用meta作为配置方案，当匹配到单个页面时，判断to.meta.requiresAuth即可。但在嵌套路由页面时，子路由页面一般没有再设置requiresAuth，所以在Vue2.x中只能通过`to.matched`获得匹配数组再逻辑判断。

Vue3提供了嵌套路由meta的自动合并，使得逻辑判断更加简单。注意这里的合并是Object.assign浅拷贝。

加入给定嵌套路由如下：
``` js
{
  path: '/parent',
  meta: { requiresAuth: true, isChild: false },
  children: [
    { path: 'child', meta: { isChild: true }}
  ]
}
```

导航到/parent/child时，to.meta属性变为：
``` js
{ requiresAuth: true, isChild: true }
```

## 16. [css中scope变更](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)

使用`::v-deep()`代替Vue2.x中的 `>>>` 和 `/deep/`

``` css
<style scoped>
/* deep selectors */
::v-deep(.foo) {}

/* targeting slot content */
::v-slotted(.foo) {}

/* one-off global rule */
::v-global(.foo) {}
</style>
```

## 17. [falsy属性转换策略](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0024-attribute-coercion-behavior.md)

在Vue2.x template模板中，属性为“falsy”值（undefined，null，false）时，会被“removeAttribute”，源码可看[这里](https://github.com/vuejs/vue/blob/bad3c326a3f8b8e0d3bcf07917dc0adf97c32351/src/platforms/web/runtime/modules/attrs.js#L66-L77)。

在Vue3中，`“falsy”中去掉了false`。当为false时，会作为attribute=false，当为undefined或null，跟2.x一致会removeAttribute。

## 18. [异步组件api](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0026-async-component-api.md)

新语法`defineAsyncComponent`支持

``` js
import { defineAsyncComponent } from "vue"

// simple usage
const AsyncFoo = defineAsyncComponent(() => import("./Foo.vue"))

// with options
const AsyncFooWithOptions = defineAsyncComponent({
  loader: () => import("./Foo.vue"),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
```

## 19. [移除内联模板api](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0016-remove-inline-templates.md)


冷门的api，这个api可以看Vue官方[内联模板使用说明](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E5%86%85%E8%81%94%E6%A8%A1%E6%9D%BF)

## 20. [emit事件数据校验](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0030-emits-option.md)

增加新的 `emits` 选项api，可以对emit触发的事件数据，进行校验

``` js
const Comp = {
  emits: {
    submit: payload => {
      // validate payload by returning a boolean
    }
  },

  created() {
    this.$emit('submit', {
      /* payload */
    })
  }
}
```

## 21. [Vue Test Utils提升异步流](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0032-vtu-improve-async-workflow.md)

Vue单元测试时，允许使用`await`语法触发re-render

``` js
const wrapper = mount(Component)
await wrapper.find('.element').trigger('click')
// 不再需要如下，在下一个事件循环中拿到dom值
//  await wrapper.vm.$nextTick()
expect(wrapper.find('.finish').attributes('disabled')).toBeFalsy()
```

## 22. router路由改动

* `路由新增router.push返回Promise值`，router.afterEach、router.onError也返回Promise值
* 更方便的`动态增、删、查`路由信息，对应api：router.addRoute、router.removeRoute、router.hasRoute、router.getRoutes

相关rfcs：
* https://github.com/vuejs/rfcs/blob/master/active-rfcs/0033-router-navigation-failures.md
* https://github.com/vuejs/rfcs/blob/master/active-rfcs/0029-router-dynamic-routing.md
