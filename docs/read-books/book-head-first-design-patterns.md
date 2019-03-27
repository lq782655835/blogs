# 《Head First Design Patterns》

这是一本十分经典的关于设计模式的书，以前阅读过这本书，这次重新阅读又增加了新的理解。书本中一些经典案例的讲解，联系到平时工作中的应用，对设计模式有了更加深入的思考。这里给出工作中总结的[常用JS设计模式](../js/js-design-pattern.md)

## 设计原则

1. 找出应用中可能需要变化之处，把它们独立出来，不要把和那些不变化的代码混合在一起

``` java
// bad
// 飞行技能和叫声不是每只鸭子都会的（比如橡皮鸭），所以不能放在鸭子Duck基类中
class Duck {
    // common
    eat();
    sleep();

    // special
    fly()
    quack()
}
```

2. 针对接口编程，而不是针对实现编程

``` java
Dog d = new Dog() // 针对实现编程
Animal d = new Dog() // 针对接口编程(Dog extend Animal)
```

3. 多用组合，少用继承

``` js
// bad
// 飞行和叫声是接口，需要每次都实现，不好
class RedHeadDuck extend Duck interfaces IFly, IQuack {

}

// good
class RedHeadDuck extend Duck {
    FlyBehavior fly;
    QuackBehavior quack;
}
```

## 设计模式
### 观察者模式
* 特点是一对多
* 需要有订阅关系（这样发布才通知的到）

### 迭代器模式
* 提供一种方法顺序访问一个聚合对象的各个元素，而又不暴露其内部的表示。
* 即不同的迭代方式换成统一的iterator.next()

### 组合模式
* 允许你将对象组合成树形结构来表现“整体/部分”层次结构。组合能让客户以一致的方式处理个别对象与组合对象。

### 模版方法
* 在一个方法中定义算法的骨架，而将一些步骤延迟到子类。
* 模板方法可以在不改变结构算法的基础上，重新定义算法中的某些步骤

### 命令模式
* 将“请求“封装成对象，以便使用不同的请求来参数化其他对象。
* eg：n种缓存方式 + 缓存管理类（管理类面向最终用户，但内部调用还是使用缓存）

``` js
// n种缓存方式
class LocalStorage extend ICache{}
class ObjectStorage extend ICache{}
...

// 管理类
class CacheManage {
    constructor(ICache cache){
        this.cache = cache
    }

    get() {
        return this.cache.get()
    }
}

```