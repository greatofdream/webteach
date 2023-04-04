# Vue简介
[Vue](https://cn.vuejs.org/)是一套用于构建用户界面的渐进式框架。可以按照开发者意愿最小化引入而不会影响之前的其它功能。

## 使用Vue构建一个SPA(Single Page Application)页面
+ JavaScript中Vue对象的属性改变影响Dom中的元素

代码中在`head`里指明从`https://unpkg.com/vue`引入`vue.js`,这种CDN很多，你完全可以替换成其它的CDN，或者把`vue.js`库下载到本地，从本地引入。
```html
<!DOCTYPE html>
<html>
<head>
  <title>My first Vue app</title>
  <script src="https://unpkg.com/vue"></script>
</head>
<body>
  <div id="app">
    {{ message }}
  </div>

<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})//app-3.seen=false
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})//app4.todos.push({ text: '新项目' })  
</script>
</body>
</html>
```
在上面的代码中，`new Vue`会创建一个`Vue`实例app，其中`el:'#app'`会指定id为app的元素作为需要渲染的元素，然后app调用`render`函数(在app对象初始化时完成)，其中app对象的`data`将会绑定到需要渲染的元素内。

`Vue`提供了一系列`指令`,使得从数据动态构建HTML页面更加方便，比如`<v-if>`,`<v-for>`

+ Dom中元素属性改变影响JavaScript中Vue对象的属性,这种绑定是双向的，因此当Dom中属性发生变化，可以在实例中定义方法监听对应的事件。
```vue
<!DOCTYPE html>
<html>
<head>
  <title>My first Vue app</title>
  <script src="https://unpkg.com/vue"></script>
</head>
<body>
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
<script>
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
</script>
</body>
</html>
```
## MVVM
![MVVM](https://image-static.segmentfault.com/885/914/88591437-25fabe485a7d6d05_fix732)

+ View部分的代码与其它部分代码隔离开，耦合小，便于分离开发与测试。
+ View和ViewModel之间双向数据绑定
## React和Angular
React和Vue比较类似，提供了响应式和组件化的视图组件，但是React使用JSX渲染，Vue使用Template渲染。

Angular(Angular2)是使用TypeScript开发的，因此天生具有静态类型检查；Angular的框架比较严格，复杂度高，更适合大型的复杂应用。

## Vue组件库iView的使用
Vue目前已经到Version3了，目前我们仍然以Vue2为例子。

有很多功能比如轮播图，按钮，列表等常用的功能组件，从头开始写往往非常费时，而且样式调整麻烦。因此有很多组件库提供对应的组件，目前常用的组件库有`Element-ui`，`iView`。

因为DWF用的是`iView`组件库，所以我们这里用`iView`作为例子，当你在使用这个组件库时，最好参考[官方文档](https://www.iviewui.com/docs/introduce)，下面的例子同样来自于官方文档。

```vue
<!DOCTYPE html>
<html>
  <head>
    <title>My first Vue app</title>
    <link
      rel="stylesheet"
      type="text/css"
      href="http://unpkg.com/view-design/dist/styles/iview.css"
    />
    <script
      type="text/javascript"
      src="http://vuejs.org/js/vue.min.js"
    ></script>
    <script
      type="text/javascript"
      src="http://unpkg.com/view-design/dist/iview.min.js"
    ></script>
  </head>
  <body>
    <div id="app">
      <i-button @click="show">Click me!</i-button>
      <Modal v-model="visible" title="Welcome">Welcome to ViewUI</Modal>
    </div>

<div id="app3">
<row>
    <i-col span="12">
        <date-picker type="date" placeholder="Select date" style="width: 200px"></date-picker>
    </i-col>
    <i-col span="12">
        <date-picker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></date-picker>
    </i-col>
</row>
</div>
    <script>
      new Vue({
        el: "#app",
        data: {
          visible: false
        },
        methods: {
          show: function () {
            this.visible = true;
          }
        }
      });
var Main = {
        
    }

var Component = Vue.extend(Main)
new Component().$mount('#app3')
    </script>
  </body>
</html>

```

## 参考文档
[1] https://cn.vuejs.org/v2/guide

[2] https://ustbhuangyi.github.io/vue-analysis/v2/prepare/
