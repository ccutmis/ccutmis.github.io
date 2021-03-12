# 鳥哥Linux基礎篇
![site-logo](images/site-logo.png)

## 目錄
1. [LOAD_MD::CH1](bird-linux-ch1.md)
2. [LOAD_MD::CH2](bird-linux-ch2.md)
3. [LOAD_MD::CH3](bird-linux-ch3.md)
4. [LOAD_MD::CH4](bird-linux-ch4.md)
5. [LOAD_MD::CH5](bird-linux-ch5.md)
6. [LOAD_MD::CH6](bird-linux-ch6.md)
-----

[anchor](CH2-Linux-Basic-File-Manage)
![banner](images/1.jpg)
### 鳥哥Linux基礎篇 - 第 2 堂課：指令下達行為與基礎檔案管理

<span class="hr"></span>

第 2 堂課：指令下達行為與基礎檔案管理
最近更新日期：2017/03/05
前一堂課最後講到文字界面的指令下達，這堂課讓我們更詳盡的玩一下文字界面的指令下達行為吧。 另外，了解到指令下達行為之後，再來當然就是 bash 環境下的檔案管理行為，而在實際操作檔案管理之前， 基本的目錄內資料的了解，也是必須要知道的項目。

2.1：文字界面終端機操作行為的建立
2.1.1：文字模式指令下達的方式
2.1.2：身份切換 su - 的使用
2.1.3：語系功能切換
2.1.4：常見的熱鍵與組合按鍵
2.1.5：線上求助方式
2.1.6：管線命令的應用
2.2：Linux 檔案管理初探
2.2.1：Linux 目錄樹系統簡介
2.2.2：工作目錄的切換與相對/絕對路徑
2.2.3：簡易檔案管理練習
2.3：課後練習操作
2.1：文字界面終端機操作行為的建立
其實我們都是透過『程式』在跟系統作溝通的。文字模式登入後所取得的程式被稱為殼(Shell)，這是因為這支程式負責最外面跟使用者(我們)溝通， 所以才被戲稱為殼程式！CentOS 7 的預設殼程式為 bash，使用者最好一開始就能夠建立良好的操作行為，對於未來的 Linux 使用上，會有很大的幫助。

2.1.1：文字模式指令下達的方式
bash shell 環境下，指令的下達基本上有幾個需要注意的地方：

[student@localhost ~]$ command  [-options]  [parameter1...]
一行指令中第一個輸入的部分是指令(command)或可執行檔案(例如script)
『 command 』：為指令的名稱，例如變換工作目錄的指令為 cd 等等；
中括號『 [ ] 』不在實際的指令中，僅作為一個提示，可有可無的資料之意；
『 -options 』：為選項，通常選項前面會帶有減號 (-)，例如 -h ；
options 有時會提供長選項，此時會使用兩個減號，例如 --help。
注意，選項 -help 通常代表 -h -e -l -p 之意，與 --help 的單一長選項不同。
『 parameter1... 』：參數，為依附在選項後面的參數，或者是 command 的參數；
指令、選項、參數之間都以空格或 [tab] 作為區分，不論空幾格都視為一格，故空白是特殊字元
[Enter]按鍵代表著一行指令的開始啟動。
Linux 的世界中，英文大小寫為不同的字元，例如 cd 與 CD 是不一樣的指令。
前一堂課我們使用過 ls 與 ll 這兩個簡易的指令來查看檔名，那如果想要知道目前的時間，或者是格式化輸出時間時， 就得要使用 date 這個指令來處理！

[student@localhost ~]$ date
四  4月 21 02:43:24 CST 2016
因為 student 選擇中文語系的關係，所以螢幕上出現的就會是中文的星期四與月日這樣。 若需要格式化的輸出，就得要加上特別的選項或參數來處理，例如一般台灣我們常見 2016/04/21 這樣的日期輸出格式， 此時你可能要這樣下達指令：

[student@localhost ~]$ date +%Y/%m/%d
2016/04/21
上述的選項資料 (+%Y/%m%d) 基本上不太需要背誦，使用線上查詢的方式來處理即可。 最簡單的處理方式，可以透過 --help 這個長選項來查詢各個選項的功能，如下所示：

[student@localhost ~]$ date --help
Usage: date [OPTION]... [+FORMAT]
  or:  date [-u|--utc|--universal] [MMDDhhmm[[CC]YY][.ss]]
Display the current time in the given FORMAT, or set the system date.

