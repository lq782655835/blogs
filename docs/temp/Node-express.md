# express

## API
* static class
    * Router()
    * static()
* instance
    * use() 使用中间件
    * set() set('views') 跟res.render()相关
    * METHOD()
    * listen()
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

* request
* req.params

* response
    * 发送数据
        * res.send([body])。body可选：Buffer、object、string、Array
        * res.json()
        * res.end([data] [, encoding])。从node核心responese继承
        * res.render(view [, locals] [, callback])
        * res.redirect([status,] path)
    * 设置响应头
        * res.status(code)
        * res.sendStatus(statusCode) status和send的快捷键
        * res.type(type) 快捷设置Content-Type
        * res.set(field [, value]) response.setHeader(field [, value])的别称
``` js
res.status(404).end();
res.status(404).send('Sorry, we cannot find that!');
res.status(500).json({ error: 'message' });

res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.type('json'); // => 'application/json'
res.set('Content-Type', 'text/plain');
```

* Router

* router.all()
* router.METHOD()

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
app.use(router);

app.listen(3000);
```
