# 面试篇

### 简历
> 原则：证明自己过往经历适合该岗位。

1. 加公司logo
1. 工作经验按照Star法则，最好有数据支撑
1. 照片形象好，不是随意照+1
1. 排版整洁好看+1
1. 自我评价谈自己对工作的认知和看法

### 面试准备
1. 简历更新并打印
1. 自我介绍准备，向朋友叙述
1. 算法准备
1. 智能语音业务、算法/深度学习业务
    * 语音识别（产品范围无边界，较难），到语音交互（特定领域，语义理解较容易），通用场景到垂直场景。
    * 深度学习：除了算法外，还需要运算。多机多卡并行运算，以及解决不同节点的通信以及传输
1. 面试过程：STAR，（展示自信和尊重）

### 面试
> 原则：证明自己的工作能力适合这个岗位。

1. 回答问题时，依照STAR法则，即Situation背景，Task任务，Action行动，Result结果。

## 常问

* Promise：Promise解决了因只用回调的代码而备受困扰的控制反转问题。回调函数表达异步和并发有两个主要缺陷：缺乏顺序性和可信任性。 Promise封装了依赖时间的状态--等待底层值的完成或拒绝，所以Promise本身与时间无关。
* 闭包：一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。简单说，指有权访问另一个函数作用域中的变量的函数
* 原型链：
* this： this是指向当前上下文的一种标记，this在运行时绑定。
* express：
* 经典
    * 输入url后的步骤 --> 衍生：1. 重绘和回流 2. 常用优化策略
    * commonjs和es6 module区别
    * js事件循环
    * 跨域方式：跨域资源共享(Cross-origin resource sharing) 

### 面试题
* vue3 proxy
    * [Symbol.toStringTag](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)
    * 如何判断一个值是proxy （weakMap？）
* vue3最新特性
    * 关注[vue rfcs](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0004-global-api-treeshaking.md)可知，目前已经确定的提案有4个，分别是v-slot新语法、v-slot的简写、模板动态参数以及vue全局api应用treeshaking方式。除此之外，在issue中也有非常多的正在讨论的题案，最重要的就是已经确定的基于函数式的组件，即Function-based Component API，表现形式是组件只有template以及setup方法，以前的data（vue3中是value）、computed，watch等参数都包裹在Vue下。其灵感来自React Hooks，使得组件更加纯粹以及更易测试。其他还有比如state、value、computed、watch、observer等底层能力开放，提供给开发者。
* react和vue的异同
    * 相同： 都是数据驱动视图，都使用了虚拟dom，中间都有维护了一层virtual Node作为承载层，每当数据改变时，vnode根据diff算法得到最小修改，最终更新到dom上。都推荐组件化以及单向数据流。
    * 不同：
        1. 核心思想不同，react目的是重新定义前端开发，而vue是降低开发者门槛。所以vue灵活易用，双向数据绑定，推崇template、单文件；react是函数式编程，推崇数据不可变，推崇JSX、all in js；
        1. 组件实现不同，源码层：vue2.0其实就是在vue模块下挂在了一些参数，对用户不透明；react就是数据就是视图，view = fn(data)，react内部维护了四大组件。所以vue使用tempalte、mixin，react使用jsx、HOC。
        1. 响应式原理不同，vue模板依赖自动收集，react基于状态机。当组件修改时，react是已该组件为根节点树进行更新（不管子节点是否有变化），所以react需要shouldUpdateComponent进行手动优化。
        1. diff算法不同，vue基于开源snabbdom库改造，diff比较是基于双向链表，变diff边更新dom；而react基于tree对比，先进行patch操作，比较出哪些需要更新、删除等，设置标志flag，最后统一处理。（个人认为vue diff算法更优，毕竟有后发优势）
        1. 事件机制不同，react模拟了浏览器事件，所有事件都冒泡到document对象上，属于合成事件；而vue直接使用浏览器标准事件，绑定事件则合理使用了snabbdom库的模块插件。
* virtual dom有什么优势？
    * dom天生就慢，js运行在v8引擎中，而渲染在浏览器内核中（渲染引擎中），这就意味着频繁操作dom时，性能不快。另外操作dom会引起回流和重绘，浏览器渲染也需要时间。
    * vdom主要从框架层面，帮助我们直接减少dom操作；同时可以使用函数式的方式进行UI编程；另外由于有了vdom，ui界面可以与逻辑分离，使得可以把UI渲染到DOM之外，比如reactnative
