# 小程序框架原理

小程序实现原理：数据驱动视图更新；视图交互触发事件，事件响应函数修改数据再次触发视图更新。

![](https://qqadapt.qpic.cn/txdocpic/0/e6169b3d0bfecac8a6463fafdc926a69/0)

## mpvue

vue.js和小程序的工作原理一致，可以把小程序的功能托管给vue.js，在正确的时机将数据变更同步到小程序，从而达到开发小程序的目的。这样，我们可以将精力聚焦在 Vue.js 上，参照 Vue.js 编写与之对应的小程序代码，小程序负责视图层展示，所有业务逻辑收敛到 Vue.js 中，Vue.js 数据变更后同步到小程序.

![](https://qqadapt.qpic.cn/txdocpic/0/6c6a70b74f690bf77f7b1ebc41b4a422/0)

[mpvue 解析](https://www.cnblogs.com/dhsz/p/9282296.html)