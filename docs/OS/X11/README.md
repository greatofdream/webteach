# X11
## SSH
ssh上X11-Forwarding原理介绍
https://goteleport.com/blog/x11-forwarding/
## Xpra
+ A终端中启动xpra服务器
```shell
xpra start :100
```
+ B终端远程或者A终端本地访问
```shell
xpra attach ssh://user@A/100
```
+ A终端运行gui程序
```shell
export DISPLAY=:100
xeyes
```
