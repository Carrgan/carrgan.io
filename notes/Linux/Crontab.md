## at 在什么时间执行命令
```bash
at MM/DD/YY(MMDDYY,DD.MM.YY)
at now + count (minutes/hours/days)
at 2am tomorrow
at 4pm + 3 days
atq/at -l                                   #查看计划任务
at -c 序号                                  #查看具体内容
atrm/at -d 序号                             #删除某个计划任务
```
/etc/at.deny 里面写的用户名不能执行at计划任务
/etc/at.allow 里面的用户能做计划任务权限高于deny

## cron有规律的执行多次
```bash
crontab [-u user] file
crontab [-u user] [ -e | -l | -r ]
```
-u user：用来设定某个用户的crontab服务；
file：file是命令文件的名字,表示将file做为crontab的任务列表文件并载入crontab。如果在命令行中没有指定这个文件，crontab命令将接受标准输入（键盘）上键入的命令，并将它们载入crontab。
-e：编辑某个用户的crontab文件内容。如果不指定用户，则表示编辑当前用户的crontab文件。
-l：显示某个用户的crontab文件内容，如果不指定用户，则表示显示当前用户的crontab文件内容。
-r：从/var/spool/cron目录中删除某个用户的crontab文件，如果不指定用户，则默认删除当前用户的crontab文件。
-i：在删除用户的crontab文件时给确认提示。
```
#    分     时    天    月    周        命令    
     *      *     *     *    *         echo“每分钟执行”
     0      7     *     *    *         echo“每天七点执行”
     0      7     *     *    1-5       echo“周一到周五每天七点执行”
  0-30/5    7     *     *    *         echo“每天七点到七点半每五分执行一次”

```
>天和周是或的关系

配置文件目录/var/spool/cron
/etc/cron.deny 里面写的用户名不能执行at计划任务
/etc/cron.allow 里面的用户能做计划任务权限高于deny
系统的计划任务
/etc/crontab
