# Connect源码解析

connect和express出自同一作者TJ Holowaychuk。从依赖性看，express基于connect；但从2个项目的git提交历史来看，实际上先有express项目（2009-6-27），2010-5-27 前后connect从express项目分化出来（express 0.12.0）。所以两者有相同的中间件机制，不同的是express拥有子路由、view模板等web应用框架内容。

## Connect Usage

``` js
var connect = require('connect');
var app = connect();

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// respond to all requests
app.use(function(req, res){
  res.end('Hello from Connect!\n');
});

//create node.js http server and listen on port
app.listen(3000);
```

## 源码解析

源码非常简单，尾递归调用。next 方法不断的取出stack中的“中间件”函数进行调用，同时把next 本身传递给“中间件”作为第三个参数，每个中间件约定的固定形式为 (req, res, next) => {}, 这样每个“中间件“函数中只要调用 next 方法即可传递调用下一个中间件。

之所以说是”尾递归“是因为递归函数的最后一条语句是调用函数本身，所以每一个中间件的最后一条语句需要是next()才能形成”尾递归“，否则就是普通递归，”尾递归“相对于普通”递归“的好处在于节省内存空间，不会形成深度嵌套的函数调用栈。[尾调用优化](http://www.ruanyifeng.com/blog/2015/04/tail-call.html)

增加中间件：
``` js
module.exports = createServer;

function createServer() {
  function app(req, res, next){
      app.handle(req, res, next); // 执行中间件
    }
  merge(app, proto);
  merge(app, EventEmitter.prototype);
  app.route = '/';
  app.stack = [];
  return app;
}

// 增加中间件
proto.use = function use(route, fn) {
  var handle = fn;
  var path = route;

  // 核心就这一句，往数组中增加一项
  this.stack.push({ route: path, handle: handle });
  return this;
};
```

处理中间件：
``` js
proto.handle = function handle(req, res, out) {
  var index = 0;
  var protohost = getProtohost(req.url) || '';
  var removed = '';
  var slashAdded = false;
  var stack = this.stack;

  // final function handler
  var done = out || finalhandler(req, res, {
    env: env,
    onerror: logerror
  });

  // store the original URL
  req.originalUrl = req.originalUrl || req.url;

  function next(err) {
    if (slashAdded) {
      req.url = req.url.substr(1);
      slashAdded = false;
    }

    if (removed.length !== 0) {
      req.url = protohost + removed + req.url.substr(protohost.length);
      removed = '';
    }

     // 遍历stack，拿到下一个layer
    var layer = stack[index++];

    // all done
    if (!layer) {
      defer(done, err);
      return;
    }

    // route data
    var path = parseUrl(req).pathname || '/';
    var route = layer.route;

    // 错误处理
    // skip this layer if the route doesn't match
    if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
      return next(err);
    }
    // skip if route match does not border "/", ".", or end
    var c = path.length > route.length && path[route.length];
    if (c && c !== '/' && c !== '.') {
      return next(err);
    }

    // trim off the part of the url that matches the route
    if (route.length !== 0 && route !== '/') {
      removed = route;
      req.url = protohost + req.url.substr(protohost.length + removed.length);

      // ensure leading slash
      if (!protohost && req.url[0] !== '/') {
        req.url = '/' + req.url;
        slashAdded = true;
      }
    }

    // 匹配到layer，执行handle函数
    call(layer.handle, route, err, req, res, next);
  }

  next(); // 开始next
};

function call(handle, route, err, req, res, next) {
  var arity = handle.length;
  var error = err;
  var hasError = Boolean(err);

  try {
    if (hasError && arity === 4) {
      handle(err, req, res, next); // 处理错误next
      return;
    } else if (!hasError && arity < 4) {
      // 执行handle函数。
      // next函数是其参数，如果要传递下一个，执行next函数
      handle(req, res, next);
      return;
    }
  } catch (e) {
    error = e;
  }

  // 继续next
  next(error);
}
```
