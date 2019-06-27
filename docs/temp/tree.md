# 二叉树

1. 每个节点包含值，并且拥有左节点或右节点
2. 排序二叉树：左节点值小于父节点值，右节点值大于左边节点值

``` js
// 二叉树基本节点数据结构
function Node(key) {
    this.key = key
    this.left = null
    this.right = null
}
```

``` js
sortNode([1, 3, 7, 4, 6])

function sortNode(arr) {
    arr.forEach(num => insert(num))
}

var root = null
function insert(key) {
    if (root === null) {
        root = new Node(key)
    } else {
        sortNode(root, new Node(key))
    }
}
function sortNode(parentNode, childNode) {
    if (parentNode.key > childNode.key) {
        parentNode.left === null ? parentNode.left = childNode : sortNode(parent.left, childNode)
    } else {
        parentNode.right === null ? parentNode.right = childNode : sortNode(parent.right, childNode)
    }
}
```