# JavaScript继承

在上篇[详解JavaScript原型](./js-prototype.md)文章中,我们理解了原型的来源以及与其相关的constructor、new、prototype概念。下面我们来看看js是如何通过原型来实现面向对象的另外一个特征：继承。推荐《JavaScript高级程序设计》，js面向对象写的太棒了，层层递进，深入浅出。

``` js
// 组合继承，也叫经典继承
function Person(name, languages) {
    this.name = name
    this.languages = languages
    this.hasName = true
}
Person.prototype.sleep = function() {  console.log(this.name + ' go to sleep') }

function Developer(name, languages, codeLanguage) {
    // 使得Person实例的属性/方法，不会变成原型共享属性/方法
    Person.call(this, name, languages) // 构造函数终归也是函数
    this.codeLanguage = codeLanguage
}
// 继承原型
// 使得Person实例拥有的属性/方法，都变成Developer原型的共享属性/方法
// 单以下这一行代码会有“当属性为引用类型”的bug，所以需要配合上面Person.call
Developer.prototype = new Person()
Developer.prototype.constructor = Developer

var jsCoder = new Developer('tom', ['Chinese', 'English'], ['js', 'css'])
// Developer中没有定义sleep方法，但可以访问到，说明Develper继承了Person
jsCoder.sleep() // tom go to sleep
```

``` js
// 寄生组合继承，也是最理想的继承方式
function Person(name, languages) {
    this.name = name
    this.languages = languages
}
Person.prototype.sleep = function() {  console.log(this.name + ' go to sleep') }

function Developer(name, languages, codeLanguage) {
    this.name = name
    this.languages = languages
    this.codeLanguage = codeLanguage
}
inheritPrototype(Developer, Person)

function inheritPrototype(subClass, superClass) {
    var tempPrototype = object(superClass.prototype)
    tempPrototype.constructor = subClass
    subClass.prototype = tempPrototype
}

function object(origin) {
    function F(){}
    F.prototype = origin
    return new F()
}

var jsCoder = new Developer('tom', ['Chinese', 'English'], ['js', 'css'])
jsCoder.sleep() // tom go to sleep
```

## 参考文章

* [avascript面向对象编程（二）：构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
* [JavaScript深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)