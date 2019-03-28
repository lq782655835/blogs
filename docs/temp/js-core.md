# js继承

对于ES5来说，没有class的概念。在es5中，类其实就是保存了一个函数的变量，这个函数有自己的属性和方法。将属性和方法组成一个类的过程就是封装。

js的继承是利用原型链来实现的

var o = new Object()

新建一个对象o
o. __proto__ = Object.prototype 将新创建的对象的__proto__属性指向构造函数的prototype
将this指向新创建的对象
返回新对象，但是这里需要看构造函数有没有返回值，如果构造函数的返回值为基本数据类型string,boolean,number,null,undefined,那么就返回新对象，如果构造函数的返回值为对象类型，那么就返回这个对象类型

``` js
// 定义Animal类
function Animal(name, obj) {
    this.name = name
    this.obj = obj
}
Animal.prototype.sleep = function() {
    return this.name + ' sleep'
}

var animal = new Animal('tom')
console.log(animal.sleep())

// 继承
function Bird(name, obj) {
    Animal.call(this, name, obj)
    this.wing = true
}
Bird.prototype = new Animal() // Bird共享原型对象Animal中的所有属性和方法
Bird.prototype.constructor = Bird

var bird = new Bird('jim')
console.log(bird)
console.log(Bird.prototype.constructor)
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

* [汤姆大叔-JavaScript核心](https://www.cnblogs.com/TomXu/archive/2012/01/12/2308594.html#4187939)

ES5中：

利用借用构造函数实现 实例属性和方法的继承 ；
利用原型链或者寄生式继承实现 共享的原型属性和方法的继承 