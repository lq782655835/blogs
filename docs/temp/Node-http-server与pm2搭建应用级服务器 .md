# http-server与pm2搭建应用级服务器

## [http-server](https://github.com/indexzero/http-server)概念

http-server ./dist -p 3000
-p 指定开启服务的地址
-P 没有匹配到路径时，代理到设置到target地址

## pm2概念

pm2 start app.js

### pm2-runtime

pm2 list

## http-server与pm2搭配

对于是node命令的应用程序，使用`pm2-runtime`命令代替pm2。pm2-runtime的目标是将您的应用包装到合适的Node.js生产环境中。**这里有个注意点，对于node命令的参数，一定要在参数前加入`--`**。

``` js
server: "pm2-runtime http-server -- ./dist -p 3000",
// or
"server:start": "http-server ./dist -p 3000",
"sever": "pm2-runtime npm -- run server:start"
```

## 参考文章

* [running-nodejs-http-server-forever-with-pm2](https://stackoverflow.com/questions/31804966/running-nodejs-http-server-forever-with-pm2)

* [docker-pm2-nodejs](http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/)