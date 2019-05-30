# Webpack4 配置详解

Webpack4后包拆成webpack和webpack-cli两个包：

``` shell
// 安装webpack
npm install --save-dev webpack webpack-cli
```

主要有以下这些一级配置：

``` js
module.exports = {
    mode: 'development', // 模式配置,webpack4.0新增
    entry: '', // 入口文件
    output: {}, // 出口文件
    module: {
        rules: [/*loader setting*/]
    }, // 配置modules，包括loader
    plugins: [], // 对应的插件
    devServer: {}, // 开发服务器配置
    optimization: {}, // 最佳实践
    devtool: '',
    resolve: { alias: {}},
}
```

## 1. mode

Webpack 4 引入了 mode 这个选项。这个选项的值可以是 development 或者 production。
设置了 mode 之后会把 process.env.NODE\_ENV 也设置为 development 或者 production。然后在 production 模式下，会默认开启 UglifyJsPlugin 等一堆插件。

> webpack4支持ES6的方式导入JSON文件，并且支持Tree-shaking

## 2. entry/output

默认的入口为'./src/'和默认出口'./dist'。

## 3. mudule - rules - loader配置

webpack4中移除loaders配置，必须使用rules。rules 配置模块的读取和解析规则， 通常用来配置loader， 其类型是一个数组， 数组里每一项都描述了如何去处理部分文件。

配置一项rules大致通过以下方式：
1. 条件匹配： 通过test、include、exclude三个配置来命中Loader要应用的规则文件。(三个配置都可以是正则，也支持数组)
2. 应用规则： 对选中后的文件通过use配置项来应用loader，可以应用一个loader或者按照从后往前的顺序应用一组loader。同时还可以分别给loader传入参数。
3. 重置顺序： 一组loader的执行顺序默认是从右到左执行，通过exforce选项可以让其中一个loader的执行顺序放到最前或者是最后。

``` js
module: {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            exclude: path.resolve(__dirname, 'node_modules')
        }
    ]
}
```

常用loader：（待补充）
* css
    * style-loader
    * css-loader
    * postcss-loader
    * sass-loader

## 4. optimization

在Webpack4中引入，根据mode（production/development）的不同，配置项默认值不同，具体有以下：
1. `optimization.minimize`： 是否自动压缩打包后的代码。mode = production时，为true。压缩默认使用uglifyjs-webpack-plugin插件，如果想要使用别的压缩插件，可以使用`optimization.minimizer`设置。

1. `optimization.splitChunks`: 根据不同的策略来分割打包出来的bundle。配置基于[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/),剔除了老的CommonsChunkPlugin（webpack4移除）。
    * optimization.splitChunks.chunks: async/all/initial
1. 零配置
    * `optimization.nodeEnv`: 告诉webpack process.env.NODE_ENV的值，值来自于mode的取值。代替[webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/)（webpack4移除）
    * `optimization.namedModules`: 代替webpack.NamedModulesPlugin（webpack4移除）
    * `optimization.noEmitOnErrors`: 代替webpack.NoEmitOnErrorsPlugin（webpack4移除）
    * `optimization.concatenateModules`: 代替webpack.optimize.ModuleConcatenationPlugin（webpack4移除）

## plugins

* 常用插件
    1. `HtmlWebpackPlugin` 自动在html中加载打包后的js文件
    1. `DLLPlugin/DllReferencePlugin` 提高打包速度
        * DLLPlugin：创建一个只有dll的bundle
        * DllReferencePlugin： 打包生成的dll文件引用到需要的预编译依赖上来
    1. happyPack 多进程打包，加快打包速度。
    1. `webpack.DefinePlugin` webpack4设置mode会自动使用
    1. `uglifyjs-webpack-plugin` webpack4 mode = production默认使用
* 废弃插件
    1. CommonsChunkPlugin 拆分依赖包，生成单独文件，使得文件大小减小。在webpack4被废弃，替代optimization.splitChunks
    2. ExtractTextWebpackPlugin 拆分css样式的插件(webapck4已废弃)。由于webpack4以后对css模块支持的逐步完善和commonchunk插件的移除，在处理css文件提取的计算方式上也做了些调整，之前我们首选使用的extract-text-webpack-plugin也完成了其历史使命，将让位于[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)。

## devServer

