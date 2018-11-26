# JS设计模式

## 单例模式

单例模式定义了一个对象的创建过程，此对象只有一个单独的实例，并提供一个访问它的全局访问点。

ES5闭包实现：

``` js
var single = (function(){
    var unique;

    function singleXXX(){
        // ... 生成单例的构造函数的代码
    }

    return {
        getInstance : function() {
            if (unique === undefined) {
                unique = new singleXXX()
            }
            return unique
        }
    }
})();

let singleXXX1 = single.getInstance()
let singleXXX2 = single.getInstance()
console.log(singleXXX1 === singleXXX2) // true
```

ES5缓存实现：
``` js
function SingleXXX() {
    if (typeof SingleXXX.instance === 'object') {
        return SingleXXX.instance
    }

    // ...生成单例的构造函数的代码

    // 缓存实例
    SingleXXX.instance = this
}

let singleXXX1 = new SingleXXX()
let singleXXX2 = new SingleXXX()
console.log(singleXXX1 === singleXXX2) // true
```

ES6 Object实现：
``` js
function singleXXX(){}
let single = {
    unique: null,
    getInstance: function() {
        if (this.unique === undefined) {
            this.unique = new singleXXX()
        }
        return this.unique
    }
}
 // 保证实例不被改写
Object.defineProperty(single, 'unique', {
    writable: false,
    configurable: false
})
// 或Object.freeze(single)

let singleXXX1 = single.getInstance()
let singleXXX2 = single.getInstance()
console.log(singleXXX1 === singleXXX2) // true
```

ES6 Class实现,跟Java、C#等面向对象语言写法一致：
``` js
class SingleXXX {
    constructor() {
        // ...生成单例的构造函数的代码
    }
    static getInstance() {
        if(!this.instance) {
            this.instance = new SingleXXX()
        }
        return this.instance
    }
}
let singleXXX1 = SingleXXX.getInstance()
let singleXXX2 = SingleXXX.getInstance()
console.log(singleXXX1 === singleXXX2) // true
```

## 职责链模式

使多个对象都有机会处理请求，从而`避免请求的发送者和接受者之间的耦合关系`，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

优点：解耦了请求发送者和N个接受者之间的复杂关系。

弊端：不能保证某个请求一定会被链中的节点处理。

``` js
/* 传统方式实现 */
// orderType：[1:500, 2:200, 3:普通]，isPaid：true/false，stock：库存量
var order = function(orderType, isPaid, stock) {
    if(orderType === 1) {
        if(isPaid) {
            console.log("500元定金预购，得到100优惠券");
        } else {
            if(stock > 0) {
                console.log("普通购买，无优惠券");
            }else {
                console.log("库存不足");
            }
        }
    }else if(orderType === 2) {
        if(isPaid) {
            console.log("200元定金预购，得到50优惠券");
        } else {
            if(stock > 0) {
                console.log("普通购买，无优惠券");
            }else {
                console.log("库存不足");
            }
        }
    }else if(orderType === 2) {
        if(stock > 0) {
            console.log("普通购买，无优惠券");
        }else {
            console.log("库存不足");
        }
    }
}

order(1, true, 500);

/*职责链 */
var order500 = function(orderType, isPaid, stock) {
    if(orderType === 1 && isPaid === true) {
        console.log("500元定金预购，得到100优惠券");
    }else {
        return "nextSuccessor";
    }
};

var order200 = function(orderType, isPaid, stock) {
    if(orderType === 2 && isPaid === true) {
        console.log("200元定金预购，得到50优惠券");
    }else {
        return "nextSuccessor";
    }
};

var orderNormal = function(orderType, isPaid, stock) {
    if(stock > 0) {
        console.log("普通购买，无优惠券");
    }else {
        console.log("库存不足");
    }
};

// Function原型链上加入after方法
Function.prototype.after = function(fn) {
    var self = this;
    return function() {
        var ret = self.apply(this, arguments);
        if(ret === "nextSuccessor") {
            return fn.apply(this, arguments);
        }
        return ret;
    };
}

var order = order500.after(order200).after(orderNormal);
order(1, true, 10);
```

## 策略模式

定义一系列的算法，把它们一个个封装起来，将不变的部分和变化的部分隔开。策略模式至少2部分组成：策略类和环境类

`策略类`： 封装具体的算法，可能有很多策略算法，这是变化的部分。

`环境类`： 调用算法的使用方式，是不变的部分。

``` js
/* 传统方式实现 */
function Price(personType, price) {
    if (personType == 'vip') {
        return price * 0.5; //vip 5 折
    } 
    else if (personType == 'old'){
        return price * 0.3; //老客户 3 折
    }
    ... // 每多一次情形，多一次else分支
    else {
        return price; //其他都全价
    }
}

/* 策略模式 */
// 对于vip客户
function vipPrice() {
    this.discount = 0.5;
}
vipPrice.prototype.getPrice = function(price) {
　　return price * this.discount;
}

// 对于老客户
function oldPrice() {
    this.discount = 0.3;
}
oldPrice.prototype.getPrice = function(price) {
    return price * this.discount;
}

// 对于普通客户
function Price() {
    this.discount = 1;
}
Price.prototype.getPrice = function(price) {
    return price ;
}

// 环境类，调用方式是固定的。算法策略类可变化
function Context() {
    this.name = '';
    this.strategy = null;
    this.price = 0;
}
Context.prototype.set = function(name, strategy, price) {
    this.name = name;
    this.strategy = strategy;
    this.price = price;
}
Context.prototype.getResult = function() {
    console.log(this.name + ' 的结账价为: ' + this.strategy.getPrice(this.price));
}

var context = new Context();
var vip = new vipPrice();
context.set ('vip客户', vip, 200); // 解耦可变与不可变
context.getResult();
```

以上写法风格适用于Java、ASP.NET、JS等面向对象语言。考虑到js脚本的动态性，实际应用中通常我们会这样应用策略模式：

``` js
var obj = {
        "vip": function(price) {
            return price * 0.5;
        },
        "old" : function(price) {
            return price * 0.3;
        },
        "normal" : function(price) {
            return price;
        }
};
var calculatePrice =function(level,price) {
    return obj[level](price);
};
console.log(calculatePrice('vip',200));
```

## 参考文档

* [design-patterns](https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/builder.html)