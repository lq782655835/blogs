# Express API

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
* `req.headers`<sup>`extend http`</sup> 返回header object对象
* `req.url`<sup>`extend http`</sup> 返回除域名外所有字符串
* `req.method`<sup>`extend http`</sup> 返回请求类型GET、POST等
* `req.params` 返回参数对象，对应的属性名定义路由时确定。
* `req.query` 返回查询参数object对象。
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
* 发送数据
    * `res.send([body])`<sup>`extend http`</sup>。body可选：Buffer、object、string、Array
    * `res.end([data] [, encoding])`<sup>`extend http`</sup>。从node核心responese继承
    * `res.json()` 返回json对象
    * `res.redirect([status,] path)`
    * `res.render(view [, locals] [, callback])`
* 设置响应头
    * `res.status(code)`
    * `res.sendStatus(statusCode)` status和send的快捷键
    * `res.type(type)` 快捷设置Content-Type
    * `res.set(field [, value])` response.setHeader(field [, value])的别称
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
