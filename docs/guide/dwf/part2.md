# 脚本与Echart

## 前端脚本
### 前端脚本展示另外一个web页面
首先大家在城市列表页面里加入一个iframe控件

在表格的事件里选择单击事件，并创建一个`获取预览`的操作，选择动作为`implement`，选择`前端脚本`将下面代码粘贴进去
```javascript
webPage = this.getAddinById("Iframe1")
console.log("webPage src")
var args = webPage.args
console.log('args'+args)
webPage.url = this.selectedObjs[0].link
console.log('select obj'+this.selectedObjs)
console.log('url'+webPage.url)
```
+ this是javascript的一个特别的对象，随代码上下文变化，在此处指定全局环境
+ getAddinById 获取iframe控件，此处看你的实际控件名称是什么
+ selectObjs即为表格当前选中的控件，返回的是一个列表，所以需要索引0
+ link 是实体类的属性，大家可以打开你的实体类查看

[更多操作](http://ise.thss.tsinghua.edu.cn/confluence/pages/viewpage.action?pageId=43880694#id-%E8%84%9A%E6%9C%AC%E5%BC%80%E5%8F%91%E4%BB%BB%E5%8A%A1%E5%BF%AB%E9%80%9F%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C-%E9%AB%98%E6%89%8B%E5%BF%85%E7%9C%8B-1.1.1.5.1%E8%8E%B7%E5%8F%96%E8%A1%A8%E6%A0%BC%E4%B8%8E%E8%A1%A8%E6%A0%BC%E4%B8%AD%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C%EF%BC%88%E8%8E%B7%E5%8F%96%E4%B8%8E%E5%88%B7%E6%96%B0%EF%BC%89)
### 表格点击事件
点击表格某一行，使得另外一个多对象控件显示对应的值，例子以DWF内置的仪表盘为例
+ 表格和仪表盘的控件编号分别为`gridId`,`gaugeId`
```javascript
grid = this.getAddinById('gridId')
select = grid.getSelected()[0]
gauge = this.getAddinById('gaugeId')
gauge.freshData(`and obj.oid = '${select.oid}'`)
```

对于其它非DWF内置控件，就没有`freshData(query)`这个函数了，所以需要使用`vue`的`$store`

## 获取文件路径
此处使用两个例子，第一个使用`超级控件`结合`iview`实现轮播图，第二个使用`富文本`编辑器显示文本内容，并实现执行脚本

### 超级控件

在创建表单后，在表单上面有一个小扳手类似的图标处，选择初始化操作
```javascript
var grid = this.getAddinById("Grid3");
var data = grid.getAll();
var urls = data.map(x=>{
    return `http://${this.env.serverIp}:9503/dwf/v1/omf/classes/${this.className}/objects/${x.oid}/attributes/picFile/bytes?attachment=true&0`;
    });
console.log('urls init in list of picture:'+urls);
localStorage.setItem('ListPic',urls);
```

+ 选择超级控件，拖动进入表单，点击编辑代码，将下面的代码粘贴进去
```vue
<template>
	<div class="loopPic">
		<!-- <Button>Hello World</Button> -->
		<Carousel autoplay v-model="value2" loop>
        <CarouselItem v-for="url in urls">
            <div class="demo-carousel"><img class="image" :src="url"></div>
        </CarouselItem>
    </Carousel>
	</div>
</template>
<script>
import { Carousel } from 'iview';

