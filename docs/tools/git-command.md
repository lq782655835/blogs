# Git实用命令

> 总结最常用的git命令操作。Mac推荐可视化软件`Sourcetree`

![image](https://user-images.githubusercontent.com/6310131/43519854-8b1ed5c4-95c3-11e8-931f-2754963333d2.png)

## 1. 本地仓库

``` shell
git init # 初始化本地git 以下所有操作的前提条件

git add -A # 添加当前所有变动文件到本地缓存区
git commit -m '<commit-word>' # 提交缓存区内容到本地仓库
git commit -am '<commit-word>' # 上面两步合并为一步的命令

git checkout master
git checkout -b <feat-name> # 新建feat-name分支并切换到该分支

git branch -a # 列出所有本地分支和远程分支
git branch -D <feat-name> # 删除本地feat-name分支

git status # 显示当前分支状态
git reset --hard # 回滚到最近的commit
git config --list # 显示当前的Git配置
```

## 2. 远程仓库

``` shell
git remote add origin <URL> # 关联远程仓库，以下操作的前提条件
git remote -v # 显示远程仓库

git pull # 拉取远程代码到本地
git push -u origin master # 推送本地到远程master分支
git push origin :branch-name # 删除远程分支 # 等同于 git push origin --delete [branch-name]

git merge feat-name # feat-name分支内容合并到当前分支，适合不同分支间commit合并操作
```

## 3. 高级
``` bash
# 变基。记住，rebase操作永远不在公共分支操作；同时rebase与公共分支名永远不同时出现
git rebase -i HEAD~3 # 交互式合并当前分支最近三次的记录，用于简化提交记录，适合同分支上commit合并，不影响其他分支。
git reabse feat-B # 把当前A分支的提交commit，变基到A和B分支共同祖先的commit上，然后加上B分支后续的commit。

# 子模块
git submodule add https://github.com/djyde/ToProgress # 添加子模块
git submodule status # 检查子模块状态
git submodule update ToProgress # 更新子模块
git submodule deinit ToProgress && git rm ToPogress # 删除子模块

# Tag
git tag # 查看tag
git tag -a <tag-name> -m <comment> # 新建tag
git push origin --tags # 推送tag
```

# 4. 常用
``` bash
// 部署gh-pages主页

# 1. 切换到gh-pages分支
git checkout -b gh-pages
# 2. 执行build生成打包后文件
npm run build
# 3. 只把打包后的文件夹（如dist）推送到gh-pages分支
git add -f dist
git commit -m 'Initial the page of project'
git subtree push --prefix dist origin gh-pages
```

## 参考文章
* [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
* [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
* [Rebase 代替合并](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/rebase#start)
* [子模块](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/submodules#start)
* [git rebase/submodule/flow介绍](https://yrq110.me/post/tool/git-rebase-submodule-and-flow/)