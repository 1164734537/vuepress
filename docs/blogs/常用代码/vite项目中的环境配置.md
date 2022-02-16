src目录下，找到/新建config文件夹并建立 index.js

```
/** 
 *环境配置封装
**/ 
// 获取环境变量
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev:{
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/bf31a37287e7b3815e8da1b5b7324c89/api'
    },
    test:{
        baseApi:'//test.futurefe.com/api',
        mockApi:'https://www.fastmock.site/mock/bf31a37287e7b3815e8da1b5b7324c89/api'
    },
    prod:{
        baseApi:'//futurefe.com/api',
        mockApi:'https://www.fastmock.site/mock/bf31a37287e7b3815e8da1b5b7324c89/api'
    }
}
export default {
    env,
    mock:true,
    namespace:"manager",
    ...EnvConfig[env]
}
```

### 在项目根目录下(与package.json同级)新建三个".env"文件

![image-20211105160039789](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20211105160039789.png)

并在package.json 里配置好

![image-20211105160117816](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20211105160117816.png)

就可以使用，不同配置下的环境变量了

![image-20211105160148583](C:\Users\123\AppData\Roaming\Typora\typora-user-images\image-20211105160148583.png)

以 VITE 开头点变量即可

