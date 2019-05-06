## [Vue.extend](https://cn.vuejs.org/v2/api/index.html#Vue-extend)

使用基础 Vue 构造器，创建一个“子类”。简单说，就是基于一个Object可返回Vue的子类，可实例化后进行挂载。

``` js
Modal.alert = content =>
    new Promise(resolve => {
        const Ctor = Vue.component('UModal')
        if (!Ctor) return

        let instance = new Ctor({
            propsData: { content, type: ModalType.ALERT, showClose: false, cancelButton: '' }
        })
        instance.$on('ok', () => resolve())
        instance.open()
    })

// 实例open
open() {
    if (!this.$el) this.$mount(document.createElement('div'))
}
```

## [provide/inject](https://cn.vuejs.org/v2/api/#provide-inject)

provide 和 inject 主要为高阶插件/组件库提供用例。与 React 的上下文特性很相似。

``` js
export default {
    name: 'u-form',
    props: {
        title: String,
        labelWidth: String,
        contentWidth: String,
        okButton: { type: String, default: '确定' },
        cancelButton: { type: String, default: '取消' }
    },
    provide() {
        return {
            uForm: this
        }
    }
}
```

``` js
export default {
    name: 'u-form-item',
    props: {
        label: String,
        error: String,
        required: Boolean,
        tip: String
    },
    data() {
        return {
            leftSty: {},
            rightSty: {}
        }
    },
    inject: ['uForm'],
    created() {
        this.uForm.labelWidth && (this.leftSty.width = this.uForm.labelWidth)
        this.uForm.contentWidth && (this.rightSty.width = this.uForm.contentWidth)
    }
}
```