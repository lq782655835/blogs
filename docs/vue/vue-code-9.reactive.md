# Vue2.x源码分析 - 响应式原理

之前new Vue(options).$mount(el)主要讲述的是，初始化时模板解析并通过虚拟DOM，把`数据渲染`成真实DOM。但这过程中还做了一部分，就是监听数据变化，DOM数据也更新（一般是`用户交互`引起数据变化）。以下看看Vue是如何实现数据的变更触发 DOM 的变化。

``` js
// src/core/instance/state.js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods) // method代理到vm 实例上
  // 注意顺序，data/computed中可以访问props和method
  if (opts.data) initData(vm)
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

### Props

``` js
// 响应式props, 并把 props的属性代理到 vm 实例上
// 1. 响应式props数据,会赋值this._props.key
// 2. 代理：使得this.key === this._props.key
// 所以在API层赋值this.key，其实是执行了this._props.key的set方法
function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  for (const key in propsOptions) {
    // 核心函数
    defineReactive(props, key, value) // 会对vm._props设置响应式key/value
    if (!(key in vm)) {
      proxy(vm, `_props`, key) // 代理，使得this.key === this._props.key
    }
  }
}
```

``` js
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition) // target.key = {get, set}
}

if (!(key in vm)) {
    proxy(vm, `_props`, key) // 使得this.key === this._props.key
}
```

### data
``` js
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}

  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    proxy(vm, `_data`, key) // 使得this.key === this._data.key
  }
  // 监听整个data
  // data数据改动最为频繁，而且data可能会有很深的{}层次
  observe(data, true /* asRootData */)
}
```

``` js
export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) return
  let ob: Observer | void = new Observer(value)
  return ob
}
```

``` js
export class Observer {
  value: any;
  dep: Dep;

  constructor (value: any) {
    this.value = value
    this.dep = new Dep() // 收集依赖的容器Dep
    if (Array.isArray(value)) {
      this.observeArray(value) // 数组，则递归observe，最终会都执行walk函数
    } else {
      this.walk(value) // 对象，设置响应式（最关键）
    }
  }

  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]) // 核心函数
    }
  }

  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```

## 依赖收集

典型的[订阅者模式](../js/js-design-pattern.md)，它定义一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。Dep就是主题对象（数组形式），收集并管理着Watcher对象。

每一次defineReactive，即设置key/value时，都会有个Dep收集Watcher。
``` js
// defineReactive 的功能就是定义一个响应式对象，给对象动态添加 getter 和 setter，在getter中收集Watcher，在setter执行Watcher逻辑（getter、setter执行时间很巧妙）。
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 每一个key/value，都会创建一个Dep用来管理Watch队列
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  // 对子对象递归调用 observe 方法。
  // 这样就保证了无论 obj 的结构多复杂，它的所有子属性也能变成响应式的对象，这样我们访问或修改 obj 中一个嵌套较深的属性，也能触发 getter 和 setter。
  let childOb = !shallow && observe(val) // 如果时复杂数据，递归调用defineReactive

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // get方法调用时间：$mount()执行时，模板编译会访问类似this.xxx，从而触发getter方法
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      // 非常巧妙的设计，在此收集Watch依赖（Dep.target = Watcher）
      // 在new Watcher()的构造中，会设置Dep.target = this。./watcher.js
      if (Dep.target) {
        dep.depend() // Watcher收集Dep,同时Dep收集当前Watcher
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 对设置的新值，重新监听（设置闭环）
      childOb = !shallow && observe(newVal)
      dep.notify() // 收集的Watcher开始处理逻辑
    }
  })
}
```


``` js
export default class Dep {
  static target: ?Watcher;
  subs: Array<Watcher>;

  constructor () {
    this.subs = []
  }

  // Dep收集Watcher
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this) // Watcher也收集着Dep
    }
  }

  notify () {
    const subs = this.subs.slice() // subs = watchers
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}


// Dep.target设置，同一时间（同步代码），Dep.target只有一个
Dep.target = null
const targetStack = []
export function pushTarget (_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}
export function popTarget () {
  Dep.target = targetStack.pop()
}
```

``` js
export default class Watcher {
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    vm._watchers.push(this)

    if (this.computed) {
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get() // 等于new Watcher(),会设置Dep.target
    }
  }

  get () {
    pushTarget(this) // 设置Dep.target
    const vm = this.vm
    let value = this.getter.call(vm, vm) // 如：getter等于updateComponent
    popTarget()
    return value
  }

  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this) // dep增加Watcher
      }
    }
  }

  depend () {
    if (this.dep && Dep.target) {
      this.dep.depend()
    }
  }
```

``` js
// 消费Watcher（在 mount 过程中）
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
new Watcher(vm, updateComponent)
```

#### 总结

1. 在`new Vue()`时，init会数据监听，会把data/props数据递归放在`Object.defineProperty`中代理，同时依赖收集Watcher，为响应式打基础。
2. 在`app.$mount(el)`时,会执行`new Watcher()`，Watcher构造函数中：
    1. 会去执行updateComponent,即先vm_render()拿到VNode，vm._update()虚拟DOM对比，并更新到真实DOM。`vm_render()又会解析模板，模板中又会使用到data/props（this.key会触发data.key的getter函数）`。此时会使用到第一步的数据监听部分（终于把两者串联了），因为Object.defineProperty作用就是在拿到data.key的同时，还能做一些额外的逻辑（通过getter/setter）。
        * getter中做依赖收集。具体是每个data.key都有个Dep对象，在getter函数中，把当前Watcher（Dep.target）增加到Dep对象（谁叫你模板用到了data.key呢）。
    2. `会把当前Watcher作为Dep.target`。
3. 当`数据变化`时，触发data.key的setter方法，收集的Watcher执行回调。
    * `watcher队列概念`。派发更新的时候，并不会每次数据改变都触发 watcher 的回调，而是在[nextTick](./vue-code.6.nextTick.md)后执行。
    * `watcher队列执行有规则`。1. 先把父组件排在子组件前（根据id），因为父组件创建过程要先于子组件。2. 用户自定义watcher优先于渲染watcher。

![image](https://user-images.githubusercontent.com/6310131/57763364-cf82bd00-7733-11e9-9141-6da5938c85d1.png)

![](https://ustbhuangyi.github.io/vue-analysis/assets/reactive.png)