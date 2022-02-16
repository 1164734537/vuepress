## 【vue组件10】具名插槽的使用

### 基本代码：

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
        template: ` <h2>欢迎光临陈叔叔手机店</h2>`
    })

    const vm = app.mount("#app")
</script>
```

先来看一个需求，就是如果你去手机店，需要经历三个过程：进店、选择机、买单。

这是一个过程，是有先后顺序的，包括在页面上的显示也是要有顺序的。于是我们写了一个组件。组件代码如下。

```vue
app.component('shop',{
        template:`
            <div>
                 <div>1.欢迎挑选手机。</div>
                 <div>2.你选择了华为专区服务</div>
                 <div>3.你购买了华为鸿蒙系统保时捷版</div>
            </div>
        `
    })

```

程序编写的需求是这样的，选择谁为你服务不变，也就是第二个div中的内容不变。但是第一句和第三句要能在父组件里使用插槽的方法进行定义。你这时会发现程序有问题了，要把`<slot>`放在哪里？好像放在什么地方都不太合适，我们索性放两个`<slot>`，一个放在上面，一个放在下面，测试一下。

```vue
app.component('shop',{
        template:`
            <div>
                 <slot></slot>
                 <div>2.你选择了华为专区服务</div>
                 <slot></slot>
            </div>
        `
    })
```

然后在父组件调用的时候传递对应的值，比如把代码写成下面的样子。

```
    const app = Vue.createApp({
        template: ` 
        <h2>欢迎光临</h2>
        <shop>
        	<div>1.欢迎挑选手机。</div>
        	<div>3.你购买了华为鸿蒙系统保时捷版</div>
        </shop>
        `
    })
```

这时候你打开浏览器，会发现插槽的位置出现了两次重复的内容。也表示我们第一次的尝试失败了。

其实Vue中已经提供了具名插槽的使用方法，就是给`<slot>`标签加上一个name属性，你可以把子组件写成下面的样子。

```vue
app.component('shop',{
        template:`
            <div>
                 <slot name="one"></slot>
                 <div>2.你选择了华为专区</div>
                 <slot name="two"></slot>
            </div>
        `
    })
```

然后父组件可以用下面的方式进行调用。

```vue
    const app = Vue.createApp({
        template: ` 
        	<h2>欢迎光临</h2>
        	<shop>
		        <template v-slot:one>
					<div>1.欢迎挑选手机。</div>
		        </template>
		        <template v-slot:two>
					<div>3.你购买了华为鸿蒙系统保时捷版</div>
		        </template>
        	</shop>
        `
    })
```

到现在就可以在一个组件里，分别定义两个插槽了。

在实际开发中使用的还是比较多的，能形成良好的模块机制。

### 具名插槽简写

在父模板中确定插槽位置时，使用了`v-slot:one`这种方法，其实这个语法可以简写成`#one`。这时候的代码就变成了下面的样子。

```vue
    const app = Vue.createApp({
        template: ` 
        	<h2>欢迎光临</h2>
        	<shop>
		        <template #one>
					<div>1.欢迎挑选手机。</div>
		        </template>
		        <template #two>
					<div>3.你购买了华为鸿蒙系统保时捷版</div>
		        </template>
        	</shop>
        `
    })
```

修改后，可以打开浏览器，进行预览，发现也可以出现正确的结果。