# bird CH6 基礎檔案系統管理

系統總有容量不足，或者是需要其他檔案系統掛載的時刻，畢竟管理員會經常從不同的來源來取得所需要軟體與資料。 因此，管理檔案系統就是管理員一個很重要的任務。Linux 檔案系統最早使用 Ext2 檔案系統家族(包括 EXT2/EXT3/EXT4 等等)， 但由於磁碟容量越來大，因此適合大容量的 XFS 檔案系統在 CentOS7 被設為預設檔案系統了。因此讀者應該要熟悉這些檔案系統的管理才行。

## 6-1 認識 Linux 檔案系統

目前 CentOS 7 Linux 檔案系統主要支援 EXT2 家族 (目前新版為 EXT4) 以及 XFS 大型檔案系統兩種。其中 XFS 相當適合大容量磁碟， 格式化的效能非常快。但無論哪種檔案系統，都必須要符合 inode 與 block 等檔案系統使用的特性。

### 6-1-1 磁碟檔名與磁碟分割

磁碟內的圓形磁碟盤常見的物理特性如下：

* 磁區(Sector)為最小的物理儲存單位，目前主要有 512bytes 與 4K 兩種格式；
* 將磁區組成一個圓，那就是磁柱(Cylinder)(在此忽略磁軌)；
* 分割的最小單位可能是磁柱 (cylinder) 也可能是磁區 (sector)，這與分割工具有關
* 磁碟分割表主要有兩種格式，分別是 MBR 與 GPT 分割表。
* MBR 分割表中，第一個磁區最重要，裡面有：
	* (1)主要開機區(Master boot record, MBR) 446 bytes 及
	* (2)分割表(partition table) 64 bytes。
* GPT 分割表除了分割數量擴充較多之外，支援的磁碟容量也可以超過 2TB。

整顆磁碟必須要經過分割之後，Linux 作業系統才能夠讀取分割槽內的檔案系統。目前的 Linux 磁碟分割主要有兩種分割， 分別為早期的 MBR 與現今的 GPT。由於 MBR 會有 2TB 容量的限制，但目前的磁碟容量已經都超過 2TB 來到 8TB 以上的等級， 因此 MBR 的分割類型就不太適用了。

磁碟檔名主要為 /dev/sd[a-p] 這種實體磁碟的檔名，以及透過 virtio 模組加速的 /dev/vd[a-p] 的虛擬磁碟檔名。 由於虛擬機器的環境中，大部分磁碟的容量還是小於 2TB 的條件，因此傳統的 MBR 還是有其存在的需求的。

* MBR 磁碟分割的限制

由於 MBR 的紀錄區塊僅有 64 bytes 用在分割表，因此預設分割表僅能紀錄四筆分割資訊。所謂的分割資訊即是紀錄開始與結束的磁區。 這四筆紀錄主要為『主要分割槽 (primary)』與『延伸分割槽 (extended)』。延伸分割不能被格式化應用， 需要再從延伸分割當中割出『邏輯分割 (logical)』之後，才能夠應用。以 P 代表主要、E 代表延伸、L 代表邏輯分割槽， 則相關性為：

* 主要分割與延伸分割最多可以有四筆(硬碟的限制)
* 延伸分割最多只能有一個(作業系統的限制)
* 邏輯分割是由延伸分割持續切割出來的分割槽；
* 能夠被格式化後，作為資料存取的分割槽為主要分割與邏輯分割。延伸分割無法格式化；
* 邏輯分割的數量依作業系統而不同，在Linux系統中SATA硬碟已經可以突破63個以上的分割限制；

* GPT 磁碟分割

常見的磁碟磁區有 512bytes 與 4K 容量，為了相容於所有的磁碟，因此在磁區的定義上面， 大多會使用所謂的邏輯區塊位址(Logical Block Address, LBA)來處理。GPT 將磁碟所有區塊以此 LBA(預設為 512bytes) 來規劃，而第一個 LBA 稱為 LBA0 (從 0 開始編號)。

與 MBR 僅使用第一個 512bytes 區塊來紀錄不同， GPT 使用了 34 個 LBA 區塊來紀錄分割資訊！ 同時與過去 MBR 僅有一的區塊的情況不同， GPT 除了前面 34 個 LBA 之外，整個磁碟的最後 33 個 LBA 也拿來作為另一個備份！

LBA2 ~ LBA33 為實際紀錄分割表的所在，每個 LBA 紀錄 4 筆資料，所以共可紀錄 32*4=128 筆以上的分割資訊。 因為每個 LBA 為 512bytes，因此每筆紀錄可佔用 512/4=128 bytes 的紀錄，因為每筆紀錄主要紀錄開始與結束兩個磁區的位置， 因此紀錄的磁區位置最多可達 64 位元，若每個磁區容量為 512bytes ，則單一分割槽的最大容量就可以限制到 8ZB， 其中 1ZB 為 2^30 TB。

此外，每筆 GPT 的分割紀錄，都是屬於 primary 的分割紀錄，可以直接拿來進行格式化應用的。

例題：

1. 超過幾個 TB 以上的磁碟，通常預設會使用 GPT 的分割表？
2. 某一磁碟的分割為使用 MBR 分割表，該系統當中『共有 5 個可以進行格式化』的分割槽，假設該磁碟含有 2 個主分割 (primary)， 請問該磁碟的分割槽的磁碟檔名應該是如何？ (假設為實體磁碟的檔名，且該系統僅有一顆磁碟時)
3. 某一個磁碟預設使用了 MBR 的分割表，目前僅有 2 個主分割，還留下 1TB 的容量。若管理員還有 4 個需要使用的分割槽， 每個分割槽需要大約 100GB ，你認為應該如何進行分割較佳？

### 6-1-2 Linux 的 EXT2 檔案系統
