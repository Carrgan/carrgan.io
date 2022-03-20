---
sidebar_label: 其他
title: 其他
---

## 递归函数
```python
def mysum(L):
    if not L:
        return 0
    else:
        return L[0] + mysum(L[1:])


def mysum2(L):
    return 0 if not L else L(0) + mysum2(L[1:])


def mysum3(L):
    return L(0) if len(L) == 1 else L[0] + mysum3(L[1:])


def mysum4(L):
    frist, *rest = L
    return frist if not rest else frist + mysum4(rest)


def s(L):   # 间接递归
    if not L:
        return 0
    return nonempty(L)


def nonempty(L):
    return L(0) + s(L[1:])
```

```python
> list.extend()方法在末尾添加一个列表
> items[:0] = list 在开头添加一个列表
> isinstance(x, list) 判断x是否为一个list
> {key: 3}[key] key提前赋值 来索引

```
## Map
```python
res = [1, 2, 3]
list(map((lambda x: x + 2), res))
3, 4, 5
```
## filter 对于一个测试函数选择可迭代对象
```python
list(filter((lambda x: x > 0), range(-5, 5)))
```
## 合并可迭代对象中的元素 reduce
```python
reduce((lambda x, y: x + y),[1, 2, 3, 4])
10
reduce((lambda x, y: x * y),[1, 2, 3, 4])
24
```

reduce将当前的和或乘积以及列表中的下一个元素传递给lambda函数
