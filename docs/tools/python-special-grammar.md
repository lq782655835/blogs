# Python语法精髓

以下所有实例出自python3官方文档：https://docs.python.org/3/tutorial/index.html

## List

list是一种有序的数据集合

``` python
squares = [1, 4, 9, 16, 25]

# 取值
squares[0]  # indexing returns the item // 1
squares[-1] # 25

# 拷贝新数组
squares[-3:]  # slicing returns a new list // [9, 16, 25]
squares[:] # returns a shallow copy of the list: // [1, 4, 9, 16, 25]

# 连接
squares + [36, 49, 64, 81, 100] # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

squares[0] = 2 # 修改值
squares.append(5)
len(squares)
for fruit in squares:
# 数组特性
squares.pop()/append(var)/reverse()/sort()/insert(index, var)
# 其他
squares.remove(var)/count(var)/index(var)

letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
# replace some values
letters[2:5] = ['C', 'D', 'E']
# now remove them
letters[2:5] = []
# clear the list by replacing all the elements with an empty list
letters[:] = []
```

## if表达式

1. if statement:

``` python
if condition: statement
if condition:
    block
```
2. if expression (introduced in Python 2.5)
``` python
# 类似js三元表达式的变种
expression_if_true if condition else expression_if_false
```

``` python
x = a if b else 0 // 等价于 x = (a if b else 0)，等价于js：x = b ? a : 0
```

## 返回多参数（元祖）

``` python
def foo (a):
    x=a
    y=a*2
    return x,y # 作为元祖返回，可带括号或不带

x,y = foo(50)
```

## 字符串格式化

Python uses C-style string formatting to create new, formatted strings. The "%" operator is used to format a set of variables enclosed in a "tuple" (a fixed size list), together with a format string, which contains normal text together with "argument specifiers", special symbols like "%s" and "%d".

``` python
name = "John"
age = 23
print("%s is %d years old." % (name, age))
```

## 多行语句

1. 可以使用斜杠（ \）将一行的语句分为多行显示.

``` python
total = item_one + \
        item_two + \
        item_three
```

2. 字符串支持多行显示，使用三个引号`"""..."""`或`'''...'''`

``` python
print("""
Usage: thingy [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
""")
```

> 字符串可以使用引号( ' )、双引号( " )、三引号( ''' 或 """ )。三引号可以由多行组成，常用于文档字符串。

## for ... in

for ... in适用于list/dict/set。

dict:
1. items():返回元祖list
1. keys():返回key list
1. values():返回value list
``` python
>>> for item in {'color': 'blue', 'fruit': 'apple'}:
...     print(item)
...
('color', 'blue')
('fruit', 'apple')

# >>> 等价for key, value in a_dict.items():
```

## 推导式

推导式comprehensions（又称解析式），是Python的一种独有特性。推导式是可以从一个数据序列构建另一个新的数据序列的结构体。共有三种推导式，在Python2和3中都有支持：

1. 列表(list)推导式
1. 字典(dict)推导式
1. 集合(set)推导式

### 1. list

基本格式：variable = [out_exp_res for out_exp in input_list if out_exp == 2]

```python
# map:
>>> squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# filter
[x for x in vec if x >= 0]

# 复杂表达式
>>> [(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
# [(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
# 等价于
>>> combs = []
>>> for x in [1,2,3]:
...     for y in [3,1,4]:
...         if x != y:
...             combs.append((x, y))
...
>>> combs
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

### 2. dict

基本格式：{ key_expr: value_expr for value in collection if condition }

``` python
>>> objects = ['blue', 'apple', 'dog']
>>> categories = ['color', 'fruit', 'pet']
>>> a_dict = {key: value for key, value in zip(categories, objects)}
>>> a_dict
{'color': 'blue', 'fruit': 'apple', 'pet': 'dog'}

# Turning Keys Into Values
>>> a_dict = {'one': 1, 'two': 2, 'thee': 3, 'four': 4}
>>> new_dict = {value: key for key, value in a_dict.items()}
>>> new_dict
{1: 'one', 2: 'two', 3: 'thee', 4: 'four'}

# filter
>>> a_dict = {'one': 1, 'two': 2, 'thee': 3, 'four': 4}
>>> new_dict = {k: v for k, v in a_dict.items() if v <= 2}
>>> new_dict
{'one': 1, 'two': 2}

# 以下等价于sum(incomes.values())
>>> incomes = {'apple': 5600.00, 'orange': 3500.00, 'banana': 5000.00}
>>> total_income = sum([value for value in incomes.values()])
>>> total_income
14100.0
```

### 3. set

基本格式：{ expr for value in collection if condition }

``` python
squared = {x**2 for x in [1, 1, 2]}
# Output: set([1, 4])
```

### 4. 区别

* list和set output都是key表达式，但list使用[],set使用{}
* dict和set 都是使用{}，但dict output是key:value表达式，set output是key表达式
