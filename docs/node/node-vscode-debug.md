# Node Debug for VSCode

调试对于任何一门语言都是及其重要的。好的调试工具能让人更有效率的开发以及查错。Node没有chrome developer tool这样的Web可视化集成调试工具，但VSCode默认集成了TS、Git、Debug等实用工具，而且使用非常方便。VSCode的插件生态，也让VSCode变成前端开发必备的利器。以下介绍VSCode下的Node调试。

## 基本用法

1. 进入VScode界面，点击界面左边的第四个类似虫子的按钮，进入调试界面：
![](https://segmentfault.com/img/bVMhsN?w=640&h=342)
2. 点击页面上方“没有配置”下拉菜单，选择“添加配置”。
![](https://segmentfault.com/img/bVMhsO?w=640&h=571)
3. 选择Node.js环境。
![](https://segmentfault.com/img/bVMhsP?w=640&h=107)
4. 选择完成之后，在项目的根目录中会生成一个.vscode的目录，这个目录中存放了各种各样的VScode编辑器的配置。VSCode根据你选择的环境，生成了对应的`配置文件lanuch.json`。Node内容如下：
``` json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/node/http.js" // 调试路径入口,需要根据自己项目进行配置
        }
    ]
}
```
5. 设置断点，点击开始调试按钮（绿色三角形），就可以开始调试。

## 调试参数配置
lanuch.json配置项较多，可查看[官方文档](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)详细了解。VSCode也集成了一些常用的调试配置片段，有Node、Chrome、Electron、Gulp等。以下说明几个重要参数：
* `name`: 给该配置项取个名字
* `type`: 通常有node、chrome等参数
* `request`: launch/attach
    * launch模式，**由 vscode 来启动**一个独立的具有 debug 模式的程序
    * attach模式，是连接**已经启动的服务**。比如已经在外面将项目启动，突然需要调试，不需要关掉已经启动的项目再去vscode中重新启动，只要以attach的模式启动，vscode可以连接到已经启动的服务。
* `program`: debug node入口文件的绝对路径。只在launch模式有效
* `runtimeExecutable`: 执行器的绝对路径，默认是node。只在launch模式有效
* `runtimeArgs`: 执行器参数。只在launch模式有效

## debug使用npm启动

以上Node调试方式有个问题，每次文件入口修改都需要改动lanuch.json配置文件。我们的方法是可以使用让npm script充当入口，让改动变成在package.json中。

以上需要改造两步：
1. 修改lanuch.json配置成npm命令方式：
``` json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via NPM",
            "runtimeExecutable": "npm", // npm 执行器。使用npm script方式作为入口
            "runtimeArgs": [
                "run-script",
                "start:debug"
            ],
            "port": 5858 // 调试的端口指定，attach时用到
        }
    ]
}
```
2. 修改package.json的scripts配置
``` json
{
    // 注意：需要配置上--inspect-brk=5858以attach到debugger
    "start:debug": "nodemon --inspect-brk=5858 node/http.js"
}
```

## 参考文章

* [nodejs-debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

* [使用Visual Studio Code对Node.js进行断点调试](https://segmentfault.com/a/1190000009084576)

* [What is the proper way to debug an npm script using vscode?
](https://stackoverflow.com/questions/43210203/what-is-the-proper-way-to-debug-an-npm-script-using-vscode)