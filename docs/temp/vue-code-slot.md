# Vue slot源码解析

slot本质是把父组件生成的vnode/function，延迟到子组件渲染中。作用域插槽中，由于依赖于子组件的数据和上下文，所以父组件中存储的是function函数（返回vnode），当子组件渲染时，带入子组件的props，function返回vnode，最终渲染在子组件。

``` js
let AppLayout = {
  template: '<div class="container">' +
  '<header><slot name="header"></slot></header>' +
  '<main><slot>默认内容</slot></main>' +
  '<footer><slot name="footer"></slot></footer>' +
  '</div>'
}

let vm = new Vue({
  el: '#app',
  template: '<div>' +
  '<app-layout>' +
  '<h1 slot="header">{{title}}</h1>' +
  '<p>{{msg}}</p>' +
  '<p slot="footer">{{desc}}</p>' +
  '</app-layout>' +
  '</div>',
  data() {
    return {
      title: '我是标题',
      msg: '我是内容',
      desc: '其它信息'
    }
  },
  components: {
    AppLayout
  }
})
```

父组件编译最终生成的代码如下：
``` js
// 当前是父组件，父组件中放的是要渲染的真实占位slot
with(this){
  return _c('div',
    [_c('app-layout', // app-layout是子组件，子组件放虚拟占位slot
      [_c('h1',{attrs:{"slot":"header"},slot:"header"},
         [_v(_s(title))]),
       _c('p',[_v(_s(msg))]),
       _c('p',{attrs:{"slot":"footer"},slot:"footer"},
         [_v(_s(desc))]
         )
       ])
     ],
   1)}
```

子组件编译生成代码：
``` js
with(this) {
  return _c('div',{
    staticClass:"container"
    },[
      _c('header',[_t("header")],2), // _t函数会去拿父组件的vnode
      _c('main',[_t("default",[_v("默认内容")])],2),
      _c('footer',[_t("footer")],2)
      ]
   )
}
```

我们了解了普通插槽和作用域插槽的实现。它们有一个很大的差别是`数据作用域`，普通插槽是在父组件编译和渲染阶段生成 vnodes，所以数据的作用域是父组件实例，子组件渲染的时候直接拿到这些渲染好的 vnodes。而对于`作用域插槽`，父组件在编译和渲染阶段并不会直接生成 vnodes，而是在父节点 vnode 的 data 中保留一个 scopedSlots 对象，存储着不同名称的插槽以及它们对应的渲染函数，只有在编译和渲染子组件阶段才会执行这个渲染函数生成 vnodes，由于是在子组件环境执行的，所以对应的数据作用域是子组件实例。

简单地说，两种插槽的目的都是让子组件 slot 占位符生成的内容由父组件来决定，但数据的作用域会根据它们 vnodes 渲染时机不同而不同。

[Vue.js 技术揭秘 - slot](https://ustbhuangyi.github.io/vue-analysis/extend/slot.html)