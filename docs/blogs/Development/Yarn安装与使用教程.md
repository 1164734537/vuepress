---
showSponsor: true
title: Yarn 安装与使用教程
date: 2021-04-08
tags:
  - Yarn
categories:
  - 开发环境
---

## Yarn介绍

> Yarn 是 Facebook, Google, Exponent 和 Tilde 开发的一款新的 JavaScript 包管理工具。 你可以通过它使用全世界开发者的代码，或者分享自己的代码。代码通过包（package）（或者称为模块（module））的方式来共享。 一个包里包含所有需要共享的代码，以及描述包信息的文件，称为package.json。它的优点是更快、更安全、更可靠。它的主要特性有离线模式、确定性、网络性能、多注册、网络恢复能力、扁平模式以及 Emoji。



## Yarn 的优点

- 快速：Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。

- 可靠：使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。

- 安全：在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。




## Yarn安装

```shell
npm install -g yarn
```



## Yarn命令

### 查看版本

```shell
yarn --version
```



### 【1】初始化新项目

```shell
yarn init
```



### 【2】添加依赖包



#### 会自动安装最新版本，会覆盖指定版本号

```
yarn add [package] 
```



#### 一次性添加多个包

```
yarn add [package] [package] [package]
```



#### 添加指定版本的包

```
yarn add [package]@[version]
```



#### 安装某个tag（比如beta,next或者latest）

```shell
yarn add [package]@[tag] 
```



### 【3】将依赖项添加到不同依赖项类别

> 不指定依赖类型默认安装到dependencies里，你也可以指定依赖类型分别添加到 devDependencies、peerDependencies 和 optionalDependencies

```shell
yarn add [package] --dev 或 yarn add [package] -D // 加到 devDependencies
yarn add [package] --peer 或 yarn add [package] -P // 加到 peerDependencies
yarn add [package] --optional 或 yarn add [package] -O // 加到 optionalDependencies
```



### 【4】升级依赖包

```shell
yarn upgrade [package] // 升级到最新版本
yarn upgrade [package]@[version] // 升级到指定版本
yarn upgrade [package]@[tag] // 升级到指定tag
```



### 【5】移除依赖包

```
yarn remove [package] // 移除包
```



### 【6】安装package.json里的包依赖，并将包及它的所有依赖项保存进yarn.lock



#### 安装所有依赖

```
yarn 或 yarn install 
```



#### 安装一个包的单一版本

```
yarn install --flat
```



#### 强制重新下载所有包

```
yarn install --force
```



#### 只安装生产环境依赖

```
yarn install --production
```





### 【7】发布包

```shell
yarn publish
```



### 【8】运行脚本

> 用来执行在 package.json 中 scripts 属性下定义的脚本

```shell
yarn run 
```



### 【9】显示某个包的信息

>  可以用来查看某个模块的最新版本信息

```shell
yarn info [package] 
```



### 【10】缓存

```shell
yarn cache
yarn cache list // 列出已缓存的每个包
yarn cache dir // 返回全局缓存位置
yarn cache clean // 清除缓存
```





## yarn 和 npm 命令对比

| NPM                          | Yarn                      | 说明                            |
| ---------------------------- | ------------------------- | ------------------------------- |
| npm init                     | yarn init                 | 初始化某个项目                  |
| npm install/link             | yarn install/link         | 默认安装依赖                    |
| npm install taco --save      | yarn add taco             | 安装某个依赖并默认保存到package |
| npm uninstall taco --save    | yarn remove taco          | 移除某个依赖                    |
| npm install taco --save -dev | yarn add taco -dev        | 安装某个开发时的依赖            |
| npm update taco --save       | yarn upgrade taco         | 更新某个依赖项目                |
| npm install taco --global    | yarn global add taco      | 安装某个全局依赖项目            |
| npm publish/login/logout     | yarn publish/login/logout | 发布/登录/退出                  |
| npm run/test                 | yarn run/test             | 运行某个命令                    |

