# JavaScript Event Loop

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

script里的代码被列为一个task，放入task队列。

循环1：

【task队列：script ；microtask队列：】
从task队列中取出script任务，推入栈中执行。
promise1列为microtask，setTimeout1列为task，setTimeout2列为task。
【task队列：setTimeout1 setTimeout2；microtask队列：promise1】
script任务执行完毕，执行microtask checkpoint，取出microtask队列的promise1执行。
循环2：

【task队列：setTimeout1 setTimeout2；microtask队列：】
从task队列中取出setTimeout1，推入栈中执行，将promise2列为microtask。
【task队列：setTimeout2；microtask队列：promise2】
执行microtask checkpoint，取出microtask队列的promise2执行。
循环3：

【task队列：setTimeout2；microtask队列：】
从task队列中取出setTimeout2，推入栈中执行。
setTimeout2任务执行完毕，执行microtask checkpoint。
【task队列：；microtask队列：】

https://github.com/aooy/blog/issues/5

## 案例

``` js
function func1 () {
    console.log('func 1')
}
function func2 () {
    console.log('func 2')
}
function func3 () {
    console.log('func 3')
}
function func4 () {
    console.log('func 4')
}

function () {
    func1()
    setTimeout(func2, 0)
    Promise.resolve().then(
        () => func3()
    )
    func4()
}()

// func1
// func4
// func3
// func2
```

``` js
console.log('start')

const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve()
      .then(() => {
        console.log('promise 3')
      })
      .then(() => {
        console.log('promise 4')
      })
      .then(() => {
        setTimeout(() => {
          console.log('setTimeout 2')
          Promise.resolve()
              .then(() => {
                console.log('promise 5')
              })
              .then(() => {
                console.log('promise 6')
              })
              .then(() => {
                clearInterval(interval)
              })
        }, 0)
      })
}, 0)

Promise.resolve()
    .then(() => {  
        console.log('promise 1')
    })
    .then(() => {
        console.log('promise 2')
    })
// start
// promise 1
// promise 2

// setInterval

// setTimeout 1
// promise 3
// promise 4

// setInterval

// setTimeout 2
// promise 5
// promise 6
```

## 参考文章

* [JS 运行机制](https://ustbhuangyi.github.io/vue-analysis/reactive/next-tick.html)

* [任务队列、web API、JS主线程的相互协同](https://www.cnblogs.com/hity-tt/p/6733062.html)