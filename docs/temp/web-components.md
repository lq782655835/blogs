# Web Components

Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的web应用中使用它们。

* customElements是Window对象上的一个只读属性，接口返回一个CustomElementRegistry 对象的引用, 可以用于注册一个新的custom elements ，并且可以用于获取之前定义过的自定义元素的信息。

``` js
window.customElements.define('element-details',
  class extends HTMLElement {
    constructor() {
      super();
      const template = document
        .getElementById('element-details-template')
        .content;
      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(template.cloneNode(true));
  }
});
```

> 根据规范，自定义元素的名称必须包含连词线，用与区别原生的 HTML 元素。

## 使用生命周期回调函数

在custom element的构造函数中，可以指定多个不同的回调函数，它们将会在元素的不同生命时期被调用：

* connectedCallback：当 custom element首次被插入文档DOM时，被调用。
* disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
* adoptedCallback：当 custom element被移动到新的文档时，被调用。
* attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。

## 参考文章

* [Web Components 入门实例教程](http://www.ruanyifeng.com/blog/2019/08/web_components.html)
* [Web Components Tutorial for Beginners [2019]](https://www.robinwieruch.de/web-components-tutorial)