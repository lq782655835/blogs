# Node-解惑

Node.js已经出来很久了，但依然是一门火热的技术，值得前端开发人员进行投入。网上Node.js的介绍和教程也非常多，笔者这里对一些容易疑惑的地方进行解释。

## Node和Javascript的关系
**Node.js是一个Javascript运行环境，依赖于Chrome V8引擎进行代码解释**。熟悉javascript历史的人知道，最初的js定位作为一个脚本语言，只能应用在web浏览器上，写一些表单校验和页面特效等。在很长一段时间里，js依然是前端开发把玩的工具，只操作一些页面DOM元素。直到2009年 Ryan Dahl开发了Node.js，基于google开源的javascript运行时环境-V8引擎上，结合Libuv扩展了javascript的能力。使得javascript不仅可以操作前端页面DOM元素，同时可以对文件读写、I/O操作、数据库读写等后端语言才有的能力。这也让全栈开发工程师门槛变得简单，只要学会一门javascript语言。当然，全栈工程师所在的价值不仅是只会一门或多门语言，而是碰到具体问题，能综合考量技术与非技术因素，使用符合团队的技术解决方案。

## Node解决了什么

## 异步I/O

很多教程里都会描述到node的这个特性。先来解释下I/O，I/O是input/output（输入/输出）简写。像平时的读写文件、http请求响应，都属于input/output操作。I/O操作通常比较费时，比如读取一个大文件，可能完全读取好需要10s以上。在等待的10s时间里，线程啥也干不了，空闲着，等文件读取好后才继续耗时间走接下来的流程。试想下按照以上模式，100个请求过来，线程空闲的时间得多少。这种情况，我们叫它**阻塞I/O**，如何解决这个问题呢？对于其他后端语言如Java、C#，可以通过多线程解决这个问题，开启一个新线程进行读取文件数据，再把结果合并回主进程中。但对于javasciript语言不行，因为**js主线程是单线程**的，无法通过js语法创建新的线程（service work是后面补充的规范），但node是一个可以执行多线程的环境。如何使用node的多线程呢？通过源码可以知道，当遇到I/O操作时，JS主进程将调用node Libuv，把请求对象推入线程池，以此实现新开线程，这样不会阻塞主进程执行。

> 注意：js主进程是单线程，node是多线程

### 事件循环
node的多线程解决了底层异步I/O的调用问题，但解析数据后回调顺序如何界定呢？js语言使用事件循环来解决这个问题。假设主进程进行了100个I/O操作，等于将100个线程推进线程池。线程池工作好一个线程上的I/O操作，就会把结果(包含回调函数)返回给一个事件队列Event Queu，再通知Event Loop进行调用。Event Loop根据先进先出的方式依次排列好这些回调函数，等到JS主进程执行完毕后，再开始依次序一条条将队列中的函数推到主进程中执行。总起起来，事件循环事实上是对I/O操作的回调函数的集合做循环

* 
js通过事件循环(event loop)来达到异步I/O（也叫非阻塞I/O）。

### 事件循环
js是单线程的，所以服务器端js主进程也是运行在单线程的。但node

Node.js的异步机制是基于事件的，所有磁盘I/O、网络通信、数据库查询都以非阻塞的方式请求，返回的结果由事件循环来处理。
``` js
var fs = require("fs");
fs.readFile("./testfile", "utf8", function(error, file) {
     if (error) throw error;
     console.log("我读完文件了！");
});
console.log("我不会被阻塞！");
```

## Node基本原理



Node的成功使得最简单的全栈。Webpack



Node包含很多模块，比如常用的http、fs、stream等。通过这些模块，使得node可以类似服务端语言，操作文件以及http流处理等。

Node.js 是基于 Chrome V8引擎构建的，由事件循环（Event Loop）分发 I/O 任务，最终工作线程（Work Thread）将任务丢到线程池（Thread Pool）里去执行，而事件循环只要等待执行结果就可以了。

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事
单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。
如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 I/O 很慢，不得不等着结果出来，再往下执行
CPU 完全可以不管 I/O 设备，挂起处于等待中的任务，先运行排在后面的任务
将等待中的 I/O 任务放到 Event Loop 里
由 Event Loop 将 I/O 任务放到线程池里

![image](https://github.com/i5ting/How-to-learn-node-correctly/raw/master/media/14912707129964/14992384974942.png)

核心

* Chrome V8 解释并执行 JavaScript 代码（这就是为什么浏览器能执行 JavaScript 原因）
* libuv 由事件循环和线程池组成，负责所有 I/O 任务的分发与执行

在Node.js Bindings层做的事儿就是将 Chrome V8 等暴露的 C/C++ 接口转成JavaScript Api，并且结合这些 Api 编写了 Node.js 标准库，所有这些 Api 统称为 Node.js SDK.

``` js
const readFileAsArray = function(file, cb) {
  fs.readFile(file, function(err, data) { // 异步调用
    if (err) {
      return cb(err); // 异步调用
    }
    const lines = data.toString().trim().split('\n');
    cb(null, lines);
  });
};

readFileAsArray('./numbers.txt', (err, lines) => {
  if (err) throw err;
  console.log('count:', lines.length);
});
```

## 实现

Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现
Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

## 事件驱动程序
Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

这个模型非常高效可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。（这也被称之为非阻塞式IO或者事件驱动IO）

在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。

## 参考文章

* [nodejs-event-loop](http://www.runoob.com/nodejs/nodejs-event-loop.html)

https://loveky.github.io/2017/06/05/translate-node-stream-everything-you-need-to-know/
