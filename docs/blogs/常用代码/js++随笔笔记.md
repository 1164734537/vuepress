1.浏览器介绍：

| 主流浏览器 | 内核           |
| ---------- | -------------- |
| IE         | trident        |
| chrome     | webkit / blink |
| safari     | webkit         |
| firefox    | gecko          |
| opera      | presto         |

主流浏览器：要有自己研发的内核，和市场占用率

​	*高级语言（说白了就是人能理解的语言）

​	*机器语言：（就是0和1）

编程语言：

​	分为两个大类： 

​	1.编译型

​	2.解释型

​	共性：两个都需要编译过程

​	差异： 翻译时间不一样

​	编译型：源码 -> 编译器 -> 机器语言 -> 可执行的文件 （在运行前已经翻译完了）

​	解释型：源码 -> 解释器 -> 解释一行就执行一行（每次执行，就要解释，执行）

​	各自优点:

​	解释型语言：不需要根据不同系统，平台来移植，只要有相应的解释器即可，不需要考虑跨平台

​	编译型语言：编译型语言可以直接被机器执行，相对快，大型项目，逻辑性强的更有优势

​	

​	脚本语言：

​		-> 脚本引擎 -> 解释器 -> 可执行文本

​	脚本语言 前后端都有 脚本语言

​	javascript 客户端脚本

​	php 服务端脚本

​	

### javascript 学习三大块

1.ECMAscript	

​	语法，变量，关键字，保留字，值，原始类型，引用类型运算，对象，继承，函数

2.DOM document object model

​	W3C 规范

3.BOM browser object model

​	没有规范

### 单线程和多线程：

​	单线程： 同时只干一件事

​	多线程：同时干多件事

​	轮转时间片：

​	短时间之内轮流执行多个任务的片段

 	1. 任务1 任务2
 	2. 切分任务1 任务2
 	3. 随机排列这些任务片段，组成队列
 	4. 按照这个队列顺序将任务片段送进js进程
 	5. js线程执行一个又一个的任务片段



编程语言的四要素： 变量 数据结构 函数 运算能力

​	

var -> variable

javascript变量

```
var a; //变量声明
a=3; //变量赋值
var a= 3; //变量声明并赋值
//两个部分组成
//声明变量 变量赋值
// 声明：向系统申请一个存储空间，叫做 xxx ; 值为空
// 赋值：给当前名为xxx 的存储空间 放入一个值

// 多个变量声明、赋值
var x=1,
	z,
	y;
//重复复制
var a = 1;
	a=2;

//企业开发
/*
*命名规范
* 不能以数字开头
*能用字母 _$开头
*字母_$数字
*关键字 保留字
*/

var x=3,
	y=4;
var z = x + y;
document.write(z);
 //运算 > 赋值  优先级
 
 
 /*
 *js的值分为: 原始值，引用值
 
 javascript 是根据 值来判断 数据类型的，
 所以javascript 属于弱类型语言 
 	动态语言 基本上是 -> 脚本语言 -> 弱类型语言（弱化数据类型语言）
 	静态语言 基本上是 -> 编译型语言 -> 强类型语言（强调数据类型语言）
 *
 * 原始值->5种基本类型
 *	Number
 	var a = 1;
 	var a = 3.14;  //数字类型中的 浮点型
 	
 * 	String
 	var str = '陈子航';
 	
 *  undefined
 	未定义
 *  null
 	空值 初始化组件 函数 销毁函数 占位
 *  Boolean: true false
 
 
 	//引用型
 	object
 	array
 	function
 	date
 	RegExp
 	
 */
 
 
 
```

### 栈内存和堆内存

![image-20220106093544954](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220106093544954.png)



上图解释： 

栈内存（stack）：1001处空间是入口处，1008处是最底部。相当于一个弹夹，装入的时候，第一个进入的子弹，放在最下面



原始值和引用值的区别

原始值： 原始值都存在栈内存中

```
var a =3;
var b=a;
	a =1;
```

上述三行代码在栈内存（stack) 中是怎么实现的？

var a = 3; 在栈内 最先进入， 即 把 1008 命名为 a, 空间中存放值 3

![image-20220106094705698](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220106094705698.png)

var b =a; 第二个进入，依次存放， 1007 处 命名为 b ，同时拷贝 a 空间的值 ’3‘，存放到b空间

![image-20220106094843925](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220106094843925.png)

a = 1;  看上去是重新赋值， 实际，在栈内存中， 是 把原本的 a 还原为 1008 

在 1006 处，重新命名为 a  空间 的值存为 1



![image-20220106095058451](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220106095058451.png)

实际上， 1008上面的值，是没被清除的，所以这个值将永久存在，直到内存满了，被新的值所覆盖



引用值：

​	引用值的值并不是存在栈内存

var arr1 = [1,2,3,4]

var arr2 = arr1

arr1.push(5)

![image-20220106102235900](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220106102235900.png)



var arr1 = [1,2,3,4]

把栈内存 1005 处命名为 arr1，同时把值放在 堆内存的 1001  这空间处

而栈内存空间存放的是 指向 堆内存1001 空间 的地址 h1001

接着

var arr2 = arr1

在1004 处命名为 arr2 ， 同时把 arr1 空间的值拷贝到过来（此处拷贝的也是指向堆内存 1001 空间的地址）

因此，arr1 arr2 指向的堆内存 地址是同一个地址

接着 arr1.push(5)

为数组添加一个新的值，改变的是堆内存 1001 处空间的值

由于arr2 arr1 指向的地址相同，所以 堆内存1001 中的值发生改变，两者都会同时改变

接着

arr1 = [1,2] 对arr1 重新赋值,就是下图

![image-20220106103411595](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220106103411595.png)

