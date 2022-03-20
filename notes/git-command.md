---
sidebar_label: git命令速查
title: git命令速查
---

## 基本
- 初始化创建git本地仓库
`git init`

- 拷贝远程git仓库到本地
`git clone [url] [dir]`

- 将文件添加到本地缓存
`git add [file/.]`

- 恢复暂存区的所有文件到工作区
`git checkout .`

- 显示有变更的文件
`git status`

- 显示暂存区和工作区的代码差异
`git diff`

- 提交暂存区到仓库区
`git commit -m [message]`

- 恢复暂存区的指定文件到工作区
`git checkout [file]`

- 重置暂存区与工作区，与上一次commit保持一致
`git reset --hard`

- 增加一个新的远程仓库，并命名
`git remote add [shortname] [url]`

- 更新远程仓储
`git remote update`  

- 上传本地指定分支到远程仓库
`git push [remote] [branch]`

- 显示所有远程仓库
`git remote -v`

## 恢复

- 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
`git reset [commit]`

- 恢复某个commit的指定文件到暂存区和工作区
`git checkout [commit] [file]`

- 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
`git reset [file]`

## 其他
- 提交工作区自上次commit之后的变化，直接到仓库区
`git commit -a`

- 显示当前分支的版本历史
`git log`

- 删除工作区文件，并且将这次删除放入暂存区
`git rm [file1] [file2] ...`



## 远程
- 下载远程仓库的所有变动
`git fetch [remote]`


- 显示某个远程仓库的信息
`git remote show [remote]`

- 取回远程仓库的变化，并与本地分支合并
`git pull [remote] [branch]`

- 强行推送当前分支到远程仓库，即使有冲突
`git push [remote] --force`

- 推送所有分支到远程仓库
`git push [remote] --all`

## 分支

- 列出所有本地分支
`git branch`

- 列出所有远程分支
 `git branch -r`

- 列出所有本地分支和远程分支
 `git branch -a`

- 新建一个分支，但依然停留在当前分支
`git branch [branch-name]`

- 新建一个分支，并切换到该分支
`git checkout -b [branch]`

- 新建一个分支，指向指定commit
 `git branch [branch] [commit]`

- 新建一个分支，与指定的远程分支建立追踪关系
 `git branch --track [branch] [remote-branch]`

- 切换到指定分支，并更新工作区
 `git checkout [branch-name]`

- 切换到上一个分支
 `git checkout -`

- 建立追踪关系，在现有分支与指定的远程分支之间
 `git branch --set-upstream [branch] [remote-branch]`

- 合并指定分支到当前分支
 `git merge [branch]`

- 选择一个commit，合并进当前分支
 `git cherry-pick [commit]`

- 删除分支
`git branch -d [branch-name]`

- 删除远程分支
 `git push origin --delete [branch-name]`
 `git branch -dr [remote/branch]`

- 本地存在一个分支，名称叫：develop_chen，但远程没有怎么办？
`git push origin develop_chen`

  > 这样就在远程建立一个和本地一样的分支

- 本地分支和远程分支简历跟踪关系
`git branch --set-upstream-to=origin/develop  develop`  
