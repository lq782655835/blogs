
# 《深入浅出NodeJS》

### request
对TCP连接的读操作，http模块将其封装为ServerRequest对象。报文头通过http_parser进行解析
* `报文头第一行（请求行）`如： GET / HTTP/1.1
    * req.method
    * req.url
    * req.httpVersion
* `其余报头（首部字段）是很规律的`
    * req.headers
* `报文体部分抽象为一个只读流`。如果业务逻辑要读取报文中的数据，要在这个数据流结束后才能操作。如：
``` js
function(req, res) {
    var buffers = []
    req.on('data', trunk => buffers.push(trunk))
    req.on('end', () => {
        var buffer = Buffer.concat(buffers)
        // TODO
        res.end('hello world')
    })
}
```
> HTTP请求对象和HTTP响应对象是相对较底层的封装，现行的Web框架如Connect和Express都是在这两个对象的基础上进行高层封装的。

### response

* 报文体头api：res.setHeader和res.writeHeader
    * 可以调用setHeader多次设置，但只有调用writeHeader后，才会写入到连接中。
    * Date、Connection等响应头字段，node自动添加上了。
* 报文体api: res.write和res.end
    * end会先调用write发送数据，然后发送信号告知服务器这次响应结束

> 务必在结束时调用res.end结束请求。

> 一旦开始了发送数据，setHeader和writeHeader将不再生效