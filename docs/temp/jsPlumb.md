# jsPlumb

## 基本概念

* Source: 源对象。jsPlumb 通过元素的 id 属性获取对象。

* Target: 目标对象。jsPlumb 通过元素的 id 属性获取对象。

* Source 和 Target 都可以是任何元素，区别是，Source 是起点，Target 是终点。 例如，connector 中的箭头总是从 Source 指向 Target。

* Anchor：锚点。是 Source 和 Target 对象上可以连接 Connector 的点。Anchor 并不是一个视觉概念，它是不可见的。

* Connector: 连接线。

* Endpoint: 端点。需要注意的是，箭头并不是一种端点样式，它是通过 overlay 添加的。

* Overlay: 添加到连接线上的附件。例如箭头和标签。

![](https://github.com/wangduanduan/jsplumb-chinese-tutorial/blob/master/images/20180227151857_Pu4O9c_jsPlumb-Connector-Components.jpeg)


## [Event](http://jsplumb.github.io/jsplumb/events.html)

endpoint：支持自定义设置样式、设置isSource/isTarget、默认的可connect连接 + 回调。

* connection(info, originalEvent): 新的连接事件回调
* connectionDrag：connection
* connectionDragStop：connection
* connectionDragMoved：params.connection
* beforeDetach：connection
connectionDetached(info, originalEvent): 断开时事件回调
* click：connection

### 方法

* instance.batch(function() {})
* instance.addEndpoint(...args)

* instance.connect({uuids}) 编码连线
* instance.draggable(target, setting) 可拖拽node节点

### connection

connection.getOverlay('label').setLabel(str)

## 参考

https://www.cnblogs.com/ysx215/p/7615677.html