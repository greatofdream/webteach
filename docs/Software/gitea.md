# Gitea
[官方文档](https://docs.gitea.com/)

[debian/Ubuntu](https://gitlab.com/packaging/gitea)
## Database

## gitea
由于gitea默认的workdir相对于可执行文件，所以需要设置`GITEA_WORK_DIR`环境变量
+ 进入gitea用户，并启动初始化界面,我选择在7005端口启动
```shell
sudo su gitea
GITEA_WORK_DIR=/var/lib/gitea gitea web -p 7005
```
+ 在界面中填写数据库密码等信息
