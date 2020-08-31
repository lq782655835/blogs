# Redux

1. Redux核心思想
1. Redux中间件原理
1. react-redux 使用方式
1. react-redux connect/Provider

## 1. redux核心思想

主旨：使用`全局的state`管理状态，`唯一能修改state的操作是dispatch action`，返回的新的state另外一个对象（纯函数）。

原则：1. 单个全局store 2. store只读 3. 修改只能是纯函数

对象：`1. `Store` 2. `Reducer`((state, action) => {return state} 纯函数对象) 3. `Action`（含有type的对象，如果是Action Creator，则是函数`）

``` js
import { createStore } from 'redux'

// reducer，纯函数。它展示一个action操作，如何把state转为下一个state
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)
// 订阅store改变
store.subscribe(() => console.log(store.getState()))

// 唯一的dispatch方式，改变内部state
// action本质：只是一个有type属性的Object对象
store.dispatch({ type: 'INCREMENT' }) // 1
store.dispatch({ type: 'INCREMENT' }) // 2
store.dispatch({ type: 'DECREMENT' }) // 1
```

### 1.1 redux核心API

* store = `createStore`(reducer, [preloadedState], [enhancer])
  * store.getState()
  * store.dispatch({type: xxx})
  * store.subscribe(cb)
* `combineReducers`
* `applyMiddleware`

### 1.2 redux createStore源码解析

这部分代码相对简单:

* `根据reducer创建store`
* `subscribe/dispatch是典型的监听者模式`，“subscribe监听、dispatch更新”

``` js
// https://github.com/reduxjs/redux/blob/master/src/createStore.ts
export default function createStore(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {
  // 重要：当有中间件时，返回包装后的store
  // enhancer = applyMiddleware(...middleware)
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(
      reducer,
      preloadedState as PreloadedState<S>
    ) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
  }

    // subscribe API:
    let currentListeners: (() => void)[] | null = []
    let nextListeners = currentListeners
    function subscribe(listener: () => void) {
        // 监听收集
        nextListeners.push(listener)
        return function unsubscribe() {
            ....
        }
    }

    // dispatch：
    let currentState = preloadedState as S
    let currentReducer = reducer // reduce纯函数
    function dispatch(action: A) {
        currentState = currentReducer(currentState, action) // reduce纯函数执行
        // 触发更新
        const listeners = (currentListeners = nextListeners)
        for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i]
          listener()
        }

        return action
    }

    // getState API:
    function getState(): S {
        return currentState as S
    }

    // 返回全局store
    const store = ({
        dispatch: dispatch as Dispatch<A>,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
    } as unknown) as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
    return store
}
```

### 1.3 combineReducers API

`把state区分为命名空间`

``` js
// https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// This would produce the following state object
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ...
  },
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}
```

TODO: 思考combineReducers源码如何把两个reducer纯函数，合并为一个纯函数？

## 2. redux中间件原理

Redux 的中间件提供的是位于 action 被发起之后，到达 reducer 之前的扩展点，换而言之，`原本 view -> action -> reducer -> store` 的数据流加上中间件后变成了 `view -> action -> middleware -> reducer -> store` ，在这一环节我们可以做一些 “副作用” 的操作，如 异步请求、打印日志等。

### 2.1 自定义第一个中间件

``` js
import { createStore, applyMiddleware } from 'redux'

function logger(store) {
  return next => action => {
    console.log('will dispatch', action)
    return next(action) // next = store.dispatch
  }ii
}

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger))
```

applyMiddleware的功能：改造dispatch函数，产生真假dispatch。中间件就是运行在假真dispatch之间的代码。

简版applyMiddleware实现：
``` js
const applyMiddleware = function(middleware){
  let next = store.dispatch;
  store.dispatch = middleware(store)(next);  // 这里传入store，是因为中间件中有可能会用到getState获取数据，比如打印当前用户等需求
}
```

### 2.2 中间件的串联融合

中间件的功能各不相同，它们都要融入到dispatch中，在派发action的时候，按照顺序一个个的执行，这是一个费脑经的事情。

假如现在我们有两个中间件 logger和collectError两个中间件函数，那么大概的执行顺序就是 dispatch——>logger改造——>collectError改造。这里我们能看到`后面的中间件需要接收到前面改造后的dispatch`。

在前面，我们是直接修改store.dispatch，现在我们换一种写法，`让每一个中间件函数，接收一个dispatch，然后返回一个改造后的dispatch，来作为下一个中间件函数的next`。

中间件写法：
``` js
const logger = store => next => action => {
  console.log('dispatching', action)
  return next(action)
}

const collectError = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Error!', err)
  }
}
```

改造一下applyMiddleware，来接收一个middlewares数组：

