(window.webpackJsonp=window.webpackJsonp||[]).push([[220],{725:function(t,a,v){"use strict";v.r(a);var e=v(9),i=Object(e.a)({},(function(){var t=this,a=t.$createElement,v=t._self._c||a;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"javascript-v8引擎和web-api"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#javascript-v8引擎和web-api"}},[t._v("#")]),t._v(" Javascript v8引擎和Web API")]),t._v(" "),v("p",[t._v("我一直在阅读Javascript的内部知识(在chrome浏览器中)，但我有一些问题似乎找不到适当的答案。")]),t._v(" "),v("p",[t._v("根据我的理解:")]),t._v(" "),v("p",[t._v("V8中包含了")]),t._v(" "),v("ul",[v("li",[t._v("Core Javascript(根据ECMA规范)引擎。")]),t._v(" "),v("li",[t._v("浏览器的Web API提供了类似于settimeout的功能。")]),t._v(" "),v("li",[t._v("V8引擎包括一个调用堆栈和任何将要使用的Javascript。被执行的被压入该堆栈。")]),t._v(" "),v("li",[t._v("然后通过Web API调用非标准函数。")]),t._v(" "),v("li",[t._v("这些完成时将被推送到回调队列。")]),t._v(" "),v("li",[t._v("一旦堆栈为空，回调队列中的所有内容都会被推送,通过事件循环进入堆栈。")])]),t._v(" "),v("p",[t._v("问题：当"),v("code",[t._v("V8引擎解释Javascript代码时，如何知道某个特定功能来自Web API")]),t._v("？ Web API实际如何与引擎链接？")]),t._v(" "),v("h2",{attrs:{id:"最佳答案"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#最佳答案"}},[t._v("#")]),t._v(" 最佳答案")]),t._v(" "),v("p",[t._v("像setTimeout()这样的API已添加到Javascript的global对象中。当JS引擎寻求解析符号时，它从本地范围开始，并向上延伸一系列范围。链的最末端是global范围。")]),t._v(" "),v("p",[v("code",[t._v("宿主环境可以作为初始化V8引擎的一部分，将其自己的API添加到V8引擎的全局范围中，这正是浏览器针对V8尚未内置的功能所做的事情。")])]),t._v(" "),v("blockquote",[v("p",[t._v("浏览器内核包括：渲染引擎 + JS引擎（比如V8（Blink内核）、JavaScriptCore（WebKit内核））。注：Blink内核（Google）是WebKit内核（Safari）的分支")])])])}),[],!1,null,null,null);a.default=i.exports}}]);