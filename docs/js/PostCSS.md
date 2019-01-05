# PostCSS

## 概念

PostCSS 本身是一个功能比较单一的工具。它提供了一种方式用 JavaScript 代码来处理 CSS。它负责把 CSS 代码解析成抽象语法树结构（Abstract Syntax Tree，AST），再交由插件来进行处理。PostCSS 的强大之处在于其不断发展的插件体系。

开发者一个常见的误解是，PostCSS是另一个像SASS和LESS的预处理器。相信很多人使用PostCSS插件，会把注意力放到模仿其它预处理特性上，如变量，条件语句，循环和混入。随着PostCSS的发展，许多其他功能的插件被开发出来，有许多完全和传统的预处理器不同的新特性被引入。

**你可以把PostCSS，当成像SASS和LESS这样的预处理器使用，你也可以用一些像SASS,LESS的扩展，来升级你的工具集。**

## 常用插件

* [autoprefixer](https://github.com/postcss/autoprefixer) 给css加前缀
* [precss](https://github.com/jonathantneal/precss) 提供类似sass语法，告别sass包
* [cssnext](https://github.com/MoOx/postcss-cssnext) 将未来CSS特性编译为现今支持的特性
* [px2rem-postcss](https://github.com/songsiqi/px2rem-postcss) 将px转为rem工具。`移动端强烈推荐`

## Webpack配置PostCSS插件

如下例子，webpack配置了precss和autoprefixer插件：

``` js
// Wepack 4.x in webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test:   /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    }
}

// postcss.config.js
module.exports = {
  plugins: [
      "precss": {},
      "autoprefixer": {}
  ]
}

// 或者
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

## 与Sass配合

如果你对PostCSS的各种特性很感兴趣，但又不想放弃熟练使用的Sass。不用担心，你可以完全把Sass与PostCSS结合使用.

1. 安装LibSass：npm install node-sass --save-dev
2. 在配置文件中先对.scss文件进行处理后再用PostCSS进行处理