
## 开发问题

- IOS中statusBar是占20dp,而Android中页面默认没有statusBar。可以根据`Platform.OS === 'ios'`判断

- ### ext元素在Text里边，可以考虑为inline， 如果单独在View里边，那就是Block

- ### React Native中尺寸是没有单位的，它代表了设备独立像素。

- ### IOS安全默认屏蔽Http，只支持Https，所以网络http图片看不了。如果要支持，在.plist文件中添加特殊设置

- ### 如果是网络图片，一定要设置width和height才会显示


### 文章速链

[ReactNative API变迁史](https://evianzhow.github.io/react-native-evolution-cheatsheet/)