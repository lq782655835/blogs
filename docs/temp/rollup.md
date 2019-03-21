# rollup

Rollup 提供了多种打包方式，通过 format 属性可以设置你想要打包成的代码类型：

* `amd` - 输出成AMD模块规则，RequireJS可以用
* `cjs` - CommonJS规则，适合Node，Browserify，Webpack 等
* `es` - 默认值，不改变代码
* `iife` - 输出自执行函数，最适合导入html中的script标签，且代码更小
* `umd` - 通用模式，amd, cjs, iife都能用


Webpack也提供了多种打包方式，通过output.libraryTarget

* 模块
    * `commonjs2` - 入口起点的返回值将分配给 module.exports 对象。这个名称也意味着模块用于 CommonJS 环境
    * `amd` - 将你的 library 暴露为 AMD 模块
    * umd - 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量

## 参考文章
* [webpack output-librarytarget](https://webpack.docschina.org/configuration/output/#output-librarytarget)

* [webpack Authoring Libraries](https://webpack.js.org/guides/author-libraries/)