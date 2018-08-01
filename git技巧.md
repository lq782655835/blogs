# git技巧

> 总结一些常用的git命令操作。Mac推荐可视化软件`Sourcetree`操作

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