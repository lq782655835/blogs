# 底层浏览器原理

## 渲染引擎
浏览器内核`又叫渲染引擎，主要负责 HTML、CSS 的解析，页面布局、渲染与复合层合成`。浏览器内核的不同带来的主要问题是对 CSS 的支持度与属性表现差异。

现在主流的内核有：Blink、Webkit、Gecko、EdgeHTML、Trident，这里面有几个需要注意的地方：

* Blink 是在 Webkit 的基础上的改进，是现在对新特性支持度最好的内核
* 移动端基本上全部是 Webkit 或 Blink 内核（除去 Android 上腾讯家的 X5），这两个内核对新特性的支持度较高，所以新特性可以在移动端大展身手。
* Trident 是 IE4+ 的内核，一直持续到 IE11，EdgeHTML 是微软抛弃 IE 后开发的全新内核

> Chromium内核架构，包含Blink渲染引擎和V8 JS引擎。简单理解是阉割版Chrome浏览器。

## JavaScript 引擎

`负责 JavaScript 代码的解释与执行`，主流的 JavaScript 引擎有：V8、SpiderMonkey、JavaScriptCore、Chakra。

### V8
JavaScriptCore是WebKit的默认引擎，在谷歌系列产品中被替换为V8引擎。

V8 是谷歌开发的高性能 JavaScript 引擎，该引擎使用 C++ 开发。在V8引擎中，源代码先被解析器转变为抽象语法树(AST)，然后使用JIT编译器的全代码生成器从AST直接生成本地可执行代码。

* JavaScriptCore 的大致流程为：源代码-→抽象语法树-→字节码(可优化阶段)-→JIT-→本地代码。

* V8 的大致流程为：源代码-→抽象语法树-→JIT-→本地代码（在此优化）。

![](https://pic1.zhimg.com/80/v2-993bbf0a46f6feaef5f7b5005aa1aa34_hd.png)

### 性能比较

JS是边解释边编译，Java是提前编译。Java在编译阶段把AST转换为字节码，同时做着优化，最后生成可直接执行的本地代码。所以从语言层面讲，JS的性能与Java、C++不再同一个层次上。

![](https://pic1.zhimg.com/80/v2-0f5471e21a25e237dcfae2d34a306788_hd.png)

## JS引擎和渲染引擎关系

渲染引擎遇到js代码会通知让JS引擎解析，然后JS引擎解释执行后，通过DOM改变并渲染网页（这部分工作属于渲染引擎）。

JavaScript引擎和渲染引擎的关系如下图所示：
![](https://pic4.zhimg.com/80/v2-43b71b75cd4f28db05ab967e3aad5a97_hd.png)

> JavaScript是一种动态类型语言，函数也是类型的一种，所以可以把函数当作参数值进行传递（这就是FP中常说的函数天生是“一等公民”）