---
showSponsor: true
title: 【基础10】v-show和v-if的差别
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
  - v-show和v-if的差别
---

## 【基础10】v-show和v-if的差别

掌握`v-if`和`三元运算符`，接下来在学一个和`v-if`很类似的语法`v-show`，以及它和`v-if`有什么区别

### 准备基本模板代码

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
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
    template:`
        <h2>陈叔叔</h2>  
        ` 
    }) 
    const vm=app.mount("#app")

</script>

</html>
```

准备好最基本的结构后，在数据项中声明一个`show`的变量。

```js
data(){
    return{
        show:true,
    }
},
```

有了变量后，可以在模板中使用`v-show`来控制CSS样式，从而控制DOM元素的展示与否。

```js
template:`
    <h2 v-show="show">陈叔叔</h2>  
`
```

这时候打开浏览器进行预览，是可以看到`陈叔叔`这个h2的DOM元素的。如果把数据项`show`改成`false`就看不到了。

### v-if和v-show的区别

v-show看起来和v-if语法的功能基本一样，但其实他们无论是灵活性还是功能都是有区别的。

`v-if`**更加灵活**，可以增加多个判断，比如`v-else-iif`和`else`，而`v-show`**不具备这样的灵活性**。

v-show控制DOM元素显示，其实控制的是css样式，也就是`display:noe`。现在你可以把`data`的值修改为false，然后刷新浏览器，打开浏览器调试器的`Elements`选项卡，就可以清楚的看到，这时候`<h2>`标签上的style样式就是`display:none`。

```js
<h2 style="display: none;">陈叔叔</h2>
```

现在回到vscode中的代码，在模板中再复制一行(在vscode中用`Alt+Shift+↓`就可以快速复制一行)，这时候用`v-if`进行判断。再次在浏览器中预览，你会发现整个DOM元素都不见了。

现在你应该明白了`v-if` 和`v-show`的区别,那如何使用他们。这个就要看具体的需求了，如果显示和隐藏的状态切换比较频繁，并且没有什么多余复杂的业务逻辑，建议使用`v-show`,因为他不会一直渲染你的页面DOM元素，这或多或少对性能和稳定性有点提升。反之可以使用`v-if`。

