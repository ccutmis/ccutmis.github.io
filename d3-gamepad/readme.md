# 關於 D3-Gamepad-Mapping 程式

-----

### 最後更新日期: 2020-12-03 00:05:00 ver.0006a

-----

玩Diablo-Like遊戲的PC老玩家由於頻繁操控鍵盤滑鼠，如果沒有好好保護手腕很容易造成慢性傷害，例如腕隧道症候群，也許你會想:「如果可以使用搖桿來玩遊戲該有多好?」

Diablo-Like的PC遊戲主要大多以滑鼠作為指向工具，配合滑鼠左右鍵及鍵盤施放技能，這個部份如果要把它對應到搖桿是有一些難度，主要在於操作方面需要重新適應，及有些職業套裝較適合用搖桿玩(例如野蠻人的荒野旋風流，右鍵設旋風斬，按住右鍵再用十字鍵移動就OK了，武僧的正義套裝應該也很適合，但如果是遠程需要準確指向的可能就不太適合，例如獵人的暗影三刀流，這方面需要自行測試。

-----

# 下載點:

以下是我用Python編寫的 搖桿映射鍵盤程式 D3-Gamepad-Mapping 下載點:

[https://ccutmis.github.io/d3-gamepad/d3-gamepad-exe-0006a.zip](https://ccutmis.github.io/d3-gamepad/d3-gamepad-exe-0006a.zip)

下載並解壓縮會得到一個 dist 資料夾，裡面有兩個檔案:

* main.exe (主程式直接點兩下即可執行)
* main_config.ini (設定檔，建議使用Notepad++編輯)

-----

# main_config.ini 設定檔內容

```
#這是一行註解
#key_config字典用來定義按鍵值
KEY_CONFIG={
    "BTN_A":"1",
    "BTN_B":"2",
    "BTN_X":"3",
    "BTN_Y":"4",
    "BTN_L":"LM", #滑鼠左鍵
    "BTN_R":"RM", #滑鼠右鍵
    "BTN_START":"Q", #喝水
    "BTN_BACK":"T", #回村
    "TRIG_L":"i", #左邊Trigger
    "TRIG_R":"s" #右邊Trigger
}

#設定左小搖桿在控制滑鼠移動後是否按一下滑鼠左鍵
#設為 True 則在左小搖桿控制滑鼠移動後會在滑鼠所在位置按一下左鍵，要取消則設為 False
SET_LEFT_CONTROLLER_MOVE_AND_CLICK = True

#左右小搖桿控制滑鼠位移的一單位(像素)(基本上勿動)
XY_OFFSET_UNIT=10

#延時設定(基本上勿動)
DELAY_SECOND=0.1

#勿動BTN_DICT
BTN_DICT={0:"BTN_A", 1:"BTN_B",2:"BTN_X", 3:"BTN_Y",4:"BTN_L",5:"BTN_R",6:"BTN_BACK",7:"BTN_START",8:"TRIG_L",9:"TRIG_R"}
```

![controller-mapping.png](https://ccutmis.github.io/d3-gamepad/controller-mapping.png)

修改 main_config.ini 注意事項:
1. 編輯此文件推薦使用Notepad++，如果用記事本編輯在存檔時需注意是否存為"utf-8"文件格式(不可為"Big5"或"utf-8 BOM"格式會出錯)。
2. 只能更改KEY_CONFIG字典裡的值，例如: "BTN_A":"1" 改成 "BTN_A":"i"，這樣執行程式時按下搖桿A鍵就會模擬按下i鍵，只可修改值不可破壞格式。

-----

# 如何執行:

1. 先開啟Diablo III，將畫面顯示設為"全螢幕視窗模式"或"視窗模式"。(這個很重要)
2. 確定你的xbox搖桿有接在PC端並正常運作中(可在控制台裡的裝置及印表機項目確認)
3.  執行 main.exe 並切換到 Diablo III，拿起搖桿測試看看!

-----

# 系統需求:

1. Windows7以上作業系統
2. 目前只用usb介面的xbox相容搖桿測試(羅技)測試OK，沒有無線搖桿也沒經費購買故無法測試(如果有人要提供設備讓我測試的話可以私訊給我^^)。

-----

# 特別聲明:

* 本程式無償提供任何人使用，歡迎轉載連結。
* 本程式執行時會依搖桿輸入模擬鍵盤滑鼠動作，若在執行中造成任何非預期之損失概不負責，特此聲明。
* 目前程式有些小bug，但基本運作應該是沒問題的，建議在執行main.exe的時候先不要開啟 Diablo III以外的任何程式，試試看有沒有問題，當然程式不可能完全沒bugs，未來有修正版會在這邊持續更新。

-----

# 更新日誌:

### 最後更新日期: 2020-12-03 00:05:00 ver.0006a
修改內容: 用 pynput 模組改善按鍵卡卡問題

### 更新日期: 2020-12-02 20:05:00 ver.0005a
修改內容:
1. 為了判斷滑鼠按鍵狀態需用到win32api模組(已匯入使用)
2. 滑鼠左右鍵按住效果
3. Ltrigger跟Rtrigger按鍵讓它有作用
4. 在 main_config.ini 裡加入了左小搖桿控制滑鼠移動後是否立刻按一下左鍵的設定
5. 重寫左右小搖桿控制滑鼠移動的部份(還有小bug後續再作微調)

### 更新日期: 2020-12-01 19:40:00 ver.0003a
修正了滑鼠右鍵無法復歸的問題，同時將左右小搖桿控制滑鼠移動的代碼作了一些優化。