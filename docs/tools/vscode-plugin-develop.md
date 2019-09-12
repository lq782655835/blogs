# VSCode插件开发实践

开发项目过程中，避免不了工具函数书写。当开发另外一个项目时，经常需要搜索项目，打开并找到对应工具函数拷贝。这种方式容易打断工作流程，而使用vscode插件可以在不离开IDE前提下，快速找到对应实用工具。

> 以下实践代码可到github [lq782655835/common -utils](https://github.com/lq782655835/common-utils)

## 开发插件

[官方开发插件教程](https://code.visualstudio.com/api/get-started/your-first-extension)

官方已经把插件模板集成到yeoman（类似cli工具）中，十分方便开发者开发新插件。安装工具和模版：
```
npm install -g yo generator-code
yo code // 生成模版
```

1. 生成模板后，最重要的是了解package.json，因为大部分设置都是在这设置。
``` js
{
    "name": "xxx", // 插件名称
    "displayName": "xxx", // 插件显示名称
    "description": "Air Quaility", // 插件描述
    "version": "0.0.1", // 插件版本
    "publisher": "beanleecode", // 插件发布者
    "icon": "logo.png", // 插件的icon，不支持svg，最小图片大小128*128
    ...
    "activationEvents": [ // 活动事件列表（哪些命令是激活的）
        "onCommand:extension.sayHello"
    ],
    "main": "./extension", // 代码书写主入口
    "contributes": {
        "commands": [ // 对应命令列表
            {
                "command": "extension.sayHello", // 命令名，必须与上面activationEvents一致
                "title": "Hello World" // 命令显示解释
            }
        ]
    }
}
```

2. 调试F5

就是这么简单。VSCode 会启动一个新窗口供测试，十分方便。

## 发布插件

[官方发布插件教程](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

发布过程都依赖`vsce`工具，这是一个npm包，安装十分便捷：
```
npm i vsce -g
```

### 发布方式
1. 直接把文件夹发给别人，让别人找到vscode的插件存放目录并放进去，然后重启vscode，一般不推荐；
1. 打包成vsix插件，然后发送给别人安装，如果你的插件涉及机密不方便发布到应用市场，可以尝试采用这种方式；
1. 注册开发者账号，发布到官网应用市场，这个发布和npm一样是不需要审核的。

## 本地打包方式
打包成vsix文件：
```
vsce package
```

> 当遇到全局安装了vsce，但vsce命令找不到，请检查是否使用了nvm等node管理工具，并切换到指定的node版本。

## 在线发布方式

1. 在[Visual Studio Team Services](https://account.microsoft.com/?lang=zh-CN&refd=account.live.com&refp=landing&mkt=ZH-CN) 创建一个账号
1. 创建token
    * 点击右上角的个人信息security，再点击create token
    * name随便填写，expires In最好选最长时间，`Accounts一定要选All accessible accounts`，Authorized Scopes选择 All Scopes。
    * create后会给你一个token值，它只显示一次，务必要保留，之后命令行操作会使用到。
1. 借助vsce工具上传到商店。
    1. `vsce create-publisher (name)` 创建publisher，这个步骤会让你填写name、email以及上步获得的token
    1. `vsce publish (version)` 发布到在线商店（依赖于上一步，已创建publisher并登录）

#### 注意事项
* 类似npm包，README.md文件默认会显示在插件主页；
* 增量发布可以修改package.json的version外，还可以使用代号：major/minor/patch，如：vsce publish patch