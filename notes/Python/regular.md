---
sidebar_label: 正则
title: 正则
sidebar_position: 8
---

## 基础

编译正则成模式对象
```python
P = re.compile(‘ab*')
P = re.compile(‘ab*’, re.IGNORECASE)        #传入一个可选flags参数
```
应用匹配

| 方法/属性 | 目的 |
| --- | --- |
| match() | 只检查正则是否在字符串的开头匹配 |
| search() | 扫描字符串，查找次正则匹配的任何位置 |
| findall() | 找到正则匹配的所有字符串，并将他们作为列表返回 |
| finiter() | 找到正则匹配的所有字符串，并将他们返回成Iterator |

匹配对象获取匹配字符串信息

| 方法 / 属性 | 目的 |
| --- | --- |
| group() | 返回正则匹配的字符串 |
| start() | 返回匹配的开始位置 |
| end() | 返回匹配的结束位置 |
| span() | 返回包含匹配 (start, end) 位置的元组 |

```
>**I
>IGNORECASE**
>执行不区分大小写的匹配；字符类和字面字符串将通过忽略大小写来匹配字母。 例如，[A-Z] 也匹配小写字母。 除非使用 ASCII 标志来禁用非ASCII匹配，否则完全 Unicode 匹配也有效。 当 Unicode 模式 [a-z] 或 [A-Z] 与 IGNORECASE 标志结合使用时，它们将匹配 52 个 ASCII 字母和 4 个额外的非 ASCII 字母：'İ' (U+0130，拉丁大写字母 I，带上面的点)，'ı' (U+0131，拉丁文小写字母无点 i)，'s' (U+017F，拉丁文小写字母长 s) 和'K' (U+212A，开尔文符号)。 Spam 将匹配 'Spam'，'spam'，'spAM' 或 'ſpam' (后者仅在 Unicode 模式下匹配)。 此小写不考虑当前区域设置；如果你还设置了 LOCALE 标志，则将考虑。
>
>**L
>LOCALE**
>使 \w、\W、\b、\B 和大小写敏感匹配依赖于当前区域而不是 Unicode 数据库。
>
>区域设置是 C 库的一个功能，旨在帮助编写考虑到语言差异的程序。例如，如果你正在处理编码的法语文本，那么你希望能够编写 \w+ 来匹配单词，但 \w 只匹配字符类 [A-Za-z] 字节模式；它不会匹配对应于 é 或 ç 的字节。如果你的系统配置正确并且选择了法语区域设置，某些C函数将告诉程序对应于 é 的字节也应该被视为字母。在编译正则表达式时设置 LOCALE 标志将导致生成的编译对象将这些C函数用于 \w；这比较慢，但也可以使 \w+ 匹配你所期望的法语单词。在 Python 3 中不鼓励使用此标志，因为语言环境机制非常不可靠，它一次只处理一个“文化”，它只适用于 8 位语言环境。默认情况下，Python 3 中已经为 Unicode（str）模式启用了 Unicode 匹配，并且它能够处理不同的区域/语言。
>
>**M
>MULTILINE**
>(^ 和 $ 还没有解释；它们将在以下部分介绍 更多元字符。)
>
>通常 ^ 只匹配字符串的开头，而 $ 只匹配字符串的结尾，紧接在字符串末尾的换行符（如果有的话）之前。 当指定了这个标志时，^ 匹配字符串的开头和字符串中每一行的开头，紧跟在每个换行符之后。 类似地，$ 元字符匹配字符串的结尾和每行的结尾（紧接在每个换行符之前）。
>
>**S
>DOTALL**
>使 '.' 特殊字符匹配任何字符，包括换行符；没有这个标志，'.' 将匹配任何字符 除了 换行符。
>
>**A
>ASCII**
>使 \w、\W、\b、\B、\s 和 \S 执行仅 ASCII 匹配而不是完整匹配 Unicode 匹配。 这仅对 Unicode 模式有意义，并且对于字节模式将被忽略。
>
>**X
>VERBOSE**
>此标志允许你编写更易读的正则表达式，方法是为您提供更灵活的格式化方式。 指定此标志后，将忽略正则字符串中的空格，除非空格位于字符类中或前面带有未转义的反斜杠；这使你可以更清楚地组织和缩进正则。 此标志还允许你将注释放在正则中，引擎将忽略该注释；注释标记为 '#' 既不是在字符类中，也不是在未转义的反斜杠之前。

(?P=name)

```


## 简单配对
```python
import re
# matching string
pattern1 = 'cat'
pattern2 = 'bird'
string = 'dog runs to cat'
print(pattern1 in string)
print(pattern2 in string)
```
True
False

## 用正则寻找配对

```python title="regular expression"
pattern1 = "cat"
pattern2 = "bird"
string = "dog runs to cat"
print(re.search(pattern1, string))  # <_sre.SRE_Match object; span=(12, 15), match='cat'>
print(re.search(pattern2, string))  # None
```
```python title="multiple patterns ('run' or 'ran')"

ptn = r"r[au]n"       # start with "r" means raw string
print(re.search(ptn, "dog runs to cat"))    # <_sre.SRE_Match object; span=(4, 7), match='run'>
print(re.search(r"r[A-Z]n", "dog runs to cat"))     # None 没有大写
print(re.search(r"r[a-z]n", "dog runs to cat"))     # <_sre.SRE_Match object; span=(4, 7), match='run'>
print(re.search(r"r[0-9]n", "dog r2ns to cat"))     # <_sre.SRE_Match object; span=(4, 7), match='r2n'>
print(re.search(r"r[0-9a-z]n", "dog runs to cat"))  # <_sre.SRE_Match object; span=(4, 7), match='run'>
```

