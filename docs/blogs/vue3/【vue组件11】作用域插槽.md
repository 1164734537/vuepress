## 【vue组件11】作用域插槽

**作用域插槽主要解决的问题是，子组件中有插槽，也有变量，这些变量如何在父组件中进行使用。**

先来看这样一个需求：编写一个子组件，里边有iphone、华为和小米三个手机变量，然后在子组件中用循环的形式输出出来。

准备基本代码：

```vue
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo09</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.js"></script>
</head>

<body>
    <div id="app"></div>
</body>
<script>
    const app = Vue.createApp({
        template: ` 
        	<h2>欢迎光临</h2>
        `
    })

    const vm = app.mount("#app")
</script>
```

在使用作用域插槽前，我们先来完成这个基本需求

```vue
<script>
    const app = Vue.createApp({
        template: ` 
        	<h2>欢迎光临</h2>
        	<list/>
        `
    })
	app.component('List',{
			data(){
				return {
					list:['iphone','huawei','xiaomi']
				}
			},
	        template:`
	     		<div>
	     			<div v-for="item in list">{{ item }}</div>
	     		</div>
	        `
	    })

    const vm = app.mount("#app")
</script>
```

上面的代码，编写了一个子组件`list`，然后在list组件里，声明了一个list的数组数据项。数据项里有三个值`iphone`、`huawei`和`xiaomi`。在模板中试用`v-for`的形式，进行循环。

写完这段代码后，可以到浏览器里调试一下，看看可以正常运行吗？如果一切正常，应该在页面上显示出循环的值了。

### 作用域插槽讲解

目前子组件里循环使用的是`<div>`标签，现在要求这个标签是父组件调用时确定，也就是要使用插槽了。（需要说明，这种情况在你写组件时，经常遇到，所以你要足够的重视）。

我们刚开始的想法，可以是先改造子组件，增加`slot`插槽，增加插槽后的模板代码如下。

```vue
template: `
    <div>
        <slot v-for="item in list"  />    
    </div>
`
```

然后在父组件里进行调用，调用方法如下。

```vue
    const app = Vue.createApp({
        template: ` 
        	<h2>欢迎光临</h2>
        	<list><span></span></list>
        `
    })
```

这时候在浏览器中查看，打开控制台，可以看到DOM中，是有三个`<span>`标签的。说明`DOM`通过插槽的形式，传递过来了。那接下来的问题，就是父组件如何使用子组件中的变量。

父组件想使用子组件插槽中的值，可以使用`:`绑定的形式进行传递，比如写成`:item="item"`，具体的代码可以写成下面的样子。

```vue
	app.component('List',{
			data(){
				return {
					list:['iphone','huawei','xiaomi']
				}
			},
	        template:`
	     		<div>
	     			<slot v-for="item in list" :item="item" />
	     		</div>
	        `
	    })
```

写完后父组件中用`v-slot="xxx"`的形式接受，接收后就可以使用了。

```vue
    const app = Vue.createApp({
        template: ` 
        	<h2>欢迎光临</h2>
        	<list v-slot="props">
        		<span>{{ props.item }}</span>
        	</list>
        `
    })
```

这时候你会发现列表是可以正常显示的，也可以进行更换标签了，你可以试着把`<span>`标签换成`<div>`标签来尝试一下。

注意这里的`props`是子组件传递过来的数据都是对象，所以我们要加上`.item`才能使用。可以把代码修改一下。

```vue
<list v-slot="props">
    <div>{{props.item}}-{{props}}</div> 
</list>
```

### 作用域插槽简写写法

其实简化的方法也非常简单，只要使用解构的形式，这是ES6的一种写法。如果对这部分，不熟悉，可以看看ES6关于解构的语法知识。

```vue
const app = Vue.createApp({
    template: `  
        <h2>欢迎光临</h2>
        <list v-slot="{item}"> 
            <div>{{item}}</div> 
        </list>
        `
})
```

这种写法虽然简单，但是理解起来还是有些麻烦的。

也正是因为有了作用域插槽，子组件才可以传递自身的数据项让父组件进行使用。