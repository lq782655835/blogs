
经典面试题 https://lq782655835.github.io/blogs/js/js-polyfill.html

冒泡排序 https://lq782655835.github.io/blogs/js/js-sort.html
快速排序：https://juejin.im/post/5c662e496fb9a049b82afb71 扩展数组辅助、原地复用、三路快排
插入排序：https://lq782655835.github.io/blogs/js/js-sort.html#_3-%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F 已排序给腾位置

promise：https://lq782655835.github.io/blogs/js/js-base-4.promise.html then返回新的promise，里面executor处理添加callback

发布订阅event.on/emit、观察者Dep/Watcher：https://lq782655835.github.io/blogs/js/js-design-pattern.html

----

## didi

* 求出一个整数数组中两个和为指定值的数 
* 求一个整数数组元素的全排列:https://www.jianshu.com/p/6e7f88ead393
* 利用两个栈实现一个队列类:https://www.jianshu.com/p/eae6ec8cc810。入队列push stack1，出队列把stack1倒入到stack2中
* 两个队列实现一个栈的功能：https://blog.csdn.net/mmc_maodun/article/details/25076689 入栈push queue1/2，出栈把queue1导入queue2（互相），取最后一个

## microsoft

* 在一个整数数组中，找出两个和的绝对值最小的数

## bytedance

* 求出一个整数数组中两个和为指定值的数
* 求出一个整数数组中的最大连续子序列和 动态规划
* 找出一个整数数组中第K大的数： https://www.jianshu.com/p/33ee33ce8699 quickSort
* 找出一个整数数组中最短的和大于等于N的连续子序列长度

-----

import 和 require 导入的区别：
关键点：1. 前者是值的引用，后者是值的拷贝。 2.前者编译时输出接口，后者运行时加载。

interface 和 type 的区别
1. interface方式可以实现接口的extends/implements，而type 不行
1. interface可以实现接口的merge，但是type不行
1. interface只能定义对象类型，type声明的方式可以定义组合类型，交叉类型和原始类型。

-----

一文看懂深度学习：https://medium.com/@pkqiang49/%E4%B8%80%E6%96%87%E7%9C%8B%E6%87%82%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0-%E7%99%BD%E8%AF%9D%E8%A7%A3%E9%87%8A-8%E4%B8%AA%E4%BC%98%E7%BC%BA%E7%82%B9-4%E4%B8%AA%E5%85%B8%E5%9E%8B%E7%AE%97%E6%B3%95-2d34c5cb7175

nlp方向（人工智能子领域）分为：机器语音翻译、文本识别、情感识别等。主要是语音、语言，用到递归神经网络RNN

k8s分为master节点和node节点，etcd记录

南北流量：从网址到pod。 LB + 映射关系，映射那个app + 实例。四层LB叫LoadBlance，7层LB叫Ingress
东西流浪：pod间通信。都得申请Services

-----

深度学习平台是为算法工程师打造的一站式开发部署平台，为用户提供从模型开发调试、模型训练、模型存储到模型部署的全流程开发及部署支持；深度学习平台支持多种算法框架，满足不同AI应用场景的需求


* 支持Tensorflow、PyTorch、MPI（caffe）三大主流深度学习框架的任务训练
* 支持单机多卡、多机多卡模式的分布式计算
* 支持基于TFServing或用户自定义Docker镜像的在线推理模块及运维监控 ，实现一键部署服务及对线上服务进行扩缩容

打通内部数据 + 了解算法需求

-----

Kubeflow

背景：Kubernetes 本来是一个用来管理无状态应用的容器平台。分布式的机器学习任务一般会涉及参数服务器（以下称为 PS）和工作节点（以下成为 worker）两种不同的工作类型。而且不同领域的学习任务对 PS 和 worker 有不同的需求，这体现在 Kubernetes 中就是配置难的问题。

利用 Kubernetes 的 Custom Resource Definition 特性，定义了一个新的资源类型：TFJob

