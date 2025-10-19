# C语言
## ANSI C 还是 POSIX C?
> 在C语言中可以用write或者fwrite将内容写到文件流中，但是查询文档会发现write只有在[Linux Maunal](https://man7.org/linux/man-pages/man2/write.2.html)里出现(可以通过`man 2 write`在linux中shell里直接查找文档)，fwrite在[C语言文档](https://cplusplus.com/reference/cstdio/fwrite/)中出现。还有很多类似的函数也都有以上的区别。[有些人认为是POSIX和ANSI C上不同的函数](http://computer-programming-forum.com/47-c-language/13f0d788470da875.htm)。

C语言的标准有以下几种
+ 1989年ANSI C标准，在GCC编译器是`C89`
+ 1999年ISO C标准，在GCC编译器是`C99`
+ 目前是 标准 C(standard C)
[GNU文档](https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html)并没有说清楚standard C是什么。[cpp参考](https://en.cppreference.com/w/c/language/history)列出了详细的C标准历史.

当使用`man 2 wirte`时，文档开头标志这是一个`System Call`，而且作为标准C库的一个函数。查看[GNU C库文档](https://www.gnu.org/software/libc/manual/html_node/POSIX.html)，可以发现GNU C库使用的是ISO POSIX标准，它是ISO C的超集，里面提供里除了ISO C标准要求的函数，还提供对特定操作系统底层的支持。而[ISO C](https://open-std.org/JTC1/SC22/WG14/www/docs/n1570.pdf)中并没有`write`这个函数，所以可以证实这个函数来自POSIX标准。另外[Microsoft文档](https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/posix-write?view=msvc-170)也证实这是一个POSIX标准的函数。

## 预处理
参考[一生一芯](https://ysyx.oscc.cc/slides/2306/04.html#/%E5%AE%9E%E7%8E%B0%E5%AE%9A%E4%B9%89%E8%A1%8C%E4%B8%BAimplementation-defined-behavior)

预处理等同于替换文本
+ 头文件替换
+ 宏替换

可以使用`gcc`的`-E`参数查看预处理的结果,可以加上`verbose`显示一些额外信息
```shell
gcc -E a.c
gcc -E a.c -v > /dev/null
```
+ `-E`:停在预处理阶段
+ `-v`或者`--verbose`: 将执行的命令输出到标准错误输出
+ `>/dev/null`将标准输出重定向到`/dev/null`
+ `-I`: 指定头文件包含路径，默认顺序
  + 对于双引号包括的头文件，当前文件所在目录
  + 对于双引号包括的头文件，查找被`-iquote`指定的目录
  + `-I`指定的目录
  + `-isystem`指定的目录
  + 标准系统目录
  + `-idirafter`指定的目录

## 编译
编译包括多个阶段，借助`clang`可以看到各个阶段的步骤，功能等价与gcc,但是可以更好的展示编译的中间步骤
+ 词法分析: 识别并记录源文件的每一个token
```shell
clang -fsyntax-only -Xclang -dump-tokens a.c
```
+ 语法分析:将token组成树状结构(AST, Abstract Syntax Tree),报告语法错误
```shell
clang -fsyntax-only -Xclang -ast-dump a.c
```
+ 语义分析:按照C语言的语义确定AST中每个表达式的类型,clang的-ast-dump把语义信息也一起输出了
  + 静态程序分析：`clang a.c --analyze -Xanalyzer -analyzer-output=text`
+ 中间代码生成:中间表示(IR) = 编译器定义的, 面向编译场景的指令集;将C语言状态机翻译成IR状态机。pclang使用的中间代码叫LLVM IR, gcc使用的中间代码叫GIMPLE。
```shell
clang -S -emit-llvm a.c
```
+ 优化:比如下面代码例子将常数预先计算出来(常数传播)，此外还有死代码消除、冗余操作消除、代码强度消减、公共子表达式、循环不变代码外提、函数内联。开启`-O1`后中间代码会少
  + 对volatile修饰变量的访问需要严格执行,因此不会被常数传播优化影响。volatile 关键字的目的是告诉编译器：这个变量可能会被编译器不知道的方式（例如，硬件、中断服务程序、或在多线程中被其他线程）在任何时候修改。
  + 程序结束时, 写入文件的数据需要与严格执行时一致
  + 交互式设备的输入输出(stdio.h)需要与严格执行时一致
```shell
clang -S -foptimization-record-file=- a.c
clang -S -foptimization-record-file=- a.c -O1
```
+ 目标代码生成: 将IR状态机翻译成处理器ISA状态机;ISA相关优化，通过time report观察clang尝试了哪些优化工作，`clang -S a.c -ftime-report`
```shell
clang -S a.c
clang -S a.c --target=riscv32-linux-gnu
gcc -S a.c   # 也可以用gcc生成
# apt-get install g++-riscv64-linux-gnu
riscv64-linux-gnu-gcc -march=rv32g -mabi=ilp32 -S a.c
```

## 汇编
根据指令集手册, 把汇编代码(指令的符号化表示)翻译成二进制目标文件(指令的编码表示)
```shell
gcc -c a.c
riscv64-linux-gnu-gcc -march=rv32g -mabi=ilp32 -c a.c
# alias rv32gcc="riscv64-linux-gnu-gcc -march=rv32g -mabi=ilp32"
```
二进制文件不能用文本编辑器打开来阅读了,需要binutils(Binary Utilities)或者llvm的工具链
```shell
objdump -d a.o
riscv64-linux-gnu-objdump -d a.o
# alias rvobjdump="riscv64-linux-gnu-objdump"
llvm-objdump -d a.o # llvm的工具链可以自动识别目标文件的架构, 用起来更方便
```

## 链接

```shell
gcc a.c --verbose
gcc a.c --verbose 2>&1 | tail -n 2 | head -n 1 | tr ' ' '\n' | grep '\.o$'
```

有很多crtxxx.o的文件
+ crt = C runtime, C程序的运行时环境(的一部分)
+ 可以通过objdump确认

用strace和gdb的`starti`可以看到程序从ld链接库的`_start`开始
## 实现定义行为和ABI(Application Binary Interface)
+ 只定义了类型的最小范围
+ 未指定行为(Unspecified Behavior)C标准提供了多种行为可选, 具体实现需要选择
+ 实现定义行为(Implementation-defined Behavior)
+ 未定义行为(Undefined Behavior)程序/数据不符合标准的行为,完全没说会发生什么, 一切皆有可能
  + 序列点：在`一站式C编程`也提到了，表达式中函数调用的顺序是未定义的。详细参看[C99手册](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf)。

ABI(Application Binary Interface), 具体包含
+ 处理器的指令集, 寄存器结构, 栈的组织, 访存类型等
+ 处理器可直接访问的基本数据类型的大小, 布局, 对齐方式
+ 调用约定, 用于规定函数的参数如何传递, 返回值如何获取
+ 应用程序如何向操作系统发起系统调用
+ 目标文件的格式, 支持的运行库等

ABI手册是计算机系统软硬件协同的重要体现
+ 程序的运行结果与源代码, 编译器, 运行时环境, OS, 硬件等都有关系

## 环境变量
在c程序中打印环境变量
```cpp
extern char **environ;

int main(int argc,char **argv)
 {
               printf("%p\n", (void*)environ);
}
```
## 虚函数
[CSDN的虚函数介绍](https://blog.csdn.net/haoel/article/details/1948051)
```cpp
#include <iostream>
#include <cstdint>
using namespace std;
class Base {

     public:

            virtual void f() { cout << "Base::f" << endl; }

            virtual void g() { cout << "Base::g" << endl; }

            virtual void h() { cout << "Base::h" << endl; }

 

};
          typedef void(*Fun)(void);

int main(){

            Base b;

            Fun pFun = nullptr;

            cout << "虚函数表地址：" << (intptr_t*)(&b) << endl;
            cout << "虚函数表 — 第一个函数在虚表中的地址：" << (intptr_t*)*(intptr_t*)(&b) << "第一个函数地址：" << (intptr_t*)*(intptr_t*)*(intptr_t*)(&b) << endl;
            pFun = (Fun)*((intptr_t*)*(intptr_t*)(&b));
            pFun();

            cout << "虚函数表 — 第二个函数在虚表地址：" << (intptr_t*)(*(intptr_t*)(&b)  + sizeof(intptr_t)) << "第2个函数地址：" << (intptr_t*)*(intptr_t*)(*(intptr_t*)(&b) + sizeof(intptr_t)) << endl;
            pFun = (Fun)*((intptr_t*)(*(intptr_t*)(&b)  + sizeof(intptr_t)));
            pFun();
	    return 0;
}
```

## 函数返回值
+ 当编译的函数返回值在实现中不存在时，编译通过，但是运行时会报`Segmentation fault`
