(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{667:function(e,t,s){"use strict";s.r(t);var i=s(9),v=Object(i.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"组件库设计体系"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件库设计体系"}},[e._v("#")]),e._v(" 组件库设计体系")]),e._v(" "),s("h3",{attrs:{id:"前提条件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前提条件"}},[e._v("#")]),e._v(" 前提条件：")]),e._v(" "),s("ol",[s("li",[e._v("设计原则（确定目标）- "),s("a",{attrs:{href:"https://vusion.github.io/cloud-ui/design/accuracy",target:"_blank",rel:"noopener noreferrer"}},[e._v("设计语言"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("确定设计规范(设计人员根据业务确定) - "),s("a",{attrs:{href:"https://vusion.github.io/cloud-ui/components/theme",target:"_blank",rel:"noopener noreferrer"}},[e._v("视觉规范"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("确定开发规范（如组件命名方式统一）- "),s("a",{attrs:{href:"https://vusion.github.io/cloud-ui/components/pattern",target:"_blank",rel:"noopener noreferrer"}},[e._v("设计模式"),s("OutboundLink")],1)])]),e._v(" "),s("h3",{attrs:{id:"实施流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实施流程"}},[e._v("#")]),e._v(" 实施流程")]),e._v(" "),s("ol",[s("li",[e._v("搭建开发框架\n"),s("ol",[s("li",[e._v("搭建整体架构，层次分明")]),e._v(" "),s("li",[e._v("确定git提交规则，自动审核提交的代码，不合规范的代码阻止入库\n"),s("ul",[s("li",[e._v("husky + lint-staged")]),e._v(" "),s("li",[e._v("gh-pages（发布demo到github）")]),e._v(" "),s("li",[e._v("release-it（自动提交github代码 + 自动修改lib库版本 + 推送npm服务器）")])])])])]),e._v(" "),s("li",[e._v("开发基础组件库（组件，vue资源）\n"),s("ol",[s("li",[e._v("分配人员任务，每个人定时完成指定基础组件（可参考开源，样式根据）")]),e._v(" "),s("li",[e._v("搭建doc项目，书写Markdown说明文档")]),e._v(" "),s("li",[e._v("codereview，审核完成后入库")])])]),e._v(" "),s("li",[e._v("开发业务组件库\n"),s("ol",[s("li",[e._v("从业务总抽象流程，补充入组件库")]),e._v(" "),s("li",[e._v("补充doc文档")])])])]),e._v(" "),s("h4",{attrs:{id:"确定代码规范"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#确定代码规范"}},[e._v("#")]),e._v(" 确定代码规范：")]),e._v(" "),s("ol",[s("li",[e._v("eslint config "),s("a",{attrs:{href:"https://github.com/vusion/code-style/blob/master/eslint/JavaScript.zh-CN.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vusion JavaScript 代码风格"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("stylelint config")])]),e._v(" "),s("h4",{attrs:{id:"引入方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#引入方式"}},[e._v("#")]),e._v(" 引入方式：")]),e._v(" "),s("ol",[s("li",[e._v("npm")]),e._v(" "),s("li",[e._v("unpkg")]),e._v(" "),s("li",[e._v("doc文档")])]),e._v(" "),s("h4",{attrs:{id:"技术选型影响因素"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#技术选型影响因素"}},[e._v("#")]),e._v(" 技术选型影响因素")]),e._v(" "),s("ul",[s("li",[e._v("是否需要多组件库皮肤？- 框架中是否采用css变量 + postcss方案 or scss方案")]),e._v(" "),s("li",[e._v("是否支持扩展组件逻辑？- 是否导出指定原型组件")]),e._v(" "),s("li",[e._v("icon是否自研？icon图标一般用什么")])]),e._v(" "),s("p",[e._v("优点：")]),e._v(" "),s("ul",[s("li",[e._v("社区一般是通用解决方案，但企业业务会是复杂的")]),e._v(" "),s("li",[e._v("支持快速修改，不必等社区issue解决")])]),e._v(" "),s("p",[e._v("缺点：")]),e._v(" "),s("ul",[s("li",[e._v("需要多专业人员合作，如设计、开发")]),e._v(" "),s("li",[e._v("需要建立基础组件库，并具有较好的扩展性")])]),e._v(" "),s("p",[e._v("导出的内容：")]),e._v(" "),s("ul",[s("li",[e._v("filter")]),e._v(" "),s("li",[e._v("directive")]),e._v(" "),s("li",[e._v("util")]),e._v(" "),s("li",[e._v("componnets")])]),e._v(" "),s("h2",{attrs:{id:"vusion依赖包"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vusion依赖包"}},[e._v("#")]),e._v(" Vusion依赖包")]),e._v(" "),s("ul",[s("li",[e._v("vue-cli-plugin-vusion\n"),s("ul",[s("li",[e._v("依赖包\n"),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/vusion/vusion-api/blob/master/src/config/resolve.ts",target:"_blank",rel:"noopener noreferrer"}},[e._v("vusion-api"),s("OutboundLink")],1),e._v(" 设置默认vusion.config")]),e._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/vusion/vusion-loader/blob/master/index.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("vusion-loader"),s("OutboundLink")],1),e._v(" rule规则，使得文件夹可分为js/css/html三个文件夹\n"),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/vusion/vue-multifile-loader",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-multifile-loader"),s("OutboundLink")],1)])])]),e._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/vusion/icon-font-loader/blob/master/README.zh-CN.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("icon-font-loader"),s("OutboundLink")],1),e._v(" 把svg图标转为icon-front图标（说明：https://sq.163yun.com/blog/article/198531745588412416）")])])]),e._v(" "),s("li",[e._v("注册命令\n"),s("ul",[s("li",[e._v("doc")]),e._v(" "),s("li",[e._v("doc-build")]),e._v(" "),s("li",[e._v("library-build")])])])])]),e._v(" "),s("li",[e._v("vusion-utils")]),e._v(" "),s("li",[e._v("generatorYaml")])]),e._v(" "),s("p",[e._v("applyTheme: false, // 应用主题，将主题变量注入到 CSS 中。如果需要兼容 IE 浏览器，必须开启。  postcss插件实现 vue-multifile-loader")]),e._v(" "),s("p",[e._v("baseCss/theme规则设置：https://github.com/vusion/vusion-api/blob/master/src/config/resolve.ts")]),e._v(" "),s("ul",[s("li",[e._v("默认皮肤：@/src/style/theme.css")]),e._v(" "),s("li",[e._v("baseCss位置：styles/base.css")])]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("vue-cli-service doc --port "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("9001")]),e._v("\nvue-cli-service doc-build // 打包默认文件\nvue-cli-service library-build --apply-theme --theme default,dark,seagreen // 打包默认文件 + 额外两种样式文件 + 默认css变量支持IE11\n")])])]),s("h2",{attrs:{id:"注意点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#注意点"}},[e._v("#")]),e._v(" 注意点")]),e._v(" "),s("ol",[s("li",[e._v("使用vusion-cli-plugin打包/docs")]),e._v(" "),s("li",[e._v("使用vusion-util注册，里面逻辑是大些为组件，注册")]),e._v(" "),s("li",[e._v("vusion默认es6导出（需要配合vusion-cli-plugin），而不是dist导出（当然也支持这种）")])]),e._v(" "),s("p",[e._v("设计为可输出组件好处：\n设计为单独组件好处：可重复利用逻辑，只需要修改css即可。案例：https://github.com/vusion/cloud-ui/blob/master/docs/components/u-theme-select.vue/index.js")]),e._v(" "),s("h2",{attrs:{id:"element-antddesignvue-vs-vusion打包"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#element-antddesignvue-vs-vusion打包"}},[e._v("#")]),e._v(" Element/AntdDesignVue vs Vusion打包")]),e._v(" "),s("ul",[s("li",[e._v("Element/AntdDesignVue默认使用打包后的文件作为模块输出，Vusion使用源代码作为输出，所以需要cloud-ui.vusion/dist")]),e._v(" "),s("li",[e._v("按需引入，"),s("a",{attrs:{href:"https://github.com/ElemeFE/element/blob/dev/build/webpack.component.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("Element"),s("OutboundLink")],1),e._v("/"),s("a",{attrs:{href:"https://github.com/vueComponent/ant-design-vue/blob/master/antd-tools/gulpfile.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("AntdDesignVue"),s("OutboundLink")],1),e._v("本质上还是对各个Component进行单独打包element-ui/lib/button.js，Vusion按需引入import { install, directives, UButton, UText, UInput } from 'cloud-ui.vusion'源代码，需要打包时webpack体系一致。")]),e._v(" "),s("li",[e._v("Element文档在项目"),s("a",{attrs:{href:"https://github.com/ElemeFE/element/blob/dev/build/webpack.demo.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("examples"),s("OutboundLink")],1),e._v("中，Vusion文档在vue-cli-plugin-vusion中")])]),e._v(" "),s("p",[e._v("cui：")]),e._v(" "),s("ul",[s("li",[e._v("文档生成系统：https://vuepress.vuejs.org/zh/")]),e._v(" "),s("li",[e._v("考拉业务库：https://github.com/kaola-fed/rds-vue")]),e._v(" "),s("li",[e._v("基于element的皮肤库（考拉）：https://github.com/kaola-fed/element-style")])])])}),[],!1,null,null,null);t.default=v.exports}}]);