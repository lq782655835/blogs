# 常用ESLint规则

``` ts
{
    "defaultSeverity": "warning",
    "extends": [
      "tslint:recommended"
    ],
    "linterOptions": {
      "exclude": [
        "node_modules/**"
      ]
    },
    "rules": {
      "quotemark": [true, "single"],
      "indent": [true, "spaces", 4],
      "interface-name": false,
      "ordered-imports": false,
      "object-literal-sort-keys": false,
      "no-consecutive-blank-lines": false,
      "semicolon": [true, "never"], // 禁止分号
      "trailing-comma": [true, {"multiline": "never", "singleline": "never"}], // 禁止拖尾的分号
      "prefer-const": false, // 禁止提示使用const代替let/var
      "curly": false, // 不强迫断句return需要花括号
      "radix": false, // 不强迫调用parseInt时，带radix参数
      "arrow-parens": [true, "ban-single-arg-parens"], // 允许只有单参数的箭头函数，不带括号
      "no-unused-expression": [true, "allow-fast-null-checks"], // 允许true && (varname = 3234) 的表达式
      "no-string-literal": false, // 允许 object[key]的写法
      "no-console": [true, "error"] // 除禁止console.error外，其他console都支持
    }
  }
  
```