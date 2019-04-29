Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。

``` js
new Vue({...}).$mount(el)
```

带编译器入口： platforms/entry-runtime-with-compiler.js
* 解析template模板，得到render函数并绑定到Vue选项上. `const { render } = compileToFunctions(options.template, ...)` 
    * const { compileToFunctions } = `createCompiler`(baseOptions) 'src/platforms/web/compiler/index.js'
        * const createCompiler = createCompilerCreator(`baseCompile(template, options)`) 'src/compiler/index.js'
            1. `ast = parse(template.trim(), options)` 解析模板字符串生成 AST 'src/compiler/parser/index.js'
                * parse 的过程是利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的回调函数，来达到构造 AST 树的目的。
                * type 为 1 表示是普通元素，为 2 表示是表达式，为 3 表示是纯文本
                ``` js
                declare type ASTElement = {
                    type: 1;
                    tag: string;
                    attrsList: Array<{ name: string; value: any }>;
                    attrsMap: { [key: string]: any };
                    parent: ASTElement | void;
                    children: Array<ASTNode>;

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
                * 把优化后的 AST 树转换成可执行的代码。可执行代码最终获得VNode
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
* 挂载渲染. `mount.call(this, el)`
    * `Vue.prototype.$mount` 'platforms/web/runtime/index.js'
        * `mountComponent` 'core/instance/lifecycle.js'
            * new Watch(vm, `updateComponent`)
                1. `vm._render()` 'src/core/instance/render.js'
                    * 执行render函数，拿到VNode
                    ``` js
                    const { render } = vm.$options
                    return vnode = render.call(vm._renderProxy, vm.$createElement)
                    ```
                2. `vm._update(VNode)` 'src/core/instance/lifecycle.js'
                    * 更新DOM, `vm.__patch__(preVNode, VNode)` 'src/platforms/web/runtime/patch.js'
                        * `createPatchFunction` 'src/core/vdom/patch.js'
                            * diff等，真正的操作 更新DOM
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

* 虚拟DOM

* tag 做判断，如果是 string 类型
    * 如果是内置的一些节点，则直接创建一个普通 VNode
    * 如果是为已注册的组件名，则通过 createComponent 创建一个组件类型的 VNode

    
![](https://user-gold-cdn.xitu.io/2018/8/30/16586a0d1261a7b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
