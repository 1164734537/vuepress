## MongoDB

### 1.简介：

MongoDB是非关系型数据库，要了解非关系型数据库就必须先了解关系型数据库，关系数据库，是建立在关系模型基础上的数据库。比较有名气的关系型数据库，比如Oracle、DB2、MSSQL、Mysql。

MongoDB是一个基于分布式文件存储的数据库，由C++语言编写。目的是为WEB应用提供扩展的高性能的数据存储解决方案。MongoDB是一个介于关系型数据库和非关系型数据库之间的产品，是非关系型数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

### 2.**非关系数据库和关系型数据库的区别是什么？**

- 实质：非关系型数据库的实质：非关系型数据库产品是传统关系型数据库的功能阉割版，通过减少用不到或很少用的功能，来大幅度提高产品性能。
- 价格：目前的非关系型数据库基本都是免费的，而比较有名气的关系型数据库都是收费的，比如：Oracle、DB2、MSSQL。MySql虽然是免费的，但是处理大型数据还是要提前作很多工作的。
- 功能：实际开发中，很多业务需求，其实并不需要完整的关系型数据库功能，非关系型数据库的功能就足够使用了。这种情况下，使用性能更高、成本更低的非关系型数据库当然是更明智的选择。
- 了解关系型数据库和非关系型数据库的区别后，需要有一点的取舍，比较复杂和大型的项目不建议使用非关系型数据库，但是如果你想作个博客，CMS系统这类业务逻辑不复杂的程序，MongoDB是完全可以胜任的。

适用场景：

如果你还在为是否应该使用 MongoDB，不如来做几个选择题来辅助决策（注：以下内容改编自 MongoDB 公司 TJ 同学的某次公开技术分享）。

|                      应用特征                      | Yes / No |
| :------------------------------------------------: | :------: |
|           应用不需要事务及复杂 join 支持           | 必须 Yes |
| 新应用，需求会变，数据模型无法确定，想快速迭代开发 |    ？    |
|    应用需要2000-3000以上的读写QPS（更高也可以）    |    ？    |
|           应用需要TB甚至 PB 级别数据存储           |    ?     |
|          应用发展迅速，需要能快速水平扩展          |    ?     |
|              应用要求存储的数据不丢失              |    ?     |
|               应用需要99.999%高可用                |    ?     |
|        应用需要大量的地理位置查询、文本查询        |    ？    |

如果上述有1个 Yes，可以考虑 MongoDB，2个及以上的 Yes，选择 MongoDB 绝不会后悔。

1.[MongoDB下载地址](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-5.0.3-signed.msi)

1. 下载后进行安装，安装没什么难度，但是对于新手建议选择默认安装，而不选择自己配置。等我们完全熟悉后再定制式配置。
2. 安装时如果有安全软件，会报一些拦截，一律允许就好，不允许会安装失败的。
3. 安装完成后，需要配置“环境变量”，目的是再命令行中直接使用，而不需要输入很长的路径了。

**配置环境变量**

1.查找MongoDB安装目录，自定义安装就是你自定义安装到的盘下查找即可

我的是默认安装：C:\Program Files\MongoDB\Server\5.0\bin

2.加入到环境变量

我的电脑 右键 -> 属性 ->高级 -> 环境变量 ->选择用户变量中的 Path,点击编辑，把路径添加上去即可

![image-20210930111938934](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20210930111938934.png)

**运行MongoDB服务端**

安装好MongoDB数据库后，我们需要启用服务端才能使用。启用服务的命令是：Mongod

1. 打开命令行工具（win+R)，输入**cmd**回车

2. 执行 **mongod** ,在命令行中直接输入mongod,但是你会发现服务并没有启动，报了一个exception，服务停止了。

3. ![image-20210930141144439](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20210930141144439.png)

4. 翻译过来就是 我们没有建立 Mongodb 需要的文件夹，一般是安装盘的根目录，建立 data/db，这两个文件夹 C:\data\db

   我在本地C盘根目录下建立data 文件夹和子文件夹db,然后重复步骤2

5. 运行mongod:这时候服务就可以开启了，链接默认端口是 27017

   ![image-20210930141338764](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20210930141338764.png)

**链接服务：**

1.新开一个命令行工具（win+R)，输入**cmd**回车

2.输入 **mongo** 回车

服务端开启后，我们可以使用命令行来链接服务端，链接命令是mongo。重新打开一个命令行工具，然后输入mongo命令。也许你在链接时会报几个warning（警告），我们先不用管它，以后我们再慢慢学习。

```sql

C:\Users\123>mongo
MongoDB shell version v5.0.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("0a067c7c-1d96-4853-8d50-ef86636fc5f9") }
MongoDB server version: 5.0.3
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
We recommend you begin using "mongosh".
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
---
The server generated these startup warnings when booting:
        2021-09-27T11:12:03.231+08:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
---
---
        Enable MongoDB's free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
>
```

输入 ： show dbs 或  db.version()

如果这两条命令都可以正常的显示出结果，证明我们的MongoDB数据库已经安装成功了



**总结： mongod 启动数据库服务器（前提是配置好环境变量）**

​			**mongo 连接数据库**

### mongo shell 命令

**mongo与javascript的联系**

由于mongodb用C++高效地实现了底层的数据读写等功能。对外提供的操作API规则|调用方式，使用了JS来实现，故：`mongo`客户端中使用的命令与**JS极度相似**。MSSQL和MYsql用的都是Sql命令，MongoDB的操作命令就是前端最熟悉的JavaScript命令

下面举例看下mongo中实现 赋值，定义函数，输出的命令（有些细微差别）

**常用的赋值**和**输出命令**

```
> var x='hello world'
> print(x)
hello world
>
```

需要注意的是这里输出不再使用**console.log**，而是使用 **print() **稍有区别。

**定义函数**

```
> function uncle(){
... return 'chenshuhsu';
... }
> print(uncle())
chenshuhsu
>
```

我们用的都是JavaScript的语法，这些我们可以信手拈来，非常容易

### **MongoDB的存储结构** 

以前我们的关系型数据库的数据结构都是顶层是库，库下面是表，表下面是数据。但是MongoDB有所不同，库下面是集合，集合下面是文件

在学习中我们可以对比记忆，这样才能更好的了解这些名词，其实数据表就是集合，数据行就是文件，当然这只是为了记忆，实质还是有区别的。

<u>简单理解： 数据库 ---> 集合 ---> 文件（这个非常重要）</u>

### 基础shell查看命令

了解存储结构后，就可以开始学习我们的基础Shell命令了

- show dbs :显示已有数据库，如果你刚安装好，会默认有local、admin(config)，这是MongoDB的默认数据库，我们在新建库时是不允许起这些名称的。(在windows下会有config)

  ```
  > show dbs
  admin   0.000GB
  config  0.000GB
  local   0.000GB
  >
  ```

- use admin： 进入数据，没有则会新建，也可以理解成为使用数据库。成功会显示：switched to db admin。

  ```
  > use admin
  switched to db admin
  >
  ```

- show collections: 显示数据库中的集合（关系型中叫表，我们要逐渐熟悉）。

  ```
  > show collections
  system.version
  >
  ```

- db:显示当前位置，也就是你当前使用的数据库名称，这个命令算是最常用的，因为你在作任何操作的时候都要先查看一下自己所在的库，以免造成操作错误。

  ```
  > db
  admin
  >
  ```

- db.version() : 查看数据库版本命令

  ```
  > db.version()
  5.0.3
  >
  ```

  都是些基本的命令，敲入回车就可以使用

### 数据库基础增删改查

​	**一定要牢记数据结构：数据库 ---> （数据）集合 ---> 文件（数据）**

