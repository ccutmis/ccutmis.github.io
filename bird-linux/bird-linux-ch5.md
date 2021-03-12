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

[anchor](CH5-Linux-BASIC-Authority-And-Process-Manage)
![banner](images/1.jpg)
### 鳥哥Linux基礎篇 - 第 5 堂課：權限應用、程序之觀察與基本管理

<span class="hr"></span>

第 5 堂課：權限應用、程序之觀察與基本管理
最近更新日期：2017/03/11
前一堂課主要講 Linux 基礎權限概念。雖然有了三種身份與各三個權限的概念，但是實際應用於目錄及檔案則有不同的現象。 此外，權限與實際操作者取得的程序是有關係的，因此本堂課亦將介紹程序的概念以及基礎的觀察、管理等任務。

5.1：權限在目錄與檔案應用上的意義
5.1.1：目錄檔與一般檔的權限意義
5.1.2：使用者操作功能
5.2：程序管理初探
5.2.1：什麼是程式 (program) 與程序 (process)
5.2.2：觀察程序的工具指令
5.2.3：程序的優先序 PRI 與 NI
5.2.4：bash 的工作管理
5.3：特殊權限 SUID/SGID/SBIT 的功能
5.3.1：SUID/SGID/SBIT 的觀察與功能說明
5.3.2：SUID/SGID/SBIT 權限的設定
5.4：課後練習操作
5.1：權限在目錄與檔案應用上的意義
從前一小節我們知道了 Linux 的檔案權限設定上有三種身份，每種身份則有三種權限 (rwx)。不過檔案系統裡面的檔案類型很多，基本上就有一般檔案與目錄檔案， 這兩種檔案類型的權限意義並不相同。

5.1.1：目錄檔與一般檔的權限意義
權限對檔案的重要性
檔案是實際含有資料的地方，包括一般文字檔、資料庫內容檔、二進位可執行檔(binary program)等等。 因此，權限對於檔案來說，他的意義是這樣的：

r (read)：可讀取此一檔案的實際內容，如讀取文字檔的文字內容等；
w (write)：可以編輯、新增或者是修改該檔案的內容(但不含刪除該檔案)；
x (eXecute)：該檔案具有可以被系統執行的權限。
可讀 (r) 代表可以讀取檔案實際的內容，可編輯 (w) 的意思是可以寫入/編輯/新增/修改檔案的內容的權限，但並不具備有刪除該檔案本身的權限！

可執行 (x) 代表該檔案具有可以被執行的權限，但該檔案的程式碼能不能執行則是另一回事。舉例來說，一個單純的文字檔案，內容為一封信件時，你也可以設定該檔案擁有 x 的可執行權限， 但該檔案的內容其實不具備執行檔的功能。因此當該檔案被執行時，就會出現程式錯誤的情況。

對於檔案的rwx來說， 主要都是針對『檔案的內容』而言，與檔案檔名的存在與否沒有關係。

權限對目錄的重要性
檔案是存放實際資料的所在，而目錄主要的內容在記錄檔名清單，檔名與目錄有強烈的關連。如果是針對目錄時，rwx 的意義如下：

r (read contents in directory)：
表示具有讀取目錄結構清單的權限，所以當用戶具有讀取(r)一個目錄的權限時，表示該用戶可以查詢該目錄下的檔名資料。

w (modify contents of directory)：
當用戶具有目錄的 w 權限時，表示用戶具有異動該目錄結構清單的權限，也就是底下這些權限：
建立新的檔案與目錄；
刪除已經存在的檔案與目錄(不論該檔案的權限為何！)
將已存在的檔案或目錄進行更名；
搬移該目錄內的檔案、目錄位置。

x (access directory)：
目錄的x代表的是使用者能否進入該目錄成為工作目錄的用途！
若以較人性化的角度來思考，讓檔案變成資料夾、目錄變成抽屜，則 rwx 的功能彙整如下表：

元件	內容	思考物件	r	w	x
檔案	詳細資料data	文件資料夾	讀到文件內容	修改文件內容	執行文件內容
目錄	檔名	可分類抽屜	讀到檔名	修改檔名	進入該目錄的權限(key)
讀者須注意，目錄的 rw 與『檔名』有關，而檔案的 rw 則與『檔案的內容，包括程式碼與資料等』有關。比較特別的是目錄的 x，該權限代表用戶能否打開抽屜取得該抽屜內的檔名資料。

例題：
有個目錄的權限如下所示：
drwxr--r--  3  root  root  4096   Jun 25 08:35   .ssh
系統有個帳號名稱為vbird，這個帳號並沒有支援root群組，請問vbird對這個目錄有何權限？是否可切換到此目錄中？
答：
vbird對此目錄僅具有r的權限，因此vbird可以查詢此目錄下的檔名列表。因為vbird不具有x的權限，亦即 vbird 沒有這個抽屜的鑰匙啦！ 因此vbird並不能切換到此目錄內！(相當重要的概念！)
至於刪除檔案時需要具備的權限功能，讀者可以思考一下底下的題目：

