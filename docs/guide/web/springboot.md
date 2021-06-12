# Spring与Sql

## 简介
相信你已经会用`nodejs`启动一个Server服务器，这其实就是一个简单的后端。不过这个是用javascript作为编程语言，但是nodejs存在单线程的问题，当流量过大时很难做到快速响应。nodejs的程序崩溃后需要重启，一般会使用`pm2`作为进程管理工具。

对于较高并发的场景，现代的许多后端应用实际上是使用`Java`语言编写(目前`Golang`也比较流行)，`Spring` 是基于`Java`的后端框架。

+ Spring使用`context`创建和管理应用组件`bean`
+ SpringBoot是Spring框架的扩展

## 前后端分离
+ 前后端分离有利于开发的功能模块化
+ 前后端主要通过api通信，这个api会在开发前指定功能时由前端和后端开发人员定义好

## Django与Flask
基于`python`的后端框架，上手难度较低。

为了提升并发能力，可以用`gunicorn`(UNIX 下的 WSGI HTTP 服务器)来并行多个后端进程。
## 数据库入门
数据库系统可以高效的创建和管理大量数据，
+ 持久存储
+ 编程接口
+ 事务处理

关系型数据库：数据按照关系索引

|id|城市|描述|经纬度|人数|
|-|-|-|-|-|
|0|北京|...|20,20|100000|
|1|上海|...|40,40|50000|

`city`
|大学|所在城市|大学人数|
|-|-|-|
|THU|0|...|
|PKU||0|...|
|SJTU|1|...|

在大学这张表里可以直接通过唯一的id找到城市信息，这就是多对一的关系。日常生活中大多数的数据都是可以用关系数据库描述。
## 结构化查询语言
所有的数据库都支持结构化查询语言(Structured Query Language,SQL),下面的代码展示从city表中查询所有满足人数大于等于80的城市，并按照人数排序返回。
```sql
SELECT * FROM city WHERE 人数 >= 80 ORDER BY 人数;
```

下面是常用sql的cheatsheet,需要注意的是sql的关键词是不区分大小写的，需要分号作为结束(语句均来自postgreSQL官方文档，如果需要更详细的解释可以直接阅读文档)
+ 创建表，删除表，real是单精度类型
```sql
CREATE TABLE weather(city varchar(80), temp_lo int, temp_hi int, prcp real, date date);
DROP TABLE weather;
``` 
+ 增加，查询，修改，删除一行
```sql
INSERT INTO weather VALUES ('San Francisco', 46,50,0.25, '1994-11-27');
COPY weather FROM '你的路径/weather.txt'
```
```sql
SELECT * FROM weather;
SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;
SELECT DISTINCT city FROM weather;

UPDATE weather SET temp_hi = temp_hi-2, temp_lo = temp_lo-2 WHERE date>'1994-11-28';
DELETE FROM weather WHERE city='Hayward';
```
+ 聚集函数,count, sum, avg, max, min, 不能用在WHERE子句中,需要用子查询
```sql
SELECT max(temp_lo) FROM weather;
SELECT city FROM weather WHERE temp_lo = (SELECT max(temp_lo) FROM weather);
SELECT city, max(temp_lo) FROM weather GROUP BY city;
SELECT city, max(temp_lo) FROM weather WHERE city LIKE 'S%' GROUP BY city HAVING max(temp_lo)<40;
```
+ 外键
```sql
CREATE TABLE cities( city varchar(80) primary key, location point);
CREATE TABLE weather( city varchar(80) references cities(city), temp_lo int, temp_hi int, prcp real, date date);
```
+ 视图
+ 事务
+ 窗口函数
+ 继承
+ 类型转换
```sql
CAST(year as INTEGER)
```
如果希望通过http请求在DWF里面直接调用SQL，在`condition`里需要传入,另外对应的字段前默认要加上`plt_`，数据库表上要加入`plt_CUS_`
```javascript
"condition": "nativequery: SELECT plt_cpi FROM plt_CUS_Data;
```
## PostgreSQL

`PostgreSQL`是以加州大学伯克利分校计算机系开发的POSTGRES为基础的对象关系型数据库管理系统。比起其它单机数据库具备超前的功能设计和性能。在我们使用过程中同样可以使用SQL进行查询。

+ 复杂查询
+ 外键
+ 触发器
+ 可更新视图
+ 事务完整性
+ 多版本并发控制

PostgreSQL可以用许多方法扩展，比如通过增加新的：
+ 数据类型
+ 函数
+ 操作符
+ 聚集函数
+ 索引方法
+ 过程语言

+ 创建一个名为`mydb`的数据库
```sql
createdb mydb
```
+ 通过psql访问数据库
```shell
psql mydb
```
可以使用`SQL`进行查询操作

## 参考

[1] Spring 实战

[2] SpringBoot 实战

[3] PostgreSQL官方文档.http://www.postgres.cn/docs/12/intro-whatis.html
