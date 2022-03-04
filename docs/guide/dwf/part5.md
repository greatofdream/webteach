# 额外的要求
+ 脚本创建实体类
+ 脚本获取实体类信息
+ 动态更新表格
## 前端脚本
创建或者任意找一个实体类，创建一个表单，在其中添加两个按钮，两个输入框和一个表格

第一个按钮和输入框对应增加新的实体类，代码如下
```javascript
// 获取要增加表格的名称
var tablename = this.getAddinById('TextInput1');
console.log(tablename.value);
// 下面的ip和端口需要根据你的api文档显示更改
this.dwf_axios.post('http://101.6.15.213:46060/dwf/v1/meta/entities-create?withParentOid=false',
    [{
        "classType":"PersistentClass",
        "classCategory":"ItemClass",
        "parentClass":"IdItem",
        "isSystem":false,
        "state":0,
        "attributes":[],
        "className":tablename.value,
        "displayName":tablename.value,
        "zoneName":"CUS"}]).then(res=>{
	// 此处为回调函数，下面的ip和端口需要根据你的api文档显示更改
    this.dwf_axios.post('http://101.6.15.213:46060/dwf/v1/meta/entities/'+tablename.value+'/custom-attributes-bind',
    // 在下面的列表里我只放了一个元素，你可以放更多元素，而且我增加的属性名spidername已经写死了，你可以根据需要动态修改
	[{
        "attributeCategory":"Variable",
        "id":"",
        "attributeName":"spidername",
        "displayName":"spidername",
        "valueType":"String",
        "valueLength":50,
        "nullable":true,
        "defaultValue":null,
        "order":100,
        "defaultComponent":null,
        "attrDict":null,
        "queryBoxDisplayType":"",
        "isInTable":true,
        "isInQueryBox":true,
        "isInForm":true
    }]).then(res=>{
	// 下面这部分是获取属性内容
        this.msgbox.info('finish')
        this.dwf_axios.get('http://101.6.15.213:46060/dwf/v1/meta/entities/'+tablename.value+'/attributes', ).then(function (res) {
         console.log('finish')
            console.log(res)
            }).catch(function (error) { 
         //TODO 请求失败，失败信息 error 
            console.log(error); 
        });

    })
})
```

第二个按钮用于将实体类里的信息展示在表格中，涉及到表格的动态操作
```javascript
// 获取实体类的名称
var tablename = this.getAddinById('TextInput1');
var grid = this.getAddinById('Grid1')
// ip和端口号需要根据你的api接口说明更改
this.dwf_axios.get('http://101.6.15.213:46060/dwf/v1/meta/entities/'+tablename.value+'/attributes', ).then(function (res) {
         console.log('finish')
	//注意下面动态修改表格的操作，表格之前是空的，需要先设置表头，然后设置内容
        console.log(grid.args)
        var columndef = []
        attrs = res.data.data
        console.log(attrs)
        keys = Object.keys(attrs[0])
        console.log(keys)
        for(var i=0;i<keys.length;i++){
            columndef[i] ={
                alignCode: 1,
                attrName: keys[i],
                editable: false,
                colId: keys[i],
                enableFilter: true,
                enableSorting: true,
                field: keys[i],
                headerName: keys[i]
            }
        }
        grid.setColumnDefs(columndef)
        grid.setRowData(attrs)
        //console.log(res)
        }).catch(function (error) { 
         //TODO 请求失败，失败信息 error 
         console.log(error); 
        });
```
## python脚本
python分为两个步骤，先认证，然后才能进行之后的操作，**注意认证端口和操纵实体类端口不是同一个**
+ 认证
+ 创建实体类
+ 增加属性
+ 查询属性

第一部分认证
```python
import requests, json
host='http://101.6.15.213:49090'
newTablename = 'spiderData2'
jwt='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMDAzNDY2N30.jBojlV-v5dpbog14_kQgRrTo_TkACvv7pOjZ3qKDGaEd0-z8AO7iEtQKb7xK3Xr9Adi6qdw08nq17Ir_uWvqZQ'
header={"Authorization": jwt, "Content-Type": "application/json"}# Get请求的header
r = requests.get(host+'/dwf/v1/app/login?userName={}&password={}'.format('admin','123456'), #替换成你的用户名以及密码
    headers=header)
# update jwt
jwt = r.json()['data']
header={"Authorization": jwt, "Content-Type": "application/json"}
```
构造新的实体类
```python
# 注意端口可能不一样
host='http://101.6.15.213:46060'
r = requests.post(host+'/dwf/v1/meta/entities-create?withParentOid=false',headers=header,
    data=json.dumps([{
        "classType":"PersistentClass",
        "classCategory":"ItemClass",
        "parentClass":"IdItem",
        "isSystem":False,
        "state":0,
        "attributes":[],
        "className": newTablename,
        "displayName":newTablename,
        "zoneName":"CUS"}]))
# 下面应该输出200之类的成功访问
r.json()
```
创建新的属性
```python
r= requests.post(host+'/dwf/v1/meta/entities/'+newTablename+'/custom-attributes-bind',headers=header,
    data= json.dumps([{
        "attributeCategory":"Variable",
        "id":"",
        "attributeName":"spidername",
        "displayName":"spidername",
        "valueType":"String",
        "valueLength":50,
        "nullable":True,
        "order":100,
        "queryBoxDisplayType":"",
        "isInTable":True,
        "isInQueryBox":True,
        "isInForm":True
    }]))
# 下面应该输出200之类的成功访问
r.json()

```
查询属性
```python
r= requests.get(host+'/dwf/v1/meta/entities/'+newTablename+'/attributes',headers=header)
# 下面应该输出200之类的成功访问
r.json()

```
