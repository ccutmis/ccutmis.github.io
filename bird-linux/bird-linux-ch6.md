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

[anchor](CH6-Linux-BASIC-File-System-Manage)
![banner](images/1.jpg)
### 鳥哥Linux基礎篇 - 第 6 堂課：基礎檔案系統管理

<span class="hr"></span>

第 6 堂課：基礎檔案系統管理
最近更新日期：2017/03/16
系統總有容量不足，或者是需要其他檔案系統掛載的時刻，畢竟管理員會經常從不同的來源來取得所需要軟體與資料。 因此，管理檔案系統就是管理員一個很重要的任務。Linux 檔案系統最早使用 Ext2 檔案系統家族(包括 EXT2/EXT3/EXT4 等等)， 但由於磁碟容量越來大，因此適合大容量的 XFS 檔案系統在 CentOS7 被設為預設檔案系統了。因此讀者應該要熟悉這些檔案系統的管理才行。

6.1：認識 Linux 檔案系統
6.1.1：磁碟檔名與磁碟分割
6.1.2：Linux 的 EXT2 檔案系統
6.1.3：目錄與檔名
6.1.4：ln 連結檔的應用
6.1.5：檔案系統的掛載
6.2：檔案系統管理
6.2.1：建立分割
6.2.2：建立檔案系統 (磁碟格式化)
6.2.3：檔案系統的掛載/卸載
6.2.4：開機自動掛載
6.3：開機過程檔案系統問題處理
6.3.1：檔案系統的卸載與移除
6.3.2：開機過程檔案系統出錯的救援
6.4：課後練習操作
6.1：認識 Linux 檔案系統
目前 CentOS 7 Linux 檔案系統主要支援 EXT2 家族 (目前新版為 EXT4) 以及 XFS 大型檔案系統兩種。其中 XFS 相當適合大容量磁碟， 格式化的效能非常快。但無論哪種檔案系統，都必須要符合 inode 與 block 等檔案系統使用的特性。

6.1.1：磁碟檔名與磁碟分割
磁碟內的圓形磁碟盤常見的物理特性如下：

磁區(Sector)為最小的物理儲存單位，目前主要有 512bytes 與 4K 兩種格式；
將磁區組成一個圓，那就是磁柱(Cylinder)(在此忽略磁軌)；
分割的最小單位可能是磁柱 (cylinder) 也可能是磁區 (sector)，這與分割工具有關
磁碟分割表主要有兩種格式，分別是 MBR 與 GPT 分割表。
MBR 分割表中，第一個磁區最重要，裡面有：
(1)主要開機區(Master boot record, MBR) 446 bytes 及
(2)分割表(partition table) 64 bytes。
GPT 分割表除了分割數量擴充較多之外，支援的磁碟容量也可以超過 2TB。
整顆磁碟必須要經過分割之後，Linux 作業系統才能夠讀取分割槽內的檔案系統。目前的 Linux 磁碟分割主要有兩種分割， 分別為早期的 MBR 與現今的 GPT。由於 MBR 會有 2TB 容量的限制，但目前的磁碟容量已經都超過 2TB 來到 8TB 以上的等級， 因此 MBR 的分割類型就不太適用了。

磁碟檔名主要為 /dev/sd[a-p] 這種實體磁碟的檔名，以及透過 virtio 模組加速的 /dev/vd[a-p] 的虛擬磁碟檔名。 由於虛擬機器的環境中，大部分磁碟的容量還是小於 2TB 的條件，因此傳統的 MBR 還是有其存在的需求的。

MBR 磁碟分割的限制
由於 MBR 的紀錄區塊僅有 64 bytes 用在分割表，因此預設分割表僅能紀錄四筆分割資訊。所謂的分割資訊即是紀錄開始與結束的磁區。 這四筆紀錄主要為『主要分割槽 (primary)』與『延伸分割槽 (extended)』。延伸分割不能被格式化應用， 需要再從延伸分割當中割出『邏輯分割 (logical)』之後，才能夠應用。以 P 代表主要、E 代表延伸、L 代表邏輯分割槽， 則相關性為：

主要分割與延伸分割最多可以有四筆(硬碟的限制)
延伸分割最多只能有一個(作業系統的限制)
邏輯分割是由延伸分割持續切割出來的分割槽；
能夠被格式化後，作為資料存取的分割槽為主要分割與邏輯分割。延伸分割無法格式化；
邏輯分割的數量依作業系統而不同，在Linux系統中SATA硬碟已經可以突破63個以上的分割限制；
GPT 磁碟分割
常見的磁碟磁區有 512bytes 與 4K 容量，為了相容於所有的磁碟，因此在磁區的定義上面， 大多會使用所謂的邏輯區塊位址(Logical Block Address, LBA)來處理。GPT 將磁碟所有區塊以此 LBA(預設為 512bytes) 來規劃，而第一個 LBA 稱為 LBA0 (從 0 開始編號)。