Mandatory arguments to long options are mandatory for short options too.
  -d, --date=STRING         display time described by STRING, not 'now'
  -f, --file=DATEFILE       like --date once for each line of DATEFILE
  -I[TIMESPEC], --iso-8601[=TIMESPEC]  output date/time in ISO 8601 format.
                            TIMESPEC='date' for date only (the default),
                            'hours', 'minutes', 'seconds', or 'ns' for date
                            and time to the indicated precision.
  -r, --reference=FILE      display the last modification time of FILE
  -R, --rfc-2822            output date and time in RFC 2822 format.
                            Example: Mon, 07 Aug 2006 12:34:56 -0600
      --rfc-3339=TIMESPEC   output date and time in RFC 3339 format.
                            TIMESPEC='date', 'seconds', or 'ns' for
                            date and time to the indicated precision.
                            Date and time components are separated by
                            a single space: 2006-08-07 12:34:56-06:00
  -s, --set=STRING          set time described by STRING
  -u, --utc, --universal    print or set Coordinated Universal Time (UTC)
      --help     顯示此求助說明並離開
      --version  顯示版本資訊並離開

FORMAT controls the output.  Interpreted sequences are:

  %%   a literal %
  %a   locale's abbreviated weekday name (e.g., Sun)
  %A   locale's full weekday name (e.g., Sunday)
  %b   locale's abbreviated month name (e.g., Jan)
........
如此即可查詢到 %Y, %m, %d 的相關選項功能！

例題：
如果需要秀出『 小時:分鐘 』的格式，要如何執行指令？
請直接輸入指令『 date +%s 』，對照 --help 功能，查詢一下輸出的資訊是什麼？
查詢一下 --help 的功能後，如果要顯示兩天以前 (2 days ago) 的『 +%Y/%m/%d 』，要如何下達指令？
如果需要顯示出『 西元年-日-月 小時:分鐘 』的格式，日期與時間中間有一個空格！該如何下達指令？
而如果想要知道年曆或者是月曆，就可以透過 cal 這個指令來查詢

例題：使用 cal 搭配 cal --help 查詢相關選項，完成底下的題目。
顯示目前這個月份的月曆
顯示今年的年曆
顯示前一個月、本月、下一個月的月曆

2.1.2：身份切換 su - 的使用
繼續來玩一下 date 這個指令！從前一小節使用 date --help 後，可以發現語法有兩種情況，如下所示：

[student@localhost ~]$ date --help
Usage: date [OPTION]... [+FORMAT]
  or:  date [-u|--utc|--universal] [MMDDhhmm[[CC]YY][.ss]]
Display the current time in the given FORMAT, or set the system date.
指令說明當中，可以是『顯示, display』也能夠是『設定, set』日期。語法 (Usage) 的第一行就是顯示日期而已，第二行當然就是設定日期了。 如果使用 student 身份來設定日期，會有什麼狀況？

[student@localhost ~]$ date 042211072016
date: cannot set date: Operation not permitted
Fri Apr 22 11:07:00 CST 2016
[student@localhost ~]$ date
Fri Apr 22 19:05:17 CST 2016
可以發現到日期並沒有變更到正確的日期 (第二個 date 指令在確認有沒有修訂成功，因為兩者日期不同，因此確認沒有成功)。 而且 date 也明白的告訴操作者，操作者沒有權限 (Operation not permitted)！因為日期的設定要系統管理員才能夠設定的。 此時我們就得要切換身份成為系統管理員(root)才行。處理的方法如下：

[student@localhost ~]$ su -
密碼：
上一次登入：四  4月 21 02:42:42 CST 2016在 tty2
[root@localhost ~]# 
本系統 root 的密碼為 centos7 ，因此在『密碼：』後面輸入 centos7 之後，你就可以發現使用者的身份變換成為 root 了！ 此時再次使用 date 來看看日期能否被設定為正確？

[root@localhost ~]# date 042211142016
Fri Apr 22 11:14:00 CST 2016
[root@localhost ~]# date
Fri Apr 22 11:14:02 CST 2016
讀者們可以發現上表兩個指令的操作相差約 2 秒鐘，因此輸出的資訊就會有兩秒鐘的誤差。不過，日期確實就被修訂成為目前的狀態。 但如果需要完整的設定系統時間，則需要使用 hwclock -w 寫入 BIOS 時間鐘才行。(由於虛擬機的 BIOS 也是虛擬的，因此不需要使用 hwclock 寫入)