例題：
有兩個目錄與檔案的權限如下所示：
drwx------ 5 student student 4096 Jul 04 11:16  /home/student/
-rwx------ 1 root    root     128 Jul 04 11:18  /home/student/the_root_data
其中請問 student 能不能刪除 the_root_data 檔案？
答：
student 不能讀取該檔案的內容，不能編輯該檔案，但是可以刪除該檔案！這是因為該檔案在 student 的家目錄。思考一下，有一個密封的文件夾，放在你的私人抽屜內， 你應該可以『打開抽屜、拿出這個文件夾、打不開也看不到這個文件夾，但是可以將這個文件夾丟到垃圾桶去』！這就是目錄 (抽屜) 的 rwx 功能。

5.1.2：使用者操作功能
根據上述的權限意義，假如用戶想在 /dir1/file1 與 /dir2 之間進行如下的動作時，用戶應該具有哪些『最小權限』才能運作？

操作動作	/dir1	/dir1/file1	/dir2	重點
讀取 file1 內容	 	 	 	要能夠進入 /dir1 才能讀到裡面的文件資料！
修改 file1 內容	 	 	 	能夠進入 /dir1 且修改 file1 才行！
執行 file1 內容	 	 	 	能夠進入 /dir1 且 file1 能運作才行！
刪除 file1 檔案	 	 	 	能夠進入 /dir1 具有目錄修改的權限即可！
將 file1 複製到 /dir2	 	 	 	要能夠讀 file1 且能夠修改 /dir2 內的資料
將 file1 移動到 /dir2	 	 	 	兩個目錄均需要被更改
實做底下的例題：

例題：
請使用 root 的身份建立底下的檔案與權限：
drwxrwxr-x  root root /dev/shm/unit05/
drwxr-xr--  root root /dev/shm/unit05/dir1/
-rw-r--r--  root root /dev/shm/unit05/dir1/file1 (複製來自 /etc/hosts)
drwxr-x--x  root root /dev/shm/unit05/dir2/
-rw-r--r--  root root /dev/shm/unit05/dir2/file2 (複製來自 /etc/hosts)
drwxr-xr-x  root root /dev/shm/unit05/dir3/
-rw-rw-rw-  root root /dev/shm/unit05/dir3/file3 (複製來自 /etc/hosts)
drwxrwxrwx  root root /dev/shm/unit05/dir4/
-rw-------  root root /dev/shm/unit05/dir4/file4 (複製來自 /etc/hosts)
底下請使用 student 的身份進行各個工作：
請使用 ls -l /dev/shm/unit05/dir[1-4] 依據輸出的結果說明為何會產生這些問題？
請使用 ls -l /dev/shm/unit05/dir1/file1 ，依序將上述的檔名由 dir1/file1 ~ dir4/file4 執行，依據產生的結果說明為何會如此？
請使用 vim /dev/shm/unit05/dir1/file1 ~ vim /dev/shm/unit05/dir4/file4，嘗試儲存 (或強制儲存)，說明為何可以/不可以儲存？

5.2：程序管理初探
在 Linux 系統運作中，所有在系統上面運作的都是透過觸發程式成為記憶體中的程序後，才能夠順利的操作系統。程序的觀察與管理是相當重要的， 所以讀者應該先認識程序後，才能夠進一步管理。

5.2.1：什麼是程式 (program) 與程序 (process)
在一般的理解中，程式與程序的關係是這樣的：

程式 (program)：通常為 binary program ，放置在儲存媒體中 (如硬碟、光碟、軟碟、磁帶等)， 為實體檔案的型態存在；
程序 (process)：程式被觸發後，執行者的權限與屬性、程式的程式碼與所需資料等都會被載入記憶體中，作業系統並給予這個記憶體內的單元一個識別碼 (PID)，可以說，程序就是一個正在運作中的程式。
程序的觸發流程與在記憶體當中的管理，簡單的圖示為：

程式被載入成為程序以及相關資料的示意圖
圖5.2-1、程式被載入成為程序以及相關資料的示意圖
上圖比較需要注意的是，同一隻程式有時候會被多個使用者執行觸發，因此系統當中可能會有多個程式碼相同的『程序』存在！ 那系統如何了解到底是哪隻程序在運作？此時就需要知道 PID (Process ID) 了。PID 是系統處理記憶體內程序的最重要的參考依據。 如下圖 5.2-2 所示，不同的使用者登入都是執行 /bin/bash 這個 shell，讀者也應該知道系統管理需要管理員身份的 bash 才能夠運作， 一般帳號的 bash 能做的事情相對較少。但其實兩者都是執行 bash 的。

不同執行者執行同一個程式產生的不同權限 PID 示意圖
圖5.2-2、不同執行者執行同一個程式產生的不同權限 PID 示意圖
父程序與子程序
程序是有相依性的！舉例來說，你想要執行 office 軟體時，因為 office 軟體是依附在圖形界面上，因此你一定要啟動 X server 這個圖形界面伺服器後， 才有辦法順利運作 office 的。此時你可以說， X server 是父程序，而 office 就是子程序了。

