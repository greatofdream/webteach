# 随身WiFi
参考：[openstick项目](https://www.kancloud.cn/handsomehacker/openstick/2636505)

芯片主要有高通410，ASR，紫光展锐

[关于Openstick项目未提到的官方仓库更新](https://iovxw.net/p/msm8916/#continue-reading)，[Pull request](https://github.com/msm8916-mainline/lk2nd/pull/133)
+ [发现`MF601`等型号已经被官方仓库支持](https://github.com/msm8916-mainline/lk2nd/blob/main/lk2nd/device/dts/msm8916/msm8916-512mb-mtp.dts#L20),在issue133中我询问了为何LK1ST的Flag消失了，被告知LK2ND仓库升级，需要按照[文档](https://github.com/msm8916-mainline/lk2nd/blob/main/Documentation/building.md#lk1st-specific)中编写Flag。
+ [github仓库](https://github.com/cm9vdA/build-linux/tree/master)中包含了MF601SL的dts: `others/*-fix`是和我反编译结果近似的

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
  + [博客](https://forum.armbian.com/topic/14752-device-tree-translation/)均说无法将android的dts转为linux的dts。
+ `gpio`:使用顶层模式复用器（TLMM），但是我在linux kernel的仓库中根本找不到这个关键字
```shell
$ cat /sys/kernel/debug/gpio
GPIOs 902-1023, platform/1000000.pinctrl, msm_tlmm_v4_gpio:
 gpio-914 (spk_ext_pa_gpio     ) out lo
 gpio-922 (LED_14              ) out lo
 gpio-923 (LED_13              ) out lo
 gpio-924 (LED_12              ) out lo
 gpio-926 (SIM_EN              ) out lo
 gpio-936 (key_freset          ) in  hi
 gpio-951 (SIM_SEL             ) out lo
 gpio-952 (ESIM_SEL            ) out hi
 gpio-953 (ESIM2_SEL           ) out lo
 gpio-1009 (key_wps             ) in  hi
 gpio-1012 (LED_1               ) out lo
 gpio-1014 (WIFI_S              ) out hi
 gpio-1015 (4G_R                ) out hi
 gpio-1016 (4G_G                ) out lo
 gpio-1017 (BAT_R               ) out lo
 gpio-1018 (BAT_G               ) out lo
 gpio-1019 (LED_7               ) out lo
 gpio-1020 (LED_8               ) out lo
 gpio-1021 (LED_9               ) out lo
 gpio-1022 (LED_10              ) out lo
 gpio-1023 (LED_11              ) out lo
$  $ cat /sys/kernel/debug/pinctrl/1000000>
GPIO ranges handled:
0: gp GPIOS [902 - 1023] PINS [0 - 121]
```
+ 分析dts文件，并尝试发现需要设置`NO_PULL`在LK1ST中控制LED，详细修改在[repo](https://github.com/greatofdream/lk2nd/commit/e50bbd3837a2d31a5572974b4dcaed25e5ae5c0d)；注意`gpio_tlmm_config`设置后还需要设置电平，参考了[博客](https://blog.csdn.net/LXJSWD/article/details/127897753)
```shell
make TOOLCHAIN_PREFIX=arm-none-eabi- lk1st-msm8916 LK2ND_BUNDLE_DTB=msm8916-512mb-mtp.dtb LK2ND_COMPATIBLE=zhihe,various
# There is no ST3755 panel in LK2ND, Flag is LK2ND_PANEL
```
+ `edl`检查是否有secureboot
```shell
$ sudo edl secureboot
Qualcomm Sahara / Firehose Client V3.62 (c) B.Kerler 2018-2025.
main - Trying with no loader given ...
main - Waiting for the device
main - Device detected :)
sahara - Protocol version: 2, Version supported: 1
main - Mode detected: sahara
sahara -
Version 0x2
------------------------
HWID:              0x007050e100000000 (MSM_ID:0x007050e1,OEM_ID:0x0000,MODEL_ID:0x0000)
CPU detected:      "MSM8916"
PK_HASH:           0xcc3153a80293939b90d02d3bf8b23e0292e452fef662c74998421adad42a380f
Serial:            0x0a9707ea

sahara - Possibly unfused device detected, so any loader should be fine...
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/longcheer/007050e100000000_3022817d373fd7f9_fhprg_peek.bin
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/lenovo_motorola/007050e100000000_99c8c13e374c34d8_fhprg_peek.bin
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/qualcomm/factory/msm8916/007050e100000000_8ecf3eaa03f772e2_fhprg_peek.bin
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/qualcomm/factory/msm8916/007050e100000000_394a2e47cf830150_fhprg_peek.bin
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/cyanogen/007050e100000000_d36c6073c9c2cb1c_fhprg_peek.bin
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/cyanogen/007050e100000000_4614048173062ae4_fhprg_peek.bin
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/cyanogen/007050e100000000_4e3eefa63a67eb7a_fhprg_peek.bin
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/xiaomi/007050e100000000_278448179ac756a1_fhprg_peek.bin
sahara - Possible loader available: /usr/lib/python3.13/site-packages/edlclient/../Loaders/xiaomi/007050e100000000_50838757eab7c632_fhprg_peek_wt88047.bin
sahara - Trying loader: /usr/lib/python3.13/site-packages/edlclient/../Loaders/longcheer/007050e100000000_3022817d373fd7f9_fhprg_peek.bin
sahara - Protocol version: 2, Version supported: 1
sahara - Uploading loader /usr/lib/python3.13/site-packages/edlclient/../Loaders/longcheer/007050e100000000_3022817d373fd7f9_fhprg_peek.bin ...
sahara - 32-Bit mode detected.
sahara - Firehose mode detected, uploading...
sahara - Loader successfully uploaded.
main - Trying to connect to firehose loader ...
firehose_client
firehose_client - [LIB]: No --memory option set, we assume "eMMC" as default ..., if it fails, try using "--memory" with "UFS","NAND" or "spinor" instead !
firehose
firehose - [LIB]: !DEBUG! rsp.data: 'bytearray(b'<?xml version="1.0" encoding="UTF-8" ?><data><log value="logbuf@0x0801BDA8 fh@0x08018C10" /></data>')'
firehose - TargetName=MSM8916
firehose - MemoryName=eMMC
firehose - Version=1
firehose - Trying to read first storage sector...
firehose - Running configure...
firehose_client - Supported functions:
-----------------
Sec_Boot0 PKHash-Index:0 OEM_PKHash: False Auth_Enabled: FalseUse_Serial: False
Sec_Boot1 PKHash-Index:0 OEM_PKHash: False Auth_Enabled: FalseUse_Serial: False
Sec_Boot2 PKHash-Index:0 OEM_PKHash: False Auth_Enabled: FalseUse_Serial: False
Sec_Boot3 PKHash-Index:0 OEM_PKHash: False Auth_Enabled: FalseUse_Serial: False
Secure boot disabled.
```
+ fastboot 的lk日志
```
[10] platform_init()                                                            
[10] Configured XPU violations to be fatal errors                               
[10] target_init()                                                              
[60] Done initialization of the card                                            
[80] pm8x41_get_is_cold_boot: Warm boot                                         
[80] oem_panel_select hw_id=8                                                   
[90] oem_panel_select hw_subtype=0                                              
[90] Not able to search the panel:                                              
[90] oem_panel_select panel_id=9                                                
[90] init ST7735S_128128_SPI_CMD_PANEL                                          
[280] Panel power on done                                                       
[280] ERROR: Splash image header invalid                                        
[290] Config SPI PANEL.                                                         
[290] target_panel_dc_gpio pin =23                                              
[290] Turn on SPI PANEL.                                                        
[530] pm8x41_get_is_cold_boot: Warm boot                                        
[540] fastboot_init()                                                           
[540] Loading keystore failed status 2 [640] USB init ept @ 0x8f694000          
[660] udc_start()                                                               
[760] -- reset --                                                               
[760] -- portchange --                                                          
[1070] fastboot: processing commands
```
+ [修改分辨率](https://blog.csdn.net/guation/article/details/130507652)
+ 刷入Armbian
  + [酷安410刷机参考](https://www.coolapk.com/feed/37834896?shareKey=OTQ3NWNhOTZkY2UwNjJkZjRhNDI) [csdn 410刷机教程](https://blog.csdn.net/qq_44774198/article/details/129812022)
+ openwrt进入failsafe模式:反复按enter键
```shell
Press the [f] key and hit [enter] to enter failsafe mode                        
Press the [1], [2], [3] or [4] key and hit [enter] to select the debug level
```
+ [刷完debian使用RNDIS连接](https://www.wlplove.com/archives/97/)

## ASR
[官网](https://www.asrmicro.com/proinfo/1.html)
## 紫光展锐

## 高通
[9008模式](https://www.xgiu.com/msm_4gwifi_9008debug)

## OpenStick
`OpenStick`中的`flash.bat`，[高通芯片分区结构](https://www.cnblogs.com/schips/p/partition_table_on_qualcomm.html)
+ [`aboot`](https://zhuanlan.zhihu.com/p/424136113)包含了fastboot，`adb reboot bootloader`会停在这里；[Blog](https://blog.inoki.cc/2021/10/17/android-bootloader-analysis-aboot/index.html)：首先刷写`aboot`分区
  + [`aboot`解析](http://www.newandroidbook.com/Articles/aboot.html)，[blog](https://alan717.github.io/aboot.html)
  + [opnstick中的aboot编译其实是lk bootloader](https://www.kancloud.cn/handsomehacker/openstick/2637566),[博客](https://techie-s.work/posts/2022/08/openstick-msm8916-part2-new-device/)
  + [`lk2nd`项目中`rules.mk`加入了自定义的`msm8916-4g-wifi.dtb`](https://github.com/OpenStick/lk2nd/blob/c4075ddfcb576bf137227889fe606b324f611944/dts/msm8916/rules.mk#L34)即可编译出所需的bootloader.[修改lk的博客](https://blog.csdn.net/github_38345754/article/details/121481021)
+ `linux`编译教程:[宁宁](https://web.archive.org/web/20230527081539/https://momoe.ml/shizuku/065919.html) [宁宁博客新地址](https://170721.xyz/shizuku/065919.html) [博客](https://yanhy.top/index.php/archives/333/)
  + `CROSS_COMPILE=aarch64-linux-gnu- ARCH=arm64 make dtbs`编译DTB文件
  + 由于OpenStick相关教程均将dtb打包到zImage后，需要[`split-appended-dtb`](https://github.com/MoetaYuko/split-appended-dtb)工具将其剥离。

## 参考
+ `./include/dt-bindings/gpio/gpio.h`: GPIO状态变量
+ `./scripts/dtc/include-prefixes/dt-bindings/input/linux-event-codes.h`: KEY定义
## 葡萄雨开发板手册
[手册](https://www.graperain.cn/MSM8916/download/%E9%AB%98%E9%80%9A%E9%AA%81%E9%BE%99410%E7%B3%BB%E5%88%97MSM8916%E5%BC%80%E5%8F%91%E6%9D%BF%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.pdf) [核心板硬件指南](https://www.graperain.com/MSM8916/download/Qualcomm%20MSM8916%20System%20on%20Module%20Hardware%20Instruction%20(%20China%20Mobile%20).pdf)

## DragonBoard
[手册](https://github.com/96boards/documentation/tree/master/consumer/dragonboard/dragonboard410c)
+ 随身 WiFi 自带的 TrustZone 固件不支持 64 位内核, 现有的方案都需要让用户先刷入一个 "底包" 。
+ 刷入底包的脚本一般都会备份并恢复原厂的 fsc fsg modemst1 modemst2 分区出来 

## EDL工具
[edl](https://github.com/bkerler/edl):需要在root身份下使用。
无法在WSL里使用，因为WSL访问usb需要经过`usbipd`绑定usb至WSL，但处于9008模式不能被`ipdusb`识别。

## Openwrt
[芷荷随身 4G 上网卡刷入 OpenWrt 教程](https://github.com/1715173329/blog/issues/3)

## 問題
+ 串口輸出卡死,可能是dtb问题
```shell
[550] qcom,msm-id entry not found                                               
[560] Only one appended non-skales DTB, select it.
[  125.957624] random: crng init done
```
+ `kernel panic`: [知乎回答](https://www.zhihu.com/question/530997689)建议按照[kernel debug流程](https://linux-kernel-labs.github.io/refs/heads/master/lectures/debugging.html#decoding-an-oops-panic)检查
  + `msm8916.dtsi`注明了需要在bootloader中放入内存大小
+ `OpenWrt`中的failsafe模式可以启动，需要狂按enter键触发。
+ boot.img制作时使用的`offset`的值，在[这里](https://wiki.postmarketos.org/wiki/Deviceinfo_reference)提到是用于fastboot进行flash时使用。Openstick教程中的编译指令其实来自于[Dragonboard410c的指南](https://www.kancloud.cn/handsomehacker/openstick/2637565)。
+ `gpt_both0.bin` 是[分区表](https://www.96boards.org/documentation/consumer/dragonboard/dragonboard410c/guides/customize-emmc-partition.md.html) `gdisk -l gpt_both0.bin`
+ 反复尝试jsfx的镜像，无法成功运行kernel
+ 下载了另外一个[完整镜像包]()，从中提取了boot.img，并结合UFI中的rootfs.img，成功启动一次，后续就会失败，原因不明，且无法复现成功经验。甚至直接刷入整个镜像也会报错。
