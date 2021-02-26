# CentOS7 中文支持設定

reference url : [https://www.imydl.tech/linux/450.html](https://www.imydl.tech/linux/450.html)

註: 如果在 CentOS7 安裝時選中文語系則預設語系可能就是"zh_CN.UTF-8"或"zh_TW.UTF-8"

首先需要中文字体以便支持命令行终端的中文显示需求：

`yum groupinstall "fonts"`

碰到提示输入 y 回车继续安装，大概需要安装50MB的东西！

（坑1，参考教程中用的是 CentOS 6 ，编辑修改的配置文件为 /etc/sysconfig/i18n， 我创建的版本 CentOS 7 改了字符配置文件为 /etc/locale.conf， 找了好久才找到答案。）

`sudo vim /etc/locale.conf`

按键 i 进入编辑模式, 把内容改为

`LANG="zh_TW.UTF-8"`

按键 Esc 退出编辑模式后, 输入 :wq 意为保存退出. 如果内容弄乱了就输入 :q! 意为强制退出不做改变

然后输入 reboot 重启命令，等10秒钟后再次用登陆主机。随便敲个 1 测试下就知道成没成功了，成功的提示是中文的：未找到命令