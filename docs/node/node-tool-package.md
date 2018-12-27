# Node-常用包总结

很多工具包都是基于node环境，node的成功造就了大前端的繁荣。以下总结实用性较强的一些工具包。

## Common
* Tool
    * `webpack` 打包工具
    * `eslint` js代码检查
    * `stylelint` css代码检查
    * `prettier` 格式化代码工具
    * `husky` git钩子工具
* Lib
    * `lodash/underscore` js基础工具库
    * `moment` - 重量级时间处理库，支持时间解析、格式化、计算等，功能强大，支持浏览器和 Node.js
    * `date-fns` - 较 moment 更轻量级的事件处理库，体积更小
    * `fastclick` 处理移动端点击事件
    * `pinyin` 前端/nodejs汉字转拼音
* CSS
    * Sass
        * `sass-loader node-sass` sassLib,解析sass语法
        * `sass-resource` 全局导入sass文件，使得不用每个组件引入。vue-cli3默认自带
    * PostCSS
        * [autoprefixer](https://github.com/postcss/autoprefixer) 给css加前缀
        * [precss](https://github.com/jonathantneal/precss) 提供类似sass语法，告别sass包
        * [cssnext](https://github.com/MoOx/postcss-cssnext) 将未来CSS特性编译为现今支持的特性
        * [px2rem-postcss](https://github.com/songsiqi/px2rem-postcss) 将px转为rem工具。`移动端强烈推荐`
* `Yeoman` 快速构建项目,有较多模板可选择
* `browser-sync` 取代LiveReload为新型浏览器自动刷新插件，提高多浏览器开发效率。对于没有使用Hot reload的项目非常有用
* `onchange` npm script文件变动检测

## Vue
* `vue-router` 官方路由
* `vuex` 官方状态库
* `Nuxt.js` - Vue 同构框架
* `axios` - vue官方推荐的client库，功能丰富，支持Node和浏览器
* `vuelidate` 轻量级表单验证
* `vue-svgicon` 轻量级svg图标
*  [vue-datepicker-local](https://github.com/weifeiyue/vue-datepicker-local) 轻量级日期时间组件

## React
* 状态库
    * [react-redux](https://github.com/reduxjs/react-redux)
    * [mobx](https://github.com/mobxjs/mobx)
* `RxJS`
* `Next.js` - React 同构框架
* ReactNative
    * `react-native-scrollable-tab-view` 可滚动tab标签
    * `react-navigation` 导航库
    * `react-native-fit-image` 自适应图片库，包括网络图片
    * `react-native-vector-icons` 图标库
    * `react-native-device-info` 获取设备信息，系统名/版本/型号等等
    * `react-native-simple-store` 轻量级store。
    * `react-native-storage` 持久化存储
    * `react-native-splash-screen` 首屏splash
    * [更多...](https://shenbao.github.io/ishehui/html/RN%20%E5%9F%BA%E7%A1%80/React%20Native%20%E5%B8%B8%E7%94%A8%E7%AC%AC%E4%B8%89%E6%96%B9%E7%BB%84%E4%BB%B6%E6%B1%87%E6%80%BB.html)

## Node
* 框架
    * `express` 轻量级web框架,使用最广泛的 Node.js web 框架
    * `Koa` - express 原班人马打造，轻量精美的框架
    * `egg` - 基于 Koa，强大的 loader / plugin 等机制，项目架构更清晰可控，阿里巴巴企业级应用框架
    * `keystone` - 基于 Mongodb 的 CMS
* 部署工具
    * `nodemon` - 支持热加载和自动重启
    * `pm2` - 支持热启动、负载、集群、监控、重启等功能
    * `http-server` 静态文件服务器命令行工具，无需配置，一条命令开启 http 服务
* 模块
    * web常用
        * `connect-history-api-fallback` 没有匹配到路径时，导航到index.html
        * `body-parser` 解析req.body
        * `cookie-parser`
        * http代理
            * `http-proxy` - node http代理库，使用起来较原生
            * `http-proxy-middleware`<sup>`推荐`</sup> express中间件，使用简单。底层使用http-proxy
    * node常用
        * `chalk` 粉笔，使得字符串带颜色、背景色等。类似包：`colors`
        * `cheerio` nodejs dom解析库,常用来做爬虫
        * `shelljs` shelljs重新包装了 child_process，调用系统命令更加方便
        * 命令行
            * `commander.js` 使得命令行更简单，API丰富，tj大神之作
            * `yargs` 更简易的处理命令行参数小工具，比commander.js优秀的是参数不全会自动给出提示。常用在node小工具中
            * `Inquirer.js` 用户交互式命令行。常用在cli脚手架中
    * 测试
        * `mocha`<sup>`推荐`</sup> 测试框架，支持node和web端
            * –-recursive 使全部子目录下的测试用例都能被执行
            * --watch/-w 用来监视指定的测试脚本。当脚本发生变化，就会自动运行mocha。
            * –-bail/-b 只要有一个测试用例没有通过，就会停止执行后面的测试用例。
        * `chai`<sup>`推荐`</sup> 断言库。BDD（行为驱动开发）/TDD（测试驱动开发）风格，同时支持should，assert，expect。支持node端和web端
        * `should` 断言库。BDD风格
    * 客户端请求
        * `http.request()/http.get()` node原生
        * [request](https://github.com/request/request) 老牌客户端请求代理模块，包装原生Node的http.request,使得调用更加简单。
        * [superagent](https://github.com/visionmedia/superagent) <sup>`node端推荐`</sup>轻量级客户端请求代理模块。渐进式的ajax api，特色是链式调用以及json数据传递参数，支持Node和浏览器。
        * [got](https://github.com/sindresorhus/got) 轻量级，但也支持promise。
        * [axios](https://github.com/axios/axios)<sup>`web端推荐`</sup> 客户端请求代理模块。功能丰富，支持Promise，支持Node和浏览器。但Node端传递数据需要qs等第三方库进行数据stringfy，同时难以支持嵌套的对象数据，故在node端不推荐使用。
    * mongodb
        * `mongodb` mongodb驱动
        * `mongoose`<sup>`推荐`</sup> - 全能的 MongoDB ORM 库。底层使用mongodb Client

持续更新中...