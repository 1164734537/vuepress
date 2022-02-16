链接数据库

```
C:\Users\123>mongo
```

实例1 操作集合【collection】

```
> show dbs    //查看所有的数据库
admin   0.000GB
config  0.000GB
local   0.000GB
> use komablog  //进入/新建 komablog 数据库
switched to db komablog
> db.createCollection("posts");  //创建 posts 集合
{ "ok" : 1 }
> db.createCollection("categories"); //创建 categories 集合
{ "ok" : 1 }
> db.createCollection("tags"); //创建 tags 集合
{ "ok" : 1 }
> show collections  // 查看 当前数据库的所有集合 --- 有三个集合
categories  
posts
tags
> show dbs  //查看所有的数据库   --- 可以看到已经有 komablog
admin     0.000GB
config    0.000GB
komablog  0.000GB
local     0.000GB
> db.stats()   // 查看当前数据库状态信息
{
        "db" : "komablog",
        "collections" : 3,
        "views" : 0,
        "objects" : 0,
        "avgObjSize" : 0,
        "dataSize" : 0,
        "storageSize" : 12288,
        "freeStorageSize" : 0,
        "indexes" : 3,
        "indexSize" : 12288,
        "indexFreeStorageSize" : 0,
        "totalSize" : 24576,
        "totalFreeStorageSize" : 0,
        "scaleFactor" : 1,
        "fsUsedSize" : 117432250368,
        "fsTotalSize" : 127426613248,
        "ok" : 1
}
> db.dropDatabase(); // 删除当前数据库
{ "ok" : 1 }
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```



实例2 操作文档（记录，数据）【document】

```
> show dbs //查看所有的数据库
admin   0.000GB
config  0.000GB
local   0.000GB
> use komablog  //进入/新建 komablog 数据库
switched to db komablog
> show collections  // 查看 当前数据库的所有集合  --- 啥也没有
> db.createCollection("users"); // 在当前数据库新建 users 集合
{ "ok" : 1 }
> show collections   // 查看 当前数据库的所有集合 --- 有 users 集合
users
> db.users.renameCollection("staff");  // 把 users 集合重名为 staff
{ "ok" : 1 }
> show collections // 查看 当前数据库 所有集合  --- users 集合以改为 staff
staff
> db.dropDatabase(); // 删除当前数据库 
{ "ok" : 1 }
> show dbs //查看所有的数据库  --- 数据库komablog已删除
admin   0.000GB
config  0.000GB
local   0.000GB
```

实例3

```
> use komablog   //进入/新建 komablog 数据库
switched to db komablog 
> show collections  // 查看 当前数据库的所有集合
> db.createCollection("posts");  //在当前数据库创建 posts 集合
{ "ok" : 1 }
> db
komablog
> show collections  //查看 当前数据库的所有集合  --- 有 posts 集合了
posts
> db.posts.insert({title:"我的第一篇博客",conetnt:"已经开始写博客了，太激动了。"});  // 插入数据
WriteResult({ "nInserted" : 1 })
> show collections      //查看当前数据库的所有集合                                      
posts
> db.posts.find()       //查看当前posts 集合下面的数据（记录）
{ "_id" : ObjectId("6167db6a1781795bb5ece623"), "title" : "我的第一篇博客", "conetnt" : "已经开始写博客了，太激动了。" }
> db.posts.insert({title:"我的第二篇博客",content:"写啥好呢",tag:["未分类"]}); // 插入数据
WriteResult({ "nInserted" : 1 })
> db.posts.find() //查看当前posts 集合下面的数据（记录）
{ "_id" : ObjectId("6167db6a1781795bb5ece623"), "title" : "我的第一篇博客", "conetnt" : "已经开始写博客了，太激动了。" }
{ "_id" : ObjectId("6167dbd01781795bb5ece624"), "title" : "我的第二篇博客", "content" : "写啥好呢", "tag" : [ "未分类" ] }
> for(var i=3;i<=10;i++){    // 用js 循环插入数据
... db.posts.insert(
... {title:"我的第"+i+"篇博客"}
... );
... }
WriteResult({ "nInserted" : 1 })
> db.posts.find()      //查看当前posts 集合下面的数据（记录）              
{ "_id" : ObjectId("6167db6a1781795bb5ece623"), "title" : "我的第一篇博客", "conetnt" : "已经开始写博客了，太激动了。" }
{ "_id" : ObjectId("6167dbd01781795bb5ece624"), "title" : "我的第二篇博客", "content" : "写啥好呢", "tag" : [ "未分类" ] }
{ "_id" : ObjectId("6167dca51781795bb5ece625"), "title" : "我的第3篇博客" }
{ "_id" : ObjectId("6167dca51781795bb5ece626"), "title" : "我的第4篇博客" }
{ "_id" : ObjectId("6167dca51781795bb5ece627"), "title" : "我的第5篇博客" }
{ "_id" : ObjectId("6167dca51781795bb5ece628"), "title" : "我的第6篇博客" }
{ "_id" : ObjectId("6167dca51781795bb5ece629"), "title" : "我的第7篇博客" }
{ "_id" : ObjectId("6167dca51781795bb5ece62a"), "title" : "我的第8篇博客" }
{ "_id" : ObjectId("6167dca51781795bb5ece62b"), "title" : "我的第9篇博客" }
{ "_id" : ObjectId("6167dca51781795bb5ece62c"), "title" : "我的第10篇博客" }
> db.posts.count(); // 查看posts 集合下有多少条数据（记录）
10
> db.posts.remove({}); //  {} 是条件，表示所有， 删除 posts集合的所有记录
WriteResult({ "nRemoved" : 10 })
> db.posts.count(); //  查看posts 集合下有多少条数据（记录）
0
> db.posts.find() // 当前集合已经没有数据

```

实例3 带条件的文档

db.[collection_name].find({"":""})

$gte , 大于等于

$gt, 大于

$lte, 小于等于

$lt， 小于

$eq,等于

$ne 不等于

正则表达式： /k/, /^k/

db.[collection_name].distinct("field_name");

distinct用来查询不重复记录的条数,即用distinct来返回不重复字段的条数（count(distinct id)）,其原因是distinct只能返回他的目标字段，而无法返回其他字段。