重新赋值不影响，添加，修改是会影响





NAN 数字类型 ： 非数字，计算时，出现了非数字的结果



array 数组

是一个能放多个值的盒子

null 是原始值，typeof 出来又是 object ，其实是一个历史遗留bug

null 是一个指向空对象的指针，也叫空对象占位符，所以最早是作为一个引用用类



typeof() 用于检测数据类型（检测基本数据类型）

他返回的是一个关于类型 的字符串

注意： typeof( typeof() )  一定是字符串

能检测的值为 ： string number function object undefined

当检测的是： array object null  都返回 objetct(此处可以理解为引用 数据类型)

Number()

undefined -> undefined

null -> 0

false -> 0

true -> 1

隐式类型转换





预编译理解：

```
//函数声明整体提升，变量只有声明提升，赋值是不提升的
```

暗示全局变量 imply global variable

```
var a =1;
b = 2;
console.log(window.b) // a = window.a
 					  // b = window.b
window = {
	a:1,
	b:2
}

function test(){
	var a = b =1;
}
test();
console.log(a);  // 会报错，因为不存在于 window 对象下
window.a -> undefined


// 分析：
function test(a){
	console.log(a);
	var a =1;
	console.log(a);
	function a(){}
	console.log(a);
	var b = function() {}
	console.log(b);
	function d(){}
}
test(2);
```

上述分析：设计预编译的问题

一个AO activetion object 

活跃对象，函数上下文，对于上述情况，相应给出的一套解决方案

// 创建 AO对象

1.寻找函数的形参和变量声明（变量提升）

AO = {

​	a: undefined,

​	b: undefined

}

2.把实参的参数值赋值给形参

AO = {

​	a: undefined -> 2

​	b: undefined

}

3.寻找函数体内的 函数声明和 赋值 函数体

AO = {

​	a: undefined -> 2 ->function a() {}

​	b: undefined

​	d: function d(){}

}

4.函数执行：

AO = {

​	a: undefined -> 2 ->function a() {} -> 1

​	b: undefined -> function () {}

​	d: function d(){}

}

在哪打印，就看在哪一步

```
function test(a,b){
	console.log(a);
	c=0;
	var c;
	a =5;
	b=6;
	console.log(b);
	function b(){}
	function d(){}
	console.log(b);
}

test(1)
```

AO = {

​	a : undefined -> 1

​	b: undefined -> undefined  -> function b(){}  -> 6

​	c: undefined

}

1

6

6

```
var a = 1;
function a() {
	console.log(2);
}
conosole.log(a);

```

在全局下

// GO global object  全局上下文（执行期上下文）

1.寻找变量声明

2.寻找函数声明

3.赋值操作

GO = {
			a : undefined -> function a(){} -> 1

}

GO === window

```
function test(){
	var a =b =1;
	console.log(b);
}
test();
```

上述函数执行顺序

1.寻找变量声明

2.寻找函数声明

3.执行

GO = {

}



1.寻找函数的形参和变量声明（变量提升）

2.实参赋值给形参

3.寻找函数的 声明 和 函数赋值体

4. 执行

AO = {

​	a : undefined

}

预编译已完成，没有函数体，也没有形参，函数声明及函数赋值体，现在就到执行了

看到 b, 没有声明

去 GO 上 挂载

GO = {

​	b =  undefined -> 1;

}

函数体内， b 的值赋值给 a 

OA 对象没有，去全局 GO 对象上查找 b =1;



AO = {

​	a : undefined -> 1

}

记住： 先在AO 中找，没有再去 GO 上找

```
var b = 1;
function test(){
	var a = 1;
	var b =2;
	console.log(b);
}

test();  // 打印2

```

```
var b = 3;
console.log(a);
function a(a){
	console.log(a);
	var a =2;
	console.log(a);
	function a(){}
	var b =5;
	console.log(b);
}
a(1);
```

GO {

​		b : undefined - > 3;

​		a: function a(a){}

}

AO{

​	a: undefined -> 1 -> function a(){ var b=5; console.log(b) } -> 2

​    b: undefined -> 5

}

function a(a){}

function a(){ var b=5; console.log(b) }

2

5



```
a =1;
function test(){
	console.log(a);
	a = 2;
	console.log(a);
	var a = 3;
	console.log(a);
}
test();
var a;
```

GO = {

​	a = undefined

​	test : function test() { ... }

}

AO = {

​	 a = undefined

}

已完成预编译

执行

GO = {

​	a = undefined -> 1

​	test : function test() { ... }

}

AO = {

​	 a = undefined -> 2 ->3

}

undefined

2

3



分析 ： 函数内 var 变量提升了， 函数体内的a 为局部变量

```
function test(){
	console.log(b);
	if(a){
		var b =2;
	}
	c =3;
	console.log(c);
	
}
var a;
test();
a =1;
console.log(a);
```

GO = {
			a : undefined

​	test: function test(){ ... }

​	c : 3

}

AO = {

  b : undefined

}

预编译不看 if 啥的条件，只看有没有声明变量



结果 ： undefined 3 1 

```
function test(){
	return a;
	a = 1;
	function a(){}
	vara = 2;
}
console.log(test());

```

AO = {

​		a: undefined -> function a(){} 

}

function a(){}

```
function test(){
	a = 1;
	function a(){}
	var a = 2;
	return a;
}
console.log(test());
```

A O = {
		 	a: undefined -> a(){} -> 1 -> 2

}

```
a = 1;
function test(e){
	function e(){}
	arguments[0] = 2;
	console.log(e);
	if(a){
		var b = 3;
	}
	var c;
	a =4;
	var a;
	console.log(b);
	f= 5;
	console.log(c);
	console.log(a);
}
var a;
test(1);
console.log(a)
console.log(f)
```

