# 开发板
|名称|CPU|GPU|RAM|ROM|
|-|-|-|-|-|
|Y10P10|A33/4核|Mali 400MP2|1GB|8GB|

## Linux Deploy
在旧的安卓手机运行linux，支持安卓4.4，其中[2.5.1以下版本可以支持Android4.4](https://github.com/meefik/linuxdeploy/releases) 2.5.1版本中`app/build.gradle`中`minSdkVersion 16`，后续版本升级了，无法支持android4.4
+ 由于TUNA不再支持http，但是linux deploy目前需要从http访问，所以建议更新到阿里云镜像。
+ 电池电量信息位于`/sys/class/power_supply/battery/`
+ 开机自启动：在`chroot`环境中无法使用systemctl，可以通过设置linux deploy的[初始化路径启动](https://www.cnblogs.com/Luad/p/10409048.html)
+ Language: `LANG=en_US.UTF-8`
+ [image size](https://github.com/meefik/linuxdeploy/issues/395): 需要先完全退出应用，保证当前image没有被挂载。可以在adb中通过`df`命令确认。
+ `Problem upragding to focal fossa 20.04 authenticate 'focal.tar.gz' against 'focal.tar.gz.gpg' Authentication failed`: [解决方案](https://askubuntu.com/questions/1254519/problem-upragding-to-focal-fossa-20-04-authenticate-focal-tar-gz-against-foca)
+ 注意需要`usermod -G 3003 root`，否则系统中root用户无法执行ping命令`socket: Permission denied`
+ [upgrade ubuntu](https://github.com/meefik/linuxdeploy/issues/1260)
  + 直接upgrade会出错`Authentication failed Authenticating the upgrade failed`: [github](https://github.com/meefik/linuxdeploy/issues/1192)里的issue提示可以更新key
  + 目前升级后apt会出现无法使用的问题`dpkg (subprocess): unable to execute package control information extraction (dpkg-deb): Bad address`。
+ `nodejs`:由于linux deploy支持到bionic18.04，所以nodejs版本很低v8.x，手动安装也只能装到`v16`，更高会缺少包
```shell
# 将仓库源更新到apt/sourcelist.d/
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
apt install nodejs
# 补充依赖库
apt install libatomic1
node -v
# cnpm
npm install cnpm -g --registry=https://registry.npmmirror.com
```
## Linux Deploy Pro
有人尝试在Linux deploy上提供后续 linux 发行版的支持，并且加入了github workflow。我[克隆了它](https://github.com/greatofdream/Linuxdeploy-Pro)，并尝试将其编译至支持安卓4.4版本，放在了`android_4`分支。
+ 我参考了原仓库在[不同分支上的diff](https://github.com/meefik/linuxdeploy/compare/2.5.1...master)
+ [github workflow doc](https://docs.github.com/en/actions/reference/workflows-and-actions)
+ [Gradle wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper_basics.html):对gradle不是特别熟悉，返现`-Pvalue`传参给`setting.gradle`后可以直接索引变量名称
+ 我将Linux Deploy Pro中添加新的镜像的commit cherry-pick到`v2.5.1`分支，使其能在旧手机安卓4.4支持下的同时，可以安装更新的版本，[apk下载](https://github.com/greatofdream/Linuxdeploy-Pro/releases/tag/2.5.1)，测试了ubuntu [focal会出现dpkg错误](https://github.com/meefik/linuxdeploy/issues/1255)，，更高的版本不行，比如`jammy`依赖`zstdcat`，但是旧的安卓上没有可用的`busybox`。
+ `alphine`可以完美支持。
  + crond 的service没有安装，根据[回答](https://gitlab.alpinelinux.org/alpine/aports/-/issues/10907?__goaway_challenge=cookie&__goaway_id=31ba68cdc8eada90780d5295cfe6c719&__goaway_referer=https%3A%2F%2Fwww.google.com%2F)中提到的内容，需要手动安装`apk add busybox-openrc`，会在`/etc/init.d/`中增加`crond`。

## cloudflared
`alpine`中可以引入在`/etc/apk/repositories`引入`http://dl-cdn.alpinelinux.org/alpine/edge/testing`
+ `apk add cloudflared cloudflared-openrc`
+ 根据[manual](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/local-management/create-local-tunnel/)在`/etc/cloudflared/config.yml`加入内容
```shell
url: http://localhost:8000
tunnel: 0010ec29-2b77-4207-977e-1f2e04f5e5c4
```
+ 根据网站上带有token的命令手动启动进程，国内运营商似乎会禁用udp的流量，所以[默认的`quic`协议会不工作](https://www.huluohu.com/posts/514/)，因此需要加上`--protocol auto`（实测仍然不行）或者用`--protocal http2`，token的值可以在`cloudflare`的`ZeroTrust-Network`里找到。
```shell
 cloudflared tunnel --protocol auto run --token <你的token>
```

启动nginx：
+ `apk add openrc`, `touch /run/openrc/softlevel`
+ [设置网络loop](https://stackoverflow.com/questions/69218786/error-cannot-start-nginx-as-networking-would-not-start-on-alpine-docker-image): `echo 'rc_provide="loopback net"' >> /etc/rc.conf`

ssh 连接
[文档](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/)
+ 有多种方式保护连接，如[使用浏览器界面](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-browser-rendering/)，[相关的教程](https://blog.merack.top/wu-xu-gong-wang-ip-tong-guo-cloudflare-tunnelsshi-xian-sshan-quan-nei-wang-chuan-tou.html)

## Android 远程
+ ARDC
+ [Android Screen Share](https://github.com/android-notes/androidScreenShare.git)
+ [仿360](https://gitcode.com/JianBiHua/qt_phone_helper/blob/master/threads/connectionthread.cpp)
+ 360手机助手：使用360手机助手连接，之后进入默认安装目录`C:\Program Files (x86)\360\360Safe\mobilemgr\PhoneCtrl`，使用该目录下进入`adb shell`，当前没有root权限，在360手机助手里选择一键ROOT，成功后即可`su`进入root身份，可以看到`/system/bin/su`已经被更新了，用户组为shell，有可执行权限。
  + 由于手机助手会开启多个后台进程：识别手机连接模块，即使退出软件后，该进程也会唤起软件，需要及时手动关闭；`MMReminder`会显示屏幕保护，需要关闭该软件设置里的屏保。
## 设备树
+ [设备树规范文档 中文翻译](https://github.com/Sunrisepeak/devicetree-specification-chinese/tree/main)
+ [知乎上的一个简短介绍](https://zhuanlan.zhihu.com/p/639496875)
+ [zephy文档 gpios](https://docs.zephyrproject.org/latest/build/dts/api/bindings/led/gpio-leds.html) 
+ [S3C2440由于无dts，所以难以适配Linux3.0之后的版本](https://www.cnblogs.com/iot-yun/p/11403498.html)
