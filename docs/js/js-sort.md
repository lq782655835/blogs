# 排序算法

## 冒泡排序
数组中有 n 个数，比较每相邻两个数，如果前者大于后者，就把两个数交换位置；这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过 n-1（数组的 length - 1） 轮，就完成了所有数的排序。
``` js
// 从小到大冒泡排序
function sort(arr) {
    for (var i = 0; i < arr.length - 1 ; i++) { // 两两比较，所以是arr.length - 1
        for(var j = 0; j < arr.length - i - 1 ; j++) {
            if (arr[j] > arr[j+1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

// 优化
function sort(arr) {
    var max = arr.length - 1;
    for(var i = 0; i < max; i++) {
        var done = true // 声明一个变量，作为标志位
        for (var j = 0; j < max - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                done = false
            }
        }
        // 如果标记在某一排序中没有变动，即都正序了，可跳出循环
        if (done) {
            break
        }
    }
    return arr
}
```

## 快速排序

从数组的中间拿一个值，然后通过这个值挨个和数组里面的值进行比较，如果大于的放一边，小于的放一边，然后把这些合并，再进行比较，如此反复即可。
``` js
function quickSort(arr) {
    if (arr.length <= 1) return arr

    // 取中间index/value
    var index = Math.floor(arr.length / 2)
    var middle = arr.splice(index, 1)

    var left = [], right = []
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i]
        cur > middle ? right.push(cur) : left.push(cur)
    }

    // 递归调用left/right快排
    return quickSort(left).concat(middle, quickSort(right))
}
```

## 插入排序

将一个元素插入到其它已经有序的牌中的适当位置，因此其他所有元素在插入之前都向右移动一位，为新元素腾出空间。有点类似摸扑克牌排序。

如果对一个已经有序的数组使用插入排序，插入排序只会遍历数组一遍，时间复杂度退化为 O(n)；可以想象，如果对一个接近有序的数组使用插入排序，其效率是非常可观的，而很多时候我们处理的数据是接近有序的，只需调整一些无序项，所以插入排序是很有用的。

``` js
function insertSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var j = i
        var temp = arr[j]
        for(; j > 0; j--) {
            // 当前考察的数大于前一个数，证明有序，退出循环
            if (temp > arr[j - 1]) break;
            // 将前一个数复制到后一个数上
            arr[j] = arr[j - 1]
        }
        // 找到考察的数应处于的位置
        arr[j] = temp
    }
    return arr
}
```