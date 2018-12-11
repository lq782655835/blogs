# AI前端Vue规范

### 文件命名

统一小写，多个单词作为文件名使用分隔符`-`

``` js
// bad
EntityList.vue
entityList.vue

// good
entity-list.vue
```

### 紧密耦合的组件命名

和父组件紧密耦合的子组件应该以父组件名作为前缀命名

``` js
// bad
components/
|- todo-list.vue
|- todo-item.vue
└─ todo-button.vue

// good
components/
|- todo-list.vue
|- todo-list-item.vue
└─ todo-list-item-button.vue
```

### 自闭合组件

在单文件组件中没有内容的组件应该是自闭合的

``` html
<!-- bad -->
<u-input></u-input>

<!-- good -->
<u-input />
```

### 指令缩写

用`:` 表示 `v-bind`: ，用`@`表示`v-on`

``` html
<!-- bad -->
<input v-bind:value="value" v-on:input="onInput">

<!-- good -->
<input :value="value" @input="onInput">
```

### 组件数据

组件的 data 必须是一个函数,并且建议在此不使用箭头函数

``` js
// bad
export default {
  data: () => ({
    foo: 'bar'
  })
}

// good
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}
```

### props命名

小驼峰命名。内容尽量详细，至少有默认值

``` js
// bad
greeting-text: String

// good
greetingText: { type: String, default: ''}
```

### 组件属性顺序和分行规则

顺序原则：重要属性放前面

顺序依据：依次`指令`->`props属性`-> `事件`->`dom属性(class有标记作用，除外)`

分行规则：放在一行，重要内容较多时，可放置2～3行

``` html
<!-- bad -->
<u-select
    class="select"
    size="s"
    @select="searchEntity($event, row)"
    @blur="searchEntity($event, row)"
    v-model="row.variableId"
    :list="variableList" />

<!-- good -->
<u-select v-model="row.variableId" :list="variableList" size="s"
    @select="searchEntity($event, row)" @blur="searchEntity($event, row)" class="select" />
```

### Vue API顺序

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

### Vue组件顶级标签顺序

顺序保持一致，且标签之间留有空行。template第一层级下四个空格，script和style第一层级都不加空格

```html
<template>
    <div></div>
</template>

<script>
export default {}
</script>

<style>
.app {}
</style>
```

### import引入顺序 `V1.1`

原则：同等类型的放一起，优先放mixins和components等UI资源。忌随意放置

``` js
// bad
import { getAllEntityList, getVariableGroup } from '@/server/api'
import { helpers } from 'vuelidate/lib/validators'
import { getRepeatLine } from '@/utils/common'
import { CloseModalMixin, InvalidCheckMixin } from '@/components/common/mixins'
import VSearchSelect from '@/components/variable/v-search-select'
import EModifyModal from '@/components/entity/e-modify-modal'
import { MODIFY_MODAL_TYPE } from '@/utils/config'
import { botIdLoc, custIdLoc } from '@/utils/locs'

// good
import { CloseModalMixin, InvalidCheckMixin } from '@/components/common/mixins'
import VSearchSelect from '@/components/variable/v-search-select'
import EModifyModal from '@/components/entity/e-modify-modal'
import { getAllEntityList, getVariableGroup } from '@/server/api'
import { helpers } from 'vuelidate/lib/validators'
import { MODIFY_MODAL_TYPE } from '@/utils/config'
import { getRepeatLine } from '@/utils/common'
import { botIdLoc, custIdLoc } from '@/utils/locs'
```

### Vue 复杂data加注释/分组 `V1.1`

data数据是连接View和Modal的基础，当ViewModal复杂时，建议进行注释并分组。另外，当data过于复杂时应考虑优化重构。

```js
// bad
data() {
    return {
        isOpenModal: false,
        list: [],
        groupList: [],
        searchParams: { groupId: '', searchParam: '', searchType: '' },
        pageParam: { currentPage: 1, pageSize: 50 },
        totalCount: 0,
        groupId: '',
        typeList: [],
        defaultType: 'paramName'
    }
}

// good
data() {
    return {
        variableList: [],
        groupList: [],
        typeList: [],

        /*
        * 查询参数
        * 组与组之间通过空行区分
        */
        searchParams: { groupId: '', searchParam: '', searchType: '', currentPage: 1, pageSize: 50 },
        totalCount: 0,
        defaultType: '',

        isOpenModal: false
    }
}
```

### 参考链接

[Vue官方风格指南](https://cn.vuejs.org/v2/style-guide/index.html)

[有赞风格指南](https://youzan.github.io/vant/#/zh-CN/style-guide)