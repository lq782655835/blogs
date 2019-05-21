
``` js
// instantiateReactComponent.js
function instantiateReactComponent(node, shouldHaveDebugID) {
  var instance;

  if (node === null || node === false) {
    // 1.ReactEmptyComponent组件。
    instance = ReactEmptyComponent.create(instantiateReactComponent);
  } else if (typeof node === 'object') {
    var element = node;
    var type = element.type;
    if (typeof type !== 'function' && typeof type !== 'string') {
        if (typeof element.type === 'string') {
            // 2. 创建h1/input等DOM元素的Component
            instance = ReactHostComponent.createInternalComponent(element);
        } else {
            // 3. ReactCompositeComponent组件（自定义组件）
            instance = new ReactCompositeComponentWrapper(element);
        }
  } else if (typeof node === 'string' || typeof node === 'number') {
    // 4. ReactTextComponent组件
    instance = ReactHostComponent.createInstanceForText(node);
  }

  return instance;
}
```

``` js
// 1. ReactDOMEmptyComponent.js
// 调用：new ReactDOMEmptyComponent(instantiate)
var ReactDOMEmptyComponent = function(instantiate) {
  // ReactCompositeComponent uses this:
  this._currentElement = null;
  // ReactDOMComponentTree uses these:
  this._hostNode = null;
  this._hostParent = null;
  this._hostContainerInfo = null;
  this._domID = 0;
};
Object.assign(ReactDOMEmptyComponent.prototype, {
  mountComponent: function(
    transaction,
    hostParent,
    hostContainerInfo,
    context,
  ) {
    var nodeValue = ' react-empty: ' + this._domID + ' ';
      return '<!--' + nodeValue + '-->';
  }
});

module.exports = ReactDOMEmptyComponent;
```

``` js
// 2. ReactDOMComponent.js
// 调用：new ReactDOMComponent(element);

return mountImage =
          tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
```

``` js
// 4. ReactDOMTextComponent.js
var openingValue = ' react-text: ' + domID + ' ';
var closingValue = ' /react-text ';
var escapedText = escapeTextContentForBrowser(this._stringText);
return (
        '<!--' +
        openingValue +
        '-->' +
        escapedText +
        '<!--' +
        closingValue +
        '-->'
      );
```

``` js
// 3. new ReactCompositeComponent(element);
```