# perfermance API

## performance.mark()

根据标准，调用 performance.mark(markName) 时，发生了如下几步：

* 创建一个新的 PerformanceMark 对象（以下称为条目）；
* 将 name 属性设置为 markName；
* 将 entryType 属性设置为 'mark'；
* 将 startTime 属性设置为 performance.now() 的值；
* 将 duration 属性设置为 0；
* 将条目放入队列中；
* 将条目加入到 performance entry buffer 中；
* 返回 undefined

上述过程，可以简单理解为，“请浏览器记录一条名为 markName 的性能记录”

## performance.measure()

mark可以理解为一个打点数据，只记录当前打点的时间戳记录。
但更多时候我们需要记录从 A点-> B点的during。所以可以在两个mark时间戳后，调用measure，自动计算两个点的运行时长差值。

## performance.getEntriesByName()

mark() 和 measure() 两个api都是打点记录。如果用户要查看，使用getEntriesByName() 方法即可拿到详细信息。

``` js
const measure = (fn, name = fn.name) => {
  const startName = prefixStart(name)
  const endName = prefixEnd(name)
  performance.mark(startName)
  fn()
  performance.mark(endName)
  // 调用 measure
  performance.measure(name, startName, endName)
}
const getDuration = entries => {
  // 直接获取 duration
  const [{ duration }] = entries
  return duration
}
const retrieveResult = key => getDuration(performance.getEntriesByName(key))

// 使用时
function foo() {
  // some code
}
measure(foo)
const duration = retrieveResult('foo')
console.log('duration of foo is:', duration)
```

## 参考

* https://juejin.im/post/5b7a51886fb9a019ea01f593
