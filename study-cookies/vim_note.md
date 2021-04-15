# vim 程式編輯器學習筆記

## 目錄
* vim 的三種模式
* 簡易執行範例
* 網路資源

### vim 的三種模式
* 一般指令模式(command mode)
	* 要記住一些常用的快捷鍵 例如 3yy(複制三行)
* 編輯模式(edit mode)
	* 按i,I,o,O,a,A,r,R後進入編輯模式，按Esc退出
* 指令列命令模式(command-line mode)
	* 在一般模式中輸入`:/?`三個中的任何一鍵，會看到游標移到最底下，這邊提供檔案讀寫搜尋結束等指令。

### 簡易執行範例
1. 使用 `vim filename` 進入一般指令模式
2. 按下 i 進入編輯模式，開始編輯文字
3. 按下 Esc 回到一般模式
4. 按 : 進入指令列模式 ，在 : 後面接著輸入 wq 然後按 Enter 就完成存檔並離開Vim了
	* 指令列參數 : w(write 存檔) q(quit 離開) !(強制執行) e(edit 開啟文檔編輯) r(read 讀檔) 
