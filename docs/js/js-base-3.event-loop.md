# JavaScript事件循环

## 1. 概念

### 1.1 单线程、同步、异步

JS是单线程，单线程即任务是串行的，后一个任务需要等待前一个任务的执行，这就可能出现长时间的等待。但由于类似ajax网络请求、setTimeout时间延迟、DOM事件的用户交互等，这些任务并不消耗 CPU，是一种空等，资源浪费，因此出现了异步。通过将任务交给相应的异步模块去处理，主线程的效率大大提升，可以并行的去处理其他的操作。当异步处理完成，主线程空闲时，主线程读取相应的callback，进行后续的操作，最大程度的利用CPU。

此时出现了同步执行和异步执行的概念，同步执行是主线程按照顺序，CPU串行执行任务（通过执行栈，先进后出）；异步执行就是跳过等待，先处理后续的同步任务（不是说异步不执行了，而是交给网络模块、timer等并行进行任务）。由此`产生了事件循环与任务队列（ES6新增），来协调主线程与异步模块之间的工作。`

### 1.2 引擎和runtime

在具体执行层，是依赖`js引擎`和`宿主环境runtime`来实现event loop机制。
* `引擎`：解释并编译代码，让它变成能交给机器运行的代码。
* `runtime`: 宿主环境，提供异步处理模块（如[浏览器内核](./http-base-2.browser.md)（也叫渲染引擎）的Timer模块、Ajax的Network模块、事件的DOM binding模块等）。

注意，`通常是宿主环境提供事件循环机制`来处理程序中多个块的执行，执行时调用JavaScript引擎。换句话说，JS引擎本身没有时间的概念，只是一个按需执行js任意代码片段的环境。“事件”（JavaScript代码执行）调度总是由包含它的环境进行。

举个例子，如果JavaScript程序发出一个Ajax请求（从服务器获取一些数据），通常会在一个函数中（通常称为回调函数）设置好响应代码，然后JavaScript引擎会通知宿主环境：“嘿，现在我要暂停执行，你一旦完成网络请求拿到数据，请调用这个函数。”然后浏览器（宿主环境）拿到数据后，就会把回调函数插入到事件循环中。

### 1.3 执行栈

当javascript代码执行的时候会将不同的变量存于内存中的不同位置：堆（heap）和栈（stack）中来加以区分。其中，堆里存放着一些对象。而栈中则存放着一些基础类型变量以及对象的指针。 但是我们这里说的执行栈和上面这个栈的意义却有些不同。

当我们调用一个方法的时候，js会生成一个与这个方法对应的执行环境（context），又叫`执行上下文`。这个执行环境中存在着这个方法的私有作用域，上层作用域的指向，方法的参数，这个作用域中定义的变量以及这个作用域的this对象。 而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方。这个地方被称为`执行栈`。

当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。当这个执行环境中的代码 执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境。这个过程反复进行，直到执行栈中的代码全部执行完毕。

## 2. 事件循环

### Event Loop定义

