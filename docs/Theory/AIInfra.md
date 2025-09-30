# AI Infra
+ [程序性能优化理论与方法 高伟]() [github](https://github.com/AdvancedCompiler/AdvancedCompiler)
  + 程序性能的度量指标：程序执行时间、计算与访存效率、吞吐量与延迟、加速比、Amdahl定律、Gustafson定律[不限制数据集的大小](https://zhuanlan.zhihu.com/p/107699284)
  + 性能测量：`gprof`在使用GCC或LLVM编译链接程序时，添加选项-pg，表示产生的程序可以使用gprof分析;Perf工具是基于用户空间数据上的命令行性能分析工具，支持软硬件计数器，并可以像strace工具一样跟踪内核调用，`perf top`;硬盘监控`iotop`
  + 系统配置：`sysctl -a`内核参数检查，几乎所有的操作系统内核模块，包括内核核心模块和驱动程序都在/proc/sys文件系统下提供了某些配置文件，以供用户调整模块的属性和行为。通常一个配置文件对应一个内核参数，文件名就是参数的名字，文件的内容是参数的值
  + 编译与运行优化：通过选项-flto指示LLVM编译器生成含有LLVM比特码的.o文件，将代码生成延迟到链接阶段，并在链接阶段对代码实现进一步地优化
    + [编译选项](https://www.bilibili.com/opus/912622143156518998)：前端选项、优化选项、生成选项等
    + 循环展开：` -funroll-loops`提高流水线效率，参见《计算机体系结构》；循环分布：`-enable-loop-distribute`
  + 程序编写优化
  + 单核优化
    + 指令级并行：超长指令字在编译阶段由编译器指定并行发射的指令，而超标量在执行阶段由处理器指定并行发射的指令，因此超标量的硬件复杂性更高，而超长指令字硬件复杂性较低。超标量通常会配合乱序执行来提高并行性
    + 数据级并行：大部分处理器采用SIMD向量扩展作为计算加速部件，SIMD扩展部件可以将原来需要多次装载的标量数据一次性装载到向量寄存器中，通过一条向量指令实现对向量寄存器中数据元素的并行处理。[SSE/AVX介绍](https://blog.csdn.net/qq_32916805/article/details/117637192)。教程使用 128位向量寄存器操作指令 演示。
  + 访存优化
  + OpenMP程序优化
  + CUDA程序优化
  + MPI程序优化
  + LLVM编译器入门：
    + IR优化：在LLVM中，IR优化包括三种类型的Pass：Analysis Passes、Transform Passes和Utility Passes。[pass执行变换和优化，构造分析结果](https://llvm.org/docs/WritingAnLLVMPass.html#introduction-what-is-a-pass)
+ [深度学习编译器设计 高伟](https://wqbook.wqxuetang.com/book/3257384) [github](https://github.com/AdvancedCompiler/AdvancedCompiler)
  + [深度学习编译发展](https://zhuanlan.zhihu.com/p/573632566)：深度学习编译器通常是以PyTorch、TensorFlow等通用框架编写的模型描述以及与之相关的权重作为输入，也在过程中进行相应优化，生成包括CPU或者GPU等硬件平台上的底层机器码及执行引擎
  +  深度学习编译基础：自动微分在每个计算传递值和导数，保证精确性。
  + 深度学习编译基础架构MLIR：
  + 深度学习编译器TVM
  + OpenAI Triton编译器
  + 自动并行
  + 深度学习模型压缩
![](https://i2.hdslb.com/bfs/article/615f8b45703a8d8c48e1f260cbb1b35a1540261574.png)
+ [计算机体系结构:量化研究方法]()：摩尔线程的面试官吴老师推荐的，此外推荐了[一篇文章](https://arxiv.org/abs/1903.07486)，他评价这篇文章:"这篇文章介绍了如何去Dissecting GPU的架构，大部分结果数据是正确的，少量有错漏，但是方法论是没问题的"
+ [吴老师对GEMM优化的专栏](https://zhuanlan.zhihu.com/p/410278370)
+ [AI编译器开发指南 汪岩](https://annas-archive.org/md5/1cfce9a71f0a982f658a10d88380c600)
  + LLVM编程基础
+ 陈天奇 [MLC机器学习编译](mlc.ai)，b站有中文版。
+ zomi [AI系统](https://infrasys-ai.github.io/aisystem-docs/01Introduction/README.html)非常适合入门。
  + 优化层则是对代码进行优化，比如常量折叠、死代码消除、循环展开、内存分配优化等
  + 后端阶段
    + 指令选择（Instruction Selection）：根据目标平台特性选择合适的指令。
    + 寄存器分配（Register Allocation）：分配寄存器以最大程度减少内存访问。
    + 指令调度（Instruction Scheduling）：优化指令执行顺序以减少延迟。
  + 前端优化
    + 算子融合：没看懂怎么融合的conv和BN层
    + 布局转换原理与算法：默认使用 NCHW 的有 caffe、NCNN、PyTorch、mxnet 等，默认使用 NHWC 的有 TensorFlow、OpenCV 
    + 内存分配算法：
    + 常量折叠原理：
    + 公共表达式消除原理：
    + 死代码消除：
    + 代数简化：
  + 后端优化：
    + 算子优化方法：算子库，；自动生成，如auto tunning和Polyhedra
    + 计算与调度：Halide 的独特之处在于将算法定义和如何组织计算两个过程独立。
    + 算子手工优化：计算量，访存量，计算强度`I`=计算量/访存量，性能（每秒浮点运算次数）。假如无带宽限制，随着访存量增加，一定会受到性能上限`P_u`约束。在每秒计算量和每秒访存量的维度下，计算强度为斜率。在每秒计算量和计算强度的维度下，每秒访存量（带宽）为斜率。
    + 算子循环优化：现代 CPU 几乎都支持 SIMD 指令集，如 Intel 的 SSE（Streaming SIMD Extensions）和 AVX（Advanced Vector Extensions）系列指令集。循环分块提升数据局部性，循环展开减少流水线停顿。
    + 指令和存储优化：向量化指令和TensorCore指令；CPU 实现延迟隐藏的过程主要依赖于多线程技术和硬件隐式数据预取机制；GPU 在实现延迟隐藏方面，主要依赖于其高度并行化的架构和先进的调度技术
    + Auto-Tuning 原理：TVM 的三代自动调优系统分别是 AutoTVM、Ansor 和 Meta Scheduler
  + kernel优化 
  + 计算图
  + 分布式并行

+ Tilelang [Tilelang编写高性能GEMM](https://zhuanlan.zhihu.com/p/20718641070)
+ 避雷书单：
  + [MLIR编译器原理与实践 吴建明](https://book.douban.com/subject/37404087/)：豆瓣评价机翻加知乎文章拷贝
  + [TVM编译器原理与实践 吴建明](https://book.douban.com/subject/36701691/)：豆瓣怒喷，果然吴建明是烂书制造机
  + [LLVM编译器原理与实践 吴建明](https://book.douban.com/subject/37107379/)：豆瓣上有对作者的差评
  + [AI芯片开发核心技术详解 吴建明](https://weread.qq.com/web/reader/d81321d0813ab9c91g01173fkc81322c012c81e728d9d180)：笼统的讲了GPU、NPU的一些技术，Cuda、PCIE的开发，光刻技术等，均浅尝辄止。豆瓣的批评是对的。
