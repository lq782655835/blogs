# 函数式编程

以函数作为主要载体的编程方式，用函数去拆解、抽象一般的表达式。

* 语义更加清晰
* 可复用性更高
* 可维护性更好
* 作用域局限，副作用少

回到语言层面，JavaScript是一种动态类型语言，`函数也是类型的一种(当作对象类型)，所以可以把函数当作参数值进行传递`（这就是FP(functional programming)中常说的函数天生是“一等公民”）。而Java这种强类型面向对象语言，是无法把定义的函数/方法当作一个参数，传入到另外一个函数/方法中。两者的编程风格区别可以看以下案例：

``` js
// js函数式编程
// 函数作为参数值传入，使得逻辑更清晰并且无污染
[1, 2, 3]
    .filter(function(item) { return item !== 1})
    .map(funciton(item) { return item * 2 })
```

``` java
// java
// 定义的参数互相串行，复用性差
int[] arr = {1, 2, 3};
// filter
List<int> filterArr = new List<>();
for(int i = 0; i < arr.length; i++)
{
    if (arr[i] != 1)
    {
        filterArr.add(arr[i]);
    }
}
// map
int[] result = ...MapArray(filterArr)
```

## 常见的函数式编程模型
* 闭包（Closure）
* 高阶函数
    * map
    * filter
    * reduce
* 柯里化（Currying）
    * Currying 为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数
    * 使用场景
        * 参数复用
        * 延迟执行
    * 实现方式
        * bind语法糖 使得JSX可以绑定数据，同时延迟执行
        * 箭头函数 使得JSX延迟执行
        * 自定义curry函数
* 组合(Composing)/ 管道(Pipe)

## 参考文章
* [我眼中的 JavaScript 函数式编程](http://taobaofed.org/blog/2017/03/16/javascript-functional-programing/)

*  [JavaScript 柯里化，了解一下](https://juejin.im/post/5af13664f265da0ba266efcf)