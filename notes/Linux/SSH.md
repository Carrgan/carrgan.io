## SSH

- 在默认状态下，SSH服务主要提供两个服务功能

- - 提供类似Telnet远程连接服务器的服务，SSH数据加密功能
  - 提供类FTP服务的sftp-server，借助SSH协议来传输数据，提供更安全的SFTP服务(vsftp,proftp)
  - SSH包含远程拷贝命令scp

- openssh是SSH服务端软件之一，可以同时支持SSH1和SSH2版本协议，可以在配置文件中使用protocol指令，指定只支持其中一种或者两种都支持，默认情况下系统默认配置的是仅支持SSH2协议

- SSH服务由服务端软件OpenSSH(Openssl)和客户端常见的有SSH(linux),secureCRT,putty,Xshell组成.SSH服务默认使用22端口提供服务,他有两个不兼容的SSH协议版本,分别是1.x和2.x

sudo apt-get install openssh-server

sudo service ssh start

设置为自启动：

1. 修改ssh_config文件。命令：vim /etc/ssh/sshd_config
2. 将#PasswordAuthentication no的注释去掉，并且将NO修改为YES  //我的ubuntu_meta中默认是yes
3. 将#PermitRootLogin yes的注释去掉//我的ubuntu_meta中默认去掉了注释
4. 如果保存不成功，切换root用户再编辑：su root，重复以上1到3小步
5. 重启动SSH服务，命令为：/etc/init.d/ssh start // 或者service ssh start
6. 验证SSH服务状态，命令为：/etc/init.d/ssh status
7. 添加开机自启动  update-rc.d ssh enable    关闭则为：update-rc.d ssh disabled
8. 自启动需要重启生效：sudo reboot
