# JS polyfill
常用的一些垫片，对js基础是个很好的总结。

## bind

``` js
/*
实现函数绑定到指定上下文context
使用： bind(method1, new Class1(config))
思路：使用apply改变this
*/
module.exports = function bind(fn, context) {
    return function() {
        var args = [].slice.call(arguments)
        fn.apply(context, args)
    }
}

// or es6
const bind = (fn, context, ...boundArgs) => (...args) => fn.apply(context, [...boundArgs, ...args]);
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
* 等价于pipe(fn1,fn2,fn3,fn4)(args)等价于fn4(fn3(fn2(fn1(args)))
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

## flat

将数组展平

``` js
// 深度为1的展平
// before：[1, 2, [3, 4, [5, 6]]]
// after flat: [1, 2, 3, 4, [5, 6]]
// 思路：使用reduce或map
function flatSingle(arr) {
    return arr.reduce((pre, val) => pre.concat(val), [])
}

// or
let flatSingle = arr => [].concat(...arr)
```

``` js
// 深度展平
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

// 取巧方式
function flatDeep(arr) {
    return arr.toString().split(',')
}
```

``` js
// 数组平铺到指定的深度(深度：每一项展平的次数)
// before: [1,2,3,[1, [2]], [1, [2, [3]]]]
// after: [ 1, 2, 3, 1, 2, 1, 2, [ 3 ] ]
function flatDeep(arr, depth = 1) {
    // 设置
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

// es6
const clone = source => Object.assign({}, source)
const clone = source => { ...source }
```

``` js
// 深拷贝
// 递归赋值
const deepClone = source => {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }

    // 区分array和object对象
    let target = source.constructor === Array ? [] : {}
    for (let key in source) {
        target[key] = typeof source[key] === 'object' ？ deepClone(source[key]) : source[key]
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