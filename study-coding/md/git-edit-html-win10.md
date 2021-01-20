# 編輯並推送(git push)本機電腦(Repo)儲存庫內的檔案到github

-----

1. 開啟網頁瀏覽器 輸入網址 http://你的github帳號.github.io 然後按[Enter]會看到我們的gitpage網頁長這樣:
(內容是github自動轉譯README.md成htm的結果)
![](images/git-edit-htm/git-edit-htm-001.png)
2. 回到檔案總管，進到"你的github帳號.github.io"資料夾，在README.md上按右鍵選"Edit with Notepad++"
![](images/git-edit-htm/git-edit-htm-002.png)
3. 使用 markdown 語法稍作修改，修改完成按 [ctrl]+[s]儲存檔案
![](images/git-edit-htm/git-edit-htm-003.png)
4. 在 Notepad++ 開啟一個新檔，並參考下圖輸入語法，完成按[ctrl]+[s] 儲存檔案時將它命名為 "WEB-PUSH.bat" (這個日後會經常用到)，存檔後按 [F6] 執行 CMD。
```
cd /
cd github 
cd 你的github帳號.github.io
git add --all
git commit -m "..."
git remote set-url origin https://github.com/你的github帳號/你的github帳號.github.io.git
git push -u origin master
```
![](images/git-edit-htm/git-edit-htm-004.png)
5. 執行到一半會跳出 "Connect to GitHub"的驗證視窗，這邊點 [ Sign in with your browser ]
![](images/git-edit-htm/git-edit-htm-005.png)
6. [ Sign in with your browser ]點了之後會跳到這個網頁，直接按下綠色按鈕 [ Authorize GitCredentialManage ] 然後等他跑一下 或是直接把這個網頁縮到最小不用理它了
![](images/git-edit-htm/git-edit-htm-006.png)
7. 回到 Notepad++ 重新按一下 [F6] 再執行一次CMD 這時看到 Console 最底下寫'Everything up-to-date' 這表示我們剛才的修改已經推送到github的repo了
![](images/git-edit-htm/git-edit-htm-007.png)
8. 開啟 github 進到 你的 repo (儲存庫) 會看到剛才我們在本機修改的內容已經在 github 更新了
![](images/git-edit-htm/git-edit-htm-008.png)
9. 回到檔案總管，把 README.md 刪除，新增一個文件並命名為'index.htm'，然後對它按右鍵選'Edit with Notepad++'
![](images/git-edit-htm/git-edit-htm-009.png)
10. 簡單對 index.htm 作一些編輯 (要編的好可能需要另外學習 html css javascript等等 這邊暫不討論)完成記得按 [ctrl]+[s]儲存檔案。
![](images/git-edit-htm/git-edit-htm-010.png)
11. 在 Notepad++ 中開啟 'WEB-PUSH.bat'，然後按 [F6] 執行 CMD 把剛才做的更動(刪README.md,增改index.htm)推送到 github 上面。
![](images/git-edit-htm/git-edit-htm-011.png)
12. 回到 githhub 的 repo 頁面，看到原本的 README.md 已不見(刪了)，變成一個index.htm(新增的)
![](images/git-edit-htm/git-edit-htm-012.png)
13. 稍待一會兒，開個瀏覽器輸入 https://你的github帳號.github.io 這時會看到網頁內容更新了! 
![](images/git-edit-htm/git-edit-htm-013.png)

-----

