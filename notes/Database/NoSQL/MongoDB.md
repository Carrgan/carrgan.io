## 安装
### MacOS
- brew本来不能安装
- 这是用于官方MongoDB软件的自定义HomebrewTap
- 使用以下命令在MacOS终端会话中添加自定义Tap:

    `brew tap mongodb/brew`

- 可正常安装

    `brew install mongodb-community@4.2`

如果安装了旧版本报错

    删除后重新安装
    
        `brew untap mongodb/brew && brew tap mongodb/brew`
        `brew install mongodb-community@4.2`

除了二进制文件之外，安装还创建了：
- the configuration file (/usr/local/etc/mongod.conf)
- the log directory path (/usr/local/var/log/mongodb)
- the data directory path (/usr/local/var/mongodb)

## 运行MongoDB社区版
- 要将MongoDB（即mongod进程）作为macOS服务运行，请发出以下命令

    `brew services start mongodb-community@4.2`

- 要将MongoDB 作为后台进程手动运行，请发出以下命令：

    `mongod --config /usr/local/etc/mongod.conf --fork`

两种方法都使用/usr/local/etc/mongod.conf在安装过程中创建的文件。您也可以将自己的MongoDB 配置选项添加到此文件中。

- 要验证MongoDB是否正在运行，请mongod在正在运行的进程中进行搜索

    `ps aux | grep -v grep | grep mongod`


## 维修
- 删除下载的.tgz档案

    `brew untap mongodb/brew && brew tap mongodb/brew`

- 重试安装

    `brew install mongodb-community@4.2`

## MongoDB使用
### 基础命令
- 查看当前的数据库：

    `db`

- 查看所有的数据库：

    `show dbs/show databases`

- 切換数据库：

    `use db_name`

- 删除当前的数据库：

    `db.dropDatabase()`

- 不用手动创建数据库
    -直接添加就会生成数据库了

### 关于集合
集合就是mysql的表了

- 不手动创建集合

    向不存在的集合中第一次加入数据时，集合会被创建出来

- 手动创建结合

    `db.createCollection(name, options)`

    `db.createCollection ("stu")`

    `db.createCollection ("sub", {capped: true, size: 10})`

        - 参数 capped：认值为 false 表示不设置上限，值为 true 表示设置上限
        - 参数 size：当 capped 值为 true 时，需要指定此参数，表示上限大小，当文档达到上限时，会将之前的数据覆盖，单位为字节

- 查看集合：

    `show collections`

- 删除集合：

    `db.集合名称.drop ()`
    
