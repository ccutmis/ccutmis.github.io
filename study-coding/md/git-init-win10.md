# 執行 git 初始設置命令 (只需做一次)
> 這邊使用 Notepad++ 編輯 bat 檔，並直接在 Notepad++ 裡執行 git 命令，還不熟悉這部份如何操作的朋友，請先閱讀 '讓Notepad++直接執行Python或Go的程式' 那篇文章喔

-----

### 下載並執行安裝程式 :
1. 開啟 Notepad++ 新增一個文件並將它存為'test.bat' test可自由命名，然後在編輯區貼入下列片段 (user.name及user.email請改成你在github申請帳號時使用的帳號名及email) ，修改完畢按 [ctrl]+[s] 存檔。
```
git config --global user.name "你的github帳號"
git config --global user.email "你的email信箱"
```
![](images/git-init/git-init-001.png)
2. 按 [F6] 開啟執行視窗 確定一下左下角選單是'CMD' 然後按 [OK] 執行
![](images/git-init/git-init-002.png)
3. 這邊可以通過編輯器下半部的 Console 來觀察執行結果 跟下圖一樣沒有報錯的話就是成功的
![](images/git-init/git-init-003.png)
4. 接著我們把 'test.bat' 內容改成 下列片段 然後按 [ctrl]+[s] 存檔
```
git config --list
```
![](images/git-init/git-init-004.png)
5. 按 [F6] 開啟執行視窗 確定一下左下角選單是'CMD' 然後按 [OK] 執行 這時看下方 Console 視窗會看到 git 的 config 裡面 已經把我們的github帳號及email加進去了
![](images/git-init/git-init-005.png)

-----

