## Object.defineProperty(target, propertyKey, attributes)

在对象target上定义新属性propertyKey。
attributes可定义:
* configurable
* enumerable
* writable
* value
* get
* set

### 实际应用

1. 代理：
``` js
// old
//加入有一个目标节点， 我们想设置其位移时是这样的
var targetDom = document.getElementById('target');
var transformText = 'translateX(' + 10 + 'px)';
targetDom.style.webkitTransform = transformText;
targetDom.style.transform = transformText;

// new
Object.defineProperty(dom, 'translateX', {
set: function(value) {
         var transformText = 'translateX(' + value + 'px)';
        dom.style.webkitTransform = transformText;
        dom.style.transform = transformText;
}
//这样再后面调用的时候, 十分简单
dom.translateX = 10;
dom.translateX = -10;
```

2. express获取属性时警告内容

``` js
[
  'json',
  'urlencoded',
  'bodyParser',
  'compress',
  ...
].forEach(function (name) {
  Object.defineProperty(exports, name, {
    get: function () {
      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately.');
    },
    configurable: true
  });
});
```

## Object.create(proto, [propertiesObject])

基于一个存在的obj对象实例，生成新的实例。

``` js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten
me.printIntroduction();

const myObject = Object.create(null)
```

polyfill:
``` js
// Object.create polyfill
Object.create = function (proto) {
    // 原型链继承
    function F() { F.prototype = proto }
    return new F()
}
```

思考题：为什么要有Object.create(null)？

Object.create(null)创建一个对象，但这个对象的原型链为null，即Fn.prototype = null
``` js
let a = null
let b = Object.create(null) // 返回纯{}对象，无prototype
let c = {}
let d = Object.create({})

a.attr // throw error
a.__proto__ // throw error

b // {}
b.attr // undefined
b.__proto__ // undefined
b.toString() // throw error

// d表现与c一致，毕竟只是多嵌套了一层原型链
c // { __proto__: {constructor: ƒ, ...} }
c.attr // undefined
c.__proto__ // {constructor: ƒ, ...}
c.toString() // "[object Object]"
```

`需要Object.create(null)的时候`：
* 需要一个非常干净且高度可定制的对象当作数据字典的时候
* 不考虑for in到原型链的属性（与Object.keys()等效）

所以绝大部分时候是直接使用`{}`

## Reflect

Reflect是全局对象（就像JSON或Math一样，提供了一系列的方法），意味着this是固定的。
Reflect对象有下面这些静态的方法：

```
Reflect.apply
Reflect.construct
Reflect.defineProperty
Reflect.deleteProperty // 相当于ES5的delete操作符
Reflect.enumerate // 废弃的
Reflect.get
Reflect.getOwnPropertyDescriptor
Reflect.getPrototypeOf
Reflect.has // 相当于ES5的in操作符
Reflect.isExtensible
Reflect.ownKeys
Reflect.preventExtensions
Reflect.set
Reflect.setPrototypeOf
```

Reflect对象上的方法，基本都可以在Object上找到，为什么要新添加一个呢？主要的原因有这么几点，
1. Reflect上面的一些方法`并不是专门为对象设计`的，比如Reflect.apply方法，它的参数是一个函数，如果使用Object.apply(func)会让人感觉很奇怪。
2. 用`一个单一的全局对象去存储这些方法`，能够保持其它的JavaScript代码的整洁、干净。不然的话，这些方法可能是全局的，或者要通过原型来调用。
3. 将一些命令式的操作如`delete，in等使用函数来替代`，这样做的目的是为了让代码更加好维护，更容易向下兼容；也避免出现更多的保留字。
4. Reflect.defineProperty(target, propertyKey, attributes)返回boolean值，而Object.defineProperty(target, propertyKey, attributes)定义失败会报错
5. `Reflect对象的方法与Proxy对象的方法一一对应`，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。

