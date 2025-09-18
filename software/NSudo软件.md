# NSudo软件

#software #windows

nsudo是一个系统管理软件,可以使用不同的权限来打开任意程序.可以使用"trust installer"权限打开命令行工具. 之后就可以删除所有可能的服务

比如:要删除windows更新服务,可以使用以下命令:

```sh
sc delete wuauserv
sc delete waasmedicsvc
```



很多软件删除之后还又残留的服务留在系统中,也可以使用sc命令删除.