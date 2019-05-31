# Vue数据结构

vnode创建真实dom过程：先生成根据vnode生成node tree，再插入到父节点（如果有父节点）中。insert(parentElm, vnode.elm, refElm)

关系：
``` js
// vm.__patch__(prevVnode, vnode)设置vnode.elm
vm.$el = vnode.elm // vm.$el对外暴露，框架里是vnode.elm(diff主要是设置vnode.elm)
vm.$el.__vue__ = vm

vnode = vm._vnode // 从实例vm拿到vnode

// Object.defineProperty代理
vm.$data = vm._data = observe(vm.$options.data())(vm.xxx = vm._data.xxx)
vm.$props = vm._props = observe(vm.$options.props)

// 常用的手动创建组件
const Ctor = Vue.extend(Compo); // Ctor是Vue的子类
return new Ctor({ propsData }).$mount(mounted === false ? null : elm);
```

``` js
// Vue/Component数据结构
declare interface Component {
  // constructor information
  static cid: number;
  static options: Object;
  // extend
  static extend: (options: Object) => Function;
  static superOptions: Object;
  static extendOptions: Object;
  static sealedOptions: Object;
  static super: Class<Component>;
  // assets
  static directive: (id: string, def?: Function | Object) => Function | Object | void;
  static component: (id: string, def?: Class<Component> | Object) => Class<Component>;
  static filter: (id: string, def?: Function) => Function | void;
  // functional context constructor
  static FunctionalRenderContext: Function;

  // public properties
  $el: any; // so that we can attach __vue__ to it
  $data: Object;
  $props: Object;
  $options: ComponentOptions;
  $parent: Component | void;
  $root: Component;
  $children: Array<Component>;
  $refs: { [key: string]: Component | Element | Array<Component | Element> | void };
  $slots: { [key: string]: Array<VNode> };
  $scopedSlots: { [key: string]: () => VNodeChildren };
  $vnode: VNode; // the placeholder node for the component in parent's render tree
  $attrs: { [key: string] : string };
  $listeners: { [key: string]: Function | Array<Function> };
  $isServer: boolean;

  // public methods
  $mount: (el?: Element | string, hydrating?: boolean) => Component;
  $forceUpdate: () => void;
  $destroy: () => void;
  $set: <T>(target: Object | Array<T>, key: string | number, val: T) => T;
  $delete: <T>(target: Object | Array<T>, key: string | number) => void;
  $watch: (expOrFn: string | Function, cb: Function, options?: Object) => Function;
  $on: (event: string | Array<string>, fn: Function) => Component;
  $once: (event: string, fn: Function) => Component;
  $off: (event?: string | Array<string>, fn?: Function) => Component;
  $emit: (event: string, ...args: Array<mixed>) => Component;
  $nextTick: (fn: Function) => void | Promise<*>;
  $createElement: (tag?: string | Component, data?: Object, children?: VNodeChildren) => VNode;

  // private properties
  _uid: number | string;
  _name: string; // this only exists in dev mode
  _isVue: true;
  _self: Component;
  _renderProxy: Component;
  _renderContext: ?Component;
  _watcher: Watcher;
  _watchers: Array<Watcher>;
  _computedWatchers: { [key: string]: Watcher };
  _data: Object;
  _props: Object;
  _events: Object;
  _inactive: boolean | null;
  _directInactive: boolean;
  _isMounted: boolean;
  _isDestroyed: boolean;
  _isBeingDestroyed: boolean;
  _vnode: ?VNode; // self root node
  _staticTrees: ?Array<VNode>; // v-once cached trees
  _hasHookEvent: boolean;
  _provided: ?Object;
  // _virtualComponents?: { [key: string]: Component };

  // private methods

  // lifecycle
  _init: Function;
  _mount: (el?: Element | void, hydrating?: boolean) => Component;
  _update: (vnode: VNode, hydrating?: boolean) => void;

  // rendering
  _render: () => VNode;

  __patch__: (
    a: Element | VNode | void,
    b: VNode,
    hydrating?: boolean,
    removeOnly?: boolean,
    parentElm?: any,
    refElm?: any
  ) => any;
```

``` js
// 真正去vdom diff的数据结构。
// 包括收集的组件内容componentOptions.Ctor/propsData(propsData的值根据Ctor.options.props(-key值) + VNodeData.atrrs和props拿到(-value值))
// 以及对外设置的VNodeData.on/atrrs
VNode {
  tag: string | void;
  data: VNodeData | void; // 设置的data数据
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void;
  key: string | number | void; // this.key = data && data.key
  componentOptions: VNodeComponentOptions | void; // 组件选项
  componentInstance: Component | void;
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support
}
```

``` js
// 对createElement开放
declare interface VNodeData {
  key?: string | number;
  slot?: string;
  ref?: string;
  is?: string;
  pre?: boolean;
  tag?: string;
  staticClass?: string;
  class?: any;
  staticStyle?: { [key: string]: any };
  style?: string | Array<Object> | Object;
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

``` js
// 组件选项，在手动构建组件实例时很有用
declare type VNodeComponentOptions = {
  Ctor: Class<Component>;
  propsData: ?Object;
  listeners: ?Object;
  children: ?Array<VNode>;
  tag?: string;
};
```
