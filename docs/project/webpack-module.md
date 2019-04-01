# Webpack 模块打包原理

在使用webpack的过程中，你是否好奇webpack打包的代码为什么可以直接在浏览器中跑？为什么webpack可以支持各种ES6最新语法？为什么在webpack中可以书写import ES6模块，也支持require CommonJS模块？

## 模块规范
关于模块，我们先来认识下目前主流的模块规范（自从有了ES6 Module及Webpack等工具，AMD/CMD规范生存空间已经很小了）：
* CommonJS
* UMD
* ES6 Module

### CommonJS
ES6前，js没有属于自己的模块规范，所以社区制定了 CommonJS规范。而NodeJS所使用的模块系统就是基于CommonJS规范实现的。
``` js
// CommonJS 导出
module.exports = { age: 1, a: 'hello', foo:function(){} }

// CommonJS 导入
const foo = require('./foo.js')
```

### UMD
根据当前运行环境的判断，如果是 Node 环境 就是使用 CommonJS 规范， 如果不是就判断是否为 AMD 环境， 最后导出全局变量。这样代码可以同时运行在Node和浏览器环境中。目前大部分库都是打包成UMD规范，Webpack也支持UMD打包，配置API是[output.libraryTarget](https://webpack.docschina.org/configuration/output/#output-librarytarget)。详细案例可以看笔者封装的npm工具包：[cache-manage-js](https://github.com/lq782655835/cache-manage-js)
``` js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.libName = factory());
}(this, (function () { 'use strict';})));
```

### ES6 Module
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。具体思想和语法可以看笔者的另外一篇文章：[ES6-模块详解]((https://lq782655835.github.io/blogs/es6/es6-4.module.html))

``` js
// es6模块 导出
export default { age: 1, a: 'hello', foo:function(){} }

// es6模块 导入
import foo from './foo'
```

## Webpack模块打包
既然模块规范有这么多，那webpack是如何去解析不同的模块呢？

webpack根据webpack.config.js中的入口文件，在入口文件里识别模块依赖，不管这里的模块依赖是用CommonJS写的，还是ES6 Module规范写的，webpack会自动进行分析，并通过转换、编译代码，打包成最终的文件。`最终文件中的模块实现是基于webpack自己实现的webpack_require（es5代码）`，所以打包后的文件可以跑在浏览器上。

同时以上意味着在webapck环境下，你可以只使用ES6 模块语法书写代码（通常我们都是这么做的），也可以使用CommonJS模块语法，甚至可以两者混合使用。因为从webpack2开始，内置了对ES6、CommonJS、AMD 模块化语句的支持，`webpack会对各种模块进行语法分析，并做转换编译`。

我们举个例子来分析下打包后的源码文件，例子源代码在 [webpack-module-example](https://github.com/lq782655835/webpack-module-example)
``` js
// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
  // JavaScript 执行入口文件
  entry: './src/main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  }
};
```

``` js
// src/add
export default function(a, b) {
    let { name } = { name: 'hello world,'} // 这里特意使用了ES6语法
    return name + a + b
}

// src/main.js
import Add from './add'
console.log(Add, Add(1, 2))
```

打包后精简的bundle.js文件如下:

``` js
// modules是存放所有模块的数组，数组中每个元素存储{ 模块路径: 模块导出代码函数 }
(function(modules) {
// 模块缓存作用，已加载的模块可以不用再重新读取，提升性能
var installedModules = {};

// 关键函数，加载模块代码
// 形式有点像Node的CommonJS模块，但这里是可跑在浏览器上的es5代码
function __webpack_require__(moduleId) {
  // 缓存检查，有则直接从缓存中取得
  if(installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }
  // 先创建一个空模块，塞入缓存中
  var module = installedModules[moduleId] = {
    i: moduleId,
    l: false, // 标记是否已经加载
    exports: {} // 初始模块为空
  };

  // 把要加载的模块内容，挂载到module.exports上
  modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  module.l = true; // 标记为已加载

  // 返回加载的模块，调用方直接调用即可
  return module.exports;
}

// __webpack_require__对象下的r函数
// 在module.exports上定义__esModule为true，表明是一个模块对象
__webpack_require__.r = function(exports) {
  Object.defineProperty(exports, '__esModule', { value: true });
};

// 启动入口模块main.js
return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
({
  // add模块
  "./src/add.js": (function(module, __webpack_exports__, __webpack_require__) {
    // 在module.exports上定义__esModule为true
    __webpack_require__.r(__webpack_exports__);
    // 直接把add模块内容，赋给module.exports.default对象上
    __webpack_exports__["default"] = (function(a, b) {
      let { name } = { name: 'hello world,'}
      return name + a + b
    });
  }),

  // 入口模块
  "./src/main.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__)
    // 拿到add模块的定义
    // _add__WEBPACK_IMPORTED_MODULE_0__ = module.exports，有点类似require
    var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/add.js");
    // add模块内容: _add__WEBPACK_IMPORTED_MODULE_0__["default"]
    console.log(_add__WEBPACK_IMPORTED_MODULE_0__["default"], Object(_add__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 2))
  })
});
```
以上核心代码中，能让打包后的代码直接跑在浏览器中，是因为webpack通过__webpack_require__ 函数模拟了模块的加载（类似于node中的require语法），把定义的模块内容挂载到module.exports上。同时__webpack_require__函数中也对模块缓存做了优化，防止模块二次重新加载，优化性能。

再让我们看下webpack的源码：
``` js
// webpack/lib/MainTemplate.js

// 主文件模板
// webpack生成的最终文件叫chunk，chunk包含若干的逻辑模块，即为module
this.hooks.render.tap( "MainTemplate",
(bootstrapSource, chunk, hash, moduleTemplate, dependencyTemplates) => {
  const source = new ConcatSource();
  source.add("/******/ (function(modules) { // webpackBootstrap\n");
  // 入口内容，__webpack_require__就在bootstrapSource中
  source.add(new PrefixSource("/******/", bootstrapSource));
  source.add("/******/ })\n");
  source.add(
    "/************************************************************************/\n"
  );
  source.add("/******/ (");
  source.add(
    // 依赖的module都会写入对应数组
    this.hooks.modules.call(
      new RawSource(""),
      chunk,
      hash,
      moduleTemplate,
      dependencyTemplates
    )
  );
  source.add(")");
  return source;
}
```

## Webpack ES6语法支持
可能细心的读者看到，以上打包后的add模块代码中依然还是ES6语法，在低端的浏览器中不支持。这是因为没有对应的loader去解析js代码，webpack把所有的资源都视作模块，不同的资源使用不同的loader进行转换。

这里需要使用babel-loader及其插件@babel/preset-env进行处理，把ES6代码转换成可在浏览器中跑的es5代码。

``` js
// webpack.config.js
module.exports = {
  ...,
  module: {
    rules: [
      {
        // 对以js后缀的文件资源，用babel进行处理
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

``` js
// 经过babel处理es6语法后的代码
__webpack_exports__["default"] = (function (a, b) {
  var _name = {    name: 'hello world,'  }, name = _name.name;
  return name + a + b;
});
```

## Webpack 模块异步加载
以上webpack把所有模块打包到主文件中，所以模块加载方式都是同步方式。但在开发应用过程中，按需加载（也叫懒加载）也是经常使用的优化技巧之一。按需加载，通俗讲就是代码执行到异步模块（模块内容在另外一个js文件中），通过网络请求即时加载对应的异步模块代码，再继续接下去的流程。那webpack是如何执行代码时，判断哪些代码是异步模块呢？webpack又是如何加载异步模块呢？

webpack有个[require.ensure](https://webpack.js.org/api/module-methods/#requireensure) api语法来标记为异步加载模块，最新的webpack4推荐使用新的[import()](https://webpack.js.org/api/module-methods/#import-1) api(需要配合@babel/plugin-syntax-dynamic-import插件)。因为require.ensure是通过回调函数执行接下来的流程，而import()返回promise，这意味着可以使用最新的ES8 async/await语法，使得可以像书写同步代码一样，执行异步流程。

现在我们从webpack打包后的源码来看下，webpack是如何实现异步模块加载的。修改入口文件main.js，引入异步模块async.js：
``` js
// main.js
import Add from './add'
console.log(Add, Add(1, 2), 123)

// 按需加载
// 方式1: require.ensure
// require.ensure([], function(require){
//     var asyncModule = require('./async')
//     console.log(asyncModule.default, 234)
// })

// 方式2: webpack4新的import语法
// 需要加@babel/plugin-syntax-dynamic-import插件
let asyncModuleWarp = async () => await import('./async')
console.log(asyncModuleWarp().default, 234)
```

``` js
// async.js
export default function() {
    return 'hello, aysnc module'
}
```

以上代码打包会生成两个chunk文件，分别是主文件`main.bundle.js`以及异步模块文件`0.bundle.js`。同样，为方便读者快速理解，精简保留主流程代码。

``` js
// 0.bundle.js

// 异步模块
// window["webpackJsonp"]是连接多个chunk文件的桥梁
// window["webpackJsonp"].push = 主chunk文件.webpackJsonpCallback
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [0], // 异步模块标识chunkId,可判断异步代码是否加载成功
  // 跟同步模块一样，存放了{模块路径：模块内容}
  {
  "./src/async.js": (function(module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      __webpack_exports__["default"] = (function () {
        return 'hello, aysnc module';
      });
    })
  }
]);
```

以上知道，异步模块打包后的文件中**保存着异步模块源代码**，同时为了区分不同的异步模块，**还保存着该异步模块对应的标识：chunkId**。以上代码主动调用window["webpackJsonp"].push函数，该函数是连接异步模块与主模块的关键函数，该函数定义在主文件中，实际上`window["webpackJsonp"].push = webpackJsonpCallback`，详细源码咱们看看主文件打包后的代码：

``` js
// main.bundle.js

(function(modules) {
// 获取到异步chunk代码后的回调函数
// 连接两个模块文件的关键函数
function webpackJsonpCallback(data) {
  var chunkIds = data[0]; //data[0]存放了异步模块对应的chunkId
  var moreModules = data[1]; // data[1]存放了异步模块代码

  // 标记异步模块已加载成功
  var moduleId, chunkId, i = 0, resolves = [];
  for(;i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    if(installedChunks[chunkId]) {
      resolves.push(installedChunks[chunkId][0]);
    }
    installedChunks[chunkId] = 0;
  }

  // 把异步模块代码都存放到modules中
  // 此时万事俱备，异步代码都已经同步加载到主模块中
  for(moduleId in moreModules) {
    modules[moduleId] = moreModules[moduleId];
  }

  // 重点：执行resolve() = installedChunks[chunkId][0]()返回promise
  while(resolves.length) {
    resolves.shift()();
  }
};

// 记录哪些chunk已加载完成
var installedChunks = {
  "main": 0
};

// __webpack_require__依然是同步读取模块代码作用
function __webpack_require__(moduleId) {
  ...
}

// 加载异步模块
__webpack_require__.e = function requireEnsure(chunkId) {
  // 创建promise
  // 把resolve保存到installedChunks[chunkId]中，等待代码加载好再执行resolve()以返回promise
  var promise = new Promise(function(resolve, reject) {
    installedChunks[chunkId] = [resolve, reject];
  });

  // 通过往head头部插入script标签异步加载到chunk代码
  var script = document.createElement('script');
  script.charset = 'utf-8';
  script.timeout = 120;
  script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
  var onScriptComplete = function (event) {
    var chunk = installedChunks[chunkId];
  };
  script.onerror = script.onload = onScriptComplete;
  document.head.appendChild(script);

  return promise;
};

var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
// 关键代码： window["webpackJsonp"].push = webpackJsonpCallback
jsonpArray.push = webpackJsonpCallback;

// 入口执行
return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
({
"./src/add.js": (function(module, __webpack_exports__, __webpack_require__) {...}),

"./src/main.js": (function(module, exports, __webpack_require__) {
  // 同步方式
  var Add = __webpack_require__("./src/add.js").default;
  console.log(Add, Add(1, 2), 123);

  // 异步方式
  var asyncModuleWarp =function () {
    var _ref = _asyncToGenerator( regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        // 执行到异步代码时，会去执行__webpack_require__.e方法
        // __webpack_require__.e其返回promise，表示异步代码都已经加载到主模块了
        // 接下来像同步一样，直接加载模块
        return __webpack_require__.e(0)
              .then(__webpack_require__.bind(null, "./src/async.js"))
      }, _callee);
    }));

    return function asyncModuleWarp() {
      return _ref.apply(this, arguments);
    };
  }();
  console.log(asyncModuleWarp().default, 234)
})
});
```

从上面源码可以知道，**webpack实现模块的异步加载有点像jsonp的流程**。在主js文件中通过在head中构建script标签方式，异步加载模块信息；再使用回调函数webpackJsonpCallback，把异步的模块源码同步到主文件中，所以后续操作异步模块可以像同步模块一样。
源码具体实现流程：
1. 遇到异步模块时，使用`__webpack_require__.e`函数去把异步代码加载进来。该函数会在html的head中动态增加script标签，src指向指定的异步模块存放的文件。
2. 加载的异步模块文件会执行`webpackJsonpCallback`函数，把异步模块加载到主文件中。
3. 所以后续可以像同步模块一样,直接使用`__webpack_require__("./src/async.js")`加载异步模块。
> 注意源码中的primose使用非常精妙，主模块加载完成异步模块才resolve()

## 总结
1. webpack对于ES模块/CommonJS模块的实现，是基于自己实现的webpack_require，所以代码能跑在浏览器中。
2. 从 webpack2 开始，已经内置了对 ES6、CommonJS、AMD 模块化语句的支持。但不包括新的ES6语法转为ES5代码，这部分工作还是留给了babel及其插件。
3. 在webpack中可以同时使用ES6模块和CommonJS模块。因为 module.exports很像export default，所以ES6模块可以很方便兼容 CommonJS：import XXX from 'commonjs-module'。反过来CommonJS兼容ES6模块，需要额外加上default：require('es-module').default。
4. webpack异步加载模块实现流程跟jsonp基本一致。

## 参考文章

* [前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.im/post/5aaa37c8f265da23945f365c)
* [深入 CommonJs 与 ES6 Module](https://segmentfault.com/a/1190000017878394)
* [Webpack将代码打包成什么样子](https://github.com/Pines-Cheng/blog/issues/45)
* [Webpack源码分析](https://zhuanlan.zhihu.com/p/29551683)
* [Webpack Code Splitting](https://webpack.js.org/guides/code-splitting)