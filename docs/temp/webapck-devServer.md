
# Webpack4 devServer配置详解

webpack-dev-server是一个封装好的webpack开发服务器，底层使用express。通常用在开发环境的webpack打包，它有以下这些作用：
1. 读取webpack.config.js并使用webpack进行编译
2. **默认集成一些第三方插件并可供配置，都在webpack.config.js下的`devServer`节点下（本节重点）**
3. 开启一个websocket以实现热加载
4. 开启本地express服务器以实现网址预览
> webpack打包和webpack-dev-server开启服务的区别:webpack输出真实的文件，而webpack-dev-server输出的文件只存在于内存中,不输出真实的文件

## devServer配置

webpack的devServer配置基于[webpack-dev-server](https://github.com/webpack/webpack-dev-server)集成的插件。该插件提供了proxy代理配置，基于express中间件 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)实现，该中间件又基于node [http-proxy](https://github.com/nodejitsu/node-http-proxy),所以如果要详细知道proxy各个参数的意义和实现方式，可以阅读下http-proxy的源码。
> proxy作用：解决开发环境的跨域问题(不用再去配置nginx）

``` js
devServer: {
    // 提供静态文件目录地址
    // 基于express.static实现
    contentBase: path.join(__dirname, 'dist'),
    // 任意的 404 响应都被替代为 index.html
    // 基于node connect-history-api-fallback包实现
    historyApiFallback: true,
    // 是否一切服务都启用 gzip 压缩
    // 基于node compression包实现
    compress: true,
    // 是否隐藏bundle信息
    noInfo: true,
    overlay: true, // 发生错误是否覆盖在页面上
    // 是否开启热加载
    hot: true,
    inline: true, // 默认是true
    // 是否自动打开
    open: true,
    // 设置本地url和端口号
    host: 'localhost',
    port: 8080,
    // 代理
    // 基于node http-proxy-middleware包实现
    proxy: {
      // 匹配api前缀时，则代理到3001端口
      // 即http://localhost:8080/api/123 = http://localhost:3001/api/123
      '/api': 'http://localhost:3001',
      // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
      //  changes the origin of the host header to the target URL
      // 主要解决跨域问题
      changeOrigin: true,
      // 针对代理https
      secure: false,
      // 覆写路径：http://localhost:8080/api/123 = http://localhost:3001/123
      pathRewrite: {'^/api' : ''}
    }
  },
```

## 源码解析

webpack-dev-server源码，把一些细枝末节去掉应该好理解很多，大部分都是基于第三方插件封装的API：
``` js
const features = {
    // compress
    // 基于compression包
    compress: () => {
        if (options.compress) {
            // Enable gzip compression.
            app.use(compress());
        }
    },
    // proxy
    // 基于http-proxy-middleware包
    proxy: () => {
        const getProxyMiddleware = (proxyConfig) => {
            const context = proxyConfig.context || proxyConfig.path;
            if (proxyConfig.target) {
                return httpProxyMiddleware(context, proxyConfig);
            }
        };
        // 多个proxy设置
        options.proxy.forEach((proxyConfigOrCallback) => {
            // http-proxy-middleware作为中间件应用到express中
            // 如果自己封装代理，这里很值得借鉴
            app.use((req, res, next) => {
                const proxyConfig = proxyConfigOrCallback();
                proxyMiddleware = getProxyMiddleware(proxyConfig);

                proxyMiddleware(req, res, next);
            })
        }
    },
    // historyApiFallback
    // 基于connect-history-api-fallback包
    historyApiFallback: () => {
        if (options.historyApiFallback) {
            // Fall back to /index.html if nothing else matches.
            app.use(historyApiFallback(fallback));
        }
        },
    // contentBase
    // 基于express.static
    contentBaseFiles: () => {
        if (Array.isArray(contentBase)) {
            contentBase.forEach((item) => {
                app.get('*', express.static(item));
            });
        }
    }
}
```
