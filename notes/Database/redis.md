# Redis

## Start Server

1. Find redis server
   `where redis-server`

2. Start Server

   `./redis-server &`

## keys

1. 查看所有件
`keys *`
2. 删除key
`del [key]`


## String
1. insert String
`set [key] [value]
`
2. get String
`get [key]
`
3. Set expiration time
`set [key] [value] EX [timeout/s]
set [key] [timeout/s] [value]`

4. Show expiration time
`ttl [ket]`

5. Rework expiration time
`expire [key] [timeout/s]`

6. Show all keys
`keys *
`

## list

1. Add element to the left of the list
`lpush [key] [value]`
> Insert the value into the header of the list 'key', if key does not exist, an empty list will be created and the `lpush` will be performed. When key exist but is not a list type, an error returned.  

2. Add element to the right of the list
`rpush [key] [value]`
> Insert the value into the tail of the list 'key', if key does not exist,
 an empty list will be created and the `rpush` will be performed, When key exist but is not a list type, an error returned.

3. Show element of the list
`lrange [key] [start] [stop]`
> starting from 0 and ending with -1

4. Pop elements of the list
`rpop [key]` and `rpop [key]`

5. Delete element of the list
`lrem [key] [count] [value]`

  > - count > 0: Start form the head to the end of the table, remove the elements equal to 'value', the number of 'count'.
  > - count < 0: Start from the end to the head of the table, remove the elements equal to 'value', the number if 'count'.
  > - count = 0, Remove all values equal to 'value' from the table.

6. Capped lists
`ltrim [key] [start] [end]`

7. Index element of the list
`lindex [key] [index]`

8. Get the number if elements in  the list
`llen [key]`

## Set
No duplicate objects

1. Add members of the Set
`sadd [set] [value]`

2. Show members of the Set
`smembers [set]`

3. Remove members of the Set
`scrm set [member]`

4. Show All members of the Set
`scard set`

5. Intersection
`sinter [set1] [set2]`

6. Union
`sunion [set1] [set2]`

7. Complement
`sdiff [set1] [set2]`

# Sorted Set
1. insert
`zadd [key] [num]`

2. 删除并返回排序集中得分最高的成员
`zpopmax [key] [count]`

3. 删除并返回排序集中得分最低的成员
`zpopmin [key] [count]`

4. 获取序列中的成员书
`zcard [key]`

5. 在给定值内的分数中对排序集中的成员进行计数
`zcount [key] [min] [max]`

6. 取出排序的几个`(`是包含
`zrangebyscore test (99 100 limit 0 100`


# Hash
1. Add a new values
`hset [key] [field] [value]`
> 将哈希表 key 中的域 field 的值设为 value
如果 key 不存在，一个新的哈希表被创建并进行 HSET 操作。如果域 f1e1d 已经存在于哈希表中，旧值
将被覆盖。

2. 获取哈希中的 field 对应的值
`hget [key] [field]`

3. 删除 Field 中的某个 field:
`hdel  [key] [field]`

4. 获取某个哈希中所有的 field 和 value:
`hgetall [key]`

5. 获取某个哈希中所有的 field:
`hkeys [key]`

6. 获取某个哈希中所有的值:
`hvals [key]`

7. 判断哈希中是否存在某个field:
`hexists [key] [field]`

8. 获取哈希中总共的键值对:
`hlen [field]`
