# js 滚动条

网页可见区域宽： document.body.clientWidth;
网页可见区域高： document.body.clientHeight;
网页可见区域宽： document.body.offsetWidth; (包括边线的宽)
网页可见区域高： document.body.offsetHeight; (包括边线的宽)
网页正文全文宽： document.body.scrollWidth;
网页正文全文高： document.body.scrollHeight;
网页被卷去的高： document.body.scrollTop; （当前滚动条距离顶部的距离）
网页被卷去的左： document.body.scrollLeft;（当前滚动条距离左边的距离）

判断滚动条到底部，需要用到DOM的三个属性值，即scrollTop、clientHeight、scrollHeight。

scrollTop为滚动条在Y轴上的滚动距离。
clientHeight为内容可视区域的高度。
scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
从这个三个属性的介绍就可以看出来，滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight。