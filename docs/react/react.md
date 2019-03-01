
# React 知识图谱

* class -> className
* onclick -> onClick

## React组件形式
总共有三种：React.createClass, class 和 Stateless Functional Component。React.createClass是ES5形式，不推荐使用。推荐使用Stateless Functional Component，保持简洁和无状态，没有this作用域，没有生命周期，是pure function。
``` js
// 1. Stateless Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 2. ES6 class
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## React 类型检查

在ES7中，可以使用[Property initializers](https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html#es7-property-initializers)特性
``` js
// // 单独的propTypes库
// Buttons.propTypes = {
//   index: propTypes.number.isRequired,
//   total: propTypes.number.isRequired,
//   prevHandler: propTypes.func,
//   nextHandler: propTypes.func
// }

// Buttons.defaultProps = {
//     total: 123
// }

// or
// ES7属性初始化方式。static是类的静态属性，不会被实例继承
class Button extends Component {
    static defaultProps = {
        class: 'button-private'
    }

    static propTypes = {
        class: PropTypes.string,
        onClick: PropTypes.func
    }
}
```

## React State
``` js
class ColorBox extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = { color: 'red' }
    // }
    // or
    // ES7特性写法,实例属性
    state = { color: 'red' }

    getColor() {
        return this.state.color
    }

    render() {
        return <div>
            this is test - {this.getColor()}
        </div>
    }
}
```

## Component this问题
``` js
class Button extends Component {
    static propTypes = {
        onClick: PropTypes.func
    }

    // 函数方法需要在render中bind(this)
    // handleClick(e) {
    //     const { onClick } = this.props
    //     onClick && this.props.onClick(e)
    // }

    // render() {
    //     return <div onClick=     {this.handleClick.bind(this)}>{this.props.children}</div>
    // }
    // or
    // 箭头函数绑定了this
    handleClick = (e) => {
        const { onClick } = this.props
        onClick && this.props.onClick(e)
    }

    render() {
        return <div onClick={this.handleClick}>{this.props.children}</div>
    }
}
```

## ES6解构以及扩展
``` js
class AutoloadingPostsGrid extends React.Component {
  render() {
    const {
      className,
      ...others,  // contains all properties of this.props except for className
    } = this.props;
    return (
      <div className={className}>
        <PostsGrid {...others} />
        <button onClick={this.handleLoadMoreClick}>Load more</button>
      </div>
    );
  }
}

// with arrow function
const App = ({className, ...rest}) => (
  <div className={classnames(className)} {...rest}>
    <MyComponent />
  </div>
);
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

## React生命周期
![](https://user-images.githubusercontent.com/20860159/29051854-318bdb44-7c18-11e7-918c-a51f5e96fde4.png)

## React-Router V4

``` js
// v4版本从 react-router-dom 中导入它，并且不再推荐集中式管理路由
// <Switch> 来启用排他路由
import { BrowserRouter, Route } from 'react-router-dom'

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
)

const HomePage =() => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

render(<App />, document.getElementById('root'))
```

``` js
// Link相当于a标签
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
    render() {
       return (
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/members">Members</Link></li>
          </ul>
        </nav>
       );
  }
}
```

## React-Redux
``` js
// yarn add redux react-redux react-thunk
// store - reducers - action
import { Provider } from 'react-redux'
import store from './store'

let render = Components => {
    let App = () => (
        <Provider store={store}>
            <Components />
        </Provider>
    )
    ReactDOM.render(<App />, document.getElementById('root'))
}
render(RouteConfig)
```

``` js
// 设置reducer的方式，都能达到state.demo.XXX state.home.XXX方式

// 1. export default (state, action) =>{}方式(一个文件导出default reducer)
import { createStore, combineReducers, applyMiddleware } from 'redux'
import home from './home/reducer'
import demo from './demo/reducer'
import thunk from 'redux-thunk'

let store = createStore(combineReducers({ demo, home }), applyMiddleware(thunk))

export default store

//2. export const demo = (state, action) =>{}方式(一个文件能导出多个reducer)
// export const home = (state, action) =>{}方式
import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as allReducer from './demo/reducer' // 导出就是个object对象
import thunk from 'redux-thunk'

let store = createStore(combineReducers({ ...allReducer }), applyMiddleware(thunk))

export default store
```

``` js
// react-redux in page
import {loadMember, uiInputMember, saveMember, ...} from '...actions'

const mapStateToProps = (state) => {
    return {
      member: state.member.member
      ,errors : state.member.errors
      ,saveCompleted : state.member.saveCompleted
    }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadMember: (id : number) => {return dispatch(loadMember(id))}
//     ,fireFieldValueChanged: (fieldName : string, value : any) => {return dispatch(uiInputMember(fieldName, value))}
//     ,saveMember: (member: MemberEntity) =>  {return dispatch(saveMember(member))}
//   }
// }
// or
// 如果不重命名可以写为object。原理是调用bindActionCreators
const mapDispatchToProps = {loadMember, uiInputMember, saveMember, ...}

export default connect(mapStateToProps,mapDispatchToProps)(MemberPage)
```

## 参考文章
* [ReactJS and ES7+](https://medium.com/@fakiolinho/reactjs-and-es7-bbedb9862e61)
* [Use Property Initializers for Cleaner React Components](https://www.fullstackreact.com/articles/use-property-initializers-for-cleaner-react-components/)
* [react-redux Connect: Dispatching Actions with mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-the-mapdispatchtoprops-function-with-bindactioncreators)