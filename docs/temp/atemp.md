
## Lerna

* lerna init
* lerna add package --scope xxx # 添加项目包
* lerna run command --scope xxx # 执行包命令

lerna bootstrap
lerna publish

* lerna exec --scope xxx -- ls


# JavaScript 作用域

* 闭包的应用
* 垃圾回收机制基础

``` js
var globalScope = true
if (globalScope) {
    var innerScope = 123
}
console.log(innerScope) // 123
```

``` js
// let关键字隐式的将变量innerScope绑定到{..}作用域中
let globalScope = true
if (globalScope) {
    let innerScope = 123
}
console.log(innerScope) // innerScope is not defined
```

# js 滚动条

网页可见区域宽： document.body.clientWidth;
网页可见区域高： document.body.clientHeight;
网页可见区域宽： document.body.offsetWidth; (包括边线的宽)
网页可见区域高： document.body.offsetHeight; (包括边线的宽)
网页正文全文宽： document.body.scrollWidth;
网页正文全文高： document.body.scrollHeight;
网页被卷去的高： document.body.scrollTop; （当前滚动条距离顶部的距离）
网页被卷去的左： document.body.scrollLeft;（当前滚动条距离左边的距离）

判断滚动条到底部，需要用到DOM的三个属性值，即scrollTop、clientHeight、scrollHeight。

scrollTop为滚动条在Y轴上的滚动距离。
clientHeight为内容可视区域的高度。
scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
从这个三个属性的介绍就可以看出来，滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight。

# JS技巧

## 数组

### 数组的对象解构

数组也可以对象解构，可以方便的获取数组的第n个值
``` js
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');
 
country            // US
state            // New Yourk
```

## 对象

在函数参数中解构嵌套对象
``` js
var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345
  }
}
const modelAndVIN = ({model, engine: {vin}}) => {
  console.log(`model: ${model} vin: ${vin}`);
}
modelAndVIN(car); // => model: bmw 2018  vin: 12345
```

## Ice飞冰

### 物料开发

https://ice.work/docs/materials/guide/usage

方案跟vusion一致，组件（基础/业务）通过npm发布，block作为代码片段可二次修改，模板通过脚手架生成。

完成以上本地编码后，可以统一注册到ice中心（token）（返回url），然后可在iceworks（IDE）上进行查看。

React官方物料：https://github.com/alibaba-fusion/materials

### iceworks本地IDE

https://ice.work/docs/iceworks/quick-start

## 制作一个vue-cli工具

https://github.com/RaleighY/femi-scripts
``` js
const config = require("../config/webpack.config")

const compiler = Webpack(config)
const devServer = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  proxy: PackageJson.proxy,
})

devServer.listen(4000, "localhost", err => {
  if (err) {
    return console.log(err)
  }
})
```