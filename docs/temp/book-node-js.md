# 《深入浅出NodeJS》


### Node为什么选择Javascript

* 高性能 - V8
* 符合事件驱动
* 没有历史包袱

### Node实现

传统JS只能运行在浏览器中（沙箱环境），除了V8解释JS语法字符串外，还有WebKit（渲染内核）、HTML/DOM接口以及浏览器环境提供的事件循环。

Node去除跟UI相关的WebKit、HTML/DOM等接口，使用Libuv作为环境提供事件循环，使得使用上基本一致（浏览器通过事件驱动服务界面交互，Node通过事件驱动服务I/O）。

Node意义：Node打破了过去JavaScript只能在浏览器中运行的局面。前后端编程环境统一，大大降低前后端切换所需要的上下文交换代价。

### Node网络编程

HTTP基于请求响应，一问一答。
从协议角度看，**浏览器其实是一个HTTP的代理**，用户的行为将会通过它转换为HTTP请求，发送给服务端。 

* node封装了http服务（应用层），它还提供tcp/udp（传输层）服务
* 请求头解析：req.method/url/headers
* 响应头设置：setHeader可进行多次，只有调用writeHeader后才会把报头写入到连接中。
* 响应正体设置：res.write/end，end如果带数据，等同于write + end