2 undefined undefined 4 1 5



```
function test(a,b){

}
```

//对象，函数也是一种对象类型， 引用类型，引用值

// test.name test.length test.prototype

// 对象 -> 有些属性是我们无法访问的

​			-> js引擎内部固有的隐式属性

​		不研究他，不知道他的原理

// 隐式属性1： scope

[[scope]]

//1.他是函数创建时，生成的一个JS内部隐式属性，

只能由JS引擎来读取

2.他是函数存储作用域链的容器，作用域链

​	// AO,GO 

​	// AO 就是函数执行期上下文

​	// GO 全局的执行期上下文

​	作用域链就是保存这些上下文的

​	// 当函数执行完成以后， AO 是要销毁的，再次执行函数，就会重新创建

每一次执行都是新的

// 也就是说 AO 是一个及时的存储容器，（不是长期保存的，根据函数执行周期来保存）

作用域链： 就是把这AO,GO  形成链式，从上到下排列下来

例子：

```
function a(){
	function b(){
		var b = 2;
	}
	var a =1;
	b();
}
var c = 3;
a();

```





全局在执行的前一刻 GO -> 函数声明已经定义

全局执行

GO = {

​	test： undefined -> 在函数执行的时候 ->  function(){}

​	test2: function test2(){}

}



//函数声明提升

function test2() {}



只看函数声明

test(); 这样是不行的

var test = function(){
		}



当函数被定义时，已经形成了 作用域了 [[scope]] -> scope chain(已经形成作用域链) -> GO （作用域链已经存在GO了）

当函数被执行的时候 才会生成 自己的 AO



```
function a(){
	function b(){
		function c(){
		}
		c();
	}
	b();
}
a();
```

// a定义：a.[[scope]] -> 0 : GO

// a 执行： a.[[scope]] ->  0 :  a -> AO

​											 1 : GO

//b定义： b.[[scope]] -> (跟a执行是一样，因为还没执行，不会生成 AO)

​										   0 :  a -> AO

​											1 : GO

// b 执行: b.[[scope]] -> 0 :  b -> AO  （生成AO）

​										   1 :  a -> AO

​											2 : GO

//c定义 ：c.[[scope]] -> (跟b执行是一样，因为还没执行，不会生成 AO)

​										   0 :  b -> AO  （生成AO）

​										   1 :  a -> AO

​											2 : GO

//c执行： c.[[scope]] -> 0: c-> AO

​										 1: b -> AO

​										 2: a -> AO

​										 3: GO

// c结束： c.[[scope]] -> (又回到c定义的状态，即去掉自身AO)

​									0 :  b -> AO  （生成AO）

​									1 :  a -> AO

​									2 : GO

// b结束: b.[[scope]] -> (回到b被定义的状态，去掉自身AO，注意由于AO中包含c的scope，所以当此时移除后，c的scope 整个也会消失)

​									   0 :  a -> AO

​									   1 : GO

// 同时 

​		c.[[scope]] X

// a结束： a.[[scope]] -> (回到 a被定义的状态)

​											0 : GO

// 同时  	b.[[scope]] X





### 闭包：

```
console.log(test1,c,test3)
function test1(){
	function test2(){
		var b =2;
		console.log(a);
	}
	var a =1;
	return test2();
}
var c= 3;
var test3 = test1();
test3();
```

当内部函数被返回到 外部，并保存时，一定会产生闭包

闭包会产生原来的作用域链不释放，过度的闭包可能会导致内存泄漏，或加载过慢

闭包就是一个现象





立即执行函数

// 自动执行，执行完以后立即释放

// 立即执行函数 -> 功能性称呼 - > 初始化函数

// IIFE  - immediately-invoked function

两种基本写法

```
//1. 用的比较多的方式
(function(){
	
})();

//2. w3c 建议写
(function(a,b){
	console.log(a,b)
}(1,2));


立即执行的结果拿到返回值，用来做初始化赋值
var num = (function(a,b){
	return a + b;
}(2,4));

```

括号括起来的都是表达式





对象篇：

```
var teacher = {
	name:'张三',
	age:32,
	sex:'male',
	height:176,
	weight:130,
	teach:function(){
		console.log('I am teaching javascript')
	},
	smoke:function(){
		console.log('I am smoking')
	},
	eat: function(){
		console.log('I am having a dinner')
	}

}
	// 增加对象
	teacher.address = '北京';
	//增加方法
	teacher.drink = function(){
		console.log('I am drinking beer')
	}
	
	//修改 属性
	teacher.height = 180;
	//修改 方法
	teacher.teach = function(){
		console.log('I am teaching HTML')
	}
	// 删除操作 -- delete 关键字
	// 删除属性
	delete teacher.address;
	//删除方法
	delete teacher.teach
	
	
	// 对象中，this 代表对象本身
	var teacher = {
        name:'张三',
        age:32,
        sex:'male',
        height:176,
        weight:130,
        teach:function(){
            console.log('I am teaching javascript')
        },
        smoke:function(){
            this.weight--;
            console.log(this.weight);
        },
        eat: function(){
            this.weight++;
            console.log(this.weight);
        }

    }
	theacher.smoke();
	theacher.smoke();
	teacher.eat();
```



```
var attendance = {
	students: [],
	total:6,
	jion: function(name){
		this.students.push(name);
		console.log(this.students);
	},
	leave: function(name){
		
	}
}
```

push()  往数组后添加内容

splice(a,b,c) a 从哪开始， b 删除几项

indexOf()  查看数组中存在某个值，返回对应索引

 

obj.name = 'xx' 对象字面量，对象直接量



创建对象方式2：

构造函数

