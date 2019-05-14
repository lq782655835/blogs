# Vue2.x源码分析 - inject/provide

Vue组件传递数据方式
* `prop`
* `$parent`
* **`inject/provide`** 本质还是通过$parent向上查找祖先节点数据

``` js
// src/core/instance/init.js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    ...
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

``` js
// inject里的key，通过$parent向上找到provide值，再进行响应式监听
export function initInjections (vm: Component) {
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    Object.keys(result).forEach(key => {
        defineReactive(vm, key, result[key]) // 响应式数据
    })
  }
}

export function resolveInject (inject: any, vm: Component): ?Object {
  if (inject) {
    const result = Object.create(null)
    const keys = Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const provideKey = inject[key].from
      let source = vm
      // 循环向上，直到拿到祖先节点中的provide值
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey] // provide是在initProvide中设置的
          break
        }
        source = source.$parent // 关键代码
      }
    }
    return result
  }
}
```

``` js
// 单纯把provide值，赋值给vm._provided。initInject中会使用到
export function initProvide (vm: Component) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}
```