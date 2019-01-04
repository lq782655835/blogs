# 推荐-优雅引用字体

## 编程式字体方法的好处
1. 学习视觉同学对于具体字体的考量，也许还能发现视觉同学的bug
2. 全局控制，避免样式散乱
3. 书写字体样式成为一门艺术

## bad

``` css
.form-title {
    font: 'PingFang-SC-medium';
    font-size: 18px;
    font-color: #22222;
}

.form-text {
    font: 'PingFang-SC-regular';
    font-size: 14px;
    font-color: #333333;
}
```

## good

variables.scss文件

``` scss
$font-normal-color = #222222; // 字体颜色
$font-light-color = #333333;

@mixin font-class($fontFamily, $fontSize, $fontColor) {
    font-family: $fontFamily;
    font-size: $fontSize;
    color: $fontColor;
}

@mixin font-large($size: 14px, $color: $font-normal-color) {
    @include font-class($font-family-medium, $size, $color);
}

@mixin font-normal($size: 14px, $color: $font-light-color) {
    @include font-class($font-family-regular, $size, $color);
}
```

应用:
``` scss
.form-title {
    @include font-large(18px, #22222);
}

.form-text {
    @include font-large(14px, #333333);
}
```
> font-large/font-normal等公用mixins建议放在统一的`variables.scss`文件中，再通过sass-resource自动引入到所有组件中

## 最佳字体顺序参考

### PC端

```
$font-family-medium = 'PingFang-SC-medium', Helveti   ca, Tahoma, Arial, 'Microsoft YaHei', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', sans-serif;
$font-family-regular = 'PingFang-SC-regular', Helvetica, Tahoma, Arial, 'Microsoft YaHei', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', sans-serif;
```
### 移动端
```
$font-family-ultralight = 'PingFangSC-Ultralight', 'Source Han Sans CN', "Helvetica Neue";
$font-family-regular = 'PingFangSC-Regular', 'Source Han Sans CN', "Helvetica Neue";
$font-family-medium = 'PingFangSC-Medium', 'Source Han Sans CN Medium', "Helvetica Neue";
$font-family-thin = 'PingFangSC-Thin', 'Source Han Sans CN Thin', "Helvetica Neue";
$font-family-light = 'PingFangSC-Light', 'Source Han Sans CN Light', "Helvetica Neue";
$font-family-semibold = 'PingFangSC-Semibold', 'Source Han Sans CN Light', "Helvetica Neue";
```
