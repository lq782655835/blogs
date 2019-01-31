# Typescript tsconfig.json全解析

TypeScript带来的类型系统以及强大的IDE支持，让前端开发也变得严谨而流畅。但TypeScript不是原生的Javascript代码，需要进行编译才能转换为Javascript代码。

tsconfig.json是编译TypeScript的配置文件，对书写TypeScript代码十分重要。因为有些选项如果你没配置，则需要严格按照TypeScript的规则来书写，对初期使用TypeScript的同学而言，稍不留神就会书写出不符合规则的代码，从而导致编译报错，打击自信心。其实早期可以通过关闭一些规则设置，从而更愉快的从js转为ts开发。笔者根据项目实战经历来解释一些常用的编译选项，文末也会附上笔者整理的所有tsconfig.json选项的解释。

## 1. experimentalDecorators
`是否启用实验性的ES装饰器`。boolean类型，默认值：false。[官方解释](https://www.typescriptlang.org/docs/handbook/decorators.html)

TypeScript和ES6中引入了Class的概念，同时在[stage 2 proposal](https://github.com/tc39/proposal-decorators)提出了Java等服务器端语言早就有的装饰器模式。通过引入装饰器模式，能极大简化书写代码，把一些通用逻辑封装到装饰器中。很多库都有用到该特性，比如vue-class-component 及 vuex-class等库。当你使用这些库时，必须开启experimentalDecorators。

``` ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

class C {
    @f()
    method() {}
}
```
> 启用 vuex-class同时需要设置`strictFunctionTypes`选项为false

## 2. strictPropertyInitialization
`是否类的非undefined属性已经在构造函数里初始化`。 boolean类型，默认值：false

直白点，就是所有的属性值，都需要赋有初始值。**建议把strictPropertyInitialization设置为false**，这样就不需要定义一个变量就必须赋有初始值。**对使用vuex-class库的同学，建议请把这个值设为false，绝对能省很多事。**

> 如果设置该选项为true，需要同时启用--strictNullChecks或启用--strict

``` ts
export default class Home extend Vue{
    jobId: string // 如果开启strictPropertyInitialization，则这里会报错，因为没有赋值默认值

    method1() :void {
        console.log(this.jobId)
    }
}
```

## 3. noImplicitAny
`有隐含的 any类型时是否报错`。boolean值，默认值：false

ts是有默认推导的，同时还有any类型，所以不是每个变量或参数定义需要明确告知类型是什么。如果开启该值，当有隐含any类型时，会报错。**建议初次上手TypeScript，把该选项设置为false。**

``` ts
// 当开启noImplicitAny时，需要隐含当any需要明确指出
arr.find(item => item.name === name) // error
arr.find((item: any) => item.name === name) // ok
```

## 4. target
`指定编译的ECMAScript目标版本`。枚举值："ES3"， "ES5"， "ES6"/ "ES2015"， "ES2016"， "ES2017"，"ESNext"。默认值： “ES3”

TypeScript是ES6的超集，所以你可以使用ES6来编写ts代码（通常我们也的确这么做）。然而，当编译ts代码时，可以把ts转为ES5或更早的js代码。所以需要选择一个编译的目标版本。vue-cli3的typescript模板，设置为“ESNext”，因为现代大部分应用项目都会使用Webpack（Parcel也很棒）进行打包，Webpack会把你的代码转换成在所有浏览器中可运行的代码。

> target: "ESNext" 是指tc39最新的[ES proposed features](https://github.com/tc39/proposals)

## 5. module
`指定生成哪个模块系统代码`。枚举值："None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"， "ES2015"，"ESNext"。默认值根据--target选项不同而不同，当target设置为ES6时，默认module为“ES6”，否则为“commonjs”

通常使用ES6的模块来写ts代码，然而2016年1月以前，基本上没有浏览器原生支持ES6的模块系统，所以需要转换为不同的模块系统，如：CommonJS、AMD、SystemJS等，而module选项就是指定编译使用对应的模块系统。

## 6. lib
`编译过程中需要引入的库文件的列表`。string[]类型，可选的值有很多，常用的有ES5，ES6，ESNext，DOM，DOM.Iterable、WebWorker、ScriptHost等。该值默认值是根据--target选项不同而不同。当target为ES5时，默认值为['DOM
', 'ES5', 'ScriptHost'];当target为ES6时，默认值为['DOM', 'ES6', 'DOM.Iterable', 'ScriptHost']

为了在ts代码中使用ES6中的类，比如Array.form、Set、Reflect等，需要设置lib选项，在编译过程中把这些标准库引入。这样在编译过程中，如果遇到属于这些标准库的class或api时，ts编译器不会报错。

## 7. moduleResolution
`决定如何处理模块`。string类型，“node”或者“classic”，默认值：“classic”。[官方解释](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

说直白点，也就是遇到import { AAA } from './aaa'该如何去找对应文件模块解析。对于工程项目，笔者**建议大家使用node**（vue-cli3 ts模板默认设置为node策略），因为这个更符合平时我们的书写习惯以及认知（平时都是webpack打包，webpack又基于node之上）。

```
// 在源文件/root/src/A.ts中import { b } from "./moduleB"
// 两种解析方式查找文件方式不同

// classic模块解析方式
1. /root/src/moduleB.ts
2. /root/src/moduleB.d.ts

// node模块解析方式
1. /root/src/moduleB.ts
2. /root/src/moduleB.tsx
3. /root/src/moduleB.d.ts
4. /root/src/moduleB/package.json (if it specifies a "types" property)
5. /root/src/moduleB/index.ts
6. /root/src/moduleB/index.tsx
7. /root/src/moduleB/index.d.ts
```

## 8. paths
`模块名或路径映射的列表`。Object值

这是一个非常有用的选项，比如我们经常使用'@/util/help'来代替'./src/util/help'，省的每次在不同层级文件import模块时都纠结于是否'./'还是'../'。该选项告诉编译器遇到匹配的值时，去映射的路径下加载模块。

``` ts
{
    "baseUrl": ".", // 注意：baseUrl不可少
    "paths": {
      // 映射列表
      "@/*": [
        "src/*"
      ],
      "moduleA": [
        "libs/moduleA"
      ]
    }
}
```

## 9. strictNullChecks
`是否启用严格的 null检查模式`。boolean值，默认值：false

未处理的null和undefined经常会导致BUG的产生，所以TypeScript包含了strictNullChecks选项来帮助我们减少对这种情况的担忧。当启用了strictNullChecks，null和undefined获得了它们自己各自的类型null和undefined。开启该模式有助于发现并处理可能为undefined的赋值。**如果是正式项目，笔者建议开启该选项；如果只是练手TypeScirpt，可以关闭该选项**，不然所有可能为null/undefined的赋值，都需要写联合类型。

``` ts
// 未开启strictNullChecks，number类型包含了null和undefined类型
let foo: number = 123;
foo = null; // Okay
foo = undefined; // Okay

// 开启strictNullChecks
let foo: string[] | undefined = arr.find(key => key === 'test')
// foo.push('1') // error - 'foo' is possibly 'undefined'
foo && foo.push('1') // okay
```
> 注意：启用 --strict相当于启用 --noImplicitAny, --noImplicitThis, --alwaysStrict, --strictNullChecks, --strictFunctionTypes和--strictPropertyInitialization

## 10. noUnusedLocals
`有未使用的变量时，是否抛出错误`。boolean值，默认值： false

顾名思义，当发现变量定义但没有使用时，编译不报错。eslint的rule中也有该条，**建议正式项目将该选项开启，设置为true**，使得代码干净整洁。

## 11. noUnusedParameters
`有未使用的参数时，是否抛出错误`。boolean值，默认值： false

**建议正式项目开启该选项，设置为true**，理由同上。

## 12. allowJs
`是否允许编译javascript文件`。boolean值，默认值：false

如果设置为true，js后缀的文件也会被typescript进行编译。

## 13. typeRoots和types


默认所有可见的"@types"包会在编译过程中被包含进来。如果指定了typeRoots，只有typeRoots下面的包才会被包含进来。如果指定了types，只有被列出来的npm包才会被包含进来。[详细内容可看此处](https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types)

> 可以指定"types": []来禁用自动引入@types包

## 6.files、include和exclude
`编译文件包含哪些文件以及排除哪些文件`。

未设置include时，编译器默认包含当前目录和子目录下所有的TypeScript文件（.ts, .d.ts 和 .tsx）。如果allowJs被设置成true，JS文件（.js和.jsx）也被包含进来。exclude排除那些不需要编译的文件或文件夹。

``` ts
{
    "compilerOptions": {},
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

## 总结
``` json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'（"ESNext"表示最新的ES语法，包括还处在stage X阶段）
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
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)。默认是classic
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
    "emitDecoratorMetadata": true,         // 为装饰器提供元数据的支持
    "strictFunctionTypes": false           // 禁用函数参数双向协变检查。
  },
  /* 指定编译文件或排除指定编译文件 */
  "include": [
      "src/**/*"
  ],
  "exclude": [
      "node_modules",
      "**/*.spec.ts"
  ],
  "files": [
    "core.ts",
    "sys.ts"
  ],
  // 从另一个配置文件里继承配置
  "extends": "./config/base",
  // 让IDE在保存文件的时候根据tsconfig.json重新生成文件
  "compileOnSave": true // 支持这个特性需要Visual Studio 2015， TypeScript1.8.4以上并且安装atom-typescript插件
}
```

## 参考文章

* [configuring TypeScript compiler](https://blog.angularindepth.com/configuring-typescript-compiler-a84ed8f87e3)

* [tsconfig.json
](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

* [TypeScript compiler-options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

* [Node.js module documentation](https://nodejs.org/api/modules.html#modules_all_together)