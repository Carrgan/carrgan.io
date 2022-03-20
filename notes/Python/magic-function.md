---
sidebar_label: 运算符重载
title: 运算符重载
sidebar_position: 7
---

* 运算符重载：让类拦截常规python运算
* 类可以重载所有python表达式运算符（+-\*/）
* 类可以重载打印、函数调用、属性点号运算符号运算
* 重载使类实例的行为像内置类型
* 重载是通过提供特殊名称的类方法来实现的

常见运算符重载方法：
```
__init__ 构造器方法
__del__  析构方法
__add__  运算符+
__or__   运算符|（位OR）   
__repr__    交互命令后打印 print打印
__str__     print
__call__    函数调用
__getattr__ 点号运算
__setattr__ 属性赋值语句
__getitme__ 索引运算
__setitem__ 索引赋值语句
__len__     长度
__cmp__     比较 ==
__lt__      特定的比较 <
__eq__      特定的比较 ==
__radd__    左侧加法
__iadd__    实地（增强的）加法 +=
__iter__    迭代环境
```

![magic-function](/img/python/magic_function/1.jpg)

## `__getitem__` and `__item__`
### `__getitem__`
我们的第一组方法允许你的类模仿一些序列或映射行为。如果一个类定义(或继承)了`__getitem__`的话，**该方法就会自动被调用并进行实例的索引运算**。当实例X出现在X[i]这样的索引运算中时，Python 会调用这个实例继承的`__getitem__`方法，把X作为第一位参数传入，并且将方括号内的索引值传给第二个参数。
```python
>>> class stepper:
...     def __getitem__(self, i):
...         return self.data[i]
...     
>>> x = stepper()
>>> x.data = 'spam'
>>> x[1]
'p'
>>> for item in x:
...     print(item, end = ' ')
...     
s p a m
>>> 'p' in x
True
>>> [c for c in x]
['s', 'p', 'a', 'm']
>>> (a, b, c, d) = x
>>> a, c, d
('s', 'a', 'm')
>>> list(x), tuple(x), ''.join(x)
(['s', 'p', 'a', 'm'], ('s', 'p', 'a', 'm'), 'spam')
```
`__item__`只循环一次
```python
#iters.py
class Squares:
    def __init__ (self,start,stop) :
        self.value = start-1
        self.stop = stop
    def __iter__(self):
        return self
    def next(self) :
        if self.value - self. stop:
            raise StopIteration
        self.value+= 1
        return self.value**2
        
for i in Squares(1,5):
    print(i, end = '')
```

## `__setattr__` and `__getattr__`
利用`__setattr__`实现函数的私有赋值，`__getattr__`似有访问 是最好的方式

```python
class PrivateExc(Exception): pass

class Privacy:
    def __setattr__(self, attrname, vlaue):
        if attrname in self.privates:
            raise PrivateExc(attrname, self)
        else:
            self.__dict__[attrname] = value
            
class Test1(Privacy):
    privates = ['age']
    def __init__(self):
        self.__dict__['name'] = 'Tom' 
```
