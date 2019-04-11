# Vue

## Vue 的模板如何被渲染成 HTML? 以及渲染过程

1. vue 模板的本质是字符串，利用各种正则，把模板中的属性去变成 js 中的变量，vif,vshow,vfor 等指令变成 js 中的逻辑
1. 模板最终会被转换为 render 函数
1. render 函数执行返回 vNode
1. 使用 vNode 的 path 方法把 vNode 渲染成真实 DOM

## Vue 的整个实现流程

1. 先把模板解析成 render 函数，把模板中的属性去变成 js 中的变量，vif,vshow,vfor 等指令变成 js 中的逻辑
1. 执行 render 函数，在初次渲染执行 render 函数的过程中 绑定属性监听，收集依赖，最终得到 vNode，利用 vNode 的 Path 方法，把 vNode 渲染成真实的 DOM
1. 在属性更新后，重新执行 render 函数，不过这个时候就不需要绑定属性和收集依赖了，最终生成新的 vNode
1. 把新的 vNode 和 旧的 vNode 去做对比，找出真正需要更新的 DOM，渲染

## 什么是 diff 算法，或者是 diff 算法用来做什么
