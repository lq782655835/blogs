# Array API与V8源码解析

在阅读[You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)源码时，发现很多关于array数组方法的技巧，由此了解之前对array数组方法有很多细节点没有深入应用。故重新翻开[V8 array源码](https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js)，记录下一些array高级API以及其源码。

## array.reduce(callback[, initialValue])
对每项执行reducer函数，返回迭代结果。
* callback(accumulator, currentValue, currentIndex, array)
* initialValue
    * 如果有设置，则作为初始值循环
    * 如果没有设置，则使用array第一项作为初始值

``` js
// 无初始值
[1, 2, 3].reduce((pre, cur, index) => {
    l(pre,cur)
    return pre + cur
})
// first loop: 1 2
// second loop: 3 3

// 有初始值
[1, 2, 3].reduce((pre, cur, index) => {
    l(pre,cur)
    return pre + cur
}, 0)
// first loop: 0 1
// second loop: 1 2
// third loop: 3 3
```

源码在[1223行](https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js#L1223)
``` js
function ArrayReduce(callback, current) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.reduce");

  // Pull out the length so that modifications to the length in the
  // loop will not affect the looping and side effects are visible.
  var array = TO_OBJECT(this);
  var length = TO_LENGTH(array.length);
  return InnerArrayReduce(callback, current, array, length,
                          arguments.length);
}

function InnerArrayReduce(callback, current, array, length, argumentsLength) {
  if (!IS_CALLABLE(callback)) {
    throw %make_type_error(kCalledNonCallable, callback);
  }

  var i = 0;
  // 当只有callback参数时，设置current为第一个参数
  find_initial: if (argumentsLength < 2) {
    for (; i < length; i++) {
      if (i in array) {
        current = array[i++]; // 修改current值
        break find_initial;
      }
    }
    throw %make_type_error(kReduceNoInitial);
  }

  // callback迭代
  for (; i < length; i++) {
    if (i in array) {
      var element = array[i];
      // 每次return返回的值作为current值
      current = callback(current, element, i, array);
    }
  }
  return current;
}

```

## array.slice([begin[, end]])
复制数组。返回数组从下标begin到end（不包含end）的新数组，**原数组不变**。
* begin
    * 如果begin省略，则从0开始
    * 如果begin超过数组长度，则直接返回[]空数组
    * begin为负数，一般等同于begin+arr.length。如果读String.prototype.slice源码，也是这种处理。
* end
    * 如果end省略，则为arr.length
    * 如果end超过数组长度，则为arr.length
    * end为负数，一般等同于end+arr.length
``` js
// base
var arr = [1, 2, 3, 4, 5]

console.log(arr.slice()) // [1, 2, 3, 4, 5]
console.log(arr.slice(2)) // [3, 4, 5]
console.log(arr.slice(-2, 4)) // [4] 等于 arr.slice(-2+5, 4)
console.log(arr.slice(-2)) // [4, 5] 等于 arr.slice(-2+5, +5)
```

V8源码在[587行](https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js#L587):
``` js
function ArraySlice(start, end) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.slice");

  var array = TO_OBJECT(this);
  var len = TO_LENGTH(array.length);
  var start_i = TO_INTEGER(start); // 默认是0
  var end_i = len; // 默认是array.length

// 定义end则赋值
  if (!IS_UNDEFINED(end)) end_i = TO_INTEGER(end);

// 处理start为负数或大于数组长度处理
  if (start_i < 0) {
    start_i += len;
    if (start_i < 0) start_i = 0;
  } else {
    if (start_i > len) start_i = len;
  }

// 处理end为负数或大于数组长度
  if (end_i < 0) {
    end_i += len;
    if (end_i < 0) end_i = 0;
  } else {
    if (end_i > len) end_i = len;
  }

// 创建指定长度的array数组
  var result = ArraySpeciesCreate(array, MaxSimple(end_i - start_i, 0));

// start超过end，直接返回[]
  if (end_i < start_i) return result;

  if (UseSparseVariant(array, len, IS_ARRAY(array), end_i - start_i)) {
    // 应对array的变种时，进行处理
    %NormalizeElements(array);
    if (IS_ARRAY(result)) %NormalizeElements(result);
    SparseSlice(array, start_i, end_i - start_i, len, result);
  } else {
    SimpleSlice(array, start_i, end_i - start_i, len, result);
  }

  result.length = end_i - start_i;

  return result;
}
```

以上源码也给我们解释了[].slice.call(object)返回对应数组。
``` js
let arrayLike = {
　'0':'a',
　'1':'b',
　'2':'c',
　length: 3 // 长度不符合则超出的长度对象都是undefined
}
console.log([].slice.call(arrayLike)) //[a,b,c]
```

## array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
增加/删除数组。通过add/remove改变最终数组
* start
    * 当大于数组长度时，则认为是array.length
* deleteCount
    * 当这个值省略或者大于array.length - start时，start后面的都会删除

``` js
var arr = [1, 2, 3, 4, 5]

// splice会改变原数组，以下注视都是单独console.log
arr.splice(1, 0, 10); // [ 1, 10, 2, 3, 4, 5 ]
arr.splice(1, 1, 10); // [ 1, 10, 3, 4, 5 ]
arr.splice(100, 1, 10); // [ 1, 2, 3, 4, 5, 10 ]
arr.splice(1) // [ 1 ]
arr.splice(1, 100) // [ 1 ]
arr.splice(1, 100, ['new1', 'new2']) // [ 1, [ 'new1', 'new2' ] ]
arr.splice(1, 100, 'new1', 'new2') // [ 1, 'new1', 'new2' ]
```

``` js
function ArraySplice(start, delete_count) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.splice");

  var num_arguments = arguments.length;
  var array = TO_OBJECT(this);
  var len = TO_LENGTH(array.length);
  // start处理，超过长度取array.length
  var start_i = ComputeSpliceStartIndex(TO_INTEGER(start), len);
  // deleteCount处理
  var del_count = ComputeSpliceDeleteCount(delete_count, num_arguments, len,
                                           start_i);
  var deleted_elements = ArraySpeciesCreate(array, del_count);
  deleted_elements.length = del_count;
  var num_elements_to_add = num_arguments > 2 ? num_arguments - 2 : 0;

  if (del_count != num_elements_to_add && %object_is_sealed(array)) {
    throw %make_type_error(kArrayFunctionsOnSealed);
  } else if (del_count > 0 && %object_is_frozen(array)) {
    throw %make_type_error(kArrayFunctionsOnFrozen);
  }

  var changed_elements = del_count;
  if (num_elements_to_add != del_count) {
    // If the slice needs to do a actually move elements after the insertion
    // point, then include those in the estimate of changed elements.
    changed_elements += len - start_i - del_count;
  }

  // 删除先slice，再move
  if (UseSparseVariant(array, len, IS_ARRAY(array), changed_elements)) {
    %NormalizeElements(array);
    if (IS_ARRAY(deleted_elements)) %NormalizeElements(deleted_elements);
    SparseSlice(array, start_i, del_count, len, deleted_elements);
    SparseMove(array, start_i, del_count, len, num_elements_to_add);
  } else {
    SimpleSlice(array, start_i, del_count, len, deleted_elements);
    SimpleMove(array, start_i, del_count, len, num_elements_to_add);
  }

  // 如果有第三、四...数据，从start处开始插入数据
  // Insert the arguments into the resulting array in
  // place of the deleted elements.
  var i = start_i;
  var arguments_index = 2;
  var arguments_length = arguments.length;
  while (arguments_index < arguments_length) {
    array[i++] = arguments[arguments_index++];
  }
  array.length = len - del_count + num_elements_to_add;

  // Return the deleted elements.
  return deleted_elements;
}
```