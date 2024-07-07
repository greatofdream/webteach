# 快捷键
## Windows
[Reference](https://support.microsoft.com/zh-cn/windows/windows-%E9%94%AE%E7%9B%98%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F-3d444b08-3a00-abd6-67da-ecfc07e86b98)
+ `Alt`+`Tab`: 应用之间切换
+ `win`+`B`: 选择任务托盘。
+ `win`+`Shift`+`方向键`: 移动当前窗口到另外一个屏幕
## Vim
vim操作
+ `d`: delete,删除，该命令会同时将删除内容复制到寄存器中，所以可以有补救机会将误删内容粘贴回来
+ `y`: yank,复制
+ `p`: put,粘贴
### 寄存器
`:reg`查看寄存器内容

可读写寄存器
+ `""`:无名寄存器，缺省寄存器时默认使用该寄存器
+ `"0`:复制专用寄存器,使用`y`命令会将内容拷贝到无名寄存器和该寄存器
+ `"a`-`"z`:命名寄存器，可以通过`"ay`，`"ap`调用
+ `"+`:系统剪贴板
+ `"*`:选择寄存器，保存上次高亮选中的文本
需要注意系统剪贴板对于基于X11系统(Linux)生效，如果使用SSH远程连接必须打开X11 Forwarding选项(`ssh -Y`)

只读寄存器
+ `".`:最后插入的字符串
+ `"%`:当前文件路径
+ `":`:最后执行的vim命令
+ `"/`:上次查找的模式
+ `"#`:
### 剪贴板
+ vim提供12个剪贴板，它们的名字分别为vim有11个粘贴板，分别是0、1、2、...、9、a、`“`。
+ 如果开启了系统剪贴板，则会另外多出两个`：+`和`*`。
+ 使用`:reg命令`，可以显示vim中的寄存器内容，顺便查看各个粘贴板里的内容。
vim中使用`y`会复制到`*`粘贴板内。
## Tmux
[Manual](https://github.com/tmux/tmux/wiki/Getting-Started)
[参考](http://ruanyifeng.com/blog/2019/10/tmux.html)
+ `Ctrl+b` `x`: 关闭当前窗格

`Tmux` [仓库](ttps://github.com/tmux/tmux)
+ `cmd-new-session.c`
  + `cmd_new_session_exec`
```c
if (!detached && !already_attached) {
		if (server_client_open(c, &cause) != 0) {
			cmdq_error(item, "open terminal failed: %s", cause);
			free(cause);
			goto fail;
		}
	}
```
+ `server-client.c`
  + `server_client_open`: 
```c
if (!(c->flags & CLIENT_TERMINAL)) {
		*cause = xstrdup("not a terminal");
		return (-1);
	}

	if (tty_open(&c->tty, cause) != 0)
		return (-1);
```
+ `tty.c`
  + `tty_open`
```
tty->term = tty_term_create(tty, c->term_name, c->term_caps,
	    c->term_ncaps, &c->term_features, cause);
```
+ `tty-term.c`
  + `tty_term_create`: 比较`caps[i]`和`tty_term_codes[j]`，`term->codes[j]`设置`type`,`value`为`caps[i]`的`=`后面的值
```c
if (!tty_term_has(term, TTYC_CLEAR)) {
		xasprintf(cause, "terminal does not support clear");
		goto error;
	}
```
+ `caps`值的设置
