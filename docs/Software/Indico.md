# Indico


## 版本1.9
+ 启动ZODB
```shell
apt install python-zdaemon
apt install python-ZODB
zdaemon -C etc/zdctl.conf start
```
+ 使用uwsgi
```shell
apt install libapache2-mod-wsgi
```
+ 编译indico的程序,但是卡住了
```
git clone
apt install python-babel python-xlsxwriter
```
+ 找到了一个[indico v1.9.6的docker](https://github.com/XeCycle/indico-docker)
+ `Temporary failure in name resolution`: `daemon.js`里设置了`iptables`和`bridge`
+ `No address associated with hostname`: 
