# 记录一个axios issue

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