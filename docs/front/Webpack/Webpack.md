# Webpack
有一个版本较旧的[深入浅出Webpack](http://webpack.wuhaolin.cn/)可供参考，下文也参考了这个资源。

+ 项目中使用的每个文件都是一个 模块,通过互相引用，这些模块会形成一个图(ModuleGraph)数据结构
+ 在打包过程中，模块会被合并成 chunk。 chunk 合并成 chunk group，并形成一个通过模块互相连接的图(ModuleGraph)。如果声明了一个`entry`,创建了一个包含一个chunk的chunk group
## 安装
+ 在npm创建的工程中将webpack安装为开发依赖
```
npm i -D webpack
```
+ 为了能够方便启动webpack，在`package.json`中的scripts标签中配置运行webpack,运行`npm run build`就等同使用`webpack --config webpack.config.js`;此外`webpack-dev-server`可以启动webpack的服务器提供web服务
```
"scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server",
  }
```
## 快速开始
+ 项目中的脚本`main.js`可以使用ES6的import语法，这个脚本无法直接在浏览器运行，浏览器不支持ES6的模块引入，因此需要通过Webpack打包消除import
```
import {show} from './show'
show('Webpack')
```
+ `show.js`
```
export function show(content) {
    window.document.getElementById('app').innerText = `Hello,${content}`;
  }
```
+ `index.html`: 在script标签引入打包后的文件`./dist/bundle.js`，这个是webpack默认生成位置
```
<html>
    <head>
        <meta charset="UTF-8">
        <link href="dist/main_e6e2d59f.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <div id="app"></div>
        <script src="./dist/bundle.js"></script>
    </body>
</html>
```
+ `webpack.config.js`
```
const path = require('path');

module.exports = {
  // JS 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
}
```
+ 打包`npm run build`，这个时候在`./dist/bundle.js`中是
```
(()=>{"use strict";window.document.getElementById("app").innerText="Hello,Webpack"})();
```
+ 在浏览器中打开`index.html`即可查看页面已经出现了js中的文字`Hello,Webpack`
# 配置
[官方文档](https://webpack.js.org/concepts/)是最权威的参考
+ `nntry`:构建的入口，默认为`./src/index.js`
+ `output`:输出文件位置
+ `loader`:webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。loader有两个属性
  - test 属性，识别出哪些文件会被转换。
  - use 属性，定义出在进行转换时，应该使用哪个 loader
+ `plugin`:件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。
+ `mode`: 通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production。
```
const path = require('path');
module.exports = {
  mode: 'production',
  entry: './path/to/my/entry/file.js',
   output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```
## loader
module.rules 允许你在 webpack 配置中指定多个 loader。 这种方式是展示 loader 的一种简明方式，并且有助于使代码变得简洁和易于维护。同时让你对各个 loader 有个全局概览：

loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。在下面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
```
## plugin
插件目的在于解决 loader 无法实现的其他事。Webpack 提供很多开箱即用的 插件.
webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且在 整个 编译生命周期都可以访问 compiler 对象。
