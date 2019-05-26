
* ReactDOMComponent._updateDOMProperties(oldProps, props)
    * enqueuePutListener(this, propKey, nextProp, transaction);
        * listenTo(registrationName, doc);
            * 
        * EventPluginHub.putListener

``` js
var EventListener = {
    // 冒泡阶段执行事件 p -> body -> html
  listen: function listen(target, eventType, callback) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
  },
  // 捕获阶段 html -> body -p
  capture: function capture(target, eventType, callback) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
  },
```

![](http://zhenhua-lee.github.io/img/react/react-event.jpg)