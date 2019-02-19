# 前端神器Charles

## Q: Charles是什么
A: Charles是一个抓包工具，类似工具还有Fiddler。Charles相当于一个插在服务器和客户端之间的“过滤器”；当客户端向服务器发起请求的时候，先到Charles进行过滤，然后Charles在把最终的数据发送给服务器；

## Q: Charles能干什么

A: 常做以下这些事：
* 抓取 Http 和 Https 的请求和响应，抓包是最常用的了。
* 重发网络请求，方便后端调试，复杂和特殊情况下的一件重发还是非常爽的（捕获的记录，直接repeat就可以了，如果想修改还可以修改）。
* 修改网络请求参数（客户端向服务器发送的时候，可以修改后再转发出去）。
* 网络请求的截获和动态修改。
* 支持模拟慢速网络，主要是模仿手机上的2G/3G/4G的访问流程。
* 支持本地映射和远程映射，比如你可以把线上资源映射到本地某个文件夹下，这样可以方面的处理一些特殊情况下的bug和线上调试（网络的css，js等资源用的是本地代码，这些你可以本地随便修改，数据之类的都是线上的环境，方面在线调试）；
* 可以抓手机端访问的资源（如果是配置HOST的环境，手机可以借用host配置进入测试环境）

## Q: 安装Charles

A：从[官网](http://www.charlesproxy.com/download)直接下载，并用以下账号注册
```
Registered Name: https://zhile.io

License Key: 48891cf209c6d32bf4
```

## Q: 如何抓包http请求

A：开启mac的代理功能即可，这样会把chrome所有的请求都代理到charles中。操作：
1. Proxy --> 勾选macOS Proxy
2. 同时确认Proxy-> Proxy settings ->proxies :勾选enable transparent http proxying

## Q: 如何抓包https请求

A：没有设置任何东西，一般请求到的https是unknown，这是因为https需要信任的本地证书。所以需要在本地安装证书，操作：
1. `安装并信任证书`：Help --> SSL Proxying --> Install Charles Root Certificate会自动安装证书 --> Mac需要输入密码信任证书，找到Charles开头的证书，双击选择信任即可。
2. `添加https代理`：Proxy-> SSL Proxying Settings->SSL Proxying:勾选Enable SSL Proxying + 添加Location（host设置为“*”，Port设置为“443”）

## Q: 关闭Charles后，无法访问网络

A： 这是因为在使用Charles后，把Mac作为了代理。退出Charles应用程序并不会自动关闭掉Mac的代理，所以需要我们手动关闭Mac代理。操作：
1. Go to Applications > System Preferences > Network > Advanced > Proxies and deselect any proxies that have been selected.

## 参考文章
* [抓包工具Charles的使用教程](https://www.cnblogs.com/jiayuchn-test/p/8875105.html)
* [mac下配置Charles，安装证书](https://blog.csdn.net/windy135/article/details/79086270)