另外， root 的身份是作為系統管理所需要的功能，因此做完任何系統維護行為後，請回復到一般用戶的身份較佳 (這個習慣請務必養成！)。

例題：
為何當你使用 su - 切換成 root 之後，想要使用方向鍵上/下去呼叫剛剛下達的 date 0421... 指令時，會呼叫不出來？
要如何離開 root 再次成為 student ？

2.1.3：語系功能切換
由於我們的系統環境使用中文，因此在日期的輸出方面可能就是以中文為主。那如果想要顯示為英文年月時，就得要修改一個變數，如下所示：

[student@localhost ~]$ date
五  4月 22 11:24:09 CST 2016
[student@localhost ~]$ LANG=en_US.utf8
[student@localhost ~]$ date
Fri Apr 22 11:24:46 CST 2016
你可以發現日期已經變更成為英文的方式來顯示了！此即 LANG 語系變數的設定功能。台灣地區經常使用的語系有中文與英文的萬國碼兩種， 當然，比較舊的資料可能需要使用 big5 編碼，所以台灣常見的語系有：

zh_TW.utf8
zh_TW.big5
en_US.utf8
至於語系的變化其實有兩個變數可以使用，除了常用的 LANG 之外，也可以透過 LC_ALL 來修訂！但一般建議使用 LANG 即可。 而查閱目前語系的方法為：

[student@localhost ~]$ echo ${LANG}
en_US.utf8
例題：
將語系調整為預設的 zh_TW.utf8
輸入 locale 查閱一下目前系統上所有使用的各項訊息輸出語系為何？
使用 locale --help ，查詢一下哪個選項可以列出目前系統所支援的語系？
承上，請列出所有語系，但是在純文字模式 (tty2~tty6) 情況下，語系資料量太大，又沒有滑鼠滾輪可以利用， 此時可以使用哪些組合按鈕來顯示之前的螢幕畫面？
承上，若想要讓命令提示字元出現在第一行 (螢幕最上方)，可以輸入那一個指令來清空畫面？

2.1.4：常見的熱鍵與組合按鍵
除了上個例題談到的可以上下移動螢幕畫面的組合按鍵之外，在純文字模式 (bash shell) 的環境下，建議讀者們一定要熟記且經常應用的熱鍵與組合鍵有：

[tab]：可以是命令補齊，可以是檔名補齊，也能是變數名稱補齊
[ctrl]+c：中斷一個運作中的指令
[shift]+[PageUp], [shift]+[PageDown]：上下移動螢幕畫面
例題：
系統中以 if 及 ls 為開頭的指令，各有哪些？
有個以 ifco 為開頭的指令，詳細指令名稱我忘記了，你可以找到這個指令名稱嘛？
操作一個指令『 find / 』這個指令輸出很亂，我不想看了，該如何中斷這個指令？
操作一個指令『 ls ' 』，因為不小心多按了一個單引號，導致指令輸入行為很怪異，如何中斷？
我想用『 ll -d 』去看一下 /etc/sec 開頭的檔案有哪些，可以怎麼做？
我想要知道，到底有多少變數是由 H 開頭的？如何使用 echo 去查閱？

2.1.5：線上求助方式
ll, ls, date, cal 均可使用 --help 來查詢語法與相關的選項、參數資料，但某些指令則沒有辦法顯示詳細的資訊。 例如底下的小算盤指令：

[student@localhost ~]$ bc
bc 1.06.95
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
1+2+3+4
10
1/3
0
quit
bc 指令為 Linux 純文字界面下的小算盤，你可以使用 bc --help 查詢到相關的選項資料，但是如上所示，加減乘除的符號， 還有小數點位數資料，以及離開 (quit) 等資訊，則沒有顯示於 --help 的輸出畫面中。Linux 有提供一個名為 manual page (手冊頁) 的功能， 你可以用 manual 縮寫 (man) 來查詢，如下所示：

[student@localhost ~]$ man bc
bc(1)                      General Commands Manual                      bc(1)

NAME
       bc - An arbitrary precision calculator language

SYNTAX
       bc [ -hlwsqv ] [long-options] [  file ... ]

DESCRIPTION
       bc is a language that supports arbitrary precision numbers with inter‐
       active execution of statements.  There are some  similarities  in  the
       syntax  to  the  C  programming  language.  A standard math library is
       available by command line option.  If requested, the math  library  is
       defined  before  processing  any  files.  bc starts by processing code
       from all the files listed on the command line  in  the  order  listed.
       After all files have been processed, bc reads from the standard input.
       All code is executed as it is read.  (If a file contains a command  to
       halt the processor, bc will never read from the standard input.)
