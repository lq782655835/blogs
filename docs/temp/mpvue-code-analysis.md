# mpvue源码解析

vue.js和小程序的工作原理一致，可以把小程序的功能托管给vue.js，在正确的时机将数据变更同步到小程序，从而达到开发小程序的目的。这样，我们可以将精力聚焦在 Vue.js 上，参照 Vue.js 编写与之对应的小程序代码，小程序负责视图层展示，所有业务逻辑收敛到 Vue.js 中，Vue.js 数据变更后同步到小程序.

![](https://segmentfault.com/img/bVbgUrV?w=1080&h=637)

以上是mpVue的实现原理，

* 小程序负责视图层展示
* 所有业务逻辑收敛到 Vue.js 中
* Vue.js 数据变更后同步到小程序
更具体点:

* Vue.js 实例与小程序 Page 实例建立关联
* 小程序和 Vue.js 生命周期建立映射关系，能在小程序生命周期中触发 Vue.js 生命周期
* 小程序事件建立代理机制，在事件代理函数中触发与之对应的 Vue.js 组件事件响应
* vue与小程序的数据同步

生命周期关联：
vue和小程序的数据彼此隔离，各有不同的更新机制。mpvue从生命周期和事件回调函数切入，在vue触发数据更新时实现数据同步。小程序通过视图层呈现给用户、通过事件响应用户交互，vue在后台维护这数据的变更和逻辑。为了实现数据的同步，mpvue修改了vue的runtime实现，在vue的生命周期中增加了更新小程序数据的逻辑。

事件代理机制：
用户交互触发的数据更新通过事件的代理机制完成。vue中，事件响应函数对应组件的method，vue自动维护了上下文环境。然而在小程序中没有这种机制，vue执行环境中维护了一份实时虚拟DOM，这与小程序视图层完全对应，小程序组件上触发事件后，只要找到虚拟DOM上对应的节点，触发对应的事件就可以了；另一方面，vue事件响应如果触发了数据更新，其生命周期函数更新将自动触发，在此函数上同步更新数据。

原有的mpvue更新机制：
mpvue实现原理是基于Vue2.js，重写platform部分代码来实现在小程序环境下用Vue组件系统进行运行。在Vue的H5实现中，当我们组件树上的一个组件属性更改后，会触发整个树的检查更新，然后在新老dom树对比算出最小改动后，同步到浏览器的真实dom，这个过程熟悉Vue的开发者很熟悉了，就是diff更新。
但是H5版的diff最后的浏览器runtime代码是基于增删dom节点API进行的，小程序又不提供增删节点的功能，所以为了能在小程序环境实现更新，原版mpvue对整个触发更新检查的V-dom树都取值转换成了小程序对应的JSON，通过setData()接口同步到视图。这个过程在实际运行会造成setData的数据冗余过大。通过代理updateDataToMP打日志的方式我们发现，v-dom树上任意节点的任意属性更改，会引发整棵树的更新，一次形如this.a = 1的操作会引起O(N^2)量级的更新。真实在项目中监控到，一个10个组件左右构成的页面，每次进行一次this.a=1数据更新，在$nextTick渲染时真实传到小程序的数据大概在10k-20k。安卓真机上会造成大概200-300ms的渲染演示，肉眼能较明显觉察。
 
新mpvue数据更新机制：
新版Mpvue在每次数据更新的时候，会在Vue监听set方法，每次触发属性更新的时候把当前更新的属性key放在当前V-dom的__keyPath属性中。一次更新全部触发后，在实际render过程中遍历keyPath属性，只选择更新的属性放到json里，调用Page.setData来进行更新操作。同时在Vue.$nextTick函数里，触发完所有的render更新后会清理掉全部keyPath，防止下次再更新又冗余。通过这种操作，this.a=1可以O(N^2)量级降低到O(1).上面例子中每次更新10k-20k的页面，在业务中有比如用户操作引起某个组件数字+1，关闭弹窗等操作时，更新量降低到几个字节。安卓卡顿的问题也从框架角度完美解决

``` js
// https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/index.js
// for mp
import { initMP } from './lifecycle'
Vue.prototype._initMP = initMP // 设置$mp对象，以及回调小程序onLoad等生命周期

// 数据同步机制
import { updateDataToMP, initDataToMP } from './render'
Vue.prototype.$updateDataToMP = updateDataToMP // 在patch是更新数据，即每次diff时，都page.setData(data)
Vue.prototype._initDataToMP = initDataToMP // 在模板编译时，会根据不同mpType创建MP对象，对象里面onShow时会收集数据同步到MP

import { handleProxyWithVue } from './events'
Vue.prototype.$handleProxyWithVue = handleProxyWithVue // 事件代理机制

// 初始化小程序，vue对象到page对象入口
Vue.prototype.$mount = function (el, hydrating) {
  // 初始化小程序生命周期相关
  const options = this.$options

  if (options && (options.render || options.mpType)) {
    const { mpType = 'page' } = options
    return this._initMP(mpType, () => {
      return mountComponent(this, undefined, undefined)
    })
  } else {
    return mountComponent(this, undefined, undefined)
  }
}

export default Vue
```

``` js
// https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/lifecycle.js
// 每次$mount时，都先预设一些mp参数，再继续接下来的流程
export function initMP (mpType, next) {
  const rootVueVM = this.$root
  if (!rootVueVM.$mp) {
    rootVueVM.$mp = {}
  }

  const mp = rootVueVM.$mp

  // Please do not register multiple Pages
  // if (mp.registered) {
  if (mp.status) {
    if (mpType === 'app') {
      callHook(this, 'onLaunch', mp.appOptions)
    } else {
      callHook(this, 'onLoad', mp.query)
      callHook(this, 'onReady')
    }
    return next()
  }
  // mp.registered = true

  mp.mpType = mpType
  mp.status = 'register'
}

/**
  较为重要的初始化设置小程序配置,包括生命周期绑定
// 该函数调用在mpvue-loader包中，即编译模板时会首先执行createMP函数：
// 处理const app = new Vue(App)
// 构造为 createMp({
//    mpType: App.mpType,
//    init(){
//       return new Vue(App)
//    }
// })
**/
export function createMP ({ mpType, init }) {
  if (!mpType) mpType = 'page'
  if (mpType === 'app') {
    global.App({
      // 页面的初始数据
      globalData: {
        appOptions: {}
      },

      handleProxy (e) {
        return this.rootVueVM.$handleProxyWithVue(e)
      },

      // Do something initial when launch.
      onLaunch (options = {}) {
        if (!this.rootVueVM) {
          this.rootVueVM = init()
          this.rootVueVM.$mp = {}
        }
        const mp = this.rootVueVM.$mp
        mp.mpType = 'app'
        mp.app = this
        mp.status = 'launch'
        this.globalData.appOptions = mp.appOptions = options
        this.rootVueVM.$mount()
      },

      // Do something when app show.
      onShow (options = {}) {
        // 百度小程序onLaunch与onShow存在bug
        // 如果this.rootVueVM不存在则初始化
        if (!this.rootVueVM) {
          this.rootVueVM = init()
          this.rootVueVM.$mp = {}
        }
        const mp = this.rootVueVM.$mp
        mp.status = 'show'
        this.globalData.appOptions = mp.appOptions = options
        callHook(this.rootVueVM, 'onShow', options)
      },

      // Do something when app hide.
      onHide () {
        const mp = this.rootVueVM.$mp
        mp.status = 'hide'
        callHook(this.rootVueVM, 'onHide')
      },

      onError (err) {
        callHook(this.rootVueVM, 'onError', err)
      },

      onPageNotFound (err) {
        callHook(this.rootVueVM, 'onPageNotFound', err)
      }
    })
  }
  if (mpType === 'page') {
    const app = global.getApp()
    global.Page({
      // 页面的初始数据
      data: {
        $root: {}
      },

      handleProxy (e) {
        return this.rootVueVM.$handleProxyWithVue(e)
      },

      // mp lifecycle for vue
      // 生命周期函数--监听页面加载
      onLoad (query) {
        this.rootVueVM = init()
        const mp = this.rootVueVM.$mp = {}
        mp.mpType = 'page'
        mp.page = this
        mp.query = query
        mp.status = 'load'
        getGlobalData(app, this.rootVueVM)
        this.rootVueVM.$mount()
      },

      // 生命周期函数--监听页面显示
      onShow () {
        const mp = this.rootVueVM.$mp
        mp.page = this
        mp.status = 'show'
        callHook(this.rootVueVM, 'onShow')
        // 只有页面需要 setData
        this.rootVueVM.$nextTick(() => {
          this.rootVueVM._initDataToMP()
        })
      },

      // 生命周期函数--监听页面初次渲染完成
      onReady () {
        const mp = this.rootVueVM.$mp
        mp.status = 'ready'
        return _next(this.rootVueVM)
      },

      // 生命周期函数--监听页面隐藏
      onHide () {
        const mp = this.rootVueVM.$mp
        mp.status = 'hide'
        callHook(this.rootVueVM, 'onHide')
        mp.page = null
      },

      // 生命周期函数--监听页面卸载
      onUnload () {
        const mp = this.rootVueVM.$mp
        mp.status = 'unload'
        callHook(this.rootVueVM, 'onUnload')
        mp.page = null
      },

      // 页面相关事件处理函数--监听用户下拉动作
      onPullDownRefresh () {
        callHook(this.rootVueVM, 'onPullDownRefresh')
      },

      // 页面上拉触底事件的处理函数
      onReachBottom () {
        callHook(this.rootVueVM, 'onReachBottom')
      },

      // 用户点击右上角分享
      onShareAppMessage (options) {
        if (this.rootVueVM.$options.onShareAppMessage) {
          callHook(this.rootVueVM, 'onShareAppMessage', options)
        }
      },

      // Do something when page scroll
      onPageScroll (options) {
        callHook(this.rootVueVM, 'onPageScroll', options)
      },

      // 当前是 tab 页时，点击 tab 时触发
      onTabItemTap (options) {
        callHook(this.rootVueVM, 'onTabItemTap', options)
      }
    })
  }
  if (mpType === 'component') {
    global.Component({
      // 小程序原生的组件属性
      properties: {},
      // 页面的初始数据
      data: {
        $root: {}
      },
      methods: {
        handleProxy (e) {
          return this.rootVueVM.$handleProxyWithVue(e)
        }
      },
      // mp lifecycle for vue
      // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
      created () {
        this.rootVueVM = init()
        initMpProps(this.rootVueVM)
        this.properties = normalizeProperties(this.rootVueVM)
        const mp = this.rootVueVM.$mp = {}
        mp.mpType = 'component'
        mp.status = 'created'
        mp.page = this
        this.rootVueVM.$mount()
        callHook(this.rootVueVM, 'created')
      },
      // 组件生命周期函数，在组件实例进入页面节点树时执行
      attached () {
        const mp = this.rootVueVM.$mp
        mp.status = 'attached'
        callHook(this.rootVueVM, 'attached')
      },
      // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
      ready () {
        const mp = this.rootVueVM.$mp
        mp.status = 'ready'
        callHook(this.rootVueVM, 'ready')
        _next(this.rootVueVM)

        // 只有页面需要 setData
        this.rootVueVM.$nextTick(() => {
          this.rootVueVM._initDataToMP()
        })
      },
      // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
      moved () {
        callHook(this.rootVueVM, 'moved')
      },
      // 组件生命周期函数，在组件实例被从页面节点树移除时执行
      detached () {
        const mp = this.rootVueVM.$mp
        mp.status = 'detached'
        callHook(this.rootVueVM, 'detached')
      }
    })
  }
```

``` js
// https://github.com/Meituan-Dianping/mpvue/blob/master/src/platforms/mp/runtime/patch.js
export const corePatch: Function = createPatchFunction({ nodeOps, modules })

export function patch () {
  corePatch.apply(this, arguments)
  this.$updateDataToMP() // patch基础上同步data到小程序
}
```

[mpvue 解析](https://www.cnblogs.com/dhsz/p/9282296.html)