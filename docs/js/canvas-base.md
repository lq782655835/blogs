# Canvas基础

canvas 看起来和 img 元素很相像，唯一的不同就是它并没有 src 和 alt 属性。实际上，canvas 标签只有两个属性—— width和height。

canvas 元素创造了一个固定大小的画布，canvas起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。你可以通过使用它的getContext() 方法来访问绘画上下文。

``` js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d'); // 画图基础
```

## 概念
### xy
栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。
![](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)

## 绘制形状

### 1. 绘制矩形

canvas只支持一种原生的图形绘制（马上显现在canvas上，即时生效）：矩形。所有其他的图形的绘制都至少需要生成一条路径。canvas提供了三种方法绘制矩形：

* `fillRect(x, y, width, height)`
绘制一个填充的矩形
* `strokeRect(x, y, width, height)`
绘制一个矩形的边框
* `clearRect(x, y, width, height)`
清除指定矩形区域，让清除部分完全透明。

> x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和height设置矩形的尺寸。

### 2. 绘制路径

路径绘制图形步骤：
* 首先，你需要创建路径起始点。
* 然后你使用画图命令去画出路径。
* 之后你把路径封闭。
* 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

函数
* `beginPath()`，路径的第一步。
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
* `closePath()`，不是必需的。
闭合路径。
* `stroke()`，没有闭合的形状不会自动闭合。
通过线条来绘制图形轮廓。
* `fill()`，没有闭合的形状都会自动闭合。
通过填充路径的内容区域生成实心的图形。

### 总结

1. 画矩形
    * fillRect
2. 画路径
    * 基础
        * beginPath()。常和moveTo（将笔触移动到指定的坐标x以及y上）搭配
        * closePath() 和开始路径形成闭合路径。
        * fill() 填充
        * stroke() 画线
    * 画图形
        * arc(x, y, radius, startAngle, endAngle, anticlockwise)
        * lineTo(x, y) 绘制直线

> 画路径，一定是遇到stroke/fill方法，才开始绘制。

> 生成闭合路径（如三角形边框），需要closePath + stroke()组合。当然，如果你本身是不需要闭合的图形，则直接使用stroke即可。

``` js
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.fill();
```

## 样式和颜色

* 颜色
    * `fillStyle`
    * `strokeStyle`
* 样式
    * `globalAlpha`
    * `lineWidth`
    * `globalCompositeOperation` 遮盖策略

``` js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";

// 设置透明度值
ctx.globalAlpha = 0.2;

// 当前绘线的粗细
ctx.lineWidth = 1;

// 设置遮盖策略：交集清除
ctx.globalCompositeOperation = 'destination-out'
```

## 绘制元素

1. 图片
    * `drawImage(imageOrCanvas, x, y)`。image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
1. 文本
    * `fillText(text, x, y [, maxWidth])`
    在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
    * `strokeText(text, x, y [, maxWidth])`
    在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.

``` js
var img = new Image();
img.src = 'images/backdrop.png';
img.onload = function(){
    ctx.drawImage(img,0,0);
}

ctx.font = "48px serif";
ctx.fillText("Hello world", 10, 50);
```