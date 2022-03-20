---
sidebar_label: 生成器
title: 生成器(Generator)
sidebar_position: 4
---

> 生成器函数，使用常规的def语句编写，用`yield`语句一次返回一个结果，在每次结果产生之间**挂起**和恢复它们的状态
> 生成器表达式有"`()`"定义，返回按需产生结果的一个对象，不是创接一个结果列表

```python
def gensquares(N):
	for i in range(N):
		print("Star Gensquares")
		yield i ** 2

gen = gensquares(6)
for i in gen:
	print("Star Gen")
	print(i)
```
```
Star Gensquares
Star Gen
0
Star Gensquares
Star Gen
1
Star Gensquares
Star Gen
4
Star Gensquares
Star Gen
9
Star Gensquares
Star Gen
16
Star Gensquares
Star Gen
25
```


生成器表达式
```python
x = (x ** 2 for x in range(4))
```
生成器可以被任意嵌套深度不限
```python
list(abs(x) for x in(abs(x) for x in (abs(x) for x in (-1, 0 ,1))))
```
>为什么要使用生成器：生成器优化了内存
>一般情况下 map函数的时间效率最高 列表推倒第二 for第三 生成器最慢

**生成器是单遍迭代对象，只能遍历一次（不管是生成器函数还是生成器表达式**
```python
G = (c *4 for c in 'SPAM')
I1 = iter(G)
next(I1) #"SSSS"
I2 = iter(G)
next(I2)   #"PPPP"
```

P601后的高级内容没看
