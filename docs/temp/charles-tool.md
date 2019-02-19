# 抓包神器charles

Q：关闭charles后，无法访问网络

A： 这是因为在使用charles后，把Mac作为了代理。退出charles应用程序并不会自动关闭掉Mac的代理，所以需要我们手动关闭Mac代理
解决方案：Go to Applications > System Preferences > Network > Advanced > Proxies and deselect any proxies that have been selected.

## 参考文章
* [mac下配置Charles，安装证书](https://blog.csdn.net/windy135/article/details/79086270)