# Vue3响应式原理 - Ref/Reactive/Effect源码分析

> 目前vue3还没完全稳定下来，许多rfcs都有变化的可能。本文基于目前最新（2019-11-07）fork的 [vue源码](https://github.com/lq782655835/vue-next)进行原理分析。官方提供了在Vue2.x尝试最新Vue3功能的插件库：[Vue Composition API](https://github.com/vuejs/composition-api) （以前该库叫vue-function-api，现在叫composition-api）。

众所周知，Vue3使用**ES6 Proxy**替代ES5 Object.defineProperty实现数据响应式，这也是Vue最为核心的功能之一。Vue3相比Vue2.x，API变化很大，提出了Vue Composition API。但在响应式原理实现方面，源码依然还是**依赖收集 + 执行回调**，只不过api变化后，形式也有点变化。想了解vue 2.x实现方式，可以看下笔者以前写的 [Vue2.x源码分析 - 响应式原理](https://lq782655835.github.io/blogs/vue/vue-code-9.reactive.html)。

## 你必须知道的Vue3 RFCS ChangeLog

如果较少关注vue3征求意见稿[vue rfcs](https://github.com/vuejs/rfcs)，可能大部分人对vue3还停留在Vue Function API。作者尤雨溪专门为这重大改变的API做过详细的叙述，并特意翻译了中文[Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)。目前Vue 官方发布了最新的3.0 API 修改草案，并在充分采纳社区的意见后，**将Vue Function API 更正为 Vue Composition API.**

### 1. 重大变化点

1. state更名为reactive
    * reactive等价于 Vue 2.x 的Vue.observable()
2. value更名为ref，并提供isRef和toRefs
    * 使用ref来创建包装对象进行传递
3. computed可传入get和set，用于定义可更改的计算属性

> Vue官方团队建议在组合函数中都通过返回ref对象。

### 2. 了解Vue Composition API

``` ts
import { reactive, computed, toRefs, effect } from "vue";
export default {
  setup() {
    const event = reactive({
      capacity: 4,
      attending: ["Tim", "Bob", "Joe"],
      spacesLeft: computed(() => { return event.capacity - event.attending.length; })
    });
    effect(() => console.log(event.capacity))
    function increaseCapacity() {
      event.capacity++;
    }
    return { ...toRefs(event), increaseCapacity };
  }
};
```

### 3. 建议阅读资料

* [Vue Composition API pull request](https://github.com/vuejs/rfcs/pull/78)
* [Function-based Component API pull request](https://github.com/vuejs/rfcs/pull/42)
* [Composition API RFC](https://vue-composition-api-rfc.netlify.com/)

## 源码解析

### 1. ref

先从入口ref看起,**ref常用于基本类型，reactive用于引用类型**。如果ref传入对象，其实内部会自动变为reactive：

``` ts
export function ref(raw: unknown) {
  if (isRef(raw)) {
    return raw
  }
  // ref常用于基本类型，reactive用于引用类型。如果ref传入对象，其实内部会自动变为reactive
  raw = convert(raw)
  const r = {
    _isRef: true, // 判断isRef
    // 基本类型无法被追踪，所以使用ref包装为object，使得可以被追踪
    get value() {
      track(r, OperationTypes.GET, '')
      return raw
    },
    set value(newVal) {
      raw = convert(newVal)
      trigger(r, OperationTypes.SET, '')
    }
  }
  return r as Ref
}

const convert = <T extends unknown>(val: T): T =>
  isObject(val) ? reactive(val) : val
```

同时ref支持把reactive转为refs对象 - **toRefs**：

``` ts
export function toRefs<T extends object>(
  object: T
): { [K in keyof T]: Ref<T[K]> } {
  const ret: any = {}
  for (const key in object) { // for in 展开一层
    ret[key] = toProxyRef(object, key)
  }
  return ret
}

function toProxyRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): Ref<T[K]> {
  return {
    _isRef: true,
    get value(): any {
      return object[key]
    },
    set value(newVal) {
      object[key] = newVal
    }
  }
}
```

### 2. reactive

再来看下vue3的响应式reactive源码：

先认识下以下4个全局存储，使用weakmap存储起普通对象和生成的响应式对象，因为很多地方都需要用到判断以及取值。其中rawToReactive和reactiveToRaw是一组，只不过key和value互相对调。

``` ts
// 防止重复设置响应式对象，建立store存起来
// WeakMaps that store {raw <-> observed} pairs.
const rawToReactive = new WeakMap<any, any>() // 原始object对象：封装的响应式对象
const reactiveToRaw = new WeakMap<any, any>() // 封装的响应式对象：原始object对象
// 只读响应式
const rawToReadonly = new WeakMap<any, any>()
const readonlyToRaw = new WeakMap<any, any>()
```

下面是reactive入口，如果传入参数是只读响应式，或者是用户设置的只读类型，返回处理。大部分都会走createReactiveObject方法：
``` ts
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (readonlyToRaw.has(target)) {
    return target
  }
  // target is explicitly marked as readonly by user
  if (readonlyValues.has(target)) {
    return readonly(target)
  }
  // 给普通对象创建响应式对象
  return createReactiveObject(
    target,
    rawToReactive,
    reactiveToRaw,
    mutableHandlers,
    mutableCollectionHandlers
  )
}
```

如下面注释解释，大部分代码都是为了做边界和重复处理。最重要的还是创建proxy对象：
**observed = new Proxy(target, mutableHandlers)**。
``` ts
function createReactiveObject(
  target: unknown, // 原始对象
  toProxy: WeakMap<any, any>, // 全局rawToReactive
  toRaw: WeakMap<any, any>, // 全局reactiveToRaw
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  // 必须是对象
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }

  // 重复的对象引用，最终都返回初始的监听对象，这就是创建全局store的原因之一
  // target already has corresponding Proxy
  let observed = toProxy.get(target)
  if (observed !== void 0) {
    return observed
  }
  // target is already a Proxy
  if (toRaw.has(target)) {
    return target
  }

  // vue对象、vnode对象等不能被创建为响应式
  // only a whitelist of value types can be observed.
  if (!canObserve(target)) {
    return target
  }

  // 真正创建代理Proxy对象并返回
  const handlers = collectionTypes.has(target.constructor)
    ? collectionHandlers // [Set, Map, WeakMap, WeakSet]对象走这个handles
    : baseHandlers // 大部分走baseHandle
  observed = new Proxy(target, handlers)
  // 创建完马上全局缓存
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  if (!targetMap.has(target)) {
    targetMap.set(target, new Map())
  }
  return observed
}
```

所以还是看代理对象mutableHandlers中的处理：

``` ts
export const mutableHandlers: ProxyHandler<object> = {
  get: createGetter(false),
  set,
  deleteProperty,
  has,
  ownKeys
}
```

get、has、deleteProperty、ownKeys代理方法中，都调用了track函数，用来收集依赖，这个下文讲；而set调用了trigger函数，当响应式数据变化时，收集的依赖被执行回调。从原理看，这跟vue2.x是一致的。

看下最常用的get、set。get中除常规边界处理外，最重要是根据代理值的类型，**对object类型进行递归调用reactive**。

``` ts
function createGetter(isReadonly: boolean) {
  return function get(target: object, key: string | symbol, receiver: object) {
     // 获取到代理的值
    const res = Reflect.get(target, key, receiver)
    if (isSymbol(key) && builtInSymbols.has(key)) {
      return res
    }

    // 如果是ref包裹的对象，直接返回解包后的值
    if (isRef(res)) {
      return res.value
    }
    // track是逻辑和视图变化重要的一块
    track(target, OperationTypes.GET, key)
    // 值类型，直接返回值；对象类型，递归响应式reactive(res)
    return isObject(res)
      ? isReadonly
        ? // need to lazy access readonly and reactive here to avoid
          // circular dependency
          readonly(res)
        : reactive(res)
      : res
  }
}
```

set函数里除了代理set方法外，最重要的莫过于当值改变时，**触发trigger方法**，下文详细讲述该函数。

``` ts
function set(
  target: object,
  key: string | symbol,
  value: unknown,
  receiver: object
): boolean {
  value = toRaw(value)
  const oldValue = (target as any)[key]
  if (isRef(oldValue) && !isRef(value)) {
    oldValue.value = value
    return true
  }
  // prxoy
  const hadKey = hasOwn(target, key) // 是否target本来旧有key属性，等价于：key in target
  const result = Reflect.set(target, key, value, receiver)
  // don't trigger if target is something up in the prototype chain of original
  if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, OperationTypes.ADD, key) // 触发新增
      } else if (hasChanged(value, oldValue)) {
        trigger(target, OperationTypes.SET, key) // 触发修改
      }
  }
  return result
}
```

### 3. track/trigger

这里是vue3响应式源码的难点。但原理跟vue2.x基本一致，只不过实现方式上有些不同。
**track用于收集依赖deps（依赖一般收集effect/computed/watch的回调函数），trigger 用于通知deps，通知依赖这一状态的对象更新。**

#### 3.1 举个例子解释

如下代码，使用effect或computed api时，里面使用了count.num，意味着这个effect依赖于count.num。当count.num set改变值时，需要通知该effect去执行。那什么时候count.num收集到effect这个依赖呢？
答案是创建effect时的回调函数。如果回调函数中用到响应式数据（意味着会去执行get函数），则同步这个effect到响应式数据（这里是count.num）的依赖集中。

**其流程是（全文重点）：1. effect/computed函数执行 -> 2. 代码有书写响应式数据，调用到get,依赖收集  -> 3. 当有set时，依赖集更新。**

``` ts
const count = reactive({ num: 0 })
// effect默认没带lazy参数，先会执行effect
effect(() => {
  // effect用到对应响应式数据时，count.num get就已经收集好了该effect依赖
  // 同理，使用computed api时，
  console.log(count.num)
})
// computed依赖于count.num,也意味着该computed是count.num的依赖项
const computedNum = computed(() => 2 * count.num))
count.num = 7
```

#### 3.2 对应源码解释

理解了上面这个案例，源码阅读就能顺畅的多。

先挑effect实现过程，再来看依赖收集track函数和执行依赖函数trigger。effect api主要用effect包装了回调函数fn，并默认执行fn回调函数，最终执行run(effect, fn, args)。

``` ts
export function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = EMPTY_OBJ
): ReactiveEffect<T> {
  if (isEffect(fn)) {
    fn = fn.raw
  }
  // 回调fn函数，包装成effect
  const effect = createReactiveEffect(fn, options)
  // 默认不是懒加载，lazy=fasle，执行effect函数。
  if (!options.lazy) {
    effect()
  }
  return effect
}

function createReactiveEffect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions
): ReactiveEffect<T> {
  const effect = function reactiveEffect(...args: unknown[]): unknown {
    return run(effect, fn, args) // 创建effect时，执行run
  } as ReactiveEffect
  effect._isEffect = true // 判断是effect
  effect.active = true // effect支持手动stop，此时active会被设置为false
  effect.raw = fn
  effect.scheduler = options.scheduler
  effect.onTrack = options.onTrack
  effect.onTrigger = options.onTrigger
  effect.onStop = options.onStop
  effect.computed = options.computed
  effect.deps = []
  return effect
}
```

再看run函数内容。其实就是执行回调函数时，先对effect入栈，使得当前effectStack有值。这个就非常巧妙，当执行fn回调时，回调函数的代码中又会去访问响应式数据（reactive），这样又会执行响应数据的get方法，get方法又会去执行后文讲的trick方法，trick进行依赖收集。

依赖收集哪些东西呢？就是收集当前的effect回调函数。这个回调函数（被effect包装）不就是刚被存储在effectStack么，所以在后续trick函数中可以看到使用effectStack栈。当执行完回调函数，再进行出栈。

**通过使用栈数据结构，以及对代码执行的时机，非常巧妙的就把当前effect传递过去，最终被响应式数据收集到依赖集中。**

``` ts
function run(effect: ReactiveEffect, fn: Function, args: unknown[]): unknown {
  if (!effect.active) {
    return fn(...args)
  }

  // 通常都是走这里，执行回调，同时不同时机effect入栈/出栈
  if (!effectStack.includes(effect)) {
    cleanup(effect)
    // 这里的try finally很巧妙
    // 入栈 -> 回调函数执行（使用栈，相当于把effect传递过去了） -> 出栈
    try {
      effectStack.push(effect)
      return fn(...args)
    } finally {
      effectStack.pop()
    }
  }
}
```

再来看看依赖收集trick/trigger具体实现细节。

先来看下几个存储变量，主要是依赖收集时用到的：

``` ts
// The main WeakMap that stores {target -> key -> dep} connections.
// Conceptually, it's easier to think of a dependency as a Dep class
// which maintains a Set of subscribers, but we simply store them as
// raw Sets to reduce memory overhead.
export type Dep = Set<ReactiveEffect>
export type KeyToDepMap = Map<any, Dep>
// 原始对象: new Map({key1: new Set([effect1, effect2,...])}, {key2: Set2}, ...)
// key是原始对象里的属性， 值为该key改变后会触发的一系列的函数， 比如渲染、computed
export const targetMap = new WeakMap<any, KeyToDepMap>()
```

**track函数进行数据依赖采集**, 以便于后面数据更改能够触发对应的函数。

``` ts
// 收集target key的依赖
// get: track(target, OperationTypes.GET, key)
export function track(target: object, type: OperationTypes, key?: unknown) {
  // 定义的computed、effect api都会推入effectStack栈中
  if (!shouldTrack || effectStack.length === 0) {
    return
  }

  // 调用effect/computed api时，能拿到effect对象（即依赖的回调函数）
  const effect = effectStack[effectStack.length - 1]

  if (type === OperationTypes.ITERATE) {
    key = ITERATE_KEY
  }

  // targetMap = {target1: deps = {key1: [], key2: [], ...}}，两层嵌套
  // 初始化target
  let depsMap = targetMap.get(target)
  if (depsMap === void 0) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 初始化target.key。键是target.key,值是依赖的effect数组，是个集合。
  let dep = depsMap.get(key!)
  if (dep === void 0) {
    depsMap.set(key!, (dep = new Set()))
  }
  // 依赖收集
  if (!dep.has(effect)) {
    dep.add(effect)
    effect.deps.push(dep)
  }
}
```

trigger，将track收集到的effect函数集合，添加到runners中（二选一放进effects或computedRunners中），并通过**scheduleRun**执行effect：

``` ts
// set: trigger(target, OperationTypes.SET, key)
export function trigger(
  target: object,
  type: OperationTypes,
  key?: unknown,
  extraInfo?: DebuggerEventExtraInfo
) {
  const depsMap = targetMap.get(target)
  if (depsMap === void 0) {
    // never been tracked
    return
  }
  // 把拿到的depsMap.get(key)，二选一放进effects或computedRunners中。
  const effects = new Set<ReactiveEffect>()
  const computedRunners = new Set<ReactiveEffect>()
  // 根据不同的OperationTypes，把effect=depsMap.get(key)放进runners中
  if (type === OperationTypes.CLEAR) {
    // collection being cleared, trigger all effects for target
    depsMap.forEach(dep => {
      addRunners(effects, computedRunners, dep)
    })
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      addRunners(effects, computedRunners, depsMap.get(key))
    }
    // also run for iteration key on ADD | DELETE
    if (type === OperationTypes.ADD || type === OperationTypes.DELETE) {
      const iterationKey = Array.isArray(target) ? 'length' : ITERATE_KEY
      addRunners(effects, computedRunners, depsMap.get(iterationKey))
    }
  }

  // 执行runners,即执行effects
  const run = (effect: ReactiveEffect) => {
    scheduleRun(effect, target, type, key, extraInfo)
  }
  // Important: computed effects must be run first so that computed getters
  // can be invalidated before any normal effects that depend on them are run.
  computedRunners.forEach(run)
  effects.forEach(run)
}

// 添加runner时，二选一
function addRunners(
  effects: Set<ReactiveEffect>,
  computedRunners: Set<ReactiveEffect>,
  effectsToAdd: Set<ReactiveEffect> | undefined
) {
  if (effectsToAdd !== void 0) {
    effectsToAdd.forEach(effect => {
      if (effect.computed) {
        computedRunners.add(effect)
      } else {
        effects.add(effect)
      }
    })
  }
}
```

## 总结

响应式数据，就是当数据对象改变时（set），有用到数据对象的地方，都会自动执行响应的逻辑。比如effect/computed/watch等js api用到数据对象，则执行对应的回调函数。而视图view用到数据对象时，则重新vnode diff，最后自动进行dom更新（即视图更新）。

而Vue3响应式源码跟Vue2.x源码流程基本一致，依然是利用在使用响应式数据时，执行数据的get方法，收集相关的依赖（依赖可以是回调函数，如effect/computed，也可以是视图自动更新）；在数据进行变化的时候，执行数据的set方法，把收集的依赖都依次执行。
