# quicklink源码解析

最近看github star增长趋势项目，发现有个google chrome lab 开源的quicklink非常火爆，故详细看了下项目源码。源码简单清晰，总共只有3个文件，但涉及的知识点都比较前卫和实用，故整理记录下。

## quicklink介绍
quicklink 是一个通过预加载资源来提升后续方案速度的轻量级工具库。旨在提升浏览过程中，用户访问后续页面时的加载速度。

说到这可能大家首先想到的是html5 prefetch api，它的实现原理是利用浏览器的空闲时间去先下载用户指定需要的内容,然后缓存起来,这样用户下次加载时,就直接从缓存中取出来,从而可以快速响应出结果。但prefetch有几个限制，首先是兼容性问题，该api较新，支持的浏览器有限。再者是prefetch只支持在header中以\<link rel="prefetch"> 方式加载，不支持页面中a标签以及js方式预加载。quicklink给我们一个轻量级兼容所有浏览器的预加载方案。

## 参考文章
* [prefetch](https://www.w3.org/TR/resource-hints/#prefetch)