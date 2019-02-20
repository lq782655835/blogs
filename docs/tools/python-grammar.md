# Python语法

Python 与其他语言最大的区别就是，Python 的代码块不使用大括号 {} 来控制类，函数以及其他逻辑判断。python 最具特色的就是用缩进来写模块。

## 数据类型
Python 中的变量赋值不需要类型声明。Python有五个标准的数据类型：
* Numbers（数字）
* String（字符串）
* List（列表）
* Tuple（元组）。类似于List，但不能二次赋值，相当于只读列表
* Dictionary（字典）。类似于javascript的Map类型

``` python
print 'Hello, Python!'

str = 'Hello World!'
print str[2:5]      # 输出字符串中第三个至第五个之间的字符串

list = [ 'runoob', 786 , 2.23, 'john', 70.2 ]
print list[1:3]          # 输出第二个至第三个元素

tuple = ( 'runoob', 786 , 2.23, 'john', 70.2 )
print tuple[1:3]          # 输出第二个至第三个的元素

tinydict = {'name': 'john','code':6734, 'dept': 'sales'}
print tinydict['name']              # 输出键为 2 的值
```
## 条件语句

```
# 当判断条件为1个值时
if 判断条件：(注意最后的冒号)
    执行语句……
else：(注意最后的冒号)
    执行语句……
```

```
if 判断条件1:(注意最后的冒号)
    执行语句1……
elif 判断条件2:
    执行语句2……
elif 判断条件3:
    执行语句3……
else:(注意最后的冒号)
    执行语句4……
```

``` python
# 当判断条件为1个值时
flag = False
name = 'luren'
if name == 'python':         # 判断变量否为'python'
    flag = True          # 条件成立时设置标志为真
    print 'welcome boss'    # 并输出欢迎信息
else:
    print name              # 条件不成立时输出变量名称

# 当判断条件为多个值时
num = 5     
if num == 3:            # 判断num的值
    print 'boss'        
elif num == 2:
    print 'user'
else:
    print 'roadman'     # 条件均不成立时输出
```

## 循环

```
while 判断条件：
    执行语句……
```

```
for iterating_var in sequence:
   statements(s)
```

``` python
fruits = ['banana', 'apple',  'mango']
for fruit in fruits:        # 第二个实例
   print '当前水果 :', fruit
```

## 内置函数

* range(number, number)
* len(list)

``` python
for i in range(5): print i # 0 1 2 3 4
list = range(5)
print len(list) # 5
```

## 内置库
* os
* glob
* re 字符串匹配
* math
* random
* datetime
* unittest
* threading、zipfile
* logging
* [其他](https://docs.python.org/2.7/library/index.html#library-index)