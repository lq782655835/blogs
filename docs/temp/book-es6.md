# 《ES6标准入门》

必读书，阮一峰老师经典书籍。

## 对象解构

``` js
let a = [{a: 1}, {a:2}]
let b = a.map(i => ({...i, label: i.a, value: i.a}))
// or Object.assign浅拷贝
// let b = a.map(i => Object.assign({}, i, { label: i.a, value: i.a }))
console.log(b) // [ { a: 1, label: 1, value: 1 }, { a: 2, label: 2, value: 2 } ]
```

## Proxy

代理。Proxy用于修改某些操作（如in/apply/get/set等）的默认行为，相当于**对编程语言进行编程**。

``` js
function createProxyArray(arr) {
    return new Proxy(arr, {
        get(target, propKey, receiver) {
            console.log(target, propKey, receiver) // target: [1, 2, 3] propKey: '-1' receiver: Proxy
            let index = Number(propKey)
            // 负数处理
            if (index < 0) propKey = String(target.length + index)

            return Reflect.get(target, propKey, receiver)
        }
    })
}

// 拦截数组可为负数
let arr = createProxyArray([1, 2, 3])
arr[-1]
```

## 修饰器

`修饰器只能作用在类或类的方法上`，不能作用在普通函数上，因为存在变量提升问题。

作用在类上：
``` js
@decorator
class A {}

// 等同于

class A {}
A = decorator || A
```

作用在类的方法上：
``` js
class A {
    @readonly
    name() {
        console.log(1)
    }
}

// 等同于

readonly(target, name, descriptor) // 装饰器内可修改descriptor值
Objeact.defineProperty(A.prototype, 'name', descriptor)
```

举例mixin：
``` js
function mixin(...args) {
    return function(target) {
        Object.assign(target.prototype, ...args)
    }
}

@mixin({ foo() {console.log(1)} })
class MyClass() {}

new MyClass().foo() // 1
```