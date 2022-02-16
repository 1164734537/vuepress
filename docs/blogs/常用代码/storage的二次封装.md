storage的二次封装，配合环境变量使用

```
 /**
  * Storage 二次封装
  *
  * */
 import config from './../config'
 export default {
     getStroage(){
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
     },
     setItem(key,val){
        let stroage =  this.getStroage()
        stroage[key] = val;
        window.localStorage.setItem(config.namespace,JSON.stringify(stroage))
     },
     getItem(key){
         return this.getStroage()[key]
     },
     clearItem(key){
        let stroage =  this.getStroage()
        delete stroage[key]
        window.localStorage.setItem(config.namespace,JSON.stringify(stroage))
     },
     clearAll(){
        window.localStorage.clear()
     }

 }
```

