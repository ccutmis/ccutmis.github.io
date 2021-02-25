# CentOS7 系統時區設定

reference url : [hhttps://blog.gtwang.org/linux/centos-linux-change-system-timezone-command-tutorial/](https://blog.gtwang.org/linux/centos-linux-change-system-timezone-command-tutorial/)

剛安裝好的 CentOS Linux 伺服器若沒有設定好時區，那麼就算透過網路校時之後，時間還是錯的，例如時區若是設定成美國紐約的時間，就會與台灣本地間時間相差 13 個小時，這樣會讓系統產生許多問題，例如 log 紀錄檔的時間都會不對，這種狀況就要調整時區的設定。

系統的時區可以從時間的資訊看出來：

`date`

> Wed Mar 29 07:19:32 EDT 2017

在時間的輸出訊息中會包含時區的資訊，像這裡的 EDT 就是代表美國紐約的時間，而台灣的時區簡寫是 CST，如果時區不對就要進行調整。

系統的 /usr/share/zoneinfo/ 目錄中存放了全球所有的時區設定檔，每一個檔案代表一個時區，例如 /usr/share/zoneinfo/America/New_York 代表美國紐約的時區。

/etc/localtime 這個連結檔是系統用來紀錄時區設定的檔案，從這個檔案的內容也可以看出目前系統的時區設定：

`ls -l /etc/localtime`

更改時區前，先查看一下可用的時區名稱：

`timedatectl list-timezones`

這個指令會以 less 指令的方式，列出所有的時區。我們也可以直接用 grep 尋找台灣所屬的台北時區：

```
timedatectl list-timezones | grep Taipei
Asia/Taipei
```

得知亞洲的台北時區名稱後，更改系統時區設定：

`sudo timedatectl set-timezone Asia/Taipei`

設定完成之後，再用 date 檢查一次時區：

`date`

或是查看 /etc/localtime：

`ls -l /etc/localtime`