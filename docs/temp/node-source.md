# Node源码

V8 是 Google 的开源项目，由 C++ 编写，除了 Chrome 使用了 V8 之外，还有大名鼎鼎的 Nodejs!

V8 设计之初的目的是为了提升浏览器执行 JavaScript 代码的性能。为了获取速度，V8 并没有采用标准的解释器，而是通过把 JavaScript 代码编译成效率更高的机器码。
V8 和很多现代 JavaScript 引擎（比如：SpiderMonkey、Rhino）一样，通过 JIT 编译器把 JavaScript 代码编译成机器码。这里的主要区别就是 V8 不会产生任何的字节码或者中间代码。

V8主要工作就是：「把 JavaScript 直译成机器码，然后运行」。但这中间，往往是一个复杂的过程，它需要处理很多的难题，诸如：编译优化、内存管理、垃圾回收。[V8 javascript engine代码阅读](http://eternalsakura13.com/2018/07/09/zujian/)

[Node的源码目录](https://github.com/nodejs/node/blob/master/lib/path.js)
```
├── ...
├── deps
│   ├── ...
│   ├── v8
│   ├── ...
├── ...
├── lib
│   ├── ...
│   ├── buffer.js
│   ├── child_process.js
│   ├── console.js
│   ├── ...
├── node -> out/Release/node
├── ...
├── out
│   ├── ...
│   ├── Release
|         ├── node
|         ├── node.d
|         ├── obj
|             └── gen
|                 ├── ...
|                 ├── node_natives.h
|                 ├── ...
│   ├── ...
├── src
│   ├── ...
│   ├── debug-agent.cc
│   ├── debug-agent.h
│   ├── env-inl.h
│   ├── env.cc
│   ├── ...
├── 
...
```

/deps/v8：这里是V8源码所在文件夹，你会发现里面的目录结构跟V8源码十分相似。NodeJS除了移植V8源码，还在增添了一些内容。
> 基本由c++写成，常见数据结构和优化这里都会有体现。v8主要工作是编译优化、内存管理、垃圾回收，简单讲就是你给出js语法字符串，v8解释给机器，让机器跑起程序。

/src：由C/C++编写的核心模块所在文件夹，由C/C++编写的这部分模块被称为「Builtin Module」

`/lib`：由`JavaScript编写的核心模块所在文件夹`，这部分被称为「Native Code」，在编译Node源码的时候，会采用V8附带的js2c.py工具，把所有内置的JavaScript代码转换成C++里面的数组，生成out/Release/obj/gen/node_natives.h文件。有些 Native Module 需要借助于 Builtin Module 实现背后的功能。
> node内置的模块源码，基本都放在这里。

/out：该目录是Node源码编译(命令行运行make)后生成的目录，里面包含了Node的可执行文件。当在命令行中键入node xxx.js，实际就是运行了out/Release/node文件。

![img](http://huang-jerryc.com/image/blog/the-v8-what-javascripter-should-konw/85B39636DBC008CDB299B1BB6E45883B.png)

Node在启动的时候，就已经把 Native Module，Builtin Module 加载到内存里面了。后来的 JavaScript 代码，就需要通过 V8 进行动态编译解析运行。
> 最终都是加载进内存中。