```
系统自带的构造函数  
var obj = new Object(); //和 对象字面量 相等
obj.name = '张三'；
obj.sex = '男生';

new 构造函数 等于实例化了一个对象
对象和构造函数是两码事， 对象 是通过实例化构造函数 而得出的 对象 实例
```

自定义构造函数（模块化，插件化，大量使用）

1.规范，大驼峰

```
//构造函数也有 this， 但在没执行之前this 不存在，GO中不存在
// 要让this存在， 要实例化！！！
function Teacher(){
	this.name = '张三';
	this.sex = '男士';
	this.smoke = function(){
		console.log('I am smoking');
	}
}	
	//此处实例化， this 才生成， this 指向的是对象本身
	var teacher = new Teacher()
// 在对象中 ，this 指向 当前对象 teacher
var teacher = {
	name:'张三'，
	say: function(){
		console.log(this.name);
	}
}



```

思考： 

构造函数实例化两个对象

var teacher1 = new Teacher();

var teacher2 = new Teacher();

让teacher1.name = '李四';

console.log(teacher1,teacher2);

两个对象的name  属性值是 什么？为什么呢

new 关键字，构造函数生成的对象，是在堆内存中开辟的新空间

是两个互不相干的对象



构造函数创建不同的老师,用一个option 对象来创建不同老师

```
//option 选项
var opt = {
	name,
	sex,
	weigth,
	course,
	...
}

var opt2 = {
	name,
	sex,
	weigth,
	course,
	...
}

function Teacher(opt){
	this.name = name;
	this.sex = sex;
	this.weight = weight;
	this.course = course;
	this.smoke = function(){
		this.weight--;
		console.log(this.weight);
	}
	this.eat = function(){
		this.weight++;
		console.log(this.weight);
	}
}
var t1 = new Teacher(opt); 
- > 
var t1 = new Teacher({
    name:'张三'，
    sex:'男'
    ....
})
var t2 = new Teacher(opt2);


//构造函数传参：
function Car(opt){
	this.logo = opt.logo;
	this.color = opt.color;
	this.displacement = opt.displacement;
} 

function Consumer(opt){
	this.name = opt.name;
	this.age = opt.age;
	this.income = opt.income;
	this.likecar = function(logo,color,displacement){
		var car = new Car({logo,color,displacement})
		console.log(car)
	}	
}

var man = new Consumer({
	name:'王大富',
	age: 55,
	income: 1000000,
})
console.log(man)
man.likecar('玛莎拉蒂','红色','5.0T')


```

把这个构造函数拿出去，放在独立的js 文件中，就是当插件了





1.写一个构造函数，接受数字类型的参数，参数数量不定

完成参数想加，相乘

2.写一个构造车的函数，可设置车的品牌，颜色，排量

再写一个构造消费者的函数，设置用户的名字，年龄，收入

通过选车的方法，实例化该用户喜欢的车，

在设置车的属性





this 指向问题

```
function Car(){
	this.color ="red"
}
此时this 指向window, 预编译时,但此时讨论没有意义， GO 存在 this 指向window
Car()  -> 直接执行，生成 AO 存在  this 指向 window

var car = Car();
一旦使用 new 关键字，实例化构造函数以后， this 指向 发生改变， this 指向的就是
实例化后的对象
```



原理：

```
预编译阶段
// GO = {
	Car : (function)
	this: window
	car1:{
		color:'xxx',
		brand:'xxxx'
	}
}

// 构造函数执行（系统判断构造函数 是要 看到 new 关键字）
因此 执行 Car() 函数时，系统看到 new 关键字
在AO 中添加 this:{}, 然后在this 对象上添加内容

然后： 赋值操作 car1 = new Car('red','benz');
在 GO 全局对象下的变量加上 car1 这个对象

AO = {
	this: {}
	->
	this:{
		color: 'xx',
		brand: 'xxx'
	}
}

function Car(color,brand){
	this.color =color;
	this.brand = brand;
}

var car1 = new Car('red','Benz');


-->
 因此上述构造函数 其实隐式做几步东西
 function Car(color,brand){
	// this :{
		color:color,
		brand:brand
	}
	this.color = color;
	this.brand = brand;
	
	// return this;
}
	1.函数体内部， 隐式加入this ,并return 出去
	2.在构造函数执行时， 在 AO 中添加上 this对象，并按照函数体，为this赋值
	3.this 根据传进来的实参，一一替换好形参
	4. 再把this 值  返回到 赋值的 全局变量 car1 处，在GO中挂载
	
	
	仔细观察，类似于 闭包

```

包装类

系统内置的有 三种  

​	new Number  数字对象

​	new String 字符串对象

​    new Boolean 布尔对象

```
var a =1;

console.log(a);

var aa = new Number(1);

console.log(aa)

aa.name = 'aa';

console.log(aa);

var bb  = aa + 1;

console.log(bb);

console.log(aa);

var a = 'abc';
console.log(a);

var aa = new String('abc');
aa.name = 'aa';
console.log(aa);

var bb = aa + 'bcd';
console.log(bb);


var test = new Number(undefined)
conosole.log(test)  -> undefined -> NaN 
					-> null -> 0

var test = new String(undefined)
					-> "undefined"
					->"null"
```

undefined 和 null 不可以设置任何方法和属性



