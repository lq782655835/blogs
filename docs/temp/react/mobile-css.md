# 移动端css适配大全

## iPhoneMediaQuery 全适配

``` css
// variables.less

/**
 * [iPhone系列的MediaQuery：各版本定义]
 */
@iPhoneX: ~' only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)';
@iPhoneXS: @iPhoneX;
@iPhoneXSMax: ~' only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)';
@iPhoneXR: ~' only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)';
// iPhoneXR应对 聚宝APP 的hackQuery
@iPhoneXRJUBAO: ~' only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2)';
// iPhone12应对 Xcode12,Alipay>=10.2.10 的hackQuery
@iPhone12: ~' only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)';
@iPhone12Pro: @iPhone12;
@iPhone12ProMax: ~' only screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)';

/**
 * [iPhone系列媒体查询，包含以上所有有效机型，方便使用 & 统一维护]
 */
@iPhoneMediaQuery: @iPhoneX, @iPhoneXSMax, @iPhoneXR, @iPhoneXRJUBAO, @iPhone12, @iPhone12ProMax;



// anyother.less
@import "~/variables.less";

// iPhone适配
@media @iPhoneMediaQuery {
  .test {
    // ...
  }
}
```

## 移动端最佳的字体设置

``` css
font-family: PingFang SC, miui, system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, sans-serif;
```

1. -apple-system、BlinkMacSystemFont：-apple-system是Apple在iOS 9，OSX 10.11中引入，通过它可以声明使用系统最新的San Francisco字体，并且未来系统更新字体后也可以自动指向新的字体，而BlinkMacSystemFont是Chrome针对-apple-system的类似实现
1. system-ui：是针对-apple-system和BlinkMacSystemFont的标准实现，Chrome 56+、Safari 10+开始支持，所以类似场景可以这样声明：font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif
1. Noto Sans CJK SC：即思源黑体 - 简体中文，思源黑体是Google和Adobe合作开发的开源字体，是Android 5.0以后的默认中文字体，也是唯一的中文字体，该字体本身包含7种字重，而Android只安装了Regular这一个字重，Chrome开发者工具里显示：Noto Sans CJK SC Regular，因为Android里没有针对该字体设置family name，所以无法直接通过font-family指定，只能作为fallback来使用
1. Roboto：这是Google专门为Android开发的开源字体，Android 4.0以后的默认英文字体，无法直接通过font-family指定，使用：font-family: system-ui
San Francisco：最早是Apple为watchOS设计的字体，后来在OS X 10.11 El Capitan和iOS 9中取代了Helvetica Neue，成为默认的英文字体，该字体在Chrome开发者工具里查看的话会显示成.SF NS Text（包含6种字重）和.SF NS Display（包含9种字重），字号小于20px时使用.SF NS Text，20px以上时使用.SF NS Display，可以使用font-family: system-ui, -apple-system, BlinkMacSystemFont来声明，如果你非要手动声明，字号20px以上时使用：.SFNSDisplay-Black、.SFNSDisplay-Bold、.SFNSDisplay-Heavy、.SFNSDisplay-Light、.SFNSDisplay-Medium、.SFNSDisplay-Regular、.SFNSDisplay-Semibold、.SFNSDisplay-Thin、.SFNSDisplay-Ultralight，字号小于20px时可以用：.SFNSText-Bold、.SFNSText-Heavy、.SFNSText-Light、.SFNSText-Medium、.SFNSText-Regular、.SFNSText-Semibold
1. PingFang SC：即苹方 - 简体中文，这是Apple在iOS 9时专门设计的中文字体，和英文字体San Francisco配合非常协调，对应的font-family名字是：PingFang SC，包含6种字重
1. miui：即小米兰亭，2016年5月10日发布MIUI8系统时推出的定制字体，是小米和方正一起完成的，共设计了4档不同的字重：Regular（对应400～600）、Bold（对应700～900）、Light（对应300）和Thin（对应100～200），其中Thin在chrome下渲染存在问题，只有部分文字会变成Thin

## 实践踩坑

### 1. 不可在html上加上如下css，不然会造成ios抖动

``` css
//  不可取
html,
body {
  overflow-x: hidden !important;
  overflow-y: scroll;
}
```


# 性能

### Q：script标签async和defer的作用

A：defer和async可以用来控制外部脚本的执行。首先可以看看解释。
defer：用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。
async：HTML5新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。

链接：https://segmentfault.com/q/1010000000640869

https://page.cainiao.com/guoguo/score-shop-site/entry.html#/
