# Linux
## ncat和netcat
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
## LXC
[文档](https://linuxcontainers.org/lxc/getting-started/)
+ [Archlinux](https://wiki.archlinux.org/title/Linux_Container)

## htop
htop中CPU过多，导致无法看到进程，可以在`~/.config/htop/htoprc`中添加下面的行，调整CPU显示的格式
```shell
header_layout=two_50_50
column_meters_0=CPU Memory Swap
column_meter_modes_0=1 1 1
column_meters_1=Tasks LoadAverage Uptime
column_meter_modes_1=2 2 2
```
## Texlive
+ `texlive-lang`一定要安装，才能支持中文的一些样式
```shell
pacman -Syu texlive texlive-lang
```
