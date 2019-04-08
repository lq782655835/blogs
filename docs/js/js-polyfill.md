# JS polyfill

常用的一些函数垫片，意在加深js基础概念，同时对js也是个很好的总结。以下案例为个人实践，考虑主流程完整，但有些边界问题未考虑，不推荐在工程项目中使用。正式项目推荐使用[lodash](https://github.com/lodash/lodash)。

## call/apply

``` js
/*
var foo = { value: 1 }
function bar() { console.log(this.value) }
bar.call(foo) // 1

思路：call立即执行函数，同时函数中的this改为指向context。类似等价于以下
var foo = {
    value: 1,
    fn: function bar() { console.log(this.value) }
}
*/
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

``` js
/*
var foo = { value: 1 }
function bar() { console.log(this.value) }
let barBind = bar.bind(foo)
barBind() // 1

思路：通过apply改变this，并且返回一个函数
*/
Function.prototype.bind = function (context, ...args) {
    var fn = this
    return function() {
        return fn.apply(context, args)
    }
}
```

## curry

``` js
/*
实现柯里化函数。
let curryFun = curry(addFun)
curryFun(1)(2)(3) = 6

思路：递归，当执行的参数个数等于原本函数的个数，执行函数
*/
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

深度为1的展平:
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

深度无限的展平:
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
        Array.isArray(val) ? stack.push(val) : res.push(val)
    }

    return res.reverse()
}

// 取巧，利用Array.toString()
function flatDeep(arr) {
    return arr.toString().split(',')
}
```

指定深度的展平(深度：每一项展平的次数)：
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
// or
let removeRepeat = arr =>  [...new Set(arr)]
```

## 浅拷贝、深拷贝

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

## 参考文章
* [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code)
* MDN [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [一行写出javascript函数式编程中的curry](https://segmentfault.com/a/1190000008248646)
* [ES6 JavaScript Compose Function](https://gist.github.com/JamieMason/172460a36a0eaef24233e6edb2706f83)