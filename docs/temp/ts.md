# TypeScript

## 基础类型
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
* 类
* 函数
``` ts
let isDone: boolean = false;
let decLiteral: number = 6;
let name: string = "bob";
let list: number[] = [1, 2, 3];
let x: [string, number] = ['hello', 10];

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
## ts环境配置

## ts使用
Vue单文件组件，推荐使用官方维护的 vue-class-component 装饰器，它是基于类的 API

``` ts
import Vue from 'vue'
import Component from 'vue-class-component'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里
  template: '<button @click="onClick">Click!</button>'
})
export default class MyComponent extends Vue {
  // 初始数据可以直接声明为实例的属性
  message: string = 'Hello!'

  // 组件方法也可以直接声明为实例的方法
  onClick (): void {
    window.alert(this.message)
  }
}
```

## ts 描述文件
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

## 参考文章

* [如何编写一个 d.ts 文件](https://juejin.im/entry/5907f5020ce46300617bfb44)
* [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)