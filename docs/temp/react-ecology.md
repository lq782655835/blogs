# React生态

## React思想

相比于使用模版语言的Vue、Angular，使用原生js（JSX仅仅是js的语法糖）开发UI的React在语法层面有更多灵活性。

然而，高灵活性意味着高不确定性。考虑如下Vue模版语句：

``` js
<template>
    <ul>
        <li>0</li>
        <li>{{ name }}</li>
        <li>2</li>
        <li>3</li>
    </ul>
</template>
```

当编译时，由于模版语法的约束，Vue可以明确知道在li中，只有name是变量，这可以提供一些优化线索。

而在React中，以上代码可以写成如下JSX：

``` js
function App({name}) {
    const children = [];
    for (let i = 0; i < 4; i++) {
        children.push(<li>{i === 1 ? name : i}</li>)
    }
    return <ul>{children}</ul>
}
```

由于语法的灵活，在编译时无法区分可能变化的部分。所以在运行时，React需要遍历每个li，判断其数据是否更新。

基于以上原因，相比于Vue、Angular，缺少编译时优化手段的React为了速度快需要在运行时做出更多努力。

* 使用PureComponent或React.memo构建组件
* 使用shouldComponentUpdate生命周期钩子
* 渲染列表时使用key
* 使用useCallback和useMemo缓存函数和变量

由开发者来显式的告诉React哪些组件不需要重复计算、可以复用。


## umi

`umi = dva（model、router/fetch）+ 约定model/约定router + ui组件`

umi案例：
* 使用umi的curd： https://github.com/dvajs/dva/blob/master/examples/user-dashboard/src/pages/users/page.js
* umi中使用dva：https://github.com/umijs/umi-examples/blob/master/with-dva/src/pages/list/index.js
* antd-admin完整项目：https://github.com/zuiidea/antd-admin/

umi目录数据结构：
```js
* src
    * layouts
        * index.js // 布局
    * models
        * gloabl.js // 全局model注册
    * pages
        * index.js // 主页面
        * login    // login页面
            * index.js
            * model.js // 页面内model注册
* .umirc.js // umi配置文件，包括设置 plugin + webpack
```

官方文档：
* router约定：https://umijs.org/zh/guide/router.html#%E7%BA%A6%E5%AE%9A%E5%BC%8F%E8%B7%AF%E7%94%B1
* model约定（在umi中使用dva）：https://umijs.org/zh/guide/with-dva.html#model-%E6%B3%A8%E5%86%8C

``` js
// src/models/global.js
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',
  state: {
    text: 'hello umi+dva',
    login: false,
  },
  reducers: {
    setText(state, , { payload }) {
      return {
        ...state,
        text: 'setted dva',
      };
    },
    signin(state) {
      return {
        ...state,
        login: true,
      };
    },
  },
  effects: {
    *login(action, { call, put }) {
      yield put({
        type: 'signin',
      });
      yield put(routerRedux.push('/admin'));
    },
    *throwError() {
      throw new Error('hi error');
    },
  },
};
```

使用：

``` js
import { connect } from 'dva';
import router from 'umi/router';

function App(props) {
    const { pathname, text, a, b } = props
    const onClick = () => props.dispatch({ type: 'global/login' })
    return <div></div>
}
export default connect(state => {
  return {
    pathname: state.routing.location.pathname, // 默认集成router信息
    text: state.global.text,
    a: state.a,
    b: state.b,
  };
})(App);
```

### 其他API

``` js
import router from 'umi/router';
router.goBack();
router.push({
    pathname: "/extinfo",
    query: { id: 123 }
});

import Redirect from 'umi/redirect';
<Redirect to="/login" />

import Link from "umi/link";
<Link to={{
        pathname: "/extinfo",
        search: "?test=123"
    }}
    >
    <Item>链接跳转</Item>
</Link>
```

## dva

dva 首先是一个`基于 redux 和 redux-saga 的数据流方案`，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

`dva在redux-sage基础上再做简化`。仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API。

dva演进史：https://dvajs.com/guide/fig-show.html#%E7%A4%BA%E4%BE%8B%E8%83%8C%E6%99%AF

> dva可看作一个跟redux的状态流。dva = 单文件model + redux-sage

``` js
// 1. 定义model ./models/products 详细案例可看：https://stackblitz.com/edit/dva-example-count
export default {
  namespace: 'products',
  state: [],
  reducers: {
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};

// 2. 加载进app
const app = dva();
app.model(require('./models/products').default);

// 3. connect使用
const Products = (props) => [
    const { products } = props
    const onClick = () => props.dispatch({type: 'products/delete'})
    return <div></div>
]
export default connect(state => ({
  products: state.products,
}))(Products);
```

* namespace 表示在全局 state 上的 key
* state 是初始值，在这里是空数组
* reducers 等同于 redux 里的 reducer，接收 action，同步更新 state

### 其他API

``` js
import { connect } from 'dva'; // 同redux connect

import { routerRedux } from 'dva/router';
routerRedux.push({
        pathname: '/users',
        query: { page },
      })
```




## React 思想

React15架构可以分为两层：

* Reconciler（协调器）—— 负责找出变化的组件
    * Reconciler会做如下工作：
        * 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
        * 将虚拟DOM和上次更新时的虚拟DOM对比
        * 通过对比找出本次更新中变化的虚拟DOM
        * 通知Renderer将变化的虚拟DOM渲染到页面上
* Renderer（渲染器）—— 负责将变化的组件渲染到页面上
    * React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在浏览器环境渲染的Renderer —— ReactDOM

### React15架构的缺点

一旦开始更新，无法停下，递归stack调用更新组件

主流的浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。我们知道，JS可以操作DOM，GUI渲染线程与JS线程是互斥的。所以JS脚本执行和浏览器布局、绘制不能同时执行。当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行样式布局和样式绘制了。

`解决办法——用可中断的异步更新代替同步的更新`。更多React15重写的原因：https://react.iamkasong.com/preparation/oldConstructure.html#react15%E6%9E%B6%E6%9E%84%E7%9A%84%E7%BC%BA%E7%82%B9

### React16

React16架构可以分为三层：

* Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
* Reconciler（协调器）—— 负责找出变化的组件
* Renderer（渲染器）—— 负责将变化的组件渲染到页面上