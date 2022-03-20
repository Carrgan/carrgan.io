---
sidebar_label: 类型提示
title: 类型提示
sidebar_position: 10
---

## 简介

Typing是 python3.5 新增的特性。

功能类似Typescript，在**运行时所有类型提示将被忽略**。

简单来说，是用来给IDE之类的具有类型检查功能的工具，来帮助我们检查逻辑的。

我们可以简单的定义一个函数：

```python
def fibonacci(count: int) -> list:
    pass
```

该函数声明了接受参数count是一个整数，返回值是一个列表。

当你在IDE中调用fibonacci函数时未传入int类型，或者未返回list类型时会做提示。


## 类型别名

你可以为每个类型定义一个别名

```python
ConnectionOptions = dict[str, str]
Address = tuple[str, int]
Server = tuple[Address, ConnectionOptions]

# Server的结构实际上是
Server = tuple[dict[str, str], tuple[str, int]]
```

这样的别名实际上大大简化了我们对复杂结构的构造，结构也更清晰。

我们实际上可以发现：

```python {2}
>>> type(Address)
<class 'types.GenericAlias'>
```

`tuple[str, int]`这样的语法实际是创建了一个`types.GenericAlias`的实例。

```python {2}
>>> isinstance(Address, types.GenericAlias)
True
```

所以在runtime我们实际上不能做类型判断

```python
>>> isinstance(('local', 127.0.0.1), Address)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: isinstance() argument 2 cannot be a parameterized generic
```

## NewType

`NewType()` 辅助函数可创建不同的新类型：

**静态类型**检查器把新类型当作原始类型的子类，这种方式适用于捕捉逻辑错误：

```python
from typing import NewType

UserId = NewType('UserId', int)
some_id = UserId(524313)

def get_user_name(user_id: UserId) -> str:
    ...

# 类型检查
user_a = get_user_name(UserId(42351))

# IDE提示应该传入UserId
user_b = get_user_name(-1)
```

:::caution

UserId 不是一个真的类！

:::

```python
>>> type(UserId)
<class 'function'>
```

实际上UserId是一个立即返回函数，你传入什么值返回什么值。

```python
>>> UserId(123)
123
>>> UserId([])
[]
```

## 可调对象（Callable）

可以事先声明callback函数将被传入什么参数，更清晰的处理callback

```python

from collections.abc import Callable

def async_function(on_success: Callable[Address, ConnectionOptions],
                on_error: Callable[[int, Exception], Message]) -> None:
```

## 泛型（Generic）

抽象类型中不能被确切定义的类型

```python
from typing import TypeVar

T = TypeVar('T')      # 声明泛型

S = TypeVar('S', int, str) # 枚举可能的类型

def first(l: Sequence[T]) -> T:   # Generic function
    return l[0]
```

类中使用泛型

```python
from typing import TypeVar, Generic
from logging import Logger

T = TypeVar('T')

class LoggedVar(Generic[T]):

    """
    继承自Generic的子类中，T是有效的类型。
    """

    def __init__(self, value: T, name: str, logger: Logger) -> None:
        self.name = name
        self.logger = logger
        self.value = value

    def set(self, new: T) -> None:
        self.log('Set ' + repr(self.value))
        self.value = new

    def get(self) -> T:
        self.log('Get ' + repr(self.value))
        return self.value

    def log(self, message: str) -> None:
        self.logger.info('%s: %s', self.name, message)

```

## Any 类型

Any 是一种特殊的类型。静态类型检查器认为所有类型均与 Any 兼容，同样，Any 也与所有类型兼容。

```python
from typing import Any

def func(params: Any) -> int:
    ...

func(1) # 检查通过

func('str') # 检查通过

func([]) # 检查通过
```


