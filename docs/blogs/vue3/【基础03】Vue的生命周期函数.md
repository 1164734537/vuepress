---
showSponsor: true
title: 【基础03】Vue的生命周期函数
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
  - vue3的生命周期
---
### 【基础03】Vue3的生命周期函数

生命周期函数你可以这样理解，就是在在某一时刻会自动执行的函数 ，这句话你可以注意两个关键词`某一时刻`和`自动执行`。

### 准备空白页面

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo7</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="app"></div>
</body>
<script>
    const app = Vue.createApp({
        data() {
            return {
                message: '陈叔叔'
            }
        },
        template: "<h2>{{message}}</h2>"
    })
    const vm = app.mount("#app")

</script>

</html>
```

### 自动执行函数理解

如果要理解什么是自动执行函数，我认为可以对比来看，先清楚什么是被动执行函数。比如我们写了一个`handleItemClick( )`方法，然后让模板里的`<h2>`点击后执行此事件，代码如下。

```js
methods: {
    handleItemClick() {
        alert('被动执行函数')
     }
 },
 template: "<h2 v-on:click='handleItemClick'>{{message}}</h2>"
```

这时候可以打开浏览器，看一下这个效果。你需要点击对应的dom元素，他才会执行方法，这个就是被动执行函数。当你了解被动执行函数，再来了解什么是自动执行函数。写一个`mounted`方法，它就会自动执行。这种就是自动执行函数。

```js
mounted() {
     alert('mounted')
},
```

这时候你再刷新一下网页，就可以看出`mounted`被直接弹出了。这种没有任何操作，自动执行的方法，就叫做自动执行函数。

明白了什么是自动执行函数后,再来学习Vue3.x的生命周期函数

### Vue3生命周期函数

这里我们用一张Vue官方给出的声明周期函数图片来进行理解。看图理解会更透彻些。

https://vue3js.cn/docs/zh/images/lifecycle.png

![https://vue3js.cn/docs/zh/images/lifecycle.png](https://vue3js.cn/docs/zh/images/lifecycle.png)

- beforeCreate( ) ：在实例生成之前会自动执行的函数

- created( ) : 在实例生成之后会自动执行的函数

- beforeMount( ) : 在模板渲染完成之前执行的函数

- mounted( ) : 在模板渲染完成之后执行的函数

  

  我们也写了对应的方法，通过这些代码和查看效果，可以很好的理解生命周期函数执行的先后顺序。代码如下。

```js
beforeCreate() {
    console.log('beforeCreate')
},
created() {
    console.log('created')
},
beforeMount() {
    console.log('beforeMount')
},
mounted() {
    console.log('mounted')
},
```

写完这些代码后，你可以到浏览器中查看一下效果。

### beforeUpdata和updated生命周期函数

这两个生命周期函数在Vue中的data数据发生变化时，才会被执行，一个是在变化之前，一个是在变化之后。我们先来看`beforeUpdate`函数，也就是在数据变化之前。

为了能展示这个效果，我们写一个数据变化的功能，每次点击文字都进行改变。在`handleItemClick`方法中，改变`message`的值。这里使用了三元运算符，代码如下：

```js
handleItemClick() {
    this.message = this.message == '陈叔叔来了' ? "uncle'chan" : "陈叔叔来了"
}
```

有了这个方法之后，再来编写`beforeUpdate`方法。代码如下：

- beforeUpdate ：当data中的数据变化时， 会立即自动执行的函数

```js
beforeUpdate() {
    console.log('beforeUpdate')
},
```

写完后，你可以打开浏览器去看一下效果。

- updated：当data中的数据发生变化，页面重新渲染完后，会自动执行的函数

```js
updated() {
    console.log('updated')
},
```

在浏览器中你是可以看出先后顺序的。这个不太直观，如何用代码的方式看出`beforeUpdate`和`updated`区别？我们可以通过下面这种方法。

```js
beforeUpdate() {
    console.log('beforeUpdate')
    console.log(document.getElementById('app').innerHTML)
},
updated() {
    console.log('updated')
    console.log(document.getElementById('app').innerHTML)
},
```

通过这种形式，就可以清楚的看出，在`beforeUpdate`时，DOM的内容并没有渲染更新，而到了`updated`中DOM的内容已经进行了更新。这就是两个生命周期函数的区别。

### beforUnmount和unmounted生命周期函数

这两个生命周期函数是在Vue销毁时自动执行的函数，一个是销毁前执行，一个是销毁后执行。

- beforeUnmount( ) :当Vue应用失效时，会自动执行的函数
- unmounted() : 当Vue应用失效时，且DOM完全销毁之后，会自动执行

我们可以先把这两个生命周期函数写在页面上，代码如下：

```js
beforeUnmount() {
    console.log('beforeUnmount')
},
unmounted() {
    console.log('unmounted')
},
```

那如何能看到这个效果那？这个需要在浏览器的控制台中输入销毁代码。

```js
app.unmount()
```

这时候就会打印出这两个对应的生命周期函数了。当然你这时候如果编写程序看出页面变化，也可以通过打印`innerHTML`方式。来看出效果。

```js
beforeUnmount() {
    console.log('beforeUnmount')
    console.log(document.getElementById('app').innerHTML)
},
unmounted() {
    console.log('unmounted')
    console.log(document.getElementById('app').innerHTML)
},
```

这时候在浏览器执行`app.unmount()`,会看到，在`beforeUnmount`方法中还是有DOM内容的，然后到了`unmounted`方法中，就已经没有任何的DOM内容了。

### 总结：Vue3的八个生命周期函数

- beforeCreate( ) ：在实例生成之前会自动执行的函数
- created( ) : 在实例生成之后会自动执行的函数
- beforeMount( ) : 在模板渲染完成之前执行的函数
- mounted( ) : 在模板渲染完成之后执行的函数
- beforeUpdate ：当data中的数据变化时， 会立即自动执行的函数
- updated：当data中的数据发生变化，页面重新渲染完后，会自动执行的函数
- beforeUnmount( ) :当Vue应用失效时，会自动执行的函数
- unmounted() : 当Vue应用失效时，且DOM完全销毁之后，会自动执行

这些生命周期虽然多，你可以成对的去记忆，这样就有四个关键节点了：创建、渲染、更新、销毁。最主要的理解是他们是自动执行的函数。

