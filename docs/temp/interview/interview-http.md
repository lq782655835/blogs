# HTTP

* [输入URL背后的技术步骤](https://lq782655835.github.io/blogs/js/http-base-1.url.html#%E4%BC%98%E5%8C%96)(http请求链路、渲染引擎渲染等)

## 1. http三次握手，四次挥手

[Http/2与Http/1.x比较](https://lq782655835.github.io/blogs/js/http2.html)

TCP三次握手

三次握手的必要性：为了保证服务器能接收到客户端的信息并做出正确的应答而进行前两次（第一次和第二次）握手，为了保证客户端能够接收到服务端的信息并能做出正确的应答而进行后两次（第二次和第三次）握手。
* `第一次握手`：建立连接时，客户端`发送syn包`（syn=j）到服务器，并`进入SYN_SENT状态`，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers）。
* `第二次握手`：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即`SYN+ACK包`，此时服务器进入`SYN_RECV状态`；
* `第三次握手`：客户端收到服务器的`SYN+ACK包`，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入`ESTABLISHED（TCP连接成功）状态`，完成三次握手。
完成三次握手，客户端与服务器开始传送数据。这样就保证了，每次传送数据都会准确到达目标设备了。

TCP四次挥手

1. 客户端A发送一个`FIN`，用来关闭客户A到服务器B的数据传送。
2. 服务器B收到这个FIN，它`发回一个ACK`，确认序号为收到的序号加1。和SYN一样，一个FIN将占用一个序号。
3. 服务器B关闭与客户端A的连接，发送一个`FIN给客户端A`。
4. `客户端A发回ACK`报文确认，并将确认序号设置为收到序号加1。

## 2. https握手过程
1. 客户端使用https的url访问web服务器,要求与服务器建立ssl连接
1. web服务器收到客户端请求后, 会将网站的证书(包含公钥)传送一份给客户端
1. 客户端收到网站证书后会检查证书的颁发机构以及过期时间, 如果没有问题就随机产生一个秘钥
1. 客户端利用公钥将会话秘钥加密, 并传送给服务端, 服务端利用自己的私钥解密出会话秘钥
1. 之后服务器与客户端使用秘钥加密传输

## 3. 状态码/缓存

### 状态码

* 202: 服务器已接受请求，但尚未处理。
* 204: 服务器成功处理了请求，没有返回任何内容。
* 302: 普通重定向
* 304: 对比缓存。Last-Modified/If-Modified-Since

### 缓存

**Cache-Control、Expires、Etag 和 Last-Modified 来设置 HTTP 缓存。**

`强缓存：让客户端决定是否向服务器发送请求`（在chrome下表现为200 from cache）
* http1.0
    * Expires<sup>`通用`</sup>。启用缓存和定义缓存时间。时间是相对服务器
    * Pragma<sup>`通用`</sup>。禁用缓存，字段值为no-cache的时候
* http1.1
    * Cache-Control<sup>`通用`</sup>。启用缓存/禁用缓存/定义时间（max-age相对时间）

优先级从高到低分别是 Pragma -> Cache-Control -> Expires 。

`对比缓存`：让客户端与服务器之间能实现缓存文件是否更新的验证。
* Last-Modified<sup>`响应`</sup>。响应时，告诉浏览器资源的最后修改时间。
* If-Modified-Since<sup>`请求`</sup>。再次请求时，发送Last-Modified值。服务器拿到对比文件修改时间，没修改304，有修改200。

`协商缓存`：因为存在文件修改，但内容没改，所以另外一种方式通过ETag数据比对（优先级高于Last-Modified / If-Modified-Since）
* ETag<sup>`响应`</sup>。
* If-None-Match<sup>`请求`</sup>。

> 通用首部字段，这意味着它能分别在请求报文和响应报文中使用

![](https://images2015.cnblogs.com/blog/632130/201702/632130-20170210141453338-1263276228.png)

## 4. 安全

1. `XSS`：`跨站脚本攻击`，是属于代码注入的一种。攻击者通过将代码注入网页中，其他用户看到会受到影响(代码内容有请求外部服务器);

    比如：评论区书写评论时，故意写入\<script>alert(document.cookie)\</scirpt>,如果服务端没校验直接存库了，同时返给前端使用v-html时（所以尽量修改节点文本），所有看该条评论的用户cookie都被暴露了。

    防范：
    * 转义 &lt; &gt; 这些特殊字符为实体字符(比如：评论区内容没转译直接存数据库，显示时可能js就能拿到敏感信息了，属于存储型XSS)
    * 利用正则判断攻击脚本
    * 尽量修改节点文本而不是修改节点内容html(比如：有可能dom为\<script>标签，这样就可以通过js拿到cookie等敏感信息)

2. `CSRF`（Cross-site request forgery）：一种`跨站请求伪造`，冒充用户发起请求，完成一些违背用户请求的行为。比如，你开发的网站中，有一个购买商品的操作，使用get接口。那么黑客网站就可以通过<image src="开发网站地址"，去调用你的开发网站（比如刷票）。
防范：
    * 尽量对要修改数据的请求使用post而不是get
    * 给每一次用户登陆分配一个临时token，用服务端的setCookie头将此token种入用户cookie中，每次请求比对用户方token与服务器端token是否吻合。
    * 服务器禁止跨域请求
    * 及时清除用户的无效cookie

3. 网络劫持攻击。防范：https加密
4. [cookie](./cookie-google-rule.md)(附google最新策略)

## 5. session实现原理

1、创建Session的时候，服务器将生成一个唯一的sessionid然后用它生成一个关闭浏览器就会失效的cookie。

2、然后再将一个与这个sessionid关联的数据项加入散列表。

3、当浏览器端提交到服务器时，会通过sessionid=123去散列表中寻找属于该用户的Session信息。

## 6. js跨域

[HTTP跨域解决方案](https://lq782655835.github.io/blogs/js/http-cross-domain.html#jsonp)

1. JSONP
2. CORS

![](https://upload-images.jianshu.io/upload_images/948614-1752f5c8993cc1a0.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/600/format/webp)