與 MBR 僅使用第一個 512bytes 區塊來紀錄不同， GPT 使用了 34 個 LBA 區塊來紀錄分割資訊！ 同時與過去 MBR 僅有一的區塊的情況不同， GPT 除了前面 34 個 LBA 之外，整個磁碟的最後 33 個 LBA 也拿來作為另一個備份！

LBA2 ~ LBA33 為實際紀錄分割表的所在，每個 LBA 紀錄 4 筆資料，所以共可紀錄 32*4=128 筆以上的分割資訊。 因為每個 LBA 為 512bytes，因此每筆紀錄可佔用 512/4=128 bytes 的紀錄，因為每筆紀錄主要紀錄開始與結束兩個磁區的位置， 因此紀錄的磁區位置最多可達 64 位元，若每個磁區容量為 512bytes ，則單一分割槽的最大容量就可以限制到 8ZB， 其中 1ZB 為 2^30 TB。

此外，每筆 GPT 的分割紀錄，都是屬於 primary 的分割紀錄，可以直接拿來進行格式化應用的。

例題：
超過幾個 TB 以上的磁碟，通常預設會使用 GPT 的分割表？
某一磁碟的分割為使用 MBR 分割表，該系統當中『共有 5 個可以進行格式化』的分割槽，假設該磁碟含有 2 個主分割 (primary)， 請問該磁碟的分割槽的磁碟檔名應該是如何？ (假設為實體磁碟的檔名，且該系統僅有一顆磁碟時)
某一個磁碟預設使用了 MBR 的分割表，目前僅有 2 個主分割，還留下 1TB 的容量。若管理員還有 4 個需要使用的分割槽， 每個分割槽需要大約 100GB ，你認為應該如何進行分割較佳？

6.1.2：Linux 的 EXT2 檔案系統
新的作業系統在規劃檔案系統時，一般檔案會有屬性(如權限、時間、身份資料紀錄等)以及實際資料的紀錄， 同時整個檔案系統會紀錄全部的資訊，因此通常檔案系統會有如下幾個部份：

superblock：記錄此 filesystem 的整體資訊，包括inode/block的總量、使用量、剩餘量， 以及檔案系統的格式與相關資訊等；
inode：記錄檔案的屬性，一個檔案佔用一個inode，同時記錄此檔案的資料所在的 block 號碼；
block：實際記錄檔案的內容，若檔案太大時，會佔用多個 block 。
以 EXT2 檔案系統為例，為了簡化管理，整個檔案系統會將全部的內容分出數個區塊群組 (block group)， 每個區塊群組會有上述的 superblock/inode/block 的紀錄，可以下圖示意：

EXT2 檔案系統示意圖
圖6.1.1、EXT2 檔案系統示意圖
Superblock (超級區塊)
superblock 為整個檔案系統的總結資訊處，要讀取檔案系統一定要從 superblock 讀起。superblock 主要紀錄資料為：

block 與 inode 的總量；
未使用與已使用的 inode / block 數量；
block 與 inode 的大小 (block 為 1, 2, 4K，inode 為 128bytes 或 256bytes)；
filesystem 的掛載時間、最近一次寫入資料的時間、最近一次檢驗磁碟 (fsck) 的時間等檔案系統的相關資訊；
一個 valid bit 數值，若此檔案系統已被掛載，則 valid bit 為 0 ，若未被掛載，則 valid bit 為 1
inode table (inode 表格)
每一個 inode 都有號碼，而 inode 的內容在記錄檔案的屬性以及該檔案實際資料是放置在哪幾號 block 內。 inode 記錄的檔案資料至少有底下這些：

該檔案的存取模式(read/write/excute)；
該檔案的擁有者與群組(owner/group)；
該檔案的容量；
該檔案建立或狀態改變的時間(ctime)；
最近一次的讀取時間(atime)；
最近修改的時間(mtime)；
定義檔案特性的旗標(flag)，如 SetUID...；
該檔案真正內容的指向 (pointer)；
由於每個檔案固定會佔用一個 inode，而目前檔案所記載的屬性資料越來約多，因此 inode 有底下幾個特色：

每個 inode 大小均固定為 128 bytes (新的 ext4 與 xfs 可設定到 256 bytes)；
每個檔案都僅會佔用一個 inode 而已；
承上，因此檔案系統能夠建立的檔案數量與 inode 的數量有關；
系統讀取檔案時需要先找到 inode，並分析 inode 所記錄的權限與使用者是否符合，若符合才能夠開始實際讀取 block 的內容。
data block (資料區塊)
檔案實際的資料存放在 data block 上面，每個 block 也都會有號碼，提供給檔案來儲存實際資料，也讓 inode 可以紀錄資料放在哪個 block 號碼內。

原則上，block 的大小與數量在格式化完就不能夠再改變了(除非重新格式化)；
每個 block 內最多只能夠放置一個檔案的資料；
承上，如果檔案大於 block 的大小，則一個檔案會佔用多個 block 數量；
承上，若檔案小於 block ，則該 block 的剩餘容量就不能夠再被使用了(磁碟空間會浪費)。
一般來說，檔案系統內的一個檔案被讀取時，流程是這樣的：

