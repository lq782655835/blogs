# 官网脚手架思考与实践

>一个项目从0到1过程中，首先一个难点是完成项目框架搭建，每次新建项目花大部分时间在配置上。所以可以在这方面做一些有益团队的工作。本文从官网项目角度思考，借助vue-cli工具，整理实践出本脚手架，[代码见这里](https://github.com/lq782655835/official-website-template)。

思考内容：

- 官网技术选型

- 项目目录结构

- 代码规范约束

- 官网组件库思考

## 1. 官网技术选型

笔者部门前端主要使用Vue技术栈，本脚手架选型时依然选择Vue作为基础。考虑到官网需要在搜索引擎中提高曝光率，所以`SEO特性`必须添加。本脚手架使用Vue官方推荐的SSR集成解决方案[Nuxt](https://nuxtjs.org/)作为项目基础。使用本脚手架开发，需要提前学习Nuxt相关知识。

## 2. 目录结构

做一个好的脚手架，需要思考`项目结构合理性`。好的结构让开发者迅速定位，并且代码分明别类，干净整洁。这里基于Nuxt架构的layout，pages，store，plugins结构，加入scss，img，svg，components，api结构(存放结构不一定在同一级)，丰富官网必备内容。

- `layout/pages/store/plugins`: nuxt框架结构，十分好用
- `scss`: 设置css格局。通过[sass-resources-loader](https://github.com/shakacode/sass-resources-loader)更方便操作scss的变量和mixin,所有页面默认引入，不需要额外@import
- `img/svg`: 官网有大量本地图片，有png，gif，jpg以及特殊的svg，有些图片有点击事件，有些站外链接，有些站内链接。这里定义他们的存放位置，一个原因使得结构清晰，更重要的是能将所有本地图片合成一个icon组件，方便统一调用。
- `components`: 基础组件和页面组件，都是轻量级文件。u-link/u-icon等做了重点优化，具体看下章节。
- `api`: 官网相对请求较少，但基本都会有接口调用，故统一放api.js中。本脚手架也使用`async/await`语法糖，帮助解决‘回调地狱’。

```
|-- official-website-template
    |-- nuxt.config.js                   -- nuxt配置
    |-- package.json                     -- 项目依赖以及npm脚本
    |-- assets
    |   |-- css                          -- scss
    |   |   |-- global.scss              -- 全局css
    |   |   |-- reset.scss               -- reset css
    |   |   |-- variables.scss           -- 全局scss变量或mixin
    |   |-- img                          -- 图片存放，icon组件会默认找到该文件夹
    |   |-- svg                          -- svg存放，icon组件会默认找到该文件夹
    |-- components                       -- 组件
    |   |-- u-footer.vue                 -- 页尾布局占位
    |   |-- u-header.vue                 -- 页头导航占位
    |   |-- common                       -- 全局Vue组件，该文件夹下的组件自动导入，文件名为组件名
    |   |   |-- u-banner.vue             -- 轮播组件
    |   |   |-- u-button.vue
    |   |   |-- u-icon.vue               -- 提供快捷本地图片访问
    |   |   |-- u-input.vue
    |   |   |-- u-link.vue               -- 统一站内/站外导航组件
    |   |   |-- u-modal.vue
    |   |   |-- u-section.vue
    |   |   |-- u-select-option.vue
    |   |   |-- u-select.vue
    |   |   |-- u-tab.vue
    |   |   |-- u-tabs.vue
    |   |-- index                        -- 页面逻辑组件
    |-- layouts                          -- Nuxt结构，全局模板
    |   |-- default.vue
    |-- pages                            -- Nuxt结构，页面路由route
    |   |-- index.vue
    |-- plugins                          -- Nuxt结构，插件
    |   |-- third.js                     -- 第三方插件导入
    |   |-- vue-global.js                -- vue全局导入
    |-- static                           -- Nuxt结构，静态文件
    |   |-- favicon.ico
    |-- store                            -- Nuxt结构，Vuex
    |   |-- index.js
    |-- utils                            -- 工具库
        |-- api.js                       -- api层
        |-- http.js                      -- 基础http请求
```

## 3. 代码规范约束

这里包括开发规范配置以及提交规范配置。统一的团队代码规范十分重要，可以使得大家代码都一致，同时减少出错。通过一些工具，将代码规范整合在本脚手架中。详细内容可以看笔者相关文章[eslint + stylelint + prettier + husky团队规范](https://github.com/lq782655835/blogs/issues/8)

- `prettier`: 对所有代码统一格式化，使得代码看上去干净整洁。
- `eslint`和`stylelint`: 对js及css做规则约束，防止出现语法方面错误。
- `husky`: 对提交的代码验证，不通过则不允许提交到远程仓库，保证了git仓库的整洁。

## 4. 官网组件库思考

每个项目都需要用到组件库，特别是后台管理类系统，一个好的组件库能让效率提高很多。但目前市场上的大部分组件库，设计的时候就主打大而全，这就造成改动其中的逻辑或样式十分困难。笔者从官网业务角度思考，常用的组件库就link，button，icon，input，select等几个组件，而且不同官网项目，样式差别较大，样式修改不可避免。所以本脚手架封装常用的组件，都是轻量级单文件，修改十分方便。

### u-link

SPA应用有站内链接(router-link)和站外链接(a)，该组件针对此进行统一。同时该组件也是button，icon组件的基础

```html
<u-link to="/demo">站内链接</u-link>
<u-link href="https://www.baidu.com" target="_blank">站外链接</u-link>
```

### u-button

官网中最常用组件之一。该组件除常规支持颜色大小设置，应该也支持link导航功能。

``` html
<u-button size='s' color='primary' @click="test">Button组件</u-button>
<u-button size='s' color='primary' href="https://www.baidu.com" target="_blank">Button组件</u-button>
```

### u-icon

在官网中，经常会使用到视觉给出的图片或者线上图片地址。图片种类也很丰富，有svg，png，gif等，另外图片有站内链接，站外链接或不链接。所以很有必要对图片做统一处理。

``` html
<u-icon name="close" scale="4" href="https://www.baidu.com" />
<u-icon src="test.png" />
<u-icon src="https://www.baidu.com/pics/1" />
```

### u-input/u-select/u-modal/u-tab/...

常用组件，都是轻量级，略。