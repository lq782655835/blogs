# Koa 洋葱模型原理分析

Koa 有两个核心知识点：一个是中间件ctx，一个就是洋葱模型。

中间件ctx利用js原型，很巧妙的把request和response对象封装在里面。详细的实现可看笔者实现的简版koa [build-your-own-koa](https://github.com/lq782655835/build-your-own-koa)。

另外一个核心就是本文要分析的洋葱模型。

## 1. 认识洋葱模型

``` js
const Koa = require('koa');

const app = new Koa();
const PORT = 3000;

// #1
app.use(async (ctx, next)=>{
    console.log(1)
    await next();
    console.log(1)
});
// #2
app.use(async (ctx, next) => {
    console.log(2)
    await next();
    console.log(2)
})

app.use(async (ctx, next) => {
    console.log(3)
})

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
```

打印顺序：

```
1
2
3
2
1
```

当程序运行到await next()的时候就会暂停当前程序，进入下一个中间件，**处理完之后才会回过头来继续处理**。

## 2. 原理

`核心：中间件管理和next实现`，其中next是巧妙的使用了Promise特性。洋葱模型，本质上是Promise.resolve()的递归。

### 2.1 中间件管理

app.listen使用了this.callback()来生成node的httpServer的回调函数。
``` js
listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
}
```

Koa.js中间件引擎是有koa-compose模块，即如下的compose方法
``` js
callback() {
    const fn = compose(this.middleware); // 核心：中间件的管理和next的实现
    
    if (!this.listeners('error').length) this.on('error', this.onerror);
    
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res); // 创建ctx
      return this.handleRequest(ctx, fn);
    };
    
    return handleRequest;
}
```

当我们app.use的时候，只是把方法存在了一个数组里

``` js
use(fn) {
    this.middleware.push(fn);
    return this;
}
```

### 2.2 next实现

dispatch函数，它将遍历整个middleware，然后将context和dispatch(i + 1)传给middleware中的方法。

dispatch return Promise这段代码就很巧妙的实现了两点:
1. 将`context`一路传下去给中间件
2. 将`middleware`中的下一个中间件`fn`作为未来`next`的返回值

``` js
function compose (middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
          // 核心代码：返回Promise
          // next时，交给下一个dispatch（下一个中间件方法）
          // 同时，当前同步代码挂起，直到中间件全部完成后继续
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

## 3. 思考

洋葱模型实现原理，等同于如下代码：

**next()返回的是promise，需要使用await去等待promise的resolve值。**

promise的嵌套就像是洋葱模型的形状就是一层包裹着一层，直到await到最里面一层的promise的resolve值返回。

``` js
Promise.resolve(middleware1(context, async() => { // 注意async关键字不能省略
  return Promise.resolve(middleware2(context, async() => {
    return Promise.resolve(middleware3(context, async() => {
      return Promise.resolve();
    }));
  }));
}))
.then(() => {
    console.log('end');
});
```

## 参考

* https://segmentfault.com/a/1190000013981513
* https://segmentfault.com/a/1190000019897506