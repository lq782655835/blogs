# VuePress代码解析

* .vuepress/components文件夹下存放自注册的全局组件，可以在任意md文件使用
* 自定义plugin。plugin对象支持{}或者function，function参数注入了插件options以及context
    * extendPageData 额外扩展$page对象
    * globalComponentUI 插入到全局容器内的组件
    * enhanceAppFiles 给全局vue/vue-router/vuex等实例绑上实例或者注册全局资源（Component/Directive/Filter）
    * define 定义环境变量
    * clientRootMixin 每个页面实例Mixin

``` js
module.exports = (options = {}, context) => ({
  extendPageData ($page) {
    $page.host = 'https://www.baidu.com'
  },

  enhanceAppFiles: [
      // 里面注册GlobalTest组件 Vue.component('GlobalTest', GlobalTest)
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
  // 应用GlobalTest在每个页面
  globalUIComponents: 'GlobalTest',

  define: {
    SELECTOR: options.selector || '.theme-default-content :not(a) > img',
    OPTIONS: options.options
  },
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
```

## 简单实现Store

``` js
// this.$vuepress.$set('disableScrollBehavior', true)

// ./Store
// 手动创建Store
import Vue from 'vue'

export default class Store {
  constructor () {
    this.store = new Vue({
      data: {
        state: {}
      }
    })
  }

  $get (key) {
    return this.store.state[key]
  }

  $set (key, value) {
    Vue.set(this.store.state, key, value)
  }

  $emit (...args) {
    this.store.$emit(...args)
  }

  $on (...args) {
    this.store.$on(...args)
  }
}

// VuePress.js
import Store from './Store'
import {
  getPageAsyncComponent,
  getLayoutAsyncComponent,
  getAsyncComponent,
  getVueComponent
} from '../util'

class VuePress extends Store {}

// 混用ES6 Class和ES5原型
Object.assign(VuePress.prototype, {
  getPageAsyncComponent,
  getLayoutAsyncComponent,
  getAsyncComponent,
  getVueComponent
})

export default {
  install (Vue) {
    const ins = new VuePress()
    Vue.$vuepress = ins
    Vue.prototype.$vuepress = ins
  }
}
```

## webpack chain

``` js
//拿到rule
const vueRule = config.module
    .rule('vue')
      .test(/\.vue$/)

  applyVuePipeline(vueRule)

  const mdRule = config.module
    .rule('markdown')
      .test(/\.md$/)

  applyVuePipeline(mdRule)

    // markdown添加
  mdRule
    .use('markdown-loader')
      .loader(require.resolve('@vuepress/markdown-loader'))
      .options({ sourceDir, markdown, extractHeaders })

  config.module
    .rule('pug')
    .test(/\.pug$/)
    .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()

function applyVuePipeline (rule) {
    rule
      .use('cache-loader')
        .loader('cache-loader')
        .options({
          cacheDirectory,
          cacheIdentifier: finalCacheIdentifier
        })

    rule
      .use('vue-loader')
        .loader('vue-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: true
          },
          cacheDirectory,
          cacheIdentifier: finalCacheIdentifier
        })
  }
```
