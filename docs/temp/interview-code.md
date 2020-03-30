
# 编码题

``` js
// 实现 (5).add(3).minus(2) 功能
Number.prototype.add = function(n) {
  return this.valueOf() + n;
};
Number.prototype.minus = function(n) {
  return this.valueOf() - n;
};
```

``` js
// 编程题，根据以下要求，写一个数组去重函数
// 得考虑到数据类型为null,undefind等类型 包括数据为对象时key顺序不同的问题
function isObj(obj){
 return Object.prototype.toString.call(obj) === '[object Object]'
}
// 对象重整 对key进行排序
function parseObj(obj){
	let keys = Object.keys(obj).sort()
	let newObj = {}
	for(let key of keys){
               // 不晓得有没有有必要，反正把value为obj的情况也处理一下 - -
                obj[key]=isObj(obj[key])?parseObj(obj[key]):obj[key]
		newObj[key] = obj[key]
	}
	return newObj
}

// 最后
const arr = [1,'1',{a:1,b:"1"},{b:'1',a:1},{a:1,b:2},[1,2,3],null,undefined,undefined]
function passArr(arr){
	return [...new Set(arr.map(item=>
		isObj(item)? JSON.stringify(parseObj(item)) : ( !item ? item : JSON.stringify(item))
    ))].map(item=>!item?item : JSON.parse(item))
```

``` js
// 某公司 1 到 12 月份的销售额存在一个对象里面，如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
let obj = {1:222, 2:123, 5:888};
const result = Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null);
console.log(result)
```

``` js
// 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 
function processString (s) {
    return s.split('').map((item) => {
        return item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase();
    }).join('');
}
console.log(processString('AbC'));
```

``` js
// 模拟实现一个 Promise.finally
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

``` js
// 要求设计 LazyMan 类，实现以下功能。
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

class LazyManClass {
    constructor(name) {
        this.taskList = [];
        this.name = name;
        console.log(`Hi I am ${this.name}`);
        setTimeout(() => {
            this.next(); // 尾调用
        }, 0);
    }
    eat (name) {
        var that = this;
        var fn = (function (n) {
            return function () {
                console.log(`I am eating ${n}`)
                that.next();
            }
        })(name);
        this.taskList.push(fn);
        return this;
    }
    sleepFirst (time) {
        var that = this;
        var fn = (function (t) {
            return function () {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    that.next();
                }, t * 1000);  
            }
        })(time);
        this.taskList.unshift(fn);
        return this;
    }
    sleep (time) {
        var that = this
        var fn = (function (t) {
            return function () {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    that.next();
                }, t * 1000); 
            }
        })(time);
        this.taskList.push(fn);
        return this;
    }
    next () {
        var fn = this.taskList.shift();
        fn && fn();
    }
}
function LazyMan(name) {
    return new LazyManClass(name);
}
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
```

``` js
// 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度
// 原始 list 如下
// let list =[
//     {id:1,name:'部门A',parentId:0},
//     {id:2,name:'部门B',parentId:0},
//     {id:3,name:'部门C',parentId:1},
//     {id:4,name:'部门D',parentId:1},
//     {id:5,name:'部门E',parentId:2},
//     {id:6,name:'部门F',parentId:3},
//     {id:7,name:'部门G',parentId:2},
//     {id:8,name:'部门H',parentId:4}
// ];
// const result = convert(list, ...);

// 思路：list转为map对象，再处理map对象
function convert(list) {
	const res = []
	const map = list.reduce((res, v) => (res[v.id] = v, res), {})
	for (const item of list) {
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}
```

``` js
// 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
// 深度遍历
const fn = (data, value) => {
  let res = []
  const dfs = (arr, temp = []) => {
    for (const node of arr) {
        // 满足条件直接return
        if (node.id === value) {
            res = temp
            return
        } else if(node.children) {
            dfs(node.children, temp.concat(node.id)) // 每次传入它的id链路
        }
    }
  }
  dfs(data)
  return res
}
```

``` js
// 简易proxy版双向数据绑定
<body>
  hello,world
  <input type="text" id="model">
  <p id="word"></p>
</body>
<script>
  const model = document.getElementById("model")
  const word = document.getElementById("word")
  var obj= {};

  const newObj = new Proxy(obj, {
      get: function(target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
      },
      set: function(target, key, value, receiver) {
        console.log('setting',target, key, value, receiver);
        if (key === "text") {
          model.value = value;
          word.innerHTML = value;
        }
        return Reflect.set(target, key, value, receiver);
      }
    });

  model.addEventListener("keyup",function(e){
    newObj.text = e.target.value
  })
</script>
```

### 1. 红绿灯实现
``` js
function button(color, time) {
    let p = new Promise(function (resolve, reject) {
        console.log(color, time)
        setTimeout(function() {
            resolve(true)
        }, time);
    });
    return p;
}
function flash() {
    button("red", 3000) // after last task end, which means the last task will need 3s
    .then( (v) => {
        console.log(v);
        return button("yellow", 1000); // last spend 3s
    }).then( (v) => {
        console.log(v);
        return button("green", 1000); // last spend 1s
    }).then( (v) => {
        console.log(v);
    });
}
flash()
```

### 1. 算法题，给定一个整数金额的整钱n，还有2，3，5元三种货币，要你计算出所有能凑出整钱的组合个数。

``` js
// 笨办法，纯循环
function countMoney(total) {
    if (total < 2) return 0;

    var result = 0;
    var maxAmount = total / 2; // 最小面币是2，所以除以2
    for (var i = 0; i <= maxAmount; i++) { // 5
        for (var j = 0; j <= maxAmount; j++) { // 3
            for (var k = 0; k <= maxAmount; k++) { // 2
                var sum = i * 5 + j * 3 + k * 2;
                if (sum == total) {
                    result++;
                    break;
                } else if (sum > total) {
                    break;
                }
            }
        }
    }
    return result;
}
console.log(countMoney(10));

// 找规律，递归
var inputMoneyArray = [2,3,5];
inputMoneyArray.sort().reverse(); // 从大到小排序
function countMoney(amount, moneyArr) {
    // 递归结束条件
    if (amount != 0 && moneyArr.length == 0) return 0; // 不满足
    if (amount == 0) return 1; // 满足

    let [first, ...smallerMoneyArr] = moneyArr // 取出第一个值first
    var sum = 0;
    for (var i = 0; i <= amount / first; i++) { // amount / first是最小循环次数
        var remainingAmount = amount - (first * i); // 除去第一个值first，剩余金额
        sum += countMoney(remainingAmount, smallerMoneyArr); // 递归调用
    }
    return sum;
}
var result = countMoney(10, inputMoneyArray);
```