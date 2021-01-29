# Vim Cheat Sheet

## 全域

`:h[elp]` 關鍵字 - 顯示關鍵字的說明

`:sav[eas]` 檔案名稱 - 另存新檔為檔案名稱

`:clo[se]` 關閉目前的視窗

`:ter[minal]` 開啟一個命令列視窗

`K` 開啟游標所在單字的 man 頁面

Tip 命令列中執行 *vimtutor* 來學習Vim指令

## 移動游標

`h` - 向左移動游標

`j` - 向下移動游標

`k` - 向上移動游標

`l` - 向右移動游標

`H` - 跳至視窗頂端

`M` - 跳至視窗中間

`L` - 跳至視窗底端

`w` - 向右跳至字首

`W` - 向右跳至字首 (字中可含標點)

`e` - 向右跳至字尾

`E` - 向右跳至字尾 (字中可含標點)

`b` - 向左跳至字尾

`B` - 向左跳至字尾 (字中可含標點)

`%` - 跳至相對應的字元 (預設支援 ()、{}、[] - 在 Vim 中使用 :h matchpairs 顯示說明)

`0` - 跳至行首

`^` - 跳至行內第一個非空白字元

`$` - 跳至行尾

`g_` - 跳至行內最後一個非空白字元

`gg` - 跳至檔案第一行

`G` - 跳至檔案最後一行

`5gg or 5G` - 跳至第 5 行

`fx` - 跳至字元 x 下次出現的位置

`tx` - 跳至字元 x 下次出現位置的上一個字元

`Fx` - 跳至字元 x 上次出現的位置

`Tx` - 跳至字元 x 上次出現的位置之後

`;` - 重複上個 f、t、F 或 T 移動

`,` - 反向重複上個 f、t、F 或 T 移動

`}` - 跳至下一段 (若編輯程式碼則為函式/區塊)

`{` - 跳至上一段 (若編輯程式碼則為函式/區塊)

`zz` - 將游標所在行移到視窗中間

`Ctrl + e` - 視窗向下捲動一行 (不移動游標)

`Ctrl + y` - 視窗向上捲動一行 (不移動游標)

`Ctrl + b` - 向上捲動一個視窗

`Ctrl + f` - 向下捲動一個視窗

`Ctrl + d` - 向下捲動半個視窗

`Ctrl + u` - 向上捲動半個視窗

Tip 移動游標的命令前加數字可指定重複次數，例如 4j 會向下移動 4 行。

## 插入模式 - 插入/附加文字

`i` - 在游標前開始插入字元

`I` - 在行首開始插入字元

`a` - 在游標後開始插入字元

`A` - 在行尾開始插入字元

`o` - 在該行之下另起一行，開始插入字元

`O` - 在該行之上另起一行，開始插入字元

`ea` - 在該單字字尾開始插入字元

`Ctrl + h` - 在插入模式中刪除游標前的字元

`Ctrl + w` - 在插入模式中刪除游標前的字

`Ctrl + j` - 在插入模式中換行

`Ctrl + t` - 在插入模式中向右縮排

`Ctrl + d` - 在插入模式中向左縮排

`Ctrl + n` - 在插入模式中自動補全下個候補字

`Ctrl + p` - 在插入模式中自動補全上個候補字

`Ctrl + rx` - 在插入模式中插入x暫存器的內容

`Esc` - 退出插入模式

## 編輯

`r` - 取代游標後一個字元

`J` - 將下一行合併至該行 (兩行之間有空格)

`gJ` - 將下一行合併至該行 (兩行之間沒有空格)

`gwip` - 重新調整段落

`g~` - 搭配移動來切換大小寫

`gu` - 搭配移動來轉換成小寫

`gU` - 搭配移動來轉換成大寫

`cc` - 剪下 (刪除) 整行並開始插入

`C` - 剪下 (刪除) 游標位置到行尾的區塊並開始插入

`c$` - 剪下 (刪除) 游標位置到行尾的區塊並開始插入

`ciw` - 剪下 (刪除) 整個字並開始插入

