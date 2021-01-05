# alipay小程序


## 小程序原理

### 为什么小程序层级有限？
每个小程序页面都是用不同的WebView去渲染，这样可以提供更好的交互体验，更贴近原生体验，也避免了单个WebView的任务过于繁重。


### 双线程来由？

为了解决管控与安全问题，我们必须阻止开发者使用一些浏览器提供的，诸如跳转页面、操作DOM、动态执行脚本的开放性接口。

要彻底解决这个问题，我们必须提供一个沙箱环境来运行开发者的JavaScript 代码。这个沙箱环境不能有任何浏览器相关接口，只提供纯JavaScript 的解释执行环境

我们可以创建一个单独的线程去执行 JavaScript，在这个环境下执行的都是有关小程序业务逻辑的代码，也就是我们前面一直提到的逻辑层。而界面渲染相关的任务全都在WebView线程里执行，通过逻辑层代码去控制渲染哪些界面，那么这一层当然就是所谓的渲染层。这就是小程序双线程模型的由来。

### 为什么setData时数据不宜过多？

既然小程序是基于双线程模型，那就意味着任何数据传递都是线程间的通信，也就是都会有一定的延时。这不像传统Web那样，当界面需要更新时，通过调用更新接口UI就会同步地渲染出来。在小程序架构里，这一切都会变成异步。

### 为什么需要小程序标签？组件系统

小程序的视图是在WebView里渲染的，那搭建视图的方式自然就需要用到HTML语言。如果我们直接提供HTML的能力，那前面章节所介绍的为解决管控与安全而建立的双线程模型就成为摆设了。开发者可以利用A标签实现跳转到其它在线网页，也可以动态执行JavaScript等。

### 为什么配置时要区分Page和Componnet？

在使用自定义组件的小程序页面中，Exparser将接管所有的自定义组件注册与实例化。从外部接口上看，小程序基础库提供有Page和Component两个构造器。以Component为例，在小程序启动时，构造器会将开发者设置的properties、data、methods等定义段，写入Exparser的组件注册表中。这个组件在被其它组件引用时，就可以根据这些注册信息来创建自定义组件的实例。Page构造器的大体运行流程与之相仿，只是参数形式不一样。这样每个页面就有一个与之对应的组件，称为“页面根组件”。

## App

