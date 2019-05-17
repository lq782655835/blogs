# Vue与React比较
React核心思想，是把UI作为Basic Type，比如String、Array类型，然后经过render处理，转换为另外一个value。这就注定了React有更好的测试性和稳定性，非常适合构建大型项目。而Vue更偏向于简单迅速的解决问题，更灵活，不那么严格遵循条条框框。

React和Vue的设计思路不一样，不代表着React/Vue框架只能做对应部分应用。笔者两个框架都曾应用在不同项目中，React和Vue都能承接技术选型，关键看团队技术栈成熟度以及业务实际情况。

## 相同

* 都是视图层，都是挂载在指定id后渲染html
* 都是使用VNode（虚拟dom），所以都可以使用jsx语法，因为底层解析后都是createElement(...options)
    * jsx/tsx只是把template换成render函数，以前的v-for，v-if语法都换成jsx的语法
* 轻量级/响应式组件/易于集成路由工具，打包工具以及状态管理工具
* 服务器端渲染/优秀的支持和社区

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

## 各自优势

Vue
* 模板和渲染函数的弹性选择
* 简单的语法及项目创建
* 更快的渲染速度和更小的体积

React
* 更适用于大型应用和更好的可测试性
* 同时适用于Web端和原生App
* 更大的生态圈带来的更多支持和工具

## 如何选择
* 如果你喜欢用（或希望能够用）模板搭建应用，请使用Vue
* 如果你喜欢简单和“能用就行”的东西，请使用Vue
* 如果你的应用需要尽可能的小和快，请使用Vue
* 如果你计划构建一个大型应用程序，请使用React
* 如果你想要一个同时适用于Web端和原生App的框架，请选React
* 如果你想要最大的生态圈，请使用React
* 如果你已经对其中一个用得满意了，就没有必要换了
