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


## 不同

* `思想不同`。react思路是函数式，推崇纯组件，数据不可变，单向数据流；vue是数据可变的，双向绑定。这是react和vue不同的核心，所以导致了两者的写法以及渲染有些不同，如以下：
    1. `源码实现不同`。Vue源码实现是把options挂载到Vue核心类上，然后再new Vue({options})拿到实例（vue组件的script导出的是一个挂满options的纯对象而已）。
        * `组件引入`。React中通过import引入相应组件，然后在render中直接使用；Vue组件分为全局注册和局部注册，在局部注册中，除了引入相应组件，还需要再需要设置下options.components，因为需要把options.component挂载到vm.prototype.options.components上（有个中转）。
        * `HOC 和 mixins`。React 的组件是一个纯粹的函数；Vue中组件是一个被包装的函数，并不简单的就是我们定义组件的时候传入的对象或者函数。 HOC 相对于 mixin，更接近函数式编程。
    2. `写法自由度`。React组件都在继承自ReactComponent类（extend ReactComponent），除了state、生命周期和render函数外，写法较为自由（特别JSX可以赋能js逻辑到render中）；Vue组件设置最终都是挂载在Vue这个核心类上，所以API上需要固定的写data、computed、methods、watch等这些options（JSX也免不了这些，JSX只是为了代替render函数中琐碎的createElement，使用render函数代替lecomponents/directives/filters选项）。所以`React官方推荐JSX、Vue官方推荐template模板。`
        * Vue模板多了**指令系统/过滤**，可以实现更丰富的功能，使用更友好；而React使用JSX语法代替v-for/v-if等，更灵活；
        * React推崇all in js，在js中写入className；Vue把html/js/css写在一个.vue文件中（有点webComponent雏形）。

* `数据机制不同`。Vue使用Object.defineProperty()进行双向数据绑定;React使用state状态机机制。
    1. `状态管理 VS 对象属性`。React在state状态管理存储数据的，不能修改数据，修改数据在setState中(setState是异步的)。Vue中，数据由data属性在Vue对象中进行管理。
        * Vue增加的语法糖**computed和watch**，而在React中需要自己写一套逻辑来实现；
    2. `状态管理库Vuex vs Redux`。vuex的mutation是直接改变的原始数据，而redux的reducer是返回一个全新的state
    3. `变化侦测，组件依赖追踪`。在 React中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。如要避免不必要的子组件的重渲染，你需要在所有可能的地方使用 PureComponent，或是手动实现 shouldComponentUpdate 方法。Vue中双向数据绑定，组件的依赖是在渲染过程中自动追踪的。

* `VNode数据结构不同`
    1. `props含义不同`。React中父子之间传递的所有数据都是属性，即所有数据均挂载在props下（style, className, children, value， onChange等等）。Vue仅仅属性就有三种：组件属性props，普通html属性attrs，Dom属性domProps。同样事件属性也分了两种：on nativeOn
    2. `event机制不同`，Vue使用$emit/$on,React使用props