讀到檔案的 inode 號碼
由 inode 內的權限設定判定使用者能否存取此檔案
若能讀取則開始讀取 inode 內所紀錄的資料放置於哪些 block 號碼內
讀出 block 號碼內的資料，組合起來成為一個檔案的實際內容。
至於新建檔案的流程則是這樣的：

有寫入檔案的需求時，先到 metadata 區找到沒有使用中的 inode 號碼
到該 inode 號碼內，將所需要的權限與屬性相關資料寫入，然後在 metadata 區規範該 inode 為使用中，且更新 superblock 資訊
到 metadata 區找到沒有使用中的 block 號碼，將所需要的實際資料寫入 block 當中，若資料量太大，則繼續到 metadata 當中找到更多的未使用中的 block 號碼，持續寫入，直到寫完資料為止。
同步更新 inode 的紀錄與 superblock 的內容。
至於刪除檔案的流程則是這樣的：

將該檔案的 inode 號碼與找到所屬相關的 block 號碼內容抹除
將 metadata 區域的相對應的 inode 與 block 號碼規範為未使用。
同步更新 superblock 資料。
例題：
Linux 的 EXT2 檔案系統家族中，格式化之後，除了 metadata 區塊之外，還有哪三個很重要的區塊？
檔案的屬性、權限等資料主要放置於檔案系統的哪個區塊內？
實際的檔案內容 (程式碼或者是實際資料) 放置在哪個區塊？
每個檔案都會使用到幾個 inode 與 block ？
Linux 的 EXT2 檔案系統家族中，以 CentOS 7 為例，inode 與 block 的容量大致為多少 byte？

6.1.3：目錄與檔名
當使用者在 Linux 下的檔案系統建立一個目錄時，檔案系統會分配一個 inode 與至少一塊 block 給該目錄。其中，inode 記錄該目錄的相關權限與屬性，並可記錄分配到的那塊 block 號碼； 而 block 則是記錄在這個目錄下的檔名與該檔名佔用的 inode 號碼資料。也就是說目錄所佔用的 block 內容在記錄如下的資訊：

記載於目錄所屬的 block 內的檔名與 inode 號碼對應示意圖
圖6.1.2、記載於目錄所屬的 block 內的檔名與 inode 號碼對應示意圖
前一小節提到讀取檔案資料時，最重要的就是讀到檔案的 inode 號碼。然而讀者實際操作系統時，並不會理會 inode 號碼， 而是透過『檔名』來讀寫資料的。因此，目錄的重要性就是記載檔名與該檔名對應的 inode 號碼。

例題：
使用 ls -li /etc/hosts* ，觀察出現在最前面的數值，該數值即為 inode 號碼。
使用 student 的身份，建立 /tmp/inodecheck/ 目錄，然後觀察 /tmp/inodecheck/, /tmp/inodecheck/. 這兩個檔名的 inode 號碼
承上，使用 ll -d 觀察 /tmp/inodecheck 的第二個欄位，亦即連結欄位的數值為多少？嘗試說明為什麼？
建立 /tmp/inodecheck/check2/ 目錄，同時觀察 /tmp/inodecheck/ , /tmp/inodecheck/. , /tmp/inodecheck/check2/.. 這三個檔名的 inode 號碼， 然後觀察第二個欄位的數值變成什麼？

6.1.4：ln 連結檔的應用
從前一小節的練習當中讀者可以發現到目錄的預設連結數 (使用 ls -l 觀察檔名的第二個欄位) 為 2， 這是因為每個目錄底下都有 . 這個檔名，而這個檔名代表目錄本身，因此目錄本身有兩個檔名連結到同一個 inode 號碼上， 故連結數至少為 2 。又同時每個目錄內都有 .. 這個檔名來代表父目錄，因此每增加一個子目錄，父目錄的連結數也會加 1 。

由於連結數增加後，若檔名刪除時，其實 inode 號碼並沒有被刪除，因此這個『實體連結』的功能會保護好原本的檔案資料。 使用者可以透過 ln 這個指令來達成實體連結與符號連結 (類似捷徑) 的功能。

例題：
前往 /dev/shm 建立名為 check2 的目錄，並更改工作目錄到 /dev/shm/check2 當中
將 /etc/hosts 複製到本目錄下，同時觀察檔名連結數
使用『 ln hosts hosts.real 』建立 hosts.real 實體連結檔，同時觀察這兩個檔案的 inode 號碼、屬性權限等，是否完全相同？為什麼？
使用『 ln -s hosts hosts.symbo 』建立 hosts.symbo 符號連結，同時觀察這兩個檔案的 inode 號碼、屬性權限等，是否相同？
使用 cat hosts; cat hosts.real; cat hosts.symbo ，查閱檔案內容是否相同？
請刪除 hosts，然後觀察 hosts.real, hosts.symbo 的 inode 號碼、連結數檔案屬性等資料，發現什麼情況？
使用 cat hosts.real; cat hosts.symbo 發生什麼狀況？為什麼？
在 /dev/shm/check2 底下執行『 ln /etc/hosts . 』會發生什麼情況？分析原因為何？

