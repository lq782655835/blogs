# Vue

## 1. VDom的优势？

核心还是利用利用虚拟dom，最小化dom更新，因为频繁dom更新的代价是巨大的。

因为`dom是在渲染引擎中，而js是在js V8引擎中，两者通信代价比较高`。
`js引擎只负责 JavaScript 代码的解释与执行`，只是把js代码转换为字节码，然后执行（js引擎有几个好助手：编译器和作用域。[编译原理](https://lq782655835.github.io/blogs/read-books/book-you-dont-know-javascript.html#%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86)）。
换句话说，JS引擎本身没有时间的概念，只是一个按需执行js任意代码片段的环境。

## 2. Vue 的模板如何被渲染成 HTML? 以及渲染过程?

`模板 -> render函数（编译） -> 返回vnode(虚拟dom关键) -> vnode patch方法进行diff -> Dom更新`

### Vue 的整个实现流程

1. 先把模板解析成 render 函数，把模板中的属性去变成 js 中的变量，vif,vshow,vfor 等指令变成 js 中的逻辑
1. 执行 render 函数，在初次渲染执行 render 函数的过程中 绑定属性监听，收集依赖，最终得到 vNode，利用 vNode 的 Patch 方法，把 vNode 渲染成真实的 DOM
1. 在属性更新后，重新执行 render 函数，不过这个时候就不需要绑定属性和收集依赖了，最终生成新的 vNode
1. 把新的 vNode 和 旧的 vNode 去做对比，找出真正需要更新的 DOM，渲染在浏览器。

## 3. Vue双向数据绑定原理

[Vue核心XMind](https://lq782655835.github.io/blogs/vue/vue-code-0.frame.html#%E6%A0%B8%E5%BF%83%E5%86%85%E5%AE%B9)

1. 首先是vm=new Vue(options)初始化，Vue 初始化主要就干了几件事情：
    * 编译template为render函数
    * 合并配置
    * data深度监听（get/set），每个字段都有一个Dep对象进行Watcher管理（比如通常有1个渲染Watcher，多个Computed Watcher
    ）
    * 挂载一些方法到Vue.prototype上
2. vm.$mount(el) 触发收集 && vdom diff渲染真实DOM
    1. 触发收集
        * new Watcher()，新建一个渲染Watcher（watcher可以看作回调函数，当data属性改变时，对应的唯一Dep中的Watcher批量更新），将该渲染Watcher绑定到依赖的字段中（template模板中可以知道）
        * 如何知道渲染Watcher依赖的字段？答案：vm.render()。render()方法中会去访问字段（get拦截方法触发，对Dep收集Watcher）。
    2. vdom diff
        1. vnode = vm.render() 拿到vnode
        2. vm.update(vnode) diff算法比对，更新dom

以下是双向数据绑定示意图：

![](https://user-gold-cdn.xitu.io/2018/8/30/16586a0d1261a7b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


## 4. 为什么组件只能挂一个root标签？

`取决于diff算法的编写方式`。

diff算法（负责将当前的VDOM与旧的VDOM进行比较，并将差异修补到真实DOM中）依赖于以下事实：子组件的每个VNode在真实dom中都具有单个匹配的html元素。

比如：render: h('div', attr, children)会生成VNode（树状数据结构），然后才比较好diff。
如果组件作为最外层的warpper，最终会解析成更细力度的子组件，知道没有组件包装。

参考：https://github.com/vuejs/vue/issues/7088#issuecomment-357899727

## 5. Vue Slot原理

[Vue slot源码解析](../vue-code-slot.md)

`slot本质是把app父组件生成的vnode/function，延迟到layout子组件渲染。`

## 6. Vuex原理

只关注核心Store，不考虑namespace以及mapGetter等辅助方法。

其实核心原理代码非常简单，就是`利用全局的new Vue({ data: { state }})来实现。即把组件的共享状态抽取出来，放在一个全局单例模式下管理。`

[动手实现一个Vuex](https://github.com/lq782655835/build-your-own-vuex)

## 7. Vue-Router原理

* hash：onhashchanged
* history：history.pushState

## 8. SSR

* 服务端渲染
服务端在返回 html 之前，在特定的区域，符号里用数据填充，再给客户端，客户端只负责解析 HTML 。
* 客户端渲染html 仅仅作为静态文件，客户端端在请求时，服务端不做任何处理，直接以原文件的形式返回给客户端客户端，然后根据 html 上的 JavaScript，生成 DOM 插入 html。

![](https://user-gold-cdn.xitu.io/2018/3/4/161ef7bf329e8812?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

其基本实现原理：

* app.js 作为客户端与服务端的公用入口，导出 Vue 根实例，供客户端 entry 与服务端 entry 使用。客户端 entry 主要作用挂载到 DOM 上，服务端 entry 除了创建和返回实例，还进行路由匹配与数据预获取。
* webpack 为客服端打包一个 Client Bundle ，为服务端打包一个 Server Bundle 。
* 服务器接收请求时，会根据 url，加载相应组件，获取和解析异步数据，创建一个读取 Server Bundle 的 BundleRenderer，然后生成 html 发送给客户端。

Vue SSR 的实现，主要就是把 Vue 的组件输出成一个完整 HTML。纯客户端输出过程有一个 complier 过程，主要作用是将 template 转化成 render 字符串 。
Vue SSR 需要做的事多点（输出完整 HTML），除了 complier -> vnode，还需如数据获取填充至 HTML、客户端混合（hydration）、缓存等等。

# React

[React setState是异步吗](https://lq782655835.github.io/blogs/react/react-code-3.setState.html#setstate%E5%BC%82%E6%AD%A5%E5%AE%9E%E7%8E%B0)

### 1. React与Vue异同

![image](https://user-images.githubusercontent.com/6310131/78337738-0bc94100-75c4-11ea-9c1c-f484a44b48b1.png)

### 2. 生命周期

![image](https://user-images.githubusercontent.com/6310131/57915545-9ed18d80-78c3-11e9-8aa5-6d1fb2cd6f63.png)

* 创建时。将我们的组件插入到DOM中
    * constructor
    * render
    * componentDidMount
* 更新时
    * shouldComponentUpdate
    * render
    * componentDidUpdate
* 卸载时
    * componentWillunMount
* 废弃的三个生命周期
    * ~~componentWillMount~~
    * ~~componentWillReceiveProps~~
    * ~~componentWillUpdate~~
* 取而代之的是两个新的生命周期函数
    * static getDerivedStateFromProps。当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps
    * getSnapshotBeforeUpdate

### 3. immutable.js

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 `Persistent Data Structure（持久化数据结构）`，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 `Structural Sharing（结构共享）`，即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

Immutable.js本质上是一个JavaScript的持久化数据结构的库

### 4. Hooks

* hooks是什么
    * React Hooks是React特殊的一类函数。要解决的问题是状态共享，是继 render-props 和 higher-order components 之后的第三种状态共享方案，不会产生 JSX 嵌套地狱问题。这个状态指的是状态逻辑，所以称为状态逻辑复用会更恰当，因为只共享数据处理逻辑，不会共享数据本身。
    * React Hooks 带来的好处不仅是 “更 FP，更新粒度更细，代码更清晰”，还有如下三个特性：
        * 多个状态不会产生嵌套，写法还是平铺的（renderProps 可以通过 compose 解决，可不但使用略为繁琐，而且因为强制封装一个新对象而增加了实体数量）。
        * Hooks 可以引用其他 Hooks。
        * 更容易将组件的 UI 与状态分离。

* 为什么要hooks
    * 复用有状态的组件太难。之前使用渲染属性（Render Props）和高阶组件（Higher-Order Components）复用，但层级太多
    * 生命周期钩子函数里的逻辑太乱。
    * class this指向问题

### 4. 为什么要fiber（V16引入）

性能。react在进行组件渲染时，从setState开始到渲染完成整个过程是同步的（“一气呵成”）。如果需要渲染的组件比较庞大，js执行会占据主线程时间较长，会导致页面响应度变差，使得react在动画、手势等应用中效果比较差。

React 15 及之前版本，`协调算法（Stack Reconciler）会一次同步处理整个组件树。它会递归遍历每个组件（虚拟DOM树），去比较新旧两颗树，得到需要更新的部分`。这个过程基于递归调用，一旦开始，很难去打断。也就是说，一旦工作量大，就会堵塞整个主线程（The main thread is the same as the UI thread.）。
而事实上，我们的更新工作可能并不需要一次性全部完成，比如 offscreen 的 UI 更新并不紧急，比如 动画 需要优先完成——我们可以根据优先级调整工作，把diff过程按时间分片！

