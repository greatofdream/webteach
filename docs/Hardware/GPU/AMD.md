# AMD
+ [这里](https://www.amd.com/en/products/specifications/graphics)可以查询AMD显卡对应的参数
+ [架构介绍](https://rocm.docs.amd.com/en/latest/conceptual/gpu-arch.html#gpu-arch-documentation)
  + [RDNA](https://www.amd.com/system/files/documents/rdna-whitepaper.pdf): The all new RadeonTM gaming architecture powering “Navi”
  + 驱动编译使用的[LLVM target](https://llvm.org/docs/AMDGPUUsage.html#amdgpu-amdhsa-memory-model-gfx10-gfx11)
  + `rocprof`支持[gfx1010](https://rocm.docs.amd.com/projects/rocprofiler/en/docs-6.0.0/rocprofv1.html)
  + `rocgdb`对[GPU architecture的标识](https://rocm.docs.amd.com/projects/ROCgdb/en/docs-6.0.0/ROCgdb/gdb/doc/gdb/AMD-GPU.html)
  + `hipcc`中的选项[`--offload-arch=<target>`](https://rocm.docs.amd.com/projects/HIP/en/docs-6.0.0/user_guide/hip_porting_guide.html)，在[github issue](https://github.com/ROCm/ROCm/issues/1714)
+ [RoCM Developer Hub](https://www.amd.com/zh-cn/developer/resources/rocm-hub.html)
+ [爱好者的RDNA1.0支持](https://github.com/TheTrustedComputer/ROCm-RDNA1)
+ [b站成功经验](https://github.com/likelovewant/ROCmLibs-for-gfx1103-AMD780M-APU)引用了该仓库编译的[Rocm](https://www.bilibili.com/opus/923618797070319625)
+ 书籍：Accelerated Computing with HIP

||RDNA| LLVM target| Navi|
|-|-|-|-|
|RX 5700/xt|1.0|gfx1010|Navi10|

+ ROCM要求CPU和主板支持`PCIe™ atomics `,1st generation AMD Zen CPU and Intel™ Haswell 之后支持该操作。E5 2680v4是Haswell之后的Broadwell架构，理论上支持。
+ ROCM对GPU支持列表：[windows](https://rocm.docs.amd.com/en/latest/release/windows_support.html#windows-supported-gpus) [Linux](https://rocm.docs.amd.com/en/latest/release/gpu_os_support.html#linux-supported-gpus)
+ 2023年11月12日，ROCM官网给出的GPU支持列表不包括RDNA1.0架构
+ [github issue](https://github.com/pytorch/pytorch/issues/106728), [issue](https://github.com/ROCm/ROCm/issues/2527), [issue]()提到可以用某个特定版本 RoCM5.2 来支持5700xt，尚未尝试。[gihub issue](https://github.com/pytorch/pytorch/issues/106728)失败例子。
  + `pytorch 1.13.1`设置`export HSA_OVERRIDE_GFX_VERSION=10.3.0`
+ [编译成功例子](https://github.com/xuhuisheng/rocm-build/blob/master/navi10/README_zh_CN.md)
+ [知乎问题](https://www.zhihu.com/question/371965193)
+ [直接指定`GFX_VERSION`](https://github.com/xuhuisheng/rocm-build/blob/master/navi10/README_zh_CN.md)不需要重新编译。

## 尝试
+ LXC配置`/var/lib/lxc/<lxc name>/config`访问显卡
```shell

```
+ [这里](https://repo.radeon.com/rocm/apt/)有所有rocm的apt仓库版本，此处选择5.7.3，因为[此处](https://github.com/vladmandic/automatic/commit/96b851eae6e0d9ba964eedabcdc1a3da75b963f0)已经有人验证过该版本
  + 也可使用[`amdgpu-installer`](https://repo.radeon.com/amdgpu-install/)进行安装
```shell
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/rocm.gpg] https://repo.radeon.com/rocm/apt/5.7.3 jammy main" \
    | sudo tee --append /etc/apt/sources.list.d/rocm.list
```
+ pytorch 安装，命令[参考](https://pytorch.org/get-started/locally/), 编译的包的位置在`https://download.pytorch.org/whl/nightly/rocmx.x`
```shell
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm5.7
```
## 检查
Linux无法正常启动，进入就会黑屏
+ 设置VGA显示：在启动时按`ESC`进入GRUB界面，按`E`选择对应的启动项编辑，在`linux`开头行处加入`nomodeset`参数，可以正常启动
+ 进入系统后检查日志,`-b`参数后面数字可以选择是上一次失败的启动,`-0`是本次启动，检查发现有报错`amdgpu: smu driver if version not matched`,`cannot find any crtcs or sizes`
```shell
sudo journalctl -b -1 -p 7|grep amdgpu
```
+ 最后发现是线缆没插紧，会导致Xorg无法正确返回屏幕大小，然后amdgpu驱动就会出错

## 安装
+ Arch Linux，对于[RDNA1与RDNA2](https://github.com/Root-Rot/Arch-ROCm-Install-Guide) [Archwiki](https://wiki.archlinux.org/title/GPGPU#ROCm). [我在github的回复](https://github.com/ROCm/ROCm/issues/887#issuecomment-3093209263)
```shell
sudo pacman -Syy rocm-hip-sdk rocm-opencl-sdk
# 在.bashrc中加入
export ROCM_PATH=/opt/rocm
export HSA_OVERRIDE_GFX_VERSION=10.1.0
# 注意10.1.0是因为RX5700是GFX1010
# Pytorch
sudo pacman -Syy python-pytorch-rocm
python -c 'import torch; print(torch.cuda.is_available())'
# torchvision在arch中只有社区维护的版本，需要根据社区的PKGBUILD本地编译
yay -Syy python-torchvision-rocm
```
+ [其他版本安装](https://rocm.docs.amd.com/projects/install-on-linux/en/latest/install/post-install.html)_

