# Vue Loader v15 源码解析

Vue Loader v15相对于以前的版本，改动比较大。不仅拆分出VueLoaderPlugin，而且其Loader 推导策略完全改变了。更多详细改动可以看下[官方迁移文档](https://vue-loader.vuejs.org/zh/migrating.html)。Loader15之前的源码解析可以看[这篇文章](https://juejin.im/post/5a1cb7d7f265da4319560139),作者分析了Loader15前的源码，对比现在这篇文章会有更多体会。

Vue Loader简单讲，就是将 *.vue 文件变成可以在浏览器中运行的js模块文件。以下我们具体分析下Vue Loader v15源码。

``` js
const selectBlock = require('./select')
const { parse } = require('@vue/component-compiler-utils')

module.exports = function (source) {
    // this是webpack注入的内容
    const {
        target,
        request,
        minimize,
        sourceMap,
        rootContext,
        resourcePath,
        resourceQuery
    } = this

    const rawQuery = resourceQuery.slice(1)
    const incomingQuery = qs.parse(rawQuery)
    // 通过parse解析.vue文件，获取不同的类型，如template、style、script
    const descriptor = parse({
        source,
        compiler: options.compiler || require('vue-template-compiler'),
        filename,
        sourceRoot,
        needMap: sourceMap
    })

    // 带有type字段，使用语言推导（关键代码）
    // 如：foo.vue?type=template&id=xxxxx会进入下面selectBlock
    // 这里第一次是直接./foo.vue，不带type；而第一次生成的code又需要进入到Vue Loader中
    if (incomingQuery.type) {
        return selectBlock(
            descriptor,
            loaderContext,
            incomingQuery,
            !!options.appendExtension
            )
    }

    // 如果没有type字段，则导出code源码。
    // template
    let templateImport = `var render, staticRenderFns`
    let templateRequest
    if (descriptor.template) {
        const src = descriptor.template.src || resourcePath
        const idQuery = `&id=${id}`
        const scopedQuery = hasScoped ? `&scoped=true` : ``
        const attrsQuery = attrsToQuery(descriptor.template.attrs)
        const query = `?vue&type=template${idQuery}${scopedQuery}${attrsQuery}${inheritQuery}`
        const request = templateRequest = stringifyRequest(src + query)
        templateImport = `import { render, staticRenderFns } from ${request}`
    }

    // script
    let scriptImport = `var script = {}`
    if (descriptor.script) {
        const src = descriptor.script.src || resourcePath
        const attrsQuery = attrsToQuery(descriptor.script.attrs, 'js')
        const query = `?vue&type=script${attrsQuery}${inheritQuery}`
        const request = stringifyRequest(src + query)
        scriptImport = (
        `import script from ${request}\n` +
        `export * from ${request}` // support named exports
        )
    }

    // styles
    let stylesCode = ``
    if (descriptor.styles.length) {
        stylesCode = genStylesCode(
        loaderContext,
        descriptor.styles,
        id,
        resourcePath,
        stringifyRequest,
        needsHotReload,
        isServer || isShadow // needs explicit injection?
        )
    }
    let code = `
        ${templateImport}
        ${scriptImport}
        ${stylesCode}
        ...`
    return code
}
```

1. 先通过[html-parse](https://github.com/vuejs/vue/blob/dev/src/compiler/parser/html-parser.js)解析整个.vue文件。使用正则逐步拿到信息，最终拿到`descriptor`信息。类似如下内容：

![image](https://user-images.githubusercontent.com/6310131/57218041-ea17b080-7026-11e9-8437-23b283f70928.png)

2. 当编译vue单组件时，是不带type如./source.vue，所以会作为同步Loader返回编译后的code。类似如下内容：

![image](https://user-images.githubusercontent.com/6310131/57221426-cad25080-7031-11e9-9d91-502f6973dd23.png)

3. 上图红框处，可以看到生成的代码里，又进行了vue模块的导入，所以又会找到Vue Loader源码里，再走一遍逻辑。但是可以看到，其路径后都带有type字段，所以这次会走入`selectBlock`这个模块进行处理。源码在select.js中：

``` js
module.exports = function selectBlock (
  descriptor,
  loaderContext,
  query,
  appendExtension
) {
  // loaderContext === this
  // template
  if (query.type === `template`) {
    if (appendExtension) {
      loaderContext.resourcePath += '.' + (descriptor.template.lang || 'html')
    }
    // 异步loader
    loaderContext.callback(
      null,
      descriptor.template.content,
      descriptor.template.map
    )
    return
  }

  // script
  if (query.type === `script`) {
    if (appendExtension) {
      loaderContext.resourcePath += '.' + (descriptor.script.lang || 'js')
    }
    loaderContext.callback(
      null,
      descriptor.script.content,
      descriptor.script.map
    )
    return
  }

  // styles
  if (query.type === `style` && query.index != null) {
    const style = descriptor.styles[query.index]
    if (appendExtension) {
      loaderContext.resourcePath += '.' + (style.lang || 'css')
    }
    loaderContext.callback(
      null,
      style.content,
      style.map
    )
    return
  }
}
```

可以看到其分别对template/script/style内容进行处理。处理也很简单，就是使用webpack配置的loader对相应的.html后缀/.js后缀/.css后缀进行规则匹配。这也是[官方文档中说明的Loader推导变更](https://vue-loader.vuejs.org/zh/migrating.html#loader-%E6%8E%A8%E5%AF%BC)，v15以前是使用`loaders选项`进行loader定制，但从v15之后就不需要这样做了。