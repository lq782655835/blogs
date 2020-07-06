# Vue项目TypeScript指南

## 1. TypeScript优势

* Javascript的超集，完美兼容js
  * 从核心语言方面和类概念的模塑方面对 JavaScript 对象模型进行扩展。
  * 拓展了js的语法，相比较于es6，它多了装饰器、私有属性、getter/setter、抽象类。(后续TC39可能都会加上这些特性)
* 强类型语言（最重要特性之一），易于重构与理解。
  * 类型系统
  * 编译时的静态类型检查
* 强大IDE支持，VSCode前端必备
* 微软大厂保证
* 社区统一共识，npm下载量非常高，复杂业务不再慌。

## 2. TypeScript类型

* 原始类型
  * boolean
  * number
  * string
* 特殊类型
  * any 类型检查器不检查
  * void 通常见于函数没有返回值时
  * null
  * undefined
  * object 除number，string，boolean，symbol，null或undefined之外的类型。
* 数组
    * T[]
    * Array\<T> 泛型写法
* 补充
  * 联合类型 属性为多种类型之一
  ``` ts
  let name: string | number = 123
  let names: (string | number)[] = [123, '123']
  let names: Array<string | number> = [123, '123']
  let funcs: Array<() => string> = [() => {return '123'}]
  ```
  * 元组类型 如 let nameNumber: [string, number] = ['Jenny', 221345]
  * 枚举enum 对JavaScript标准数据类型的一个补充
  * 接口interface
      * ?: 可选属性
      * readonly 只读属性
      * 额外的属性检查
      * 内联类型注解 let name: {first: string;second: string;}
* 函数
* 类(跟ES6类类似，但早于ES6)

``` ts
let isDone: boolean = false;
let decLiteral: number = 6;
let name: string = "bob";
// 联合类型
let name: string | number = 1 // string or number options
// 数组
let list: number[] = [1, 2, 3];
 // 元祖
let x: [string, number] = ['hello', 10];


enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green; // 2

let func = (item: string): void => console.log(1)
function func(item: string): void {}

// interface接口
interface SquareConfig {
  color?: string; // 可选属性
  width?: number;
  readonly x: number; // 只读属性（除初次赋值，就不能修改）
  [propName: string]: any; // 额外的属性检查
}
// 内联类型注解
let name: {
  first: string;
  second: string;
} = {
  first: 'John',
  second: 'Doe'
}
```

### 2.1 Interface & type

两者基本没什么差别，平时开发能用Interface尽量用

``` ts
interface Person {
    name: string;
    age: number;
}

type Person = {
    name: string;
    age: number;
}

type Animal = Person | string
```

### 2.2 联合类型

``` ts
interface Person {
    name: string;
    age : number | string;
}
```

### 2.3 数组类型

``` ts
interface Person {
    name: string;
    age : number;
    schools: string[];
}
```

### 2.4 元祖

``` ts
let tom: [string, number] = ['Tom', 25];
```

### 2.5 可选属性

``` ts
interface Person {
    name: string;
    age ?: number;
}
```

### 2.6 任意属性

``` ts
interface Person {
    name: string;
    age: number;
    [key: string] : string;
}
```

### 2.7 简写类型

``` ts
interface Person {
    name: string;
    age: number;
    attr : { label: string; value: string; color?: string; tips?: string }
}
```

### 2.8 泛型

``` ts
export interface PagingResponseMsg<T> {
  code: number;
  message: string;
  data: T;
  totalCount?: number; // 数据总条数
  pageNo?: number; // 当前页码
  pageSize?: number; // 页大小
  pageCount?: number; // 总页数
}
```

### 2.9 keyof

``` ts
const todo = {
    id: 1,
    name: 'james',
    address: 'shisanjia'
}

type K = keyof todo // "id" | "name" | "address"
```

``` ts
const todo = {
    id: 1,
    name: 'james',
    address: 'shisanjia'
}

# K 将是T返回的union类型中的一种
＃　并且返回值为 K[T] 类型
function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

prop(todo, 'name')
prop(todo, 'gender') // ts报错
```

### 2.10 key in keyof T

``` ts
interface IPoint {
    x: number
    y: number
}

type Name<T> = { [P in keyof T]: T[P]}

type real = Name<IPoint> // {x: number, y: number}
type test2 = Name<{Job: string, Job2: string}> // {Job: string, Job2: string}
```

## 3. TypeScript Vue环境配置

vue-cli3.0安装时有typescript选项，可以非常便捷的在vue项目中应用上typescript环境。其实现方式是通过[cli-plugin-typescript](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript)插件。如果想知道其过程，可以看其源码或者笔者之前改造的基于vue-cli2.x项目博客文章：[TypeScript开发Vue应用](../project/ts-in-vue-project.md)。

## 4. TypeScript Vue使用

