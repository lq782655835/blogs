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
