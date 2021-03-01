(window.webpackJsonp=window.webpackJsonp||[]).push([[237],{556:function(t,s,a){"use strict";a.r(s);var n=a(1),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"python基础语法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#python基础语法","aria-hidden":"true"}},[t._v("#")]),t._v(" Python基础语法")]),t._v(" "),a("p",[t._v("Python 与其他语言最大的区别就是，Python 的代码块不使用大括号 {} 来控制类，函数以及其他逻辑判断。python 最具特色的就是用缩进来写模块。")]),t._v(" "),a("h2",{attrs:{id:"_1-数据类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-数据类型","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 数据类型")]),t._v(" "),a("p",[t._v("Python 中的变量赋值不需要类型声明。Python有五个标准的数据类型：")]),t._v(" "),a("ol",[a("li",[t._v("Numbers（数字）")]),t._v(" "),a("li",[t._v("String（字符串）")]),t._v(" "),a("li",[a("code",[t._v("Tuple（元组）")]),t._v("。类似于List，但不能二次赋值，相当于只读列表。eg："),a("code",[t._v("('test1', 'test2')")])]),t._v(" "),a("li",[a("code",[t._v("List（列表）")]),t._v("类似javascript Array类型。eg:"),a("code",[t._v("[1, 2, ,3]")])]),t._v(" "),a("li",[a("code",[t._v("Dictionary（字典）")]),t._v("。类似于javascript的Map类型。eg:"),a("code",[t._v("{a: 1, b: 2}")])])]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("Set(集合)")]),t._v(":属于数据结构，也常用。"),a("code",[t._v('{"apple", "banana", "cherry"}')]),t._v(" or "),a("code",[t._v("set([1, 2, 1, 3])")])])]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#!/usr/bin/python # 指定用什么解释器运行脚本以及解释器所在的位置。一般入口文件设置，使得可以自执行文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# -*- coding: UTF-8 -*- # 用来指定文件编码为utf-8的。有中文时需要加这个")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello, Python!'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("str")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello World!'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("str")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 输出字符串中第三个至第五个之间的字符串")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("list")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'runoob'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("786")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2.23")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'john'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("70.2")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("list")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 输出第二个至第三个元素")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("tuple")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'runoob'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("786")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2.23")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'john'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("70.2")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("tuple")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 输出第二个至第三个的元素")]),t._v("\n\ntinydict "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'name'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'john'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'code'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6734")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dept'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sales'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" tinydict"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'name'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("              "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 输出键为 2 的值")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("Python3.X 源码文件默认使用utf-8编码，所以可以正常解析中文，无需指定 UTF-8 编码。")])]),t._v(" "),a("h2",{attrs:{id:"_2-条件语句"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-条件语句","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 条件语句")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("# 当判断条件为1个值时\nif 判断条件：(注意最后的冒号)\n    执行语句……\nelse：(注意最后的冒号)\n    执行语句……\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("if 判断条件1:(注意最后的冒号)\n    执行语句1……\nelif 判断条件2:\n    执行语句2……\nelif 判断条件3:\n    执行语句3……\nelse:(注意最后的冒号)\n    执行语句4……\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 当判断条件为1个值时")]),t._v("\nflag "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("False")]),t._v("\nname "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'luren'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'python'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("         "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 判断变量否为'python'")]),t._v("\n    flag "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),t._v("          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 条件成立时设置标志为真")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'welcome boss'")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 并输出欢迎信息")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" name              "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 条件不成立时输出变量名称")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 当判断条件为多个值时")]),t._v("\nnum "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("     \n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" num "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 判断num的值")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'boss'")]),t._v("        \n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("elif")]),t._v(" num "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'user'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'roadman'")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 条件均不成立时输出")]),t._v("\n")])])]),a("h2",{attrs:{id:"_3-循环"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-循环","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 循环")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("while 判断条件：\n    执行语句……\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("for iterating_var in sequence:\n   statements(s)\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("fruits "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'banana'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'apple'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mango'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" fruit "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" fruits"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 第二个实例")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'当前水果 :'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fruit\n")])])]),a("blockquote",[a("p",[t._v("for ... in 适用于list/dict/set数据类型")])]),t._v(" "),a("h2",{attrs:{id:"_4-函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 4. 函数")]),t._v(" "),a("h3",{attrs:{id:"_4-1-函数定义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-函数定义","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.1 函数定义")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("printme")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("str")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("str")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("str")]),t._v("\n")])])]),a("h3",{attrs:{id:"_4-2-内置函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-内置函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.2 内置函数")]),t._v(" "),a("ul",[a("li",[t._v("range(number, number)")]),t._v(" "),a("li",[t._v("len(string/list/dict/set)")]),t._v(" "),a("li",[t._v("list(string/dict)")]),t._v(" "),a("li",[t._v("enumerate(string/list/tuple/set)")]),t._v(" "),a("li",[t._v("set(list)")])]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("range")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" i "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 0 1 2 3 4")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("list")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("range")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("len")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("list")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 5")]),t._v("\n")])])]),a("h2",{attrs:{id:"_5-类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-类","aria-hidden":"true"}},[t._v("#")]),t._v(" 5. 类")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Dog")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    shares "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# share variable for each dog")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__init__")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" name\n        self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tricks "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# creates a new empty list for each dog")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("def")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add_trick")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" trick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        self"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tricks"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("append"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("trick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Dog"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Fido'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 实例化")]),t._v("\nd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_trick"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'roll over'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"_6-module模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-module模块","aria-hidden":"true"}},[t._v("#")]),t._v(" 6. module模块")]),t._v(" "),a("p",[a("strong",[t._v("一个py文件就是一个模块")]),t._v("。")]),t._v(" "),a("ol",[a("li",[t._v("import [module]")])]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 导入整个random模块，可以是内置/当前路径")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" random\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 使用 `random` 模块下的 `randint` 方法")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("random"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("randint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("from [module] import [name1, name2, ...]")])]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 从 `random` 模块里导入其中一个方法 `randint`")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" random "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" randint\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 不一样的是，使用 `randint` 的就不需要先写 `random` 了")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("randint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("import [module] as [new_name]")])]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 但这个名字可能跟其他地方有冲突，因此改名成 `rd`")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" random "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" rd\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 使用 `rd` 这个名称取代原本的 `random`")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("rd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("randint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[t._v("from [module] import *")])]),t._v(" "),a("p",[a("code",[t._v("不推荐")]),t._v("，容易造成名稱衝突，降低可讀性和可維護性。")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Import 所有 `random` module 底下的东西")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" random "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 使用 `randint` 的时候也不需要先写 `random`")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("randint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h3",{attrs:{id:"module搜索路径"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#module搜索路径","aria-hidden":"true"}},[t._v("#")]),t._v(" module搜索路径")]),t._v(" "),a("p",[t._v("当你导入一个模块，Python 解析器对模块位置的搜索顺序是：")]),t._v(" "),a("ol",[a("li",[t._v("当前目录")]),t._v(" "),a("li",[t._v("如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录。")]),t._v(" "),a("li",[t._v("如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为/usr/local/lib/python/。")])]),t._v(" "),a("h2",{attrs:{id:"_7-package包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-package包","aria-hidden":"true"}},[t._v("#")]),t._v(" 7. package包")]),t._v(" "),a("p",[t._v("把两个module放在一个新的目录 "),a("code",[t._v("sample_package")]),t._v(",再新增"),a("code",[t._v("__init__.py")]),t._v("(可以是空，但不能没有)，宣称自己是一个package。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("package_runoob\n|-- __init__.py\n|-- runoob1.py\n|-- runoob2.py\n")])])]),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# package_runoob 同级目录下创建 test.py 来调用 package_runoob 包")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 导入包")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" package_runoob"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("runoob1 "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" runoob1\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" package_runoob"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("runoob2 "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" runoob2\n\nrunoob1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nrunoob2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("单个py文件就是一个module；而当多个"),a("code",[t._v("py文件+__init__文件")]),t._v("时，就等于package。")])]),t._v(" "),a("h3",{attrs:{id:"pip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pip","aria-hidden":"true"}},[t._v("#")]),t._v(" pip")]),t._v(" "),a("p",[t._v("pip 是 Python 包管理工具，该工具提供了对Python 包的查找、下载、安装、卸载的功能。")]),t._v(" "),a("p",[t._v("安装pip工具")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" https://bootstrap.pypa.io/get-pip.py -o get-pip.py   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 下载安装脚本")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" python get-pip.py    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 运行安装脚本")]),t._v("\npip --version "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看版本")]),t._v("\npip list "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 列出已安装的包")]),t._v("\npip show -f SomePackage "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看指定包的详细信息")]),t._v("\n")])])]),a("p",[t._v("安装包")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("pip "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" SomePackage              "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 最新版本")]),t._v("\npip "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("SomePackage")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.0")]),t._v(".4       "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 指定版本")]),t._v("\npip "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SomePackage>=1.0.4'")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 最小版本")]),t._v("\n")])])]),a("h2",{attrs:{id:"_8-内置库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-内置库","aria-hidden":"true"}},[t._v("#")]),t._v(" 8. 内置库")]),t._v(" "),a("ul",[a("li",[t._v("os")]),t._v(" "),a("li",[t._v("glob")]),t._v(" "),a("li",[t._v("re 字符串匹配")]),t._v(" "),a("li",[t._v("math")]),t._v(" "),a("li",[t._v("random")]),t._v(" "),a("li",[t._v("datetime")]),t._v(" "),a("li",[t._v("unittest")]),t._v(" "),a("li",[t._v("threading、zipfile")]),t._v(" "),a("li",[t._v("logging")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://docs.python.org/2.7/library/index.html#library-index",target:"_blank",rel:"noopener noreferrer"}},[t._v("其他"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"_9-参考资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_9-参考资料","aria-hidden":"true"}},[t._v("#")]),t._v(" 9. 参考资料")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://docs.python.org/2/tutorial/modules.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Python2 Module Document"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://medium.com/pyladies-taiwan/python-%E7%9A%84-import-%E9%99%B7%E9%98%B1-3538e74f57e3",target:"_blank",rel:"noopener noreferrer"}},[t._v("Python 的 Import 陷阱"),a("OutboundLink")],1)])])])},[],!1,null,null,null);s.default=e.exports}}]);