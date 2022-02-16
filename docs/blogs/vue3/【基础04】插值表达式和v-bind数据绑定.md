---
showSponsor: true
title: 【基础04】插值表达式和v-bind数据绑定
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
---
## 【基础04】插值表达式和v-bind数据绑定

两个模板语法：插值表达式和v-bind的使用

### 什么是插值表达式？

我以前经常说的`字面量`，其实正确叫法应该叫做`插值表达式`，当然我们公司大部分还是叫`字面量`的,也就是我们经常看到的`{{xxxx}}`这样的东西。

### 基本代码

```js
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
                message: 'jspang.com'
            }
        },
        methods: {
            handleItemClick() {
                this.message = this.message == '陈叔叔' ? "uncle‘chan" : "陈叔叔"
            }
        },
        template: "<h2 v-on:click='handleItemClick'>{{message}}</h2>"
    })
    const vm = app.mount("#app")

</script>

</html>
```

这时候我们看到在`template`属性中的`{{message}}`就是插值表达式。也就是说利用这种形式，可以使用data中的变量，展示在模板中。

### 插值表达式输出html标签-v-html指令

如果我想在变量里，编写一些html的标签，然后输出展现在页面中，这时候会出现点小问题。我们先修改代码，看看问题所在。例如在message中加入`<i>`标签。

```js
return {
    message: '<i>陈叔叔</i>'
}
```

这时候如果什么都不做，直接输出，你在浏览器中看到的结果就是下面的样子。

```js
<i>陈叔叔</i>
```

这并不是你想要的结果，这时候需要使用`v-html`的标签解决这个问题。把template属性的部分改成下面的样子。需要注意的是这压力要改成"`"符号，否则不能使用双引号这种形式

```js
template: `<h2 v-html="message"> </h2>`
```

这时候再预览，就可以看到浏览器中的字变成了斜体。

### 插值表达式只做一次渲染-v-once

现在这种插值表达式，是跟着data中的数据一起变化的，也就是我们常说的数据双向绑定。但是如果我希望一个插值表达式，只有在第一次渲染去data中的值，而以后不再跟随data变化，这时候就要用到`v-once`指令。

先来看一下目前这种代码，我们为`h2`标签，加入相应事件`handleItemClick`,代码如下。

```js
template: `<h2 v-on:click="handleItemClick" v-html="message"> </h2>`
```

这时候在浏览器中可以看到，我们每点击一次h2标签，`message`的值都是变化的。再改写一下代码。

```js
template: `<h2 
                v-on:click="handleItemClick" 
                v-html="message"
                v-once
            > </h2>`
```

加入了`v-once`后，无论data中的数据如何变化，模板也不会再次重新渲染了，这就是`v-once`的变化。

插值表达式中是可以使用JS表达式的

其实在插值表达式中是可以使用JS表达式的，最常用的表达式是三元运算符。比如下面这样的代码也是可以的。比如在data中新声明一个变量`count`，用三元运算符判断是否是大于2，如果大于2显示大，小于2显示小，编写代码如下：

```js
<script>
    const app = Vue.createApp({
        data() {
            return {
                message: '<i>jspang.com</i>',
                count: 5
            }
        },
        methods: {
            handleItemClick() {
                this.message = this.message == '陈叔叔' ? "uncle‘chan" : "陈叔叔"
            }
        },
        template: `<h2 
                        v-on:click="handleItemClick" 
                        v-html="message"
                        v-once
                    > </h2>
                    <div>{{count>2?'大':'小'}}</div>
                    `
    })
    const vm = app.mount("#app")

</script>
```

当然你也可以使用一些简单的表达式，比如下面这些样子的JS表达式.

```js
<div>{{'陈'+'叔叔'}}</div>
<div>{{1+2}}</div>
```

这些形式的表达式都是可以的，但是如果你想用if语句，就是不可以的，因为只能用JS表达式而不能用语句。

### v-bind指令使用

现在我们给h2标签加入一个title属性，属性的值也想使用`message`。代码如下：

```js
<h2 
  v-on:click="handleItemClick" 
  v-html="message"
  v-once
  title="message"
> </h2>`
```

这时候浏览器中鼠标放上时显示的确实`message`这个单词，而并没有出现我们想要的结果。这时候就可以使用`v-bind`标签了。写成下面的样式就可以了。

```js
v-bind:title="message"
或者简写：
:title = "message"
```

### 总结：

插值表达式和一些特殊情况的用法、

`v-html`指令

`v-once`指令

在插值表达式中使用JS表达式

`v-bind`指令

