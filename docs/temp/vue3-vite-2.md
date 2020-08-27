# vite

1. vite工具主要还是以koa为基础，所有请求通过koa拦截。（vite提供cli，里面有一系列中间件处理）
1. 把node_modules下的包（如：vue），改写为 ‘@module/vue’，然后使用koa拦截
1. 把.vue文件拆分为3个请求，跟vue-loader实现一致

## Vue3 API 语法说明

### watch和watchEffect区别

1. 2.x/3的watch，只能监听特定响应式对象，当对象值变化时，进行逻辑函数绑定。而watchEffect默认对响应式对象依赖收集（意味着不是懒加载）。`简单理解：可以把watchEffect当作是特殊的computed，作用一致而且不用return返回对象`（实际源码中的确两者底层都是effect实现）。
2. watch可以懒加载（值不变动不执行逻辑函数），而watchEffect初始化加载（因为这里就开始依赖收集了）
3. watch可以拿到preValue/currentValue，watchEffect只拿到currentValue

### ref和reactive实践

``` js
// ref
import { ref, onMounted, watchEffect, computed } from 'vue'
export default {
  // 1. 组件props依然需要定义
  props: {
    msg: String
  },
  setup(props) {
    let count = ref(0)
    // 2. 只要computed/watchEffect 里面有ref/reactive，即可被getter依赖收集
    let double = computed(() => {
      if (count.value > 3) {
        return 2 * count.value
      }
      return count.value
    })

    // 3. computed/watchEffect中可以做任何函数，而不一定只监听固定值
    watchEffect(() => {
      console.log(count.value)
    })

    // 4. 可以多次onMounted，其实就是this.
    onMounted(() => {
      console.log(props)
    })
    onMounted(() => {
      console.log('another')
    })
    return {
      count,
      double,
    }
  }
}
```

以上切换为reactive（传统vue2.x）写法时，return必须返回state，而不是解构的{...state},因为解构后就ui就无法再响应式。

``` js
// html模板中跟vue2.x的state一致，需要带上
// <button @click="state.count++">count is: {{ state.count }} / {{state.double}}</button>
import { ref, onMounted, watchEffect, computed, reactive } from 'vue'
export default {
  props: {
    msg: String
  },
  setup(props) {
    let state = reactive({
      count: 0,
      double: computed(() => {
        if (state.count > 3) {
          return 2 * state.count
        }
        return state.count
      })
    })

    watchEffect(() => {
      console.log(state.count)
    })
    
    return {
      state
      // ...state // 这种方式无法响应式
    }
  }
}
```

那如果就想解构导出，同时具有响应式改如何呢？答案是新的api工具： `toRefs(state)`

``` js
// 此时html模板代码中，可以省略一层state.xxx
// <button @click="count++">count is: {{ count }} / {{double}}</button>
import { toRefs } from 'vue'
setup() {
    // ...
    return {
        ...toRefs(state)
    }
}
```

### 生命周期钩子函数

只是把以前的`this.$once('hook:mounted', cb)`语法，改为 `onXXX` hooks函数而已

与 2.x 版本生命周期相对应的组合式 API
* ~~beforeCreate~~ -> 使用 setup()
* ~~created~~ -> 使用 setup()
* beforeMount -> onBeforeMount
* mounted -> onMounted
* beforeUpdate -> onBeforeUpdate
* updated -> onUpdated
* beforeDestroy -> onBeforeUnmount
* destroyed -> onUnmounted
* errorCaptured -> onErrorCaptured
