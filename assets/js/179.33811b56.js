(window.webpackJsonp=window.webpackJsonp||[]).push([[179],{685:function(t,a,s){"use strict";s.r(a);var n=s(9),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"nei源码阅读"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nei源码阅读"}},[t._v("#")]),t._v(" NEI源码阅读")]),t._v(" "),s("h3",{attrs:{id:"源码简析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#源码简析"}},[t._v("#")]),t._v(" 源码简析")]),t._v(" "),s("ul",[s("li",[t._v("bin/nei.js nei工具项目入口，主要提供server、build等命令")]),t._v(" "),s("li",[t._v("main.js 工具命令对应的函数入口")]),t._v(" "),s("li",[t._v("lib/fb-modules/util/mock_data_work.js。node vm安全沙箱的包装器。")]),t._v(" "),s("li",[t._v("lib/fb-modules/util/mock_data.js 定义一些将运行在vm沙箱中的函数。目的是根据nei配置获得对应的mock数据。也就是说，这里是nei配置到最终数据的关键代码。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://user-images.githubusercontent.com/6310131/51990799-c2bfbd80-24e4-11e9-974e-9c056dc72b67.png",alt:"image"}})]),t._v(" "),s("h3",{attrs:{id:"相关doc"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#相关doc"}},[t._v("#")]),t._v(" 相关Doc")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/NEYouFan/nei-toolkit/blob/master/doc/%E4%BC%A0%E7%BB%99%E6%A8%A1%E6%9D%BF%E7%9A%84%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("传给模板的数据说明"),s("OutboundLink")],1)])]),t._v(" "),s("h1",{attrs:{id:"atomvalidator-源码阅读"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#atomvalidator-源码阅读"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"https://github.com/vusion/atom-validator/blob/master/src/AtomValidator.ts",target:"_blank",rel:"noopener noreferrer"}},[t._v("AtomValidator"),s("OutboundLink")],1),t._v(" 源码阅读")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 内置规则解析 && 校验，支持string rules/Array rules")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" atomValidator "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomValidator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\natomValidator"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("validate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'required | max(200)'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("catch")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("error"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"_1-正则解析string-仿vue-filter"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-正则解析string-仿vue-filter"}},[t._v("#")]),t._v(" 1. 正则解析string（仿vue filter）：")]),t._v(" "),s("p",[t._v("https://github.com/vusion/atom-validator/blob/master/src/parseRules.ts")]),t._v(" "),s("h3",{attrs:{id:"_2-string方法转为真实的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-string方法转为真实的方法"}},[t._v("#")]),t._v(" 2. string方法转为真实的方法：")]),t._v(" "),s("p",[t._v("过程：split分别拿到方法名key和参数，根据key找到方法，根据Function对参数统一处理拿到真实参数。因为参数名可能是...list，没有上下文不清楚该表达式，所以需要Function中转下，同时可设置context确定在哪个上下文中。")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("u-form-item")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("label")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("用户名"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("required")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rules")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("required | ^azAZ | ^azAZ09-$ @b | azAZ09$ | minLength(4) #4-12个字符"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("u-input")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("maxlength")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("12"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("4-12个字符"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("u-input")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("u-form-item")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("解析后：required | ^azAZ | ^azAZ09-$ | azAZ09$ | minLength(4)的完整格式：")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("u-form-item")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("label")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("用户名"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("required")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":rules")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("[\n    { validate: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("required"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", required: true, trigger: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("blur"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", message: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("请输入用户名"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" },\n    { validate: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("pattern"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", args: /^[a-zA-Z]/, trigger: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("input+blur"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", message: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("以字母开头"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" },\n    { validate: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("pattern"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", args: /^[a-zA-Z0-9-]$/, trigger: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("input+blur"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", message: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("字母、数字或中划线组成"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" },\n    { validate: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("pattern"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", args: /[a-zA-Z0-9]$/, trigger: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("blur"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", message: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("以字母或数字结尾"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" },\n    { validate: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("minLength"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", args: [4], trigger: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("blur"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(", message: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("不得少于4个字符"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" },\n]"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("u-input")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("maxlength")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("12"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("placeholder")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("4-12个字符"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("u-input")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("u-form-item")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// parseRules解析规则")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 支持（1，2，3）&& （...list）语法")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("resolveArgs")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("args"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("with (this) { return ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("args"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(" }")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ruleName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'('")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// range(1, 4)")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拿到内置rule校验方法名")]),t._v("\n    parsedRule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("validate "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ruleName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("slice")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 拿到参数（string --\x3e Array）")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'['")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" ruleName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("slice")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ruleName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("']'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    parsedRule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("args "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolveArgs")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// validate校验结果")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" rule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("validate "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'string'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 根据name，选择指定的内置校验方法")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" validator "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("validators"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("rule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("validate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("validate")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" any"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" rule"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Rule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" any "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 参数")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//校验结果")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("validator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nresult "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("validate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("context"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" rule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("this.$vnode.context: Vue组件上下文")])])}),[],!1,null,null,null);a.default=e.exports}}]);