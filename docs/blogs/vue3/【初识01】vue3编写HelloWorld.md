---
showSponsor: true
title: 【初识01】vue3-HelloWorld
date: 2021-07-04
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - 初识vue3
---
## 【初识01】vue3编写HelloWorld

::: tip

###  必备知识

1. HTML: 超文本标记语言，用来写网页的基本结构。
2. CSS : 层叠样式表，用来让你的页面更加生动和好看。
3. JavaScript : 简称"JS",解释性或即时编译型的高级编程语言。

:::

### 骨架准备

准备一个html 骨架

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

### 引入源码

Vue官方提供直接引入的CDN服务地址，只要用`<script>`标签，就可以直接引入`Vue3`，并且使用它

```javascript
<script src="https://unpkg.com/vue@next"></script>
```

### 编写html

```html
<div id="app"></div>
```

### 编写script

```html
<script>
    Vue.createApp({
        template: '<div>Hello World</div>'
    }).mount("#app")
</script>
```

### 完整代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="app"></div>
</body>
<script>
    Vue.createApp({
        template: '<div>Hello World</div>'
    }).mount("#app")
</script>
</html>
```

直接打开`index.html`就会显示在浏览器的网页上,如果能在页面上出现`Hello World`这文字，就完成了。

### script代码解释

```javascript
Vue.createApp({   //创建一个Vue实例，简单理解就说，我要使用Vue了
    template: '<div>Hello World</div>'   // template是模板的意思，就是在JS里写html代码
}).mount("#app")   //这个模板需要放一个位置，也就是说挂载，挂载到`id=app`的DOM上
```

