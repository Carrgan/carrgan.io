---
sidebar_label: OPP 宏伟蓝图
title: OPP 宏伟蓝图
sidebar_position: 6
---

## 简述OPP

* **类** （class）用来描述具有相同属性的方法的对象集合。*定义集合中每个每个对象共有的属性和方法，对象是类的实例*
* **方法** 类中定义的函数
* **类变量** 类彼变量在整个实例化的对象中是公用的。类变量定义在类中且在函数体之外。类变量不作为实例对象的使用。
* **数据成员** 类变量或实例变量用于处理类及其实例对象的相关数据。
* **方法重写** 父类继承的方法不能满足子类的需求，可以对其进行改写，这个过程叫方法的覆盖（override），也叫方法重写。
* **局部变量** 定义在方法中的变量，也作用于当前实例的类
* **继承** 一个派生类（derived class）继承基类（base class）的字段和方法。继承也允许把一个派生类的对象作为一个基类对象对待。例如，有这样一个设计：一个Dog类型的对象派生自Animal类，这是模拟"是一个（is-a）"关系（例图，Dog是一个Animal）。
* **实例化** 创建一个类的实例，类的具体对象。
* **对象** 通过类定义的数据结构实例。对象包括类对象实例变量和方法。

### 为何使用类？

类可以简单比喻成函数的包，类是一种定义新种类东西的方式。

### 继承

将共有的属性归成一类创建一个类，子类只用继承他的夫类就能将父类的代码重用。

### 组合

类支持组合，像机器人由马达，手臂等东西组成，可以分别创造它们的类并定义自己的行为以及关系，最后组合起来形成一个机器人实例。

### 多重实例

类是产生对象的工厂，调用类产生独立命名空间的新对象，它们能读取对象的属性拥有自己的命名空间来储存数据。

### 通过继承进行定制

可以在类的外部编写子类，重新定义其属性进而扩充类。

### 运算符重载

通过提供特定的协议方法，类可以定义对象来响应在内置类型上的一些运算。

## 概括OOP

OOP是经验，不是技术

### 类性继承搜索

>object.attribute(属性)
>
>class产生的对象使用这种方法时，表达式会搜索对象连接的类树。
>
>找出attribute首次出现的地方，先搜索object，然后是该对象之上的所有类，由下到上，由左到右。

### 类树

![class-map](/img/python/class/class_map.svg)

*   I1.x和I2.x两者会在C1中找到X并停止搜索，C1比C2低
*   I1.y和I2.y两者会在C1中找到y
*   I1.z和I2.z两者会在C2中找到z，C2比C3靠左
*   I1.name会找到I1中的name完全不用爬树

### 类和实例
>* 类：实例的工厂
>* 实例：具体元素，实例的属性记录了每个实例自己的数据

### slef
I2.w引用是一个函数调用，‘调用C3.w函数来处理I2’ python会自动将I2.w()调用映射为 c3.w(I2)，同时传入该实例作为继承的函数的第一位参数

* 属性是在class语句的顶层语句块中通过赋值语句添加到类中
* 属性通常是通过对特殊的称为self的第一位参数的赋值，来附加给实例的，而这个self参数也被传入类中编写的方法函数
* self就是传输自身告诉类要修改哪一个实例的属性的

```python
class C1(C2, C3):
    def setname(self, who):
        self.name = who
I1 = C1()
I1.setname('bob')
```

### 运算符重载

直道setname方法调用前，C1类都不会把name属性附加到实例上。调用I1.setname之前引用I1.name会产生为定义错误。
 ```python
def __init__(self, who):
    self.name = who
```
`__init__`是构造方法每次实例创建的时候都会自动调用 构造方法
新的实例和往常一样 传入__init__的self参数

### 多态

* 多态是指运算的意义取决于运算的对象。
* 子类重写父类的方法会覆盖父类中的方法


## 类代码编写基础

类名以一个大写字母开头
> 想要扩展类的方法最坏是调用父类的方法 再重写
 
创建一个类并定义两个方法

```python
class FirstClass:
    def setdata(self, value):
        self.data = value
    def display(self):
        print(self.data)
```

创建两个实例，两个实例拥有自己独立的命名空间

```python
x = FirstClass()
y = FirstClass()
```

两个实例一开始是空的，但是被连接到创建它们的类。对实例以及类对象内的属性名称做点号运算，python会通过继承搜索（爬树）访问类中的名称（setdata）

