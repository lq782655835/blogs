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