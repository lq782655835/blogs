(window.webpackJsonp=window.webpackJsonp||[]).push([[140],{459:function(e,n,s){"use strict";s.r(n);var _=s(1),t=Object(_.a)({},function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"推荐-vue项目目录结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#推荐-vue项目目录结构","aria-hidden":"true"}},[e._v("#")]),e._v(" 推荐-Vue项目目录结构")]),e._v(" "),s("p",[e._v("目录结构保持一致，使得多人合作容易理解与管理，提高工作效率。"),s("a",{attrs:{href:"https://github.com/lq782655835/standard-vue-project",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue标准项目"),s("OutboundLink")],1)]),e._v(" "),s("h2",{attrs:{id:"简要说明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#简要说明","aria-hidden":"true"}},[e._v("#")]),e._v(" 简要说明")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("main.js")]),e._v("主入口，"),s("code",[e._v("router.js")]),e._v("路由划分")]),e._v(" "),s("li",[s("code",[e._v("plugins")]),e._v(" 自己或第三方插件,包括但不限于components、directives、filters、third lib")]),e._v(" "),s("li",[s("code",[e._v("pages")]),e._v(" 所有路由页面。原则：轻page，重component")]),e._v(" "),s("li",[s("code",[e._v("components")]),e._v(" 所有组件。包括原子组件、业务公用组件、页面独有组件")]),e._v(" "),s("li",[s("code",[e._v("server")]),e._v(" api引入入口")]),e._v(" "),s("li",[s("code",[e._v("assets")]),e._v(" sass、图片资源入口，不常修改数据")]),e._v(" "),s("li",[s("code",[e._v("utils")]),e._v(" 工具文件夹")]),e._v(" "),s("li",[s("code",[e._v("store")]),e._v(" 标准vuex格式，非必须")])]),e._v(" "),s("h2",{attrs:{id:"详细说明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#详细说明","aria-hidden":"true"}},[e._v("#")]),e._v(" 详细说明")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("project\n└───src\n│   │   app.vue    // 主页面\n│   │   main.js    // 主入口\n|   |   router.js  // 所有路由\n│   │\n│   |____assets    // css、image、svg等资源\n│   |   |____css   // 所有sass资源\n|   |   |    |  reset.scss       // 兼容各浏览器\n|   |   |    |  global.scss      // 全局css\n|   |   |    |  variable.scss    // sass变量和function等\n│   |   |____img   // image图标库\n|   |   |____svg   // svg图标库\n|   |\n|   |____components    // 组件\n│   |   |____common    // common自注册组件\n│   |        |____base // 原子组件(如果是引入第三方，该文件夹可省略)\n│   |        |   ...   // 业务公用组件\n│   |   |____entity    // entity页面组件\n│   |   |____about     // about页面组件\n|   |\n|   |____pages     // UI层(原则：轻page，重component)\n|   |   |____entity\n|   |   |    |  list.vue      // 列表页\n|   |   |    |  create.vue    // 新增页\n|   |   |    |  edit.vue      // 修改页\n|   |   | main.vue\n|   |\n|   |____plugins   // 自己或第三方插件\n|   |   | index.js       // 插件入口文件\n|   |   | directives.js  // 所有Vue指令\n|   |   | filters.js  // 所有Vue过滤\n|   |\n|   |____server    // 接口层\n|   |   | index.js   // 所有接口\n|   |   | http.js  // axios二次封装\n|   |\n|   |____store     // vuex数据\n|   |   | index.js\n|   |\n|   |____utils     // 工具层\n|   |   | config.js// 配置文件，包括常量配置\n|\n└───public         // 公用文件，不经过webpack处理\n│   │   favicon.ico\n│   │   index.html\n│   vue.config.js  // vue-cli3主配置\n│   babel.config.js// babel配置\n│   .eslintrc.js   // eslint配置\n│   .prettierrc.js // perttier配置\n│   package.json   // npm配置\n│   README.md      // 项目说明\n")])])])])},[],!1,null,null,null);n.default=t.exports}}]);