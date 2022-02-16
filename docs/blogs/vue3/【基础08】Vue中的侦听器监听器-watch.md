---
showSponsor: true
title: 【基础08】Vue中的侦听器/监听器-watch
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
  - 侦听器和计算属性的区别
---
## 【基础08】Vue中的侦听器/监听器-watch

Vue中的侦听器（也有叫监听器），它可以侦听data中值的变化，做出相应的操作。这看起来和计算属性（computed）很像，但如果你足够细心，也可以发现一些区别

### 计算属性代码块

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo12-Vue中的计算属性</title>
    <script src="https://unpkg.com/vue@next" ></script>
</head>
<body>
    <div id="app"></div>
</body>
<script>

    const app=Vue.createApp({ 
        data(){
            return{
                price:10,
        		count:2
            }
        },
        methods:{
            addCount(){
                this.count++
            }
        },
        computed:{
             total(){
                return this.price * this.count
            }
        },
       template:` 
            <h2>{{message}}</h2>
            <h2> {{total}}</h2>
            <button @click="addCount">再买一个</button>
        `
    }) 
    const vm=app.mount("#app")
</script>

</html>
```



### 侦听器的基本写法

watch侦听器的作用就是侦听一个data中的值的变化，变化后可以写一个方法，让其进行一些操作（业务逻辑的编写）。

在`computed`代码块的上面编写一段侦听器的代码。

```js
watch:{
    count(){
            console.log('count changed')
    }
},
```

上面代码的意思是，写一个侦听器来侦听`count`的数据变化，当`count`变化之后立即在控制台打印出`count changed`。

侦听器中的方法还可以接收两个参数，一个是现在的值（current），一个是变化之前的值（prev）。我们分别接收这两个值，并打印在控制台，看一下效果。

```js
watch:{
    count(current,prev){
        console.log('watch changed')
        console.log('现在的值：',current)
        console.log('变化前的值：',prev)
    }
},
```

在浏览器中可以看到打印的效果。先打印出了3，然后又打印出了2。需要注意的是两个参数的先后顺序，如果不小心，是很容易记反的。

### 侦听器和计算属性的区别

这时候问题来了，计算属性也是可以根据变化执行一些操作的，那侦听器watch和计算属性computed的区别是什么？

先给出结论，计算属性computed必须要返回一个值，而且在页面渲染的同时就会执行里边的业务逻辑，也就是会先执行一遍你写的业务逻辑，而`watch`只有发生变化时才会执行，也就是说值没有变化，它是不执行里边业务逻辑的。为了验证结果，先注释掉侦听器watch相关的内容，在计算属性`total`中写这样的代码。

```js
computed:{
    total(){
        console.log('....count changed')
        return this.price * this.count
    }
},
```

### 计算属性(computed)更加简洁

再来思考一个问题，用watch侦听器，可以写出类似计算属性的代码吗？答案是肯定的。现在我们就就写一个类似计算属性效果。

先在data中声明一个新的变量，叫做`newTotal`，给出一个`20`的值。

```js
data(){
    return {
        //....
        newTotal:20
    }
}
```

然后修改watch中代码，写一个乘法表达式算出`总和`，赋值给`this.newTotal`。

```js
watch:{
    count(current,prev){
        this.newTotal=this.price * current
    }
},
```

最后把模板中的渲染值，改为`newTotal`就可以了。

```js
template:`
    //......
    <h2>总和：{{newTotal}}</h2>
    //......
`
```

写完这些，你在浏览器中看到的效果和计算是属性是一样的。但是从代码简洁性上，显然侦听器的写法是麻烦并冗余，所以建议优先使用计算属性来完成同样的操作。

### methods，watch和computed三者使用优先级

现在总结一下method、watch和computed三者如果都能实现相同的功能，它们之间的取舍和使用优先级。

- `computed` 和 `method`都能实现的功能，建议使用computed,因为有缓存，不用渲染页面就刷新。
- `computed` 和 `watch` 都能实现的功能，建议使用 computed，因为更加简洁。