6.1.5：檔案系統的掛載
就像隨身碟放入 windows 作業系統後，需要取得一個 H:\> 或者是其他的磁碟名稱後才能夠被讀取一樣， Linux 底下的目錄樹系統中，檔案系統裝置要能夠被讀取，就得要與目錄樹的某個目錄連結在一起，亦即進入該目錄即可看到該裝置的內容之意。 該目錄就被稱為掛載點。

觀察掛載點的方式最簡單為使用 df (display filesystem) 這個指令來觀察，而讀者也可以透過觀察 inode 的號碼來了解到掛載點的 inode 號碼。

例題：
檔案系統要透過『掛載 (mount) 』之後才能夠讓作業系統存取。那麼與檔案系統掛載的掛載點是一個目錄還是檔案？
使用 df -T 指令觀察目前的系統中，屬於 xfs 檔案系統的掛載點有哪幾個？
使用 ls -lid 觀察 /, /boot, /home, /etc, /root, /proc, /sys 等目錄的 inode 號碼
為什麼 /, /boot, /home 的 inode 號碼會一樣？

6.2：檔案系統管理
一般來說，建立檔案系統需要的動作包括：分割、格式化與掛載三個步驟。而分割又有 MBR 與 GPT 兩種方式，實做時需要特別留意。

6.2.1：建立分割
建立分割之前，需要先判斷：(1)目前系統內的磁碟檔名與(2)磁碟目前的分割格式。這兩個工作可以使用底下的指令完成：

例題：使用 root 身份完成如下的練習
先用 lsblk 簡單的列出裝置檔名
使用 man lsblk 找出來，(1)使用純文字 (ASCII) 顯示的選項與(2) 列出完整 (full) 的裝置檔名的選項
使用『 parted <完整裝置檔名> print 』指令，找出分割表的類型 (MBR/GPT)。
如果是 GPT 的分割表，請使用 gdisk 指令來分割，若為 msdos (MBR) 分割表，則需要使用 fdisk 來分割。當然， 讀者也能夠直接參考指令型的 parted 來進行分割，只是指令比較麻煩一些些，並且沒有預設值而已。由剛剛上面的練習可以發現到訓練機為 GPT 分割表， 因此底下將以 gdisk 來進行分割的行為。首先讀者先了解一下 gdisk 的操作界面以及線上查詢的方式：

[root@study ~]# gdisk /dev/vda
GPT fdisk (gdisk) version 0.8.6

Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present

Found valid GPT with protective MBR; using GPT.  <==找到了 GPT 的分割表！

Command (? for help):     <==這裡可以讓你輸入指令動作，可以按問號 (?) 來查看可用指令
Command (? for help): ?
b       back up GPT data to a file
c       change a partition's name
d       delete a partition           # 刪除一個分割
i       show detailed information on a partition
l       list known partition types
n       add a new partition          # 增加一個分割
o       create a new empty GUID partition table (GPT)
p       print the partition table    # 印出分割表 (常用)
q       quit without saving changes  # 不儲存分割就直接離開 gdisk
r       recovery and transformation options (experts only)
s       sort partitions
t       change a partition's type code
v       verify disk
w       write table to disk and exit # 儲存分割操作後離開 gdisk
x       extra functionality (experts only)
?       print this menu
Command (? for help):  
之後開始列出目前這個 /dev/vda 的整體磁碟資訊與分割表資訊：

Command (? for help): p  <== 這裡可以輸出目前磁碟的狀態
Disk /dev/vda: 83886080 sectors, 40.0 GiB                     # 磁碟檔名/磁區數與總容量
Logical sector size: 512 bytes                                # 單一磁區大小為 512 bytes 
Disk identifier (GUID): A4C3C813-62AF-4BFE-BAC9-112EBD87A483  # 磁碟的 GPT 識別碼
Partition table holds up to 128 entries
First usable sector is 34, last usable sector is 83886046
Partitions will be aligned on 2048-sector boundaries
Total free space is 18862013 sectors (9.0 GiB)

Number  Start (sector)    End (sector)  Size       Code  Name # 底下為完整的分割資訊了！
   1            2048            6143   2.0 MiB     EF02       # 第一個分割槽資料
   2            6144         2103295   1024.0 MiB  0700
   3         2103296        65026047   30.0 GiB    8E00
# 分割編號 開始磁區號碼  結束磁區號碼  容量大小
Command (? for help): q
# 想要不儲存離開嗎？按下 q 就對了！不要隨便按 w 啊！
接下來請管理員直接建立一個 1GB 的分割槽。

