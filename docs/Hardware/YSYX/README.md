# YSYX
+ [RISC-V的官方手册](https://github.com/riscv/riscv-isa-manual/releases/download/20240411/unpriv-isa-asciidoc.pdf) [PA1中提供的手册很旧](https://ysyx.oscc.cc/docs/ics-pa/#%E5%AE%98%E6%96%B9%E6%89%8B%E5%86%8C)

## F阶段
+ [F阶段](./MOSFET.md)
+ [logisim实现CPU仓库](https://gitcode.com/zaq15csdn/logisim)
+ [riscv机器码转指令](https://luplab.gitlab.io/rvcodecjs/)

## E阶段
+ [C语言](/Coding/CLanguage/) [C语言题目](https://gitcode.com/zaq15csdn/SimpleTools_C)
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

### E4
+ 头文件搜索路径：可以阅读`man gcc`给出的文档`-I`选项，`-I`选项包含的路径在系统默认路径(standard system directories)之前，所以通过这种方式可以覆盖系统目录的头文件。`gcc -E xx.c --verbose >/dev/null`会输出包含搜索头文件路径的信息，`-v`或者`--verbose`将一些信息输出到标准错误。
+ `-dM`可以打印预处理器定义的所有宏，`echo | gcc -dM -E - | sort`打印所有的宏，riscv64-gcc比gcc少了`amd64,HLE,SSE,SSE2`等宏定义多了`riscv`等定义，其它基本相同。
+ [编译过程](/Coding/CLanguage/)
+ GUI：在PA0使用`init.sh`克隆abstract-machine仓库，会调用init函数将`AM_HOME`设置为相应的路径，并自动写入bashrc，用于后续am-kernel编译。
  + `io_write`在` abstract-machine/klib/include/klib-macros.h`定义了宏，替换为`ioe_write`
  + 由于am中`init_platform`时会抛出异常，需要通过`handle SIGUSR1 nostop noprint pass`关闭该异常，否则gdb会停下。当约束水平和数值的像素点为256时，周围有黑边，原因未知。
  + 编译时需要链接库，其中`-lm`需要加入，虽然在示例Makefile中不会显示，全部的链接选项为`minirvEMU-gui: LDLIBS+= -Wl,-no-whole-archive -Wl,-z -Wl,noexecstack -lSDL2 -ldl -lm`
+ E5: RTL(Register Transfer Level)仿真
+ 功能验证
  + [Verilator相关内容](/Hardware/Software/Verilator)，教程提供了双控开关，可以参考[这里的实现](https://gitcode.net/verilog/njuexperiment/-/blob/master/ex1/twoxor.cpp)
  + nvboard项目更新，其中`constr.h`被重命名了，而之前的编译固定生成的`component.d`没有办法更新，因此需要删除`build/*.d`文件，然后重新编译
  + nvboard调用`auto_pin_bind.py`将`*.nxdc`转化为cpp文件，其中`top=<topmodule>`会决定转化后的cpp包含的头文件
+ Verilog的仿真行为和编码风格，位于[Verilator手册](http://staff.ustc.edu.cn/~songch/download/IEEE.1364-2005.pdf)第11章
  + Process组成了design，值的更新是update event，以不确定的顺序影响相关的Process，这些Process的计算是evaluation event
  + chap11.4给出了伪代码执行所有event的流程，当所有event执行完，才会将时间增加
  + Stratified event queue：event被添加至5个种类，但只能从active event中移除，5个种类按照执行顺序包括：`active event`, `inactive event`, **`Nonblocking assign update event`**, `Monitor event`, `future event`。处理所有`active`为simulation cycle （所以我觉得一个周期内其实会有很多simulation cycle），active event执行顺序不定。`#0`挂起当前的Process，并加入一个event到`inactive`中，在下一个simulation cycle执行恢复操作，
  + `display`是evaluation event，和update event执行顺序是任意的
  + 阻塞赋值11.6.3说的不太清楚，在没有指定delay时，猜测时active event，和`#0`不一样
  + 判断
    + 使用#0可以将赋值操作强制延迟到当前仿真时刻的末尾.:正确，会使得这个update event放到inactive event queue，在下一个simulation cycle执行
    + 在同一个begin-end语句块中对同一个变量进行多次非阻塞赋值, 结果是未定义的：错误，这个属于Determinism，begin-end块顺序执行
    + 用always块描述组合逻辑元件时, 不能使用非阻塞赋值.:之前HDLBits中我一直坚持在组合逻辑块`always(@*)`中使用`=`，在时序逻辑块`always(@posedge(clk))`使用`<=`。实际上前者用`<=`看起来如果使用的值不会被其它阻塞赋值影响应该也可以。Gemini说编译器会自动识别编译为组合逻辑。
    + 不能在多个always块中对同一个变量进行赋值.:我本来以为可以，因为会被按event顺序执行，但是使用`=`可能会出现Race condition，因为是两个过程产生的active event，顺序是不定的。
    + 不建议使用$display系统任务, 因为有时候它无法正确输出变量的值.：display的执行顺序可能在阻塞赋值之前，所以不建议使用
    + $display无法输出非阻塞赋值语句的结果：正确，在某个时间步中，display是active event，非阻塞赋值是 nonblocking assign update event。
  + 分析Verilog代码行为，abcde依次为51133
  + Verilator使用静态调度，Synopsys VCS使用动态调度
+ 综合：使用Yosys和iEDA开源工具将RTL转换为GDL(Graphic Design System)版图
  + 教程提供的`yosys-sta`下`make init`会自动下载预编译的iEDA和nangate45工艺库
  + 粗粒度综合： 粗粒度表示是指采用运算符级别的单元来描述设计。proc命令主要将RTLIL中过程描述的switch-case部分转换为$mux单元, 将sync描述转换为D锁存器类型或D触发器类型的单元, 从而得到完整的粗粒度表示
  + 细粒度综合：
+ PDK（Process design kit）
  + nangate45的工艺LEF文件`pdk/nangate45/lef/Nangate45_tech.lef`, 其中包含10层金属层。L1-3的width=0.07，L4-6 0.14，L7-8 0.4, L9-10 0.8
  + 标准单元的属性
    + lib文件 功能和时序，功耗面积 `pdk/nangate45/lib/Nangate45_typ.lib`
    + Verilog文件 行为模型`pdk/nangate45/sim/cells.v`
    + LEF文件 物理几何信息`pdk/nangate45/lef/Nangate45_stdcell.lef`，chatglm说x轴可以让自动布线容易执行，y轴构建电源网络。
    + CDL文件 - 晶体管网表:`M_i_2`漏极是VDD，但是由于PMOS是对称的，所以反接也没问题。`pdk/nangate45/cdl/NangateOpenCellLibrary.cdl`
    + GDS文件 物理版图
  + 标准单元的分类
    + 工艺库里常见的 AOI（And Or Invert）和 OAI（Or And Invert）门，`OAI22_X1`有8个晶体管，`X1`代表驱动能力
    + 逻辑门单元：`NAND2_X1`, `NAND2_X2`和`NAND2_X4`面积和功耗，面积和leakage power`0.798um2 177.39mW` `1.330um2 34.779mW` `2.394um2 69.577nW` 以上信息来自[Nangate45 Library Databook](https://www.cs.upc.edu/~jpetit/CellRouting/nangate/Front_End/Doc/Databook/CornerList.html)，通过并联`NAND2_X1`构造X2,X4,可以在前面链接寻找到相应的图。
    + 时序单元：`DFF_X1`使用了28个晶体管，
    + IO单元：`pdk/nangate45/lib/dummy_pads.lib` `cell(PADCELL_SIG_H)`的area=200，单位按照教程前面所述通常为`um2`
    + 驱动单元
    + 物理单元
    + 宏单元：如sram，其中提到的仓库名为`bsg_fakeram`，因此猜测`lib/fakeram*.lib`中是sram信息。选择`fakeram45_256x96.lib` area=13701.660，信息密度为1.79；而D-FlipFlop是`DFF_X1` area=4.522，信息密度明显小于sram，估计有10倍差距。
    + 复杂功能单元：`HA_X1`面积2.66，如果通过逻辑单元`S=A^B` `C=A&B` [异或门转换](/Hardware/YSYX/MOSFET)一个与门，两个或非，面积为`1.064+2*0.798=2.66`
    + 时钟专用单元
    + 电源管理单元
    + 测试调试单元
  + PVT角：在`yosys-sta/scripts/pdk/nangate45.tcl`中指定PVT角文件`yosys-sta/pdk/nangate45/lib/`
  + 轨道数：size 0.19 by 1.4, Metal1 的PITCH是0.14，所以轨道数是10
+ 物理设计：从网表到版图
  + `FILLCELL_X1`尺寸和前面的size一致。
+ 代码风格和规范
+ 数字电路设计：教程建议使用[chisel](https://www.chisel-lang.org/docs)，文档中提供了[推荐书籍及翻译，包括中文版](https://www.imm.dtu.dk/~masca/chisel-book.html) [数字电路实验](/Hardware/Software/Verilator.md)
  + 如果想用jupyter，需要安装`jupyter-notebook`[`almond`](https://almond.sh/)(jupyter的scala kernel) `yay -Syy scala-cli almond sbt` almond依赖`coursier`(scala的包管理器)，会自动安装。
    + scala-cli会根据scala脚本中标注的版本号，自动下载
    + 在2025/11/01时[由于打包者的设置yay默认安装almond的scala=3.6](https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=almond)，解决方案是重新安装scala内核`coursier launch --fork almond --scala 2.13.4 -- --install`，没有指定路径，会默认安装到`./local/share/jupyter/kernels/scala`，重启即可，其中由于berkely镜像对2.13.14以上没有相关的包，所以升高版本会出错
  + [chisel](https://www.chisel-lang.org/docs/explanations/motivation)使用Verilog的子集，避开了不可综合的缺点
  + [chiseltest](https://www.chisel-lang.org/docs/appendix/migrating-from-chiseltest)看起来已经不被推荐，建议使用`chiselsim`
  + Port 在 Data上增加了IO的方向。
  + chisel中有[`PriorityEncoder`](https://www.chisel-lang.org/api/latest/chisel3/util/PriorityEncoder$.html)，会根据输入宽度生成类似`if-else`结构的verilog
+ [sCPU实现](https://gitcode.com/YSYX_learn/YSYX/tree/pa0/npc)

## PA1
+ DiffTest是如何帮你大幅提升硬件开发效率, 告别枯燥的波形调试.
+ 编程模型
+ 从状态机视角理解程序运行：状态`(pc, r1, r2)` `(0, x, x) -> (1, 0, x) ->` ` (2, 0, 0) -> (3, 0, 1) -> (4, 1, 1) -> ` `(2, 1, 1)-> (3, 1, 2) -> (4, 3, 2) -> ` ...` (2, 4950, 99) -> (3, 4950, 100) -> (4, 5050, 100) -> ` `(5, 5050, 100)-> (5, 5050, 100)`
+ 递归和状态机
+ [Kconfig流程](https://ysyx.oscc.cc/docs/ics-pa/1.3.html)
  + `make menuconfig`产生的`auto.conf`用于NEMO的`Makefile`的变量，`autoconf.h`被包含到NEMO的C代码
+ filelist: `./src/device/filelist.mk ./src/engine/filelist.mk ./src/utils/filelist.mk ./src/isa/filelist.mk ./src/filelist.mk`
+ 客户程序
  + 初始化工作：`parse_args()中调用了函数getopt_long()`分解命令行参数`- --`；`init_isa()`读入客户程序到指定位置，初始化寄存器,
  + x86的物理内存是从0开始编址的, 但对于一些ISA来说却不是这样, 例如mips32和riscv32的物理地址均从0x80000000开始
  + 运行第一个客户程序：`nemu/src/monitor/sdb/sdb.c:cmd_c`调用`nemu/src/cpu/cpu-exec.c:cpu-exec(uint64_t)`传入了参数-1，控制`trace_and_difftest`打印的指令个数，C99中[6.3.1.3节](https://rgambord.github.io/c99-doc/sections/6/3/1/3/index.html)和[C一站式](https://akaedu.github.io/book/ch15s03.html#id2758655)提到了-1会变成最大值，相当于先数学扩展为long，然后用`uint64_t`解释值。是被标准完整定义的。
  + 当程序执行到main()函数返回处的时候，`运行时`会处理退出的流程
  + 开启debug后增加` -Og -ggdb3`
  + `src/nemu-main.c`返回`src/utils/state.c:is_exit_status_bad`，返回`(nemu_state.state == NEMU_END && nemu_state.halt_ret == 0) ||(nemu_state.state == NEMU_QUIT)`-1导致`make`报错，`include/utils`中定义了` NEMU_STOP=1, NEMU_END=2`, `./include/cpu/cpu.h`定义了`NEMUTRAP`设置第一种情况为真，被`isa_exec_once`调用，为了避开返回值为0，在`nemu/src/monitor/sdb/sdb.c:cmd_q`中加入state设置，虽然这样会导致第一种情况对返回不会有影响。
+ 简易调试器
  + `src/isa/riscv32/local_include`中定义了`reg_name`和`gpr`的宏可供使用
  + `x 10 0x80000000`输出的是定义在`src/isa/riscv32/init.c`中的`img`内容
+ 表达式求值
  + 表达式生成器获得C程序结果：通过文件传递。
  + 使用无符号类型：有符号溢出未定义行为。
    + 保证表达式用无符号运算？在数字后面增加`u`
    + 过滤求值过程中有除0行为的表达式：在生成器的`main`函数里编译时增加`-Werror=div-by-zero`使得 `warning: division by zero [-Wdiv-by-zero]`转化为error，使得不会产生编译的结果，从而利用代码框架跳过这一个。
  + 除0的行为：默认会产生`div-by-zero`警告。
  + 扩展表达式支持单目运算符，以及逻辑运算符
+ 监视点
  + watchpoint pool管理：链表
  + `wp_pool`等变量被`static`修饰，应该是为了使得它的作用域只在`watchpoint.c`中
  + 实现监视点池的管理：
    + `nemu/Kconfig`中增加选
  + 断点
    + `w $pc==ADDR` 这种方式设置断点会降低效率，因为每次取指更新PC都要检查
    + 教程推荐的debugger设置断点原理的博客：需要程序发送`SIGTRAP`，通过更改某个地址的指令为`int 3`(字节为`CC`)，并把原始指令存下来。程序执行到这里后会发送SIGTRAP，debuger可以捕获并停止这个程序，然后将原始指令填充回去。此外这个指令是单字节，可以兼容x86指令集，因为最短为1字节，这样替换不会导致覆盖下一个指令。
    + 把断点设置在指令的非首字节？
+ 手册
  + `selector`：`i386.pdf` 5.1.3
  + 简易调试器可以直接观测客户程序，GDB不行。
  + riscv32. chap2
    + riscv32指令格式：4种R/I/S/U
    + `LUI`将20位立即数`imm`加载到寄存器中，低12位置零
    + machine status register `mstatus`属于privileged manual中内容，结构见[manual](https://riscv-software-src.github.io/riscv-unified-db/manual/html/isa/isa_20240411/csrs/mstatus.html#udb:doc:csr:mstatus)
  + `-Wall`开启所有warning，`-Werror`将warning转为error。

## 入学后的内容
+ [D阶段](/Hardware/YSYX/D.md)
+ [C阶段](/Hardware/YSYX/C.md)
+ [B阶段](/Hardware/YSYX/B.md)
+ [A阶段](/Hardware/YSYX/A.md)
