# mongodb base api

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
```