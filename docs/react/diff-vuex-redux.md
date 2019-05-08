# Vuex与Redux比较

由于Vuex和Redux都是从Flux中衍生出来，同时Vuex对Redux部分思想也有一些借鉴，所以Vuex和Redux有很多相同点。很多资料也有介绍两者的对比，但大部分讲解的比较抽象，较难理解。笔者整理两者异同点，同时配有标准案例进行说明。注意本文不是科普vuex和redux相关概念，相关知识内容可以在官方文档中查看。[Vuex](https://vuex.vuejs.org/zh/guide/) 、[Redux](https://redux.js.org/introduction/getting-started)

## 异同点

* ### 相同点
    * state 共享数据
    * 流程一致：定义全局state，触发，修改state
    * 原理相似，通过全局注入store。
* ### 不同点
    * 从实现原理上来说：
        * Redux 使用的是不可变数据，而Vuex的数据是可变的。Redux每次都是用新的state替换旧的state，而Vuex是直接修改
        * Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的
    * 从表现层来说：
        * `vuex`定义了`state、getter、mutation、action`四个对象；`redux`定义了`state、reducer、action`。
            * `vuex`中`state`统一存放，方便理解；`redux`state依赖所有reducer的初始值
            * `vuex`有`getter`,目的是快捷得到state；`redux`没有这层，react-redux mapStateToProps参数做了这个工作。
            * `vuex`中`mutation`只是单纯赋值(很浅的一层)；`redux`中`reducer`只是单纯设置新state(很浅的一层)。他俩作用类似，但书写方式不同
            * `vuex`中`action`有较为复杂的异步ajax请求；`redux`中action中可简单可复杂,简单就直接发送数据对象（{type:xxx, your-data}）,复杂需要调用异步ajax（依赖redux-thunk插件）。
        * `vuex触发方式`有两种commit同步和dispatch异步；`redux`同步和异步都使用dispatch

## 详细解释
* ### Vuex
    * 类型
        * state: 共享数据
        * getter: 快捷state
        * mutation: 同步更新，只是简单都赋值
        * action: 异步更新，可以调用commit来触发同步mutation
    * 触发
        * commit 触发mutation同步操作
        * dispatch 触发action异步操作
    * 库结合（自带）
        * mapState
        * mapGetters
        * mapMutations
        * mapActions
    * 其他
        * UI跟state、action/dispatch相关
        * mutations 同步修改state。UI触发使用commit指令
        * action 内可以commit同步state或dispatch异步另外一个action。UI触发使用dispatch指令
* ### Redux
    * 类型
        * store: 合并所有reducer，共享数据
        * reducer: 两个作用：1. 初始值合并获得state 2. 简单的赋值，获取新的state代替老的state
        * action: 触发函数。是`唯一`可以带上数据修改state的触发对象。接下逻辑就转移到reducer中
        > 注：也可以反过来理解：Vuex的每一次this.$store.commit('type', data) === action(data){ return { type, data}}）
    * 触发 (依赖react-redux)
        * dispatch触发同步或异步。使用mapDispatchToProps参数
    * 库结合（依赖react-redux）
        * mapStateToProps
        * mapDispatchToProps
>  简单理解，reducer承担了state和mutations功能。
> Vuex中commit-mutations是唯一修改state的方式；Redux中dispatch-reducer是唯一修改state方式

## Vuex典型案例
![](https://vuex.vuejs.org/vuex.png)
``` ts
// vuex非常简单易懂，而且整理到1个文件即可
const state: IState = {
  login: false,
  option: {
    _id: '',
    sub_title: '',
    title: '',
    keyword: '',
    descript: '',
    url: '',
    email: '',
    icp: ''
  }
}

const actions: ActionTree<IState, any> = {
  // 登录
  async login ({ commit }, user: StoreState.Login): Promise<Ajax.AjaxResponse> {
    commit('USER_LOGINING')
    const res: Ajax.AjaxResponse = await service.login({ ...user })
    commit('USER_LOGINING_FINAL')
    return res
  },
}

const mutations: MutationTree<IState> = {
  'USER_LOGINING' (state: IState): void {
    state.login = true
  },

  'USER_LOGINING_FINAL' (state: IState): void {
    state.login = false
  },
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
```

## Redux典型案例

``` js
// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import home from './home/reducer'
import demo from './demo/reducer'
import thunk from 'redux-thunk'

// reducers获得初始state
let store = createStore(combineReducers({ home, demo }), applyMiddleware(thunk))

export default store
```

``` js
// reducer.js
let defaultState = {
    demoList: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'setDemoList':
            return { ...state, demoList: action.list }
        default:
            return state
    }
}
```

``` js
// action.js
// 同步action
export const setDemoList = list => ({
    type: 'setDemoList',
    list
})

// 异步action
export const setAsyncList = () => {
    return async dispatch => {
        let result = await API.getXXX()
        dispatch({type: 'setAsyncList', result})
    }
}
```

``` js
// ui
const mapStateToProps = (state) => {
    return {
        list: state.demo.demoList
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setDemoList: list => dispatch(setDemoList(list))
//     }
// }
// or
const mapDispatchToProps = {setDemoList}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
```

## 总结

* vuex的流向：
  * view——>commit——>mutations——>state变化——>view变化（同步操作）
  * view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）
* redux的流向：view——>actions——>reducer——>state变化——>view变化（同步异步一样）

## 参考文章
* [Redux vs. Vuex](https://medium.com/@Musclenun/redux-vs-vuex-9b682529c36)
* [How Vuex compares to redux for Managing State Object](https://medium.com/@tkssharma/how-vuex-compares-to-redux-for-managing-state-object-c4b123fd9874)
* [Redux & 与vuex的对比](https://my.oschina.net/LinearLawX/blog/1617476)