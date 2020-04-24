1.创建数据库语法：
create databases 数据库名称

2.选择数据库语法
use 数据库名称

3.显示数据库中所有表语法
show tables;

4.删除数据库语法
drop database 数据库名称


5.创建表语法
create table 表名（
列名1：列的类型
列名2：列的类型
列名3：列的类型

）

6.显示表结构（desc语法）
代码测试：

mysql> desc emp
       -> \g


7.显示创建表的语法
show create table emp；


> mysql:需要在命令行中 ，需要带上‘；’作为结尾。