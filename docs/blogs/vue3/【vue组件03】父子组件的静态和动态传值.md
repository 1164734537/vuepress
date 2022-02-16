## 【vue组件03】父子组件的静态和动态传值

### 基础代码准备

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
    <div id="app"></div>
</body>
<script>
    const app = Vue.createApp({
        template:`<h2>陈叔叔</h2>`
    })

    const vm= app.mount("#app")
</script>
</html>
```

有了最基础的代码，我们再来声明一个全局组件`Son`。

```vue
app.component('Son',{
    template:`<div>Son div </div>`
})
```

因为这个组件是全局的，所以定义好之后就可以直接使用了。（不用在注册声明了）

```vue
const app = Vue.createApp({
    template:`
        <h2>陈叔叔</h2>
        <Son />
    `
})
```

使用后可以到浏览器中查看效果，如果正常，此时已经形成了父子组件关系。下面就可以从父组件向子组件传值了。

### 父组件向子组件传值（静态传值）

子组件里的`Son div`是写死的，如果想动态的从父组件传递，可以使用属性的方式，然后子组件使用props进行接收。

比如我们在调用子组件的地方，通过属性`name`传递一个`小陈`的文字进去。

```vue
	const app = Vue.createApp({
	    template:`
	        <h2>陈叔叔</h2>
	        <Son name="小陈" />
	    `
	})
```

传递后用`props`在子组件中进行接受，然后用插值表达式（双花括号`{{name}}`）的形式进行打印出来。

```vue
app.component('Son',{
    props:['name'],
    template:`<div>{{name}} div </div>`
})
```

这样就进行了参数的接收和显示。

### 动态数据作为参数

上面代码传递的参数是写死的，不能进行业务逻辑的编写，也就是我们常说的静态参数。如果想让代码更加的灵活，这里可以使用动态参数的传递。动态参数传递首先要把传递参数放到Vue的**数据项**里，也就是`data`属性里。

例如在`data`中声明一个name属性，然后赋值为`小小陈`。这时候需要在`template`中绑定这个name属性。这样你的值就不是静态的了，而是动态值。

```vue
const app = Vue.createApp({
	data(){
		return {
			name:'小小陈'
		}
	},
    template:`
        <h2>陈叔叔</h2>
        <Son :name="name" />
    `
})
```

**注意：`v-bind:name`通过简写的方式，写成`:name`。**

**静态参数这里还有一个小坑需要说明一下，就是静态传递的只能是字符串类型`String`，而动态传参的就可以是多种类型了，甚至是一个函数(方法).**

传递参数的例子，在下面会详细讲解，这里先来看传递数字的例子

举例说明，比如我们现在改回静态传参，而传递的内容是数字`123`,但在模板中使用`typeof`查看属性时，仍然是字符串（String）。

```vue
    template:`
        <h2>陈叔叔</h2>
        <Son name="123" />
    `
```

在子组件用`typeof`查看类型，会发现仍然是`string`类型.

```vue
app.component('Son',{
    props:['name'],
    template:`<div>{{ typeof name}} div </div>`
})
```

但是改为动态传参，就变成了数字类型。

```vue
const app = Vue.createApp({
    data() {
        return {
            name: 123
        }
    },
    template: `
	        <h2>陈叔叔</h2>
	        <Son :name="name" />
	    `
})
```

### 参数为函数时的用法

当使用动态传参时，参数几乎可以是任何类型，甚至是一个函数。下面我就举一个传递函数的例子，让你进一步的理解动态参数的作用。

需求是这样的，我们编写了一个`MyLongTitle`的全局子组件，然后点击时，会说要够长哦，然后我们传递函数的形式去验证。

```vue
app.component('MyLongTitle',{
	props:['long'],
	methods:{
		handleClick(){
			alert('标题别太短')
			this.long()
		}
	},
	template:`<div @click="handleClick">长长长长标题</div>`
})
```

在父组件调用的时候，`long`是一个定义在data中的函数,然后用动态参数的形式进行调用。

```vue
const app = Vue.createApp({
    data() {
        return {
            name: 123,
            long:()=>{
            	alert('很长的标题')
            }
        }
    },
    template: `
	        <h2>陈叔叔</h2>
	        <Son :name="name" />
	        <MyLongTitle :long="long" />
	    `
})
```

### 代码总结：

```vue
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
    <div id="app"></div>
</body>
<script>
const app = Vue.createApp({
    data() {
        return {
            name: 123,
            long:()=>{
            	alert('很长的标题')
            }
        }
    },
    template: `
	        <h2>陈叔叔</h2>
	        <Son :name="name" />
	        <MyLongTitle :long="long" />
	    `
})
app.component('Son', {
    props: ['name'],
    template: `<div>{{ typeof name}} div </div>`
})
app.component('MyLongTitle',{
	props:['long'],
	methods:{
		handleClick(){
			alert('标题别太短')
			this.long()
		}
	},
	template:`<div @click="handleClick">长长长长标题</div>`
})
const vm = app.mount("#app")
</script>

</html>
```

