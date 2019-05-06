# Webpack Loader

## 使用

### webpack配置

``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```

### 内联

``` js
// 使用 ! 将资源中的 loader 分开
// 使用 ? 传递查询参数
import Styles from 'style-loader!css-loader?modules&type=style!./styles.css';
import CSS from 'css-loader!./styles.css';
```

## 创建新Loader

`loader 只是一个导出为函数的 JavaScript 模块。`loader runner 会调用这个函数，然后把上一个 loader 产生的结果或者资源文件(resource file)传入进去。

第一个 loader 的传入参数只有一个：资源文件(resource file)的内容。compiler 需要得到最后一个 loader 产生的处理结果。`这个处理结果应该是 String 或者 Buffer（被转换为一个 string），代表了模块的 JavaScript 源码。`

``` js
// 同步loader
module.exports = function(content) { // 1. content是目标文件字符
    // 2. this代表loader上下文，能拿到webpack很多信息
    // 具体可看官方API：https://webpack.docschina.org/api/loaders/
    const {
        target,
        request,
        minimize,
        sourceMap,
        rootContext,
        resourcePath,
        resourceQuery
    } = this
    return content;
};
```

## 参考文章

* [编写一个 loader](https://webpack.docschina.org/contribute/writing-a-loader)

* [loader API](https://webpack.docschina.org/api/loaders/)