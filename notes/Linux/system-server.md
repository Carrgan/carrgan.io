---
sidebar_label: 认识系统服务
title: 认识系统服务
---

## daemon与服务(service)
daemon守护进程，类似于service

### 早起SystemV init管理中daemon的分类
* 服务的启动、关闭与观察:
  所有服务启动脚本都放在/etc/init.d中
  更改状态:/etc/init.d/daemon start/stop/restart/status
* 服务启动分类:
  init服务的分类中，一句服务是独立开启或被一个总进程管里分类
  Stand Alone：服务独立启动，该服务直接常驻内存中，提供本机或用户的服务，反应快
  Super Daemon：由特殊的 xinetd 或 inetd 这两个总管程序提供 socket 对应或       port 对应 的管理。
* init 在管理员自 己手动处理这些服务时，是没有办法协助相依服务的唤醒的!
* 执行等级的分类：
  基本上 Linux 提供 7 个执行等级，分别是 0, 1, 2...6 ， 比较重要的 是 1)单人维   护模式、3)纯文本模式、5)文字加图形界面
* 制定执行等级默认要启动的服务:

### systemd 使用的 unit 分类
从 CentOS 7.x 以后，Red Hat 系列的 distribution 放弃沿用多年的 System V 开机启动服务的流程， 就是前一小节提到的 init 启动脚本的方法， 改用 systemd 这个启动服务管理机制

* 平行处理所有服务，加速开机流程:
  systemd 就是可以让所有的服务同时启动
* 一经要求就响应的 on-demand 启动方式:
  systemd 全部就是仅有一只 systemd 服务搭配 systemctl 指令来处理，无须其他额外的指令来支持。
* 服务相依性的自我检查:
  systemd 可以自定义服务相依性的检查
* 依 daemon 功能分类:
  首先 systemd 先定义所 有的服务为一个服务单位 (unit)，并将该 unit 归类到不同的服务类型 (type) 去
* 将多个 daemons 集合成为一个群组
* 向下兼容init
* * *
* systemd 的配置文件存放目录
  /usr/lib/systemd/system/:每个服务最主要的启动脚本设定，有点类似以前的 /etc/init.d 底下的文件;
  /run/systemd/system/:系统执行过程中所产生的服务脚本，这些脚本的优先序要比 /usr/lib/systemd/system/ 高
  /etc/systemd/system/:管理员依据主机系统的需求所建立的执行脚本，其实这个目录有点像以前
  /etc/rc.d/rc5.d/Sxx 之类的功能!执行优先序又比 /run/systemd/system/ 高喔
* * *
* Systemd 的 unit 类型分类说明
  systemd 根据拓展名来区分Type

```
ll /usr/lib/systemd/system/ | grep -E '(vsftpd|multi|cron)'

-rw-r--r--. 1 root root 284 7 月 30 2014 crond.service
-rw-r--r--. 1 root root 524 3 月 6 13:48 multi-user.target
-rw-r--r--. 1 root root 171 6 月 10 2014 vsftpd.service
```

vsftpd 与 crond 其实算是系统服务 (service)，而 multi-user 要算是执行环境相关 的类型 (target type)


| 扩展名 | 主要服务功能 |
| --- | --- |
| .service | 一般服务类型 (service unit):主要是系统服务，包括服务器本身所需要的本地服务以及网络服务 |
| .socket | 内部程序数据交换的插槽服务 (socket unit):图 形界面很多的软件都是透过 socket 来进行本机程序数据交换的行为。 |
| .target | 其实是一群 unit 的集合，选择执行 multi-user.target 就是执行一堆其他 .service 或/ 及 .socket 之类的服务 |
| .mount .automount | 文件系统挂载相关的服务 (automount unit / mount unit) |
| .path | 侦测特定文件或目录类型 (path unit):常见的打印服务 |
| .timer | 循环执行的服务 (timer unit):这个东西有点类似 anacrontab |

## 透过 systemctl 管理服务
基本上， systemd 这个启动服务的机制，主要是透过一只名为 systemctl 的指令来处理的!
### 透过 systemctl 管理单一服务 (service unit) 的启动/开机启动与观察状态
```
systemctl [command] [unit]
start :立刻启动后面接的 unit
stop :立刻关闭后面接的 unit
restart :立刻关闭后启动后面接的 unit，亦即执行 stop 再 start 的意思
reload :不关闭后面接的 unit 的情况下，重载配置文件，让设定生效
enable:设定下次开机时，后面接的 unit 会被启动
disable:设定下次开机时，后面接的 unit 不会被启动
status:目前后面接的这个 unit 的状态，会列出有没有正在执行、开机预设执行否、登录等信息等
is-active：目前有没有正在运作中
is-enable：开机时有没有预设要启用这个 unit

```
