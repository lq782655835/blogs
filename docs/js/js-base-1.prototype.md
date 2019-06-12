# JavaScript原型

JavaScript语言与传统的面向对象语言（如Java）有点不一样，js语言设计的简单灵活，没有class、namespace等相关概念，而是万物皆对象。虽然js不是一个纯正的面向对象语言，但依然可以对js面向对象编程。`java语言面向对象编程的基础是类,而js语言面向对象编程的基础是原型`。

原型是学习js的基础之一，由它衍生出许多像原型链、this指向、继承等问题。所以深入掌握js原型，才能对其衍生的问题有很好的理解。网上有很多文章解释原型里的等式关系，那样有些晦涩难懂，这里笔者从js设计历史来逐步解释js原型。

## 历史

在ES6前，`js语法是没有class`的。倒不是js语言作者Brendan Eich忘记引入class语法，而是因为当初设计js语言时，只想解决表单验证等简单问题（估计js作者没想到后来js成为最流行的语言之一），没必要引入class这种重型武器，不然就跟Java这种基于class的面向对象语言一样了。具体可以看下阮一峰老师的[Javascript继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)。

虽然设计js语言时，更多的考虑轻量级灵活，但依然要在语言层面考虑对象封装以及多个对象之间复用的问题。先看下使用传统方式进行封装：

``` js
function Person(name) {
    return {
      name: name,
      sleep: function() {
        console.log( 'go to sleep' )
      }
    }
}

var person1 = Person('tom')
var person2 = Person('lucy')
... personN
```

传统方式有以下两个弊端：
1. person1、person2...personN 实例对象没有内在联系，它们只是基于相同的工厂函数生成。
2. 浪费内存，无法共享属性和方法。比如每个人的sleep方法是相同的，但生成10000个person实例会有10000个sleep方法占据内存

既然无意引入class语法，同时需要满足对象的封装以及复用问题，那就需要在js语言层面引入一种机制来处理class问题。

## 原型

`js作者使用了原型概念来解决class问题`。那什么是原型？原型是如何在语法层实现的？会涉及到哪些概念？

### constructor

js原型概念通俗讲有点像Java中的类概念，多个实例是基于共同的类型定义，就像tom、lucy这些真实的人（占据空间）基于Person概念（不占空间，只是定义）。java中类是基于class关键字的，但js中没有class关键字，有的是function。而java类定义中都有个构造函数，实例化对象时会执行该构造函数，所以`js作者简化把构造函数constructor作为原型（代替class）的定义`。同时规定构造函数需要满足以下条件：
* 首字母大写
* 内部使用this
* 搭配使用new生成实例

``` java
// java定义类
class Person {
  // java类中都有构造函数
  constructor(name) {
    this.name = name
  }

  public void sleep() {
    ....
  }
}
```

``` js
// js使用构造函数代替类的作用
function Person(name) {
  this.name = name
  this.sleep = function() { ... }
}
```

### new
以上通过构造函数定义了Person这个类。但如何区分一个function定义是构造函数还是普通函数？难道是看定义的函数里面是否有this来判断？

当然不是，`js作者引入new关键字来解决该问题`。因为构造函数只是定义原型（不占据内存），最终还是需要产生实例（占据内存）来处理流程，所以使用new关键字来产生实例。同时规定new后面跟的是构造函数，而不是普通函数。这样就区分出定义的function，是构造函数还是普通函数。

``` js
// new 关键字后跟上构造函数，生成实例
// 语法层面上也和Java实例类一致
var tom = new Person('tom')
var lucy = new Person('lucy')
```

你肯定注意到`构造函数中this的疑问`，它到底是在哪定义的？this又代表什么？其实在执行new的过程中，它会发生以下一些事：
1. 新的对象tom被创建，占据内存。
2. 把this指向tom实例，任何this上的引用最终都是指向tom
3. 添加__proto__属性到tom实例上，并且把tom.__proto__指向Person.prototype（后续会讲的原型链）
4. 执行构造函数，最终返回tom对象

``` js
// 模拟new的实现
function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments); // 取出第一个参数,即构造函数
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
};

var tom = objectFactory(Person, 'tom')
// 赋值的this === tom
console.log(tom.name) // tom
console.log(tom.sleep) // Function
```

