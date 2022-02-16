## 【vue组件09】组件中插槽的默认值写法

### 准备基本骨架代码

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
        template: ` <h2>欢迎光临</h2>`
    })

    const vm = app.mount("#app")
</script>
```

编写一个全局组件

```vue
app.component('goods',{
        template:`
            <div>
                你选择了<slot></slot>。
            </div>
        `
    })
```

有了插槽后就可以在使用组件的时候直接传递值了

```vue
const app = Vue.createApp({
    template: ` 
        <h2>欢迎光临</h2>
        <goods><span style="color:red;">iphone</span></goods>
    `
})
```

### 为slot 增加默认值

现在来了一位新客人，第一次来，不知道什么比较好，那我们就需要给他一个默认值，比如默认值是“华为”。

默认值的关键语法就是在`<slot>`插槽中直接输入值就可以了。

```vue
app.component('goods',{
        template:`
            <div>
                你选择了<slot><span  style="color:green;">华为</span></slot>。
            </div>
        `
    })
```

现在这种编写方法，在有值传递过来的时候，会显示正常的值，没有值的时候就会显示默认值"华为"。

这就是插槽中默认值的使用