* onLaunch:当小程序初始化完成时触发，全局只触发一次。参数也可以使用 my.getLaunchOptionsSync 获取。
* onShow:当小程序启动，或从后台进入前台显示时触发。也可以使用 [my.onAppShow](https://opendocs.alipay.com/mini/api/nn7do1) 绑定监听
* onHide:当当前页面被隐藏时触发，例如跳转、按下设备 Home 键离开。也可以使用 my.onAppHide 绑定监听。
* onError:当小程序发生 js 错误时触发。也可以使用 my.onError 绑定监听
* onShareAppMessage
* onUnhandledRejection

## Compoenent组件

小程序基础库从 1.7.0 版本开始支持自定义组件功能。 `通过调用 my.canIUse('component') 可判断自定义组件功能是否可在当前版本使用`；`从 1.14.0 版本开始，自定义组件有了较大改动，支持 component2 相关功能，通过调用 my.canIUse('component2') 可判断新自定义组件功能是否可在当前版本使用`， component2 相关功能如下：

* 新增 onInit、deriveDataFromProps生命周期函数 ;

* 支持使用 ref获取自定义组件实例 。

### 生命周期
* onInit	-	组件创建时触发	1.14.0
* deriveDataFromProps	nextProps	组件创建时和更新前触发	1.14.0
* didMount	-	组件创建完毕时触发	-
* didUpdate	(prevProps,prevData)	组件更新完毕时触发	-
* didUnmount

### 组建实例属性/方法

* data	Object	组件内部数据
* props	Object	传入组件的属性
* is	String	组件路径
* $page	Object	组件所属页面实例
* $id	Number	组件 id，可直接在组件 axml 中渲染值
* setData()	Object	设置 data 触发视图渲染
* $spliceData()

### 使用自定义组件

1、在页面 JSON 文件中指定使用的自定义组件

``` json
// /pages/index/index.json
{
//   "component": true, // 自定义组件的值必须是 true
  "usingComponents": {
    "my-component": "/components/index/index"
  }
}
```

2、在页面的 AXML 文件中使用自定义组件，与使用基础组件类似。

``` xml
<!-- /pages/index/index.axml -->
<view>
  <!-- 给自定义组件传递 属性name与属性age -->
  <my-component name="tom" age="{{23}}"/>
</view>
```

3. JS文件

``` js
// /components/index/index.js
Component({
  mixins:[{ didMount() {}, }],
  data: {y:2},
  props:{x:1}, // 为外部传入的数据设置默认值
  onInit(): {},
  didMount(): {},
  didUpdate(prevProps,prevData){},
  didUnmount(){},
  methods:{ // 组件的方法
    onMyClick(ev){
      my.alert({});
      this.props.onXX({ ...ev, e2:1});
    },
  },
});
```

## 分包加载

待更新

## 配置JSON区别

### 1. App

``` json
{
  "pages": [
    "pages/index/index",
    "pages/logs/index"
  ],
  "window": {
    "defaultTitle": "Demo",
    "allowsBounceVertical: "YES"
  },
  "tabBar": {
    textColor,
    items: [{ pagePath, name, icon }]
  }
}
```

### 2. Page

``` json
{
  "usingComponents": {
    "grid":"mini-antui/es/grid/index",
  },
  "window": {
    "defaultTitle": "会员中心"
  }
}
```

### 3. Component

``` json
{
  "component": true,
  "usingComponents": {
    "my-component": "/components/index/index"
  }
```



## 组件/Page区别

* 组建有data/props属性，页面只有data属性
* 组件有methods，页面放在外面
* 组件生命周期与页面生命周期不同

``` js
// 组件Component类似Vue2.x数据结构

Component({
  mixins:[{ didMount() {}, }],
  data: {y:2},
  props:{x:1}, // 为外部传入的数据设置默认值
  onInit(): {}, // 组件创建时触发
  didMount(): {}, // 组件创建完毕时触发
  didUpdate(prevProps,prevData){}, // 组件更新完毕时触发
  didUnmount(){}, // 组件删除时触发
  methods:{ // 组件的方法
    onMyClick(ev){
      my.alert({});
      this.props.onXX({ ...ev, e2:1});
    },
  },
});

// 页面Page

Page({
  data: {
    title: "Alipay",
  },
  // <navigator   url="/pages/detail/detail?id=1111111" ></navigator> => query: { id: 1111111 }
  onLoad(query) {
    // 页面加载
  },
  onShow() {
    // 页面显示
  },
  onReady() {
    // 页面加载完成
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
   // 返回自定义分享信息
  },
  // 事件处理函数对象
  events: {
    onBack() {
      console.log('onBack');
    },
  },
  // 自定义事件处理函数
  viewTap() {
    this.setData({
      text: 'Set data for update.',
    });
  },
  // 自定义事件处理函数
  go() {
    // 带参数的跳转，从 page/ui/index 的 onLoad 函数的 query 中读取 type
    my.navigateTo({url:'/page/ui/index?type=mini'});
  },
  // 自定义数据对象
  customData: {
    name: 'alipay',
  },
});
```

## 其他

小程序踩坑：头部自定义（transparentTitle）、css无法使用逗号、css图片不支持本地图片（支持http、base64）

小程序响应式object？？是的
onLoad/onShow区别：onLoad: 只执行一次，跳转别的页面当前页面不会关闭。别的页面再跳回来，只会执行onShow（再次展示）

### JS

``` js
// onTap
event.target.dataset.xxx

my.reLaunch({url}) // 关闭当前所有页面，跳转到应用内的某个指定页面 // 相当于重新刷新页面

my.setNavigationBar({backgroundColor}) // 设置头部颜色

$event: new PubSub(),
app.$event.on
app.$event.emit
```

### acss

* app.acss作用于全局，其他都是局部作用域
* 与css类似(不支持属性选择器)

``` css
// 支持空格选择,支持 > 子选择
// 不支持多个子选择（即不支持逗号）
.vip-skin-1 .normal_operation .operation_btn,.operation_split {
  color: #FFFFFF;
}
```

### UI
* view
    * onTap
* scroll-view
    * scroll-x
    * scroll-y
    * scroll-into-view
    * onScroll


## 参考
https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0006a2289c8bb0bb0086ee8c056c0a