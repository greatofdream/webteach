# AMD
+ [这里](https://www.amd.com/en/products/specifications/graphics)可以查询AMD显卡对应的参数
+ [架构介绍](https://rocm.docs.amd.com/en/latest/conceptual/gpu-arch.html#gpu-arch-documentation)
  + [RDNA](https://www.amd.com/system/files/documents/rdna-whitepaper.pdf): The all new RadeonTM gaming architecture powering “Navi”
  + 驱动编译使用的[LLVM target](https://llvm.org/docs/AMDGPUUsage.html#amdgpu-amdhsa-memory-model-gfx10-gfx11)
||RDNA| LLVM target| Navi|
|-|-|-|-|
|RX 5700/xt|1.0|gfx1010|Navi10|

+ ROCM对GPU支持列表：[windows](https://rocm.docs.amd.com/en/latest/release/windows_support.html#windows-supported-gpus) [Linux](https://rocm.docs.amd.com/en/latest/release/gpu_os_support.html#linux-supported-gpus)
+ 2023年11月12日，ROCM官网给出的GPU支持列表不包括RDNA1.0架构
+ [github issue](https://github.com/pytorch/pytorch/issues/106728)提到可以用某个特定版本来支持5700，尚未尝试。[gihub issue](https://github.com/pytorch/pytorch/issues/106728)失败例子。
+ [编译成功例子](https://github.com/xuhuisheng/rocm-build/blob/master/navi10/README_zh_CN.md)
+ [知乎问题](https://www.zhihu.com/question/371965193)
## 检查
Linux无法正常启动，进入就会黑屏
+ 设置VGA显示：在启动时按`ESC`进入GRUB界面，按`E`选择对应的启动项编辑，在`linux`开头行处加入`nomodeset`参数，可以正常启动
+ 进入系统后检查日志,`-b`参数后面数字可以选择是上一次失败的启动,`-0`是本次启动，检查发现有报错`amdgpu: smu driver if version not matched`,`cannot find any crtcs or sizes`
```shell
sudo journalctl -b -1 -p 7|grep amdgpu
```
+ 最后发现是线缆没插紧，会导致Xorg无法正确返回屏幕大小，然后amdgpu驱动就会出错
