# 《JavaScript高级程序设计》

javascript书籍中的经典，里面非常多细节解释的十分详细，而且有些晦涩难懂的概念，比如js面向对象、原型链、继承等，也能层层递进，深入浅出。忍不住赞叹：写的太棒了！

## JavaScript语言

**浏览器宿主中的JavaScript = ECMAScript + DOM + BOM**。

Web浏览器只是ECMAScript实现的宿主环境之一。宿主环境不仅提供基本的ECMAScript实现，也会提供该语言的扩展（比如DOM/BOM），以便语言与环境之间对接交互。

**DOM**(文档对象模型)是针对XML但经过扩展用于HTML的应用程序编程接口。DOM把整个页面映射为一个多层节点结构。HTML的每个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据。

* **ECMAScript** 核心语言功能
    * 语法
    * 类型
    * 语句
    * 关键字
    * 保留字
    * 操作符
    * 对象
* **DOM**（文档对象模型） `提供访问和操作网页内容的方法与接口`
    * DOM视图 DOM节点（Node类型）
        * DOM查找
        * DOM操作
    * DOM事件
        * 事件捕获 document -> div
        * 事件冒泡 div -> document
    * DOM样式 CSS
* **BOM**（浏览器对象模型） 与浏览器交互的方法与接口
    * window
        * history
        * document 唯一一个既属于BOM又属于DOM的对象
        * navigator
        * screen
        * location
    * cookie
    * XMLHttpRequest
> js 是ECMAScript的具体实现。其定义了包含语法、关键字等，但不包括与浏览器相关的API。
> js引擎不是独立运行的，它运行在宿主环境中。web宿主环境就是浏览器。

### 标签的位置

* 遇到`<script>`会暂停解析html + 浏览器遇到`<body>`标签才开始呈现内容，所以script应该放在body的最后

## JavaScript数据类型

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

### 闭包

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

最典型需要闭包案例：
``` js
// 连续打印5，而不是从1～4
for (var i = 1; i < 5; i++) {
    setTimeout(function() { console.log(i) }, i * 1000)
}
```

以上代码我们试图假设循环中的每个迭代在运行时都会给自己“捕获”一个i副本，但根据作用域的工作原理，实际情况是尽管循环中的五个函数是在各个迭代中分布定义的，但是这些函数都是`被封闭在一个共享的全局作用域中`，因此实际上只有一个i。

所以所有函数共享一个i的引用。

#### 解决方案

1. 每次迭代都要一个闭包作用域

``` js
for (var i = 1; i < 5; i++) {
    (function() {
        var j = i // 存储i副本，使得settimeout函数可以访问到外部作用域
        setTimeout(function() { console.log(j) }, j * 1000)
    })()
}

// 一般编码更常用这种方式
for (var i = 1; i < 5; i++) {
    (function(j) {
        setTimeout(function() { console.log(j) }, j * 1000)
    })(i)
}
```

2. 块作用域

`块作用域本质上是将块变成一个可以被关闭的作用域。`
``` js
for (var i = 1; i < 5; i++) {
    let j = i // 块作用域
    setTimeout(function() { console.log(j) }, j * 1000)
}
```

`for循环头部的let声明`还有一个特殊行为。这个行为指出变量在循环过程中不止被声明一次，`每次迭代都会声明`。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。

``` js
for (let i = 1; i < 5; i++) {
    setTimeout(function() { console.log(i) }, i * 1000)
}
```

## DOM

DOM（文档对象模型），`提供访问和操作网页内容的方法和接口`，是针对HTML和XML文档的一个API（扩展XML）。`DOM描绘了一个层次化的节点树`。

借助DOM提供的API，开发人员可轻松自如的增删改查任何节点，即获得控制页面内容和结构的主动权。

### DOM级别

#### DOM1级

1998年成为W3C标准，由两个模块组成：DOM Core 和DOM HTML。DOM Core规定如何映射基于XML的文档结构；DOM HTML模块则在DOM Core的基础上扩展，添加了对HTML的对象和方法（比如在对象上直接绑定事件el.onclick=function）。

#### DOM2级

DOM2目标宽泛了很多。主要有DOM2使得DOM1的DOM Core模块经过扩展**支持XML命名空间**。
同时引入了新的模块：
* DOM 视图
* DOM 事件（比如DOM2开始支持el.addEventListen('click', funcion)事件监听方式）
* DOM 样式
* DOM 遍历

#### DOM3级

目的同样是扩展DOM API，以**满足操作XML的所有需求**。

#### 其他DOM标准

除了DOM Core和DOM HTML接口之外，SVG语言（也是基于XML的）也发布了针对自己的DOM标准，使得SVG对象上可操作相对应的新的API。其他语言还包括MathML、SMIL

### XHTML命名空间支持

