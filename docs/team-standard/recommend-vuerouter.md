# 推荐-Vue-Router写法

使用路由懒加载，实现方式是结合Vue异步组件和Webpack代码分割功能。

优点：

* 减小包体积，提高加载速度
* 当页面>20个时，组件定义需要拉到编辑器顶部才知道具体路径

### bad

``` js
import IntentionList from '@/pages/intention/list'
import Variable from '@/pages/variable'
...

{
    path: '/intention/list',
    name: 'ilist',
    component: IntentionList
},
{
    path: '/variable',
    name: 'variable',
    component: Variable
}
```

### good

``` js
{
    path: '/intention/list',
    name: 'ilist',
    component: () => import('@/pages/intention/list')
},
{
    path: '/variable',
    name: 'variable',
    component: () => import('@/pages/variable')
}
```

> import语法需要Babel添加`syntax-dynamic-import`插件。最新当vue-cli 3.0中默认添加该特性，不需要额外引用。另外，合理控制异步模块的数量。
