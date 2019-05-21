# React源码分析 - 挂载和渲染

> 源码基于v15.6.2分支

和Vue类似，先通过`React.createElement()` 生成 VNode Tree，再通过`ReactDOM.render()`挂载到真实DOM节点上。

``` js
// 函数组件
function functionComponent(props) {
    return (<h1 {...props}>test</h1>) // 最终生成JSX，JSX由babel解析为React.createElemnet
}
ReactDOM.render(functionComponent({field: 1}), el)

// 类组件
class A extends React.Component {
    // 类组件必须有render函数。有自身状态State和生命周期。
    render() {
        return <h1 {...props}>test</h1>
    }
}
ReactDOM.render(<A />, el)
```

## React.createElement

类似Vue的createElement方法，但React的config对象较为简单，都作为props传入，Vue的VDOM基于snabbdom库，传入的config对象限制较多（如：on、atrrs、props）。两者最终都是得到VDOM Tree的数据机构。

### API

babel根据JSX中标签的首字母来判断是原生DOM组件，还是自定义React组件。如果首字母大写，则为React组件。这也是为什么ES6中React组件类名必须大写的原因

``` jsx
<div className="title" ref="example">
    <span>123</span>    // 原生DOM组件，首字母小写
    <ErrorPage title='123456' desc={[]}/>    // 自定义组件，首字母大写
</div>
```

``` js
// JSX转译后js
React.createElement(
    // type,标签名,原生DOM对象为String
    'div',
    // config，属性
    {
        className: 'title',
        ref: 'example'
    },
    // children，子元素
    React.createElement('span', null, '123'),
    React.createElement(
        // type,标签名,React自定义组件的type不为String.
        // _errorPage2.default为从其他文件中引入的React组件
        _errorPage2.default,
        {
            title: '123456',
            desc: []
        }
    )
)
```

### 源码
``` js
// package/react/src/ReactElement.js
ReactElement.createElement = function (type, config, children) {
  var propName;

  // 初始化参数
  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  // 从config中提取出内容，如ref key props
  if (config != null) {
    ref = config.ref === undefined ? null : config.ref;
    key = config.key === undefined ? null : '' + config.key;
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    // 提取出config中的prop，放入props变量中
    for (propName in config) {
      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // 处理children，挂到props的children属性下
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    // 只有一个参数时，直接挂到children属性下，不是array的方式
    props.children = children;
  } else if (childrenLength > 1) {
    // 不止一个时，放到array中，然后将array挂到children属性下
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // 取出组件类中的静态变量defaultProps，并给未在JSX中设置值的属性设置默认值
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // 返回一个ReactElement对象
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};
```

``` js
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: REACT_ELEMENT_TYPE, // 常量Symbol.for('react.element')

    // ReactElement对象上的四个变量，特别关键
    type: type,
    key: key,
    ref: ref,
    props: props,

    _owner: owner
  };
  return element;
}
```

## ReactDOM.render

1. 根据ReactDOM.render()传入不同的参数，React内部会创建四大类封装组件，记为componentInstance。
1. 而后将其作为参数传入mountComponentIntoNode方法中，由此获得组件对应的HTML，记为变量markup。
1. 将真实的DOM的属性innerHTML设置为markup，即完成了DOM插入。

简化流程：
* `ReactDOM.render()` src/renderers/dom/ReactDOM.js
  * `ReactMount.render` --> `ReactMount._renderSubtreeIntoContainer` src/renderers/dom/client/ReactMount.js
    1. 顶层包装。判断更新还是初始化，更新流程这节略
    1. 初始化：`ReactMount._renderNewRootComponent`
        1. `instantiateReactComponent`，不同的type，创建不同的组件实例（4种）。主要为了方便生成html时，直接调用组件实例的mountComponent。return new Component(type)
        1. `batchedMountComponentIntoNode` --> `mountComponentIntoNode` 创建事务，插入真实的DOM节点
            1. `wrapperInstance.mountComponent` 生成组件实例对应的html代码
            1. `ReactMount._mountImageIntoNode` 设置contaner的innerHTML

``` js
// src/renderers/dom/ReactDOM.js
var ReactDOM = {
  render: ReactMount.render,
};

// src/renderers/dom/client/ReactMount.js
// nextElement即为AST对象（VNode Tree）
render: function(nextElement, container, callback) {
    return ReactMount._renderSubtreeIntoContainer(
      null,
      nextElement,
      container,
      callback,
    );
  }
```

``` js
// 插入真实DOM
_renderSubtreeIntoContainer: function(
    parentComponent,
    nextElement,
    container,
    callback,
  ) {
    // 顶层包装
    var nextWrappedElement = React.createElement(TopLevelWrapper, {
      child: nextElement,
    });

    // 拿到之前的组件，更新时就进行对比
    // 初始渲染prevComponent = false
    var prevComponent = getTopLevelWrapperInContainer(container);

    if (prevComponent) {
      // 更新流程
      var prevWrappedElement = prevComponent._currentElement;
      var prevElement = prevWrappedElement.props.child;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        var publicInst = prevComponent._renderedComponent.getPublicInstance();
        ReactMount._updateRootComponent(
          prevComponent,
          nextWrappedElement,
          nextContext,
          container,
          updatedCallback,
        );
        return publicInst;
      } else {
        // 卸载
        ReactMount.unmountComponentAtNode(container);
      }
    }

    // 根据AST type，1.创建对应component实类，2. 实类专为in 呢人HTML，3. innerHTML挂载到真实的DOM上
    var component = ReactMount._renderNewRootComponent(
      nextWrappedElement,
      container,
      shouldReuseMarkup,
      nextContext,
    )._renderedComponent.getPublicInstance();

    return component;
  }
```

``` js
_renderNewRootComponent: function(
    nextElement,
    container,
    shouldReuseMarkup,
    context,
  ) {
    // 创建component实例。instantiateReactComponent.js
    var componentInstance = instantiateReactComponent(nextElement, false);

    ReactUpdates.batchedUpdates(
      batchedMountComponentIntoNode, //回调函数
      componentInstance,
      container,
      shouldReuseMarkup,
      context,
    );
    return componentInstance;
  },
```

``` js
function batchedMountComponentIntoNode(
  componentInstance,
  container,
  shouldReuseMarkup,
  context,
) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(
    !shouldReuseMarkup && ReactDOMFeatureFlags.useCreateElement,
  );
  transaction.perform(
    mountComponentIntoNode, //
    null,
    componentInstance,
    container,
    transaction,
    shouldReuseMarkup,
    context,
  );
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}
```

``` js
function mountComponentIntoNode(
  wrapperInstance,
  container,
  transaction,
  shouldReuseMarkup,
  context,
) {
  // 根据不同的组件类型（4种）类型，返回组件对应的HTML（下节详细讲述）
  // 等同于wrapperInstance.mountComponent
  var markup = ReactReconciler.mountComponent(
    wrapperInstance,
    transaction,
    null,
    ReactDOMContainerInfo(wrapperInstance, container),
    context,
    0
  );

  wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
  // 给dom插入innerHTML
  ReactMount._mountImageIntoNode(
    markup,
    container,
    wrapperInstance,
    shouldReuseMarkup,
    transaction,
  );
}
```

``` js
_mountImageIntoNode: function(
    markup,
    container,
    instance,
    shouldReuseMarkup,
    transaction,
  ) {
      setInnerHTML(container, markup); // 关键：container.innerHTML = markup;
      // 将处理好的组件对象存储在缓存中，提高结构更新的速度。
      ReactDOMComponentTree.precacheNode(instance, container.firstChild);
  }
```