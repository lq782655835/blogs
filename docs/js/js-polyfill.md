# JS polyfill
项目中常用的一些垫片，对js基础是个很好的总结。

## bind

``` js
/*
实现函数绑定到指定上下文context
使用： bind(Class1.prototype.method1, new Class1(config))
*/
module.exports = function bind(fn, context) {
    return function() {
        var args = new Array(arguments.length)
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i]
        }
        fn.apply(context, args)
    }
}

// or
const bind = (fn, context, ...boundArgs) => (...args) => fn.apply(context, [...boundArgs, ...args]);
```

## curry

``` js
/*
实现柯里化函数。
实现没有考虑this问题，不能应用到生产环境中。生产环境考虑loadsh的curry实现
let abc = curry(addFun)
abc(1)(2)(3) = 6
*/
var curry = function(fn) {
    var limit = fn.length
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

// or
var curry = function(fn, ...args) {
    if (args.length > fn.length) {
        return fn(...args)
    }

    return function (...args2) {
        return curry(fn, ...args, ...args2)
    }
}
```

## flat
将数组展平
``` js
// 深度为1的展平
// before：[1, 2, [3, 4, [5, 6]]]
// after flat: [1, 2, 3, 4, [5, 6]]
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
let removeRepeat = arr =>  Array.from(new Set(...arr))
```

## 浅拷贝、深拷贝

``` js
// 浅拷贝
const clone = target => Object.assign({}, target)
const clone = target => { ...target }
```

``` js
// 深拷贝
// 递归赋值
const deepClone = target => {
    if (!traget || typeof traget !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }

    let targetObj = target.constructor === Array ? [] : {}
    for (let key in target) {
        targetObj[key] = typeof target[key] === 'object' ？ deepClone(target[key]) : target[key]
    }
    return targetObj
}

// or 注意这种取巧方法是有限制的，只能解析Number、String、Array等能够被json表示的数据结构
const deepClone = target => JSON.parse(JSON.stringify(target))
```

## 参考文章
* [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code)
* [一行写出javascript函数式编程中的curry](https://segmentfault.com/a/1190000008248646)