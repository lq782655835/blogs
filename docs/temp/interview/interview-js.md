# JS 基础
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

## 3. 箭头函数
箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

1. 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
1. 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
1. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
1. 不可以使用 new 命令，因为：
    * 没有自己的 this，无法调用 call，apply。
    * 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__

### JavaScript几种异步方法和原理
1. 回调
1. Promise
1. generator生成器/co
1. async/await

### 事件冒泡和捕获
1. 冒泡： p -> html
2. 捕获： html -> p

### Promise
* 错误无法被捕获情况：在promise实例resolve之后,再抛出error
``` js
var promise=new Promise(function(resolve,reject){
   resolve();
   throw new Error('test');//该错误无法被捕获
})
```
* 抛出的错误在没有通过 promise 的 catch 方法捕获时是会打印报错的，但是不会传递到外面触发其他错误监听函数（比如 window.onerror 、try-catch 等）

## CSS

### flex
* 容器主要属性
    * flex-direction：确定主轴方向
    * justify-content：主轴
    * align-items： 交叉轴
* 项目属性
    * flex： <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> 默认值为0 1 auto

### link和@import的区别
1）link是xhtml标签，除了可以加载css还可以定义RSS等其他事件，@import属于css范畴，只能加载css

2）link引用css时，在页面载入的同时加载；@import在页面完全加载完成之后加载。

3）link无兼容性问题，@import低版本浏览器不支持（目前可以忽略）

4）link支持使用javascript控制DOM去改变样式；@import不支持；

### 算法排序

#### 冒泡算法

#### 快速排序算法

## Node

Node的特点有三个：单线程、事件驱动、非阻塞I/O.
优点：
* 因为Node是基于事件驱动和无阻塞的，所以非常适合处理并发请求，因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多。
* 与Node代理服务器交互的客户端代码是由javascript语言编写的，因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情。

### Node优化
1. 使用最新版本的 Node.js
1. 使用 fast-json-stringify 加速 JSON 序列化
1. 提升 Promise 的性能。全局的 Promise 换为 bluebird 的实现
1. 使用Promise.all()/Promise.any()

### Node事件循环模型