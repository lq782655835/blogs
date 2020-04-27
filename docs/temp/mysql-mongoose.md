# koa + mysql

更多：https://github.com/lq782655835/koa-mysql-best-experiment/blob/master/koa-sql/README.md

* https://github.com/LFB/nodejs-koa-blog
    * api -> service -> dao -> model
    * jwt：（登录成功：jwt.sign，生成token）（每次带入token校验：obj = jwt.verify(token, secretKey)）
    * validator校验基础帮助库
* https://github.com/wclimb/Koa2-blog/
    * 使用createPool直接传入sql语法执行
    * 权限设计session。 教程：https://www.jianshu.com/p/f3df4ffe3301
* https://github.com/Molunerfinn/vue-koa-demo/blob/master/app.js
    * jwt
* https://github.com/unix/koa-ts
    * ts路由
    * api -> controller -> service -> model


## sequelize
ORM框架，适配多个数据库。

* 查询sql：https://demopark.github.io/sequelize-docs-Zh-CN/core-concepts/model-querying-basics.html
* 外键：https://sequelize.org/v5/manual/associations.html
* 支持直接原生sql查询：https://sequelize.org/v5/manual/raw-queries.html

常用
* findAll({ where: {xxx}})
    * findByPk(id)
    * findOne({ where: {title: 'aProject'} })
* create(model)  // 或者修改model后，save()
* destroy({ where: {xxx} })
* update(model, where: {xxx})

数据类型：https://sequelize.org/v5/manual/data-types.html

## mysql 客户端语法

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

# mongoosejs

官网：https://mongoosejs.com/

express + mongoose案例：https://github.com/lq782655835/node-elm

``` js
// 连接db
import mongoose from 'mongoose';
import config from 'config-lite';
mongoose.connect(config.url, {useMongoClient:true});

const db = mongoose.connection;
export default db

// 创建Model
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	user_name: String,
	password: String,
	id: Number,
	create_time: String,
	admin: {type: String, default: '管理员'},
	status: Number,  //1:普通管理、 2:超级管理员
	avatar: {type: String, default: 'default.jpg'},
	city: String,
})

adminSchema.index({id: 1});

const Admin = mongoose.model('Admin', adminSchema);


export default Admin

// 使用model
import AdminModel from '../../models/admin/admin'

const admin = await AdminModel.findOne({user_name})

await AdminModel.create({
    user_name, 
    password: newpassword, 
    id: admin_id,
    create_time: dtime().format('YYYY-MM-DD HH:mm'),
    admin: adminTip,
    status,
    city: cityInfo.city
})
```