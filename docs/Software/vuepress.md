# Vuepress
## upgrade
+ `The requested module 'vuepress/utils' does not provide an export named 'globby'`: `vuepress/utils`的版本需要和之前的包匹配，直接`npm i @vuepress/utils`就会报错，需要指定旧的版本。

## website
`Blocked request. This host ("xxxx") is not allowed`
```
bundler: viteBundler({
  viteOptions: {
      server: {
          allowedHosts: ['你的域名xxx.com', '.xxx.com']
      }
  }
}),
```
## vuepress-plugin-md-enhance
[它](https://plugin-md-enhance.vuejs.press/zh/)看起来是[vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/3b42d96655d2cf80a91891eb2234c9bac5aa6ede/demo/md-enhance/src/.vuepress/client.ts#L6)的一个包，有很多特性，包括
+ Tex支持
+ 幻灯片

其中幻灯片依赖[Reveal.js](https://revealjs.com/config/)实现，但是想要自己配置没有详细的文档，会发现直接显示的幻灯片过小，正确的方式为
```typescript
//client.ts
import SlidePage from "vuepress-plugin-md-enhance/SlidePage";
export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  layouts: {
    SlidePage
  },
  rootComponents: [],
})
```
```markdown
// 对应的幻灯片markdown文件
---
navbar: false
layout: SlidePage
---
```
+ 幻灯片分列：Reveal没有支持在Markdown中分列，不过有人搞了一种[hack方法](https://github.com/webpro/reveal-md/issues/223)，可参考我的仓库实现](https://gitee.com/greatofdream/experiment-docs.git)
  + [自定义layout](https://gitee.com/greatofdream/experiment-docs/blob/master/docs/.vuepress/layouts/Slides.vue)，并在`client.ts`里引入
  + [引入layout](https://gitee.com/greatofdream/experiment-docs/blob/master/docs/Paper/linac1998.md)
+ 试用之后发现很多地方都无法调整，比如图片引用会被忽略，格式也相当难调，这个东西只能作为简单的工具放进vuepress，我之后有时间一定搞一个更flexible的幻灯片工具。

其它markdown转幻灯片的工具:
+ [Marp](https://marpit.marp.app/) [Marp 知乎教程](https://zhuanlan.zhihu.com/p/149521766) [Marp 博客教程]()
+ [Markdown Preview Enhanced,Vscode plugin](ma://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/markdown-basics)

## latex
可以参考[文档](https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html)使vuepess支持latex。