- 更改集合名称
	
   `adminCommand({renameColleciton: "db.col1", to: "db.col2"})


## 数据类型

Object ID：文档 ID （文档将要存入数据库的一个个的字典）
String：字符串，最常用，必须是有效的 UTF-8
Boolean：存储一个布尔值，true 或 false 必须小写
Integer：整数可以是 32 位或 64 位，这取決于服务器
Double：存储浮点值
Arrays：数组或列表，多个值存储到一个键
Object：用于嵌入式的文档，即一个值为一个文档可以储存另一个集合
Nul：存储 Nu 山值
Timestamp：时间戳，表示从 1970-1-1 到现在的总秒数
Date：存储当前日期或时间的 UNX 时间格式

## 注意点

- 创建日期语句如下：参数的格式为 YYYY-MM-DD new Date (2017-12-20)
- 每个文档都有一个属性，为_id，保证每个文档的唯一性
- 可以自己去设置 id 插入文档，如果没有提供，那么 Mongodb 为每个文档提供了一个独特的_id，类型为 objectId
- objectId 是一个 12 字节的十六进制数：
    - 前 4 个字节为当前 时间戳
    - 接下来 3 个字节的 机器 ID
    - 接下来的 2 个字节中 Mongodbe 的服务进程 id    
    - 最后 3 个字节是 简单的增量值


## 插入&保存
### 插入

`db.集合名称.insert(document)`

`db.stu.insert({name: 'gi',gender: 1})`

`db.stu.insert({\_id: "20170101, name: 'gi', gender: 1)`

插入文档时，如果不指定\_id 参数，Mongodb 会为文档分配一个唯一的 ObjectId

### 保存

`db.集合名称.save(document)`

如果文档的 `_id` 已经存在则修改，如果文档的 `_id` 不存在则添加 Mongodb 插入数据

## 对比

- `db.collecion.insert({})` 插入数据，`_id` 存在就报错
- `db.collection.save({})`   插入数据，`_id`


## 查询

`db.集合名称.find({条件文档})`

`db.集合名称.findOne({条件文档})` 查一条

`db.集合名称.find({条件文档}).prett()` 格式化结果



## 更新

**不加`$set:`会变为替换整个**

`db.集合名称.update({<query>, <update>, multi:<boolean>})`

    query：查询条件参数
    update：更新操作符
    multi：可选，默认是 false，表示只更新找到的第一条记录，值为 true 表示把满足条件的文档全部更新        


`db.test1000.update({name: "xiaowang")}, {name: "xiaozhao"})`

    name 为 xiaowan 的数据替换为{name: "xiaozhao"}

`db.test1000.update({name: "xiaowang"}, {$set:{name: "xiaozhao"}})`

    把 name 为 xiaowang 的数据 name 的值更新为 xiaozhang

`db.test1000.update({name: "xiaowang"}, {$set:{name: "xiaozhao"}} ,{multi: true})`

     {multi: true}达到更新多条的目的

注意："multi update only works with \$ operators"

## 删除

`db.集合名称.remove(<query>,{justOne: <boolean>})`

    参数 query：可选，删除的文档的条件
    
    参数 justOne：可选，如果设为 true 或 1, 则只删除一条，默认 false，表示删除多条

## 比较运算符

- 等于：默认是等于判断，没有运算符
- 小于：`$lt` (less than)
- 小于等于：`$ltb` (less than equa）
- 大于：`$gt` (greater than)
- 大于等于：`$gte`
- 不等于：`$ne`

`db.stu.find({age: {$gte: 18}})`

## 范围运算符

使用`$in`, `$nin`判断是否在某个范围内查询

查询年龄为 18、28、38 的学生

`db.stu.find({age: {$in:[18, 28, 38]}})`

## 逻辑运算符

And：在 json 中写多个条件即可
查询年龄大于或等于 18, 并且性别为 true 的学生

`db.stu.find({age: {$gte: 18}}, {gender: true})`

Or: 使用`$or`，值为数组，数组中每个元素为 json
查询年龄大于 18, 或性别为 false 的学生

`db.stu.find({$or: [age: {$gte: 18}, {gender: flase}]})`

查询年龄大于 18 或性别为男生，并且姓名是郭靖

`db.stu.find({$or:[{age: {$gte: 18}},{gender: true}],{name: 'gj'}})`

## 支持正则表达式

使用`//`或`$regex` 编写正则表达式

abc开头，789结尾

`db.products.find({sku: /^abc/})`

`db.products.find ({sku: {$regex: '789$'})`


## Limit 和 skip

- 方法 limit (）：

    用于读取指定数量的文档

    `db.集合名称.find().limit(NUMBER）`

    查询 2 条学生信息

    `db.stu.find().limit(2)`

- 方法 skip (）：

    用于跳过指定数量的文档

    `db.集合名称.find.skip(NUMBER)`

    `db.stu.find().skip(2)`

- 同时使用

    `db.集合名称.find.limit(NUMBER).skip(NUMBER)`

    `db.集合名称.find.skip(NUMBER).limit(NUMBER)` 推荐


## 自定义查询*

使用`$ where` 后面写一个函数，返回满足条件的数据

查询年龄大于 30 的学生
```
db.stu.find ({
   $where: function(){
        return this age > 30;
        }
        })
```

## 投影

在查询到的返回结果中，只选择必要的字段

`db.集合名称.find({}, {字段名称：1, ...]}`

参数为字段与值，值为 1 表示显示，值为 0 不显

特殊：对于_id 列默认是显示的，如果不显示需要明确设置为 0

`db.stu.find({},{_id: 0, name: 1, gender: 1})`

## 排序

方法 sort (），用于对集进行排序

`db.集合名称.find().sort({字段：1})`

参数 1 为升序排列

参数-1 为降序排列

根据性别降序，再根据年龄升序

`db.stu.find().sort({gender: -1, age: 1})`

## 统计个数

方法 count（）用于统计结果集中文档条数

`db.集合名称.find.({条件}).count()`

`db.集合名称.count({条件})`

`db.stu.find.({gender: true}).count()`

`db.stu.count({age: {$gt: 20}, gender: true})`


## 数据的备份和恢复

备份的语法:

  `mongodump -h dbhost -d dbname -o dbdirectory`

      -h: 服务器地址，也可以指定端口号
      -d: 需要备份的数据库名称
      -o: 备份的数据存放位置，此目录中存放着备份出来的数据

在本地只用`-o`就行了

## 数据的恢复

恢复语法：

  `mongorestore -h dbhost -d dbname --dir dbdirectory`

    -h: 服务器地址
    -d: 需要恢复的数据库实例
    --dir: 备份数据所在位置

## 聚合 aggregate

聚合（aggregate）是基于数据处理的聚合管道，每个文档通过一个由多个阶段(stage）组成的管道，可以对每个阶段的管道进行分组、过滤等功能，然后经过一系列的处理，输出相应的结果。

`db.集合名称.aggregate({管道：{表达式}})`

第一阶个`{}`里的内容通过管道传给第二个`{}`使用

## 常用管道
在 mongodbe 中，文档处理完毕后，通过管道进行下一次处理常用管道如下：

  - `$group`：将集合中的文档分组，可用于统计结果
  - `$match`：过滤数据，只输出符合条件的文档
  - `$project`：修改输入文档的结构，如重命名、增加、删除字段、创建计算结果
  - `$sort`：将输入文档排序后输出`{$sort:{age:1}}`
  - `$limit`：限制聚合管道返回的文档数
  - `$skip`：跳过指定数量的文档，并返回余下的文档
  - `$unwind`：将数组类型的字段进行拆分
    ```
    db.t2.insert({_id:1, item:'t-shirt', size: ['S', 'M', 'L']})
    db.t2.insert({_id:2, item:'t-shirt'})

    db.t2.aggregate(
      {
        $unwind: '$size',
        PreserveNullandEmptyArrays: true #防止数据丢失即使有空也会保留
      }
    )

    #结果
    {_id:1, item:'t-shirt', size: 'S'}
    {_id:1, item:'t-shirt', size: 'M'}
    {_id:1, item:'t-shirt', size: 'L'}
    {_id:2, item:'t-shirt'}
    ```

## 表达式

处理输入文档并输出

语法：`表达式：'$列名常用表达式'`

  - `$sum`：计算总和，`$sum:1`表示以一倍计数
  - `$avg`：计算平均值
  - `$min`：获取最小值
  - `$max`：获取最大值
  - `$push`：在结果文档中插入值到一个数组中
  - `$first`：根据资源文档的排序获取第一个文档数据
  - `$last`：根据资源文档的排序获取最后一个文档数据

## `$group`的注意事项

- `$group`对应的字典有几个键，结果中就有几个键
- 每个分组都要有一个独特的分子依据`_id`
- 取不同字段的值需要使用`$`，`{name: $name}`
- 取字典嵌套字典中的值时(取上层字典中的值)`$_id.name`
- 能够同时按照多个键进行分组，对全部键进行分组可以去重
`{$group: {_id: {name: '$name'}, {age: '$age'}}}`
  - 结果:`{_id: {name: '', age: ''}}`

## 聚合实例

```MongoDB
# 按照gender进行分组，获取不同组数据的个数和平均值

db.stu.aggregate(
  {$group: {_id: '$gender', count: {$sum: 1}, avg_age:{$avg: '$age'}}},
  {$project:{gender:'$_id', count:1, avg_age: 1}} # 格式化输出
  )

# 按照hometown进行分组，获取不同组的平均年龄

db.stu.aggregate(
  {$group: {_id:'$hometown', avg_age: {$avg: '$age'}}}
  )

# 使用$group统计整个文档,并计算平均年龄

db.stu.aggregate(
  {$group: {_id:null, count: {$sum:1}, avg_age: {$avg: '$age'}}}
  )

# 选择年龄大于20的或家乡在蒙古或大理的学生的男女数量

db.stu.aggregate{
  {$match: {$or: [{age: {$gt: 20}}, hometown: {$in: ['蒙古','大理']}]}  # 相当于find()
  {$group: {_id: '$gender', count: {$sum:1}}}
  {$project: {gender: '$_id.gender', count:1, _id:0}}
}

# 一下集合有country, province ,userid三个件

db.test.aggregate{
  {$group:{_id:{country: '$country', province: '$province', userid:'$userid'}}}
  {$group:{_id:{country: '$_id.country', province:'$_id.province'},count:{$sum:1}}} # 以country和province进行分组
  {$project:{_id:0, count:1, country:1, province: 1}}
}

# unwind求alex下tag中的数据个数

{username: 'alex', tag: ['C#', 'Java', 'Python' ]}

db.test.aggregate(
  {$match:{username: 'alex'}},
  {$unwind: '$tag'},
  {$group: {_id: null, sum: {$sum:1}}}
  )

```
