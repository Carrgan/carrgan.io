---
sidebar_label: 命名空间
title: 命名空间
sidebar_position: 2
---
## 一个简单的例子了解

```python
# File manynams.py
x = 1

def f():
	print(x)

def g():
	x = 22
	print(x)

class C:
	x = 33
	def m(self):
		x = 44
		self.x = 55

if __name__ == '__main__':
	print(x)	# 11 module
	f()			# 11 global
	g()			# 22 local
	print(x)	# 11 module

	obj = C()	
	print(obj.x)	# 33 类名由实例继承
	
	obj.m()
	print(obj.x)	# 55
	print(C.x)		# 33

	# print(C.m.x)	# FAILS:only visible in method
	# print(g.x)	# FAILS:only visible in function

```

每个模块，对象都有自己的命名空间，类函数也如此
