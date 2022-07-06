---
title: git
order: 1
toc: content
---

---

## Git 的介绍

Git 是目前世界上最先进的分布式版本控制系统。

![image-20201221160115007](./assets/image-20201221160115007.png)

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库

## Git 的操作

### Git 初始化操作

```
git config -global user.name "name" #设置提交者名字
git config -global user.email <email> #设置提交者邮箱

git config -global core.editor <editor> #设置默认文本编辑器
git config -global merge.tool <tool> #设置解决合并冲突时差异分析工具
git config -list #检查已有的配置信息
```

### 创建新版本库

```
git clone <url> #克隆远程版本库
git init #初始化本地版本库
```

### 分支与标签

```
git branch #显示所有本地分支

git checkout <branch/tagname> #切换到指定分支或标签
git branch <new-branch-name> #创建新分支
git checkout -b <name> #创建并切换到该分支

git branch -d <branch> #删除本地分支
git tag #列出所有本地标签
git tag <tagname> #基于最新提交创建标签
git tag -d <tagname> #删除标签
```

- 新建的分支会继承 master 分支

![img](./assets/clipboard.png)

- 新建的分支的改动和其他分支的改动没有关系

![img](./assets/clipboard-1608602181917.png)

### 合并与衍合

```
git merge <branch> #合并指定分支到当前分支
git rebase <branch> #衍合指定分支到当前分支
```

### 远程操作

```
git remote -v #查看远程版本库信息
git remote show <remote> #查看指定远程版本库信息
git remote add <remote> <url> #添加远程版本库

git clone <remote地址> #从远程库获取代码
git fetch <remote地址> #从远程库获取代码
git pull <remote地址> <branch> #下载代码及快速合并到该分支(本地要先初始一个库)

git push <remote地址> <branch> #上传代码及快速合并到该分支
git push <remote地址> : <branch>/<tagname> #删除远程分支或标签
git push -tags #上传所有标签
git push -u origin <branch> #将本地分支与远程分支相关联，下次可以直接使用 git push
```

### 修改和提交

```
git add . #添加所有改动过的文件 (放到暂存区)
git add <file> #添加指定的文件
git mv <old> <new> #文件重命名
git rm <file> #删除文件
git rm -cached <file> #停止跟踪文件但不删除
git commit -m <file> #提交指定文件 (放到仓库区)
git commit -m "commit message" #提交所有更新过的文件
git commit -amend #修改最后一次提交
git commit -C HEAD -a -amend #增补提交（不会产生新的提交历史纪录）
```

### 查看提交历史

```
git log #查看提交历史
git log --oneline #查看简洁版日志
git log -p <file> #查看指定文件的提交历史
git blame <file> #以列表方式查看指定文件的提交历史
gitk #查看当前分支历史纪录
gitk <branch> #查看某分支历史纪录
gitk --all #查看所有分支历史纪录
git branch -v #每个分支最后的提交
git status #查看当前状态
git diff #查看变更内容
```

### 删除、撤消操作

```
rm <file>  #删除指定文件
// 可以直接在文件目录中把文件删了
// 需要彻底从版本库中删掉了此文件的话，可以再执行commit命令提交掉

git checkout  --<file>  #在版本库中恢复此文件(只要没有commit过)

git reset -hard HEAD #撤消工作目录中所有未提交文件的修改内容
git checkout HEAD <file1> <file2> #撤消指定的未提交文件的修改内容
git checkout HEAD. #撤消所有文件
git revert <commit> #撤消指定的提交
```

### 版本回退

###### 索引号回退

```
git reset --hard HEAD^  # 回退到上一版本
// 如果要回退到上上个版本只需把HEAD^ 改成 HEAD^^ 以此类推

git reset --hard HEAD~100  #
// 波浪号后跟前多少个版本，从0开始
```

###### 版本号回退

```
git reflog // 获取版本号

git reset  --hard [版本号]
```

### Git 中的忽略文件

gitignore 可以设置在文件中需要被忽略的文件或者目录，

忽略的文件不会被提交到暂存区，

```
/.idea #忽略.idea文件
/js #忽略js文件夹里的所有文件
/js/*.js #忽略js文件夹里的所有js文件
```

## 新项目 git 基本流程

```
git config --global user.name "夕夕"

git config --global user.email "1207427994@qq.com"

cd my-test // 确保远程仓库跟本地文件夹名称一样

git init

git add README.md

git commit -m "first commit"

git remote add origin https://gitee.com/joe1207427994/my-test.git

git push -u origin master

之后便可以进行正常操作
```

### 生成生成密钥(SSH key)

```
ssh-keygen -t rsa -C "your_email@youremail.com"
```

##### 生成多个密钥（多个账户）配置不同的远程仓库【账号配置为局部变量】

![img](https://images2018.cnblogs.com/blog/967677/201807/967677-20180729162625687-880442903.png)

```js
a.添加新的ssh-key
如果报错：Could not open a connection to your authentication agent.无法连接到ssh agent；可执行ssh-agent bash命令后再执行ssh-add命令
　　ssh-add ./id_rsa_github
　　ssh-add ./id_rsa_gitee

b.配置config文件
在./ssh目录下若没有 config文件则创建
# 配置 github
Host github.com
HostName github.com
IdentityFile C:\\Users\\zzw\\.ssh\\id_rsa_github
PreferredAuthentications publickey
User ZeroBound

# 配置 gitee
Host gitee.com
HostName gitee.com
IdentityFile C:\\Users\\zzw\\.ssh\\id_rsa_gitee
PreferredAuthentications publickey
User zhzw

c.到github或码云上添加 密钥，之后验证是否成功
　　1.ssh -T git@github.com
　　2.ssh -T git@gitee.com

d.进入仓库目录配置用户名和邮箱
　　git config user.name "yourname"
　　git config user.email "your_email@youremail.com"
　　查询已有全局配置
　　git config --global --list
```

### 新建分支与分支合并

先创建子分支，再推送到子分支，之后合并代码到主分支即可；

![60252184281](./assets/1602521842813.png)

    需要把rights分支的内容合并到本地master分支时，先`git checkout master`切换到master分支，再  `git merge rights`，然后本地的master分支已经合并了，再  `git push`到云端。

最后开发时记得切回子分支，在子分支上开发。
