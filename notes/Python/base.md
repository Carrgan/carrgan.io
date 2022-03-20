---
sidebar_label: Python基础
title: Python基础
sidebar_position: 1
---

## 字符串

字符串是不可变的对于经常改变的字符串，用list('str')来转换成列表，用.jion()方法转换回来效率较高`S = ''.jion(S)`其中‘’作为分隔符。
格式化可基于字典
```python
>>>'%(qty)d more %(food)s' % {'qty':1,'food':'spam'}
'1 more spam'
```

格式化方法[]指定字典键，`.`可以引用对象属性
```python
import sys
'My {1[kind]} runs {0.platform}'.format(sys,{'kind':'laptop'})
'My {map[kind]} runs {sys.platform}'format(sys=sys,map={'kind':'laptop'})
```
\*号可以强制在后面说明：
`'%f,%.2f,%.*f'%(1/3.0,1/3.0,4,1/3.0)`===>'0.333333,0.33,0.3333'

format格式化表达：
`'Frist parameter (0:b) b=bit Second parameter (1:s) s=string'.format(11,'Good')`

%号格式化表达用字典键处理关键字、属性引用和二进制类型代码管理
`'My %(kind)s runs %(platfrom)s' % {'kind':'laptop','platfrom':sys.platfrom}`

## 浮点数

浮点数因为计算机硬件的限制 出现`1.1+2.2=3.300000003` 故`1.1+2.2==3.3`Flase `int(1.1+2.2)==3`True

// Floor division / ture division
截断除法python3 `5//2=2 -5//2=-3 5/2=2.5 -5/2=-2.5`

如果想趋向于0截断可以把python的结果传给`math.trunc` `math.trunc(5/-2) = -2` `math.trunc(5/float(-2)) = -2`

`eval`函数可以吧字符串当做python代码来使用

`form decimal import Decimal` 导入小数对象 小数对象不会想浮点数一样丢失精确度 0.1+0.1+0.1-0.3 在浮点数运算中不等于0 在`Decimal(0.1)+Decimal(0.1)+Decimal(0.1)-Decimal(0.3)`是等于0的 如果运算的小数精确度不一致python会自动转换到小数位最多的精确度


## 小数
with语句：可以在with中短暂的设定精确度 with结束 精确度恢复
```python
import decimal
decimal.Decimal('1.00') / decimal.Decimal('3.00') #Decimal('0.33333333333')
with decimal.localcontext() as ctx:
    ctx.prec = 2
    decimal.Decimal('1.00') / decimal.Decimal('3.00')   #Decimal('0.33')
decimal.Decimal('1.00') / decimal.Decimal('3.00') #Decimal('0.33333333333')
```

## 分数
look like decimal `from fractions import Fraction`----`x = Fraction(3/2)`----`print(X)`==>2/3
详见📚

## 集合（set）
集合：无序，一个元素只能存在一次，不管这个元素被添加多少次集合里只会存在一个，支持所有数学集合操作，可迭代。
集合中只能包含可哈希化的对象（不可变的）list and dictionary 不能嵌入到集合中 元组是一个很好的选择
frozenset可以创建一个可以嵌套入集合的集合
集合推倒表诗式`{x for x in 'spam'}`可以推导出一个集合`{'s','p,'a','m'}`
**集合可以比排序可以以更小的开销比较忽略顺序的结果**
```python
L1,L2 = [1,2,3,4,5],[2,4,3,1,5]
L1 == L2    #False
set(L1) == set(L2)  #True
sorted(L1) == sorted (L2)   #True   sorted（排序）
```


## 列表与字典

python3中数字比字母小 不支持混合sort 需要进行要设置 `key=func` 注意`reverse=True`可以将排排序换成由大到小。

`list.sort()`会改变原来的列表 用`sorted(list)`就不会改变换来的数组。

`reverse()`可以原位置反转列表，同样有一个`reversed()`可以返回一个新的对象，保留原来的对象。

`dict.get('key',defaule)'`get可以让访问不存在的键时不会出错 返回一个默认值

`for x in dictionary`会遍利字典中的每一个key 等同于`for x in dictionary.keys()`

通过值搜索键`[key for(key,value) in table.items() if value == v`===>items返回key and value对应的元组 v 表示要搜索的值`[key for key in table.keys() if table[key] == v`

