# TypeScript开发Vue应用

本文旨在帮助读者如何在Vue应用中配置TypeScript，使得使用TypeScript强类型验证开发Vue应用。

## 快速开发

~~如果想一键快速搭建TypeScript的Vue环境，[github](https://github.com/SimonZhangITer/vue-typescript-template)有人对vue-cli添加了typescript模板，可直接用来开发。vue-cli官方也正在开发类似的模板。如果对配置TypeScript有兴趣或者对现有应用改造，请接着看下文。~~
 
vue-cli3工具中直接集成了Vue + TypeScript选项，推荐使用。
 ``` shell
 vue create xxx
 ```

以下为个人从基础的Webpack，到自定义搭建TypeScript应用的过程。

## 1. 初始化项目

笔者使用vue-cli的master版本为基础，建立webpack项目。

```
vue init webpack my-project
```

## 2. 引入TypeScript包

既然需要用到typescript，那就要加入一些core包和第三方支持包。

```
// 安装vue的官方插件
npm i vue-class-component vue-property-decorator --save

// ts-loader typescript 必须安装，其他的相信你以后也会装上的
npm i ts-loader typescript tslint-loader --save-dev
```

## 3. 配置webpack

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

## 4. ESLint支持TypeScript

TSLint不再被官方推荐，而使用[ESLint + Plugin]方式(https://github.com/typescript-eslint/typescript-eslint)替换。

### 1. ESLint插件 - TypeScript

安装插件 + 配置（parse解析器），使得ESLint能约束TypeScript代码。[官方github详细步骤](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)

1. 必须包括的插件（必备）：（**这里的插件只约束Lint格式**，TypeScript源码编译还得依赖babel插件支持）
``` js
"typescript" // 必备
"@typescript-eslint/parser" // 该解析器可以利用ESLint的默认解析器，并且可以代替ESLint的默认解析器espree
"@typescript-eslint/eslint-plugin" // 特定于ESLint的插件，当与结合使用时@typescript-eslint/parser，可以运行特定于TypeScript的插入规则
```

2. extends配置插件（可选）：提前设置的规则集合

``` js
"@vue/eslint-config-airbnb"
"@vue/eslint-config-standard"
"@vue/eslint-config-typescript"s
```

### 2. ESLint配置

大部分于ESLint规则配置相似，最关键的：需要指定解析器：`"parser": "@typescript-eslint/parser"`

``` json
"eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      // 可选配置文件
      "plugin:vue/essential",
      "@vue/standard",
      "@vue/typescript"
    ],
    "rules": {
      // 具体规则，可替换上述配置文件的规则，优先级最高
      "no-unused-vars": "off",
      "no-console": "off",
      "comma-dangle": "off",
      "semi": "off",
      "no-param-reassign": "off",
      // @typescript-eslint/eslint-plugin插件：支持特定于ts的规则
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/member-delimiter-style": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/semi": "off"
    },
    "parserOptions": {
        // 必备插件,识别ts语法
      "parser": "@typescript-eslint/parser"
    }
}
```

## 参考文章

* [如何用 ESLint 检查 TypeScript 代码](https://juejin.im/entry/5a156adaf265da43231aa032)

* [vue-typescript-dpapp-demo](https://github.com/SimonZhangITer/vue-typescript-dpapp-demo)

* [vue-typescript-starter](https://github.com/ws456999/vue-typescript-starter)