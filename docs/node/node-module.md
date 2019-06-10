# Node模块源码分析

模块系统是nodejs的基础，使用频率也很高。在使用nodejs过程中，以下几个关于模块系统的问题是否常常困扰着你：
1. 为什么在模块中有全局的require、module.exports、exports、__dirname、__filename等关键字,它们是从哪来的？
1. 为什么一定要使用module.exports或者exports导出模块信息？
2. module.exports和exports的区别，它们之间的关系是什么？

接下来通过源码分析[lib/module.js](https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js)来解决这些困惑。

> 本文分析的源码版本是目前最新的Node V11.12，同时为方便理解，笔者精简出一些关键的代码，同时有详细注释。

## CommonJS规范

众所周知，nodejs是基于CommonJS规范来实现，CommonJS规范主要有以下几点内容：
1. 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
2. 每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
3. require方法用于加载模块

``` js
// moduleA.js
module.exports = function( value ){
    return value * 2;
}

// moduleB.js
var multiplyBy2 = require('./moduleA');
var result = multiplyBy2(4);
```

看以上定义内容我们知道，CommonJS规范规定了每个模块内部都有module变量表示当前模块，使用exports导出模块内容以及require导入模块，到具体源码上它是如何实现的呢？

## 源码分析

先从引入模块require进行分析。

``` js
// lib/internal/modules/cjs/loader.js

// require方法挂载到Module原型链上
Module.prototype.require = function(id) {
  return Module._load(id, this, /* isMain */ false);
};

Module._load = function(request, parent, isMain) {
  // 解析出完整绝对路径，request路径可能有多种形式
  // 1. 内部模块：require('http')
  // 2. 相对位置-文件：require('./module')
  // 3. 相对位置-文件夹：require('./module/')
  // 4. 绝对位置： require('/temp/module')
  var filename = Module._resolveFilename(request, parent, isMain);

  // 缓存处理，提升性能
  // 同时可以解决a、b模块互相依赖导致循环的问题
  // 因为只加载一次，第二次加载直接从缓存中读取，不用重新加载
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports; // 导出的永远是module.exports的内容
  }

  // 先实例化一个空的module
  var module = new Module(filename, parent);
  Module._cache[filename] = module; // 存入缓存

  // 加载module
  module.load(filename);

  // 问题2答案：导出的是exports内容
  return module.exports;
};

// 每个模块对应就是Module实例
function Module(id, parent) {
  this.id = id; // 模块的识别符，通常是带有绝对路径的模块文件名
  this.exports = {}; // 模块对外输出的值
  this.parent = parent; // 返回一个对象，表示调用该模块的模块
  this.filename = null; // 模块的文件名，带有绝对路径
  this.loaded = false; // 是否已加载模块标记
  this.children = []; // 返回一个数组，表示该模块要用到的其他模块
}

module.exports = Module; // node内部源码使用的也是模块系统
```

1 . 可以看到`require`方法是绑定在Module类的原型链方法，说明只有获取到当前实例module才能调用require。而每个模块都可以拿到自己的当前实例module变量，它是如何把实例module注入到模块中的呢？**答案是使用沙箱环境，以闭包函数的方式传入当前module**，后续源码解读会有详细说明。

