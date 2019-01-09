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
