---
sidebar_label: 模块
title: 模块
sidebar_position: 5
---
## 模块的简介

### 为什么使用模块

1. 代码重用
2. 系统命名空间的划分
3. 实现共享服务和数据

### Python程序构架

![model-map](/img/python/module_map/Module-map.svg)

## import如何工作

### 导入是运行时一个运算

第一次导入时
1. 找到模块文件
2. 编译成位码
3. 执行模块的代码来创建其所定义的对象

后续调用直接在内存中 拿到定义好的对象就行了

### 如何找到模块文件

1. 找程序的主目录（即入口程序的目录）
2. 找Python的PATH
3. 标准库目录
4. 找任何.pth文件的内容（配置目录文件）

### 导入的文件扩展名问题

1. 找.py源代码文件
2. .pyc 编译后的字节码文件（比较py和pyc的大小和时间戳，如果一样就运行pyc不一样就重新生成pyc）
3. Linux .so Win .dll .pyd 编译好的扩展文件
4. 压缩文件JAVA的类等

## 模块基础
### 模块的使用

*   import 会整体读取一个模块，之后要用`.`才能获取其中的名称（module.def)把另一个文件的对象引用过来
*   而from将从模块中取出或复制特定的方法（直接应用方法）赋值变量名
*   from * 讲整个模块所有方法复制过来
*   导入是个开销很大的操作，每个进程只导入一次
    **模块只导入一次**
```python
import simple
simple.spam # 1
simple.sapm = 5
simple.spam # 5
import simple
simple.spam # 5
```

**导入操作实际上是隐性的赋值操作**
```python
>>>from small import x, y   # 将small里的x, y赋值给当前模块里的同名对象
>>>x = 42      # 只改变当前作用域
>>>y[0] = 42
>>>import samll      # 将整个模块赋值给一个变量名samll变量
>>>small.x
1
>>>small.y       # 列表是引用型的变量，只修改了一个名称
[42, 2]
>>>samll.x = 42    # 这是一个很危险的操作，会改变会修改一的对象，实际修改了另一个文件中的全局变量，同时两个模块中的这一名称会引用同一个修改后的对象
```
### 模块命名空间

模块是变量名的封装，模块就是一个文件，python建立一个模块对象，以包含文件内赋值的所有名称。模块就是命名空间，存在于一个模块内的名称被称为模块对象的属性。

### 文件产生命名空间

* 模块语句会在首次导入的时候执行，即建立空的模块对象，逐一执行文件内的语句
* 顶层的赋值语句会创建模块属性，建立模块对象的属性
* 模块的命名空间能通过`__dict__`&`dir(M)`获取。由导入建立的模块对象是字典
* 模块是一个独立的作用域（局部变量就是全局变量）。模块顶层的名称遵循和函数内名称相同的引用/赋值规则，但局部作用域和全局作用域相同。

### 属性名的点号运算
即属性获取`object.attribute`访问任何拥有属性的对象的属性
点号运算就是表达式，它会返回和对象相关联的属性名的值。l.append会返回和该列表相关联的append方法对象。
x.y在当前作用域中搜索x，然后搜索对象x中的属性y，点号可以多层运算

### 导入和作用域

```python title="moda.py"
X = 88
def f():
    global X
    X = 99
```

```python title="modb.py"
X = 11

import moda
moda.f()
print(X, moda.X)
```
moda.f修改moda的X，moda.f的全局总用语移动式其所在文件，上述运行为 11 99

* 函数绝对无法看见其他函数内的名称，除非物理上属于同一函数内
* 模块程序代码绝对无法看到其他模块内的名称，除非被显示的导入

作用域绝对不会被函数调用或模块导入影响

## 命名空间的嵌套
导入不会使命名空间发生向上的嵌套买单时会发生向下的嵌套

```python title="mod3"
X = 3
```

```python title="mod2"
X = 2
import mod3

print(x, end='')
print(mod3.X)
```

```python title="mod1"
X = 1

import mod2

print(X, end = '')
print(mod2.X, end = '')
print(mod2.mod3.X, end = '')
```

```text title="output"
2 3
1 2 3
```

### 重新加载模块

*   当模块第一次在进程中被导入时，菜价在和执行该模块的代码
*   之后的导入之后使用已加载的模块对象
*   reload函数会强制已加载的模块的代码重新载入并执行。文件中新的代码的赋值语句会在原位置修改现有的模块对象。

**只支持Python模块**

*   reload是一个函数，不是语句
*   reload传入的参数是一个已经存在的模块对象，而不是一个新的名称
*   reload在Python3.x在模块中必须导入才能使用（import module/form imp import reload）
*   reload会在模块当前命名空间内执行模块文件的新代码（会覆盖命名空间）
*   文件中顶层赋值语句会将名称替换成新的值
*   重新加载会影响所有使用import读取了模块的用户程序（import的.号运算会发现取出来的属性变了）
*   重新加载只会对以后使用from的用户程序造成影响（from会使酒用户用的还是之前加载的旧对象）
*   重新加载只适用于单一的模块。除非使用了传递式地应用重新加载的代码工具

## 模块和命名空间

`import` 可以把模块连接起来 每个文件都有自包含的命名空间 只对自己可见 通过import可以让别的模块看见 import语句每个进程会运行<u>一次</u> 生成自己的命名空间
`object.attribute` 使用
`form` 把别的模块中的变量copy过来 可以直接使用 `重复定义变量会被覆盖`
`import/from` 以后更改或者重新导入都不会再一次运行模块

