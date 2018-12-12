# 正则表达式一张图总结

正则表达式对于每个开发者都非常重要，用的好能在一些关键时刻让自己变得轻松。推荐个正则可视化工具：[regulex](https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24)，帮助学习者直观验证。

## 正则方法

### regex.exec(string)
如果匹配成功，exec() 方法返回一个数组;匹配失败，返回 null
``` js
let regexExec = /#(.*)$/.exec('http://localhost:8081/#/demo')
/*
[ '#/demo',
'/demo',
index: 22,
input: 'http://localhost:8081/#/demo' ]
*/
```

### regex.test(string)
查看正则表达式与指定的字符串是否匹配。返回 true 或 false
``` js
let regexTest = /#(.*)$/.test('http://localhost:8081/#/demo')
// true
```

### string.match(regex)
类似regex.exec(string)
``` js
let stringMatch = 'http://localhost:8081/#/demo'.match(/#(.*)$/)
// [ '#/demo',
// '/demo',
// index: 22,
// input: 'http://localhost:8081/#/demo' ]
```

### string.search(regex)
匹配成功，search() 返回正则表达式在字符串中首次匹配项的索引。否则，返回 -1。类似regex.test()
``` js
let stringSearch = 'http://localhost:8081/#/demo'.search(/#(.*)$/)
// 22

```

其他正则相关语法[@jawil](https://github.com/jawil/blog/issues/32)总结的十分详细，故转载在此：

![](https://camo.githubusercontent.com/0c015371b3762c589971a7b227c47b17791b1123/68747470733a2f2f73332e353163746f2e636f6d2f7779667330322f4d30312f38452f35362f774b696f4c31692d4a7a65546650394541414f6c376749536d6a343938302e676966)