- use db（建立数据库）：use不仅可以进入一个数据库，如果你敲入的库不存在，它还可以帮你建立一个库。但是在没有集合前，它还是默认为空。
- db.集合.insert( ):新建数据集合和插入文件（数据），当集合没有时，这时候就可以新建一个集合，并向里边插入数据。Demo：db.user.insert({“name”:”czh”})
- db.集合.find( ):查询所有数据，这条命令会列出集合下的所有数据，可以看到MongoDB是自动给我们加入了索引值的。Demo：db.user.find()
- db.集合.findOne( ):查询第一个文件数据，这里需要注意的，所有MongoDB的组合单词都使用首字母小写的驼峰式写法。
- db.集合.update({查询},{修改}):修改文件数据，第一个是查询条件，第二个是要修改成的值。这里注意的是可以多加文件数据项的，比如下面的例子。

- db.集合.remove(条件)：删除文件数据，注意的是要跟一个条件。Demo:db.user.remove({“name”:”jspang”})
- db.集合.drop( ):删除整个集合，这个在实际工作中一定要谨慎使用，如果是程序，一定要二次确认。
- db.dropDatabase( ):删除整个数据库，在删除库时，一定要先进入数据库，然后再删除。实际工作中这个基本不用，实际工作可定需要保留数据和痕迹的。

模拟需求：我需要一个用户（userinfo）的数据表，插入一条 用户名为 uncle 的用户

分析：

​	1.新建立userinfo数据库

​	2.在userinfo数据库中，新建数据集合和插入文件（数据）

实操：

#### 1.查看已有数据库

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
>
```

#### 2.新建并进入userinfo 数据库

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use userinfo
switched to db userinfo
>
```

switched to db userinfo 这个表示已经进入到了 userinfo 数据库中

如果这时候，使用 show dbs 查看 已有数据库，会发现还没有 userinfo 这个数据库

原因： 当前数据库下 还没有集合， 默认不显示

使用 db:显示当前位置，再次确认是在 userinfo 这个数据库中

```
> db
userinfo
>
```

#### 3.增加数据集合和插入文件（数据）

注意：插入格式为**json对象**

<u>JSON 对象使用在大括号({})中书写。</u>

<u>对象可以包含多个 **key/value（键/值）**对。</u>

<u>key 必须是字符串，value 可以是合法的 JSON 数据类型（字符串, 数字, 对象, 数组, 布尔值或 null）。</u>

<u>key 和 value 中使用冒号(:)分割。</u>

<u>每个 key/value 对使用逗号(,)分割。</u>

```
> db.user.insert({"name":"uncle"})
WriteResult({ "nInserted" : 1 })
>
```

WriteResult({ "nInserted" : 1 })，写入结果：写入了一条数据

接下来查看下数据库集合中的数据

```
> db.user.find()
{ "_id" : ObjectId("6155845f138506298048b9c1"), "name" : "uncle" }
>
```

MongoDB是自动给我们加入了索引值的。

再次查看下 已有数据库

```
> show dbs
admin     0.000GB
config    0.000GB
local     0.000GB
userinfo  0.000GB
>
```

已经显示 出了 userinfo 这个数据库

这时候，老板有新需求，除了用户名，我还要收集年龄



修改文件数据，第一个是查询条件，第二个是要修改成的值。这里注意的是可以多加文件数据项的

```
> db.user.update({"name":"uncle"},{"name":"uncle","age":"18"})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
>
```

在查看下当前数据库集合的数据

```
> db.user.find()
{ "_id" : ObjectId("6155845f138506298048b9c1"), "name" : "uncle", "age" : "18" }
>
```

显示已经更改完成！

再次新增一个数据（文件），叫xiaoming 28岁(使用 db.集合.insert())

```
> db.user.insert({"name":"xiaoming","age":"28"})
WriteResult({ "nInserted" : 1 })
> db.user.find()
{ "_id" : ObjectId("6155845f138506298048b9c1"), "name" : "uncle", "age" : "18" }
{ "_id" : ObjectId("615d0050138506298048b9c2"), "name" : "xiaoming", "age" : "28" }
>
```

通过find()可以看到已经插入成功

删除名为 uncle 的数据（使用 db.集合.remove()）

```
> db.user.remove({"name":"uncle"})
WriteResult({ "nRemoved" : 1 })
> db.user.find()
{ "_id" : ObjectId("615d0050138506298048b9c2"), "name" : "xiaoming", "age" : "28" }
>
```

通过find()可以看到已经删除成功

此时，db 看一下还处于 userinfo数据库中

```
> db
userinfo
```

show dbs 看下

```
> show dbs
admin     0.000GB
config    0.000GB
local     0.000GB
userinfo  0.000GB
>
```

删除 user 集合（使用db.集合.drop()）

```
> db.user.drop()
true
>
```

返回true,显示集合已删除，使用 db 和 show dbs 查看，发现在userinfo 数据库中，但是由于userinfo数据库已经没有集合，所以show dbs 默认不显示 数据库 userinfo

```
> db
userinfo
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
>
```

新建两个集合（user和user2），并插入数据

```
> db.user.insert({"name":"czh"})
WriteResult({ "nInserted" : 1 })
> db.user2.insert({"name":"czh1"})
WriteResult({ "nInserted" : 1 })
>
```

show dbs 查看，userinfo 数据库由于有集合，已经显示

```
> show dbs
admin     0.000GB
config    0.000GB
local     0.000GB
userinfo  0.000GB
>
```

删除整个userinfo 数据库

**执行删除userinfo数据库操作之前，需要确认，是否在 userinfo 数据库中，这个必须要做的一步**

先db 看一下，如果不在，则use进入对应数据库，执行删除命令

```
> db
userinfo
> db.dropDatabase()
{ "ok" : 1 }
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
>
```

返回ok , show dbs 查看，userinfo 已删除成功

### 用js文件写mongo命令

1. **mongod 启动数据库服务器（前提是配置好环境变量）**

模拟一个用户登录日志表的信息，用JS进行编写。新在一个新建的目录下，比如E:/mr_chan/MongoDB/mongoShell，新建一个goTask.js文件。文件内容如下：

```
var userName="uncle" //声明一个登录名
var timeStamp = Date.parse(new Date()); //声明登录时的时间戳
var jsonDatabase={"loginUser":userName,"loginTime":timeStamp}; //组成JSON字符串
var db = connect('log'); // 连接数据库
db.login.insert(jsonDatabase);

print('[demo]log print success'); //没有错误显示成功
```

返回结果：

```
PS E:\mr_chan\MongoDB\mongoShell> mongo goTask.js
MongoDB shell version v5.0.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("42652df7-35a1-4621-af3a-60ecff9852d8") }
MongoDB server version: 5.0.3
connecting to: mongodb://127.0.0.1:27017/log
Implicit session: session { "id" : UUID("81cbb319-64f7-461b-9f0c-0fd4d6cc2341") }
MongoDB server version: 5.0.3
[demo]log print success
PS E:\mr_chan\MongoDB\mongoShell> 
```

连接服务器 mongo,查看数据库，发现插入成功

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
log     0.000GB
> db.login.find()
{ "_id" : ObjectId("615d0f9bb431b87720c53f62"), "loginUser" : "uncle", "loginTime" : 1633488795000 }
> db.login.find()
```

大部分Shell和在命令行中写法一样，但是也稍有不同

### 批量插入的正确方法：

在操作数据库时要注意两个能力：

- 第一个是快速存储能力。
- 第二个是方便迅速查询能力。

批量插入：

批量数据插入是以数组的方式进行的（如果写错，可以3个回车可以切出来）。我们现在命令行中敲入下面的代码，我们可以看到数据顺利插入了。

注意一次插入不要超过48M，向.zip和大图片什么的尽量用静态存储，MongoDB存储静态路径就好，这也算是一个规则。

批量插入性能测试(新建 test.js文件)

刚学了批量插入，那是循环插入快？还是批量插入快那？在一般人的认知里肯定是批量插入更快（其实这毋庸置疑），但我们要拿出极客精神，探个究竟，试着写一个小Shell，来验证一下结果。

先写一个循环插入方法：

```
var starTime = (new Date().getTime()); //得到开始时间
var db = connect('log'); //连接数据库
// 开始循环
for(let i=0;i<1000;i++){
    db.test.insert({num:i});
}
var runTime = (new Date().getTime())-starTime //计算时间差
print('This run this is:'+runTime+'ms'); //打印出来
```

运行：mongo test.js  发现用时 542ms

这个速度虽然和电脑性能有关，但还是不太理想，1000条数据用了将近半秒

```
PS E:\mr_chan\MongoDB\mongoShell> mongo test.js
MongoDB shell version v5.0.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("c7a54ad8-e94e-4a06-9473-66f51613463b") }
MongoDB server version: 5.0.3
connecting to: mongodb://127.0.0.1:27017/log
Implicit session: session { "id" : UUID("3afc3840-a323-4066-9bef-21eb6dce7fe9") }
MongoDB server version: 5.0.3
This run this is:542ms
PS E:\mr_chan\MongoDB\mongoShell>
```

批量插入代码：

```
var startTime = (new Date()).getTime();
var  db = connect('log');