HTML不支持XML命名空间，但`XHTML支持XML命名空间`。命名空间使用`xmlns`特性来指定。在混合使用两种语言的情况下，命名空间用处非常大。比如混合了XHTML和SVG语言的文档:
``` html
<html xmlns="http://www.w3.org/1999/xhtml">
    <body>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect x="0" y="0" widht="100" height="100"></rect>
        </svg>
    </body>
</html>
```

通过设置命名空间，svg元素的所有子元素，以及这些元素的所有特性，都被认为属于http://www.w3.org/2000/svg命名空间。

由于引入了命名空间，所以DOM2级的Document类型新增了关于命名空间的方法。比如document.createElementNS(namespaceURI, tagName)

### 节点层次

* Node 所有节点都继承自Node类型(DOM1级定义)
    * 节点属性：nodeType/nodeName/nodeValue
    * 节点关系：firstChild/lastChild/childNodes/parentNode/nextSibling/previousSibling
    * 节点操作：appendChild()/replaceChild()/removeChild()/insertBefore()
* Document 文档类型（nodeType=9）。表示整个HTML页面
    * window.document是其实例
    * document.documentElement指向\<html>标签子元素，document.body指向\<body>标签子元素。
    * 查找Node
        * getElementById()
        * getElementByName()
        * getElementByTagName()
    * 创建Node
        * createElement()
        * createTextNode()
* Element 元素类型（nodeType=1），最常用类型
    * id/className
    * 属性操作：getAttribute()/setAttribute()/removeAttribute()
* Text 文本类型

### DOM扩展

* 选择符API 从此不再需要getElementBy...
    * querySelector
    * querySelectorAll
    * matchsSelector
* 元素遍历 弥补使用childNodes和firstChild属性时，行为不一致
    * childElementCount
    * firstElementChild
    * lastElementChild
    * previousElementSibling
    * nextElementSibling
* HTML5 围绕如何使用新增标记，定义了大量JavaScirpt API
    * getElementByClassName
    * classList
        * add
        * contains
        * remove
        * toggle
    * 自定义数据属性 data-
    * postMessage
    * 拖放
        * draggable属性开启
        * dragstart/drag/dragend/dragenter/dragover/dragleave事件
        * dataTransfer对象传递数据
    * audio/video
    * hashchange/popstate
* 专有扩展
    * children属性。对childNodes进行简化
    * el.contains(el)方法 某个节点是不是另外一个节点的后代
* DOM2/DOM3
    * 样式
        * style属性 el.style.width
    * 范围(DOM2)
        * document.createRange()
    * 手动绑定/解除事件

``` js
var myDiv = document.getElementByClassName('myDiv')
myDiv.classList.add('current')
myDiv.style.width = '100px'
```

### 事件

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

### 元素大小

元素的可见大小由高度、宽度决定，包括所有内边距、滚动条和边框大小（注意，不包括外边距）。

#### 1. 偏移量 offset

元素的偏移量。

注意offsetLef和offsetTop是`相对于offsetParent元素`。

* offsetHeight
* offsetWidth
* offsetLeft
* offsetTop

![image](https://user-images.githubusercontent.com/6310131/80852040-e2014980-8c57-11ea-8f01-69eb2dd27c8c.png)

``` js
// 案例：知道某个el元素在页面上的偏移量
// 等同于el.getBoundingClientRect().top
function getElementTop(el) {
    var actualTop = el.offsetTop
    var current = el.offsetParent

    while(current) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }
    return actualTop
}
```

#### 2. 客户区大小 client

指的是元素`内容及内边距所占的空间大小`(不包括边框和外边距)。

* clientHeight
* clientWidth

![image](https://user-images.githubusercontent.com/6310131/80852111-86838b80-8c58-11ea-99c2-b6ff8cc4f7c7.png)

``` js
// 案例：获取视口大小
function getViewport(el) {
    if (document.compatMode == 'BackCompat') {
        // ie 7 以下版本
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}
```

#### 3. 滚动大小 scroll

指的是包含滚动内容的的元素大小。

有些元素（如html），即使没有执行任何代码也能自动的添加滚动条，但另外一些元素（如div），则需要`通过css的overflow属性设置才能滚动`。

scrollHeight/scrollWidth主要用于确定元素内容的实际大小。例如带有垂直滚动条的页面总高度是document.documentElement.scrollHeight

* scrollHeight
* scrollWidth
* scrollLeft
* scrollTop

![image](https://user-images.githubusercontent.com/6310131/80852149-e8dc8c00-8c58-11ea-93b2-0b7ce778c971.png)

#### 4. 确定元素大小

浏览器为每个元素都提供了`getBoundingClientRect()`方法（注意该方法的兼容性）。这个方法会返回一个矩形对象，包含4个属性： left、top、bottom、right。

这些属性给出了元素在页面中相对于视口（页面坐标原点）的位置。

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