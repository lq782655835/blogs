# Vue2.x源码分析 - Vue.nextTick

先看下该API [Vue官方解释](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)。

主要是利用js Event Loop原理，在执行Vue.nextTick(cb)方法时，把cb推入回调集合中，同时最关键的一步：执行macroTask/microTask（如setTimeout(callbacks, 0)）。浏览器底层会在下一个tick（浏览器自己的行为。此时DOM节点操作完成），执行callbacks里的函数。这样这些函数就能拿到已经更新DOM后的节点了。
再来看下Vue源码是如何实现的，源码在`src/core/util/next-tick.js`文件中，详细解释在代码注释中：

``` js
import { noop } from 'shared/util'
import { handleError } from './error'
import { isIOS, isNative } from './env'

const callbacks = []
let pending = false

// 在下一次tick执行时，把缓存的函数集合都执行
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0 // 清空callback集合，方便下次tick
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// micro和macro原理是JS Event Loop
// 这两个函数分别为了存储macro task策略以及micro task 策略
let microTimerFunc
let macroTimerFunc
let useMacroTask = false

// 以下代码很多，其实最终都是赋值macroTimerFunc
// 优先级：setImmediate->MessageChannel->setTimeout
// macroTimerFunc执行，最终是执行flushCallbacks函数
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  /* istanbul ignore next */
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// 设置microTimerFunc函数
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
} else {
  microTimerFunc = macroTimerFunc
}

// Vue.nextTick or vm.$nextTick API
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve

  // 把cb推入callback集合中
  // 执行macroTimerFunc（如：setTimeout）后，在下一个tick中才去执行callback集合里的函数
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }

  // 支持this.$nextTick().then(...)
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

```