Kubeflow 是 Google 推出的基于 kubernetes 环境下的机器学习组件，通过 Kubeflow 可以实现对 TFJob 等资源类型定义，可以像部署应用一样完成在 TFJob 分布式训练模型的过程。

一个机器学习模型上线对外提供服务要经过: 数据清洗验证，数据集切分， 训练，构建验证模型， 大规模训练, 模型导出，模型服务上线， 日志监控等阶段。（从数据采集，验证，到模型训练再到服务发布）

Kubeflow 核心组件

* jupyter 多租户 NoteBook 服务
* Tensorflow/[PyTorch] 当前主要支持的机器学习引擎
* TF-Serving 提供对 Tensorflow 模型的在线部署，支持版本控制及无需停止线上服务，切换模型等功能
* Istio 提供微服务的管理

https://www.jianshu.com/p/192f22a0b857
https://www.infoq.cn/article/uEd1Ob5brc9LqUfe50dM

-----


媒体流处理API（通常被称为媒体流API或流API）是描述音频或视频数据流的 WebRTC 的一部分

-----

curry化
``` js
function curry(fn, ...args) {
    if (fn.length >= args.length) {
        fn.call(null, ...args)
    }

    return (...args2) => curry(fn, ...args, ...args2)
}
```

pip: (fn1, fn2, fn3)(args) => fn1(fn2(fn3(args)))
``` js
const loopItem = (preFun, nextFun) => (...args) => preFun(nextFun(args))

const pip = (...fns) => fns.reduceRight(loopItem)
```

new

``` js
function _new(Constructor, ...args) {
    let object = Object.create(Constructor.prototype)
    let returnObj = Constructor.call(this, args)
    return typeof returnObj === 'object' ? returnObj : object
}
```

call
``` js
Function.prototype._call = function(context = window, ...args) {
    context.fn = this
    context.fn(...args)
    delete context.fn
}
```

快排

``` js
// 递归版
function quicksort(arr) {
    let middle = Math.floor( (left + right) /2 )
    let middleVal = arr.splice(middle, 1)[0]

    let left = right = []

    arr.forEach(val => (val > middleVal ? right : left).push(val) )
    return [...quicksort(left), middleVal, ...quicksort(right)]
}

// 非递归 原地
function quicksort(arr, left, right) {
    if (left > right) return
    if (!arr.length) return

    let index = partition(arr, left, right)
    partition(arr, left, index - 1)
    partition(arr, index , right)
}

function partition(arr, left, right) {
    let middle = Math.floor((left + right) >> 1)
    let val = arr[middle]

    // 双指针法
    while(left < right) {
        // 找出可以对调的left和right
        while(arr[left] < val) {
            left++
        }
        while(arr[right] > val) {
            right--
        }

        if (left <=right) {
            swap(arr, left, right)
            left++
            right--
        }
    }

    return left
}

arr = [1,3,7,4,6]
quicksort(arr, 0, arr.length - 1)

// 变种：寻找第k大的数
/*
由于只要求找出第k大的数，没必要将数组中所有值都排序。

快排中的partition算法，返回key在数组中的位置，如果key的位置正好等于k-1，那么问题则得到解决，如果key的位置不等于k-1，可使用递归查找对应子数组。直到key的位置等于k-1，则找对问题的解。
*/
function findK(arr, left, right, k) {
    let i = partition(arr, left, right)
    if (i === k - 1) return array[k - 1]
    if (i > k - 1){
        return findK(arr, left, i - 1, k)
    } else {
        return findK(arr, i, right, k)
    }
}
```

插入排序

``` js
function insertsort(arr) {
    for (let i = 0; i < arr.length, i++) {
        let index = i
        let val = arr[index] // 0 - index已排序
        while(index > 0 && arr[index - 1] > val) {
            arr[index] = arr[index - 1]
            index--
        }
        arr[index] = val
    }
    return arr
}
```

冒泡排序

