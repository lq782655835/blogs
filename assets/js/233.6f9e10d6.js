(window.webpackJsonp=window.webpackJsonp||[]).push([[233],{738:function(s,e,a){"use strict";a.r(e);var r=a(9),t=Object(r.a)({},(function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"webpack反编译代码工具reverse-sourcemap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webpack反编译代码工具reverse-sourcemap"}},[s._v("#")]),s._v(" webpack反编译代码工具reverse-sourcemap")]),s._v(" "),a("p",[s._v("github 地址：https://github.com/davidkevork/reverse-sourcemap")]),s._v(" "),a("h2",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --global reverse-sourcemap\n")])])]),a("h2",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[s._v("#")]),s._v(" 使用")]),s._v(" "),a("p",[s._v("前置条件，已有webpack打包生成的dist文件（主要是js文件反编译）以及开启sourcemap（生成xxx.js.map文件）")]),s._v(" "),a("p",[s._v("直接把整个"),a("code",[s._v("dist/js")]),s._v("目录自动反编译解析：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("reverse-sourcemap dist/js -o sourcecode\n")])])]),a("p",[s._v("解释：以上命令直接解析dist/js中所有的xxx.map.js文件，并把源代码输出到当前路径到sourcecode文件夹中。")]),s._v(" "),a("h2",{attrs:{id:"源码解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#源码解析"}},[s._v("#")]),s._v(" 源码解析")]),s._v(" "),a("p",[s._v("本质上reverse-sourcemap工具，只是"),a("a",{attrs:{href:"https://github.com/mozilla/source-map",target:"_blank",rel:"noopener noreferrer"}},[s._v("source-map"),a("OutboundLink")],1),s._v("库的包装。")]),s._v(" "),a("h3",{attrs:{id:"source-map库源码解析规则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#source-map库源码解析规则"}},[s._v("#")]),s._v(" source-map库源码解析规则")]),s._v(" "),a("p",[s._v("源码地址：https://github.com/mozilla/source-map/blob/master/lib/source-map-consumer.js#L173")]),s._v(" "),a("ol",[a("li",[s._v("先找到sources关键字：里面存放了模块的文件路径（相当于书的目录）")]),s._v(" "),a("li",[s._v("再找sourcesContent关键字：里面存放了所有文件的源码（书的实体内容）")]),s._v(" "),a("li",[s._v("提供api：sourceContentFor(source)，根据文件路径，拿到具体的源码（根据目录，直接找到章节内容）")])])])}),[],!1,null,null,null);e.default=t.exports}}]);