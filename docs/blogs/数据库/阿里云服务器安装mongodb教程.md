# 阿里云服务器安装mongodb教程

本机配置：CentOS  7.7 64位

安装： mongodb 4.0版本

https://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/4.0/x86_64/



1.登录阿里云服务器

![image-20211015164239954](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20211015164239954.png)

远程链接VNC登录 输入密码进入

![image-20211015164432327](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20211015164432327.png)

１、首先更新一下包吧，多更无害。

```
sudo yum -y update
```

2、在/etc/yum.repos.d 创建一个 mongodb-org.repo 文件

```
sudo touch /etc/yum.repos.d/mongodb-org.repo
```

3、编辑 mongodb-org.repo 文件

```
sudo vi /etc/yum.repos.d/mongodb-org.repo
```

4. vim /etc/yum.repos.d/mongodb-org.repo

```
[mongodb-org] 
name=MongoDB Repository 
baseurl=https://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/4.0/x86_64/ 
gpgcheck=0 
enabled=1
```

5、安装MongoDB 

```
sudo yum install -y mongodb-org
```

ervice mongod start    #启动  
		service mongod stop    #停止  

service mongod restart   #重启 

6. 阿里云安全组添加开放27017端口

7.修改mongodb配置文件：
vi /etc/mongod.conf  // 编辑配置文件

```
net:
 port: 27017
 bindIp: 127.0.0.1 // mongodb 默认绑定的IP地址
```

默认情况下，阿里云只绑定了127.0.0.1本地地址，只能本地访问，需要在上面加上阿里云内网地址。

bindIp: 127.0.0.1,阿里云内网地址

**现在就可以远程连接了，但是任何用户都能远程连接。**

附：

看网上说这样不安全，任何用户只要获取了ip就都能访问，需要给数据库添加超级管理员

在阿里云服务器上输入

```python
mongo     // 本地连接数据库
use admin    // 切换到admin数据库，没有会自动添加
db.createUser(   // 创建管理员用户
 {
 user: "admin",  // 账号
 pwd: "admin",  // 密码
 roles: [ { role: "root", db: "admin" } ] // 角色：超级管理员，数据库：admin
 }
)
```

service mongod restart   #重启 

```python
执行
mongo      // 连接数据库
show dbs     // 显示所有数据库，这步会报错，说没有通过验证。
use admin     // 切换到admin数据库
db.auth('admin','admin') // 用上面设置的账号密码登录
如果返回 '1'表示验证成功， 如果是 '0' 表示验证失败
```

这样就本地电脑的cmd就要进行用户认证才能登录了

```python
本地cmd输入
mongo 阿里云外网地址 -u "admin" -p "admin" --authenticationDatabase admin  
```

roboMongo：切换到Authorization选项，选中Perform authorization,填上Database, user name, password,就可以连接成功了（我不用设置这个还是能连？？？）



mongodb不像mysql，验证的用户对所有数据库都有读写的能力，不同的库需要配置相关的用户信息才能对该库进行读写。比如有个myblog的数据库，需要对其有读写的能力，新建一个具有读写能力的用户。

命令如下：

```python
mongo   // 连接数据库
use admin  // 切换到admin数据库
db.auth('admin','admin')  // auth验证登录
use myblog      // 切换到myblog数据库
db.createUser(   // 创建普通用户
 {
 user: "keen",  // 账号
 pwd: "123",  // 密码
 roles: [ { role: "readWrite", db: "myblog" } ] // 角色：读写，数据库：myblog
 }
)
db.auth('keen', '123')   // 使用新建用户keen验证登录
```