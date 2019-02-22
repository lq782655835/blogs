
# React
个人认为，React核心思想是万物皆是函数，一个入参，一个出参。入参既可以是传统的string、number、function，也可以是一个html或者css，或者是顶层的React组件。

## React定义组件

``` js
// Function and Class Components
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// ES6 class
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## React 类型检查

``` js
// 单独的propTypes库
Buttons.propTypes = {
  index: propTypes.number.isRequired,
  total: propTypes.number.isRequired,
  prevHandler: propTypes.func,
  nextHandler: propTypes.func
}
```

## React css in js

``` js
// className
var Button = React.createClass({
  // ...
  render () {
    var btnClass = 'btn';
    if (this.state.isPressed) btnClass += ' btn-pressed';
    else if (this.state.isHovered) btnClass += ' btn-over';
    return <button className={btnClass}>{this.props.label}</button>;
  }
});

// style
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
> 推荐[classnames](https://github.com/JedWatson/classnames)包配合