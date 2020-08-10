# 重构你的javascript代码

重构，对于每个开发者都至关重要，特别是对于那些需要进阶的高级程序员。根据二八理论，20%的重构方法，能解决80%的坏代码。笔者最近查阅较多js编码指南以及重新阅读了《代码整洁之道》、《重构：改善既有代码的设计》两本经典书籍（强烈建议每隔一段时间看，每次都有新体会），整理出以下几个要点，帮助大家以最小的记忆，重构大部分坏代码。如果想全面了解重构方式，可以看笔者整理的[AI Javascript风格指南](https://lq782655835.github.io/blogs/team-standard/clean-code-javascript.html)

## 坏代码判断
坏代码对每个人、每个项目标准都不一样，但以下几点大概率会是坏代码，需要使用重构方法进行代码重构。
  * 重复代码
  * 过长函数
  * 过大的类
  * 过长参数列表

## 重构方法

### 1. 好的命名
好的命名贯穿整个软件编码过程，好命名包括合理使用大小写定义、缩进等。目前前端工程提供很多lint或format工具，能很方便的帮助工程检测和自动化，不清楚的同学可以看看笔者[AI前端工具链](https://lq782655835.github.io/blogs/team-standard/1.standard-ai-vuetool.html)。不管是变量名、函数名或是类名，一个好的命名会加快自身开发效率以及阅读代码效率，毕竟程序读的次数会比写的次数多的多。读github上优秀源码就知道，有时候只要看函数名就知道作者的意图。

``` js
// bad
var yyyymmdstr = moment().format('YYYY/MM/DD');

// good
var yearMonthDay = moment().format('YYYY/MM/DD');
```

``` js
// bad
function dateAdd(date, month) {
  // ...
}

let date = new Date();
dateAdd(date, 1) // 很难理解dateAdd(date, 1)是什么意思。笔者注：这里单拎出来举例很简单易懂，但希望在做工程时也时刻谨记这条

// good
function dateAddMonth(date, month) {
  // ...
}

let date = new Date();
dateAddMonth(date, 1);
```

### 2. 函数单一职责
软件工程中最重要原则之一。刚毕业不久的开发人员容易出现这个问题，觉得业务逻辑很复杂，没办法再细分成单独函数，写出很长的业务函数。但根据笔者指导小伙伴经验，大多数是临时变量过多，导致看不穿业务逻辑的本质；其实重构过程中一步步分解职责，拆分成细小函数并用恰当的名称命名函数名，能很快理解业务的本质，说不定还能发现潜藏的bug。

``` js
// bad
function handle(arr) {
    //数组去重
    let _arr=[],_arrIds=[];
    for(let i=0;i<arr.length;i++){
        if(_arrIds.indexOf(arr[i].id)===-1){
            _arrIds.push(arr[i].id);
            _arr.push(arr[i]);
        }
    }
    //遍历替换
    _arr.map(item=>{
        for(let key in item){
            if(item[key]===''){
                item[key]='--';
            }
        }
    });
    return _arr;
}

// good
function handle(arr) {
    let filterArr = filterRepeatById(arr)
    return replaceEachItem(filterArr)
}
```

### 3. 通过引入解释性变量或函数，使得表达更清晰

``` js
// bad
if (platform.toUpperCase().indexOf('MAC') > -1 && browser.toUpperCase().indexOf('IE') > -1 && wasInitialized() && resize > 0) {
  // do something
}

// good
let isMacOs = platform.toUpperCase().indexOf('MAC') > -1
let isIEBrowser = browser.toUpperCase().indexOf('IE') > -1
let isResize = resize > 0
if (isMacOs && isIEBrowser && wasInitialized() && isResize) {
  // do something
}
```

``` js
// bad
const cityStateRegex = /^(.+)[,\\s]+(.+?)\s*(\d{5})?$/;
saveCityState(ADDRESS.match(cityStateRegex)[1], ADDRESS.match(cityStateRegex)[2]);

// good
var cityStateRegex = /^(.+)[,\\s]+(.+?)\s*(\d{5})?$/;
var match = ADDRESS.match(cityStateRegex)
let [, city, state] = match
saveCityState(city, state);
```

``` js
// bad
if (date.before(SUMMER_START) || date.after(SUMMER_END)) {
  charge = quantity * _winterRate + _winterServiceCharge
} else {
  charge = quantity * _summerRate
}

// good
if (notSummer(date)) {
  charge = winterCharge(quantity)
} else {
  charge = summerCharge(quantity)
}
```

### 4. 更少的嵌套，尽早 return
``` js
// bad
let getPayAmount = () => {
  let result
  if (_isDead) result = deadAmount()
  else {
    if (_isSeparated) result = separatedAmount()
    else {
      if (_isRetired) result = retiredAmount()
      else result = normalPayAmount()
    }
  }

  return result
}

// good
let payAmount = () => {
  if (_isDead) return deadAmount()
  if (_isSeparated) return separatedAmount()
  if (_isRetired) return retiredAmount()
  return normalPayAmount()
}
```

### 5. 以HashMap取代条件表达式
``` js
// bad
let getSpeed = type => {
  switch (type) {
    case SPEED_TYPE.AIR:
    return getAirSpeed()
    case SPEED_TYPE.WATER:
    return getWaterSpeed()
    ...
  }
}

// good
let speedMap = {
  [SPEED_TYPE.AIR]: getAirSpeed,
  [SPEED_TYPE.WATER]: getWaterSpeed
}
let getSpeed = type => speedMap[type] && speedMap[type]()
```

## 其他
实践以上列举的重构方法，能解决项目中大部分的坏代码，但还有许多重构方法，能让你的代码变得干净整洁易于阅读。
* 清晰的项目目录结构
* ES6+语法糖
    * **destructuring**
    * **rest**
    * **Array Methods**
    * arrow function
    * 函数默认参数
    * async/await
    * let/const 代替var
* 常用全部使用const，并字母全部为大写
* 使用合适的函数名或变量名代替注释
* 善于利用js中的&& 与 ||
* 避免‘否定情况’的判断
* 尽量不写全局函数与变量
* 采用函数式编程，ES6 Array支持的很好
* 移除重复的代码
* 移除注释的代码

## 参考文章
* [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)
* [JavaScript 编码风格指南](https://www.css88.com/archives/9992)
* [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
* [The AirBnb JavaScript Style Guide](https://www.css88.com/archives/8345)