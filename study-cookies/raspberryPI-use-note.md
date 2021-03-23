# 在RaspberryPI使用Terminal的筆記

## 帳號執行sudo 出現 ` is not in the sudoers file. ` 的解決方式

參考網址: https://www.raspberrypi.org/forums/viewtopic.php?t=7774  

先切換到 root帳號: 然後下這個指令:  
`sudo usermod aloha3307 -g sudo`  

在這之後 aloha3307 帳號就能使用 `sudo ...` 了!  