TS除了类型系统以及IDE提示外，最重要特性之一就是可以使用装饰器。使用装饰器可以用极简的代码代替以前冗长的代码。以下介绍在Vue 2.x工程项目(Vue3.0计划原生支持Typescript，所以将来或许存在变数)中，必备的三个工具包。

### 4.1 vue-class-component

[vue-class-component](https://github.com/vuejs/vue-class-component)是官方维护的TypeScript装饰器,它是基于类的 API，Vue对其做到完美兼容。因为是vue官方出的，所以可以保证其稳定性，但缺点是特性太少了，只有三个feature：
* Component 官方提供的Component装饰器
* mixins
* createDecorator 官方提供的创建装饰器函数。vue-property-decorator/vuex-class库中的各个属性/方法装饰器底层都是调用该函数

``` ts
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    propMessage: String
  },
  components: {},
  filters: {},
  directive: {}
})
export default class App extends Vue {
  // data
  name:string = 'Simon Zhang'
  helloMsg = 'Hello, ' + this.propMessage // use prop values for initial data

  // computed
  get MyName():string {
    return `My name is ${this.name}`
  }

  // lifecycle hook
  mounted() {
    this.sayHello()
  }

  // methods
  sayHello():void {
    alert(`Hello ${this.name}`)
  }
}
```

### 4.2 vue-property-decorator

[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)完全基于vue-class-component，但它扩展了很多特性，极大的方便Vue的写法。它包含7个装饰器以及1个函数：
* @Prop
* @Watch
* @Component (provided by vue-class-component)
* @Emit
* @Model
* @Inject
* @Provide
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
更多详细用法看[vue-property-decorator README](https://github.com/kaorun343/vue-property-decorator)，讲解的非常清晰易懂

### 4.3 Vuex-Class

[vuex-class](https://github.com/ktsn/vuex-class)是基于基于vue-class-component对Vuex提供的装饰器。它的作者同时也是vue-class-component的主要贡献者，质量还是有保证的。但不知道vue3.0出来后是否会有官方维护的针对Vuex的TypeScript装饰器。
* @State
* @Getter
* @Mutation
* @Action
* namespace

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
  // 多种方式
  @State('foo') stateFoo
  @State(state => state.bar) stateBar
  @Getter('foo') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo
  // 子模块处理
  @someModule.Getter('foo') moduleGetterFoo

  // 如果参数省略，则使用属性名
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

注意：使用vuex-class等库，需要在tsconfig.json配置中打开TypeScript装饰器。建议在工程目录中设置如下三个配置：`experimentalDecorators`、`strictFunctionTypes`、`strictPropertyInitialization`
``` json
{
  "compilerOptions": {
    // 启用装饰器.启用 vue-class-component 及 vuex-class 需要开启此选项，设置值为true
    "experimentalDecorators": true,
    // 启用 vuex-class 需要开启此选项，设置值为false
    "strictFunctionTypes": false,
    // 是否必须要有初始值。vuex-class最好开启此项，不然所有的@State等装饰器都需要设置初始值。设置值为false
    "strictPropertyInitialization": false,
  }
}
```

## 5. TypeScript 描述文件

typescript的描述文件，以d.ts结尾的文件名，比如xxx.d.ts。大部分编辑器能识别d.ts文件，当你写js代码的时候给你智能提示。declare 全局声明，使得ts可以找到并识别出。

### 5.1 全局变量/函数/类

``` ts
// 变量
declare var aaa:number|string

//函数
// id has type number | string | undefined
// ?表示非必须。 !?表示一定要有值
declare function getName(id?:number|string):string 
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

### 5.2 对象namespace

对象上可能有变量/函数/类
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

### 5.3 模块化module

模块可能包括变量/函数/类/对象。解决require或import引入类库
``` ts
// 模块化
declare module "abcde" {
    export let a: number
    export function b(): number
    export namespace c{
        let cd: string
    }
}
// 调用
let aaa = require('abcde');
aaa.b()
```
``` ts
// 导出是函数本身
declare module "app" {
    function aaa(some:number):number
    export=aaa
}
// 调用
let app = app();
app(some)
```

### 5.4 interface

定义可重用类型（接口），可搭配declare使用
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

## 6. tsconfig.json

这个章节内容有点多，另开[Typescript tsconfig.json全解析](../project/ts-tsconfig.md)专题

## 参考文章

* [如何编写一个 d.ts 文件](https://juejin.im/entry/5907f5020ce46300617bfb44)
* [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
* [vue-typescript-dpapp-demo](https://github.com/SimonZhangITer/vue-typescript-dpapp-demo)
* [typescript-book](https://github.com/basarat/typescript-book/)
* [templates/module-d-ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)
* [Vue2.5+ Typescript 引入全面指南 - Vuex篇](https://segmentfault.com/a/1190000011864013)
* [Typescript-tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
