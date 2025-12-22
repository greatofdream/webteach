# GPU
+ [zomi整理的AI和GPU相关课程](https://github.com/Infrasys-AI/AISystem/tree/main)
## GEMM
如何在硬件上进行计算
+ SGEMM选择BK的大小不能为4：Gemini回答
  + 微内核（Micro-kernel）对 K 维度的要求： 现代高性能 GEMM 库（如 cuBLAS、CUTLASS）在底层会使用经过高度优化的微内核。这些微内核通常要求内积的公共维度 K 是一个特定的较小整数的倍数，而 8 是一个非常常见的“友好”数字。
  + 向量化加载： GPU 通常按 32 字节或 128 字节（对应 8 个或 32 个单精度浮点数）的粒度高效地从内存加载数据。
+ [Nvidia 架构总结](https://zhuanlan.zhihu.com/p/1910093597233099119)
  + 2017年Volta引入Tensor core
  + 2022年Hopper引入Transformer引擎，异步的硬件复制引擎TMA(Tensor Memory Accelerator)
+ [FP32 GEMM优化的英文博客](https://siboehm.com/articles/22/CUDA-MMM) [知乎复现前面的内容，并加入了自己的理解](https://www.zhihu.com/column/c_1981308597993493684)
  + SMEM可以大幅提升速度，但是由于计算强度不足，会有SMEM stall
  + `1D Blocktiling` 通过让每个tread计算多个元素，降低SMEM stall，实际上是让thread复用了SMEM中的数据，增加register里的数据计算强度。
  + bank conflict: (chatglm) 对于现代 NVIDIA GPU，Shared Memory 通常被分成 32 个 Bank，这与一个 Warp（包含 32 个线程）的大小相匹配。当同一个 Warp 内的多个线程，在同一个时钟周期内，试图访问同一个 Bank 中的不同内存地址时，就会发生 Bank Conflict。
+ [Tensor core优化GEMM](https://zhuanlan.zhihu.com/p/631227862)
+ chatglm说计算机科学中`高维high-dimensional`代表矩阵大，`高秩high-rank`代表张量维度高
+ [leetgpu题解](https://zhuanlan.zhihu.com/p/1899956367734867434)
