# Vue2.x源码分析 - 模版编译以及挂载

由于2.x版本中引入虚拟DOM的缘故，Vue支持模板和手写render两种方式（也支持jsx，属于第三方插件帮你转换为render函数；当然模板方式最终也是转换为render函数，但属于官方内置编译器），官方推荐模板这种写法，降低使用门槛。

Vue是如何解析模板并挂载到真实的DOM上呢？

## API层

先看下Vue API层是如何使用的：

``` js
// 使用Vue.prototype.$mount(el)或者放在options.el里
new Vue({template, data}).$mount(el)
// or
new Vue({ el, template, data})
```

## 源码层

先了解下源码入口区别：
* platforms/web/entry-runtime.js
    * Vue运行时，简单说就是对外只导出Vue这个类，因为所有Vue的配置以及设置，都是挂载到Vue的原型上。
* platforms/web/entry-compiler.js
    * Vue内置编译器，主要是暴露一些函数出来。主要有compile函数，把template字符串转换为render函数。
* platforms/entry-runtime-with-compiler.js
    * 带编译器的运行时，最常使用的Vue依赖包。可通过new Vue({}).$mount(el)直接挂载DOM。

我们源码分析的是带编译器的运行时，以下看下笔者简化的源码流程，注意高亮的关键代码：

### 1. 解析template模板，得到render函数并绑定到Vue选项上
* `const { render } = compileToFunctions(options.template, ...)`
    * const { compileToFunctions } = `createCompiler`(baseOptions) 'src/platforms/web/compiler/index.js'
        * const createCompiler = createCompilerCreator(`baseCompile(template, options)`) 'src/compiler/index.js'
            1. `ast = parse(template.trim(), options)` 解析模板字符串生成 AST 'src/compiler/parser/index.js'
                * parse 的过程是利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的回调函数，来达到构造 AST 树的目的。
                * type 为 1 表示是普通元素，为 2 表示是表达式，为 3 表示是纯文本
                ``` js
                // AST数据结构
                // 最终生成的是一颗AST树结构
                declare type ASTElement = {
                    type: 1;
                    tag: string;
                    attrsList: Array<{ name: string; value: any }>;
                    attrsMap: { [key: string]: any };
                    parent: ASTElement | void;
                    children: Array<ASTNode>; // ASTNode = ASTElement | ASTText | ASTExpression;

                    processed?: true;

                    static?: boolean;
                    staticRoot?: boolean;
                    staticInFor?: boolean;
                    staticProcessed?: boolean;
                    hasBindings?: boolean;

                    text?: string;
                    attrs?: Array<{ name: string; value: any }>;
                    props?: Array<{ name: string; value: string }>;
                    plain?: boolean;
                    pre?: true;
                    ns?: string;

                    component?: string;
                    inlineTemplate?: true;
                    transitionMode?: string | null;
                    slotName?: ?string;
                    slotTarget?: ?string;
                    slotScope?: ?string;
                    scopedSlots?: { [name: string]: ASTElement };

                    ref?: string;
                    refInFor?: boolean;

                    if?: string;
                    ifProcessed?: boolean;
                    elseif?: string;
                    else?: true;
                    ifConditions?: ASTIfConditions;

                    for?: string;
                    forProcessed?: boolean;
                    key?: string;
                    alias?: string;
                    iterator1?: string;
                    iterator2?: string;

                    staticClass?: string;
                    classBinding?: string;
                    staticStyle?: string;
                    styleBinding?: string;
                    events?: ASTElementHandlers;
                    nativeEvents?: ASTElementHandlers;

                    transition?: string | true;
                    transitionOnAppear?: boolean;

                    model?: {
                        value: string;
                        callback: string;
                        expression: string;
                    };

                    directives?: Array<ASTDirective>;

                    forbidden?: true;
                    once?: true;
                    onceProcessed?: boolean;
                    wrapData?: (code: string) => string;
                    wrapListeners?: (code: string) => string;

                    // 2.4 ssr optimization
                    ssrOptimizability?: number;

                    // weex specific
                    appendAsTree?: boolean;
                    };
                ```
            2. `optimize(ast, options)` 优化语法树 'src/compiler/optimizer.js'
                * 很多数据是首次渲染后就永远不会变化的，那么这部分数据生成的 DOM 也不会变化，我们可以在 patch 的过程跳过对他们的比对。
                * 只干两件事：1. 标记静态节点 2. 标记静态根（静态根一定是静态节点）
            3. `code = generate(ast, options)` 生成代码(code对象包含render函数) 'src/compiler/codegen/index.js'
                * 把优化后的 AST 树转换成可执行的代码。可执行代码最终获得VNode（虚拟DOM的基础）
                ``` js
                return (isShow) ?
                    _c('ul', {
                        staticClass: "list",
                        class: bindCls
                    },
                    _l((data), function(item, index) {
                        return _c('li', {
                        on: {
                            "click": function($event) {
                            clickItem(index)
                            }
                        }
                        },
                        [_v(_s(item) + ":" + _s(index))])
                    })
                    ) : _e()
                ```

### 2. 挂载渲染. `mount.call(this, el)`
* `Vue.prototype.$mount` 'platforms/web/runtime/index.js'
    * `mountComponent` 'core/instance/lifecycle.js'
        * new Watch(vm, `updateComponent`)
            1. `vm._render()` 'src/core/instance/render.js'
                * 执行render函数，拿到VNode(注意render
                函数的参数h为vm.$createElement)
                ``` js
                const { render } = vm.$options
                return vnode = render.call(vm._renderProxy, vm.$createElement)
                ```
            2. `vm._update(VNode)` 'src/core/instance/lifecycle.js'
                * 更新DOM, `vm.__patch__(preVNode, VNode)` 'src/platforms/web/runtime/patch.js'
                    * `createPatchFunction` 'src/core/vdom/patch.js'，详见[Virtual DOM实现](./vue-code.3.vdom.md)
                        * diff等，真正的操作更新DOM
                        * 绑定class、style、event等
                ``` js
                const prevVnode = vm._vnode
                if (!prevVnode) {
                    // initial render
                    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
                } else {
                    // updates
                    vm.$el = vm.__patch__(prevVnode, vnode)
                }
                ```

![](https://ustbhuangyi.github.io/vue-analysis/assets/new-vue.png)
