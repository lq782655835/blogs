# eslint + stylelint + prettier + husky团队规范工具

> 为了提高整体开发效率，准备在团队中定制一些vue脚手架工具。首先要将一些代码规范考虑在内，需要保持git仓库的代码就像是一个人写出来的。团队根据团队习惯，考虑后使用组合工具：`eslint` + `stylelint` + `prettier` + `husky`。

1. eslint: 对js做规则约束

1. stylelint: 对css做规则约束

1. prettier: 代码格式化

1. husky：本地的git钩子工具

## Eslint

配置eslint，网上教程很多，也很详细，这里只讲下自己的配置。由于是vue的脚手架，使用eslint-plugin-vue插件扩展。

### 1. 安装

``` shell
npm install --save-dev eslint eslint-plugin-vue babel-eslint
```

### 2. `.eslintrc.js`配置

``` js
module.exports = {
    root: true,
    // 指定代码的运行环境。不同的运行环境，全局变量不一样
    env: {
      browser: true,
      node: true
    },
    parserOptions: {
    // ESLint 默认使用Espree作为其解析器,安装了 babel-eslint 用来代替默认的解析器
      parser: 'babel-eslint'
    },
    // 使得不需要自行定义大量的规则
    extends: [
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential'
    ],
    // 插件
    plugins: [
      'vue'
    ],
    // add your custom rules here
    rules: {
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'indent': [2, 4, { 'SwitchCase': 1 }],
      ...
    }
  }
```

### 3. js约束-husky工具

将约束命令放置在提交代码前检查，这就要使用husky这个工具，该工具能在提交代码时调用钩子函数precommit。直接看pageage.json


``` json
"scripts": {
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "precommit": "npm run lint"
}
```

## Prettier

1. 安装

``` shell
npm install --save-dev prettier
```

2. `.prettierrc.js`配置

以下感谢团队伙伴@Birttany的配置说明

``` js
module.exports = {
    printWidth: 100, // 设置prettier单行输出（不折行）的（最大）长度

    tabWidth: 4, // 设置工具每一个水平缩进的空格数

    useTabs: false, // 使用tab（制表位）缩进而非空格

    semi: false, // 在语句末尾添加分号

    singleQuote: true, // 使用单引号而非双引号

    trailingComma: 'none', // 在任何可能的多行中输入尾逗号

    bracketSpacing: true, // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格

    arrowParens: 'avoid', // 为单行箭头函数的参数添加圆括号，参数个数为1时可以省略圆括号

    parser: 'babylon', // 指定使用哪一种解析器

    jsxBracketSameLine: true, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）

    rangeStart: 0, // 只格式化某个文件的一部分

    rangeEnd: Infinity, // 只格式化某个文件的一部分

    filepath: 'none', // 指定文件的输入路径，这将被用于解析器参照

    requirePragma: false, // (v1.7.0+) Prettier可以严格按照按照文件顶部的一些特殊的注释格式化代码，这些注释称为“require pragma”(必须杂注)

    insertPragma: false, //  (v1.8.0+) Prettier可以在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了。

    proseWrap: 'preserve' // (v1.8.2+)
}
```

### 3. 提交格式化

在提交git时需要对整个项目执行`format`格式化，使得代码强制统一。格式化之后再用`eslint`检查语法错误，无误后把格式化后的代码用`git add .`添加进入。如果有错误直接中断提交。直接看pageage.json


``` json
"scripts": {
    "format": "prettier --write './**/*.{js,ts,vue,json}'",
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "precommit": "npm run format && npm run lint && git add ."
}
```