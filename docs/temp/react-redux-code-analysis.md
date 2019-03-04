# React-Redux源码解析

App根节点组件提供的Context对象作为共享数据对媒介，使得子组件可以获得的到全局store。

App的根组件用<Provider />组件包裹后，本质上就为App提供了一个全局的属性store，相当于在整个App范围内，共享store属性。当然，<Provider />组件也可以包裹在其他组件中，在组件级的全局范围内共享store。

```
// <Provider />组件源码的核心实现
export function createProvider(storeKey = 'store', subKey) {
    const subscriptionKey = subKey || `${storeKey}Subscription`

    class Provider extends Component {
        getChildContext() {
          return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }

        constructor(props, context) {
          super(props, context)
          this[storeKey] = props.store;
        }

        render() {
          return Children.only(this.props.children)
        }
    }

    // ......

    Provider.propTypes = {
        store: storeShape.isRequired,
        children: PropTypes.element.isRequired,
    }
    Provider.childContextTypes = {
        [storeKey]: storeShape.isRequired,
        [subscriptionKey]: subscriptionShape,
    }

    return Provider
}

export default createProvider()
```