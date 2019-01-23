* interface 放在typings/interface下，一个模块一个文件。使用的时候使用import手动导入
    1. 放在.d.ts描述文件中，每次都需要重启vscode才能不报错
    2. 不使用export as namespace myLib;因为每次interface都需要带上myLib名称，不需要。
    3. 参考后端java代码，都是通过import导入


// 在表达式和声明上有隐含的any类型时报错
// "noImplicitAny": false, // 如果想省略写any，可以把该值设置为false。默认为true

// 是否必须要有初始值
// "strictPropertyInitialization": false, // 如果允许属性没有初始值，设置为false。默认为true

// 启用装饰器
    "experimentalDecorators": true,

    // 启用 vuex-class 需要开启此选项
    "strictFunctionTypes": false

Vuex
import Vuex, { StoreOptions, Commit, Dispatch } from 'vuex';
