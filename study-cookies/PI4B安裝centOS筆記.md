# RaspberryPI4B 安裝 centOS筆記

1. 從 centOS.mirrorServer 下載 ...armv7hl-RaspberryPI-Minimal-4...sda.raw.xz
2. 用 7zip 將 ① 的 ...sda.raw.xz 解壓為 ...sda.raw
3. 用 win32DiskImage 將 sda.raw 寫入 microSD卡
4. 寫入sd卡完成後把sd卡放入PI4B 接上LAN並開機
5. 用瀏覽器登入路由器確認 PI4用的IP 位址
6. 用 pietty(或其它SSH軟體) 連入 PI4 (預設account&passwd為 root // centos)
7. 連上 PI4.centos 後，先執行下列命令:
    ```
    yum -y update[enter]
    /usr/bin/rootfs-expand[enter]
    nmtui[enter] # 設定ip address
    ```

未完待續...

### 安裝完成後的設定

#### vim 設定
vim 的設定檔放是在家目錄的 .vimrc
沒看到這個檔可以直接新建例如 `vim ~/.vimrc`
在裡面加入下列兩行
```
set number
set wrap
```
然後存檔離開，重新開啟 vim 的時候就會發現它預設就會自動顯示行號及自動換行無需下set nu的指令了。