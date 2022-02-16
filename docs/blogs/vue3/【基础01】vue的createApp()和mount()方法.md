---
showSponsor: true
title: 【基础01】vue的createApp()和mount()方法
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
---
## 【基础01】vue的createApp()和mount()方法

### 基础vue代码

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo6</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="app"></div>
</body>
<script>
    const app = Vue.createApp({})
    app.mount("#app")
</script>

</html>
```

### reateApp()和mount()方法讲解

现在你先看下面两句JavaScript代码,代码中有两个重要的方法`createApp()`和`mount()`。

```js
const app = Vue.createApp({})
app.mount("#app")
```

- `createApp()`方法：

编写`HelloWorld`的时候，就写过这句话`Vue.createApp()`从英文单词上理解，这个就是创建一个应用`create-创建`，`App-Application-应用`，前面的Vue就是Vue这个框架，所以`Vue.createApp()`的意思就是创建一个Vue的应用。

- `mount()`方法

  `mount()`方法就是挂载到某个Html的`DOM`节点上，它接受一个字符串型参数,参数可以使用CSS选择器，一般都是ID选择器的形式，**指定挂载的**`DOM`元素。

### createApp()方法的基本参数讲解

当你明白了`createApp()`方法的作用，接下来可以更深层次的去了解它的参数。首先它接受一个对象形式的参数`{}`。这个对象就是告诉Vue应该如何展现我们最外层的组件。 根据我们在初始章节学习的内容，我们很容易写出下面的内容。

```js
<script>
    const app = Vue.createApp({
        data() {
            return {
                message: '陈叔叔'
            }
        },
        template: "<h2>{{message}}</h2>"
    })
    app.mount("#app")
</script>
```

写完后，可以到浏览器中预览一下结果。

