# 网卡
+ 启动网卡
```shell
ip link <interface> up
```
+ 获取ip地址
```shell
dhclient
```
## AX210
AX210（pcie插口） + manjaro5.10.204
+ 检查pcie情况，显示可以正常识别这个设备，并且load了`iwlwifi`这个模块驱动
```shell
$ lspci -k | grep -A 2 -i net
```
+ 检查网卡，看不到这个网卡
```shell
$ ip a
```
+ 检查启动日志中包含`iwlwifi`驱动的信息
```shell
$ journalctl -b 0 |grep iwlwifi
iwlwifi 0000:0a:00.0: enabling device (0000 -> 0002)
Timeout waiting for PNVM load!
Faied to start RT ucode: -110
iwl_trans_send_cmd bad state = 0
```
据称该错误是由于linux kernel版本导致，根据[这里的issue](https://bugzilla.kernel.org/show_bug.cgi?id=212371)显示AX210会报上述错误，它提供了一个通过修改pnvm文件的方式避免冲突的方案，在[知乎这个帖子](https://zhuanlan.zhihu.com/p/578531885)也提到了，但是我选择直接将内核升级到5.15.145，解决了这个问题。
