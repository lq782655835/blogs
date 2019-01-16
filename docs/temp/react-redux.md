# Vuex和Redux比较
* Vuex
    * 类型
        * UI跟state、action（dispatch触发或库简写）相关
        * state 共享数据
        * mutations 同步修改state。对应commit指令
        * action 触发逻辑，得到结果可以commit同步state或dispatch异步另外一个action
    * 触发
        * commit 触发同步修改
        * dispatch 触发action操作
    * 库结合
        * mapState
        * mapGetters
        * mapMutations
        * mapActions

* React UI跟state、action相关
    * state（合并所有state）共享数据
    * action 触发逻辑，唯一可以带上数据修改store的对象。修改需要dispatch才能触发reduce（同步数据只是简写）
    * reducer(设置了部分state) 修改state，类似Vuex中mutations作用
    * dispatch 触发reducer
* 相同
    * ui-action（react：dispatch；vue：commit/dispatch）- （react：reducer，vue：mutations）- store
* 不同
    * Vuex有commit同步和dispatch异步两种触发方式，commit-mutations是唯一修改state的方式
    * React只有dispatch触发修改（同步方式直接简写，异步方式依赖中间件完成）。dispatch-reducer是唯一修改state方式
    * 简单理解，reducer承担了state和mutations功能。
![](https://vuex.vuejs.org/vuex.png)
``` ts
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
  async login (
    { commit },
    user: StoreState.Login
  ): Promise<Ajax.AjaxResponse> {
    commit('USER_LOGINING')
    const res: Ajax.AjaxResponse = await service.login({ ...user })
    if (res && res.code === 1) {
      window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
      success('登录成功')
    } else {
      error(res.message)
    }
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

> state的值仅为只读，如果需要更改则必须只能通过reducer。
store、state基本一样，只是action与mutation有些差别。
redux中数据是从action-->reducer-->更新state；
VUEX则是action（特定情况可以省略）-->mutation-->更新state。

vuex的流向：view——>commit——>mutations——>state变化——>view变化（同步操作）
          view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）

redux的流向：view——>actions——>reducer——>state变化——>view变化（同步异步一样）