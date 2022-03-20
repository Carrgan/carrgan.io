---
sidebar_position: 11
---

### def get( )
`r = requests.get(url,params=None,**Kwargs)`
给定url和get方法来构造一个向服务器请求资源的Request对象（库内部生成的）
requests.get函数返回的内容存在r里 是一个Response函数 存储返回的所有资源
params:url中的额外参数，字典或字节流格式
\*\*kwargs:12个控制访问的参数
`type(r)`返回r的类型
`r.headers`返回页面的头部信息

***
### Response对象的属性
| 属性 | 说明 |
| --- | --- |
| r.status_code | HTTP请求的返回状，200成功 |
| r.text | HTTP相应内容的字符串形式，即url对应的页面内容 |
| r.encoding | 从HTTP header中猜测的响应内容编码方式 |
| r.apparent_encoding | 从内容中分析出的响应内容编码方式 |
| r.content | HTTP相应内容的二进制形式 |

### Requests库的异常

| 异常 | 说明 |
| --- | --- |
| requests.ConnectionError | 网络链接错误异常，如DNS异常 |
| requests.HTTPError | HTTP错误异常 |
| requests.URLRequired | URL确实异常 |
| requests.TooManyRedirects | 超过最大重定向次数，产生重定向异常 |
| requests.ConnectTimeout | 只是链接远程服务器超时异常 |
| requests.Timeout | 请求URL超时（整个过程），产生超时异常 |

### 抓取网页通用代码框架
```python
import requests
def getHTMLText(url):
	try:
		r = requests.get(url, timeout=3)
		r.raise_for_status()	#如果状态不是200，引发HTTP异常
		r.encoding = r.apparent_encoding
		return r.text
	except:
		return "Error"
if __name__ == "__main__":
	url = "https://www.baidu.com"
	print(getHTMLText(url))
```

### HTTP协议和Requests库方法

| 方法 | 说明 |
| --- | --- |
| requests.request() | 构造一个请求，支撑一下各方法的基础方法 |
| requests.get() | 获取HTML网页的主要方法，对应于HTTP的GET |
| requests.head() | 获取HTML头信息的方法，对应于HTTP的HEAD |
| requests.post() | 向HTML网页提交POST请求的方法，对应于HTTP的POST |
| requests.put() | 向HTML网页提交PUT请求的方法，对应于HTTP的PUT |
| requests.patch() | 向HTML网页提交局部修改请求，对应于HTTP的PATCH |
| requests.delete() | 向HTML网页提交删除请求，对应于HTTP的DELETE |