* v-diff真的比原生操作dom更快吗？
    * 不，基于框架的基础上才更快，框架给我们提供了屏蔽底层dom书写的方式，减少频繁的整更新dom同时，也使得数据驱动视图
* vue响应式原理
    * Observer监听data，Dep对象（观察者模式）收集模板与data依赖关系。当数据变化时，Dep通知Watcher去更新视图。
* 说说小程序原理
    * 小程序底层还是Hybrid技术，微信小程序基于双模型，即视图层以及逻辑层。
* node事件模型？
    * 宿主Libuv
    * ss
        1. timers: 执行setTimeout() 和 setInterval() 预先设定的回调函数。
        1. I/O callbacks: 大部分执行都是timers 阶段或是setImmediate() 预先设定的并且出现异常的回调函数事件。
        1. idle, prepare: nodejs 内部函数调用。
        1. poll: 搜寻I/O事件，nodejs进程在这个阶段会选择在该阶段适当的阻塞一段时间。
        1. check: setImmediate() 函数会在这个阶段执行。
        1. close callbacks: 执行一些诸如关闭事件的回调函数，如socket.on('close', ...) 。
* node自动启动多个进程- cluster模块？
    * Master节点和Worker节点
    * 节点间使用postmessage通信

* K8s
    * 打包优化
        1. Docker优化：使用stage、使用小的基础包
        2. Webpack使用HappyPack加速、使用DLLPlugin（vendor配置分割module）
* [Webpack DLLPlugin](https://www.jianshu.com/p/d6e0ab2fed25)实现原理
    1. 根据vendor作为entry，生成一份vendor文件，一份mainfest.json文件
    2. 将manifest的文件依赖，以external形式打包

### 回答提问
Why do you want to leave your current/last company?
1. 业务体量 2. 技术层面 3. 成长速度

提问：
尽量围绕你的岗位进行提问,这可以使得你更快得熟悉你的工作内容,也让面试官看到你对此岗位的兴趣和热情,重要的是这些问题对于面试官而言既可以简略回答,也可以详细的给你讲解,如果他很热情得跟你介绍此岗位相关的情况,说明你可能表现得不错,否则的话,你可能不在他的备选名单里,这个时候就需要你早做打算了.

* 您怎么平衡业务开发以及技术追求？
* 能说下您团队的工程师文化吗？
* 能说下目前您团队所面临的技术挑战？
* 您做过最复杂的技术？
* 您从这获得的最大收获是什么？
* 在这公司有什么独一无二的工作感受？
* 对于这份工作，您有什么期望？
* 你对这个职位理想人选的要求是什么?

### 常归回答

1. 为什么离职： 职业生涯瓶颈
1. 推荐简历生成网站：https://www.wondercv.com

[tech-interview-handbook](https://yangshun.github.io/tech-interview-handbook/questions-to-ask)
[面试官到底想看什么样的简历？](https://github.com/Advanced-Interview-Question/front-end-interview/blob/master/docs/guide/resume.md)



技术栈准备
JavaScript基础

JavaScript基础可以推荐《JavaScript权威指南》、《你不知道的JavaScript》通读一两遍，可以好的梳理所学知识，知识点包括
js类型、typeof、instanceof，类型转换
作用域与作用域链、变量提升
js原型链、new、继承方式
this指向、闭包、垃圾回收机制
事件队列、事件循环
DOM对象
事件委托、DOM事件模型
原生ajax
Html5+CSS3

html5新特性、语义化
浏览器渲染机制、重绘、重排
css盒子模型、flex、动画
css样式优先级
BFC
Vue

这里只列举MVVM框架中的vue
vue基础

vue生命周期、keep-alive
computed与watch
v-for中key的作用
vue组件的通信方式
指令
vue底层原理

双向绑定实现原理
v-model的实现
nextTick的实现
vnode的理解，compiler和patch的过程
new Vue后整个的流程
keep-alive的实现
vuex、vue-router实现原理
Http

http特性以及状态码
http的三次握手
http1.0、http1.1、http2.0的区别
http如何实现缓存
https的握手过程
输入url后http请求的完整过程
get与post请求区别
web安全

理解xss，csrf，ddos攻击原理以及避免方式
xss与csrf的区别
前端工程化

webpack配置，webpack4.0有哪些优化点
webpack如何实现代码分离
如何实现一个webpack loader
npm包是如何实现按需引入
从0到1配置工程
前端模块化，CMD、AMD、CommonJS、ESM
前端性能优化

前端性能优化的几种方式
如何做性能优化上报
如何实现一个错误监控系统
什么是同源策略
前后端如何通信
跨域通信的几种方式
算法

排序
