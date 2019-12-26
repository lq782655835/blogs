# Vue3 设计思想

## 1. Vue3.0设计目标

* 更小
* **更快**
    1. Object.defineProperty -> Proxy
    1. Virtual Dom 重构
    1. 更多编译优化
        * slot默认编译为函数（不存在父子组件强耦合）
        * Momomorphic vnode factory
        * Compiler-generated flags for vnode/children types（VNode带上类型）
* **加强TypeScript支持**
    * Function API
* 加强API设计一致性
* 提高自身可维护性
* 开放更多底层功能
    * Object.observer

### 1.1 更快 - Proxy

ES6 Proxy数据监听优点：
1. 对对象进行直接监听, 可以`弥补Object.defineProperty无法监听新增删除属性的短板`
2. `无需再遍历对象进行设置`监听函数Object.defineProperty
3. 可以`适用于Array`, 不需要再分成两种写法

### 1.2 更快 - Virtual Dom 重构

`VDOM作用, 状态（或者叫数据）驱动UI，开发者只考虑状态改变，而UI会自动变化，这就是VDOM的最大价值。`所以在VDOM基础上，UI不仅可以是DOM元素（web端），也可以是Native（移动端）。

#### 传统Virtual DOM的性能瓶颈

数据变更之后，新的Virtual DOM和旧的Virtual DOM进行 patch 算法比较，并算出二者之间的差异，将差异进行修改。但是传统Virtual DOM，进行算法比对时颗粒度是组件，每个组件作为一个颗粒。

![](https://user-gold-cdn.xitu.io/2019/11/17/16e785150855744e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

虽然Vue能够保证触发更新的组件最小化，但是单个组件内部依然需要遍历该组件的整个Virtual DOM树。

![](https://user-gold-cdn.xitu.io/2019/11/17/16e7851b71120fc4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

传统Virtual DOM的性能跟模板大小正相关，跟动态节点的数量无关。模板或者组件有多大，那么在进行数据更新时损耗的性能就有多大，但实际上，这种方式利用率很低。如上图所示，在上述template中，发生改变的地方只有message插值的部分，整体结构不变，但是数据更新的时候，比对整个template结构，这样就存在性能损耗。
所以在一些组件整个模板内只有少量动态节点的情况下，传统方法遍历存在性能的浪费。

#### Vue3.0 Virtual DOM

如果要追求极致的性能，最快速的就是利用模板进行数据监听，当数据变化时，直接更新对应的DOM元素（此时可以不用VDOM，[Svelte](https://svelte.dev/blog/virtual-dom-is-pure-overhead)框架就是无VDOM）。这种方式适合开发纯template模板，因为一旦模板确定，就可以根据模板进行预编译，简单高效。

但这种开发方式有个弊端，无法利用js的灵活性。当开发者使用render function/JSX时，根本无法预知代码意图，所以Svelte书写上无法支持render function/JSX。Vue3所要做的：保留VDOM，兼容手写render function，同时最大化利用模版静态信息。

#### 解决方案

`动静结合`，找到动态变化的部分，更新时只对比可以变化的部分，减少性能损耗。

`实现上，就是在模板编译时，给各个VNode带上type类型，区分不同的变更需求，然后在VDOM时对不同type的VNode更新做优化处理`。Vue3重构的VDOM源码讲解，会在往后单独开一篇文章讲解，这里把核心源码贴上：
* Vue3 DOM算法：https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/renderer.ts
* Vue2 DOM算法：https://github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js

## 2. Vue设计思考

### 2.1 Scope

框架职责，React主要聚合在底层，不会像Angular一样大包大揽，拥有Route、Form解决方案等。
1. Scope小
    * 优点：只关注底层，不用再维护额外的解决方案，都丢给社区。上手快，因为记忆小。
    * 缺点：解决方案分散（另一个维度，造就社区繁荣）

### 2.2 JSX vs Template

1. JSX：
    * 优点：完整的JS表达能力、视图即数据
    * 缺点：VDOM难以优化，因为js动态性，无法预先优化
1. Template
    * 优点：可以预先优化VDOM

## 参考

* https://www.bilibili.com/video/av58793314?from=search&seid=17425026665332701435
* https://www.bilibili.com/video/av56093550?from=search&seid=17425026665332701435