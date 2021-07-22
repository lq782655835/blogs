# MongoDB指南

MongoDB是目前最流行的NoSQL数据库之一。MongoDB和Node.js特别般配，因为MongoDB是基于文档的非关系型数据库，文档是按BSON（JSON的轻量化二进制格式）存储的，增删改查等管理数据库的命令和JavaScript语法很像。

## MongoDB 安装

以下是使用macOS安装方法：

> 来源： https://www.runoob.com/mongodb/mongodb-osx-install.html

1. 下载
```
# 进入 /usr/local
cd /usr/local

# 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.9.tgz

# 解压
sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.9.tgz

# 重命名为 mongodb 目录

sudo mv mongodb-osx-x86_64-4.0.9/ mongodb
```

2. 开通文件权限

```
# 创建日志及数据存放的目录：
# 数据存放路径：
sudo mkdir -p /usr/local/var/mongodb

# 日志文件路径：
sudo mkdir -p /usr/local/var/log/mongodb

# 接下来要确保当前用户对以上两个目录有读写的权限：
sudo chown springleo /usr/local/var/mongodb # springleo是你本机用户
sudo chown springleo /usr/local/var/log/mongodb
```


3. 启动mongodb服务
```
# 安装完成后，我们可以把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中：
export PATH=/usr/local/mongodb/bin:$PATH

# 使用以下命令在后台启动 mongodb：
sudo mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log
```

4. 开终端玩sql

```
cd /usr/local/mongodb/bin
./mongo
```

## 概念解析

在mongodb中基本的概念是数据库、集合、文档。下表将帮助更容易理解Mongodb中的一些概念：

| SQL概念 | MongoDB概念 | 解释 |
| ------ | ------ | ------ |
| database | database | 数据库。一致 |
| table | collection | 数据库表 |
| row | document | 数据库表一行 |
| column | field | 数据库表一列 |
| primary key | primary key | 主键。mongodb默认有主键_id |
| table joins |  | 表连接。mongodb不支持 |

## Command

* 全局
    * mongo 进入db命令
    * show dbs 显示所有可用dbs
    * db 显示当前db
* 数据库
    * use [dbName] 使用或新建数据库
    * db.dropDatabase() 删除当前数据库
    * show collections 显示当前数据库所有集合（表）
    * db.collections.drop() 删除当前数据库所有集合（表）
* 增删改查
    * 增
        * db.[collectionName].insert(object) 数据库插入一行数据
        * db.[collectionName].insertOne(object)<sup>3.2+</sup> 数据库插入一行数据
        * db.[collectionName].insertMany(object)<sup>3.2+</sup> 数据库插入多行数据
        * db.[collectionName].save(object) 指定_id=update(),否则是insert()
    * 更新 db.[collectionName].update(query,update)
    ``` sql
    db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
    ```
    * 删除 db.[collectionName].remove(query,justOne)
    * 查询 db.[collectionName].find(query, projection)
* 条件
    * limit(Number)
    * skip(Number)
    * sort() 可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式
``` sql
db.col.find({}).limit(5).skip(1).sort({"likes":-1})

// 批量删除
db.getCollection('cainiao-pref-statistic').deleteMany({ds: 20210715})

// 查询
db.getCollection('cainiao-pref-statistic').find({ ds: { '$gte': 20210716, '$lte': 20210717 } }).count()
db.getCollection('cainiao-pref-statistic').find({  })

// 更改状态
db.getCollection('cainiao-pref-statistic').find({  }).forEach(function(obj) {
    obj.ds = new NumberInt(obj.ds);
    obj.total = new NumberInt(obj.total);
    db.getCollection('cainiao-pref-statistic').save(obj);
});
```
> 在mongodb中,Collection类似于传统SQL的table；Document类似于SQL中的一行记录row；Field类似于SQL中的一列column。

## [Mongoose](https://github.com/Automattic/mongoose)

Mongoose是在node下对MongoDB进行管理的数据对象模型(ODM)库。它管理着数据结构定义、校验、数据之间的关系，并可以使node数据转换成mongodb数据库数据。

