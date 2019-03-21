# Webpack插件

Webpack插件
处理 webpack 在编译过程中的某个特定的任务。满足一个插件需要如下特性：
* 是一个独立的模块。
* 模块对外暴露一个 js 函数。
* 函数的原型 (prototype) 上定义了一个注入 compiler 对象* 的 apply 方法。
* apply 函数中需要有通过 compiler 对象挂载的 webpack 事件钩子，钩子的回调中能拿到当前编译的 compilation 对象，如果是异步编译插件的话可以拿到回调 callback。
* 完成自定义子编译流程并处理 complition 对象的内部数据。
* 如果异步编译插件的话，数据处理完成后执行 callback 回调。

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
tapAsync/tapPromise - AsyncSeriesHook - this.hooks.[Name].callAsync
``` js
compiler.hooks.run.tapAsync('MyPlugin', (compiler, callback) => {
  console.log('以异步方式触及 run 钩子。')
  callback()
})
```

## 参考文章
[compiler-hooks](https://www.webpackjs.com/api/compiler-hooks/#hooks)

[compilation-hooks](https://www.webpackjs.com/api/compilation-hooks/)
