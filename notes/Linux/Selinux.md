---
sidebar_label: Selinux
title: Selinux
sidebar_position: 1
---

## 进程和程序

>程序 (program):通常为 binary program ，放置在储存媒体中 (如硬盘、光盘、软盘、磁带等)， 为实体文 件的型态存在;
进程 (process):程序被触发后，执行者的权限与属性、程序的程序代码与所需数据等都会被加载内存中，操 作系统并给予这个内存内的单元一个标识符 (PID)，可以说，进程就是一个正在运作中的程序。


常驻内存的进程就是服务=>一般在末尾加d e.g hpptd
进程给予执行者权限/属性/所需脚本与数据或文件，最后给予一个PID
bash有一个PID衍生出的其他进程沿用相关权限
父进程PID对应子进程PPID号
杀死子进程父进程又会再生故先杀死父进程

Linux是多用户系统一个用户Down了可以再登陆另一个用户杀死这个用户的进程

## 工作管理

**终端分为前景和背景**
```bash
&           #命令扔到背景去执行
[ctrl]+z    #命令扔到背景暂停
jobs        #观察背景 -l 观察pid -r 正在运行 -s 暂停+预设的取出进程
fg          #取出背景工作 fg 2 取出第二个
bg %3       #背景中第三个运作
stop %num   #背景中暂停 红帽是 kill -stop PID
kill        # -l 列出指令 -1 重读配置文件 -2 强制终止 -9 立刻删除工作 -15 正常终止 eg.kill -9 %2 killall 直接接名称
pstree     #查看进程树 -u 后面会有所有者
```
>nohup 任务导向～/nohup.out 终端关闭不影响 不支持内建指令

## 进程管理
**进程的观察**
```bash
ps axjf      #部分进程树状态 -o 指定部分查看 pid comm等
```
```bash
ps -l       #观察自己
```
>F 进程旗标（4:root 1子进程）   
S 运行状态
C cpu
PRI/NT CPU优先级
ADDR/SZ/WCHAN addr进程是内存的那一部分 - run/SZ用掉多少内存？WCHAN进程是否运行 - run
TIME 用掉CPU时间
```bash
ps aux       #观察全部
```

>USER:属于那个使用者账号
PID :进程标识符
%CPU:用掉的 CPU 资源百分比;
%MEM:占用的物理内存百分比;
VSZ :使用掉的虚拟内存量 (Kbytes)
RSS :占用的固定的内存量 (Kbytes)
TTY :在那个终端机上面运作，若与终端机无关则显示 ?，另外， tty1-tty6 是本机上面的登录者进程，若为 pts/0 等等的，则表示为由网络连接进主机的进程。
STAT:该进程目前的状态，状态显示与 ps -l 的 S 旗标相同 (R/S/T/Z)
START:被触发启动的时间;
TIME :实际使用 CPU 运作的时间。
COMMAND:该进程的实际指令

```bash
pidof ssh       #查看某个进程PID
```

```bash
top             #动态观察
```
>d :后面可以接秒数，整个进程画面更新的秒数。预设是 5 秒;
-b :以批次的方式执行 top，通常会搭配数据流重导向来将批次的结果输出成为文件。
-n :与 -b 搭配，意义是，需要进行几次 top 的输出结果。 -p :指定某些个 PID 来进行观察监测而已。

>在 top 执行过程当中可以使用的按键指令:
? :显示在 top 当中可以输入的按键指令; P :以 CPU 的使用资源排序显示;
M :以 Memory 的使用资源排序显示;
N :以 PID 来排序喔!
T :由该 Process 使用的 CPU 时间累积 (TIME+) 排序。 k :给予某个 PID 一个讯号 (signal)
r :给予某个 PID 重新制订一个 nice 值。 q :离开 top 软件的按键。改变他的优先级别

