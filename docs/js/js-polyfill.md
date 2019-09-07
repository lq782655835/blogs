# JS 经典面试题

重点考察JS原理及应用

## call/apply

### 问题
``` js
var foo = { value: 1 }
function bar() { console.log(this.value) }
bar.call(foo) // 期待打印：1
bar.apply(foo) // 期待打印：1
```

### 思路

call/apply立即执行函数，同时函数中的this改为指向context。类似等价于以下
``` js
var foo = {
    value: 1,
    fn: function bar() { console.log(this.value) }
}
```

``` js
Function.prototype.call = function(context, ...args) {
    context = context || window
    context.fn = this // 这里的this代表函数
    context.fn(...args) // 给context添加属性fn，所以执行fn方法时，里面的this代表context
    delete context.fn
}

Function.prototype.apply = function(context, ...args) {
    context = context || window
    context.fn = this
    context.fn(args) // apply传递数组
    delete context.fn
}
```

## bind

### 问题

``` js
var foo = { value: 1 }
function bar() { console.log(this.value) }
let barBind = bar.bind(foo)
barBind() // 期待打印：1
```

## new

### 问题

``` js
new Foo('name') = _new(Foo, 'name') // 模拟new
```

### 思路

``` js
_new() {
    var object = new Object() // 1. 类都是object类型
    var Constructor = [].shift.call(arguments)
    var args = arguments // 剩下的参数
    object.__proto__ = Constructor.prototype // 2. 设置原型链
    var ret = Constructor.apply(obj, args) // 3. 构造函数执行
    return typeof ret === 'object' ? ret : obj
}
_new(Foo, 'name')

// es6
_new(Constructor, ...args) {
   let object = Object.create(Constructor.prototype)
   let ret = Constructor.apply(object, args)
   return typeof ret === 'object' ? ret : obj
}
```

## curry

### 问题

``` js
let addFun = function(a, b, c) { return a + b + c }
let curryFun = curry(addFun)
curryFun(1)(2)(3) === 6 // true
```

### 思路
递归，当执行的参数个数等于原本函数的个数，执行函数
``` js
var curry = function(fn) {
    var limit = fn.length // fn函数参数个数
    return function judgeCurry (...args) {
        if (args.length >= limit) {
            return fn.apply(null, args)
        } else {
            return function(...args2) {
                return judgeCurry.apply(null, args.concat(args2))
            }
        }
    }
}

// or es6
var curry = function(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args)
    }

    return function (...args2) {
        return curry(fn, ...args, ...args2)
    }
}
```

## pipe/compose

