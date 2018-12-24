# Webpack3.x升级Webpack4

自从Parcel零配置方案得到程序员青睐，Webapck才幡然醒悟。相对于以前Webapck3.x复杂的loader、plugin等配置，Webpack4遵循约定大于配置，做了很多默认话配置。Webpack官方也出了[v3到v4升级指南](https://webpack.js.org/migrate/4/)，但没有写的很具体，特别是第三方插件升级这块。以下跟随笔者项目实例，看看如何把3.x版本项目升级到webpack4。升级实例：[node-vue-ui-website](https://github.com/lq782655835/node-vue-ui-website)
（node-vue-ui-website是一个基于node+vue+mongoose前后端一体的yi-ui官网）

升级简要：
1. Node版本必须大于6.0
1. 以前的webpack拆分为 webpack 和 webpack-cli两个包
1. webpack.config.js文件添加mode选型。根据这个字段，Webapck约定了不同环境下的默认配置。
1. 升级第三方插件

## 1. Node版本升级
Webapck4要求安装的Node版本大于6.0，笔者安装的Node版本是8.6.0，所以不需要升级Node。升级Node推荐使用 `nvm` 包管理器

## 2.升级webpack
webpack从4.0起，拆分成webpack和webpack-cli两个包，所以需要先卸载掉webpack，再重新安装webpack和webpack-cli。另外笔者开发环境使用了webpack-dev-server，所以也一并升级下。
``` shell
npm uninstall webpack webpack-dev-server -D
npm i webpack webpack-dev-server webpack-cli -D
```

## 3. webapck.config.js修改
webpack配置文件增加mode这个必要选型。
``` js
mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
```

## 4. 升级第三方插件

### 4.1 升级vue-loader
对应webpack4升级的是vue-loader@15，该版本迁移有两个重大改变(不兼容)：
1. 需要配合一个插件VueLoaderPlugin，[详细](https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4)
2. Loader推导规则改变。这影响的是如sass-resource-loader插件配置。

第一步：升级安装包
``` shell
npm uninstall vue-loader -D
npm install vue-loader -D
```
第二部： 配合插件，这步必须有
``` js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

### 4.2 升级css相关loader
css预处理器项目中使用的是scss，故需要升级相关包
``` shell
npm uninstall sass-loader node-sass css-loader -D
npm install sass-loader node-sass css-loader -D
```

### 4.3 配置sass-resource-loader
项目中使用了[sass-resouce-loader](https://github.com/shakacode/sass-resources-loader)，用来全局导入一些scss variable或minx等，但跑起项目来会报找不到scss变量的错误。翻看sass-resource-loader和vue-loader官方文档看，原来是vue-loader@15使用了不同的推导规则，使得webpack一些配置在vue-loader下的选项，需要配置到对应loader规则下，详见[官方说明](https://vue-loader.vuejs.org/zh/migrating.html#Loader%20%E6%8E%A8%E5%AF%BC)。
``` js
{
    test: /\.scss$/,
    use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader',
+        {
+            loader: 'sass-resources-loader',
+            options: {
+                sourceMap: true,
+                resources: [path.resolve(__dirname,  './src/assets/scss/var.scss')]
+            }
+        }
    ]
},
{
    test: /\.vue$/,
    loader: 'vue-loader',
-    options: {
-        loaders: {
-            'scss': [
-                'vue-style-loader',
-                'css-loader',
-                'sass-loader',
-                {
-                    loader: 'sass-resources-loader',
-                    options: {
-                        resources: path.resolve(__dirname, './src/assets/scss/var.scss')
-                    }
-                }
-            ]
-        }
-    }
}
```

## 总结

实践升级webpack下来，没有想象中复杂，前三步是必要条件，主要是最后的第三方插件升级较为麻烦，需要到github上翻看对应插件的文档。不过好在webpack报错较为清晰，能很明确的找出哪些插件需要更新。所以，开始动起手来enjoy你的webpack升级。