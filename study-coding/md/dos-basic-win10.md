# DOS 自學筆記 : 常用命令介紹

-----

## 目錄
1. DOS教學資源列表
2. DOS常用命令
3. 補充

-----

## DOS教學資源列表
1. [命令提示字元 (Command Prompt) 入門](https://michaelchen.tech/windows-programming/command-prompt-primer/)
2. [骨灰級教學:史萊姆的家-Easy DOS command](http://www.slime.com.tw/teach/neto/teach/dos.htm)

-----

## DOS常用命令:
命令 | 簡介 | 範例 | 範例說明
----------|:-----:|-----:|----------
help | 列出所有DOS命令 | help | 列出所有DOS命令
/? | 列出該命令的說明 | dir /? | 列出 dir 命令的說明
cd | 顯示當前目錄或變更目錄 | cd | 顯示當前目錄
... | ...   | cd / | 切換到根目錄
... | ... | cd ABC | 切到目錄ABC
... | ... | cd .. | 切到上一層目錄
dir | 顯示目錄清單 | dir /w | 以寬列表的方式顯示目錄清單
... | ... | dir *&#46;txt | 列出目錄中所有txt文字檔
mkdir | 新建目錄 | mkdir github | 新建"github"目錄
start | 開新視窗呼叫程式 | start notepad++ abc&#46;py | 呼叫 notepad++ 開啟 abc&#46;py 若不存在它會問你要不要建立新文件
exit | 退出DOS | exit | 退出DOS

-----

## 補充:

在DOS底下執行程式有時候會遇到需要強制結束的情況，
例如你寫了一個無限廻圈的Python程式正在不斷print字串到畫面上，
這時可以按 [ctrl]+[c] 或 [ctrl]+[b] 中斷程式執行。
