# 解决方案

## 问题
* [git 配置多个SSH-Key](https://my.oschina.net/stefanzhlg/blog/529403)

* [使用Visual Studio Code对Node.js进行断点调试](https://segmentfault.com/a/1190000009084576)

* iframe刷新，单页应用保持当前路由 - `sessionStorage`

* pc兼容性，safari底部莫名有个横条 - 禁用/卸载`迅雷`插件

* npm查看全局安装过的包 - `npm list -g --depth 0`

* npm管理员彻底删除包 - `npm unpublish <package-name> --force`

* svg-icon - css能控制svg颜色等，但内部fill属性优先级大于外层fill或css属性

* 跳页锚点 - 考虑兼容性，使用`隐藏的a标签作为暗锚`即可

* 长文字只能控制在n行内 - [vue-clamp](https://github.com/Justineo/vue-clamp),原理使用`Element.getClientRects()`这个API

* span包含长文字不换行 - 块级元素自动换行，内联元素分两种：`全英文内联元素不会自动换行`，包含中文过长会换行

* 'abc'[0] = 'a' - [深入理解JavaScript类数组](https://segmentfault.com/a/1190000005076858)

* git命令删除远程分支 - git push origin --delete branchName

* axios get请求参数，要么带在url，要么设置到config.params中，不能设置到config.data（该选项会设置在body中，post请求才这样做）。 -- [github axios](https://github.com/axios/axios) / [GET request does not send data (JSON)](https://github.com/axios/axios/issues/787)

* 统一的项目开发环境，检验node版本 -- package.json中engines字段配置即可。[JavaScript工程项目的一系列最佳实践策略](https://mp.weixin.qq.com/s/FroImJAuAO05BY1rZAhMkQ)

* 部署代码报错：[cannot read property 'startsWith' of undefined](https://github.com/geowarin/friendly-errors-webpack-plugin/issues/69) -- 使用了动态导入（如import或requext.context等API），但没有创建对应的路径。

* function(...args){ console.log(args)} -- 解构后，args是个数组对象

* 后台302重定向一定需要是在页面上（window.location.href） -- 不能通过ajax请求让后端页面重定向，ajax只接收json/txt/stream等格式

* [Vue后台权限方案](https://segmentfault.com/a/1190000009506097) - 原理通过登录获得用户拥有的roles，然后根据整个前端路由表（meta包含这个路由项是哪些roles有权限访问），最后根据两者交集得到routers并通过`router.addRoutes`动态添加

* [面包屑导航](https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/Breadcrumb/index.vue) - $route.matched，这个API完美解决

* [export * from './child'](https://stackoverflow.com/questions/38077164/es6-export-from-import/38077264) - ES6模块导入，重构将大文件拆分成多个小文件

## 技术选型

* svg图标: [vue-svgicon](https://github.com/MMF-FE/vue-svgicon)
* 日期选择: [vue-datepicker-local](https://github.com/weifeiyue/vue-datepicker-local)
* 表单验证: [vuelidate](https://github.com/monterail/vuelidate)
* node中客户端http请求库选择 [superagent]()
    * 建议选择`superagent`,支持链式调用以及post json数据解析。node环境中不建议axios，因为axios请求需要qs等第三方库进行post数据stringfy，而且不支持发送嵌套的object数据。
* 富文本编辑器 [vue-quill-editor](https://github.com/surmon-china/vue-quill-editor/blob/master/src/editor.vue)
    * 底层使用[quill](https://github.com/quilljs/quill)，较好的界面和扩展性
* markdown编辑器 [tui.editor](https://github.com/nhnent/tui.editor)
* 复制到剪切板 [clipboard.js]()

## 工具集

* [css代码片段](https://30-seconds.github.io/30-seconds-of-css/#transform-centering)
* 在线图片压缩工具
    * [squoosh](https://squoosh.app/)
    * [tinypng](https://tinypng.com/)
* [在线画图ProcessOn](https://www.processon.com/organizations/5c653312e4b0f0908a940a64#diagrams)
* [抓包工具Charles]() - [配置教程](https://blog.csdn.net/windy135/article/details/79086270)
* [Node.js 最佳实践](https://github.com/i0natan/nodebestpractices/blob/master/README.chinese.md)


## Github优秀源码
* Vue
    * [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 完整的项目案例，界面精良，较多的第三方组件方案（icon、permission...）
* JS
    * [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code) 短小精悍的js代码片段
* Common
    * [quicklink](https://github.com/GoogleChromeLabs/quicklink) 兼容性好的页面资源预加载解决方案
    * [clean-code-typescript](https://github.com/labs42io/clean-code-typescript) ts最佳实践
    * [sb](https://github.com/jaywcjlove/sb) 在线svg图标