### prototype

new 和 constructor 解决了模拟class类的概念，使得产生的多个实例对象有共同的原型，同类型对象内在有了一些联系。看上去很完美，但还有个问题：每个实例对象本质上还是拷贝了构造函数对象里的属性和方法。tom和lucy实例的sleep方法依然创建了两个内存空间进行存储，而不是一个。这样不仅无法数据共享，对内存的浪费也是极大的（想象下再生成10000个tom）。那js作者是如何解决这个问题的？

`Brendan Eich为构造函数设置一个prototype属性来保存这些公用的方法或属性`。prototype属性是一个对象，你可以扩展该对象，也可以覆写该对象。当你通过new constructor() 生成实例时，这些实例的公用方法（如：tom.sleep方法）并不会在内存中创建多份，而是通过指针都指向构造函数的prototype属性（如：Person.prototype）。

> 注意：**Person构造函数和Person.prototype都是对象**，拥有诸多属性。并且对象的属性依然可以是对象，万物皆对象核心。

``` js
function Person(name) {
  this.name = name
}

// 构造函数都有一个非空的prototype对象
// 可以扩展该对象，也可以覆写该对象，以下在原型上扩展sleep方法
Person.prototype.sleep = function() { ... }

var tom = new Person('tom')
var lucy = new Person('lucy')
tom.sleep === lucy.sleep // true
```

由于所有实例对象共享同一个prototype对象(构造函数的prototype属性)，那么从外界看起来，prototype对象就好像是实例对象的原型，而实例对象则好像"继承"了prototype对象一样。`这就是我们通俗讲的:js面向对象编程是基于原型`。

> Javascript规定，**每一个构造函数都有一个prototype属性**，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。

## 原型链

我们再深入思考下，js是如何把各个实例跟构造函数的prototype对象（以下称原型对象）联系起来的？它们之间的通道是如何建立起来的？答案是使用new关键字。在上面我们模拟new关键字流程中，有个步骤是: 添加__proto__属性到tom实例上，并且把tom.__proto__指向Person.prototype。所以可以得到结论：`实例与原型对象间关联起来是通过__proto__属性`。

__proto__属性有什么用？当访问实例对象的属性或方法时，如果没有在实例上找到，js会顺着__proto__去查找它的原型，如果找到就返回。由于原型对象（如Person.prototype）也是一个对象，它也可以有自己的原型对象（比如覆写它），这样层层上溯，就形成了一个类似链表的结构，这就是`原型链（prototype chain）`。而通过覆写子类原型对象，再根据js原型链机制，可以让子类拥有父类的内容，就像继承一样，所以`原型链是js继承的基础`。

``` js
tom.__proto__ === lucy.__proto__ === Person.prototype // true
tom.sleep() // sleep方法是在原型链上找到的
```

> 注意new关键字以及原型链查找都是js语言内置的

## 总结

* 对原型的概念理解，语法层面不仅仅是prototype，还有constructor、new。
* 可以把构造函数当作是特殊的函数，但记住它终归只是一个函数。
* prototype属性是每个函数都有的，并且值是个不为空的对象，这在js语法层面就确定的。
* __proto__属性是在实例对象上，prototype属性是在构造函数上，并且在new关键字作用下两者指向同一个地方。
* js面向对象是利用原型来实现，js继承是利用原型链来实现的。

## 参考文章

* [阮一峰 - Javascript面向对象编程](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)

* [JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/blob/master/articles/%E6%B7%B1%E5%85%A5%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0/JavaScript%E6%B7%B1%E5%85%A5%E4%B9%8B%E4%BB%8E%E5%8E%9F%E5%9E%8B%E5%88%B0%E5%8E%9F%E5%9E%8B%E9%93%BE.md)

* [Prototypes in JavaScript](https://hackernoon.com/prototypes-in-javascript-5bba2990e04b)

* [JavaScript For Beginners: the ‘new’ operator](https://codeburst.io/javascript-for-beginners-the-new-operator-cee35beb669e)

* [汤姆大叔-JavaScript核心](https://www.cnblogs.com/TomXu/archive/2012/01/12/2308594.html#4187939)
