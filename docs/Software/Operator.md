# 算子开发

## Ascend
+ [文档](https://www.hiascend.com/document)
+ [认证](https://www.hiascend.com/edu/certification)，[这里](https://www.hiascend.com/profile/growth/equity)可以白嫖认证券
+ [文档Ascend C环境准备](https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/83RC1alpha002/opdevg/Ascendcopdevg/atlas_ascendc_10_0002.html)。白嫖了华为云的云主机，180h，应该够用了。云主机系统为ubuntu24，python版本3.12，结果cann-toolkit8.2rc竟然不支持python3.12，无语，最后在文档中发现他们标注了python版本支持，也不高亮提醒。
  + `ModelArt`中的`AI Colab`(不是默认的Colab)提供GPU的`Notebook`每天可白嫖2小时的算力，且已安装`910B4`芯片，但是不能保存数据。
```shell
# 选择包管理器安装依赖
apt install -y gcc make net-tools cmake python3 python3-dev python3-pip
# 文档使用pip install相关的包，可以用apt安装，但是不知道为什么指定numpy的版本 
```
+ `run.sh`在`runmode`是`cpu`或`sim`时会额外设置，此外所有模式均会编译出`ascendc_kernels_bbit`，在`npu`模式下会运行`msprof op --application=./ascendc_kernels_bbit`，最终会对比结果正确性。
  + `bash run.sh -r npu -v Ascend910B4`
+ 示例程序`git clone https://gitee.com/ascend/samples.git`
+ AscendC编译时，我发现似乎它的编译器不支持`//`这个运算符。
+ [UB的内存解释](https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/850alpha001/opdevg/ascendcbestP/atlas_ascendc_best_practices_10_0025.html)有助于理解中间结果的操作。

### 抽象硬件架构
+ AI Core中包含计算单元、存储单元、搬运单元等核心组件
  + 计算单元包括了三种基础计算资源：Cube计算单元、Vector计算单元和Scalar计算单元
  + 存储单元包括内部存储和外部存储
  + DMA（Direct Memory Access）搬运单元：负责数据搬运，包括Global Memory和Local Memory之间的数据搬运，以及不同层级Local Memory之间的数据搬运。
建议参考`硬件架构`部分
### 硬件架构
+ 基本架构
  + 硬件架构根据Cube计算单元和Vector计算单元是否同核部署分为耦合架构和分离架构两种
  + 不同buffer的作用
  + Scalar单元用于发射指令，比如性能调优时尽量减少if/else等分支判断及变量运算
  + Cube计算流程同样也可以理解为CopyIn、Compute、CopyOut这几个阶段，因为流程相对复杂，Matmul高阶API提供对此的高阶封装，简化了编程范式

### 编程模型
+ SPMD模型：Ascend C算子编程是SPMD（Single-Program Multiple-Data）编程
+ 核函数加上额外的函数类型限定符，包含`__global__`和`__aicore__`。
+ 指针入参变量需要增加变量类型限定符`__gm__`，表明该指针变量指向Global Memory上某处内存地址。
+ 编程范式：编程范式描述了算子实现的固定流程，个人认为描述的是在单个AIcore上的逻辑。
  + Ascend C编程范式就是这样一种流水线式的编程范式，把算子核内的处理程序，分成多个流水任务，通过队列（Queue）完成任务间通信和同步，并通过统一的资源管理模块（Pipe）来统一管理内存、事件等资源
  + Vector编程范式：Vector编程范式把算子的实现流程分为3个基本任务：CopyIn，Compute，CopyOut。
    + `AllocTensor`分配的大小由`InitBuffer`决定，TPipe通过InitBuffer接口对外提供Queue内存初始化功能，开发者可以通过该接口为指定的Queue分配内存
    + 
  + Cube编程范式
  + 融合算子编程范式：例子是`MatmulLeakyKernel`
  + 编程接口
    + Kernel API：用于实现算子核函数的API接口
    + Host API
    + 算子调测API
### 算子实现
矢量编程、矩阵编程、融合算子编程三种典型场景下的算子Tiling、Kernel实现
### 矢量编程
该节位于`算子实现`中

### Add 算子
+ `Kernel直调`是helloworld后的第一个示例，代码在`0_introduction/3_add_kernellaunch/AddKernelInvocationNeo/`
+ 从外部存储Global Memory搬运数据至内部存储Local Memory，然后使用Ascend C计算接口完成两个输入参数相加，得到最终结果，再搬运到Global Memory上
+ Double buffer提高Vector计算单元利用率，需要考虑Vector算力、数据量大小
+ `main.cpp`中使用`acl API`运行算子的调用程序，看起来执行的功能和`if`宏的cpu代码类似。
+ Kernel直调传递的Tiling信息不受结构体约束，也不拘泥于`GM_ADDR`的类型

### 自定义算子
+ 示例代码`0_introduction/1_add_frameworklaunch/AddCustom`, `0_introduction/25_simple_add`
+ `add_custom.cpp`         // 算子原型注册、shape推导、tiling实现等内容文件
+ `CMakePresets.json` // 编译配置项
+ [视频教程 Add算子](https://www.hiascend.com/developer/courses/detail/1696414606799486977)使用了`0_introduction/3_add_kernellaunch/AddKernelInvocationNeo`
  + Host侧实现：需要计算`Tiling`参数，Kernel直调时`TilingData`类型可以直接传参而不是必须要用`GM_ADDR`
  + 原型注册，应该是指注册自定义算子安装到CANN软件栈，能被调用，注册Tiliing结构体

### 非对齐尾块和多类型数据
参见[进阶教程](https://www.hiascend.com/developer/courses/detail/1696414606799486977)
+ 非对齐：
  + 分为大小块
  + UB（Unified buffer）的大小会影响搬入，在`Init`时需要额外处理
+ 多类型：需要在`json`中改变，`op_host`中的原型注册改变，

## 矩阵编程
+ NZ和ND格式
+ 变量（`baseM` `baseN`）等
  + iterateOrder：一次Iterate迭代计算出[baseM, baseN]大小的C矩阵分片。Iterate完成后，Matmul会自动偏移下一次Iterate输出的C矩阵位置，iterateOrder表示自动偏移的顺序
  + 尾块处理`SetTail`
  + `End`结束矩阵乘
+ 连续写模式 非连续写模式
+ 单核Tiling时
+ 多核Tiling时
+ 视频教程的例子`0_introduction/11_matmul_kernellaunch/MatmulInvocationNeo`

## 融合算子编程
+ 融合算子的实现方法：可以对数据进行切片，再通过流水的设计，使得矢量计算单元和矩阵计算单元实现并行计算；另外相比于不融合的单算子，减少了算子的调度耗时
+ 视频教程例子`0_introduction/13_matmulleakyrelu_kernellaunch/MatmulLeakyReluInvocation`

## 性能优化
[Ascend C最佳实践](https://www.hiascend.com/document/detail/zh/canncommercial/83RC1/opdevg/ascendcbestP/atlas_ascendc_best_practices_10_0040.html)
算子理论性能评估

### 搬运优化
+ 不同大小数据块带宽利用率不一样，16kB以上可以达到带宽bound
+ Global Memory尽量512B对齐，由于AI处理器内部设计约束
+ 使用搬运API而不是for循环，设置API的参数
+ 设置合理的L2 cache mode: L2 Cache常用于缓存频繁访问的数据，其物理位置位于GM和LM之间
### 内存优化
+ Unified buffer复用，而不是拷贝到Global memory
+ 通过Bias Table buffer实现高效的Bias计算，`mmad`算子实现带bias的矩阵乘
+ Fixpipe Buffer，存放量化参数 随路量化
+ L0C数据暂存实现高效的矩阵乘累加

### API使用优化
+ scala优化
  + 避免scala参与vector计算流水
+ API分级：使用0级API
+ iCache优化：PMU统计有ICACHEmissing，kernel大小超过icache大小
+ 大型矩阵reducesum使用cube单元

## 算子开发工具
[`算子开发工具`](https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/850alpha001/devaids/optool/atlasopdev_16_0002.html)
### 算子工程创建
`msopgen`的使用说明
+ 在AI notebook中使用时发现产生的`CMakePresets.json`中的`ASCEND_CANN_PACKAGE_PATH`竟然是错误的，需要[手动改正](https://bbs.huaweicloud.com/blogs/416779)，提了工单。
+ 在AI notebook安装自定义的算子，默认会装到`/usr/local`下，由于权限不够会报错

### 异常检测
`msSanitizer` 基于昇腾AI处理器的一个异常检测工具，包含了单算子开发场景下的内存检测、竞争检测、未初始化检测和同步检测四个子功能
+ 如需要开启全量检测，需要在算子代码的编译阶段增加编译选项，不同算子工程添加编译选项的位置不同，介绍模板库场景、内核调用符场景、Triton算子调用场景和msOpGen算子工程编译场景
### 算子调优
`msProf`
+ 仿真`msprof op simulator` `run.sh -r sim -v [soc version]`
+ `MindStudio Insight`查看`msprof`生成的`bin`文件, Roofline瓶颈分析图

## 算子调试调优
### 孪生调试
+ 由于cpu调测已转为多进程调试，每个核都会拉起独立的子进程，故gdb需要转换成子进程调试的方式。
  + `printf`, 视频教程提供了可以直接用`xLocal.Print()`方式，只能在CPU调试使用
  + [视频教程](https://www.hiascend.com/developer/courses/detail/1696690858236694530)给出了在`run.sh`添加gdb指令的方式，可以跳过设置环境变量
+ NPU `AscendC::printf` `DumpTensor()`

## 调优
[课程链接](https://www.hiascend.com/developer/courses/detail/1828324280573366274)
+ 理论性能评估：
### APROF
（Ascend Performance Profiler）是华为 CANN（Compute Architecture for Neural Networks）工具套件中的一个核心组件，专门用于分析和量化 AI 模型在昇腾处理器上的运行性能

### Roofline

## GEMM类算子调优
+ L2开发者不可控制，所有GM的内存操作都要经过L2 Cache
+ Nz排布是为了L2Cache利用率更高

## TBE&AI CPU算子开发
TBE（Tensor Boost Engine）负责执行昇腾AI处理器中运行在AI Core上的算子，TBE提供了基于TVM（Tensor Virtual Machine）框架的自定义算子开发能力，通过TBE提供的API可以完成相应神经网络算子的开发

## 昇腾算子开发比赛
[比赛页面](https://developer.huaweicloud.cn/competition/information/1300000204/html3)
+ Matmul 优化
  + `Matmul`样例位于`10matmul_frameworklaunch`，说明书提供的建议`XMatMul`不知道是个什么东西
  + 华为的OS运行`install.sh`会报错`The path MatmulCustom.json should not be written by user group or others, which will cause security risk`，需要手动`chmod`取消`group`的写权限，看起来是华为提供的OS的奇怪问题。后续编译会遇到找不到`sys_version`的问题。
  + 华为的AI Notebook运行找不到`register/tiling_data_base.h`，但是路径在`CustomOp/cmake/func.cmake`已经包含了`-I ${ASCEND_CANN_PACKAGE_PATH}/include`，发现需要设置`CANN_PACKAGE_PATH`
    + `op_tmpl.py`定义`CMAKE_CPP_CONFIG`赋值上述变量
    + `op_gen/interface/op_file_aicore.py:        utils.write_files(cfg_file, OPTmpl.CMAKE_CPP_CONFIG.format(soc_ver=soc, plugin=plugin))`
    + 最终产生`./cmake/config.cmake`
    + 看起来是因为`/usr/local/Ascend/ascend-toolkit/8.0.RC3/tools/msopgen/template/operator_demo_projects/ascendc_operator_sample/CMakePresets.json`直接拷贝的原因导致的错误，不知道为何原文件是错误的变量值。
+ MatmulLeak优化
  + 在Acl调用时会[报workspace初始化出问题](https://www.hiascend.com/forum/thread-0278200031133602130-1-1.html)，原因未知。[类似报错说是卡类型不支持](https://gitee.com/ascend/samples/issues/IA5M55)。[错误码](https://www.hiascend.com/doc_center/source/zh/canncommercial/63RC2/inferapplicationdev/aclcppdevg/aclcppdevg_03_0380.html)。搞了一周没跑通流程，令人费解。



