Ramda 的函数是自动柯里化的 。自动柯里化使得 "通过组合函数来创建新函数" 变得非常容易。因为 API 都是函数优先、数据最后（先传函数，最后传数据参数），你可以不断地组合函数，直到创建出需要的新函数，然后将数据传入其中。

``` js
var obj = {
  a: 1,
  b: 2,
  b2: 3
}

// pipe函数要求：除第一个函数可以有多个参数，后面的参数都只支持1个参数
var fn = R.pipe(
  R.pickBy((_, key) => key.startsWith('b')),
  R.toPairs,
  // 对上个返回数据先map（map中第一个参数接受函数，对每条数据如何处理），map中每条数据进行join
  R.map(R.join(':'))
)
console.log(fn(obj)) // ["b:2","b2:3"]
```

``` js
var pickByResult = R.pickBy((_,key) => key.startsWith('b'), obj) // {"b":2,"b2":3}
var toPairsResult = R.toPairs(pickByResult) // [["b",2],["b2",3]]
var mapResult = R.map(R.join(':'), toPairsResult) // ["b:2","b2:3"]
```