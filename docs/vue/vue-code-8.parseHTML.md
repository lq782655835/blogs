# Vue2.x源码分析 - 解析Template模板

编译过程首先就是对模板做解析，生成 AST，它是一种抽象语法树，是对源代码的抽象语法结构的树状表现形式。

Vue的实现方式是从头开始解析，运用正则表达式查找，逐部分字符分析、处理、删减，直到处理完整个template字符，最终得到一颗完整的AST Tree。代码在`src/compiler/parser/index.js`中的`parseHTML()`。

## 整体流程

1. 遇到注释/doctype时，游标跳过整段。
2. 遇到开始标签<
    1. 解析tag标签，拿到startTagMatch
        1. 读取tag标签, 如'<h1',游标向前'<tag'
        2. 读取标签上属性。游标向前移动'所有属性'
            * /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
        3. 读取tag标签的右尖括号'>',游标向前加1
            * /^\s*(\/?)>/
    ![image](https://user-images.githubusercontent.com/6310131/57747092-92540600-7706-11e9-8a0b-d72a632b7232.png)
    2. 处理tag和属性（执行option.start），管理ASTElement。（创建 AST 元素，处理 AST 元素，AST 树管理（比如维护父子关系，这时候就用到stack栈）。）
    ``` js
    if (inVPre) {
        processRawAttrs(element)
    } else if (!element.processed) {
        // structural directives
        processFor(element)
        processIf(element)
        processOnce(element)
        processElement(element, options) // processKey/processRef/processSlot/processComponent/processAttrs
    }
    ```
    3. 使用stack压入tag标签，通过这个栈可得知标签的父子关系
    ![image](https://user-images.githubusercontent.com/6310131/57746170-9120da00-7702-11e9-9113-e6d3a1bc619c.png)
3. 遇到纯文本，解析，游标往前移动。执行options.chars
4. 遇到结束标签</>
    * 执行option.end，游标向前移动

``` js
export function parseHTML (html, options) {
  let lastTag
  while (html) {
    if (!lastTag || !isPlainTextElement(lastTag)){
      let textEnd = html.indexOf('<')
      // 如果是<开头
      if (textEnd === 0) {
          // 注释/Doctype都是匹配整个区域
         if(matchComment) {
           advance(commentLength)
           continue
         }
         if(matchDoctype) {
           advance(doctypeLength)
           continue
         }
         // 匹配结尾，如</h1>。new RegExp(`^<\\/${qnameCapture}[^>]*>`)
         if(matchEndTag) {
           advance(endTagLength)
           parseEndTag() // 1. stack弹出标签 2. options.end
           continue
         }
         // 匹配开始
         if(matchStartTag) {
           parseStartTag() // 将<h1 name="123">分别处理为：<h1、name="123"、>
           handleStartTag() // stack压入 2. options.start
           continue
         }
      }
      // 开闭标签之间的纯文本
      handleText()
      advance(textLength)
    } else {
       // 处理特殊的script,style,textarea
       handlePlainTextElement()
       parseEndTag()
    }
  }
}

function advance (n) {
  index += n
  html = html.substring(n) // 每次都截取文字
}
```

``` html
// 处理时html在变化（游标作用）
" v-for="branch in branches">
        <input type="radio" :id="branch" :value="branch" name="branch" v-model="currentBranch">
        <label :for="branch">{{ branch }}</label>
      </template>
      <p>vuejs/vue@{{ currentBranch }}</p>
    </div>"
```

## AST Tree

``` html
<ul :class="bindCls" class="list" v-if="isShow">
    <li v-for="(item,index) in data" @click="clickItem(index)">{{item}}:{{index}}</li>
</ul>
```

``` js
ast = {
  'type': 1,
  'tag': 'ul',
  'attrsList': [],
  'attrsMap': {
    ':class': 'bindCls',
    'class': 'list',
    'v-if': 'isShow'
  },
  'if': 'isShow',
  'ifConditions': [{
    'exp': 'isShow',
    'block': // ul ast element
  }],
  'parent': undefined,
  'plain': false,
  'staticClass': 'list',
  'classBinding': 'bindCls',
  'children': [{
    'type': 1,
    'tag': 'li',
    'attrsList': [{
      'name': '@click',
      'value': 'clickItem(index)'
    }],
    'attrsMap': {
      '@click': 'clickItem(index)',
      'v-for': '(item,index) in data'
     },
    'parent': // ul ast element
    'plain': false,
    'events': {
      'click': {
        'value': 'clickItem(index)'
      }
    },
    'hasBindings': true,
    'for': 'data',
    'alias': 'item',
    'iterator1': 'index',
    'children': [
      'type': 2,
      'expression': '_s(item)+":"+_s(index)'
      'text': '{{item}}:{{index}}',
      'tokens': [
        {'@binding':'item'},
        ':',
        {'@binding':'index'}
      ]
    ]
  }]
}
```