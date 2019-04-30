Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。

* 虚拟DOM

* tag 做判断，如果是 string 类型
    * 如果是内置的一些节点，则直接创建一个普通 VNode
    * 如果是为已注册的组件名，则通过 createComponent 创建一个组件类型的 VNode

## 全局组件/指令
* 全局组件 platforms/web/runtime/components
    * transition-group
    * transition
* 全局指令 platforms/web/runtime/directives
    * v-model
    * v-show

## 事件系统
1. 先编译模板，找出事件名

![](https://user-gold-cdn.xitu.io/2018/8/30/16586a0d1261a7b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
