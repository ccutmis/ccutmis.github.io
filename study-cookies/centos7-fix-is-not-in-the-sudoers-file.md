# CentOS7 解決 xxx is not in the sudoers file

reference url : [https://jerrynest.io/xxx-is-not-in-the-sudoers-file/](https://jerrynest.io/xxx-is-not-in-the-sudoers-file/)

最近常開 VM，每次新增使用者都遇到這個權限問題，但總忘記要去哪裡設定，又要上網在查一次…，這回自己做好整理寫下來，希望不會再忘拉。

新增使用者時，我們會使用 adduser 指令。比如說加入 jerry 這個 user。

`sudo adduser jerry`

接著輸入密碼跟一些其他資訊，就新增完畢了，不過這個帳號並沒有權限使用 sudo，我們需要修改 /etc/sudoers 這檔案，將 jerry 加入進去。

`sudo vim /etc/sudoers`

```
# User privilege specification
root ALL=(ALL:ALL) ALL
jerry ALL=(ALL:ALL) ALL
```

由於 /etc/sudoers 是唯讀檔案，所以要用覆寫的放式覆蓋，使用w!接著q!儲存並離開。

以上的修改方式比較麻煩，這邊提供另一個快速作法：將 jerry 加入 sudo group。

`sudo adduser jerry sudo`

這樣就解決權限問題囉。