# 《你不知道的JavaScript》

## 编译原理

`JS引擎`在`执行栈`中执行源代码时，会先将源代码进行`编译`，拿到计算机看得懂的可执行代码（直接操作内存的机器代码），再JS引擎`执行`。

* 概念
    * `引擎`。 从头到尾的编译与执行，最重要。
    * `编译器`。引擎好朋友之一，语法分析以及代码生成。
    * `作用域`。引擎好朋友之一，一套规则，确定标志符的访问权限。

### 过程

1. **编译**（源代码在执行之前，会经历以下3个步骤）
    1. `词法分析`（涉及到引擎、作用域概念）。比如var a = 2分解为词法单元var、a、=、2。
    1. `语法分析`。词法单元流（数组），转为抽象语法树AST。
    1. `代码生成`。AST转为可执行代码(比如定义内存、告诉js引擎如何操作内存等机器执行代码)。
1. **执行**

举例1，按照JS引擎和它的朋友们去思考变量赋值，看他们如何协作：var a = 2
1. 编译。编译器先进行`词法分析、语法分析`，生成AST;编译器AST到代码生成时，`为变量分配内存，命名为a，然后将a = 2生成机器代码（如何操作内存），好供JS引擎直接执行`。
    1. 遇到var a，编译器会询问作用域是否已经有该命名存在于同一个作用域。是，编译器忽略，继续编译；否，在当前作用域创建变量，命名为a。
    1. 编译器为引擎生成运行时所需代码，这些代码被用来处理a = 2这个赋值操作。
3. 执行。引擎运行时，先询问作用域，当前作用域是否存在一个叫a的变量，是，引擎会使用这个变量a，赋值2给它；否，继续向上查找；没找到，JS引擎对外抛出错误。

举例2,一个函数被调用就会创建一个新的执行环境(也叫上下文环境)，里面会有作用域嵌套的概念。
``` js
(function foo(i) {
    if (i === 3) {
        return;
    }
    else {
        foo(++i);
    }
}(0));
```

1. 编译。1.创建一个[作用域链]。2.创建变量，函数和参数。3.确定this的值。
``` js
// 意味着每个执行环境在概念上作为一个对象并带有三个属性
executionContextObj = {
//作用域链：{变量对象＋所有父执行环境的变量对象}
scopeChain: {
    /* variableObject + all parent execution context's variableObject */
},

//变量对象:{函数形参＋内部的变量＋函数声明(但不包含表达式)}
variableObject: {
    /* function arguments / parameters, inner variable and function declarations */
},

this: {}
}
```
2. 执行。赋值，执行代码。
> 闭包：一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。简单说，指有权访问另一个函数作用域中的变量的函数

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

`块作用域本质上是将块变成一个可以被关闭的作用域。`
``` js
// let关键字隐式的将变量innerScope绑定到花括号{..}作用域中
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

``` js
var name = 222
var obj = {
    name: '111',
    func: function() { return this.name }
}

obj.func() // 111 等价于 obj.func.call(obj)
// 运行时绑定this
obj.func.call(window) // 222

let { func } = obj
func() // 222  顶层作用域默认是window
```

### this绑定规则

* `默认绑定` 严格模式绑定到undefined，否则绑定到window
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
// 等同于 fn = obj.foo
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

## Promise

回调函数表达异步和并发有两个主要缺陷：`缺乏顺序性和可信任性`。
`Promise封装了依赖时间的状态`--等待底层值的完成或拒绝，所以Promise本身与时间无关。因此Promise可以按照可预测的方式组成（组合），而不用关心时序或底层的结果。
另外，一旦Promise决议，它就永远保持在这个状态。

Promise解决了因只用回调的代码而备受困扰的`控制反转`问题。
但Promise也没有摈弃回调，只是把回调的安排转交给一位可信任的中介机制。

* 对象
    * Promise.resolve()
    * Promise.reject()
    * Promise.all([promises]) 并发
    * Promise.race([promises]) 竞争
* 实例
    * promise.then()
    * promise.catch()
    * promise.finally()

#### Promise局限性
* 单一值。Promise只能有一个完成值或拒绝值。
* 单决议。
* 无法取消的Promise。一旦建立Promise，会立即执行，无法取消。
* Promise性能。
* 顺序错误处理。
* 不设置回调函数，Promise内部抛出的错误不会反应到外部。(《ES6》入门）
* 当处于Pending状态，无法得知目前进展到哪一个阶段。（《ES6》入门）

## 生成器

`生成器`是一类特殊的函数(（关键字：* 和yield）)，可以一次或多次启动和停止，并不一定要完成。

`生成器对象`是由一个 generator function 返回的,并且它符合可迭代协议（[Symbol.iterator]）和迭代器协议（next）。这两个协议在ES6的for of/解构等起很大作用。

使用生成器对象，解决异步代码同步问题:
``` js
function *main() {
    let text = yield foo(1, 2)
    console.log(text)
}
function foo(x, y) {
    let url = `http://xxx/${x + y}`
    // it来自main()
    // it.next再次进入main中，第二次返回data，赋值给text变量
    ajax(url, data => it.next(data))
}

let it = main() // 生成器对象
// 启动,执行foo(1, 2)。遇到yield，暂停，第一次返回undefined
// ajax是异步，所以不受暂停影响
it.next()
```

### 生成器 + Promise
以上yield出来的是数据，可以构造为一个promise，通过生成器把它yield出来。
``` js
foo(1, 2).then(...).then(...)
```

``` js
// 工具库辅助，自动执行同时返回Promise值。
// ES9的async/await就是帮你干run的活
function run(gen) {
    var args = [].slice.call(argments, 1);
    var it;
    it = gen.apply(this, args)

    // 返回promise对象
    return Promise.resolve().then(function handleNext(value){
        var next = it.next(value) // 启动
        return (function handleResult(){
            if (next.done) return next.result
            return Promise.resolve(next.value).then(handleNext)
        })(next)
    })
}

run(main) // main见上面
```