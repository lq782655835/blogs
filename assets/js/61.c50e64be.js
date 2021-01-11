(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{563:function(v,_,t){"use strict";t.r(_);var a=t(9),r=Object(a.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"javascript与浏览器-线程与引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#javascript与浏览器-线程与引擎"}},[v._v("#")]),v._v(" JavaScript与浏览器 - 线程与引擎")]),v._v(" "),t("p",[v._v("整个浏览器是多进程的，平时我们经常接触的是JS引擎和渲染引擎都是属于单个进程（单个tab页）的一个线程。这里我们探究下现代浏览器的多进程设计？单个进程下的多线程设计以及js引擎为何是单线程？同时了解下js引擎和渲染引擎能力范围和关系？")]),v._v(" "),t("h2",{attrs:{id:"进程与线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#进程与线程"}},[v._v("#")]),v._v(" 进程与线程")]),v._v(" "),t("p",[v._v("进程")]),v._v(" "),t("p",[v._v("学术上说，进程是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程，是操作系统进行资源分配和调度的一个独立单位，是应用程序运行的载体。我们这里将进程比喻为工厂的车间，它代表CPU所能处理的单个任务。任一时刻，CPU总是运行一个进程，其他进程处于非运行状态。")]),v._v(" "),t("p",[v._v("线程")]),v._v(" "),t("p",[v._v("在早期的操作系统中并没有线程的概念，进程是能拥有资源和独立运行的最小单位，也是程序执行的最小单位。任务调度采用的是时间片轮转的抢占式调度方式，而进程是任务调度的最小单位，每个进程有各自独立的一块内存，使得各个进程之间内存地址相互隔离。后来，随着计算机的发展，对CPU的要求越来越高，进程之间的切换开销较大，已经无法满足越来越复杂的程序的要求了。于是就发明了线程，线程是程序执行中一个单一的顺序控制流程，是程序执行流的最小单元。这里把线程比喻一个车间的工人，即一个车间可以允许由多个工人协同完成一个任务。")]),v._v(" "),t("p",[v._v("进程和线程的区别和关系")]),v._v(" "),t("ul",[t("li",[v._v("一个进程由一个或多个线程组成，多个线程可协同工作（共享内存空间）")]),v._v(" "),t("li",[v._v("进程之间相互独立，但同一进程下的各个线程之间共享程序的内存空间(包括代码段、数据集、堆等)及一些进程级的资源(如打开文件和信号)。")]),v._v(" "),t("li",[v._v("调度和切换：线程上下文切换比进程上下文切换要快得多。")])]),v._v(" "),t("h2",{attrs:{id:"浏览器多进程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器多进程"}},[v._v("#")]),v._v(" 浏览器多进程")]),v._v(" "),t("p",[v._v("在浏览器刚被设计出来的时候，那时的网页非常的简单，每个网页的资源占有率是非常低的，因此一个进程处理多个网页时可行的。然后在今天，大量网页变得日益复杂。把所有网页都放进一个进程的浏览器面临在健壮性，响应速度，安全性方面的挑战。因为如果浏览器中的一个tab网页崩溃的话，将会导致其他被打开的网页应用。")]),v._v(" "),t("p",[v._v("另外相对于线程，进程之间是不共享资源和地址空间的,所以不会存在太多的安全问题，而由于多个线程共享着相同的地址空间和资源,所以会存在线程之间有可能会恶意修改或者获取非授权数据等复杂的安全问题。")]),v._v(" "),t("p",[v._v("浏览器的2个进程：")]),v._v(" "),t("ul",[t("li",[t("code",[v._v("Browser进程（只有1个）")]),v._v("。浏览器的主进程（负责协调、主控），只有一个。作用有\n"),t("ul",[t("li",[v._v("负责浏览器界面显示（壳的显示），比如网页之外的前进，后退界面、下载管理等")]),v._v(" "),t("li",[v._v("负责各个页面的管理，创建和销毁其他进程")]),v._v(" "),t("li",[v._v("将Renderer进程得到的内存中的Bitmap，绘制到用户界面上")]),v._v(" "),t("li",[v._v("网络资源的管理，下载等")])])]),v._v(" "),t("li",[t("code",[v._v("Renderer进程（多个，每个Tab是一个进程）")]),v._v("。Render进程主要作用为页面渲染，脚本执行，事件处理等（相当于每个tab都是一个应用程序，包含js执行、渲染等）。该进程有多个线程，著名的有JS线程以及渲染线程")])]),v._v(" "),t("h2",{attrs:{id:"单进程-单个页面tab-的多线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#单进程-单个页面tab-的多线程"}},[v._v("#")]),v._v(" 单进程（单个页面tab）的多线程")]),v._v(" "),t("p",[v._v("最主要的有"),t("code",[v._v("JS引擎线程、渲染线程")]),v._v("。")]),v._v(" "),t("h3",{attrs:{id:"_1-js引擎线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-js引擎线程"}},[v._v("#")]),v._v(" 1. JS引擎线程")]),v._v(" "),t("ul",[t("li",[v._v("也称为JS内核，负责处理Javascript脚本程序。（例如V8引擎）")]),v._v(" "),t("li",[v._v("JS引擎线程负责解析Javascript脚本，运行代码。")]),v._v(" "),t("li",[v._v("JS引擎一直等待着任务队列中任务的到来，然后加以处理，一个Tab页（renderer进程）中无论什么时候都只有一个JS线程在运行JS程序")]),v._v(" "),t("li",[v._v("同样注意，GUI渲染线程与JS引擎线程是互斥的，所以如果JS执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞。")])]),v._v(" "),t("p",[v._v("(1) 为什么JavaScript是单线程？")]),v._v(" "),t("p",[v._v("首先在明确一个概念，JS引擎线程生存在Render进程（浏览器渲染进程）。其实从前面的进程，线程之间的介绍已经明白，线程之间资源共享，相互影响。假设javascript的运行存在两个线程，彼此操作了同一个资源，这样会造成同步问题，修改到底以谁为标准。\n所以，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。")]),v._v(" "),t("p",[v._v("(2) WebWorker会造成js多线程吗？")]),v._v(" "),t("p",[v._v("Worker接口会生成"),t("code",[v._v("真正的操作系统级别的线程")]),v._v("。所以这里的webworker不是一个新的js引擎线程。而是操作系统级别的线程。线程的执行不会影响到原有的js引擎的执行，也不会影响到浏览器渲染Render进程。")]),v._v(" "),t("p",[v._v("所以WebWorker有以下限制：\n1、不能访问DOM和BOM对象的，Location和navigator的只读访问，并且navigator封装成了WorkerNavigator对象，更改部分属性。无法读取本地文件系统")]),v._v(" "),t("p",[v._v("2、子线程和父级线程的通讯是通过值拷贝，子线程对通信内容的修改，不会影响到主线程。在通讯过程中值过大也会影响到性能（解决这个问题可以用transferable objects）")]),v._v(" "),t("p",[v._v("3、并非真的多线程，多线程是因为浏览器的功能")]),v._v(" "),t("p",[v._v("4、兼容性不高")]),v._v(" "),t("p",[v._v("5 因为线程是通过importScripts引入外部的js，并且直接执行，其实是不安全的，很容易被外部注入一些恶意代码")]),v._v(" "),t("p",[v._v("6、条数限制，大多浏览器能创建webworker线程的条数是有限制的，虽然可以手动去拓展，但是如果不设置的话，基本上都在20条以内，每条线程大概5M左右，需要手动关掉一些不用的线程才能够创建新的线程（相关解决方案）")]),v._v(" "),t("p",[v._v("7、js存在真的线程的东西，比如SharedArrayBuffer")]),v._v(" "),t("p",[v._v("(3) js代码的执行（Event Loop）与其他线程之间的合作")]),v._v(" "),t("p",[v._v("JavaScript 引擎并不是独立运行的，它运行在宿主环境中，对多数开发者来说通常就是Web 浏览器。提供了一种机制来处理程序中多个块（这里的块可以理解成多个回掉函数）的执行，且执行每块时调用JavaScript 引擎，这种机制被称为事件循环。换句话说，"),t("code",[v._v("JavaScript 引擎本身并没有时间的概念，只是一个按需执行JavaScript 任意代码片段的环境。“事件”（JavaScript 代码执行）调度总是由包含它的环境进行")]),v._v("。这个调度是由事件触发线程调度的。")]),v._v(" "),t("h3",{attrs:{id:"_2-渲染线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-渲染线程"}},[v._v("#")]),v._v(" 2. 渲染线程")]),v._v(" "),t("p",[v._v("也叫渲染引擎（或者大家俗语上的浏览器内核，但其实浏览器内核包括渲染引擎和JS引擎），主要作用是：")]),v._v(" "),t("ul",[t("li",[v._v("负责渲染浏览器界面，解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制等。")]),v._v(" "),t("li",[v._v("当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时，该线程就会执行")]),v._v(" "),t("li",[v._v("注意，GUI渲染线程与JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起（相当于被冻结了），GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。")])]),v._v(" "),t("p",[v._v("不同渲染引擎带来的主要问题是对 CSS 的支持度与属性表现差异。现在主流的内核有：Blink、Webkit、Gecko、EdgeHTML、Trident，这里面有几个基础知识点：")]),v._v(" "),t("ul",[t("li",[v._v("Blink 是在 Webkit 的基础上的改进，是现在对新特性支持度最好的内核")]),v._v(" "),t("li",[v._v("移动端基本上全部是 Webkit 或 Blink 内核（除去 Android 上腾讯家的 X5），这两个内核对新特性的支持度较高，所以新特性可以在移动端大展身手。")]),v._v(" "),t("li",[v._v("Trident 是 IE4+ 的内核，一直持续到 IE11，EdgeHTML 是微软抛弃 IE 后开发的全新内核")])]),v._v(" "),t("blockquote",[t("p",[v._v("Chromium内核架构，包含Blink渲染引擎和V8 JS引擎。简单理解是阉割版Chrome浏览器。")])]),v._v(" "),t("h3",{attrs:{id:"_3-其他线程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-其他线程"}},[v._v("#")]),v._v(" 3. 其他线程")]),v._v(" "),t("ol",[t("li",[v._v("事件触发线程\n"),t("ul",[t("li",[v._v("归属于浏览器而不是JS引擎，用来控制事件循环（可以理解，JS引擎自己都忙不过来，需要浏览器另开线程协助）")]),v._v(" "),t("li",[v._v("当JS引擎执行代码块如setTimeOut时（也可来自浏览器内核的其他线程,如鼠标点击、AJAX异步请求等），会将对应任务添加到事件线程中")]),v._v(" "),t("li",[v._v("当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理")]),v._v(" "),t("li",[v._v("注意，由于JS的单线程关系，所以这些待处理队列中的事件都得排队等待JS引擎处理（当JS引擎空闲时才会去执行）")])])]),v._v(" "),t("li",[v._v("定时触发器线程\n"),t("ul",[t("li",[v._v("传说中的setInterval与setTimeout所在线程")]),v._v(" "),t("li",[v._v("浏览器定时计数器并不是由JavaScript引擎计数的,（因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确）")]),v._v(" "),t("li",[v._v("因此通过单独线程来计时并触发定时（计时完毕后，添加到事件队列中，等待JS引擎空闲后执行）")]),v._v(" "),t("li",[v._v("注意，W3C在HTML标准中规定，规定要求setTimeout中低于4ms的时间间隔算为4ms。")])])]),v._v(" "),t("li",[v._v("异步http请求线程\n"),t("ul",[t("li",[v._v("在XMLHttpRequest在连接后是通过浏览器新开一个线程请求")]),v._v(" "),t("li",[v._v("将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中。再由JavaScript引擎执行。")])])])]),v._v(" "),t("h3",{attrs:{id:"_4-js引擎和渲染引擎关系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-js引擎和渲染引擎关系"}},[v._v("#")]),v._v(" 4. JS引擎和渲染引擎关系")]),v._v(" "),t("p",[v._v("在"),t("RouterLink",{attrs:{to:"/js/http-base-1.url.html"}},[v._v("输入URL背后的技术步骤")]),v._v("中，详细说了浏览器是如何解析html、css以及js，并呈现最终的网页出来。重点是渲染引擎遇到js代码会通知让JS引擎解析，然后JS引擎解释执行后，通过DOM改变并渲染网页（这部分工作属于渲染引擎）。")],1),v._v(" "),t("p",[v._v("JavaScript引擎和渲染引擎的关系如下图所示：")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://user-images.githubusercontent.com/6310131/57189224-5bc7ff80-6f3e-11e9-9dd0-2c7bfb5ec14c.png",alt:"image"}})]),v._v(" "),t("h2",{attrs:{id:"v8引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#v8引擎"}},[v._v("#")]),v._v(" V8引擎")]),v._v(" "),t("p",[v._v("聊下大名鼎鼎的V8引擎。JavaScriptCore是WebKit的默认引擎，在谷歌系列产品中被替换为V8引擎。")]),v._v(" "),t("p",[v._v("V8 是谷歌开发的高性能 JavaScript 引擎，该引擎使用 C++ 开发。在V8引擎中，源代码先被解析器转变为抽象语法树(AST)，然后使用JIT编译器的全代码生成器从AST直接生成本地可执行代码。")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("JavaScriptCore 的大致流程为：源代码-→抽象语法树-→字节码(可优化阶段)-→JIT-→本地代码。")])]),v._v(" "),t("li",[t("p",[v._v("V8 的大致流程为：源代码-→抽象语法树-→JIT-→本地代码（在此优化）。")])])]),v._v(" "),t("p",[t("img",{attrs:{src:"https://user-images.githubusercontent.com/6310131/57189210-320ed880-6f3e-11e9-8328-941607c36e76.png",alt:"image"}})]),v._v(" "),t("h4",{attrs:{id:"性能比较"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#性能比较"}},[v._v("#")]),v._v(" 性能比较")]),v._v(" "),t("p",[v._v("JS是边解释边编译，Java是提前编译。Java在编译阶段把AST转换为字节码，同时做着优化，最后生成可直接执行的本地代码。所以从语言层面讲，JS的性能与Java、C++不再同一个层次上。但边解释边编译意味着js语言更加灵活，易用，同时V8引擎也在不断优化性能，赋能js更多领域。")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://user-images.githubusercontent.com/6310131/57189215-4652d580-6f3e-11e9-83c8-9b64b07bb9fb.png",alt:"image"}})])])}),[],!1,null,null,null);_.default=r.exports}}]);