## 按类型匹配
```python
# \d : decimal digit
print(re.search(r"r\dn", "run r4n"))           # <_sre.SRE_Match object; span=(4, 7), match='r4n'>
# \D : any non-decimal digit
print(re.search(r"r\Dn", "run r4n"))           # <_sre.SRE_Match object; span=(0, 3), match='run'>
# \s : any white space [\t\n\r\f\v]
print(re.search(r"r\sn", "r\nn r4n"))          # <_sre.SRE_Match object; span=(0, 3), match='r\nn'>
# \S : opposite to \s, any non-white space
print(re.search(r"r\Sn", "r\nn r4n"))          # <_sre.SRE_Match object; span=(4, 7), match='r4n'>
# \w : [a-zA-Z0-9_]
print(re.search(r"r\wn", "r\nn r4n"))          # <_sre.SRE_Match object; span=(4, 7), match='r4n'>
# \W : opposite to \w
print(re.search(r"r\Wn", "r\nn r4n"))          # <_sre.SRE_Match object; span=(0, 3), match='r\nn'>
# \b : empty string (only at the start or end of the word)
print(re.search(r"\bruns\b", "dog runs to cat"))    # <_sre.SRE_Match object; span=(4, 8), match='runs'>
# \B : empty string (but not at the start or end of a word)
print(re.search(r"\B runs \B", "dog   runs  to cat"))  # <_sre.SRE_Match object; span=(8, 14), match=' runs '>
# \\ : match \
print(re.search(r"runs\\", "runs\ to me"))     # <_sre.SRE_Match object; span=(0, 5), match='runs\\'>
# . : match anything (except \n)
print(re.search(r"r.n", "r[ns to me"))         # <_sre.SRE_Match object; span=(0, 3), match='r[n'>
# ^ : match line beginning
print(re.search(r"^dog", "dog runs to cat"))   # <_sre.SRE_Match object; span=(0, 3), match='dog'>
# $ : match line ending
print(re.search(r"cat$", "dog runs to cat"))   # <_sre.SRE_Match object; span=(12, 15), match='cat'>
# ? : may or may not occur
print(re.search(r"Mon(day)?", "Monday"))       # <_sre.SRE_Match object; span=(0, 6), match='Monday'>
print(re.search(r"Mon(day)?", "Mon"))          # <_sre.SRE_Match object; span=
```
## 如果有多行用`^`来匹配不能成功的话
```python
string = """
dog runs to cat.
I run to dog.
"""
print(re.search(r"^I", string))                 # None
print(re.search(r"^I", string, flags=re.M))     # <_sre.SRE_Match object; span=(18, 19), match='I'>
```
## 重复匹配
```python
# * : occur 0 or more times
print(re.search(r"ab*", "a"))             # <_sre.SRE_Match object; span=(0, 1), match='a'>
print(re.search(r"ab*", "abbbbb"))        # <_sre.SRE_Match object; span=(0, 6), match='abbbbb'>

# + : occur 1 or more times
print(re.search(r"ab+", "a"))             # None
print(re.search(r"ab+", "abbbbb"))        # <_sre.SRE_Match object; span=(0, 6), match='abbbbb'>

# {n, m} : occur n to m times
print(re.search(r"ab{2,10}", "a"))        # None
print(re.search(r"ab{2,10}", "abbbbb"))   # <_sre.SRE_Match object; span=(0, 6), match='abbbbb'>
```
## 分组
```python
match = re.search(r"(\d+), Date: (.+)", "ID: 021523, Date: Feb/12/2017")
print(match.group())                   # 021523, Date: Feb/12/2017
print(match.group(1))                  # 021523
print(match.group(2))                  # Date: Feb/12/2017
# 命名组
match = re.search(r"(?P<id>\d+), Date: (?P<date>.+)", "ID: 021523, Date: Feb/12/2017")
print(match.group('id'))                # 021523
print(match.group('date'))              # Date: Feb/12/2017
```
## findall
```python
# findall
print(re.findall(r"r[ua]n", "run ran ren"))    # ['run', 'ran']

# | : or
print(re.findall(r"(run|ran)", "run ran ren")) # ['run', 'ran']
```
## replace 对正则表达式结果进行替换
```python
print(re.sub(r"r[au]ns", "catches", "dog runs to cat"))     # dog catches to cat
```
## split 分割
```python
print(re.split(r"[,;\.]", "a;b,c.d;e"))             # ['a', 'b', 'c', 'd', 'e']
```
## compiled 定义重复的正则表达式
```python
compiled_re = re.compile(r"r[ua]n")
print(compiled_re.search("dog ran to cat"))  # <_sre.SRE_Match object; span=(4, 7), match='ran'>
```

## 小抄