.......

   OPTIONS
       -h, --help
              Print the usage and exit.

       -i, --interactive
              Force interactive mode.
.......

   VARIABLES
       There  are  four  special  variables,  scale,  ibase, obase, and last.
       scale defines how some operations use digits after the decimal  point.
       The default value of scale is 0. ibase and obase define the conversion
       base for input and output numbers.  The default  for  both  input  and
       output  is  base  10.   last (an extension) is a variable that has the
       value of the last printed number.  These will be discussed in  further
       detail  where  appropriate.   All  of  these variables may have values
       assigned to them as well as used in expressions.
.......

       - expr The result is the negation of the expression.

       ++ var The  variable  is  incremented  by one and the new value is the
              result of the expression.

       -- var The variable is decremented by one and the  new  value  is  the
              result of the expression.

       var ++
               The  result of the expression is the value of the variable and
              then the variable is incremented by one.

       var -- The result of the expression is the value of the  variable  and
              then the variable is decremented by one.

       expr + expr
              The result of the expression is the sum of the two expressions.
.......

AUTHOR
       Philip A. Nelson
       philnelson@acm.org

ACKNOWLEDGEMENTS
       The author would like to thank Steve  Sommars  (Steve.Sommars@att.com)
       for his extensive help in testing the implementation.  Many great sug‐
       gestions were given.  This  is  a  much  better  product  due  to  his
       involvement.

GNU Project                       2006-06-11                            bc(1)
這個 man 是比較詳細的資料，在該畫面中，你可以使用底下的按鈕來移動螢幕顯示整份文件的位置：

[enter]：向文件後面移動一行
[PageUp]/[PageDown]：向文件前/後移動一頁
方向鍵上/下：向文件前/後移動一行
g：移動到整份文件的第一行
G：移動到整份文件的最後一行
q：離開 man page
有興趣的話，讀者們可以自己慢慢的閱讀 man page。如果是短時間要查詢重要的項目，例如我們需要調整輸出的小數點位數 (scale) 時， 可以『跑到整份文件的第一行，然後輸入斜線 / ，輸入關鍵字』之後 man page 就可以自動幫你找關鍵字。

/keyword：命令 man page 找到關鍵字
n：向整份文件的下方繼續找關鍵字
N：向整份文件的上方繼續找關鍵字
例題：
在 bc 的執行環境中，讓 1/3 可以輸出 .3333 這樣的格式
以 man bc 當中，找關鍵字『 pi= 』，然後在 bc 的環境中，算出 pi 的 50 位數結果。
在 bc 的環境下，算出 1000/17 的『餘數 (remainder)』
在 man date 的環境下，找到第一個範例 (Examples)，並說明該指令的意義為何？
man page 除了上述的功能之外，其實 man page 的第一行也顯示了該指令/檔案的功能，例如 BC(1) 代表的是 1 號 man page， 而共有 9 種左右的 man page 號碼，其意義為：

代號	代表內容
1	使用者在shell環境中可以操作的指令或可執行檔
2	系統核心可呼叫的函數與工具等
3	一些常用的函數(function)與函式庫(library)，大部分為C的函式庫(libc)
4	裝置檔案的說明，通常在/dev下的檔案
5	設定檔或者是某些檔案的格式
6	遊戲(games)
7	慣例與協定等，例如Linux檔案系統、網路協定、ASCII code等等的說明
8	系統管理員可用的管理指令
9	跟kernel有關的文件
上述的表格內容可以使用『man man』來更詳細的取得說明。透過這張表格的說明， 未來你如果使用man page在察看某些資料時，就會知道該指令/檔案所代表的基本意義是什麼了。

例題：
我們知道 passwd 有兩個地方存在，一個是設定檔 /etc/passwd，一個是變更密碼的指令 /usr/bin/passwd， 如何分別查詢兩個資料的 man page 呢？

2.1.6：管線命令的應用
從前幾小節的練習中，有時候我們會發現幾件事情：(1)指令輸出的資料量常常很大，一個螢幕裝不下，連使用[shift]+[pageup] 都沒有辦法全部看完； (2)在 man bc 時，找那個 pi= 的項目中，範例提到在文字界面下，可以透過某些方式不要進入 bc 去算 pi ！

