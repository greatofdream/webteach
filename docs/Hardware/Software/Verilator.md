# Verilator
[Verilator](https://verilator.org/guide/latest/overview.html) 是一个FPGA仿真器，archlinux发行版有比较新的版本，可以通过包管理器直接安装。如果从源码编译安装，需要根据教程在`.bashrc`中加入环境变量`VERILATOR_ROOT`
+ 下面用NJU的教程作业作为示例展示我设计的Verilator的项目结构构建，NJU作业完整代码见[仓库](https://gitcode.net/verilog/njuexperiment)
+ PA教程[一生一芯的代码仓库](https://gitcode.net/verilog/ysyx.git)
+ [Verilator trace](https://verilator.org/guide/latest/faq.html#how-do-i-generate-waveforms-traces-in-c)可以在命令行指定，也可以在cpp文件中精细的设置。FST和VCD不能同时被支持。看起来新版本已经[不建议`--trace`](https://verilator.org/guide/latest/exe_verilator.html#cmdoption-trace)，该参数默认等效是`--trace-vcd`
其他教程
+ [Verilator Pt](https://www.itsembedded.com/dhd/verilator_1/)

## NJU作业项目结构
+ 多个项目共用同一个简单的父Makefile，每个项目创建新的Makefile并inlude父Makefile,简化重复的代码。其中指定里`top-module`是一个变量，需要在每个项目中指定。
```makefile
.PHONY: top
VERILATOR_FLAG=--cc --exe --trace
vsrc=$(wildcard *.v)
top:
        verilator $(VERILATOR_FLAG) --top-module $(TOPMODULE) --build -j 0 $(TOPMODULE).cpp $(vsrc)
```
+ 项目中的Makefile需要先包含父Makefile,然后对每一个生成项设置TOPMODULE变量值
```MAKEFILE
include ../Makefile
.PHONY: decode24
decode24: TOPMODULE=decode24
decode24: top
```
+ `TOPMODULE.cpp`:verilator的模拟的入口文件，需要在里面控制时钟周期`contextp->timeInc(1);`

## ALU实现
+ 有符号数相减时，对于被减数B可以取反加1,变成相加运算
```verilog
assign t_no_Cin = {n{ Cin }}^B;
assign {Carry,Result} = A + t_no_Cin + Cin;
assign Overflow = (A[n-1] == t_no_Cin[n-1]) && (Result [n-1] != A[n-1]);
```
+ carry进位指最高位是否进位，所以直接使用`assign { Carry, Result } = A + B`即可得到carry的值。
+ overflow溢出需要判断计算结果是否超出当前长度的位数表示范围。比如4位数,`0x0000-0x0111`是正数0到7，`0x1000-0x1111`为负数-8到-1。可以看出按照正常无符号数的表示法负数的值反而排在后半部分，因此一旦正数相加过大，进入负数范围，这个时候就是溢出。所以判断方式：
  + (A和B符号一致)且(结果和A符号不一致)。当B为负数时，需要将B取反，判断方式为(A和!B符号一致)且(结果和A符号不一致)。
  + 之所以不将B取反加1，因为对于1000取反加1时还是本身，导致判断A和!B的符号时没有办法用最高位作比较。比如-7-(-8)=1,这个时候carry=1,overflow=0,如果将B取反加1作判断，得到的overflow反而是1。

**注意事项**
+ carry进位使用`assign { Carry, Result } = A + t_no_Cin + Cin`这种方式，对于减法来说，使用的不是`borrow flag`，比如`3-0`计算后，由于略去了补码计算过程，直接将反码`t_no_Cin`加上，导致carry会是1。所以可以先计算补码，修改硬件实现获得`borrow flag`的方式。
+ 在ICS课程中介绍的X86处理器中，减法的进位是以借位方式实现的。[wikipedia有详细的讲述](https://en.wikipedia.org/wiki/Carry_flag)
+ 在作业仓库里的实现有问题，虽然Testbench通过，但是接入板子后会出现sel的信号无法实时让alu模块计算，会慢一个周期，看起来不能在always块里调用外部模块的输出

## 键盘
+ `ps2_clk_syn`使用3位而不是2位：使用同步信号处理异步信号，由于建立时间的问题，第一级触发器可能处于亚稳态，输出完全不可预测，延迟一个周期恢复。
+ `timescale 1ns/1ps`在verilator仿真时按照1ps进行`timeInc(1)`，但是单位却被记录为`1s`

## 综合
+
## Dump
存的波形文件是一个文本文件，最上面是波形的信息，包括单位，注意timeInc对应的是timeresolution(timeunit/timeresolution)。之后每一行是一个波形的值。
+ 使用`dump()`函数调用的是`include/verilated_trace_imp.h`中的`void VerilatedTrace<VL_SUB_T, VL_BUF_T>::dump(uint64_t timeui)`,同时会调用`include/verilated_vcd_c.cpp`的`VerilatedVcd::dumpHeader()`
```c++
//VerilatedVcd::dumpHeader()
372     printStr("$timescale ");
373     printStr(timeResStr().c_str());  // lintok-begin-on-ref                                              
374     printStr(" $end\n");
//
427 std::string VerilatedTrace<VL_SUB_T, VL_BUF_T>::timeResStr() const {                                     
428     return doubleToTimescale(m_timeRes);
429 }
//
434 template <>
435 void VerilatedTrace<VL_SUB_T, VL_BUF_T>::set_time_unit(const char* unitp) VL_MT_SAFE {
436     m_timeUnit = timescaleToDouble(unitp);
437 }
438 template <>
439 void VerilatedTrace<VL_SUB_T, VL_BUF_T>::set_time_unit(const std::string& unit) VL_MT_SAFE {
440     set_time_unit(unit.c_str());
441 }
442 template <>
443 void VerilatedTrace<VL_SUB_T, VL_BUF_T>::set_time_resolution(const char* unitp) VL_MT_SAFE {
444     m_timeRes = timescaleToDouble(unitp);
445 }
446 template <>
447 void VerilatedTrace<VL_SUB_T, VL_BUF_T>::set_time_resolution(const std::string& unit) VL_MT_SAFE {
448     set_time_resolution(unit.c_str());
449 }
//
527     const char* timeunitString() const VL_MT_SAFE;
528     /// Get time precision as power-of-ten
529     int timeprecision() const VL_MT_SAFE { return -m_s.m_timeprecision; }
```
## 错误汇总
+ delay延时:verilator需要指定[--timing](https://verilator.org/guide/latest/exe_verilator.html#cmdoption-timing)参数来支持延时，否则会报错`NEEDTIMINGOPT: Use --timing or --no-timing to specify how delays should be handled`
+ 过程赋值：在`always`的语句块中，需要使用过程赋值，赋值的对象不能是wire,否则会报错`Error-PROCASSWIRE: alu.v:31:21: Procedural assignment to wire, perhaps intended var (IEEE 1800-2017 6.5)`
+ 位扩展: 如果直接将不同位的变量或者常数相加，会有Warning `%Warning-WIDTHEXPAND:`。[Verilator文档](https://verilator.org/guide/latest/warnings.html#cmdoption-arg-WIDTH)提供了详细的解决方案，我简化一些放在下面。
  + 如果常数位数不够，可以忽略位数指定，由编译器自行决定。比如`1'b1`改为`'1`
  + 如果时变量位数不够，可以通过切片`toowide[1:0]`，补足`{1'b1, too_narrow}`和重设size`23'(wrong_sized)`解决。
+ 信号延迟:
