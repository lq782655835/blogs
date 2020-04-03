# 你必须知道的Webpack

核心思想：
* 一切皆模块：
正如js文件可以是一个“模块（module）”一样，其他的（如css、image或html）文件也可视作模 块。因此，你可以require(‘myJSfile.js’)亦可以require(‘myCSSfile.css’)。这意味着我们可以将事物（业务）分割成更小的易于管理的片段，从而达到重复利用等的目的。
* 按需加载：
传统的模块打包工具（module bundlers）最终将所有的模块编译生成一个庞大的bundle.js文件。但是在真实的app里边，“bundle.js”文件可能有10M到15M之大可能会导致应用一直处于加载中状态。因此Webpack使用许多特性来分割代码然后生成多个“bundle”文件，而且异步加载部分代码以实现按需加载。


## 调用过程

如果说Compiler是流程，那么Compilation就是编译主场了。也就是源代码经过他加工之后才得到了升华变成了规规矩矩的模样。

Compilation的工作总结起来就是，添加入口entry，通过entry分析模块，分析模块之间的依赖关系，就像图表一样。构建完成之后就开始seal，封装了这个阶段Compilation干了一系列的优化措施以及将解析后的模块转化为标准的webpack模块，输出备用，前提是你将优化plugin挂到了各个优化的hooks上面，触发了优化的钩子，但是钩子上也要注册了函数才能生效。

1. 根据options，初始化Compiler，加载所有插件
1. 开始Complier Run
    * webpack的实际入口是Compiler类的run方法， 在run方法里调用compile方法开始编译。在编译的时候会使用一个核心对象：Compilation.
1. 确定入口，收集依赖（递归）并进行 module 的resolve以及应用loader，生成ast
1. 根据ast生成代码，并合并一些公共chunk，输出到文件。


## Webpack Plugin

webpack整体是一个插件架构，所有的功能都以插件的方式集成在构建流程中，通过发布订阅事件来触发各个插件执行。webpack核心使用Tapable 来实现插件(plugins)的binding和applying.

`webpack 插件是一个函数或者是具有 apply 方法的 JavaScript 对象。`webpack插件处理 webpack 在编译过程中的某个特定的 任务。满足一个插件需要如下特性：
* 是一个独立的模块。
* 模块对外暴露一个 js 函数。
* 函数的原型 (prototype) 上定义了一个注入 compiler 对象* 的 apply 方法。
* apply 函数中需要有通过 compiler 对象挂载的 webpack 事件钩子，钩子的回调中能拿到当前编译的 compilation 对象，如果是异步编译插件的话可以拿到回调 callback。
* 完成自定义子编译流程并处理 complition 对象的内部数据。
* 如果异步编译插件的话，数据处理完成后执行 callback 回调。

几个关键节段对应的事件分别是：

* entry-option 初始化option

* run 开始编译

* make 从entry开始递归的分析依赖，对每个依赖模块进行build

* before-resolve - after-resolve 对其中一个模块位置进行解析

* build-module 开始构建 (build) 这个module,这里将使用文件对应的loader加载

* normal-module-loader 对用loader加载完成的module(是一段js代码)进行编译,用 acorn 编译,生成ast抽象语法树。

* program 开始对ast进行遍历，当遇到require等一些调用表达式时，触发call require事件的handler执行，收集依赖，并。如：AMDRequireDependenciesBlockParserPlugin等

* seal 所有依赖build完成，下面将开始对chunk进行优化，比如合并,抽取公共模块,加hash

* bootstrap 生成启动代码

* emit 把各个chunk输出到结果文件

``` js
const webpack = require('webpack');

const HelloWorldPlugin = require('./hello-world-plugin');

webpack({
    // ...
    plugins: [
        new HelloWorldPlugin({/* some plugin options */})
    ]
    // ...
});
```

``` js
const pluginName = 'HelloWorldPlugin';

class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('webpack 构建过程开始！');
    });
  }
}
```

## compiler & compilation 对象

compilation 对象是整个 webpack 最核心的两个对象，是扩展 webpack 功能的关键。

## compiler 对象

compiler 对象是 webpack 的编译器对象，前文已经提到，webpack 的核心就是编译器，compiler 对象会在启动 webpack 的时候被一次性的初始化，compiler 对象中包含了所有 webpack 可自定义操作的配置，例如 loader 的配置，plugin 的配置，entry 的配置等各种原始 webpack 配置等，在 webpack 插件中的自定义子编译流程中，我们肯定会用到 compiler 对象中的相关配置信息，我们相当于可以通过 compiler 对象拿到 webpack 的主环境所有的信息。

## compilation 对象

这里首先需要了解一下什么是编译资源，编译资源是 webpack 通过配置生成的一份静态资源管理 Map（一切都在内存中保存），以 key-value 的形式描述一个 webpack 打包后的文件，编译资源就是这一个个 key-value 组成的 Map。而编译资源就是需要由 compilation 对象生成的。

compilation 实例继承于 compiler，compilation 对象代表了一次单一的版本 webpack 构建和生成编译资源的过程。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源以及新的 compilation 对象。一个 compilation 对象包含了 当前的模块资源、编译生成资源、变化的文件、以及 被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

由此可见，如果开发者需要通过一个插件的方式完成一个自定义的编译工作的话，如果涉及到需要改变编译后的资源产物，必定离不开这个 compilation 对象。

如果需要了解 compiler 和 compilation 对象的详情，可以通过在插件中 console.log(compilation) 的方式进行查看对象所包含的内容，然而如果还想了解的更加透彻的话，看源码是一个非常好的途径，将会使你对 webpack 的认识更加深刻。

## Tapable

* tap方法注册同步钩子类型SyncHook。通过this.hooks.[Name].call调用钩子函数
``` js
compiler.hooks.compile.tap('MyPlugin', params => {
  console.log('以同步方式触及 compile 钩子。')
})js
```

* tapAsync/tapPromise - AsyncSeriesHook - this.hooks.[Name].callAsync
``` js
compiler.hooks.run.tapAsync('MyPlugin', (compiler, callback) => {
  console.log('以异步方式触及 run 钩子。')
  callback()
})
```

## Webpack Loader

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

[compiler-hooks](https://www.webpackjs.com/api/compiler-hooks/#hooks)

[compilation-hooks](https://www.webpackjs.com/api/compilation-hooks/)

[编写一个 loader](https://webpack.docschina.org/contribute/writing-a-loader)

[loader API](https://webpack.docschina.org/api/loaders/)