![](https://cdn-images-1.medium.com/max/800/0*b5piDNW1dqlkJWKe.)

``` js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

### Schema

定义document的结构、默认值、校验等。是一种以文件形式存储的数据库模型骨架，`不具备数据库的操作能力`。支持schema.pre('save', ...)钩子函数（当model.save()执行时触发）；支持schema.plugin()以使用自定义插件。

Schema Type支持如下类型：
* Boolean
* Buffer
* Date
* Mixed (A generic / flexible data type)
* Number
* ObjectId
* String

**Schema API**
* Schema.statics.[Statics-Methods] Model中添加静态方法,this指向Model
* Schema.methods.[Methods] Model.prototype中添加方法
* Schema.pre('save/init/remove/validate') 回调钩子。this指向Schema
* Schema.plugin(self-plugin) 应用插件

### Model

Model是Schema的包装，`具有操作数据库的能力`。
* Model：由Schema发布生成的模型，具有抽象属性和行为的数据库操作。
* Model.prototyp(这里可以叫Entity)e: 由Model创建的实体，他的操作也会影响* 数据库。
* 关系：Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。

**Model API**

* Model
    * 增
      * Model.create(documents, callback)
      * Model.insertMany()
    * 查
        * Model.find(conditions, [fields], [options], [callback])
        * Model.findById(id, [fields], [options], [callback])
        * Model.findOne(conditions, [fields], [options], [callback])
        * Model.count(conditions, [callback])
    * 改
        * Model.findByIdAndUpdate(id, document, callback)
        * Model.findOneAndUpdate([conditions], [update], [options], [callback])
    * 删
        * Model.remove(conditions, [callback])
        * Model.findByIdAndRemove(id, [options], [callback])
        * Model.findOneAndRemove(conditions, [options], [callback])
* Model.prototype
    * Model.prototype.save()(callback)
    * Model.prototype.update(query, document, callback)
    * Model.prototype.remove()

> Schema类似于SQL的表的定义；Model是一个高层次的接口

``` js
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test') // 记得先连接到数据库

/** 定义表结构 **/
let emailSchema = new mongoose.Schema({
  email: String,
  date: Date
})
// 回调钩子
emailSchema.pre('save',  function(next) {
    if(!this.date) this.date = new Date() // this指向Schema
    next()
})
// 定义Model静态方法
emailSchema.statics.getLeoRows = function() {
    return this.find({author: 'leo'}) // this指向Model
}

/** 定义操作层 **/
let EmailModel = mongoose.model('Email', emailSchema)

// 静态方法，常用于数据库逻辑
EmailModel.getLeoRows().then(data => console.log(data))

// 新增
let msg = new EmailModel({
  email: 'leo'
})
msg.save().then(doc => console.log(doc))

// 查询
EmailModel.find({ email: 'leo' }).then(doc => console.log(doc))

// 更新
EmailModel.findOneAndUpdate({ email: 'leo' },{ email: 'leoupdate' }.then(doc => console.log(doc))

// 删除
EmailModel.findOneAndRemove({ email: 'leoupdate'}).then(doc => console.log(doc))
```

## 附上Mysql数据库安装

1. 安装mysql：https://dev.mysql.com/doc/refman/8.0/en/osx-installation-pkg.html

2. 命令行操作msql：

``` shell
/usr/local/mysql/bin/mysql -u root -p # 输入root密码后即可进入mysql
# 接下来可操作或设置mysql
mysql> SHOW DATABASES;
mysql> CREATE DATABASE pets;
```

mysql命令入口，MacOS默认地址为：/usr/local/mysql/bin/mysql。所以我们可以更改下终端的Path快捷设置（笔者使用oh my zsh），这样就不用输入路径了：

``` shell
vim ~/.zshrc
export PATH=$HOME/bin:/usr/local/bin:$PATH:/usr/local/mysql/bin # :代表间隔

mysql -u root -p
```


## 参考文章

* [mongoose document](https://mongoosejs.com/docs/connections.html)

* [Introduction to Mongoose for MongoDB](https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57)