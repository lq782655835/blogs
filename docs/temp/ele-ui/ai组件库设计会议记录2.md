# 组件库设计

## 公用字典表

* size: 大小标志，值有：xxl,xl,l,s,xs,xxs
* dir: 方向标志，值有：h,v
* 支持v-modal也同时支持value.async
* v-modal尽量使用value/input等官方推荐语法糖

## ai-link

#### Props
* [x] href
* [x] target
* [x] to
* [x] replace
* [x] disabled
* [ ] gaKey @讨论？？？

#### Events
* [x] before-navigate
* [x] navigate

## ai-button

#### Props
* [x] color
* [ ] icon
* [ ] size( for css)
* [ ] 属性同ai-link,支持to，href，disabled等

## ai-icon @讨论？？？

* [ ] 组件内图标库
* [ ] 通用解决方案：开源svg-icon

## ai-input

#### Props
* [x] v-modal
* [x] value
* [ ] value.number
* [x] maxLength(v-bind="$attrs")
* [x] type: password/textarea(v-bind="$attrs")
* [x] disabled(v-bind="$attrs")
* [ ] size( for css)
* [ ] clearabled
* [ ] regex @讨论？？？

#### Events
* [ ] input
* [ ] 原生blur等(v-on="$listeners")

## ai-select

#### Props
* [x] list
* [x] v-modal
* [x] value
* [x] disabled
* [ ] size( for css)
* [ ] labelField
* [ ] valueField
* [ ] multiple @多选样式 讨论

#### Events
* [ ] input
* [x] select

## ai-table

#### Props
* [x] list
* [x] slot-scope
* [ ] 自定义表头

## ai-pagination

#### Props
* [ ] page.sync
* [ ] total
* [ ] pageSize

#### Events
* [ ] update:page
* [ ] changed

## ai-modal

#### Props
* [ ] visible.sync
* [ ] title
* [ ] content
* [ ] size
* [ ] okButton
* [ ] cancelButton
* [ ] $alert
* [ ] $confirm

#### Slots
* [ ] title
* [ ] default
* [ ] foot

#### Events
* [ ] before-close
* [ ] close

## ai-layout

#### Props
* [ ] dir
* [ ] size (for css)
* [ ] layout (for css)

## ai-tabs

#### Props
* [ ] v-modal

#### Events
* [ ] input
* [ ] changed

## ai-tab

#### Props
* [x] title
* [ ] to
* [ ] disabled

## ai-toast

#### Props
* [x] text
* [x] type
* [x] delay

## ai-tooltip

#### Props
* [x] text
* [ ] position

## ai-radio

## ai-radios

## ai-checkbox

## ai-checkboxs

## ai-form

## ai-form-item

## ai-label

## ai-badge

## ai-breadcrumb

## ai-progress

## ai-steps

## ai-menu

## ai-menu-item

## ai-upload

## ai-switch

## ai-tree

## ai-datepicker

## popup

## grid