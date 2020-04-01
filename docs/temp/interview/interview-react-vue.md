
# React

### setState

### Redux

### Mobx

### 生命周期

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

### immutable.js
Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 `Persistent Data Structure（持久化数据结构）`，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 `Structural Sharing（结构共享）`，即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

Immutable.js本质上是一个JavaScript的持久化数据结构的库

### Hooks

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

### 为什么要fiber（V16引入）

性能。react在进行组件渲染时，从setState开始到渲染完成整个过程是同步的（“一气呵成”）。如果需要渲染的组件比较庞大，js执行会占据主线程时间较长，会导致页面响应度变差，使得react在动画、手势等应用中效果比较差。

React 15 及之前版本，`协调算法（Stack Reconciler）会一次同步处理整个组件树。它会递归遍历每个组件（虚拟DOM树），去比较新旧两颗树，得到需要更新的部分`。这个过程基于递归调用，一旦开始，很难去打断。也就是说，一旦工作量大，就会堵塞整个主线程（The main thread is the same as the UI thread.）。
而事实上，我们的更新工作可能并不需要一次性全部完成，比如 offscreen 的 UI 更新并不紧急，比如 动画 需要优先完成——我们可以根据优先级调整工作，把diff过程按时间分片！

# Vue

## 为什么组件只能挂一个root标签？

取决于diff算法的编写方式。

diff算法（负责将当前的VDOM与旧的VDOM进行比较，并将差异修补到真实DOM中）依赖于以下事实：子组件的每个VNode在真实dom中都具有单个匹配的html元素。

比如：render: h('div', attr, children)会生成VNode（树状数据结构），然后才比较好diff。
如果组件作为最外层的warpper，最终会解析成更细力度的子组件，知道没有组件包装。

参考：https://github.com/vuejs/vue/issues/7088#issuecomment-357899727

### SSR
* 服务端渲染
服务端在返回 html 之前，在特定的区域，符号里用数据填充，再给客户端，客户端只负责解析 HTML 。
* 客户端渲染html 仅仅作为静态文件，客户端端在请求时，服务端不做任何处理，直接以原文件的形式返回给客户端客户端，然后根据 html 上的 JavaScript，生成 DOM 插入 html。

![](https://user-gold-cdn.xitu.io/2018/3/4/161ef7bf329e8812?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

其基本实现原理：

* app.js 作为客户端与服务端的公用入口，导出 Vue 根实例，供客户端 entry 与服务端 entry 使用。客户端 entry 主要作用挂载到 DOM 上，服务端 entry 除了创建和返回实例，还进行路由匹配与数据预获取。
* webpack 为客服端打包一个 Client Bundle ，为服务端打包一个 Server Bundle 。
* 服务器接收请求时，会根据 url，加载相应组件，获取和解析异步数据，创建一个读取 Server Bundle 的 BundleRenderer，然后生成 html 发送给客户端。

Vue SSR 的实现，主要就是把 Vue 的组件输出成一个完整 HTML。纯客户端输出过程有一个 complier 过程（「下题」中有一个简单描述），主要作用是将 template 转化成 render 字符串 。
Vue SSR 需要做的事多点（输出完整 HTML），除了 complier -> vnode，还需如数据获取填充至 HTML、客户端混合（hydration）、缓存等等。

### Vue-Router
* history
* hash
* abstract
