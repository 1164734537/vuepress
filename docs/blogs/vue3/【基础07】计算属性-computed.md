---
showSponsor: true
title: 【基础07】计算属性-computed
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
---
## 【基础07】计算属性-computed

计算属性的特性是：当计算属性依赖的内容发生变更时，才会重新执行计算。

### 基本页面和准备变量

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue中的计算属性</title>
    <script src="https://unpkg.com/vue@next" ></script>
</head>
<body>
    <div id="app"></div>
</body>
<script>

    const app=Vue.createApp({ 
        data(){
            return{
                message:'陈' , 
            }
        },
        methods:{
            handleItemClick(){
               this.message = this.message=='陈'?'叔叔':'陈'
            }
        },
        template:`
            <h2> {{message}}</h2>
        `
    }) 
    const vm=app.mount("#app")
</script>

</html>
```

有了基本的Vue基本结构后，我们先在Data中生命两个变量，单价(price)和数量（count）。单价设置为10，数量设置为2个。data中的代码如下：

```js
data(){
    return{
        message:'陈' , 
        price:10,
        count:2
    }
},
```

然后我们在模板`template`中打印出两个变量的综合`price * count`。

```js
template:` <h2> {{price * count}}</h2>`
```

如果 一切正常的话，这时候打开浏览器预览，你应该可以看到页面上显示的是`20`。

这种方法当然可以，但是显得不够优雅，也没有语义化。如果你想进行语义化，你可能想到的第一个办法就是写一个`getTotal`的方法。

```js
methods:{
        getTotal(){
            return this.price * (this.count++);
        }
    },
    template:` <h2> {{getTotal()}}</h2>`
```

这时候你再次查看浏览器，依然可以得到同样的结果。也许你还看不出来什么问题，但此时他确实存在一些问题，问题就是只要页面中有一个值重新渲染了，他都会重新执行。

### methods方法无法满足的需求

如何看出这个问题那？我们可以稍微修改一下代码，让每次得到的值都不同。这时候可以使用获得时间戳的方法，来获得当前的时间戳。

```js
methods:{
    getTotal(){
        return Date.now()
    }
},
```

我们同时在模板中，打印出`message`的值，代码如下。

```js
template:` 
    <h2>{{message}}</h2>
    <h2> {{getTotal()}}</h2>
`
```

这时候打开浏览器的控制台`console`，然后在里边通过手都的方式修改`message`的值`vm.message='1111'`，比如修改为`chen`。这时候问题产生了，你会发现`getTotal( )`方法被重新执行了。这就是这个问题的所在，这个问题其实可以用今天的主角`coumputed`计算属性来解决。

### 编写计算属性

还是获取当前的时间戳，但是写在了计算属性中。计算属性的关键字是`computed`,然后里边可以写计算用的方法，这里我起名叫做`total`，当然你可以起任何的名字。

```js
computed:{
    total(){
        return Date.now()
    }
},
```

然后我们把上面模板中的方法`getTotal( )`换成计算属性`total`。模板的代码如下：

```js
template:` 
    <h2>{{message}}</h2>
    <h2> {{total}}</h2>
`
```

这时候到浏览器中，用手动的方法，修改`message`的值，`total`的值就不会进行改变了。

```js
vm.message='1111'
```

通过这个例子，你会对普通方法和计算属性的区别有所了解。这时候我们作一下总结：

1. 方法methods：只要页面重新渲染，就会重新执行方法
2. 计算属性computed: 当计算属性依赖的内容发生变更时，才会重新执行计算

### 计算属性 -computed实例

我们还是用`单价X数量=总和`这个小例子，来说明具体计算属性的使用方法。修改当前代码，把计算属性中`total( )`方法内容修改。不同的是我们这次加入一个按钮，每点击一下按钮，就会让数量`count`加1。

我们先来修改计算属性中的内容。

```js
computed:{
    total(){
        return this.price * this.count
    }
},
```

然后在模板中写一个按钮，每次点击按钮`count`数量进行增加。

```js
methods:{
    addCount(){
        this.count++
    }
},
template:` 
    <h2>{{message}}</h2>
    <h2> {{total}}</h2>
    <button @click="addCount">再买一个</button>
`
```

这时候我们再到浏览器中查看效果，当点击按钮的时候，计算属性会帮助我们完成模板的自动更新。

总结一下，Vue中的计算属性，重点在于理解计算属性和普通methods方法的区别，当你明白了两者的区别后，在工作中就可以清楚的知道什么时候该用计算属性，什么时候该用vue的方法了。

