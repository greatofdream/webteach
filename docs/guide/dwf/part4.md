# 调用服务器上的脚本
使用脚本计算平均CPI，并更新到数据库中。主要涉及到在python脚本里处理数据，并写入数据库

+ 之前曾用过后端脚本实现过计算`平均GDP`，直接调用DWF的api
+ python脚本没有DWF的api，如果希望和DWF的数据库交互，需要手动解决认证问题，数据库api问题，因此用自己的脚本文件与DWF的数据库交互是不推荐的，需要额外增加相当多的工作量。

在进入下面的工作前，让我们先在Data实体类里创建一列`平均CPI`，用于之后的计算使用

## 认证
认证使用登陆DWF的用户名及密码即可，认证方式分为以下两个步骤
+ 使用用户名密码从服务器获取token
+ 使用token向DWF服务端发起数据库请求

+ 上面两个步骤在后端脚本或者前端脚本已经封装好了，所以只要我们是在DWF里写脚本，就不需要处理这种事情。
+ 但是如果是自己的脚本，就必须要把上面的流程走一遍。
+ 如果你不需要和后端数据库交互，那么这部分的认证流程完全可以跳过，直接进入`调用你的python脚本`部分即可

**认证的api在API说明里有**，例子如下
```python
import os, argparse, requests, json
host='http://101.6.15.212:9503'#改成你的host:port，注意这个port不是modeler-web那个port，你要从api说明里面找
jwt='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU5NzQ3MTIxMn0.eXjRtWJleuWvs_MlZTT7YYf8rv2JtqP8DbXKbhl5Z1fyFsRoFU4gKwDeUD600gI8wGKfClwfkzqWs-4rnTdOzg'#改成你的jwt,在api说明里获取
header={"Authorization": jwt, "Content-Type": "application/json"}# Get请求的header
r = requests.get(host+'/dwf/v1/app/login?userName={}&password={}'.format('admin','123456'), #替换成你的用户名以及密码,注意我填的密码不是真正的密码，所以直接执行该行代码会失败
    headers=header)
# update jwt
jwt = r.json()['data']
header={"Authorization": jwt, "Content-Type": "application/json"}# Get请求的header
# 测试你的jwt能否成功认证，我们发送一个post请求获取Data数据,根据你的类名，可能你的实体类名字不是Data
r= requests.post(host+'/dwf/v1/omf/entities/Data/objects',headers=header,
        json={
            "condition" : "and obj.year>={} and obj.year<{}".format(2012, 2019)
        })
print(r.json()['data'])
# 此处会输出内容
```
在上面的代码里中需要`year`是数字类型，否则查询数据库进行比较时会报错，大家可以把condition那一行的查询改为SQL的原生查询
```javascript
"condition" : "nativequery:select plt_CPI as \"CPI\",plt_oid as \"oid\",plt_totalPopulation as \"totalPopulation\" FROM plt_CUS_Data where cast(plt_year as integer)>2012 and cast(plt_year as integer)<2019"
```
其中`cast`将数据转换为integer后比较

另外如果你需要使用其它的python的库，请务必提前在服务器上安装好，比如大家现在用的docker，你需要进入docker后安装相应的包，也可以尝试用后端脚本，但是无法知道是否安装成功
```javascript
this.sh.execute("pip install jupyter")
```
## 数据库请求
**数据库请求的api在API说明里有**，例子如下
```python
df = r.json()['data']
tmpts = []
for i,t in enumerate(df):
    tmpt = {
        'oid': t['oid'],
        'avgCPI': t['CPI']/t['totalPopulation']
    }
    tmpts.append(tmpt)
# 上面将需要更新的内容按照oid储存成数组，下面可以直接放在api里更新
r = requests.post(host+'/dwf/v1/omf/entities/Data/objects-update',
    headers=header,
    json=tmpts)
```
上面计算`avgCPI`的过程中由于部分同学表格里类型是字符串，所以需要加上float()进行类型转换，其实这一步可以在sql查询时使用cast转换；另外由于一些同学数据里可能有空行，所以需要加上判断
```python
df = r.json()['data']
tmpts = []
for i,t in enumerate(df):
    if 'CPI' in t.keys():
        tmpt = {
            'oid': t['oid'],
            'avgCPI': float(t['CPI'])/float(t['totalPopulation'])
        }
        tmpts.append(tmpt)
# 上面将需要更新的内容按照oid储存成数组，下面可以直接放在api里更新
r = requests.post(host+'/dwf/v1/omf/entities/Data/objects-update',
    headers=header,
    json=tmpts)
```



之后你可以检查你的数据库看是否更新

+ 如果我们本地测试没有问题了，那么可以将这个脚本上传到dwf上，可以利用之前在part2里创建的`脚本文件`的实体类表单，上传附件功能。
  - 上传完脚本文件后，记录对应的`oid`，之后获取文件路径需要
+ 如果你有权限直接接触到后端服务器，那么可以直接将脚本文件创建在某个文件夹下，路径由自己管理
## 调用你的python脚本
在part2部分，我曾经讲过调用python脚本，此处引用那里的内容
+ 在做这个操作前，确保你的脚本能够在本地运行，这个事情很重要，因为DWF里看不到脚本文件执行的输出结果，你是无法知道它的出错位置
+ 获得脚本文件路径
+ 执行脚本
此处我们需要创建一个按钮，并添加操作后端脚本
```javascript
//获取文件路径，下面的实体类Script按照你上传的实体类名称为准
oid='49419988FD6E044799061CE396AE3DED'
var scriptPath = this.omf.getFilePath(oid, 'Script', 'scriptFile');
//执行脚本,反引号将变量替换成值
this.sh.execute(`python3 ${scriptPath}`)
```
## 注意事项
**务必不要将带有密码的脚本文件以public推到github或者其它方式公开**，会暴露你的dwf登录密码，有安全隐患
