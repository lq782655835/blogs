# 推荐-200错误统一处理

对于接口层来说，后端经常定义的结构如下：

``` js
{
    code: [Number], // 状态码
    desc: [String], // 详细描述
    detail: [Array, Object] // 前端需要的数据
}
```

### bad

``` js
batchAddVariable({ globalParamList: validList })
    .then(res => {
        if (res === SERVER_ERROR_CODE.SUCCESS) { // !!!Bad: how many interface, how many judge 200
            this.close(true)
            this.$toast.show(res.detail.colletion) // !!!Bad: always get detail data
        } else { // !!!Bad: too much nest，reading difficulty
            this.$toast.show(res.desc)
            if (res === SERVER_ERROR_CODE.REPEAT) {
                ...
            }
        }
    })
```

### good

``` js
batchAddVariable({ globalParamList: validList })
    .then(data => {
        this.close(true)
        this.$toast.show(data.colletion)
    })
    .catch(res => {
        if (res === SERVER_ERROR_CODE.REPEAT) {
            ...
        }
    })
```

### 解决方案

http层axios拿到数据后进行统一处理

``` js
import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
    baseURL: rootURL, // api的base_url
    timeout: 15000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            config.headers['Content-Type'] = 'application/json'
            if (config.type === 'form') {
                config.headers['Content-Type'] = 'multipart/form-data'
            } else {
                // 序列化
                config.data = JSON.stringify(config.data)
            }
        }

        return config
    },
    error => {
        Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === SERVER_ERROR_CODE.SUCCESS) { // 统一处理
            return res.detail // 直接返回数据
        } else {
            Vue.prototype.$toast.show(res.desc) // 错误统一报出
            return Promise.reject(res)
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
```

到此基本就可以很优雅的写逻辑代码了。不过还有个点可以继续优化。通常情况，后台返回非200错误，只需要$toast提示结果就行，catch代码部分可以省略。类似如下：

``` js
batchAddVariable({ globalParamList: validList })
    .then(data =>  this.close(true))
    // .catch(() => {}) // 业务通常这里不需要写
```

多么简洁的代码，但Promise执行reject代码，浏览器会报`Uncaught (in promise)`错误。这是因为中断了Promise操作但又没有对其进行处理，故由此错误。只需要使用`unhandledrejection`全局处理即可。

``` js
// Promise Catch不报错
window.addEventListener('unhandledrejection', event => event.preventDefault())
```
