# CentOS7 設定NTP校正時間

reference url : [https://www.opencli.com/linux/rhel-centos-7-setup-ntp-sync-time](https://www.opencli.com/linux/rhel-centos-7-setup-ntp-sync-time)

有時系統會出現時間不準的情況，當然可以手動校正時間，但每次都這樣做實在很累，最方便的方法是透過 NTP 自動同步時闁，以下是 RHEL 及 CentOS 7 的設定方法。

先安裝 ntp 套件:

`$ sudo yum install ntp -y`

安裝 ntp 套件後，可以用 ntpdate 指令連接到 ntp 伺服器同步時間，以下是適合台灣及香港使用的 ntp server:

`$ sudo ntpdate time.stdtime.gov.tw`

或

`$ sudo ntpdate stdtime.gov.hk`

上面的指令只會做一次時間同步，如果想自動同步，除了將上面指令放到 Shell Script, 也可以設定 ntpd deamon，編譯檔案 /etc/ntp.conf:

`$ sudo vi /etc/ntp.conf`

在 “Server” 設定需要使用的 ntp 伺服器。

然後用 systemctl 啟動 ntpd 及 設定開機自動啟動:

```
$ sudo systemctl start ntpd
$ sudo systemctl enable ntpd
```

這樣系統就會自動連接到 ntp 伺服器校正系統時間。
