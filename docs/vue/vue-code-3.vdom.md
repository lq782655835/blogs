# Vue2.x源码分析 - Virtual DOM实现

Vue Virtual DOM实现是基于snabbdom库改造的，所以理解snabbdom源码有助于我们更好的看懂Vue源码（实际上Vue源码中有非常多相似的地方，比如diff算法、hooks应用等）。snabbdom源码更纯粹，也更容易理解，具体可以看笔者另外一篇文章：[虚拟dom算法库 - snabbdom](./vue-code-2.snabbdom.md)。以下我们对比看下Virtual DOM在Vue源码中的应用。

## 基本数据结构

``` js
VNode {
  tag: string | void; // 标签tag
  data: VNodeData | void; // 数据，包括事件监听、class、style等
  children: ?Array<VNode>; // 子VNodes
  text: string | void; // 文本
  elm: Node | void; // VNode对应的真实DOM
  ns: string | void;
  key: string | number | void; // 唯一key

  // 组件
  context: Component | void; // rendered in this component's scope
  functionalContext: Component | void; // only for functional component root nodes
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance

  parent: VNode | void; // component placeholder node
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // 标记为静态
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
```

``` js
VNodeData {
  key?: string | number;
  slot?: string;
  ref?: string;
  is?: string;
  pre?: boolean;
  tag?: string;
  staticClass?: string;
  class?: any;
  staticStyle?: { [key: string]: any };
  style?: Array<Object> | Object;
  normalizedStyle?: Object;
  props?: { [key: string]: any };
  attrs?: { [key: string]: string };
  domProps?: { [key: string]: any };
  hook?: { [key: string]: Function };
  on?: ?{ [key: string]: Function | Array<Function> };
  nativeOn?: { [key: string]: Function | Array<Function> };
  transition?: Object;
  show?: boolean; // marker for v-show
  inlineTemplate?: {
    render: Function;
    staticRenderFns: Array<Function>;
  };
  directives?: Array<VNodeDirective>;
  keepAlive?: boolean;
  scopedSlots?: { [key: string]: Function };
  model?: {
    value: any;
    callback: Function;
  };
};
```

## 源码笔记

* `src/core/vdom/vnode.js`: 对应snabbdom/vnode.ts源码
  * 定义VNode数据结构，并有创建VNode实例基础方法。
* `src/core/vdom/create-element.js`: 对应snabbdom/h.ts
  * 应用层新建一个VNode实例，包含一些数据预处理。
  * vue在snabbdom基础上，增加了Component System。
  ``` js
  // 应用层说明
  createElement(
    // {String | Object | Function}
    'div',

    // {Object}
    // 一个与模板中属性对应的数据对象。可选。
    {
      // (详情见下面)
    },

    // {String | Array}
    // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
    // 也可以使用字符串来生成“文本虚拟节点”。可选。
    [
      '先写一些文字',
      createElement('h1', '一则头条'),
      createElement(MyComponent, {
        props: {
          someProp: 'foobar'
        }
      })
    ]
  )
  ```
  ``` js
  // 源码解释
  export function createElement (
    context: Component,
    tag: any,
    data: any,
    children: any,
    normalizationType: any,
    alwaysNormalize: boolean
  ): VNode | Array<VNode> {
    // data可省略，会判断参数类型，data非object会被认为省略
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children
      children = data
      data = undefined
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE
    }
    return _createElement(context, tag, data, children, normalizationType)
  ```
* `platforms/web/runtime/node-ops.js`: 对应snabbdom/htmldomapi.ts源码
  * 封装DOM API
* `src/core/vdom/patch.js`: 对应snabbdom/snabbdom.ts
  * vdom diff核心内容。diff算法与snabbdom大同小异
  * vue patch.js里面的createPatchFunction方法，等同于snabbdom.ts的init方法，会默认注入一些模块。
* `platforms/web/runtime/modules文件夹`: 对应snabbdom/modules文件夹
  * 注入默认模块，在dom合适的时间调用这些模块的hook
  * `attrs.js`: 根据`VNode.data.attrs`值。设置html的属性，能反应到html元素上
  * `dom-props.js` 根据`VNode.data.domProps`值。设置dom的属性
  * `class.js`: 根据`VNode.data.class`值。 设置html className。[Vue官方API](https://cn.vuejs.org/v2/guide/class-and-style.html)
  * `style.js`: 根据`VNode.data.style`值。设置html style。[Vue官方API](https://cn.vuejs.org/v2/guide/class-and-style.html)
  * `event.js`: 根据`VNode.data.on`值。设置html event事件。[Vue官方API](https://cn.vuejs.org/v2/guide/events.html)
  * `src/core/vdom/modules/directives.js` 根据`VNode.data.directives`值。绑定指令（指令hook如bind、update回调应用也在这）。[Vue官方API](https://cn.vuejs.org/v2/guide/custom-directive.html)
  * `src/core/vdom/modules/ref.js` 根据`VNode.data.ref/refInFor`值。注册ref，使得通过vm.$refs[key]能拿到VNode.elm(VNode一般不会暴露给外面)

  ``` js
  {
    // 与 `v-bind:class` 的 API 相同，
    // 接受一个字符串、对象或字符串和对象组成的数组
    'class': {
      foo: true,
      bar: false
    },
    // 与 `v-bind:style` 的 API 相同，
    // 接受一个字符串、对象，或对象组成的数组
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 普通的 HTML 特性
    attrs: {
      id: 'foo'
    },
    // 组件 prop
    props: {
      myProp: 'bar'
    },
    // DOM 属性
    domProps: {
      innerHTML: 'baz'
    },
    // 事件监听器在 `on` 属性内，
    // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
    // 需要在处理函数中手动检查 keyCode。
    on: {
      click: this.clickHandler
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用
    // `vm.$emit` 触发的事件。
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已经自动为你进行了同步。
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    // 作用域插槽的格式为
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    // 其它特殊顶层属性
    key: 'myKey',
    ref: 'myRef',
    // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
    // 那么 `$refs.myRef` 会变成一个数组。
    refInFor: true
  }
  ```