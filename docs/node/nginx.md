# Nginx反向代理

## 1. 什么是反向代理

当我们有一个服务器集群，并且服务器集群中的每台服务器的内容一样的时候，同样我们要直接从个人电脑访问到服务器集群服务器的时候无法访问，必须通过第三方服务器才能访问集群

这个时候，我们通过第三方服务器访问服务器集群的内容，但是我们并不知道是哪一台服务器提供的内容，此种代理方式称为反向代理。

![image](https://user-images.githubusercontent.com/6310131/49806720-674e3a80-fd93-11e8-9a95-b268cac617b7.png)

![image](https://user-images.githubusercontent.com/6310131/49806621-2a824380-fd93-11e8-86d1-c62f635142af.png)

### 反向代理优点

* 保护网站安全，所有请求都先经过代理服务器。

* 负载均衡，把请求转发到压力较小的服务器。

* 可以做一些中间层设置，比如缓存静态资源

## 2. Nginx基础

### 2.1 安装

``` shell
brew install nginx
nginx -v // 显示版本号则安装成功
```

### 2.2 命令

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

## 3. Nginx配置

### 3.1 了解Nginx配置

先看个简单的案例了解下nginx配置：
``` nginx
########### 每个指令必须有分号结束。#################
http {
    access_log /var/logs/nginx-access.log; # 记录日志地址
    # 日志格式
    log_format combined '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';

    # 可以有多个server
    server {
        listen 8080; #监听HTTP端口
        server_name 127.0.0.1; #监听地址  
        root /data/up1; # server根目录。未设置时，MacOS默认是/usr/local/var/www

        location / {
            proxy_pass http://localhost:8080; # 代理
        }

        location /images/ {
            root /data; # 设置该路径下的根目录（覆盖server根目录）
        }

        # 接口
        location = /logout {
            default_type application/json;
            add_header Cache-Control no-cache;
            add_header Access-Control-Allow-Origin *;
            return 200 '{"code":200}';
        }

        location ~ /\.ht {  #禁止访问 .htxxx 文件
           deny all;
        }
        location = /do_not_delete.html { #直接简单粗暴的返回状态码及内容文本
           return 200 "hello.";
        }
    }
}
```

### 3.2 location配置

重点看下location配置

语法规则： location [=|~|~*|^~] /uri/ { … }
* = 开头表示精确匹配
* ~ 开头表示区分大小写的正则匹配
* ~*  开头表示不区分大小写的正则匹配
* ^~ 开头表示uri以某个常规字符串开头

``` nginx
server {
    listen 80; # 监听80端口

    # http://localhost/some/example.html访问/data/www/some/example.html
    location / {
        root /data/www;
    }

    # http://localhost/images/index.html访问/data/images/index.html
    # 注意：这里不是访问/data/index.html
    location /images/ {
        root /data;
    }

    # http://localhost/images/example.png访问/data/images/example.png
    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
```

### 3.3 负载均衡（反向代理）

1. 用户输入http://test-openai.com 时，访问80端口
2. nginx监听到80端口被访问，匹配到的/路径，被反向代理到http://dramatic-offical-website
3. dramatic-offical-website集群管理着一堆机器地址，从而实现负载均衡。
4. 如果匹配到http://test-openai.com/images/ 路径，则直接映射/data下的文件
```
# 虚拟主机配置
server {
    server_name test-openai.com; # 请求到达的服务器名,定义使用test-openai.com访问,
    listen 80; # 监听80端口
    listen 443 ssl; # https默认端口是443

    # 对 / 所有做负载均衡+反向代理
    location / {
        proxy_pass http://dramatic-offical-website; # 代理到目标地址
    }

    # 静态文件，nginx自己处理
    location /images/ {
        root /data; # 映射到/data/images
    }
}

# 设定负载均衡后台服务器列表
upstream dramatic-offical-website {
    server 10.192.106.133;
    server 10.192.106.134;
}

```

### 3.4 nginx.conf 配置文件全解析

``` nginx
#运行用户
#user somebody;

#启动进程,通常设置成和cpu的数量相等
worker_processes  1;

#全局错误日志
error_log  D:/Tools/nginx-1.10.1/logs/error.log;
error_log  D:/Tools/nginx-1.10.1/logs/notice.log  notice;
error_log  D:/Tools/nginx-1.10.1/logs/info.log  info;

#PID文件，记录当前启动的nginx的进程ID
pid        D:/Tools/nginx-1.10.1/logs/nginx.pid;

#工作模式及连接数上限
events {
    worker_connections 1024;    #单个后台worker process进程的最大并发链接数
}

#设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
    #设定mime类型(邮件支持类型),类型由mime.types文件定义
    include       D:/Tools/nginx-1.10.1/conf/mime.types;
    default_type  application/octet-stream;

    #设定日志
    log_format  main  '[$remote_addr] - [$remote_user] [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log    D:/Tools/nginx-1.10.1/logs/access.log main;
    rewrite_log     on;

    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，
    #必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile        on;
    #tcp_nopush     on;

    #连接超时时间
    keepalive_timeout  120;
    tcp_nodelay        on;

    #gzip压缩开关
    #gzip  on;

    #设定实际的服务器列表
    upstream zp_server1{
        server 127.0.0.1:8089;
    }

    #HTTP服务器
    server {
        #监听80端口，80端口是知名端口号，用于HTTP协议
        listen       80;

        #定义使用www.xx.com访问
        server_name  www.helloworld.com;

        #首页
        index index.html

        #指向webapp的目录
        root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp;

        #编码格式
        charset utf-8;

        #代理配置参数
        proxy_connect_timeout 180;
        proxy_send_timeout 180;
        proxy_read_timeout 180;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarder-For $remote_addr;

        #反向代理的路径（和upstream绑定），location 后面设置映射的路径
        location / {
            proxy_pass http://zp_server1;
        }

        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp\views;
            #过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        #设定查看Nginx状态的地址
        location /NginxStatus {
            stub_status           on;
            access_log            on;
            auth_basic            "NginxStatus";
            auth_basic_user_file  conf/htpasswd;
        }

        #禁止访问 .htxxx 文件
        location ~ /\.ht {
            deny all;
        }

        #错误处理页面（可选择性配置）
        #error_page   404              /404.html;
        #error_page   500 502 503 504  /50x.html;
        #location = /50x.html {
        #    root   html;
        #}
    }
}
```

内置全局变量：

``` sh
$args ：这个变量等于请求行中的参数，同$query_string
$content_length ： 请求头中的Content-length字段。
$content_type ： 请求头中的Content-Type字段。
$document_root ： 当前请求在root指令中指定的值。
$host ： 请求主机头字段，否则为服务器名称。
$http_user_agent ： 客户端agent信息
$http_cookie ： 客户端cookie信息
$limit_rate ： 这个变量可以限制连接速率。
$request_method ： 客户端请求的动作，通常为GET或POST。
$remote_addr ： 客户端的IP地址。
$remote_port ： 客户端的端口。
$remote_user ： 已经经过Auth Basic Module验证的用户名。
$request_filename ： 当前请求的文件路径，由root或alias指令与URI请求生成。
$scheme ： HTTP方法（如http，https）。
$server_protocol ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
$server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值。
$server_name ： 服务器名称。
$server_port ： 请求到达服务器的端口号。
$request_uri ： 包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
$uri ： 不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。
$document_uri ： 与$uri相同。
```

## 4. 总结技巧

* deny
* gzip
* add_header

### 防盗链

``` nginx
location ~* \.(gif|jpg|swf)$ {
    valid_referers none blocked start.igrow.cn sta.igrow.cn;
    if ($invalid_referer) {
        rewrite ^/ http://$host/logo.png;
    }
}
```

### 根据文件类型设置过期时间

``` nginx
location ~* \.(js|css|jpg|jpeg|gif|png|swf)$ {
    if (-f $request_filename) {
        expires 1h;
        break;
    }
}
```

### 禁止访问某个目录
``` nginx
location ~* \.(txt|doc)${
    root /data/www/wwwroot/linuxtone/test;
    deny all;
}
```

### gzip
``` nginx
#gzip on|off
gzip  on;

#消息体太小就没必要压缩(这里设置最小范围1K)
gzip_min_length  1024; 

#Nginx做为反向代理的时候启用，
#param:off|expired|no-cache|no-sotre|private|no_last_modified|no_etag|auth|any]
#expample:gzip_proxied no-cache;
#off – 关闭所有的代理结果数据压缩
#expired – 启用压缩，如果header中包含”Expires”头信息
#no-cache – 启用压缩，如果header中包含”Cache-Control:no-cache”头信息
#no-store – 启用压缩，如果header中包含”Cache-Control:no-store”头信息
#private – 启用压缩，如果header中包含”Cache-Control:private”头信息
#no_last_modified – 启用压缩，如果header中包含”Last_Modified”头信息
#no_etag – 启用压缩，如果header中包含“ETag”头信息
#auth – 启用压缩，如果header中包含“Authorization”头信息
#any – 无条件压缩所有结果数据

gzip_proxied     any;

#Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果，匹配的前提是后端服务器必须要返回包含"Via"的 header头。
gzip_proxied expired no-cache no-store private auth;

#压缩比例，比例越大，压缩时间越长。
#默认是1 
#建议 nginx gzip级别为4
gzip_comp_level  4;

#哪些文件可以被压缩
gzip_types       text/plain text/html text/javascript text/xml text/css application/x-javascript application/xml;

#无视IE6这个笨蛋
gzip_disable  "MSIE [1-6]\.";
```

### 负载均衡

``` nginx
upstream mysvr {
    #weigth参数表示权值，权值越高被分配到的几率越大
    server 192.168.8.1x:3128 weight=5;#本机上的Squid开启3128端口
    server 192.168.8.2x:80  weight=1;
    server 192.168.8.3x:80  weight=6;
}

location ~* /mysvr/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://mysvr/$request_uri;    
}
```

### 内容控制

http头控制
``` nginx
add_header 这个指令用来增加协议头：
add_header Cache-Control no-cache;
add_header Cache-Control no-store;
add_header Cache-Control max-age=60;
add_header Content-Encoding gzip
add_header Content-Type 'text/html; charset=utf-8';

if ($request_uri ~* "^/$|^/search/.+/|^/company/.+/") {
    add_header    Cache-Control  max-age=3600;
}

if ($request_uri ~* "^/search-suggest/|^/categories/") {
    add_header    Cache-Control  max-age=86400;
}
```

直接简单粗暴的返回状态码及内容文本：
``` nginx
location = /do_not_delete.html {
    return 200 "hello.";
}
```

###  SSL HTTPS

``` nginx
server{
    listen 443;
    server_name www.test.com;
    charset utf8;
    ssl on;
    ssl_certificate /etc/ssl/test.com.crt;
    ssl_certificate_key /etc/ssl/test.com.key;
```
