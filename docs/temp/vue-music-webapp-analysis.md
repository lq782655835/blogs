# vue-music-webapp项目分析

讲述webapp的技术点

源码：https://github.com/caijinyc/vue-music-webapp

## 1. 插件

* fastclick 消除 click 移动游览器 300ms 的延
* vue-lazyload 图片懒加载
* [better-scroll]()

#### better-scroll

基于iscroll，主要是模拟回弹、顺滑滚动等特性，有更好的用户体验，移动端滑动必备。原生的css scroll太生硬，没有回弹、快滑后自动再滑动一点等特性。

better-scroll封装的vue组件（避免跟业务强耦合）：https://github.com/caijinyc/vue-music-webapp/blob/master/src/base/scroll/scroll.vue

## 2. 页面router

> 路由如何设置？

主页面是recommend，查询页面query，用户页面user,都是路由一级页面。`recommend页面有全局的头 + 推荐 && router-view + 尾部。默认情况下router-view没有东西，为空，页面不展示。`

recommend/id路由是覆盖在一级页面的router-view，此时展示。同时整个页面position:fixed；top: 0;z-index: 1000的方式，占据页面的最上层（下层被遮挡住了），以此获得路由跳页时，头部变化而底部不变。

> 大量使用position: fixed;

## 3. [滚动过程中title/透明度变化](https://github.com/caijinyc/vue-music-webapp/blob/master/src/components/music-list/music-list.vue#L148)

better-scroll抛出scroll事件，从而可以监听scroll下滑到某些地方时，改变css。

## 4. vue 切换动画

页面切换可以统一放在\<transition>\<route-view/>\</transition>中，也可以在每个页面单独设置，如下：

``` css
<transition name="slide">
    doing
</transition>

.slide-enter-active, .slide-leave-active {
  transition: all 0.2s
}
.slide-enter, .slide-leave-to {
  /*页面离开时，x:0-30%，进入时，x:30%-0*/
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}
```

## 5. 业务组件

### [字母快捷组件](https://github.com/caijinyc/vue-music-webapp/blob/master/src/base/listview/listview.vue#L72)

``` js
<div class="list-shortcut" @touchstart="onShortcutStart"
@touchmove.stop.prevent="onShortcutMove">
    list
</div>

onShortcutStart (e) {
    // 获取字母对应的index
    let anchorIndex = getDataByAttr(e.target, 'index')
    // 存储中间数据，move时计算最终定位的index
    let firstTouch = e.touches[0]
    this.touch.y1 = firstTouch.pageY
    this.touch.anchorIndex = anchorIndex

    this._scrollTo(anchorIndex) // 导航定位
},
onShortcutMove (e) {
    // 起始位置为anchorIndex
    // 计算移动的格数delta
    // 最终定位的index = anchorIndex + delta
    let firshTouch = e.touches[0]
    this.touch.y2 = firshTouch.pageY
    let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
    let anchorIndex = parseInt(this.touch.anchorIndex) + delta

    this._scrollTo(anchorIndex)
},
_scrollTo (index) {
    // better-scroll api
    this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
}
```

### [slider](https://github.com/caijinyc/vue-music-webapp/blob/master/src/base/slider/slider.vue)

首页滚动组件

## 6. [css](https://github.com/caijinyc/vue-music-webapp/blob/master/src/components/music-list/music-list.vue)

### 1. 图片高度百分比

当用百分比作为宽高时  因为百分比是相对于其最近的父元素的宽高，所以首先其父元素要有宽高，宽度一般不设置会有默认值(比如整个屏幕的宽度)，但是高度不设置就没有默认值，因此如果父元素没设高度值，而其内部元素用了百分比作为高度时，是没有效果的。

通过padding-top即可解决：

``` css
<div class="bg-image">
</div>
.bg-image {
    background-image: url(http://p1.music.126.net/xxx.jpg);
    background-size: cover; /* 容器内等比缩小 */
    width: 100%;
    height: 0;
    padding-top: 75%; /* 图片高度的75% */
    background-position: 0 30%; /* y=0，从上到下显示75%，y=100，显示下面75%*/
}
```

### 2. border内容向上遮住一点图片

通过relative + top-20，可以位置整体上移。

``` css
<div class="bg-image"/>
<div class="list"/>
.list {
    position: relative;
    top: -20px; /* 向上一点点 */
    border-radius: 10px;
}
```

### 3. 绝对位置

利用父padding-top负数 + 子元素absolute，制造绝对空间

``` css
<div class="list">
    <div class="no-flow"></div>
    <div class="normal"></div>
</div>
.list {
    position: relative;
    padding-top: 40px; /* 上部空出来40px */
}
.no-flow {
    position: absolute; /* absolute不占据文档流 */
    top: 0; /* 空出来的40这里可以使用 */
    height: 40px;
    /* 配合flex布局 */
    display: flex;
    align-items: center;
}
```

### 4. [image转动](https://github.com/caijinyc/vue-music-webapp/blob/master/src/components/player/player.vue#L74)

``` css
<img width="40" height="40" class="play pause" src="http://p1.music.126.net/xxx.jpg">
.play {
    border-radius: 50%; /*圆型图片*/
    animation: rotate 10s linear infinite; /*自动滚动动画*/
}
.pause {
    animation-play-state: paused; /* 暂停动画 */
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### 5. [毛玻璃效果](https://github.com/caijinyc/vue-music-webapp/blob/master/src/components/player/player.vue#L5)

``` css
<div class="bg">
    <div class="filter"/>
    <img width="100%" height="100%" src="xxx.jpg" />
<div>
.bg {
    position: absolute;/*不在文档流中，关键*/
    /* blur毛玻璃 */
    opacity: .6;
    filter: blur(30px);
    /* 取中间一点位置的，不然blur边界太亮 */
    left: -50%;
    top: -50%;
    /* width/height都设置大一点 */
    width: 300%;
    height: 300%;
}
.filter {
    position: absolute;
    width: 100%;
    height: 100%;
    /*再加一层遮罩，隔离下img图片太亮*/
    background: #000;
    opacity: .6;
}
```