此外，讀者也嘗試使用過 su 來切換身份成為 root，此時 su 會給予一個具有 root 權限的 bash 環境，那麼使用者登入的 bash 就被稱為父程序， 由 su - 取得後的 bash 就是子程序，如下圖來觀察：

父程序與子程序的相關性
圖5.2-3、父程序與子程序的相關性

5.2.2：觀察程序的工具指令
程序的觀察大多使用 ps, pstree, top 等指令，不過最好根據觀察的對象來學習！底下列出幾個常見的觀察對象與所使用的指令對應。

ps -l ：僅觀察 bash 自己相關的程序
如果使用者僅想知道目前的 bash 界面相關的程序，可以使用簡易的 ps -l 即可！輸出界面示意：

[student@localhost ~]$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000  1685  1684  0  80   0 - 29011 wait   pts/0    00:00:00 bash
0 R  1000  4958  1685  0  80   0 - 34343 -      pts/0    00:00:00 ps
每個項目的意義簡單說明如下：

F (flag)：代表程序的總結旗標，常見為 4 代表 root
S (stat)：狀態列，主要的分類項目有：
R (Running)：該程式正在運作中；
S (Sleep)：該程式目前正在睡眠狀態(idle)，但可以被喚醒(signal)。
D ：不可被喚醒的睡眠狀態，通常這支程式可能在等待 I/O 的情況(ex>列印)
T ：停止狀態(stop)，可能是在工作控制(背景暫停)或除錯 (traced) 狀態；
Z (Zombie)：僵屍狀態，程序已經終止但卻無法被移除至記憶體外。
UID/PID/PPID：代表『此程序被該 UID 所擁有/程序的 PID 號碼/此程序的父程序 PID 號碼』
C：代表 CPU 使用率，單位為百分比；
PRI/NI：Priority/Nice 的縮寫，代表此程序被 CPU 所執行的優先順序，數值越小代表該程序越快被 CPU 執行。
ADDR/SZ/WCHAN：都與記憶體有關，ADDR 是 kernel function，指出該程序在記憶體的哪個部分，如果是個 running 的程序，一般就會顯示『 - 』 / SZ 代表此程序用掉多少記憶體 / WCHAN 表示目前程序是否運作中，同樣的， 若為 - 表示正在運作中。
TTY：登入者的終端機位置，若為遠端登入則使用動態終端介面 (pts/n)；
TIME：使用掉的 CPU 時間，注意，是此程序實際花費 CPU 運作的時間，而不是系統時間；
CMD：就是 command 的縮寫，造成此程序的觸發程式之指令為何。
上述的 PPID 即是父程序之意，因此 ps 的 PID 是 4958 而 PPID 是 1685，至於 1685 這個 PID 的主人就是 bash 。 而因為 bash 大部分在提供使用者一個輸入的界面，因此並沒有在執行 (run)，故大部分的時間其實是在等待使用者輸入指令， 因此上面讀者應該可以發現到 bash 的 S (state) 狀態為 S (sleep) 。

使用 pstree 與 ps aux 觀察全系統的程序
觀察全系統程序的方式主要有兩種，一種是程序關聯樹，亦即 pstree ，他相對簡單很多。為了顯示的方便，建議讀者可以下達 -A 的選項， 以 ASCII 的顯示字元輸出，比較不容易出現亂碼：

[student@localhost ~]$ pstree -A
systemd-+-ModemManager---2*[{ModemManager}]
        |-NetworkManager---2*[{NetworkManager}]
