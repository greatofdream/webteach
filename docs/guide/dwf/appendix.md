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

