# React/Vue源码总结

本文是一篇从源码对React和Vue分析的总结文，主要以思维导图形式进行说明。

### Vue整体流程图

![image](https://user-images.githubusercontent.com/6310131/58315972-1dd74080-7e45-11e9-94bc-b494d41ae61c.png)

### React整体流程图

![image](https://user-images.githubusercontent.com/6310131/58316112-6b53ad80-7e45-11e9-8b2a-d31bfaf269aa.png)

说明：以下表述中，VNode代表虚拟DOM（即VDOM）。受限于屏幕大小，部分截图不全，建议在github下载思维导图源文件。

## React/Vue异同对比

宏观层面看两者的相同以及不同

![image](https://user-images.githubusercontent.com/6310131/58308591-908bf000-7e34-11e9-86f0-8b99b1620a44.png)

## React/Vue更新渲染对比

两者流程思维上基本相似，都是基于两个假设（使得算法复杂度降为O(n)）：
1. `不同的组件产生不同的 DOM 结构`（源码中依据是React-VNode.type,Vue-VNode.tag）。对应DOM操作就是直接销毁老的DOM，创建新的DOM。
2. `同一层次的一组子节点，可以通过唯一的 key 区分`。

但两者源码实现上有区别：
#### 1. `实现细节不同`

两者都大量使用了递归，但React主要使用了[四大组件类](./react-code-2.component.md)包装VNode，不同类型的VNode使用相应的组件类处理，职责划分更好（同时也意味者找代码更复杂）。Vue统一使用patchVNode()函数作为入口，内部if/else较多。

#### 2. `组件实例实现不同`。

当VNode节点是自定义组件时，是没有子VNode的，因为子VNode是通过组件实例的render()方法临时拿到的。这也是为什么React/Vue自定义组件时，一定需要render()函数(函数组件只是React内部使用Stateless类包装了render函数)，并且函数需要返回VNode（React JSX或Vue JSX/模板都是语法糖，编译后都是VNode）。

为了拿到组件的子VNode，就需要实例化组件，这样才能调用到render()函数。众所周知，React组件是一个继承React.Component的类，而Vue只是包含一些options的对象。所以`React组件内部是直接通过new VNode.type()`获得组件实例，而Vue需要使用Vue包装下，把options挂载到Vue.prototype.$options上，options.components处理挂载到VNode.componentOptions.Ctor上，最终通过`new VNode.componentOptions.Ctor()获得Vue组件实例`。这也是Vue和React本质不同之一。

![image](https://user-images.githubusercontent.com/6310131/58312027-04ca9180-7e3d-11e9-9099-786694da7c38.png)

## React/Vue diff算法不同

React主要使用diff队列保存需要更新哪些DOM，再统一操作；Vue使用双向数据链表，一边patch，一边更新DOM。

![image](https://user-images.githubusercontent.com/6310131/58315009-41998700-7e43-11e9-8c52-438adad9b23b.png)
