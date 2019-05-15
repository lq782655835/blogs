# async函数原理简述

这两天拜读了阮一峰的[ES6入门](http://es6.ruanyifeng.com/)，其中Generator和Async两章写的太精彩了，层次结构清晰，叙事深入浅出，感触阮老师的写作水平之深。本文在阮老师文章以及源码分析上进行总结提炼，方便大家速通该部分知识。

## 为什么要async

因为js是单线程的，当一段任务依赖于上一个任务结果，此时异步就产生了。程序在执行第二段任务前，必须等待第一段任务结果。回调函数是js对异步的解决方案。但该解决方案会有“地狱回调”问题。

``` js
fs.readFile(fileA, 'utf-8', function (err, data) {
  fs.readFile(fileB, 'utf-8', function (err, data) {
    fs.readFile(fileB, 'utf-8', function (err, data) {
        ...
    })
  });
});
```

## Promise

Promise是ES6引入的原生对象，是对`异步编程解决方案`的补充，它比传统回调函数和事件更加强大以及合理。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

``` js
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(data => readFile(fileB))
.then(data => readFile(fileC))
...
```

## Generator 函数

Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。