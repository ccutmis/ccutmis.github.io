# 讓Notepad++直接執行Python或Go的程式
> ★ 在這之前請先確定你有成功安裝好 Python 及 Go 及 Notepad++ 

-----

###  基本設定 :

1. 開啟Notepad++ 點主選單"外掛"→"外掛模組管理"
![](images/nppExec/nppExec-01.png)
2. 搜尋 "NppExec" 然後將它勾選 再按 [安裝]
![](images/nppExec/nppExec-02.png)
3. 按 [是]
![](images/nppExec/nppExec-03.png)
4. 重啟Notepad++ 按 [F6] 開啟 Execute... 視窗 在裡面輸入 python "$(FULL_CURRENT_PATH)" 或 cmd.exe /K "cd /D "$(CURRENT_DIRECTORY)" & python "$(FULL_CURRENT_PATH)"" 然後按 [Save...]
![](images/nppExec/nppExec-04.png)
5. 在Script name:裡輸入 Python 然後按 [Save]
![](images/nppExec/nppExec-05.png)
6. 在Notepad++裡面編輯好python文件存檔 按 [F6] 確定 Script name 是 Python 然後點 [ok] 就會在編輯區下方看到cmd執行結果
![](images/nppExec/nppExec-06.png)
7. 用同樣的方式可以設定Go語言的執行如下圖
![](images/nppExec/nppExec-07.png)
8. 在Notepad++裡面編輯好go文件存檔 按 [F6] 確定Script name是 Go 然後點 [ok] 就會在編輯區下方看到cmd執行結果
![](images/nppExec/nppExec-08.png)
9. 用同樣的方式可以設定CMD的執行如下圖
![](images/nppExec/nppExec-09.png)
10. 在Notepad++裡面編輯好bat文件存檔 按 [F6] 確定Script name是 CMD 然後點 [ok] 就會在編輯區下方看到cmd執行結果
![](images/nppExec/nppExec-10.png)

-----

### Console 設定 :

1. Console 相關設定在主選單的位置
![](images/nppExec/nppExec-11.png)
2. 在 NppExec Advance Option 視窗修改文字顏色
![](images/nppExec/nppExec-12.png)
3. 在 字型 視窗可修改字型與大小 其它項目請勿改動
![](images/nppExec/nppExec-13.png)

-----
