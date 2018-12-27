# 解决方案

[git 配置多个SSH-Key](https://my.oschina.net/stefanzhlg/blog/529403)

[使用Visual Studio Code对Node.js进行断点调试](https://segmentfault.com/a/1190000009084576)

iframe刷新，单页应用保持当前路由 - `sessionStorage`

pc兼容性，safari底部莫名有个横条 - 禁用/卸载`迅雷`插件

npm查看全局安装过的包 - `npm list -g --depth 0`

npm管理员彻底删除包 - `npm unpublish <package-name> --force`

svg-icon - css能控制svg颜色等，但内部fill属性优先级大于外层fill或css属性

跳页锚点 - 考虑兼容性，使用`隐藏的a标签作为暗锚`即可

长文字只能控制在n行内 - [vue-clamp](https://github.com/Justineo/vue-clamp),原理使用`Element.getClientRects()`这个API

span包含长文字不换行 - 块级元素自动换行，内联元素分两种：`全英文内联元素不会自动换行`，包含中文过长会换行

node中客户端http请求库选择 - 建议选择`superagent`,支持链式调用以及post json数据解析。node环境中不建议axios，因为axios请求需要qs等第三方库进行post数据stringfy，而且不支持发送嵌套的object数据。