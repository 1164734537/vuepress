## 【vue组件04】组件传值时的校验操作

### 基本代码准备

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

### 对类型的校验

有时候我们希望传递过来的属性是一个字符串，但很可能用户传递过来的就是一个数字，这时候我希望程序能给我一个提示，让我能做一些业务逻辑处理。这就涉及到了对参数类型的判断。

```vue
app.component('Son', {
        props: {
            name: String
        },
        template: `<div>{{name}} div </div>`
    })
```

这时候代码就有了校验功能，打开`控制台Console`就可以看到提示。这里需要注意的是，这种提示不会报错和阻断程序，只是会在控制台给出`warn警告信息`。

这时候把数据项中的`123`，修改为字符串时，程序就不再报错了。Vue支持的校验类型包括:String、Boolean、Array、Object、Function和Symbol。

### 必填校验和默认值设置

有些参数是必须要传递的，但有些参数就是可以不传的，当不传时。我们只要给系统一个默认值就可以了。所以有必要对这两个知识学习一下。

#### required必填项

如果要求组件使用时，必须传递参数，可以使用`required`来校验.

```vue
app.component('Son', {
    props: {
        name: {
          type: String,
          required: true
       }
    },
    template: `<div>{{name}} div </div>`
})
```

这时候的校验规则就是，name的值必须是字符串，并且不可以省略。这时候可以去掉父组件调用时传递的参数，在浏览器中打开控制台看一下警告信息。

#### default默认值

再来看一下默认值的写法，在原来写`required`的地方直接写`default`就可以了。比如写成下面的样子。

```jsx
app.component('Son', {
        props: {
            name: {
                type: String,
                default: '陈叔叔'
            }
        },
        template: `<div>{{name}} div </div>`
    })
```

这时候的意思就是在调用组件时，如果不传递参数，则默认值为`陈叔叔`。

### 精准校验-validator

如果上面这些校验都不能满足你的要求，还可以进行精准校验。比如现在要求传递的字符串中必须包括`陈叔叔`这几个字符，就可以用`validator`来进行校验。它是一个函数，并接受一个`value`值，这个value就是传递过来的值。

```vue
app.component('Son', {
    props: {
    	name:{
    		type:String,
    		validator:function(value){
    			console.log(value.search('陈叔叔'))
    			return value.search('陈叔叔') != -1
    		},
    		default:'uncle_chan'
    	}
    },
    template: `<div>{{ typeof name}} div </div>`
})
```

因为使用`search`来验证，返回来的是字符串出现的位置，没有找到时才显示`-1`。所以这里判定如果不为`-1`就是通过验证。

当没有通过验证时，就是在控制台给出警告。