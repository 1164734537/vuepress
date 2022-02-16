## 【vue组件13】provide和inject多级组件传值

provide和inject，作用是进行多级组件传值

### 创建一个多级组件

```vue
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.js"></script>
</head>

<body>
    <div id="app"></div>
</body>
<script>
    const app = Vue.createApp({
        template: `<div>我有一套房子，我先传给我的儿子</div>`
    })
    const vm = app.mount("#app")
</script>
```

现在的需求是，要写一个子组件，然后子组件里调用另一个子组件（也可以想象成孙子组件），然后从最上层的父组件里传递值给子组件。

我们先来编写两个子组件的代码。

```vue
<script>
    const app = Vue.createApp({
        data(){
            return {house:'北京别墅一套'}
        },
        template: `<div>我有一套房子，我先传给我的儿子</div> `
    })

    app.component('child',{
        template:`
            <div>我是子组件，我要把房子再传给我儿子。</div>
        `
    })

    app.component('child-child',{
        template:`
            <div>我是孙子，等待接收房子</div>
        `
    })
    const vm = app.mount("#app")
</script>
```

基本结果和组件已经有了，下面我们看看这种情况如何传递。

### 常用传递方式

现在的需求就是一层层传递下去，我们可以使用`props`的形式进行接收，然后继续传递，代码可以可成这样。

```vue
<script>
    const app = Vue.createApp({
    	data(){
    		return {house:'广州一栋楼'}
    	},
        template: `
        	<div style="color:red">我有一套房子，我先传给我的儿子</div>
        	<child :house="house" />
        `
    })
    app.component('child',{
    	props:['house'],
    	template:`
    		<div style="color:blue">我是子组件，我要把房子再传给我儿子</div>
    		<div style="color:blue">儿子接收{{ house }}</div>
    		<child-child :house="house"  />
    	`
    })
    app.component('child-child',{
    	props:['house'],
    	template:`
    		<div style="color:green">我是孙子，等待接收房子</div>
    		<div style="color:green">孙子接收{{ house }}</div>
    	`
    })
    const vm = app.mount("#app")
</script>
```

这时候到浏览器中查看一下结果，可以发现结果是可以成功的。每次用props接收，然后再用绑定属性的方式传递给下一层。

但现在需求变化了，广州猎德还有一套200平方的房子，不想通过儿子的手，直接传递给孙子，那如何操作那？

### 多组件传值provide和inject

这时候就可以使用使用provide传递和inject接收了，先在数据项的下面声明一个`provide`。

```vue
    const app = Vue.createApp({
    	data(){
    		return {house:'广州一栋楼'}
    	},
    	provide:{
    		newHouse:'广州猎德200平方房子一套'
    	},
        template: `
        	<div style="color:red">我有一套房子，我先传给我的儿子</div>
        	<child :house="house" />
        `
    })
```

然后儿子组件不用作任何更改，直接在孙子组件里用`inject`接收就可以了。

```vue
app.component('child-child',{
    props:['house'],
    inject:['newHouse'],
    template:`
        <div>我是孙子，等待接收房子</div>
        <div>孙子接收{{house}},{{newHouse}}</div>
    `
})
```

写完后，可以打开浏览器中进行查看，发现孙子组件也是可以顺利接收到的。

我们案例的层级并不多，所以你感觉不是很强烈，如果这种层级关系达到5-6级，再使用props进行传递，那就会非常麻烦，而且会有大量的代码冗余。使用`provide`和`inject`可以解决这个问题。

