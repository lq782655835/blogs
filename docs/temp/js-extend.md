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

## 原型链
* 含有__protp__的对象都是实例
* Foo.prototype属于实例指向的原型链的一环（注意这里的Foo是定义，未实例化。简单理解可以认为这是一个类Class）
* 每个Foo.prototype都有构造函数constructor，指向Foo（简单理解是Class的构造函数指向Class）
* 构造函数是个函数，函数本身也有Function.prototype原型链

* this是执行上下文环境的一个属性，而不是某个变量对象的属性

``` js
// 构造函数
function Foo(y) {
  // 构造函数将会以特定模式创建对象：被创建的对象都会有"y"属性
  this.y = y;
}
 
// "Foo.prototype"存放了新建对象的原型引用
// 所以我们可以将之用于定义继承和共享属性或方法
// 所以，和上例一样，我们有了如下代码：
 
// 继承属性"x"
Foo.prototype.x = 10;
 
// 继承方法"calculate"
Foo.prototype.calculate = function (z) {
  return this.x + this.y + z;
};
 
// 使用foo模式创建 "b" and "c"
var b = new Foo(20);
var c = new Foo(30);
 
// 调用继承的方法
b.calculate(30); // 60
c.calculate(40); // 80
 
// 让我们看看是否使用了预期的属性
 
console.log(
 
  b.__proto__ === Foo.prototype, // true
  c.__proto__ === Foo.prototype, // true
 
  // "Foo.prototype"自动创建了一个特殊的属性"constructor"
  // 指向a的构造函数本身
  // 实例"b"和"c"可以通过授权找到它并用以检测自己的构造函数
 
  b.constructor === Foo, // true
  c.constructor === Foo, // true
  Foo.prototype.constructor === Foo // true
 
  b.calculate === b.__proto__.calculate, // true
  b.__proto__.calculate === Foo.prototype.calculate // true
 
);
```
![](https://pic002.cnblogs.com/images/2011/349491/2011123111482169.png)

理解上面内容后，对网络上常见的这张图就很好理解了：

![](https://images2015.cnblogs.com/blog/752003/201701/752003-20170120135801843-1947643869.jpg)

## 参考文章

* [avascript面向对象编程（二）：构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
* [JavaScript深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)