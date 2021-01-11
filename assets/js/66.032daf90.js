(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{575:function(t,a,s){"use strict";s.r(a);var e=s(9),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"javascript事件循环"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#javascript事件循环"}},[t._v("#")]),t._v(" JavaScript事件循环")]),t._v(" "),s("h2",{attrs:{id:"_1-概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-概念"}},[t._v("#")]),t._v(" 1. 概念")]),t._v(" "),s("h3",{attrs:{id:"_1-1-单线程、同步、异步"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-单线程、同步、异步"}},[t._v("#")]),t._v(" 1.1 单线程、同步、异步")]),t._v(" "),s("p",[t._v("JS是单线程，单线程即任务是串行的，后一个任务需要等待前一个任务的执行，这就可能出现长时间的等待。但由于类似ajax网络请求、setTimeout时间延迟、DOM事件的用户交互等，这些任务并不消耗 CPU，是一种空等，资源浪费，因此出现了异步。通过将任务交给相应的异步模块去处理，主线程的效率大大提升，可以并行的去处理其他的操作。当异步处理完成，主线程空闲时，主线程读取相应的callback，进行后续的操作，最大程度的利用CPU。")]),t._v(" "),s("p",[t._v("此时出现了同步执行和异步执行的概念，同步执行是主线程按照顺序，CPU串行执行任务（通过执行栈，先进后出）；异步执行就是跳过等待，先处理后续的同步任务（不是说异步不执行了，而是交给网络模块、timer等并行进行任务）。由此"),s("code",[t._v("产生了事件循环与任务队列（ES6新增），来协调主线程与异步模块之间的工作。")])]),t._v(" "),s("h3",{attrs:{id:"_1-2-引擎和runtime"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-引擎和runtime"}},[t._v("#")]),t._v(" 1.2 引擎和runtime")]),t._v(" "),s("p",[t._v("在具体执行层，是依赖"),s("code",[t._v("js引擎")]),t._v("和"),s("code",[t._v("宿主环境runtime")]),t._v("来实现event loop机制。")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("引擎")]),t._v("：解释并编译代码，让它变成能交给机器运行的代码。")]),t._v(" "),s("li",[s("code",[t._v("runtime")]),t._v(": 宿主环境，提供异步处理模块（如"),s("RouterLink",{attrs:{to:"/js/http-base-2.browser.html"}},[t._v("浏览器内核")]),t._v("（也叫渲染引擎）的Timer模块、Ajax的Network模块、事件的DOM binding模块等）。")],1)]),t._v(" "),s("p",[t._v("注意，"),s("code",[t._v("通常是宿主环境提供事件循环机制")]),t._v("来处理程序中多个块的执行，执行时调用JavaScript引擎。换句话说，JS引擎本身没有时间的概念，只是一个按需执行js任意代码片段的环境。“事件”（JavaScript代码执行）调度总是由包含它的环境进行。")]),t._v(" "),s("p",[t._v("举个例子，如果JavaScript程序发出一个Ajax请求（从服务器获取一些数据），通常会在一个函数中（通常称为回调函数）设置好响应代码，然后JavaScript引擎会通知宿主环境：“嘿，现在我要暂停执行，你一旦完成网络请求拿到数据，请调用这个函数。”然后浏览器（宿主环境）拿到数据后，就会把回调函数插入到事件循环中。")]),t._v(" "),s("h3",{attrs:{id:"_1-3-执行栈"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-执行栈"}},[t._v("#")]),t._v(" 1.3 执行栈")]),t._v(" "),s("p",[t._v("当javascript代码执行的时候会将不同的变量存于内存中的不同位置：堆（heap）和栈（stack）中来加以区分。其中，堆里存放着一些对象。而栈中则存放着一些基础类型变量以及对象的指针。 但是我们这里说的执行栈和上面这个栈的意义却有些不同。")]),t._v(" "),s("p",[t._v("当我们调用一个方法的时候，js会生成一个与这个方法对应的执行环境（context），又叫"),s("code",[t._v("执行上下文")]),t._v("。这个执行环境中存在着这个方法的私有作用域，上层作用域的指向，方法的参数，这个作用域中定义的变量以及这个作用域的this对象。 而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方。这个地方被称为"),s("code",[t._v("执行栈")]),t._v("。")]),t._v(" "),s("p",[t._v("当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。当这个执行环境中的代码 执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境。这个过程反复进行，直到执行栈中的代码全部执行完毕。")]),t._v(" "),s("h2",{attrs:{id:"_2-事件循环"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-事件循环"}},[t._v("#")]),t._v(" 2. 事件循环")]),t._v(" "),s("h3",{attrs:{id:"event-loop定义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#event-loop定义"}},[t._v("#")]),t._v(" Event Loop定义")]),t._v(" "),s("p",[t._v("网络上许多文章关于event loop定义不是很清晰，我们直接看官方规范标准。再次强调事件循环机制是由宿主决定，Web宿主规范标准定义在"),s("a",{attrs:{href:"https://html.spec.whatwg.org/multipage/webappapis.html#event-loops",target:"_blank",rel:"noopener noreferrer"}},[t._v("HTML Standand"),s("OutboundLink")],1),t._v("中，NodeJS宿主规范标准定义在"),s("a",{attrs:{href:"http://docs.libuv.org/en/v1.x/design.html#the-i-o-loop",target:"_blank",rel:"noopener noreferrer"}},[t._v("libuv"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("p",[t._v("简单理解为：")]),t._v(" "),s("ol",[s("li",[t._v("所有同步任务都在主线程上执行，形成一个"),s("code",[t._v("执行栈")]),t._v("。")]),t._v(" "),s("li",[t._v('主线程之外，还存在一个"'),s("code",[t._v("事件队列")]),t._v('"。只要异步操作执行完成，就到事件队列中排队。')]),t._v(" "),s("li",[t._v("一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取事件队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。")]),t._v(" "),s("li",[t._v("主线程不断重复上面的第三步。")])]),t._v(" "),s("p",[t._v("使用伪代码来说明事件队列概念：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// eventLoop队列数组，先进先出")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" eventLoop "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// “永远”执行，事件循环嘛")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 一次tick")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("eventLoop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        event "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" eventLoop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("shift")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拿到队列中下一个事件")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("event")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行。这代码里面可能产生新的event放在eventLoop中")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("while循环实现持续运行的循环，循环的每一轮称为tick。对每个tick而言，如果在队列中有等待事件，那么就会在队列中摘下一个事件并执行。这些事件就是你的回调函数。")]),t._v(" "),s("p",[t._v("注意，setTimeout不是把你的回调函数挂在事件循环队列中，而是设置一个定时器，当定时器到时后，环境会把你的回调函数放在事件循环中。这样，在未来某个时刻的tick会摘下并执行这个回调（真正的放在执行栈中执行）")]),t._v(" "),s("blockquote",[s("p",[t._v("以上说过是宿主环境提供事件循环，但ES6本质上改变了在哪里管理事件循环。由于ES6 Promise的引入，这技术要求对事件循环队列的调度运行能够直接进行精确控制，所以事件循环后续会纳入JavaScirpt引擎的势力范围，而不是只由宿主环境来管理。")])]),t._v(" "),s("h2",{attrs:{id:"_3-任务队列"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-任务队列"}},[t._v("#")]),t._v(" 3. 任务队列")]),t._v(" "),s("p",[s("strong",[t._v("这是在ES6中引入的概念，它加在事件循环队列之上")]),t._v("。这个概念带来最大的影响可能是Promise的异步特性。")]),t._v(" "),s("p",[t._v("对于"),s("code",[t._v("任务队列")]),t._v("最好的理解方式就是，它是挂在"),s("code",[t._v("事件循环队列")]),t._v("的每个tick之后的一个队列。在事件循环的每个tick中，可能出现的异步动作不会导致一个完整的新事件添加到事件循环队列中，而会在当前tick的任务队列末尾添加一个任务。")]),t._v(" "),s("h3",{attrs:{id:"_3-1-macrotask和microtask区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-macrotask和microtask区别"}},[t._v("#")]),t._v(" 3.1 macrotask和microtask区别")]),t._v(" "),s("p",[t._v("网络上有非常多介绍这两个的文章，但读完之后依然很晕。其实"),s("strong",[t._v("事件循环队列===macrotask，任务队列 === microtask")]),t._v("。这样理解规范就简单了：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("An event loop has one or more task queues. A task queue is a set of tasks.\n\nThe microtask queue is not a task queue.\n// 一个event loop有一个或者多个task队列（ps：task队列 === 事件循环队列）。\n// microtask队列不是一个task队列。（ps：微任务队列只有一个，而且每一次tick，都会清空微任务队列）\n")])])]),s("ul",[s("li",[t._v("宏任务（事件循环队列）："),s("code",[t._v("script（全局任务，这个很重要）")]),t._v(", setTimeout, setInterval, setImmediate, I/O, UI rendering.")]),t._v(" "),s("li",[t._v("微任务（任务队列）：process.nextTick, Promise, Object.observer, MutationObserver.")])]),t._v(" "),s("h3",{attrs:{id:"_3-2-macrotask和microtask调用顺序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-macrotask和microtask调用顺序"}},[t._v("#")]),t._v(" 3.2 macrotask和microtask调用顺序")]),t._v(" "),s("p",[t._v("简化代码示意：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 事件循环取macroTaskQueue")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 微任务队列只有一个，而且每一次tick，都会清空微任务队列")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("macroTask "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" macroTaskQueue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("handleMacroTask")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("microTask "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" microTaskQueue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("handleMicroTask")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("microTask"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"_3-3-示例解释"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-示例解释"}},[t._v("#")]),t._v(" 3.3 示例解释")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Promise"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("promise1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'promise1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'setTimeout1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    Promise"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("promise2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'promise2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'setTimeout2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// promise1")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// setTimeout1")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// promise2")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// setTimeout2")]),t._v("\n")])])]),s("p",[t._v("运行过程：")]),t._v(" "),s("p",[s("code",[t._v("初始情况，执行栈为空，循环1：")])]),t._v(" "),s("p",[t._v("【task队列：script ；microtask队列：】")]),t._v(" "),s("p",[t._v("从task队列中取出script任务，推入栈中执行。promise1列为microtask，setTimeout1列为task，setTimeout2列为task。")]),t._v(" "),s("p",[t._v("【task队列：setTimeout1 setTimeout2；microtask队列：promise1】")]),t._v(" "),s("p",[t._v("script任务执行完毕，执行microtask checkpoint，取出microtask队列的promise1执行。")]),t._v(" "),s("p",[s("code",[t._v("执行栈为空，循环2：")])]),t._v(" "),s("p",[t._v("【task队列：setTimeout1 setTimeout2；microtask队列：】")]),t._v(" "),s("p",[t._v("从task队列中取出setTimeout1，推入栈中执行，将promise2列为microtask。")]),t._v(" "),s("p",[t._v("【task队列：setTimeout2；microtask队列：promise2】")]),t._v(" "),s("p",[t._v("执行microtask checkpoint，取出microtask队列的promise2执行。")]),t._v(" "),s("p",[s("code",[t._v("执行栈为空，循环3：")])]),t._v(" "),s("p",[t._v("【task队列：setTimeout2；microtask队列：】")]),t._v(" "),s("p",[t._v("从task队列中取出setTimeout2，推入栈中执行。setTimeout2任务执行完毕，执行microtask checkpoint。")]),t._v(" "),s("p",[t._v("【task队列：；microtask队列：】")]),t._v(" "),s("blockquote",[s("p",[t._v("也可以在这个"),s("a",{attrs:{href:"http://latentflip.com/loupe/?code=ZnVuY3Rpb24gZ2V0WSAoeCkgewogICAgCiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZShyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHByb21pc2VUaW1lb3V0KCkgewogICAgICAgICAgICByZXNvbHZlKCgzICogeCkgLSAxKTsKICAgICAgICB9LCAwKTsKICAgIH0pOwp9CgpmdW5jdGlvbiBmb28gKGJhciwgYmF6KSB7CgogICAgdmFyIHggPSBiYXIgKiBiYXo7CgogICAgcmV0dXJuIGdldFkoeCkKICAgICAgICAudGhlbihmdW5jdGlvbiByZXR1cm5BcnJheSh5KSB7CiAgICAgICAgICAgIHJldHVybiBbIHgsIHkgXTsKICAgICAgICB9KTsKfQpzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXQoKSB7CiAgICBjb25zb2xlLmxvZygndGltZW91dCcpCn0sIDApCgpmb28oMTAsIDIwKS50aGVuKGZ1bmN0aW9uIGxvZ01zZyhtc2dzKSB7CiAgICBjb25zb2xlLmxvZyhtc2cpOwp9KTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D",target:"_blank",rel:"noopener noreferrer"}},[t._v("网站"),s("OutboundLink")],1),t._v("中查看浏览器执行代码时的实时事件循环和任务队列情况。")])]),t._v(" "),s("h2",{attrs:{id:"_4-requestanimationframe和requestidlecallback"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-requestanimationframe和requestidlecallback"}},[t._v("#")]),t._v(" 4. requestAnimationFrame和requestIdleCallback")]),t._v(" "),s("p",[t._v("这两个api其实跟事件循环机制没太大关系，但执行多少个tick会去更新视图？这两个api执行时机在哪？")]),t._v(" "),s("h3",{attrs:{id:"_4-1-浏览器frame-每一帧"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-浏览器frame-每一帧"}},[t._v("#")]),t._v(" 4.1 浏览器Frame（每一帧）")]),t._v(" "),s("p",[t._v("浏览器每一帧都需要完成哪些工作？")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/3963958-432f5165ba423f57.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1200/format/webp",alt:""}})]),t._v(" "),s("p",[t._v("通过上图可看到，一帧内需要完成如下六个步骤的任务：")]),t._v(" "),s("ol",[s("li",[t._v("处理用户的交互")]),t._v(" "),s("li",[t._v("JS 解析执行")]),t._v(" "),s("li",[t._v("帧开始。窗口尺寸变更，页面滚去等的处理")]),t._v(" "),s("li",[t._v("requestAnimationFrame(rAF)")]),t._v(" "),s("li",[t._v("布局")]),t._v(" "),s("li",[t._v("绘制")])]),t._v(" "),s("p",[s("code",[t._v("requestAnimationFrame 每一帧必定会执行，requestIdleCallback 是检测浏览器空闲来执行任务")]),t._v("。")]),t._v(" "),s("h3",{attrs:{id:"_4-2-requestanimationframe"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-requestanimationframe"}},[t._v("#")]),t._v(" 4.2 requestAnimationFrame")]),t._v(" "),s("p",[t._v("视图渲染发生在本轮事件循环的microtask队列被执行完之后，但不是每轮事件循环都会执行视图更新，浏览器有自己的优化策略。所以"),s("code",[t._v("一次视图更新（16.7ms）可能有1次事件循环")]),t._v("（这就要求该tick的js处理尽量不超过16.7ms，不然有可能掉帧），"),s("code",[t._v("也可能有多次事件循环")]),t._v("（可能每个tick不耗时），但"),s("code",[t._v("每次执行重绘前，都会通知requestAnimationFrame执行回调函数")]),t._v("。")]),t._v(" "),s("h3",{attrs:{id:"_4-3-requestidlecallback"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-requestidlecallback"}},[t._v("#")]),t._v(" 4.3 requestIdleCallback")]),t._v(" "),s("p",[t._v("上面六个步骤完成后没超过 16.7 ms，说明时间有富余，此时就会执行 requestIdleCallback 里注册的任务。")]),t._v(" "),s("p",[t._v("假如浏览器一直处于非常忙碌的状态，requestIdleCallback 注册的任务有可能永远不会执行。requestIdleCallback发生在一帧的最后，此时页面布局已经完成，所以不建议在 requestIdleCallback 里再操作 DOM，这样会导致页面再次重绘。DOM 操作建议在 rAF 中进行。")]),t._v(" "),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),s("ul",[s("li",[s("p",[s("a",{attrs:{href:"https://flaviocopes.com/javascript-event-loop/",target:"_blank",rel:"noopener noreferrer"}},[t._v("The JavaScript Event Loop"),s("OutboundLink")],1)])]),t._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript Event Loop Explained"),s("OutboundLink")],1)])]),t._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://ustbhuangyi.github.io/vue-analysis/reactive/next-tick.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("JS 运行机制"),s("OutboundLink")],1)])]),t._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://www.cnblogs.com/hity-tt/p/6733062.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("任务队列、web API、JS主线程的相互协同"),s("OutboundLink")],1)])]),t._v(" "),s("li",[s("p",[s("a",{attrs:{href:"https://github.com/aooy/blog/issues/5",target:"_blank",rel:"noopener noreferrer"}},[t._v("从event loop规范探究javaScript异步及浏览器更新渲染时机"),s("OutboundLink")],1)])]),t._v(" "),s("li",[s("p",[t._v("你不知道的JavaScript（中卷）- 异步")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);