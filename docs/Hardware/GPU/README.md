# GPU
如何在硬件上进行计算
+ SGEMM选择BK的大小不能为4：Gemini回答
  + 微内核（Micro-kernel）对 K 维度的要求： 现代高性能 GEMM 库（如 cuBLAS、CUTLASS）在底层会使用经过高度优化的微内核。这些微内核通常要求内积的公共维度 K 是一个特定的较小整数的倍数，而 8 是一个非常常见的“友好”数字。
  + 向量化加载： GPU 通常按 32 字节或 128 字节（对应 8 个或 32 个单精度浮点数）的粒度高效地从内存加载数据。

+ [zomi整理的AI和GPU相关课程](https://github.com/Infrasys-AI/AISystem/tree/main)
