---
showSponsor: true
title: 【基础02】如何获取Vue的根组件vm
date: 2021-07-05
sidebar: 'auto'
categories:
  - vue3
tags:
  - vue3
  - vue3基础
---
## 【基础02】如何获取Vue的根组件vm

当你使用`creatApp()`方法创建了一个Vue应用时，如何能获取根组件那?其实你使用`mount()`方法时，就会返回根组件。下面的代码，声明一个变量来获取根组件，并打印出来。通过打印你可以看出根组件是一个`Proxy`形式的对象。

```js
const vm = app.mount("#app")
console.log(vm)
```

这里为什么我把根组件起名为`vm`那？我先按下不表，我们先来了解一下`Vue`的设计模式。

### mvvm设计模式讲解

Vue的编程设计模式应该叫做`mvvm`的设计模式。什么叫做`mvvm`哪？它首先是面向数据的编程，程序中定义了数据，然后定义了模板，`Vue`就可以把数据和模板自动进行关联。最后挂载到真实的`DOM`上，展示给用户。

:::tip

mvvm解释: 第一个`m`代表`model`数据，第一个`v`代表`view`视图，最后两个字幕`vm`代表`viewModel`视图数据连接层。

:::

这个解释还不太明白，我们可以看一下

```js
<script>
    const app = Vue.createApp({
        data() {
            return {
                message: '陈叔叔'   //1.在这里定义了数据，也就是`model`数据
            }
        },
        template: "<h2>{{message}}</h2>" //2.在这里定义了模板，也就是`view`，
        //定义后的自动关联，就叫做`vm`，viewModel数据视图连接层。
    })
    app.mount("#app")
</script>
```

`model`数据，是我们自己定义的，`view`模板也是我们自己定义的，但是`vm`是Vue自动给我们关联的。

当我们明白了什么是`mvvm`后，你就知道为什么我们给根组件起名`vm`了。

当我们获取了`vm`根节点后，其实就可以操作里边的数据了。比如在控制台中输入下面的代码：

```js
vm.$data.message ='陈叔叔来了'
```

这个时候你会发现网页界面也跟着发生了变化，变成了 陈叔叔来了



