# 开发板
|名称|CPU|GPU|RAM|ROM|
|-|-|-|-|-|
|Y10P10|A33/4核|Mali 400MP2|1GB|8GB|

## Linux Deploy
在旧的安卓手机运行linux，支持安卓4.4，其中[2.5.1以下版本可以支持Android4.4](https://github.com/meefik/linuxdeploy/releases)
+ 电池电量信息位于`/sys/class/power_supply/battery/`
+ 开机自启动：在`chroot`环境中无法使用systemctl，可以通过设置linux deploy的[初始化路径启动](https://www.cnblogs.com/Luad/p/10409048.html)

## Android 远程
+ ARDC
+ [Android Screen Share](https://github.com/android-notes/androidScreenShare.git)
+ [仿360](https://gitcode.com/JianBiHua/qt_phone_helper/blob/master/threads/connectionthread.cpp)
## 设备树
[设备树规范文档 中文翻译](https://github.com/Sunrisepeak/devicetree-specification-chinese/tree/main)
[知乎上的一个简短介绍](https://zhuanlan.zhihu.com/p/639496875)