```
var a = 123;
a.len = 3;
console.log(a.len); -> 竟然是 undefined


var str = 'abc'
console.log(str.length) -> 3
原始值没有方法和属性？ 为什么会这样？ -> 涉及js包装类

// JS 包装类的问题

var a =123;
n.len = 3;
// new Number(123).len = 3; 赋值！ 但是不能保存，所以删除 delete
为什么不能保存？ 因为没声明
如： 
 var obj = {
 	name:'obj'
 }
 console.log(obj)
 delete obj.name;
 console.log(obj.name)
 
 如果要保存
 则：
 var a = new Number(123);
 a.len = 3;
 先转对象即可
 
 var str = 'abc';
 console.log(new String(str).length);
 
 
 var arr = [1, 2, 3, 4, 5];
 arr.length = 3; // 长度可以赋值， 可以数组截断
 -》 [1, 2, 3]
 
 arr.length = 6; -> [1,2,3,4,5,empty]
 
 var str = 'abc';
 str.length = 1; // new String(str).length = 1 -> 没法保存 delete
 console.log(str)
 console.log(str.length) (在经过 new String(str) 包装)-> 3
```



ASCII 码 表1： 0-127  表2： 128 255

表中的字符都是 1个字节 （byte）



UNICODE码： 涵盖ASCII 码， 0-255之后，就是这之后，都是两个字节 2（byte）

可以打印在 UNICODE 中的位置

```
var str ='a';
var pos = str.charCodeAt(0); // 字符串的第0个
console.log(pos) -> 97

用来判断字节 > 255 2个字节， <255 就是一个字节
```

​	写一个函数，接受任意一个字符串，算出这个字符串的总字节数

```
var res = window.prompt('请输入字符串');
if(res){
	var byte = 0;
	for(var i =0;i<res.length;i++){
		if(res.charCodeAt(i) <=255){
			byte += 1;
		}else{
			byte += 2;
		}
	}

	console.log('总字节长度是：'+ byte+ '个字节')
}

// 更简单的：
var byte = res.length;
	for(var i =0;i<res.length;i++){
		if(res.charCodeAt(i) > 255){
			byte++;
		}
	}
```



### 原型：prototype

prototype 是构造函数中的一个属性，同时，它本身也是一个对象 {}

对象中包含一个属性： 叫 constructor属性, 值很特别，它就指向构造函数本身

如下列构造函数: **prototype: { constructor: f Car() }**



```
function Car(){

}
Car.prototype.name ='mzd'
console.log(Car.prototype)  
```

测试:

```
//1.写一个构造函数
function Handphone(){
	
}
//prototype
console.log(Handphone.prototype)  // {constructor: ƒ}
// 可以看到打印出一个对象.其中有一个属性，叫做 constructor.暂时先不用管
// 只需知道，打印出的是一个对象 {}
分析： Handphone.prototype，通过这样能拿到值，
	证明，prototype 是这个函数对象的一个属性，这个构造函数也是一个Function 对象
	一切皆对象的原则（Object）
总结：
	原型prototype 其实就是 function 对象的一个属性
	打印出来看了一下，结果他也是对象;
```

继续测试：

```
// 写一个构造函数：
function Handphone(){
	this.color = 'red';
	this.brand = '小米';
	this.screen = '18:9';
	this.system = 'Android';
}
// 实例化一个：
var hp1 = new Handphone;
console.log(hp1)
```

实例化 hp1 打印的结果

```
Handphone {color: 'red', brand: '小米', screen: '18:9', system: 'Android'}
brand: "小米"
color: "red"
screen: "18:9"
system: "Android"
[[Prototype]]: Object
constructor: ƒ Handphone()
arguments: null
caller: null
length: 0
name: "Handphone"
prototype: {constructor: ƒ}
[[FunctionLocation]]: index.html:341
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[1]
[[Prototype]]: Object
```

修改构造函数，让他可以传参

```
// 写一个构造函数：
function Handphone(color,brand){
	this.color = color;
	this.brand = brand;
	this.screen = '18:9';
	this.system = 'Android';
}
// 实例化一个：
var hp1 = new Handphone('红色','小米');
var hp2 = new Handphone('黑色','华为');
console.log(hp1,hp2) // 都可以根据参数打印出来

思考，prototype 是函数的属性，同时也是一个对象
能不能用  Handphone.prototype，在这个对象中保存点东西？
尝试：
// 为对象加入rom ,ram 两个值
Handphone.prototype.rom = '64g';
Handphone.prototype.ram = '6g';
// 打印实例化函数 hp1,hp2 查看是否存在 rom ram 这两个属性
console.log(hp1.rom,hp2.ram)  //  可以发现，实例化的对象中都有 这两个值

证明：
//这个 prototype（原型） 是 定义 构造函数 构造出的每个对象（实例化对象）的 公共祖先
// 所有被该构造函数构造出的对象都可以继承原型上的属性和方法
我们可以这样访问我们加入的值：
    hp1.rom,
    hp2.ram
    
   
// 在尝试
Handphone.prototype.screen = '16:9'
console.log(hp1.screen) // 发现是 '18:9'
就是说，当实例化对象，自身有属性时，不回去原型上找，只有当实例对象没有的时候才回去找


// 所以当需要传参的东西才会写在构造函数中，写死的东西写在原型上，甚至方法也是写在原型上
//往往属性才是配置项，所有实例化对象的方法一般都是一样的,因此方法挂在原型上
function Handphone(color,brand){
	this.color = color;
	this.brand = brand;
}	
	Handphone.prototype.rom = '64g';
	Handphone.prototype.ram = '6g';
	Handphone.prototype.screen = '18:9';
	Handphone.prototype.system = 'Android';
	Handphone.prototype.call = function(){
		console.log('I am calling somebody');
	}
	
var hp1 = new Handphone('红色','小米');
var hp2 = new Handphone('黑色','华为');
console.log(hp1,hp2) // 都可以根据参数打印出来

h2.call(); // 执行方法

```

构造函数对原型的增删改查：

