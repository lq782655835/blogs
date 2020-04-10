# 组件库讨论
> 2018-11-20

# 设计原则
* size写法
  1. attribute + css属性选择器 (兼容性较差)
  2. class + 匹配对应css (*选用，优化class写法-格式化字符串)
* type，列出具体的可选项
* 颜色
  * 命名与赋值
  * 自定义的界限？
* 命名方式统一

# ai-link
* 站内站外写法
* 形式变为mixin供其他组件使用

# ai-button
* 扩展link功能后无法满足全部需求[改动见ai-link]

# ai-icon
* 组件内图标库，单独打包，放在外部
* svg-icon作为推荐第三方组件

# ai-input
* mixin regex功能

# ai-select
* 多选暂放在一个组件中
* render方法在组件内区分两种组件

# ai-table
* 考虑自定义表头的添加

# ai-modal
* 单例的修改
* 复杂功能使用mixin

# ai-layout
* 在文档中说明，暂不改变css attrbiute方式

# ai-checkbox
* 添加v-model属性
* chose事件名统一

# ai-steps
* 添加v-model

# ai-upload
* VIP功能：NOS上传

# ai-switch
* 需要从片段中移植进来
* 添加v-model

# ai-tree
* 需要从片段中移植进来
* 添加v-model

# 第三方组件推荐
* svg处理: svg-icon
* 日期选择: vue-datepicker-local
* 表单验证: vuelidate
