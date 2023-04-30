# Nuxt
Nuxt3基于Vue3
# Nuxt2
## Context 和 helper
[文档](https://nuxtjs.org/docs/concepts/context-helpers/)
文档中有张图完整诠释了Context中的内容
![context](https://nuxtjs.org/_nuxt/image/c12c33.svg)

# Nuxt3
[文档](https://nuxt.com.cn/docs/getting-started/introduction)
## 代理服务器(Proxy)
本地开发时常常需要使用Nuxt自带的web服务搭配另外的后端(比如http://lovestrong.top:3000)，这个时候需要用Nuxt的web服务转发api的请求。
+ 确保所有的api请求有一个共同的前缀，比如`/api`
+ nuxt使用[nitro](https://nuxt.com.cn/docs/guide/directory-structure/server#nitro-%E9%85%8D%E7%BD%AE)，`nuxt.config.ts`里加入配置
```typescript
    nitro: {
      devProxy: {
          "/api": {
              target: 'http://lovestrong.top:3000/',
              prependPath: true,
              changeOrigin: true,
          },
      }
    }
```
# Nuxt2->Nuxt3
## Nuxt2: 动态路由
Nuxt2和Nuxt3均使用文件命名在底层自动使用vue-router实现路由，但是Nuxt2中使用的文件命名是`_xxx.vue`，而在Nuxt3中为`[xxx].vue`
## Nuxt2: UseContext
[参考](https://nuxt.com.cn/docs/bridge/bridge-composition-api#usecontext-%E5%92%8C-withcontext)

+ 对于自定义的plugin，在Nuxt3中使用 `UseNuxtApp`访问注入的helpers，比如将axio定义为插件,其中加入`token`
```typescript
import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {

  let api = axios.create({
    // baseUrl: defaultUrl,
    headers: {
      common: {},
    },
  });
  api.setToken = (token: User["token"], type: string) => {
    api.defaults.headers["Authorization"] = type + token
  }
return {
    provide: {
      axios: api,
    },
  };
});
```
然后可以通过`useNuxtApp`访问
```typescript
const { $axios } = useNuxtApp()
```
+ 对于Context中的params，需要使用route替换，但是需要注意的是`params`类型为[`RouteParams `](https://router.vuejs.org/api/#Type-Aliases-RouteParams)，索引`params.xxx`返回的值可能为一个字符串数组
```typescript
//Nuxt2
const { params } = useContext()
//Nuxt3
const route = useRoute()
const params = route.params
```
+ Context中的`redirect`，使用`navigateTo`替换
