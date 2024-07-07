# 开发软件
## PlatformIO
[官方文档](https://docs.platformio.org/en/latest/)
[Target Generic MCU MKL26Z64, STM32G031K8, etc](https://community.platformio.org/t/target-generic-mcu-mkl26z64-stm32g031k8-etc/22920)

+ 基于VSCode，插件安装后会在点击插件时自动下载 `PlatformIO Core`,注意在国内可能有网络原因而timeout然后被迫中断下载。
+ 基于开发板进行配置
+ 缺少一些芯片
## MCUPresso
[官方](https://www.nxp.com.cn/design/software/development-software/mcuxpresso-software-and-tools-:MCUXPRESSO)
[软件工具链介绍](https://www.nxp.com.cn/docs/zh/fact-sheet/MCUXPRESSOFS.pdf)
+ MCUXpresso SDK
+ [IDE](https://github.com/nxp-mcuxpresso/vscode-for-mcux/wiki)
  + 可选在VSCode上安装
  + 除了支持LPC-Link2、MCU Link、基于LPC11U35和NXP的OpenSDA硬件调试器外，MCUXpresso IDE和MCUXpress for VS Code还支持所有SEGGER J-Link调试器和大多数P&E Micro调试器。 
  + 在VSCode扩展中可以点击`Open MCUXPresso Installer`下载`MCUXPresso Installer`并安装需要的依赖
+ MCUXpresso 配置工具
+ MCUXpresso 安全指配工具(SEC)

使用
+ `import Repository`: MCUXpresso SDK, Open-CMSIS-Packs, or Zephyr
  + 我选择[Remote方式](https://github.com/nxp-mcuxpresso/vscode-for-mcux/wiki/Install-Repository#import-remote-git-repository)
## MDK v6 Community Edition (Keil)
[这里](https://www.keil.arm.com/community/)有提到VSCode的插件`Keil Studio Pack`，适合熟悉CMSIS工具箱的开发者使用。
+ 按照[这里](https://developer.arm.com/documentation/108029/0000/Get-started-with-an-example-project/Import-the-Blinky-FRDM-K32L3A6-example)的流程打开示例项目便可以自动完成ToolChain(工具链)的安装
  + Vscode右下角弹出缺失包需要安装，点击框内的`Install`
  + 右下角弹出框需要Activate，点击框内的`Activate`
  + 上述弹窗可能来不及点，需要反复打开该工程等待弹窗
+ 然后就可以build这个工程了

