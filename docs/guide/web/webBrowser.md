# 浏览器简介
浏览器是可视化网络内容的应用。目前成熟的功能包括
+ 网络访问
+ 网络资源可视化
+ 开发者工具
+ ...

不同的浏览器使用不同的内核
|Chrome|Firefox|Safari|IE|
|-|-|-|-|
|WebKit|Gecko|WebKit|Trident|

内核用于渲染网络资源，提供前述的特性的核心模块。

`WebKit`是由`苹果`发起的开源项目，后来`Google`在`WebKit`的基础上开发了`Blink`内核。

具体的过程可以按下`F12`键，在`网络`和`性能`工具栏里观察。下面过程主要注意请求网络资源的过程
+ 用户输入URL
+ 加载器请求网络资源
+ html解释器构建`DOM Tree`
+ CSS解释器在`DOM Tree`基础上使用可见节点构建`RenderObject Tree`
+ `RenderObject Tree`根据层次结构构建`RenderLayer Tree`
+ 在构建同时构建绘图上下文

chrome的网络工具: chrome://net-internals
+ DNS
+ Pipening
+ SPDY:
+ QUIC:改进UDPd数据协议的能力

## 网络访问
`HTTP`定义了一组http请求方法，有四个请求方法需要熟记
+ get： 请求一个指定资源，通常我们直接访问一个网页，输入url，网页会发送get请求
+ post：将实体提交到指定资源，通常用于表单提交，将表单内容放进http请求的body中
+ put：使用实体替换目标资源
+ delete：删除指定资源

![get](https://media.prod.mdn.mozit.cloud/attachments/2016/08/09/13677/d031b77dee83f372ffa4e0389d68108b/Fetching_a_page.png)

http请求的头
![HTTP](https://media.prod.mdn.mozit.cloud/attachments/2016/08/09/13687/5d4c4719f4099d5342a5093bdf4a8843/HTTP_Request.png)

http请求的响应
![response](https://media.prod.mdn.mozit.cloud/attachments/2016/08/09/13691/58390536967466a1a59ba98d06f43433/HTTP_Response.png)
### 利用`fetch`
```javascript
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

```javascript
fetch('http://lovestrong.top:8080/webdwf/ExGirlWater.png').then(function(res){
console.log('test')
 return res.blob();}).then(function(myblob){ console.log('begin');var objecturl=URL.createObjectURL(myblob);var download=document.createElement('a');download.href=objecturl;download.download='demo.png';download.click();
});
```
 
## H5等资源可视化
以下内容可以在http://jsrun.net/vF3Kp/edit 中找到代码

## HTML
HyperText Markup Language，XML标记语言

请新建一个文件夹，然后保存下述代码到一个文本文档`index.html`
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!--link href="style.css" rel="stylesheet"-->
    <!--script type="text/javascript" src="learn.js"></script-->
    <title>测试页面</title>
  </head>
  <body>
    <h1 id='title'>学习</h1>
    <img class="image" src="demo.png" alt="测试图片">
  <script></script>
  </body>
</html>
```

DOM树：由HTML解析之后生成的树对象
![DOM树](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/image015.png)

在Firefox的开发者工具`DOM`中查看对象。

DOM的事件机制:
+ 事件捕获，默认不捕获
+ 事件冒泡，默认不冒泡
![](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)

```html
<button onclick="getimage()">获取图片</button>
<button onclick="settitle()">更换名字</button>
```
将下面内容放进`learn.js`
```javascript
function getimage(){
  fetch('http://lovestrong.top:8080/webdwf/ExGirlWater.png').then(function(res){
console.log('test')
 return res.blob();}).then(function(myblob){ console.log('begin');var objecturl=URL.createObjectURL(myblob);var download=document.createElement('a');download.href=objecturl;download.download='demo.png';download.click();
});
}
function settitle(){
  document.getElementById("title").innerHTML="我好厉害!";
}
```

cors(cross site)请求受浏览器和服务端限制，我目前还没有把服务端的配置改过来，所以下载图片的脚本目前仅能在我的域名下运行
![](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cors_principle.png)

Shadow DOM

## CSS
Cascading Style Sheet

保存下述代码到一个文本文档`style.css`，把index.html中的注释取消
+ 选择器
```css
#title{
  color: red;
  /*font-size: large;*/
}
.image{
  display: block;
}
```
+ id选择器: `#title` 
+ 类选择器: `.image`

+ 优先级：
  - 同等级的最后声明生效
  - 类型选择器 < 类选择器 < id选择器
  - 内联样式会覆盖外部样式表
+ 流程
![流程](https://media.prod.mdn.mozit.cloud/attachments/2015/10/14/11781/ab96f980498d7c46fe26f6df06b9acfc/rendering.svg)

## JavaScript

跨平台面向对象的脚本语言。**不是Java**，遵循了`Java`的表达式语法，命名规范以及基础流程控制。解释执行，无类型声明。
[MDN详细介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Introduction)

JavaScript的标准是`ECMAScript`，JavaScript是`ECMAScript`的一种实现。最新的标准是`ECMAScript6`，或简称ES6.

+ 声明
```javascript
var a;
console.log("The value of a is " + a); // a 的值是 undefined

console.log("The value of b is " + b);// b 的值是 undefined
var b;
// ‘变量声明提升’

console.log("The value of c is " + c); // 未捕获的引用错误： c 未被定义

let x;
console.log("The value of x is " + x); // x 的值是 undefined

console.log("The value of y is " + y);// 未捕获的引用错误： y 未被定义
let y;
```
+ 数据结构
  - 布尔值：true false
  - null
  - undefined
  - 数字
  - 大整数
  - 字符串
  - Symbol
```javascript
x = "The answer is " + 42 // "The answer is 42"
y = 42 + " is the answer" // "42 is the answer"
```
+ 函数
```javascript
function square(number) {
  return number * number;
}
const square = function(number) { return number * number; };
var x = square(4); // x gets the value 16
```
+ 流程控制
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

+ 原型链Prototype


|浏览器|引擎|
|-|-|
|Chrome| V8|
|Firefox|spiderMonkey|
|WebKit|JavaScriptCore|
|Opera|Carakan|
|InternetExplorer|Chakra|


## 开发者工具
按`F12`进入开发者工具，其中主要包括
+ 查看器
+ 控制台
+ 网络
+ 样式编辑器
## 参考文档
[1] 朱永盛. WebKit技术内幕.

[2] MDN.

[3] https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork
## 更多高级话题
+ NPAPI(Netscape Plugin Application Programming Interface)
+ PPAPI
## 课后任务
+ 安装[nodejs](https://nodejs.org/en/)
+ 写入文件`begin.js`
```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
+ 执行
```javascript
node begin.js
```
+ 通过你的浏览器访问`localhost:3000`
