## 【vue组件02】局部组件

和全局组件相对应的就是局部组件，你可以把局部组件看成一个变量，然后在使用的地方注册这个组件，才可以使用。局部组件的最大好处就是只有在使用的时候，才会耗费系统资源，不像全局组件一样，一直都存在。

这段话可能不能很好的理解，下面通过代码，来讲解一下什么是局部组件

### 基本骨架代码准备

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/vue@next" ></script>
</head>

<body>
    <div id="app"></div>
</body>
<script>
    const app = Vue.createApp({
        template: `<h2>陈叔叔</h2>`
    })
    const vm = app.mount("#app")
</script>
</html>
```

这时候可以打开浏览器看一下是否可以显示出正常内容。如果可以正常显示，说明一切正常。接下来就可以编写一个局部组件了。

### 创建局部组件

注册局部组件，其实你可以理解成就是声明一个变量，这个变量是一个对象，所以最外层我们使用大括号（花括号），然后里边和使用`Vue.CreateApp( )`时传递的参数是一样的。

```vue
const counter = {
    data() {
        return {
            count: 0
        }
    },
    template: `<div>{{count}}<button @click="count++">增加1</button></div>`
}
```

注册完组件后，我们还不能直接使用，如果直接使用会报错。这时候要作的是在`vue.CreateApp（ ）`方法里进行注册。

### 注册局部组件

注册局部组件的方法很简单，直接用`components`属性来声明就可以了。

```vue
const app = Vue.createApp({
    components: { counter },
    template: `
        <h2>陈叔叔</h2>
        <counter />
    `
})
```

但是这只是简写方法，正确的写法应该是`components: { counter:counter },` ，其实就是给组件起个名字，你甚至可以叫做`任意你想要的名字`。

```vue
const app = Vue.createApp({
        components: { count: counter },
        template: `
        <h2>陈叔叔</h2>
        <count />
```

注册好后，你就可以直接在模板中使用了。需要注意的是，局部变量也是拥有独立性的，所以可以进行复用。

局部组件的编写有一些不成文的潜规则，下面介绍一下。

### 局部组件使用大驼峰命名法

有时候我们的组件名字会比较长，比如写一个`myLongTitle`组件。

```vue
const MyLongTitle = {
        template: `<h2>我是一个长标题</h2>`
    }
```

现在变量的名字有大小写，这时候在注册组件时，要使用这种形式（用`-`切割单词）

```vue
const app = Vue.createApp({
    components: { 
        count: counter, 
        'my-long-title': MyLongTitle
    },
    template: `
    <h2>陈叔叔</h2>
    <count />
	<my-long-title />
`
```

产生这种问题是因为一个矛盾点，就是变量中不能使用`-`,而组件调用确实可以的。所以为了区分组件，在定义局部组件的时候，潜规则是首写字母进行大写，然后使用驼峰命名法。

```vue
const MyLongTitle = {
	template:`<h2>我是长标题</h2>`
}
```

### 代码汇总：

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
<script>
const counter = {
    data() {
        return {
            count: 0
        }
    },
    template: `<div>{{count}}<button @click="count++">增加1</button></div>`
}
const MyLongTitle = {
    template: `<h2>我是一个长标题</h2>`
}
const app = Vue.createApp({
	components:{
		'count':counter,
		'my-long-title': MyLongTitle
	},
    template: `
    	<h2>陈叔叔</h2>
    	<count />
    	<my-long-title />
    `
})
const vm = app.mount("#app")
</script>

</html>
```

