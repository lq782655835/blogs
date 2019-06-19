
调用setState，最终会执行对应组件updateComponent

## 自定义组件更新

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

    var nextState = this._processPendingState(nextProps, nextContext); // 对在pending队列中的state，进行merge state，拿到最新state值。
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

``` js
// 更新当前组件
_performComponentUpdate: function(
    nextElement,
    nextProps,
    nextState,
    nextContext,
    transaction,
    unmaskedContext,
  ) {
    var inst = this._instance;

    // componentWillUpdate生命周期
    if (inst.componentWillUpdate) {
        inst.componentWillUpdate(nextProps, nextState, nextContext);
    }

    // // 如何更新当前组件呢
    this._updateRenderedComponent(transaction, unmaskedContext);
  },
```

``` js
_updateRenderedComponent: function(transaction, context) {
    var prevComponentInstance = this._renderedComponent; // this._renderedComponent = child;
    var prevRenderedElement = prevComponentInstance._currentElement; // pre VNode
    var nextRenderedElement = this._renderValidatedComponent(); // next VNode

    // 1. 如果前后两个VNode的type和key相同，意味着有相同的数据结构。由于是自定义组件，不需要更新DOM或props等操作，所以递归子元素即可。
    // 2. 如果type和key有一项不同，不同数据结构，重新渲染instantiateReactComponent + mountComponent
    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
      // 相同数据结构，递归更新子组件
      ReactReconciler.receiveComponent(
        prevComponentInstance
      );
    } else {
      // 不同数据结构，卸载再挂载。
      // 卸载所有子组件
      ReactReconciler.unmountComponent(prevComponentInstance, false);

        // 再挂载
      var child = this._instantiateReactComponent(nextRenderedElement);
      var nextMarkup = ReactReconciler.mountComponent(child);
    }
  },
```

## DOM组件更新


## diff算法比较Children

``` js
// diff 算法：ReactMultiChild.js

```

``` js
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      return transaction.perform(callback, null, a, b, c, d, e);
    }
  },
};
```

``` js
var NESTED_UPDATES = {
  initialize: function() {
    this.dirtyComponentsLength = dirtyComponents.length;
  },
  close: function() {
    if (this.dirtyComponentsLength !== dirtyComponents.length) {
      // Additional updates were enqueued by componentDidUpdate handlers or
      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
      // these new updates so that if A's componentDidUpdate calls setState on
      // B, B will update before the callback A's updater provided when calling
      // setState.
      dirtyComponents.splice(0, this.dirtyComponentsLength);
      flushBatchedUpdates();
    } else {
      dirtyComponents.length = 0;
    }
  },
};
```

* 事务流程
  * 执行流很像设计模式中的装饰者模式
  * callback为目标函数，before装饰initialize，after装饰close

## 参考资料

https://zhuanlan.zhihu.com/p/35226897