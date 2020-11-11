
# redux-sage

## 为什么要有redux-sage？

为了统一处理redux-thunk带来的副作用。redux-thunk最大的问题是：`redux可以接受函数作为action`，但是函数的内部可以多种多样。当action内足够复杂时（副作用多），action太分散过多，不易维护。
action不易维护的原因：
1.action的形式不统一
2.就是异步操作太为分散，分散在了各个action中

如何优雅处理这个问题呢？redux-sage。redux-saga是一个用于管理redux应用异步操作的中间件，redux-saga通过创建sagas将所有异步操作逻辑收集在一个地方集中处理，可以用来代替redux-thunk中间件。

redux-saga中最大的特点就是提供了声明式的Effect，声明式的Effect使得redux-saga监听原始js Object形式的action（跟同步一致），并且可以方便单元测试，我们一一来看。

## 第一个例子

``` js
function asyncAction(data) {
    return dispatch => fetch(xxx, data)
        .then(data =>  dispatch({ type: 'SUCCESSED', data }))
        .catch(err => dispatch({ type: 'ERROR', err }))
}
this.props.dispatch(asyncAction(data))
```

同等效果的redux-sage写法：
``` js
function* fetchUser(action) {
    try {
        let data = yield call(fetch, ...action)
        yield put({ type: 'SUCCESSED', data })
    } catch(err) {
        yield put({ type: 'ERROR', err })
    }
}

export default function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

// 像同步dispatch一样调用
this.props.dispatch({ type: 'USER_FETCH_REQUESTED', data})
```

## Effect提供的具体方法、

* take: 这个方法，是用来监听action，返回的是监听到的action对象
* call: call方法传入的函数fn可以是普通函数，也可以是generator。call方法应用很广泛，在redux-saga中使用异步请求等常用call方法来实现。
* put({ type: 'reducerName' }): put对应与redux中的dispatch。// 触发同步的reducer
* select(): select方法对应的是redux中的getState
* fork: fork方法相当于web work，fork方法不会阻塞主线程，在非阻塞调用中十分有用
* takeEvery和takeLatest：takeEvery和takeLatest用于监听相应的action并执行相应的方法，是构建在take和fork上面的高阶api，比如要监听某个或者某几个action

## redux-saga获取异步数据实际操作

### 安装redux saga

``` js
yarn add redux-saga 
```

### 引入redux sage

``` js
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; //引入生成中间件的工厂函数
import createSagaMiddleware from 'redux-saga';//引入saga

import mySaga from './saga.js'; //新建一个文件，在这个文件中编写saga
import todos from './reducer/reducer';
const sagaMiddleware = createSagaMiddleware();//生成saga实例
const store = createStore(todos, applyMiddleware(sagaMiddleware));//将saga注入store

sagaMiddleware.run(mySaga); // 监听副作用
```

### ui组件触发action创建函数

``` js
class Saga extends Component {
    handleClickGet = () => {
      // 像同步一样
      this.props.dispatch({type: 'GET_DATA'});
    }
    render () {
        let {num} = this.props.state;
        return (
            <div className="saga"  onClick={this.handleClickGet}>
              异步
            </div>
        )
    }
}
```

### 新建并编写saga文件 --> 捕获action创建函数返回的action

``` js
import { call, put, takeEvery } from 'redux-saga/effects'; // 引入相关函数

function* getGitData(action) { // 参数是action创建函数返回的action
    const fn = function() {
        return fetch(`https://api.github.com/users/github`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(res => {
                return res
            })
    }
    const res = yield call(fn) // 执行p函数，返回值赋值给res

    yield put({ // dispatch一个action到reducer， payload是请求返回的数据
        type: 'GET_DATA_SUCCESS',
        payload: res
    })
}

// 在store.js中，执行了 sagaMiddleware.run(rootSaga)
function* rootSaga() {
    yield takeEvery('GET_DATA', getGitData) // 如果有对应type的action触发，就执行goAge()函数
    // 可以监听更多...
}

export default rootSaga; // 导出rootSaga，被store.js文件import并run执行
```

## 例子
``` js
*login(action, { call, put }) {
    yield put({
    type: 'signin',
    });
    yield put(routerRedux.push('/admin'));
}
```

``` js
// dva model中定义
*remove({ payload: id }, { call, put }) {
    yield call(usersService.remove, id);
    yield put({ type: 'reload' });
},
// 使用
props.dispatch({
      type: 'users/remove',
      payload: id,
    });
```

## 参考

* https://www.jianshu.com/p/6516ec44fd38
* https://github.com/redux-saga/redux-saga-beginner-tutorial/blob/sagas/sagas.js


