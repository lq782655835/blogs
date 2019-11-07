# 微前端

微前端方式：
1. 通过nginx配置导航不同系统
    * 常见方式，缺点：每次都刷新页面
1. 通过iframe组合
    * 常见方式，缺点：应用间交互麻烦
1. 通过路由进行应用拆分
    * 目前较为主流的方式，需要一点架构改造，比如：统一依赖，各子应用如何互相隔离（包括数据流隔离、css样式隔离等）、部署改造
    * 缺点：需要统一技术栈，因为实质还是通过主路由+懒加载实现。
1. [single-spa](https://github.com/CanopyTax/single-spa)解决方案
    * 能跨技术栈，但目前阶段难用在生产阶段
1. webcomponents
    * 较好的方式，引入js/style进行隔离（ShadowDOM）
    * 缺点：1. 技术新，兼容性不好，改造现有应用难；2. 不成熟的生态，组件间的数据通信是大问题。

## 参考资料

* https://zhuanlan.zhihu.com/p/39102712
* https://tech.meituan.com/2018/09/06/fe-tiny-spa.html