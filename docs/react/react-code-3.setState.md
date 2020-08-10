# React setState是异步吗

React官网对于setState的说明：

将setState()认为是一次请求而**不是一次立即执行更新组件的命令**。为了更为可观的性能，React可能会推迟它，稍后会一次性更新这些组件。React不会保证在setState之后，能够立刻拿到改变的结果。

以上说明执行setState时，有可能是异步（大部分情况下）更新组件（包括重新render ui以及及时修改组件this.state）。React为什么要做成大部分setState是异步的呢？有哪些情况是进行同步更新组件并且更新this.state的呢？

先说答案：在组件生命周期或React合成事件中，setState是异步；在setTimeout或者原生dom事件中，setState是同步。

为什么react大部分情况setState是异步的呢？假如所有setState是同步的，意味着每执行一次setState时（有可能一个同步代码中，多次setState），都重新vnode diff + dom修改，这对性能来说是极为不好的。如果是异步，则可以把一个同步代码中的多个setState合并成一次组件更新。

举个例子：

``` js
var Counter = React.createClass({
        getInitialState: function () {
          return { count: 0 };
        },
        handleClick: function () {
          // 同步代码中，多次setState最终只会执行一次组件更新（组件更新意味着this.state拿到最新值）
          this.setState({count: 1, }, (state) => {
            this.setState({ count : 3})
            console.log(this.state, 'next update') // 2
          });
          this.setState({ count: 2 });
          console.log(this.state, 'first') // 0 这就是大家常说的setState是异步过程，因为执行后组件state(this.state)没有改变

          // 同步表现
          setTimeout(() => {
              this.setState({count: 4})
              console.log(this.state, 'setTimeout') // 4 在setTimeout中执行setState，同步渲染ui以及及时更新this.state(同步表现)
          }, 0)
        },
        render: function () {
          console.log(this.state, 'render') // 2

          return (
            <button onClick={this.handleClick}>
              Click me! Number of clicks: {this.state.count}
            </button>
          );
        }
      });
      ReactDOM.render(
        <Counter />,
        document.getElementById('container')
      );
// 初始化时
{count: 0} "render"
// 单击按钮后
embedded:16 {count: 0} "first"
embedded:25 {count: 2} "render"
embedded:13 {count: 2} "next update"
embedded:25 {count: 3} "render"
embedded:25 {count: 4} "render"
embedded:20 {count: 4} "setTimeout"
```

react setState是如何实现的呢？异步更新的原理是什么呢？（以下源码分析基于react15.6）

## setState异步实现

``` js
ReactComponent.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

enqueueSetState: function(publicInstance, partialState) {
    // 找到需渲染组件
    var internalInstance = getInternalInstanceReadyForUpdate(
      publicInstance,
      'setState',
    );

    if (!internalInstance) {
      return;
    }

    // 每次都把新的state，push到队列中。
    // 方便后面一次性更新组件时，聚合成最新的state
    var queue =
      internalInstance._pendingStateQueue ||
      (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    // 更新
    enqueueUpdate(internalInstance);
  },
```

``` js
//代码位于ReactUpdateQueue.js
function enqueueUpdate(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}
//代码位于ReactUpdates.js
function enqueueUpdate(component) {
  ensureInjected();

  // 未开启事务流程：开启事务 + 更新组件
  // 在生命周期以及合成事件情况下，isBatchingUpdates=true
  // 在setTimeout以及原生DOM事件情况下，isBatchingUpdates=false
  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 已开启事务流程：放到脏数组中（组件不更新 + this.state不变），等待更新
  dirtyComponents.push(component);

  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}
```
以上是setState的关键代码，batchingStrategy.batchedUpdates里面用到了事务机制。
setState 本身的方法调用是同步的，但是**调用了setState不标志这react的 state 立即更新**，这个更新是要根据当前环境执行上下文来判断的，如果处于batchedUpadte的情况下，那么state的不是当前立马更新的，而不处于batchedUpadte的情况下，那么他就有可能立马更新的。

所以在componentDidMount中调用setState并不会立即更新state，因为正处于一个更新流程中，isBatchingUpdates为true，所以只会放入dirtyComponents中等待稍后更新。

## 合成事件中调用setState

``` js
dispatchEvent: function (topLevelType, nativeEvent) {
    // disable了则直接不回调相关方法
    if (!ReactEventListener._enabled) {
      return;
    }

    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
    try {
      // 在执行合成事件回调函数前，都先开启事务
      // 这样在执行回调函数里的setState时，都是放入脏数组时，往后更新
      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
}

ReactUpdates.batchedUpdates(callback, a, b, c, d, e) {
  ensureInjected();
  // 执行batchingStrategy.batchedUpdates意味着已开启事务流
  return batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}
```

## 更新组件处理state

更新组件时，有对state进行处理

``` js
ReactCompositeComponent.updateComponent: function(
    transaction,
    prevParentElement, // pre VNode
    nextParentElement, // next VNode
    prevUnmaskedContext,
    nextUnmaskedContext,
  ) {
    var inst = this._instance;
    var prevProps = prevParentElement.props;
    var nextProps = nextParentElement.props;

    // componentWillReceiveProps 生命周期
    if (willReceive && inst.componentWillReceiveProps) {
        inst.componentWillReceiveProps(nextProps, nextContext);
    }

    // 对在pending队列中的state，进行merge state，拿到最新state值。
    var nextState = this._processPendingState(nextProps, nextContext);
    var shouldUpdate = true; // 是否要更新组件，默认是true

      if (inst.shouldComponentUpdate) {
          // 如果组件里有定义
          shouldUpdate = inst.shouldComponentUpdate(
            nextProps,
            nextState,
            nextContext,
          );
      } else {
        // 如果是纯组件（PureComponent），浅比较
        if (this._compositeType === CompositeTypes.PureClass) {
          shouldUpdate =
            !shallowEqual(prevProps, nextProps) ||
            !shallowEqual(inst.state, nextState);
        }
      }

    // 是否更新组件，这里常是用户优化的地方，控制什么时候React组件什么时候更新。
    // 不设置就是true，子组件都会VDOM比较一遍（意味着子组件没变时，也会去比较（多余的操作，所以可以在此优化性能），不过浪费的性能是VDOM比较，而不是会改动DOM）。
    if (shouldUpdate) {
      // _performComponentUpdate --> _updateRenderedComponent
      this._performComponentUpdate(
        nextParentElement,
        nextProps,
        nextState,
        nextContext,
        transaction,
        nextUnmaskedContext,
      );
    }
  },
```

``` js
// 合并state，拿到最新值
_processPendingState: function(props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    // pending队列中只有0个或1个处理
    if (!queue) {
      return inst.state;
    }
    if (replace && queue.length === 1) {
      return queue[0];
    }

    // 多个处理
    var nextState = Object.assign({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      Object.assign(
        nextState,
        typeof partial === 'function'
          ? partial.call(inst, nextState, props, context)
          : partial,
      );
    }

    return nextState;
  },
```

## 总结

如果在以下情况下执行setState方法：
1. `生命周期里`-此时已经开启了事务，当执行多个state时，所有都是在脏数组中，没有同步更新组件，意味着此时组件上的state没有更新。这也是为什么上面打印this.state.count会是0
2. `合成事件回调函数里`-下发事件时开启了事务，回调函数里执行setState都是放在脏数组中，同上
3. `setTimeout和DOM原生事件里`，此时没有开启事务，直接同步更新组件 + 修改为最新的this.state
