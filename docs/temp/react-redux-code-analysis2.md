

### redux中间件机制

koa洋葱模型核心原理：

``` js
Promise.resolve(middleware1(context, async() => { // 注意async关键字不能省略
  return Promise.resolve(middleware2(context, async() => {
    return Promise.resolve(middleware3(context, async() => {
      return Promise.resolve();
    }));
  }));
}))
```



## React之调度更新

记得很早之前，尤雨溪的一篇访谈里谈论react和vue的异同时，提到了`react是一个pull based的框架而vue是一个push based的框架`，两种设计理念没有孰好孰坏之分，只有不同场景下看谁更适合而已，push based可以让框架主动分析出数据的更新粒度和拆分出渲染区域不同依赖，所以对于初学者来说不用关注细节就能更容易写出一些性能较好的代码。

react感知到数据变化的入口是setState，用户主动触发这个接口，框架拉取到最新的数据从而进行视图更新，但是其实从react角度来看没有感知到数据变化一说，因为你只要显式的调用了setState就表示要驱动进行新一轮的渲染了。

### React&Redux之发布订阅

react-redux提供了connect装饰器来帮助组件完成检测过程，以便决定组件是否需要被更新。

我们来看一个典型的使用了redux的组件:
``` js
const mapStateToProps = state => {
  return { loginName: state.login.name, product: state.product };
}

@connect(mapStateToProps)
class Foo extends React.Component {
  render() {
    const { loginName, product } = this.props;
    // 渲染逻辑略
  }
}
```

mapStateToProps其实是一个状态选择操作，挑出想要的状态映射到实例的props上，变化检测发生哪一步呢？通过源码我们会知道`connect通过高阶组件，在包裹层完成了订阅操作以便监听store数据变化，订阅的回调函数计算出当前组件该不该渲染`，我们实例化的组件时其实是包裹后的组件，该组件实现了shouldComponentUpdate行为，在它重渲染期间会按照react的生命周期流程调用到shouldComponentUpdate以决定当前组件实例是否需要更新。

注意我们提到了一个订阅机制，`因为redux自身的实现原理，当单一状态树上任何一个数据节点发生改变时，其实所有的高阶组件的订阅回调都会被执行`，具体组件该不该更新，回调函数里会浅比较前一刻的状态和后一刻状态来决定当前实例需不要更新，所以这也是为什么redux强调如果状态改变了，一定总是要返回新的状态，以便辅助浅比较能够正常工作，当然顺带实现了时间回溯功能，但是大多数时候我们的应用本身是不需要此功能的，而redux-dev-tool倒是非常依赖单一状态在不同时间的快照来实现重放功能。

> redux按需更新

### 参考

* Redux状态管理之痛点、分析与改良：https://segmentfault.com/a/1190000009540007
* 【Concent杂谈】精确更新策略：https://cloud.tencent.com/developer/article/1573642