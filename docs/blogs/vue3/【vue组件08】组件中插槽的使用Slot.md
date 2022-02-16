## 【vue组件08】组件中插槽的使用Slot

### 准备基本代码骨架

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
	    template: `
			<h2>欢迎光临</h2>
		`
	})

    const vm = app.mount("#app")
</script>

</html>
```

这是最基本的一个Vue3的代码，只有一个模板`template`。然后我们新建一个全局的子组件。

子组件叫做`商品`组件，里边只有一个最简单的模板。

```vue
	app.component('goods',{
		template:`
			<span>经过你的慎重考虑，最后购买了：</span>
			<span>xxx</span>
		`
	})
```

有了子组件后，在父组件中调用这个子组件。

```vue
    const app = Vue.createApp({
        template: ` 
        	<h2>欢迎光临</h2>
        	<goods />
        `
        
    })
```

这时候的`XXX`，当然可以通过属性传递和接受的方式获得，这种方法你已经掌握了

这次我们**用插槽的方式`slot`。**来进行活用

### 初识插槽

插槽的声明很简单，只要在子组件中加入`<slot></slot>`标签即可，然后在父组件中使用双标签进行调用。具体代码如下:

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
	    template: `
			<h2>欢迎光临</h2>
			<goods>iphone</goods>
		`
	})
	app.component('goods',{
		template:`
			<div>
			 <span>经过你的慎重考虑，最后购买了：</span>
			  <span>
			  	<slot></slot>
			  </span>
			</div>

		`
	})

	const vm = app.mount("#app")
</script>

</html>
```





这时候去浏览器可以看到，页面出现了我们想要的结果。你可以让页面更丰富，因为插槽支持任何的DOM元素，比如我们加入一个`<div>`然后让字体变成红色和50像素的字体大小。

```vue
const app = Vue.createApp({
    template: `
		<goods><div style="color:red;font-size:50px;">iphone</div></goods>
	`
})
```

比如现在调用两次`<goods>`组件，给与不同的样式也是可以的。

```vue
	const app = Vue.createApp({
	    template: `
			<goods><div style="color:red;font-size:50px;">iphone</div></goods>
			<goods><div style="color:blue;font-size:50px;">huawei</div></goods>
		`
	})
```

### 插槽中使用子组件

插槽可以强大到直接使用`子组件`，接下来就作一个在插槽中使用子组件的小例子。可以先声明一个最简单的子组件。这个子组件叫做`system`，也就是系统的意思，是为了展示我们手机的系统。

```vue
app.component('system',{
	template:`
		<div>
			兼容任何系统
		</div>
	`
})
```

有了组件后直接可以在父组件的插槽中进行使用，代码如下。

```vue
const app = Vue.createApp({
    template: `
		<h2>欢迎光临</h2>
		<goods>
			<div style="color:red;font-size:50px;">iphone</div>
			<system/>
		</goods>
		<goods>
			<div style="color:blue;font-size:50px;">huawei</div>
			<system/>
		</goods>
	`
})
```

浏览器中预览，可以看到确实插槽中是可以放置`子组件`的。

### 插槽中使用动态数据

插槽中也可以直接使用动态数据，也就是我们常说的数据项，比如定义一个数据项,然后在插槽中使用，直接就可以使用了。

```
const app = Vue.createApp({
    data() {
        return {
            phone: 'iphone'
        }
    },
    template: `
        <h2>欢迎光临</h2>
        <ji-shi > 
                <div style="color:red;font-size:50px;">
                    {{phone}},<system />
                </div>
        </ji-shi>
        <ji-shi > <div style="color:green;font-size:50px;">华为</div> </ji-shi>
    `
})
```

这时候需要注意的是一个变量作用域的问题，比如我们子组件里也有一个数据项`phone`，然后给他赋值为`小米`。

```vue
app.component('goods',{
	data(){
		return {
			phone: '小米'
		}
	},
	template:`
		<div>
		 <span>经过你的慎重考虑，最后购买了：</span>
		  <span>
		  	<slot>
		  </span>
		</div>

	`
})
```

这时候你会发现，浏览器中仍然显示的是`iphone`，这时候我们得出了一个结论，也是方便你记忆。

- 父模板里调用的数据属性，使用的都是父模板里的数据
- 子模板里调用的数据属性，使用的都是子模板里的数据