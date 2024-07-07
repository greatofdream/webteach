# CSS
## Footer位于页面尾部
页面内容较少时，Footer位于屏幕底部，否则位于页面最下方。首先时页面最小高度需要设置，解决内容较少时的情况。剩下的就是调整元素位置了。
+ 方法1：使用Flex的特性，当页面内容不足，让Footer前面元素(`.content`)主动伸长，将Footer元素挤到页面下方。同时需要设置页面的最小高度为100vh，使得浏览器计算时有一个起点高度值。
```html
<html>
    <head>
        <meta charset="UTF-8">
        <title>footer and dropdown menu</title>
        <style>
            body {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            .content{
                flex: 1;
            }
        </style>
    </head>
<body>
<div class="content"></div>
<div class="Footer"></div>
</body>
```
+ 方法2：利用绝对定位特性，元素可以脱离文档流定位。使得文档元素排列时，Footer与文档底部距离为0.
```html
<html>
    <head>
        <meta charset="UTF-8">
        <title>footer and dropdown menu</title>
        <style>
            body {
                overflow: auto;
                position: absolute;
                min-height: 100vh;
            }
            .footer {
                position: absolute;
                bottom: 0;
            }
        </style>
    </head>
<body>
<div class="content"></div>
<div class="Footer"></div>
</body>

```
## 滚动吸附
实现按照子元素翻页,[示例](https://segmentfault.com/a/1190000038459089)