`cw` - 從游標位置開始變更 (取代) 單字

`s` - 刪除游標後字元並進入插入模式

`S` - 刪除整行並進入插入模式 (同 cc)

`xp` - 游標後二個字元位置交換 (刪除並貼上)

`u` - 復原

`U` - 復原上次變更的行

`Ctrl + r` - 重做

`.` - 重複上個命令

## 選取文字（標示模式）

`v` - 進入標示模式 (字元選取)，並執行命令 (如 y - 複製)

`V` - 進入標示模式 (行選取)

`o` - 跳至選取區塊的開頭/結尾

`Ctrl + v` - 進入標示模式 (區塊選取)

`O` - 跳至選取區塊的角落

`aw` - 選取該單字

`ab` - 選取 () 及所包圍的區塊

`aB` - 選取 {} 及所包圍的區塊

`at` - 選取 <> tags 及所包圍的區塊

`ib` - 選取 () 內的區塊

`iB` - 選取 {} 內的區塊

`it` - 選取 <> tags 內的區塊

`Esc` - 退出標示模式

Tip 除了 b 或 B 我們也能使用 ( 或 { 。

## 標示模式命令

`>` - 向右縮排

`<` - 向左縮排

`y` - 複製

`d` - 剪下

`~` - 切換大小寫

`u` - 轉換成小寫

`U` - 轉換成大寫

## 暫存區
:reg[isters] - 顯示暫存區內容
"xy - 複製到暫存區 x
"xp - 貼上暫存區 x 的內容
"+y - 複製到剪貼簿暫存區
"+p - 貼上剪貼簿暫存區的內容
Tip 暫存區儲存在 ~/.viminfo，且會在 Vim 下次啟動時重新載入。
Tip 特殊暫存區
 0 - 最近複製暫存區
 " - 未命名暫存區, 保存上次的刪除或複製
 % - 現在的檔名
 # - 備用檔名
 * - 剪貼簿內容(X11 primary)
 + - 剪貼簿內容(X11 clipboard)
 / - 最後的搜尋表達式
 : - 最後的指令
 . - 最後的插入文字
 - - 最後的(未滿一行的)刪除
 = - expression register
 _ - 黑洞暫存區
標記
:marks - 顯示標記清單
ma - 將目前的位置設為標記 a
`a - 跳至標記 a
y`a - 複製游標目前位置到標記 a 位置的字元
`0 - 回到上次離開Vim時的位置
`" - 回到上次編輯該檔案的位置
`. - 回到上次修改該檔案的位置
`` - 回到上次跳離的位置
:ju[mps] - 列出跳轉紀錄
Ctrl + i - go to newer position in jump list
Ctrl + o - go to older position in jump list
:changes - list of changes
g, - go to newer position in change list
g; - go to older position in change list
Ctrl + ] - jump to the tag under cursor
Tip To jump to a mark you can either use a backtick (`) or an apostrophe ('). Using an apostrophe jumps to the beginning (first non-black) of the line holding the mark.
巨集
qa - 錄製巨集 a
q - 停止錄製巨集
@a - 執行巨集 a
@@ - 執行上一次執行的巨集
剪下、複製、貼上
yy - 複製該行
2yy - 複製 2 行
yw - 複製游標位置到下個單字前的字元
y$ - 複製游標位置到行尾的區塊
p - 在游標後貼上
P - 在游標前貼上
dd - 剪下 (刪除) 該行
2dd - 剪下 (刪除) 2 行
dw - 剪下 (刪除) 游標位置到下個單字前的字元
D - 剪下 (刪除) 游標位置到行尾的區塊
d$ - 剪下 (刪除) 游標位置到行尾的區塊 (同 D)
x - 剪下 (刪除) 字元
文字縮排
>> - 向右縮排一個shiftwidth寬度
<< - 向左縮排一個shiftwidth寬度
>% - 向右縮排 () 或 {} 內的區塊 (游標需置於括號上)
>ib - 向右縮排 () 內的區塊
>at - 向右縮排 <> tags 內的區塊
3== - 自動縮排下3行
=% - 自動縮排 () 或 {} 內的區塊 (游標需置於括號上)
=iB - 自動縮排 {} 內的區塊
gg=G - 自動縮排整個緩衝區
]p - 貼上並自動縮排至該行
退出
:w - 儲存
:w !sudo tee % - 以 sudo 儲存目前的檔案
:wq or :x or ZZ - 儲存並退出
:q - 退出 (修改未儲存時警告)
:q! or ZQ - 強制退出 (不儲存)
:wqa - 儲存所有分頁並全部退出
尋找、取代
/pattern - 尋找 pattern
?pattern - 向上尋找 pattern
\vpattern - pattern 中的非英數字元皆視為正規表示式的特殊字元 (不需跳脫字元)
n - 尋找下一個
N - 尋找上一個
:%s/old/new/g - 全部取代
:%s/old/new/gc - 逐項取代
:noh[lsearch] - 移除搜尋結果的標示
多檔案搜尋
:vim[grep] /pattern/ {`{file}`} - 在多個檔案中搜尋 pattern
e.g. :vim[grep] /foo/ **/*
:cn[ext] - 跳至下一個
:cp[revious] - 跳至上一個
:cope[n] - 開啟搜尋結果列表視窗
:ccl[ose] - close the quickfix window
分頁
:tabnew or :tabnew {page.words.file} - 在新分頁開啟檔案名稱
Ctrl + wT - 以新分頁開啟視窗
gt or :tabn[ext] - 切換到下個分頁
gT or :tabp[revious] - 切換到上個分頁
#gt - 切換到第 # 個分頁
:tabm[ove] # - 將分頁移到第 # 位 (從 0 算起)
:tabc[lose] - 關閉該分頁及其中所有視窗
:tabo[nly] - 關閉所有其他分頁
:tabdo command - 對所有分頁執行命令 (例如 :tabdo q 會關閉所有分頁)
多檔案編輯
:e[dit] 檔案名稱 - 在新緩衝區開啟檔案名稱
:bn[ext] - 切換到下個緩衝區
:bp[revious] - 切換到上個緩衝區
:bd[elete] - 刪除緩衝區 (關閉檔案)
:b[uffer]# - go to a buffer by #
:b[uffer] file - go to a buffer by file
:ls or :buffers - 列出所有開啟的緩衝區
:sp[lit] 檔案名稱 - 在新緩衝區開啟檔案名稱並水平分割視窗
:vs[plit] 檔案名稱 - 在新緩衝區開啟檔案名稱並垂直分割視窗
:vert[ical] ba[ll] - edit all buffers as vertical windows
:tab ba[ll] - edit all buffers as tabs
Ctrl + ws - 水平分割視窗
Ctrl + wv - 垂直分割視窗
Ctrl + ww - 切換視窗
Ctrl + wq - 關閉視窗
Ctrl + wx - exchange current window with next one
Ctrl + w= - make all windows equal height & width
Ctrl + wh - 游標跳至左視窗 (垂直分割)
Ctrl + wl - 游標跳至右視窗 (垂直分割)
Ctrl + wj - 游標跳至下視窗 (水平分割)
Ctrl + wk - 游標跳至上視窗 (水平分割)
Diff
zf - manually define a fold up to motion
zd - delete fold under the cursor
za - toggle fold under the cursor
zo - open fold under the cursor
zc - close fold under the cursor
zr - reduce (open) all folds by one level
zm - fold more (close) all folds by one level
zi - toggle folding functionality
]c - jump to start of next change
[c - jump to start of previous change
do or :diffg[et] - obtain (get) difference (from other buffer)
dp or :diffpu[t] - put difference (to other buffer)
:diffthis - make current window part of diff
:dif[fupdate] - update differences
:diffo[ff] - switch off diff mode for current window
Tip The commands for folding (e.g. za) operate on one level. To operate on all levels, use uppercase letters (e.g. zA).
Tip To view the differences of files, one can directly start Vim in diff mode by running vimdiff in a terminal. One can even set this as git difftool.

