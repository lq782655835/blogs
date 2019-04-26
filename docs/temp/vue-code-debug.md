# Debugger Vue源码


## Chrome调试

1. 增加sourceMap
2. 修改url路径“vue.js”

## VSCode调试
* vscode中设置

``` js
{
    "version": "0.2.0",
    "configurations": [
      {
        "type": "chrome",
        "request": "launch",
        "name": "Launch Chrome",
        "url": "file:///project-path/vue/examples/commits/index.html",
        "webRoot": "${workspaceFolder}/examples/commits/index.html"
      }
    ]
}

```