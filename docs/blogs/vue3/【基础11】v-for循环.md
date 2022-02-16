---
showSponsor: true
title: 【基础11】v-for循环
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
---

## 【基础11】v-for循环

使用Vue的时候循环是最常用的一种操作，之前初步了解了简单的使用

接下来详细列出具体使用方法

### v-for循环数组的方法

v-for最常用的功能就是循环数组，先来看一个数组循环的例子

#### 基础代码模版

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next" ></script>
</head>
<body>
    <div id="app"></div>
</body>
<script>
    const app=Vue.createApp({ 
        data(){
            return{   
            }
        },
        methods:{
        },
        template:``

    }) 
    const vm=app.mount("#app")
</script>
</html>
```

也就是最基本的一个Vue文件结构。然后在`data`中声明一个数组，数组叫做`listArray`,代码如下：

```js
data(){
    return{  
        listArray:['1','2','3','4']
    }
},
```

data中数组写完后，现在要作的是在`template`中循环出这些数组,这里当然使用`v-for`，代码如下：

```js
template:`
    <ul>
        <li v-for="item in listArray">{{item}}</li>
    </ul>
`
```

上面代码写完后在浏览器中预览效果，可以看到，已经如我们所愿，在页面渲染出了列表。在`v-for`渲染数组时中还可以加入索引`index`,也就是 数组的下标。

```js
template:`
    <ul>
        <li v-for="(item,index)  in listArray">[{{index}}]{{item}}</li>
    </ul>
`
```

这些就是最基本v-for循环数组的知识。

### 关于循环时的key值

为了提高循环时性能，在数组其中一项变化后，整个数组不进行全部重新渲染，Vue提供了绑定key值的使用方法，目的就是增加渲染性能，避免重复渲染。

为了理解这个概念，先编写出一个按钮，然后每次点击按钮后向数组中增加`push`一个新值。

```js
methods:{
    handleChangeBtnClick(){
        this.listArray.push('新增的项')
    },
},
template:`
    //......
    <button @click="handleChangeBtnClick">点我改变</button>
`
```

写完后，你到页面中预览，当你点击按钮时，表面上你看到增加了一个新的内容，实际整个列表都被重新渲染了。在实际工作中，这样的代码是不被允许的，它会降低页面的性能，在数据量变多的时候，用户用起来会变的卡顿。

这时，你可以加唯一性`key`值，增加后vue就会辨认出哪些内容被渲染后并没有变化，而只渲染新变化的内容。

```js
<ul>
    <li v-for="(item,index)  in listArray" :key="index+item">
        [{{index}}]{{item}}
    </li>
</ul>
```

官方不建议使用索引`index`为key值，但此时又为了保持唯一性，所以这里使用了`index+item`进行绑定key值

### v-for循环对象的方法

v-for不仅可以循环数组，还可以循环对象，使用方法基本和数组一样（但其中参数值是不一样的）。这里先在data中建立一个对象。代码如下：

```js
data(){
    return{  
        //......
        listObject:{
			uncleone:'陈叔叔',
            uncleTwo:'李叔叔',
            uncleThree:'张叔叔',
        }
    }
},
```

在模板中进行循环的时候，为了更好的语义化，我们把参数改为了`value`,`key`和`index`。然后进行循环。

```js
<ul>
    <li v-for="(value,key,index)  in listObject" :key="key">
        [{{index}}]{{value}}-{{key}}
    </li>
</ul>
```

写完后可以到浏览器中预览，也是可以得到你想要的结果的。

```html
[0]陈叔叔-uncleOne
[1]李叔叔-uncleTwo
[2]张叔叔-uncleThree
```

动手练习一下这些内容，因为他们在工作后基本每天都在使用。

