基本使用：

```
// 引入 路由
import { createRouter,createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Login from '../components/Login.vue'
// 定义路由
const routes = [
    {
        name:'home',
        path:'/',
        component:Home,
        redirect: 'welcome',
        children:[
            {
                name:'welcome',
                path:'/welcome',
                component:Welcome
            },
            {
                name:'login',
                path:'/login',
                component:Login  
            }
        ]
    }
]
//实例路由
const router = createRouter({
    history:createWebHistory(),  //定义路由为 history
    routes
})
//导出路由
export default router
```

### vue3.0 history 和 hash 切换

## history: 引入-createWebHistory

```
import { createRouter, createWebHistory} from 'vue-router';
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
```

## hash: 引入-createWebHashHistory 

```typescript
import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
```

### vue2:history 和 hash 切换

## history:

```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

## hash:

```
const router = new VueRouter({
  mode: 'hash',  //或者把这句话注释，默认就是hash
  routes: [...]
})
```



路由跳转的三种方式：

router-link

```
<router-link to="/login">去登录</router-link>
```

传统跳转

```
<template>
	<el-button @click="goHome">回首页</el-button>
</template>

<script>
export default{
	name:'login',
  methods:{
    goHome(){
      this.$router.push('/welcome')
    }
  }
}
</script>
```

vue3

Composition API跳转

```
<script setup>
import { useRouter } from 'vue-router'
let router = useRouter()
const goHome = ()=>{
  router.push('/welcome')
}
</script>
```

