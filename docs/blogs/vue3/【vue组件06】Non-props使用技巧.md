## 【vue组件06】Non-props使用技巧

什么是`Non-props`属性？

其实就是子组件没有接受父组件传递过来的参数，而子组件完全不变的复制了属性到自己的标签上，就叫做`Non-props`属性。

代码讲解：

### 基础页面和子组件准备

为了展示`Non-props`属性的风采，我们需要编写一下代码

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

        }
    },
    template: `
	        <h2>陈叔叔</h2>
	    `
})
const vm = app.mount("#app")
</script>
</html>
```

然后我们再编写一个Hello的全局组件，代码如下。

```vue
app.component('hello',{
	template:`<h3>hello world</h3>`
})
```

写好子组件后，在父组件中直接使用即可。

```vue
const app=Vue.createApp({
	template:`
		<h2>陈叔叔</h2>
		<hello />
	`
})
```

### 初始化Non-props属性

上面的代码，我们并没有在子组件里接受任何传递过来的参数，就根本没有写`props`,但这时候在调用的时候，是仍然可以传值的。

```vue
const app=Vue.createApp({
	template:`
		<h2>陈叔叔</h2>
		<hello msg="uncle" />
	`
})
```

这时候你打开浏览器中的控制台，查看`Elements`标签，可以看到此时的`<h3>`标签上已经由了`msg=uncle`这样的属性，也就是父组件直接把属性移植给了子属性。

```vue
<h3 msg="uncle">Hello World</h3>
```

如果要消除 这种移植，或者是复制，可以在子组件里接受这个属性，但并不使用他。

```vue
app.component('Hello', {
     props: ['msg'],
     template: `<h3>Hello World</h3>`
 })
```

这时候在打开浏览器的`Elements`标签查看，就没有多余的属性了。

两种方式理解后，我们再来说什么是`Non-prop`属性，它就是父组件向子组件传递参数的时候，子组件不写任何的接受方法。这个时候父组件就会直接把属性完全复制给子组件，子组件也是可以得到属性值的。

最常见的使用案例就是直接在标签上写CSS样式。

```vue
const app = Vue.createApp({
    template: `
        <h2>陈叔叔</h2>
        <hello style="color:red;" />
    `
})
```

这时候子组件会直接得到这个属性，也就把字体变成了红色。

### inheritAttrs属性

有些时候我们就是不想接受参数，也不想让`Non-props`属性起作用，这时候可以在子组件上使用`inheritAttrs`属性来解决这个问题。

```vue
app.component('Hello', {
    inheritAttrs: false,
    template: `<h3>Hello World</h3>`
})
```

这时候style标签就不会再被复制到子组件上了，组件上的`Hello World`也不会变成红色了。

### Non-Prop多节点失效解决方法

刚才说了，组件在没有接受参数时，会把属性自动复制到组件的根节点上，如果组件不是一个根节点，比如写成下面的样子。

```vue
app.component('Hello', {
    template: `
        <h3>Hello World</h3>
        <h3>Hello World</h3>
        <h3>Hello World</h3>
    `
})
```

这时候复制就会失效。你当然可以给他们增加一个根节点，但是在不增加根节点的条件下，也是有办法解决的。比如现在我们想让第一个组件中的`<h3>`标签复制父组件传递过来的属性，就可以写成下面的样子。

```vue
app.component('Hello', {
    template: `
    <h3 v-bind="$attrs">Hello World</h3>
    <h3>Hello World</h3>
    <h3>Hello World</h3>
`
})
```

注意，测试的`$attrs`不是单指某一个属性，而是指全部属性。当然这里只有一个属性，所以只复制了一个，比如你再写一个属性，它也是可以复制过来的。

```vue
const app = Vue.createApp({
    template: `
        <h2>陈叔叔</h2>
        <hello style="color:red;" msg="uncle" />
    `
})
```

这时候你打开浏览器，会看到两个属性都复制到了第一个`<h3>`标签上。

```vue
<h3 msg="uncle" style="color: red;">Hello World</h3>
```

这点需要注意一下，`v-bind="$attrs"`的意思是把父组件传递的所以参数属性都复制到子组件当中。

如果你想只复制一个属性，比如现在我们只复制一个属性`style`，就这个这么写。

```jsx
app.component('Hello', {
    template: `
        <h3 v-bind="$attrs">Hello World</h3>
        <h3 v-bind:style="$attrs.style">Hello World</h3>
        <h3>Hello World</h3>
    `
})
```

这时候第二个`<h3>`标签就只复制了`style`属性。当然你也可以简写，去掉`v-bind`，而是用`:`代表。

### 在业务逻辑中使用Non-props属性

刚才讲的都是在标签上使用`Non-props`属性，如果你想在业务逻辑中使用`Non-props`属性也是可以的。比如在生命周期中使用。

```jsx
app.component('Hello', {
    mounted() {
        console.log(this.$attrs.msg)
    },
    template: `
    <h3 v-bind="$attrs">Hello World</h3>
    <h3 v-bind:style="$attrs.style">Hello World</h3>
    <h3>Hello World</h3>
    `
})
```

后到浏览器中的控制台进行查看，就可以看到打印出了`uncle`字样。其实`this.$attrs`是Vue的一个常用属性，我们需要善于利用。

