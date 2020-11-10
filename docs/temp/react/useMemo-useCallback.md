# 什么时候使用useMemo和useCallback

## Hooks性能问题举例

以下例子，每次渲染都会重新执行`buzz(options)`副作用，而不管options里的bar/baz是否有变化。
``` js
function Foo({bar, baz}) {
  const options = {bar, baz}
  React.useEffect(() => {
    buzz(options)
  }, [options]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}

function Blub() {
  return <Foo bar="bar value" baz={3} />
}
```

这里有问题的原因是因为 useEffect 将对每次渲染中对 options 进行引用相等性检查，并且由于JavaScript的工作方式，每次渲染 options 都是新的，所以当React测试 options 是否在渲染之间发生变化时，它将始终计算为 true，意味着每次渲染后都会调用 useEffect 回调，而不是仅在 bar 和 baz 更改时调用。（本质上还是JS语言：{} != {}）

## 优化方案1

只需要把bar/baz提取成依赖项即可：

``` js
// option 1
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}
```

如果 bar 或者 baz 是（非原始值）对象、数组、函数，上面的解决方案就不行了。那该如何优化呢？这就引入了本期的useMemo和useCallback了

## 优化方案2

``` js
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz])
  return <div>foobar</div>
}

function Blub() {
  const bar = React.useCallback(() => {}, [])
  const baz = React.useMemo(() => [1, 2, 3], [])
  return <Foo bar={bar} baz={baz} />
}
```

## 参考

* [什么时候使用 useMemo 和 useCallback](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)
