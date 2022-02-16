### 阿里云部署mongodb

1.本安装系统版本为 Linux CentOS 7.7 64位，使用Yum源安装MongoDB

2.mongodb版本为：mongodb-org-4.2

前期准备：为了减少翻阅资料，我先把常用的资料准备一下

文章内容：（欢迎补充）

​	1.服务器准备

​	2.yum常用代码和 mongodb 4.2 yum 源以及使用源安装

​	3.linux 常用命令清单

​	4.常见错误，及排查

​	5.创建用户

​	6.远程连接

#### 1.服务器准备：

本文默认你已经有一台阿里云服务器：

现在开始喇：

选择你的云服务器ECS ，点击后可以看到这个界面，记住公网ip，后面用到

<img src="http://www.iamalanji.com/static/images/01.png" alt="远程链接" style="zoom:50%;" />

点击远程链接，选择VNC远程连接，输入密码即可，如果不记得，可以按提示重置密码即可

<img src="http://www.iamalanji.com/static/images/02.png" alt="远程链接" style="zoom:50%;" />

进入linux 界面后，提示输入账号密码登录：

输入root，回车。这是它会让你输入密码（tips），默认你知道密码，不记得就去设置

tips：注意linux系统，输入密码的时候不会出现任何字符包括空格或者*号，放心吧不是电脑坏了。当初我做的时候从来没有用过linux系统，一度怀疑我自己是不是又哪里操作错了，导致没反应

登陆完成后，第一步算完成了~！

<img src="http://www.iamalanji.com/static/images/03.png" alt="远程链接" style="zoom:50%;" />

接下来处理yum 源

#### **2.Yum常用代码：**

```
// 1 安装 
yum install package  // 安装指定的安装包package 

// 2 更新和升级 
yum update  // 全部更新 
yum update package  // 更新指定程序包package
yum check-update  // 检查可更新的程序 
yum upgrade package  // 升级指定程序包package 

// 3 查找和显示 
yum info // 列出所有可以安装或更新的包的信息
yum info package //显示安装包信息package 
yum list // 显示所有已经安装和可以安装的程序包 
yum list package  // 显示指定程序包安装情况package
yum search package // 搜索匹配特定字符的package的详细信息

// 4 删除程序 
yum remove | erase package  // 删除程序包package
yum deplist package  // 查看程序package依赖情况

// 5 清除缓存 
yum clean packages  // 清除缓存目录下的软件包 
yum clean headers // 清除缓存目录下的 headers 
yum clean oldheaders // 清除缓存目录下旧的 headers 
yum clean, yum clean all  // (= yum clean packages; yum clean oldheaders) 清除缓存目录下的软件包及旧的headers
```

先把yum更新到最新版本：（此处时间比较久）

```
yum -y update
```

我准备的是4.4版本的源，直接访问一下看下存不存在

```
https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.2/x86_64/
```

源存在，进行下一步

**1、制作 `repo` 文件**

vi 是linux 命令，有基础的会记得vim这个编辑（现在我们就是进入vim模式）

baseurl 中就是我们准备的 源

```
cat << EOF > /etc/yum.repos.d/mongodb-org-4.2.repo
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
EOF
```

**详解：**

```
name         # 名称
baseurl      # 获得下载的路径
gpkcheck=1   # 表示对从这个源下载的rpm包进行校验；
enable=1     # 表示启用这个源。
gpgkey       # gpg验证
```

制作的文件在 /etc/yum.repos.d 目录下， 

通过 vi  /etc/yum.repos.d/mongodb-org-4.2.repo 可进行更改编辑（vim）

---手摸手系列，丑拒（会的）请跳过

**vim操作，会的请跳过**

启动Vim编辑器时，您处于正常模式。在这种模式下，您可以使用vim命令并浏览文件。

