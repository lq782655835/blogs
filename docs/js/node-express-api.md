# Express API

nodejs使得可以用javascirpt语言编写后台应用，但使用原生nodejs开发web应用非常复杂。Express是目前最流行的基于Node.js的Web开发框架，可以快速地搭建一个完整功能的网站。以下结合[开发文档](https://expressjs.com/en/4x/api.html)和[express源码](https://github.com/expressjs/express/blob/master/lib/express.js)，整理出常用的一些API以及它们的关系，使得读者理解更加通透。

## Express
* static class
    * `Router()` 创建一个router对象
    * `static()` 设置静态资源根目录，基于[serve-static](http://www.expressjs.com.cn/en/resources/middleware/serve-static.html)模块
* instance
    * `app.use(path, callback)` 使用中间件或子路由。path未设置代表匹配所有http请求
        * 匹配Path的方式
            * 路径: /abcd
            * 路径模式: /abc?d
            * 正则表达式: /\/abc|\/xyz/
            * 数组合集: ['/abcd', '/abc?e', /\/abc|\/xyz/]
    * `app.all(path, callback)` 匹配所有的http请求。
    * `app.METHOD()` 路由一个http请求
    * `app.set()` set('views') 跟res.render()相关
    * `app.listen()` 跟Node的http.Server.listen()一致
> 大部分情况app.use()和app.all()使用相似，最大不一样是中间件执行顺序。app.use()针对主进程，放前面跟放最后不一样；但app.all针对应用的路由，放的位置与中间件执行无关。[stackoverflow](https://stackoverflow.com/questions/14125997/difference-between-app-all-and-app-use)
``` js
var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

app.use(logger()) // 每次都记录日志
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()
app.use(express.static(__dirname+'/public'))

app.get('/api', (req, res) => res.send('api router'))
app.listen(3000, () => console.log('success'))
```

## Request
Express Request扩展了node http.IncomingMessage类,主要是增强了一些获取请求参数的便捷API。[源代码在这](https://github.com/expressjs/express/blob/master/lib/request.js)

* `req.headers`<sup>`extend http`</sup> 返回header object对象
* `req.url`<sup>`extend http`</sup> 返回除域名外所有字符串
* `req.method`<sup>`extend http`</sup> 返回请求类型GET、POST等
* `req.get(name)/req.header(name)` 底层调用node http 模块的req.headers
* `req.params` 返回参数对象，对应的属性名由定义路由时确定。比如app.get('/user/:id')路由时，可以通过req。params.id取得参数
* `req.query` 返回查询参数object对象。等同于require('url').parse(req.url,true).query;底层中使用parseurl模块
* `req.path` 返回字符串。跟req.url比，不带query后缀
* `req.body` post请求获取到数据。需要使用[body-parser](https://www.npmjs.com/package/body-parser)中间件
* `req.cookies` 拿到cookies值。需要使用[cookie-parser](https://www.npmjs.com/package/cookie-parser)中间件
``` js
// http://localhost:3000/api/1?type=123
app.use((req, res, next) => {
    console.log(req.query) // { type: '123' }
    console.log(req.path) // /api/1
    console.log(req.params) // can got req.params.id
    console.log(req.body) // usually in post method
    console.log(req.cookies) // need  cookie-parser middleware

    // extend http.IncomingMessage
    console.log(req.url) // /api/1?type=123
    console.log(req.headers) // header object
    console.log(req.method) // GET
    next()
})
```

# Response
Express Response扩展了node http.ServerResponse类,主要是增加一些便捷api以及返回数据时一些默认处理。[源代码在这](https://github.com/expressjs/express/blob/master/lib/response.js)
* 发送数据
    * `res.write(chunk[, encoding][, callback])`<sup>`extend http`</sup> 写入数据
    * `res.end([data] [, encoding])`<sup>`extend http`</sup>。
    * `res.send([body])` body可选：Buffer、object、string、Array。除非之前set过Content-Type,否则该方法会根据参数类型自动设置Content-Type，底层写入数据使用res.end()
    * `res.json()` 返回json对象。底层调用res.send()
    * `res.redirect([status,] path)` 302转发url
    * `res.render(view [, locals] [, callback])` 输出对应html数据
    * `res.sendStatus(statusCode)` status和send的快捷键
* 设置响应头
    * `res.getHeader(name, value)`<sup>`extend http`</sup>
    * `res.setHeader(name, value)`<sup>`extend http`</sup>
    * `res.get(field)` 底层调用res.getHeader()
    * `res.set(field [, value])/res.header()` 底层调用res.setHeader()
    * `res.status(code)` 底层直接赋值statusCode属性
    * `res.type(type)` 快捷设置Content-Type,底层调用res.set('Content-Type', type)
    * `res.cookie(name, value, options)` 获取cookie
``` js
res.status(404).end();
res.status(404).send('Sorry, we cannot find that!');
res.status(500).json({ error: 'message' });

res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.type('json'); // => 'application/json'
res.set('Content-Type', 'text/plain');
```

## Router
* `router.use()` 方法类似app.use(),该子路由下应用的中间件
* `router.all(path, [callback])`
* `router.METHOD()`

``` js
var express = require('express');
var app = express();
var router = express.Router();
router.get('/user/:id', function (req, res) {
    res.send('OK');
});
router.post('/user/:id', function (req, res) {
    res.send('Post OK');
});
app.use('api', router);

app.listen(3000);
```
