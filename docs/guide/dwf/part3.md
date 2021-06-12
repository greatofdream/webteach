# 大作业介绍
## 数据

## 数据库
数据通过腾讯的api接口获取
## 新建表单
随便找一个对象创建多对象表单
## Echart展示地图
+ 在多对象表单中创建一个自定义图echart控件
+ 将下面代码复制到echart控件的代码里，检查echart图情况
```javascript
var historyurl='https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare'
$.getJSON(historyurl).then(res=>{
    //console.log(res.data)
    var data =  res.data;
    var provinceData = [];
    for(let i in data.provinceCompare){
        provinceData.push({
            "name": i,
            "value":data.provinceCompare[i]['confirmAdd'],
            "dead": data.provinceCompare[i]['dead'],
            
        })
    }
    console.log(provinceData)
    var option = {
					        // 设置标题和副标题及副标题跳转链接
					        title: {
					            text: '新冠疫情-国内新增数据',
					            subtext: '数据来源--腾讯',
					            sublink: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare'
					        },
					        // 数据提示框
					        tooltip: {
					            trigger: 'item', // item放到数据区域触发
					            formatter:  function (params, ticket, callback) {
					                console.log(params)
					                if(params.data)
					                    return params.name+'<br/>'+params.data.value+' (人)';
					                else
					                    return params.name+'<br/>无疫情信息';
					            }
					        },
					
							// 视觉映射方案:
					        // visualMap默认是连续映射，我们也可以设置为分段型，对于分布范围广的数据
					        // 使用透明度来区分疫情严重情况
					        visualMap: {
					            type: 'piecewise',
					            pieces: [
					                {gt: 50, color: 'darkred'},                        // (1500, Infinity]
					                {gt: 30, lte: 50, color: 'red', colorAlpha: 1},  // (1000, 1500]
					                {gt: 20, lte: 30, color: 'red', colorAlpha: 0.8},
					                {gt: 10, lte: 20, color: 'red', colorAlpha: 0.6},
					                {gt: 5, lte: 10, color: 'red', colorAlpha: 0.4},
					                {gt: 1, lte: 5, color: 'red', colorAlpha: 0.3},
					                {lt: 1, color: 'red', colorAlpha: 0.0}          // (-Infinity, 100)
					            ],
					        },
					
					        // 具体数据
					        series: [
					            {
					                name: '国内各省确诊病例', // 系列名称
					                zoom:1.2,//地图大小
					                type: 'map', // 系列类型，地图
					                map: 'china', // 要使用的地图，即上面注册的地图名称
					                roam: true, // 开启鼠标缩放和平移漫游
					                label: { // 图形上的文本标签，地图默认显示数据名
					                    show: true,
					                    formatter: '{b}', // b是数据名，c是数据值
					                    fontSize: 8
					                },
					                data: provinceData,
					                dimensions:['name','value','dead'],
					  
					            }
					        ]
					    };
	myChart.setOption(option)
})
```
