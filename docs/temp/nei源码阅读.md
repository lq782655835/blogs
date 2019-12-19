# NEI源码阅读

### 源码简析
* bin/nei.js nei工具项目入口，主要提供server、build等命令
* main.js 工具命令对应的函数入口
* lib/fb-modules/util/mock_data_work.js。node vm安全沙箱的包装器。
* lib/fb-modules/util/mock_data.js 定义一些将运行在vm沙箱中的函数。目的是根据nei配置获得对应的mock数据。也就是说，这里是nei配置到最终数据的关键代码。

![image](https://user-images.githubusercontent.com/6310131/51990799-c2bfbd80-24e4-11e9-974e-9c056dc72b67.png)

### 相关Doc

* [传给模板的数据说明](https://github.com/NEYouFan/nei-toolkit/blob/master/doc/%E4%BC%A0%E7%BB%99%E6%A8%A1%E6%9D%BF%E7%9A%84%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E.md)



# [AtomValidator](https://github.com/vusion/atom-validator/blob/master/src/AtomValidator.ts) 源码阅读

``` js
// 内置规则解析 && 校验，支持string rules/Array rules
const atomValidator = new AtomValidator();
atomValidator.validate(value, 'required | max(200)')
    .then(() => {}).catch((error: string) => {});
```

### 1. 正则解析string（仿vue filter）：

https://github.com/vusion/atom-validator/blob/master/src/parseRules.ts

### 2. string方法转为真实的方法：

过程：split分别拿到方法名key和参数，根据key找到方法，根据Function对参数统一处理拿到真实参数。因为参数名可能是...list，没有上下文不清楚该表达式，所以需要Function中转下，同时可设置context确定在哪个上下文中。

``` html
<u-form-item label="用户名" required rules="required | ^azAZ | ^azAZ09-$ @b | azAZ09$ | minLength(4) #4-12个字符">
    <u-input maxlength="12" placeholder="4-12个字符"></u-input>
</u-form-item>
```

解析后：required | ^azAZ | ^azAZ09-$ | azAZ09$ | minLength(4)的完整格式：

``` html
<u-form-item label="用户名" required :rules="[
    { validate: 'required', required: true, trigger: 'blur', message: '请输入用户名' },
    { validate: 'pattern', args: /^[a-zA-Z]/, trigger: 'input+blur', message: '以字母开头' },
    { validate: 'pattern', args: /^[a-zA-Z0-9-]$/, trigger: 'input+blur', message: '字母、数字或中划线组成' },
    { validate: 'pattern', args: /[a-zA-Z0-9]$/, trigger: 'blur', message: '以字母或数字结尾' },
    { validate: 'minLength', args: [4], trigger: 'blur', message: '不得少于4个字符' },
]">
    <u-input maxlength="12" placeholder="4-12个字符"></u-input>
</u-form-item>
```

``` js
// parseRules解析规则
// 支持（1，2，3）&& （...list）语法
const resolveArgs = (args: string) => Function(`with (this) { return ${args} }`).bind(this.context);

const index = ruleName.indexOf('(') // range(1, 4)
if (~index) {
    // 拿到内置rule校验方法名
    parsedRule.validate = ruleName.slice(0, index);
    // 拿到参数（string --> Array）
    const args = '[' + ruleName.slice(index + 1, ruleName.length - 1) + ']';
    parsedRule.args = resolveArgs(args);
}

```

``` js
// validate校验结果
if (typeof rule.validate === 'string') {
    // 根据name，选择指定的内置校验方法
    const validator = this.validators[rule.validate];
    validate = async (value: any, rule: Rule, options?: Object) => {
        let args: any = rule.args; // 参数
        //校验结果
        return validator(value, ...args);
    }
}
result = validate.call(this.context, value, rule, options);
```

this.$vnode.context: Vue组件上下文