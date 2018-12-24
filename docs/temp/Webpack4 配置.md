
```
module.exports = {
    mode: 'development',     // 模式配置,4.0新增
    entry: '',               // 入口文件
    output: {},              // 出口文件
    plugins: [],             // 对应的插件
    devServer: {}            // 开发服务器配置
}
```

## Loader

### css

* style-loader
* css-loader
* postcss-loader

## Webpack插件

* HtmlWebpackPlugin
* ExtractTextWebpackPlugin 拆分css样式的插件(webapck4已废弃)。由于webpack4以后对css模块支持的逐步完善和commonchunk插件的移除，在处理css文件提取的计算方式上也做了些调整，之前我们首选使用的extract-text-webpack-plugin也完成了其历史使命，将让位于[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)。

## 升级
* 安装webpack
``` shell
npm install --save-dev webpack webpack-cli
```
* 0配置
默认的入口为'./src/'和默认出口'./dist'； 
对压缩(optimization.minimize)的设置，默认在production时开启，在development时关闭。
* 移除loaders，必须使用rules
* 使用mode/–mode
    * production
        * 开启所有的优化代码
        * 更小的bundle大小
        * 去除掉只在开发阶段运行的代码
        * Scope hoisting和Tree-shaking
* 使用CommonsChunkPlugin替换为optimization.splitChunks。其他还有：
    * NoEmitOnErrorsPlugin 废弃，使用optimization.noEmitOnErrors替代，在生产环境中默认开启该插件。
    * ModuleConcatenationPlugin 废弃，使用optimization.concatenateModules替代，在生产环境默认开启该插件。
    * NamedModulesPlugin 废弃，使用optimization.namedModules替代，在生产环境默认开启。
    * DefinePlugin 废弃，使用optimization.nodeEnv替代，在生产环境默认开启该插件。
    * uglifyjs-webpack-plugin升级到了v1.0版本, 默认开启缓存和并行功能。
* 支持ES6的方式导入JSON文件，并且可以过滤无用的代码
``` js
let jsonData = require('./data.json');

import jsonData from './data.json'

import { first } from './data.json'
```