重新加载模块

```python
import imp 
imp.relode(x)
```

`exec(open('x.py').read())`直接从交互页面运行模块文件中保存的代码 就像粘贴一样 `缺点 会覆盖现在正在使用的变量`

## 模块高级话题
### 模块设计概念
*   **最小化模块耦合：全局变量。**除了主动导入的函数和类外，模块应该尽可能独立于其他模块内使用的全局变量。模块唯一应该与外界共享的应该是它使用和创造的工具。
*   **最大化模块内聚：同一目标。**模块内所有组件都有一个共同的目标
*   **模块尽可能不去更改其他模块的变量**

### 模块中的数据隐藏
在名称前加`_`这个变量就不会在from \*导入的时候显示出来，但是仍然能被mod.\_x来访问修改
用`__all__`可以声明一个可以被from \*显示出来的列表，在导入的时候只能显示出列表里声明的变量

### 启用未来语言特性:\_\_future__
`from __future__ import featurename`
作为程序第一行使用
在导入后对\_\_future__使用dir函数可以查看条目，从而实现代码的向前兼容

### 混合使用模式\_\_name__和\_\main__
`__name__`内置属性:
*   如果文件作为顶层程序文件执行，在启动时\_\_name__就会被设置成字符串"\_\_main__"
*   如果文件被导入，\_\_name__就会改设成客户程序所了解的程序名
    常用在模块末尾`if __name__ == '__main':`来测试模块

### 修改模块搜索路径
sys.path是一个列表，python的path存在列表里，可以直接用`append`函数来向里面添加path但是是写到缓存里的，重启程序后失效

### import语句与from语句的as扩展
用as就是将import和from进来的对象名，定义成一个新的对象名
```python
import mod1 as a
a.func()
from mod1 import func as b
b()
```

### 模块即使对象
可以编写程序来管理其他程序，这类管理程序叫做元程序。

### 运行代码字符串
exec会变异一个代码字符串，并且传给Python解释器执行。
```python
modname = 'xxx'
exec('import' + modname)
```
exec的缺点是每次运行必须变异improt语句，可以用compile内置工具便以为字节码提速。

## 递归重载器
P752

## 模块陷阱
*   避免模块名称冲突
*   顶层代码中的次序问题
*   **from复制名称，而不是链接** from过来的变量是直接复制过来的而不是链接导入模块中的那一个
*   from \*会让变量含义模糊化
*   reload不能用做与from导入，而且不能递归reload
*   递归形式的from导入可能无法工作 可能导致死循环

## 模块包
一般情况下含有__init__.py的文件夹就叫模块包，除3.3后

### 在import 语句中列举简单的文件名的地方
`import`
 ```python
import dir1.dir2.mod    #绝对路径，绝对导入 详见相对导入
```
`from语句也是一样`
```python
from dir1.dir2.mod import x
```

### \_\_init__.py文件
包导入语句的每个目录内都必须有__init__.py文件，否则包导入会失败。
目录结构：
`dir0/dir1/dir2/mod.py`
在dir0下的py模块想导入mod.py:
`import dir1.dir2.mod`
必须遵循下列规则：
* dir1和dir2中必须含有一个__init__.py文件
* dir0是容器，不需要__init__.py文件；如果有则会被忽略
* dri0必须列在模块搜索路径的sys.path列表中

dir0必须是自动搜索路径的一部分，可在PYTHONPATH或.pth，或手动修改sys.path

**\_\_init__.py文件可以用作包初始化的钩子，将目录声明成一个python包，替目录生成一个模块命名空间以及在目录导入时实现from *
语句的行为角色。**

*   包的初始化：首次导入某个文件会自动执行__init__.py里面的所有代码
*   模块使用的声明：声明一个路径为python包
*   模块命名空间的初始化
*   form\*语句的行为

## 包的from和import
如果每次都想用dir2下的mod用import在使用的时候必须加上dir1.dir2.mod
这个时候可以直接用from`from dir1.dir1 import mod`这时直接用mod就可以

## 包相对导入
*   相对导入只支持from，import都是绝对导入
*   只支持包内部的导入
*   用于从包自身的内部，包文件导入同一个包中的内容时。
*   可以使用和外部导入相同的完整路径语法
*   使用特殊的语法只支持python3.X

### 以点号开头的导入
*   在from语句中使用以点号开头的模块名，表示导入只相对于外围的包
*   强制相对导入
*   相当于linux里的.号 可以用多个点来表示上级文件夹 不过这里的一个点表示本级

### 不以点号开头的导入
*   在python 2.x中默认是先相对再绝对，在代码第一行加`from __future__import absolute_import`来开启强制绝对导入
*   在开启的2.x和3.x中略过模块相对导入

### 命名空间包
*   是在python 3.3版本以后引入的
*   所有目录必须不包含__init__.py文件
*   导入算法：dir在sys.path中如果找到文件夹dir\spam sapm会被记录下来，命名空间包的创建即刻发生，新的命名空间有__path__属性
    `\ns\dir1\sub\mod1.py` dir1在sys.path中
    `\ns\dir2\sub\mod2.py` dir2在sys.path中
    都不含有__init__.py文件
```python
import sub
sub  # module 'sub' (namespace)
sub.__path__    # \ns\dir1\sub\,\ns\dir2\sub
from sub import mod1
import sub.mod2
mod1
sub.mod2
```
*更多详见python学习手册24章*
