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
    passwd # 重設 root 密碼!
    ```

### 基本安裝完成後的設定

#### vim 安裝與設定

vim 安裝: `yum install vim`

vim 的設定檔放是在家目錄的 .vimrc
沒看到這個檔可以直接新建例如 `vim ~/.vimrc`
在裡面加入下列兩行
```
set number
set wrap
```
然後存檔離開，重新開啟 vim 的時候就會發現它預設就會自動顯示行號及自動換行無需下set nu的指令了。

#### 系統時間
* yum install ntp -y
* ntpdate time.stdtime.gov.tw
* vim /etc/ntp.conf  
    設server time.stdtime.gov.tw ... 然後 :wq
* systemctl start ntpd
* systemctl enable ntpd

#### 時區
* timedatectl set-timezone Asia/Taipei

#### 中文支持
* yum groupinstall "fonts"
* vim /etc/locale.conf  
    設 LANG="zh_TW.UTF-8" 然後 :wq
* reboot

#### 新增有管理者權限的帳號
* adduser aloha3307
* passwd aloha3307 (創完帳號馬上設密碼)
* vim /etc/sudoers  
    搜尋 root ALL=(ALL) ALL 在下面一行新增 aloha3307 ALL=(ALL) ALL 然後:wq

#### SSH
* yum install openssh*
* vim /etc/ssh/sshd_config  
    port 52041  
    PermitEmptyPassword no  
    PasswordAuthentication yes  
    PermitRootLogin no  然後:wq
* systemctl restart sshd.service
* systemctl enable sshd.service
* firewall-cmd --permanent --zone=public --add-port=52041/tcp
* firewall-cmd --reload
* netstat -ant 或 netstat -ltnp  
    如果 netstat 報錯: yum install net-tools

#### FTP(vsftpd)
* yum install vsftpd
* vim /etc/vsftpd/vsftpd.conf  
    相關設定自行google
* service vsftpd start
* systemctl enable vsftpd.service
* firewall-cmd --permanent --zone=public --add-service=ftp
* firewall-cmd --reload
* 更多資訊: blog.itits.tw/2016/08/build-ftp-server-with-vsftpd-on-centos-7.html

#### <span style="color:red;font-size:2em;">!!!!! 到這邊先把 sd卡備份成 img 因為後續的 LAMP 環境還要測試 這樣做比較保險一些</span>

#### Apache
* yum install -y httpd
* systemctl start httpd
* systemctl enable httpd
* firewall-cmd --zone=public --permanent --add-service=http
* firewall-cmd --zone=public --permanent --add-service=https
* firewall-cmd --reload
* 這時可以用瀏覽器輸入ip看看Apache有沒有正常運作

#### Mariadb(v.5.5.68-MariaDB)
* yum install mariadb mariadb-server
* systemctl restart mariadb.service
* systemctl enable mariadb.service
* /usr/bin/mysql_secure_installation  
    #初次安裝後的設定:  
    currentPassword直接按Enter  
    是否設root passwd? Y  
    是否除匿名帳號? Y  
    Disallow root login remotely? Y  
    Remove Test DB? Y  
    Reload privillege table? Y  
* systemctl restart mariadb.service

#### 安裝PHP(v.5.4.16)
* yum install php php-devel php-mysql php-ldap php-odbc php-mbstring php-gd libjpeg* php-pear php-xml php-xmlrpc php-bcmath php-mhash
* rpm -qa | grep 'php'
* systemctl restart httpd.service
* vim /var/www/html/index.php
* 開瀏覽器觀看 index.php 有沒有work

#### 參考網址:
* [centos 7 安裝最新的php7.3+httpd2.4.37+mariadb10.3](http://lab.aoetek.com/index.php/2018/11/06/107110501/)
* [](https://www.digit-seed.com/lamp-install-teaching-01/)
* [install nodejs on pi.centos7](https://iter01.com/544013.html)
