# 从V8 sort源码看插入排序

有个好友问了如下Array.prototype.sort问题：

``` js
[3, 11, 2].sort() // [11, 2, 3]

[3, 11, 2].sort((a,b) => a < b) // [3, 11, 2]
[3, 11, 2].sort((a,b) => a > b) // [3, 11, 2]

[3, 11, 2].sort((a,b) => a - b) // [2, 3, 11]
[3, 11, 2].sort((a,b) => b - a) // [11, 3, 2]
```

感觉很奇怪吧，看下[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)解释：
* If compareFunction is not supplied
    *  all non-undefined array elements are sorted by converting them to strings and comparing strings in UTF-16 code units order.
* If compareFunction is supplied
    * If compareFunction(a, b) is less than 0, sort a to an index lower than b (i.e. a comes first).
    * If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behavior, thus, not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this.
    * If compareFunction(a, b) is greater than 0, sort b to an index lower than a (i.e. b comes first).
    * compareFunction(a, b) must always return the same value when given a specific pair of elements a and b as its two arguments. If inconsistent results are returned, then the sort order is undefined.

compareFunction结果有三种：0（顺序不变），>0（从小到大）,<0（从大到小）。如果是a>b形式返回true/false，自动转为number就变成1/0两种结果了

## V8源码

``` js
function ArraySort(comparefn) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.sort");

  var array = TO_OBJECT(this);
  var length = TO_LENGTH(array.length);
  return InnerArraySort(array, length, comparefn);
}
```

``` js
function InnerArraySort(array, length, comparefn) {
    // 未定义comparefn时，会转为string对比
    if (!IS_CALLABLE(comparefn)) {
        comparefn = function (x, y) {
        if (x === y) return 0;
        if (%_IsSmi(x) && %_IsSmi(y)) {
            return %SmiLexicographicCompare(x, y);
        }
        x = TO_STRING(x);
        y = TO_STRING(y);
        if (x == y) return 0;
        else return x < y ? -1 : 1;
        };
    }
    var QuickSort = function QuickSort(a, from, to) {
        var third_index = 0;
        while (true) {
        // 数据较少时，使用插入排序
        // Insertion sort is faster for short arrays.
        if (to - from <= 10) {
            InsertionSort(a, from, to);
            return;
        }
        // 数据较多时，递归处理
        if (to - from > 1000) {
            third_index = GetThirdIndex(a, from, to);
        } else {
            third_index = from + ((to - from) >> 1);
        }
        // Find a pivot as the median of first, last and middle element.
        ...
        if (to - high_start < low_end - from) {
            QuickSort(a, high_start, to);
            to = low_end;
        } else {
            QuickSort(a, from, low_end);
            from = high_start;
        }
        }
    };

    QuickSort(array, 0, num_non_undefined);
    return array
}
```

## 插入排序

[插入排序](https://zh.wikipedia.org/wiki/%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F)（英语：Insertion Sort）是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

打扑克牌时，从牌桌上逐一拿起扑克牌，在手上排序的过程相同。

举例：

Input: {5 2 4 6 1 3}。

首先拿起第一张牌, 手上有 {5}。

拿起第二张牌 2, 把 2 insert 到手上的牌 {5}, 得到 {2 5}。

拿起第三张牌 4, 把 4 insert 到手上的牌 {2 5}, 得到 {2 4 5}。

以此类推。

``` js
// 插入排序
/**
一般来说，插入排序都采用in-place在数组上实现。具体算法描述如下：

1. 从第一个元素开始，该元素可以认为已经被排序
1. 取出下一个元素，在已经排序的元素序列中从后向前扫描
1. 如果该元素（已排序）大于新元素，将该元素移到下一位置
1. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
1. 将新元素插入到该位置后
1. 重复步骤2~5
**/
var InsertionSort = function InsertionSort(a, from, to) {
    for (var i = from + 1; i < to; i++) {
      var element = a[i];
      for (var j = i - 1; j >= from; j--) {
        var tmp = a[j];
        var order = comparefn(tmp, element);
        if (order > 0) {
          a[j + 1] = tmp;
        } else {
          break;
        }
      }
      a[j + 1] = element;
    }
  };
```
