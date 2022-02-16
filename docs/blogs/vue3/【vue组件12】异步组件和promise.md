## 【vue组件12】异步组件和promise

Vue中的异步组件，弄明白什么是异步组件，其实是有前置知识的，就是你需要知道什么是同步，什么又是异步。而且你还会要使用`Promise`,如果你Promise用的不是很熟练，建议你先去复习一下JavaScript的基础知识，然后再进行学习。

### 编写基本代码和同步组件

```vue
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo11</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.0.2/vue.global.js"></script>
</head>

<body>
    <div id="app"></div>
</body>
<script>
    const app = Vue.createApp({
        template: ` 

        `
    })

    const vm = app.mount("#app")
</script>
```

然后编写一个同步组件（其实以前学的全部都是同步组件），并在父组件里使用它。

```vue
const app = Vue.createApp({
    template: `  <div><tongbu /></div>`
})
app.component('tongbu',{
    template:`<div>陈叔叔</div>`
})

const vm = app.mount("#app")
```

这时候就是一个同步组件，因为调用后，代码直接就会被执行。那我们了解同步组件后，我们再了解一下异步组件。

### vue3中的异步组件

异步组件就是在调用组件时，这个组件并不立即渲染，而是要等带一些业务逻辑完成后，才会进行执行组件内的逻辑和渲染到页面上。我们先写一个异步组件，感受一下。

```vue
app.component('async-component',Vue.defineAsyncComponent(()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                template:`<div>这是一个异步组件</div>`
            })
        },3000)
    })

}))
```

这段代码中，新建了一个组件叫做`async-component`，然后用`defineAsyncComponent()`声明这是一个异步组件，在组件内部我们用`Promise`来完成逻辑。逻辑非常简单，用`setTimeout`控制3秒后渲染模板`template`，展示内容。也就是说3秒后，组件才知道最终展示的内容是什么。这就是一个典型的异步组件。

异步组件经常在去后台请求数据的时候进行使用，也可以把一个大项目拆分成很多小的异步组件，然后根据需要，异步加载这些小项目。

如果你还不能理解，不要灰心。因为前置知识是你会使用Promise，你可以先去学习一下Promise的知识，然后再可以轻松很多。

