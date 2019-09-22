# Javascript数据结构 - 数组

数组本质上是一整块连续的内存空间，通过计算直接读到第n个值，非常快速。但数组如果没做好动态扩容，也容易造成浪费内存或者内存不够用。同时插入数据进入数组中，也容易影响效率，因为后续数据都需要向后挪位+1。

当你使用高级语言（如Javascirpt、Java等）array数组很舒适时，其实语言底层做了很多工作与优化。比如js array数组不仅实现了常规的数组数据结构（可快速存储与读取），还实现了动态扩容、队列、栈等相关特性（`js的数组概念跟数据结构的数组概念不一致`），了解这也有助于书写高性能代码。

## JS Array 万能数据结构

JS Array提供了很大的便利，只要用一个数据结构就可以做很多事情，使用者不需要关心各者的区别，使得JS很容易入门。

``` js
// 1. 当作一个普通的数组来使用，即通过下标找到数组的元素
var array = [19, 50, 99];
console.log(array[0]);

// 2. 可以当作一个栈来使用
var stack = [1, 2, 3];
stack.push(4);          //入栈
var top = stack.pop();  //出栈

// 3. 可以当作一个队列
var queue = [1, 2, 3];
queue.push(4);             //入队
var head = queue.shift();  //出队

// 4. 还可以当作一个哈希表来使用(但是不推荐这么用)
var map = [];
map["id"] = 1234;
map["name"] = "yin";
console.log(map["name"]);

// 5. 还可以随时随地增删数组中任意位置的元素
var array = [1, 2, 3, 4];
//从第3个元素开始，删掉1个元素，并插入-1，-2这两个元素
array.splice(2, 1, -1, -2);
//再来个2000的索引
array[2000] = 10;
```

## c语言模拟实现数组

以下使用c语言模拟了高级语言js的数组算法实现，因为c语言数组相比较js数组更偏底层，内存需要自定义申请维护，不支持动态扩容，原生不支持栈、队列特性。

