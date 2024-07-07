# 手机
## Bonway V100
[拆解过程](https://blog.csdn.net/zaq15csdn/article/details/124700093)
+ Android 4.4
+ 使用360手机助手连接，之后进入默认安装目录`C:\Program Files (x86)\360\360Safe\mobilemgr\PhoneCtrl`，使用该目录下进入`adb shell`，当前没有root权限，在360手机助手里选择一键ROOT，成功后即可`su`进入root身份，可以看到`/system/bin/su`已经被更新了，用户组为shell，有可执行权限。
+ cpu为[mt6732](https://www.mediatek.cn/products/smartphones-2/mt6732)
```shell
shell@V100:/ $ cat /proc/meminfo
cat /proc/meminfo
MemTotal:         921628 kB
shell@V100:/ $ getprop|grep product
[ro.build.product]: [huaqin6752_lwt_b1c_kk]
[ro.product.board]: [V100]
[ro.product.brand]: [BOWAY]
[ro.product.countrycode]: [US]
[ro.product.cpu.abi2]: [armeabi]
[ro.product.cpu.abi]: [armeabi-v7a]
[ro.product.device]: [V100]
[ro.product.locale.language]: [zh]
[ro.product.locale.region]: [CN]
[ro.product.manufacturer]: [BOWAY]
[ro.product.model]: [V100]
[ro.product.name]: [V100]
[ro.products.factorylid]: [74]
shell@V100:/ $ cat /proc/cpuinfo
cat /proc/cpuinfo
Processor       : ARMv7 Processor rev 2 (v7l)
processor       : 0
BogoMIPS        : 26.00
Features        : swp half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xd03
CPU revision    : 2

Hardware        : MT6732
Revision        : 0000
Serial          : 0000000000000000
shell@V100:/ $ getprop|grep adb
getprop|grep adb
[init.svc.adbd]: [running]
[persist.service.adb.enable]: []
[persist.sys.usb.config]: [mtp,adb]
[ro.adb.secure]: [0]
[service.adb.tcp.port]: [5556]
[sys.usb.config]: [mtp,adb]
[sys.usb.state]: [mtp,adb]
root@V100:/ # ls /system/bin/su -l
ls /system/bin/su -l
-rwxr-xr-x root     shell      109252 2024-03-31 11:14 su
shell@V100:/ $ getprop ro.build.version.release
getprop ro.build.version.release
4.4.4
shell@V100:/ $ getprop ro.build.version.sdk
getprop ro.build.version.sdk
19
```
+ 由于android版本过老，无法安装网上可以找到的`tmux`版本，可预见只能刷机。
+ 找到支持Android4.4的`Linux Deploy`
  + 由于sdcard处于`nosuid`模式下，导致无法在chroot后进入su模式，重新remount sdcard
  + 为了解决问题，只能将linux deploy中的用户改为root，这样登录就可以以root直接登入，就不用使用sudo切换身份
  + 自动分配空间只有2G，最好需要手动设置一个空间，省得之后还要resize2fs。
  + `启动`会mount镜像，`停止`会umount镜像，可以查看挂载的变化
+ 可以安装`ksweb`直接变成web服务器
