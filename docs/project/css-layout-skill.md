# css布局技巧

## 1. css 垂直居中

1. inline元素
    * height和line-height一致
1. block元素
    1. 绝对定位（当已知子元素的宽高）
        * 利用父元素相对定位，子元素绝对定位，并且处置、水平方向个偏移50%
        * 子元素利用负值margin偏移自身宽度、长度的一半
    2. translate()属性（不知子元素的宽高）
        * 利用父元素相对定位，子元素绝对定位，并且处置、水平方向个偏移50%
        * 子元素transform: translate(-50%, 50%)
    3. flex:align-item
    4. grid
    5. display: table-cell

``` css
// 1. 绝对定位（当已知子元素的宽高）
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 300px;
    margin-left: -100px;
    margin-top: -150px;
}

// 2. translate()属性（不知子元素的宽高）
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%)
}

// 3. flex
div.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

// 4. grid
div.parent {
    display: grid;
}
div.child {
    justify-self: center;
    align-self: center;
}

// 5. table
.parent {
        display: table-cell;
        height: 200px;
        width: 200px;
        background-color: orange;
        text-align: center;
        vertical-align: middle;
}
.child {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: blue;
}

// 6. other
div.parent {
    font-size: 0;
    text-align: center;
    &::before {
        content: "";
        display: inline-block;
        width: 0;
        height: 100%;
        vertical-align: middle;
    }
}
div.child{
  display: inline-block;
  vertical-align: middle;
}
```

## 2. css固定顶部,余下占据100%

* 父容器display: flex; 顶部部分height: xx px;余下flex: 1;
* 绝对定位布局：父容器100%，主要子部分margin-top: xx px;剩下子元素使用absolute+left/top定位的能力，进行布局。
* 父容器padding-top:xx px,顶部部分margin-top:- xx px;余下height: 100%;

三栏布局：


``` css
<div class="container">
  <div class="left">1</div>
  <div class="main">2</div>
  <div class="right">3</div>
</div>

/* 1. flex布局 */
.container{
  display:flex;
  justify-content: center;
  height: 200px;
  background: #eee;
}
.left {
   width: 200px;
   background-color: red;
   height: 100%;
 }
.main {
    background-color: yellow;
    flex: 1; /*重点*/
}
.right {
    width: 200px;
    background-color: green;
}

/* 2.绝对定位布局 */
.container {
  position: relative;
  background:#eee;
  height:200px;
}
.main {
  width: 100%;
  margin: 0 120px; /* 两边算mian中的位置 */
  background-color: yellow;
}
.left {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100%; /* 重要：absolute不会占据空间，需要主动设置height占满 */
  background-color: red;
}
.right {
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 100%;
  background-color: green;
}

/* 3.父容器+padding，子容器-margin */
.container {
  padding: 0 120px;
  background:#eee;
  height:200px;
}
.main {
  width: 100%;
  background-color: yellow;
}
.left {
  margin-left: -100px;
  background-color: red;
}
.right {
  margin-left: -100px;
  background-color: green;
}
```

## 3. css三角形

margin/padding顺序是：上右下左；

三角形设置未隐形边框，方向是（方向指的是箭头方向）：下左上右（相反）
``` css
.box{
	width:0px;
	height:0px;
	border: 50px solid;
    /*获得红色向右的箭头*/
	border-color:blue green orange red;
}
```



更多：https://mp.weixin.qq.com/s/e_gXXJTFocNxDaG0U_iB_g

## 4. 清除浮动

``` scss
@mixin clearfix {
    &:after {
        content: "";
        display: table;
        clear: both;
    }
}
```