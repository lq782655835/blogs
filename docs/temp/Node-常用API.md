# Node-常用API
总结NodeJS常用的API，重点地方有笔者的释义以及详细说明;关联度高的模块放一起叙述，并有对比说明。比如buffer与fs，stream与http，process与child_process。本文尽量做到兼具实用与API广度，建议多读读[Node JS官网文档](https://nodejs.org/dist/latest-v11.x/docs/api/)。

## [path](https://nodejs.org/dist/latest-v11.x/docs/api/path.html)

* `__filename`。全局值，当前文件绝对路径
* `__dirname`。全局值，当前文件夹绝对路径。等效于path.resolve(__filename, '..')
* `path.join([...paths])`。相当于把所传入的任意多的参数 按照顺序 进行命令行般的推进
    ``` js
    path.join('a','b','../c/lolo') // a/c/lolo
    ```
* `path.resolve([...paths])`。以当前文件的路径为起点，返回绝对路径。可以理解为每次都是新建cd命令
    ``` js
    path.resolve('/a', '/b') // '/b'
    path.resolve('./a', './b') // '/User/../a/b'
    ```
* `path.dirname(path(string))`。返回指定的路径 所在文件夹的绝对路径
* `path.basename(path(string))`。返回指定Path路径所在文件的名字
* `path.extname(path | string)`。获取指定字符串或者文件路径名字的后缀名，带.比如.txt

## [url]()

url 模块提供了两套 API 来处理 URL 字符串：一个是Node.js特有的API，是旧版本的遗留；另一个则是实现了WHATWG URL Standard的 API (const {URL} = require('url')方式)，该标准也在各种浏览器中被使用。

旧版url api，[新版URL Standard见这](http://nodejs.cn/api/url.html#url_the_whatwg_url_api)：

* `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`。把url字符串解析为url对象
* `url.format(urlObject)`。把url对象解析为字符串
* `url.resolve(from, to)`。以一种 Web 浏览器解析超链接的方式, 基于一个基础 URL,对目标 URL进行解析。查看其源码实现：
    ``` js
    Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
    };
    ```

## [querystring]()
* `querystring.parse`。一个URL查询字符串 str 解析成一个键值对的集合。
* `querystring.stringify`。遍历给定的 obj 对象的自身属性，生成 URL 查询字符串。

## [Stream]()

**Node中很多数据结构都继承自Stream**。node处理IO采用了流（stream）的封装，分为四类，可读流、可写流和基于前者的读写流、转换流。

以下对象继承了可读流：

* **HTTP responses, on the client**
* **HTTP requests, on the server**
* fs read streams
* zlib streams
* crypto streams
* TCP sockets
* child process stdout and stderr
* **process.stdin**

### **Stream类**

* `stream.Writable`
    * **write()** 写入数据到流
    * **end()** 表明已没有数据要被写入可写流
    * Events
        * pipe
        * finish
        * close
        * error
* `stream.Readable`
    * pipe(destination:stream.Writable, options) 把可读数据流入可写流中
    * resume() 能读到最后，但数据为空
    * Events
        * **data**
        * **end**
        * close
        * error
        * readable

## [http]()

* `http.Server`。http.createServer(function(req, res){})返回该类。
    * listen()
* `http.ClientRequest`。`Node作为客户端`。http.get()/http.request()返回该类。
    * `可写流`。详细参见上章节stream.Writable
    * write()。stream继承，请求写入数据，一般是POST请求需要。
    * end()。stream继承，请求发出。
    * `回调函数res是可读流`
* `http.ServerResponse`。`Node作为服务端`。服务端res即是该类的实例。
    * `可写流`
    * setHeader(name, value)
    * writeHead(statusCode[, statusMessage][, headers])
    * write(chunk[, encoding][, callback])
    * end([data][, encoding][, callback])

> http.get()与 http.request() 唯一的区别是它设置请求方法为 GET 且自动调用 req.end()

> 在node是客户端的时候，req是从node这边发起的，是可写流，res是从外边响应的，是可读流。

>在node是服务端的时候，req是从客户端发起的，是可读流，res是从node响应的，是可写流。

## [Buffer]()<sup>`global`</sup>
在 TCP 流或文件系统操作等场景中处理字节流。Buffer 类是一个全局变量。Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在创建时确定，且无法改变。

> Node.js v6.0.0 之前，Buffer 实例是通过 Buffer 构造函数创建的，它根据参数返回不同的 Buffer。为了使 Buffer 实例的创建更可靠，new Buffer() 构造函数已被废弃，建议使用 Buffer.from()、Buffer.alloc()和 Buffer.allocUnsafe()

* `创建Buffer`
    * new Buffer(number/string/array)<sup>`Deprecated`</sup>。推荐使用 Buffer.from(array/string) 和Buffer.alloc(size)代替。
    * **Buffer.from(array/string)**
    * Buffer.alloc(size)
* `Buffer静态方法`
    * Buffer.isBuffer(obj)
    * Buffer.byteLength(string)
    * Buffer.concat()
    * Buffer.compare()
* `Buffer实例`
    * length
    * toString() buffer转为string
    * **write(string, offset=0, length, encoding='utf8')**。对buffer对象写入string
    * copy()
    * slice()
    * compare()
    * equals()
    * fill()

    ``` js
    let buf = new Buffer('hello world') // 初始化之后,实例buf长度无法改变
    console.log(buf.length, buf.toString()) // 11, hello world

    buf.write('temp')
    console.log(buf.length, buf.toString()) // 11, tempo world

    buf.write('01234567891234567890')
    console.log(buf.length, buf.toString()) // 11, 01234567891
    ```

## [File System](https://nodejs.org/dist/latest-v11.x/docs/api/fs.html)

* `file文件操作`
    * **readFile(path[, options], callback)**
        * 没有指定 encoding，则返回原始的 buffer
    * **writeFile(file, data[, options], callback)**
        * 如果文件已存在，则覆盖文件。
        * data支持 string/Buffer/TypedArray/DataView
        * data 是一个 buffer，则忽略 encoding
    * copyFile(src, dest[, flags], callback)

    * rename(oldPath, newPath, callback)。文件重命名
    * write(fd, string[, positinon[, encoding]], callback)。将 string 写入到 fd 指定的文件写文件
    * exists(url, callback(boolean))<sup>`Deprecated`</sup>。查询是否存在，`一般用在单纯检查文件`而不去操作(open/readFile/writeFile等操作文件不成立时会回调err)文件时。推荐使用fs.stat() or fs.access() 代替该方法。
    * **stat(path[, options],callback(err, stat))**。查询文件/目录信息
        * stat.isFile 是否一个普通文件
        * stat.isDirectory 是否一个目录
        * stat.ctime 最后一次修改文件的时间
* `dir目录操作`
    * **readdir(path[, options], callback)**。读目录，获取目录下的`所有文件和文件夹`名称。
    * rmdir(path, callback)。移除目录
> 文件操作的path参数，绝对路径和相对路径都支持（相对路径基于process.cwd()）。

## [Process](https://nodejs.org/api/process.html)<sup>`global`</sup>

process对象是一个提供当前node进程信息的全局对象，所以该对象不需要require()引入。process同时也是[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)（典型的发布订阅模式案例）的一个实例，所以有.on()等方法。

* `process.argv`。一个包含命令行参数的数组。第一个元素是’node’，第二个元素是JavaScript文件的文件名。接下来的元素则是附加的命令行参数。

    ``` js
    // process.js
    process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
    });

    // output
    $ node process.js one two=three four
    0: node
    1: /Users/node/process.js
    2: one
    3: two=three
    4: four
    ```

* `process.env`。返回用户设置的环境变量。

    ``` js
    // index.js
    console.log(process.env.NODE_ENV) // production

    // output
    $ cross-env NODE_ENV=production node index
    production
    ```

* `process.cwd()`。返回当前进程的工作目录
    > 和 __dirname 不同, __dirname 返回的是当前文件的所在目录

* `process.exit()`。退出当前程序。
    >当执行exit()方法时，可以使用`process.on('exit', callback)`作为退出程序前的清理工作。

* `process signal Events`。当[标准POSIX信号](http://man7.org/linux/man-pages/man7/signal.7.html)被触发(通常是process.kill(signal)或Ctrl+C等操作)，nodejs进程可以通过监听对应信号来进行回调。
    * `SIGINT`：interrupt，程序终止信号，通常在用户按下CTRL+C时发出，用来通知前台进程终止进程。
    * `SIGTERM`：terminate，程序结束信号，通常用来要求程序自己正常退出。process.kill()缺省产生这个信号。

## [child_process](http://nodejs.cn/api/child_process.html)

子程序，在node中，child_process这个模块非常重要。熟悉shell脚本的同学，可以用它的异步特性完成很多事情。

异步`创建子程序`有四种方式，后三种底层都是spawn实现的:
* child_process.spawn(command[, args][, options])
* child_process.exec(command[, options][, callback])
* child_process.execFile(file[, args][, options][, callback])
* child_process.fork(modulePath[, args][, options])

### **child_process**

* `child_process.spawn`。Node.js 的父进程与衍生的子进程之间会建立 stdin、stdout 和 stderr 的管道。
    * `options.stdio`: stdio(标准输入输出) 用来配置子进程和父进程之间的 IO 通道,可以传递一个数组或者字符串。如，['pipe', 'pipe', 'pipe']，分别配置：标准输入、标准输出、标准错误。如果传递字符串，则三者将被配置成一样的值。简要介绍其中三个可以取的值：
        * `pipe（默认）`：父子进程间建立 pipe 通道，可以通过 stream 的方式来操作 IO
        * `inherit`：子进程直接使用父进程的 IO(该种情况使用较多,子进程命令中，执行的node文件里使用process对象与主文件中一致)
        * `ignore`：不建立 pipe 通道，不能 pipe、不能监听 data 事件、IO 全被忽略
``` js
const { spawn } = require('child_process');
var ls = spawn('ls', ['-al'],{
    stdio: 'inherit'
});

ls.stdout.on('data', function(data){
    console.log('data from child: ' + data);
});


ls.stderr.on('data', function(data){
    console.log('error from child: ' + data);
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});
```
* `child_process.exec`。创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。exec 比较适合用来执行 shell 命令，然后获取输出。
``` js
const { exec } = require('child_process');

exec('ls -al', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + typeof stderr);
});
```
* `events`。child_process支持以下事件：
    * `exit`。子进程退出。注意其和close的区别，当exit触发时，其stdio流有可能还打开着，可以在此时做一些清理工作。通常情况下，child_process.kill()会触发该事件。
    * `close`。当子进程关闭时。通常情况下，child_process.kill()也会触发该事件。
    * `error`。当子进程不能关闭时，关闭它会报error事件。调用kill()可能会触发该事件。
    * `message`。跟child_process.send方法有关,父子进程间通信。
    * `disconnect`。跟child_process.disconnect方法有关。

## 参考文章

* [Nodejs进阶：如何玩转子进程（child_process）](https://www.cnblogs.com/chyingp/p/node-learning-guide-child_process.html)
