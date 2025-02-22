# 性能测试
程序的性能测试工具很多
## 通用
+ 监控工具
  + `htop`:基础，可以监测CPU,内存，swap占用；CPU占用处可以显示user,sys时间占用。
  + `perf`: `h`显示help内容,`a`显示调用的函数的汇编
    + `perf top`可以显示不同事件占用的时间。
    + `perf top --sort comm,dso`: 显示更高级别的程序占用时间
    + `timeout -s SIGINT 100 perf stat -p 96541`:统计某个进程中的信息，如IPC
  + `pidstat`: 查看某个进程所在CPU
+ 程序检查工具
  + `strace`: 后面接执行的程序命令，可以打印程序调用了哪些函数。
关闭多个程序后，逐一开启，测量最后一个未关闭程序的IPC
```shell
pids=( $(pgrep -u greatofdream python3 -x | head -n-1) )
for p in ${pids[@]}; do kill -STOP $p ;done
i=1
for p in ${pids[@]}; do kill -CONT $p; echo $p $i; sleep 5; perf stat -p 96543 -- sleep 20 2> other-$i; i=$((i+1)) ; done
```
绘图
```shell
for i in $(seq 0 48); do echo $i $(sed -n -r "s/.*#(.*[[:digit:]])\s+insn per cycle/\1/p" other-$i); done | feedgnuplot --domain --lines --points --hardcopy IPC.svg --unset grid --exit
```
## Python
python有很多独特的工具
+ `CProfile`: 假设有一程序 foo.py，想得知里面各个函数的运算耗时，以便发现性能瓶颈。若直接运行程序的方法为 `python foo.py <args>`，则运行
```bash
python3 -m cProfile foo.py <args>
```

即可在程序运行结束后获得一系列输出结果，分别展示了各个 python 函数调用的次数、时间等信息

如果程序耗时长、输出内容很多，你可以将 profile 结果保存为一个文件：

```bash
python3 -m cProfile -o foo_profile.stat foo.py <args>
```

并使用
```bash
echo 'stats' | python -m pstats foo_profile.stat
``` 
像之前一样查看。`python -m pstats foo_profile.stat` 则可以进入 python 解释器动态查看 profile 内容。

另外，输出的 `foo_profile.stat` 可以使用 `gprof2dot` 绘图：

```bash
gprof2dot --format=pstats --node-label=self-time --node-label=self-time-percentage --node-label=total-time --node-label=total-time-percentage foo_profile.stat > foo_profile.dot
```

绘制出的 `foo_profile.dot` 图形可以使用 `dot` 转化为各种格式的图片。以矢量图 svg 为例：
```bash
dot -Tsvg foo_profile.dot > foo_profile.svg
```
+ [`lineprofile`](https://github.com/pyutils/line_profiler?tab=readme-ov-file#line_profiler): 逐行计算耗时。当锁定了最慢的函数后，可通过逐行 profile 来缩小慢代码的范围。
```shell
kernprof -l  ReconCorr.py -i RECON_BONSAI/MC_SKG4_r31564_sk7tune/sk7_0.899616/091473/000005.h5 -o RECON_TQ/MC_SKG4_r31564_sk7tune/sk7_0.899616/Neff/091473/000005_T_Corr.h5 --sum sumdat/linac_sk7_runsum.dat --run 091473 --phase sk7Process run 91473; Normal run 91439
```
查看每一行的耗时
```shell
 python -m line_profiler ReconCorr.py.lprof
```


