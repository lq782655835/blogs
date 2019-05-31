# Chrome 性能分析

![](https://developers.google.com/web/tools/chrome-devtools/network/imgs/resource-timing-api.png)

![image](https://developers.google.com/web/tools/chrome-devtools/network/imgs/resource-timing-data.png)

1. `Queueing`： 请求排队等待时间
1. Stalled: 连接前的等待时间
1. DNS Lookup: 解析DNS时间
1. `Initial connection`: 建立连接，包括TCP三次握手1. ttp）
1. SSL：完成SSL握手（Https）
1. `Request sent`: 开始发起请求
1. `Waiting`： 等待服务器，知道收到第一个字节时间
1. `Ccontent` Download： 下载完整时间

* [Understanding Resource Timing](https://developers.google.com/web/tools/chrome-devtools/network/understanding-resource-timing)



当一个 HTML 文档被加载和解析完成后，DOMContentLoaded 事件便会被触发。