例題：請使用 root 的身份完成底下的任務
使用 gdisk /dev/vda 進入 gdisk 的界面
按下 p 取得目前的分割表，並且觀察『目前是否還有其他剩餘的容量可使用』
按下 n 進行新增的動作：
在 Partition number 的地方直接按下 [enter] 使用預設值"4"；
在 First sector 的地方也可以直接按下 [enter] 使用預設值即可；
在 Last sector 的地方就得要使用類似『 +1G 』的方式來提供 1G 的容量；
在 Hex code or GUID) 的地方，由於是 Linux 的檔案系統，可以保留 8300 的數據，因此直接按下 [enter] 即可
按下 p 來查閱一下是否取得正確的容量
上述動作觀察後，若沒有問題，按下『 w 』來儲存後離開
系統會詢問『 Do you want to proceed? (Y/N): 』按下 y 來確認即可。
觀察按下 y 之後出現什麼訊息？仔細分析該訊息。
使用 lsblk 是否有查閱到剛剛建立的分割槽檔名？
使用『 partprobe 』之後，再次『 lsblk 』，此時是否出現了新的分割槽檔名？
由於 /dev/vda 磁碟正在使用中，因此核心預設不會重新去探索分割表的變動，讀者需要使用 partprobe 強制核心更新目前使用中的磁碟的分割表， 這樣才能夠找到正確的裝置檔名了。若需要列出核心偵測到的完整分割表，也能使用『 cat /proc/partitions 』來觀察。

例題：使用如上個例題的流程，再次建立如下兩個裝置：
大約 1.5G (1500MB) 的 vfat 分割槽 (GUID 應該是 0700，但請自己找出來)
大約 1G 的 swap 分割槽，同樣的請自行找出 filesystem ID
請注意，分割完畢並且在 gdisk 界面按下 w 儲存後，務必使用 lsblk 觀察是否有出現剛剛建置的分割槽裝置檔名，若無該裝置檔名，則應該使用 partprobe 或者是 reboot 強制核心重新抓取。

6.2.2：建立檔案系統 (磁碟格式化)
檔案系統的建立使用 mkfs 即可處理。另外，記憶體置換應該要使用 mkswap 才對。目前的作業系統大多已經針對檔案系統建置時做好最佳化設置， 因此除非讀者有特殊需求，或者是讀者知道自己高階磁碟陣列的相關參數，否則使用預設值應該就能夠取得不錯的檔案系統效能。

例題：
使用『 mkfs.xfs /dev/vda4 』建立好 XFS 檔案系統
使用『 mkfs.vfat /dev/vda5 』建立好 FAT 檔案系統
使用『 mkswap /dev/vda6 』建立好 swap 記憶體置換空間
使用『 blkid 』查詢到每個裝置的相關檔案系統與 UUID 資訊

6.2.3：檔案系統的掛載/卸載
檔案系統要掛載時，請先注意到底下的要求：

單一檔案系統不應該被重複掛載在不同的掛載點(目錄)中；
單一目錄不應該重複掛載多個檔案系統；
要作為掛載點的目錄，理論上應該都是空目錄才是。
常見的掛載方式如下：

[root@localhost ~]# mount -a
[root@localhost ~]# mount [-l]
[root@localhost ~]# mount [-t 檔案系統] LABEL=''  掛載點
[root@localhost ~]# mount [-t 檔案系統] UUID=''   掛載點  # 建議用這種方式
[root@localhost ~]# mount [-t 檔案系統] 裝置檔名  掛載點
選項與參數：
-a  ：依照設定檔 /etc/fstab 的資料將所有未掛載的磁碟都掛載上來
-l  ：單純的輸入 mount 會顯示目前掛載的資訊。加上 -l 可增列 Label 名稱！
-t  ：可以加上檔案系統種類來指定欲掛載的類型。常見的 Linux 支援類型有：xfs, ext3, ext4,
      reiserfs, vfat, iso9660(光碟格式), nfs, cifs, smbfs (後三種為網路檔案系統類型)
-n  ：在預設的情況下，系統會將實際掛載的情況即時寫入 /etc/mtab 中，以利其他程式的運作。
      但在某些情況下(例如單人維護模式)為了避免問題會刻意不寫入。此時就得要使用 -n 選項。
-o  ：後面可以接一些掛載時額外加上的參數！比方說帳號、密碼、讀寫權限等：
      async, sync:   此檔案系統是否使用同步寫入 (sync) 或非同步 (async) 的記憶體機制
      atime,noatime: 是否修訂檔案的讀取時間(atime)。為了效能，某些時刻可使用 noatime
      ro, rw:        掛載檔案系統成為唯讀(ro) 或可讀寫(rw)
      auto, noauto:  允許此 filesystem 被以 mount -a 自動掛載(auto)
      dev, nodev:    是否允許此 filesystem 上，可建立裝置檔案？ dev 為可允許
      suid, nosuid:  是否允許此 filesystem 含有 suid/sgid 的檔案格式？
      exec, noexec:  是否允許此 filesystem 上擁有可執行 binary 檔案？
      user, nouser:  是否允許此 filesystem 讓任何使用者執行 mount ？一般來說，
                     mount 僅有 root 可以進行，但下達 user 參數，則可讓
                     一般 user 也能夠對此 partition 進行 mount 。
      defaults:      預設值為：rw, suid, dev, exec, auto, nouser, and async
      remount:       重新掛載，這在系統出錯，或重新更新參數時，很有用！
