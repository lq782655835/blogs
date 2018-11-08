# TypeScript开发Vue应用

本文旨在帮助读者如何在Vue应用中配置TypeScript，使得使用TypeScript强类型验证开发Vue应用。

## 快速开发

如果想一键快速搭建TypeScript的Vue环境，[github](https://github.com/SimonZhangITer/vue-typescript-template)有人对vue-cli添加了typescript模板，可直接用来开发。vue-cli官方也正在开发类似的模板。如果对配置TypeScript有兴趣或者对现有应用改造，请接着看下文。
 
 ``` shell
 vue init SimonZhangITer/vue-typescript-template <project-name>
 ```

## 初始化项目

笔者使用vue-cli的master版本为基础，建立webpack项目。

```
vue init webpack my-project
```

## 引入TypeScript包

既然需要用到typescript，那就要加入一些core包和第三方支持包。

```
// 安装vue的官方插件
npm i vue-class-component vue-property-decorator --save

// ts-loader typescript 必须安装，其他的相信你以后也会装上的
npm i ts-loader typescript tslint-loader --save-dev
```

## 配置webpack

1. 找到`./build/webpack.base.conf.js`

2. 将文件`main.js`改为`main.ts`,webpack.base.conf.js入口后缀也改下

3. `resove.extensions`加入`.ts`

``` js
resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@': resolve('src')
    }
  }
```

4. 添加module.rules,使得webpack能解析.ts

``` js
{
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
    appendTsSuffixTo: [/\.vue$/],
    }
}
```

5. TypeScript 默认并不支持 *.vue 后缀的文件，创建`src/typing/vue-shim.d.ts`文件, typescript会自动加载解析`.d.ts`后缀文件。

``` js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

6. 改造.vue文件，尝试改为ts写法。将`App.vue`改为如下：

 ``` html
 <template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'app'
})
export default class App extends Vue {}
</script>
 ```

## 配置TypeScript以及环境

修改完以上步骤，npm run dev依然会报错。因为typescript配置以及vue-cli给我们提供的默认配置，依然有些问题。应用typescript中，webpack3/4对应ts-loader有版本要求。所以这里给出我的配置文件，依次替换即可

1. 根目录新增`tsconfig.json`文件，提供typescript配置

 ``` json
 {
  "include": [
    "src/*",
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ],
  "compilerOptions": {
    // types option has been previously configured
    "types": [
      // add node as an option
      "node"
    ],
    // typeRoots option has been previously configured
    "typeRoots": [
      // add path to @types
      "node_modules/@types"
    ],
    // 以严格模式解析
    "strict": true,
    // 在.tsx文件里支持JSX
    "jsx": "preserve",
    // 使用的JSX工厂函数
    "jsxFactory": "h",
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 启用装饰器
    "experimentalDecorators": true,
    "strictFunctionTypes": false,
    // 允许编译javascript文件
    "allowJs": true,
    // 采用的模块系统
    "module": "esnext",
    // 编译输出目标 ES 版本
    "target": "es5",
    // 如何处理模块
    "moduleResolution": "node",
    // 在表达式和声明上有隐含的any类型时报错
    "noImplicitAny": true,
    "lib": [
      "dom",
      "es5",
      "es6",
      "es7",
      "es2015.promise"
    ],
    "sourceMap": true,
    "pretty": true
  }
}
 ```

2. `package.json`、`.eslintrc.js`、`.postcssrc.js`修改

### package.json

``` json
"devDependencies": {
    "@types/node": "^8.0.58",
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-eslint": "^7.1.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "chalk": "^2.0.1",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "eslint": "^3.19.0",
    "eslint-config-standard": "^10.2.1",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-html": "^3.0.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-node": "^5.2.0",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^3.0.1",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "node-notifier": "^5.1.2",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "rimraf": "^2.6.0",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "ts-loader": "^3.2.0",
    "typescript": "^2.6.2",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-class-component": "^6.1.2",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  },
```

### .eslintrc.js
 ``` js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

 ```

### .postcssrc.js

 ``` js
module.exports = {
  "plugins": {
    "postcss-import": {},
    // "postcss-url": {},
    "autoprefixer": {}
  }
}
 ```

## 参考文章

[vue-typescript-dpapp-demo](https://github.com/SimonZhangITer/vue-typescript-dpapp-demo)
 
[vue-typescript-starter](https://github.com/ws456999/vue-typescript-starter)