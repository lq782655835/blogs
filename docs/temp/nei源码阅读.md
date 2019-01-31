# NEI源码阅读

## 源码简析
* bin/nei.js nei工具项目入口，主要提供server、build等命令
* main.js 工具命令对应的函数入口
* lib/fb-modules/util/mock_data_work.js。node vm安全沙箱的包装器。
* lib/fb-modules/util/mock_data.js 定义一些将运行在vm沙箱中的函数。目的是根据nei配置获得对应的mock数据。也就是说，这里是nei配置到最终数据的关键代码。

![image](https://user-images.githubusercontent.com/6310131/51990799-c2bfbd80-24e4-11e9-974e-9c056dc72b67.png)


## 相关Doc
* [传给模板的数据说明](https://github.com/NEYouFan/nei-toolkit/blob/master/doc/%E4%BC%A0%E7%BB%99%E6%A8%A1%E6%9D%BF%E7%9A%84%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E.md)