請將 /dev/vda4, /dev/vda5 分別掛載到 /srv/linux, /srv/win 目錄內，同時觀察掛載的情況。

[root@localhost ~]# mkdir /srv/linux /srv/win
[root@localhost ~]# mount /dev/vda4 /srv/linux
[root@localhost ~]# mount /dev/vda5 /srv/win
[root@localhost ~]# df -T /srv/linux /srv/win
檔案系統                類型      1K-區段    已用    可用 已用% 掛載點
/dev/vda4               xfs       1038336   32928 1005408    4% /srv/linux
/dev/vda5               vfat      1532988       4 1532984    1% /srv/win
請使用 swapon 的方式來啟動 /dev/vda6 這個記憶體置換空間。

[root@localhost ~]# swapon /dev/vda6
[root@localhost ~]# swapon -s
Filename                                Type            Size    Used    Priority
/dev/dm-1                               partition       2097148 3752    -1
/dev/vda6                               partition       1048572 0       -2
例題：
請使用 umount 以及 swapoff 的方式，來將 /dev/vda4, /dev/vda5, /dev/vda6 卸載，並自行觀察是否卸載成功？

6.2.4：開機自動掛載
開機自動掛載的參數設定檔寫入在 /etc/fstab 當中，不過在編輯這個檔案之前，管理員應該先知道系統掛載的限制：

根目錄 / 是必須掛載的﹐而且一定要先於其它 mount point 被掛載進來。
其它 mount point 必須為已建立的目錄﹐可任意指定﹐但一定要遵守必須的系統目錄架構原則 (FHS)
所有 mount point 在同一時間之內﹐只能掛載一次。
所有 partition 在同一時間之內﹐只能掛載一次。
如若進行卸載﹐您必須先將工作目錄移到 mount point(及其子目錄) 之外。
訓練機的 /etc/fstab 這個檔案的內容如下：

[root@localhost ~]# cat /etc/fstab
/dev/mapper/centos-root                   /     xfs   defaults    0   0
UUID=a026bf1c-3028-4962-88e3-cd92c6a2a877 /boot xfs   defaults    0   0
/dev/mapper/centos-home                   /home xfs   defaults    0   0
/dev/mapper/centos-swap                   swap  swap  defaults    0   0
這個檔案主要有六個欄位，每個欄位的意義如下：

[裝置/UUID等]  [掛載點]  [檔案系統]  [檔案系統參數]  [dump]  [fsck]
第一欄：磁碟裝置檔名/UUID/LABEL name：
這個欄位可以填寫的資料主要有三個項目：

檔案系統或磁碟的裝置檔名，如 /dev/vda2 等
檔案系統的 UUID 名稱，如 UUID=xxx
檔案系統的 LABEL 名稱，例如 LABEL=xxx
管理員可以依據自己的喜好來填寫適當的裝置名稱，不過如果是實體分割槽的檔案系統，這裡建議使用 Linux 裝置內獨一無二的裝置代號， 亦即是 UUID 這個資料來替代裝置檔名較佳。建議使用 blkid 找到 UUID 之後，透過 UUID="XXX" 的方式來設定。

第二欄：掛載點 (mount point)：：
第三欄：磁碟分割槽的檔案系統：
在手動掛載時可以讓系統自動測試掛載，但在這個檔案當中我們必須要手動寫入檔案系統才行！ 包括 xfs, ext4, vfat, reiserfs, nfs 等等。

第四欄：檔案系統參數：
檔案系統參數有底下幾個常見的設定值，若無需要，先暫時不要更動預設的 defaults 設定值。

參數	內容意義
async/sync
非同步/同步	設定磁碟是否以非同步方式運作！預設為 async(效能較佳)
auto/noauto
自動/非自動	當下達 mount -a 時，此檔案系統是否會被主動測試掛載。預設為 auto。
rw/ro
可讀寫/唯讀	讓該分割槽以可讀寫或者是唯讀的型態掛載上來，如果你想要分享的資料是不給使用者隨意變更的， 這裡也能夠設定為唯讀。則不論在此檔案系統的檔案是否設定 w 權限，都無法寫入喔！
exec/noexec
可執行/不可執行	限制在此檔案系統內是否可以進行『執行』的工作？如果是純粹用來儲存資料的目錄， 那麼可以設定為 noexec 會比較安全。不過，這個參數也不能隨便使用，因為你不知道該目錄下是否預設會有執行檔。
舉例來說，如果你將 noexec 設定在 /var ，當某些軟體將一些執行檔放置於 /var 下時，那就會產生很大的問題喔！ 因此，建議這個 noexec 最多僅設定於你自訂或分享的一般資料目錄。
user/nouser
允許/不允許使用者掛載	是否允許使用者使用 mount 指令來掛載呢？一般而言，我們當然不希望一般身份的 user 能使用 mount 囉，因為太不安全了，因此這裡應該要設定為 nouser 囉！
suid/nosuid
具有/不具有 suid 權限	該檔案系統是否允許 SUID 的存在？如果不是執行檔放置目錄，也可以設定為 nosuid 來取消這個功能！
defaults	同時具有 rw, suid, dev, exec, auto, nouser, async 等參數。 基本上，預設情況使用 defaults 設定即可！
第五欄：能否被 dump 備份指令作用：
dump 僅支援 EXT 家族，若使用 xfs 檔案系統，則不用考慮 dump 項目。因此直接輸入 0 即可。

