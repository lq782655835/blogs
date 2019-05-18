(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{331:function(t,s,a){"use strict";a.r(s);var n=a(9),o=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"node-模块源码分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-模块源码分析","aria-hidden":"true"}},[t._v("#")]),t._v(" Node-模块源码分析")]),t._v(" "),a("p",[t._v("模块系统是nodejs的基础，使用频率也很高。在使用nodejs过程中，以下几个关于模块系统的问题是否常常困扰着你：")]),t._v(" "),a("ol",[a("li",[t._v("为什么在模块中有全局的require、module.exports、exports、__dirname、__filename等关键字,它们是从哪来的？")]),t._v(" "),a("li",[t._v("为什么一定要使用module.exports或者exports导出模块信息？")]),t._v(" "),a("li",[t._v("module.exports和exports的区别，它们之间的关系是什么？")])]),t._v(" "),a("p",[t._v("接下来通过源码分析"),a("a",{attrs:{href:"https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("lib/module.js"),a("OutboundLink")],1),t._v("来解决这些困惑。")]),t._v(" "),a("blockquote",[a("p",[t._v("本文分析的源码版本是目前最新的Node V11.12，同时为方便理解，笔者精简出一些关键的代码，同时有详细注释。")])]),t._v(" "),a("h2",{attrs:{id:"commonjs规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commonjs规范","aria-hidden":"true"}},[t._v("#")]),t._v(" CommonJS规范")]),t._v(" "),a("p",[t._v("众所周知，nodejs是基于CommonJS规范来实现，CommonJS规范主要有以下几点内容：")]),t._v(" "),a("ol",[a("li",[t._v("每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。")]),t._v(" "),a("li",[t._v("每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。")]),t._v(" "),a("li",[t._v("require方法用于加载模块")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// moduleA.js")]),t._v("\nmodule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("exports")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" value "),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" value "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// moduleB.js")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" multiplyBy2 "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'./moduleA'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" result "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("multiplyBy2")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token number"}},[t._v("4")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("看以上定义内容我们知道，CommonJS规范规定了每个模块内部都有module变量表示当前模块，使用exports导出模块内容以及require导入模块，到具体源码上它是如何实现的呢？")]),t._v(" "),a("h2",{attrs:{id:"源码分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#源码分析","aria-hidden":"true"}},[t._v("#")]),t._v(" 源码分析")]),t._v(" "),a("p",[t._v("先从引入模块require进行分析。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// lib/internal/modules/cjs/loader.js")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// require方法挂载到Module原型链上")]),t._v("\nModule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("require")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("_load")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("/* isMain */")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("false")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nModule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("_load")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" isMain"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 解析出完整绝对路径，request路径可能有多种形式")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 1. 内部模块：require('http')")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 2. 相对位置-文件：require('./module')")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 3. 相对位置-文件夹：require('./module/')")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 4. 绝对位置： require('/temp/module')")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" filename "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("_resolveFilename")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" isMain"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 缓存处理，提升性能")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 同时可以解决a、b模块互相依赖导致循环的问题")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 因为只加载一次，第二次加载直接从缓存中读取，不用重新加载")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" cachedModule "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_cache"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cachedModule"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" cachedModule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 导出的永远是module.exports的内容")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 先实例化一个空的module")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Module")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_cache"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" module"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 存入缓存")]),t._v("\n\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 加载module")]),t._v("\n  module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("load")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 问题2答案：导出的是exports内容")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 每个模块对应就是Module实例")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("Module")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parent"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" id"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 模块的识别符，通常是带有绝对路径的模块文件名")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 模块对外输出的值")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parent "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" parent"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 返回一个对象，表示调用该模块的模块")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("filename "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("null")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 模块的文件名，带有绝对路径")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loaded "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("false")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 是否已加载模块标记")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 返回一个数组，表示该模块要用到的其他模块")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nmodule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// node内部源码使用的也是模块系统")]),t._v("\n")])])]),a("p",[t._v("1 . 可以看到"),a("code",[t._v("require")]),t._v("方法是绑定在Module类的原型链方法，说明只有获取到当前实例module才能调用require。而每个模块都可以拿到自己的当前实例module变量，它是如何把实例module注入到模块中的呢？"),a("strong",[t._v("答案是使用沙箱环境，以闭包函数的方式传入当前module")]),t._v("，后续源码解读会有详细说明。")]),t._v(" "),a("p",[t._v("2 . node模块系统路径加载多种多样，有内置的、有从相对位置读取、有从绝对位置读取，加载详细规则可以看NodeJS官方文档 "),a("a",{attrs:{href:"https://nodejs.org/api/modules.html#modules_file_modules",target:"_blank",rel:"noopener noreferrer"}},[t._v("modules_file_modules"),a("OutboundLink")],1),t._v("。想了解具体实现原理可以看下"),a("code",[t._v("Module._resolveFilename")]),t._v("方法源码，该方法主要确定模块加载的绝对路径。了解该源码后，如下官方文档解释很容易理解：")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_file_modules",target:"_blank",rel:"noopener noreferrer"}},[t._v("File Modules"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_folders_as_modules",target:"_blank",rel:"noopener noreferrer"}},[t._v("Folders as Modules#\n"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_loading_from_node_modules_folders",target:"_blank",rel:"noopener noreferrer"}},[t._v("Loading from node_modules Folders"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_loading_from_the_global_folders",target:"_blank",rel:"noopener noreferrer"}},[t._v("Loading from the global folders"),a("OutboundLink")],1)])]),t._v(" "),a("p",[t._v("3 . 可以看到"),a("code",[t._v("Module._load")]),t._v("方法通过new Module()来创建一个空的module实例，然后通过原型方法"),a("code",[t._v("module.load")]),t._v("真正的去读取模块内容。"),a("strong",[t._v("注意return导出的是"),a("code",[t._v("module.exports")])]),t._v("，这就解释了CommonJS规范中要求的最终导出的内容是module.exports（第二个问题答案）。至于exports是module.exports的简写，即exports = module.exports，下文会解释这关系。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("load")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// module实例上可以拿到filename、paths属性")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("filename "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("paths "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("_nodeModulePaths")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("dirname")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// node引用模块可以默认不写后缀，顺序规则：.js、.json .node")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" extension "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("findLongestRegisteredExtension")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 不同后缀的文件模块，使用不同的策略。")]),t._v("\n  Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_extensions"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("extension"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loaded "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token boolean"}},[t._v("true")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 标记成模块已加载")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nModule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_extensions"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v("'.js'")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" content "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" fs"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("readFileSync")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'utf8'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 获得模块代码纯字符串，然后编译compile字符串代码")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// stripBOM方法作用是剥离 utf8 编码特有的BOM文件头")]),t._v("\n  module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("_compile")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("stripBOM")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("content"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nModule"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_extensions"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v("'.json'")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("module"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" content "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" fs"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("readFileSync")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'utf8'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// json后缀加载策略：把字符串JSON.parse解析成对象")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 将对象赋值给module.exports,因为最终对外导出module.exports")]),t._v("\n  module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("parse")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("stripBOM")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("content"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("再来看看"),a("code",[t._v("Module.prototype.load")]),t._v("做了什么。nodejs模块系统中是可以不带后缀的，他会根据"),a("code",[t._v(".js,.json,.node")]),t._v("的顺序规则去确定最终使用哪个文件。而不同后缀的文件模块加载策略是不一样的，json策略是把字符串JSON.parse解析成对应代码，通过module.exports导出供外部使用。js策略是使用"),a("code",[t._v("module._compile")]),t._v("方法处理，让我们看下_compile的源码。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("_compile")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("content"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 将模块内容使用function包装起来")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" wrapper "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("wrap")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("content"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 关键：通过内部vm模块方法，把string字符串代码，变成真正的可执行代码")]),t._v("\n  cosnt compiledWrapper "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" vm"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("runInThisContext")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("wrapper"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token operator"}},[t._v("...")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" dirname "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" path"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("dirname")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" require "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("makeRequireFunction")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 对外暴露的require api")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 问题3答案：exports和module.exports的关系")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 即exports = module.exports = {}")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" exports "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" thisValue "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" exports"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" module "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 把当前实例传入")]),t._v("\n\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 问题1答案：在模块内部，拥有require、module、exports等全局变量")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 原理是通过compiledWrapper.call执行函数，把这些内容传入到模块内部")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("var")]),t._v(" result "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" compiledWrapper"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("call")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("thisValue"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" exports"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" require"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" module"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" dirname"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" result\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 最新版node使用Proxy，使得Module.wrap代理wrap对象")]),t._v("\nObject"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("defineProperty")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'wrap'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("get")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" wrap"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("set")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    wrap "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" value"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("wrap")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("script"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("wrapper"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" script "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" Module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("wrapper"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" wrapper "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v("'(function (exports, require, module, __filename, __dirname) { '")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v("'\\n});'")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("code",[t._v("Module.prototype._compile")]),t._v("是整个模块加载的核心内容，其本质是将字符串源码拼接成闭包函数（通过VM模块的runInThisContext），注入exports、require、module等全局变量，再执行模块源码，将module的exports值输出。等同于如下代码：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("exports"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" require"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" module"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" __filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" __dirname"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token comment"}},[t._v("// 模块内部定义代码")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" otherModule "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("require")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'./other'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 内部可以使用require、module等全局变量")]),t._v("\n  module"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function-variable function"}},[t._v("exports")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token operator"}},[t._v("...")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 必须使用module.exports以导出本模块内容")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("require"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" filename"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" dirname"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("了解以上源码后，如下官方文档解释很容易理解：")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_the_module_wrapper",target:"_blank",rel:"noopener noreferrer"}},[t._v("The module wrapper"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_the_module_scope",target:"_blank",rel:"noopener noreferrer"}},[t._v("The module scope"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_exports_shortcut",target:"_blank",rel:"noopener noreferrer"}},[t._v("exports shortcut"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ol",[a("li",[t._v("模块加载，是通过沙箱方式，把字符串拼接成闭包函数的形式，把实例module、exports、require、__filename、__dirname以参数方式注入到环境变量中。")]),t._v(" "),a("li",[t._v("模块导出的内容是必须是module.exports的内容，exports是module.exports简写，指向同一块内存。")]),t._v(" "),a("li",[t._v("exports = module.exports，但exports被覆盖时，exports被赋值的是一个新开辟的内存，不再指向module.exports。所以官网建议不要在模块内部直接覆盖exports，即"),a("code",[t._v("不要写exports = ...")]),t._v("代码。")]),t._v(" "),a("li",[t._v("可以使用nodejs vm模块，将拼接字符串代码转可执行代码，解决一些非常规需求，如用户自定义执行函数、自定义Mock函数、自定义模块加载器等。")])]),t._v(" "),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"http://javascript.ruanyifeng.com/nodejs/module.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("CommonJS规范"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2015/05/require.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("require() 源码解读"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js",target:"_blank",rel:"noopener noreferrer"}},[t._v("module.exports vs exports in Node.js"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://cnodejs.org/topic/5231a630101e574521e45ef8",target:"_blank",rel:"noopener noreferrer"}},[t._v("exports 和 module.exports 的区别"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://nodejs.org/dist/latest-v10.x/docs/api/modules.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("node - modules"),a("OutboundLink")],1)])])])},[],!1,null,null,null);o.options.__file="node-module.md";s.default=o.exports}}]);