``` js
function bobblesort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        let done = true

        for(let j = 0; j < arr.length - 1 - i, j ++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
                done = false
            }
        }

        if (done) return arr
    }
    return arr
}
```

promise

``` js
funciton Promise(executor) {
    let resolveCallbacks = []
    let data
    let status = 'pending'

    function resolve(val){
        this.data = val
        this.status = 'resolved'
        this.resolveCallbacks.forEach(fn => fn(val))
    }

    executor(resolve, reject)
}

Promise.prototype.then = function(onResolve, onReject) {
    let self = this
    let promise2 = null

    // pending ...
    promise2 = new Promise(function(resolve, reject){
        let callback = function(val) {
            let x = onResolve(self.data)
            resolve(x)
        }
        self.resolveCallbacks.push(callback)
    })
    return promise2
}
```

两个栈实现队列

``` js
function Queue() {
    this.stack1 = []
    this.stack2 = []
}
Queue.prototype.pop = funciton() {
    // before判断空
    if (stack2.length) {
        return stack2.pop()
    } else {
        while(stack1.length) {
            stack2.push(stack1.pop())
        }
    }
    return stack2.pop()
}
Queue.prototype.push = funciton(val) {
    this.stack1.push(val)
}
```

两数之和
``` js
function towNum(arr, target) {
    let obj = {}
    arr.forEach(num => {
        if (obj[target - num] !== undefined) {
            return [num, obj[target - num]]
        } else {
            obj[target - num] = num
        }
    })
    return null
}
```

## 全排列

``` js
function permutation(arr) {
    let result = []
    let len = arr.length

    run(0)

    function run(index) {
        if (index === len - 1) { // index在末尾时，结束递归，存入结果
            result.push([...arr])
            return
        }

        for (let i = index; i < len; i++) {
            swap(arr, i, index) // 固定第index位
            run(index + 1) // 递归开始，index + 1后全排列
            swap(arr, i, index) // 数组复原
        }
    }
    return result
}

console.log(permutation(['a', 'b', 'c']))

// 深入思考：全排列有重复

// 在全排列中去掉重复的规则——去重的全排列就是从第一个数字起每个数分别与它后面非重复出现的数字交换。
function isSwap(arr, index) {
    for (let i = index + 1; i < arr.length; i++) {
        if (arr[i] === arr[index]) return false
    }
    return true
}
function run(index) {
        if (index === len - 1) { // index在末尾时，结束递归，存入结果
            result.push([...arr])
            return
        }

        for (let i = index; i < len; i++) {
            if (!isSwap(arr, index)) continue
            swap(arr, i, index) // 固定第index位
            run(index + 1) // 递归开始，index + 1后全排列
            swap(arr, i, index) // 数组复原
        }
    }
```

防抖

``` js
function debounce(fn, wait) {
    let t = null
    return function(...args) {
        let that = this
        t && cleatTimeout(t)
        t = setTimeout(function() { fn.call(that, ...args)}, wait)
    }
}
```

去重

``` js
function removeCopy(arr) {
    // return new Set(...arr)
    return arr.filter((item, index) => arr.indexOf(item) === index)
}
```

二分搜索

``` js
function(arr, target) {
    let left = 0
    let right = arr.length - 1
    while(left < right) {
        let middle = Math.floor((let + right)/ 2)
        let val = arr[middle]

        if (val === target) {
            return middle
        } else if (val > target) {
            right = val - 1
        } else {
            left = val + 1
        }
    }

    return -1
}
```

全排列：https://www.jianshu.com/p/6e7f88ead393

* 求出一个整数数组中的最大连续子序列和（动态规划）

* 找出一个整数数组中第K大的数(快速排序)：https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/kuai-su-pai-xu-de-fen-zhi-si-xiang-by-ni8fun/

* 找出一个整数数组中最短的和大于等于N的连续子序列长度:https://leetcode-cn.com/problems/minimum-size-subarray-sum/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-43/