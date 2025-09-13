# 如何打开android电视开发者模式

#androidTV #开发者模式

android电视有些时候安装不上自己下载的软件,比如当贝播放器, 需要打开调试功能来安装.

通用开发者功能打开的方法是:

1. 打开调试功能
   电视机定位到"设置","关于","版本"(这里的版本可能是内部版本), 连续点n次(n>8)后出现提示,即可打开调试功能
2. 在设置里面新出现"开发者选项",找到打开
3. 手机端下载安装"甲壳虫adb助手"
   打开软件,输入电视机的ip地址,就可以调试安装电视软件
4. 完成

进入adb后的命令:

```sh
pm install -r /data/local/tmp/your_apk_file.apk
pm list packages
pm uninstall 安装包包名
```

如果使用电脑端adb,则使用以下命令:

```sh
adb shell pm list packages
adb shell pm install -r /data/local/tmp/your_apk_file.apk
adb install -r xxxx.apk # 强制安装
adb uninstall 安装包包名
```

