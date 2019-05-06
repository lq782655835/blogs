# Vue2.x源码分析 - 事件系统

Vue 支持 2 种事件类型，原生 DOM 事件和自定义事件，它们主要的区别在于添加和删除事件的方式不一样。下面看下他们的实现流程。

1. 编译阶段
    1. 编译模板（parse阶段），根据正则，找出事件名和回对应调函数名
        * 带native修饰符，放在ASTElement.nativeEvents中，其他放在ASTElement.events中
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
    2. 根据AST生成最终render代码（codegen阶段），会绑定到VNode.data上。
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
        * `虚拟dom patch时`，会触发一些modules的hook，其中就包括events.js模块。src/platforms/web/runtime/modules/event.js
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
        * 本质还是利用在父组件环境定义回调函数来实现父子组件的通讯。
        ``` js
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
