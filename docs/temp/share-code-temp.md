``` html
<template>
    <div></div>
</template>

<script>
export default {
    /* 1. vue子组件 */
    components: {},
    /* 2. Vue数据 */
    props: {},
    data () {
        return {}
    },
    computed: {},
    watch:{},
    /* 3. Vue资源 */
    filters: {},
    directives: {},
    /* 4. Vue生命周期 */
    mounted () {},
    /* 5. Vue方法 */
    methods: {}
}
</script>
```

``` js
import React, { Component } from 'react'
/* 1. React子组件 */
import HomeList from './HomeList.js'

export default class HelloWorld extends Component {
    /* 2. React数据 */
    static defaultProps = {} // props
    state = { } // data
    /* 3. React生命周期 */
    comonentDidMount() {}
    /* 4. React方法 */
    handleClick = () => {} // method

    render() {
        return (
            <div><div>
        )
    }
}
```

``` js
// Vue Component实质是特定的options
warpperVue = new Vue(components)
class SubVue extends Vue {
    render(h) {
        return JSX
    }
}
warpperVue = {
    $options: {}
    render: function(h) {}
}
```

Vue模板

``` js
class VNode {
  constructor({ el, data, children, text, key }) {
    // 选择器，或者对应的真实 DOM 节点
    this.el = el
    // VNode data
    this.data = data
    // 子节点
    this.children = children
    // 文本节点
    this.text = text
    // key
    this.key = key
    // ...
  }
}

<div>
  <span>some text</span>
</div>

new VNode({
  el: 'div',
  children: [
    new VNode({
      el: 'span',
      text: 'some text'
    })
  ]
})
```

![](https://macsalvation.net/2018/08/06/dive-deep-into-vue-part-1-vdom-and-diff/VDOM.png)


``` js
import React from 'react'
import ReactDOM from 'react-dom'

class HelloWorld extends React {
  render() {
    return (
      <div>
        <Hello />
        <Inner text="hi">
          <div>yoyoyo</div>
        </Inner>
      </div>
    )
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('app'))

export default {
  mixins: [SomeMixin],
  handleClick() {
    console.log(this); // Vue Component instance
  },
  render() {
  	return (
      <div onClick={this.handleClick}></div>
    )
  }
}
```
## 认识JSX

``` js
var JSXExample = React.createElement("div", null, 
  React.createElement(Hello, null),
  React.createElement(Inner, { text: "hi" }, 
    React.createElement("div", null, "yoyoyo")
  )
);
```
``` js
ReactDOM.render(VNode)
let VNode = {
  type: HelloWorld, // 包含render函数的类
  props: {
    children: [
      {
        type: 'div',
        props: {
          children: [
            {
              type: Hello,
              props: {}
            },
            {
              type: Inner,
              props: {
                text: 'hi',
                children: [
                  {
                    type: 'div',
                    props: {
                      children: 'yoyoyo'
                    },
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
}

```

## 响应式原理不同
``` js
export default class HelloWorld extends Component {
    state = {
      count: 0,
      obj: {
        a: 0,
        others: {}
      }
    }
    handleClick = () => {
      // 相同：异步更新
      // 不同：1. react新值覆盖旧值 2. react动态加属性
      this.setState({ count: 1 })
      this.setState({
        obj: {...this.state.obj, a: 1, b: 1},
      })
    }

    render() {
        return (
            <div onClick={this.handleClick}>
          		{this.state.count}
                {this.state.obj.a}
				<Hello />
			<div>
        )
    }
}

export default {
  data() {
  	return {
      count: 0,
      obj: {
        a: 0,
        others: {}
      }
    }
  },
  methods: {
    handleClick() {
      // 1. vue直接修改数据 2. 使用特定API动态加属性
      this.count = 1
      this.obj.a = 1
      Vue.set(this.obj, 'b', 1)
    }
  },
  template: `<div @click="handleClick">
    {{this.state.count}}
    {{this.state.obj.a}}
    {{this.state.obj.b}}
	<hello />
			<div>`

}
```