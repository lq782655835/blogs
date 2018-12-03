# 推荐-Vue实例选项顺序

> 在Vue中，export default对象中有很多约定的API Key。每个人的顺序排放都可能不一致，但保持统一的代码风格有助于团队成员多人协作。

Vue官网文档中也有推荐[顺序](https://cn.vuejs.org/v2/style-guide/index.html#%E7%BB%84%E4%BB%B6-%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%89%E9%A1%B9%E7%9A%84%E9%A1%BA%E5%BA%8F-%E6%8E%A8%E8%8D%90),文档中对选项顺序做了许多分类。但从工程项目角度思考，需要更加精简以及合理的排序。推荐如下规则进行排序：

1. Vue扩展: extends, mixins, components
1. Vue数据: props, model, data, computed, watch
1. Vue资源: filters, directives
1. Vue生命周期: created, mounted, destroy...
1. Vue方法: methods

以下推荐顺序，基于团队小伙伴@akimoto整理的顺序：

``` js
export default {
    name: '',
    /*1. Vue扩展 */
    extends: '', // extends和mixins都扩展逻辑，需要重点放前面
    mixins: [],   
    components: {},
    /* 2. Vue数据 */
    props: {},
    model: { prop: '', event: '' }, // model 会使用到 props
    data () {
        return {}
    },
    computed: {},
    watch:{}, // watch 监控的是 props 和 data，有必要时监控computed
    /* 3. Vue资源 */
    filters: {},
    directives: {},
    /* 4. Vue生命周期 */
    created () {},
    mounted () {},
    destroy () {},
    /* 5. Vue方法 */
    methods: {}, // all the methods should be put here in the last
}
```