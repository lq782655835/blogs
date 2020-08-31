
# jumpter lab

## 1. 安装

### 一：安装conda（推荐）

conda隔离环境作用（有点类似虚拟机）。
* 记住安装位置
* 把conda命令放在zsh中。

```
# 创建虚拟环境并下载jupyterlab cookiecutter nodejs git。
conda create -n jupyterlab-ext --override-channels --strict-channel-priority -c conda-forge -c anaconda jupyterlab cookiecutter nodejs git

# 激活虚拟环境
# 此时安装的jupyterlab是在其env环境内，使用which pip命令就理解了
conda activate jupyterlab-ext
```

### 二：或者直接安装jupyterlab

```
pip install jupyterlab cookiecutter
```

> 使用conda虚拟环境时，以下所有的操作都要执行`conda activate jupyterlab-ext`以后

## 2. 启动jupyterlab

``` bash
jupyter lab # 开启jupyter lab
jupyter lab build # 手动编译application。当完成插件修改时，手动build可以自动install 所有插件
```

## 3. 插件开发

### 下载模板代码

```
# cookiecutter工具下载
cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts --checkout v1.0

cd jupyterlab_apod

# 初始项目依赖并构建项目
jlpm install
jupyter labextension install . # 插件安装到jupyterlab工具上
```

### jupyter插件应用到jupyterlab上

https://jupyterlab.readthedocs.io/en/stable/user/extensions.html

类似于npm插件：
* install 安装没带--no-build时，会重启lab进程；
* install支持多个package一起安装

``` bash
jupyter labextension list # 已安装的list

jupyter labextension install my-extension # npm包(安装后自动会编译application)
jupyter labextension install . --no-build # 安装本地包,同时不编译application

jupyter labextension uninstall my-extension
```

## 参考

https://juejin.im/post/5dc2658d6fb9a04a6d7f1e0d