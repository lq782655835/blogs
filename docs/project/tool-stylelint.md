# Stylelint样式规范工具

笔者近期做代码优化，其中就重要的一块就是代码规范。之前的文章写过[ESLint]()，用来规范js写法，现在使用StyleLint来规范css写法。

* 安装和使用
* 添加例外
* 自动修复

## 1. 安装和使用

#### 安装

```
npm install --save-dev stylelint
```

#### 使用

1. 新增`.stylelintrc`文件

2. 在文件中设置规则，文末附上笔者部门使用的css规范

#### 规则检查

``` shell
stylelint 'src/**/*.vue' --fix
```

> stylelint命令有时候无法解析到，因为使用了全局的sylelint，这时可以指定相对路径`./node_modules/.bin/stylelint`

#### 提交git时检查

需要用到插件`husky`,该插件会在git提交时，执行`npm run precommit`命令，所以需要在`package.json`中添加如下代码检查：

```
"lint": "eslint --quiet --ext .js,.vue src",
"style": "stylelint 'src/**/*.vue' --fix",
"precommit": "npm run lint && npm run style",
```

## 2. 添加例外

在stylelint使用过程中，有时候会对某条css添加例外，不要适用规则或部分规则

#### 关闭全部规则：

``` css
/* stylelint-disable */
a {}
/* stylelint-enable */
```

#### 关闭部分规则：
``` css
/* stylelint-disable selector-no-id, declaration-no-important   */
#id {
    color: pink !important;
}
/* stylelint-enable */
```

## 3. 自动修复

有些项目是开发到一半时，添加了StyleLint进行css约束，这时候需要自动化对不满足条件的Rule进行修复，如下是使用到的几种：

1.`--fix`命令

该命令能fix大部分格式问题，具体哪些规则可以自动fix可以看[这里](http://stylelint.cn/user-guide/rules/)

2.`Vetur`插件--格式化文件

优点是可以统一格式化文件，缺点是只能单个文件操作

3.`vscode-stylefmt`插件

类似Vetur插件，但该插件可定制化更多，详情请移至[github](https://github.com/mrmlnc/vscode-stylefmt)

4.`stylefmt`

该工具也是官方推荐，可以批量修改，使用如下命令修改，详情见 [github](https://github.com/morishitter/stylefmt)

```
stylefmt --stdin-filename input.css
```

```
{
    "rules": {
        # 缩进 4 个空格
        "indentation": 4,

        # 去掉小数点前面的 0
        "number-leading-zero": "never",

        # 使用双引号
        "string-quotes": "double",

        # 每个属性声明末尾都要加分号
        "declaration-block-trailing-semicolon": "always",

        # 属性值 0 后面不加单位
        "length-zero-no-unit": true,

        # 对空行的处理
        # 第一条属性声明前不允许有空行
        "declaration-empty-line-before": [
            "never",
            { ignore: [ "after-declaration" ] }
        ],
        # 每个样式规则前后都有空行，除了第一条规则与规则前有注释
        "rule-empty-line-before": [
            "always",
            { except: [ "after-single-line-comment", "first-nested" ] }
        ],
        # 在结尾 "}" 之前不允许有空行
        "block-closing-brace-empty-line-before": [ "never" ],
        # "@" 语句之前都有空行，但是忽略 "@" 语句在代码块中间与同个非代码块 "@" 语句之间的空行这两种情况
        "at-rule-empty-line-before": [
            "always",
            { ignore: [ "inside-block", "blockless-after-same-name-blockless" ] }
        ],
        # 不允许超过一行的空行
        "max-empty-lines": 1,
        # 每行句末不允许有多余空格
        "no-eol-whitespace": true,
        # 文件末尾需要有一个空行
        "no-missing-end-of-source-newline": true,

        # 大小写处理
        "unit-case": "lower",
        "color-hex-case": "upper",
        "value-keyword-case": "lower",
        "function-name-case": "lower",
        "property-case": "lower",
        "at-rule-name-case": "lower",
        "selector-pseudo-class-case": "lower",
        "selector-pseudo-element-case": "lower",
        "selector-type-case": "lower",
        "media-feature-name-case": "lower",

        # 对空格的处理
        # "{" 前必须有空格
        "block-opening-brace-space-before": "always",
        # 注释 "/*" 后和 "*/" 前必须有空格
        "comment-whitespace-inside": "always",
        # 属性名 ":" 后必须有空格
        "declaration-colon-space-after": "always",
        # 属性名 ":" 前不能有空格
        "declaration-colon-space-before": "never",
        # 声明属性末尾 ";" 前不能有空格
        "declaration-block-semicolon-space-before": "never",
        # 属性值中的 "," 后必须有空格
        "function-comma-space-after": "always",
        # 选择器例如 ">、+、~" 前后必须要有空格
        "selector-combinator-space-before": "always",
        "selector-combinator-space-after": "always",
        # 分隔多个选择器之间的 "," 后必须有空格
        "selector-list-comma-space-after": "always",
        # 分隔多个选择器之间的 "," 前不能有空格
        "selector-list-comma-space-before": "never",
        # 子代选择器之间没有额外空格
        "selector-descendant-combinator-no-non-space": true,
        # 多个属性值之间的 "," 后必须有空格
        "value-list-comma-space-after": "always",
        # 多个属性值之间的 "," 前不能有空格
        "value-list-comma-space-before": "never",
        # 媒体查询中设置断点宽度里的 ":" 后必须有空格
        "media-feature-colon-space-after": "always",
        # 媒体查询中设置断点宽度里的 ":" 前不能有空格
        "media-feature-colon-space-before": "never"
    }
}
```