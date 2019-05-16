# Vue2.x源码分析 - v-model

v-model 即可以作用在普通表单元素上，又可以作用在组件上，它其实是一个语法糖。

## 普通元素input

input 实现 v-model 的精髓，通过修改 AST 元素，给 el 添加一个 prop，相当于我们在 input 上动态绑定了 value，又给 el 添加了事件处理，相当于在 input 上绑定了 input 事件。等于动态增加`prop + DOM绑定事件`语法糖实现。

``` js
// src/platforms/web/compiler/directives/model.js
addProp(el, 'value', `(${value})`)
addHandler(el, event, code, null, true)
```

``` html
<input v-model="message" />
<input
  v-bind:value="message"
  v-on:input="message=$event.target.value" />
```

``` js
// 最终生成的 render 代码
with(this) {
  return _c('div',[_c('input',{
    directives:[{
      name:"model",
      rawName:"v-model",
      value:(message),
      expression:"message"
    }],
    attrs:{"placeholder":"edit me"},
    domProps:{"value":(message)},
    on:{"input":function($event){
      if($event.target.composing)
        return;
      message=$event.target.value
    }}}),_c('p',[_v("Message is: "+_s(message))])
    ])
}
```

## 组件

组件v-model也是语法糖，最终也是如上面input普通元素，增加prop以及设置data.on事件。但组件事件走的是另外一套逻辑[Vue2.x源码分析 - 事件系统](./vue-code-4.event.md)。所以组件在`编译阶段`，不会直接设置data.on,而是给到中转变量`el.model`；在`patch阶段`的createComponent时，才把`el.model转换为prop以及data.on`（这时的data.on走的是组件事件的$on/$emit）。

### 编译阶段
``` js
// src/compiler/directives/model.js
export function genComponentModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
    // 处理number,trim修饰符
  const { number, trim } = modifiers || {}
  const baseValueExpression = '$$v'
  let valueExpression = baseValueExpression
  if (trim) {
    valueExpression =
      `(typeof ${baseValueExpression} === 'string'` +
        `? ${baseValueExpression}.trim()` +
        `: ${baseValueExpression})`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }

  // 生成el.model,在genData生成render函数有用到
  const assignment = genAssignmentCode(value, valueExpression)
  el.model = {
    value: `(${value})`,
    expression: `"${value}"`,
    callback: `function (${baseValueExpression}) {${assignment}}`
  }
}
```

``` js
// 生成的render函数
with(this){
  return _c('div',[_c('child',{
    model:{
      value:(message),
      callback:function ($$v) {
        message=$$v
      },
      expression:"message"
    }
  })])
}
```

### patch阶段

``` js
// src/core/vdom/create-component.js
if (isDef(data.model)) {
   transformModel(Ctor.options, data)
}

function transformModel (options, data: any) {
  // api中的options.model可配置
  const prop = (options.model && options.model.prop) || 'value'
  const event = (options.model && options.model.event) || 'input';

  // 设置组件prop和事件
  (data.props || (data.props = {}))[prop] = data.model.value
  const on = data.on || (data.on = {})
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event])
  } else {
    on[event] = data.model.callback
  }
}
```

``` js
// 最终VNode.data如下，接下来就是组件的事件处理
data.props = {
  value: (message),
}
data.on = {
  input: function ($$v) {
    message=$$v
  }
}
```