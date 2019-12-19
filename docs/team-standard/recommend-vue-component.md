# 组件设计风格

### 要求 Element 元素统一使用El后缀

``` js
// ✗ bad
const elem = this.$el;
const element = e.target;
const input = this.$refs.input

// ✓ good
const el = this.$el;
const el = e.target;
const inputEl = this.$refs.input;
```

### 要求 Vue 实例统一使用VM后缀

``` js
// ✗ bad
const instance = this;
const form = this.$refs.form;
this.$emit('select', {
    item,
});

// ✓ good
const vm = this;
const formVM = this.$refs.form;
this.$emit('select', {
    item,
    itemVM: selectedVM,
});
```

### 被动接收事件方法使用on前缀

```js
// ✗ bad
{
    methods: {
        input() {
            // ...
        },
        handleValidate() {
            // ...
        },
    },
}

// ✓ good
{
    methods: {
        onInput() {
            // ...
        },
        onValidate() {
            // ...
        },
    },
}
```

### slot 只在对应名称的 class 内设置

``` js
// ✗ bad
<slot name="head">
    <div :class="$style.head">
            <slot name="title">
                <div :class="$style.title">
                    {{ title }}
                </div>
            </slot>
            <div :class="$style.close"></div>
    </div>
</slot>

// ✓ good
<div :class="$style.head">
    <slot name="head">
        <div :class="$style.title">
            <slot name="title">{{ title }}</slot>
        </div>
        <div :class="$style.close"></div>
    </slot>
</div>
```

### 变量命名

* 常见状态：default, primary, info, success, warning, error, disabled, muted, ...
* 大小分级：mini, small, base, large, huge, ...
* 颜色分级：darkest, darker, dark, base, light, lighter, lightest, ...