尤其是第 2 個項目，裡面就談到那個 | 的符號，這個符號我們稱作『管線 (pipe) 』！ 它的目的是『將前一個指令輸出的資料，交由後面的指令來處理』的意思～我們來談談該指令的意義：

[student@localhost ~]$ echo "scale=10; 4*a(1)" | bc -l
如果你將上面的指令分成兩部份來看，第一部份先執行『echo "scale=10; 4*a(1)"』，就可以發現從螢幕上輸出『 scale=10; 4*a(1) 』的字樣，echo 這個指令很單純的將後續的資料當成文字訊息輸出到螢幕上。 這些資料之後被帶入到 bc 指令中，亦即直接在 bc 的環境中進行 scale=10; 4*a(1) 的運算之意。

有兩個指令很常使用於大量資料輸出時的片段展示，那就是 more 與 less。more 會一頁一頁翻動，但是無法向前回去查詢之前的畫面。 至於 less 就是 man page 的操作環境。

例題：
分別透過 more 與 less 將 ll /etc 的結果一頁一頁翻動；
承上，嘗試找到 passwd 相關字樣的檔名結果
使用 find /etc 的指令，但是將結果交給 less 來查詢
承上，若使用的身份為 student 時，能否找到錯誤訊息呢？
透過管線的功能，計算出一年 365 天共有幾秒鐘？
Tips
鳥哥的圖示並不是所有的指令都支援管線命令的，例如之前談到的 ls, ll, find 或本章稍晚會提到的 cp, mkdir 等指令。 能夠支援管線 | 的指令，就被稱為管線命令。

除了使用 | less 的功能加上斜線 (/) 找到關鍵字的方法之外，我們也可以透過 grep 來取得關鍵字！ 以上頭的例題來看，如果要使用 ll /etc/ 找出 passwd 的關鍵字『那一行』的話，可以簡單的這樣做：

[student@localhost ~]$ ll /etc/ | grep 'passwd'
例題：
以 ifconfig 指令來觀察系統的所有介面卡 IP
使用管線命令搭配 grep 取得關鍵字，來取出有 IP 的那行訊息即可。

2.2：Linux 檔案管理初探
在 Linux 的系統下，總是會需要用到檔案管理的情況發生，包括建立目錄與檔案、複製與移動檔案、刪除檔案與目錄等等。 另外，讀者也應該要知道在 Linux 的系統下，那些目錄是正規系統會存在的，以及該目錄又應該要放置哪些資料等等。

2.2.1：Linux 目錄樹系統簡介
所有的 Linux distribions 理論上都應該要遵循當初 Linux 開發時所規範的各項標準，其中之一就是檔案系統的階層標準 (Filesystem Hierarchy Standard, FHS)。基本上 FHS 只是一個基本建議值，詳細的資料還是保有讓各個 distribution 自由設計的權力！ 無論如何，FHS 還是規範了根目錄與 /usr, /var 這三個目錄內應該要放置的資料就是了。

CentOS 7 的目錄規範與以前的 CentOS 6 差異頗大，詳細的資料還請參考相關文件，底下僅就個別目錄中應該要放置的資料做個基本的解釋。 請自行『 ll / 』對照下表的相關目錄說明。

目錄名稱	應放置檔案內容(一定要知道的內容)
/bin
/sbin	/bin 主要放置一般用戶可操作的指令
/sbin 主要放置系統管理員可操作的指令
這兩個資料目前都是連結檔，分別連結到 /usr/bin, /usr/sbin 當中
/boot	與開機有關的檔案，包括核心檔案 / 開機管理程式與設定檔
/dev	是 device 的縮寫，放置裝置檔，包括硬碟檔、鍵盤滑鼠終端機檔案等
/etc	一堆系統設定檔，包括帳號、密碼與各式服務軟體的設定檔大多在此目錄內
/home
/root	/home 是一般帳號的家目錄預設放置位置
/root 則是系統管理員的家目錄了！
/lib
/lib64	系統函式庫與核心函式庫，其中 /lib 包含核心驅動程式，而其他軟體的函式庫若為 64 位元，則使用 /lib64 目錄內的函式庫檔案。 這兩個目錄目前也都是連結到 /usr/lib, /usr/lib64 內。
/proc	將記憶體內的資料做成檔案類型，放置於這個目錄下，連同某些核心參數也能手動調整
/sys	跟 /proc 類似，只是比較針對硬體相關的參數方面。
/usr	是 usr 不是 user 喔！是 unix software resource 的縮寫，與 Unix 程式有關。從 CentOS 7 開始， 系統相關的所有軟體、服務等，均放置在這個目錄中了！因此不能與根目錄分離。
/var	是一些變動資料，系統運作過程中的服務資料、暫存資料、登錄資料等等。
/tmp	一些使用者操作過程中會啟用的暫存檔，例如 X 軟體相關的資料等等。
Linux 是由工程師開發的，許多的目錄也沿用 Unix 的規範，Unix 也是工程師開發的，所以許多的目錄命名通常就與該目錄要放置的資料有點相關性。 例如 bin, sbin 就類似 binary, system binary (二進位程式、系統管理二進位程式) 來結合這樣～