### pipe
* pipe(fn1,fn2,fn3,fn4)(args)等价于fn4(fn3(fn2(fn1(args)))
* 第一个函数的结果，作为第二个函数的参数，以此类推...

### compose
* compose(fn1,fn2,fn3,fn4)(args)等价于fn1(fn2(fn3(fn4(args)))
* 与pipe相反，先计算倒数第一个结果，作为倒数第二的参数，以此类推...

``` js
let loopItem = (prevFn, nextFn) => (...args) => prevFn(nextFn(...args))

const compose = (...fns) => fns.reduce(loopItem);
const pipe = (...fns) => fns.reduceRight(loopItem)

const example = pipe(
    (x, y) => x * y,
    x => x + 1
);
console.log(example(3, 4)) // 13
```

## flatten

### 深度为1的展平
``` js
// before：[1, 2, [3, 4, [5, 6]]]
// after flat: [1, 2, 3, 4, [5, 6]]

// 思路：使用reduce或map
function flatSingle(arr) {
    return arr.reduce((pre, val) => pre.concat(val), [])
}

// or
let flatSingle = arr => [].concat(...arr)
```

### 深度无限的展平
``` js
// before: [1,2,3,[1,2,3,4, [2,3,4]]]
// after flatDeep: [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]

// 思路：深度优先递归，使用reduce连接起来
// 深度优先算法 - 递归
function flatDeep(arr) {
    return arr.reduce((pre, val) => pre.concat(Array.isArray(val) ? flatDeep(val) : val), [])
}

// 深度优先算法 - 堆栈
function flatDeep(arr) {
    const stack = [...arr]
    const res = []
    while (stack.length) {
        const val = stack.pop() // 从尾部开始
        Array.isArray(val) ? stack.push(...val) : res.push(val)
    }

    return res.reverse()
}

// 取巧，利用Array.toString()
function flatDeep(arr) {
    return arr.toString().split(',')
}
```

### 指定深度的展平
深度的含义是指每一项展平的次数
``` js
// before: [1,2,3,[1, [2]], [1, [2, [3]]]]
// after: [ 1, 2, 3, 1, 2, 1, 2, [ 3 ] ]

function flatDeep(arr, depth = 1) {
    if (depth === 1) return arr.reduce((pre, val) => pre.concat(val), [])
    return arr.reduce((pre, val) => pre.concat(Array.isArray(val) ? flatDeep(val, depth - 1) : val), [])
}
```

## 去重
数组去除重复

``` js
// before: [2, 1, 3, 2]
// after: [2, 1, 3]

function removeRepeat(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

// or es6
let removeRepeat = arr =>  Array.from(new Set(arr))
let removeRepeat = arr =>  [...new Set(arr)]
```

## 浅拷贝/深拷贝

``` js
// 浅拷贝
function clone(source) {
    var target = {}
    for (var i in source) {
        source.hasOwnProperty(i) && target[i] = source[i]
    }

    return target
}

// or es6
const clone = source => Object.assign({}, source)
const clone = source => { ...source }
```

``` js
// 深拷贝
// 思路：递归赋值
const deepClone = source => {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }

    // 区分array和object对象
    let target = source instanceof Array ? [] : {}
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = typeof source[key] === 'object' ？ deepClone(source[key]) : source[key]
        }
    }
    return target
}

// or 取巧方法
// 注意这种取巧方法是有限制的
// 1. 只能解析Number、String、Array等能够被json表示的数据结构
// 2. 不能处理循环引用
const deepClone = source => JSON.parse(JSON.stringify(source))
```

## 防抖/节流

* 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。适合多次事件一次响应。
* 节流：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。适合大量事件按时间做平均分配触发。

``` js
// 防抖案例：窗口resize停止才执行最终的函数
function debounce(fn, wait, ...args) {
    var that = this
    fn.tId && clearTimeout(fn.tId)
    fn.tId = setTimeout(function() {
        fn.apply(that, args)
    }, wait)
}

function handle(e) {
    console.log('resize end event')
    console.log(e) // Event{}
}
// 缺点：handle不能写成匿名函数，因为把tId存储在handle函数对象上。所以间接导致传递参数e较为复杂
window.onresize = function(e) { debounce(handle, 1000, e) }

// 改进版
// 思路： 用闭包把tId存储起来
function debounce(fn, wait) {
    var tId
    return function() {
        var that = this
        var args = arguments
        tId && clearTimeout(tId)
        tId = setTimeout(function() {
            fn.apply(that, args)
        }, wait)
    }
}
function handle(e) {
    console.log('resize end event')
    console.log(e) // Event{}
}
window.onresize = debounce(handle, 1000)
```

``` js
// 节流案例： 不停scroll时，滚动条每隔100ms固定频率执行函数
function throttle(fn, wait) {
    var cur = new Date()
    fn.last = fn.last || 0
    if (cur - fn.last > wait) {
        fn.call()
        fn.last = cur
    }
}

function handle() {
    console.log('scroll event')
}
window.onscroll = function() { throttle(handle, 100) }

// 或者
function throttle(fn, wait) {
    var canRun = true // 标记是否可继续执行
    return function() {
        var that = this
        var args = arguments
        if (!canRun) return
        canRun = false
        setTimeout(function() {
            fn.apply(that, args)
            canRun = true
        }, wait)
    }
}
```

## Injector

### 问题

模拟RequireJS的模块。
``` js
injector.register('service', function(name) { return name })
injector.register('constant', 2)
var func = injector.resolve(['service', 'constant'], function(service,constant, other) {
    console.log(service(constant), other)
});
func(3) // 期待打印：2, 3
```

### 思路

通过闭包把register存储的值当作参数注入到func中。

笔者注：这种方式可以自己注册模块并且选择是否在流程中使用它，典型的`依赖注入`（也叫控制反转（IOC），因为本来func是用户依赖创建的，主动权在func上，但现在里面的逻辑是靠传入的service/serviceN参数确定的，相当于把主动权让渡给参数了，所以叫控制反转）。

``` js
// 依赖注入（控制反转）
var injector = {
    dependencies: {},
    register: function(key, value) {
        this.dependencies[key] = value;
    },
    resolve: function(deps, func, scope) {
        var registerArgs = deps.map(name => this.dependencies[name])
        return function(...args) {
            func.apply(scope || {}, [...registerArgs, ...args])
        }
    }
}
```

## 参考文章
* [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code)
* MDN [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [一行写出javascript函数式编程中的curry](https://segmentfault.com/a/1190000008248646)
* [ES6 JavaScript Compose Function](https://gist.github.com/JamieMason/172460a36a0eaef24233e6edb2706f83)
* [JS函数防抖和函数节流](https://juejin.im/post/5a35ed25f265da431d3cc1b1)
* [Dependency injection in JavaScript](http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript)