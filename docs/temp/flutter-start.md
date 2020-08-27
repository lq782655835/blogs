# Flutter

## 特点

### 优点

* 跨平台（接近于原生的体验，更少的代码量，更低的成本）
* 上手快、技术门槛低（dart类似js）
* 中小App，对原生操作(比如摄像机应用、动画应用、视频应用、声音应用等等)使用少的，可以采用这种方式（适合轻量级）

> Flutter 与 RN、Weex、小程序最大的不同就是 Flutter 是一个跨平台解决方案，而非一个动态化解决方案。


## Hello World

``` js
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

// 该应用程序继承了 StatelessWidget，这将会使应用本身也成为一个widget。 在Flutter中，大多数东西都是widget，包括对齐(alignment)、填充(padding)和布局(layout)
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Material是一种标准的移动端和web端的视觉设计语言
    return new MaterialApp(
      title: 'Welcome to Flutter',
      // Scaffold 是 Material library 中提供的一个widget, 它提供了默认的导航栏、标题和包含主屏幕widget树的body属性。widget树可以很复杂。
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          child: new Text('Hello World'),
        ),
      ),
    );
  }
}
```

* 本示例创建一个Material APP。Material是一种标准的移动端和web端的视觉设计语言。 Flutter提供了一套丰富的Material widgets。

* main函数使用了(=>)符号, 这是Dart中单行函数或方法的简写。

* 该应用程序继承了 StatelessWidget，这将会使应用本身也成为一个widget。 在Flutter中，大多数东西都是widget，包括对齐(alignment)、填充(padding)和布局(layout)

* Scaffold 是 Material library 中提供的一个widget, 它提供了默认的导航栏、标题和包含主屏幕widget树的body属性。widget树可以很复杂。

* widget的主要工作是提供一个build()方法来描述如何根据其他较低级别的widget来显示自己。

* 本示例中的body的widget树中包含了一个Center widget, Center widget又包含一个 Text 子widget。 Center widget可以将其子widget树对其到屏幕中心。

## Stateless & Stateful widgets

* Stateless widgets 是不可变的, 这意味着它们的属性不能改变 - 所有的值都是最终的.

* Stateful widgets 持有的状态可能在widget生命周期中发生变化. 实现一个 stateful widget 至少需要两个类:
    1. 一个 StatefulWidget类。
    1. 一个 State类。 StatefulWidget类本身是不变的，但是 State类在widget生命周期中始终存在.

``` js
class RandomWords extends StatefulWidget {
  @override
  createState() => new RandomWordsState();
}

class RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    // 每一次热更新，单词都会变化
    // 如果是Stateless widgets则每次都是固定同样的单词
    final wordPair = new WordPair.random();
    return new Text(wordPair.asPascalCase);
  }
}

// 使用
body: new Center(
    //child: new Text(wordPair.asPascalCase),
    child: new RandomWords(),
)
```

## 参考

1. https://github.com/raunakhajela/Flutter-Tutorials
1. helloworld：https://github.com/iamshaunjp/flutter-beginners-tutorial/blob/lesson-15/ninja_id/lib/main.dart
2. stateful widget： https://github.com/iamshaunjp/flutter-beginners-tutorial/blob/lesson-30/world_time_app/lib/main.dart