目錄名稱	應放置檔案內容(以後用到就知道了)
/media
/mnt	/media 主要是系統上臨時掛載使用的裝置(如隨插即用 USB)之慣用目錄
/mnt 主要是使用者或管理員自行暫時手動掛載的目錄
/opt	/opt 是 optional 的意思，通常是第三方協力廠商所開發的軟體放置處
/run	系統進行服務軟體運作管理的功能，CentOS 7以後，這個目錄也放在記憶體當中了！
/srv	通常是給各類服務 (service) 放置資料使用的目錄
另外，在 Linux 環境下，所有的目錄都是根目錄 (/) 衍生出來的，從根目錄開始撰寫的檔名也就被稱為『絕對路徑』。 而磁碟規劃方面，若需要了解磁碟與目錄樹的搭配，可以使用 df (display filesystem) 的軟體來查閱：

[student@localhost ~]$ df
檔案系統                 1K-區段    已用    可用 已用% 掛載點
/dev/mapper/centos-root 10475520 4024880 6450640   39% /
devtmpfs                 1008980       0 1008980    0% /dev
tmpfs                    1024480      96 1024384    1% /dev/shm
tmpfs                    1024480    8988 1015492    1% /run
tmpfs                    1024480       0 1024480    0% /sys/fs/cgroup
/dev/vda2                2086912  150216 1936696    8% /boot
/dev/mapper/centos-home  3135488   41368 3094120    2% /home
tmpfs                     204900      20  204880    1% /run/user/1000
上表中最左側為檔案系統，最右側則是掛載點。掛載點有點類似 windows 系統的 C:, D:, E: 等磁碟槽的意思。 在 Linux 底下所有的檔案都是從目錄樹分出來，因此檔案系統也需要跟目錄結合在一起。以上表來說，『當你進入 /boot 這個目錄時， 就可以看到 /dev/vda2 這個裝置的內容』之意。

此外，系統也已經將記憶體模擬成檔案系統，提供使用者將暫存資料放置於高速的記憶體內。只是這些資料在關機後就會消失。 這些目錄包括很重要的 /dev/shm (上表)。

例題：
使用 ll / 觀察檔名，在出現的畫面中，『連結檔』與『一般目錄』的差別中，最左邊的字元分別是什麼？
/proc 與 /sys 的檔案容量分別有多大？為什麼？
/boot/vmlinuz 開頭的檔名為系統的『核心檔案』，找出來 CentOS 7 的環境下，這個核心檔案容量有多大？
使用 man ls 及 man ifconfig 兩個指令查詢完畢後，猜測 ls 與 ifconfig 『可能』放置在哪些目錄內？
如果你有一個暫時使用的檔案需要經常存取，且檔案容量相當大，為了加速，你可以將這個檔案暫時放置於哪裡來做編輯？ 只是編輯完畢後必須要重新複製回原本的目錄去。

2.2.2：工作目錄的切換與相對/絕對路徑
預設的情況下，使用者取得 shell 的環境時，通常就是在自己的『家目錄』，例如 windows 檔案總管打開後， 出現在畫面中的，通常是『我的文件夾』之類的環境。若要變更『工作目錄』，例如變更工作目錄到 /var/spool/mail 去，可以這樣做：

[student@localhost ~]$ ls
下載  公共  圖片  影片  文件  桌面  模板  音樂
[student@localhost ~]$ cd /var/spool/mail
[student@localhost mail]$ ls
root  rpc  student 
如上所示，一開始讀者會在 student 家目錄下，因此單純使用 ls 時，會列出工作目錄 (家目錄) 底下的資料，亦即是一堆中文檔名的目錄存在。 而當讀者操作『 cd /var/spool/mail 』之後，工作目錄會變成該目錄，所以提示字元裡面也將 ~ 變成了 mail 了。因此使用 ls 所列出的工作目錄下的資料， 就會有不一樣的檔名出現。讀者在操作指令時，要特別注意『工作目錄』才行。而列出目前工作目錄的方法為使用 pwd：

