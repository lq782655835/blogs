# Javascript v8引擎和Web API

我一直在阅读Javascript的内部知识(在chrome浏览器中)，但我有一些问题似乎找不到适当的答案。

根据我的理解:

V8中包含了
* Core Javascript(根据ECMA规范)引擎。
* 浏览器的Web API提供了类似于settimeout的功能。
* V8引擎包括一个调用堆栈和任何将要使用的Javascript。被执行的被压入该堆栈。
* 然后通过Web API调用非标准函数。
* 这些完成时将被推送到回调队列。
* 一旦堆栈为空，回调队列中的所有内容都会被推送,通过事件循环进入堆栈。

问题：当`V8引擎解释Javascript代码时，如何知道某个特定功能来自Web API`？ Web API实际如何与引擎链接？

## 最佳答案

像setTimeout()这样的API已添加到Javascript的global对象中。当JS引擎寻求解析符号时，它从本地范围开始，并向上延伸一系列范围。链的最末端是global范围。

`宿主环境可以作为初始化V8引擎的一部分，将其自己的API添加到V8引擎的全局范围中，这正是浏览器针对V8尚未内置的功能所做的事情。`

> 浏览器内核包括：渲染引擎 + JS引擎（比如V8（Blink内核）、JavaScriptCore（WebKit内核））。注：Blink内核（Google）是WebKit内核（Safari）的分支