# 随身WiFi
参考：[openstick项目](https://www.kancloud.cn/handsomehacker/openstick/2636505)

芯片主要有高通410，ASR，紫光展锐
## 高通410
+ Mifi: 管理页面为`192.168.100.1`，网页名为4G LTE WLan Router ，nmap扫描仅开放了3个端口，没有adb的端口，adb无法无线连接，也无ssh端口
```shell
$ nmap 192.168.100.1
Starting Nmap 7.94 ( https://nmap.org ) at 2024-03-25 20:44 й׼ʱ
Nmap scan report for 192.168.100.1
Host is up (0.0052s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE
53/tcp   open  domain
80/tcp   open  http
8000/tcp open  http-alt
MAC Address: 5C:A0:00:C8:94:97 (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 17.91 seconds
```
+ 拆开后PCB上丝印层有`MF601SL_CT_V07`，`STM-5`字样，[这里](https://www.bilibili.com/video/BV111421D7P9/?vd_source=da68eeb8cef88094046fa7a8e87d32e9)给了v03,v05,v06改串去云控的焊接方式。
![](https://jiemahao.com/wp-content/uploads/2023/03/buy-portable-wifi-by-chips-6.jpg?ezimgfmt=rs:800x790/rscb30/ng:webp/ngcb29)
+ 仅保留电路板，连接usb，长按开机键，reset键，我都按了，最后设备管理中`其他设备`里出现`Android`表明成功识别
+ `adb reboot edl`进入Emergency 模式，可以看到9008端口，同时所有灯都会熄灭。此外短接也可以，[这里](https://www.bilibili.com/opus/837377412812505093)有我持有的板子的短接点。
+ `adb usb`启动，`adb shell`进入adb命令行，发现为MSM8916芯片（高通410）, 400M内存，2.4G可用的存储。切卡密码为`MIFI888888`。远程adbd端口被悄咪咪的改成了0，即禁用.
```shell
shell@msm8916_32_512:/ $ getprop|grep product
[ro.build.product]: [msm8916_32_512]
[ro.product.board]: [msm8916]
[ro.product.brand]: [qcom]
[ro.product.cpu.abi2]: [armeabi]
[ro.product.cpu.abi]: [armeabi-v7a]
[ro.product.device]: [msm8916_32_512]
[ro.product.locale.language]: [en]
[ro.product.locale.region]: [US]
[ro.product.manufacturer]: [unknown]
[ro.product.model]: [msm8916_32_512]
[ro.product.name]: [msm8916_32_512]
shell@msm8916_32_512:/ $ cat /proc/meminfo
MemTotal:         402336 kB
shell@msm8916_32_512:/ $ df
Filesystem               Size     Used     Free   Blksize
/dev                   196.5M   128.0K   196.3M   4096
/sys/fs/cgroup         196.5M    12.0K   196.4M   4096
/mnt/asec              196.5M     0.0K   196.5M   4096
/mnt/obb               196.5M     0.0K   196.5M   4096
/system                774.9M   329.9M   445.0M   4096
/data                    2.4G    12.7M     2.4G   4096
/cache                 122.0M    64.0K   121.9M   4096
/persist                27.5M    88.0K    27.4M   4096
/firmware               64.0M    44.5M    19.4M   16384
/mnt/shell/emulated      2.4G    12.7M     2.4G   4096
/mnt/shell/emulated/0     2.4G    12.7M     2.4G   4096
shell@msm8916_32_512:/ $ getprop|grep ufi
[persist.ufi.card.plug]: [yes]
[persist.ufi.ft.haveeth]: [0]
[persist.ufi.ft.only_sn]: [0]
[persist.ufi.ft.server]: [NONE]
[persist.ufi.ft.simsw]: [1]
[persist.ufi.ft.simsw_pw]: [1]
[persist.ufi.ft.simswitchpword]: [MIFI888888]
[persist.ufi.ft.weblogo]: [NORMAL]
[persist.ufi.ft.withmtp]: [0]
[persist.ufi.ft.write_imei]: [1]
[persist.ufi.name.imei.suffix]: [yes]
[persist.ufi.nosignal.reboot]: [no]
[persist.ufi.qhyl.light]: []
[persist.ufi.qhyl.switchsim]: []
[persist.ufi.signal.check]: [yes]
[persist.ufi.sim.pooling]: [no]
[persist.ufi.sim.prior]: [DE]
[persist.ufi.sn.auth.service]: [1]
[persist.ufi.test.light]: [yes]
[persist.ufi.wifi.light]: [yes]
shell@msm8916_32_512:/system $ getprop|grep adb
[init.svc.adbd]: [running]
[persist.adb.tcp.port]: [10242]
[persist.radio.adb_log_on]: [0]
[persist.sys.usb.config]: [diag,serial_smd,rmnet_bam,adb]
[ro.sys.usb.default.config]: [diag,serial_smd,rmnet_bam,adb]
[service.adb.tcp.port]: [0]
[sys.usb.config]: [rndis,serial_smd,adb]
[sys.usb.state]: [rndis,adb]
shell@msm8916_32_512:/ $ cat /sys/class/graphics/fb0/virtual_size
132,264
shell@msm8916_32_512:/ $ cat /sys/class/graphics/fb1/virtual_size
1280,1440
shell@msm8916_32_512:/ $ cat /sys/class/graphics/fb1/modes
U:1280x720p-14
# 帧缓冲设备fb0已经被修改成无法使用的状态
shell@msm8916_32_512:/ $ cat /sys/class/graphics/fb0/modes
U:132x132p-0
```
之后可以做的事情
+ Android下
  + 开启远程adb: `setprop service.adb.tcp.port 5555`
  + [tmux](https://github.com/alwaystest/Blog/issues/68)[Adroid 通过tmux安装青龙](https://www.cnblogs.com/ymer/p/17590569.html)，因为Android下安装docker需要重新编译Android开启一些功能。
  + 截屏并保存至本地：` ./adb shell screencap -p /sdcard/screen.png` `./adb pull /sdcard/screen.png` 
  + 输入按键：如tab,enter `./adb shell input keyevent KEYCODE_ENTER` 
  + ARDC安装: 安卓系统为4.4.4,非常旧，因此选用年代久远的[ARDC](https://www.cnblogs.com/we-hjb/p/10989928.html)（找不到官网）;[scrcpy](https://github.com/Genymobile/scrcpy/blob/master/doc/windows.md) 不能在android 5以下工作
    + 当前launcher: `dumpsys window windows|grep mCurrentFocus`
    + 更换launcher: `adb shell pm disable-user 当前的launcher`
  + [`scrcpy`](https://github.com/Genymobile/scrcpy): 使用截屏进行投屏操作
  + Linux Deploy: 提供bash环境，有类似[参考](https://blog.csdn.net/gtj0617/article/details/125697173)
  + 关闭热点，切换为wifi
  + [配置修改](https://www.coolapk.com/feed/37834896?shareKey=OTQ3NWNhOTZkY2UwNjJkZjRhNDI)
+ QPT备份分区，包含`boot.img`
+ 提取dtb：
  + 使用[android-unpackbootimg](https://github.com/osm0sis/mkbootimg)分解`boot.img`得到`boot.img-dtb`
  + 使用[extract-dtb](https://pypi.org/project/extract-dtb/)提取得到dtb文件 `extract-dtb boot.img-dtb`
  + 检查原先系统使用的dtb`shell@msm8916_32_512:/ $ cat /proc/device-tree/model`，输出为`Qualcomm Technologies, Inc. MSM 8916 512MB MTP`
  + `sudo apt install device-tree-compiler`：使用dtc产生dts `for i in `ls *8916*.dtb`;do dtc -I dtb -O dts -o $i.dts $i;done`，检查dts文件，找到包含上述model的dts

+ 刷入Armbian
  + [酷安410刷机参考](https://www.coolapk.com/feed/37834896?shareKey=OTQ3NWNhOTZkY2UwNjJkZjRhNDI) [csdn 410刷机教程](https://blog.csdn.net/qq_44774198/article/details/129812022)
## ASR
[官网](https://www.asrmicro.com/proinfo/1.html)
## 紫光展锐

## 高通
[9008模式](https://www.xgiu.com/msm_4gwifi_9008debug)

## OpenStick
`OpenStick`中的`flash.bat`，[高通芯片分区结构](https://www.cnblogs.com/schips/p/partition_table_on_qualcomm.html)
+ [`aboot`](https://zhuanlan.zhihu.com/p/424136113)[Blog](https://blog.inoki.cc/2021/10/17/android-bootloader-analysis-aboot/index.html)：首先刷写`aboot`分区
  + [`aboot`解析](http://www.newandroidbook.com/Articles/aboot.html)，[blog](https://alan717.github.io/aboot.html)
  + [opnstick中的aboot编译其实是lk bootloader](https://www.kancloud.cn/handsomehacker/openstick/2637566),[博客](https://techie-s.work/posts/2022/08/openstick-msm8916-part2-new-device/)
+ `linux`编译教程:[宁宁](https://web.archive.org/web/20230527081539/https://momoe.ml/shizuku/065919.html)[博客](https://yanhy.top/index.php/archives/333/)
