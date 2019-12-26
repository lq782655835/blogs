# React16新概念总览

## 1. Fiber

来由：`解决异步渲染问题`。把以前的VDOM同步渲染变为异步渲染，从而分出render phase 和 commit phase。

### 1.1 两个阶段

两个重要概念: `render phase and commit phase`。两个阶段的分界点：render.
* `render phase 可以被打断`， 大家不要在此阶段做一些有副作用的操作，可以放心在commit phase 里做。
* 然后就是`生命周期的调整`， react 把你有可能在render phase 里做的有副作用的函数都改成了static 函数， 强迫开发者做一些纯函数的操作。

在现有的React中，每个生命周期函数在一个加载或者更新过程中绝对只会被调用一次；`在React Fiber中，不再是这样了，第一阶段中的生命周期函数在一次加载和更新过程中可能会被多次调用。`

### 1.2 新的生命周期
新的静态方法:getDerivedStateFromProps

`componentDidCatch 和 getDerivedStateFromError` 的 区别:render phase 里产生异常的时候， 会调用 getDerivedStateFromError;在 commit phase 里产生异常大的时候， 会调用 componentDidCatch。

## 2. Suspense

作用：1 异步渲染 2. 异步获取数据（unstable）

### 2.1 异步渲染

在 16.6 版本之前，code-spliting 通常是由第三方库来完成的，比如 react-loadble(核心思路为: 高阶组件 + webpack dynamic import), 在 16.6 版本中提供了 Suspense 和 lazy 这两个钩子, 因此在之后的版本中便可以使用其来实现 Code Spliting。

原理：`等待分包资源完成（Promise.resolve），再继续render，其中依赖getDerivedStateFromError生命周期获取子组件报错信息。`

``` js
// Clock Component
import React from "react";
import moment from "moment";

const Clock = () => <h1>{moment().format("MMMM Do YYYY, h:mm:ss a")}</h1>;
export default Clock;

// Usage of Clock
const Clock = React.lazy(() => {
  console.log("start importing Clock");
  return import("./Clock");
});

// Real Use
<Suspense fallback={<Loading />}>
  { showClock ? <Clock/> : null}
</Suspense>
```

假设我们有一个组件， 是看当前时间的， 它用了一个很大的第三方插件， 而我想只在用的时候再加载资源，不打在总包里。

使用了React.lazy， 这样就能实现代码的懒加载。 React.lazy 的参数是一个function, 返回的是一个promise. 这里返回的是一个import 函数, webpack build 的时候， 看到这个东西， 就知道这是个分界点。 import 里面的东西可以打包到另外一个包里。

showClock 为 true, 就尝试render clock， 这时候， 就触发另一个事件： 去加载clock.js 和它里面的 lib momment。 目前react 的渲染模式还是同步的， 一口气走到黑， 那我现在画到clock 这里， 但是这clock 在另外一个文件里， 服务器就需要去下载， 什么时候能下载完呢， 不知道。 假设你要花十分钟去下载， 那这十分钟你让react 去干啥， 总不能一直等你吧。 Suspens 就是来解决这个问题的， 你要画clock, 现在没有，那就会抛一个异常出来。

componentDidCatch 和 getDerivedStateFromProps, 这两个函数就是来抓子组件 或者 子子组件抛出的异常的。

子组件有异常的时候就会往上抛，直到某个组件的 getDerivedStateFromProps 抓住这个异常，抓住之后干嘛呢， 还能干嘛呀， 忍着。 下载资源的时候会抛出一个promise, 会有地方(这里是suspense)捕捉这个promise, suspense 实现了getDerivedStateFromProps， getDerivedStateFromProps 捕获到异常的时候， 一看， 哎， 小老弟，你来啦，还是个promise, 然后就等这个promise resole， resolve 完成之后呢，它会尝试重新画一下子组件。这时候资源已经到本地了， 也就能画成功了。

用伪代码 大致实现一下：

``` js
getDerivedStateFromError(error) {
   if (isPromise(error)) {
      error.then(reRender);
   }
}
```

### 2.2 异步获取数据（unstable）

`就目前来说， 如果一个组件要自己获取数据， 就必须实现为一个类组件`， 而且会画两次， 第一次没有数据， 是空的， 你可以画个loading, didMount 之后发请求， 数据回来之后， 把数据setState 到组件里， 这时候有数据了， 再画一次，就画出来了。

虽然是一个很简答的功能， 我就想请求个数据， 还要写一堆东西， 很麻烦， 但在目前的正式版里， 不得不这么做。

``` js
import {unstable_createResource as createResource} from 'react-cache';

const resource = createResource(fetchDataApi);

const Foo = () => {
  const result = resource.read();
  return (
    <div>{result}</div>
  );

// ...

<Suspense>
   <Foo />
</Suskpense>};
```

## 3. Hooks

为什么引入Hooks？

* React 官方觉得 class组件太难以理解，OO（面向对象）太难懂了
* React 官方觉得 ， React 生命周期太难理解。

Hooks 带来的代码模式改变

可能不再需要 class
更多的将会是函数式组件。

大家只需要熟悉的， 三个就够了：

* useState
* useEffect
* useContext

原则：`Hooks，千万不要在 if 语句或者 for 循环语句中使用`

### 3.1 useState

``` js
const Counter = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  
  return (
    <div>
        <h1>{count}</h1>
        <button onClick={increment}>+</button>
    </div>
  );
};
```

useState 在 Counter 这个函数体中，每次 Counter 被渲染的时候，这个 useState 调用都会被执行，useState 自己肯定不是一个纯函数，因为它要区分第一次调用（组件被 mount 时）和后续调用（重复渲染时），只有第一次才用得上参数的初始值，而后续的调用就返回“记住”的 state 值。

如果组件中多次使用 useState 怎么办？React 如何“记住”哪个状态对应哪个变量？

React 是完全根据 useState 的调用顺序来“记住”状态归属的，假设组件代码如下：

``` js
const Counter = () => {
  const [count, setCount] = useState(0);
  const [foo, updateFoo] = useState('foo');
  
  // ...
}
```

每一次 Counter 被渲染，都是第一次 useState 调用获得 count 和 setCount，第二次 useState 调用获得 foo 和 updateFoo（这里我故意让命名不用 set 前缀，可见函数名可以随意）。

React 是渲染过程中的“上帝”，每一次渲染 Counter 都要由 React 发起，所以它有机会准备好一个内存记录，当开始执行的时候，每一次 useState 调用对应内存记录上一个位置，而且是按照顺序来记录的。React 不知道你把 useState 等 Hooks API 返回的结果赋值给什么变量，但是它也不需要知道，它只需要按照 useState 调用顺序记录就好了。

### 3.2 useEffect

React 还提供 useEffect，用于支持组件中增加副作用的支持。

``` js
import { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${this.state.count}`;
    // 这里只有mount时才被调用，相当于componentDidMount
    // 因为第二个参数不同时，第一个函数参数才会被调用，而常数永远不变
  }, [1]);

  return (
    <div>
       <div>{count}</div>
       <button onClick={() => setCount(count + 1)}>+</button>
       <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};
```

## 参考

https://segmentfault.com/a/1190000017483690