```
function Test(){
	this.nam = 'proto';
}
Test.prototype.name = 'prototype';

var test = new Test();
查：
//console.log(test.name); // 如果实例对象有，则取实例对象，无则取原型上找
增：
test.num = 1;
console.log(Test.prototype); // 没有num
console.log(test)  // 有， 发现添加到了this 里面
删：
console.log(test); // 此处 有 proto
delete test.name;  // 删除操作
console.log(Test.prototype) // 还存在 name:'prototype'
console.log(test) // 发现 this 中的 name 值被删除了
改：
test.name = 'proto'
console.log(Test.prototype,test);  // 可以发现原型上没有修改，在this 实例上却加上了 name:proto
这几个案例说明，在实例化对象上，只能查原型上的属性，并不能对其做任何修改（方法同理),不能修改祖先的
Test.prototype.name = 'proto'; 如果想这样改，其实是覆盖，自己改自己，无意义


```

优化：

```
function Handphone(color,brand){
	this.color = color;
	this.brand = brand;
}	
	Handphone.prototype.rom = '64g';
	Handphone.prototype.ram = '6g';
	Handphone.prototype.screen = '18:9';
	Handphone.prototype.system = 'Android';
	Handphone.prototype.call = function(){
		console.log('I am calling somebody');
	}

prototype 是一个对象：{}，所以我们也可以这样写
Handphone.prototype ={
	rom:'64g';
	ram:'6g';
	screen:'18:9';
	system:'Android';
	call:function(){
		console.log('I am calling somebody');
	}
}

```



继续：

```
function Handphone(color,brand,system){
	this.color = color;
	this.brand = brand;
	this.system = system;
}	
Handphone.prototype = {
	rom:'64g',
	ram:'6g',
	screen:'18:9',
	call:function(){
		console.log('I am calling somebody');
	}
}

var hp1 = new Handphone('black','iphone','IOS')
console.log(hp1) // 上面有 参数对象的实参
同时还有一个属性： __proto__ -> 由于以废弃，所以现在浏览器打印出来的已经改为这个： [[Prototype]]: Object
其实都一样

他下面有一个属性叫 constructor  
console.log(hp1.constructor) // ƒ Object() { [native code] } 打印出的是一个函数


console.log(Handphone.prototype) // { constructor: f Handphone() } 
可以看到这里也打印出了一个 constructor,它对应的是 构造函数本身(构造器)
constructor -> 原型上的constructor 是 指向 构造函数本身


```

继续测试：

```
现在做一个操作， 写一个同为构造函数的 Telephone
并且让Handphone 构造函数 的原型对象中的 constructor 指向 Telephone
unction Telephone(){}
function Handphone(color,brand,system){
	this.color = color;
	this.brand = brand;
	this.system = system;
}	
Handphone.prototype = {
	constructor: Telephone
}

console.log(Handphone.prototype) //{ constructor: f Telephone() } 
原本指向的是 { constructor: f Handphone() } ，现在已经指向了 Telephone

证明：可以通过改变原型中的constructor 改变构造函数的指向


```



![image-20220114095340091](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20220114095340091.png)



再来：

```
function Car(){

}
Car.prototype.name = 'Benz';
var car = new Car();
console.log(car);  // Car {}
//实际上：
打开空对象 [[Prototype]]: Object 会发现这个属性即我们说的： __proto__
->
[[Prototype]]: Object
name: "Benz"
constructor: ƒ Car()
[[Prototype]]: Object
这些东西都在实例化对象里面 ，就是说在 this 里面，每个实例化对象都会有这些
function Car(){
	var this = {
		__proto__ :
	}	
	return this
}
证明：
实例化对象中才有 __proto__, __proto__属于每个对象实例，当没进行实例化时，this 指向window
this 都不指向对象，所以 __proto__都不存在

同时在实例上还发现：name: "Benz"
我们是通过狗仔函数上添加的，在实例上(this)的__proto__ 对象下也可以看到
同时 通过 console.log(car.name) // Benz 可以拿得到
实际上
function Car(){
	var this = {
		__proto__ : Car.prototype
	}	
	return this
}
是这样储存的：
__proto__ : Car.prototype
 原型是属性实例化对象的，而不是属性构造函数，因为要等实例化，才可以挂在__proto__ 下
 
 实例化的 __proto__ 指向 构造函数的prototype
 
 原型一定是属于构造函数的实例化对象的
 
 为什么 能够访问到 car.name 呢？
 function Car(){
 
	this.name = 'Mazda'
}
自身有，就访问自身，没有就访问 __proto__ 指向的 构造函数中的 prototype 对象中的值

为啥要 __proto__ 这样写？ 证明这个是系统内置的属性
本质上就上个键名，就通过这个访问构造函数的原型
他就是每个实例化对象的原型的容器，他就是装prototype 的，无任何作用 
```

测试：

```
function Car(){
	var this ={
		__proto__:Car.prototype
	}
}

__proto__ 上面一定是要Car.prototype?

function Person(){}

Person.prototype.name = '张三';
//Person.prototype =	{}

var p1 = {
	name:'李四'
}
问题： 既然都是对象，我可以把它替换成 p1吗？

var person = new Person();
console.log(person.__proto__) // {name: '张三', constructor: ƒ}
console.log(person.name)  // 张三
person.__proto__ = p1;
console.log(person.name) // 李四
```



```
function Car(){}
Car.prototype.name = 'Mazda';

var car = new Car();
Car.prototype.name = 'Benz';
console.log(car.name); //  Benz



   
```





window 和 return的问题

```
function test(){
	var a = 1;
	function plus1(){
		a++;
		console.log(a);
	}
	return plus1;
}

var plus = test()
plus(); //2
plus(); //3
plus(); //4
```

变式：return 变 window , 也产生了一个闭包

```
function test(){
	function add(){
		a++;
		console.log(a);
	}
	window.add = add;
}
test();

add(); // 2
add(); // 3
add(); // 4
```

return 自执行的方式 