var tempArray = []              //声明一个数组
for(let i=0;i<1000;i++){        //循环向数组中放入值
    tempArray.push({num:i});
}
db.test.insert(tempArray)       //批量一次插入

var runTime = (new Date()).getTime()-startTime;
print ('This run this is:'+runTime+'ms');
```

这次用了 58ms 性能远超循环插入



```
PS E:\mr_chan\MongoDB\mongoShell> mongo test.js  
MongoDB shell version v5.0.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("e7361470-55cf-4559-bfa3-886d77fcdc32") }
MongoDB server version: 5.0.3
connecting to: mongodb://127.0.0.1:27017/log
Implicit session: session { "id" : UUID("19c053e1-a915-4ba9-8c50-f9cb93f28707") }
MongoDB server version: 5.0.3
This run this is:58ms
PS E:\mr_chan\MongoDB\mongoShell> 
```

总结：在工作中一定要照顾数据库性能，这也是你水平的提现，一个技术会了很简单，但是要作精通不那么简单。在工作中如果在循环插入和批量插入举起不定，那就选批量插入吧，它会给我们更优的性能体验。

### 修改 ：Update 常见错误

## update() 方法

update() 方法用于更新已存在的文档。语法格式如下：

```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

**参数说明：**

- **query** : update的查询条件，类似sql update查询内where后面的。
- **update** : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- **upsert** : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi** : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern** :可选，抛出异常的级别。

**错误1：只update修改项**

如果你有过关系型数据库的经验，你会很容易犯只修改需要改变的一项，因为在关系型数据库中就是这样作的。先来准备一些数据，这些数据模拟了一个软件开发小组的组成（当然这不能当真）

新建文件 update_01.js

```
var workmate1={
    name:'JSPang',
    age:33,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        SkillTwo:'JavaScript',
        SkillThree:'PHP'
    },
    regeditTime:new Date()
}

var workmate2={
    name:'ShengLei',
    age:30,
    sex:1,
    job:'JAVA后端',
    skill:{
        skillOne:'HTML+CSS',
        SkillTwo:'J2EE',
        SkillThree:'PPT'
    },
    regeditTime:new Date()
}

var workmate3={
    name:'MinJie',
    age:20,
    sex:1,
    job:'UI设计',
    skill:{
        skillOne:'PhotoShop',
        SkillTwo:'UI',
        SkillThree:'Word+Excel+PPT'
    },
    regeditTime:new Date()
}
var db=connect('company')
var workmateArray=[workmate1,workmate2,workmate3]
db.workmate.insert(workmateArray)
print('[SUCCESS]: The data was inserted successfully!');
```

执行文件既可(运行：**mongo update_01.js**)，上面的代码，我们以文件的形式向数据库中插入了3条数据

这时候我突然发现UI职位的性别出现了错误，本来人家是个美女，这里缺写成了男，我们需要修改这条数据，但是经常会这样写。

```
db.workmate.update({name:'MinJie'},{sex:0})
```

这样写的问题是，我们的最后一条数据变成了只有sex:0，其它数据全部丢失了，这肯定不是我们想要的。这是新手在操作数据库修改时经常犯的一个错误，就是只修改变动的数据。

```
> db.workmate.find()
{ "_id" : ObjectId("615d39dfd331634563d325e9"), "name" : "JSPang", "age" : 33, "sex" : 1, "job" : "前端", "skill" : { "skillOne" : "HTML+CSS", "SkillTwo" : "JavaScript", "SkillThree" : "PHP" }, "regeditTime" : ISODate("2021-10-06T05:53:35.257Z") }
{ "_id" : ObjectId("615d39dfd331634563d325ea"), "name" : "ShengLei", "age" : 30, "sex" : 1, "job" : "JAVA后端", "skill" : { "skillOne" : "HTML+CSS", "SkillTwo" : "J2EE", "SkillThree" : "PPT" }, "regeditTime" : ISODate("2021-10-06T05:53:35.257Z") }
{ "_id" : ObjectId("615d39dfd331634563d325eb"), "sex" : 0 }
>
```

正确修改方法：

可以声明一个变量，然后把要改变数据的全部信息放入变量，最后执行修改操作

新建update_02.js

```
var db=connect('company')

var workmate3={
    name:'MinJie',
    age:20,
    sex:0,
    job:'UI设计',
    skill:{
        skillOne:'PhotoShop',
        SkillTwo:'UI',
        SkillThree:'Word+Excel+PPT'
    },
    regeditTime:new Date()
}
db.workmate.update({name:'MinJie'},workmate3)


print('[update]: The data was updated successfully');
```

这时候你需要删除（db.workmate.drop()）表中的数据，因为MinJie这个用户已经不在数据库中了，然后重新使用load方法载入插入数据再进行修改。

1.执行db.workmate.drop()

2.执行 load('./update_01.js')

3.再执行load('./update_02.js')

4.db.workmate.find()查看一下,可以看到数据已经修改成功

**用 mongo 链接数据库后，可以直接使用 load(js文件相对路径)，来执行相关代码**

现在这种方法才是正确的，数据修改正常了，但是你会发现写起来非常麻烦，而且特别容易写错。下节课我们会介绍update修改器，可以很好的解决这个问题。

### 初识update修改器

上面的修改用起来实在是不够优雅，这是我们一个伟大的前端不能接受的，所以我们要学习新知识update修改器，来解决这个问题。update修改器可以帮助我们快速和简单的修改数据，让我们的操作更简单方便。

**$set修改器**

用来修改一个指定的键值(key),这时候我们要修改刚才的sex和age就非常方便了，只要一句话就可以搞定。

```
db.workmate.update({"name":"MinJie"},{"$set":{sex:2,age:21}})
```

修改好后，我们可以用db.workmate.find()来进行查看，你会发现数据已经被修改。

修改嵌套内容（内嵌文档）

比如现在的UI的技能发生了变化，说她不会作PPT而是word作的很好，需要进行修改。这时候你会发现skill数据是内嵌的，这时候我们可以属性的形式进行修改，skill.skillThree。

```
db.workmate.update({"name":"MinJie"},{"$set":{"skill.skillThree":'word'}})
```

$unset用于将key删除

它的作用其实就是删除一个key值和键。一般女孩子都是不希望看到自己的年龄的，所以要求我们把年龄删除。这时候我们就可以使用$unset的形式。

```
db.workmate.update({"name":"MinJie"},{$unset:{"age":''}})
```

当你删除后，想加回来可以直接用set进行添加。

**$inc对数字进行计算**

它是对value值的修改，但是修改的必须是数字，字符串是不起效果的。我们现在要对MiJie的年龄减去2岁，就可以直接用$inc来操作。

```
db.workmate.update({"name":"MinJie"},{$inc:{"age":-2}})
```

**multi选项**

multi翻译过来就是多个的意思

现在领导说了，你要把每个人的爱好也加入进来，但是如果你直接写会只加一个，比如下面这种形式。

```
db.workmate.update({},{$set:{interest:[]}})
```

这时候你用db.workmate.find()查找，你会发现只改变了第一个数据，其他两条没有改变。这时候我们想改变就要用到multi选项。

```
db.workmate.update({},{"$set":{interest:[]}},{"multi":true})
```