``` c
// JavaScript 数组算法的 C 语言实现
# include <stdio.h>
# include <malloc.h>  //包含了malloc函数
# include <stdlib.h>  //包含了exit函数
 
//定义了一个数据类型，该数据类型的名字叫做struct Arr, 该数据类型含有三个成员，分别是pBase, len, cnt
// 注意初始化数组是
struct Arr
{
    int * pBase; //存储的是数组地址
    int len; //数组所能容纳的最大元素的个数
    int cnt; //当前数组有效元素的个数
};
 
void init_arr(struct Arr *, int);  //初始化数组
bool is_empty(struct Arr *); // 数组是否为空 
bool is_full(struct Arr *); // 数组是否已满 
bool push(struct Arr *, int); //追加元素 
void sort(struct Arr *); // 排序 
void reverse(struct Arr *); // 逆序 
bool insert(struct Arr *, int, int); // 插入元素 
bool del(struct Arr *, int, int *); // 删除元素 
void show_arr(struct Arr *); // 打印数组 
 
int main(void) {
    struct Arr arr;
 
    int val; // 存储删除元素 
 
    init_arr(&arr, 6); // 初始化数组 
    show_arr(&arr);
 
    push(&arr, 4); // 在尾部追加元素 
    push(&arr, 1);
    push(&arr, -1);
    push(&arr, 10);
    push(&arr, 0);
    push(&arr, 6);
    show_arr(&arr);
 
    sort(&arr); // 排序 
    show_arr(&arr); 
 
    reverse(&arr); // 逆序 
    show_arr(&arr);
 
    del(&arr, 4, &val); // 删除指定位置元素 
    printf("您删除的元素是: %d\n", val);
    show_arr(&arr);
 
    insert(&arr, 4, 20); // 在指定位置插入元素 
    show_arr(&arr);
 
    return 0;
}

// c语言length需要指定，因为固定好长度的内存申请后，就不再有了（没有动态扩容）。
void init_arr(struct Arr * pArr, int length) {
    pArr->pBase = (int *)malloc(sizeof(int) * length); // 开辟指定的内存空间
    if(NULL == pArr->pBase) {
        printf("动态内存分配失败!\n");
        exit(-1); //终止整个程序
    }
    else {
        pArr->len = length;
        pArr->cnt = 0;
    }
    return;
}
 
bool is_empty(struct Arr * pArr) {
    if(0 == pArr->cnt) {
        return true;
    } else {
        return false;   
    }       
}
 
bool is_full(struct Arr * pArr) {
    if (pArr->cnt == pArr->len) {
        return true;
    } else {
        return false;
    }
}
 
void show_arr(struct Arr * pArr) {
    if(is_empty(pArr)) {
        printf("数组为空!\n");
    } else {
        for(int i=0; i<pArr->cnt; ++i) {
            printf("%d  ", pArr->pBase[i]);
        }
        printf("\n");
    }
}
 
bool push(struct Arr * pArr, int val) {
    //满了就返回false
    if(is_full(pArr)) {
        return false;
    }
    //不满时追加
    pArr->pBase[pArr->cnt] = val; // 直接读取到最后位置，赋值。O(1)
    (pArr->cnt)++;
    return true;
}
 
void sort(struct Arr * pArr) {
    int i, j, t;
    // 简单的冒泡排序法实现，后面的章节会单独讲排序算法 
    for(i=0; i<pArr->cnt; ++i) {
        for(j=i+1; j<pArr->cnt; ++j) {
            if(pArr->pBase[i] > pArr->pBase[j]) {
                t = pArr->pBase[i];
                pArr->pBase[i] = pArr->pBase[j];
                pArr->pBase[j] = t;
            }
        }
    }
}
 
void reverse(struct Arr * pArr) {
    int i = 0;
    int j = pArr->cnt-1;
    int t;
    // 当i<j时，置换i和j位置的元素 
    while(i < j) {
        t = pArr->pBase[i];
        pArr->pBase[i] = pArr->pBase[j];
        pArr->pBase[j] = t;
        ++i;
        --j;
    }
    return;
}
 
bool insert(struct Arr * pArr, int pos, int val) {
    int i;
    // 满了就算了 
    if(is_full(pArr)) {
        return false;
    }
    // 如果插入的位置不在数组有效范围内就算了 
    if(pos<1 || pos>pArr->cnt+1) {
        return false;
    }
    // 从插入位置开始后移各元素，将插入位置空出 
    for(i=pArr->cnt-1; i>=pos-1; --i) {
        pArr->pBase[i+1] = pArr->pBase[i];
    }
    // 给插入位置的元素赋值 
    pArr->pBase[pos-1] = val;
    //数组有效长度自增 
    (pArr->cnt)++;
    return true;
}
 
bool del(struct Arr * pArr, int pos, int * pVal) {
    int i;
    // 空就算了 
    if(is_empty(pArr)) {
        return false;
    }
    // 不在有效范围内就算了 
    if (pos<1 || pos>pArr->cnt) {
        return false;
    }
    // 存储被删除元素 
    *pVal = pArr->pBase[pos-1];
    // 从删除位置开始，前移各元素，将删除位置堵死 
    for (i=pos; i<pArr->cnt; ++i) {
        pArr->pBase[i-1] = pArr->pBase[i];
    }
    // 数组有效长度自减 
    pArr->cnt--;
    return true;
}
```

## v8数组源码

