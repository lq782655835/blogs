# JS 经典面试题

重点考察JS原理及应用

## call/apply

### 问题
``` js
var foo = { value: 1 }
function bar() { console.log(this.value) }
bar.call(foo) // 期待打印：1
bar.apply(foo) // 期待打印：1
```

### 思路

call/apply立即执行函数，同时函数中的this改为指向context。类似等价于以下
``` js
var foo = {
    value: 1,
    fn: function bar() { console.log(this.value) }
}
```

``` js
Function.prototype.call = function(context, ...args) {
    context = context || window
    context.fn = this // 这里的this代表函数
    context.fn(...args) // 给context添加属性fn，所以执行fn方法时，里面的this代表context
    delete context.fn
}

Function.prototype.apply = function(context, ...args) {
    context = context || window
    context.fn = this
    context.fn(args) // apply传递数组
    delete context.fn
}
```

## bind

### 问题

``` js
var foo = { value: 1 }
function bar() { console.log(this.value) }
let barBind = bar.bind(foo)
barBind() // 期待打印：1
```

### 思路
通过apply改变this，并且返回一个函数
``` js
Function.prototype.bind = function (context, ...args) {
    var fn = this
    return function() {
        return fn.apply(context, args)
    }
}
```

## new

### 问题

``` js
new Foo('name') = _new(Foo, 'name') // 模拟new
```

### 思路

``` js
_new() {
    var object = new Object() // 1. 类都是object类型
    var Constructor = [].shift.call(arguments)
    var args = arguments // 剩下的参数
    object.__proto__ = Constructor.prototype // 2. 设置原型链
    var ret = Constructor.apply(obj, args) // 3. 构造函数执行
    return typeof ret === 'object' ? ret : obj
}
_new(Foo, 'name')

// es6
_new(Constructor, ...args) {
   let object = Object.create(Constructor.prototype)
   let ret = Constructor.apply(object, args)
   return typeof ret === 'object' ? ret : obj
}
```

## curry

### 问题

``` js
let addFun = function(a, b, c) { return a + b + c }
let curryFun = curry(addFun)
curryFun(1)(2)(3) === 6 // true
```

### 思路
递归，当执行的参数个数等于原本函数的个数，执行函数
``` js
var curry = function(fn) {
    var limit = fn.length // fn函数参数个数
    return function judgeCurry (...args) {
        if (args.length >= limit) {
            return fn.apply(null, args)
        } else {
            return function(...args2) {
                return judgeCurry.apply(null, args.concat(args2))
            }
        }
    }
}

// or es6
var curry = function(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args)
    }

    return function (...args2) {
        return curry(fn, ...args, ...args2)
    }
}
```

## pipe/compose

