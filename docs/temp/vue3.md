老生长谈下ES6 Proxy数据监听优点：
1. 对对象进行直接监听, 可以`弥补Object.defineProperty无法监听新增删除属性的短板`
2. `无需再遍历对象进行设置`监听函数Object.defineProperty
3. 可以`适用于Array`, 不需要再分成两种写法
