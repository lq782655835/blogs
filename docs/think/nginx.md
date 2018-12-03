# Nginx反向代理

## 什么是反向代理

当我们有一个服务器集群，并且服务器集群中的每台服务器的内容一样的时候，同样我们要直接从个人电脑访问到服务器集群服务器的时候无法访问，必须通过第三方服务器才能访问集群

这个时候，我们通过第三方服务器访问服务器集群的内容，但是我们并不知道是哪一台服务器提供的内容，此种代理方式称为反向代理。

![](https://user-gold-cdn.xitu.io/2016/11/30/fa276a0b51bdf992f5ceaeea3d698a17.png?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](https://user-gold-cdn.xitu.io/2016/11/29/c53a707e65c569f1ff35cef04ecc5435.png?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 反向代理优点

* 保护网站安全，所有请求都先经过代理服务器。

* 负载均衡，把请求转发到压力较小的服务器。

* 可以做一些中间层设置，比如缓存静态资源

## Nginx基础

### 安装

``` shell
brew install nginx
nginx -v // 显示版本号则安装成功
```

### 命令

nginx目录

``` shell
cd /usr/local/etc/nginx
```

启动nginx

``` shell
nginx // 默认8080端口启动成功，可访问http://localhost:8080/
```

关闭nginx

``` shell
nginx -s stop
```

重启nginx

``` shell
nginx -s reload // 每次修改完nginx.conf文件就需要重启nginx
```