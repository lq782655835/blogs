Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。

* 虚拟DOM

## createElement函数

createElement函数，对应render中的参数h，用来手动创建VNode（最终都是形成VNode，然后再前后两个VNode进行diff对比并更新DOM）。举个应用层例子：

``` js
import Vue from 'vue'
import App from './App.vue'

// 带有el参数会最终执行render渲染。src/core/instance/render.js
var app = new Vue({
  el: '#app',
  render: h => h(App) // 这里的 h 是 createElement 方法
})
```

createElement做了什么
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

## 生命周期

* beforeCreate
    * beforeCreate 的钩子函数中不能获取到 props、data 中定义的值，也不能调用 methods 中定义的函数。
    * beforeCreate 和 created 函数都是在实例化 Vue 的阶段，在 _init 方法中执行的，它的定义在 src/core/instance/init.js 中
* created
    * 能获得props、data值，但不能操作dom
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
    * component：使用Vue.extend拿到Vue子类，挂载到 Vue.options.components上。当有组件注册后，即可根据注册的名字，找到组件定义（组件可理解为一个Object对象）。
    * directive/filter，挂载到Vue.options.directives/filters上
* 总结
    * 注册组件，重点是把 components 合并到 vm.$options.components 上，这样我们就可以在 resolveAsset 的时候拿到这个组件的构造函数，方便后续创建。
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
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
```

![](https://ustbhuangyi.github.io/vue-analysis/assets/lifecycle.png)



## 全局组件/指令
* 全局组件 platforms/web/runtime/components
    * transition-group
    * transition
* 全局指令 platforms/web/runtime/directives
    * v-model
    * v-show


![](https://user-gold-cdn.xitu.io/2018/8/30/16586a0d1261a7b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
