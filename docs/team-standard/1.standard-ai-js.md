# AI前端JS规范

### 变量

命名方式：小驼峰

命名规范：前缀名词

``` js
// bad
let setCount = 10

// good
let maxCount = 10
```

### 常量

命名方式：全部大写

命名规范：多个单词时使用分隔符`_`

``` js
// bad
const serverErrorCode = {
    success: 200,
    repeat: 444
}

// good
const SERVER_ERROR_CODE = {
    SUCCESS: 200,
    REPEAT: 444
}
```

### 函数

命名方式：小驼峰

命名规范：前缀动词

``` js
// bad
function wordClass() {}

// good
function saveWordClass() {}
```

> 常用动词：can、has、is、load、get、set

### 类

命名方式：大驼峰

命名规范：前缀名词

``` js
// bad
class person {}

// good
class Person {}
```

### 注释

#### 单行
``` js
// 单行注释，注意前面的空格
let maxCount = 123
```

#### 多行
``` js
/**
 * 多行注释
 * /
 
```

### 减少嵌套

确定条件不允许时，尽早返回。经典使用场景：校验数据

```js
// bad
if (condition1) {
    if (condition2) {
        ...
    }
}

// good
if (!condition1) return
if (!condition2) return
...
```

### 减少特定标记值

使用常量进行自解释

``` js
// bad
type: 1 // 1代表新增  2代表修改

// good
const MODIFY_TYPE = {
    ADD: 1,
    EDIT: 2
}

type: MODIFY_TYPE.ADD
```

### 表达式

尽可能简洁表达式

``` js
// bad
if (name === ''){}
if (collection.length > 0){}
if (notTrue === false){}

// good
if (!name) {}
if (collection.length){}
if (notTrue){}
```

### 分支较多处理

对于相同变量或表达式的多值条件，用`switch`代替`if`。

``` js
// bad
let type = typeof variable
if (type === 'object') {
    // ......
}
else if (type === 'number' || type === 'boolean' || type === 'string') {
    // ......
}

// good
switch (typeof variable) {
    case 'object':
        // ......
        break
    case 'number':
    case 'boolean':
    case 'string':
        // ......
        break
}
```


### 使用变量名自解释 `V1.1`

**逻辑复杂**时，建议使用变量名自解释，而不是晦涩难懂的简写。

``` js
// bad
function(value) {
    return !helpers.req(value) || this.entity.entVocabularyEntries.filter(item => item.vocabularyEntryName === value).length < 2
}

// good
function(value) {
    let entVocabularyList = this.entity.entVocabularyEntries
    let repeatCount = entVocabularyList.filter(item => item.vocabularyEntryName === value).length
    return !helpers.req(value) || repeatCount < 2
}
```

### 使用函数名自解释 `V1.1`

**遵循单一职责**的基础上，可以把逻辑隐藏在函数中，同时使用准确的函数名自解释。

``` js
// bad
if (modifyType === MODIFY_TYPE.ADD) {
    batchVariableAPI(data).then(() => {
        this.closeModal()
        this.$toast.show('添加变量成功')
    })
} else {
  updateVariableAPI(data).then(() => {
        this.closeModal()
        this.$toast.show('修改变量成功')
    })
}

// good
modifyType === MODIFY_TYPE.ADD ？ this._insertVariable(data) : this._updateVariable(data)

_insertVariable() {
    batchVariableAPI(data).then(() => this._successOperation('添加变量成功'))
}

_updateVariable() {
    updateVariableAPI(data).then(() => this._successOperation('修改变量成功'))
}

_successOperation(toastMsg) {
    this.closeModal()
    this.$toast.show(toastMsg)
}
```

### 其他规范

使用prettier格式化工具以及eslint校验

* 格式自动化
* 4个缩进
* 全部单引号
* 方法if / else / for / while / function / switch / do / try / catch / finally 关键字后有一个空格
* 自动省略分号

.prettierrc配置：

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

.eslintrc.js规则：

```js
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: ['plugin:vue/essential'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: ['vue'],
    // add your custom rules here
    rules: {
        'arrow-parens': 0, // allow paren-less arrow functions

        'generator-star-spacing': 0, // allow async-await

        'no-unused-vars': 'error', // disabled no ununsed var  `V1.1`

        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // no use debugger in production

        'indent': [2, 4, { SwitchCase: 1 }], // 4 space for tab for perttier

        'space-before-function-paren': ['error', 'never'], // no space in function name for perttier
    }
}
```

> 如果是vue-cli3项目，以上配置的eslint插件默认已安装；如果不是vue-cli3项目，需要npm安装对应包：npm install --save-dev babel-eslint eslint-plugin-vue

### 参考链接

[百度JS规范](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md)