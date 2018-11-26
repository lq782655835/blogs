# ES6 Object

Object对象属性及其方法太常用了，有些相似的方法容易记忆错误，故根据[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)归类整理下Object常用内容。

## Object Key/Value

### Object.keys(obj)<sup>`ES6`</sup>
该方法返回一个`给定对象的自身可枚举属性`组成的数组。
> 只列出自身的枚举属性

### Object.values(obj)<sup>`ES8`</sup>
该方法返回一个`给定对象自身的所有可枚举属性值`的数组
> 只列出自身的枚举属性值

### Object.entries(obj)<sup>`ES8`</sup>
该方法返回一个`给定对象自身可枚举属性的键值对`数组。
> 只列出自身枚举的键值对数组

### Object.getOwnPropertyNames(obj)
该方法返回一个数组，该数组对元素是 obj`自身拥有的枚举或不可枚举属性`名称字符串
> 自身的枚举和不枚举属性都会列出

### for ... in

for...in语句以任意顺序遍历一个`对象的可枚举属性(包括原型链上的可枚举属性)`。包括原型链上的可枚举属性。
> 自身和原型链上的属性

## Object Descriptor

### Object.defineProperty(obj, prop, descriptor)
该方法会直接在一个对象上定义`一个`新属性，或者修改一个对象的现有属性， 并返回这个对象。
> Object.getOwnPropertyDescriptor()返回对象对应的属性描述符。

### Object.defineProperties(obj, props)
该方法直接在一个对象上定义`一个或多个`新的属性或修改现有属性，并返回该对象。
> Object.getOwnPropertyDescriptors()<sup>`ES8`</sup>返回对象所有属性描述符。该方法引入目的是为了解决Object.assign()无法正确拷贝get属性和set属性的问题，[详见此](http://es6.ruanyifeng.com/#docs/object-methods)

## Object Method

### Object.assign(target, ...sources)<sup>`ES6`</sup>
该方法用于将所有可枚举属性的值从一个或多个源对象`复制`到目标对象。它将返回目标对象。
>翻看源码能知道，它是一层浅拷贝

### Object. is(value1, value2)<sup>`ES6`</sup>
该方法判断两个值是否是相同的值。
> 解决ES5中只有===和==判断的不足[Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

### Object.freeze(obj)
该方法可以`冻结`一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。
> Object.isFrozen(obj)判断一个对象是否被冻结