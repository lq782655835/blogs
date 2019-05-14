# Vue2.x源码分析 - 组件系统

组件系统是Vue整个框架中非常重要的一环，涉及的内容也比较多。这里笔者还是老样子，梳理组件系统的主流程，了解Vue当中的组件系统是如何运转的。

### 组件编译阶段

在[模版编译以及挂载](./vue-code-1.how-to-mount-vue.md)中我们知道，最终的模板都会解析编译成render函数。如果你是手动写render函数时，你一定少不了使用createElement函数。createElement函数，对应render中的参数h，用来手动创建VNode（最终都是形成VNode，然后再前后两个VNode进行diff对比并更新DOM）。举个应用案例：

``` js
import Vue from 'vue'
import App from './App.vue'

// 带有el参数会最终执行render渲染。src/core/instance/render.js
var app = new Vue({
  el: '#app',
  // 这里的 h 是 createElement方法
  // App是对应的组件
  render: h => h(App)法
})
```

#### createElement做了什么

* `tag 做判断，如果是 string 类型。`src/core/vdom/create-element.js
    * 如果是内置的一些节点，则直接创建一个普通 VNode
    * 如果是为已注册的组件名，找到组件定义，然后通过 createComponent 创建一个组件类型的 VNode
* `如果是非 string 类型`，createComponent同上。
    * createComponent做了什么 'src/core/vdom/create-component.js'
        1. 构造子类构造函数
        ``` js
        if (isObject(Ctor)) {
            Ctor = Vue.extend(Ctor)
        }
        ```
        ``` js
        // Vue.extend 的作用就是构造一个 Vue 的子类
        // 把一个纯对象转换一个继承于 Vue 的构造器 Sub 并返回
        Vue.extend = function (extendOptions: Object): Function {
            const Super = this // this === Vue
            const Sub = function VueComponent (options) {
                this._init(options)
            }
            Sub.prototype = Object.create(Super.prototype)
            Sub.prototype.constructor = Sub
            Sub.cid = cid++
            Sub.options = mergeOptions(
                Super.options,
                extendOptions
            )
            Sub['super'] = Super
        }
        ```
        2. 安装组件钩子函数
        ``` js
        // 往 data.hook中注入钩子函数，在vnode patch阶段会调用
        installComponentHooks(data)
        ```
        3. 实例化VNode(最终都是生成VNode，VNode数据结构本质是颗树)
        ``` js
        const name = Ctor.options.name || tag
        const vnode = new VNode(
        `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
        data, undefined, undefined, undefined, context,
        { Ctor, propsData, listeners, tag, children },
        asyncFactory
        )
        return vnode
        ```

以上可以知道，在编译阶段遇到是组件时，最终也是编译成VNode节点，只不过它会额外做一些处理，比如拿到组件子类Ctor、传递propsData、设置listeners等，并把这些内容作为参数，传入进 `VNode.componentOptions`,等待patch阶段生成真正的DOM组件。

### 组件patch阶段

1. patch阶段会把VNode 转换成真正的 DOM 节点。patch 的过程会调用 `createElm` 创建元素节点。'src/core/vdom/patch.js'
    * `createComponent()`
        * `vnode.data.hook.init()` 'src/core/vdom/create-component.js'
            1. child = `createComponentInstanceForVnode()`。实例化组件new subVue(),因为组件也是一个Vue对象。
                * new Vue()会去执行`this._init()` 'src/core/instance/init.js'
            2. `child.$mount()`
                * 调用`mountComponent`--> `vm._render()` --> `vm._update()`
``` js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    if (isDef(i = i.hook) && isDef(i = i.init)) {
        // 执行vnode.data.hook.init
        // 组件最终执行了new Vue().$mount()，使得赋值好vnode.elm
        // 如果组件里还有子组件（options.components），最终都会走createEle创建节点，然后子组件又new Vue().$mount(),会深度递归下去。
      i(vnode, false /* hydrating */)
    }

    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      // 真正插入DOM,因为已经有组件的vnode.elm了
      insert(parentElm, vnode.elm, refElm)
      return true
    }
  }
}
```

## 生命周期

``` js
// 调用钩子，即找到vm.$options[hook]执行
export function callHook (vm: Component, hook: string) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
        handlers[i].call(vm)
    }
  }
  // 案例：https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8
  if (vm._hasHookEvent) { // Vue.prototype.$on：vm._hasHookEvent = /^hook:/.test(event)
    vm.$emit('hook:' + hook)
  }
}
```

* beforeCreate
    * beforeCreate 的钩子函数中不能获取到 props、data 中定义的值，也不能调用 methods 中定义的函数。
    * beforeCreate 和 created 函数都是在实例化 Vue 的阶段，在 _init 方法中执行的，它的定义在 src/core/instance/init.js 中
* created
    * 能获得props、data值，但不能操作dom
``` js
```
* beforeMount
    * DOM 挂载之前，它的调用时机是在 mountComponent 函数中，定义在 src/core/instance/lifecycle.js 中
* mounted
    * 把 VNode patch 到真实 DOM 后
* beforeUpdate
    * beforeUpdate 的执行时机是在渲染 Watcher 的 before 函数中
* update
    * update 的执行时机是在flushSchedulerQueue 函数调用的时候, 它的定义在 src/core/observer/scheduler.js 中
* beforeDestroy & destroyed
    * beforeDestroy 和 destroyed 钩子函数的执行时机在组件销毁的阶段，调用 $destroy 方法，它的定义在 src/core/instance/lifecycle.js 中。
* activated & deactivated
    * activated 和 deactivated 钩子函数是专门为 keep-alive 组件定制的钩子

![](https://cn.vuejs.org/images/lifecycle.png)

## 注册组件

* 全局注册API
    * Vue.component
    * Vue.directive
    * Vue.filter
* 过程
    * `component`：使用Vue.extend拿到Vue子类，挂载到 Vue.options.components上。当有组件注册后，即可根据注册的名字，找到组件定义（组件可理解为一个Object对象）。
    * `directive/filter`，挂载到Vue.options.directives/filters上
* 总结
    * `注册组件，重点是把 components 合并到 vm.$options.components 上`，这样我们就可以在 resolveAsset 的时候拿到这个组件的构造函数，方便后续创建。
    * 局部注册和全局注册不同的是，只有该类型的组件才可以访问局部注册的子组件，而全局注册是扩展到 Vue.options 下，所以在所有组件创建的过程中，都会从全局的 Vue.options.components 扩展到当前组件的 vm.$options.components 下，这就是全局注册的组件能被任意使用的原因。

``` js
// src/core/global-api/assets.js
import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // component处理，使用Vue.extend扩展，使得继承Vue类
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }

        // directive处理，如果是function，绑定为对象
        // 官方API：https://cn.vuejs.org/v2/guide/custom-directive.html
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 资源型的componet、directive、filter都是挂载到vm.options上
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
```