export default {
	components: { Carousel },
	data() {
		return {
    		value2: 0,
		    urls: ['http://101.6.15.212:9503/dwf/v1/omf/classes/Picture/objects/F7E873F2DC9B4C4E8A0B815888011776/attributes/picFile/bytes?attachment=true&0',
		    'http://101.6.15.212:9503/dwf/v1/omf/classes/Picture/objects/576814B4D88E4D4CAF8BDF9CD3E5AF4C/attributes/picFile/bytes?attachment=true&0',
		    'http://101.6.15.212:9503/dwf/v1/omf/classes/Picture/objects/576814B4D88E4D4CAF8BDF9CD3E5AF4C/attributes/picFile/bytes?attachment=true&0']
		}
	},
	created: function(){
	    console.log('begin render the picture')
	    if (localStorage.getItem('ListPic')){
    	    this.urls = localStorage.getItem('ListPic')
	    }
	}
}
</script>
<style>
@import "../../node_modules/iview/dist/styles/iview.css";
.loopPic{
    width:700px;
}
.image{
    width:100%;
}
.demo-carousel{
    text-align: center;
}
</style>
```
### 脚本文件
创建一个新的实体类`Script`，里面包含一个`脚本`scriptFile属性，类型选择localfile,创建属性`scriptContent`，字符串类型

创建一个单对象和多对象表单，并在单对象表单中放置一个富文本编辑器,绑定`scriptContent`，放置一个按钮，绑定事件`显示内容`，动作implement,**后端脚本**

```javascript
this.logger.info("script oid"+this.obj.oid);
var string = this.omf.getString(this.obj.oid, 'Script', 'scriptFile');
var base64 = Java.type('java.util.Base64');
var base64n = Java.type('org.apache.commons.codec.binary.Base64');
var JString = Java.type('java.lang.String')
var destring = new JString(base64.getDecoder().decode(string.toString()));
this.omf.edit({"oid": this.obj.oid, "scriptContent": destring}, "Script");
```
上面的逻辑就是把文本内容写到数据库里，让dwf来负责更新文本编辑器，注意目前只实现了显示，并未实现回写到文件里。

需要注意上面的操作是后端执行，前端数据没有生效，需要刷新到前端，增加按钮`刷新`，绑定默认操作刷新
```javascript
var spiderFile=this.omf.getFilePath("DC5B8E16D6A24949BE400D996C0E3BAE", "Script", "scriptFile")
this.sh.execute('python3 `spiderFile`')
```
## 后端脚本: 数据模型扩展
详情可参考[这里](http://101.6.15.214:8180/confluence/pages/viewpage.action?pageId=50318879)
+ 服务器端提供的一套事件机制
+ 在实体类、关联类对象被创建、删除、修改的前后执行一段指定的脚本

全局关键字
+ `this.obj`:在前处理脚本中表示即将更新到数据库中的JSON对象
+ `this.oldObj`:在更新和删除的后处理脚本中表示完成之前原始的JSON对象
+ `this.className`: 在脚本正在处理及的实体类或者关联类的英文名

在脚本中可以指定一些操作，通过SQL语句完成的删除操作不会触发工单删除后的事件，如
```
var curAssetId = this.obj.oid;
if (curAssetId) {
    var query = this.em.createNativeQuery("delete from plt_cus_workorder where plt_assetoid = ?");
    query.setParameter(1, curAssetId);
    query.executeUpdate();
}
```
其中`?`被下一行`setParameter`指定，`em`为`JPA`的`EntityManager`缩写

***对于实体类，命名规则是：PLT_[前缀]_[类名]，对于关联类，命名规则是：PLT_[前缀]_R_[类名]。其中【前缀】是在类属性界面中指定的，默认为CUS代表自定义。

所以，根据这个规则，工单类在数据库中的对应的表名是：plt_cus_workorder*
## 后端脚本读写数据库
javascript本来就不是设计用来分析数据的，面对极大的数据量缓慢的执行速度并不合适。小规模分析数据有相关的库，但是我并没有深度用过，而且在DWF里需要重新引入对应js的库，我没有做过相关的尝试，也不计划去做这种测试。

因此此处展示如何将数据从数据库读入，做一次简单的加法再写回数据库，务必不要在前端执行复杂的分析，浏览器也会变卡，会使用户体验会变差。

所以复杂的计算留给后端，后端脚本虽然是javascript编写，但是实际上最终是使用java执行，而java是有丰富的大数据组件，适合处理很多数据。

我们计划加入一列属性`人均GDP`，然后在后端计算，并且存放到数据库里
+ 在实体类里新建属性`人均GDP`
+ 在实体类的多对象表单里新增一个按钮，叫`计算人均GDP`，然后将绑定多对象控件指定为表格
+ 为该按钮的操作添加一个`implement`，然后添加后端脚本
**如果你的实体类名字不是Data，那么你需要把它改成对应的实体类名称**

```javascript
let d = this.omf.handleQueryData("","Data")
d.forEach(timedata=>{
    this.logger.info('timedata'+JSON.stringify(timedata))
    let population = timedata['totalPopulation']
    let gdp = timedata['GDP']
    
        objsub = {
            'oid': timedata['oid'],
            'avgGDP': (gdp/population).toFixed(3)
        }
        this.logger.info("edit Indicator"+JSON.stringify(objsub))
        this.omf.edit(objsub, "Data");

    
})
```
+ 分享该表单，尝试执行该操作，观察数据是否更新
另外`logger.info`产生的信息需要在脚本日志里查看，并不是特别方便。
## Echart
[官网](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)
下面是一个改编自Echart官网的[例子](https://echarts.apache.org/examples/zh/editor.html?c=bar-race-country)
```javascript


