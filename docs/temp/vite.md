# vite

1. vite工具主要还是以koa为基础，所有请求通过koa拦截。（vite提供cli，里面有一系列）
1. 把node_modules下的包（如：vue），改写为 ‘@module/vue’，然后使用koa拦截
1. 把.vue文件拆分为3个请求，跟vue-loader实现一致