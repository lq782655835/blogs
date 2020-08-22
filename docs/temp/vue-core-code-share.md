# Vue核心原理 - 笔记

主要有两块：

1. `new Vue({ optionAPI })流程`，即：Vue Option API代码是如何渲染到最终UI
1. `响应式原理`，即：如何依赖收集的，为什么要用Object.defineProperty/Proxy

涉及到的概念：

1. 模板编译 & runtime
    * VirtualDOM
    * VNode
    * VDiff
1. 双向数据绑定
    * 依赖收集

## 1. new Vue({ optionAPI })流程

问题：下面的js代码如何实现Web UI上的渲染？

``` js
new Vue({
    el: el,
    render: h => h(App),
}) // .$mount('#app');
```

概念流程：new Vue() => Vitrual DOM => DOM

源码流程：template/jsx -> render() -> Vue.prototype._render() -> vnode -> patch() -> vdiff -> ui(DOM API，web:nodeOps)

涉及到的概念：

* VirtualDOM、VNode数据结构（VirtualDOM只是概念，VNode才是虚拟DOM的承载）
* VNode + Diff = patch



### 问题

1. 为什么要有VDOM/VNode？答：1. 找到最小更新DOM操作集 2. 给Web之外的终端UI提供可能（比如Native、webgl）
    * 思考：js引擎 / 渲染引擎 （互斥） -> js单线程 （node(libuv)，callback，event loop）
    * 浏览器是如何渲染？渲染，js引擎（V8）关系？
    * js -> ui : 假设js多线程？ webworker规范： 不能操作dom
    * VNode: tag、children   -> leetcode
2. Vue2：<template></template>为什么需要包装一个根节点？答：VDiff算法决定了需要这规则

## 2. 响应式原理

### 2.1 react状态机模式

react基于状态机：msg -> `this.setState({msg})` -> render() -> vdiff -> ui(DOM)

``` js
export default class ReactComp extend React.Component {
    state = {msg : 1}
    render() {
        return <div>{msg}</div>
    }

    this.setState({msg: 111}) // -> render()

    // 状态机模式：msg -> setState -> render() -> vdiff -> ui(DOM)
    {msg: 1} -> UI1
    {msg: 111} -> UI2
}
```

### 2.2 vue依赖收集模式

vue基于劫持进行自动依赖收集：msg -> `this.msg = 111 -> Object.defineProperty` -> render() -> vdiff -> ui(DOM)

源码流程：this.xxx = 1 -> 中间劫持（defineProperty/Proxy） -> getter/setter -> Dep/Watcher -> Watcher(cb): render/computed/this.$watch() -> render() -> UI

``` js
// vue2.x proxy: Object.defineProperty
export default {
    render() {
        return <div>{msg}{msgxxx}</div>
    }
    data() {
        return { msg: 11}
    }
    computed: {
        msgxxx() {
            return this.msg + 'hello' // Watcher(() => {return this.msg + 'hello'})
        }
    }

    // 双向数据绑定原理：
    Object.defineProperty(data, 'msg', {
        getter() {
            // 依赖收集 Dep: { msg: [Wathcer(() => render()), ] }
            dep(new Watcher(() => render()))
            return value
        }
        setter() {
            // 触发更新
            dep.notify()
        }
    })

    this.msg = 111 // js语法，更新值 + 收集的Watcher update
}
```

自定义依赖者模式：

``` js
// 依赖者
class Dep {
    arr = []
    dep(watch) {
        arr.push(watch)
    }
    notify() {
        arr.forEach(watch => watch.update())
    }
}

class Watcher() {
    constructor(cb) {
        this.cb = cb
    }
    update() {
        this.cb()
    }
}

let dep = new Dep() // msg
dep(new Watcher(() => render())) // render Watcher
dep(new Watcher(() => computed())) // computed Watcher
```

### Vue调度原则

1. 先父组件更新，后子组件更新
1. render Watcher放在最后执行

``` js
// 如上案例的调度：
// dep:msg: [WatcherRender(), computedCB(), selfWatcher()]
// dep:msgxxx: [WatcherRender()]

// 最终根据规则依次执行：[computedCB(), selfWatcher(), WatcherRender]
```

## 3. 学习能力 & 创新能力

1. new App() -> UI (DOM)
    * VirtualDOM -> VNode(Tree) -> 数据结构
1. Vue.nextTick()
    * eventloop(js引擎/渲染引擎 -> v8(node-> libuv))，mic（Promise）/mac -> Promise规范，1. 三种状态 2. .then返回新的Promise -> Promise.all/race()
1. 依赖收集：Object.defineProperty -> Dep/Watcher
    * 依赖者设计模式
1. vue的设计模式有哪些?
1. Vue3新特性： 6个亮点
    * 更快
        * Proxy -> 自己写Proxy实现
        * 重写Diff
            * patchFlag
            * BlockTree