# 带参数脚本文件调用
如果脚本需要传入参数后执行，需要前端将参数读取出来，然后传到后端执行
+ 后端配置好脚本
+ 前端获取参数
+ 前端调用后端的函数
## 前端脚本
this: DWF的顶层保留字，包含所有扩展有关的函数与变量
+ this.env.serverIp
+ this.env.serverPort
+ this.env.appConfig[]

+ this.user:
  - oid
  - userName
  - displayName
  - token
  - userGroup

+ this.msgbox
  - info()
  - error()
  - success()

### 表单对象
+ this.className 当前表单对应的实体类
+ this.obj 单对象表单对应的对象
+ this.selectedObjs 多对象表单中唯一的多对象控件选中的对象
可以直接用this下的函数进行增删改
+ this.edit(targetObj, targetClass)
+ this.delete(targetObj, targetClass)
+ this.insert(targetObj, targetClass)

单对象控件
+ setValue()
+ getValue()
+ args 控件的设置
+ setError 高亮取值不对的控件
+ this.getTargetAddin 返回按钮绑定的多对象控件
多对象控件
+ freshData 刷新
+ freshData(query) 筛选
+ getSelected 返回多对象控件被选择的对象
+ getAll 返回多对象控件中的对象
## 脚本文件执行-后端脚本
this 后端涉及DWF的变量的保留字
+ this.user
+ this.env
  - this.env.appConfig
+ this.omf 数据服务的入口对象
  - getByOid(oid, class)
  - edit(object, class)
  - create(object, class)
  - delete(object, class)
  - getString(oid, targetClass, targetAttr) 获得文件内容
  - getByteArray(oid, targetClass, targetAttr)
  - getFilePath(oid, targetClass, targetAttr)
  - setLocalFile(oid, targetClass, targetAttr, tmpPath) 将tempPath的文件附加到指定的文件属性上
+ this.em 数据库执行SQL的入口对象
  - createNativeQuery 创建一个SQL语句对象
    + setParameter()
    + executeUpdate()
+ this.logger
  - info
+ this.sh
  - this.sh.execute
+ this.obj
+ this.selectedObjs
+ this.oldObj

后端脚本调用restful api(该部分详细过程可以参考[文档](http://ise.thss.tsinghua.edu.cn/confluence/pages/viewpage.action?pageId=43880648))
```javascript
var HttpHeaders = Java.type('org.springframework.http.HttpHeaders');
var HttpEntity = Java.type('org.springframework.http.HttpEntity');
var MediaType = Java.type('org.springframework.http.MediaType');
var LinkedMultiValueMap = Java.type('org.springframework.util.LinkedMultiValueMap');
//设置请求头
headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//设置请求体
var request_body= new LinkedMultiValueMap();
request_body.add("image", imgStr);
//发出post请求
var baiduai = "https://aip.baidubce.com/rest/2.0/image-classify/v1/car?access_token=24.d1b78235254129c39f9c3d071e644459.2592000.1593750888.282335-19713079";
post_response = this.restTemplate.postForEntity(baiduai, request, String.class);
//解析结果
var body = post_response.getBody();
this.logger.info(body)
// return JSON.info(body)
```
## 后端脚本
+ 执行的python脚本文件
```python
import os, argparse, requests, json
psr = argparse.ArgumentParser()
psr.add_argument('-i',dest='ipt',type=int, default=1)
args= psr.parse_args()
print(args)
#host='http://101.6.15.212:9503'#改成你的host:port
host='http://101.6.15.213:49090'
# 改成你的实体类名称
classdata='Data'
jwt='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMDAzNDY2N30.jBojlV-v5dpbog14_kQgRrTo_TkACvv7pOjZ3qKDGaEd0-z8AO7iEtQKb7xK3Xr9Adi6qdw08nq17Ir_uWvqZQ'#改成你的jwt,在api说明里获取
header={"Authorization": jwt, "Content-Type": "application/json"}# Get请求的header
r = requests.get(host+'/dwf/v1/app/login?userName={}&password={}'.format('admin','123456'), #替换成你的用户名以及密码
    headers=header)
# update jwt
jwt = r.json()['data']

header={"Authorization": jwt, "Content-Type": "application/json"}# Get请求的header
# 测试你的jwt能否成功认证，我们发送一个post请求获取Data数据,根据你的类名，可能你的实体类名字不是Data
r= requests.post(host+'/dwf/v1/omf/entities/{}/objects'.format(classdata),headers=header,
        json={
# 这个地方我的属性是year，你们的年份注意一下是否是整数，否则需要按照我之前的例子改成nativesql
            "condition" : "and obj.year>={} and obj.year<{}".format(2012, 2019)
        })
print(r.json())
df = r.json()['data']
tmpts = []
for i,t in enumerate(df):
    tmpt = {
        'oid': t['oid'],
        'avgCPI': round(float(t['CPI'])*args.ipt/float(t['totalPopulation']), 10)
    }
    tmpts.append(tmpt)
# 上面将需要更新的内容按照oid储存成数组，下面可以直接放在api里更新
r = requests.post(host+'/dwf/v1/omf/entities/{}/objects-update'.format(classdata),
    headers=header,
    json=tmpts)
print(r.json())
```
+ 后端脚本
我们需要先放置一个按钮，并绑定操作，选择后端脚本。
```javascript
// oid是你上传完脚本文件后对应的oid
oid='73D059AA0B9684478952ABC38EB70067'
// customData是前端传给后端的数据，之后我们可以在前端脚本里看到对应部分
this.logger.info('自定义字段'+this.customData)
var times = this.customData['times']
this.logger.info(times)
var scriptPath = this.omf.getFilePath(oid, 'Script', 'scriptFile');
//执行脚本,反引号将变量替换成值，其中我们给脚本加上了参数
this.logger.info(`python3 ${scriptPath} -i ${times}`)
this.sh.execute(`python3 ${scriptPath} -i ${times}`)
```
点击按钮后，在你的开发者工具里可以看到有一个POST请求，对应的响应内容即为你的python脚本内打印的字符串,你可以通过这种方式检查你的脚本在服务器上是否正常运转。

目前在服务器端运行脚本时，如果dwf是在docker里，需要注意是否开放了docker的访问权限。
## 调用后端脚本-前端脚本
先放置一个文本框，我这里默认控件id是TextInput1

再放置一个按钮，绑定操作，选择前端脚本
```javascript
// 先获取文本作为参数的输入
var number = this.getAddinById('TextInput1');
console.log(number.getValue())
// 下面代码调用后端脚本，同时传入customData
this.getOperation('cityData', 'calcCPI').then(res => {
    var operation = res.data.data;
    //console.log(number.getValue())
    console.log(operation)
    // 第二个参数就是customdata
    this.executeOperation(operation,{'times':number.getValue()}).then((opr) => {
        // 刷新前端数据
        this.freshData()
    });

})

```
点击前端按钮，查看执行结果是否在cpi上乘上了相应的倍数。
