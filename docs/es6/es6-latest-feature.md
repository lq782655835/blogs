# ES6-ECMAScript特性汇总
ES6+不仅给javascript语言带来质的飞跃，也在语法层面对开发人员友好了很多，js代码可以写的简洁与工整。这里也推荐大家看笔者整理的[AI Javascript风格指南 ](https://lq782655835.github.io/blogs/team-standard/clean-code-javascript.html)，有很多较长ES5代码转为简洁ES6+的例子。以下汇总ES6+新增的特性，帮助大家更好的在实际编码过程中，应用上这些特性。从[tc39/proposals](https://github.com/tc39/proposals/blob/master/finished-proposals.md)可以看到Javascript 发展委员会TC39已经纳入标准的提案。

## ES6
详见笔者另外一篇文章：[ES6-新增特性一览](https://lq782655835.github.io/blogs/js/ES6-1.new-feature.html)

## ES7
* Array.prototype.includes()
* 求幂运算符(**)
``` js
[1,2].indexOf(3) // false
Math.pow（4,2）== 4 ** 2
```

## ES8
* 字符串填充（padStart 和 padEnd）
* Object.values()
* Object.entries()
* Object.getOwnPropertyDescriptors()
* 函数参数列表和调用中的尾随逗号
* Async Functions async/await(异步函数)
* 共享内存 和 Atomics
``` js
'test'.padEnd(8, 'abcd') // 'testabcd'

// Object.values()适用对象和数组
Object.values({ name: 'Fred', age: 87 }) // ['Fred', 87]
Object.values(['Fred', 'Tony']) // ['Fred', 'Tony']

// Object.entries()适用对象和数组
Object.entries({ name: 'Fred', age: 87 }) // [['name', 'Fred'], ['age', 87]]
Object.entries(['Fred', 'Tony']) // [['0', 'Fred'], ['1', 'Tony']]

async function doSomething() {
    console.log(await doSomethingAsync())
}

```

## ES9
* 对象的Rest(剩余)/Spread(展开) 属性
* Asynchronous iteration for-await-of（异步迭代）
* Promise.prototype.finally()
* 正则表达式改进
    * 先行断言(lookahead) 和 后行断言(lookbehind)
    * Unicode 属性转义 \p{…} 和 \P{…}
    * 命名捕获组（Named capturing groups）
    * 正则表达式的 ‘s’ 标志
``` js
[first, second, ...others] = [1, 2, 3, 4, 5] // ES6开始支持数组rest
const { first, second, ...others } = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 } // ES9支持对象rest

// 异步迭代
for await (const data of readFile(filePath)) {
  console.log(data)
}

// 无论成功还是失败，都会执行finally
fetch('file.json')
  .then(data => data.json())
  .catch(error => console.error(error))
  .finally(() => console.log('finished'))
```
持续更新...

## 参考文章
* [JavaScript 完全手册（2018版）](https://www.css88.com/archives/9965)
* [TC39 处理 ECMAScript 新特性的工作流程](https://www.css88.com/archives/7742)
* [New ES2018 Features Every JavaScript Developer Should Know](https://css-tricks.com/new-es2018-features-every-javascript-developer-should-know/)