### pipe
* pipe(fn1,fn2,fn3,fn4)(args)等价于fn4(fn3(fn2(fn1(args)))
* 第一个函数的结果，作为第二个函数的参数，以此类推...

### compose
* compose(fn1,fn2,fn3,fn4)(args)等价于fn1(fn2(fn3(fn4(args)))
* 与pipe相反，先计算倒数第一个结果，作为倒数第二的参数，以此类推...

``` js
let loopItem = (prevFn, nextFn) => (...args) => prevFn(nextFn(...args))

const compose = (...fns) => fns.reduce(loopItem);
const pipe = (...fns) => fns.reduceRight(loopItem)

const example = pipe(
    (x, y) => x * y,
    x => x + 1
);
console.log(example(3, 4)) // 13
```

## flatten

### 深度为1的展平
``` js
// before：[1, 2, [3, 4, [5, 6]]]
// after flat: [1, 2, 3, 4, [5, 6]]

// 思路：使用reduce或map
function flatSingle(arr) {
    return arr.reduce((pre, val) => pre.concat(val), [])
}

// or
let flatSingle = arr => [].concat(...arr)
```

### 深度无限的展平
``` js
// before: [1,2,3,[1,2,3,4, [2,3,4]]]
// after flatDeep: [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]

// 思路：深度优先递归，使用reduce连接起来
// 深度优先算法 - 递归
function flatDeep(arr) {
    return arr.reduce((pre, val) => pre.concat(Array.isArray(val) ? flatDeep(val) : val), [])
}

// 深度优先算法 - 堆栈
function flatDeep(arr) {
    const stack = [...arr]
    const res = []
    while (stack.length) {
        const val = stack.pop() // 从尾部开始
        Array.isArray(val) ? stack.push(...val) : res.push(val)
    }

    return res.reverse()
}

// 取巧，利用Array.toString()
function flatDeep(arr) {
    return arr.toString().split(',')
}
```

### 指定深度的展平
深度的含义是指每一项展平的次数
``` js
// before: [1,2,3,[1, [2]], [1, [2, [3]]]]
// after: [ 1, 2, 3, 1, 2, 1, 2, [ 3 ] ]

function flatDeep(arr, depth = 1) {
    if (depth === 1) return arr.reduce((pre, val) => pre.concat(val), [])
    return arr.reduce((pre, val) => pre.concat(Array.isArray(val) ? flatDeep(val, depth - 1) : val), [])
}
```

## 去重
数组去除重复

``` js
// before: [2, 1, 3, 2]
// after: [2, 1, 3]

function removeRepeat(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

// or es6
let removeRepeat = arr =>  Array.from(new Set(arr))
let removeRepeat = arr =>  [...new Set(arr)]
```

## 浅拷贝/深拷贝

``` js
// 浅拷贝
function clone(source) {
    var target = {}
    for (var i in source) {
        source.hasOwnProperty(i) && target[i] = source[i]
    }

    return target
}

// or es6
const clone = source => Object.assign({}, source)
const clone = source => { ...source }
```

``` js
// 深拷贝
// 思路：递归赋值
const deepClone = obj => {
    const isObj = obj => typeof obj === 'object' || typeof obj === 'function' && obj !== null
    if (!isObj(obj)) {
        throw new Error('不是对象')
    }

    // 区分array和object对象
    let target = Array.isArray(obj) ? [] : {}
    // https://stackoverflow.com/questions/34449045/what-is-the-difference-between-reflect-ownkeysobj-and-object-keysobj
    Reflect.ownKeys(obj).forEach(key => {
        target[key] = isObj(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    return target
}

// 优化：以上未考虑到对象循环引用
const isObject = obj => obj !== null && (typeof obj === 'object' || typeof obj === 'function');
  const isFunction = obj => typeof obj === 'function'
  function deepClone (obj, hash = new WeakMap()) {
    if (hash.get(obj)) {
      // 环处理
      return hash.get(obj);
    }
    if (!isObject(obj)) {
      // 基本数据处理
      return obj;
    }
    if (isFunction(obj)) {
      // function返回原引用
      return obj;
    }

    let cloneObj;
    const Constructor = obj.constructor;
    switch (Constructor) {
      // 包装函数处理，可能是new Boolean(false)
      case Boolean:
      case Date:
        return new Date(+obj);
      case Number:
      case String:
      case RegExp:
        return new Constructor(obj);
      default:
        cloneObj = new Constructor(); // 重要：初始化cloneObj类型
        hash.set(obj, cloneObj);
    }

    [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)].forEach(k => {
      cloneObj[k] = deepClone(obj[k], hash);
    })
    return cloneObj;
  }

// or 取巧方法
// 注意这种取巧方法是有限制的
// 1. 只能解析Number、String、Array等能够被json表示的数据结构
// 2. 不能处理循环引用
const deepClone = source => JSON.parse(JSON.stringify(source))
```

## 防抖/节流

* 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。适合多次事件一次响应。
* 节流：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。适合大量事件按时间做平均分配触发。

``` js
// 防抖案例：窗口resize停止才执行最终的函数
function debounce(fn, wait, ...args) {
    var that = this
    fn.tId && clearTimeout(fn.tId)
    fn.tId = setTimeout(function() {
        fn.apply(that, args)
    }, wait)
}

function handle(e) {
    console.log('resize end event')
    console.log(e) // Event{}
}
// 缺点：handle不能写成匿名函数，因为把tId存储在handle函数对象上。所以间接导致传递参数e较为复杂
window.onresize = function(e) { debounce(handle, 1000, e) }

// 改进版
// 思路： 用闭包把tId存储起来
function debounce(fn, wait) {
    var tId
    return function() {
        var that = this
        var args = arguments
        tId && clearTimeout(tId)
        tId = setTimeout(function() {
            fn.apply(that, args)
        }, wait)
    }
}
function handle(e) {
    console.log('resize end event')
    console.log(e) // Event{}
}
window.onresize = debounce(handle, 1000)
```

``` js
// 节流案例： 不停scroll时，滚动条每隔100ms固定频率执行函数
function throttle(fn, wait) {
    var cur = new Date()
    fn.last = fn.last || 0
    if (cur - fn.last > wait) {
        fn.call()
        fn.last = cur
    }
}

function handle() {
    console.log('scroll event')
}
window.onscroll = function() { throttle(handle, 100) }

// 或者
function throttle(fn, wait) {
    var canRun = true // 标记是否可继续执行
    return function() {
        var that = this
        var args = arguments
        if (!canRun) return
        canRun = false
        setTimeout(function() {
            fn.apply(that, args)
            canRun = true
        }, wait)
    }
}
```

## 手动实现模版引擎

### 问题

手动实现模版引擎，类似underscore
``` js
// 实现underscore模板引擎
<script type="text/html" id="user_tmpl">
    <%for ( var i = 0; i < users.length; i++ ) { %>
        <li>
            <a href="<%=users[i].url%>">
                <%=users[i].name%>
            </a>
        </li>
    <% } %>
</script>

var precompile = _.template(document.getElementById("user_tmpl").innerHTML);
var html = precompile(data);
```

### 思路

1. 利用正则替换字符。
    1. 将 %> 替换成 p.push('
    1. 将 <% 替换成 ');
    1. 将 <%=xxx%> 替换成 ');p.push(xxx);p.push('
1. 利用eval/Function执行字符代码。

``` js
// 按以上规则形成如下：
');for ( var i = 0; i < users.length; i++ ) { p.push('
    <li>
        <a href="');p.push(users[i].url);p.push('">
            ');p.push(users[i].name);p.push('
        </a>
    </li>
'); } p.push('
```

``` js
function tmpl(str, data) {
    var string = "var p = []; p.push('" +
    str
    .replace(/[\r\t\n]/g, "")
    .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g,"p.push('")
    + "');"

    eval(string)

    return p.join('');
};
```

## Injector

### 问题

模拟RequireJS的模块。
``` js
injector.register('service', function(name) { return name })
injector.register('constant', 2)
var func = injector.resolve(['service', 'constant'], function(service,constant, other) {
    console.log(service(constant), other)
});
func(3) // 期待打印：2, 3
```

### 思路

通过闭包把register存储的值当作参数注入到func中。

笔者注：这种方式可以自己注册模块并且选择是否在流程中使用它，典型的`依赖注入`（也叫控制反转（IOC），因为本来func是用户依赖创建的，主动权在func上，但现在里面的逻辑是靠传入的service/serviceN参数确定的，相当于把主动权让渡给参数了，所以叫控制反转）。

``` js
// 依赖注入（控制反转）
var injector = {
    dependencies: {},
    register: function(key, value) {
        this.dependencies[key] = value;
    },
    resolve: function(deps, func, scope) {
        var registerArgs = deps.map(name => this.dependencies[name])
        return function(...args) {
            func.apply(scope || {}, [...registerArgs, ...args])
        }
    }
}
```

## 实现ajax.get()

说明：考查Promise能力

``` js
ajax.get = function(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.response, this)
                } else {
                    reject({ response: this.response, code: this.status})
                }
            }
        }
        xhr.send()
    })
}

get('http://api.wwnight.cn').then((value, that)=>{
    console.log(value)
})
```

## 图片懒加载

``` js
// 方法一
function inSight(el) {
  const bound = el.getBoundingClientRect()
  const height = window.innerHeight

  return bound.top < height
}

const imgs = document.querySelectorAll('.my-photo')

function checkImg() {
  console.log(1)
  imgs.forEach(img => {
    if (inSight(img)) {
      loadImg(img)
    }
  })
}

function loadImg(el) {
  if (!el.src) {
    const source = el.dataset.src
    el.src = source
  }
}

function throttle(fn, wait = 100) {
  let pre
  return function () {
    if (!pre) {
      pre = +new Date
    }
    let now = +new Date
    if (now - pre > wait) {
      pre = now
      fn()
    }
  }
}

window.onscroll = throttle(checkImg)

// 方法二
function checkImgs(){
    Array.from(document.querySelectorAll('.my-photo')).forEach(item => io.observe(item))
}

function loadImg(el){
    if(!el.src){
        const source = el.dataset.src
        el.src = source
    }
}

const io = new IntersectionObserver(ioes => {
    ioes.forEach((ioe)=>{
        const el = ioe.target
        const intersectionRatio = ioe.intersectionRatio
        if(intersectionRatio > 0 && intersectionRatio <= 1){
            loadImg(el)
        }
        el.onload = el.onerror = ()=>io.unobserve(el)
    })
})
```

## 手写发布订阅/依赖者模式

```js
// 发布订阅
const event = {
    obj: {},
    on: function(name, fn) {
        (this.obj[name] || this.obj[name] = []).push(fn)
    },
    emit: function(name, ...args) {
        if (Array.isArray(this.obj[name])) {
            this.obj[name].forEach(fn => fn.call(this, ...args))
        }
    }
}

// 依赖者模式
function Dep() {
    this.watchers = []
}
Dep.prototype.depend = watcher => this.watchers.push(watcher)
Dep.prototype.notify = () => this.watchers.forEach(w => w.update())

function Watcher(fn) {
    this.fn = fn
}
Watcher.prototype.update = function() {
    this.fn()
}
const dep = new Dep()
dep.depend(new Watcher(function() {}))
dep.notify()
```

## 参考文章
* [30-seconds-of-code](https://github.com/30-seconds/30-seconds-of-code)
* MDN [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [一行写出javascript函数式编程中的curry](https://segmentfault.com/a/1190000008248646)
* [ES6 JavaScript Compose Function](https://gist.github.com/JamieMason/172460a36a0eaef24233e6edb2706f83)
* [JS函数防抖和函数节流](https://juejin.im/post/5a35ed25f265da431d3cc1b1)
* [Dependency injection in JavaScript](http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript)