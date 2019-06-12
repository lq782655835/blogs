# JavaScript继承

在上篇[JavaScript原型](./js-base-1.prototype.md)中,我们理解了原型的来源以及与其相关的constructor、new、prototype概念。下面我们来看看js是如何通过原型来实现面向对象的另外一个特征：继承。另外推荐《JavaScript高级程序设计》，js面向对象章节写的太棒了，层层递进，深入浅出。

## 组合继承
利用 call 继承父类上的属性，用子类的原型等于父类实例去继承父类的方法。

缺点：调用两次父类Person构造函数，造成性能浪费。

``` js
// 组合继承，也叫经典继承
function Person(name, languages) {
    this.name = name
    this.languages = languages
}
Person.prototype.sleep = function() {  console.log(this.name + ' go to sleep') }

function Developer(name, languages, codeLanguage) {
    // 构造函数内，使得Person实例的属性/方法，不会变成原型共享属性/方法
    Person.call(this, name, languages) // 构造函数终归也是函数
    this.codeLanguage = codeLanguage
}
// 继承原型
// 原型链，使得Person实例拥有的属性/方法，都变成Developer原型的共享属性/方法
// 单以下这一行代码会有“当属性为引用类型”的bug，所以需要配合上面Person.call
Developer.prototype = new Person()
Developer.prototype.constructor = Developer

var jsCoder = new Developer('tom', ['Chinese', 'English'], ['js', 'css'])
// Developer中没有定义sleep方法，但可以访问到，说明Develper继承了Person
jsCoder.sleep() // tom go to sleep
```

## 寄生组合继承

用空函数的原型去等于父类原型，再用子类的原型等于干净函数的实例，从而达到消除一次执行Person函数。

``` js
// 寄生组合继承，也是最理想的继承方式
function Person(name, languages) {
    this.name = name
    this.languages = languages
}
Person.prototype.sleep = function() {  console.log(this.name + ' go to sleep') }

function Developer(name, languages, codeLanguage) {
    Person.call(this, name, languages)
    this.codeLanguage = codeLanguage
}

// 利用空函数中介，实现继承
Developer.prototype = object(Person.prototype)
Developer.prototype.constructor = Developer
function object(origin) { // object函数，等同于ES6中Object.create
    function F(){}
    F.prototype = origin
    return new F()
}

var jsCoder = new Developer('tom', ['Chinese', 'English'], ['js', 'css'])
jsCoder.sleep() // tom go to sleep
```

## 通用继承

以上我们能得到一种通用的js继承，而这种方式也是很多js库正在使用的继承函数。

``` js
inheritPrototype(Developer, Person)

function inheritPrototype(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype)
    subClass.prototype.constructor = subClass
    // 或者一条代码
    // subClass.prototype = Object.create(superClass && superClass.prototype, {
    //     constructor: { value: subClass, writable: true, configurable: true }
    // });
}
```

## 参考文章

* [avascript面向对象编程（二）：构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
* [JavaScript深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)
* [MDN - Object​.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)