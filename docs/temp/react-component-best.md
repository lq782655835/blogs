# React 组件最佳实践

## class组件
``` js
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { string, object } from 'prop-types'
// 分开本地导入和依赖导入
import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'

// 使用修饰器（如果有的话）
@observer
export default class ProfileContainer extends Component {
  state = { expanded: false }
  // 初始化state (ES7) 或者在构造函数(constructor)中初始化state (ES6)
 
  //使用静态属性(ES7)声明propTypes越早越好
  static propTypes = {
    model: object.isRequired,
    title: string
  }

  // 在propTypes后声明defaultProps
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }

  // 使用箭头函数绑定指向定义的上下文的this
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }
  
  handleNameChange = (e) => {
    this.props.model.name = e.target.value
  }
  
  handleExpand = (e) => {
    e.preventDefault()
    this.setState(prevState => ({ expanded: !prevState.expanded }))
  }
  
  render() {
    // 解构props成可读的
    const {
      model,
      title
    } = this.props
    return ( 
      <ExpandableForm 
        onSubmit={this.handleSubmit} 
        expanded={this.state.expanded} 
        onExpand={this.handleExpand}>
        // 如果有2个以上props,分行写
        <div>
          <h1>{title}</h1>
          <input
            type="text"
            value={model.name}
            // onChange={(e) => { model.name = e.target.value }}
            // 避免创造新的闭包，应该使用下面的方法。
            onChange={this.handleNameChange}
            placeholder="Your Name"/>
        </div>
      </ExpandableForm>
    )
  }
}
```

## 函数组件

``` js
import React from 'react'
import { observer } from 'mobx-react'
import { func, bool } from 'prop-types'
// Separate local imports from dependencies
import './styles/Form.css'

// 在组件前声明propTypes
ExpandableForm.propTypes = {
  onSubmit: func.isRequired,
  expanded: bool,
  onExpand: func.isRequired
}

// 推荐使用具名组件，箭头函数定义的函数组件其实是没有命名的
// 解构props,通过函数入参默认值的方式设定defaultProps
function ExpandableForm({ onExpand, expanded = false, children, onSubmit }) {
  const formStyle = expanded ? { height: 'auto' } : { height: 0 }
  return (
    <form style={formStyle} onSubmit={onSubmit}>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}

// Wrap the component instead of decorating it
export default observer(ExpandableForm)
```

## 参考文章
* [Our Best Practices for Writing React Components](https://engineering.musefind.com/our-best-practices-for-writing-react-components-dec3eb5c3fc8)