```
var add = (function(){
	var a = 1;
	function add(){
		a++;
		console.log(a);
	}
	return add;
})()

add(); //2
add(); //3
add(); //4
```

window 自执行方式 --> 这就是JS插件的写法

```
;(function(){
	var a = 1;
	function add(){
		a++;
		console.log(a);
	}
	window.add = add;
})()

add(); //2
add(); //3 
add(); //4
```



#### JS插件

通过自执行函数，给window 挂载一个构造函数，就可以任意实例化对象了

在构造函数中写方法，就可以开发插件

```
;(function(){
	function Test(){
	
	}
	
	window.Test = Test;
})()
var test = new Test()
```

写一个插件，任意写两个数字，调用插件内部方法可进行加减乘除功能

```
// 写一个插件，任意写两个数字，调用插件内部方法可进行加减乘除功能
/*
* firstNum  第一个数 type = number
* secondNum 第二个数 type = number
* operation 四则运算：[plus || minus || mul || div] type = string
*/
;(function(){
	function Computed(opt){
		this.firstNum = opt.firstNum
		this.secondNum = opt.secondNum
	}
	Computed.prototype = {
		plus: function(){
			var	res = this.firstNum + this.secondNum;
			console.log(res);
		},
		minus:function(){
			var res = this.firstNum - this.secondNum;
			console.log(res);
		},
		mul:function(){
			var res = this.firstNum * this.secondNum;
			console.log(res);
		},
		div:function(){
			var res = this.firstNum / this.secondNum;
			console.log(res);
		}
	}

	window.Computed = Computed;
})()


// 实例化，传入两个数，调用 方法即可
var computed = new Computed({
	firstNum: 5,
	secondNum:10
});
computed.plus();
computed.minus();
computed.mul();
computed.div();
//------------------------
```

**当原型对象的属性值为基本类型的数据值时，通过实例对象修改属性值从而引起原型对象的属性值发生变化的情况不会发生。当原型对象的属性值为引用类型的数据值时，通过实例对象修改属性值就可能引起原型对象的属性值发生变化。**

**基本数据类型在实例修改时会直接在实例上创建该属性，而不会在原型上修改；而引用类型在实例修改时会改变原型对象上的属性。**

为什么实例给原型对象上的属性赋值时，会出现这两种差异？

首先分析第一种情况：在实例给在原型对象上定义的属性**赋值**时，会在实例上创建一个同名的属性，而不会去赋值原型对象上的属性。**这里不管是引用类型还是基本类型都一样。**

原因：编译器在读取到赋值信息时依旧会沿着原型链进行查找，当在原型对象上找到该属性时，会先查看其属性描述符[[writable]]（默认为true）。若[[writable]]为true，则不会对原型对象上的属性进行操作，而是在该实例上创建一个新的同名属性。若[[writable]]为false，则会操作失败

分析第二种情况：在实例对在原型对象上定义的**引用类型**属性进行**修改**，会直接对原型对象的该属性进行修改。

- 原因：在不是赋值的情况下，编译器直接沿着原型链进行查找，在原型对象上找到该属性后就直接进行修改。

原型深入：

```

```







// call/apply  更改this 的指向

借用函数的属性和方法，apply 使用的比较多

```
// 1. 写一个函数
function test(){
	console.log('test')
}
// 执行函数
test() // test -> 这个函数执行，系统隐式调用 call() 方法
test.call() // test

//2. 那call 有什么用？

// 创建构造函数 Car
function Car(brand,color){
	this.brand = brand;
	this.color = color;
}

var newCar = {};

// 第一个参数是对象， 后面的参数是 构造函数的参数
Car.call(newCar,'Benz','red');
console.log(newCar)  // 发现 newCar 对象 已经有 brand 和 red 的属性和值！！

就是说，改变了 this 的指向， 指向到了 newCar 里面去了
变成：
function Car(brand,color){
	newCar.brand = brand;
	newCar.color = color;
}



// apply 区别不大，第二个参数 是 arguments;
Car.apply(newCar,['Benz','red']);
console.log(newCar)  // 也可以达到目的

同时，不影响我构造函数的正常使用
var car = new Car('Benz','red');


并且，当调用函数之前，对象本身有值，也不会影响
如：
var newCar = {
	displacement:'3.0'
};
Car.apply(newCar,['Benz','red']); // {displacement:'3.0',brand:'Benz',color:'red'}
//不影响，方法也可以

function Car(brand,color){
	this.brand = brand;
	this.color = color;
	this.run = function(){
		console.log('run')
	}
}
Car.apply(newCar,['Benz','red']);
newCar.run(); // 可以调用到方法
```





```
// apply call
//  年龄为xx岁，姓名为XX 买了一辆排量为 xx 的什么 颜色的 XX牌子的车

function Car(brand,color,displacement){
	this.brand = brand;
	this.color = color;
	this.displacement = displacement;
	this.info = function(){
		return '排量为'+ this.displacement +'的'+ this.color +'的'+ this.brand;
	}
}


function Person(opt){
	Car.apply(this, [opt.brand, opt.color, opt.displacement]);
	// 上面代码的操作相当于
	// this.brand = brand;
	// this.color = color;
	// this.displacement = displacement;
	// this.info = function(){
	// 	return '排量为'+ this.displacement +'的'+ this.color +'的'+ this.brand;
	// }
	this.name = opt.name;
	this.age = opt.age;
	this.say = function(){
		console.log(
			'年龄为'+ this.age + '岁,'+'姓名为'+this.name+'的土豪'+'买了一辆'+ this.info()
		)
	}
}

var man = new Person({
	name: '张三',
	age: '19',
	brand: 'Benz',
	color: '红色',
	displacement: '3.0'
});
man.say()
```

