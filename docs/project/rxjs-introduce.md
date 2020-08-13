# RxJS入门实践

在 RxJS 中用来解决异步事件管理的的基本概念是：

* Observable (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
* Observer (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
* Subscription (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
* Operators (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
* Subject (主体): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
* Schedulers (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或requestAnimationFrame 或其他 。

## 1. Observable

### 1.1 Observable 剖析

Observables 是使用 `Rx.Observable.create 或创建操作符创建的，并使用观察者来订阅它，然后执行它并发送 next / error / complete 通知给观察者`，而且执行可能会被清理。

``` js
var foo = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(() => {
    observer.next(300); // 异步执行
  }, 1000);
});

console.log('before');
foo.subscribe(function (x) {
  console.log(x);
});
console.log('after');
```

理解Observable设计模式：https://staltz.com/javascript-getter-setter-pyramid.html

```js
const oddNums = {
  subscribe: (observer) => {
    let x = 40;
    let clock = setInterval(() => {
      if (x <= 48) {
        observer.next(x);
        x += 2;
      } else {
        observer.complete();
        clearInterval(clock);
      }
    }, 1000);
  }
};

oddNums.subscribe({
  next: x => console.log(x),
  complete: () => console.log('done'),
});
```

### 1.2 执行 Observables

Observable.create(function subscribe(observer) {...}) 中...的代码表示 “Observable 执行”，`它是惰性运算，只有在每个观察者订阅后才会执行`。随着时间的推移，执行会以同步或异步的方式产生多个值。

Observable 执行可以传递三种类型的值：

* "Next" 通知： 发送一个值，比如数字、字符串、对象，等等。
* "Error" 通知： 发送一个 JavaScript 错误 或 异常。
* "Complete" 通知： 不再发送任何值。

``` js
var observable = Rx.Observable.create(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (err) {
    observer.error(err); // 如果捕获到异常会发送一个错误
  }
});
```

### 1.3 清理 Observable 执行

``` js
var observable = Rx.Observable.from([10, 20, 30]);
var subscription = observable.subscribe(x => console.log(x));
// 稍后：
subscription.unsubscribe();
```

### 1.4 源码解析

#### 1.4.1 Observable

``` js
export class Observable<T> implements Subscribable<T> {
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  static create: Function = <T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => {
    return new Observable<T>(subscribe);
  };
}
```

#### 1.4.2 [of操作符](https://github.com/ReactiveX/rxjs/blob/e0fcd6d0fcf0de897739806091fd9e4f8eadd02a/src/internal/observable/of.ts)

``` js
/**
* ## Examples
 *
 * Emit the values `10, 20, 30`
 *
 * ```ts
 * import { of } from 'rxjs';
 *
 * of(10, 20, 30)
 * .subscribe(
 *   next => console.log('next:', next),
 *   err => console.log('error:', err),
 *   () => console.log('the end'),
 * );
 *
 * // Outputs
 * // next: 10
 * // next: 20
 * // next: 30
 * // the end
 * ```
 **/

export function of<T>(...args: Array<T | SchedulerLike>): Observable<T> {
  let scheduler = args[args.length - 1] as SchedulerLike;
  if (isScheduler(scheduler)) {
    args.pop();
    return scheduleArray(args as T[], scheduler);
  } else {
    return fromArray(args as T[]); // 步骤1
  }
}

function fromArray<T>(input: ArrayLike<T>, scheduler?: SchedulerLike) {
  if (!scheduler) {
    return new Observable<T>(subscribeToArray(input)); // 步骤2
  } else {
    return scheduleArray(input, scheduler);
  }
}

const subscribeToArray = <T>(array: ArrayLike<T>) => (subscriber: Subscriber<T>) => {
  for (let i = 0, len = array.length; i < len && !subscriber.closed; i++) {
    subscriber.next(array[i]);
  }
  subscriber.complete();
};
```

所以of操作符等价于如下代码：

``` js
const of = (arr) => new Observable(function subscribe(observer) {
    arr.forEach(val => observer.next(val))
})
```

## 2. Subject

什么是 Subject？ - RxJS Subject 是一种特殊类型的 Observable，它允许将值多播给多个观察者，所以 Subject 是多播的，而普通的 Observables 是单播的(每个已订阅的观察者都拥有 Observable 的独立执行)。

> Subject 像是 Observable，但是可以多播给多个观察者。Subject 还像是 EventEmitters，维护着多个监听器的注册表。

* 每个 Subject 都是 Observable 
* 每个 Subject 都是观察者

``` js
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(1);
subject.next(2);
```

### 2.1 单播与多播

单播示例

```js
let observable = Rx.Observable.create(function subscribe(obsever) {
  observer.next(1)
  observer.next(2)
})
observable.subscribe(v => console.log(v))
observable.subscribe(v => console.log(v))

// 输出两份 1, 2
```

多播示例

```js
let observable = Rx.Observable.create(function subscribe(obsever) {
  observer.next(1)
  observer.next(2)
})
let subject = new Rx.Subject()
subject.subscribe(v => console.log(v))
subject.subscribe(v => console.log(v))
observable.subscribe(subject)

// 输出 1, 1; 2, 2;
```

### 2.2 源码解析

SubJect是典型的`依赖收集设计模式`

``` js
// 源码地址： https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts#L48
export class Subject<T> extends Observable<T> implements SubscriptionLike {
  observers: Observer<T>[] = [];

    // 收集依赖
    /** @deprecated This is an internal implementation detail, do not use. */
  _subscribe(subscriber: Subscriber<T>): Subscription {
    this.observers.push(subscriber);
    return new SubjectSubscription(this, subscriber);
  }

    // 执行
  next(value: T) {
    const { observers } = this;
    const len = observers.length;
    const copy = observers.slice();
    for (let i = 0; i < len; i++) {
    copy[i].next(value!);
    }
  }
}
```

## 3. Operators

尽管 RxJS 的根基是 Observable，但最有用的还是它的操作符。操作符是允许复杂的异步代码以声明式的方式进行轻松组合的基础代码单元。

操作符是 Observable 类型上的方法，比如 .map(...)、.filter(...)、.merge(...)，等等。当操作符被调用时，它们不会改变已经存在的 Observable 实例。相反，它们返回一个新的 Observable ，它的 subscription 逻辑基于第一个 Observable 。

> 操作符是函数，它基于当前的 Observable 创建一个新的 Observable。这是一个无副作用的操作：前面的 Observable 保持不变。

操作符本质上是一个纯函数 (pure function)，它接收一个 Observable 作为输入，并生成一个新的 Observable 作为输出。订阅输出 Observable 同样会订阅输入 Observable 。

``` js
/**
   * get 请求
   * @param url 请求路径
   * @param params 请求参数
   */
get<T = any>(url: string, params?: Record<string, any>): Observable<Response<T>> {
    url = this.normalizeUrl(url, params)

    return ajax.get(url).pipe(
      switchMap(HttpService.handleServerError),
      map(res => res.response),
      switchMap(HttpService.handleError)
    )
  }
```

## 4. Pipeable 操作符

从5.5版本开始我们提供了 “pipeable 操作符”，它们可以通过 rxjs/operators 来访问 (注意 "operators" 是复数)。相比较于通过在 rxjs/add/operator/* 中以“打补丁”的方式来获取需要用到的操作符，这是一种更好的方式。

v5.5 以前: 链式调用

```js
const source$ = Rx.Observable.range(0, 10);

source$
  .filter(x => x % 2 === 0)
  .map(x => x + x)
  .scan((acc, x) => acc + x, 0)
  .subscribe(x => console.log(x)
```

现在的方式：

``` js
import { range } from 'rxjs/observable/range';
import { map, filter, scan } from 'rxjs/operators';

const source$ = range(0, 10);

source$.pipe(
  filter(x => x % 2 === 0),
  map(x => x + x),
  scan((acc, x) => acc + x, 0)
)
.subscribe(x => console.log(x))
```

### 4.1 为什么需要 pipeable 操作符？

打补丁的操作符主要是为了链式调用，但它存在如下问题:

* 任何导入了补丁操作符的库都会导致该库的所有消费者的 Observable.prototype 增大，这会创建一种依赖上的盲区。如果此库移除了某个操作符的导入，这会在无形之中破坏其他所有人的使用。使用 pipeable 操作符的话，你必须在每个用到它们的页面中都导入你所需要用到的操作符。

* 通过打补丁的方式将操作符挂在原型上是无法通过像 rollup 或 webpack 这样的工具进行“摇树优化” ( tree-shakeable ) 。而 pipeable 操作符只是直接从模块中提取的函数而已。

* 对于在应用中导入的未使用过的操作符，任何类型的构建工具或 lint 规则都无法可靠地检测出它们。例如，比如你导入了 scan，但后来不再使用了，但它仍会被添加到打包后的文件中。使用 pipeable 操作符的话，如果你不再使用它的简化，lint 规则可以帮你检测到。

* 函数组合 ( functional composition )很棒。创建自定义操作符也变得非常简单，它们就像 rxjs 中的其他所有操作符一样。你不再需要扩展 Observable 或重写 lift 。

### 4.2 什么是 pipeable 操作符

Observable 中有一个内置的 pipe 方法 (`Observable.prototype.pipe`)，它可以用类似于之前的链式调用的方式来组合操作符

重命名的操作符：由于操作符要从 Observable 中独立出来，所以操作符的名称不能和 JavaScript 的关键字冲突。因此一些操作符的 pipeable 版本的名称做出了修改。这些操作符是:

* do -> tap
* catch -> catchError
* switch -> switchAll
* finally -> finalize

## 5. Rxjs API 参考

* [rxjs](https://github.com/ReactiveX/rxjs/blob/master/src/index.ts)
    * `Observable`
    * `Subject`
    * `Operator`: 对应rxjs/operators包
    * `of(value)`: 创建一个 Observable，它会依次发出由你提供的参数，最后发出完成通知。
    * `range()`: 创建一个 Observable ，它发出指定范围内的数字序列。
    * `forkJoin()`: Rx 版的 Promise.all()
    * `throwError()`:
    
* [rxjs/operators](https://github.com/ReactiveX/rxjs/blob/master/src/operators/index.ts)
    * `map((value, index) =>{})`:将给定的 project 函数应用于源 Observable 发出的每个值，并将结果值作为 Observable 发出。
    * `switchMap((value, index)=> {}): Observable`:将每个源值投射成 Observable，该 Observable 会合并到输出 Observable 中， 并且只发出最新投射的 Observable 中的值。
    * `filter()`: 通过只发送源 Observable 的中满足指定 predicate 函数的项来进行过滤。
    * `scan()`: `scan 操作符的工作原理与数组的 reduce 类似`,它需要一个暴露给回调函数当参数的初始值。每次回调函数运行后的`返回值会作为下次回调函数运行时的参数`。
    * `find/findIndex/first/last/forEach/reduce/groupBy/count`
    * `debounce/delay`
* rxjs/ajax
    * `.pipe()`
* [Observable实例](https://cn.rx.js.org/class/es6/Observable.js~Observable.html)
    * `.subscribe()`
    * `.pipe()`: Observable 中有一个内置的 pipe 方法 (`Observable.prototype.pipe`)，它可以用类似于之前的链式调用的方式来组合操作符

![](https://pic1.zhimg.com/v2-1bc126d4f7032e6b6ec5c57e1d1242ca_b.jpg)

![](https://pic4.zhimg.com/v2-e93be46f0198acdac8d91b125ca91684_b.jpg)

``` js
import {
    of, from, fromEvent, range, interval,
    Observable, Subject
} from 'rxjs';
import { map, filter, switchMap } from "rxjs/operators";

of(1, 2, 3).subscribe((val) => console.log(val))
console.log(from([2, 3, 4]))
console.log(fromEvent(document.querySelector('div'), 'click'))
range(1, 10)
    .pipe(
        filter(x => x % 2 === 1),
        map(x => x + x)
    )
    .subscribe(x => console.log(x))

// Observable.create静态方法 等同于 new Observable
Observable.create(observer => observer.next(1)).subscribe(val => console.log(val, 'Observable.create'))
new Observable(observer => observer.next(1)).subscribe(val => console.log(val, 'new Observable'))
```

> 1. 返回为Observable都有.pipe() 方法（pipe 是 Observable 的一部分）。 2. map()解决同步问题，switchMap可能里面有异步操作(返回值要是另外一个Observable)。

### 5.1 Operater API解释

* `timer – 定时器流`: 它有两个数字型的参数，第一个是首次等待时间，第二个是重复间隔时间。从图上可以看出，它实际上是个无尽流 —— 没有终止线。因此它会按照预定的规则往流中不断重复发出数据。要注意，虽然名字有相关性，但它不是 setTimeout 的等价物，`事实上它的行为更像是 setInterval`。

* `interval – 定时器流`: 它和 timer 唯一的差别是它只接受一个参数。事实上，`它就是一个语法糖，相当于 timer(1000, 1000)`，也就是说初始等待时间和间隔时间是一样的。

* `delay – 延迟`: `这才是真正的 setTimeout 的等价操作`。它接受一个毫秒数（图中是 20 毫秒），每当它从输入流中读取一个数据之后，会先等待 20 毫秒，然后再放到输出流中。

* `merge – 并联`: 两个流中的内容被合并到了一个流中。并联在什么情况下起作用呢？举个例子吧：有一个列表需要每隔 5 秒钟定时刷新一次，但是一旦用户按了搜索按钮，就必须立即刷新，而不能等待 5 秒间隔。这时候就可以用一个定时器流和一个自定义的用户操作流（subject）merge 在一起。这样，无论哪个流中出现了数据，都会进行刷新。

* `concat – 串联`: 两个流中的内容被按照顺序放进了输出流中。前面的流尚未结束时（注意竖线），后面的流就会一直等待。串联的适用场景就很容易想象了，比如我们需要先通过 Web API 进行登录，然后取学生名册。这两个操作就是异步且串联工作的。

> map operator原理，就是observer.next(map(value))

## 参考

* [RxJS 快速入门](https://zhuanlan.zhihu.com/p/53618435)
* https://cn.rx.js.org/manual/overview.html
* https://zhuanlan.zhihu.com/p/23331432
* https://www.zhihu.com/topic/20036245/hot
* https://hijiangtao.github.io/2020/01/13/RxJS-Introduction-and-Actions/