## 【vue组件05】组件中重要机制-单项数据流

组件传递参数时的单项数据流。它是Vue编写组件的一个重要机制，保证了组件的独立性。作为一个程序员，我们有必要知道、了解和精通单项数据流的概念和使用。

### 编写一个计数器

为了更好的说明什么是单项数据流，在文章开始前，我们需要用以前学的知识，编写一个计数器功能。

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

编写一个全局组件，全局组件接受一个参数`counter`，代码如下。

```vue
app.component("counter",{
    props:['counter'],
    template:`
        {{ counter }}<button @click="counter+=1">增加</button>
    `
})
```

编写好全局组件`Counter`后，就可以在父组件中使用了，因为Counter是传递到子组件里的，所以要在数据项`data`中进行声明。

```vue
    data() {
        return {
            counter: 0
        }
    },
    template: `
	        <h2>陈叔叔</h2>
            <counter :counter="counter" />
	    `
})
```

一切好像都很正常，但是当你在浏览器中预览的时候，你会发现点击按钮根本不起作用。这就是单向数据流机制限制的结果。

### 单向数据流概念

什么是单向数据流？官方的解释还是比较晦涩难懂的。

- 所有的prop都使得其父子prop之间形成了一个单向下行绑定：父级prop的更新会向下流动到子组件中，但是反过来则不行。

可以简单的说：**数据从父级组件传递给子组件，只能单向绑定。子组件内部不能直接修改从父组件传递过来的数据。**

这也就是为什么，我们上面写的程序不能使用的原因了。那如何修改这个程序，让其好用那，方法很简单，在组件内的数据项中声明一个变量，把父组件传递过来的变量赋值给内部变量，然后就可以随意修改了。

```vue
app.component('Counter', {
    props: ['counter'],
    data() {
        return {
            newCounter: this.counter
        }
    },
    template: `
        {{newCounter}}<button @click="this.newCounter+=1">增加</button>
    `
})
```

这样就可以进行修改了。当我们通过程序，更好的理解了什么是`单项数据流`后，我们再来总结一下。**单向数据流就是父组件可以向子组件传递数据，但是子组件不能修改数据。**

### 为什么要有单向数据流机制

单项数据流的最终目的，就是为了降低组件的耦合度和独立性。比如现在页面上同时调用了三个`<counter/>`组件，没有单项数据流的机制，很容易变成一个组件数值变化，其他组件的数值也跟着变化的现象。让页面组件的数据耦合在一起，没办法独立使用。

```vue
template: `
    <h2>陈叔叔</h2>
    <counter :counter="counter"/>
    <counter :counter="counter"/>
    <counter :counter="counter"/>
`
```

