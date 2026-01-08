# YSYX D 阶段
## D1 YEMU
+ 发现之前实现sEMU和minirvEMU时使用的union没有用到`struct`的位域功能，用了很多宏定义来处理拆分。
+ YEMU上执行的加法程序的状态机即所有寄存器，PC和RAM的状态

|PC|R0|R1|R2|R3|M7|
|-|-|-|-|-|-|
|0 |0 |0 |0 |0 |0 |
|1 |33|0 |0 |0 |0 |
|2 |33|33|0 |0 |0 |
|3 |16|33|0 |0 |0 |
|4 |49|33|0 |0 |0 |
|5(非指令) |49|33|0 |0 |49|

+ YEMU如何执行一条指令：解析操作码；操作数译码；更新PC。

## D1 NEMU
+ 取指
+ 译码
  + `include/cpu/decode.h`: struct `Decode`
  + `vaddr_ifetch()`又会通过`paddr_read()`来访问物理内存中的内容
  + `AUIPC` (add upper immediate to pc)
  + 宏BITS和SEXT, 它们均在`nemu/include/macro.h`
    + SEXT利用位域来扩展为`int64_t`，返回`uint64_t`，如果在RISCV32下，会被切分最低位。根据提升规则，不断加减`最大值+1`
  + `./src/isa/riscv32/inst.c:decode_exec()` `INSTPAT(模式字符串, 指令名称, 指令类型, 指令执行操作);` 指令名称在代码中仅当注释使用, 不参与宏展开; 指令类型用于后续译码过程; 而指令执行操作则是通过C代码来模拟指令执行的真正行为.
    + 看起来用`union` `struct` 和`switch`完全可以覆盖RISC-V的场景，感觉上述的抽象是为了兼容CISC
    + 辅助宏：`./src/isa/riscv32/inst.c`
  + 立即数背后的故事
    + 假设我们需要将NEMU运行在Motorola 68k的机器上（大端）：思考所有指令，取指和译码均不会有区别。当涉及多个字节长度转换为值运算时就会有问题，进位会在字节之间有区别。
      + 运算前需要颠倒位顺序
    + 假设我们需要把Motorola 68k作为一个新的ISA加入到NEMU中：运算前需要颠倒位顺序
  + 立即数背后的故事(2)
    + mips32和riscv32的指令长度只有32位, 因此它们不能像x86那样, 把C代码中的32位常数直接编码到一条指令中. 思考一下, mips32和riscv32应该如何解决这个问题：按照之前RISC-V手册中的规定，指令中的数字扩展，同时提供Load和store指令直接在寄存器和RAM交互。
  + 保存预处理结果`-save-temps`
+ 执行
+ 更新PC
  + 静态指令和动态指令：NEMU将地址存在`snpc`和`dnpc`
+ 结构化程序设计
  + 整理一条指令在NEMU中的执行过程：`exec_once()` `inst.c:isa_exec_once`调用`inst_fetch`取指并更新`snpc`为下一个指令，`inst.c:decode_exec`更新dnpc为snpc，也可以根据指令，译码并更新值；`exec_once()`更新PC`cpu.pc=s->dnpc` 
