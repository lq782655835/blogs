componentWillMount，render，componentDidMount 都是在 mountComponent 中被调用


ReactElement
数据类，只包含 props refs key 等
由 React.creatElement(ReactElement.js) 创建，React.createClass 中 render 中返回的实际也是个 ReactElement

ReactComponent
控制类，包含组件状态，操作方法等
包括字符组件、原生 DOM 组件、自定义组件(和空组件)