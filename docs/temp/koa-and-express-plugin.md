# Koa Plugin With Express

## [Koa](https://koajs.com/#introduction)

``` js
// used
const Koa = require('koa') // koa v2
const app = new Koa()

app.use(async (ctx, next) => {
    console.log(ctx.req, ctx.res, ctx.method, ctx.url)
    await next()
    console.log('洋葱模型')
})
app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
```

ctx代理了一些ctx.req和ctx.res的内容：https://koajs.com/#context

```
Request aliases
The following accessors and alias Request equivalents:

ctx.header
ctx.headers
ctx.method
ctx.method= // set
ctx.url
ctx.url=
ctx.originalUrl
ctx.origin
ctx.href
ctx.path
ctx.path=
ctx.query
ctx.query=
ctx.querystring
ctx.querystring=
ctx.host
ctx.hostname
ctx.fresh
ctx.stale
ctx.socket
ctx.protocol
ctx.secure
ctx.ip
ctx.ips
ctx.subdomains
ctx.is()
ctx.accepts()
ctx.acceptsEncodings()
ctx.acceptsCharsets()
ctx.acceptsLanguages()
ctx.get()

Response aliases
The following accessors and alias Response equivalents:

ctx.body
ctx.body=
ctx.status
ctx.status=
ctx.message
ctx.message=
ctx.length=
ctx.length
ctx.type=
ctx.type
ctx.headerSent
ctx.redirect()
ctx.attachment()
ctx.set()
ctx.append()
ctx.remove()
ctx.lastModified=
ctx.etag=
```

## [Express](https://expressjs.com/en/4x/api.html)

``` js
var app = express()

app.use((req, res, next) => {
  console.log(req.path, req.method, req.params)
  next() // 尾递归
})
app.get('/', (req, res) => {
    // res.send('hello world')
    // res.status(500).send('bad param')
    // res.set('Content-Type', 'application/json')
    res.json({name: 1})
})
app.listen(3000)
```
