# Webpack优化实践

1. 插件工具分析：`webpack-bundle-analyzer`,发现问题。
    * vue-cli3使用最新的webpack4打包，打包速度还不错。
    * webpack4有`mode: production`选项，会做一些默认的优化。比如代替CommonsChunkPlugin 插件的 `splitChunks`选项
2. 问题1: element-ui打包后巨大
    * 按照官网按需加载
2. 问题2: chunk文件太多，而且大部分是小文件。
    * 减少路由懒加载。路由的懒加载是个有用的功能，但不能滥用，因为每条路由import()加载，都会生成chunk文件，异步加载是需要时间的。所以我们修改为只在一级路由懒加载，一级路由下的二级、三级都是同步。