python 3.x字典中`dictionaty.keys() or dictionry.value()`返回的值是一个字典是图对象 ，他们是可迭代的，用list可以把他们装起来，直接看的话就像`dict.keys([1,2,3])``list(dict.keys())`====>[1,2,3],字典视图是动态的，改变字典的键以后是图也会发生改变。字典是图类似于集合，支持交并补集。

优雅的合并两个字典：
```python
z = {**x, **y}
z = x.copy()
z.update(y)
```

## 元组与文件
namedtuple工具，可以提供一个通过键和序列都可引导的元组
```python
from collections import namedtuple
Rec = namedtuple('Rec', ['name', 'age', 'jobs'])
bob = Rec('Bob', age = 40.5, jobs = ['dev', 'mgr'])
bob[0], bob[2]
bob.name, bob.jobs
```

pickle模块可以将对象写入文件中并且需要的时候将对象读取出来
```python
import pickle
d = {'a': 32, 'b': 17}
f = open('a.pk1', 'wb')
pickle.dump(d, f)
f.close()
f = open('a.pk1', 'rb')
a = pickle.load(f)
```
Json格式储存python对象
```python
rec = dict(name = {'frist':'Bob', 'last':'Smith'}, job = ['dev', 'mgr'], age = '40.5')
import json
json.dumps(rec)
S = json.dumps(rec)
O = json.loads(S)
O == rec
```
存入文件之前是python对象，存入文件之后是Json，读取重构成python对象：
```python
json.dump(rec, fp = open('testjson.txt', 'w'),indent = 4)
print(open('testjson.txt').read()
P = json.load(open('testjson.txt'))
P
```

python对象于XML对象的转换是依赖于CVS模块

struct模块能够构造并解析打包二进制数据，能够把文件中的数据字符串转换成二进制

## 赋值操作符

python中可以用
`a, b = 'c', 'd'`来附值会把cd生成一个元组 然后附值给ab 附值的两边必须是相等的可嵌套
`(a, b), c = ('d', 'e'), 'f'`
`a, *b = 'c', 'd','e'`带有\*号的项会生成一个列表，如果没有不会出错会形成一个空列表
`+=`可以最优话程序运行在对列表操作的时候他不完全等于两项相加而是相当于`extend`（原位置修改）

## for/while/zip/map
zip可以对列表进行解包操作
```python
L1 = (1, 2, 3, 4)
L2 = (5, 6, 7, 8)
zip(L1,L2)  #<zip object>
list(zip(L1, L2))   #[(1, 5), (2, 6), (3, 7), (4, 8)]
for (x, y) in zip(L1, L2):
    print(x, y, '--', x+y)
D3 = dict(zip(L1, L2))
{k: v for (k, v) in zip(L1, L2)}


S = 'spam'
for (offset, item) in enumerate(S):         #enumerate会免费赠送一个便宜量，支持可迭代协议
    print(item, 'appears at offset', offset)
```

## 可迭代对象

任何具备可迭代属性的对象具有一个__next__方法，迭代就调用该方法

for循环在开始时，会首先把可迭代对象传入内置函数iter，并由此拿到一个迭代器；iter调用返回的迭代器对象有所需的next方法，iter的next不是__next__他调用了iter内部的next

迭代器对象是临时的

```python
for line in open('script2.py'):
    print(line.upper(),end='')  #会把每一行都读进来
    
f = open('script2.py')
next(f)
next(f)
```


文件自身就是迭代器，列表不是支持多次迭代

```python
f = open('1.file')
iter(f) is f    #true

L = [1, 2, 3]
iter(L) is L    #False
L.__next__()    #Error
I = iter(L)
I.__next__()
next(I)
```

在新版本中字典自带一个迭代器，不用调用.keys()可直接支持迭代

os.popen()终端交互 返回的结果也是可以迭代的

```python
lines = [line.rstrip() for line in lines]   #把每一行都去除换行符
lines = [line.rstrip() for line in open('123.file')]
```

## 动态类型

变量永远不会拥有任何和它关联的类型信息或约束，类型的概念存在于对象而不是变量中， 当一个变量出现在表达式中，他会立马被当前所引用的变量所代替。
变量名和数值（对象）是被分开储存的，变量实际上是对象没存空间的一个指针，从变量到对象的连接叫引用，引用是一种关系，通过内存中的指针实现。
那个对象都包含了（type designation）类型标识符 引用计数器（reference counter)决定何时回收这个对象。
列表、字典、集合、class创建的对象 都会在原内存地址被改变 如果不希望 就复制他们
