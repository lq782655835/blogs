# Axios用法与原理

axios是一个非常小巧而好用的http请求库，支持promise以及同时支持浏览器和node端。axios使用简单，配置灵活，也是vue官方推荐的请求库。另外[axios源码](https://github.com/axios/axios)层次清晰明了，非常适合阅读。

## 特性

* 从浏览器中创建 XMLHttpRequest
* 从 node.js 发出 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求和响应数据
* 取消请求
* 自动转换JSON数据
* 客户端支持防止 CSRF/XSRF

## API

* 全局
    * `axios.request(config)` 最终http请求都是执行这个方法
    * `axios(config)` 和axios.request()等价
    * `axios(url[, config])` axios(config)快捷方式
    * `axios.[METHODS](url, config)` axios(config)快捷方式
* 自定义实例
    * `axios.create(config)` 自定义配置，创建实例instance。调用方式和axios方法一致
* 拦截器
    * `axios.interceptors.request.use`
    * `axios.interceptors.response.use`

``` js
// 以下实例等价
// 全局调用
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  field: 123
}) // axios(config)
axios('http://bit.ly/2mTM3nY', {field: 123}) // axios(url[, config])
axios.get('http://bit.ly/2mTM3nY', {field: 123}) // axios.[METHODS](url, config)

// 自定义实例调用
const instance = axios.create({
  baseURL: 'http://bit.ly'
});
instance({
  method:'get',
  url:'2mTM3nY',
  field: 123
}) // instance(config)
instance.get('2mTM3nY', {field: 123}) // instance.[METHODS](url, config)
```

>配置优先级：lib / defaults.js中的库默认值 -->实例的config属性--> 请求的config参数

## 为何axios有如此多使用方式

重点是`createInstance`方法，该方法拿到一个Function，该Function指向请求入口Axios.prototype.request，并且该Function还继承了Axios.prototype的每个方法，并且上下文指向同一个对象context。axios包默认导出是该Function，而自定义实例axios.create是一个工厂模式，最终都调用createInstance方法。

源码在lib/default.js中：

``` js
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  // instance指向了request方法，且上下文指向context
  // instance(config) = Axios.prototype.request(config)
  var instance = bind(Axios.prototype.request, context);

  // 把Axios.prototype上的方法扩展到instance对象上
  // 这样 instance 就有了 get、post、put等METHOD方法
  // 同时指定上下文为context，这样执行Axios原型链上的方法时，this会指向context
  utils.extend(instance, Axios.prototype, context);

  // 把context对象上的自身属性和方法扩展到instance上
  utils.extend(instance, context);

  return instance;
}

// 导出时就创建一个默认实例，所以可以通过axios(config)发出请求
var axios = createInstance(defaults);
axios.Axios = Axios;

// 工厂模式创建axios实例，其实最终都是调用createInstance方法。
// 所以实例调用方式和全局axios调用方式相同。instance(config) = axios(config)
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
module.exports = axios;
module.exports.default = axios; // 允许在ts中导入
```

## 整体流程

**请求流程实质上无非就是输入和输出，输入request config配置（如url、method、data等），输出最终的response data数据**。中间涉及到较多的数据预处理，如根据data数据类型（如JSON），设置Content-Type: json头信息；再如根据响应的数据类型，默认转换为json格式。这些预处理需要axios库自动完成，同时也要暴露出相关配置给开发者，以此实现开发者自定义预处理。

Axios通过拦截者（Interceptors）来实现上面说的数据预处理，具体通过使用chain链式来逐一插入处理逻辑。默认情况下，先拿到此次请求的config配置，把config作为参数，传递到`dispatchRequest`方法中，该方法会根据当前环境（Browser/Node）来调用不同的adapter发送请求，以此获得最终的response data。同时Axios还允许使用request/response Interceptors进行请求前和响应后的自定义处理，其实质是将预处理函数，插入chain数组中，再统一按照顺序逐步执行预处理方法（Promise保证顺序）。

Axios类是核心内容，该类request方法是所有请求的开始入口。源码在lib/core/Axios.js：

``` js
Axios.prototype.request = function request(config) {
  // 1. 允许 axios('url'[, config]) = axios(config)
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  // 配置文件合并策略优先级
  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // 2. 定义拦截器中间件钩子
  // dispatchRequest是真正开始下发请求，执行config中设置的adapter方法
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  // 添加请求前钩子
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 添加请求后钩子
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // 3. chain链关键代码，promise链路传递下去
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// 提供对request方法的METHOD快捷方式，实质都是调用Axios.prototype.request方法
// axios.get(url, config) = axios(config)
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
```

## 智能的默认设置和扩展

* 根据环境自动设置请求的adapter，同时支持自定义
* 自动根据请求data数据类型，设置headers。比如Content-Type自动设置
* 自动根据响应data数据类型，转为json
* 支持自定义转换请求和响应数据

源码在lib/default.js中

``` js
var defaults = {
  // 根据环境选择默认的请求方式。支持node和浏览器，也可以自定义adapter
  adapter: getDefaultAdapter(),
  // 请求转换
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) { // 对象数据时，自动设置Content-Type为json格式。
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],
  // 响应转换
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
```

## 总结

请求从用户调用看，只是设置好config配置，剩下的具体底层调用应该交给专业库去做。axios库就是其中佼佼者，它较好的封装了http请求流程，支持多种形式config merge，通过抽象adapter层（通过是否有XMLHttpRequest对象来判断），来兼容浏览器以及Node环境。通过chain链式方式，不仅预处理请求/响应数据，同时支持用户自定义拦截处理（Interceptors），以此实现用户简约调用。
