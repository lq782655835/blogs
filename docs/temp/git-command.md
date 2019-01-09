# git命令

> 总结团队git规范以及常用的git命令操作。Mac推荐可视化软件`Sourcetree`

## git规范

1. 一张图原理

![image](https://user-images.githubusercontent.com/6310131/43519854-8b1ed5c4-95c3-11e8-931f-2754963333d2.png)

2. 分支规范

  * 核心分支

    + master
    + develop

  * 临时分支

    + feature
    + release
    + fix

> 临时分支建议隔段时间清理一下。建议分支命名：type + function + date, 如做了select组件特性，命名为feature-select-0812

![image](https://user-images.githubusercontent.com/6310131/46001964-44d74a00-c0df-11e8-9005-6da4d47b576c.png)


3. 提交规范

type: 功能简述 + 详情

 > type: feature、 enhance、 fix、 test、docs

## 命令式提交代码

1. 提交到本地仓库

``` shell
git add .
git commit -m 'i'
```

2. 提交到远程仓库

``` shell
git push origin master
```

## 本地项目关联远程仓库

1. 前提：本地项目已存在  && 远程仓库已新建

2. 本地仓库转为本地版本库

``` shell
cd your-project
git init
git add .
git commit -m 'init'
```

3. 关联远程仓库(important)

``` shell
git remote add origin <URL>
```

4. 推送远程仓库

  * **远程不冲突**

  ``` shell
  git push -u origin master
  ```

  * **远程冲突**
     1. 拉取远程仓库最新文件

     ``` shell
     git pull origin master --allow-unrelated-histories
     ```

     2. 手动解决冲突，然后再重新本地提交，再推送远程提交。

     ``` shell
     solve conflict
     git add .
     git commit -m 'conflict'
     git push -u origin master
     ```

## 打tag

git这个功能相当于，给项目做一个总结，存档当前代码。

查看tag

``` bash
git tag
```

新建tag并推送

``` bash
git tag -a <tag-name> -m <comment>
git push origin --tags
```

* git init
* git clone [url]
* git config
``` bash
# 显示当前的Git配置
$ git config --list

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```
* git add
``` bash
# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```
* git commit
``` bash
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```
* git branch
``` bash
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]
```
* git checkout
``` bash
# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```
* git tag
* git status
* git log
* git diff
* git reset --hard
* git远程
  * git remote
  * git fetch
  * git pull
  * git push
``` bash
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all
```

## 参考文章
* [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
* [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)