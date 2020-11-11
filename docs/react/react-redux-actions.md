# redux-actions

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。但是同时它也让状态管理变得很冗长，`大量的type、actionCreator、reducer让人不断在写重复的代码`。

安装包：
```
yarn add redux-actions
```

redux-actions不引入额外的中间件，只是引入了几个API，以方便创建actionCreator和reducer。

## createAction

``` js
// action.js
import { createAction } from "redux-actions"

export const INCREMENT = 'INCREMENT'
export const increment = createAction(INCREMENT)
```

createAction是用来创建动作创建器的函数：

``` js
createAction(
  type, // 动作名
  payloadCreator = Identity, // 用来创建动作对象中的payload值，默认使用lodash的Identity
  ?metaCreator // 用来创建动作对象中元数据
)

const increment = createAction(
  'INCREMENT',
  mount => mount,
  () => ({ admin: true })
);
increment(20);
// {
//   type: 'INCREMENT',
//   payload: 20,
//   meta: { admin: true },
// }
```

## handleAction

``` js
// reducer.js
import {handleAction} from 'redux-actions'
import {INCREMENT} from './action'

const defaultState = { count: 1 }
const reducer = handleAction(
  INCREMENT,
  (state, action) => ({
    count: state.count + action.payload
  }),
  defaultState
)

export default reducer
```

handleAction会返回一个reducer
``` js
// type为动作类型, reducer为动作处理, defaultState为默认状态
handleAction(type, reducer, defaultState)

// 上面的createAction效果就等同下面
const reducer = (state = defaultState, action) {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.payload
            }
        default: 
            return state
    }
 }
```

## 触发redux

``` js
store.dispatch(increment(20)) // dispatch带上action的数据
```

## createActions

这个函数用来创建多个动作的，具体用法就是createActions(actionMap)

actionMap就是一个对象，key值为动作类型，value可以是payloadCreator函数、一个数组[payloadCreator， metaCreator]、嵌套的actionMap。

``` js
cosnt {add, remove} = createActions({
  ADD_TODO: todo => ({ todo }), // payload creator
  REMOVE_TODO: [
    todo => ({ todo }), // payload creator
    (todo, warn) => ({ todo, warn }) // meta
  ]
})

// {type: 'ADD_TODO', payload: {todo: 'redux-actions'}}
add('redux-actions')

// {type: 'ADD_TODO', payload: {todo: 'redux-actions'}, meta: {todo: 'redux-actions', warn: 'warn'}}
remove('redux-actions', 'warn') 
```

## handleActions

handleActions函数是用来处理多个动作的
``` js
handleActions(reducerMap, defaultState)

const reducer = handleActions(
  {
    INCREMENT: (state, action) => ({
      counter: state.counter + action.payload
    }),
    DECREMENT: (state, action) => ({
      counter: state.counter - action.payload
    })
  },
  { counter: 0 }
);
```

> 增加和减小的逻辑基本一致，所以可以使用combineActions来合并简写。