**TOP说明**
>PR :Priority 的简写，进程的优先执行顺序，越小越早被执行;
NI :Nice 的简写，与 Priority 有关，也是越小越早被执行;
%CPU:CPU 的使用率;
%MEM:内存的使用率;
TIME+:CPU 使用时间的累加;

**优先级=Priority（内核决定）+nice**
```bash
renice [nicenum] [PID]              #更改正在运行进程的优先级
nice -n 19 cat /dev/zero > /dev/null #让运行时就以某个nice值运行
```

**系统资源的观察**
```bash
free        #查看内存使用情况 -m mb -g gb
uname       #查看系统与内核信息 
uptime      #系统启动时间工作负荷
netstat     #追踪网路或插槽文件
netstat -tulnp  #查看已在监听的端口
vmstat 1 10 #检测系统资源变化 一秒一次进行十次
demesg      #分析核心产生的讯息
```

**特殊文件与进程**
SUID
>SUID 权限仅对二进制程序(binary program)有效;
>执行者对于该程序需要具有 x 的可执行权限;
>本权限仅在执行该程序的过程中有效 (run-time);
>执行者将具有该程序拥有者 (owner) 的权限。
>`find / -perm /6000`查询所有具有s权限的可执行文件

**/proc/\* 代表的意义**
>内存当中的数据写到/proc/\*目录下
>目前主机各进程的PID都以目录的形式存里面 eg:systemd pid is 1 that directory is /proc/1/*

**查询文件开启文件**
```bash
fuser [-umv] [-k [i] [-signal]] file/dir      #藉由文件(或文件系统)找出正在使用该文件的进程
u :除了进程的 PID 之外，同时列出该进程的拥有者;
-m :后面接的那个档名会主动的上提到该文件系统的最顶层，对 umount 不成功很有效! -v :可以列出每个文件与进程还有指令的完整相关性!
-k :找出使用该文件/目录的 PID ，并试图以 SIGKILL 这个讯号给予该 PID; -i :必须与 -k 配合，在删除 PID 之前会先询问使用者意愿!
-signal:例如 -1 -15 等等，若不加的话，预设是 SIGKILL (-9) 
```
>ACCESS 的项目
>c :此进程在当前的目录下(非次目录);
>e :可被触发为执行状态;
>f :是一个被开启的文件;
>r :代表顶层目录 (root directory);
>F :该文件被开启了，不过在等待回应中;
>m :可能为分享的动态函式库;

```bash
lsof [-aUu] [+d]       #列出被进程所开启的文件档名
-a :多项数据需要『同时成立』才显示出结果时!
-U :仅列出 Unix like 系统的 socket 文件类型;
-u :后面接 username，列出该使用者相关进程所开启的文件; 
+d :后面接目录，亦即找出某个目录底下已经被开启的文件!
```

```bash
pidof [-sx] program_name        #找出某支正在执行的程序的 PID
-s :仅列出一个 PID 而不列出所有的 PID
-x :同时列出该 program name 可能的 PPID 那个进程的 PID
```

## SELinux
**配置文件目录/etc/selinux/config**
>任何用户包括root用这个进程只能访问限制的资源
>SELinux 是透过 MAC 的方式来控管进程，他控制的主体是进程， 而目标则 是该进程能否读取的『文件资源』

* 主体 (Subject):
  SELinux 主要想要管理的就是进程，因此你可以将『主体』跟 process 划上等号;
* 目标 (Object):
  主体进程能否存取的『目标资源』一般就是文件系统。因此这个目标项目可以等文件系统划上等号;
* 政策 (Policy):
  由于进程与文件数量庞大，因此 SELinux 会依据某些服务来制订基本的存取安全性政策。这些政策内还会 有详细的规则 (rule) 来指定不同的服务开放某些资源的存取与否。在目前的 CentOS 7.x 里面仅有提供三个 主要的政策，分别是:
    * targeted:针对网络服务限制较多，针对本机限制较少，是预设的政策;
    * minimum:由 target 修订而来，仅针对选择的进程来保护!
    * mls:完整的 SELinux 限制，限制方面较为严格。
* 安全性本文 (security context):
  主体与目标的安全性 本文必须一致才能够顺利存取,这个安全性本文 (security context) 有点类似文件系统的 rwx ![2df2a02371da6b98505573a2bf31b77c.png](evernotecid://3665AFF6-B454-4044-8816-042E9DACA93D/appyinxiangcom/21424495/ENResource/p2)
>安全性文本放在inode里

```bash
ls -Z           #查询当前目录安全性文本
```
>Identify:role:type
>身份识别:角色:类型

* Identify
    * unconfined_u:不受限的用户
    * system_u:系统用户
* Role
    * object_r:代表的是文件或目录等文件资源
    * system_r:代表的就是进程啦
* Type
    * type:在文件资源 (Object) 上面称为类型 (Type)
    * domain:在主体进程 (Subject) 则称为领域 (domain)
>Type 很重要每次
>触发一个可执行文件，该文件造成的主题进程（Subject）具有crond这个领域（domain），政策（domain可读取的资料列在政策中）对这个领域制定了许多规则，crond domain被设定读取system_crond_spool_t这个类型的文件（Object），具体还看rwx
>简单来说配置文件的Type必须与SELinux允许的Type相同才能读到需要读的目录

**SELinux的三种模式**
* enforcing:强制模式
* permissive:宽容模式,只会警告
* disabled:关闭
>`getenforce`查看模式
>`sestatus`查看政策（Policy）-v:检查/etc/sestatus.conf内的文件与进程的安全性文本 -b：列出规则（rule）
>`setenforce [0|1] 0:permissive 1:Enforcing`
>**改变模式要重启**

**SELinux 的Rule**
>`getsebool` [-a] [规则名称] -a列出目前上所有selinux规则的bool
>`seinfo [-Atrub]` 列出每个规则到底在限制什么
>* -A :列出 SELinux 的状态、规则布尔值、身份识别、角色、类别等所有信息
   >-u :列出 SELinux 的所有身份识别 (user) 种类
   -r :列出 SELinux 的所有角色 (role) 种类
   -t :列出 SELinux 的所有类别 (type) 种类
   -b :列出所有规则的种类 (布尔值)
   >`sesearch [-A] [-s 主体类别] [-t 目标类别] [-b 布尔值]` -A 列出允许读取的相关信息
   >`semanage boolean -l | grep httpd_enable_homedirs`看bool到底是做什么的

**修改SELinux的bool**
`setsebool [-P] 『规则名称』 [0|1]` -P 写入配置文件

**SELinux安全文本的修改**
`chcon [-R] [-t type] [-u user] [-r role] 文件`
`chcon [-R] --reference=范例文件 文件`
* -R :连同该目录下的次目录也同时修改;
  -t :后面接安全性本文的类型字段!例如 httpd_sys_content_t ;
  -u :后面接身份识别，例如 system_u; (不重要)
  -r :后面街角色，例如 system_r; (不重要)
  -v :若有变化成功，请将变动的结果列出来
  --reference=范例文件:拿某个文件当范例来修改后续接的文件的类型!

**使用 restorecon 让文件恢复正确的 SELinux type**
`restorecon [-Rv] 文件或目录`
* -R :连同次目录一起修改;
  -v :将过程显示到屏幕上

**semanage 默认目录的安全性本文查询与修改**
文件放在目录里会有目录的安全性文本属性
`semanage {login|user|port|interface|fcontext|translation} -l`
`semanage fcontext -{a|d|m} [-frst] file_spec`
* fcontext :主要用在安全性本文方面的用途，
  -l 为查询的意思;
  -a :增加的意思，你可以增加一些目录的默认安全性本文类型设定;
  -m :修改的意思; -d :删除的意思。


**用setroubleshoot auditd来排错**
SELinux 的错误讯息与克服方法记录到 /var/log/messages 与 /var/log/setroubleshoot/* 里
