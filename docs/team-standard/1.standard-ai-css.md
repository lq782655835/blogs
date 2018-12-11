# AI前端CSS规范

### 分号

每个属性声明后面都要加分号。

### 命名

1. 不使用id选择器
2. 适用有意义的名词命名
3. 单词全部小写，名词超过1个时，使用`-`分隔符

### 属性声明顺序

原则：整体到局部，外部到内部，重要属性优先

``` css
.element {
    display: block;
    float: left;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    margin: 0 100px;
    padding: 50px; // padding习惯写到margin后面
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5; border-radius: 3px;
    font: normal 13px "Helvetica Neue", sans-serif;
    color: #333;
    text-align: center;
    line-height: 1.5;
    background-color: #f5f5f5;
    opacity: 1;
}
```

### 其他规范

使用prettier格式化工具约束，推荐配置如下：

* 格式自动化
* 4个缩进
* 全部单引号
* 属性`:`后有空格
* 颜色全部小写
* 小数点前面0自动添加

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

    // parser: 'babylon', // 指定使用哪一种解析器

    jsxBracketSameLine: true, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）

    rangeStart: 0, // 只格式化某个文件的一部分

    rangeEnd: Infinity, // 只格式化某个文件的一部分

    filepath: 'none', // 指定文件的输入路径，这将被用于解析器参照

    requirePragma: false, // (v1.7.0+) Prettier可以严格按照按照文件顶部的一些特殊的注释格式化代码，这些注释称为“require pragma”(必须杂注)

    insertPragma: false, //  (v1.8.0+) Prettier可以在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了。

    proseWrap: 'preserve' // (v1.8.2+)
}
```

### 参考连接

[百度CSS规范指南](https://github.com/ecomfe/spec/blob/master/css-style-guide.md)

[腾讯CSS规范指南](http://alloyteam.github.io/CodeGuide/#css)

[Google CSS规范指南](http://iischajn.github.io/trans/htmlcss-guide/)