[student@localhost mail]$ pwd
/var/spool/mail
[student@localhost mail]$ 
讀者操作系統時，不要只看提示字元下的檔名，最好能夠查閱實際的目錄較佳。如下案例：

[student@localhost mail]$ cd /etc
[student@localhost etc]$ pwd
/etc
[student@localhost etc]$ cd /usr/local/etc
[student@localhost etc]$ pwd
/usr/local/etc
[student@localhost etc]$ 
操作者可發現，自從進到 /etc 之後，提示字元內的目錄位置一直是『 etc 』，然而使用 pwd 就能夠發現兩者的差異。 這在系統管理時非常的重要，若去錯目錄，會導致檔案修訂的錯誤！

除了根目錄與家目錄之外，Linux 上有一些比較特別的目錄需要記憶：

目錄名稱	目錄意義
/	根目錄，從根目錄寫起的檔名只會存在一個
~	使用者的家目錄，不同用戶的家目錄均不相同
.	一個小數點，代表的是『本目錄』，亦即目前的工作目錄之意
..	兩個小數點，代表的是『上一層目錄』
-	一個減號，代表『上一次的工作目錄』之意
操作者應該要注意，根據檔名寫法的不同，也可將所謂的路徑(path)定義為絕對路徑(absolute)與相對路徑(relative)。 這兩種檔名/路徑的寫法依據是這樣的：

絕對路徑：由根目錄(/)開始寫起的檔名或目錄名稱， 例如 /home/student/.bashrc；
相對路徑：相對於目前路徑的檔名寫法。 例如 ./home/student 或 ../../home/student/ 等等。開頭不是 / 就屬於相對路徑的寫法
例題：
前往 /var/spool/mail 並觀察當下的工作目錄
觀察上一層目錄的檔名資料，查詢一下有沒有『 anacron 』這個檔名存在？
請前往『上一層目錄的那個 anacron 目錄』
在當下的目錄中，如何查詢 /var/log 這個目錄的內容？分別使用兩種方式 (相對/絕對路徑) 來查閱
回到 student 家目錄
分別使用『預設』、『相對路徑』、『絕對路徑』、『工作目錄底下』執行 ifconfig 的方法

2.2.3：簡易檔案管理練習
由本章的說明，讀者可以清楚 /etc 與 /boot 為兩個相當重要的目錄，其中 /etc 更是需要備份的所在。 若讀者使用 student 的身份來暫時進行檔案管理行為時，例如將 /etc 完整備份時，可以如何進行？

先前往 /dev/shm 這個記憶體模擬的目錄來操作後續指令：
[student@localhost ~]$ cd /dev/shm
[student@localhost shm]$ 
建立一個名為 backup 的目錄，等待備份資料：
[student@localhost shm]$ mkdir backup
[student@localhost shm]$ ll
drwxrwxr-x. 2 student student       40  4月 26 21:32 backup
-rwx------. 1 gdm     gdm     67108904  4月 26 17:48 pulse-shm-1013772778
-rwx------. 1 student student 67108904  4月 26 17:49 pulse-shm-1217036117
.......
進入 backup 目錄當中：
[student@localhost shm]$ cd backup
[student@localhost backup]$ pwd
/dev/shm/backup
將 /etc 完整的複製過來：
[student@localhost backup]$ cp /etc .
cp: 略過 ‘/etc’ 目錄
因為 cp 會自動忽略目錄的複製，因此需要如下的指令來複製目錄才行
開始複製目錄 (-r) 的動作：
[student@localhost backup]$ cp -r /etc .
cp: 無法開啟 ‘/etc/crypttab’ 來讀取資料: 拒絕不符權限的操作
cp: 無法存取 ‘/etc/pki/CA/private’: 拒絕不符權限的操作
cp: 無法存取 ‘/etc/pki/rsyslog’: 拒絕不符權限的操作
.......
因為系統很多保密的檔案是不許被一般用戶所讀取的，因此 student 許多檔案無法順利複製也是正確的！操作者無須擔心。
再次複製檔案，同時將錯誤訊息傳送到垃圾桶，不要顯示在螢幕上：
[student@localhost backup]$ cp -r /etc . 2> /dev/null
[student@localhost backup]$ ll -d /etc ./etc
drwxr-xr-x. 129 root    root    8192  4月 26 19:11 /etc
drwxr-xr-x. 129 student student 4960  4月 26 21:41 ./etc
透過上面的練習，最終我們知道其實 student 身份複製的 /dev/shm/backup/etc 是沒有完整的備份的！因為兩者的容量大小、 內容檔案、權限都不相同之故。至於相關的指令功能、選項功能等等，請自由 man cp、 man mkdir 來預先了解。