+ 准备交叉编译环境: `sudo pacman -Syy riscv64-linux-gnu-binutils riscv64-linux-gnu-gcc`
  + `fatal error: gnu/stubs-ilp32.h: No such file or directory`：似乎是gcc编译时没有包括[相应的abi](https://github.com/compiler-explorer/compiler-explorer/issues/6648)
  + 按照教程提供的修改建议注释
+ 执行了未实现指令会出现报错信息: `inst.c:decode_exec`从上向下匹配，直到全`?`匹配，返回`INV`(`invalid_inst`的宏定义)，打印报错信息
+ 实现指令：
  + 调用`${AM_HOME}/Makefile`指定`ARCH`生成`Makefile.%`，根据`Makefile.%`编译运行，日志输入`.result`，最终`Makefile.%`和日志被删除
  + 查看反汇编结果`am-kernels/tests/cpu-tests/build/dummy-$ISA-nemu.txt` `li` `mv`指令是用`addi`指令替代的，`j`用`jal`代替
  + `auipc`可以用于查看PC值
  + `jal`指令的`imm`在0位需要补0，应该是为了扩展+-区域，且`SEXT`利用位域来扩展，只需要使用一次即可
+ 更多指令：报错时从低位向高位打印
  + `word_t`
  + `assembler pseudoinstruction` dump出的机器指令，实际对应手册的另外一个，如`sltiu`对应`seqz`
  + `word_t`在`common.h`定义为`unsigned`
  + `sltiu` sign extend 但是按照unsigned解读
  + `sltu`会用第0个寄存器`x0===0`特殊判断
  + `memory/host.h`提供了`host_write`可以被`paddr_write`调用，提供1、2、4字节选择；`host_read`返回的值是不同长度，需要扩展，
  + `div`程序用到了chap13 M extension中的`mul`指令，在手册的Tab.11中有包含移除和除0操作时的行为，之前没有注意，导致实现会报`FPE`错误，溢出通过扩展为64位解决，除0通过判断解决。
  + `mulh`返回乘积的高32位，直接扩展为64位运算，可以保证不溢出，然后取出高32位返回。实现时注意C语言从`uint32_t`到`int64_t`是无法符号扩展的，因为`int64_t`的表示范围包括了`uint32_t`，正确方式是从`uint32_t`经`int32_t`变为`int64_t`
+ 自动测试
```Makefile
target:=$(patsubst tests/%.c,build/%_suc,$(filter-out tests/string.c tests/hello-str.c,$(wildcard tests/*.c)))
.PHONY: all
all: $(target)

build/%_suc: input.txt
        make ARCH=riscv32-nemu ALL=$* run < input.txt > $@
        grep -q "HIT GOOD TRAP" $@ || { mv $@ $@.fail; exit 1; }
```
+ 分支延迟槽：避免流水线停顿
+ gcc为mips32程序的生成提供了一个-fno-delayed-branch的编译选项, 让mips32程序中的延迟槽中都放置nop指令. 这样以后, 执行跳转指令之后, 接下来就可以直接执行跳转目标的指令了, 因为延迟槽中都是nop指令, 就算不执行它, 也不会影响程序的正确性.
+ 指令名对照：在手册中找到对应的指令，可以直接搜索。
## D2 程序的机器级表示
程序如何转化为RISC-V32的指令
+ 32位常数装入：`lui`和`addi`组合，lui步长4096，由于`addi`加载时有符号扩展调整范围为`-2048,2047`，所以必须在`lui`上处理对部分区域多加1
+ 64位常数装入RV64： 可以用类似32位加载并移位`li,addi,slli`或者直接访存`ld` 其中`li`是伪指令
  + 伪指令的定义可参考[《RISC-V汇编语言编程手册》](https://github.com/riscv-non-isa/riscv-asm-manual/blob/main/src/asm-manual.adoc#pseudoinstructions)
+ 64位常数装入RV32：需要两个寄存器拼接为64位
+ RISC-V两套整数ABI `ILP32 ABI`(RV32) `LP64 ABI`(RV64)定义了变量不同长度
+ 程序的内存布局：静态数据区，堆区，栈区
+ 变量的访问
  + 不同类型使用不同的 `lw` `sw`
  + unsigned int 在RV64使用`lw`而不是`lwu`
+ 变量分配对齐：效率
+ RV32进行64位加法：`sltu`比较确认是否进位
+ 符号
  + 有符号加法和无符号加法的行为完全一致
  + 乘, 除, 取余均有两种符号的指令
+ 条件分支和循环
  + 通过移动区间到`[0,r]`，使用无符号比较指令快速比较区间
  + 在`switch-case`的例子中用到了类似的技巧，构造查找表，注意样例提供的计算方式
  + 循环
+ 未定义行为：
  + 整数加法溢出：编译器可能会直接优化
  + 移位：超出表示范围
  + 整数除0 `noinline`避免编译器展开函数，保持调用
+ 函数调用

## D3 AM
+ AM的作用：在[课件](https://ysyx.oscc.cc/slides/2306/11.html)中的架构图显示AM位于ISA和应用（包括OS）之间
  + klib提供架构无关的库函数，视频说是(kernel lib)，为什么不用glibc替换？
  + AM和操作系统提供的运行时环境有什么不同呢?
+ `abstract-machine/am/src/[isa/platform/native]/[soc/simulator]/trm.c`中存有不同架构和硬件对TRM的实现接口
  + TRM的API只提供堆区的起始和末尾, 而堆区的分配和管理需要程序自行维护. 当然, 程序也可以不使用堆区, 例如dummy
  + `halt`调用一条内联的汇编指令：`asm volatile("mv a0, %0; ebreak" : :"r"(code));`
    + [asm语法](http://www.ibiblio.org/gferg/ldp/GCC-Inline-Assembly-HOWTO.html)提到`%`用来引用operand，`r`代表constrains中的`register constraint`
+ 根据AM的运行时环境编译
  + ld的链接方式：使用`-T`覆盖，`abstract-machine/scripts/linker.ld`
+ 通过AM的Makefile可以默认启动批处理模式的NEMU
  + nemu中的`Makefile`中通过判断`CONFIG_TARGET_AM`来调用AM的Makefile，PA1中提到设置`TARGET_AM`可以产生`CONFIG_TARGET_AM`变量，这个时候nemu不会编译`init_monitor`（包含batch设置），而是编译`am_init_monitor`（不包含batch功能）
  + 所以实际这个问题对应的是PA1直接运行程序dummy的例子，其中的Makefile引用了AM的Makefile
  + AM的Makefile中根据`ARCH`调用`scripts/[ARCH].mk`，其中`scripts/riscv32-nemu.mk`调用`scripts/platform/nemu.mk`，并在其中定义了`run`作为target时需要执行的脚本。因此修改此处来更改运行nemu时传入参数即可，`NEMUFLAGS`中指定了log的文件名，可以增加batch的参数。
+ 更多的测例
  + `div`, `rem`测例均未通过
