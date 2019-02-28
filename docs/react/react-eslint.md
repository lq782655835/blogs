# ESlint代码检查规范 - React/ReactNative

在前端编码时,为了规范每个成员的代码风格以及避免低级的错误,我们可以使用Eslint来制定规则.本文旨在帮助团队成员形成良好的React代码规范。推荐使用[Airbnb Eslint规范](https://github.com/airbnb/javascript/tree/master/react)+[自定义Rules](http://eslint.cn/docs/rules/)。

## Airbnb Eslint规范

目前使用eslint不再需要自己手动装太多npm包，社区已经在最新eslint初始化命令中自动安装。

### 安装Eslint

有全局安装和本地安装两种方式，推荐本地安装

```
npm install --save-dev eslint
```

### 初始化Eslint

初始化会供用户很多可选的选择，这里推荐使用流行的`Airbnb Eslint`。安装完后，在`package.json`中会自动安装需要的依赖,分别为eslint-config-airbnb、eslint-plugin-import、eslint-plugin-jsx-a11y、eslint-plugin-react。同时也会创建`.eslintrc`配置文件

```
eslint --init
```

![](https://upload-images.jianshu.io/upload_images/1474238-c0bc9d15756a4abe.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/555)

### Eslint检查

eslint的[Command Line Interface](https://eslint.org/docs/user-guide/command-line-interface)有命令行调用接口，如何搭配命令行取决于项目风格。格式：

```
eslint [options] [file|dir|glob]*
```

eg：当前app目录下监测js并打印报错

```
eslint --quiet --ext .js app
```

```
--ext [String]                 Specify JavaScript file extensions - default: .js
--quiet                        Report errors only - default: false
```

>tips: 如果测试执行报错，可能你同时安装了本地和全局eslint，这里可以把eslint命令指定为本地路径：`./node_modules/.bin/eslint`,参考见该[issue](https://github.com/airbnb/javascript/issues/465)

## 自定义Rules

自定义Rules综合考虑了笔者部门小伙伴习惯的Vue风格，如不使用分号结尾，以及React特殊的JSX语法，形成以下推荐配置：

```eslint
module.exports = {
    "extends": ["airbnb"], // 使用airbnb规则
    "parser": "babel-eslint",// React使用了大量ES6语法，使用babel-eslint解析器代替默认的Espree
    "globals": { // 全局变量设置
        "__DEV__": false // false 表示这个全局变量不允许被重新赋值
    },
    "rules": {
        // 4个空格
        "indent": [2, 4],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],

        "semi": [2, "never"], // 是否使用分号结尾
        "no-console": 'off', // 允许console
        "max-len": "off", // 单行没有字数限制
        "object-curly-newline": "off", // 关闭大括号内换行符的一致性
        "comma-dangle": "off", // 关闭是否使用拖尾逗号
        "arrow-parens": "off", // 关闭箭头函数是否需要大括号

        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], // 允许使用js/jsx文件扩展
        "react/sort-comp": "off", // 关闭sort
        "react/no-array-index-key": "off",// 允许使用index作为List的key
        "no-unused-expressions": "off",// 允许三元表达式
        "import/no-unresolved": "off",// 允许require image
        "react/no-multi-comp": "off", // 允许一个文件定义多个组件
        "react/display-name": "off", // 不需要给组件定义displayName
    }

};
```

>注意:需要额外安装babel-eslint以解析ES6语法：`npm install --save-dev babel-eslint`
