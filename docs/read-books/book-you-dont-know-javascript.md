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