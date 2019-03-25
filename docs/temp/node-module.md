# node 模块加载原理
      
## 总结
1. 通过沙箱方式，把实例module注入到环境变量中。
2. exports = module.exports = somethings。
a 是一个对象，b 是对 a 的引用，即 a 和 b 指向同一块内存。当对 b 作修改时，即 a 和 b 指向同一块内存地址的内容发生了改变；当 b 被覆盖时，b 指向了一块新的内存，a 还是指向原来的内存；

## 参考文章
* [require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)
* [module.exports vs exports in Node.js](https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js)
* [exports 和 module.exports 的区别](https://cnodejs.org/topic/5231a630101e574521e45ef8)