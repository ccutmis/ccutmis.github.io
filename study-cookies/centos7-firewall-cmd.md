# firewall-cmd : CentOS 7 設定防火牆允許特定 PORT 連線

reference url : [https://blog.yowko.com/centos7-firewall/](https://blog.yowko.com/centos7-firewall/)

一直以來接觸的作業系統都是 Windows 為主，加上自己熟悉的程式語言是 C#，production 環境部署及相關設定都是 Windows，也就一直沒有機會熟悉 Linux ，但軟體界有愈來愈開放的趨勢，微軟更是如此，現在微軟甚至是 GitHub 上最大的貢獻者

也因為 open source 的盛行，讓很多方便好用的工具跟軟體漸漸多元了起來，讓軟體開發也更加有趣，只是常見的 open source 工具多數以 linux 為主，就算有 porting 至 windows ，穩定性及更新速度上還是遠不及 linux 版本，以 redis 為例，linux 已經 release 4.0 版本，windows 還停留在一年前的 3.0 版本

今天遇到的問題就是因為 redis 而起的，因為公司 redis 架設在 linux 上，為了模擬 production issue，所以透過 virtualbox 安裝 CentOS 7 並在上面架設 redis instance，在測試連線時發現根本無法對外服務，就來看看如何確認問題及解決吧

### 確認問題:

```
#確認防火牆是否開啟
firewall-cmd --zone=public --list-all
```

### 解決方式:
1. 對外開放 6379 port  
    `firewall-cmd --zone=public --add-port=6379/tcp --permanent`
2. 重新讀取 firewall 設定  
    `firewall-cmd --reload`
3. 檢查是否成功加入開放清單  
    `firewall-cmd --zone=public --list-all`

### 心得:

上述動作非常簡單，但我卻找了好一陣子才真正解決問題，主因就是對於作業系統，我一直都只會操作 Windows，不確定上述的作法是否合乎 linux 的操作模式，也不清楚這樣設定會不會造成安全疑慮，只是剛好遇到問題紀錄一下，如果各位朋友有更好的做法還煩請指教，感激不盡
