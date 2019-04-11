# 《JavaScript高级程序设计》

javascript书籍中的经典，里面非常多细节解释的十分详细，而且有些晦涩难懂的概念，比如js面向对象、原型链、继承等，也能层层递进，深入浅出。忍不住赞叹：写的太棒了！

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
* DOM（文档对象模型） 提供访问和操作网页内容的方法与接口
    * DOM视图
    * DOM事件
        * 事件捕获 document -> div
        * 事件冒泡 div -> document
    * DOM样式 CSS
* BOM（浏览器对象模型） 与浏览器交互的方法与接口
    * window
    * location
    * cookie
    * XMLHttpRequest
> js 是ECMAScript的具体实现。其定义了包含语法、关键字等，但不包括与浏览器相关的API。

### 标签的位置
* 遇到`<script>`会暂停解析html + 浏览器遇到`<body>`标签才开始呈现内容 = script应该放在body的最后

## JS数据类型

从属于ECMAScript规范定义。从技术角度讲，`函数在ECMAScript中是对象，不是一种数据结构`。（笔者注：所以js语言可以很好的实践函数式编程思想。关于函数式编程思想可以看笔者另外一篇笔记：[函数式编程](../react/function-program.md)）

* undefined
* null
* string
* number
* boolean
* object

### 基本类型/引用类型
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

### 函数

函数是对象，函数名是指针（函数名代理着内存）

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

#### 闭包
指有权访问另一个函数作用域中的变量的函数。原理：
* 后台执行环境中，闭包的作用域链包含自己的作用域、包含函数的作用域和全局作用域。
* 通常函数的作用域及其所有变量都会在函数执行结束后被销毁。
* 但是，当函数返回一个闭包时，这个函数的作用域将会一直在内存中保存，直到闭包不存在为止。

``` js
function addThird(c) {
    var d = 10
    return function (a, b) {
        return a + b + c + d // 该函数能访问另外一个函数作用域的变量：c、d
    }
}

addThird(3)(1, 2) // 16
```

## DOM

是针对HTML和XML文档的一个API。

#### 节点层次
* Node 所有节点都继承自Node类型
    * nodeType/nodeName/nodeValue
    * appendChild/replaceChild/removeChild
    * insertBefore
    * firstChild/lastChild/childNodes/parentNode
* Document
    * getElementById
    * getElementByName
    * getElementByTagName
    * createElement
    * createTextNode
* Element
* Text

#### DOM扩展

* 选择符API 从此不再需要getElementBy...
    * querySelector
    * querySelectorAll
    * matchsSelector
* HTML5
    * getElementByClassName
    * classList
        * add
        * contains
        * remove
        * toggle
    * postMessage
    * 拖放事件 dragstart/drag/dragend/dragenter/dragover/dragleave
    * audio/video
    * hashchange/popstate
* DOM2/DOM3
    * style属性

``` js
var myDiv = document.getElementByClassName('myDiv')
myDiv.classList.add('current')
myDiv.style.width = '100px'
```

#### 事件

* 事件类型
    * UI
        * load
        * resize
        * scroll
    * 焦点
        * blur
        * focus
    * 鼠标与滚轮
        * click
        * dbclick
        * mousedown
        * mouseenter
        * ...
    * 键盘
        * keydown
        * keypress
        * keyup
    * 复合事件（虚拟键盘用到）
        * compositionstart
        * compositionupdate
        * compositionend
    * 变动事件
        * DOMNodeInserted
    * HTML5事件
        * hashchange
        * contextmenu
        * DOMContentLoaded（形成dom树之后就会触发）
        * beforeunload
        * readstatechange
    * 触摸与手势事件
        * 触摸：touchstart/touchmove/touchend/touchcancel
        * 手势：gesturestart/gesturechange/gestureend
``` js
// DOM0事件处理
var btn = document.getElementById('myBtn')
btn.onclick = function() { ... }
```

``` js
// DOM2事件处理，好处：可以添加多个事件处理程序
var btn = document.getElementById('myBtn')
btn.addEventListener('click', function() { ... }, false) // 最后为false，代表冒泡阶段捕获
```

## HTML5 JavaScirpt API
* requestAnimationFrame
* Page Visible API
    * IntersectionObserver
* Geolocation API
* File API
    * e.target.files
        * name
        * size
        * type
        * lastModifieDate
    * FileReader（可以想象为文件系统的XMLHttpRequest）
    * 对象URL createObjectURL
    * 结合拖放事件 e.dataTransfer.files
    * FormData
* Web Worker