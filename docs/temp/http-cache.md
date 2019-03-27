

## 与缓存相关的HTTP首部字段
* Cache-Control
* Pragma

在 http1.0 时代，给客户端设定缓存方式可通过两个字段——Pragma和Expires来规范。

当该字段值为no-cache的时候（事实上现在RFC中也仅标明该可选值），会知会客户端不要对该资源读缓存，即每次都得向服务器发一次请求才行。

http1.1新增了 Cache-Control 来定义缓存过期时间.
若报文中同时出现了 Expires 和 Cache-Control，则以 Cache-Control 为准。
也就是说优先级从高到低分别是 Pragma > Cache-Control > Expires

Cache-Control也是一个通用首部字段，这意味着它能分别在请求报文和响应报文中使用。

## 参考文章
* [HTTP缓存控制小结](https://imweb.io/topic/5795dcb6fb312541492eda8c)