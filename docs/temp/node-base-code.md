
## req
原生req属性
* req.url 完整URL地址，包括路径和查询部分，hash部分会丢弃。在请求报文第一行
* req.method 请求报文第一行第一个单词
``` js
const url = require('url)
const querystring = require('querystring)
// 类express实现源码
// https://github.com/expressjs/express/blob/master/lib/request.js#L412
req.path = url.parse(req.url).pathname
req.query = url.parse(req.url, true).query
//或 req.query = querystring.parse(url.parse(req.url)).query
```

``` js
// 类body-parse实现源码
// 拿到raw数据
// row-body源码：https://github.com/stream-utils/raw-body/blob/master/index.js#L240
function (req, res, next) {
    if (hasBody(req)) {
        var buffers = []
        req.on('data', chunk => buffers.push(chunk))
        req.on('end', () => {
            req.rawBody = Buffer.concat(buffers).toString()
            next()
        })
    } else {
        next()
    }
}

// json处理
// body-parse源码：https://github.com/expressjs/body-parser/blob/master/lib/types/json.js#L89
function(req, res, next) {
    if (mime(req) === 'application/json') {
        req.body = JSON.parse(req.rawBody)
        next()
    }

    next()
}
```