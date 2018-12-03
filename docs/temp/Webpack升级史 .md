# Webpack升级史

经历过自定义配置过webpack的人都知道，webpack的各种配置是一个难点。好在现在工程都在推崇零配置打包工具，Parcel快速涨星就能知道大家对零配置的迫切。好在webpack开发团队顺应潮流，最新的webpack4很大改变就是其配置变得简单的多。

网上有很多webpack配置教程结构相差很大，容易让人感到迷惑和不解。官方的[webpack changelog](https://github.com/webpack/webpack/releases)内容较多，不适合逐条查看。但从中也可以找到比较重要的[wepack3到webpack4大版本升级日志](https://github.com/webpack/webpack/issues/6064)。现在跟随笔者，看下webpack1到webpack4进行了哪些重要配置改变。

## [Rules vs Loaders in Webpack - What's the Difference?](https://stackoverflow.com/questions/43002099/rules-vs-loaders-in-webpack-whats-the-difference)

question: Loaders is used in Webpack 1, and Rules in Webpack 2. They say that "Loaders" in the future it will be deprecated in favour of module.rules.

Sample for `loaders` to `rules`:
``` js
// Wepack 1.x
module.exports = {
    module: {
        loaders: [
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    }
}
```

``` js
// Wepack 4.x in webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('precss')({...options}),
                                require('autoprefixer')({...options})
                            ]
                        }
                    }
                ]
            }
        ]
    }
}
```

## 参考文章

* [Rules vs Loaders in Webpack - What's the Difference?](https://stackoverflow.com/questions/43002099/rules-vs-loaders-in-webpack-whats-the-difference)

* [To v2 or v3 from v1](https://webpack.js.org/migrate/3/#module-loaders-is-now-module-rules)

* [To v4 from v3](https://webpack.js.org/migrate/4/#node-js-v4)