var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';


var updateFrequency = 2000;
var dimension = 0;

var countryColors = {"Australia":"#00008b","Canada":"#f00","China":"#ffde00","Cuba":"#002a8f","Finland":"#003580","France":"#ed2939","Germany":"#000","Iceland":"#003897","India":"#f93","Japan":"#bc002d","North Korea":"#024fa2","South Korea":"#000","New Zealand":"#00247d","Norway":"#ef2b2d","Poland":"#dc143c","Russia":"#d52b1e","Turkey":"#e30a17","United Kingdom":"#00247d","United States":"#b22234"};

$.when(
    $.getJSON('https://cdn.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
    $.getJSON(ROOT_PATH + '/data/asset/data/life-expectancy-table.json')
).done(function (res0, res1) {
    var flags = res0[0];
    var data = res1[0];
    var years = [];
    for (var i = 0; i < data.length; ++i) {
        if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
            years.push(data[i][4]);
        }
    }

    function getFlag(countryName) {
        if (!countryName) {
            return '';
        }
        return (flags.find(function (item) {
            return item.name === countryName;
        }) || {}).emoji;
    }
    var startIndex = 10;
    var startYear = years[startIndex];

    var option = {
        grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
        },
        xAxis: {
            max: 'dataMax',
            label: {
                formatter: function (n) {
                    return Math.round(n);
                }
            }
        },
        dataset: {
            source: data.slice(1).filter(function (d) {
                return d[4] === startYear;
            })
        },
        yAxis: {
            type: 'category',
            inverse: true,
            max: 10,
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: 14
                },
                formatter: function (value) {
                    return value + '{flag|' + getFlag(value) + '}';
                },
                rich: {
                    flag: {
                        fontSize: 25,
                        padding: 5
                    }
                }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
        },
        series: [{
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            itemStyle: {
                color: function (param) {
                    return countryColors[param.value[3]] || '#5470c6';
                }
            },
            encode: {
		// 此处dimension前面定义过=0，即选取第一列
                x: dimension,
		// y的值选取第3列
                y: 3
            },
            label: {
                show: true,
                precision: 1,
                position: 'right',
                valueAnimation: true,
                fontFamily: 'monospace'
            }
        }],
        // Disable init animation.
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
            elements: [{
                type: 'text',
                right: 160,
                bottom: 60,
                style: {
                    text: startYear,
                    font: 'bolder 80px monospace',
                    fill: 'rgba(100, 100, 100, 0.25)'
                },
                z: 100
            }]
        }
    };

    // console.log(option);
    myChart.setOption(option);
	
    for (var i = startIndex; i < years.length - 1; ++i) {
        (function (i) {
            setTimeout(function () {
		//此处设置更新时间
                updateYear(years[i + 1]);
            }, (i - startIndex) * updateFrequency);
        })(i);
    }

    function updateYear(year) {
        var source = data.slice(1).filter(function (d) {
            return d[4] === year;
        });
        option.series[0].data = source;
        option.graphic.elements[0].style.text = year;
        myChart.setOption(option);
    }
})

