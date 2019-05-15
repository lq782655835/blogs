

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

每一次defineReactive，即设置key/value时，都会有个Dep收集Watcher
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
        dep.depend() // Watcher收集Dep
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


// Dep.target统一管理地方
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
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  computed: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  dep: Dep;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

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
    let value = this.getter.call(vm, vm)
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

![image](https://user-images.githubusercontent.com/6310131/57763364-cf82bd00-7733-11e9-9141-6da5938c85d1.png)
