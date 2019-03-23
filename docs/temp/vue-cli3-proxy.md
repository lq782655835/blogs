# vue-cli3中proxy配置不完全支持webapck


![image](https://user-images.githubusercontent.com/6310131/54813522-b24be800-4cc8-11e9-8b7d-749199a6ed8e.png)
## 结论
1. 目前vue-cli3只支持string和object方式，不支持context数组方式。相关issue
* [Add more options for proxy context](https://github.com/vuejs/vue-cli/issues/2320)
* [增强proxy: 对齐webpack devServer的proxy](https://github.com/vuejs/vue-cli/issues/2868)


## webpack proxy
[官方文档](https://webpack.js.org/configuration/dev-server/#devserverproxy)
webpack-dev-server代理是基于[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)，更多使用方式可以查看其github
### 一
请求到 /api/xxx 现在会被代理到请求 http://localhost:3000/api/xxx
``` js
mmodule.exports = {
    //...
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
};
```

### 二
代码多个路径代理到同一个target下, 你可以使用由一个或多个「具有 context 属性的对象」构成的数组
``` js
module.exports = {
    //...
    devServer: {
        proxy: [{
            context: ['/auth', '/api'],
            target: 'http://localhost:3000',
        }]
    }
};
```

### 三
传递参数
``` js
module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/api' : ''},
                bypass: function() {...}
            }
        }
    }
};
```

## 参考文章
* [vue-cli3 devserver-proxy](https://cli.vuejs.org/zh/config/#devserver-proxy)