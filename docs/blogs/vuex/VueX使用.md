VueX使用



安装依赖

```
npm install vuex --save
```

导入vuex包

```
import vuex from 'vuex'
vue.use(vuex)
```

创建store 对象（实例化）

```
const store = new Vuex.Store({
	//state 中存放的就是全局共享的数据
	state:{ count: 0 }
})
```

将实例化的store 对象 挂载到vue 实例中

```
new Vue({
	el:'#app',
	render:h=>h(app),
	router,
	//将创建的共享数据对象，挂载到vue实例中，
	//所有的组件，就可以直接从store中获取全局的数据了
	store
})
```

一般创建项目后：

在文件夹 src / store.js

store.js 基本代码：

```
import Vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)

export default new Vuex.store({
	state:{
	
	},
	mutations:{
	
	},
	actions:{
	
	}
})
```

在mian.js 中引入 store.js

把store 挂载到全局vue实例即可





核心概念：

### State

state 提供唯一的公共数据源，所有共享的数据都要统一放到Store的state中进行存储.

```
//创建store数据源，提供唯一公共数据
const store = new Vuex.Store({
	state:{ count: 0 } //定义全局数据
})

```

#### 组件访问state中数据的第一种方式：

```
this.$store.state.全局数据名称
// 如 this.$store.state.count  (标准写法)
// 在模板{{}}中渲染可以省略 this =》 $store.state.count

```

#### 组件访问state中数据的第二种方式：

```
//1.从 vuex 中按需导入 mapState 函数
import { mapState } from "vuex"

```

通过刚才导入的mapState函数，将当前组件需要的全局数据，映射为当前组件的computed 计算属性：

```
//2.将全局数据，映射为当前组件的计算属性
computed:{
	...mapState({'count'})
}
```

之后需要在当前页面使用这个 count，就相当于在使用一个计算属性一样，

即：当前的count 就是我的计算属性。我可以按照计算属性的特性来使用它

显示到页面上：

```
<h3>当前的count值为：{{ count }}</h3>
```

 

Mutation

用于变更Store中的数据

1.只能通过mutation变更store数据，不可以直接操作store中的数据

2.通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有的数据变化

```
//定义Mutation
const store = new Vuex.store({
	state:{
		count: 0
	},
	mutations:{
		add(state){
			//变更状态
			state.count++
		}
	}

})
```

触发mutation

```
methods:{
	handle(){
	 //触发mutations的第一种方式
	 this.$store.commit('add')
	}
}
```

可在触发时传递参数：

```
//定义Mutation
const store = new Vuex.store({
	state:{
		count: 0
	},
	mutations:{
		addN(state，step){
			//变更状态
			state.count += step
		}
	}

})
```

```
methods:{
	handle2(){
	 //触发mutations的第一种方式
	 this.$store.commit('addN',3)
	}
}
```

mutation 触发的第二种方式

this.$store.commit()是触发mutations的第一种方式，触发mutations的第二种方式：

```
1.从vuex 中按需导入 mapMutations 函数
import { mapMutations } from 'vuex'
```

通过刚才导入的mapMutations函数，将需要的mutations函数，映射为当前组件的methods方法：

```
methods:{
	...mapMutations({['add','addN']})
}
```

vuex的核心概念 Action

Action 用于处理异步任务

如果通过异步操作变更数据，必须通过action，而不是使用，mutation，但是在action中还是要通过触发mutation的方式间接变更数据（套娃）

```
//定义action
const store = new Vuex.store({
	//...省略其他代码
	mutations:{
		add(state){
			state.count++
		}
	},
	actions:{
		addAsync(context) {
			setTimeout(()=>{
				context.commit('add')
			},1000)
		}
	}
})
```

触发action

```
methods:{
	handle(){
		//触发actions的第一种方式
		this.$store.dispatch('addAsync ')
	}
}
```

触发actions异步任务时携带参数：

```
//定义action
const store = new Vuex.store({
	//...省略其他代码
	mutations:{
		addN(state,STEP){
			state.count += step;
		}
	},
	actions:{
		addNAsync(context,step) {
			setTimeout(()=>{
				context.commit('addN',step)
			},1000)
		}
	}
})
```

触发action

```
methods:{
	handle(){
		//在调用dispatch函数
		//在actions时携带参数
		this.$store.dispatch('addNAsync',5)
	}
}
```

#### 触发actions的第二种方式：

this.$store.dispatch()是触发actions的第一种方式，触发actions的第二种方式：

```
//1.从vuex中按需导入mapActions函数
import { mapActions } from 'vuex'
```

通过刚才导入的mapActions函数，将需要的actions函数，映射为当前组件的methods方法：

```
//2.将指定的actions函数，映射为当前组件的methods函数
methods:{
	...mapActions(['addasync','addNAsync'])
}
```

### Getter

getter用于对Store中的数据进行加工处理形成新的数据

​	1.Getter可以对Store中已有的数据加工处理之后形成的数据，类似Vue的计算属性

​	2.Store中数据发生变化，Getter的数据也会跟着变化

```
mutations:{
},
actions:{
},
getters:{
	showNum(state){
		return '当前最新的数量是['+ state.count +']'； 
	}
}
```

使用getters的第一种方式：

```
this.$store.getters.名称
```

使用getters的第二种方式：

```
import { mapGetters } from 'vuex'

computed: {
	...mapGetters(['showNum'])
}
```

