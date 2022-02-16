---
showSponsor: true
title: 【基础12】v-for循环列表时的一些注意事项
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
  - v-for注意事项
---
## 【基础12】v-for循环列表时的一些注意事项

主要讲v-for中的三个注意点

### v-for循环数字

`v-for`是可以用来循环数字的，比如你要循环1-99的数字，可以直接写成下面的样子。

```js
<span v-for="count in 99">{{count}},</span>
```

这样就可以快速的循环出1-99的值在页面上。可以在浏览器中看一下这个效果。

### v-for中如何使用判断

现在的新需求有些变化，由于`李叔叔`的年龄比较大了，我们想刨除出去，只显示`陈叔叔`和`张叔叔`。这时候你很可能把代码写成这个样子。

```js
<ul>
    <li 
        v-for="(item,index) in listArray"
        :key="index+item"
        v-if="item != '李叔叔'"
    >
        [{{index}}]{{item}}
    </li>
</ul>
```

在浏览器中进行预览，你会发现`李叔叔`的循环项，并没有消失。这是为什么那？**因为v-for循环的优先级要高于`v-if`判断的优先级，所以判断失效。**

正确的写法应该是在`<li>`外层独立出一个标签，在`<li>`上做循环。比如写成下面的代码。

```html
<ul>
 	<div v-for="(item,index) in listArray" :key="index+item">
        <li v-if="item != '李叔叔'">
        	[{{ index }}]{{item}}
        </li>
    </div>
</ul>
```

这时候到浏览器中预览，`李叔叔项`如愿以偿的消失了。

### template标签的使用

上面的结果完美吗？当你打开浏览器的控制台，看Elements选项卡时，你会发现DOM结构是有问题的，明明循环出两项，却有3个`<div>`，而且这种外层套用`<div>`里边使用`<li>`的形式，不符合HTML语法的基本结构。

```html
<ul>
    <div>...</div>
    <div>...</div>
    <div>...</div>
</ul>
```

为了解决这个问题，Vue给我们提供了`<template>`模版标签，也就是一个空的占位符，目的就是解决模板中为完成业务逻辑，而使用的无用html标签的现象。

现在可以把上面的代码写成这样。

```html
<ul>
    <template
        v-for="(item,index) in listArray"
        :key="index+item"
    >
    <li v-if="item != '李叔叔'">
        [{{index}}]{{item}}
    </li>
    </template>
</ul>
```

这时候再到浏览器看一下结果，这样就符合我们的期待了。

```html
<ul>
    <!--v-if-->
    <li>...</li>
    <li>...</li>
</ul>
```

知道了对于列表循环的基本操作和一些小坑