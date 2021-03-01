(window.webpackJsonp=window.webpackJsonp||[]).push([[171],{490:function(a,t,e){"use strict";e.r(t);var s=e(1),r=Object(s.a)({},function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"jumpter-lab"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jumpter-lab","aria-hidden":"true"}},[a._v("#")]),a._v(" jumpter lab")]),a._v(" "),e("h2",{attrs:{id:"_1-安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装","aria-hidden":"true"}},[a._v("#")]),a._v(" 1. 安装")]),a._v(" "),e("h3",{attrs:{id:"一-安装conda-推荐"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一-安装conda-推荐","aria-hidden":"true"}},[a._v("#")]),a._v(" 一：安装conda（推荐）")]),a._v(" "),e("p",[a._v("conda隔离环境作用（有点类似虚拟机）。")]),a._v(" "),e("ul",[e("li",[a._v("记住安装位置")]),a._v(" "),e("li",[a._v("把conda命令放在zsh中。")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("# 创建虚拟环境并下载jupyterlab cookiecutter nodejs git。\nconda create -n jupyterlab-ext --override-channels --strict-channel-priority -c conda-forge -c anaconda jupyterlab cookiecutter nodejs git\n\n# 激活虚拟环境\n# 此时安装的jupyterlab是在其env环境内，使用which pip命令就理解了\nconda activate jupyterlab-ext\n")])])]),e("h3",{attrs:{id:"二-或者直接安装jupyterlab"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二-或者直接安装jupyterlab","aria-hidden":"true"}},[a._v("#")]),a._v(" 二：或者直接安装jupyterlab")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("pip install jupyterlab cookiecutter\n")])])]),e("blockquote",[e("p",[a._v("使用conda虚拟环境时，以下所有的操作都要执行"),e("code",[a._v("conda activate jupyterlab-ext")]),a._v("以后")])]),a._v(" "),e("h2",{attrs:{id:"_2-启动jupyterlab"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-启动jupyterlab","aria-hidden":"true"}},[a._v("#")]),a._v(" 2. 启动jupyterlab")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("jupyter lab "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 开启jupyter lab")]),a._v("\njupyter lab build "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 手动编译application。当完成插件修改时，手动build可以自动install 所有插件")]),a._v("\n")])])]),e("h2",{attrs:{id:"_3-插件开发"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-插件开发","aria-hidden":"true"}},[a._v("#")]),a._v(" 3. 插件开发")]),a._v(" "),e("h3",{attrs:{id:"下载模板代码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#下载模板代码","aria-hidden":"true"}},[a._v("#")]),a._v(" 下载模板代码")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("# cookiecutter工具下载\ncookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts --checkout v1.0\n\ncd jupyterlab_apod\n\n# 初始项目依赖并构建项目\njlpm install\njupyter labextension install . # 插件安装到jupyterlab工具上\n")])])]),e("h3",{attrs:{id:"jupyter插件应用到jupyterlab上"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jupyter插件应用到jupyterlab上","aria-hidden":"true"}},[a._v("#")]),a._v(" jupyter插件应用到jupyterlab上")]),a._v(" "),e("p",[a._v("https://jupyterlab.readthedocs.io/en/stable/user/extensions.html")]),a._v(" "),e("p",[a._v("类似于npm插件：")]),a._v(" "),e("ul",[e("li",[a._v("install 安装没带--no-build时，会重启lab进程；")]),a._v(" "),e("li",[a._v("install支持多个package一起安装")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("jupyter labextension list "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 已安装的list")]),a._v("\n\njupyter labextension "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" my-extension "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# npm包(安装后自动会编译application)")]),a._v("\njupyter labextension "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(".")]),a._v(" --no-build "),e("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 安装本地包,同时不编译application")]),a._v("\n\njupyter labextension uninstall my-extension\n")])])]),e("h2",{attrs:{id:"参考"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考","aria-hidden":"true"}},[a._v("#")]),a._v(" 参考")]),a._v(" "),e("p",[a._v("https://juejin.im/post/5dc2658d6fb9a04a6d7f1e0d")])])},[],!1,null,null,null);t.default=r.exports}}]);