# 虚拟dom算法库 - snabbdom

[snabbdom](https://github.com/snabbdom/snabbdom)是一个虚拟dom算法库，它的特点是效率高、可扩展，Vue 虚拟DOM就是基于该库进行改造。snabbdom核心代码就几百行，但里面的一些设计非常优秀。

## 基本使用

``` js
var snabbdom = require('snabbdom');
// 选择modules（可以理解为插件），返回patch方法
var patch = snabbdom.init([、
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);

var h = require('snabbdom/h').default; // 帮助创建vnode实例
var container = document.getElementById('container');
var vnode = h('div#container.two.classes', {on: {click: someFn}}, [
  h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
  ' and this is just normal text',
  h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
]);

// vnode挂载到指定container下
patch(container, vnode);

var newVnode = h('div#container.two.classes', {on: {click: anotherEventHandler}}, [
  h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}}, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
]);
// 对比vnode，并更新node
patch(vnode, newVnode);
```

## 基本数据结构

``` js
// VNode数据结构
export interface VNode {
  sel: string | undefined; // 选择器
  data: VNodeData | undefined; // 保存属性、样式、事件等
  children: Array<VNode | string> | undefined; //  子节点
  elm: Node | undefined; //  对应的真实dom节点
  text: string | undefined; //  文本节点
  key: Key | undefined; // 唯一key
}

// VNodeData数据格式
export interface VNodeData {
  props?: Props; // 设置el对象上属性，不会反馈到html标签上
  attrs?: Attrs; // 设置el上的atrrs，会反馈到html标签上
  class?: Classes; // css class
  style?: VNodeStyle; // css style
  dataset?: Dataset; // html dataset
  on?: On; // 事件
  hero?: Hero;
  attachData?: AttachData;
  hook?: Hooks;
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: Array<any>; // for thunks
  [key: string]: any; // for any other 3rd party module
}
```

## 核心源码

`在初始化init时，注入一些内置的modules模块`，比如处理dom event的eventlisteners.ts、处理html class的class.ts。往后在虚拟DOM patch时，会在合适的时间触发modules的回调函数。内置的modules源码都放在src/modules文件夹下。

初始化init返回patch方法，帮助diff vdom并更新真实的dom，它分两种参数传递：
1. `参数传递Node和VNode`。此时会把VNode渲染成真实的DOM并插入到Node节点里面。
2. `参数传递VNode和VNode`。如果两者VNode不等（此时的不等理解为：oldVNode.key !== newNode.key || oldVNode.sel !== newNode.sel），则参照上面规则：新的DOM插入以及老的DOM销毁。如果两者VNode相等，则需要diff vdom，详细看下面。

src/snabbdom.ts：

``` js
const hooks: (keyof Module)[] = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

export function init(modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  /**
  init绑定module hooks事件，并等待patch时，在合适时间触发
  cbs = {
      create: [styleCreateHook, eventCreateHook, ...],
      update: [styleUpateHook, eventUpateHook, ...]
  }
  **/
  let i: number, j: number, cbs = ({} as ModuleHooks);
  const api: DOMAPI = htmlDomApi;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      const hook = modules[j][hooks[i]]; // modules中定义的hook
      if (hook !== undefined) {
        (cbs[hooks[i]] as Array<any>).push(hook);
      }
    }
  }

  return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node;
    const insertedVnodeQueue: VNodeQueue = [];
    // pre 前置回调函数执行
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    // 为Element时
    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    }

    if (sameVnode(oldVnode, vnode)) {
      // 当是相同Vnode时，patch更新（涉及到diff算法）
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      // 不相同的Vnode时，直接利用新的 Vnode 创建对应的真实 DOM 节点，然后移除旧的 Vnode 所代表的真实 DOM 节点
      elm = oldVnode.elm as Node;
      parent = api.parentNode(elm);

      // 根据 vnode 创建新的真实 DOM 节点，绑定到vnode.elm上。
      // create事件回调在此发生
      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        // 插入并替换原有 DOM 节点
        api.insertBefore(parent, vnode.elm as Node, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0); // destroy事件回调再此发生
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      (((insertedVnodeQueue[i].data as VNodeData).hook as Hooks).insert as any)(insertedVnodeQueue[i]);
    }

    // post 后置回调都执行
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}
```

`虚拟dom的diff有个前提：diff只发生在相同的层级。`基于这个假设，我们可以 按照层级分解树，这大大简化了复杂度，大到接近 O(n) 的复杂度。

当两个vnode相同（key和sel没变），对比两个vnode进行patch更新。当是简单节点（如文本节点时）或者VNode新增删除时，只需要实现对应DOM操作即可。当需要两个VNode对比时，就会复杂的多。

``` js
// 更新dom
// 主要是根据vnode，去改变oldVnode对应的DOM，最大程度复用已存在的DOM
function patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    // 保存旧 vnode 的 DOM 引用
    const elm = vnode.elm = (oldVnode.elm as Node);
    let oldCh = oldVnode.children;
    let ch = vnode.children;

    // 如果新的 vnode 节点不是一个文本节点
    if (isUndef(vnode.text)) {
      // 如果两个 vnode 节点都有子节点
      if (isDef(oldCh) && isDef(ch)) {
        // @important 并且子节点不一样，开始 diff
        if (oldCh !== ch) updateChildren(elm, oldCh as Array<VNode>, ch as Array<VNode>, insertedVnodeQueue);
      } else if (isDef(ch)) {
        // 如果只有新的 vnode 有子节点，设置旧的 vnode 的内容为空
        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
        // 添加插入新的 DOM 节点
        addVnodes(elm, null, ch as Array<VNode>, 0, (ch as Array<VNode>).length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        // 如果只有旧的 vnode 有子节点，则移除所有子节点
        removeVnodes(elm, oldCh as Array<VNode>, 0, (oldCh as Array<VNode>).length - 1);
      } else if (isDef(oldVnode.text)) {
        // 如果旧 vnode 是个文本节点，并且新 vnode 也没有子节点，则清空旧 vnode 的内容
        api.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      // 如果新的 vnode 节点是文本节点，如果文本内容和旧 vnode 不一样则设置新的值
      api.setTextContent(elm, vnode.text as string);
    }
  }
```

对于 children （数组）的比较，因为同层是很可能有移动的，顺序比较会无法最大化复用已有的 DOM。所以`snabbdom的vnode有 key 字断，用来追踪这种顺序变动。`

最复杂的是两个vnode相同（key和sel相同），同时两者的子节点children不一样，这也是现实场景中最常出现的情况。snabbdom最核心的dom diff算法在`updateChildren`方法中。

``` js
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
  let oldStartIdx = 0, newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx
  let idxInOld
  let elmToMove
  let before

  // 遍历 oldCh 和 newCh 来比较和更新
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 1⃣️ 首先检查 4 种情况，保证 oldStart/oldEnd/newStart/newEnd
    // 这 4 个 vnode 非空，左侧的 vnode 为空就右移下标，右侧的 vnode 为空就左移 下标。
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    }
    /**
     * 2⃣️ 然后 oldStartVnode/oldEndVnode/newStartVnode/newEndVnode 两两比较，
     * 对有相同 vnode 的 4 种情况执行对应的 patch 逻辑。
     * - 如果同 start 或同 end 的两个 vnode 是相同的（情况 1 和 2），
     *   说明不用移动实际 dom，直接更新 dom 属性／children 即可；
     * - 如果 start 和 end 两个 vnode 相同（情况 3 和 4），
     *   那说明发生了 vnode 的移动，同理我们也要移动 dom。
     */
    // 1. 如果 oldStartVnode 和 newStartVnode 相同（key相同），执行 patch
    else if (isSameVnode(oldStartVnode, newStartVnode)) {
      // 不需要移动 dom
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    }
    // 2. 如果 oldEndVnode 和 newEndVnode 相同，执行 patch
    else if (isSameVnode(oldEndVnode, newEndVnode)) {
      // 不需要移动 dom
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    }
    // 3. 如果 oldStartVnode 和 newEndVnode 相同，执行 patch
    else if (isSameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
      // 把获得更新后的 (oldStartVnode/newEndVnode) 的 dom 右移，移动到
      // oldEndVnode 对应的 dom 的右边。为什么这么右移？
      // （1）oldStartVnode 和 newEndVnode 相同，显然是 vnode 右移了。
      // （2）若 while 循环刚开始，那移到 oldEndVnode.elm 右边就是最右边，是合理的；
      // （3）若循环不是刚开始，因为比较过程是两头向中间，那么两头的 dom 的位置已经是
      //     合理的了，移动到 oldEndVnode.elm 右边是正确的位置；
      // （4）记住，oldVnode 和 vnode 是相同的才 patch，且 oldVnode 自己对应的 dom
      //     总是已经存在的，vnode 的 dom 是不存在的，直接复用 oldVnode 对应的 dom。
      api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    }
    // 4. 如果 oldEndVnode 和 newStartVnode 相同，执行 patch
    else if (isSameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
      // 这里是左移更新后的 dom，原因参考上面的右移。
      api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    }

    // 3⃣️ 最后一种情况：4 个 vnode 都不相同，那么我们就要
    // 1. 从 oldCh 数组建立 key --> index 的 map。
    // 2. 只处理 newStartVnode （简化逻辑，有循环我们最终还是会处理到所有 vnode），
    //    以它的 key 从上面的 map 里拿到 index；
    // 3. 如果 index 存在，那么说明有对应的 old vnode，patch 就好了；
    // 4. 如果 index 不存在，那么说明 newStartVnode 是全新的 vnode，直接
    //    创建对应的 dom 并插入。
    else {
      // 如果 oldKeyToIdx 不存在，创建 old children 中 vnode 的 key 到 index 的
      // 映射，方便我们之后通过 key 去拿下标。
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      }
      // 尝试通过 newStartVnode 的 key 去拿下标
      idxInOld = oldKeyToIdx[newStartVnode.key]
      // 下标不存在，说明 newStartVnode 是全新的 vnode。
      if (idxInOld == null) {
        // 那么为 newStartVnode 创建 dom 并插入到 oldStartVnode.elm 的前面。
        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
        newStartVnode = newCh[++newStartIdx]
      }
      // 下标存在，说明 old children 中有相同 key 的 vnode，
      else {
        elmToMove = oldCh[idxInOld]
        // 如果 type 不同，没办法，只能创建新 dom；
        if (elmToMove.type !== newStartVnode.type) {
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
        }
        // type 相同（且key相同），那么说明是相同的 vnode，执行 patch。
        else {
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
          oldCh[idxInOld] = undefined
          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm)
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
  }

  // 上面的循环结束后（循环条件有两个），处理可能的未处理到的 vnode。
  // 如果是 new vnodes 里有未处理的（oldStartIdx > oldEndIdx
  // 说明 old vnodes 先处理完毕）
  if (oldStartIdx > oldEndIdx) {
    before = newCh[newEndIdx+1] == null ? null : newCh[newEndIdx+1].elm
    addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
  }
  // 相反，如果 old vnodes 有未处理的，删除 （为处理 vnodes 对应的） 多余的 dom。
  else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
```

## 总结

两个假设：
1. 相同的节点类型，有相同DOM结构；不同的节点类型，不同DOM结构。
2. 同一层次的节点组，有唯一的key标识。

流程：
* 新旧两个VNode对比，如果两个相同(vnode1.key === vnode2.key && vnode1.sel === vnode2.sel)，vue中（a.key === b.key && a.tag === b.tag）
  * 如果是文字节点，更新文字即可
  * 非文字节点，判断子节点
    * 如果新老VNode都有子节点，需要使用双向链表处理两个Childrens
    * 如果只有新的子节点，增加子节点DOM
    * 如果只有旧的子节点，删除老的子节点
* 如果不同，增加新DOM，去除老DOM。