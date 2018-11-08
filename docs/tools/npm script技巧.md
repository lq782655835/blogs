# npm script技巧

> npm不仅是js包管理工具，还可以为作为代码库配置工具。有些时候需要一些小脚本来约定规则或者监听文件变化，这时候npm script起到重要作用。

## 1. 串行和并行

使用`&&`将多个命令串行执行。比如我们经常提交代码时，先perriter格式化代码，然后检查eslint以及stylelint，最后再进行commitlint。依次执行，前面执行为false则停止。使用`&`将多个命令并行执行。

``` json
"scripts": {
    "precommit": "npm run format && npm run eslint && npm run stylelint && git add ."
}
```

## 2. 通配符执行相似指令
通配符需要配合[`npm-run-all`](https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md)包(更轻量和简洁的多命令运行)。--parallel参数表示并行

``` json
"scripts": {
    "precommit": "npm-run-all --parallel lint:*",
    "lint:js": "eslint --ext .js,.vue --ignore-path .gitignore",
    "lint:commit": "commitlint -e $GIT_PARAMS","
}
```

## 3. 原生钩子

npm脚本有pre和post两个钩子。eg：build脚本命令的钩子就是prebuild和postbuild。

``` json
"scripts": {
    "build": "webpack",
    "prebuild": "echo before build",
    "postbuild": "echo after build"
}
```
> 执行build时按照如下顺序执行:

> npm run prebuild && npm run build && npm run postbuild

npm 默认提供如下命令钩子：

 + install
 + uninstall
 + start
 + restart
 + build
 + test
 + stop
 + version

## 4. 监听文件变动

gulp中watch非常实用，但npm script也能实现文件变动后自动运行npm脚本。这就需要安装[`onchange`](https://www.npmjs.com/package/onchange)包。onchange帮助我们在文件增删改时执行对应npm命令，非常实用。

安装onchange:

``` shell
npm install onchange --save-dev
```

scripts监听(示例监听svg文件变化，以处理最新svg文件):

``` json
"scripts": {
    "dev": "webpack & npm run watch:svg",
    "watch:svg": "onchange 'assets/svg/*.svg' -- npm run svg",
    "svg": "vsvg -s ./assets/svg -t ./assets/icon",
}
```

## 5. git钩子

这也是非常实用功能之一，可以利用git钩子构建代码约束。经常用到的工具包是[`husky`](https://github.com/typicode/husky),通过husky源码知道，它替换了项目中.git/hooks钩子。项目中常用钩子是`precommit`,`prepush`, `commit-msg`

安装husky:

``` shell
npm install husky --save-dev
```

约束:

``` json
"scripts": {
    "precommit": "npm run format && npm run eslint"
}
```