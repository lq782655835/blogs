# HTTP跨域解决方案

浏览器同源策略导致不能加载执行其他网站的脚本，这是互联网安全的一部分。**跨域之后ajax请求可以发出，但浏览器在接收前会对其来源进行检查**，如果是不跨域，直接加载数据；如果跨域，会出现著名的`No 'Access-Control-Allow-Origin' header is present on the requested resource`。以下总结一些常用的HTTP跨域解决方案。
> 常见的跨域都需要后端支持，跨域记得带上http头信息Access-Control-Allow-Origin

## JSONP
利用浏览器script标签不跨域特点，使用get请求到目标api，再通过目标api返回callbackName(data)方式执行js代码。特点：
1. 只能是get请求
2. 需要后端配合，因为需要知道前端callbackName命名
3. 支持老式浏览器

``` js
var script = document.createElement('script');
script.type = 'text/javascript';

// 传参并指定回调执行函数为onBack
script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
document.head.appendChild(script);

// 回调执行函数
function onBack(res) {
    alert(JSON.stringify(res));
}

// 服务端api返回
onBack({"status": true, "user": "admin"})
```

## CORS
CORS 是一个 W3C 标准，全称是“跨域资源共享”（Cross-origin resource sharing）。它允许浏览器向跨域的服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。特点：
1. W3C标准
2. 需要浏览器和服务器同时支持

### CORS简单请求

* 请求方法：三种方法之一
    * HEAD
    * GET
    * POST
* HTTP头信息：不超出以下几种字段
    * Accept
    * Accept-Language
    * Content-Language
    * Last-Event-ID
    * Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

在头信息之中，增加一个Origin字段。说明本次请求来自哪个域（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

### CORS非简单请求
* 请求方法
    * PUT
    * DELETE
* HTTP头信息：
    * Content-Type：application/json

非简单请求，自动发出一个“预检”请求，要求服务器确认可以这样请求。服务器通过预检后，后续浏览器会发送一个简单请求。

## 其他
* 服务端
    * nginx代理跨域
    * nodejs代理跨域
    * websocket
* 浏览器
    * html5 postMessage
    * iframe

## 参考文章
* MDN [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
* [CORS通信](http://javascript.ruanyifeng.com/bom/cors.html)