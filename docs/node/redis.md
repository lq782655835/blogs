# Redis简介

Redis是一个高性能的key-value数据库。Redis有以下特点：
* 性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s
* 不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储
* 支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用

**Redis像mysql、mongodb数据库一样，你需要安装它的环境，它有自己的语法；如果要使用java等后端语言对接，需要安装对应驱动包。**

## 常用语法

* String
    * SET key value
    * GET key
* Hash
    * HGET key field
    * HSET key field value
    * HDEL key field1 [field2]
    * HEXISTS key field
* List
    * LPUSH key value1 [value2] 将一个或多个值插入到列表头部
    * LLEN key 获取列表长度
    * LPOP key 移出并获取列表的第一个元素
    * RPOP key 移除列表的最后一个元素，返回值为移除的元素。
    * LRANGE key start stop 获取列表指定范围内的元素
* Set
    * SADD key member1 [member2] 向集合添加一个或多个成员
    * SMEMBERS key 返回集合中的所有成员
* sorted set
    * ZADD key score1 member1 [score2 member2] 向有序集合添加一个或多个成员，或者更新已存在成员的分数
    * 	ZCARD key 获取有序集合的成员数
