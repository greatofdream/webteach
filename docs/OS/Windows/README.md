# Windows
## 激活
[这里](https://massgrave.dev/kms38.html)提供了一个欺骗windows的方式来获取直到2038年的激活方式，命令如下
```shell
irm https://massgrave.dev/get | iex
```
然后按照命令提示即可
## 路由
```
route print
```
## IP
```
ipconfig /all
```
+ DNS suffix search list (DNS后缀搜索列表): 当搜索的域名仅有一个单词块时，默认加在尾部的域名后缀，并对新生成的域名进行DNS查询
```
nslookup [域名]
```
+ 使用默认的DNS服务器查询对应的域名
```
ping [IP/域名]
```
+ 使用域名时，ping会使用`DNS Client Service`[查询IP](https://serverfault.com/questions/84291/how-does-windows-decide-which-dns-server-to-use-when-resolving-names)
+ 出现`nslookup`指定DNS服务器可以获得IP，但是`ping`无法查询到域名IP的时候，可能是`DNS Client Service`有问题

## 编程
Windows编程遇到的一些有趣的样例
+ [机械键盘连续出发问题](https://github.com/garfeng/keyboard)

编译器cl
+ [使用样例](https://github.com/greatofdream/AdvancePhysicsExperiment/tree/master/pageRank#windows-%E4%B8%8Bmsvc%E4%BD%BF%E7%94%A8)
## 字符集
+ 在区域中可以修改字符集
+ visual studio 中可以指定字符集，[详细步骤](https://learn.microsoft.com/zh-cn/cpp/build/reference/utf-8-set-source-and-executable-character-sets-to-utf-8?view=msvc-170)

