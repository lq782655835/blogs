# Vue项目TypeScript指南

## TypeScript优势
* Javascript的超集，完美兼容js
* 强类型语言（最重要特性之一），易于重构与理解。
* 强大IDE支持，VSCode前端必备
* 微软大厂保证
* 社区统一共识，npm下载量非常高，复杂业务不再慌。

## TypeScript基础类型
* boolean
* number
* string
* 数组
    * number[]
    * Array<number> 泛型写法
    * 元组 Tuple
* 枚举 对JavaScript标准数据类型的一个补充
* any 类型检查器不检查
* object 除number，string，boolean，symbol，null或undefined之外的类型。
* void 通常见于函数没有返回值时
* null、undefined
* 接口interface
    * ?: 可选属性
    * readonly 只读属性
    * 额外的属性检查
* 类(跟ES6类类似，但早于ES6)
* 函数
``` ts
let isDone: boolean = false;
let decLiteral: number = 6;
let name: string = "bob";
let list: number[] = [1, 2, 3];
let x: [string, number] = ['hello', 10];
let name: string | number = 1 // string or number options

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green; // 2
let func = (): void => console.log(1)

interface SquareConfig {
  color?: string;
  width?: number;
  readonly x: number;
  [propName: string]: any; // 额外的属性检查
}
let createSquare = (config: SquareConfig): void => console.log(1)
```
## TypeScript Vue环境配置
现在vue-cli3.0安装时有typescript选项，可以非常便捷的在vue项目中应用上typescript环境。其实现方式是通过[cli-plugin-typescript](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript)插件。如果想知道其过程，可以看其源码或者笔者之前改造的基于vue-cli2.x项目博客文章：[TypeScript开发Vue应用](../js/ts-in-vue-project.md)。

## TypeScript Vue使用
### vue-class-component
[vue-class-component](https://github.com/vuejs/vue-class-component)是官方维护的TypeScript装饰器,它是基于类的 API，Vue对其做到完美兼容。因为是vue官方出的，所以可以保证其稳定性，但缺点是特性太少了，只有如下几个feature：
* Component
* mixins
* createDecorator

``` ts
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {
  name:string = 'Simon Zhang'

  // computed
  get MyName():string {
    return `My name is ${this.name}`
  }

  mounted() {
    this.sayHello();
  }

  // methods
  sayHello():void {
    alert(`Hello ${this.name}`)
  }
}
```
### vue-property-decorator
vue-property-decorator完全基于vue-class-component，但它扩展了很多特性。详细用法看其[github的readme](https://github.com/kaorun343/vue-property-decorator)，讲解的非常清晰易懂
* @Emit
* @Inject
* @Model
* @Prop
* @Provide
* @Watch
* @Component (provided by vue-class-component)
* Mixins (the helper function named mixins provided by vue-class-component)
``` ts
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Prop(Number) propA!: number
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC!: string | boolean

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) { }
  /* equal 
    watch: {
    'person': [
      {
        handler: 'onPersonChanged1',
        immediate: true,
        deep: true
      }
    ]
  }
  */

  @Emit()
  returnValue() {
    return 10
  }
  /* equal 
    returnValue() {
      this.$emit('return-value', 10)
    }
  */
}
```

### Vuex-Class
[vuex-class](https://github.com/ktsn/vuex-class)是基于基于vue-class-component对Vuex提供的装饰器。它的作者同时也是vue-class-component的主要贡献者，质量还是有保证的。但不知道vue3.0出来后是否会有官方维护的针对Vuex的TypeScript装饰器。
``` ts
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const someModule = namespace('path/to/module')

@Component
export class MyComp extends Vue {
  @State('foo') stateFoo
  @State(state => state.bar) stateBar
  @Getter('foo') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo
  @someModule.Getter('foo') moduleGetterFoo

  // If the argument is omitted, use the property name
  // for each state/getter/action/mutation type
  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created () {
    this.stateFoo // -> store.state.foo
    this.stateBar // -> store.state.bar
    this.getterFoo // -> store.getters.foo
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
    this.moduleGetterFoo // -> store.getters['path/to/module/foo']
  }
}
```

## TypeScript 描述文件
Declaration Type	Namespace	Type	Value
Namespace	X	 	X
Class	 	X	X
Enum	 	X	X
Interface	 	X	 
Type Alias	 	X	 
Function	 	 	X
Variable	 	 	X
typescript的描述文件，以d.ts结尾的文件名，比如xxx.d.ts。大部分编辑器能识别d.ts文件，当你写js代码的时候给你智能提示。
* declare 全局声明，使得ts可以找到并识别出
    * 声明全局变量/函数/类
    ``` ts
    // 变量
    declare var aaa:number|string

    //函数
    declare function getName(id?:number|string):string // id has type number | string | undefined
    // ?表示非必须。 !?表示一定要有值
    declare function render(callback?:()=>void): string

    // 类
    declare class Person {
        static maxAge: number //静态变量
        static getMaxAge(): number //静态方法

        constructor(name: string, age: number)  //构造函数
        getName(id: number): string
    }
    // 调用：
    // 假设已存在window.aaa，window.getName,window.person。
    // declare好以上就可以直接调用而不会报ts错误
    getName(aaa) // 不会报错
    ```
    * 对象namespace（对象上可能有变量/函数/类）
    ``` ts
    // 对象
    declare namespace myLib {
        function makeGreeting(s: string): string;
        let numberOfGreetings: number;
    }
    // 调用
    // 假设全局变量window.myLib存在
    let result = myLib.makeGreeting("hello, world");
    let count = myLib.numberOfGreetings;
    ```
    ``` ts
    // namespace作为定义数据类型
    declare namespace Ajax {
        // axios 返回数据
        interface AxiosResponse {
            data: AjaxResponse
        }

        // 请求接口数据
        interface AjaxResponse {
            success: boolean
            data: any
        }
    }
    // 调用
    (response: Ajax.AxiosResponse) => {
        const res: Ajax.AjaxResponse = response.data
    }
    ```
    * 模块化module 模块可能包括变量/函数/类/对象。解决require或import引入类库
``` ts
// 模块化
declare module "abcde" {
    export let a: number
    export function b(): number
    export namespace c{
        let cd: string
    }
}
// 调用：let aaa = require('abcde'); aaa.b()

// 导出去就是函数本身
declare module "app" {
    function aaa(some:number):number
    export=aaa
}
// 调用： let app = app(); app(some)
```
* interface 定义可重用类型（接口），可搭配declare使用
``` ts
// 实例方法 
interface People{
    name: string
    age: number
    getName(): string
    getAge():number
}
interface People_Static{
    new (name: string, age: number): People
    /** 静态方法 */
    staticA():number
    
    (w:number):number
}
declare var People:People_Static // 声明全局的静态类
// 使用
People.staticA()
(new People(name, age)).getName()
```

## tsconfig.json
待更新...

## 参考文章

* [如何编写一个 d.ts 文件](https://juejin.im/entry/5907f5020ce46300617bfb44)
* [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
* [vue-typescript-dpapp-demo](https://github.com/SimonZhangITer/vue-typescript-dpapp-demo)