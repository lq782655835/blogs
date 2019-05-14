# Vue2.x源码分析 - 事件系统

Vue 支持 2 种事件类型，原生 DOM 事件和自定义事件，它们主要的区别在于添加和删除事件的方式不一样。下面看下他们的实现流程。

1. 编译阶段
    1. 编译模板（parse阶段），根据指令查找（下文有给出源码），找出事件名和回对应调函数名
        * 带native修饰符，放在`ASTElement.nativeEvents`中，其他放在`ASTElement.events`中
        ``` js
        ASTElement.events = {
            select: {
                value: 'selectHandler'
            }
        }

        ASTElement.nativeEvents = {
            click: {
                value: 'clickHandler',
                modifiers: {
                    prevent: true
                }
            }
        }
        ```
    2. 根据AST生成最终render代码（codegen阶段），会绑定到`VNode.data`上。
        * nativeEvents放在VNode.data.nativeOn对象上，events放在VNode.data.on对象上。
        * 如果回调函数是函数表达式，则绑定的value是函数表达式；否则会创建一个匿名函数包裹这些。
        * 带prevent修饰符最终也是创建匿名函数，只是默认增加'$event.preventDefault()'。
        ``` js
        {
            on: {"select": selectHandler},
            nativeOn: {"click": function($event) {
                    $event.preventDefault();
                    return clickHandler($event)
                }
            }
        }
        ```
2. 绑定阶段
    1. `原生DOM事件`
        * 在VNode转为真实的DOM时，根据VNode.data.on/nativeOn绑定事件。
        * `虚拟dom patch时`，会触发一些modules的hook(底层来自snabbdom,参见[虚拟dom算法库 - snabbdom](./vue-code-2.snabbdom))，其中就包括events.js模块。src/platforms/web/runtime/modules/event.js
        ``` js
        function updateDOMListeners (oldVnode: VNodeWithData, vnode: VNodeWithData) {
            const on = vnode.data.on || {} // 普通元素上使用 .native 修饰符无效，所以没有用到data.nativeOn
            const oldOn = oldVnode.data.on || {}
            // 最终都会调用，patch.js中的createElm
            // 里面会有vnode.elm = nodeOps.createElement(tag, vnode)
            target = vnode.elm
            updateListeners(on, oldOn, add, remove, vnode.context)
        }
        ```
        ``` js
        // 该方法是通用的，针对on上的数据，进行事件绑定
        // 不同的是，传入不同的add实现方法对1.原生DOM事件以及2.组件自定义事件进行区别。
        export function updateListeners (
        on: Object,
        oldOn: Object,
        add: Function,
        remove: Function,
        vm: Component
        ) {
            let name, def, cur, old, event
            // 新增事件
            // 每一次执行 invoker 函数都是从 invoker.fns 里取执行的回调函数
            for (name in on) {
                def = cur = on[name]
                old = oldOn[name]
                event = normalizeEvent(name)

                // 如果oldOn中没有，增加事件
                if (isUndef(old)) {
                    if (isUndef(cur.fns)) {
                        cur = on[name] = createFnInvoker(cur) // 关键代码，cur才是真正执行的事件函数，cur执行依赖cur.fns。
                    }
                    // add方法是针对DOM绑定事件
                    add(event.name, cur, event.once, event.capture, event.passive, event.params)
                } else if (cur !== old) {
                    // 如果有，但执行函数不同，则替换执行函数即可。
                    old.fns = cur // 由于最终是执行存放在fns的回调函数，所以只需要替换fns函数即可，而不用移除DOM事件。
                    on[name] = old
                }
            }
            // 没在on中的事件，移除
            for (name in oldOn) {
                if (isUndef(on[name])) {
                event = normalizeEvent(name)
                remove(event.name, oldOn[name], event.capture)
                }
            }
        }
        ```
        ``` js
        export function createFnInvoker (fns: Function | Array<Function>): Function {
            function invoker () {
                // fns存放才是最终执行的代码体，invoker是个包装函数。
                const fns = invoker.fns
                if (Array.isArray(fns)) {
                    const cloned = fns.slice()
                    for (let i = 0; i < cloned.length; i++) {
                        cloned[i].apply(null, arguments)
                    }
                } else {
                    return fns.apply(null, arguments)
                }
            }
            invoker.fns = fns
            return invoker // 闭包的又一个经典案例
        }
        ```
    2. `自定义组件事件`
        * 自定义事件只能作用在组件上，如果在组件上使用原生事件，需要加 .native 修饰符，普通元素上使用 .native 修饰符无效。
        * `render阶段`，如果是组件节点，会把data.on作为listeners传入到VNode.componentOptions组件中，进行自定义事件处理。(典型的发布订阅模式)。src/core/vdom/create-component.js
        ``` js
        export function createComponent (
        Ctor: Class<Component> | Function | Object | void,
        data: ?VNodeData,
        context: Component,
        children: ?Array<VNode>,
        tag?: string
        ): VNode | Array<VNode> | void {
        // 如果是组件节点，on使用自定义事件
        const listeners = data.on
        // nativeOn则使用dom的绑定事件
        data.on = data.nativeOn

        // ...
        const name = Ctor.options.name || tag
        const vnode = new VNode(
            `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
            data, undefined, undefined, undefined, context,
            { Ctor, propsData, listeners, tag, children },
            asyncFactory
        )

        return vnode
        }
        ```
        * 本质还是利用，在`父组件环境定义回调函数`,并把回调函数绑定到，来实现父子组件的通讯。
        ``` js
        // src/core/instance/events.js
        export function initEvents (vm: Component) {
            // 关键代码
            // 子组件初始化时，拿到父组件的监听数据：event/回调函数，也就是data.on
            // 所以子组件触发event时，子组件执行父组件的回调函数
            const listeners = vm.$options._parentListeners
            if (listeners) {
                updateComponentListeners(vm, listeners) // 等同updateListeners(listeners, oldListeners || {}, add, remove, vm)
            }
        }
        ```
        ``` js
        // updateListeners方法是通用的，最终传入不同的add/remove函数，处理不一样的事件处理
        // 组件事件$on/$emit,是典型的发布-订阅模式
        function add (event, fn, once) {
            if (once) {
                target.$once(event, fn)
            } else {
                target.$on(event, fn)
            }
        }

        function remove (event, fn) {
            target.$off(event, fn)
        }
        ```

## 匹配指令查找

parse 阶段，执行 processAttrs 方法。
``` js
// src/compiler/parser/index.js
export const onRE = /^@|^v-on:/
export const dirRE = /^v-|^@|^:/
export const bindRE = /^:|^v-bind:/
function processAttrs (el) {
  const list = el.attrsList // 关键代码，使用
  let i, l, name, rawName, value, modifiers, isProp
  for (i = 0, l = list.length; i < l; i++) {
    // 拿到name/value
    name = rawName = list[i].name
    value = list[i].value
    // 指令、事件、绑定值
    if (dirRE.test(name)) {
      modifiers = parseModifiers(name) // 处理修饰符

      if (bindRE.test(name)) { // 1. v-bind值
        if (modifiers) {
          // sync修饰符处理 :value.sync === $emit(update:value)
          if (modifiers.sync) {
            addHandler(
              el,
              `update:${camelize(name)}`,
              genAssignmentCode(value, `$event`)
            )
          }
        }
      } else if (onRE.test(name)) { // 2. 事件
        addHandler(el, name, value, modifiers, false, warn)
      } else { // 3. 普通指令
        addDirective(el, name, rawName, value, arg, modifiers)
      }
    } else {
      addAttr(el, name, JSON.stringify(value))
    }
  }
}
```