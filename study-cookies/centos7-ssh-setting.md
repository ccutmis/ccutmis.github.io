# CentOS7安裝SSH教學

reference url : [https://dotblogs.com.tw/michaelchen/2015/01/06/centos_install_ssh](https://dotblogs.com.tw/michaelchen/2015/01/06/centos_install_ssh)

如果遇上系統出事~但是人剛好不在的時候，要怎麼辦?

其中一種方式就是使用SSH連進系統終端機

使用文字介面來操作

P.S 另一種方法是像Windows的遠端桌面(XRDP)，可以用滑鼠操作

那就來開始安裝吧

1. 輸入    `sudo yum install openssh*`    開始安裝

2. 輸入    `sudo vi /etc/ssh/sshd_config`    進行設定

這些設定是一些比較基本的

首先先把port改掉

`port 52041`

再來是限定登入者

`AllowUsers 使用者帳號1 使用者帳號2 .....`

這一行在設定檔中是沒有的~請自行加入

再來把這兩行的註解拿掉

```
PermitEmptyPasswords no
PasswordAuthentication yes
```

再來限制root帳號登入

`PermitRootLogin no`

 大致上這樣就差不多了!

3. 輸入    `sudo systemctl restart sshd.service`    重新啟動

4. 輸入    `sudo systemctl enable sshd.service`    設定開機啟動

5. 輸入    `sudo firewall-cmd --permanent --zone=public --add-port=52041/tcp`    開放防火牆

6. 輸入    `sudo firewall-cmd --reload`    重新讀取防火牆規則

以上ssh就已經安裝設定完成

可以輸入 `netstat -ant` 看看剛剛的PORT有沒有加入監控中

P.S CentOS 7 的最小安裝並未把 netstat 安裝進去，所以如果執行失敗請輸入 `sudo yum install net-tools`

確定都OK後就可以使用 putty 等軟體連進去系統了

