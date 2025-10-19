# YSYX
+ [F阶段](./MOSFET.md)，[logisim实现CPU仓库](https://gitcode.com/zaq15csdn/logisim)
+ E阶段:
  + [C语言](https://gitcode.com/zaq15csdn/SimpleTools_C)
  + [Verilog](https://hdlbits.01xz.net/wiki):里面有些例子使用的system verilog语法，多了一些特性
    + [always 中包含posedge和negedge会被综合为时序电路](https://vlab.ustc.edu.cn/guide/doc_verilog.html#17-d)
    + [always block的不同之处题目](https://hdlbits.01xz.net/wiki/Alwaysblock2)
    + [组合逻辑避免综合出latch](https://hdlbits.01xz.net/wiki/Always_if2)，需要遍历if和case的所有情况。
    + [循环求和](https://hdlbits.01xz.net/wiki/Popcount255) gemini说system verilog 有更简单的规约操作符`归约和操作符 '{+}' 专门用于计算向量中所有位（或片段）的和`
    + [generate使用](https://hdlbits.01xz.net/wiki/Bcdadd100)
    + [pop count 的解法可以用求和](https://hdlbits.01xz.net/wiki/Popcount3)
    + `'1`可以赋值自动匹配宽度。[9路选择器](https://hdlbits.01xz.net/wiki/Mux9to1v)
    + 数组的切片在verilog里有特殊写法，需要固定宽度，[文档中 part select](https://sutherland-hdl.com/pdfs/verilog_2001_ref_guide.pdf)[256路选择器](https://hdlbits.01xz.net/wiki/Mux256to1v)
    + [发现了一位全加器的巧妙写法](https://vlab.ustc.edu.cn/guide/doc_verilog.html#14) [Adder题目](https://hdlbits.01xz.net/wiki/Adder100)
    + 非阻塞赋值，阻塞赋值会导致执行顺序undefined[D-FlipFlip](https://hdlbits.01xz.net/wiki/Dff)
    + [异步赋值](https://hdlbits.01xz.net/wiki/Dff8ar)其实是把reset作为触发，如果用其它方式强行设置输入或输出，并不会改变寄存器内部的值。
    + 延时拍 [检测上升沿](https://hdlbits.01xz.net/wiki/Edgedetect)
    + [双边检测](https://hdlbits.01xz.net/wiki/Dualedge)
    + 内部信号是同步的，直接组合后也是同步的，如果再加一层block，会使得信号延迟[1000Hz](https://hdlbits.01xz.net/wiki/Exams/ece241_2014_q7b)
    + [时钟](https://hdlbits.01xz.net/wiki/Count_clock)
    + 非寄存器输出的赋值必须在`always`外面[寄存器](https://hdlbits.01xz.net/wiki/Exams/m2014_q4k)
    + `阻塞赋值`构造组合逻辑[邻居个数判断](https://hdlbits.01xz.net/wiki/Conwaylife)
  + E4
    + 头文件搜索路径：可以阅读`man gcc`给出的文档`-I`选项，`-I`选项包含的路径在系统默认路径(standard system directories)之前，所以通过这种方式可以覆盖系统目录的头文件。`gcc -E xx.c --verbose >/dev/null`会输出包含搜索头文件路径的信息，`-v`或者`--verbose`将一些信息输出到标准错误。
    + `-dM`可以打印预处理器定义的所有宏，`echo | gcc -dM -E - | sort`打印所有的宏，riscv64-gcc比gcc少了`amd64,HLE,SSE,SSE2`等宏定义多了`riscv`等定义，其它基本相同。
    + [编译过程](/Coding/CLanguage/)