详见[Webpack4 devServer配置详解](./webapck4-2.devServer.md)

举个完整例子：

``` js
const path = require('path');
const webpack = require('webpack');
// 插件都是一个类，所以我们命名的时候尽量用大写开头
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取出来css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩打包后的js 
const HappyPack = require('happypack'); // 多线程构建
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });  // 构造出共享进程池，进程池中包含5个子进程
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')// 最大化压缩css

console.log('process.env.NODE_ENV------->',  process.env.NODE_ENV)
// 解决css 分离后图片引入路径不正确问题
if (process.env.type == 'build') { // 判断package.json里面是build还是dev命令
    // 开发
    var website ={
        publicPath:"/"
    }
} else {
    // 生产
    var website ={
        publicPath:"/"
    }
}


module.exports = {
    // devtool:'eval-source-map',
    mode: 'development', // 模式配置
    entry: {
        main: './src/index.js',
    },             
    output: {
        filename: 'bundle.[chunkhash:6].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: website.publicPath, // 解决css 分离后图片引入路径不正确问题
    },             
    module: {
        rules: [
            {
                test: /\.css/,
                exclude: /node_modules/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name]_[hash:7].[ext]', 
                            outputPath:'static/images/'
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            // babel 解析es7 es6 jsx
            {
                test:/\.(jsx|js)$/,
                include: [ 
                    path.resolve(__dirname, 'src'),
                ],
                use:['babel-loader'],
                /*
                    如果开启多线程进行构建
                    use:['happypack/loader?id=js'], 
                    loader这样写 匹配下面注释的插件
                */
                exclude:/node_modules/
            },
        ]
    },              
    plugins: [
        // 打包html
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true,
            minify: {
                minifyCSS: true,
                minifyJS: true, 
                removeAttributeQuotes: true
            },
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        }),
        new UglifyJsPlugin({
            parallel: true, 
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('DEV')
        }),
        // 多线程构建 匹配上面的loader
        // new HappyPack({
        //     id: 'js',
        //     //threads: 4,
        //     loaders: ['babel-loader'],
        //     threadPool: happyThreadPool, // 使用共享进程池中的子进程去处理任务
        // }),
    ],   
    // 提取公共代码
    optimization: {
        minimizer: [
           // 自定义js优化配置，将会覆盖默认配置 最大化压缩成js
            new UglifyJsPlugin({
                exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                cache: true,
                parallel: true, // 开启并行压缩，充分利用cpu
                sourceMap: false,
                extractComments: false, // 移除注释
                uglifyOptions: {
                  compress: {
                    unused: true,
                    warnings: false,
                    drop_debugger: true
                  },
                  output: {
                    comments: false
                  }
                }
            }),
            // 用于优化css文件 最大化压缩成css 并且去掉注释掉的css
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                  safe: true,
                  autoprefixer: { disable: true },
                  mergeLonghand: false,
                  discardComments: {
                    removeAll: true // 移除注释
                  }
                },
                canPrint: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10    
                },
                // utils: { // 抽离自己写的公共代码，utils这个名字可以随意起 (css/js公用的都会单独抽离出来生成一个单独的文件)
                //     chunks: 'initial',
                //     name: 'utils',  // 任意命名
                //     minSize: 0    // 只要超出0字节就生成一个新包
                // }
            }
        }
    },        
    devServer: {
        historyApiFallback: true,
        inline: true
    },   
    // externals: {
    //     jquery: "jQuery",
    // },
    resolve: {
        // alias 别名配置，它能够将导入语句里的关键字替换成你需要的路径
        alias: {
            // 比如我们就可以直接写 import Nav from '@/Nav'
            '@': './app/component'
        },
        // 省略后缀
        extensions: ['.js', '.jsx', '.less', '.json', '.css'],
    },     
    performance: {
        hints: false // 选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
    }
}
```

## 参考文章

* [webpack optimization](https://webpack.js.org/configuration/optimization/)

* [Upgrade to Webpack 4](https://dev.to/flexdinesh/upgrade-to-webpack-4---5bc5)

* [webpack编译速度提升之DllPlugin](https://juejin.im/post/5b3e22e3f265da0f4b7a72df)

* [webpack4.0打包优化策略系列](https://juejin.im/post/5abbc2ca5188257ddb0fae9b)