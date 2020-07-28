# WebAssembly 初探

## 1. 背景

### 问题

JavaScript设计时并没有考虑到计算密集型工作负载，无法满足一些场景的性能需求（计算机视觉、游戏动画、音视频编解码、数据加密等）
语法松散，开发大型项目困难

### 解决

微软的TypeScript加入静态检查改进松散的语法【性能没有提升】
谷歌的Dart为浏览器引入新的虚拟机直接运行Dart程序提升性能【无主流浏览器支持】
火狐的asm.js取JS的子集（静态类型，取消垃圾回收），JS引擎针对asm.js做性能优化【语法太简单、有很大限制，开发效率低】

2015年，各方同意围绕一种称为WebAssembly的新标准，以asm.js所采用的基本方法为基础，联合起来。
2017年，Mozilla宣布了它的最小可行的产品，年底所有主流浏览器都采用了它。
2019.12，WebAssembly工作组发布了三个W3C推荐的WebAssembly规范。

MDN上关于WebAssembly的解释是一种新的编码方式，可以在现代的网络浏览器中运行——它是一种低级的类汇编语言，具有紧凑的二进制格式，可以以接近原生的性能运行，并为诸如C/C++等语言提供一个编译目标，以便它们可以在Web上运行。它也被设计为可以与JavaScript共存，允许两者一起工作。

### 优势

* 可移植性。WebAssembly代码可用多种语言编写，并可以在多种操作系统和处理器类型上运行。目前能编译成WebAssembly字节码的高级语言有：WebAssemblyScript, c\c++, Java, Rust, Kotlin, Golang, TypeScript, Python...
* 安全。WebAssembly运行在一个沙箱化的执行环境中，浏览器厂商需要做的就是根据WebAssembly规范实现虚拟机。
* 高效。体积小、二进制格式，无需解释执行，其目标就是充分发挥硬件能力以达到原生执行效率。
* 应用实例
    * bilibili: 视频还在上传中，就可以自由选择AI推荐的封面。WebAssembly负责读取本地视频，生成图片；tensorflow.js负责加载AI训练过的model，读取图片并打分。
    * 腾讯企业邮箱：每次上传文件的时候需要对文件计算MD5/SHA，以便判断之前是不是上传过，为了实现秒传。原先纯JS写的，一个2G的文件扫描下来平均要30秒，改用WebAssembly之后，性能提升了两倍多。
    * SecurityWorker：WebAssembly在代码保护方面的落地
    * 多人合作编辑器 Figma
    * AutoCAD：在WebAssembly面世之后，AutoCAD得以利用编译器，将其沉淀了30多年的代码直接编译成WebAssembly，同时性能基于之前的普通Web应用得到了很大的提升。
    * Google Earth：支持各大浏览器的3D地图
    * 计算机视觉方面：基于web端的图像检测和跟踪，并将其移植到微信小程序端；基于web端的人脸关键点检测与跟踪
    ...

## 2. 快速上手

### 查看浏览器是否支持webassembly

```
chrome://flags/#enable-webassembly
```

``` js
WebAssembly.compile(new Uint8Array(`
  00 61 73 6d  01 00 00 00  01 0c 02 60  02 7f 7f 01
  7f 60 01 7f  01 7f 03 03  02 00 01 07  10 02 03 61
  64 64 00 00  06 73 71 75  61 72 65 00  01 0a 13 02
  08 00 20 00  20 01 6a 0f  0b 08 00 20  00 20 00 6c
  0f 0b`.trim().split(/[\s\r\n]+/g).map(str => parseInt(str, 16))
)).then(module => {
  const instance = new WebAssembly.Instance(module)
  const { add, square } = instance.exports

  console.log('2 + 4 =', add(2, 4))
  console.log('3^2 =', square(3))
  console.log('(2 + 5)^2 =', square(add(2 + 5)))
})
```

### 编译Emscripten工具

```
git clone https://github.com/emscripten-core/emsdk.git

cd emsdk

git pull

./emsdk install latest

./emsdk activate latest

# 将 Emscripten 的环境变量配置到当前的命令行窗口下
source ./emsdk_env.sh
```

### 编译并运行

``` c
// demo.c
#include <stdio.h>

int main(int argc, char ** argv) {
    printf("Hello World\n");
}
```
```
# -s WASM=1 输出wasm，不设置Emscripten将输出asm.js
# 生成demo.wasm二进制wasm模块代码，demo.js胶水代码，demo.html加载、编译、实例化wasm代码，并在浏览器中展示输出
emcc demo.c -s WASM=1 -o demo.html

# 创建一个http 协议的web server来展示编译后的文件
emrun --no_browser --port 8080 .
```

在JavaScript中使用WebAssembly
未来可以用\<script type='module'>或者import来引入。

* WebAssembly.compile可以用来编译wasm的二进制源码，返回一个promise;
* WebAssembly.Instance将模块对象转化成WebAssembly实例；
* WebAssembly.Instance.exports可以拿到wasm代码输出的接口；

## 3. add案例

### C代码

``` c
// math.c
int add (int x, int y) {
  return x + y;
}

int square (int x) {
  return x * x;
}
```

编译为wasm

```
emcc math.c -Os -s WASM=1 -s SIDE_MODULE=1 -o math.wasm
```

### js引入

``` js
  /**
   * @param {String} path wasm 文件路径
   * @param {Object} imports 传递到 wasm 代码中的变量
   */
  function loadWebAssembly (path, imports = {}) {
    // 使用fetch获取WebAssembly模块
    return fetch(path)
      .then(response => response.arrayBuffer())
      .then(buffer => WebAssembly.compile(buffer))
      .then(module => {
        imports.env = imports.env || {}
    
        // 开辟内存空间
        imports.env.memoryBase = imports.env.memoryBase || 0
        if (!imports.env.memory) {
            imports.env.memory = new WebAssembly.Memory({ initial: 256 })
        }
    
        // 创建变量映射表
        imports.env.tableBase = imports.env.tableBase || 0
        if (!imports.env.table) {
            // 在 MVP 版本中 element 只能是 "anyfunc"
            imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
        }
    
        // 创建 WebAssembly 实例
        return new WebAssembly.Instance(module, imports)
      })
      .then(result =>result.exports);
}
loadWebAssembly("math.wasm")
  .then(instance => {
    let add =instance.add
    console.log('110 + 4 =', add(110, 4))
  })
```

引入优秀的模块库
* opencv（浏览器人脸识别demo）
* ffmpeg
* ...

## 其他

浏览器自带关于WebAssembly的 Web API：

![image](https://user-images.githubusercontent.com/6310131/88624244-368e5680-d0d9-11ea-97b1-ec6833ffd2cd.png)

## github参考

* https://github.com/Hanks10100/wasm-examples
* https://github.com/reklatsmasters/webassembly-examples