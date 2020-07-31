# Vue3 设计思想

[[toc]]

## 1. Vue3 设计目标

* 更小 -> tree shaking
* **更快**
    1. Object.defineProperty -> Proxy(使得初始化不用再递归data)
    1. Virtual Dom 重构 -> 利用模板代码，确定动态和静态代码，在VDom Diff时优化
        1. 可跳过静态文本（无需递归进入子树循环），可跳过props对比
        1. 事件监听函数cache
    1. 更多编译优化 -> 利用模板代码，尽可能预先优化编译的代码
        * slot默认编译为函数（不存在父子组件强耦合）
        * Momomorphic vnode factory
        * Compiler-generated flags for vnode/children types（VNode带上类型）
* **加强TypeScript支持**
* 加强API设计一致性
* 提高自身可维护性
* 开放更多底层功能
    * 响应式数据监听（即Vue2.x的Object.observer）

### 1.1 更快 - Proxy

**Proxy减少了组件实例初始化开销**。在Vue2中，`初始化组件时`会对data的属性递归调用包装（Object.defineProperty）;而在Vue3中，初始化只是书写Proxy的代理handler（Proxy包装），当`运行时`getter某个属性时，才去重新Proxy包装该值，减少了初始化组件的时间。[Vue3此部分源码讲解](https://lq782655835.github.io/blogs/vue/vue3-reactive.html#_2-reactive)

ES6 Proxy数据监听优点：
1. 对对象进行直接监听, 可以`弥补Object.defineProperty无法监听新增删除属性的短板`
2. `无需再遍历对象进行设置`监听函数Object.defineProperty
3. 可以`适用于Array`, 不需要再分成两种写法

### 1.2 更快 - Virtual Dom 重构

`VDOM作用, 状态（或者叫数据）驱动UI，开发者只考虑状态改变，而UI会自动变化，这就是VDOM的最大价值。`所以在VDOM基础上，UI不仅可以是DOM元素（web端），也可以是Native（移动端）。

#### 传统Virtual DOM的性能瓶颈

数据变更之后，新的Virtual DOM和旧的Virtual DOM进行 patch 算法比较，并算出二者之间的差异，将差异进行修改。但是传统Virtual DOM，进行算法比对时颗粒度是组件，每个组件作为一个颗粒。

![image](https://user-images.githubusercontent.com/6310131/71469020-deba0500-2802-11ea-9651-a1708157f4b1.png)

虽然Vue能够保证触发更新的组件最小化，但是单个组件内部依然需要遍历该组件的整个Virtual DOM树。

![image](https://user-images.githubusercontent.com/6310131/71469032-e7aad680-2802-11ea-9d03-1582054c4d02.png)

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

### 1.3 更快 - 更多编译优化

主要是利用模板代码的可预见性，在编译时做好编译优化

* 优化slots生成。slot编译时统一为函数（v-slot），父子组件slot渲染分离。
* 静态内容提取。模板不变时，diff跳过（Vue2已优化）
* 静态属性提取
![image](https://user-images.githubusercontent.com/6310131/71466334-3c961f00-27fa-11ea-9202-075037a0de77.png)
* 内联函数提取
![image](https://user-images.githubusercontent.com/6310131/71466569-ef667d00-27fa-11ea-9623-bdbcf34bbe66.png)

## 2. Vue 设计思考

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

## 3. 参考

以上思想主要来自Vue作者尤雨溪的多个VueConf大会视频，笔者在理解基础上进行总结，建议读者完整看原视频。

* [VueConf 2019-上海演讲视频](https://www.bilibili.com/video/av56093550?from=search&seid=17425026665332701435)
* [Vue 3.0 进展@VueConf CN 2018](https://www.bilibili.com/video/av48968552?from=search&seid=11269305592002355043)
* [在框架设计中寻求平衡](https://www.bilibili.com/video/av80042358?from=search&seid=17425026665332701435)
