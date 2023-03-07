# Python 程式設計工具 Visual Studio Code 初心者之書

-----

## 目錄
1. [安裝 Python](https://ccutmis.github.io/study-coding/vscode-for-python.htm#ch1)
2. [安裝 Visual Studio Code(之後簡稱vs_code)](https://ccutmis.github.io/study-coding/vscode-for-python.htm#ch2)
3. [執行 Python 程式(.py 檔案)](https://ccutmis.github.io/study-coding/vscode-for-python.htm#ch3)
4. [執行 Jupyter notebook 程式(.ipynb 檔案) ](https://ccutmis.github.io/study-coding/vscode-for-python.htm#ch4)
5. [vs_code常用快捷鍵](https://ccutmis.github.io/study-coding/vscode-for-python.htm#ch5)

-----

### 1. 安裝 Python <a name="ch1"></a>
1. 到 Python 官網 https://www.python.org/ 下載 Python 安裝檔，建議下載安裝 3.10 版本。(對Github開源ai項目支援較佳)
2. 下載完成開始安裝，勾選 Add python.exe to PATH，讓 Python 自動加入 Windows 環境變數。然後點擊 Customize installion (自訂安裝)

![img](images/vscode-for-python/001.png)

3. Optional Features 預設是全勾選，不需變動直接按 Next

![img](images/vscode-for-python/002.png)

4. 勾選全部項目，然後將安裝位置設定到根目錄，例如 C:\Python\Python310 ，路徑中不要有空白或-_以外的特殊符號，確定無誤後按 Install 開始安裝。

![img](images/vscode-for-python/003.png)

5. 安裝完成，回到桌面，按Win+R 開啟執行對話框，輸入 cmd 再按Enter，開啟命令提示字元(註: 在linux或macos這個叫作終端機或Terminal ，在windows裡我習慣叫它cmd ，有些人可能也會叫他dos畫面^^")

![img](images/vscode-for-python/004.png)

6. 在 cmd 輸入 python 若成功進入python交談介面就表示 Python 安裝執行正常，這時你可以試著打 `print('hello world')` 再按Enter 會看到它輸出 hello world ，要退出python交談介面就輸入 exit() 按Enter。

![img](images/vscode-for-python/005.png)

-----
### 2. 安裝 Visual Studio Code(之後簡稱vs_code) <a name="ch2"></a>

1. 到 Vscode 官網 https://code.visualstudio.com/ 下載 visual studio code 的安裝檔。

2. 下載完成開啟安裝檔，將路徑設為 C:\Microsoft_VS_Code  (注意路徑中不要有空白或-_以外的特殊符號)

![img](images/vscode-for-python/006.png)

3. 選擇附加的工作這邊全部打勾 再按 "下一步" 然後按 "安裝"

![img](images/vscode-for-python/007.png)

4. 安裝完成直接啟動 Visaul Studio Code。

![img](images/vscode-for-python/008.png)

5. 第一次進入 vs_code 可能會覺得眼花，沒關係不用理它，直接點左上角算下來第五個圖示(四個小方塊)這個叫作延伸模組，在最上面的搜尋框輸入 chinese 搜尋， 找到 Chinese( Tradi...) 那個項目右邊的 "install" 按下去(安裝繁中介面)，安裝完會看到右下角跳出一個藍色按鈕，點它會重啟vs_code 並將介面變成繁中介面。

![img](images/vscode-for-python/009.png)

6. 再次進入　延伸模組　並搜尋 Python，然後安裝 "Python" 這個模組，安裝完成後點 畫面中間的 "Select a Python Interpreter"，選擇我們先前已安裝好的Python安裝路徑 。

![img](images/vscode-for-python/010.png)

![img](images/vscode-for-python/011.png)

7. 再次進入　延伸模組　並搜尋 Python，然後安裝 "Python環境" 這個模組。 

![img](images/vscode-for-python/012.png)

到這裡為止，vs_code 的 python 基本開發環境已經可以運作了，下一步我們會開啟自訂資料夾並新增一個.py 文件作測試。


-----

### 3. 執行 Python 程式(.py 檔案) <a name="ch3"></a>

1. 開啟檔案總管，在根目錄 C 底下新增一個資料夾 "test123"

![img](images/vscode-for-python/013.png)

2. 開啟 vs_code 點左上角的第二個圖示(畫二張紙的，它也叫檔案總管)，然後點 "開啟資料夾" ，選取 C:\test123，然後你會看到詢問是否信任的對話框，這裡要勾選　信任父資料夾'C:\'中所有檔案的作者 ，然後再按 "是，我信任作者"

![img](images/vscode-for-python/014.png)

3. 現在你會看到檔案總管最上方會多出一列小圖示，點選新增檔案，並命名為 "hello.py"，然後在 "hello.py" 裡面輸入

```
print('hello world')
```
然後按 Ctrl + S 存檔，按一下右上角的 播放按鈕(Run Code)，就會看到程式執行結果了。

![img](images/vscode-for-python/015.png)

-----

### 4. 執行 Jupyter notebook 程式(.ipynb 檔案) <a name="ch4"></a>

1. 在左側的檔案總管裡新增一個文件，命名為"hello.ipynb" (助記: IPYNB 愛py牛逼)

2. 然後點兩下將它開啟，正常的話會看到有一個小格子可讓你輸入文字，格子最左邊有個播放圖示(正式名:執行儲存格)，在這小格子內輸入:

```
print("Hello World!")
```

3. 點播放圖示(執行儲存格) 這時會看到一個錯誤訊息視窗"執行儲存格需要 jupyter 且 notebook 套件"，這邊請 選擇 "變更解譯器"

![img](images/vscode-for-python/016.png)

4. 然後 點你先前安裝的 Python.exe 完整路徑(通常會是 C:\Python3xx\python.exe )

![img](images/vscode-for-python/017.png)

5. 然後再重新點 播放圖示(執行儲存格)，會看到另一個錯誤訊息視窗，這裡請選擇 "安裝"，右下角會看到它正在安裝套件的訊息，耐心等它一會兒，套件安裝完成之後，你會看到剛剛執行儲存格的地方已經跑出結果了，表示在vs code裡執行 jupyter notebook 的設定完成了。

![img](images/vscode-for-python/018.png)

![img](images/vscode-for-python/019.png)

![img](images/vscode-for-python/020.png)

寫程式遇到bug不用緊張，那是程式人生的一...一大部份，請依上人的建議: 接受、面對、處理、放下…如果沒辦法自行處理的很正常，上網搜尋、上ithelp發文詢問、或是問chatGPT...Q-Q找答案的過程也是一種樂趣。

-----

### 5. vs_code常用快捷鍵 <a name="ch5"></a>

在看vs_code 常用快捷鍵之前先熟悉一下整個介面，可以通過右上角的自訂版面圖示，將介面玩轉一下有個概念，再記快捷鍵才不會一頭霧水。
(註 : 每個人使用軟體的習慣不同，當你用一段時間後你也會有你的常用快捷鍵清單，這裡只是列出筆者覺得對新手而言會常用到的)

說明 | 快捷鍵 | 分類
:-----|:-----|:-----
命令 | Ctrl+P | 通用
快捷鍵 | Ctrl+K Ctrl+S | 通用

說明 | 快捷鍵 | 分類
:-----|:-----|:-----
上或下移動行 | Alt+↑或↓ | 基本編輯
上或下複制行 | Alt+Shift+↑或↓ | 基本編輯
刪除行 | Ctrl+Shift+K | 基本編輯
跳至匹配的括號 | Ctrl+Shift+\ | 基本編輯
縮進行 | Ctrl+]或[ | 基本編輯
折疊區域 | Ctrl+Shift+[ | 基本編輯
取消折疊區域 | Ctrl+Shift+] | 基本編輯
切換行註解 | Ctrl+/ | 基本編輯
切換自動換行 | Alt+Z | 基本編輯

說明 | 快捷鍵 | 分類
:-----|:-----|:-----
尋找 | Ctrl+F | 尋找與取代
取代 | Ctrl+H | 尋找與取代
下一個/上一個 | F3/Shift+F3 | 尋找與取代
選擇所有匹配項 | Alt+Enter | 尋找與取代
將選擇添加到下一個匹配項 | Ctrl+D | 尋找與取代
將選擇移到下一個匹配項 | Ctrl+K Ctrl+D | 尋找與取代
切換 區分大小寫/整個單字/RegEX | Alt+C/W/R | 尋找與取代

說明 | 快捷鍵 | 分類
:-----|:-----|:-----
插入游標 | Alt+滑鼠左鍵 | 多游標與選擇區
向上或下插入游標 | Ctrl+Alt+↑或↓ | 多游標與選擇區
復原上一個游標操作 | Ctrl+U | 多游標與選擇區
選取行 | Ctrl+L | 多游標與選擇區
選取所有與當前選取匹配的字串 | Ctrl+Shift+L | 多游標與選擇區
選取所有與當前選取匹配的單字 | Ctrl+F2 | 多游標與選擇區
欄選取 | Shift+Alt+按住滑鼠左鍵拖曳 | 多游標與選擇區

說明 | 快捷鍵 | 分類
:-----|:-----|:-----
全螢幕顯示切換 | F11 | 顯示
縮放 | Ctrl+(+/-) | 顯示
下方面板 顯示或隱藏 | Ctrl + J | 顯示
側邊欄 | Ctrl + B | 顯示
開啟資料夾 | Ctrl(按住)然後按 K 再按 O 然後放開 Ctrl | 顯示
關閉資料夾 | Ctrl(按住)然後按 K 然後放開 Ctrl 再按 F | 顯示
開啟最近使用檔案 | Ctrl + R | 顯示
在文件中替換 | Ctrl+Shift+H | 顯示
搜索詳細信息 | Ctrl+Shift+J | 顯示
打開Markdown預覽模式 | Ctrl+Shift+V | 顯示
ZEN模式 | Ctrl+K放開再按Z (按ESC二次退出) | 顯示

說明 | 快捷鍵 | 分類
:-----|:-----|:-----
切換斷點 | F9 | 除錯
開始/繼續 | F5 | 除錯
停止 | Shift+F5 | 除錯
步入/步出 | F11/Shift+F11 | 除錯
Step結束 | F10 | 除錯
Show Hover | Ctrl+K Ctrl+I | 除錯

-----


* 參考影片教學: https://www.youtube.com/watch?v=ifTF3ags0XI

* VS_CODE_KEYBOARD_SHORTCUT_CHEAT_SHEET: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf


-----