# Vuex

## 状态管理模式
状态自管理应用包含以下几个部分：

* `state`，驱动应用的数据源；
* `view`，以声明方式将 state 映射到视图；
* `actions`，响应在 view 上的用户输入导致的状态变化。

以下是一个表示“单向数据流”理念的极简示意：

![](https://ustbhuangyi.github.io/vue-analysis/assets/vuex.png)

## 为什么需要状态库

多个组件共享状态时，单向数据流的简洁性很容易被破坏：
* 多个视图依赖于同一状态。
* 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于`多层嵌套的组件`将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。对于问题二，我们经常会采用父子组件直接引用或者通过事件来`变更和同步状态的多份拷贝`。

所以需要一个`状态库`：执行`单项数据流`同时，还能做到`应用简单`。

## Vuex
Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。

Vuex 和单纯的全局对象有以下两点不同：

* `Vuex 的状态存储是响应式的`。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
* `不能直接改变 store 中的状态`。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

![](https://ustbhuangyi.github.io/vue-analysis/assets/vuex1.png)

### API

``` js
// app.js
import store from './store'
import App from './components/App.vue'
new Vue({
  store, // 设置store对象，使得所有组件都有该store
  el: '#app',
  render: h => h(App)
})
```

``` js
// store.js
export default new Vuex.Store({
  state: {
    todos: []
  },
  actions,
  mutations,
  plugins
})
```

### 源码

``` js
export default function (Vue) {
  Vue.mixin({ beforeCreate: vuexInit })

  function vuexInit () {
    const options = this.$options
    if (options.store) {
      // 插入store
      // 组件中可以通过 this.$store 访问到这个实例。
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
        // 所有子组件都有该store
      this.$store = options.parent.$store
    }
  }
}
```

Vuex的state数据，响应式根源，最终都是使用new Vue({data})进行响应式监听。当有state改动时，最终会触发Vue Watcher，从而更新DOM。
``` js
// 响应式基础
store._vm = new Vue({
    data: {
      $$state: state // Vuex响应式来源于Vue响应式机制
    },
    computed
})

get state () {
    return this._vm._data.$$state
}
```

``` js
// Vuex不能直接修改 $store
function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, () => {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, `do not mutate vuex store state outside mutation handlers.`)
    }
  }, { deep: true, sync: true })
}
```