# Stable Diffusion WebUI
## txt2img
[colab](https://atlassc.net/2023/02/18/stable-diffusion-webui-colab-guide-for-beginners#:~:text=Stable%20Diffusion%20Web%20UI%20Colab%20%E6%98%AF%E4%B8%80%E4%B8%AA%E5%8F%AF%E4%BB%A5%E5%9C%A8%20Google%20Colab,Google%20Colab%20%E4%B8%8A%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2%20Stable%20Diffusion%20Web%20UI%20Colab%E3%80%82)
[prompt](https://www.tjsky.net/tutorial/488)


+ 分隔：不同的关键词tag之间，需要使用英文逗号,分隔，逗号前后有空格或者换行是不碍事的
    ex：1girl,loli,long hair,low twintails（1个女孩，loli，长发，低双马尾）

+ 混合：WebUi 使用 | 分隔多个关键词，实现混合多个要素，注意混合是同等比例混合，同时混。
    ex: 1girl,red|blue hair, long hair（1个女孩，红色与蓝色头发混合，长发）

+ 增强/减弱：有两种写法

  - 第一种 (提示词:权重数值)：数值从0.1~100，默认状态是1,低于1就是减弱，大于1就是加强
    ex: ,(loli:1.21),(one girl:1.21),(cat ears:1.1),(flower hairpin:0.9)

  - 第二种 (((提示词)))，每套一层()括号增强1.1倍,每套一层[]减弱1.1倍。也就是套两层是1.1*1.1=1.21倍，套三层是1.331倍，套4层是1.4641倍
+ 渐变：比较简单的理解时，先按某种关键词生成，然后再此基础上向某个方向变化。
    [关键词1:关键词2:数字]，数字大于1理解为第X步前为关键词1，第X步后变成关键词2，数字小于1理解为总步数的百分之X前为关键词1，之后变成关键词2
  + `ex：a girl with very long [white:yellow:16] hair` 等价为开始 a girl with very long white hair

16步之后a girl with very long yellow hair

    ex：a girl with very long [white:yellow:0.5] hair 等价为

开始 a girl with very long white hair

50%步之后a girl with very long yellow hair

```txt
(masterpiece:1.331), best quality,
illustration,
(1girl),
(deep pink hair:1.331), (wavy hair:1.21),(disheveled hair:1.331), messy hair, long bangs, hairs between eyes,(white hair:1.331), multicolored hair,(white bloomers:1.46),(open clothes),
beautiful detailed eyes,purple|red eyes),
expressionless,
sitting,
dark background, moonlight, ,flower_petals,city,full_moon, 
```
+ `open clothes`会使得人物面前的衣物敞开或者消失，谨慎使用。
+ `small breast`和`big breast`可以控制胸部大小，通过上述的括号与权重数值进一步调整大小。

+ 对于prompt分别又两种，第二个为`negative prompt`，比如下面第一个是正常的prompt，第二个是`negative prompt`

```txt
<lora:arknightsTexasThe_v10:0.6> <lora:koreanDollLikenessv10:0.3>,
HDR,8k resolution,best qauality,hightly-detailed,masterpiece,illustration,highres,
focus_on _face,twin_braids,Kpop idol,(small breasts:1.1),arms behind back, studio background,
beautiful detailed eyes, (lolita fashion:0.5), a sweet girl, smile, hair ornamer

```

```txt
nsfw paintings.shetches, (worst quality:2),(low quality:2), (normal quality:2), lowres, normal quality, (monochrome), grayscale, skin spots, acnes, skin blemishes, age spot, (outdoor:1.6), manboobs, backlight, (ugly:1.331),
(duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331),  mutated hands, (poorly drawn hands:1.331), blurry, (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (more than 2 nipples:1.331),
(missing arms:1.331), (extra legs:1.331), (fused fingers:1.61), (too many fingers:1.61), (unclear eyes:1.331), bad hands, missing fingers, extra digit, (futa:1.1), bad body, NG_DeepNegative_V1_75T
```