第六欄：是否以 fsck 檢驗磁區：
早期開機的流程中，會有一段時間去檢驗本機的檔案系統，看看檔案系統是否完整 (clean)。 不過這個方式使用的主要是透過 fsck 去做的，我們現在用的 xfs 檔案系統就沒有辦法適用，因為 xfs 會自己進行檢驗，不需要額外進行這個動作！所以直接填 0 就好了。

好了，那麼讓我們來處理一下我們的新建的檔案系統，看看能不能開機就掛載呢？

例題：讓 /dev/vda4, /dev/vda5 及 /dev/vda6 每次開機都能直接掛載或啟用，掛載點分別在 /srv/linux, /srv/win 目錄內。
透過 blkid 找到 /dev/vda4, /dev/vda5, /dev/vda6 這三個裝置的 UUID 資訊
使用 vim 在 /etc/fstab 最底下新增三行資料，如下所示：
[root@localhost ~]# vim /etc/fstab
UUID="2a409620-c888-41ca-89fa-2737cca74f19"  /srv/linux xfs  defaults 0 0
UUID="4AF7-0017"                             /srv/win   vfat defaults 0 0
UUID="de7e7a05-7b54-40c3-b663-142e4d545265"  swap       swap defaults 0 0
開始測試掛載以及 swap 置換有沒有成功的處理好。請注意，測試前請務必確認這三個裝置已經卸載且沒有使用中。
[root@locahost ~]# mount -a
[root@locahost ~]# swapon -a
[root@locahost ~]# df -T /dev/vda4 /dev/vda5
[root@locahost ~]# swapon -s

6.3：開機過程檔案系統問題處理
管理員可能因為某些原因需要將檔案系統回收利用，例如抽換舊硬碟來使用等等，因此讀者仍須學會如何卸載磁碟。 此外，或許因為設定的問題可能導致開機時因為檔案系統的問題而導致無法順利完成開機的流程，此時就需要額外的修復作業。

6.3.1：檔案系統的卸載與移除
若需要將檔案系統卸載並回收 (舊的資料需要完整刪除)，一般建議的流程如下：

判斷檔案系統是否使用中，若使用中則須卸載
查詢是否有寫入自動掛載設定檔，若有則需要將設定內容移除
將檔案系統的 superblock 內容刪除
例題：依據上述的流程，請將練習機的磁碟恢復為原本的狀態 (僅有 /dev/vda1, /dev/vda2, /dev/vda3)
為了測試系統有無問題，請先進行 reboot 的動作
使用 df -T 以及 swapon -s 查詢是否有找到 /dev/vda{4,5,6}，若存在，請分別以 umount 及 swapoff 予以卸載或關閉 swap 的使用。
查詢 /etc/fstab ，若存在上述的資料，請註解或刪除該行
使用 mount -a, swapon -a 測試 /etc/fstab 的內容，然後再以 df -T 及 swapon -s 檢查是否已經順利移除
使用『 dd if=/dev/zero of=/dev/vda4 bs=1M count=10 』的指令，將 superblock 的內容 (最前面的 10MB 處) 清空
使用 gdisk /dev/vda 搭配 d 的指令，將 4, 5, 6 號刪除
使用 partprobe 更新核心分割表資訊，然後使用 lsblk 確認已經正確刪除了本堂課所建立的分割槽。

6.3.2：開機過程檔案系統出錯的救援
管理員如果修改過 /etc/fstab 卻忘記使用 mount -a 測試，則當設定錯誤，非常有可能會無法順利開機。如果是根目錄設定出錯，問題會比較嚴重， 如果是一般正規目錄設定錯誤，則依據該目錄的重要性，可能會進入單人維護模式或者是依舊可以順利開機。底下的練習中，讀者將實驗讓 /home 設定錯誤， 以嘗試進入單人維護模式救援檔案系統。

例題：
使用 vim 編輯 /etc/fstab，將 /home 的所在行從原本的設定修改成為錯誤的設定，如下所示：
[root@localhost ~]# vim /etc/fstab
# 先找到這一行：
/dev/mapper/centos-home  /home xfs  defaults   0 0

