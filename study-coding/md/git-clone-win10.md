# 將 Github 的 Repo(儲存庫) clone 到本機電腦(只需做一次)

-----

1. 開啟網頁瀏覽器，進到 github 官網，用先前申請的帳號登入 github
![](images/git-init/git-init-001.png)
2. 點一下右上角帳號小圖示 再點 'Your repositories'
![](images/git-init/git-init-002.png)
3. 在儲存庫頁面可以看到我們之前建立預備要用來作網頁空間的儲存庫 (簡稱 Repo) 點 aloha3307.github.io (aloha3307是我設的字串 你登入看到的應該是你先前設定的字串) 進入這個 Repo
![](images/git-init/git-init-003.png)
4. 點[↓ Code]按鈕，然後複制裡面的字串
![](images/git-init/git-init-004.png)
5. 開啟 Notepad++ 依照下圖編輯 'test.bat' 第四行的內容貼上剛才在 github 網站複制的字串 編輯完成記得按[ctrl]+[s]存檔
![](images/git-init/git-init-005.png)
6. 按 [F6] 開啟執行視窗 確定目前選項是 [CMD] 按下 OK 執行
![](images/git-init/git-init-006.png)
7. 觀察 Notepad++ 下半部的 Console 視窗，出現如下內容就是git clone 命令成功執行了
![](images/git-init/git-init-007.png)
8. 開啟檔案總管 進到 C:\github 裡面會看到我們剛才從 github 拉下來的東西(資料夾) 點進資料夾裡面看看 (目前只有一個 README.md 檔案)
![](images/git-init/git-init-008.png)

-----

