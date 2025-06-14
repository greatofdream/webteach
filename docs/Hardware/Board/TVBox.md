# 电视盒子
写入[Armbian]()，国内大佬搞了一个[Armbian对不同芯片的Armbian镜像列表](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/README.cn.md)
+ [非常详细的编译过程，值得反复阅读](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.cn.md)
+ [坑](https://github.com/ophub/amlogic-s9xxx-armbian/issues/491)
+ [镜像地址](https://github.com/ophub/amlogic-s9xxx-armbian/releases),需要选择自己的芯片型号
+ [github build](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/.github/workflows/build-armbian-server-image.yml#L316)默认使用odroidn2编译armbian，然后通过rebuild脚本更换相应的uboot与dtb。
  + [这里](https://doc.embedfire.com/lubancat-mp157/build_and_deploy/zh/latest/building_image/devicetree_introduce/devicetree_compile.html)提供了更新dtb的方式

Armbian烧写命令`armbian-install`
+ [Guide](https://docs.armbian.com/User-Guide_Getting-Started)
+ [FAQ](https://forum.armbian.com/topic/7875-how-nand-sata-install-works/)

## 配置
+ `dtb`文件:Device Tree Blob）文件在Linux启动的早期阶段起作用。具体来说，DTB文件的使用通常发生在以下步骤：
  + 引导加载器阶段：当系统启动时，引导加载器（如U-Boot、Grub等）会首先执行。引导加载器的任务是加载内核映像和设备树到内存中。引导加载器会读取DTB文件，并将其加载到内存中的特定位置。
  + 内核启动阶段：引导加载器将控制权交给内核后，内核会开始执行初始化过程。在这个过程中，内核会解析内存中的DTB数据。内核使用这些数据来了解硬件的配置信息，并据此初始化硬件设备和设备驱动。
## 天猫盒子
|型号|CPU|内存|主存储器|
|-|-|-|-|
|M17|S905x(4核)|1GB|8GB|

+ [一些天猫盒子的短接方式](https://www.znds.com/tv-82019-1-1.html)
### M17
+ M17背面有1个USB接口，网口，HDMI接口，所以需要一个usb拓展坞。M17的电路板上有一个JTAG的四个点，但是需要[焊接](https://www.znds.com/tv-1201420-1-1.html)。
+ 直接接上u盘并不能直接启动
烧写过程
+ ADB测试无权限
  + 在原有系统中进入设置，选择开发者模式打开
  + `adb connect <盒子的IP>`，盒子会弹出确认框，选择确认
  + `adb shell`进入命令行: 显示`shell@MagicBox_M17`，测试表明权限过低，无法执行`reboot update`,`dd`操作,`fdisk -l`也无任何输出
+ 串口烧写测试：盒子上有4个触点，从左到右分别为VCC,RX,TX,GND，连接USB转串口的线缆到电脑，打开串口终端，上电后不停的按`Enter`，详见后续章节。测试VCC和GND为TTL电平。波特率设置为115200。注意焊接温度要调到350度以上才能让触点处的焊锡融化。
  + 使用了一个CH340的USB转RS232串口的线缆，估计里面还有一个TTL转RS232的芯片，测试表明VCC和GND之间电平为RS232电平。RS232电平标准为-3V为0，3V为1。直接连接在盒子的串口上打印的均为乱码。 
  + 需要使用usb转TTL电平的串口芯片，手头上暂时没有单独的CH340，找到了一个WCH549G的芯片替代。输出正常，为root身份。
```shell
root@MagicBox_M17:/ # getprop|grep product

[ro.build.product]: [MagicBox_M17]
[ro.product.board]: [MagicBox_M17]
[ro.product.brand]: [MBX]
[ro.product.cpu.abi2]: [armeabi]
[ro.product.cpu.abi]: [armeabi-v7a]
[ro.product.cpu.abilist32]: [armeabi-v7a,armeabi]
[ro.product.cpu.abilist64]: []
[ro.product.cpu.abilist]: [armeabi-v7a,armeabi]
[ro.product.device]: [MagicBox_M17]
[ro.product.firmware]: [00502001]
[ro.product.locale.language]: [zh]
[ro.product.locale.region]: [CN]
[ro.product.manufacturer]: [Tmall]
[ro.product.model]: [MagicBox_M17]
[ro.product.name]: [MagicBox_M17]
[ro.product.otaupdateurl]: [http://10.28.11.53:8080/otaupdate/update]
[ro.yunos.product.board]: [mango]
[ro.yunos.product.chip]: [amlogic_m8]
[ro.yunos.product.device]: [MagicBox_M17]
[ro.yunos.product.lang]: [CN]
[ro.yunos.product.model]: [MagicBox]
[ro.yunos.product.region]: [CN]
[ro.yunos.product.vendor]: [amlogic]
root@MagicBox_M17:/ # getprop ro.build.version.release

6.1.0-RS-20200706.2216
root@MagicBox_M17:/ # cat /proc/cpuinfo

Processor	: ARMv8 Processor rev 4 (v8l)
processor	: 0
Features	: fp asimd evtstrm aes pmull sha1 sha2 crc32 wp half thumb fastmult vfp edsp neon vfpv3 tlsi vfpv4 idiva idivt 
CPU implementer	: 0x41
CPU architecture: 7
CPU variant	: 0x0
CPU part	: 0xd03
CPU revision	: 4

Hardware	: Amlogic
Serial		: 210a8200534acc8abe08cfe16352e09b
root@MagicBox_M17:/ #ls /sys/class/net/wlan0/device/driver/module -l
lrwxrwxrwx root     root              2024-07-14 19:42 module -> ../../../../module/8192eu
```
+ 检查package: M17使用YUNOS，但是还是Android的命令，不过里面没有浏览器，所以可玩性很差
```shell
# 列出包
pm list package
# 打开设置
am start -a android.settings.SETTINGS
```
+ [提取uboot文件](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.cn.md#1211-%E5%A6%82%E4%BD%95%E5%88%B6%E4%BD%9C-u-boot-%E6%96%87%E4%BB%B6)
  + [参考](https://docs.u-boot.org/en/latest/board/amlogic/khadas-vim.html),由于Amlogic没有提供固件的源码和工具制作bootloader的镜像，[所以需要从厂商的固件中提取`acs.bin`文件](https://github.com/unifreq/u-boot/blob/master/doc/board/amlogic/x96max-plus.rst#image-creation)，然后和uboot.bin一起使用[`amlogic-boot-fip`](https://github.com/LibreELEC/amlogic-boot-fip)工具打包成包含有BL1，BL2,BL3的bootloader。
  + 导出bootloader`dd if=/dev/block/bootloader of=/data/local/bootloader.bin`
  + 导出dtb `cat /dev/dtb >/data/local/mybox.dtb`
    + 反编译dtb: `dtc -I dtb -O dts -o xxx.dts xxx.dtb`. 如果出现错误`FATAL ERROR: Blob has incorrect magic number`，说明[dtb文件有偏移](https://wiki.postmarketos.org/wiki/Device_Tree_(dtb))
    + 使用`binwalk`判断offset的位置为`0x800`
    + `dd if=m17.dtb skip=$((0x800)) iflag=skip_bytes | dtc -I dtb -O dts -o m17.dts`成功导出m17的dts
  + 导出gpio `cat /sys/kernel/debug/gpio >/data/local/mybox_gpio.txt`
  + 使用`HxD`检查`bootloader.bin`,`200x`地址后里面均为乱码，应该是被加密过，无法生成新的uboot
+ 使用chain uboot:通过原有uboot引导另外一个uboot，[M16s的英文帖子](https://lists.denx.de/pipermail/u-boot/2022-July/488739.html)与[中文帖子](https://www.bilibili.com/read/cv18005318/)
  + 断电接电或者`reboot`命令启动盒子，键盘在串口终端输入`Enter`，直至uboot暂停启动，停止在`gxl_p212_v1#`
  + `printenv`显示`bootcmd=set_usb_boot 4;run storeboot`，对照其它命令，`4`是拒绝usb启动，而使用魔盒上的USB口则需要放弃该指令
  + [fatload](https://docs.u-boot.org/en/latest/usage/cmd/fatload.html)从FAT格式中读取文件, [usb start]()扫描usb终端
```shell
gxl_p212_v1#help set_usb_boot                                                   
set_usb_boot - set usb boot mode                                                
                                                                                
Usage:                                                                          
set_usb_boot [usb boot mode]/N                                                  
  support following [usb boot mode]:                                            
    1: CLEAR_USB_BOOT                                                           
    2: FORCE_USB_BOOT[default]                                                  
    3: RUN_COMD_USB_BOOT/recovery                                               
    4: PANIC_DUMP_USB_BOOT

setenv OLDBOOTCMD "set_usb_boot 4;run storeboot"
setenv USBBOOTCMD "usb start;if fatload usb 0 0x1000000 u-boot.bin; then go 0x1000000; fi;"
setenv bootcmd "run USBBOOTCMD; run OLDBOOTCMD; run storeboot"
saveenv
sleep 1
reboot
```
+ 自定义`M17`的uboot，我已经上传了一份更改过内存大小的uboot，并编译出[`uboot.bin`](https://github.com/greatofdream/u-boot/releases/tag/v1)，该文件产生大致流程为
  + `arch/arm/dts/meson-gxl-s905x-p212-M17.dts`, `arch/arm/dts/meson-gxl-s905x-p212-M17.dtsi`, `configs/p212_M17_defconfig`文件根据前文的一个参考博客修改而来，不过dts文件还需要对比确认，目前没有办法找到wifi。
  + `meson-gxl-s905x.dtsi`中是s905x芯片通用配置
  + `meson-gxl-s905x-p212-M17.dtsi`引用了`meson-gxl-s905x.dtsi`并定义了外设，首行为`/`代表根节点
  + `meson-gx.dtsi:          ethmac: ethernet@c9410000 {`定义了网卡
+ 配置启动U盘
  + 使用镜像烧写工具写入[armbian](https://github.com/ophub/amlogic-s9xxx-armbian/releases)
  + [自定义说明](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/documents/README.cn.md#1215-如何添加新的支持设备)提到的编译流程可以在对应项目的`rebuild`文件中找到，`uboot.bin`会被拷贝至`/boot`文件加，因此在第一个fat32分区中手动复制入`uboot.bin`，此外在`boot.cmd`中默认加载`uEnv.txt`，因此需要更新`uEnv.txt`中的dtb文件路径，默认是从项目中的`/model_database.conf`获取。
+ 启动系统，安装`Desktop`等，安装完会自动重启
  + 重启后始终无法进入桌面，并且会有一系列服务Failed，而且偶尔出现文件系统是只读状态，[github](https://github.com/ophub/amlogic-s9xxx-armbian/issues/785)上有人报告了类似问题，但并未解决。
```shell
apt update
armbian-software
# 输入201，可以选择安装Desktop
```
+ 图形
  + 按照[此处](https://github.com/ophub/amlogic-s9xxx-armbian/issues/802)写入xorg的conf文件
  + 安装窗口管理器`xfwm`，直接安装桌面，带有该管理器 `apt install xfce4`, 启动桌面`startx /usr/bin/xfce4-session`
```shell
apt install xorg x11-app lshw
lshw -C display
```
+ 调整Linux根目录分区大小，由于U盘有较多坏块，直接将后面的坏块全部压缩为另外一个分区，但是没有找到在线压缩分区的办法，所以只能换一块u盘了。对于扩容盘，可以采用扩展分区分方式。
```shell
fdisk /dev/sda
# 打印分区
p
# 删除需要扩展的分区，比如/dev/sda2就输入2
d
# 创建新分区，会提示指定分区编号，起始位置和终止位置，按照打印分区提供的信息调整填写
n
# 重写分区表
w
# 退出
q
# 调整文件系统大小
resize2fs /dev/sda2
```
+ 安装面板: `apt install docker.io docker-compose`
  + 创建`docker-compose.yml`
```shell
version: '2'
services:
  web:
    image: whyour/qinglong
    volumes:
      - "./data:/ql/data"
    ports:
      - "5700:5700" # 左边换成宿主机上未被占用的端口（Nginx需要同步更改)
    environment:
      QlBaseUrl: '/'
    restart: unless-stopped

```
  + 启动docker `docker-compose  up -d`
  + 通过浏览器访问`<盒子的IP>:5700`
+ 添加定时服务，比如[自动签到](/Tools/Sign.html)

+ 添加nes模拟器`apt install fceux`, fceux依赖于[nes-emulator](https://packages.debian.org/bullseye/nes-emulator)
+ 中文字体: `apt install ttf-wqy-zenhei`
+ 浏览器：`apt install firefox-esr`
+ 浏览器音视频解码：`apt install ffmpeg`
+ 文件错误：由于u盘问题，经常会出现文件错误，apt也会报错
+ 安装Realtek 的8192eu的wifi驱动：[这里](https://docs.armbian.com/User-Guide_Advanced-Features/#how-to-build-a-wireless-driver)提到了一个很旧的版本，测试无法通过。~~README中说kernel4.4之后已经引入了很好的rtl8xxxu驱动，建议检查编译内核时是否开启参数`CONFIG_RTL8XXXU_UNTESTED`~~。`8192eu`从kernel6.2中的注释开始出现，但是在说明中说[4.3后就开始支持了](https://wireless.wiki.kernel.org/en/users/drivers/rtl819x)。修改该参数并[重新编译内核支持RTL8xxxu](https://github.com/greatofdream/amlogic-s9xxx-armbian/actions/workflows/compile-kernel.yml)。
  + 切换kernel：参考[这里](https://github.com/ophub/amlogic-s9xxx-armbian/blob/main/README.cn.md)，下载kernel并上传，解压在对应的目录下执行`armbian-update`，如果网络很好，可以从远程更新`armbian-update -r greatofdream/amlogic-s9xxx-armbian`，尝试失败，没有对应的内容
  + 直接编译对应[模块](https://github.com/clnhub/rtl8192eu-linux.git)
```shell
dpkg: unrecoverable fatal error, aborting: files list file for package
# 移除错误的info
rm /var/lib/dpkg/info/
```
## N1
+ [N1简明降级&刷机教程](https://post.smzdm.com/p/a99vxp9e/)
+ [N1 Armbian教程](https://blog.csdn.net/ylz_yg/article/details/114977258)
