# 《你不知道的JavaScript》

## 编译原理
* 概念
    * 引擎 从头到尾的编译与执行
    * 编译器 语法分析以及代码生成
    * 作用域 一套规则，确定标志符的访问权限
* 过程
    * 分词/词法分析（涉及到引擎、作用域概念）
    * 解析/语法分析
    * 代码生成
* 举例：变量赋值 var a = 2
    1. 编译阶段：`编译器`在`当前作用域`声明变量a（之前会检查有没有该变量）
    2. 执行阶段：`运行时引擎`在作用域查找该变量，找到赋值

## 块作用域

函数作用域是最常见的作用域单元。作用域下保存对应的变量或者函数，同时`作用域是嵌套的`，当在查找当前作用域下的变量时，找不到会递归去上层的作用域查找，直到找到为止；当找不到时则直接报错。

* 闭包的应用
* 垃圾回收机制基础

``` js
var globalScope = true
if (globalScope) {
    var innerScope = 123
}
console.log(innerScope) // 123
```

``` js
// let关键字隐式的将变量innerScope绑定到{..}作用域中
let globalScope = true
if (globalScope) {
    let innerScope = 123
}
console.log(innerScope) // innerScope is not defined
```

## this

* `this在运行时绑定`，并不是在编写时绑定。
* 当一个函数（函数也是对象）被调用时，会创建一个`执行上下文`，this是执行上下文的一个属性。执行上下文包含：
    * 哪里被调用（调用栈）
    * 函数的调用方法
    * 传入的参数等

### this绑定规则

* `默认绑定` 严格模式绑定到undefined，否则绑定到全局对象
* `隐式绑定` 绑定到上下文对象
* `显示绑定` call/apply/bind绑定到指定对象
* `new绑定` 绑定到新创建的对象

ES6的箭头函数并不会使用以上四种绑定规则，而是根据当前的词法作用域来决定this（等同于ES5 self = this机制）

``` js
// 隐式绑定
function foo() {
    console.log(this.a)
}
var obj = {
    a: 2,
    foo: foo
}
obj.foo() // 2

// 隐式丢失
var bar = obj.foo // bar 引用的是foo函数本身，而不是对象obj
bar() // undefined
// 最常见的隐式丢失
/** function setTimout(fn, delay) { // 等同于 fn = obj.foo
    // 等待delay
    fn()
}**/
setTimeout(obj.foo, 100) // undefined
```

## js基本数据类型

* string
* number
* boolean
* null
* undefined
* object
    * 特殊对象子类行。
        * 函数是对象的子类型,函数是‘可调用对象’。`函数 ～= 对象`
            * 函数内部属性[[Call]]，该属性使其可以被调用
            * 函数不仅是对象，还可以拥有属性。如：function(a, b){}.length === 2
        * 数组也是对象的一种类型
    * 内置函数（或对象），也叫`原生函数`（它也可以使用构造函数创建实例）
        * String
        * Number
        * Boolean
        * Object
        * Function
        * Array
        * Date
        * RegExp
        * Error
* symbol（ES6）

#### 如何判断
* typeof： 查看值的类型
``` js
typeof 42 === 'number' // true
// 特殊
typeof null === 'object'
typeof function a() {} === 'function'
typeof [] === 'object'
```

#### 值和类型
js变量没有类型，只有值才有
``` js
// 只有值才有类型。变量只作为一种标记
var a = 42 // typeof a === 'number'
a = true // typeof a === 'boolean'
```

> Array.prototype.slice.call(args)与Array.from(args) 都是把类似数组对象，转换为真正的数组对象。

### 原生函数
JS为基本数据类型值提供了封装对象，称为原生对象。
* string、number、boolean、object、Array都是即有文字形式，又有构造形式。
* null、undefined只有文字形式
* Date只有构造形式

``` js
// 必要时js引擎会自动把字符串字面量转换成String对象
// 所以该字符串字面量可以有属性和方法
var str = 'hello' // 文字形式
str.length // 5
str.charAt(0) // l
var strObj = new String('hello') // 构造形式
```