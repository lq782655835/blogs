# TypeScript规范

* 使用number，string，and boolean，而不使用Number，String，Boolean
``` ts
// bad
function reverse(s: String): String;

// good
function reverse(s: string): string;
```
* 返回值被忽略的回调函数,设置void类型的返回值类型。
``` ts
// bad
function fn(x: () => any) {
    x();
}

// good
function fn(x: () => void) {
    x();
}
```
> 使用void相对安全，因为它防止了你不小心使用x的返回值

* interface 放在typings/interface下，一个模块一个文件。使用的时候使用import手动导入
    1. 放在.d.ts描述文件中，每次都需要重启vscode才能不报错
    2. 不使用export as namespace myLib;因为每次interface都需要带上myLib名称，不需要。
    3. 参考后端java代码，都是通过import导入
* Vuex
    * store/modules下的每个子模块，均维护自己名为 State 的 Interface 声明
    * store/index.ts 文件中，汇总各子模块，维护一个总的State声明

## 常用方式

### Interface & type

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

### 联合类型

``` ts
interface Person {
    name: string;
    age : number | string;
}
```

### 数组类型

``` ts
interface Person {
    name: string;
    age : number;
    schools: string[];
}
```

### 元祖

``` ts
let tom: [string, number] = ['Tom', 25];
```

### 可选属性

``` ts
interface Person {
    name: string;
    age ?: number;
}
```

### 任意属性

``` ts
interface Person {
    name: string;
    age: number;
    [key: string] : string;
}
```

### 简写类型

``` ts
interface Person {
    name: string;
    age: number;
    attr : { label: string; value: string; color?: string; tips?: string }
}
```

### keyof

``` ts
const todo = {
    id: 1,
    name: 'james',
    address: 'shisanjia'
}

type K = keyof todo // "id" | "name" | "address"
```

### 泛型

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

### key in keyof T

``` ts
interface IPoint {
    x: number
    y: number
}

type Name<T> = { [P in keyof T]: T[P]}

type real = Name<IPoint> // {x: number, y: number}
type test2 = Name<{Job: string, Job2: string}> // {Job: string, Job2: string}

```

## 参考文章

* [TypeScript 规范](https://www.tslang.cn/docs/handbook/declaration-files/do-s-and-don-ts.html)