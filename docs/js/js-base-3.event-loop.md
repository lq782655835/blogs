# JavaScript Event Loop

## 概念

### 单线程、同步、异步

JS是单线程，单线程即任务是串行的，后一个任务需要等待前一个任务的执行，这就可能出现长时间的等待。但由于类似ajax网络请求、setTimeout时间延迟、DOM事件的用户交互等，这些任务并不消耗 CPU，是一种空等，资源浪费，因此出现了异步。通过将任务交给相应的异步模块去处理，主线程的效率大大提升，可以并行的去处理其他的操作。当异步处理完成，主线程空闲时，主线程读取相应的callback，进行后续的操作，最大程度的利用CPU。

此时出现了同步执行和异步执行的概念，同步执行是主线程按照顺序，CPU串行执行任务（通过执行栈，先进后出）；异步执行就是跳过等待，先处理后续的同步任务（不是说异步不执行了，而是交给网络模块、timer等并行进行任务）。由此`产生了事件循环与任务队列，来协调主线程与异步模块之间的工作。`

### 引擎和runtime概念

JS引擎是单线程的，它负责维护任务队列，并通过 Event Loop 的机制，按顺序把任务放入栈中执行。异步处理模块，是 runtime 提供的，拥有和JS引擎互不干扰的线程。

* `引擎`：解释并编译代码，让它变成能交给机器运行的代码。
* `runtime`：就是运行环境，它提供一些对外接口供JS调用，以跟外界打交道，比如，浏览器环境、Node.js环境。不同的runtime，会提供不同的接口，比如，在 Node.js 环境中，我们可以通过 require 来引入模块；而在浏览器中，我们有 window、 DOM。
    * 浏览器异步模块
        * 类似onclick等，由[浏览器内核](./http-base-2.browser.md)的DOM binding模块处理，事件触发时，回调函数添加到任务队列中；
        * setTimeout等，由浏览器内核的Timer模块处理，时间到达时，回调函数添加到任务队列中；
        * Ajax，由浏览器内核的Network模块处理，网络请求返回后，添加到任务队列中。
> 浏览器的 Event Loop 遵循的是HTML Standand，而 NodeJs 的 Event Loop 遵循的是 libuv。

## 事件循环机制

### Event Loop定义

网络上许多文章关于event loop定义不是很清晰，这里我们看下官方标准规范。有趣的是event loop不是定义在js语言中的，而是在[HTML Standand](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)中。

```
Event loops Definitions

To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. Each agent has an associated event loop.

// 为了协调事件，用户交互，脚本，渲染，网络等，用户代理必须使用本节所述的event loop。
```
事件，用户交互，**脚本**，渲染，网络这些都是我们所熟悉的东西，他们都是由event loop协调的。触发一个click事件，进行一次ajax请求，背后都有event loop在运作。

```
An event loop has one or more task queues. A task queue is a set of tasks.

The microtask queue is not a task queue.
// 一个event loop有一个或者多个task队列。
// microtask队列不是一个任务队列（在ES6规范中叫job）
```

`task也被称为macrotask，而microtask更像是job概念(task == macrotask != microtask)`。

经典event loop图：

![](https://cdn-images-1.medium.com/max/800/1*7GXoHZiIUhlKuKGT22gHmA.png)

执行模型（以下为个人通俗版本，更细节可看官方[Processing model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)）：

1. 初始时，stack为空。整个全局script代码作为一个macrotask（macrotask == task），放入主线程中。
2. 代码在主线程stack中执行。同步代码直接拿到结果，异步代码在对应线程中完后（比如ajax数据拿到了），放在`异步队列`。**注意异步队列中放的是注册的回掉函数（函数里又是script代码）**。如果是micro代码(比如Promise.then)，马上放在`microtask队列`中。
3. 执行完所有函数体代码，马上执行**所有microtask队列的代码**。
4. 此时stack为空，取下一个异步代码函数块，放入主线程中。然后重复2和3步骤,构成循环。

总结下，**一个事件循环(EventLoop)中会有一个正在执行的任务(Task)，而这个任务就是从 macrotask 队列中来的。当这个 macrotask 执行结束后所有可用的 microtask 将会在同一个事件循环中执行，当这些 microtask 执行结束后还能继续添加 microtask，一直到真个 microtask 队列执行结束。**

![](https://cdn-images-1.medium.com/max/1200/1*64BQlpR00yfDKsXVv9lnIg.png)

## 任务队列

有两类任务队列：宏任务队列macrotasks和微任务队列microtasks，在最新标准中，它们被分别称为task与jobs。宏任务队列可以有多个，微任务队列只有一个，而且每一次event loop，都会清空微任务队列。

* 宏任务：`script（全局任务，这个很重要）`, setTimeout, setInterval, setImmediate, I/O, UI rendering.
* 微任务：process.nextTick, Promise, Object.observer, MutationObserver.

示意执行代码：
``` js
// 初始时的全局代码script，作为第一个macroTaskQueue
for (macroTask of macroTaskQueue) {
    // 这里可能又会产生新的macroTask和microTask。
    // 新产生的macroTask只能在下一个event loop中才能执行
    // 新产生的microTask（job）会在当前event loop末尾执行
    handleMacroTask();

    // 这里也可能又会产生新的macroTask和microTask。
    // microTaskQueue只有一个，新增的microTask附加到队列末尾，也会在当前event loop执行，而不是在下一个event loop循环
    for (microTask of microTaskQueue) {
        handleMicroTask(microTask);
    }
}
```

## Example

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

`script里的代码被列为一个task，放入task队列。`注意这里我们把全局script的代码也作为一个macrotask，网络上有些文章（如：[任务队列、web API、JS主线程的相互协同](https://www.cnblogs.com/hity-tt/p/6733062.html)）把全局的script当成同步执行代码，不是作为macrotask。但代表的意思是一样的，都会把microtask加载进主进程执行代码，同时在每一个event loop结尾，都有个microtasks需要全部执行完。

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

## 参考文章

* [The JavaScript Event Loop](https://flaviocopes.com/javascript-event-loop/)

* [JavaScript Event Loop Explained](https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4)

* [JS 运行机制](https://ustbhuangyi.github.io/vue-analysis/reactive/next-tick.html)

* [任务队列、web API、JS主线程的相互协同](https://www.cnblogs.com/hity-tt/p/6733062.html)

* [从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)