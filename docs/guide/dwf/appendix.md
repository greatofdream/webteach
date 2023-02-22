# 附录
## 代码编辑器

代码编辑器是基于`vscode`的web界面，支持以下特性
+ 上传文件:右键文件夹点击`upload`
+ 启动命令行: 菜单栏中`terminal`

需要注意**鼠标右键**的浏览器菜单默认禁止

如果开发环境对应域名为`[url]`，那么各个应用链接为
+ 模型开发端:`[url]/dwf/modeler-web`
+ 应用端:`[url]/app-web`
+ 代码编辑器:`[url]/code-server`
+ `postgresql` web端: [url]/pgadmin4/browser

默认当前用户为`dwfcoder`

## IoTDB
启动IoTDB cli
```shell
cd /opt/apache-iotdb-0.13.1-SNAPSHOT-all-bin
./sbin/start-cli.sh
```
将名称为`/home/dwfcoder/data/4D_11_withtime.csv`的csv导入IoTDB
```
/tools/import-csv.sh -h localhost -p 6667 -u root -pw  root -f /home/dwfcoder/data/4D_11_withtime.csv -aligned false
```
## sql查询
dwf里面的sql查询分为快速查询和原生查询
+ 快速查询：HQL(Hibernate Query Language)的where后面的语法,
```sql
order by obj.createTime
```
+ 原生查询: SQL的默认语法
```sql
select plt_creator as "creator",plt_oid as "oid",plt_owner as "owner",plt_lastmodifytime as "lastModifyTime",plt_lastmodifier as "lastModifier",plt_id as "id",plt_currentprocess as "currentProcess",plt_createtime as "createTime",plt_roomname as "roomName",plt_roomtype as "roomType",plt_installationdate as "installationDate",plt_assetstate as "assetState",plt_operatinghours as "OperatingHours",plt_alarmcount as "alarmCount",plt_numberofseats as "numberofseats",  CONCAT(round(plt_satisfaction*100),'%')  as "satisfaction",plt_locationx as "locationX",plt_locationy as "locationY",plt_roomicon as "roomIcon" from plt_cus_romm2  where 1=1 order by "createTime"
```
## 内置函数
+ `app-web`使用`数据导入`功能
	+ 配置一个按钮，选择事件为implement，选择插件，查找数据导入
