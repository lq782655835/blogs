# 动手实现Promise

回调函数表达异步和并发有两个主要缺陷：`缺乏顺序性和可信任性`。
Promise封装了依赖时间的状态--等待底层值的完成或拒绝，所以Promise本身与时间无关。因此Promise可以按照可预测的方式组成（组合），而不用关心时序或底层的结果。
另外，一旦Promise决议，它就永远保持在这个状态。

Promise解决了因只用回调的代码而备受困扰的`控制反转`问题。
但Promise也没有摈弃回调，只是把回调的安排转交给一位可信任的中介机制。

## 定义

Promise是一个规范，意味着Promise实现的方式可以有很多种，但需要满足标准定义。以下是[Promises/A+ 规范](https://promisesaplus.com/)中较为重要的部分。

``` js
Promise States
A promise must be in one of three states: pending, fulfilled, or rejected.

The then Method
A promise must provide a then method to access its current or eventual value or reason.
A promise’s then method accepts two arguments:
promise.then(onFulfilled, onRejected)

then must return a promise
```

## 动手实现promise

以下是简化说明版，详细版本可以看我的github [build-your-own-promise](https://github.com/lq782655835/build-your-own-promise)

``` js
function Promise(executor) {
    var self = this
    self.status = 'pending' // Promise当前的状态
    self.data = undefined  // Promise的值
    self.onResolvedCallback = [] // Promise resolve时的回调函数集

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved'
            self.data = value
            for(var i = 0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value)
            }
        }
    }

    // 执行new Promise()时，传入的function。等于说每次新建new Promise实例，总会执行传入的函数
    executor(resolve, reject)
}

Promise.prototype.then = function(onResolved, onRejected) {
    var self = this // self = this = primise1
    // 重要，根据Promise A+标准，then方法总是返回一个新的promise2 = new Promise()，这点非常重要
    var promise2

    // 状态处理，主流程大部分走pending
    if (self.status === 'pending') {
      return promise2 = new Promise(function(resolve, reject) {
        // 包装的resolvedCallback。resolvedCallback调用时间：promise1调用resolve
        var resolvedCallback = function(value) {
            var x = onResolved(self.data)
            resolve(x) // 重要。这是promise2的resolve，触发链式调用
        }

        // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，只能等到Promise的状态确定后，才能确实如何处理.
        // 重要：第一个then()回调，放进promise1.callbacks，第二个then()，放进promise2.callback。
        self.onResolvedCallback.push(resolvedCallback)
      })
    }
  }

module.exports = Promise
```

``` js
new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('helloworld')
    }, 0)
}).then(function(data) {
    console.log(data, 1)
    return 123
}).then(function(data) {
    console.log(data, 2)
})

// 按顺序打印：
// helloworld 1
// 123 2
```

## 解释说明

以上等价于：
``` js
var promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('helloworld')
    }, 0)
})

var callback1 = function(data) {
    console.log(data, 1)
    return 123
}
var promise2 = promise1.then(callback1)

var callback2 = function(data) {
    console.log(data, 2)
}
var promise3 = promise2.then(callback2)
```

实例化`new Promise(fn)`，意味着马上执行fn()，但fn()里一般是异步代码，返回数据时间是不一定的。接下来继续走同步代码then。

`Promise.prototype.then`才是Promise实现的关键难点。根据Promise A+规范，then返回的是另外一个Promise（不能像jquery一样，返回this，每次都在同一个对象上操作）。因为Promise有三种状态：pending、fulfill、reject。而且默认pending状态改为fulfill/reject时，实例的promise就不能再改变状态了。

以上代码按照时间线执行路径：
1. 线执行`fn()`,启动异步进程，同时同步代码then继续。
2. 执行promise1.then,`Promise.prototype.then` 流程详细：
    1. 会新创建new Promise(fn2)，立马执行`fn2()`。fn2()中把包装callback1的函数resolvedCallback，放在promise1.callbacks中。啥时候promise1调用它的callbakcs呢？这个取决于用户，还记得new Promise(function(resolve, reject){})中的resolve函数吗？`什么调用它（还能返回‘helloworld’数据），就会去执行这个resolvedCallback`。

    ``` js
    var resolvedCallback = function(value) {
        var x = onResolved(self.data) // onResolved就是callback1；self就是promise1，能拿到data是因为这个函数执行会在promise1.resolve(‘helloworld’)后
        resolve(x) // 重要。这是promise2的resolve，触发链式调用
    }
    ```
    2. 返回一个新的promise2。
3. 执行promise2.then,同上，执行`fn3()`。此时：（每个onResolvedCallback里的self是不一样的。）
    * promise1.callbacks = [包装的resolvedCallback]
    * promise2.callbacks = [包装的resolvedCallback]
    * promise3.callbacks= [包装的resolvedCallback]
4. `异步代码拿到数据，用户手动触发第一个resolve`：promise1.resolve('helloworld')，星星之火点燃。
    1. 此时，promise1的data变为‘helloworld’
    2. 执行promise1.callbacks[0], 拿到promise1.data，然后执行callback1（promise1.data），同时拿到返回值x。
    3. 触发promise2.resove(x)，执行promise2.callbacks[0],让火继续烧下去。

> 以上只是简单叙述Promise实现原理，真实情况是可能有更多情形，比如在then中返回Promise等。

## 参考文章

* [[译] Promises/A+ 规范](http://www.ituring.com.cn/article/66566)

* [ECMA262 Promise](https://tc39.github.io/ecma262/#sec-promise-objects)

* [
剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)