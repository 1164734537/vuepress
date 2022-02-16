### 【vue组件07】组件中通过事件进行通信

子组件如何通过事件向父组件传递参数，打破单项数据流的限制。

学习目标：

- 子组件调用父组件事件的编写方法
- 子组件向父组件事件中传递参数的方法
- 子组件传递参数时，如何通过`emits`进行校验

### 编写计数器

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
            counter: 0
        }
    },
    template: `
	        <h2>陈叔叔</h2>
            <counter :counter="counter" />
	    `
})
app.component("counter",{
    props:['counter'],
    template:`
        {{ counter }}<button @click="counter+=1">增加</button>
    `
})
const vm = app.mount("#app")
</script>
</html>
```

上面的代码，当我们在浏览器中点击增加时，是不能增加`counter`的值的，这就是Vue`单向数据流`的限制。但是有时候，我们就是想在子组件里改变父组件传递过来的值，怎么办？

### 子组件调用父组件事件

这时候就需要子组件调用父组件的事件，从而改变父组件里的值。我们先在父组件里编写一个方法，叫做`handleAddCounter`。这个方法就作一件事，每执行一次，数据项里的`counter`加一。

```vue
methods: {
    handleAddCounter() {
        this.counter += 1
    }
},
```

父组件有了这个方法，就可以改变`couter`数据行的值了，有方法后，现在问题就变成了，如何在子组件中调用这个方法了。

这时候可以先在`子组件`的模板`template`中编写一个`click`事件。

```vue
{{counter}}<button @click="handleClick">增加数量</button>
```

子组件调用的并不是父组件中的方法，而是子组件中的方法。如果想调用父组件中的`handleAddConter`方法，这时候可以在子组件中新建一个方法`handleClick`，然后用`$emit`调用父组件的响应事件`add`。具体代码如下.

```vue
app.component("counter",{
    props:['counter'],
    data(){
        return{
            newCounter: this.counter
        }
    },
    methods:{
        handleClick(){
            this.$emit('add')
        }
    },
    template:`
        {{ counter }}<button @click="handleClick">增加</button>
    `
})
```

这时候的`add`是什么？`add`就是响应事件，在父组件的模板`template`中，添加一个`add`响应事件，然后响应事件再调用方法`handleAdCounter`。

```vue
template: `
            <h2>陈叔叔</h2>
            <counter :counter="counter" @add="handleAddCounter"/>  
        `
```

这时候可以到浏览器看一下结果，你会发现当点击增加按钮的时候，数据项中的`counter`值，已经可以增加了。只是在控制台会打印出警告。

```jsx
[Vue warn]: Extraneous non-emits event listeners (add) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option. 
  at <Counter counter=3 onAdd=fn<bound handleAddCounter> > 
  at <App>
```

警告的意思你调用的`add`方法，并没有用`emits`进行声明。

```vue
app.component('Counter', {
    props: ['counter'],
    emits: ['add'],  // 声明
    methods: {
        handleClick() {
            this.$emit('add')
        }
    },
```

声明后，控制台中的警告会消失。这也是Vue对`子组件`调用父组件时的一种约束，就是调用前需要声明，否则就会报出警告。

### 子组件向父组件传递参数

当我们不是每次想加1的时候，比如这个值是`子组件`决定的，比如是`2`吧。这时候子组件需要向父组件传值，也是可以做到的。你可以在子组件中这样编写。

```vue
methods: {
    handleClick() {
        this.$emit('add', 2)
    }
},
```

然后在父组件中接受这个参数`param` (这个参数的名字你可以随便起)，为了看的方便，在控制台进行打印。

```vue
methods: {
    handleAddCounter(param) {
        console.log(param)
        this.counter += param
    }
},
```

这时候子组件的参数就传递给了父组件，并且可以使用了。当然你还有更好的选择，就是把所有业务逻辑都放在子组件中，然后把结果传递给父组件。我平时更喜欢用这种方式，比如代码可以写成下面的样子。 业务逻辑写在子组件里

```vue
methods: {
    handleClick() {
        this.$emit('add', this.counter + 3)
    }
},
```

父组件直接接受结果就可以了

```vue
methods: {
    handleAddCounter(param) {
        console.log(param)
        this.counter = param
    }
},
```

### 对传递值的校验

在子组件向父组件传递值的时候，还可以开启校验功能。校验是通过`emits`这个选项来声明的。比如现在我们要求传递到add中的值，不大于20。如果大于20就进行警告。

```vue
emits: {
    add: (value) => {
        return value < 20 ? true : false
    }
},
```

我这里的业务逻辑很简，你完全可以根据你的业务逻辑来编写验证过程。

### 完整代码：

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
            counter: 0
        }
    },
    methods:{
        handleAddCounter(param){
            this.counter = param
        }
    },
    template: `
	        <h2>陈叔叔</h2>
            <counter @add="handleAddCounter" :counter="counter" />
	    `
})
app.component("counter",{
    props:['counter'],
    emits: {
        add:(value)=>{
            return value<20? true:false
        }
    }, 
    data(){
        return{
            newCounter: this.counter
        }
    },
    methods:{
        handleClick(){
            this.$emit('add',this.counter + 3)
        }
    },
    template:`
        {{ counter }}<button @click="handleClick">增加</button>
    `
})
const vm = app.mount("#app")
</script>
</html>
```

我这里的业务逻辑很简，你完全可以根据你的业务逻辑来编写验证过程。

