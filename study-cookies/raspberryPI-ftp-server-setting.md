# RaspberryPI install ftp-server: vsftpd

參考教學: https://sites.google.com/site/raspberrypidiy/pc-to-rpi/vsftpd

1. sudo apt-get install vsftpd
2. sudo vim /etc/vsftpd.conf
3. 將 #local enable =yes 及 #write enable =yes 的 #拿掉
4. 存檔並離開 vim
5. sudo service vsftpd restart

然後進路由器的端口轉發頁面設定外網連內網的port(例如外:60021內:21)即可透過 ftp://帳號@ip:60021 進行ftp連線傳檔