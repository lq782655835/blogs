(window.webpackJsonp=window.webpackJsonp||[]).push([[217],{535:function(t,s,a){"use strict";a.r(s);var n=a(1),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vue-music-webapp项目分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-music-webapp项目分析","aria-hidden":"true"}},[t._v("#")]),t._v(" vue-music-webapp项目分析")]),t._v(" "),a("p",[t._v("讲述webapp的技术点")]),t._v(" "),a("p",[t._v("源码：https://github.com/caijinyc/vue-music-webapp")]),t._v(" "),a("h2",{attrs:{id:"_1-插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-插件","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 插件")]),t._v(" "),a("ul",[a("li",[t._v("fastclick 消除 click 移动游览器 300ms 的延")]),t._v(" "),a("li",[t._v("vue-lazyload 图片懒加载")]),t._v(" "),a("li",[a("a",{attrs:{href:""}},[t._v("better-scroll")])])]),t._v(" "),a("h4",{attrs:{id:"better-scroll"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#better-scroll","aria-hidden":"true"}},[t._v("#")]),t._v(" better-scroll")]),t._v(" "),a("p",[t._v("基于iscroll，主要是模拟回弹、顺滑滚动等特性，有更好的用户体验，移动端滑动必备。原生的css scroll太生硬，没有回弹、快滑后自动再滑动一点等特性。")]),t._v(" "),a("p",[t._v("better-scroll封装的vue组件（避免跟业务强耦合）：https://github.com/caijinyc/vue-music-webapp/blob/master/src/base/scroll/scroll.vue")]),t._v(" "),a("h2",{attrs:{id:"_2-页面router"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-页面router","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 页面router")]),t._v(" "),a("blockquote",[a("p",[t._v("路由如何设置？")])]),t._v(" "),a("p",[t._v("主页面是recommend，查询页面query，用户页面user,都是路由一级页面。"),a("code",[t._v("recommend页面有全局的头 + 推荐 && router-view + 尾部。默认情况下router-view没有东西，为空，页面不展示。")])]),t._v(" "),a("p",[t._v("recommend/id路由是覆盖在一级页面的router-view，此时展示。同时整个页面position:fixed；top: 0;z-index: 1000的方式，占据页面的最上层（下层被遮挡住了），以此获得路由跳页时，头部变化而底部不变。")]),t._v(" "),a("blockquote",[a("p",[t._v("大量使用position: fixed;")])]),t._v(" "),a("h2",{attrs:{id:"_3-滚动过程中title-透明度变化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-滚动过程中title-透明度变化","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. "),a("a",{attrs:{href:"https://github.com/caijinyc/vue-music-webapp/blob/master/src/components/music-list/music-list.vue#L148",target:"_blank",rel:"noopener noreferrer"}},[t._v("滚动过程中title/透明度变化"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("better-scroll抛出scroll事件，从而可以监听scroll下滑到某些地方时，改变css。")]),t._v(" "),a("h2",{attrs:{id:"_4-vue-切换动画"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-vue-切换动画","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. vue 切换动画")]),t._v(" "),a("p",[t._v("页面切换可以统一放在<transition><route-view/></transition>中，也可以在每个页面单独设置，如下：")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<transition name="slide">\n    doing\n</transition>\n\n.slide-enter-active, .slide-leave-active')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("transition")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" all 0.2s\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".slide-enter, .slide-leave-to")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*页面离开时，x:0-30%，进入时，x:30%-0*/")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("translate3d")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("30%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"_5-业务组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-业务组件","aria-hidden":"true"}},[t._v("#")]),t._v(" 5. 业务组件")]),t._v(" "),a("h3",{attrs:{id:"字母快捷组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字母快捷组件","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://github.com/caijinyc/vue-music-webapp/blob/master/src/base/listview/listview.vue#L72",target:"_blank",rel:"noopener noreferrer"}},[t._v("字母快捷组件"),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"list-shortcut"')]),t._v(" @touchstart"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"onShortcutStart"')]),t._v("\n@touchmove"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("stop"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prevent"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"onShortcutMove"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    list\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("onShortcutStart")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取字母对应的index")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" anchorIndex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getDataByAttr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'index'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 存储中间数据，move时计算最终定位的index")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" firstTouch "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touches"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("y1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" firstTouch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pageY\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("anchorIndex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" anchorIndex\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_scrollTo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("anchorIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导航定位")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("onShortcutMove")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 起始位置为anchorIndex")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 计算移动的格数delta")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 最终定位的index = anchorIndex + delta")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" firshTouch "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touches"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("y2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" firshTouch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pageY\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" delta "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("y2 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("y1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ANCHOR_HEIGHT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" anchorIndex "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("touch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("anchorIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" delta\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_scrollTo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("anchorIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_scrollTo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// better-scroll api")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("listview"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scrollToElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("listGroup"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"slider"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#slider","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://github.com/caijinyc/vue-music-webapp/blob/master/src/base/slider/slider.vue",target:"_blank",rel:"noopener noreferrer"}},[t._v("slider"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("首页滚动组件")]),t._v(" "),a("h2",{attrs:{id:"_6-css"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-css","aria-hidden":"true"}},[t._v("#")]),t._v(" 6. "),a("a",{attrs:{href:"https://github.com/caijinyc/vue-music-webapp/blob/master/src/components/music-list/music-list.vue",target:"_blank",rel:"noopener noreferrer"}},[t._v("css"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"_1-图片高度百分比"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-图片高度百分比","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 图片高度百分比")]),t._v(" "),a("p",[t._v("当用百分比作为宽高时  因为百分比是相对于其最近的父元素的宽高，所以首先其父元素要有宽高，宽度一般不设置会有默认值(比如整个屏幕的宽度)，但是高度不设置就没有默认值，因此如果父元素没设高度值，而其内部元素用了百分比作为高度时，是没有效果的。")]),t._v(" "),a("p",[t._v("通过padding-top即可解决：")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<div class="bg-image">\n</div>\n.bg-image')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("http://p1.music.126.net/xxx.jpg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" cover"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 容器内等比缩小 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("padding-top")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 75%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 图片高度的75% */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0 30%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* y=0，从上到下显示75%，y=100，显示下面75%*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-border内容向上遮住一点图片"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-border内容向上遮住一点图片","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. border内容向上遮住一点图片")]),t._v(" "),a("p",[t._v("通过relative + top-20，可以位置整体上移。")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<div class="bg-image"/>\n<div class="list"/>\n.list')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" relative"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("top")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" -20px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 向上一点点 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_3-绝对位置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-绝对位置","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 绝对位置")]),t._v(" "),a("p",[t._v("利用父padding-top负数 + 子元素absolute，制造绝对空间")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<div class="list">\n    <div class="no-flow"></div>\n    <div class="normal"></div>\n</div>\n.list')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" relative"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("padding-top")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 40px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 上部空出来40px */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".no-flow")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" absolute"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* absolute不占据文档流 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("top")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 空出来的40这里可以使用 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 40px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 配合flex布局 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" flex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("align-items")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" center"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_4-image转动"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-image转动","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. "),a("a",{attrs:{href:"https://github.com/caijinyc/vue-music-webapp/blob/master/src/components/player/player.vue#L74",target:"_blank",rel:"noopener noreferrer"}},[t._v("image转动"),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<img width="40" height="40" class="play pause" src="http://p1.music.126.net/xxx.jpg">\n.play')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("border-radius")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 50%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*圆型图片*/")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" rotate 10s linear infinite"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*自动滚动动画*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".pause")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation-play-state")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" paused"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 暂停动画 */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@keyframes")]),t._v(" rotate")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("0%")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rotate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("100%")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rotate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("360deg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_5-毛玻璃效果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-毛玻璃效果","aria-hidden":"true"}},[t._v("#")]),t._v(" 5. "),a("a",{attrs:{href:"https://github.com/caijinyc/vue-music-webapp/blob/master/src/components/player/player.vue#L5",target:"_blank",rel:"noopener noreferrer"}},[t._v("毛玻璃效果"),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<div class="bg">\n    <div class="filter"/>\n    <img width="100%" height="100%" src="xxx.jpg" />\n<div>\n.bg')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" absolute"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*不在文档流中，关键*/")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* blur毛玻璃 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" .6"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("filter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("blur")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("30px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 取中间一点位置的，不然blur边界太亮 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("left")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" -50%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("top")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" -50%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* width/height都设置大一点 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 300%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 300%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".filter")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" absolute"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*再加一层遮罩，隔离下img图片太亮*/")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #000"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" .6"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h1",{attrs:{id:"vue-sell"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-sell","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://github.com/ustbhuangyi/vue-sell",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue-sell"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"_1-vue-create-api插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-vue-create-api插件","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. "),a("a",{attrs:{href:""}},[t._v("vue-create-api")]),t._v("插件")]),t._v(" "),a("h2",{attrs:{id:"_2-postcss-px2rem"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-postcss-px2rem","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. postcss-px2rem")]),t._v(" "),a("p",[t._v("postcss 的插件 postcss-px2rem 作为将 px 转换为 rem 的库")]),t._v(" "),a("h2",{attrs:{id:"_3-touchmove-stop-prevent"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-touchmove-stop-prevent","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. @touchmove.stop.prevent")]),t._v(" "),a("h2",{attrs:{id:"_4-css"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-css","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. css")]),t._v(" "),a("h3",{attrs:{id:"毛玻璃"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#毛玻璃","aria-hidden":"true"}},[t._v("#")]),t._v(" 毛玻璃")]),t._v(" "),a("p",[t._v("移动端毛玻璃效果，从chrome76开始自带支持：https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<div class="filter" />\n.filter')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("backdrop-filter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("blur")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("10px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* 关键 */")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rgba")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("7"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("17"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("27"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(".8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" #fff"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" fixed"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("top")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("left")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("opacity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("overflow")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" auto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("z-index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"flex"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flex","aria-hidden":"true"}},[t._v("#")]),t._v(" flex")]),t._v(" "),a("ul",[a("li",[t._v("container\n"),a("ul",[a("li",[a("code",[t._v("display")]),t._v(": flex;")]),t._v(" "),a("li",[a("code",[t._v("flex-direction")]),t._v(": row/column;决定主轴的方向")]),t._v(" "),a("li",[a("code",[t._v("justify-content")]),t._v(": center;主轴上的对齐方式")]),t._v(" "),a("li",[a("code",[t._v("align-items")]),t._v(": center;交叉轴上如何对齐")])])]),t._v(" "),a("li",[t._v("子项：\n"),a("ul",[a("li",[a("code",[t._v("flex-basis")]),t._v(": 130px;项目占据的主轴空间.默认auto。当与width设置相同值时，占据固定空间。")]),t._v(" "),a("li",[a("code",[t._v("flex")]),t._v(": none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]\n"),a("ul",[a("li",[t._v("auto (1 1 auto)")]),t._v(" "),a("li",[t._v("none (0 0 auto)")]),t._v(" "),a("li",[t._v("flex: 0 0 130px;")])])])])])])])},[],!1,null,null,null);s.default=e.exports}}]);