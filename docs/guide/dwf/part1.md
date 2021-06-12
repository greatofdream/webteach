# DWF 结构
清华数为应用开发工具—DataWay Framework，简称DWF，是一款与大数据系统软件配套的低代码应用开发工具。
[这里](http://ise.thss.tsinghua.edu.cn/confluence/pages/viewpage.action?pageId=43878946)可以找到参考文档

+ DWF的体系结构如下:

![结构](http://ise.thss.tsinghua.edu.cn/confluence/download/attachments/43879876/image2020-3-16_11-9-40.png?version=1&modificationDate=1605489531000&api=v2)

vue用于前端页面展示，SpringBoot作为后端的服务。

+ DWF的工作流:
![工作流程](http://ise.thss.tsinghua.edu.cn/confluence/download/attachments/43879876/image2020-3-12_16-59-47.png?version=1&modificationDate=1605489531000&api=v2)

需要注意区分在开发时，开发者和用户都工作在浏览器的前端环境。

## 课上任务
以 城市发展指标系统 为例，演示系统开发流程
+ 完成实体类的创建
+ 完成单对象和多对象表单，并实现增删查改功能
## 项目目标
对于各个城市的数据信息，比如GDP，人口，教育等数据收集到数据库，在线分析得到评分，以图表形式展示原始数据与评分结果。
## 数据库设计
+ 数据库表
  - `城市`单独一个表格
  - `年份数据`一个表格，通过外键指向`城市`表格

![datatable](https://raw.githubusercontent.com/greatofdream/city/master/bigdata.png)

仅用于演示，大家创建两个数据表city,Indicator表格
+ 导入数据
数据csv在[city](http://lovestrong.top:8080/webdwf/dwfData/City.xlsx),[Indicator](http://lovestrong.top:8080/webdwf/dwfData/Data.xlsx)下载。
## UI界面设计
+ 所需功能，包括单对象和多对象
  - 多对象表单可以查看编辑实体类下面所有的数据
  - 单对象表单用于查看编辑某一个数据行

这种安排是一种编程实践，如果数据结构很简单，可以不需要单对象表单，直接在多对象表单上修改

+ 在单对象表单里，可以用`对象选择`索引到另外一个表的内容，比如在实体类`年份数据`里，可以通过`oid`索引到城市`city`表中的`中文名称`。
+ 在多对象表单中，可以使用类似的方法，使得列中的内容显示为另一个数据表的内容。
+ 在多对象表单里的按钮需要绑定到多对象控件上，这样才能将多对象控件里的数据互相绑定。

### 表格的其它设计
+ 操作列
+ 筛选条件,在dwf的表单里可以直接选择，后面写你需要的条件biru`=2018`
### 图片
+ 在实体类中增加的属性使用localfile
+ 可以在单对象表单里使用`附件`控件

Example
+ 比如我给大家的city.csv里没有图片这一属性，大家可以在dwf modeler-web端的实体类管理中增加`城市图片`属性，并选择类型为localfile;
+ 在单对象表单里选择`附件`控件，并将绑定属性选择到`城市图片`，DWF会帮我们自动管理文件

另外在dwf里直接管理代码文件并不是一个很方便的选择，因为文件路径的获取稍微有点复杂。这里需要涉及到脚本，放在下一节进行文件路径获取。
### 卡片
无论是`卡片`,还是`表格`都是多对象的一种表现形式，我们完全可以用卡片来展示之前的表格。

## 答疑
