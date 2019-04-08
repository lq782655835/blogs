# 《JavaScript高级程序设计》

## JavaScript语言
浏览器宿主中的JavaScript = ECMAScript + DOM + BOM
* ECMAScript 核心语言功能
    * 语法
    * 类型
    * 语句
    * 关键字
    * 保留字
    * 操作符
    * 对象
* DOM 提供访问和操作网页内容的方法与接口
    * DOM视图
    * DOM事件
    * DOM样式 CSS
* BOM 与浏览器交互的方法与接口
    * window
    * location
    * cookie
    * XMLHttpRequest
> js 是ECMAScript的具体实现。其定义了包含语法、关键字等，但不包括与浏览器相关的API。

### 标签的位置
* 遇到`<script>`会暂停解析html + 浏览器遇到`<body>`标签才开始呈现内容 = script应该放在body后

## JS数据类型

从属于ECMAScript规范定义。
* undefined
* null
* string
* number
* boolean
* object
> 从技术角度讲，`函数在ECMAScript中是对象，不是一种数据结构`。

#### 基本类型/引用类型
JS变量松散，只是在特定时间用于保存特定值的一个名字。即不存在定义某个变量时必须保存何种数据类型
* 基本类型
    * 复制直接拷贝副本
* 引用类型
    * `复制的是指针，指针指向真实的内存`（js是无法获取以及操作内存，只能通过指针代理）
    * 当覆盖新的值时，指针指向新对象
``` js
// 以上解释了这个赋值问题
var a = { name: 1 }
var b = a // b和a指向同一个内存地址
b = { aget: 1 } // b被指向新的内存地址，断开了与a的联系
```

#### 函数
* 函数是对象，函数名是指针（函数名代理着内存）
``` js
// 以下都是等价的
function add(a, b) {
    return a + b
}

var add = function(a, b) {
    return a + b
}

// 这种方式较为明显的诠释了实质：函数是对象，函数名是指针
var add = new Function('a', 'b', 'a + b')
```