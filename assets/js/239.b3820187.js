(window.webpackJsonp=window.webpackJsonp||[]).push([[239],{742:function(t,s,a){"use strict";a.r(s);var r=a(9),n=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"npm-script技巧"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npm-script技巧"}},[t._v("#")]),t._v(" npm script技巧")]),t._v(" "),a("blockquote",[a("p",[t._v("npm不仅是js包管理工具，还可以为作为代码库配置工具。有些时候需要一些小脚本来约定规则或者监听文件变化，这时候npm script起到重要作用。")])]),t._v(" "),a("h2",{attrs:{id:"_1-串行和并行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-串行和并行"}},[t._v("#")]),t._v(" 1. 串行和并行")]),t._v(" "),a("p",[t._v("使用"),a("code",[t._v("&&")]),t._v("将多个命令串行执行。比如我们经常提交代码时，先perriter格式化代码，然后检查eslint以及stylelint，最后再进行commitlint。依次执行，前面执行为false则停止。使用"),a("code",[t._v("&")]),t._v("将多个命令并行执行。")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"precommit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"npm run format && npm run eslint && npm run stylelint && git add ."')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"_2-通配符执行相似指令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-通配符执行相似指令"}},[t._v("#")]),t._v(" 2. 通配符执行相似指令")]),t._v(" "),a("p",[t._v("通配符需要配合"),a("a",{attrs:{href:"https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("npm-run-all")]),a("OutboundLink")],1),t._v("包(更轻量和简洁的多命令运行)。--parallel参数表示并行")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"precommit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"npm-run-all --parallel lint:*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"lint:js"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"eslint --ext .js,.vue --ignore-path .gitignore"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"lint:commit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"commitlint -e $GIT_PARAMS"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v('"\n'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"_3-原生钩子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-原生钩子"}},[t._v("#")]),t._v(" 3. 原生钩子")]),t._v(" "),a("p",[t._v("npm脚本有pre和post两个钩子。eg：build脚本命令的钩子就是prebuild和postbuild。")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"webpack"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"prebuild"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"echo before build"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"postbuild"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"echo after build"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("执行build时按照如下顺序执行:")])]),t._v(" "),a("blockquote",[a("p",[t._v("npm run prebuild && npm run build && npm run postbuild")])]),t._v(" "),a("p",[t._v("npm 默认提供如下命令钩子：")]),t._v(" "),a("ul",[a("li",[t._v("install")]),t._v(" "),a("li",[t._v("uninstall")]),t._v(" "),a("li",[t._v("start")]),t._v(" "),a("li",[t._v("restart")]),t._v(" "),a("li",[t._v("build")]),t._v(" "),a("li",[t._v("test")]),t._v(" "),a("li",[t._v("stop")]),t._v(" "),a("li",[t._v("version")])]),t._v(" "),a("h2",{attrs:{id:"_4-监听文件变动"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-监听文件变动"}},[t._v("#")]),t._v(" 4. 监听文件变动")]),t._v(" "),a("p",[t._v("gulp中watch非常实用，但npm script也能实现文件变动后自动运行npm脚本。这就需要安装"),a("a",{attrs:{href:"https://www.npmjs.com/package/onchange",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("onchange")]),a("OutboundLink")],1),t._v("包。onchange帮助我们在文件增删改时执行对应npm命令，非常实用。")]),t._v(" "),a("p",[t._v("安装onchange:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" onchange --save-dev\n")])])]),a("p",[t._v("scripts监听(示例监听svg文件变化，以处理最新svg文件):")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"webpack & npm run watch:svg"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"watch:svg"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"onchange 'assets/svg/*.svg' -- npm run svg\"")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"svg"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vsvg -s ./assets/svg -t ./assets/icon"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("npm中"),a("code",[t._v("--")]),t._v("后面代表着参数")])]),t._v(" "),a("h2",{attrs:{id:"_5-git钩子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-git钩子"}},[t._v("#")]),t._v(" 5. git钩子")]),t._v(" "),a("p",[t._v("这也是非常实用功能之一，可以利用git钩子构建代码约束。经常用到的工具包是"),a("a",{attrs:{href:"https://github.com/typicode/husky",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("husky")]),a("OutboundLink")],1),t._v(",通过husky源码知道，它替换了项目中.git/hooks钩子。项目中常用钩子是"),a("code",[t._v("precommit")]),t._v(","),a("code",[t._v("prepush")]),t._v(", "),a("code",[t._v("commit-msg")])]),t._v(" "),a("p",[t._v("安装husky:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" husky --save-dev\n")])])]),a("p",[t._v("约束:")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"precommit"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"npm run format && npm run eslint"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);