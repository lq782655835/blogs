# 小程序运行机制

## 什么是WebView

> WebView objects allow you to display web content as part of your activity layout, but lack some of the features of fully-developed browsers. A WebView is useful when you need increased control over the UI and advanced configuration options that will allow you to embed web pages in a specially-designed environment for your app.

## 双线程模型

类似于微信 JSSDK 这样的 Hybrid 技术，微信小程序的界面主要由成熟的 Web 技术渲染，辅之以大量的接口提供丰富的客户端原生能力。

每个小程序页面都是用不同的 WebView 去渲染，这样可以提供更好的交互体验，更贴近原生体验，也避免了单个 WebView 的任务过于繁重。此外，界面渲染这一块我们定义了一套内置组件以统一体验，并且提供一些基础和通用的能力，进一步降低开发者的学习门槛。

我们需要像Web 技术那样，有一份随时可更新的资源包放在云端，通过下载到本地，动态执行后即可渲染出界面。
web缺陷：UI渲染跟 JavaScript 的脚本执行都在一个单线程中执行，这就容易导致一些逻辑任务抢占UI渲染的资源。


js代码在

![双线程模型](https://user-gold-cdn.xitu.io/2019/5/17/16ac48abdb826898?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
