# Intel 处理器
[参考](https://www.intel.cn/content/www/cn/zh/processors/processor-numbers.html) [所有产品类别](https://ark.intel.com)
+ 酷睿系列
+ 奔腾
+ 赛扬
+ 简化品牌：2023年开始取代 奔腾 和 赛扬分类

命名规则为
+ 品牌: 如 Intel Core
+ 品牌修饰符: 如 i7，对于奔腾和赛扬没有这个修饰符
+ 代次指示符：四或五位数字的前一位或前两位，如i7 13700中的13为13代
+ SKU 数值：四或五位数字的后3位，如i7 13700中的700表明功能差异
+ 产品线后缀：如，在英特尔® 酷睿™ 处理器系列中，U 表示专为高能效笔记本电脑或 2 合 1 电脑设计的处理器。而 XE 表示专为实现最高性能设计的面向台式机的“至尊版”处理器。

## 酷睿 (Core)
更详细内容请前往官网
|处理器分类|产品线后缀|设计|
|-|-|-|
|台式机|K|高性能，未锁频|
|移动设备|U|能效最高|
|嵌入式|UE|能效更高|
###  i3 N 系列
英特尔正在为 N 系列添加新的英特尔 酷睿 i3 处理器,英特尔 酷睿 i3 N 系列处理器遵循当前的 N 系列命名约定，不包含任何数字格式的代次指示符。

通用格式：英特尔® 酷睿™ i3-N### 处理器

这种格式的一个示例是英特尔® 酷睿™ i3-N305 处理器。

## 简化品牌
英特尔正在为入门级计算领域推出一个新的处理器品牌：英特尔® 处理器。尽管仍将生产现有的英特尔® 奔腾® 和英特尔® 赛扬® 产品，但从 2023 年开始，英特尔® 处理器将在新产品堆栈中取代英特尔® 奔腾® 和英特尔® 赛扬®。在其命名约定中，“英特尔® 处理器”后跟一个表示系列的字母数字前缀，然后是 3 位数字。英特尔® 处理器遵循当前的 N 系列命名约定，不包含任何数字格式的代次指示符。

通用格式：英特尔® 处理器 N###。这种格式的一个示例是英特尔® 处理器 N200。

注意：英特尔® 处理器字母数字前缀将以 N 或 U 开头。” 此外，英特尔® 处理器还包括 N 系列处理器之外的其他衍生品。

## 奔腾 (Pentium)
+  奔腾® Silver 处理器的命名约定包括一个字母前缀，后跟一个四位数的 SKU 编号
+  奔腾® Gold 处理器没有字母前缀，而是包含一个 SKU 编号，后跟一个后缀。

## 赛扬 (Celeron)
+ 某些英特尔® 赛扬® 处理器包含由三位数字组成的 SKU，但不包含字母前缀。
+ 其他处理器则包含一个字母前缀，后跟一个四位数的 SKU 编号。
+ Intel Celeron J1900: 咸鱼上工控机最常见的处理器之一，TDP仅10W，性能低下。[官网链接](https://www.intel.cn/content/www/cn/zh/products/sku/78867/intel-celeron-processor-j1900-2m-cache-up-to-2-42-ghz/specifications.html),英特尔® 赛扬® 处理器 J 系列,22 nm

## 灵动 (Atom)
超低电压处理器系列。该处理器的市场定位是在于智能手机、平板电脑和低成本PC。

|CPU|分数|核心|线程|缓存|TDP|
|-|-|-|-|-|-|
|Intel Celeron J1900|1151|4|4|2 MB L2 Cache|10W|
|Intel Celeron J4105 @ 1.50GHz|2915|4|4|L1: 1792 KB, L2: 16.0 MB, L3: 0 MB|10W|
|Intel Celeron J4125@2GHz|2978|4|4|L1: 1792 KB, L2: 16.0 MB, L3: 0 MB|10W|
|Intel Celeron N4500 @ 1.10GHz|2021|2|2|L1: 4096 KB, L2: 12.0 MB, L3: 4 MB|6W|
|Intel Pentium J4205 @ 1.50GHz|2442|4|4| L1: 896 KB, L2: 4.0 MB, L3: 0 MB|10W|
|Intel Core2 Duo T8100 @ 2.10GHz|746|2|2|L1: 128 KB, L2: 3.0 MB, L3: 0 MB|35W|
|Intel Atom N2600 @ 1.60GHz|323|2|4|L1: 56 KB, L2: 0.5 MB, L3: 0 MB|3.5W|

# 至强 (Xeno)
[Xeno编号](https://www.intel.com/content/www/us/en/products/docs/processors/processor-numbers-data-center.html)

四位数字的第一位是NUMA节点上限，第二位是接口类型，后面两位是同代性能相对值，V是架构版本
+ 单路：E5 1650V3 E3 1231V3；
+ 双路：E5 2620V3 E5 2698V4；
+ 四路：E5 4640V2；
+ 八路：E7 8891V2
## E3 E5
注意在E3v5之后不支持家用主板，只能在[服务器主板(芯片组C232)](https://www.chiphell.com/article-14894-2.html)使用，目前也有[修改BIOS的主板(芯片组B150)](http://www.dnpz.net/DIYzhuanqu/DIYyingjianxinwen/1738.html)支持，[此处](https://post.smzdm.com/p/757995/)有魔改流程
|CPU|分数|核心|线程|缓存|TDP|Memory Support|
|-|-|-|-|-|-|-|
|Intel Xeon E3-1230 v2 @ 3.30GHz| 6206|4|8|L1: 256 KB, L2: 1.0 MB, L3: 8 MB|69W|-|
|Intel Xeon E3-1230 v5 @ 3.40GHz| 7994|4|8|L1: 256 KB, L2: 1.0 MB, L3: 8 MB|80W|-|
|Intel Xeon E5-2667v4 @ 3.20GHz| 13867|8|16|L1: 512KB, L2: 2.0 MB, L3: 25 MB|135W|DDR4 1600/1866/2133/2400, ECC|
|Intel Xeon E5-2680v4 @ 2.40GHz| 17968|14|28|L1: 1792KB, L2: 7.0 MB, L3: 35 MB|120W|DDR4 1600/1866/2133/2400, ECC|
|Intel Xeon E5-2695v4 @ 2.10GHz| 19475|18|36|L1: 1152KB, L2: 4.5 MB, L3: 45 MB|120W|DDR4 1600/1866/2133/2400, ECC|

+ 垃圾佬酷爱的E5-2680v4，内存频率最高支持到2400Hz。

