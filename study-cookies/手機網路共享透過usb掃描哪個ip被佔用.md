# 手機網路共享透過usb掃描哪個ip被佔用

## 目錄:
1. 指令範例
2. 參考網址
3. 備註

### 指令範例:
* `ifconfig | grep inet`
* `for ip in $(seq 10 254);do telnet 192.168.42.$ip;done`

### 參考網址:
[https://devconnected.com/how-to-ping-specific-port-number/](https://devconnected.com/how-to-ping-specific-port-number/)

### 備註:
* 由於手機配發內部ip 192.168.n.? 的 n 也是變動的，因此在執行 ip scan 之前要先執行 `ifconfig | grep inet` 確定 n 值為何
* Tony哥建議使用類似這個的dns服務 http://www.duckdns.org/spec.jsp 有空時來研究看看