# 將上面的資料改成如下的模樣
/dev/mapper/centos-home1  /home xfs  defaults   0 0
上述資料修改完畢儲存離開後，重新開機系統。由於檔案系統出錯 (/home 為相當重要的正規目錄)，因此系統經過一段時間的探索後，會進入到單人維護模式的環境， 該環境顯示如下所示：
檔案系統出錯進入救援模式的情況
在游標上輸入 root 的密碼，就可以進入終端機模式。不過此時可能從螢幕上找不到問題。請依據上圖中顯示的 journalctl -xb 這個關鍵字， 的提示，直接輸入『 journalctl 』來查詢開機流程的問題。進入 journalctl 畫面後，先按大寫『 G 』，再以『 PageUp 』按鈕向前翻頁數次， 找到紅色字體請仔細觀看，應該會發現如下畫面：
檔案系統出錯進入救援模式的情況
由上述的圖示可以發現就是 /home 的設定有問題，因此管理員可以： (1)進入 /etc/fstab 暫時註解 /home 所在行或者是 (2)自行找到正確的方案來解決。 因為本案例可以查詢到裝置設定錯誤，因此請修改正確的裝置名稱，然後 reboot 即可恢復正常開機流程。

6.4：課後練習操作
前置動作：請使用 unit06 的硬碟進入作業環境，並請先以 root 身分執行 vbird_book_setup_ip 指令設定好你的學號與 IP 之後，再開始底下的作業練習。

請使用 root 的身份進行如下實做的任務。直接在系統上面操作，操作成功即可，上傳結果的程式會主動找到你的實做結果。

檔案系統救援：管理員在上次處理檔案系統時，編輯 /etc/fstab 時，手殘將 /home 那個掛載點的掛載參數寫錯了，導致這次重新開機會失敗。 請使用 man mount 之類的方式查詢這次失敗的可能參數後，訂正 /etc/fstab，讓系統可以順利正常的開機。
關於磁碟與磁碟分割的問題，請在 /root/ans06.txt 檔案中，完成底下的問題回應：
針對傳統硬碟 (非 SSD) 來說，(1)磁碟分割常見的最小單位有哪些？(2)每個磁區, sector 的容量有多大？
一般來說，在 CentOS 7 底下，第一顆實體磁碟與虛擬磁碟 (使用 virtio 模組) 的檔名分別為何？
Linux 上 (A)常見的磁碟分割表有那兩種？(B)若安裝 linux 的時候，磁碟容量為 1TB 時，預設的分割表為那一個？
針對 MBR 分割表格式 (或稱為 MSDOS 分割模式) 來說，第一個磁區(sector) 含有那兩個重要的資訊？每個資訊的容量各佔多大？
承上，MBR 分割表格式中，主要有那三種類型的分割？那兩種分割才能夠被格式化利用？
承上，MBR 分割表中，主分割與延伸分割的『數量』有什麼限制？
可以安裝開機管理程式的位置，基本上有那兩個地方？
在 CentOS 7 上面，根據兩種不同的分割表，對應的分割指令是那兩個？
關於檔案系統的問題，請在 /root/ans06.txt 檔案內持續新增問題回應：
一般 Linux 傳統的 EXT 檔案系統家族，當你在格式化的時候，會有哪三個重要的資訊被切出來？
CentOS 7 在格式化檔案系統時，預設的 inode 與 block 單一一個容量約為多少？
建立一個檔案時，檔案的 (A)屬性與權限 (B)實際資料內容 (C)檔名 分別紀錄在哪些地方？
關於連結檔案的建置行為：(問答題請寫入 /root/links.txt )
在 /srv/examlink 檔案，請找出(1)該檔案的 inode 號碼為幾號？(2)這個 inode 共有幾個檔名在使用？
我知道 /srv/examlink 的連結檔放置在 /etc 底下，請使用 man find 找關鍵字 inode ，查到可以使用的選項與參數後， 實際找出 /srv/examlink 的實體連結檔，並將檔名寫下來。
建立實體連結，原始檔案為 /etc/services 而新的檔案檔名為 /srv/myservice
建立符號連結，原始檔案為 /etc/vimrc 而新的檔案檔名為 /srv/myvimrc
關於檔案系統與分割槽的刪除： 系統內有個名為 /dev/vda4 的分割槽，這個分割槽是做錯的，因此，請將這個分割槽卸載，然後刪除分割， 將磁碟容量釋放出來。
完成上面的題目之後，請依據底下的說明建立好所需要的檔案系統(所有的新掛載，應該使用 UUID 來掛載較佳。)
容量	檔案系統	掛載點
2GB	XFS	/data/xfs
1GB	VFAT	/data/vfat
1.5GB	EXT4	/data/ext4
1GB	swap	-
上述四個新增的資料都能夠開機後自動的掛載或啟用。
完成上述所有的題目後，請重新開機，並請在開機後 10 分鐘內執行上傳腳本，否則系統不允許你上傳喔！
作業結果傳輸：請以 root 的身分執行 vbird_book_check_unit 指令上傳作業結果。 正常執行完畢的結果應會出現【XXXXXX;aa:bb:cc:dd:ee:ff;unitNN】字樣。若需要查閱自己上傳資料的時間， 請在作業系統上面使用： http://192.168.251.250 檢查相對應的課程檔案。

-----

#### Footer
Copyrights | EZMarkDown Studio &copy; 2021

-----

<span class="d-block mt-5"></span>