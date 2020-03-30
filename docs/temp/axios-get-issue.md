# 记录一个Axios GET request issue

在写项目过程中，遇到一个axios请求的问题，[GET request does not send data (JSON). ](https://github.com/axios/axios/issues/787)

config.params: 给请求带上参数，不管是get请求还是post请求。但通常用于get

config.data: 写入body中，所以该参数对post有效，而对get请求无效
``` js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    ...
    var request = new XMLHttpRequest();
    ...

    // buildURL,处理的关键
    // 每次请求都会对url进行处理
    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    request.onreadystatechange = function handleLoad() {}
}
```

``` js
module.exports = function buildURL(url, params, paramsSerializer) {
 ...
  var serializedParams;
  if (paramsSerializer) {
      // !important
      // 处理config.params
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};
```

## Axios Cancel 原理

根本还是`xhr.abort()`。

先看个使用案例：

``` js
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
axios.get('/get?name=xmz', {
    cancelToken : source.token
}).then((response)=>{
    console.log('response', response)
}).catch((error)=>{
    if(axios.isCancel(error)){
        console.log('取消请求传递的消息', error.message)
    }else{
        console.log('error', error)
    }
})
// 取消请求
source.cancel('取消请求传递这条消息');
```

### 源码解释

先看下最终abort代码（从结果调用到入口源码顺序讲解）

``` js
// 如果config有cancelToken
// 并且config.cancelToken.promise（source.cancel手动触发）执行了，则request.abort()
if(config.cancelToken){
    config.cancelToken.promise.then(function(cancel){
        request.abort();
        reject(cancel);
        request = null;
    })
}
// 发送请求
request.send(requestData);
```

说明source.cancel()是promise的入口
``` js
CancelToken.source = function(){
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c
    })
    return {
        token : token,
        cancel : cancel // 对外暴露的cancel
    }
}
```

``` js
// 这个cancel函数就是 上面函数中的cancel，也就是source.cancel；
function CancelToken (executor){
    // ...
    var resolvePromise;
    this.promise = new Promise(function(resolve){
        resolvePromise = resolve;
    })
    var token = this;

    // 以下的cancel就是对外暴露的cancel函数
    // 本质上还是resolve(token.reason),以触发then
    executor(function cancel(message){
        if(token.reason){
            return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    })
}
```