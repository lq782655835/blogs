# 记一次npm升级最新包过程

## 问题：
node以前版本是8.6.0，匹配的npm是5.4。npm全局安装包目录会在`/usr/local/Cellar/node/`，生成command命令会软链到`/usr/local/bin`(这也是~/.ssh/.zshrc里指定的命令查询路径，所以可以不输入完整路径即可找到)。

但有次macOS系统升级了，node版本也自动升级到v13.6版本了，所以导致npm install -g vusion会把vusion包放在新的node@v13.6包下的node_modules位置。不会覆盖以前node@v5.4目录下安装的vusion。

但npm没有对应的升级。

## 分析

使用某个版本（@version）的node时，执行npm install -g，会把包放在/usr/local/Cellar/node/@verson/lib/node_modules下，同时生成软链接到`/usr/local/bin`。
当切换node版本时，再想升级以前的包，就找不到对应位置了，所以此时要想升级vusion包，只能先删除以前的，再到新的node环境新建个新的。


## 解决方案

首先要升级npm，这是必需的。因为node已经为新的了，npm最好升级下。

把以前的vusion包以及软链接删除，再在新的node下安装新的vusion包以及软链。

1. 切换到指定的node@13.6，升级npm：（node都升级了，npm最好也升级下）
```
sudo npm install -g npm
```
2. 删除老版本vusion包以及对应软链接。
```
rm -rf /usr/local/bin/vusion // 删除软链接
rm -rf /usr/local/Cellar/node/8.6.0/lib/node_modules/vusion //删除源文件  或者nvm use 8.6.0 -> npm uninstall -g vusion
```
3. 创建新的vusion包
```
nvm use 13.6
npm install -g vusion
```
4. ~/.zshrc下手动绑定软链/usr/local/Cellar/node/13.6.0/bin/
```
source ~/.zshrc // 使得.zshrc有效
```


/usr/local/Cellar/node/13.6.0/bin/vusion -> /usr/local/Cellar/node/13.6.0/lib/node_modules/vusion/bin/vusion
/Users/liaoqiao/.nvm/versions/node/v12.13.0/bin/vusion -> /Users/liaoqiao/.nvm/versions/node/v12.13.0/lib/node_modules/vusion/bin/vusion