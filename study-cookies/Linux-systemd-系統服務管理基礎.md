# Linux-systemd-系統服務管理基礎.md

## 目錄

### Systemd 基本服務管理
在 Systemd 中每一個系統服務就稱為一個服務單位（unit），而服務單位又可以區分為 service、socket、target、path、snapshot、timer 等多種不同的類型（type），我們可以從設定檔的附檔名來判斷該服務單位所屬的類型，最常見的就是以 .service 結尾的系統服務，大部分的伺服器都是屬於這種。

如果要管理 Systemd 中的各種服務，可以使用 systemctl 這個指令，配合各種操作指令來進行各種操作。

```systemctl 操作指令 服務名稱.service```

啟動系統服務，可以使用 start 操作指令，例如啟動 Nginx 網頁伺服器:
```
# 啟動 nginx 網頁伺服器服務
sudo systemctl start nginx.service
```

若要顯示指定的系統服務狀態，可以使用 status 操作指令:
```
# 顯示 nginx 服務狀態
systemctl status nginx.service
```

若要停止指定的系統服務狀態，可以使用 stop 操作指令:
```
# 停止 nginx 服務
sudo systemctl stop nginx.service
```

當我們在指定服務名稱時，可以將結尾的 .service 省略，這樣可以少打一些字，例如:
```
# 啟動 nginx 網頁伺服器服務
sudo systemctl start nginx

# 顯示 nginx 服務狀態
systemctl status nginx

# 停止 nginx 服務
sudo systemctl stop nginx
```

### 啟用、停用開機自動啟動服務
systemctl 的 start 與 stop 兩個操作指令是用來控制目前服務的狀態，如果想要設定開機自動啟動服務的話，就要改用 enable 與 disable
```
# 設定開機自動啟動 nginx 網頁伺服器
sudo systemctl enable nginx

# 取消開機自動啟動 nginx 網頁伺服器
sudo systemctl disable nginx
```

### 檢測系統服務狀態
以下是一些用來檢測系統服務狀態的操作指令：
```
# 檢查 nginx 服務是否正在運行
systemctl is-active nginx.service

# 檢查 nginx 服務是否有設定開機自動啟動
systemctl is-enabled nginx.service

# 檢查 nginx 服務是否啟動失敗
systemctl is-failed nginx.service
```

這幾個指令在撰寫系統管理的 shell 指令稿時會很好用，以下是一個範例：
```
# 判斷服務狀態的 Bash 指令稿
IS_ACT=`systemctl is-active nginx.service`
if [ "$IS_ACT" == "active" ]; then
  echo "Nginx is active."
else
  echo "Nginx is not active."
fi
```

假設我們想要撰寫一個指令稿，定期檢查特定服務，在服務出問題的時候自動重新啟動，或是發送 Email 通知，就可以從這段指令稿來修改。


### 列出 Systemd 所有服務
若想要列出所有已啟動的服務，可以使用 list-units 操作指令：
```
# 列出所有已啟動的服務
systemctl list-units

UNIT                 LOAD   ACTIVE SUB     DESCRIPTION
atd.service          loaded active running ATD daemon
avahi-daemon.service loaded active running Avahi mDNS/DNS-SD Stack
dbus.service         loaded active running D-Bus System Message Bus
[略]
```

list-units 的輸出包含許多欄位，以下是各個欄位的說明。

欄位|說明
---|---
UNIT|Systemd 服務單位（unit）名稱。
LOAD|該服務單位設定檔是否有被 Systemd 載入至記憶體中。
ACTIVE|是否已經正常啟動。
SUB|更詳細的狀態說明，值會因為不同服務有所不同。
DESCRIPTION|關於此服務的簡單說明。

```
# 列出所有已啟動的服務
systemctl

# 列出系統上所有的服務
systemctl list-units --all

# 列出系統上所有的服務
systemctl list-units --all

# 列出系統上所有未啟動的服務
systemctl list-units --all --state=inactive

# 只列出系統上所有 service 類型的服務
systemctl list-units --type=service
```

### 服務內部設定與狀態
```
# 查看服務內部設定檔
systemctl cat atd.service

# 查看特定服務的相依服務
systemctl list-dependencies sshd.service

# 查看特定服務的底層設定值
systemctl show sshd.service

# 查看特定服務的特定設定值
systemctl show sshd.service -p MainPID
```

### 遮蔽特定服務
```
# 遮蔽特定服務(服務被遮蔽之後，就會無法啟動)
sudo systemctl mask nginx.service

# 嘗試啟動被遮蔽的服務(服務被遮蔽之後，就會無法啟動)
sudo systemctl start nginx.service

# 恢復被遮蔽的服務
sudo systemctl unmask nginx.service

# 嘗試啟動被遮蔽的服務(服務取消遮蔽之後，就能啟動)
sudo systemctl start nginx.service
```

### 編輯服務設定
```
# 編輯服務設定
sudo systemctl edit nginx.service
```

執行這行指令之後，會開啟一個空白的檔案，讓管理者將新的設定值寫在裡面，存檔離開後，Systemd 會在 /etc/systemd/system/ 目錄之下，建立一個服務名稱加上 .d 的子目錄（以這個例子來說就是 nginx.service.d），然後將新增的設定寫在這個子目錄下的 override.conf 中，之後 Systemd 在載入服務設定檔時，就會自動優先採用此處的設定。

如果想要直接編輯完整的設定檔，可以加上 --full 參數:
```
# 編輯服務設定（顯示完整設定內容）
sudo systemctl edit --full nginx.service
```

這樣的修改方式就會直接把完整的設定寫入 /etc/systemd/system/ 目錄底下，而 Systemd 會優先採用此處的設定值。

如果想要移除先前用 edit 修改的設定，只要直接刪除對應的 .d 目錄即可：
```
# 刪除自己修改的設定
sudo rm -r /etc/systemd/system/nginx.service.d
```

如果是以 --full 模式修改的話，就要刪除對應的設定檔，然後重新載入 Systemd：
```
# 刪除自己修改的設定（full 模式）
sudo rm /etc/systemd/system/nginx.service

# 重新載入 Systemd
sudo systemctl daemon-reload
```

如果想要自己新增 Systemd 的服務單位，可參考 [Linux 建立自訂 Systemd 服務教學文章](https://blog.gtwang.org/linux/linux-create-systemd-service-unit-for-python-echo-server-tutorial-examples/)。

### 參考
[Linux systemd 系統服務管理基礎教學與範例](https://blog.gtwang.org/linux/linux-basic-systemctl-systemd-service-unit-tutorial-examples/)