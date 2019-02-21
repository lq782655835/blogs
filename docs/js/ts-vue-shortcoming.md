# TypeScript在Vue2.x中的坑

TypeScript是JS的超集，笔者非常建议在大型系统中使用TypeScript，因为它的类型系统使得代码可维护性提高了许多。但由于Vue2.x版本有设计断层，导致很多类型是通过declare方式推导出，而不是基于class的API，这也是为什么Vue3.0用typescript重写的原因之一。在期待Vue3.0的同时，来聊下在Vue2.x中使用TypeScript的一些坑。

## 1. 扩展Vue全局方法复杂
增加Vue全局方法，需要在'vue/types/vue'模块下扩展，十分突兀。

``` ts
// 1. 确保在声明补充的类型之前导入 'vue'
// 保证是在Vue模块下，使得不影响以前的Vue模块
import Vue from 'vue'

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
  interface Vue {
    $myProperty: string
  }
}
```

## 2. 全局mixin this问题
由于Vue有设计断层，所以this问题很苦恼。表现在全局mixin时，由于没有mixin类型，所以当单独抽取出globalMixin变量时，方法中this.$router会报错。
``` ts
// bad
const globalMixin = {
    methods: {
        $natigateTo(path: string, params?: any): void {
            // this.$router will throw error
            this.$router.push(withCluster)
        }
    }
}
Vue.mixin(globalMixin)
```

``` ts
// good for 2.x
Vue.mixin({
    methods: {
        $natigateTo(path: string, params?: any): void {
            this.$router.push(withCluster)
        }
    }
})
```

## 3. 装饰器 this !== target 问题
正常的Class在加装饰器的时候使用method.apply(target, args)是没有问题的。但是vue在注册组件的时候会进行初始化，this在这个时候被改变了(class内部的的this变了，此时 this !== target了)

``` ts
const log = (target, name, descriptor) => {
  const method = descriptor.value
  descriptor.value = function(...args) {
    console.log(target, descriptor)
    method.apply(target, args)
  }
  return descriptor
}

@Component
export default class Home extends Vue {
    @State jobId: string

    @log
    startDashboard(): void {
        // below will throw error:
        // "TypeError: this.setJobId is not a function"
        // because now this !== target
        console.log(this.jobId)
    }
}
```

## 参考文章
* [TypeScirpt - Modules](https://www.typescriptlang.org/docs/handbook/modules.html)

* [Vue - TypeScript](https://cn.vuejs.org/v2/guide/typescript.html)