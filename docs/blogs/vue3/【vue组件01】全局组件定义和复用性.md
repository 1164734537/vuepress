## 【vue组件01】全局组件定义和复用性

### 了解组件概念

我们先来看一张Vue3官方给出的图，通过图片能清楚的了解到什么是Vue中组件的一些端倪。

![https://v3.cn.vuejs.org/images/components.png](https://v3.cn.vuejs.org/images/components.png)

图的左边是一个网页，网页分为了头部、左侧主体和右侧边栏。这时候你用组件的概念，就可以先把这个网页分为三个大的组件，分别是头部、左侧和右侧。然后再根据每个大组件里的内容和功能，作更加详细的组件划分。这样就可以把一个复杂的大页面，分解成一个个可以复用的小页面。

**总结：**

**Vue中的组件是页面中的一部分，通过层层拼装，最终形成了一个完整的组件。这也是目前前端最流行的开发方式。**

### Vue3中的根组件

打开`VSCode`代码编辑器，编写一段基本的Vue3结构

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

有了这段代码，在编写相应的Vue代码。用`createApp( )`创建Vue的实例，然后用`mount( )`方法挂载到`DOM`节点上。

```vue
<script>
    const app=Vue.createApp({ })
    const vm=app.mount("#app")
</script>
```

这时候的`Vue.createApp`实际是建立一个Vue的实例，也就是相当于刚才说的第一个`根组件`。你可以通过对象属性的形式（实际上就是方法接受一个对象实行的参数），来定义根组件的具体样式和方法。比如在根组件上定义一个模板，然后在页面输出`陈叔叔`。

```vue
const app=Vue.createApp({
    template:`<h2>陈叔叔</h2>`
})
```

写好后，到浏览器中进行预览，可以在页面上看到`陈叔叔`。

这时候我们希望组件再多一行字，比如加上`uncle`的文字。代码可以这样编写。

```vue
const app=Vue.createApp({
    template:`
        <h2>陈叔叔</h2>
        <div>uncle</div>
    `
})
```

### 全局组件的定义

现在页面上已经有两个部分组成，`<h2>陈叔叔</h2>`和`<div>uncle</div>`。那这时候你就可以把这两部分拆分成两个全局的字组件。代码如下：

```vue
app.component('my-title',{
    template:` <h2>陈叔叔</h2>`
})
app.component('my-content',{
    template:` <div>uncle</div>`
})
```

组件定义好后，可以直接在根组件上进行使用。

```vue
const app=Vue.createApp({
    template:`
        <my-title />
        <my-content />
    `
})
```

现在页面上元素，就被拆分了，一个根组件下面有两个子组件。这里我们并没有什么业务逻辑，所以看起来还没有太多的作用，但是如果一旦业务逻辑复杂，我们这样拆分，会降低开发难度。

### 组件的可复用性

现在要作的事情是定义一个新的`计数组件`-count，每次点击按钮，组件中的`count`变量自动加1.

```vue
app.component('count',{
    data(){
        return{
            count:0
        }
    },

    template:`<div>{{count}}<button @click="count++">增加1</button></div>`
})
```

写好组件以后，就可以在根组件中复用了，这里你可以加入多个`<count />`组件，比如说是三个。

```vue
const app=Vue.createApp({
    template:`
        <website />
        <describe />
        <count/>
        <count/>
        <count/>
    `
})
```

然后在浏览器中进行预览，你会发现`<count />`是互不干扰的，就是因为这个特性，Vue中的组件就具有了复用性。

全局组件的弊端

全局组件编写起来确实非常方便，当时全局组件就是你一旦定义了，就会占用系统资源。它是一直存在的，你在任何地方都可以使用这个全局组件。这势必会对性能产生影响，比如一个真实的项目，会有上千个组件，这些组件由不同人编写，如果全部是全局组件，那这个应用打开速度一定是极慢的，而且流畅度也会受到影响。

全局组件的概括：**只要定义了，处处可以使用，性能不高，但是使用起来简单。**