要输入文字，您需要按`i`键进入插入模式。使用此模式，您可以像在常规[文本编辑器](https://www.myfreax.com/how-to-use-nano-text-editor/)中一样插入和删除字符。

要从其他任何模式返回正常模式，只需按`Esc`键

**在Vim/Vi中打开文件，会的请跳过**

要使用Vim打开文件，请键入`vim`，然后输入要编辑或创建的文件的名称：

**在Vim/Vi中保存文件**

在Vim中保存文件的命令是`:w`，要保存文件而不退出编辑器，请按`Esc` 后键入`:w`，然后按`Enter`，切换回普通模式。步骤如下：

1. 按`Esc`
2. 按`:w`
3. 按`Enter`

**保存文件并退出Vim/Vi**

在Vim中保存文件并退出编辑器的命令是`:wq`。

要保存文件并同时退出编辑器，请按`Esc`切换到普通模式，键入`:wq`并按`Enter`

1. 按`Esc`
2. 按`:wq`
3. 按`Enter`

另一个保存文件并退出Vim的命令是`:x`。

这两个命令之间的区别是`:x`仅在未保存更改时才将缓冲区写入文件，而`:wq`总是将缓冲区写入文件并更新文件修改时间。

**退出Vim/Vi而不保存文件**

要退出编辑器而不保存更改，请按`Esc`键入`:q!`，然后按`Enter`，切换到普通模式。

1. 按`Esc`
2. 按`:q!`
3. 按`Enter`

----以上内容，会的请跳过

制作好repo文件，就可以使用yum 命令安装

```
 yum install -y mongodb-org
```

安装完启动服务则可以使用

**验证安装结果**

```
rpm -qa |grep mongodb
```

```
rpm -ql mongodb-org-server
```

<img src="http://www.iamalanji.com/static/images/04.png" alt="远程链接" style="zoom:100%;" />

**启动MongoDB**

```
systemctl start mongod.service
```

MongoDB默认端口是27017，查看是否开启

```
netstat -natp | grep 27017
```

检查数据库是否安装成功

```
ps -aux | grep mongod    # 查看数据库的进程是否存在
```

<img src="http://www.iamalanji.com/static/images/05.png" alt="远程链接" style="zoom:100%;" />

**4. 验证服务开启**

mongo

<img src="http://www.iamalanji.com/static/images/06.png" alt="远程链接" style="zoom:100%;" />

**常用命令清单**

```
// 1、开启MongoDB
sudo service mongod start  或者 systemctl start mongod.service  # 开启MongoDB
sudo chkconfig mongod on  # 加入开机启动
sudo service mongod restart # 重启MongoDB

// 2、关闭MongoDB
sudo service mongod stop  # 关闭防火墙

// 3、卸载MongoDB
sudo yum erase $(rpm -qa | grep mongodb-org)    # 卸载MongoDB
sudo rm -r /var/log/mongodb  # 删除日志文件
sudo rm -r /var/lib/mongo    # 删除数据文件
```

能做到这步，数据库初步已完成

**远程连接Mongodb**

修改配置文件mongodb.conf（这个文件在  /etc/mongod.conf）

执行

```
vi /etc/mongod.conf
```

```
# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.
```

**修改绑定ip默认127.0.0.1只允许本地连接， 所以修改为bindIp:0.0.0.0, 退出保存**

文件修改后要执行 restart 使配置生效

```
 service mongod restart
```

**3. 开放对外端口**

先去阿里云安全组设置 27017端口开放：

<img src="http://www.iamalanji.com/static/images/07.png" alt="远程链接" style="zoom:100%;" />

<img src="http://www.iamalanji.com/static/images/08.png" alt="远程链接" style="zoom:100%;" />

出入都添加

再执行以下命令

```
systemctl status firewalld  # 查看防火墙状态
firewall-cmd --zone=public --add-port=27017/tcp --permanent # mongodb默认端口号
firewall-cmd --reload  # 重新加载防火墙

firewall-cmd --zone=public --query-port=27017/tcp # 查看端口号是否开放成功，输出yes开放成功，no则失败
```

实现远程： 准备好从阿里云记录的 公网 ip

```
mongo 公网ip:27017
```

**连接到自定义的用户**

```
// admin数据库
> use admin
switched to db admin
> db.createUser({ user:"root", pwd:"123456", roles:["root"] })
Successfully added user: { "user" : "root", "roles" : [ "root" ] }

```

1. 修改mongodb.conf文件，启用身份验证

vi /etc/mongod.conf 

```
security:
  authorization: "enabled"   # disable or enabled
```

1. 重启MongoDB

```
sudo service mongod restart 
```

1. 用户认证

```
> use admin
switched to db admin
> db.auth("root", "123456")
1 // 授权成功
```

```
// 其他常用命令
db.updateUser(user, writeConcern) # 更新用户
db.dropUser('test') # 删除用户
```

本地远程链接到服务器

*连接有用户名和密码的MongoDB

mongo 远程主机ip或DNS:MongoDB端口号/数据库名 -u user -p password

如：mongo 168.11.125.149:27017/test -u admin -p admin





常见错误排查：

当我们使用`systemctl start mongod`启动MongoDB数据时，报错如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429170258276.png)

使用`systemctl status mongod.service`命令查看详细错误信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042917043499.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDgwNjE5Mw==,size_16,color_FFFFFF,t_70)

如果出现错误状态为status=14,那里主要原因就是文件权限问题，用户mongod没有对必需文件的写权限，导致数据库服务不能启动。

**解决办法：**
首先查看数据存储目录、日志目录，和/tmp下的*.sock(*是通配符)的文件这三个目录或文件的执行权限，可通过mongod.conf配置文件查看目录的具体位置

1、数据存储目录（dbpath）的位置,该目录默认在/var/lib/mongo下，执行如下命令修改目录权限(-R -递归处理所有文件和文件夹)

```
chown -R mongod:mongod /var/lib/mongo
```

2、再修改日志目录的权限，该文件默认在/var/log/mongodb目录，命令如下

```
chown -R mongod:mongod /var/log/mongodb
```

3、最后还有一个文件需要开放用户mongod的写权限，该文件叫*.sock(*是通配符)，在/tmp路径下。执行如下命令

```
#代码中的*为通配符，表示合法文件名，我的文件全名是mongodb-27017.sock
chown mongod:mongod /tmp/*.sock	
```

最后重新执行

```
#启动MongoDB服务
systemctl start mongod

#查看MongoDB服务状态
systemctl status mongod
```

启动成功

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429171605547.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDgwNjE5Mw==,size_16,color_FFFFFF,t_70)

**注意事项：**
如果不是因为上面这个原因：
可通过配置文件启动(下下策)

```
mongod -f /etc/mongod.conf
```

其它原因可能有：
1、mongod.conf配置文件存在格式错误
2、或者通过上面方法查看具体错误状态再查找

