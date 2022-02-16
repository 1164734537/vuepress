## 【vue组件11】动态组件和状态保存

我们现在来虚拟一个需求，我们需要为手机店编写一个带图片的选择手机的功能，并且可以让顾客手动切换这些技手机。（这个需求其实有几种方法可以实现，但是这里我们为了学习，特意使用了动态组件来作，并不代表是最优解决方案。）

### 基本代码

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
            <h2>欢迎光临-陈叔叔手机店</h2> 
        `
    })

    const vm = app.mount("#app")
</script>
```

创建手机组件

现在你可以创建两个子组件，用来展示手机的照片

iphone

```
https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000
```

huawei

```
https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/p30/img/camera-intro/pic_familyP30pro_md.jpg
```

然后编写两个组件：

```vue
app.component('iphone', {
        template: `<img style="width:350px" src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-family-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617135051000" />`
    })
```

```vue
app.component('huawei', { 
		template: `<img style="width:200px" src="https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/p30/img/camera-intro/pic_familyP30pro_md.jpg" />` })
```

然后在父组件中直接使用这两个组件。

```vue
    const app = Vue.createApp({
        template: ` 
                <h2>欢迎光临-陈叔叔手机店</h2>
                <iphone/>
                <huawei/>
            `
    })
```

这时候我们可以到浏览器中查看一下结果，如果结果正常，说明我们的编写的没有错误。

### 原始切换效果

现在的需求是如果显示其中一个组件，另一个组件就不显示。这里我最先想到的是用`v-show`这种代码来实现。

我们先来定义一个数据项，用来控制显示那个组件，数据项叫做`showItem`，然后在两个子组件的位置增加v-show属性，控制最终的显示。

```vue
 const app = Vue.createApp({
        data(){
            return {
                showItem:'iphone'
            }
        },
        template: ` 
                <h2>欢迎光临-陈叔叔手机店</h2>
                <iphone v-show="showItem ==='iphone'" />
                <huaweiv-show="showItem ==='huawei'" />
            `
    })
```

这时候的`showItem`值是`iphone`，所以浏览器中应该只显示`iphone`的组件。

然后再编写一个按钮，用来切换两个组件，按钮需要绑定一个方法`handleClick`,方法中我使用了三元运算符来编写这部分内容。

```vue
<button @click="handleClick">切换手机</button>
```

编写到这个步骤，可以到浏览器中查看切换效果，如果没有错误，应该可以实现说的效果了。但是这种实现方法还是比较麻烦的，而且也不优雅，所以学一下更好的实现方法。

### 动态组件优化代码

使用`动态组件`的编程方式，就可以省略`v-show`部分的代码，也可以让代码看起来更加的优雅。

```vue
<component :is="showItem" />
```

有了上面这段简短的代码，就可以删除掉下面这两句代码了

```vue
<iphone v-show="showItem ==='iphone'" />
<huawei v-show="showItem === 'huawei'" />
```

那这决代码的意思是，使用一个动态组件，最终展示那个组件，由数据项`showItem`决定，它的值是`iphone`就显示 iphone 的照片，它的值是`huawei`，就显示 huawei 的照片。

是不是用起来非常简单和轻松。

### 动态组件中的状态保存

动态组件用起来非常方便，但是它有一点小问题。我们现在修改一下`iphone`组件，把照片变成一个`input`框。

```vue
app.component('iphone', {
    template: `
    <div>
        <input />
    </div>
    `
})
```

这时候你到浏览器中查看，并在输入框中输入文字，在切换组件后。你会发现`input`框中的文字是无法保存的。

为了保存`input`框中的文字，可以使用`<keep-alive>`标签，把动态组件包裹起来。

```vue
<keep-alive>
	<component :is="showItem" />
</keep-alive>
```

这时候相当启用了缓存，把input框的值存了起来。在使用动态组件时，经常配合`<keep-alive>`标签一起使用。