另外，在一些錯誤訊息要丟棄的環境中，也可以在指令的最後面加上 2> /dev/null 來將錯誤的資料導向垃圾桶 (/dev/null)。

例題：
先查看一下有沒有 /dev/shm/backup/etc/passwd* 的檔名存在？
複製使用 cp 而刪除可以使用 rm。嘗試刪除前一題的檔名，並確認該檔案已經不存在了。
查看一下 /dev/shm/backup/etc/X11 是『檔案』還是『目錄』？
如何刪除前一題談到的目錄？
若想要刪除 /dev/shm/backup/etc/xdg 這個目錄，且『每個檔案刪除前均須詢問』，須加上哪個選項？

2.3：課後練習操作
前置動作：請使用 unit02 的硬碟進入作業環境，並請先以 root 身分執行 vbird_book_setup_ip 指令設定好你的學號與 IP 之後，再開始底下的作業練習。

簡答題：請使用 student 的身份登入系統，然後在應用程式中找尋一個名為 gedit 的指令，打開該軟體之後，依據底下的題目寫下答案。 儲存時，請選擇檔名為 /home/student/ans02.txt (建議寫下答案前，均在系統上面實驗過才好。)
(a)甚麼指令可以切換語系成為 en_US.utf8，並且(b)如何確認語系為正確設定了；
Linux 的日期設定其實與 Unix 相同，都是從 1970/01/01 開始計算時間而來。若有一個密碼資料，該資料告訴你密碼修改的日期是在 16849，請問如何使用 date 這個指令計算出該日期其實是西元年月日？(寫下完整指令)
用 cal 輸出 2016/04/29 這一天的月曆與直接看到該日為星期幾？(寫下完整指令)
承上，當天是這一年當中由 1 月 1 日算起來的第幾天？ (註：該日期稱為 julian date)，(a)寫下完整指令與(b)執行結果顯示第幾天
若為 root 的身份，使用 su - student 切換成為 student 時，需不需要輸入密碼？
呼叫出 HOME 這個變數的指令為何？
使用那一個指令可以查出 /etc/group 這個檔案的第三個欄位意義為何？(寫下指令)
請查出 /dev/null 這個裝置的意義為何？(寫下指令)
如何透過管線命令與 grep 的功能，透過 find /etc 找出檔名含有 passwd 的檔名資料？(a)寫下指令與(b)執行結果的檔名有哪幾個？
承上，將一堆錯誤訊息丟棄，我只需要顯示正確的檔名而已。(寫下指令)
根目錄下，那兩個目錄主要在放置使用者與管理員常用的指令？
根目錄下，那兩個目錄其實是記憶體內的資料，本身並不佔硬碟空間？
根目錄下，那一個目錄主要在放置設定檔？
上網找出， /lib/modules/ 這個目錄的內容主要在放置什麼東西？
有個指令名稱為 /usr/bin/mount，請使用『絕對路徑』與『工作目錄下的指令』來執行該指令
實作題：直接在系統上面操作，操作成功即可，無須寫下任何答案
使用 student 身分，在自己的家目錄底下，建立名為 ./20xx/unit02 的目錄
使用 student 身分，將 /etc/X11 這個資料複製到上述的目錄內
使用 root 的身分，刪除 /opt/myunit02 檔名。
使用 root 的身分，建立名為 /mnt/myunit02 目錄
使用 root 的身分，透過 find /etc 指令，找出檔名含有 passwd 的檔案資料，並將這些檔案資料複製到 /mnt/myunit02 去。
作業結果傳輸：請以 root 的身分執行 vbird_book_check_unit 指令上傳作業結果。 正常執行完畢的結果應會出現【XXXXXX;aa:bb:cc:dd:ee:ff;unitNN】字樣。若需要查閱自己上傳資料的時間， 請在作業系統上面使用： http://192.168.251.250 檢查相對應的課程檔案。

-----

#### Footer
Copyrights | EZMarkDown Studio &copy; 2021

-----

<span class="d-block mt-5"></span>