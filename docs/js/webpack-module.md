# webpack 模块打包原理

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
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。具体思想和语法可以看笔者的另外一篇文章：[ES6-模块详解](../js/es6-4.module.md)

``` js
// es6模块 导出
export default { age: 1, a: 'hello', foo:function(){} }

// es6模块 导入
import foo from './foo'
```

## webpack模块打包
既然模块规范有这么多，那webpack是如何去解析不同的模块呢？

webpack根据webpack.config.js中的入口文件，在入口文件里识别模块依赖，不管这里的模块依赖是用CommonJS写的，还是ES6 Module规范写的，webpack会自动进行分析，并通过转换、编译代码，打包成最终的文件。`最终文件中的模块实现是基于webpack自己实现的webpack_require（es5代码）`，所以打包后的文件可以跑在浏览器上。

同时以上意味着在webapck环境下，你可以只使用ES6 模块语法书写代码（通常我们都是这么做的），也可以使用CommonJS模块语法，甚至可以两者混合使用。因为从webpack2开始，内置了对ES6、CommonJS、AMD 模块化语句的支持，`webpack会对各种模块进行语法分析，并做转换编译`。

我们举个例子来分析下打包后的源码文件：
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

打包后的bundle.js文件如下:
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
	
	// __webpack_require__对象下的r函数：在module.exports上定义__esModule为true，表明是一个模块对象
	__webpack_require__.r = function(exports) {
		Object.defineProperty(exports, '__esModule', { value: true });
  };
  
	// 启动入口模块main.js
	return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
({
  // add模块
  "./src/add.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__); // 在module.exports上定义__esModule为true
    // 直接把add模块内容，赋给module.exports.default对象上
    __webpack_exports__["default"] = (function(a, b) {
      let { name } = { name: 'hello world,'}
      return name + a + b
    });
  }),

  // 入口模块
  "./src/main.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__)
    // 拿到add模块的定义：_add__WEBPACK_IMPORTED_MODULE_0__ = module.exports，有点类似require
    var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/add.js");
    // add模块内容：_add__WEBPACK_IMPORTED_MODULE_0__["default"]
    console.log(_add__WEBPACK_IMPORTED_MODULE_0__["default"], Object(_add__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 2))
  })
});
```
以上核心代码中，能让打包后的代码直接跑在浏览器中，是因为webpack通过__webpack_require__ 函数模拟了模块的加载（类似于node中的require语法），把定义的模块内容挂载到module.exports上。同时__webpack_require__函数中也对模块缓存做了优化，防止模块二次重新加载，优化性能。

## webpack ES6语法支持
可能细心的读者看到，以上打包后的add模块代码中依然还是ES6语法，在低端的浏览器中不支持。这是因为没有对应的loader去解析js代码，webpack把所有的资源都视作模块，不同的资源使用不同的loader进行转换。

这里需要使用babel-loader及其插件进行处理，把ES6代码转换成可在浏览器中跑的es5代码。

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


## 总结
1. webpack对于es模块/commonjs模块的实现，是基于自己实现的webpack_require 和webpack_exports，所以代码能跑在浏览器中。
2. 从 Webpack2 开始，已经内置了对 ES6、CommonJS、AMD 模块化语句的支持。但不包括新的ES6语法转为ES5代码，这部分工作还是留给了babel及其插件（需要安装babel-loader和@babel/preset-env）。
3. 在webpack中可以同时使用ES6模块和commonjs模块。因为 module.exports 很像 export default 所以 ES6模块 可以很方便兼容 CommonJs。反过来CommonJS兼容ES6模块，需要额外default(require('es-module').default)

## 参考文章

* [前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.im/post/5aaa37c8f265da23945f365c)
* [深入 CommonJs 与 ES6 Module](https://segmentfault.com/a/1190000017878394)
* [Webpack将代码打包成什么样子](https://github.com/Pines-Cheng/blog/issues/45)