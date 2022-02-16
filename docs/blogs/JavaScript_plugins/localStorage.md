---
title: 【JavaScript插件】设置缓存过期时间之localStorage
date: 2021-07-02
showSponsor: true
categories:
 - javascript插件
tags:
 - javascript插件
---

# [localStorage设置一个过期时间]

## 前言：

localStorage除非人为手动清除，否则会一直存放在浏览器中

很多情况下我们可能需要localStorage有一个过期时间，比如我们将用户身份认证 token 保存在客户端，1周之内有效，超过一周则要重新登录，那么这种需求该怎么实现呢

## 实现思路：

localStorage本身并没有提供过期机制，既然如此，那就只能我们自己来实现了

### 给其原型上加一个设置方法

```javascript
原型上添加 setExpirce 方法
    Storage.prototype.setExpire=(key,value,expire) =>{

    };

我们就可以调用
	Storage.setExpire(key,value,expire);
```

要过期就必须要记录时间，我们的思路是，设置值得时候就将当前时间记录进去，
	然后获取值得时候判断一下当前时间和之前的时间差是否在某个范围之内，
	若果超出范围，则清空当前项，并返回null
	要将时间加入到值中就必须要定义一个格式

```javascript
Storage.prototype.setExpire=(key, value, expire) =>{
	    let obj={
	        data:value,
	        time:Date.now(),
	        expire:expire
	    };
	    localStorage.setItem(key,JSON.stringify(obj));
    }
```

data 实际的值   

time 当前时间戳   

expire 过期时间

因为localStorage 设置的值不能为对象， 所以这里使用了 JSON.stringify 方法将其转为字符串，最终在使用的时候得转回来。



### 再给原型上添加一个获取方法

```javascript
Storage.prototype.getExpire= key =>{
    let val =localStorage.getItem(key);
    if(!val){
        return val;
    }
    val =JSON.parse(val);
    if(Date.now()-val.time>val.expire){
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
}
```

箭头函数参数是key，通过key值获取对应的 缓存， val 是空则返回
有则 转化为 对象
然后获取当前时间戳，获取当时val中定义的时间戳
两个数相差，如果大于定义的过期时间，则清空缓存，否则返回val中的data

### 总结：

 #### 定义设置方法

```javascript

Storage.prototype.setExpire=(key, value, expire) =>{
    let obj={
        data:value,
        time:Date.now(),
        expire:expire
    };
	localStorage.setItem(key,JSON.stringify(obj));
}
```

#### 定义获取方法

```javascript
Storage.prototype.getExpire= key =>{
    let val =localStorage.getItem(key);
    if(!val){
        return val;
    }
    val =JSON.parse(val);
    if(Date.now()-val.time>val.expire){
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
}
```

#### 使用

```javascript
//持续5秒的token
localStorage.setExpire("token",'xxxxxx',5000);
```

#### 触发定时器查看

```javascript
 window.setInterval(()=>{
	console.log(localStorage.getExpire("token"));
 })
```

