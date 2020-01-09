# 前端常用解决方案

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

* [当前页下载文件](http://www.alloyteam.com/2014/01/use-js-file-download/) 通过H5中，给a标签加download属性

* [拖拽动态改变宽度](https://github.com/bokuweb/re-resizable) 依赖原生mousedown/move/up事件

* 拖拽事件 - dragenter、dragleave

* [webworker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers) 可用于拆分出一些复杂逻辑，比如大文件上传、文件批量下载、轮询等。- [实用的封装webpack worker loader - workerize-loader](https://github.com/developit/workerize-loader)

* electron的render进程也可以直接使用nodejs api

* [debug vue源码](https://segmentfault.com/a/1190000018038749)

* [github fork后同步源更新](https://www.zhihu.com/question/28676261) 提pr必会

* [github 把子目录发布到远程gh-pages](https://gist.github.com/cobyism/4730490) 发布个人项目必会

* 解决git pull/push每次都需要输入密码问题，一行命令：git config --global credential.helper store

* [jest 报错 SyntaxError: Unexpected string](https://segmentfault.com/a/1190000019522911)

* [CSS样式使HTML标签占满父容器的方法](https://blog.csdn.net/u014175572/article/details/50773536)

* [简易Redux写法](https://github.com/qit-team/taro-yanxuan/blob/master/src/utils/redux.js)

* 遇到vue和vue render不匹配时，升级到相同即可。注意升级vue的同时需要升级vue-template-compile

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
* [licecap](https://github.com/justinfrankel/licecap) - 录屏gif工具
* [ProcessOn](https://www.processon.com/organizations/5c653312e4b0f0908a940a64#diagrams) - 在线画图
* [Charles]() - 抓包工具[配置教程](https://blog.csdn.net/windy135/article/details/79086270)
* [transactional-email-templates](https://github.com/mailgun/transactional-email-templates) 响应式html邮件模板
* 在线图片压缩工具
    * [squoosh](https://squoosh.app/)
    * [tinypng](https://tinypng.com/)
* 在线svg
    * [badgen-service](https://github.com/amio/badgen-service) 在线图标生成服务
    * [sb](https://github.com/jaywcjlove/sb) 在线多种svg图标

## Github优秀源码
* Vue
    * [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 完整的项目案例，界面精良，较多的第三方组件方案（icon、permission...）
* React
    * [react-redux-todo](https://codesandbox.io/s/9on71rvnyo) 经典的react-redux TodoList示例
    * [react-pxq](https://github.com/bailicangdu/react-pxq) 清晰易懂的react入门项目
    * [git-history](https://github.com/pomber/git-history/blob/master/src/slide.js) react hooks实例
* JS
    * [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code) 短小精悍的js代码片段
* Common
    * [quicklink](https://github.com/GoogleChromeLabs/quicklink) 兼容性好的页面资源预加载解决方案
    * [clean-code-typescript](https://github.com/labs42io/clean-code-typescript) ts最佳实践
    * [《深入理解TypeScript》](https://github.com/jkchao/typescript-book-chinese)
    * [free-programming-books](https://github.com/EbookFoundation/free-programming-books/blob/master/free-programming-books-zh.md) 学习加油站
    * [33-js-concepts](https://github.com/stephentian/33-js-concepts) js必须知道的33个概念
    * [docker_practice](https://github.com/yeasy/docker_practice) /  [docker-tutorial](https://github.com/twtrubiks/docker-tutorial) docker学习
    * [minipack](https://github.com/creeperyang/blog/blob/master/codes/minipack/README.md) 极简版webpack打包，对webpack模块原理非常有帮助

## 优秀文章

* [Node.js 中的依赖管理](https://mp.weixin.qq.com/s/XdOPPay8fpNBiH2ExW_EyQ)
介绍npm依赖、版本号规则、npm vs yarn

* [浏览器内核、JS 引擎、页面呈现原理及其优化](https://www.zybuluo.com/yangfch3/note/671516)
介绍渲染引擎和JS引擎（V8/JavaScriptCore等），以及它们如何“画”一张网页

* [前端解读控制反转(IOC)](https://juejin.im/post/5bd07377e51d457a58075974)
最容易理解的前端控制反转，案例清晰

* React
    * [setState为什么不会同步更新组件状态](https://zhuanlan.zhihu.com/p/25990883) 为什么setState不同步
    * [React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379) 详细说了react diff细节以及注意点
    * [Immutable 详解及 React 中实践](https://zhuanlan.zhihu.com/p/20295971) imuutable在react中实践
    * [React Fiber对现有代码的影响](https://zhuanlan.zhihu.com/p/26027085) 浅显易懂的讲述了fiber来由以及影响
    * [React v16.3之后的组件生命周期函数](https://zhuanlan.zhihu.com/p/38030418) 说明了fiber架构给生命周期带来的影响
* [VueI18n源码解析](https://hellogithub2014.github.io/2018/07/17/vue-i18n-source-code/) 原理跟vuex异曲同工，都是创建监听对象data，并watch变动，更新view。建议阅读

* [Effective前端3：用CSS画一个三角形](https://www.yinchengli.com/2016/10/22/css-triangle/)