js数组操作，底层已经做了非常多的优化操作，比如根据数组数据量不同，选择不同的算法来处理。但这里还是在js高级语言层面，没有涉及到内存相关的申请以及扩容，这部分代码其实在v8中，使用c++语言，使得执行速度更快。详细可看[从Chrome源码看JS Array的实现](https://zhuanlan.zhihu.com/p/26388217c)

> v8早期使用js语言书写数组相关的操作，后面为了进一步提高效率，许多方法都改为c++了。[github v8 c++ array](https://github.com/v8/v8/blob/master/src/builtins/array-reverse.tq)

``` js
// v8源码里的实现，js最常用方法出处
// https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js

// push
function ArrayPush() {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.push");

  var array = TO_OBJECT(this);
  var n = TO_LENGTH(array.length);
  var m = arguments.length;

  // Subtract n from kMaxSafeInteger rather than testing m + n >
  // kMaxSafeInteger. n may already be kMaxSafeInteger. In that case adding
  // e.g., 1 would not be safe.
  if (m > kMaxSafeInteger - n) throw %make_type_error(kPushPastSafeLength, m, n);

  // 依次push参数
  for (var i = 0; i < m; i++) {
    array[i+n] = arguments[i];
  }

  var new_length = n + m;
  array.length = new_length; // 更改length
  return new_length; // 返回最新长度
}

// pop
function ArrayPop() {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.pop");

  var array = TO_OBJECT(this);
  var n = TO_LENGTH(array.length);
  if (n == 0) {
    array.length = n;
    return;
  }

  n--;
  var value = array[n];
  %DeleteProperty_Strict(array, n);
  array.length = n; // pop重新设置length即可
  return value; // 返回被pop的值
}
```

``` js
// shift
function ArrayShift() {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.shift");

  var array = TO_OBJECT(this);
  var len = TO_LENGTH(array.length);

  if (len === 0) {
    array.length = 0;
    return;
  }

  if (%object_is_sealed(array)) throw %make_type_error(kArrayFunctionsOnSealed);

  var first = array[0];

  // 是否是稀疏数组，根据数据源不同，择优选择算法
  if (UseSparseVariant(array, len, IS_ARRAY(array), len)) {
    SparseMove(array, 0, 1, len, 0);
  } else {
    SimpleMove(array, 0, 1, len, 0); // 简单移动
  }

  array.length = len - 1;

  return first;
}

function UseSparseVariant(array, length, is_array, touched) {
  // Only use the sparse variant on arrays that are likely to be sparse and the
  // number of elements touched in the operation is relatively small compared to
  // the overall size of the array.
  if (!is_array || length < 1000 || %HasComplexElements(array)) {
    return false;
  }
  if (!%_IsSmi(length)) {
    return true;
  }
  var elements_threshold = length >> 2;  // No more than 75% holes
  var estimated_elements = %EstimateNumberOfElements(array);
  return (estimated_elements < elements_threshold) &&
    (touched > estimated_elements * 4);
}

function SimpleMove(array, start_i, del_count, len, num_additional_args) {
  if (num_additional_args !== del_count) {
    // Move the existing elements after the elements to be deleted
    // to the right position in the resulting array.
    if (num_additional_args > del_count) {
      for (var i = len - del_count; i > start_i; i--) {
        var from_index = i + del_count - 1;
        var to_index = i + num_additional_args - 1;
        if (from_index in array) {
          array[to_index] = array[from_index];
        } else {
          delete array[to_index];
        }
      }
    } else {
      for (var i = start_i; i < len - del_count; i++) {
        var from_index = i + del_count;
        var to_index = i + num_additional_args;
        if (from_index in array) {
          array[to_index] = array[from_index];
        } else {
          delete array[to_index];
        }
      }
      for (var i = len; i > len - del_count + num_additional_args; i--) {
        delete array[i - 1];
      }
    }
  }
}
```

## Javascript实现链表

js原生数组已经很完善了，不仅支持动态扩容，还支持队列、栈等功能（这些都封装在语言底层v8中）。但js原生没有实现链表，以下我们可以模仿下。

``` js
function LinkedList() {
    // 链表节点数据结构
    let Node = function(element) {
        this.element = element
        this.next = null // 下个node的引用（在js语言中，类已经是引用类型了）
    }

    // head是入口，可以直到以后所有node
    this.head = null
    this.length = 0

    this.append = function(element) {
        let node = new Node(element)
        if (this.head === null) {
            this.head = node
            this.length++
            return
        }

        let currentNode = this.head
        // 线性查找，直到找到最后的node。算法复杂度：O(n)
        while(currentNode.next) {
            currentNode = currentNode.next
        }
        currentNode.next = node // 最后的节点.next 赋值为新增的node节点
        this.length++
    }
}

let list = new LinkedList()
list.append(10)
list.append(15)
```

## 集合/字典

* 集合：由一组无序且唯一的项组成（JS Set对象）。只能存value，类似数组[]。
    * Set实例方法：add(value)/remove(value)/has(value)/size()/values()
* 字典：存储的是键值对（JS Map对象）。可以存key和value，类似对象{}。
    * Map实例方法：set(key, value)/delete(key)/get(key)/has(value)/size/keys()/values()