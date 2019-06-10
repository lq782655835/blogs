# Nginx反向代理

## 什么是反向代理

当我们有一个服务器集群，并且服务器集群中的每台服务器的内容一样的时候，同样我们要直接从个人电脑访问到服务器集群服务器的时候无法访问，必须通过第三方服务器才能访问集群

这个时候，我们通过第三方服务器访问服务器集群的内容，但是我们并不知道是哪一台服务器提供的内容，此种代理方式称为反向代理。

![image](https://user-images.githubusercontent.com/6310131/49806720-674e3a80-fd93-11e8-9a95-b268cac617b7.png)

![image](https://user-images.githubusercontent.com/6310131/49806621-2a824380-fd93-11e8-86d1-c62f635142af.png)

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
nginx -t // 显示nginx配置信息
cd /usr/local/etc/nginx
```

启动nginx

``` shell
nginx // 默认8080端口启动成功，可访问http://localhost:8080/
servive nginx start // ubantu下
```

关闭nginx

``` shell
nginx -s stop
servive nginx stop // ubantu下
```

重启nginx

``` shell
nginx -s reload // 每次修改完nginx.conf文件就需要重启nginx
servive nginx restart // ubantu下
```

### config配置

#### location配置

语法规则： location [=|~|~*|^~] /uri/ { … }
* = 开头表示精确匹配
* ~ 开头表示区分大小写的正则匹配
* ~*  开头表示不区分大小写的正则匹配
* ^~ 开头表示uri以某个常规字符串开头

以下是典型的负载均衡nginx配置：
1. 用户输入http://test-openai.com 时，访问80端口
2. nginx监听到80端口被访问，匹配到的/路径，被反向代理到http://dramatic-offical-website
3. dramatic-offical-website集群管理着一堆机器地址，从而实现负载均衡。
4. 如果匹配到http://test-openai.com/images/ 路径，则直接映射/data下的文件
```
# 虚拟主机配置
server {
    server_name test-openai.com; # 请求到达的服务器名
    listen 80; # 监听80端口
    listen 443 ssl; # https默认端口是443

    # 对 / 所有做负载均衡+反向代理
    location / {
        proxy_pass http://dramatic-offical-website; # 代理到目标地址
    }

    # 静态文件，nginx自己处理
    location /images/ {
        root /data; # 映射到/data目录下
    }
}

# 设定负载均衡后台服务器列表
upstream dramatic-offical-website {
    server 10.192.106.133;
    server 10.192.106.134;
}

```