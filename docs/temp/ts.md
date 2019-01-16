# Vue项目TypeScript指南

## TypeScript优势
* Javascript的超集，完美兼容js
* 强类型语言（最重要特性之一），易于重构与理解。
* 强大IDE支持，VSCode前端必备
* 微软大厂保证
* 社区统一共识，npm下载量非常高，复杂业务不再慌。

## TypeScript类型
* 原始类型
  * boolean 
  * number
  * string
* 数组
    * number[]
    * Array<number> 泛型写法
* 补充
  * 联合类型 属性为多种类型之一，如 let name: string | number = 123
  * 元组类型 如 let nameNumber: [string, number] = ['Jenny', 221345]
  * 枚举 对JavaScript标准数据类型的一个补充
  * 接口interface
      * ?: 可选属性
      * readonly 只读属性
      * 额外的属性检查
      * 内联类型注解 let name: {first: string;second: string;}
* 特殊类型
  * any 类型检查器不检查
  * void 通常见于函数没有返回值时
  * null、undefined。因为这两个类型没有太大意义
  * object 除number，string，boolean，symbol，null或undefined之外的类型。因为ts就是解决强类型问题，所以object也没太大意义
* 函数
* 类(跟ES6类类似，但早于ES6)

``` ts
let isDone: boolean = false;
let decLiteral: number = 6;
let name: string = "bob";
let name: string | number = 1 // string or number options

// 数组
let list: number[] = [1, 2, 3];
let x: [string, number] = ['hello', 10]; // 元祖


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
``` json
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```
> strictPropertyInitialization 设为 false，不然你定义一个变量就必须给它一个初始值
> "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。
> "experimentalDecorators": true,        // 启用装饰器
## 参考文章

* [如何编写一个 d.ts 文件](https://juejin.im/entry/5907f5020ce46300617bfb44)
* [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
* [vue-typescript-dpapp-demo](https://github.com/SimonZhangITer/vue-typescript-dpapp-demo)
* [typescript-book](https://github.com/basarat/typescript-book/)

interface可以作为定义类型，也可以作为class接口；
但namespace可以作为定义类型，也可以作为value
``` ts
interface Process {
  exit(code?: number): void;
}

declare let process: Process;

// 调用
process.exit();
```

> namespace当作value？yes。同样的还有enum
``` ts
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}

// usage
Utility.log('Call me');
Utility.error('maybe');
// or
(function (Utility) {
  // 添加属性至 Utility
})(Utility || Utility = {});
```