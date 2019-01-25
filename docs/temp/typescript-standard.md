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

## 参考文章

* [TypeScript 规范](https://www.tslang.cn/docs/handbook/declaration-files/do-s-and-don-ts.html)