这时候每个数据都发生了改变，multi是有ture和false两个值，true代表全部修改，false代表只修改一个（默认值）

**upsert选项**

upsert是在找不到值的情况下，直接插入这条数据。比如我们这时候又来了一个新同事xiaoWang，我们这时候修改他的信息，age设置成20岁，但集合中并没有这条数据。这时候可以使用upsert选项直接添加。

```
db.workmate.update({name:'xiaoWang'},{$set:{age:20}},{upsert:true})
```

upsert也有两个值：true代表没有就添加，false代表没有不添加(默认值)。

总结：

**1.$set 修改一个指定的键值(key)**

**2.$unset 删除一个key值和键**

**3.$inc 对value值的修改，但是修改的必须是数字，字符串是不起效果的**

**4.multi 需要修改多条数据，默认为false** 

**5.upsert 在找不到值的情况下，直接插入这条数据。 默认为false，找不到的情况下，不插入**

### update数组修改器

数组修改器的操作，当然也可以修改内嵌文档，也就是对象形式的数据

**$push追加数组/内嵌文档值**

$push的功能是追加数组中的值，但我们也经常用它操作内嵌稳文档，就是{}对象型的值。先看一个追加数组值的方式，比如我们要给小王加上一个爱好(interset)为画画（draw）

```
db.workmate.update({name:'xiaoWang'},{$push:{interest:'draw'}})
```

当然$push修饰符还可以为内嵌文档增加值，比如我们现在要给我们的UI，增加一项新的技能skillFour为draw，这时候我们可以操作为：

```
db.workmate.update({name:"MinJie"},{$push:{"skill.skillFour":"draw"}})
```

$push修饰符在工作中是最常用的，因为我们的数据一般都会涉及数组和内嵌文档的操作，一定要掌握。

**$ne查找是否存在**（写在查询条件中）

主要的作用是，检查一个值是否存在，如果不存在再执行操作，存在就不执行，这个很容易弄反

例子：如果xiaoWang的爱好（interest）里没有palyGame这个值，我们就加入Game这个爱好

```
db.workmate.update({name:'xiaoWang',"interest":{$ne:'playGame'}},{$push:{interest:'Game'}})
```

**总结：没有则修改，有则不修改。**

**$addToSet 升级版的$ne**（当修饰符使用）

它是$ne的升级版本（查找是否存在，不存在就push上去），操作起来更直观和方便，所以再工作中这个要比$en用的多。

我们现在要查看小王(xiaoWang)兴趣(interest)中有没有阅读（readBook）这项，没有则加入读书(readBook)的兴趣.

```
db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:"readBook"}})
```

**$each批量追加**

传入一个数组，一次增加多个值进去，相当于批量操作，性能同样比循环操作要好很多，这个是需要我们注意的，工作中也要先组合成数组，然后用批量的形式进行操作。

例子：我们现在要给xiaoWang,一次加入三个爱好，唱歌（Sing），跳舞（Dance），编码（Code）。

**$pop 删除数组值**

$pop只删除一次，并不是删除所有数组中的值。而且它有两个选项，一个是1和-1。

- 1：从数组末端进行删除
- -1：从数组开端进行删除

例子：现在要删除xiaoWang的编码爱好（code）。

**数组定位修改**

有时候只知道修改数组的第几位，但并不知道是什么，这时候我们可以使用interest.int 的形式。

例子，比如我们现在要修改xiaoWang的第三个兴趣为编码（Code），注意这里的计数是从0开始的。

```
db.workmate.update({name:'xiaoWang'},{$set:{"interest.2":"Code"}})
```

### 修改;状态返回与安全

在操作数据库时，对数据的修改是需要有足够的安全措施的，其实在实际工作中，我们用db.collections.update的时候不多，在修改时我们都会用findAndModify，它可以给我们返回来一些必要的参数，让我们对修改多了很多控制力，控制力的加强也就是对安全的强化能力加强了。

**应答式写入：**

先来了解一个概念：应答式写入。

在之前的操作中，我们的操作都是非应答式写入，就是在操作完数据库后，它并没有给我们任何的回应和返回值，而是我们自己安慰自己写了一句话（print(‘[update]:The data was updated successfully’);）。这在工作中是不允许的，因为根本不能提现我们修改的结果。

应答式写入就会给我们直接返回结果（报表），结果里边的包含项会很多，这样我们就可以很好的进行程序的控制和安全机制的处理。有点像前端调用后端接口，无论作什么，后端都要给我一些状态字一样。

**db.runCommand( ):**

它是数据库运行命令的执行器，执行命令首选就要使用它，因为它在Shell和驱动程序间提供了一致的接口。（几乎操作数据库的所有操作，都可以使用runCommand来执行）现在我们试着用runCommand来修改数据库，看看结果和直接用db.collections.update有什么不同。

```
> db.workmate.update({sex:1},{$set:{money:1000}},false,true)
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 2 })
```

然后使用db.runCommand()

```
> var resultMessage = db.runCommand({getLastError:1})
> printjson(resultMessage)
```

输出：

```
{
        "connectionId" : 31,
        "updatedExisting" : true,
        "n" : 2,
        "syncMillis" : 0,
        "writtenTo" : null,
        "writeConcern" : {
                "w" : 1,
                "wtimeout" : 0
        },
        "err" : null,
        "ok" : 1
}
```

- false：第一句末尾的false是upsert的简写，代表没有此条数据时不增加;
- true：true是multi的简写，代表修改所有，这两个我们在前边课程已经学过。
- getLastError:1 :表示返回功能错误，这里的参数很多，如果有兴趣请自行查找学习，这里不作过多介绍。
- printjson：表示以json对象的格式输出到控制台。

db.listCommands( ):查看所有的Commad命令，内容很多，本套课程只讲解工作中经常使用的内容。

比如我们要查看是否和数据库链接成功了，就可以使用Command命令。

```
db.runCommand({ping:1})
```

返回ok：1就代表链接正常。

### 额外了解

**定义**

- `db.runCommand(command)`

它是数据库运行命令的执行器，执行命令首选就要使用它，因为它在Shell和驱动程序间提供了一致的接口。（几乎操作数据库的所有操作，都可以使用runCommand来执行）现在我们试着用runCommand来修改数据库，看看结果和直接用db.collections.update有什么不同。