//option && myChart.setOption(option);
```
那么我们也希望能够动态展示GDP的变化情况，需要将数据整理成上述格式，
+ Echart中使用dataset管理数据
+ 第一行为列名，剩下行是数据，类似表格
我们需要从数据库中取回数据，可以在前端向服务器发送请求，有以下方法
```javascript
// dwf 提供的前端脚本api
this.handleQueryData(queryConditon).then(res => {})
// 利用封装后的restiful api, post或get后的参数可以从你的dwf管理端右上角`api说明`处找到
this.dwf_axios.post(url,param).then(res=>{})
this.axios.post(url,param).then(res=>{})

```
改编后的代码为
```javascript

var updateFrequency = 2000;

var countryColors = {"北京":"#00008b","深圳":"#f00","广州":"#ffde00","上海":"#002a8f"};
var param = {
	//让服务器端返回的数据按照时间顺序返回
    "condition": "order by obj.year"
};
//下面的Data需要改成你的实体类名
this.dwf_axios.post('/omf/entities/Data/objects',param).then(res =>{
    var data = res.data.data;
    console.log(data)
    var years = [];
    for (var i = 0; i < data.length; ++i) {
        if (years.length === 0 || years[years.length - 1] !== data[i]['year']) {
            years.push(data[i]['year']);
        }
    }
    var keys = [];
    for(var key in data[0])keys.push(key)
    //console.log(keys)
    //console.log(years)
    
    var startIndex = 0;
    var startYear = years[startIndex];

    var option = {
        grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
        },
        xAxis: {
            max: 'dataMax',
            label: {
                formatter: function (n) {
                    return Math.round(n);
                }
            }
        },
        dataset: {
            dimensions: keys,
            source: data.filter(function (d) {
                return d['year'] === startYear;
            })
        },
        yAxis: {
            type: 'category',
            inverse: true,
            max: 10,
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: 14
                },
                formatter: function (value) {
                    return value;
                },
                rich: {
                    flag: {
                        fontSize: 25,
                        padding: 5
                    }
                }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
        },
        series: [{
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            itemStyle: {
                color: function (param) {
                    //console.log(countryColors[param.data['ChineseName']])
                    return countryColors[param.data['ChineseName']] || '#5470c6';
                }
            },
            //dimensions: keys,
            encode: {
                x: 'GDP',
                y: 'ChineseName'
            },
            label: {
                show: true,
                precision: 1,
                position: 'right',
                valueAnimation: true,
                fontFamily: 'monospace'
            }
        }],
        // Disable init animation.
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
            elements: [{
                type: 'text',
                right: 160,
                bottom: 60,
                style: {
                    text: startYear,
                    font: 'bolder 80px monospace',
                    fill: 'rgba(100, 100, 100, 0.25)'
                },
                z: 100
            }]
        }
    };

    // console.log(option);
    myChart.setOption(option);

    for (var i = startIndex; i < years.length - 1; ++i) {
        (function (i) {
            setTimeout(function () {
                updateYear(years[i + 1]);
            }, (i - startIndex) * updateFrequency);
        })(i);
    }

    function updateYear(year) {
        var source = data.filter(function (d) {
            return d['year'] === year;
        });
        //console.log(source)
        option.dataset.source = source;
        option.graphic.elements[0].style.text = year;
        myChart.setOption(option);
    }
})

//option && myChart.setOption(option);


```

下面的示例代码用于在其它事件中更新Echart中的数据
```javascript
var gaugeChart1 = this.getAddinById('GaugeChart1');
var option=gaugeChart1.mychart.getOption();
option.series[0].data[0].value=19;
gaugeChart1.mychart.setOption(option)
```
