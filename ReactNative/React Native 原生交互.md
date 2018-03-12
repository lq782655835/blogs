#### React Native调用原生方法

在需要调用原生方法的页面添加:

```
import ZGIntentModule from '../../components/ZGIntent'
```

##### 获取用户信息

```
ZGIntentModule.getUserInfo((userInfo) => {
	//userinfo:json字符串
	alert(msg);
});
```

userinfo:

```
{
  "token": "JVWNtFk3PA",
  "secret": "MofeRgGUs3",
  "userId": "57402",
  "userName": "YGKHL6kQEh",
  "avatar": "Qn1lfxbNAM"
}
```

##### 打开登录页面

```
ZGIntentModule.login();
```

##### 启动新页面

```
//url表示需要跳转的页面路径
ZGIntentModule.startActivity("url");
```

##### 关闭当前页面

```
//result可以不传
ZGIntentModule.finishActivity("result");
```

##### 分享





#### 原生传递数据给React Native

##### 更新用户信息

React Native代码

```
//注册监听
componentDidMount(){
        DeviceEventEmitter.addListener("UserInfo",(msg)=>{
            alert("123");
        })
}
```

Android原生代码

```
private static final String UPDATE_USER_INFO = "UserInfo";
mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(UPDATE_USER_INFO,json);
```

iOS原生代码

