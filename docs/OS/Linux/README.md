# Linux
## 网络
### ncat和netcat
用这两个工具都可以为ssh配置代理，当有一个http代理，希望本地的ssh流量经过该代理
+ ssh配置到域名`xxx.com`的代理，需要修改`.ssh/config`文件，文件权限确保为600
```shell
# .ssh/config netcat使用下面的命令
Host xxx.com
	ProxyCommand nc -x <http代理主机>:<http代理端口> -Xconnect %h %p
```
+ ssh配置匹配到域名`xxx.com`，且本地主机名包含`suk`，连接本地的http代理 `127.0.0.1:12600`
```shell
# .ssh/config netcat使用下面的命令
Match originalhost xxx.com exec "hostname | egrep -q 'suk'"
        ProxyCommand nc -x <http代理主机>:<http代理端口> -Xconnect %h %p
# .ssh/config ncat使用下面的命令
        ProxyCommand nc --proxy <http代理主机>:<http代理端口> --proxy-type http %h %p
```
## 虚拟机
### LXC
[文档](https://linuxcontainers.org/lxc/getting-started/)
+ [Archlinux](https://wiki.archlinux.org/title/Linux_Container)

## 性能
详细内容可参见`性能`章节
### htop
htop中CPU过多，导致无法看到进程，可以在`~/.config/htop/htoprc`中添加下面的行，调整CPU显示的格式
```shell
header_layout=two_50_50
column_meters_0=CPU Memory Swap
column_meter_modes_0=1 1 1
column_meters_1=Tasks LoadAverage Uptime
column_meter_modes_1=2 2 2
```
### sysbench
运行测例测试单核性能。

### 内核中断
irqtop - utility to display kernel interrupt information
```shell
irqtop -s delta
```
### 虚拟内存
vmstat - Report virtual memory statistics

## 文档
### Texlive
+ `texlive-lang`一定要安装，才能支持中文的一些样式
```shell
pacman -Syu texlive texlive-lang
```
+ 更新texlive后会遇到无法编译的问题`/home/aiqiang/.texlive/texmf-var/web2c/xetex/xelatex.fmt made by different executable version, strings are different`，在Archlinux上有相关[解决方案](https://wiki.archlinux.org/title/TeX_Live/FAQ): `fmtutil --all`
  + 但是上面的命令只会更新系统目录下的fmt,所以需要使用`fmtutil --user --all`更新用户目录下的内容。

## 远程桌面
### Xrdp
简单易装，文档经验帖很多。

### Xpra
轻量级的远程桌面
```
xpra start :100
```
并配置当前terminal的DISPLAY
```
export DISPLAY=:100
```
然后在本底启动Xpra Client并连接至远程服务器，远程服务器的当前terminal就可以输入需要图形化的应用并显示内容。

## NUMA
NUMA(Non-uniform Memory Access):
+ CPU集成内存控制器
+ 每个CPU独立连接一部分内存（本地内存）
+ CPU之间通过QPI（Quick Path Interconnect）总线连接，连接另一个CPU上内存（远程内存）
`numactl -H`: 显示当前硬件的信息。

`lstopo --of svg > cpu_arch.svg`:查看CPU的拓扑图

## GParted
GParted可以执行复制分区的操作，类似`dd`
+ `dd`后UUID也会被拷贝，需要重新产生`tune2fs /目标分区 -U random` 修改新分区的UUID
+ `/etc/fstab`里挂载分区的内容也要同步修改
+ 用[SystemRescue](https://www.system-rescue.org/disk-partitioning/Repairing-a-damaged-Grub/)修复Grub；或者用boot-repair调整记录
