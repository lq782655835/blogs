# 正则表达式

正则表达式对于每个开发者都非常重要，用的好能在一些关键时刻让自己变得轻松。推荐个正则可视化工具：[regulex](https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24)，帮助学习者直观验证。再推荐[Regex Tester](https://www.regextester.com/)进行在线调试。

原理：
1. 解析
    * 语法分析
    * 词法分析
1. 编译
    * 状态机
1. 运行

## 限定符
``` js
* 0次或多次
+ 1次或多次
？ 0次或1次
{n} 匹配n次
{n,} 至少n次
{n, m} 至少n次，至多m次
```

``` js
\ 转义符
. 任意字符
| 或运算
\d = [0-9]
\D = [^0-9]
\w = [a-zA-Z0-9_]
\W = [^a-zA-Z0-9_]
\s 空白字符
\S 非空白字符
^ 定位符，字符串起始位置;当在[]号时代表取反。
$ 定位符，字符串末尾位置。
```

## 贪婪模式/非贪婪模式
贪婪模式：在整个表达式匹配成功的前提下，尽可能多的匹配。常用的有`*` 和 `+`限定符
``` js
/.*/g
```

非贪婪模式：在整个表达式匹配成功的前提下，尽可能少的匹配。
``` js
// 遇到？，尽可能少的匹配
/.*?/g
```

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
let regexTest = /#(.*)$/.test('http://localhost:8081/#/demo') // true
```

### string.match(regex)

* `在非全局匹配模式下`，类似regex.exec(string)。
* 在`全局匹配模式下(使用g标志)`，则将返回与完整正则表达式匹配的所有结果（Array），但不会返回捕获组，或者未匹配 null。
``` js
// 非全局匹配模式
let stringMatch = 'http://localhost:8081/#/demo'.match(/#(.*)$/)
// [ '#/demo',
// '/demo',
// index: 22,
// input: 'http://localhost:8081/#/demo' ]

// 全局匹配模式
let stringMatch = 'http://localhost:8081/#/demo'.match(/#(.*)$/g) // [ '#/demo' ]
```

### string.search(regex)
匹配成功，search() 返回正则表达式在字符串中首次匹配项的索引，否则返回 -1。类似regex.test()
``` js
let stringSearch = 'http://localhost:8081/#/demo'.search(/#(.*)$/) // 22
```

## 其他
其他正则相关语法@jawil总结的十分详细，故转载在此。
以下图片有个谬误，这里纠正下：`\w` 匹配一个单字字符（字母、数字或者下划线）。等价于 [A-Za-z0-9_]。

![](https://camo.githubusercontent.com/0c015371b3762c589971a7b227c47b17791b1123/68747470733a2f2f73332e353163746f2e636f6d2f7779667330322f4d30312f38452f35362f774b696f4c31692d4a7a65546650394541414f6c376749536d6a343938302e676966)