2 . node模块系统路径加载多种多样，有内置的、有从相对位置读取、有从绝对位置读取，加载详细规则可以看NodeJS官方文档 [modules_file_modules](https://nodejs.org/api/modules.html#modules_file_modules)。想了解具体实现原理可以看下`Module._resolveFilename`方法源码，该方法主要确定模块加载的绝对路径。了解该源码后，如下官方文档解释很容易理解：
* [File Modules](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_file_modules)
* [Folders as Modules#
](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_folders_as_modules)
* [Loading from node_modules Folders](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_loading_from_node_modules_folders)
* [Loading from the global folders](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_loading_from_the_global_folders)

3 . 可以看到`Module._load`方法通过new Module()来创建一个空的module实例，然后通过原型方法`module.load`真正的去读取模块内容。**注意return导出的是`module.exports`**，这就解释了CommonJS规范中要求的最终导出的内容是module.exports（第二个问题答案）。至于exports是module.exports的简写，即exports = module.exports，下文会解释这关系。

``` js
Module.prototype.load = function(filename) {
  // module实例上可以拿到filename、paths属性
  this.filename = filename;
  this.paths = Module._nodeModulePaths(path.dirname(filename));

  // node引用模块可以默认不写后缀，顺序规则：.js、.json .node
  var extension = findLongestRegisteredExtension(filename);
  // 不同后缀的文件模块，使用不同的策略。
  Module._extensions[extension](this, filename);

  this.loaded = true; // 标记成模块已加载
}

Module._extensions['.js'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  // 获得模块代码纯字符串，然后编译compile字符串代码
  // stripBOM方法作用是剥离 utf8 编码特有的BOM文件头
  module._compile(stripBOM(content), filename);
};

Module._extensions['.json'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  // json后缀加载策略：把字符串JSON.parse解析成对象
  // 将对象赋值给module.exports,因为最终对外导出module.exports
  module.exports = JSON.parse(stripBOM(content));
};
```

再来看看`Module.prototype.load`做了什么。nodejs模块系统中是可以不带后缀的，他会根据`.js,.json,.node`的顺序规则去确定最终使用哪个文件。而不同后缀的文件模块加载策略是不一样的，json策略是把字符串JSON.parse解析成对应代码，通过module.exports导出供外部使用。js策略是使用`module._compile`方法处理，让我们看下_compile的源码。

``` js
Module.prototype._compile = function(content, filename) {
  // 将模块内容使用function包装起来
  const wrapper = Module.wrap(content);
  // 关键：通过内部vm模块方法，把string字符串代码，变成真正的可执行代码
  cosnt compiledWrapper = vm.runInThisContext(wrapper, {...})

  var dirname = path.dirname(filename);
  var require = makeRequireFunction(this); // 对外暴露的require api
  // 问题3答案：exports和module.exports的关系
  // 即exports = module.exports = {}
  var exports = this.exports;
  var thisValue = exports;
  var module = this; // 把当前实例传入

  // 问题1答案：在模块内部，拥有require、module、exports等全局变量
  // 原理是通过compiledWrapper.call执行函数，把这些内容传入到模块内部
  var result = compiledWrapper.call(thisValue, exports, require, module, filename, dirname);
  return result
}

// 最新版node使用Proxy，使得Module.wrap代理wrap对象
Object.defineProperty(Module, 'wrap', {
  get() {
    return wrap;
  },
  set(value) {
    wrap = value;
  }
});

let wrap = function(script) {
  return Module.wrapper[0] + script + Module.wrapper[1];
};
const wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];
```

`Module.prototype._compile`是整个模块加载的核心内容，其本质是将字符串源码拼接成闭包函数（通过VM模块的runInThisContext），注入exports、require、module等全局变量，再执行模块源码，将module的exports值输出。等同于如下代码：
``` js
(function (exports, require, module, __filename, __dirname) {
  // 模块内部定义代码
  const otherModule = require('./other') // 内部可以使用require、module等全局变量
  module.exports = function() {...} // 必须使用module.exports以导出本模块内容
})(this.exports, this.require, this, filename, dirname)
```

了解以上源码后，如下官方文档解释很容易理解：
* [The module wrapper](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_the_module_wrapper)
* [The module scope](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_the_module_scope)
* [exports shortcut](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_exports_shortcut)

## 总结

1. 模块加载，是通过沙箱方式，把字符串拼接成闭包函数的形式，把实例module、exports、require、__filename、__dirname以参数方式注入到环境变量中。
2. 模块导出的内容是必须是module.exports的内容，exports是module.exports简写，指向同一块内存。
3. exports = module.exports，但exports被覆盖时，exports被赋值的是一个新开辟的内存，不再指向module.exports。所以官网建议不要在模块内部直接覆盖exports，即`不要写exports = ...`代码。
4. 可以使用nodejs vm模块，将拼接字符串代码转可执行代码，解决一些非常规需求，如用户自定义执行函数、自定义Mock函数、自定义模块加载器等。

## 参考文章
* [CommonJS规范](http://javascript.ruanyifeng.com/nodejs/module.html)
* [require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)
* [module.exports vs exports in Node.js](https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js)
* [exports 和 module.exports 的区别](https://cnodejs.org/topic/5231a630101e574521e45ef8)
* [node - modules](https://nodejs.org/dist/latest-v10.x/docs/api/modules.html)