对象的访问

```
var myLang = {
	No1:'HTML',
	No2:'CSS',
	No3:'javascript',
	myStudying:function(num){
		console.log(this['No'+ num]);
	}
	
}
```



最早的JS引擎 都是 obj['key'] 来获取的

后面有点语法

obj.name -> obj['name']



对象枚举（一组有共同特性的数据的集合叫枚举） --> 遍历

在javascript 中 数组是一个特殊的对象

因此对象枚举也要讨论数组

```
var arr = [1, 2, 3, 4, 5];
for(var i =0;i<arr.length;i++){
	console.log(arr[i])
}

for(var i in arr){
	console.log(arr[i])
}
```

对象

```
var car = {
 brand: 'benz', // key : value
 color:'red',
 lang:'5',
 width:'2.5'
}
for(var key in car){
	console.log(key); // 对象中的键名
	console.log(car.key) // undefined  ->  car.key -> car['key'] -> undefined
	console.log(car[key])  // 正确写法
}
```

hasOwnProperty方法

深浅拷贝问题

```
var obj = {
	name:'czh',
	age:18
}

console.log(obj.hasOwnProperty('name')) // true    说明 这个方法返回布尔值 判断对象是否包含特定的自身（非继承）属性。


function Car(){
	this.brand = 'Benz';
	this.color = 'red';
	this.displacement = '3.0';
}

Car.prototype = {
	long = 5,
	width:2.5
}

var car = new Car();
console.log(car); 

遍历后再加
Object.prototype.name = 'Object';

//进行遍历
for(var key in car){
	console.log( key + ':' + car[key]) // 会输出自己和原型上的属性
}

for(var key in car){
	if(car.hasOwnProperty(key)){
		console.log(car[key])  // 输出自己对象中的属性
	}
}
```



探讨：

```
var car = {
 brand: 'benz',
 color: 'red'
}

console.log('displacement' in car)； // 报错
console.log(car.hasOwnProperty('displacemnet')) // false
```



构造函数

```

function Car(){
 this.brand = 'benz';
 this.color = 'red';
}

Car.prototype = {
	displacement: '3.0'
}

var car = new Car();

console.log('displacement' in car); //  true
console.log(car.hasOwnProperty('displacement')) // false
```



instanceof  **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```
 function Car (){}
 var car = new Car();
 
 console.log(car instanceof Car);  // true  是否是 Car 构造函数构造出来的呢？
 
 function Person(){}
 var p = new Person();
 console.log(p instanceof Car);  // false
 console.log(car instanceof Object);  // true 是否是 Object 构造函数构造出来的呢？
 console.log(p instanceof Object);  // true 
  
  
 console.log([] instanceof Array); //true
 console.log([] instanceof Object); //true 
 console.log({} instanceof Object); // true
 
 也就是说A对象的原型里到底有没有B构造函数的原型
 也就是说，在原型链上面有重合的，就是 ture
 B实例化对象的原型，跟A对象原型上的有重合的，都为true
 
 如原型链： car 原型-> Car 原型 -> Object
 因此   car instanceof   Car 和 Object 都为 true
 
 再比如原型链： [] -> Array -> Object
  因此   [] instanceof   Array 和 Object 都为 true
  
```

如何判断是一个数组

```
var a = [];

//方法1
console.log(a.constructor); // f Array() 
// 方法2
console.log(a instanceof Array);

// 方法3
var str = Object.prototype.toString.call(a);
console.log(str) // [object Array]

//[object Array] 是什么？
Object.prototype = {
	toString: function(){
		this.toString();
	}
}

// 用了 call 方法 ，把this 变为 a,   Object.prototype.toString.call(a);

Object.prototype = {
	toString: function(){
		a.toString();
	}
}
//输出 [object Array] 


```



原型方法的重写：

```
var arr = new Array(1, 2, 3);
console.log(arr);
console.log(arr.toString()); // 1, 2, 3
console.log(Object.toString().call(arr)); // [object Array] 
```

因此：判断是否为数组可以这样写：

```
var str = Object.prototype.toString;
var trueTip = '[object Array]';
if(str.call(a) === trueTip){
	console.log('是数组')
}else{
	console.log('不是数组')
}
```

this 指向问题

1.普通函数内部的this 指向

```
function test(b){
	this.d = 3;   //  window.d = 3;
	var a = 1;
	function c(){}
}
test(123);
console.log(d)  //3  
console.log(this.d) //3
console.log(window.d) // 3
证明，只要没有实例化函数，这个函数的this 就指向window
//分析
1.寻找函数的形参和变量声明（变量提升）

2.把实参的参数值赋值给形参

3.寻找函数体内的 函数声明和 赋值 函数体

4.函数执行
//AO = {
	this: window   // 默认指向window
	arguments:[123],  // 实参列表
	b: undefined -> 123
	a: undefined
	c: function c(){}
	
}


```

2.构造函数内部的this 指向

```
function Test(){
	// var this = {
	// __proto__:Test.prototype
	//}
	this.name = '123';
}
var test =  new Test();


// AO = {
	this: {
		name:'123',
		__proto__:Test.prototype
	}
}
// 函数执行的时候，this 指向实例化对象了

// GO = {
	// this: window,
	// Test : function test(){...},
	//test:{
	//	name:'123',
	//	__proto__:Test.prototype
	//}
}
```

call,apply

```
function Person(name,age){
	this.name = name;
	this.age = age
}
function Programmer(name,age){
	Person.apply(this,[name, age]);
	this.work = 'programming'
}

var p = Programmer('张三',18);
console.log(p)
```

//1.全局this，指向window

// 预编译阶段函数 this -> window

//apply/call 改变this 指向

// 构造函数的this 指向 实例化对象



callee / caller