```python
x.setdata('King Arthur')
y.setdata(3.14159)
```

x,y本身没有setdata属性，它们向上找了它们的类

**在FirstClass的setdata函数中，传入的值会被赋给self.data。在方法中，self会自动引用当前处理的实例(x,y),赋值语句会把data出存在实例各自的命名空间里，self.data**

可以通过`x.data = 'New Value'`来直接赋值x的data值

可以通过`x.anothername = 'spam'`来给实例命名空间中新建一个属性

### 类通过继承进行定制
```python
class SecondClass(FirstClass):
    def display(self):
        print('新的值覆盖父类的display方法 依然能访问父类中的data "%s"' % self.data)
```

### 类是模块内的属性

```python title="food.py"
var = 1
def func(): pass
class Spam: pass
class Ham: pass
class Food: pass
```

想再别的模块内访问food里面的类，必须通过模块

```python title="other.py"
import food
x = food.Spam()
x = food.Food()
from food import Food as F
x = F()
y = F()
```

### 类可以截获Python运算符（运算符重载）

*   以双下划线命名的方法是特殊钩子，用特殊命名方法拦截运算
*   当实例出现在内置运算中时，这类方法会自动被调用 例如‘__add__’方法出现在+表达式内时，该放回会被调用，返回值作为表达式的结果被返回
*   新式类有一些默认的运算符重载方法，但是不属于常见运算。

### 三个实例
*   \_\_init__会在创建新的实例时被调用
*   \_\_add__会在+运算时被调用
*   \_\_str__会在打印一个对象的时候被调用

```python
class ThirdClass(SecondClass):
    def __init__(self, value):
        self.data = value
    def __add__(self, other):
        return ThirdClass(self.data + other)
    def __str__(self):
        return '[ThirdClass: %s]' % self.data
    def mul(self, other):
        self.data *= other
a = ThirdClass('abc')   # 构造方法运行了
a.display() # display 是SecondClass中的 value = 'abc' 
print(a)    # [ThirdClass: abc] __str__自动运行了
b = a + 'xyz'  # __add__创建了新的实例b
b.display()  # ‘abcxyz’
a.mul(3)
print(a)    # [ThirdClass: abcabcabc]
```

## 世界上最简单的类
```python
class Rec:pass

Rec.name = 'Bob'
Rec.age = 40

print(Rec.name) # Bob

x = Rec()
y = Rec()

x.name, y.name  # Bob,Bob

x.name = 'Sue'

Rec.name, x.name, y.name    # ('Bob', 'Sue', 'Bob')

list(Rec.__dict__.key())    # 显示类对象命名空间的字典 
list(name for name in Rec.__dict__ if not name.startswith('__'))    # ['age', 'name']
list(x.__dict__.key())  # ['name'] 因为x有自己的name属性
list(y.__dict__.key())  # []没有自己的属性

x.__class___    # 查看链接到那个类
Rec.__bases__   # 查看链接的父类 是个元组

def uppername(obj):
    return obj.name.upper() 
    
Rec.method = uppername  # 即使是方法也可以独立创建在类对象外部

y.method    # BOB

```
## Python类代码编写细节

### Class语句

```python
class 类名(超类, ...):
    类的主体
```
类不是声明，是对象的创建者，创建类对象
类的数据就是类的属性，是共享的
方法成员，self是实例对象本身

```python
class Super:
	def method(slef):			# method 方法
		print('in Super.method')
	def delegate(slef):			# delegate 把...托给他人 抽象方法
		slef.action()

class Inheritor(Super):			# inheritor 继承人
	pass

class Replace(Super):
	def method(slef):
		print('in Replace.method')

class Extender(Super):			# extender 扩充器	
	def method(slef):
		print('in Extender.method')
		Super.method(slef)
		print('ending Extender.method')

class Provider(Super):			# provider 提供者
	def action(slef):
		print('in Provider.action')

if __name__ == '__main__':
	for klass in (Inheritor, Replace, Extender):
		print('\n' + klass.__name__ + '...')
		klass().method()
	print('\nProvider....')
	x = Provider()
	x.delegate()
```

``` title="输出"
Inheritor...
in Super.method

Replace...
in Replace.method

Extender...
in Extender.method
in Super.method
ending Extender.method

Provider....
in Provider.action
```
