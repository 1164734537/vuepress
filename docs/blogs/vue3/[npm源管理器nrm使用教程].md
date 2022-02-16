## [npm源管理器nrm使用教程]

### 1. nrm介绍

m包有很多的镜像源，有的源有的时候访问失败，有的源可能没有最新的包等等，所以有时需要切换npm的源，nrm包就是解决快速切换问题的。
nrm可以帮助您在不同的npm源地址之间轻松快速地切换。

nrm内置了如下源：

| 源        | URL                                                          | 主页                                                         |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| npm       | [https://registry.npmjs.org/](https://link.segmentfault.com/?url=https%3A%2F%2Fregistry.npmjs.org%2F) | [https://www.npmjs.com/](https://link.segmentfault.com/?url=https%3A%2F%2Fwww.npmjs.com%2F) |
| cnpm      | [http://r.cnpmjs.org/](https://link.segmentfault.com/?url=http%3A%2F%2Fr.cnpmjs.org%2F) | [https://cnpmjs.org/](https://link.segmentfault.com/?url=https%3A%2F%2Fcnpmjs.org%2F) |
| taobao    | [https://registry.npm.taobao.org/](https://link.segmentfault.com/?url=https%3A%2F%2Fregistry.npm.taobao.org%2F) | [https://npm.taobao.org/](https://link.segmentfault.com/?url=https%3A%2F%2Fnpm.taobao.org%2F) |
| npmMirror | [https://skimdb.npmjs.com/regi...](https://link.segmentfault.com/?url=https%3A%2F%2Fskimdb.npmjs.com%2Fregistry%2F) | [https://skimdb.npmjs.com/](https://link.segmentfault.com/?url=https%3A%2F%2Fskimdb.npmjs.com%2F) |
| nj        | [https://registry.nodejitsu.com/](https://link.segmentfault.com/?url=https%3A%2F%2Fregistry.nodejitsu.com%2F) | [https://www.nodejitsu.com/](https://link.segmentfault.com/?url=https%3A%2F%2Fwww.nodejitsu.com%2F) |
| rednpm    | [http://registry.mirror.cqupt....](https://link.segmentfault.com/?url=http%3A%2F%2Fregistry.mirror.cqupt.edu.cn%2F) | [http://npm.mirror.cqupt.edu.cn/](https://link.segmentfault.com/?url=http%3A%2F%2Fnpm.mirror.cqupt.edu.cn%2F) |
| edunpm    | [http://registry.enpmjs.org/](https://link.segmentfault.com/?url=http%3A%2F%2Fregistry.enpmjs.org%2F) | [http://www.enpmjs.org/](https://link.segmentfault.com/?url=http%3A%2F%2Fwww.enpmjs.org%2F) |

经过本人实测，nj、rednpm、edunpm 源访问失败(2018-12-19)。



### 2. 安装:npm install -g nrm

打开终端运行`npm install -g nrm`命令：

```
npm install nrm -g
```

查看是否安装成功:

```
nrm --version
```

### 3. 使用

#### 3.1 列出可选择的源:nrm ls

```
~ nrm ls

  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

***注：\*** 前面带 * 号的表示正在使用的源

#### 3.2 切换使用的源:nrm use npm

```
~ nrm use npm
                        
   Registry has been set to: https://registry.npmjs.org/
```

#### 3.3 添加一个源:nrm add <registry><url>

如果你想添加一个源，终端执行命令`nrm add <registry> <url> [home]`，reigstry为源名，url为源的路径， home为源的主页(可不写)。

```
 ~ nrm add company http://npm.company.com/   

    add registry company success
```

***注：\***

1. URL最后的/也可以不带，下面两个URL都是可以的：
   `http://npm.company.com/`
   `http://npm.company.com`
2. [home]参数用于`nrm home`命令，用来查看源的主页。

#### 3.4 删除一个源:nrm del <registry>

想要删除一个源，终端执行命令`nrm del <registry>`，reigstry为源名.

```
 ~ nrm del company

    delete registry company success
```

***注：\***nrm del 命令不能删除nrm自己内置的源。

#### 3.5 测试源速度:nrm test

测试一个源的响应时间：`nrm test npm`

```coffeescript
~ nrm test npm

* npm ---- 833ms
```

测试所有源的速度：`nrm test`

```routeros
~ nrm test

* npm ---- 807ms
  cnpm --- 374ms
  taobao - 209ms
  nj ----- Fetch Error
  rednpm - Fetch Error
  npmMirror  1056ms
  edunpm - Fetch Error
```

#### 3.6 访问源的主页：nrm home taobao

如果你想访问源的主页，可在终端输入下面命令：

```arduino
nrm home taobao
```

此命令会在浏览器中打开淘宝源的主页：[https://npm.taobao.org/](https://link.segmentfault.com/?url=https%3A%2F%2Fnpm.taobao.org%2F)

***注：\***
如果要查看自己添加的源的主页，那么在添加源的时候就要把主页带上：

```awk
~ nrm add company http://npm.company.com/ http://npm.company.com/
```

**如果添加源的时候没有写home信息，那么`nrm home`命令不会有效果。**

#### 4. 不使用nrm来切换源

如果不是nrm也能切换源，只不过比较麻烦。

查看当前使用的源

npm config get registry

```
~ npm config get registry
https://registry.npmjs.org/
```

设置一个源

```
~ npm config set registry https://registry.npm.taobao.org/
```

设置成功后终端不会有任何输出

安装包使用特定源
		全部使用特定源安装：`npm install --registry=https://registry.npm.taobao.org`
安装一个包使用特定源：`npm i logo --registry=https://registry.npm.taobao.org`

### 

### 安装错误1：nrm 安装成功之后 提示“不是内部或外部命令……”

在命令行执行命令，npm install -g nrm，全局安装nrm。执行`nrm -v`之后就说不是内部命令

#### 解决办法：

1、查看nodejs全局安装路径：`npm config ls`

![img](https://img-blog.csdnimg.cn/20210201223950591.png)

其中 prefix 的路径就是 nodejs全局安装路径。

2、将nodejs全局安装路径 配置到系统环境变量中PATH中即可
路径为 nodejs全局安装路径（我这里值为**D:\node.js\node_global**）

![img](https://img-blog.csdnimg.cn/20210201224435300.png)

![img](https://img-blog.csdnimg.cn/2021020122434845.png)

#### 启动cmd，输入 nrm ls 

1.如成功则会显示下列目录

![img](https://img-blog.csdnimg.cn/20210201225905455.png)

#### 如果你是bug工程师，恭喜你，遇到了这个：



![img](https://img-blog.csdnimg.cn/20210220153522529.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xRQ1Y1ODc=,size_16,color_FFFFFF,t_70)

#### 解决办法：

1、首先检查node.js是否安装成功，输入 node -v 若可查看版本号，如图所示即安装成功；

若不一致则重新安装node.js。

node.js官方下载地址：https://nodejs.org/en/download/

![img](https://img-blog.csdnimg.cn/20210220152806492.png)

2.查看npm是否安装成功，如下图成功，反之则重新安装

![img](https://img-blog.csdnimg.cn/2021022015330470.png)

3、报错截图中可见 cli.js文件中 第17行报错，

![img](https://img-blog.csdnimg.cn/20210220153705424.png)

按路径找到该文件：

![img](https://img-blog.csdnimg.cn/20210220153735766.png)

打开文件找到报错的第17行，注掉原17行改为如图：

//const NRMRC = path.join(process.env.HOME, '.nrmrc');(注掉)

const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');



再管理员模式运行cmd，输入nrm ls ：

![img](https://img-blog.csdnimg.cn/20210220154212213.png)

