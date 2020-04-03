# JS 基础

* [js原型](https://lq782655835.github.io/blogs/js/js-base-1.prototype.html#%E5%8E%86%E5%8F%B2)/[js继承](https://lq782655835.github.io/blogs/js/js-base-2.extend.html)
* [Object.create()理解原型链](https://lq782655835.github.io/blogs/js/es6-3.object.html#other)
* [JS 经典面试题](https://lq782655835.github.io/blogs/js/js-polyfill.html)

## 1. 作用域

``` js
var a = 10;
(function () {
	console.log(a) // undefined
	a = 5
    console.log(a) // 5
	console.log(window.a) // 10
	var a = 20
	console.log(a) // 20
})()
```

解释：遇见IIFE时，类似开通了上下文作用域，以上等价于
``` js
var a = 10
{
    console.log(a) // undefined
	a = 5
    console.log(a) // 5
	console.log(window.a) // 10
	var a = 20
	console.log(a) // 20
}
```

var a = 2;我们认为是一个声明，实际上`JavaScript引擎`不这样认为。`它将var a和a = 2当作两个单独的声明，第一个是编译阶段的任务，第二个是执行阶段的任务。`

比如：
``` js
foo() // 1
var foo

function foo() { console.log(1) }
foo = function() { console.log(2) }
```

以上代码片段会被`js引擎`理解为如下形式：
``` js
function foo() { console.log(1) }
foo()
foo = function() { console.log(2) }

// 详细解释：
// foo() //遇到foo()时跳过，因为是执行阶段才去做
// var foo // 定义foo变量
// function foo() { console.log(1) } // 没有foo变量则创建变量，有则复用foo，然后赋值成function
// foo = function() { console.log(2) } // 只看左边取foo值（右边是赋值操作，是在执行阶段才执行）。
```

## 2. 箭头函数

箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

1. 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
1. 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
1. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
1. 不可以使用 new 命令，因为：
    * 没有自己的 this，无法调用 call，apply。
    * 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__

## 3. 事件循环

* [JS事件循环](https://lq782655835.github.io/blogs/js/js-base-3.event-loop.html#%E6%A6%82%E5%BF%B5)（也包含JS引擎、执行栈等）

#### 背景

JS是单线程（主线程），但类似ajax请求时可交给其他异步模块处理，异步模块处理完成会把callback放在队列中。当主线程空闲时，会去调用这些callback，以此最大化利用CPU。

由此产生了`事件循环与任务队列（ES6新增），来协调主线程与异步模块之间的工作`。

#### 结论

在具体执行层，是依赖`js引擎和宿主环境runtime来实现event loop机制`。
* 引擎：解释并编译代码，让它变成能交给机器运行的代码。
* runtime: 宿主环境，提供异步处理模块（如浏览器内核（也叫渲染引擎）的Timer模块、Ajax的Network模块、事件的DOM binding模块等）。

通常是宿主环境提供事件循环机制来处理程序中多个块的执行，执行时调用JavaScript引擎。换句话说，JS引擎本身没有时间的概念，只是一个按需执行js任意代码片段的环境。“事件”（JavaScript代码执行）调度总是由包含它的环境进行。

## 4. JS引擎

JavaScript本质上是一种解释型语言，与编译型语言不同的是它需要一遍执行一边解析，而编译型语言在执行时已经完成编译，可直接执行，有更快的执行速度。

v8引擎用了非常多的技术优化，比如：`JIT（即时编译）和内联缓存`。（JIT ，简单的来说，就是代码在目标平台上运行的时候，实时的把代码编译为目标机器上的机器码。）

工作流程：
1. v8 2017年以前（v8.5.9）：跳过了字节码这一层，直接把 JS 编译成机器码。
在V8引擎中，源代码先被解析器转变为抽象语法树(AST)，然后使用JIT编译器的全代码生成器从AST直接生成本地可执行代码。
    * 优点：少了流程，js执行速度更快了
    * 缺点：没有经过字节码优化，占用内存大
2. 目前v8已增加字节码编译优化。

根据v8的特点，编程时优化：
* 类型。对于函数，JavaScript是一种动态类型语言，JavaScriptCore和V8都使用隐藏类和内嵌缓存来提高性能，为了保证缓存命中率，一个函数应该使用较少的数据类型；对于数组，应尽量存放相同类型的数据，这样就可以通过偏移位置来访问。
* 内存。虽然JavaScript语言会自己进行垃圾回收，但我们也应尽量做到及时回收不用的内存，对不再使用的对象设置为null或使用delete方法来删除(使用delete方法删除会触发隐藏类新建，需要更多的额外操作)。
* 优化回滚。在执行多次之后，不要出现修改对象类型的语句，尽量不要触发优化回滚，否则会大幅度降低代码的性能。

## 4. Promise

* [动手实现Promise](https://lq782655835.github.io/blogs/js/js-base-4.promise.html#%E5%AE%9A%E4%B9%89)

### JavaScript几种异步方法和原理？

1. 回调
1. Promise
1. [generator生成器/co](https://lq782655835.github.io/blogs/read-books/book-you-dont-know-javascript.html#%E7%94%9F%E6%88%90%E5%99%A8)
1. async/await

### 为什么要有Promise？

回调函数表达异步和并发有两个主要缺陷：`缺乏顺序性和可信任性`。 Promise封装了依赖时间的状态--等待底层值的完成或拒绝，所以`Promise本身与时间无关`。因此Promise可以按照可预测的方式组成（组合），而不用关心时序或底层的结果。 另外，一旦Promise决议，它就永远保持在这个状态。

Promise解决了因只用回调的代码而备受困扰的`控制反转`问题。 但Promise也没有摈弃回调，只是把回调的安排转交给一位可信任的中介机制。

### Promise缺点？

* 单一值。Promise只能有一个完成值或拒绝值。
* 单决议。
* 无法取消的Promise。一旦建立Promise，会立即执行，无法取* 消。
* Promise性能。
* 顺序错误处理。
* 不设置回调函数，Promise内部抛出的错误不会反应到外部。(《ES6》入门）
* 当处于Pending状态，无法得知目前进展到哪一个阶段。（《ES6》入门）

错误无法被捕获情况：在promise实例resolve之后,再抛出error
``` js
var promise=new Promise(function(resolve,reject){
   resolve();
   throw new Error('test');//该错误无法被捕获
})
```

## 5. 闭包 / this

### 闭包

指有权访问另一个函数作用域中的变量的函数

[《JavaScript高级程序设计》 - 闭包](https://lq782655835.github.io/blogs/read-books/book-js-advance-design.html#%E9%97%AD%E5%8C%85)

### this

this在运行时绑定，并不是在编写时绑定。
当一个函数（函数也是对象）被调用时，会创建一个执行上下文，this是执行上下文的一个属性。执行上下文包含：
* 哪里被调用（调用栈）
* 函数的调用方法
* 传入的参数等

[《你不知道的JavaScript》 - this](https://lq782655835.github.io/blogs/read-books/book-you-dont-know-javascript.html#this)

# CSS

## flex

* 容器主要属性
    * flex-direction：确定主轴方向
    * justify-content：主轴
    * align-items： 交叉轴
* 项目属性
    * flex： <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> 默认值为0 1 auto

## link和@import的区别？

1. link是xhtml标签，除了可以加载css还可以定义RSS等其他事件，@import属于css范畴，只能加载css
1. link引用css时，在页面载入的同时加载；@import在页面完全加载完成之后加载。
1. link无兼容性问题，@import低版本浏览器不支持（目前可以忽略）
1. link支持使用javascript控制DOM去改变样式；@import不支持；

### 事件冒泡和捕获
1. 冒泡： p -> html
2. 捕获： html -> p

# 算法

* [排序算法](https://lq782655835.github.io/blogs/js/js-sort.html)
    * 冒泡算法
    * 快速排序算法

# Node

Node的特点有三个：单线程、事件驱动、非阻塞I/O.
优点：
* 因为Node是基于事件驱动和无阻塞的，所以非常适合处理并发请求，因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多。
* 与Node代理服务器交互的客户端代码是由javascript语言编写的，因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情。

### Node优化?
1. 使用最新版本的 Node.js
1. 使用 fast-json-stringify 加速 JSON 序列化
1. 提升 Promise 的性能。全局的 Promise 换为 bluebird 的实现
1. 使用Promise.all()/Promise.any()

### Node事件循环模型