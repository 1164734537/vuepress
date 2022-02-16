### mongoose 入门，及数据增删改查

#### mongoose有两个特点：

1.通过关系型数据库的思想来设计非关系型数据库

2.基于mongodb驱动，简化操作

### mongoose安装

**第一步.npm 安装mongoose**

```
npm install mongoose -save
```

**第二步.引入mongoose并连接数据库**

（此操作可以看官方文档：）

```
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', 
{
	useNewUrlParser: true,
	useUnifiedTopology: true
});
```

我们有一个到本地主机上运行的测试数据库的挂起连接。如果我们连接成功或发生连接错误，我们现在需要得到通知：

```
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
```

**第三步，定义schema**

数据库中的Schema,为数据库对象的集合，schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义：每个schema会映射到mongodb中的一个collection，他不具备操作数据库的能力

```
var UserSchema = mongoose.Schema({
	name:String,
	age:Number,
	status:'number'
})
```

#### 第四步.创建数据模型

定义好了Schema,接下来就是生成Model.model是由 schema生成的模型，可以对数据库进行操作

注意：mongoose.model里面可以传两个参数，也可以传入三个参数

mongoose.model(参数1：模型名称（首字母大写），参数2：Schema,[参数3：数据库表名|| 当前模型名称的复数（默认） ])

**如果传入两个参数的话：**

这个模型会和 模型名称相同的复数 的 数据库集合 建立连接：如通过下面方法创建模型，那么这个模型将会操作users这个集合。

```
var User = mongoose.model('User',UserSchema);
```

**如果传入三个参数的话：**

模型默认操作第三个参数定义的集合名称



代码演示：

```
//1.引入mongoose
const mongoose = require('mongoose');

//2.建立连接
mongoose.connect('mongodb://localhost:27017/test', 
{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//3.检测是否连接成功
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//4.定义一个schema（一种数据结构） ，用来生成操作users表（集合）模型的数据结构,字段要和数据库表里的字段一一对应

var UserSchema = mongoose.Schema({
	name:String,
	age:Number,
	status:'number'
}) 
//5.定义数据库模型，操作数据库
//model里面的第一个参数要注意：1.首字母大写，2.要和数据库表（集合名称对应）
//这个模型会和模型名称相同的复数的数据表建立连接
var User = mongoose.model('User',UserSchema)


//查询users表的数据
User.find({},function(err,doc)=>{
	if(err) return console.log(err)
	console.log('doc')
})
//增加数据，只有增加数据需要实例化
//1.需要先用定义好的model 实例化 一个Model 对象 
	通过User Model 创建增加的数据

//2.调用 实例.save()
var u = new User({
	name:'zh',
	age:20,
	status:1
})
u.save((err,doc)=>{
	
}); //执行增加操作

//修改数据
User.updateOne({name:'zh'},{name:'czh'},(err,res)=>{
	//回调
})

```

mongoose默认参数：增加数据的时候，如果不传入数据会使用默认配置的数据

```
var UserSchema = mongoose.Schema({
	name:String,
	age:Number,
	status:{
		type:Number,
		default:1 // 这个就是more参数，不传时默认为1
	}
}) 
```



模块化：

创建model文件夹 并创建 db.js 文件

```
//连接数据库
//当前文件只负责连接数据库
var mongoose = require('mongoose');

//2.建立连接
mongoose.connect('mongodb://localhost:27017/test', 
{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//3.检测是否连接成功
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//导出
module.exports = mongoose;
```

如需要操作 user 数据库，则新建user.js 文件

```
//此文件负责跟数据库中叫 user的表做映射 ，可以在这定义 对应的 schema 和 数据模型
//引入 负责连接数据库的 db.js 文件
var mongoose = require('./db.js');

// 定义 schema（数据结构）
 var UserSchema = mongoose.Schema({
 	name:String,
	age:Number,
	status:'number
 })
 
 // 建立模型
 // 参数1：模型名称， 参数2：模型的数据结构， 参数3：模型对应操作的数据库表
 ---
 var UserModel = mongoose.model('User',UserSchema,'user');
 
 //导出
 module.exports = UserModel;
 ---
 // 上面简写成 ：
 module.exports = mongoose.model('User',UserSchema,'user');
```



其他页面引用：

```
//引入
var UserModel = require('./model/user.js')

//进行数据库的增删改查
//查找：
UserModel.findOne({},(err,doc)=>{
})
// 修改、更新：
UserModel.updata({name:"zh"},{name:"czh"},(err,doc)=>{

})

// 新增
// 实例化 model 
var user = new userModel({
    name:"hang",
	age: 20,
	status: 1
})

// 实例化后，调用 save() 函数
user.save((err,doc)=>{

});


```

