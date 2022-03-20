---
sidebar_label: 何时使用Logging
title: 何时使用Logging
sidebar_position: 9
---

| 你想要执行的任务 | 此任务最好的工具 |
| --- | --- |
| 对于命令行或程序的应用，结果显示在控制台 | print() |
| 对程序普通操作发生时提交事件报告 | logging.info()函数，当有诊断目的需要详细输出信息时使用 logging.debug() 函数) |
| 提出一个警告信息基于一个特殊的运行时事件 | warnings.warn() 位于代码库中，该事件是可以避免的，需要修改客户端应用以消除告警，logging.warning() 不需要修改客户端应用，但是该事件还是需要引起关注 |
| 对一个特殊的运行时事件报告错误 | 引发异常 |
| 报告错误而不引发异常(如在长时间运行中的服务端进程的错误处理) | logging.error(), logging.exception() 或 logging.critical() 分别适用于特定的错误及应用领域 |


| 级别 | 何时使用 |
| --- | --- |
| DEBUG | 细节信息，仅当诊断问题时适用 |
| INFO | 确认程序按预期运行 |
| WARNING | 表明有已经或即将发生的意外（例如：磁盘空间不足）。程序仍按预期进行 |
| ERROR | 由于严重的问题，程序的某些功能已经不能正常执行 |
| CRITICAL | 严重的错误，表明程序已不能继续执行 |

## 记录日志到文件
```python
import logging

"""
logging.basicConfig函数各参数:
filename: 指定日志文件名
filemode: 和file函数意义相同，指定日志文件的打开模式，'w'或'a'
format: 指定输出的格式和内容，format可以输出很多有用信息，如上例所示:
 %(levelno)s: 打印日志级别的数值
 %(levelname)s: 打印日志级别名称
 %(pathname)s: 打印当前执行程序的路径，其实就是sys.argv[0]
 %(filename)s: 打印当前执行程序名
 %(funcName)s: 打印日志的当前函数
 %(lineno)d: 打印日志的当前行号
 %(asctime)s: 打印日志的时间
 %(thread)d: 打印线程ID
 %(threadName)s: 打印线程名称
 %(process)d: 打印进程ID
 %(message)s: 打印日志信息
datefmt: 指定时间格式，同time.strftime()
level: 设置日志级别，默认为logging.WARNING
stream: 指定将日志的输出流，可以指定输出到sys.stderr,sys.stdout或者文件，默认输出到sys.stderr，当stream和filename同时指定时，stream被忽略
"""
logger = logging.getLogger(__name__)    # 如果在包里面可以显示具体位置
logging.basicConfig(level=logging.DEBUG,
                    format='%(levelname)s %(asctime)s %(threadName)s  %(funcName)s  %(filename)s[line:%(lineno)d] %('
                           'message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S',
                    #    filename=logfile_path,
                    filemode='w')
```


‘r’	只读模式，如果文件不存在，返回异常FileNotFoundError,默认值
‘w’	覆盖写模式,文件不存在则创建，存在则完全覆盖
‘x’	创建写模式,文件不存在则创建，存在则返回异常FileExistsError
‘a’	追加写模式,文件不存在则创建，存在则在文件最后追加内容
‘b’	二进制文件模式
‘t’	文本文件模式,默认值
‘+’	与r/w/x/a 一同使用，在原功能基础上增加同时读写功能



- 普通项目中
- import logging
- logging.BasicConfig(...) #设置日志输出的样式，格式
- 实例化一个 `1oger = logging.getLogger(__nane__)`
- 在任何 py 文件中调用 logger 即可
