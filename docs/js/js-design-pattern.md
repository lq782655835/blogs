# JS设计模式

js将函数作为一等公民，函数也是对象。所以很多经典的设计模式案例在js语言中，都是以变种的形式而存在。
设计模式在项目中的经典实践案例可以看笔者github [JS设计模式开发实践](https://github.com/lq782655835/design-patterns-project-case)。

## 1. 单例模式

单例模式定义了一个对象的创建过程，此对象只有一个单独的实例，并提供一个访问它的全局访问点。常见的上层调用方式有两种：

1. single.getInstance() 方法调用
2. new Single() 透明式

### 1.1 single.getInstance()

ES5闭包实现：

``` js
function singleXXX(){
    // ... 生成单例的构造函数的代码
}
var single = (function(){
    var unique;

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

### 1.2 new Single()

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

ES5闭包：
``` js
function singleXXX(){
    // ... 生成单例的构造函数的代码
}

var Single = (function(){
    var unique;

    return function(xx) {
        if (unique === undefined) {
            unique = new singleXXX(xx)
        }
        return unique
    }
})();

let singleXXX1 = new Single()
let singleXXX2 = new Single()
console.log(singleXXX1 === singleXXX2) // true
```

### 1.3 通用的惰性单例

``` js
var getSingle = function(fn) {
    var instance
    return function() {
        return instance || instance = fn.apply(this, arguments)
    }
}

Single = getSingle(function(){
    // todo something
    return new XXX()
})

let singleXXX1 = Single()
let singleXXX2 = Single()
console.log(singleXXX1 === singleXXX2) // true
```

## 2. 职责链模式

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

## 3. 策略模式

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
var calculatePrice = function(level,price) {
    return obj[level](price);
};
console.log(calculatePrice('vip',200));
```

考虑到js语言中，函数是一等公民，可以进行参数传值，以下也是js策略模式的变种：

``` js
calculatePrice = function(fn, price) {
    return fn(price)
}

let vipFun = function(price) { return price * 0.5 }
let oldFun = function(price) { return price * 0.3 }
calculatePrice(vipFun, 200)
```

## 4. 观察者模式

js中最常用的设计模式。在观察者模式中，观察者需要直接订阅目标事件；在目标发出内容改变的事件后，直接接收事件并作出响应。很多库都有该模式的实现，比如vue、redux等。

![image](https://user-images.githubusercontent.com/6310131/49351340-0026eb00-f6ee-11e8-8b78-dd823d4a96fc.png)

``` js
function Dep() {
    this.subs = [];
}
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}
Dep.prototype.notify = function () {
    this.subs.forEach(sub=>sub.update());
}
function Watcher(fn) {
    this.fn = fn;
}
Watcher.prototype.update = function () {
     this.fn();
}

var dep = new Dep(); // 观察者
dep.addSub(new Watcher(function () { // 观察者直接订阅观察者
    console.log('okokok');
}))
dep.notify();
```

## 5. 发布订阅模式

发布订阅模式属于广义上的观察者模式，也是最常用的观察者模式实现。在发布订阅模式中，发布者和订阅者之间多了一个发布通道；一方面从发布者接收事件，另一方面向订阅者发布事件；订阅者需要从事件通道订阅事件，以此避免发布者和订阅者之间产生依赖关系。发布者和订阅者不知道对方的存在，所以解耦更彻底。NodeJS的EventEmitter对象即为该模式的实现。

![image](https://user-images.githubusercontent.com/6310131/49351401-51cf7580-f6ee-11e8-9573-ed96842e9657.png)

> 简单理解，观察者模式中，发布者和订阅者是知道对方存在的，实现上使用了array；发布订阅模式，发布者和订阅者都不知道对方存在，定义了一个中介对象（可抽离成单独文件），实现上使用了object。

``` js
class EmitEvent {
    constructor() {
        this._events = {}
    }

    on(type, callback) {
        if(!this._events[type]) this._events[type] = []

        this._events[type].push(callback)
    }

    emit(type, ...args) {
        if(this._events[type]) {
            this._events[type].forEach(fn => fn.call(this, ...args))
        }
    }
}

// EmitEvent作为事件通道
let emitEvent = new EmitEvent()
emitEvent.on('a', (data) => console.log('123', data))
emitEvent.emit('a', { field: 1 })
```

## 6. 代理模式

通过代理，可以把职责区分的更开。同时也可以把一些消耗网络（如图片懒加载），或某些耗资源的操作，在使用时才去真正实例化（如防火墙）。

代理模式设计缓存案例：

``` js
// 单纯的乘基函数
let mult = (...args) => args.reduce((total, current) => total * current , 1)

// 通过代理把缓存的逻辑，隔离开来
let proxyMult = (function() {
    let cache = {}
    return function(...args) {
        let argsStr = args.join(',')
        return cache[argsStr] || (cache[argsStr] = mult.apply(this, args))
    }
})()

proxyMult(1, 2, 3, 4) // 24
```

以上案例在js中更多的使用**高阶函数**，使得能力进一步泛化:

``` js
let mult = (...args) => args.reduce((total, current) => total * current , 1)

// 高阶函数
let proxyFactory = function(fn) {
    let cache = {}
    return function(...args) {
        let argsStr = args.join(',')
        return cache[argsStr] || (cache[argsStr] = fn.apply(this, args))
    }
}
let proxyMult = proxyFactory(mult)

proxyMult(1, 2, 3, 4) // 24
```

## 7. 命令模式

从js语言看，命令模式形式上有点类似代理模式，本质上还是分离出耦合的逻辑，使得各独立对象有单一原则。

``` js
// 强耦合方式
var MenuBar = {
    refresh: () => console.log('refresh')
}
var RightContextBar = {
    add: (val) => console.log(val, 'add'),
    del: () => console.log('del')
}

button1.onclick= function() { MenuBar.refresh() }
button2.onclick= function() { RightContextBar.add(val) }
```

以上弊端很明显，button1和MenuBar强耦合了,而且无法扩展，比如command之后可以undo，此时就需要一个中间类来做这部分解耦。
以下是传统class方式解决方案：

``` js
// class 命令模式
var setCommand = (button, command) => button.onclick = function() {
    // 执行统一方法：execute，不用管执行方是谁
    command.execute()
}

// 定义的Command类，隔绝了调用方和被调用方，充当了中介者
//（解耦合，分担了部分职责）。
class RefreshMenuBarCommand {
    constructor(receiver) {
        this.receiver = receiver
    }
    execute() {
        this.receiver.refresh()
    }
}
class AddMenuBarCommand {
    constructor(receiver, val) {
        this.receiver = receiver
        this.val = val
    }
    execute() {
        this.receiver.add(this.val)
    }
}
setCommand(button1, new RefreshMenuBarCommand(MenuBar))
setCommand(button2, new AddMenuBarCommand(RightContextBar, '1'))
```

对于函数是一等公民的Javascript，不需要用到多余的class类，因为函数也是一个对象类。

``` js
// js 命令模式
var setCommand = (button, command) => button.onclick = function() {
    command()
}
var RefreshMenuBarCommand = function (receiver) {
    return function() {
        receiver.refresh()
    }
}
var AddMenuBarCommand = function (receiver, val) {
    return function() {
        receiver.add(val)
    }
}
setCommand(button1, RefreshMenuBarCommand(MenuBar))
setCommand(button2, AddMenuBarCommand(RightContextBar))
```

在实际生产中，我们更可能把command命令统一execute，同时利用必包，可以在中间AddMenuBarCommand对象中存储一些东西（比如做undo行为）

``` js
var setCommand = (button, command) => button.onclick = function() {
    command.execute()
}

var AddMenuBarCommand = function (receiver, val) {
    // you can store variables for do something in here
    // ...
    return {
        execute: function() {
            receiver.add(val)
        }
    }
}

setCommand(button2, AddMenuBarCommand(RightContextBar, val))
```

## 8. 组合模式

组合模式主要用到聚合（可认为使用到js数组），拥有上下级关系。这模式要求有两点：1. 组合对象和叶对象操作必须具有一致性，因为执行时是深度遍历，不区分操作。 2. 对象之间不能有多重关系。比如A节点既属于B，也属于C，此时就不能使用组合模式。

``` js
class Folder {
    constructor(name) {
        this.name = name
        this.files = []
    }

    add(file) {
        this.files.push(file)
    }

    scan() {
        console.log(name, 'scan')
        for (let file of this.files) {
            file.scan()
        }
    }
}

class File {
    constructor(name) {
        this.name = name
    }

    add(file) {
        throw new Error('not add file')
    }

    scan() {
        console.log(name, 'scan')
    }
}

let languageFolder = new Folder('language')

let jsFolder = new Folder('js')
jsFolder.add(new File('vue'))
jsFolder.add(new File('React'))

// 对象通过add形成上下级关系
languageFolder.add(jsFolder)
languageFolder.add(javaFolder)
...
// 拥有相同的接口
// scan执行的是深度遍历
languageFolder.scan()
```

## 9. 模板方法模式

这模式就较为简单，主要是对通用流程进行总结，然后进行占位。比如组件的生命周期。

``` js
class Component {
    constructor() {
        this.name = name
        this.init() // 关键的流程
    }

    init() {
        this.beforeMounted()
        this.mounted()
        ...
    }

    beforeMounted() {}
    mounted() {}
}

class InstanceComponent extends Component {
    beforeMounted() {
        console.log('InstanceComponent beforeMounted')
    }
    mounted() {
        console.log('InstanceComponent mounted')
    }
}

new InstanceComponent('instance') // 自动初始化
```

## 10. 中介者模式

用来隔离对象之间互相依赖，但同时使得中介者任务较重。

比如玩对战游戏，队友和对手都是强相关：

``` js
class Player {
    constructor(name, teamColor) {
        this.partners = [] // 强依赖的队友列表
        this.enemies = [] // 强依赖的对手列表
        // 自身状态
        this.state = 'live'
        this.name = name
        this.teamColor = tem
    }

    win() {
        console.log('win')
    }

    lose() {
        console.log('lose')
    }

    // 当有变化时，需要更新所有强依赖的对象，非常复杂
    // 队友掉线或者换队等状态变化，都得硬更新，几乎不可维护
    die() {
        let isAllDead = true
        this.state = 'dead'
        for (let partner of this.partners) {
            if(partner.state !== 'dead') {
                isAllDead = false
                break
            }
        }

        // 通知
        if (isAllDead) {
            this.lose() // 自己失败
            for (let partner of this.partners) partner.lose();
            for (let enemy of this.enemies) enemy.win();
        }
    }
}

// 创建palyer
let playerFactory = (function(){
    let players = []
    return function(name, teamColor) {
        let newPlayer = new Player(name, teamColor)
        // 强依赖时，创建对象也非常麻烦
        for(let player of players) {
            let isPartner = newPlayer.teamColor === player.teamColor
            newPlayer.partners.push(isPartner ? newPlayer : player)
            newPlayer.enemies.push(isPartner ? player : newPlayer)
        }
        players.push(newPlayer)
        return newPlayer
    }
})()

var player1 = playerFactory('player1', 'red')
var player2 = playerFactory('player2', 'red')
var player3 = playerFactory('player3', 'black')
var player4 = playerFactory('player4', 'black')
player1.die()
player2.die()
```

对象与对象之间的关系，都是强依赖。当有变化时，需要更新所有强依赖的对象，非常复杂，假如增加队友掉线或者换队等状态变化，都得硬更新，几乎不可维护。所以此时需要分离出一个中介者，隔离对象之间的强依赖。对象状态改变时，让中介者去通知，对象之间不知对方的存在。

``` js
// 中介者模式
class Player {
    ...
    die() {
        this.state = 'dead'
        // 变化都发送给中间者
        playerDirector.dead(this)
    }
}

class PlayerDirector{
    constructor() {
        this.players = {} // 关系解耦
    }
    add(player) {
        let { teamColor } = player
        (players[teamColor] || players[teamColor] = []).push(player)
    }
    dead(player) {
        // 获取队友和对手
        let teamPlayers = this.players[player.teamColor]
        let enemyPlayers = Object.keys(this.players)
            .reduce((arr, key) => [...arr, ...this.players[key]], [])
            .filter(p => p.teamColor !== player.teamColor)

        let isAllDead = true
        for (let partner of teamPlayers) {
            if(partner.state !== 'dead') {
                isAllDead = false
                break
            }
        }
        if (isAllDead) {
            player.lose()
            for (let partner of teamPlayers) partner.lose();
            for (let enemy of enemyPlayers) enemy.win();
        }
    }

}

let playerDirector = new PlayerDirector()
playerDirector.add(new Player('player1', 'red'))
playerDirector.add(new Player('player2', 'red'))
```

## 11. 迭代器模式

提供一种方法，顺序访问一个聚合对象的各个元素，而又不需要暴露该对象的内部表示。

简单说就是使用统一的处理方法处理聚合对象，这模式相对简单，因为大部分语言都内置了迭代器。

``` js
// 迭代器模式模式获取合适上传组件对象
const iteratorUploadObj = (...args) => {
    for (let fn of args) {
        let uploadObj = fn()
        if (uploadObj) {
            return uploadObj
        }
    }
    return null
}

const getActiveUploadObj = () => {
    try {
        return new ActiveXObject('TXFTNActive.FINUpload') // IE 上传控件
    } catch {
        return false
    }
}
const getFlashUploadObj = () => {
    if (supportFlash()) {
        let str = '<object type="application/xshockwave-flash"></object>'
        return $(str).appendTo($('body'))
    }
    return false
}

const uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj, ...)
```

## 其他

* 状态模式。大部分模式是封装行为，该模式是封装状态（因为状态过多）
* 适配器模式。常用于兼容API

## 参考文档

* [design-patterns](https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/builder.html)

* [观察者模式和发布订阅模式有什么不同](https://www.zhihu.com/question/23486749)

* [观察者模式 vs 发布-订阅模式](https://juejin.im/post/5a14e9edf265da4312808d86)

* [设计模式推演——组合与继承](https://blog.csdn.net/crylearner/article/details/8888372)

* 《Javascript设计模式与开发实践》
