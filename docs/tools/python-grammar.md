# Python基础语法

Python 与其他语言最大的区别就是，Python 的代码块不使用大括号 {} 来控制类，函数以及其他逻辑判断。python 最具特色的就是用缩进来写模块。

## 1. 数据类型

Python 中的变量赋值不需要类型声明。Python有五个标准的数据类型：
1. Numbers（数字）
1. String（字符串）
1. `Tuple（元组）`。类似于List，但不能二次赋值，相当于只读列表。eg：`('test1', 'test2')`
1. `List（列表）`类似javascript Array类型。eg:` [1, 2, ,3]`
1. `Dictionary（字典）`。类似于javascript的Map类型。eg:`{a: 1, b: 2}`

> `Set(集合)`:属于数据结构，也常用。`{"apple", "banana", "cherry"}` or `set([1, 2, 1, 3])`

``` python
#!/usr/bin/python # 指定用什么解释器运行脚本以及解释器所在的位置。一般入口文件设置，使得可以自执行文件
# -*- coding: UTF-8 -*- # 用来指定文件编码为utf-8的。有中文时需要加这个

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
> Python3.X 源码文件默认使用utf-8编码，所以可以正常解析中文，无需指定 UTF-8 编码。

## 2. 条件语句

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

## 3. 循环

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

> for ... in 适用于list/dict/set数据类型

## 4. 函数

### 4.1 函数定义

``` python
def printme( str ):
   print str
   return str
```

### 4.2 内置函数

* range(number, number)
* len(string/list/dict/set)
* list(string/dict)
* enumerate(string/list/tuple/set)
* set(list)

``` python
for i in range(5): print i # 0 1 2 3 4
list = range(5)
print len(list) # 5
```

## 5. 类

``` python
class Dog:
    shares = [] # share variable for each dog
    def __init__(self, name):
        self.name = name
        self.tricks = []    # creates a new empty list for each dog

    def add_trick(self, trick):
        self.tricks.append(trick)

d = Dog('Fido') # 实例化
d.add_trick('roll over')
```

## 6. module模块

**一个py文件就是一个模块**。

1. import [module]

``` python
# 导入整个random模块，可以是内置/当前路径
import random
# 使用 `random` 模块下的 `randint` 方法
print(random.randint(0, 5))
```

2. from [module] import [name1, name2, ...]
``` python
# 从 `random` 模块里导入其中一个方法 `randint`
from random import randint
# 不一样的是，使用 `randint` 的就不需要先写 `random` 了
print(randint(0, 5))
```

3. import [module] as [new_name]
``` python
# 但这个名字可能跟其他地方有冲突，因此改名成 `rd`
import random as rd
# 使用 `rd` 这个名称取代原本的 `random`
print(rd.randint(0, 5))
```

4. from [module] import *

`不推荐`，容易造成名稱衝突，降低可讀性和可維護性。
``` python
# Import 所有 `random` module 底下的东西
from random import *
# 使用 `randint` 的时候也不需要先写 `random`
print(randint(0, 5))
```

### module搜索路径

当你导入一个模块，Python 解析器对模块位置的搜索顺序是：

1. 当前目录
1. 如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录。
1. 如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为/usr/local/lib/python/。

## 7. package包

把两个module放在一个新的目录 `sample_package`,再新增`__init__.py`(可以是空，但不能没有)，宣称自己是一个package。

```
package_runoob
|-- __init__.py
|-- runoob1.py
|-- runoob2.py
```

``` python
# package_runoob 同级目录下创建 test.py 来调用 package_runoob 包
# 导入包
from package_runoob.runoob1 import runoob1
from package_runoob.runoob2 import runoob2

runoob1()
runoob2()
```

> 单个py文件就是一个module；而当多个`py文件+__init__文件`时，就等于package。

### pip

pip 是 Python 包管理工具，该工具提供了对Python 包的查找、下载、安装、卸载的功能。

安装pip工具

``` bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
sudo python get-pip.py    # 运行安装脚本
pip --version # 查看版本
pip list # 列出已安装的包
pip show -f SomePackage # 查看指定包的详细信息
```

安装包

``` bash
pip install SomePackage              # 最新版本
pip install SomePackage==1.0.4       # 指定版本
pip install 'SomePackage>=1.0.4'     # 最小版本
```

## 8. 内置库
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

## 9. 参考资料

* [Python2 Module Document](https://docs.python.org/2/tutorial/modules.html)
* [Python 的 Import 陷阱](https://medium.com/pyladies-taiwan/python-%E7%9A%84-import-%E9%99%B7%E9%98%B1-3538e74f57e3)