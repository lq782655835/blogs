# quicklink源码解析

最近看github star增长趋势项目，发现有个google chrome lab 开源的quicklink非常火爆，故详细看了下项目源码。源码简单清晰，总共只有3个文件，但涉及的知识点都比较前卫和实用，故整理记录下。

## quicklink介绍
quicklink 是一个通过预加载资源来提升后续方案速度的轻量级工具库。旨在提升浏览过程中，用户访问后续页面时的加载速度。

说到这可能大家首先想到的是html5 prefetch api，它的实现原理是利用浏览器的空闲时间去先下载用户指定需要的内容,然后缓存起来,这样用户下次加载时,就直接从缓存中取出来,从而可以快速响应出结果。但prefetch有几个限制，首先是兼容性问题，支持的浏览器有限。再者是prefetch只支持在header中以\<link rel="prefetch"> 方式加载，不支持页面中a标签以及js方式预加载。quicklink给我们一个轻量级兼容所有浏览器的预加载方案。

Quicklink工作原理 通过以下方式加快后续页面的加载速度：
* 检测视区中的链接（使用 Intersection Observer）。
* 等待浏览器空闲（使用 requestIdleCallback）。
* 确认用户并未处于慢速连接（使用 navigator.connection.effectiveType）或启用省流模式（使用 navigator.connection.saveData）。
* 预获取视区内的 URL（使用 <link rel=prefetch> 或 XHR）。可根据请求优先级进行控制（若支持 fetch() 可进行切换）。

## 参考文章
* [prefetch](https://www.w3.org/TR/resource-hints/#prefetch)