``` js
function applyMiddleware(...middlewares) {
  middlewares.reverse()

  let dispatch = store.dispatch // dispatch为一个函数
  // dispatch被中间件加工包装
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )
  return Object.assign({}, store, { dispatch })
}

// 从右到左依次执行中间件
applyMiddleware(collectError, logger)
```


### 2.3 applyMiddleware源码

根据上面createStore源码，当有中间件enhancer函数对象时: `createStore(reducer, applyMiddleware) = applyMiddleware(createStore)(reducer)`

applyMiddleware是为了得到一个`加强版的 store`。`applyMiddleware 改写了 store 的 dispatch 方法`，新的 dispatch 即是被所传入的中间件包装过的。

``` js
// https://github.com/reduxjs/redux/blob/master/src/applyMiddleware.ts
// 返回加强版store
// 注意：dispatch是经过中间件包装后的dispatch
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    // 接收 createStore 参数
    var store = createStore(reducer, preloadedState)
    var dispatch = store.dispatch
    var chain = []

    // 传递给中间件的参数
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }

    // 注册中间件调用链，并由此可知，所有的中间件最外层函数接收的参数都是{getState,dispatch}
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    //compose 函数起到代码组合的作用：compose(f, g, h)(...args) 效果等同于 f(g(h(...args)))，具体实现可参见附录。从此也可见：所有的中间件最二层函数接收的参数为 dispatch，一般我们在定义中间件时这个形参不叫 dispatch 而叫 next，是由于此时的 dispatch 不一定是原始 store.dispatch，有可能是被包装过的新的 dispatch。
    dispatch = compose(...chain)(store.dispatch)

    // 返回经 middlewares 增强后的 createStore
    return {
      ...store,
      dispatch
    }
  }
}
```

### 2.4 redux-thunk异步中间件原理

理解上面原理，就很好理解redux-thunk的源码了。当需要异步操作时，`action变为一个带dispatch的函数`（dispatch => dispatch(action)），而不是以前同步dispatch时，action是一个纯Object对象。

示例：

``` js
const normalAction = { type: 'add' }
const asyncAction = dispatch => {
  setTimeout(() => dispatch(normalAction))
}
// store.dispatch(normalAction) // 同步
store.dispatch(asyncAction) // 异步
```

redux-thunk简版源码：

``` js
const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
```

参考文章：
* [redux中间件的原理](https://zhuanlan.zhihu.com/p/34651008)
* [解读 Redux 中间件的原理](https://juejin.im/post/6844903502641102855)

## 3. react-redux使用方式

定义state：

``` js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from './reducer';

const enhancer = applyMiddleware(thunk) // 中间件
export const store = createStore(combineReducers({ global: reducer }), enhancer);
```

组件connect使用

``` js
const App = (props) => {
    const { dispatch, xxx } = props
    const onClick = () => dispatch(...action)
    return <div></div>
}
export default connect(state => {xxx: state.global.xxx})(App)
```

## 4. react-redux connect/Provider

Provide组件源码

``` js
// https://github.com/reduxjs/react-redux/blob/master/src/components/Provider.js

const ReactReduxContext = /*#__PURE__*/ React.createContext(null)

function Provider({ store, context, children }) {
    // 需要向下传递的值
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store)
    subscription.onStateChange = subscription.notifyNestedSubs
    return {
      store,
      subscription
    }
  }, [store])

  const previousState = useMemo(() => store.getState(), [store])

  useEffect(() => {
    const { subscription } = contextValue
    subscription.trySubscribe()

    // 浅比较更新，如果state没变则所有订阅的更新不触发
    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs() // 触发更新
    }
    return () => {
      subscription.tryUnsubscribe()
      subscription.onStateChange = null
    }
  }, [contextValue, previousState])

  const Context = context || ReactReduxContext // 使用context进行store自动向下传值

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
```

# React-Redux源码解析

App根节点组件提供的Context对象作为共享数据对媒介，使得子组件可以获得的到全局store。

App的根组件用<Provider />组件包裹后，本质上就为App提供了一个全局的属性store，相当于在整个App范围内，共享store属性。当然，<Provider />组件也可以包裹在其他组件中，在组件级的全局范围内共享store。

``` js
// <Provider />组件源码的核心实现
export function createProvider(storeKey = 'store', subKey) {
    const subscriptionKey = subKey || `${storeKey}Subscription`

    class Provider extends Component {
        getChildContext() {
          return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }

        constructor(props, context) {
          super(props, context)
          this[storeKey] = props.store;
        }

        render() {
          return Children.only(this.props.children)
        }
    }

    // ......

    Provider.propTypes = {
        store: storeShape.isRequired,
        children: PropTypes.element.isRequired,
    }
    Provider.childContextTypes = {
        [storeKey]: storeShape.isRequired,
        [subscriptionKey]: subscriptionShape,
    }

    return Provider
}

export default createProvider()
```