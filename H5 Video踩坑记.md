# H5 Video踩坑记录

> 临时接手一个即将上线的公司项目，纯H5活动页，内容不多，但对还原度和各机型兼容性（尤其是Android机型）有极高要求。涉及的问题很多，这里重点说下在H5中Video的一系列坑。说个技术选型问题，**不复杂的活动页**建议使用jquery技术栈，而不是使用vue和reactjs等，后者的优点在于组件系统。使用jquery优点是插件多，生态丰富，添加方便。笔者接替别人的项目，技术栈使用vue，中间要加一些新特性和特效，还得看看有没有对应的vue轮子，十分麻烦。

## 1.基本video属性设置

1. poster：视频未完全好时，代替的图片。**建议添加**

2. muted: 静音. **建议添加**

3. webkit-playsinline/playsinline: 基本保证iphone手机在H5页面内播放。个别不支持可以引入第三方库[iphone-inlie-video]('https://github.com/bfred-it/iphone-inline-video)。**建议添加**

4. x5-video-player-type="h5"/x5-playsinlin: anroid手机在H5页面内播放。（在android下表现不一）**建议添加**

``` html
<video
    ref="video"
    :poster="startSource"
    muted
    x-webkit-airplay="allow"
    x5-video-player-type="h5" x5-playsinline
    webkit-playsinline playsinline>
    <source :src="videoSource" type="video/mp4" />
</video>
```

## 2.自动播放
**先说结论：如果需要微信/网易云音乐/微博/QQ/浏览器等各平台完美自动播放，不行**。正确的解决方案：让视觉设计引导用户点击屏幕，进行播放视频。或者如果产品能接受，只要用户接触屏幕就开始播放(监听touchstart事件)。错误方式：~~video标签autoplay~~ 、~~js执行video.play~~、~~load完成后执行play()~~

 **只在微信端传播**。微信浏览器是经过特殊处理的，可以通过回调WeixinJSBridgeReady解决，适用于iPhone和anroid。注意自动播放的视频要无音轨或者手动muted。见示例代码：

``` js
<!-- 必须加在微信api资源 --> 
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

let that = this
if (window.WeixinJSBridge) {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        that.$refs.sectionOverview.afterLoad()
    }, false);
} else {
    document.addEventListener("WeixinJSBridgeReady", function () {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        that.$refs.sectionOverview.afterLoad()
        });
    }, false);
}
```

## 3.视频开始短暂黑屏

部分android机型点击播放视频时，会出现短暂1～2的黑屏。该问题出现可能是还没请求完成可顺利播放的视频。

解决方案：在视频上叠加一个div，把它的背景图换成首帧图。监听**timeupdate**事件，有视频播放时移除该div。

``` html
<div @click="play">
      <video
        ref="video"
        :poster="startSource"
        x-webkit-airplay="allow"
        x5-video-player-type="h5"
        x5-playsinline
        webkit-playsinline playsinline>
        <source :src="videoSource" type="video/mp4" />
      </video>
      <div :class="['cover-start']" v-if="!playing"></div>
    </div>
```

``` js
this.videoNode.addEventListener('timeupdate', () => {
    // 当视频的currentTime大于0.1时表示黑屏时间已过，已有视频画面，可以移除浮层
    if (this.videoNode.currentTime > 0.1 && !this.playing) {
    this.playing = true
    }
}, false)
```

## 4.部分Android机跳到x5 player播放视频

有些android在微信或浏览器，播放视频会跳到x5 player播放器中。这种video位于页面最顶层，无法被遮盖，说不定播完会推送腾讯视频信息，而且不会自动关掉。

解决方案：利用timeupdate事件，当视频快要结束时，手动remove掉整个视频。

``` js
this.videoNode.addEventListener('timeupdate', () => {
    // 兼容Android X5在浏览器行为.时间为视频时长
    if (this.videoNode.currentTime > 56.9) {
    this.isShowVideo = false
    }
}, false)
```

## 5.视频canplay的坑
换了引导用户的视频方案后，前面有个loading页面。产品希望视频加载好后，loading消失并视频可点击。但是ios下canplay和canplaythrough事件都不会执行回调。ios是点击播放后才会去加载视频流。android下会执行canplay事件回调，但视频流也是边下边播。所以无法准确获得视频可加载时间点

总结：H5现在视频标准不完善，除了**timeupdate**、**ended**事件外，其他事件慎用。

## 6.safari可以缩放视频

通常情况在meta的viewport中设置**user-scalable=no**即可。但是IOS 10以后的safari中，apple为了提高Safari中网站的辅助功能，即使网站在视口中设置该属性，用户也可以手动缩放。

解决方案：

``` js
// IOS10 Safari不识别meta，故需要js hack
document.documentElement.addEventListener('touchstart', function (event) {
if (event.touches && event.touches.length > 1) {
    event.preventDefault()
}
}, false)
``` 
