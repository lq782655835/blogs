# rollup

Rollup 提供了多种打包方式，通过 format 属性可以设置你想要打包成的代码类型：

* `amd` - 输出成AMD模块规则，RequireJS可以用
* `cjs` - CommonJS规则，适合Node，Browserify，Webpack 等
* `es` - 默认值，不改变代码
* `iife` - 输出自执行函数，最适合导入html中的script标签，且代码更小
* `umd` - 通用模式，amd, cjs, iife都能用

### Rollup 的好处
* Tree Shaking: 自动移除未使用的代码, 输出更小的文件
* Scope Hoisting: 所有模块构建在一个函数内, 执行效率更高
* Config 文件支持通过 ESM 模块格式书写
* 可以一次输出多种格式:IIFE, AMD, CJS, UMD, ESM
* Development 与 production 版本: .js, .min.js
* 文档精简

### 基础插件
* rollup-plugin-alias: 提供 modules 名称的 alias 和 reslove 功能.
* `rollup-plugin-babel`: 提供 Babel 能力, 需要安装和配置 Babel (这部分知识不在本文涉及)
* rollup-plugin-eslint: 提供 ESLint 能力, 需要安装和配置 ESLint (这部分知识不在本文涉及)
* `rollup-plugin-node-resolve`: 解析 node_modules 中的模块
* `rollup-plugin-commonjs`: 转换 CJS -> ESM, 通常配合上面一个插件使用
* rollup-plugin-replace: 类比 Webpack 的 DefinePlugin , 可在源码中通过 process.env.NODE_ENV 用于构建区分 * Development 与 Production 环境.
* rollup-plugin-filesize: 显示 bundle 文件大小
* `rollup-plugin-uglify`: 压缩 bundle 文件
* rollup-plugin-serve: 类比 webpack-dev-server, 提供静态服务器能力

``` js
// 典型库应用
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const packages = require('./package.json');

const ENV = process.env.NODE_ENV;

const paths = {
    input: {
        root: ENV === 'example'
            ? 'example/index.js'
            : 'src/index.js',
    },
    output: {
        root: ENV === 'example'
            ? 'example/dist/'
            : 'dist/',
    },
};

const fileNames = {
    development: `${packages.name}.js`,
    example: `example.js`,
    production: `${packages.name}.min.js`
};

const fileName = fileNames[ENV];

export default {
    input: `${paths.input.root}`,
    output: {
        file: `${paths.output.root}${fileName}`,
        format: 'umd',
        name: 'bundle-name'
    },
    plugins: [
        resolve(),
        commonjs(),
        eslint({
            include: ['src/**'],
            exclude: ['node_modules/**']
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        (ENV === 'production' && uglify()),
    ],
};

```


## Webpack

Webpack也提供了多种打包方式，通过output.libraryTarget

* 模块
    * `commonjs2` - 入口起点的返回值将分配给 module.exports 对象。这个名称也意味着模块用于 CommonJS 环境
    * `amd` - 将你的 library 暴露为 AMD 模块
    * umd - 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量

## 参考文章
* [webpack output-librarytarget](https://webpack.docschina.org/configuration/output/#output-librarytarget)

* [webpack Authoring Libraries](https://webpack.js.org/guides/author-libraries/)