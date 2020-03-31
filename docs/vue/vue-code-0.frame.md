# Vue2.x源码分析 - 框架结构

> 看过Vue源码有一段时间了，对里面的研究也有一些心得。对于Vue源码分析文章，笔者以前不是很想写，因为网上有太多优质的Vue源码分析文章，笔者读源码时也受益于此。但思维的转变，发生在一次团队Code Review。笔者所在的团队主要使用Vue技术栈(团队小伙伴都是多面手，一专多能)，但有些小伙伴受限于业务开发，Vue停留在API使用层。所以笔者组织大家对Vue进行源码分析，各自分工并且每周Code Review分享给所有人，借此提升团队的工作效率，也形成一个良好的团队氛围。故以文字记录下来，一方面沉淀自己，另一方面也为团队code review做备忘录。

笔者认为，读源码需要从全局到局部，先了解整个源码的目录结构，懂得项目里有哪些内容，然后列举出来，再通过个人兴趣研究点，逐个攻破。比如通读Vue目录结构，里面有core/compile/weex/ssr等，再提取出研究的web核心：双向数据绑定/组件系统/事件/生命周期/ast编译/vnode等。读源码切忌一行一行分析，这样容易陷入局部思考，也容易有挫折感。源码也不是只读一遍就能理解，所以需要反复回溯，细细思考。

源码分析顺序：

* 目录结构
* 核心内容
* 重点突破
* 回归溯源

## 目录结构

思维导图可以清晰的了解到全局内容。看目录结构，除去build打包，类型定义以及ssr/weex，能了解到我们研究的核心就`compiler、core、platforms.web`三个文件夹。

![image](https://user-images.githubusercontent.com/6310131/45196761-6daeb100-b290-11e8-89fd-31e965e1fcee.png)

## 核心内容

主要是Vue的几个核心：数据驱动、响应式原理、组件化、vdom diff算法等

![image](https://user-images.githubusercontent.com/6310131/45197180-85873480-b292-11e8-909d-37cc2dbdc5b2.png)

![image](https://user-images.githubusercontent.com/6310131/77979977-b3324380-7338-11ea-8145-bda4e4e25612.png)

![image](https://user-images.githubusercontent.com/6310131/77980169-36539980-7339-11ea-9219-857173dfe334.png)

![image](https://user-images.githubusercontent.com/6310131/77980253-6dc24600-7339-11ea-9ae8-c4c505936f3b.png)

![image](https://user-images.githubusercontent.com/6310131/77980772-b62e3380-733a-11ea-824c-ce45ce0df9c1.png)

## 整体流程

下图整理了vue初始化流程以及代码流转，建议配合[Vue.js技术揭秘](https://ustbhuangyi.github.io/vue-analysis/prepare/entrance.html#vue-%E7%9A%84%E5%85%A5%E5%8F%A3)文章去了解。

![image](https://user-images.githubusercontent.com/6310131/45197312-1231f280-b293-11e8-83e0-93c4844924c9.png)

## Debug Vue源码

单纯看代码，特别是一些复杂逻辑时，容易绕进去，使得源码阅读效率降低。而debug源码能很好的知道关键地方的输入和输出，加快理解源码的速度。这里笔者也建议clone Vue源码后，设置以下debug设置，从而更好的调试源码。

### Chrome调试

1. 在配置文件scripts/config.js中，增加`sourceMap: true`。这样最终生成的dist/vue.js打包文件会带上源码的路径。

2. 修改源码examples文件夹中案例，把引用的Vue包路径`改为“dist/vue.js”`

### VSCode调试

在VSCode编辑器内，调试源码更方便。VSCode基本设置以及参数说明在笔者另外一篇博文[Debug fro VSCode](../node/node-vscode-debug.md)有详细说明。如下给出最终vscode调试设置：

``` js
{
    "version": "0.2.0",
    "configurations": [
      {
        "type": "chrome",
        "request": "launch",
        "name": "Launch Chrome",
        "url": "file:///project-path/vue/examples/commits/index.html", // 这里的project-path是你电脑上的根路径
        "webRoot": "${workspaceFolder}/examples/commits/index.html"
      }
    ]
}

```