.......(中間省略)......
        |-gnome-shell-cal---4*[{gnome-shell-cal}]
        |-gnome-terminal--+-bash---pstree
        |                 |-gnome-pty-helpe
        |                 `-3*[{gnome-terminal-}]
.......(底下省略)......
讀者可以看到使用者透過圖形界面的 gnome-terminal 來取得 bash ，然後再以 bash 來啟動 pstree 的情況。若需要加上 PID 與使用者資料， 可以直接使用 -up 來加入即可。

[student@localhost ~]$ pstree -Aup
systemd(1)-+-ModemManager(822)-+-{ModemManager}(838)
           |                   `-{ModemManager}(863)
           |-NetworkManager(921)-+-{NetworkManager}(931)
           |                     `-{NetworkManager}(936)
.......(中間省略)......
           |-gnome-shell-cal(16734,student)-+-{gnome-shell-cal}(16741)
           |                                |-{gnome-shell-cal}(16784)
           |                                |-{gnome-shell-cal}(16785)
           |                                `-{gnome-shell-cal}(16891)
           |-gnome-terminal-(17301,student)-+-bash(17308)---pstree(17705)
           |                                |-gnome-pty-helpe(17307)
           |                                |-{gnome-terminal-}(17302)
           |                                |-{gnome-terminal-}(17303)
           |                                `-{gnome-terminal-}(17304)
.......(底下省略)......
需要注意的是，當父程序、子程序的擁有者不同時，在程式名稱後面才會加上使用者的資訊，否則會省略使用者的名稱。而因為同一隻程式會產生多個程序， 因此每個程序就會有獨立的 PID，這也需要特別注意。

除了較簡易的 pstree 之外，讀者最好也能夠記憶 ps aux 這一個指令的用途，這個指令可以將系統中的程序呼叫出來，且輸出的資訊較為豐富。 顯示的資訊有點像這樣：

[student@localhost ~]$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.4 128236  9068 ?        Ss    6月13   1:02 /usr/lib/systemd/systemd ...
root         2  0.0  0.0      0     0 ?        S     6月13   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        S     6月13   0:00 [ksoftirqd/0]
root         7  0.0  0.0      0     0 ?        S     6月13   0:00 [migration/0]
root         8  0.0  0.0      0     0 ?        S     6月13   0:00 [rcu_bh]
.......(中間省略)......
student  17301  0.1  1.0 728996 22508 ?        Sl   18:34   0:01 /usr/libexec/gnome-terminal-server
student  17307  0.0  0.0   8480   720 ?        S    18:34   0:00 gnome-pty-helper
student  17308  0.0  0.1 116156  2864 pts/1    Ss+  18:34   0:00 bash
.......(底下省略)......
每一個項目代表的意義簡易說明如下：

USER：該 process 屬於那個使用者帳號的？
PID ：該 process 的程序識別碼。
%CPU：該 process 使用掉的 CPU 資源百分比；
%MEM：該 process 所佔用的實體記憶體百分比；
VSZ ：該 process 使用掉的虛擬記憶體量 (Kbytes)
RSS ：該 process 佔用的固定的記憶體量 (Kbytes)
TTY ：該 process 是在那個終端機上面運作，若與終端機無關則顯示 ?，另外， tty1-tty6 是本機上面的登入者程序，若為 pts/0 等等的，則表示為由網路連接進主機的程序。
STAT：該程序目前的狀態，狀態顯示與 ps -l 的 S 旗標相同 (R/S/T/Z)
START：該 process 被觸發啟動的時間；
TIME ：該 process 實際使用 CPU 運作的時間。
COMMAND：該程序的實際指令為何？
top 動態觀察程序
讀者亦可以透過 top 這個指令來觀察程序的動態資訊。top 可以協助讀者未來在管理程序的 CPU 使用量上面的一個很重要的工具。 直接輸入 top 即可每 5 秒鐘更新一次程序的現況，如下表所示：

[student@localhost ~]$ top
top - 19:02:56 up 21 days, 19:16,  3 users,  load average: 0.00, 0.01, 0.05
Tasks: 184 total,   1 running, 183 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  2048964 total,   172968 free,   517972 used,  1358024 buff/cache
KiB Swap:  2097148 total,  2096800 free,      348 used.  1283612 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND   
18432 student   20   0  146148   2120   1436 R   0.5  0.1   0:00.09 top
    1 root      20   0  128236   9068   2640 S   0.0  0.4   1:02.41 systemd
    2 root      20   0       0      0      0 S   0.0  0.0   0:00.43 kthreadd
    3 root      20   0       0      0      0 S   0.0  0.0   0:00.01 ksoftirqd/0
    7 root      rt   0       0      0      0 S   0.0  0.0   0:00.42 migration/0
    8 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcu_bh
    9 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/0
   10 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcuob/1
   11 root      20   0       0      0      0 S   0.0  0.0   1:05.20 rcu_sched
每一行的意義說明如下：

top - 19:02:56 up 21 days, 19:16,  3 users,  load average: 0.00, 0.01, 0.05
代表目前為 19:02:56 ，本系統開機了 21 天又 19:16 這的久的時間，目前有 3 為用戶登入，工作負載為 0, 0.01 及 0.05 。 那三個數據代表 1, 5, 15 分鐘內的平均工作負載。所謂的工作負載為『單一時間內，CPU 需要運作幾個工作』之意，並非 CPU 使用率。 如果 CPU 數量有 8 核心，那麼此數據低於 8 是可接受的 (每一個核心全心負責一個工作之意)。

Tasks: 184 total,   1 running, 183 sleeping,   0 stopped,   0 zombie
目前共有 184 個程序，其中 1 個在執行，183 個睡著了，沒有停止與殭屍程序。

%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
這裡才是 CPU 的使用率百分比，比較需要注意 id (idle) 與 wa (I/O wait)，id 越高代表系統越閒置， wa 越高代表程序卡在讀寫磁碟或網路上，此時系統效能會比較糟糕。

KiB Mem :  2048964 total,   172968 free,   517972 used,  1358024 buff/cache
KiB Swap:  2097148 total,  2096800 free,      348 used.  1283612 avail Mem
分別代表實體記憶體與記憶體置換 (swap) 的總量，與使用量。需要注意的是，上表中雖然 free 僅有 172968K，但是後續有 1358024 buff/cache (快取) 的量， 所謂的快取指的是 Linux 會將系統曾經取用的檔案暫存在記憶體，以加速未來存取該檔案的效能 (記憶體的速度比磁碟快了 10 倍以上)， 當記憶體不足時，系統就會將快取回收，以保持系統的可用性。因此全部可用的記憶體為 free + cache ！

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND   
top 程式執行的狀態列，每個項目的意義為：

PID ：每個 process 的識別碼 (PID)
USER：該 process 所屬的使用者；
PR ：Priority 的簡寫，程序的優先執行順序，越小越早被執行；
NI ：Nice 的簡寫，與 Priority 有關，也是越小越早被執行；
%CPU：CPU 的使用率；
%MEM：記憶體的使用率；
TIME+：CPU 使用時間的累加；
COMMAND：指令
在預設的情況下，top 所顯示的程序會以 CPU 的使用率來排序，這也是管理員最需要的一個觀察任務。許多時候系統發生資源不足或者是效能變差的時候， 最簡易的方法為使用 top 觀察最忙碌的幾隻程序，藉以處理程序的效能問題。此外，也能透過 top 觀察 I/O wait 的 CPU 使用率， 可以找到 I/O 最頻繁的幾隻程序，藉以了解到哪些程序在進行哪些行為，或者是系統效能的瓶頸，藉以作為未來升級硬體的依據。

例題：
透過各種方法，找到 PID 為 1 的那隻程序的指令名稱為何？
使用 student 身份登入系統後，(1)使用 su - 切換身份，再 (2)使用 su - student，再 (3) su - 切換成 root，此時再以 ps -l 觀察目前相關的程序情況
根據分析上述的程序相依性，你需要使用幾次 exit 才能回到原本的 student 帳號？
寫出至少兩種方法，找出名為 crond 的程序的 PID 號碼。
由於管理員僅需要知道 PID, PRI, NI 及指令名稱四個欄位，請使用 man ps 找到 example 的範例，透過 ps 搭配適當的選項來列出這四個欄位的程序輸出。
使用 man ps 找到 sort 排序的選項，然後以指令 (comm) 為排序的標準來排序輸出 PID, PRI, NI 與指令。
如何以 top 每兩秒鐘更新一次畫面。
進入 top 的觀察界面後，可以按下哪兩個按鍵，在 CPU 排序與記憶體使用量排序間切換？

5.2.3：程序的優先序 PRI 與 NI
系統運作時，記憶體內的程序量非常的大，但每個程序的重要性都不一樣。為了讓系統比較快速的執行重要的程序，因此設計上增加了 Priority (PRI) 這個優先序的設定。 基本上，PRI 越低代表系統會執行較多次該程序，也就是該程序會比較早被執行完畢 (因為同一週期會被執行較多次)。簡單的運作示意圖如下：

具有優先順序的程序佇列示意圖
圖5.2-4、具有優先順序的程序佇列示意圖
但是 PRI 是系統自行彈性規劃的，使用者並不能更改 PRI。為此，Linux 提供一個名為 Nice (NI) 的數值來讓使用者『影響』程序的 PRI。 基本上， PRI 與 NI 的關係如下：

PRI(new) = PRI(old) + NI

所以讀者可以知道 NI 越小會讓 PRI 變小，則程序的優先序會往前挪，相反的，NI 越大會造成 PRI 越大，就讓程序的優先序變落後了。 但是 NI 的使用是有限制的，基本限制如下：

nice 值可調整的範圍為 -20 ~ 19 ；
root 可隨意調整自己或他人程序的 Nice 值，且範圍為 -20 ~ 19 ；
一般使用者僅可調整自己程序的 Nice 值，且範圍僅為 0 ~ 19 (避免一般用戶搶佔系統資源)；
一般使用者僅可將 nice 值越調越高，例如本來 nice 為 5 ，則未來僅能調整到大於 5；
要影響 NI 主要透過 nice 與 renice 來處理，也能夠透過 top 來處理已經存在的程序的 NI。

一開始執行程式就立即給予一個特定的 nice 值：用 nice 指令；
調整某個已經存在的 PID 的 nice 值：用 renice 指令或 top 指令。
例題：請使用 root 的身份進行如下動作。
使用 ps 搭配適當的選項，輸出 PID, PRI, NI 與 COMMAND 等欄位
承上，找到 crond 這個程序的 PID 號碼
承上，透過 renice 指令，將 crond 的 NI 改成 -15 ，並重新觀察是否順利更改了？
使用 nice 值搭配 NI 成為 10 來執行 su - student 這個指令
使用 ps -l 查詢屬於 student 這次執行的程序中，每一隻程序的 NI 值，並討論 NI 有沒有繼承？
使用 top 搭配 -p PID (自行 man top 找到說明)，其中 PID 使用 student 的 bash 來處理。
承上，在 top 畫面中按下『 r 』，依據螢幕的顯示說明逐一輸入正確的資料，最後請確認 student 能否將 NI 更改為 0 以及 15 ？

5.2.4：bash 的工作管理
工作管理 (job control) 是用在 bash 環境下的，也就是說：『當用戶登入系統取得 bash shell 之後，在單一終端機介面下同時進行多個工作的行為管理 』。 舉例來說，用戶在登入 bash 後，可以一邊複製檔案、一邊進行資料搜尋、一邊進行編譯，還可以一邊進行 vim 程式撰寫之意。 不過要進行 job control 時，需要特別注意到幾個限制：

這些工作所觸發的程序必須來自於你 shell 的子程序(只管理自己的 bash)；
前景：你可以控制與下達指令的這個環境稱為前景的工作 (foreground)；
背景：可以自行運作的工作，你無法使用 [ctrl]+c 終止他，可使用 bg/fg 呼叫該工作；
背景中『執行』的程序不能等待 terminal/shell 的輸入(input)
常見的工作管理使用的符號與組合按鍵如下：

command & ：直接將 command 丟到背景中執行，若有輸出，最好使用資料流重導向輸出到其他檔案
[ctrl]+z ：將目前正在前景中的工作丟到背景中暫停
jobs [-l]：列出目前的工作資訊
fg %n ：將第 n 個在背景當中的工作移到前景來操作
bg %n ：將第 n 個在背景當中的工作變成執行中
例題：使用 student 的身份執行底下的任務
執行『 find / 』，然後快速的按下『 [ctrl]+z 』讓該指令丟到背景中
使用 jobs -l 觀察該背景的工作號碼與 PID 號碼
讓該工作在背景中執行，此時你能否中斷 (ctrl+c) 或暫停 (ctrl+z) 該工作？為什麼？
使用『 find / & 』指令，此時快速按下『 ctrl+z 』有沒有作用？為什麼？
若使用『 find / &> /tmp/findroot.txt & 』，然後快速的按下 jobs -l ，能否觀察到該工作是否在運作中？
輸入『 sleep 60s 』，讓螢幕停止 60 秒。在結束前按下『 ctrl+z 』，之後按下 jobs -l 觀察 sleep 這個工作是否運作中？
讓 sleep 工作在背景中開始執行
輸入 vim 之後，按下『 ctrl + z 』並查看 vim 的運作狀態
讓 vim 在背景中執行，觀察 vim 能否更改狀態成為執行？說明為什麼。
將 vim 挪到前景中，並將它正常的結束工作。
在背景運作的 sleep 運作結束後，螢幕上會出現什麼訊息？

5.3：特殊權限 SUID/SGID/SBIT 的功能
某些權限主要是針對『運作當下所需要的權限』來設計的，這些權限無法以傳統權限來歸類，且與操作者的所需要的特權權限 (root 身份或額外群組) 有關。 這就是 SUID, SGID 與 SBIT 的設計。

5.3.1：SUID/SGID/SBIT 的觀察與功能說明
一般用戶可以透過 passwd 來修改自己的密碼，只是需要輸入原始的密碼，且密碼的變動需要嚴格的規範。

例題：請用 student 身份處理底下的例題
先嘗試使用 passwd 修改自己的密碼，假設要改成123456
先使用『 openssl rand -base64 8 』這個指令來猜測一個較為嚴格的密碼
直接輸入『 passwd 』這個指令來修改 student 的密碼，更改密碼時，先輸入原本的密碼，再輸入兩次上一個指令提供的密碼
使用『 ls -l /etc/shadow 』查看一下該檔案是否有被更動到目前的日期與時間。
檢查一下 /etc/shadow 的權限，student 是否有權限可以更動該檔案？
最後請用 root 的身份將 student 的密碼改回來
SUID 的功能與觀察
如上例題，系統的密碼紀錄在 /etc/shadow 內，但是使用者並沒有權限可以更改，不過一般用戶確實有自己修改密碼的需求。 此時 Linux 使用一種稱為 Set UID (SUID) 的技術來處理這方面的疑問。系統設定一個 SUID 的權限旗標到 passwd 執行擋上， 當使用者執行 passwd 指令時，就能夠藉由 SUID 來切換執行權限。SUID 的基本功能為：

SUID 權限僅對二進位程式(binary program)有效；
執行者對於該程式需要具有 x 的可執行權限；
本權限僅在執行該程式的過程中有效 (run-time)；
執行者將具有該程式擁有者 (owner) 的權限。
觀察 /usr/bin/passwd 的權限資料，如下所示：

[student@localhost ~]$ ls -l /usr/bin/passwd
-rwsr-xr-x. 1 root root 27832  6月 10  2014 /usr/bin/passwd
讀者可發現使用者權限的 x 變成了 s ，此即 SUID 的權限旗標。由 SUID 的定義來看，passwd 設定了 SUID，且 passwd 的擁有者為 root 這個人， 因此只要任何人具有 x 的執行權，當用戶執行 passwd 時，就會自動透過 SUID 轉換身份成為 owner ，亦即變成了 root 的身份。 所以 student 執行 passwd 的過程中，身份會自動的變成 root。

例題：
以 student 的身份執行 passwd
將該指令丟進背景中暫停 (輸入組合按鍵後，可能需要再按一次 enter)
使用 pstree -pu 觀察 passwd 與前、後程序的擁有者變化。
將 passwd 拉到前景中，然後中斷 passwd 。
SGID 的功能與觀察
與 SUID 類似的，SGID 為將特殊的權限旗標設定在群組的 x 上。對檔案來說， SGID 的功能為：

SGID 對二進位程式有用；
程式執行者對於該程式來說，需具備 x 的權限；
執行者在執行的過程中將會獲得該程式群組的支援！
例題：使用 locate 查詢系統檔名
請使用 student 身份查詢名為 passwd 的檔案有哪些 (使用 locate passwd 即可)
locate 所取用的檔名資料庫放置於 /var/lib/mlocate 當中，請使用 ll -d 的方式觀察該目錄的權限
承上，請問 student 有沒有權限可以進入該目錄？
使用 which locate 查詢 locate 這個指令的完整檔名 (了解 which 的功能為何)
查詢 locate 的權限，是否具有 SGID 的權限旗標？locate 的擁有群組為何？為何 student 操作 locate 可以進入 /var/lib/mlocate 目錄？
除了二進位程式檔案外，SGID 亦可設定於目錄上，當一個目錄設定了 SGID 之後，會具有如下的功能：

使用者若對於此目錄具有 r 與 x 的權限時，該使用者能夠進入此目錄；
使用者在此目錄下的有效群組(effective group)將會變成該目錄的群組；
用途：若使用者在此目錄下具有 w 的權限(可以新建檔案)，則使用者所建立的新檔案，該新檔案的群組與此目錄的群組相同。
例題：請使用 root 的身份進行如下的動作
觀察 /run/log/journal 這個目錄本身的權限為何？尤其是群組的權限資料
使用 touch /tmp/fromroot ，觀察 /tmp/fromroot 的權限，尤其是群組的名稱為何？
使用 touch /run/log/journal/fromroot，觀察 /run/log/journal/fromroot 的權限，尤其是群組的名稱為何？
以人類社團的社辦來說，當你在童軍社的社辦公室撰寫出一份活動草案時，這份活動草案的著作者應該是屬於你的，但是草案的擁有群組應該是『童軍社』， 而不是『屬於你的原生家庭』吧？這就是 SGID 的主要功能。在前一堂課中，管理員曾經建立一個共享目錄 /srv/project1/， 當時的權限設定為 770 是有問題的，因為每個用戶在該目錄下產生的新檔案所屬群組並非共享群組。因此，共享目錄底下新建的資料應屬於共享群組才對， 所以應該加上 SGID 的權限旗標設定才對。

SBIT 的功能與觀察
前幾堂課談過 /tmp 是所有帳號均可寫入的一個暫存目錄，因此 /tmp 理論上應該是 777 的權限才行。但是如果是 777 的權限， 代表任何人所建立的任何資料，都可能被隨意的刪除，這就有問題。因此 /tmp 會加上一個 Sticky bit 的特殊權限旗標，該旗標的功能為：

當使用者對於此目錄具有 w, x 權限，亦即具有寫入的權限時；
當使用者在該目錄下建立檔案或目錄時，僅有自己與 root 才有權力刪除該檔案
例題：
觀察 /tmp 的權限，看其他人的權限當中的 x 變成什麼？
以 root 登入系統，並且進入 /tmp 當中；
將 /etc/hosts 複製成為 /tmp/myhosts ，並且更改 /tmp/myhosts 權限成為 777 ；
以 student 登入，並進入 /tmp；
student 能不能使用 vim 編輯這個檔案？為什麼？
student 能不能刪除這個檔案？為什麼？

5.3.2：SUID/SGID/SBIT 權限的設定
SUID/SGID/SBIT 的權限旗標是在 Linux 的傳統三個身份三個權限之外的，因此會有第四個權限分數產生。而這個權限分數的計算方式為：

4 為 SUID
2 為 SGID
1 為 SBIT
因此，觀察底下的 CentOS7 的檔案權限分數：

[student@localhost ~]$ ll -d /usr/bin/passwd /usr/bin/locate /tmp
drwxrwxrwt. 9 root root      280  7月  7 06:35 /tmp
-rwx--s--x. 1 root slocate 40496  6月 10  2014 /usr/bin/locate
-rwsr-xr-x. 1 root root    27832  6月 10  2014 /usr/bin/passwd
若有小寫 s 或 t 存在時，該欄位需要加入 x 的權限，因此 /tmp 的傳統權限為『 drwxrwxrwx (777) 』外加一個 SBIT，因此分數為『 1777 』。 而 /usr/bin/locate 傳統權限會成為『 -rwx--x--x (711) 』外加一個 SGID，因此分數會成為『 2711 』。 至於 /usr/bin/passwd 的傳統權限是『 -rwxr-xr-x (755) 』，外加一個 SUID，因此分數成為『 4755 』。

除了數字法之外，符號法的使用上，可以使用類似底下的方式分別給予 SUID/SGID/SBIT：

SUID: chmod u+s filename
SGID: chmod g+s filename
SBIT: chmod o+t filename
例題：
一般使用者執行 /usr/local/bin/mycat2 時，可以產生與 /usr/bin/cat 相同的結果。但是一般用戶在執行 mycat2 的時候，可以在運作的過程當中取得 root 的權限， 因此一般使用者執行 mycat2 /etc/shadow 會順利執行成功。
承襲前一堂課的實做成果，請到 /srv/ 目錄下，觀察 project1 這個目錄的權限，若要讓『所有在該目錄底下建立的新檔案，新檔案的所屬群組要跟 project1 相同， 亦即群組預設要成為 progroup 才行。

5.4：課後練習操作
前置動作：請使用 unit05 的硬碟進入作業環境，並請先以 root 身分執行 vbird_book_setup_ip 指令設定好你的學號與 IP 之後，再開始底下的作業練習。

請使用 root 的身份進行如下實做的任務。直接在系統上面操作，操作成功即可，上傳結果的程式會主動找到你的實做結果。

觀察系統上面相關的檔案資訊後，嘗試回答下列問題，並將答案寫入 /root/ans05.txt 當中：
系統上面有個名為 /opt/checking.txt 的檔案，student 能否讀, 寫該檔案？為甚麼？(說明是哪種權限的影響)
承上，student 能不能將這個檔案複製到 /tmp 去？為甚麼？(說明是哪種權限的影響)
student 能不能刪除 /opt/checking.txt 這個檔案？為甚麼？(說明是哪種權限的影響)
student 能不能用 ls 去查看 /opt/checkdir/ 這個目錄內的檔名資料？為甚麼？(說明是哪種權限的影響)
student 能不能讀取 /opt/checkdir/myfile.txt 檔案？為甚麼？(說明是哪種權限的影響)
student 能不能刪除他家目錄底下，一個名為 fromme.txt 的檔案？為什麼？(說明是哪種權限的影響)
基礎帳號管理，請建立如下的群組與帳號資料：
群組名稱為： mygroup, nogroup
帳號名稱為： myuser1, myuser2, myuser3 ，通通加入 mygroup，且密碼為 MyPassWord
帳號名稱為： nouser1, nouser2, nouser3 ，通通加入 nogroup，且密碼為 MyPassWord
管理群組共用資料的權限設計：
建立一個名為 /srv/myproject 的目錄，這個目錄可以讓 mygroup 群組內的使用者完整使用，且【新建的檔案擁有群組】為 mygroup 。不過其他人不能有任何權限
暫時切換成為 myuser1 的身分，並前往 /srv/myproject 目錄，嘗試建立一個名為 myuser1.data 的檔案，之後登出 myuser1。
雖然 nogroup 群組內的用戶對於 /srv/myproject 應該沒有任何權限，但當 nogroup 內的用戶執行 /usr/local/bin/myls 時，可以產生與 ls 相同的資訊，且暫時擁有 mygroup 群組的權限，因此可以查詢到 /srv/myproject 目錄內的檔名資訊。 也就是說，當你使用 nouser1 的身分執行【myls /srv/myproject】時，應該是能夠查閱到該目錄內的檔名資訊。
讓一般用戶執行 /usr/local/bin/myless 產生與 less 相同的結果。此外，只有 mygroup 的群組內用戶可以執行，其他人不能執行，同時 myuser1 等人執行 myless 時，執行過程中會暫時擁有 root 的權限。
建立一個名為 /srv/nogroup 的空白檔案，這個檔案可以讓 nouser1, nouser2, nouser3 讀、寫，但全部的人都不能執行。而 myuser1, myuser2, myuser3 只能讀不能寫入。
程序的觀察與簡易管理
使用程序觀察的指令，搭配 grep 的關鍵字查詢功能，將找到的 rsyslog 相關的程序的 PID, PRI, NI, COMMAND 等資訊轉存到 /root/process_syslog.txt 檔案中；
使用任何你知道的程序觀察指令，找到名為 sleep 的程序，找出他的 NI 值是多少？然後寫入 /root/process_sleep.txt 的檔案中
承上，請將該 NI 值改成 -10 。
以 myuser1 登入 tty3 終端機，然後執行『 sleep 5d 』這個指令，請注意，這個指令必須要在『背景以下運作』才行；
承上，在上 tty3 的 myuser1 持續同時運作 vim ~/.bashrc 這個指令在前景運作。保留此環境，然會回到你原本的 tty 中。
使用 root 執行『 sleep 4d 』這個指令，且這個指令的 NI 值必須要設定為 -5
使用 find 找出 /usr/bin 及 /usr/sbin 兩個目錄中，含有 SUID 或/及 SGID 的特殊檔案檔名， 並使用 ls -l 去列出找到的檔案的相關權限後，將螢幕資料轉存到 /root/findsuidsgid.txt 檔案中。
作業結果傳輸：請以 root 的身分執行 vbird_book_check_unit 指令上傳作業結果。 正常執行完畢的結果應會出現【XXXXXX;aa:bb:cc:dd:ee:ff;unitNN】字樣。若需要查閱自己上傳資料的時間， 請在作業系統上面使用： http://192.168.251.250 檢查相對應的課程檔案。

-----

#### Footer
Copyrights | EZMarkDown Studio &copy; 2021

-----

<span class="d-block mt-5"></span>