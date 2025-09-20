# 如何彻底停止windows更新服务

#windows #更新

随着我们对windows了解越来越深入,我们就会发现windows中有一个超级占用资源的服务"windows update". 当windows更新服务运行的时候,它会消耗电脑一半以上资源.通过常规手段无法禁用这个服务.

要禁用windows服务,我们需要完全停止两项服务:

- windows更新医生服务  
  在服务列表中**windows更新医生服务**全名是"windows update medic service", 注册的服务是"WaaSMedicSvc",它会定期启动并修复"windows更新服务".
- window更新服务  
  这个服务的注册名称是"wuauserv",它如果被启动,就会自动下载和安装windows更新,导致系统变慢变卡.

通常的方法是禁止这两项服务,但是过两天之后它们就会重新活跃.

彻底的做法是将这两项服务删除.

方法1:

1. 下载"NSudo"软件
2. 打开NSudo软件并使用"trust installer"权限打开命令行
3. 使用命令删除服务

```sh
sc delete wuauserv
sc delete waasmedicsvc
```



方法2: 如果要保留windows更新的能力,可以使用以下方法:

1. 停止`windows更新医生服务`  
   打开注册表,搜索“HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WaaSMedicSvc”,找到"Start",数值改为"4", 也可以使用命令行:

```
sc config WaaSMedicSvc start= disabled`
```

2. 注册表修改医生服务的FailureActions  
   注册表中修改"FailureActions"的二进制数据"0010"行的第5列"01"改为"00",修改"FailureActions"的二进制数据"0018"行的第5列,从"01"改为"00".然后保存

3. 确认修改医生服务成功  
   进入"服务"中找到`windows更新医生服务`,可以看到已经禁止,并且"恢复"标签里面也都是"无操作"

4. 停止window更新服务  
   在命令行中执行以下命令:

```
sc config wuauserv start= disabled
```

   

有问题请在公众号留言.