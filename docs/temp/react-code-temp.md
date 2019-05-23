componentWillMount，render，componentDidMount 都是在 mountComponent 中被调用


ReactElement
数据类，只包含 props refs key 等
由 React.creatElement(ReactElement.js) 创建，React.createClass 中 render 中返回的实际也是个 ReactElement

ReactComponent
控制类，包含组件状态，操作方法等
包括字符组件、原生 DOM 组件、自定义组件(和空组件)


函数式组件与基于Class声明的组件相比，其具有以下特性:

* 不需要声明类，可以避免大量的譬如extends或者constructor这样的代码

* 不需要显示声明this关键字，在ES6的类声明中往往需要将函数的this关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定:

* 应当避免在底层的展示性组件中混入对于状态的管理，而应该将状态托管于某个高阶组件或者其他的状态容器中。利用函数式声明组件可以彻底保证不会在组件中进行状态操作。

* 易于理解与测试

* 更佳的性能表现:因为函数式组件中并不需要进行生命周期的管理与状态管理，因此React并不需要进行某些特定的检查或者内存分配，从而保证了更好地性能表现。


// 无状态的组件函数中，访问Context:
``` js
const Text = (props, context) =>
  <p style={context}>props.children</p>;
Text.contextTypes = {
  fontFamily: React.PropTypes.string
};
class App extends React.Component {
  static childContextTypes = {
    fontFamily: React.PropTypes.string
  }
  getChildContext() {
    return {
      fontFamily: 'Helvetica Neue'
    };
  }
  render() {
    return <Text>Hello World</Text>;
  }
}
```


官方给出的 React 的定义是：

A JavaScript library for building user interfaces.

即专注于构建 View 层的一个库。React 的核心开发者之一的 Sebastian Markbåge 认为：

UI 只是把数据通过映射关系变成另一种形式的数据。给定相同的输入（数据）必然会有相同的输出（UI），即一个简单的纯函数。
React 中的函数式思想的具体体现

虽说 View 层可以当成是数据的另外一种展现形式，但在实际的 React 开发中，除了数据的展示以外，更重要的是还有数据的交互，举个栗子：

这个一个典型的渲染列表的栗子，在这个栗子中除了渲染 PostList 外，还进行了数据的获取和事件的操作，也就意味着这个 PostList 组件不是一个「纯函数」。严格意义上来说这个组件还不是一个可复用的组件，比如说有这样一种业务场景，除了首页有 PostList 组件以外，在个人页面同样有个 PostList 组件，UI 一致但是交互逻辑不一致，这种情况下就无法复用首页的 PostList 组件了。为了解决这个问题，我们可以再次抽离一个真正意义上可复用的 View 层，它有一下几个特点：

给定相同的数据（由父组件通过 props 传递给子组件且是唯一数据来源），总是渲染相同的 UI 界面；
组件你内部不改变数据状态；
不处理交互逻辑。

* [React 中的函数式思想](https://justclear.github.io/functional-in-react/)