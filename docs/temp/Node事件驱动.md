# Node事件驱动

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

wget
brew install wget 下载、扒站神器

brew install ack 搜索代码神器