| 范围      | 类型         | 描述                                                         |
| :-------- | :----------- | :----------------------------------------------------------- |
| `command` | 文件或字符串 | “[数据库命令](https://docs.mongodb.com/manual/reference/glossary/#std-term-database-command)，以[文档](https://docs.mongodb.com/manual/reference/glossary/#std-term-document)形式或字符串指定。如果指定为字符串，[`db.runCommand()`](https://docs.mongodb.com/manual/reference/method/db.runCommand/#mongodb-method-db.runCommand) 则将字符串转换为文档。” |

要以毫秒为单位指定时间限制

**行为**

[`db.runCommand()`](https://docs.mongodb.com/manual/reference/method/db.runCommand/#mongodb-method-db.runCommand)在当前数据库的上下文中运行命令。某些命令仅适用于`admin`数据库的上下文，您必须`db`在运行这些命令之前将对象更改为 或使用[`db.adminCommand()`](https://docs.mongodb.com/manual/reference/method/db.adminCommand/#mongodb-method-db.adminCommand).

**回复**

该方法返回一个包含以下字段的响应文档：

场地

描述

*<命令结果>*

特定`command`于运行的结果字段。

```
ok
```

指示命令是成功 ( `1`) 还是失败 ( `0`) 的数字。

```
operationTime
```

已执行操作的逻辑时间，在 MongoDB 中由 oplog 条目中的时间戳表示。*仅适用于副本集和分片集群*如果该命令不生成 oplog 条目，例如读取操作，则该操作不会提前逻辑时钟。在这种情况下，`operationTime`返回：对于读关注[`"local"`](https://docs.mongodb.com/manual/reference/read-concern-local/#mongodb-readconcern-readconcern.-local-)，oplog 中最新条目的时间戳。对于读关注[`"majority"`](https://docs.mongodb.com/manual/reference/read-concern-majority/#mongodb-readconcern-readconcern.-majority-)和 [`"linearizable"`](https://docs.mongodb.com/manual/reference/read-concern-linearizable/#mongodb-readconcern-readconcern.-linearizable-)，[`majority-acknowledged`](https://docs.mongodb.com/manual/reference/write-concern/#mongodb-writeconcern-writeconcern.-majority-) oplog 中最新条目的时间戳。对于与[因果一致会话](https://docs.mongodb.com/manual/core/read-isolation-consistency-recency/#std-label-causal-consistency)相关的操作，MongoDB 驱动程序使用此时间自动设置[读取操作和`afterClusterTime`](https://docs.mongodb.com/manual/reference/read-concern/#std-label-afterClusterTime).*3.6版中的新功能*。

```
$clusterTime
```

返回签名集群时间的文档。集群时间是用于操作排序的逻辑时间。*仅适用于副本集和分片集群。仅限内部使用。*该文档包含以下字段：`clusterTime`：成员已知的最高集群时间的时间戳。`signature`：包含集群时间的哈希值和用于签署集群时间的密钥的 id 的文档。*3.6版中的新功能*。

**查询和写入操作命令**

| Description                                                  | Name                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| 删除一个或多个文档。                                         | [delete](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-delete.html#dbcmd.delete) |
| 不推荐使用。在数据库服务器上运行 JavaScript 函数。           | [eval](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-eval.html#dbcmd.eval) |
| 选择集合或视图中的文档。                                     | [find](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-find.html#dbcmd.find) |
| 返回并修改单个文档。                                         | [findAndModify](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-findAndModify.html#dbcmd.findAndModify) |
| 返回上一个操作的成功状态。                                   | [getLastError](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-getLastError.html#dbcmd.getLastError) |
| 返回当前由光标指向的批处理文档。                             | [getMore](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-getMore.html#dbcmd.getMore) |
| *已弃用*。返回包含自上一个[resetError](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-resetError.html#dbcmd.resetError)命令以来的所有错误的状态文档。 | [getPrevError](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-getPrevError.html#dbcmd.getPrevError) |
| 插入一个或多个文档。                                         | [insert](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-insert.html#dbcmd.insert) |
| 让应用程序从集合中读取文档时使用多个并行游标。               | [parallelCollectionScan](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-parallelCollectionScan.html#dbcmd.parallelCollectionScan) |
| *已弃用*。重置上一个错误状态。                               | [resetError](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-resetError.html#dbcmd.resetError) |
| 更新一个或多个文档。                                         | [update](https://www.docs4dev.com/docs/zh/mongodb/v3.6/reference/reference-command-update.html#dbcmd.update) |

**findAndModify:**

从名字上就可以看出，findAndModify是查找并修改的意思。配置它可以在修改后给我们返回修改的结果。我们先看下面的代码：

```
var myModify={
    findAndModify:"workmate",
    query:{name:'JSPang'},
    update:{$set:{age:18}},
    new:true    //更新完成，需要查看结果，如果为false不进行查看结果
}
var ResultMessage=db.runCommand(myModify);

printjson(ResultMessage)
```

```
{
        "lastErrorObject" : {
                "n" : 1,
                "updatedExisting" : true
        },
        "value" : {
                "_id" : ObjectId("615e5ccafeca5485de553eab"),
                "name" : "JSPang",
                "age" : 18,
                "sex" : 1,
                "job" : "前端",
                "skill" : {
                        "skillOne" : "HTML+CSS",
                        "SkillTwo" : "JavaScript",
                        "SkillThree" : "PHP"
                },
                "regeditTime" : ISODate("2021-10-07T02:34:50.575Z"),
                "interest" : [ ],
                "money" : 1000
        },
        "ok" : 1
}
```

findAndModify的性能是没有直接使用db.collections.update的性能好，但是在实际工作中都是使用它，毕竟要商用的程序安全性还是比较重要的。

**findAndModify属性值：**

- findAndModify属性值：
-  query：需要查询的条件/文档  
- sort: 进行排序  
- remove：[boolean]是否删除查找到的文档，值填写true，可以删除。  
- new:[boolean]返回更新前的文档还是更新后的文档。 
-  fields：需要返回的字段  
- upsert：没有这个值是否增加。

MongoDB的查找操作在开发中查找是应用最多的操作，几乎每个模块都会用到，所以查找的部分将是重中之重，

**构造数据：**

```
var workmate1={
    name:'JSPang',
    age:33,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate2={
    name:'ShengLei',
    age:31,
    sex:1,
    job:'JAVA后端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'J2EE',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate3={
    name:'MinJie',
    age:18,
    sex:0,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate4={
    name:'XiaoWang',
    age:25,
    sex:1,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate5={
    name:'LiangPeng',
    age:28,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate6={
    name:'HouFei',
    age:25,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate7={
    name:'LiuYan',
    age:35,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate8={
    name:'DingLu',
    age:20,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate9={
    name:'JiaPeng',
    age:29,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var workmate10={
    name:'LiJia',
    age:26,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:[]
}
var db=connect('company');
var workmateArray=[workmate1,workmate2,workmate3,workmate4,workmate5,workmate6,workmate7,workmate8,workmate9,workmate10];
db.workmate.insert(workmateArray);
print('[SUCCESS]：The data was inserted successfully');
```

**筛选字段**

现在返回来的数据项太多，太乱，有时候我们的程序并不需要这么多选项。比如我们只需要姓名和技能就可以了。这时候我们需要写第二个参数，看下面的代码

```
db.workmate.find(
    {"skill.skillOne":"HTML+CSS"},
    {name:true,"skill.skillOne":true}
)
```

你会在终端中看到如下结果：

```
{ "_id" : ObjectId("5a611350c4e36dee6008987a"), "name" : "JSPang", "skill" : { "skillOne" : "HTML+CSS" } }
{ "_id" : ObjectId("5a611350c4e36dee6008987b"), "name" : "ShengLei", "skill" : { "skillOne" : "HTML+CSS" } }
{ "_id" : ObjectId("5a611350c4e36dee6008987e"), "name" : "LiangPeng", "skill" : { "skillOne" : "HTML+CSS" } }
{ "_id" : ObjectId("5a611350c4e36dee6008987f"), "name" : "HouFei", "skill" : { "skillOne" : "HTML+CSS" } }
{ "_id" : ObjectId("5a611350c4e36dee60089882"), "name" : "JiaPeng", "skill" : { "skillOne" : "HTML+CSS" } }
{ "_id" : ObjectId("5a611350c4e36dee60089883"), "name" : "LiJia", "skill" : { "skillOne" : "HTML+CSS" } }
```

细心的小伙伴会发现还不够完美，多了一个ID字段，这个也不是我们想要的，这时候只要把_id:false就可以了。当然这里的false和true，也可以用0和1表示。

```
db.workmate.find(
    {"skill.skillOne":"HTML+CSS"},
    {name:true,"skill.skillOne":true,_id:false}
)
```

这时候你在终端中查看结果，已经是我们想要的了。

```
{ "name" : "JSPang", "skill" : { "skillOne" : "HTML+CSS" } }
{ "name" : "ShengLei", "skill" : { "skillOne" : "HTML+CSS" } }
{ "name" : "LiangPeng", "skill" : { "skillOne" : "HTML+CSS" } }
{ "name" : "HouFei", "skill" : { "skillOne" : "HTML+CSS" } }
{ "name" : "JiaPeng", "skill" : { "skillOne" : "HTML+CSS" } }
{ "name" : "LiJia", "skill" : { "skillOne" : "HTML+CSS" } }
```

其实这些查找操作，都是在作等于的阶段，但是不光只有等于查询，我们需要更多的查询条件。

**不等修饰符**

- 小于($lt):英文全称less-than

- 小于等于($lte)：英文全称less-than-equal

- 大于($gt):英文全称greater-than

- 大于等于($gte):英文全称greater-than-equal

- 不等于($ne):英文全称not-equal 

  我们现在要查找一下，公司内年龄小于30大于25岁的人员。看下面的代码。

```
> db.workmate.find({age:{$lte:30,$gte:25}},{name:true,"skill.skillOne":true,_id:false})
{ "name" : "XiaoWang", "skill" : { "skillOne" : "PhotoShop" } }
{ "name" : "LiangPeng", "skill" : { "skillOne" : "HTML+CSS" } }
{ "name" : "HouFei", "skill" : { "skillOne" : "HTML+CSS" } }
{ "name" : "JiaPeng", "skill" : { "skillOne" : "HTML+CSS" } }
{ "name" : "LiJia", "skill" : { "skillOne" : "HTML+CSS" } }
>
```

**日期查找**

MongoDB也提供了方便的日期查找方法，现在我们要查找注册日期大于2018年1月10日的数据，我们可以这样写代码。

```
var startDate= new Date('01/01/2018');
db.workmate.find(
    {regeditTime:{$gt:startDate}},
    {name:true,age:true,"skill.skillOne":true,_id:false}
)
```

我们先声明了一个日期变量，然后把使用大于符进行筛选。

### 查询：find的多条件查询

很多时候我们需要查询的值不只是有一个简单的条件，比如我们现在要查询一下同事中是33岁和25岁的，还比如我们要查询同事中大于30岁并且会PHP技能的。MongoDB在这方面也支持的很好

**$in修饰符**

in修饰符可以轻松解决一键多值的查询情况。就如上面我们讲的例子，现在要查询同事中年龄是25岁和33岁的信息。

```
db.workmate.find({age:{$in:[25,33]}},
    {name:1,"skill.skillOne":1,age:1,_id:0}
)
```

于$in相对的修饰符是$nin，就是查询除了$in条件以外的值

**$or修饰符**

它用来查询多个键值的情况，就比如查询同事中大于30岁或者会做PHP的信息。主要区别是两个Key值。$in修饰符是一个Key值，这个需要去比较记忆。

```
db.workmate.find({$or:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```

or很好理解，就是或者的意思，我们查出来的结果也是一样的，查出了年龄大于30岁的，或者会做PHP的信息。相对应的还有$nor修饰符，这里不作演示了，自己试验一下。

**$and修饰符**

$and用来查找几个key值都满足的情况，比如要查询同事中大于30岁并且会做PHP的信息，这时需要注意的是这两项必须全部满足。当然写法还是比较简单的。只要把上面代码中的or换成and就可以了。

```
db.workmate.find({$and:[
    {age:{$gte:30}},
    {"skill.skillThree":'PHP'}
]},
    {name:1,"skill.skillThree":1,age:1,_id:0}
)
```

**$not修饰符**

它用来查询除条件之外的值，比如我们现在要查找除年龄大于20岁，小于30岁的人员信息。需要注意的是$not修饰符不能应用在条件语句中，只能在外边进行查询使用。

```
db.workmate.find({
    age:{
        $not:{
            $lte:30,
            $gte:20
        }
    }
},
{name:1,"skill.skillOne":1,age:1,_id:0}
)
```

知识比较简单，但是要区分记忆，很容易搞混。

### 查询：find的数组查询

数组的查询，在学习update时就花了重墨去讲数组的操作，可见数组的操作在MongoDB中很受重视，因为稍微大型一点的项目，设计的数据集合都复杂一些，都会涉及数组的操作

**完善数据**

以前的我们的workmate集合对数组涉及还很少，现在在数据中加入了兴趣（interest），并且给每个人加入了一些兴趣，比如有写代码，做饭，看电影…..

当然这些数据你可以自己随意构建，但是如果你不想自己费事费脑，这里也为你准备好了数据，你只要把以前的表删除（drop）掉，重新载入(load)就可以了。

```
var workmate1={
    name:'JSPang',
    age:33,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:['看电影','看书','吃美食','钓鱼','旅游']
}

var workmate2={
    name:'ShengLei',
    age:31,
    sex:1,
    job:'JAVA后端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'J2EE',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:['篮球','看电影','做饭']
}

var workmate3={
    name:'MinJie',
    age:18,
    sex:0,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:['做饭','画画','看电影']
}
var workmate4={
    name:'XiaoWang',
    age:25,
    sex:1,
    job:'UI',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'UI',
        skillThree:'PPT'
    },
    regeditTime:new Date(),
    interest:['写代码','篮球','画画']
}
var workmate5={
    name:'LiangPeng',
    age:28,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:['玩游戏','写代码','做饭']
}

var workmate6={
    name:'HouFei',
    age:25,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
    },
    regeditTime:new Date(),
    interest:['化妆','读书','做饭']
}

var workmate7={
    name:'LiuYan',
    age:35,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:['画画','聚会','看电影']
}


var workmate8={
    name:'DingLu',
    age:20,
    sex:0,
    job:'美工',
    skill:{
        skillOne:'PhotoShop',
        skillTwo:'CAD',
    },
    regeditTime:new Date(),
    interest:['美食','看电影','做饭']
}

var workmate9={
    name:'JiaPeng',
    age:29,
    sex:1,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:['写代码','篮球','游泳']
}

var workmate10={
    name:'LiJia',
    age:26,
    sex:0,
    job:'前端',
    skill:{
        skillOne:'HTML+CSS',
        skillTwo:'JavaScript',
        skillThree:'PHP'
    },
    regeditTime:new Date(),
    interest:['玩游戏','美食','篮球']
}



var db=connect('company');
var workmateArray=[workmate1,workmate2,workmate3,workmate4,workmate5,workmate6,workmate7,workmate8,workmate9,workmate10];
db.workmate.insert(workmateArray);
print('[SUCCESS]：The data was inserted successfully');
```

**基本数组查询**

比如现在我们知道了一个人的爱好是’画画’,’聚会’,’看电影’，但我们不知道是谁，这时候我们就可以使用最简单的数组查询（实际工作中，这种情况基本不常用，所以这种查询只作知识点储备就可以了）

```
db.workmate.find({interest:['画画','聚会','看电影']},
    {name:1,interest:1,age:1,_id:0} 
)
```

在终端中运行后，我们得到了数据。这时候我们说，想查出看兴趣中有看电影的员工信息。按照正常逻辑，应该使用下面的代码。

```
db.workmate.find({interest:['看电影']},
    {name:1,interest:1,age:1,_id:0} 
)
```

运行后，并没有如我们所愿得到相应的人员数据，数据为空。那问题出现在哪里？问题就在于我们写了一个中括号([]),因为加上中括号就相当于完全匹配了，所以没有得到一条符合查询条件的数据。我们去掉中括号再看看结果

```
db.workmate.find({interest:'看电影'},
    {name:1,interest:1,age:1,_id:0} 
)
```

这就是我们在数组中查询一项的方法，这也是数组查询的最简单用法。

**$all-数组多项查询**

现在我们的条件升级了，要查询出喜欢看电影和看书的人员信息，也就是对数组中的对象进行查询，这时候要用到一个新的查询修饰符$all。看下面的例子：

```
db.workmate.find(
    {interest:{$all:["看电影","看书"]}},
    {name:1,interest:1,age:1,_id:0} 
)
```

这时候找到了兴趣中既有看电影又有看书的人员。

**$in-数组的或者查询**

用$all修饰符，是需要满足所有条件的，$in主要满足数组中的一项就可以被查出来（有时候会跟$or弄混）。比如现在要查询爱好中有看电影的或者看书的员工信息。

```
db.workmate.find(
    {interest:{$in:["看电影","看书"]}},
    {name:1,interest:1,age:1,_id:0} 
)
```

**$size-数组个数查询**

$size修饰符可以根据数组的数量查询出结果。比如现在我们要查找兴趣的数量是5个人员信息，这时候就可以使用$size。

```
db.workmate.find(
    {interest:{$size:5}},
    {name:1,interest:1,age:1,_id:0} 
)
```

这时候是5项爱好的人员就会显示出来了。

**$slice-显示选项**

有时候我并不需要显示出数组中的所有值，而是只显示前两项，比如我们现在想显示每个人兴趣的前两项，而不是把每个人所有的兴趣都显示出来。

```
db.workmate.find(
    {},
    {name:1,interest:{$slice:2},age:1,_id:0} 
)
```

这时候就显示出了每个人兴趣的前两项，如果我们想显示兴趣的最后一项，可以直接使用slice:-1，来进行查询。

```
db.workmate.find(
    {},
    {name:1,interest:{$slice:-1},age:1,_id:0} 
)
```

查询：find的参数使用方法

前边已经讲的查询，都是在操作find方法的第一个参数（query）和第二个参数（fields）。find还有几个常用的参数，这些参数多用在分页和排序上。这节我们就把这些常用的选项说一说，理解后我们演示一个分页的效果。

find参数：

- query：这个就是查询条件，MongoDB默认的第一个参数。
- fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
- limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
- skip:跳过多少个显示，和limit结合可以实现分页。
- sort：排序方式，从小到大排序使用1，从大到小排序使用-1。

明白了上面这些选项，现在可以作一个最简单的分页，我们把同事集合（collections）进行分页，每页显示两个，并且按照年龄从小到大的顺序排列。

**$where修饰符**

它是一个非常强大的修饰符，但强大的背后也意味着有风险存在。它可以让我们在条件里使用javascript的方法来进行复杂查询。我们先来看一个最简单的例子，现在要查询年龄大于30岁的人员。

```
db.workmate.find(
    {$where:"this.age>30"},
    {name:true,age:true,_id:false}
)
```

这里的this指向的是workmate（查询集合）本身。这样我们就可以在程序中随意调用。虽然强大和灵活，但是这种查询对于数据库的压力和安全性都会变重，所以在工作中尽量减少$where修饰符的使用。

### 查询：find如何在js文件中使用

前边使用find都是JS在文本中写完，然后复制到终端中执行，这样非常麻烦。在讲的过程中已经有很多小伙伴在问我如何像写update语句一样，在文本中直接运行。这节课我们就学习一下如何直接在文本中执行。

**hasNext循环结果**

想在文本中执行我们的find语句要用到游标和循环的操作，先看一下代码，代码中我已经对每一句进行了注释。

```
var db = connect("company")  //进行链接对应的集合collections
var result = db.workmate.find() //声明变量result，并把查询结果赋值给result
//利用游标的hasNext()进行循环输出结果。
while(result.hasNext()){
    printjson(result.next())  //用json格式打印结果
}
```

写完后，现在你只需要在终端中进行load()就可以执行了，再也不用麻烦的复制粘贴了。

**forEach循环**

利用hasNext循环结果，需要借助while的帮助，MongoDB也为我们提供了forEach循环，现在修改上边的代码，使用forEach循环来输出结果。

```
var db = connect("company")  //进行链接对应的集合collections
var result = db.workmate.find() //声明变量result，并把查询结果赋值给result
//利用游标的hasNext()进行循环输出结果。
result.forEach(function(result){
    printjson(result)
})
```

作为个人觉的forEach循环更为优雅。这两种方法都是非常不错的,凭借自己爱好进行选择吧。

总结：那我们MongoDB的基础部分就全部讲完了，我们学会了它的增、删、改、查，你也可以使用MongoDB进行一些操作了。需要注意的是，只是这篇文章的完结，下篇文章我们进行讲解MongoDB，开始讲解MongoDB的索引。

索引：构造百万级数据

索引的性能提现必须要有大量数据才能看出来，你说你有10条20条数据，这是根本看不出来效果的，这节课就通过随机数的方法，创造出一个百万级数据的数据库出来

1.前提，安装好node

2.生成随机数

```
function GetRandomNum(min,max){
    let range = max-min;   //得到随机数区间
    let rand = Math.random(); //得到随机值
    return (min + Math.round(rand *range)); //最小值+随机数取整
}

console.log(GetRandomNum(10000,99999));
```

**制作随机用户名：**

有了随机数的方法，我们就可以制作一个随机生成的用户名。目的是存在不同的用户名，方便我们测试查询速度。

```
//生成随机数

function GetRandomNum(min,max){
    let range = max-min;   //得到随机数区间
    let rand = Math.random(); //得到随机值
    return (min + Math.round(rand *range)); //最小值+随机数取整
}

//console.log(GetRandomNum(10000,99999));

//生成随机用户名
function GetRadomUserName(min,max){
    let tempStringArray= "123456789qwertyuiopasdfghjklzxcvbnm".split("");//构造生成时的字母库数组
    let outPuttext = ""; //最后输出的变量
    //进行循环，随机生产用户名的长度，这里需要生成随机数方法的配合
    for(let i=1 ;i<GetRandomNum(min,max);i++){
        //随机抽取字母，拼装成需要的用户名
        outPuttext=outPuttext+tempStringArray[GetRandomNum(0,tempStringArray.length)]
    }
    return outPuttext;
}

console.log(GetRadomUserName(7,16))
```

**插入200万数据**

有了生成随机数和随机用户名的方法，就可以生产百万级数据了。代码如下：

```
var db = connect('company');  //链接数据库
db.randomInfo.drop();  //插入前先清除集合
var  tempInfo = []; //声明一个数组用于存储数据
for (let i=0;i<2000000;i++){  //循环200万次，插入到数组中
    tempInfo.push({
        username:GetRadomUserName(7,16),
        regeditTime:new Date(),
        randNum0:GetRandomNum(100000,999999),
        randNum1:GetRandomNum(100000,999999),
        randNum2:GetRandomNum(100000,999999),
        randNum3:GetRandomNum(100000,999999),
        randNum4:GetRandomNum(100000,999999),
        randNum5:GetRandomNum(100000,999999),
        randNum6:GetRandomNum(100000,999999),
        randNum7:GetRandomNum(100000,999999),
        randNum8:GetRandomNum(100000,999999),
        randNum8:GetRandomNum(100000,999999),
    })
}
db.randomInfo.insert(tempInfo); //两百万条数据插入数据库
var runTime = (new Date()).getTime()-startTime;
```

 show dbs

use company

db

show collections

查看状态

db.randomInfo.stats()

db.randomInfo.skip(50000).find()

用户：yqkwkq

```
> load('./demo1.js')
connecting to: mongodb://127.0.0.1:27017/company
Implicit session: session { "id" : UUID("b0017227-7e62-471e-a93e-7106afbc6927") }
MongoDB server version: 5.0.3
{
        "_id" : ObjectId("616403985b3bea3eb88f94ec"),
        "username" : "yqkwkq",
        "regeditTime" : ISODate("2021-10-11T09:27:02.773Z"),
        "randNum0" : 139630,
        "randNum1" : 999929,
        "randNum2" : 751995,
        "randNum3" : 222234,
        "randNum4" : 880274,
        "randNum5" : 639383,
        "randNum6" : 778369,
        "randNum7" : 208383,
        "randNum8" : 804809
}
[Demo]this run time is 8 ms
true
```



load('./demo1.js')

[Demo]this run time is 883 ms





查看索引

```
> db.randomInfo.getIndexes()
[ { "v" : 2, "key" : { "_id" : 1 }, "name" : "_id_" } ]
>
```

建立索引

`db.collection.``ensureIndex`(*键*,*选项*) 

*自 3.0 版后已弃用：*[`db.collection.ensureIndex()`](https://docs.mongodb.com/v4.0/reference/method/db.collection.ensureIndex/#db.collection.ensureIndex)已替换为 [`db.collection.createIndex()`](https://docs.mongodb.com/v4.0/reference/method/db.collection.createIndex/#db.collection.createIndex).

如果索引不存在，则在指定字段上创建索引。

```
db.randomInfo.createIndex({username:1})
```

结果如下：已经变成了两条索引。

```
> db.randomInfo.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_"
        },
        {
                "v" : 2,
                "key" : {
                        "username" : 1
                },
                "name" : "username_1"
        }
]
>
```

然后我们在来load一下demo01.js文件（load(‘./demo01.js’)），看一下现在多少秒可以查询出来。这时候查询的时间缩短到了8ms左右，查询性能提升了大概200倍左右。

总结：无论是在关系型数据库还是文档数据库，建立索引都是非常重要的。前边讲了，索引这东西是要消耗硬盘和内存资源的，所以还是要根据程序需要进行建立了。MongoDB也给我们进行了限制，只允许我们建立64个索引值。

**索引中的小坑**

记得我刚学MongoDB时，学会了索引，我就到处想用，甚至几百条数据的集合(collections)，我也自作聪明的用一下，但结果往往是画蛇添足，走了不少弯路。通过实际开发和性能对比，我自己总结了几条不用索引的情况（不一定对，但是自己的经验之谈）。

- 数据不超万条时，不需要使用索引。性能的提升并不明显，而大大增加了内存和硬盘的消耗。
- 查询数据超过表数据量30%时，不要使用索引字段查询。实际证明会比不使用索引更慢，因为它大量检索了索引表和我们原表。
- 数字索引，要比字符串索引快的多，在百万级甚至千万级数据量面前，使用数字索引是个明确的选择。
- 把你经常查询的数据做成一个内嵌数据（对象型的数据），然后集体进行索引。



**索引：复合索引**

好了上边我们讲了一大堆理论，现在来看复合索引。复合索引就是两条以上的索引。上节课我们已经把username字段建立了索引，我们现在把randNum0，这个字段也设置成索引。

```
db.randomInfo.createIndex({randNum0:1})
```

 db.randomInfo.getIndexes() 查看索引

这时候已经是两个自建索引了，一共有三个索引。

```
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1     
                },
                "name" : "_id_"       
        },
        {
                "v" : 2,
                "key" : {
                        "username" : 1
                },
                "name" : "username_1" 
        },
        {
                "v" : 2,
                "key" : {
                        "randNum0" : 1
                },
                "name" : "randNum0_1"
        }
]
```

**两个索引同时查询**

我们同时查询两个索引的值，看看效果是怎么样的。

```
var startTime = new Date().getTime();
var db = connect('company');

var rs = db.randomInfo.find({username:'yqkwkq',randNum0:139630});

rs.forEach(rs=>{printjson(rs)});

var runTime = new Date().getTime()-startTime;

print('[Demo]this run time is '+runTime+'ms');
```

从性能上看并没有什么特殊的变化，查询时间还是在4ms左右。MongoDB的复合查询是按照我们的索引顺序进行查询的。就是我们用db.randomInfo.getIndexes()查询出的数组。

**指定索引查询（hint）**目前已失效

开始时，我说了数字的索引要比字符串的索引快，这就需要一个方法来打破索引表的查询顺序，用我们自己指定的索引优先查询，这个方法就是hint().

修改第三行代码，并执行

```
var rs = db.randomInfo.find({username:'yqkwkq',randNum0:139630}).hint({randNum0:1});
```

由于数据量和复杂成都还是不大，所以你看不出来明显的性能提升，但是要相信，等工作中遇到大数据时，一定会得到很好的效果的。

**删除索引**

当索引性能不佳或起不到作用时，我们需要删除索引，删除索引的命令是dropIndex().

```
db.randomInfo.dropIndex('randNum0_1');//索引的唯一ID
```

这里需要注意的是删除时填写的值，并不是我们的字段名称（key），而是我们索引查询表中的name值。这是一个小坑，希望小伙伴们不要踩中。

总结：这节主要内容还是操作索引，包括复合索引的建立，删除。和一些使用索引的小窍门。

索引：全文索引

有些时候需要在大篇幅的文章中搜索关键词，比如我写的文章每篇都在万字以上，这时候你想搜索关键字是非常不容易的，MongoDB为我们提供了全文索引。

**准备工作：**

这节我们先建立一个集合（collections）-info，然后插入一小段文章，作用就是为建立全文索引提供数据，当然我们不再建立百万级数据，我们只是看一下效果。

**全文索引**

有些时候需要在大篇幅的文章中搜索关键词，比如我写的文章每篇都在万字以上，这时候你想搜索关键字是非常不容易的，MongoDB为我们提供了全文索引。

**准备工作：**

这节我们先建立一个集合（collections）-info，然后插入一小段文章，作用就是为建立全文索引提供数据，当然我们不再建立百万级数据，我们只是看一下效果。

```
db.info.insert({contextInfo:"I am a programmer, I love life, love family. Every day after work, I write a diary."})
db.info.insert({contextInfo:"I am a programmer, I love PlayGame, love drink. Every day after work, I playGame and drink."}
```

当然这很简单，再次强调这只是文章需要，实际工作中这么简单的数据没必要建立全文索引。

建立全文索引

```
db.info.ensureIndex({contextInfo:'text'})
```

需要注意的是这里使用text关键词来代表全文索引，我们在这里就不建立数据模型了。

**全文索引查找** 建立好了全文索引就可以查找了，查找时需要两个关键修饰符:

- $text:表示要在全文索引中查东西。
- $search:后边跟查找的内容。

db.info.find({$text:{$search:"programmer"}})

** 查找多个词 **

全文索引是支持多个次查找的，比如我们希望查找数据中有programmer，family，diary，drink的数据（这是或的关系），所以两条数据都会出现。

```
db.info.find({$text:{$search:"programmer family diary drink"}})
```

如果我们这时候希望不查找出来有drink这个单词的记录，我们可以使用“-”减号来取消。

```
db.info.find({$text:{$search:"programmer family diary -drink"}})
```

**转义符：**

全文搜索中是支持转义符的，比如我们想搜索的是两个词（love PlayGame和drink），这时候需要使用\斜杠来转意。

```
db.info.find({$text:{$search:"\"love PlayGame\" drink"}})
```

**总结：**全文索引在工作还是经常使用的，比如博客文章的搜索，长文件的关键词搜索，这些都需要使用全文索引来进行。这节课的知识并不难，还是那句话，你看是不可能学会的，一定要动手练习。当然索引还有很多知识，这里我们只讲最常用的知识，把小伙伴引入门就好，也就是常说的用20%的精力，学会80%的知识，然后在工作中进行迭代磨练。虽然MongoDB的索引文章结束了，但是MongoDB的文章还没有结束，下篇文章开始学习如何管理MongoDB。

管理：用户的创建，删除与修改

安装好MongoDB时，它为我们默认开了一个最高管理权限方便我们管理数据库，我们可以用mongo链接数据库，就是这个原理。但在实际开发中并一般不能使用这个用户，因为大家都知道和最高权限的原因，安全性和可靠性都不适合，所以要对MongoDB的用户进行管理。这节课我们就学习一下MongoDB的用户管理。

**创建用户：**

首先要进入我们的admin库中，进入方法是直接使用use admin 就可以。进入后可以使用show collections来查看数据库中的集合。默认是只有一个集合的（system.version）。

创建用户可以用db.createUser方法来完成，里边参数还是蛮多的，代码我写在下边，然后对每一项做出了解释。

```
db.createUser({
    user:"jspang",
    pwd:"123456",
    customData:{
        name:'技术胖',
        email:'web0432@126.com',
        age:18,
    },
    roles:['read']
})
```

当然我们还可以单独配置一个数据库的权限，比如我们现在要配置compay数据库的权限为读写：

```
db.createUser({
    user:"jspang",
    pwd:"123456",
    customData:{
        name:'技术胖',
        email:'web0432@126.com',
        age:18,
    },
    roles:[
        {
            role:"readWrite",
            db:"company"
        },
        'read'
    ]
})
```

内置角色：

1. 数据库用户角色：read、readWrite；
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin;
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManage；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root
7. 内部角色：__system

**查找用户信息**

我们直接可以使用查找的方法，查找用户信息。命令很简单：

```
db.system.users.find()
```

**删除用户：**

删除命令也是非常简单，直接用remove就可以删除这个用户的信息和权限。

```
db.system.users.remove({user:"jspang"})
```

**建权：**

有时候我们要验证用户的用户名密码是否正确，就需要用到MongoDB提供的建权操作。也算是一种登录操作，不过MongoDB把这叫做建权。

```
db.auth("jspang","123456")
```