网络上许多文章关于event loop定义不是很清晰，我们直接看官方规范标准。再次强调事件循环机制是由宿主决定，Web宿主规范标准定义在[HTML Standand](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)中，NodeJS宿主规范标准定义在[libuv](http://docs.libuv.org/en/v1.x/design.html#the-i-o-loop)。

简单理解为：
1. 所有同步任务都在主线程上执行，形成一个`执行栈`。
2. 主线程之外，还存在一个"`事件队列`"。只要异步操作执行完成，就到事件队列中排队。
3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取事件队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

使用伪代码来说明事件队列概念：
``` js
// eventLoop队列数组，先进先出
var eventLoop = [], event;
// “永远”执行，事件循环嘛
while(true) {
    // 一次tick
    if (eventLoop.length > 0) {
        event = eventLoop.shift() // 拿到队列中下一个事件
        event() // 执行。这代码里面可能产生新的event放在eventLoop中
    }
}
```

while循环实现持续运行的循环，循环的每一轮称为tick。对每个tick而言，如果在队列中有等待事件，那么就会在队列中摘下一个事件并执行。这些事件就是你的回调函数。

注意，setTimeout不是把你的回调函数挂在事件循环队列中，而是设置一个定时器，当定时器到时后，环境会把你的回调函数放在事件循环中。这样，在未来某个时刻的tick会摘下并执行这个回调（真正的放在执行栈中执行）

> 以上说过是宿主环境提供事件循环，但ES6本质上改变了在哪里管理事件循环。由于ES6 Promise的引入，这技术要求对事件循环队列的调度运行能够直接进行精确控制，所以事件循环后续会纳入JavaScirpt引擎的势力范围，而不是只由宿主环境来管理。

## 3. 任务队列

**这是在ES6中引入的概念，它加在事件循环队列之上**。这个概念带来最大的影响可能是Promise的异步特性。

对于`任务队列`最好的理解方式就是，它是挂在`事件循环队列`的每个tick之后的一个队列。在事件循环的每个tick中，可能出现的异步动作不会导致一个完整的新事件添加到事件循环队列中，而会在当前tick的任务队列末尾添加一个任务。

### 3.1 macrotask和microtask区别

网络上有非常多介绍这两个的文章，但读完之后依然很晕。其实**事件循环队列===macrotask，任务队列 === microtask**。这样理解规范就简单了：

```
An event loop has one or more task queues. A task queue is a set of tasks.

The microtask queue is not a task queue.
// 一个event loop有一个或者多个task队列（ps：task队列 === 事件循环队列）。
// microtask队列不是一个task队列。（ps：微任务队列只有一个，而且每一次tick，都会清空微任务队列）
```

* 宏任务（事件循环队列）：`script（全局任务，这个很重要）`, setTimeout, setInterval, setImmediate, I/O, UI rendering.
* 微任务（任务队列）：process.nextTick, Promise, Object.observer, MutationObserver.

### 3.2 macrotask和microtask调用顺序

简化代码示意：
``` js
// 事件循环取macroTaskQueue
// 微任务队列只有一个，而且每一次tick，都会清空微任务队列
for (macroTask of macroTaskQueue) {
    handleMacroTask();

    for (microTask of microTaskQueue) {
        handleMicroTask(microTask);
    }
}
```

### 3.3 示例解释

``` js
Promise.resolve().then(function promise1 () {
       console.log('promise1');
    })
setTimeout(function setTimeout1 (){
    console.log('setTimeout1')
    Promise.resolve().then(function  promise2 () {
       console.log('promise2');
    })
}, 0)

setTimeout(function setTimeout2 (){
   console.log('setTimeout2')
}, 0)
// promise1
// setTimeout1
// promise2
// setTimeout2
```

运行过程：

`初始情况，执行栈为空，循环1：`

【task队列：script ；microtask队列：】

从task队列中取出script任务，推入栈中执行。promise1列为microtask，setTimeout1列为task，setTimeout2列为task。

【task队列：setTimeout1 setTimeout2；microtask队列：promise1】

script任务执行完毕，执行microtask checkpoint，取出microtask队列的promise1执行。

`执行栈为空，循环2：`

【task队列：setTimeout1 setTimeout2；microtask队列：】

从task队列中取出setTimeout1，推入栈中执行，将promise2列为microtask。

【task队列：setTimeout2；microtask队列：promise2】

执行microtask checkpoint，取出microtask队列的promise2执行。

`执行栈为空，循环3：`

【task队列：setTimeout2；microtask队列：】

从task队列中取出setTimeout2，推入栈中执行。setTimeout2任务执行完毕，执行microtask checkpoint。

【task队列：；microtask队列：】

> 也可以在这个[网站](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gZ2V0WSAoeCkgewogICAgCiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZShyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIHByb21pc2VUaW1lb3V0KCkgewogICAgICAgICAgICByZXNvbHZlKCgzICogeCkgLSAxKTsKICAgICAgICB9LCAwKTsKICAgIH0pOwp9CgpmdW5jdGlvbiBmb28gKGJhciwgYmF6KSB7CgogICAgdmFyIHggPSBiYXIgKiBiYXo7CgogICAgcmV0dXJuIGdldFkoeCkKICAgICAgICAudGhlbihmdW5jdGlvbiByZXR1cm5BcnJheSh5KSB7CiAgICAgICAgICAgIHJldHVybiBbIHgsIHkgXTsKICAgICAgICB9KTsKfQpzZXRUaW1lb3V0KGZ1bmN0aW9uIHRpbWVvdXQoKSB7CiAgICBjb25zb2xlLmxvZygndGltZW91dCcpCn0sIDApCgpmb28oMTAsIDIwKS50aGVuKGZ1bmN0aW9uIGxvZ01zZyhtc2dzKSB7CiAgICBjb25zb2xlLmxvZyhtc2cpOwp9KTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)中查看浏览器执行代码时的实时事件循环和任务队列情况。

## 4. requestAnimationFrame和requestIdleCallback

这两个api其实跟事件循环机制没太大关系，但执行多少个tick会去更新视图？这两个api执行时机在哪？

### 4.1 浏览器Frame（每一帧）

浏览器每一帧都需要完成哪些工作？

![](https://upload-images.jianshu.io/upload_images/3963958-432f5165ba423f57.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

通过上图可看到，一帧内需要完成如下六个步骤的任务：

1. 处理用户的交互
1. JS 解析执行
1. 帧开始。窗口尺寸变更，页面滚去等的处理
1. requestAnimationFrame(rAF)
1. 布局
1. 绘制

`requestAnimationFrame 每一帧必定会执行，requestIdleCallback 是检测浏览器空闲来执行任务`。

### 4.2 requestAnimationFrame

视图渲染发生在本轮事件循环的microtask队列被执行完之后，但不是每轮事件循环都会执行视图更新，浏览器有自己的优化策略。所以`一次视图更新（16.7ms）可能有1次事件循环`（这就要求该tick的js处理尽量不超过16.7ms，不然有可能掉帧），`也可能有多次事件循环`（可能每个tick不耗时），但`每次执行重绘前，都会通知requestAnimationFrame执行回调函数`。

### 4.3 requestIdleCallback

上面六个步骤完成后没超过 16.7 ms，说明时间有富余，此时就会执行 requestIdleCallback 里注册的任务。

假如浏览器一直处于非常忙碌的状态，requestIdleCallback 注册的任务有可能永远不会执行。requestIdleCallback发生在一帧的最后，此时页面布局已经完成，所以不建议在 requestIdleCallback 里再操作 DOM，这样会导致页面再次重绘。DOM 操作建议在 rAF 中进行。

## 参考文章

* [The JavaScript Event Loop](https://flaviocopes.com/javascript-event-loop/)

* [JavaScript Event Loop Explained](https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4)

* [JS 运行机制](https://ustbhuangyi.github.io/vue-analysis/reactive/next-tick.html)

* [任务队列、web API、JS主线程的相互协同](https://www.cnblogs.com/hity-tt/p/6733062.html)

* [从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)

* 你不知道的JavaScript（中卷）- 异步