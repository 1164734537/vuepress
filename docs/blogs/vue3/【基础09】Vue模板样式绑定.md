---
showSponsor: true
title: 【基础09】Vue模板样式绑定
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
---

## 【基础09】Vue模板样式绑定

Vue中的一些关于样式(style)的内容

### 准备干净的页面



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo14</title>
    <script src="https://unpkg.com/vue@next" ></script>
</head>
<body>
    <div id="app"></div>
</body>
<script>
    const app=Vue.createApp({ 

        template:`
            <h2>陈叔叔</h2>  
        ` 
    }) 
    const vm=app.mount("#app")

</script>

</html>
```

### 写两个最基本的样式并引入到模板

```css
<style>
    .red{color:red;}
    .green{color:green;}
    .background{ background-color: orange;}
</style>
```

引用样式,在Vue的模板中引用和普通的html的方法一样。直接写class加上类名就可以了。

```js
template:`
    <h2 class="red">陈叔叔</h2>  
`
```

这时候你可以考虑一个问题，如果你希望程序足够灵活，样式也是可以控制的，这样引入样式的方法就不行了。你需要先在Data中声明变量，然后在模板`template`中进行绑定。

声明data变量:

```js
data(){
    return {
        classString:'red',
    }
},
```

有了这个变量（或者叫做数据项）以后，就可以用bind的形式进行绑定。

```html
 <h2 v-bind:class="classString">陈叔叔</h2>
 <h2 :class="classString">陈叔叔</h2>
```

绑定同样使用`v-bind`，你也可以使用简写`:`。上面的两种形式都可以进行绑定。这时候你可以到浏览器中查看一下效果，如果一切正常，此时应该还是红色的。

此时你可以利用浏览器的控制台，输入对应的代码，直接控制样式了。

```js
vm.$data.classString='green'
```

### Vue中用对象和数组的形式控制样式

**对象的绑定方式**

比如现在用对象的形式进行绑定样式，好处是一次可以绑定多个样式。比如这样的代码。

```js
data(){
    return {
        classString:'red',
        classObject:{red:true,background:true}
    }
},
```

值为`true`代表绑定，值为`false`代表不绑定这个样式。

然后进行绑定

```html
template:`
    <h2 :class="classObject">陈叔叔</h2>  
`
```

这时候再到浏览器中查看效果，就会有两个样式被绑定了`red`和`background`。如果你这首把red改为false，那效果就是只有背景颜色，没有字体颜色了。

**数组的绑定方式**

再来看一下数组的绑定方式，数组也是可以绑定多个样式的。

代码如下:

```js
data(){
    return {
        classString:'red',
        classObject:{red:true,background:true},
        classArray:['green','background'],
    }
},
```

这时候再修改一下绑定值,页面样式就变成了绿字，橙色的底啦。

```html
template:`
    <h2 :class="classArray">陈叔叔</h2>  
`
```

你也可以在这种数组的数据项中，再嵌套对象的形式。

```js
classArray:['green','background',{red:true}],
```

如果看不到效果，可以在CSS样式中增加`!important`,当然你也可以在浏览器的控制台查看。

### 初步总结：

- 通过普通字符串进行绑定；

- 通过对象的方式进行绑定；

- 通过数组的方式进行绑定。

  

### Vue中子组件样式的绑定和行内样式如何编写

**子组件如何绑定样式**

新增一个子组件

```js
app.component('child',{
    template:`
        <div>child</div>
    `
})
```

有了子组件后，就可以在父组件的模板中进行使用了，使用就是直接写一个类似html的标签进去就可以。

```html
template:`
    <h2 :class="classArray">陈叔叔</h2>
    <child />
`
```

**如何区分父子组件**

在`vue.createApp( )`方法中用对象形式`{ }`配置的一般叫做父组件，而下面使用的其他组件，叫做子组件。**你也可以这样理解，主动调用的是父组件，被调用的是子组件**。

最简单的为子组件添加样式的方法，就是自己给子组件加上`class`。

```js
app.component('child',{
    template:`
        <div class="green">child</div>
    `
})
```

这时候子组件的字体颜色就变成了绿色。你还可以把class写在调用子组件的地方（也就是写在父组件里），例如下面的代码。

```js
template:`
    <h2 :class="classArray">陈叔叔</h2>
    <sonCom class='green' />
`
```

先去掉子组件里的class，在调用地方增加class样式。这时候效果也是一样的。

**子组件使用样式的坑**

这时候我们修改一下子组件，再写一个`<div>`进去，里边写上`uncle`的字样。这时候再来看结果。

```js
app.component('child',{
    template:`
        <div>child</div>
        <div>uncle</div>
    `
})
```

你会发现两个`<div>`的样式都不起作用了。那我们如何让它变成绿色那，其实只有再两个并列的`<div>`外层，加上一个包括性的标签就可以了。也就是说让子组件的最外层只有一个根元素。

```js
app.component('child',{
    template:`
        <div>
 			<div>child</div>
        	<div>uncle</div>
        </div>
    `
})
```

这样就又变成了绿色字体。还有一种用到动态绑定的方法，直接绑定属性中的class。

```js
app.component('child',{
    template:`
        <div :class="$attrs.class">child</div>
        <div>陈叔叔</div> 
    `
})
```

### 行内样式的编写

什么是行内样式?就是自己在模板的DOM元素上写CSS样式，比如下面的这样。

```js
<h2 style="color:orange;">陈叔叔</h2>
```

除了这种写法以外，Vue中也为我们扩展了一些内容，让行内样式的写法更直观和灵活。你可以直接在data中编写样式，比如在Data中这样写。

```js
data(){
    return{
        styleString:'color:orange;'
    }
},
```

然后用绑定行内样式的形式，在模板中进行绑定。

```js
template:`
    <h2 :style="styleString">陈叔叔</h2>
`
```

**你也可以用对象的形式在data中编写CSS样式。**比如写成下面的代码，然后再进行绑定。

```js
data(){
    return{
       //.....
        styleString:'color:orange;',
        styleObject:{
            color:'red',
            background:'yellow'
        }
    }
},
```

在写行内样式的使用，个人觉的对象的写法更加直观和简洁，所以建议小伙伴可以采用这种对象的形式来进行编写。

