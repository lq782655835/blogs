# Electron踩坑记录

> 最近公司有个新产品线，需要将应用打包成客户端，提供私有化部署。考虑到Web线上已经实现大部分需求，技术选型时使用Electron。本文不是帮助读者的扫盲文，只是记录下项目工程中遇到的坑，所以阅读本文需要web和electron知识。

应产品要求，私有化部署主要考虑windows端，mac端其次。框架选型使用[electron-vue](https://github.com/SimulatedGREG/electron-vue)脚手架(这里也强烈推荐)，该脚手架包含Vue技术栈单页应用 + electron + 打包完整流程。内置Vuex，Vue-Router，Webpack，electron-builder等。下面的大部分实践[源码放在这](https://github.com/lq782655835/electron-vue-template)

## 1. 自定义标题栏

这应该是每一个使用electron实现web客户端都会遇到的问题，使用原生的外边框，第一太丑，第二也不统一。

解决方案：frame + css drag

`frame: false`: 主进程中设置窗体参数。去掉默认的标题栏

`-webkit-app-region: drag`: 渲染进程中设置css。对应的组件可以进行拖动了

![image](https://user-images.githubusercontent.com/6310131/44986573-c9d6b400-afb6-11e8-87e0-b79ea1954717.png)

![image](https://user-images.githubusercontent.com/6310131/44987282-4a96af80-afb9-11e8-91eb-aac703e9944d.png)



## 2. 标题栏按钮无效  -- only windows

该bug只在windows平台上显示，mac上正常。在header组件中设置为drag，导致组件里的元素都无法点击。

解决方案：在需要点击的元素上添加no-drag。`-webkit-app-region: no-drag;`详细看此[issue](https://github.com/electron/electron/issues/1354)

## 3. 自定义标题栏无法实现css hover -- only windows

当设置了为drag时，在windows上会屏蔽所有的鼠标事件,所以hover不起作用。这是一个由操作系统导致的问题，故无法修复，相关[issue](https://github.com/electron/electron/issues/13534)。

解决方案：去掉`-webkit-app-region: drag;`即可。

> 如果要同时保留可拖动并且hover上有变化，在windows暂时无法实现，需要对此进行取舍或改变交互设计。

## 4. 打包后程序调试

electron-vue在开发环境默认启用electron-debug插件开启调试。但打包完成，交付到测试同学手里，需要在错误的时候打开开发者工具定位问题。

解决方案：通过注册快捷键，调开web的开发者模式。

![image](https://user-images.githubusercontent.com/6310131/45282618-fede8b80-b50d-11e8-8e7e-f172325a10f7.png)

## 5. 文本不可选择

既然作为客户端，就应该像个客户端程序，不能对展示型的文本进行用户选择。

解决方案：使用css `-webkit-user-select: none;`

![image](https://user-images.githubusercontent.com/6310131/44989743-7158e400-afc1-11e8-804a-c085008d0857.png)

## 6. 打包参数设置

electron应用需要进行打包，变成exe可执行文件给用户。推荐使用最新的electron-builder进行打包（electron-vue脚手架中有提供该选项）。这里对常用的设置进行说明

``` json
scripts: {
    /** 打包成windows系统 **/
    "build": "node .electron-vue/build.js && electron-builder --win",
    /** 打包成macos系统 **/
    "build:mac": "node .electron-vue/build.js && electron-builder --mac",
},
"build": {
    /** 最终可执行文件名称：${productName}-${version}.${ext} **/
    "productName": "sight-electron-app",
    "appId": "netease.sight.controller",
    /** 压缩形式，默认normal;store打包最快，适合测试;maximum打包体积最小，适合生产模式 **/
    "compression": "maximum",
    /** 是否将多个文件合并为tar风格的归档模式 **/
    "asar": true,
    "directories": {
      "output": "build"  /** 打包结果目标地址 **/
    },
    "files": [
      "dist/electron/**/*" /** 需要打包的文件地址 **/
    ],
    /** 不同平台设置 **/
    "mac": {
      "icon": "build/icons/icon.icns"
    },
    "win": {
      "icon": "build/icons/icon.ico"
    },
    "linux": {
      "icon": "build/icons"
    }
}
```
## 7. 触摸板放大缩小 -- only mac

在macOS系统中，触摸板的放大缩小手指指令，会导致electron程序内的webFrame内容也跟着放大缩小。

解决方案：在renderer进程中设置其缩放范围`require('electron').webFrame.setZoomLevelLimits(1, 1)`

## 8. web端唤起本地客户端

electron提供该API能力：`app.setAsDefaultProtocolClient(protocol[, path, args])`

## 9. 禁止多开窗口

多次双击window 的exe文件，会开启多个窗口；mac下默认开1个，但通过命令还是可以多开。

解决方案：判断单实例：`app.makeSingleInstance(callback)`

![image](https://user-images.githubusercontent.com/6310131/45280209-144fb780-b506-11e8-8338-a9b399ad24fb.png)


## 10. 网络状态检测

客户端经常遇见断网情况处理，当网络断开时需要给用户提示，当网络连接时继续服务。通常web情况下是采取`轮询`服务器方式，但这种方式比较消耗服务器性能。这里可以利用electron的node工具包`public-ip`进行判断。public-ip查询dns获取公网ip地址，如果能拿到值表示联网正常。本来到此可以很好的解决，但产品要求的客户端，<b>既要提供公共部署，也需要进行无外网情况下的私有化部署</b>。

解决方案：`public-ip + 轮询`方式。优先进行公网IP查询，如果成立则返回网络状态良好，如果查询不到再进行服务器心跳检查。实现方式参考[is-online](https://github.com/sindresorhus/is-online)


## 11. 自动更新

支持mac和windows，mac下需要签名。待更

## 12. 日志监听

待更

最后，附上@changkun的electron深度总结思维导图

![](https://changkun.us/images/posts/217/mind.png)
   