# js polyfill
项目中常用的一些垫片，对js基础是个很好的总结。

## bind
实现函数绑定到指定上下文context
``` js
module.exports = function bind(fn, context) {
    return function() {
        var args = new Array(arguments.length)
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i]
        }
        fn.apply(context, args)
    }
}

// 使用： bind(Class1.prototype.method1, new Class1(config))
```

## curry

``` js
/*
实现柯里化函数
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
```

## 参考文章
* [一行写出javascript函数式编程中的curry](https://segmentfault.com/a/1190000008248646)