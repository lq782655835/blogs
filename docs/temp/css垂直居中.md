
css 垂直居中

* inline元素
    * height和line-height一致
* block元素
    * 绝对定位（当已知子元素的宽高）
        * 利用父元素相对定位，子元素绝对定位，并且处置、水平方向个偏移50%
        * 子元素利用负值margin偏移自身宽度、长度的一半
    * translate()属性（不知子元素的宽高）
        * 利用父元素相对定位，子元素绝对定位，并且处置、水平方向个偏移50%
        * 子元素transform: translate(-50%, 50%)
    * flex:align-item
    * grid
    * display: table-cell

``` css
// 绝对定位（当已知子元素的宽高）
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

// translate()属性（不知子元素的宽高）
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%)
}

// flex
div.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

// grid
div.parent {
    display: grid;
}
div.child {
    justify-self: center;
    align-self: center;
}

// table
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

// other
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
