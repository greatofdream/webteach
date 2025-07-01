# Manjaro
## 输入法
Archlinux文档里推荐fcitx5,但是按照文档安装完之后，并不能生效，需要在configure里面添加pinyin这个输入法，默认只有几个键盘布局

## GPU驱动
+ Nvidia
  + `manjaro`提供了`mhwd`来[自动化安装GPU驱动](https://wiki.manjaro.org/index.php/Configure_Graphics_Cards/zh-cn)，但是似乎存在一些问题，导致自动化程序会搜索`linux59-nvidia`包，实际上仓库里没有。
  + `archlinux`提供[手动安装驱动的方式](https://wiki.archlinux.org/title/NVIDIA)，运行`pacman -Sy nvidia`，然后重启系统
+ AMD
  + AMDGPU: `pacman -S mesa lib32-mea xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon`
  + 监测软件: `yaourt -S amdgpu_top`

## Steam
+ 需要额外安装Steam++ (现在名为Watt tool)来加速Steam以便显示内容。下载和启动游戏时可以关掉加速。另外在manjaro里的`add software`中可以直接点击安装`Watt tool`
  + 由于[证书更换问题](https://github.com/BeyondDimension/SteamTools/issues/3384)，需要先点击设置中移除证书，然后安装证书，`sudo trust anchor --store ~/.local/share/Steam++/Plugins/Accelerator/SteamTools.Certificate.cer`使得[证书被信任](https://steampp.net/liunxSetupCer)
```shell
pacman -Syy steam
pacman -Syy watt-toolkit-bin
```
+ steam需要`vulkan-radeon lib32-vulkan-radeon`来支持linux运行游戏。

## 游戏手柄
手柄的摇杆会自动偏置，[博客](https://www.mivm.cn/linux-516-game-controller)中说用nintendo的模块会出问题，需要移除模块，识别为XBox360后再使用。

## GRUB
Manjaro的Grub安装需要参考[这里](https://wiki.manjaro.org/index.php?title=GRUB/Restore_the_GRUB_Bootloader)，另外需要注意安装grub要按照教程运行两次。
+ 如果拷贝系统时出现问题，也可以使用上述的流程

> 如果使用`SystemRescue`，可以参考[这里](https://www.system-rescue.org/disk-partitioning/Repairing-a-damaged-Grub/)

## 滚动升级
[官方Pacman教程](https://wiki.archlinux.org/title/Pacman)
+ Failed to commit transaction (conflicting files)": 官方教程中`Troubleshooting`中的解决方案是删除存在的文件

## AUR
+ yaourt已经不维护了，目前推荐的是yay和paru
+ `tuna`的[aur镜像被移除了](https://github.com/tuna/issues/issues/1424)

