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

[anchor](CH1-Linux-Foundation)
![banner](images/1.jpg)
### 鳥哥Linux基礎篇 - 第 1 堂課：初次使用 Linux 與指令列模式初探

#### 1.1：Linux 是什麼

<span class="hr"></span>



Linux 是作業系統，作業系統的目的是在管理硬體，因此你得要先瞭解一下什麼是硬體？另外，Linux 作業系統到底有哪些東西？ 而為什麼 Linux 在操作上授權為免費？瞭解這些基本資料後，再來實際操作一下 Linux 的圖形 (GUI) 與文字 (Command Line) 模式的運作～ 同時查詢一下一般用戶家目錄的資料吧！Linux 的學習確實稍微困難，請大家從這一章仔細的開始進行操作的行為喔！

Linux 是安裝在電腦硬體系統上面的一套作業系統，目的是用來管理電腦硬體的！所以我們得要先了解一下硬體的常見組成，以及常見的硬體分類， 這樣才好入門 Linux 喔！

##### 1.1.1：硬體與作業系統

目前的電腦硬體系統主要經由底下的元件所組成：
* 輸入單元：包括鍵盤、滑鼠、讀卡機、掃描器、手寫板、觸控螢幕等等一堆；
* 主機部分：這個就是系統單元，被主機機殼保護住了，裡面含有一堆板子、CPU 與主記憶體等；
* 輸出單元：例如螢幕、印表機等等

上述主機部份是整體系統最重要的部份，該部份的組成為：控制單元、算術邏輯單元以及記憶體單元(含主記憶體、外部儲存裝置)等。

目前的電腦硬體架構主要均由中央處理單元 (CPU) 所定義的各項連結元件所組成，而目前世界上消費市場中，最常見到的 CPU 架構大概可以分為兩大類：
* X86 個人電腦：由 Intel / AMD 為主要製造廠商，此架構通用於個人電腦 (包括筆記型電腦) 以及商用伺服器市場上 (亦即 x86 伺服器)。 目前 (2017) Intel 在個人電腦市場推出單個 CPU 封裝內含 4 核 8 緒的個人電腦 CPU，商用伺服器則已經推出 10 核 20 緒以上的 Xeon 商用 x86 CPU。
* ARM 手持式裝置：由安謀公司所開發的 ARM CPU ，由於其架構較為精簡，且可授權其他公司開發，因此目前很多廠商均針對 ARM 架構進行自身的 CPU 開發。ARM 通常使用於手持式裝置，包括手機、平板等等，其他像是單板電腦 (Raspberry pi, Xapple pi 等) 亦使用此架構。

為了簡化硬體的資源操作，因此後來有開發作業系統來管理硬體資源的分配。因此程式設計師僅須考量程式的運作流程，而無須考量記憶體配置、 檔案系統讀寫、網路資料存取等，在程式開發上面較為簡易。硬體、作業系統、作業系統提供的開發界面以及應用程式的相關性，可以使用底下的圖示來說明：

硬體與作業系統相關性

![圖1.1-1、硬體與作業系統相關性](http://linux.vbird.org/linux_basic_train/unit01/os_01.gif)
圖1.1-1、硬體與作業系統相關性

* 硬體：例如 x86 個人電腦以及 ARM Raspberry pi 即是兩種不同的硬體。但 x86 個人電腦與 x86 筆記型電腦，兩者則是相同的硬體架構喔！
* 核心：就是作業系統！該系統內部涵蓋檔案系統、網路系統、記憶單元管理系統、硬體驅動程式、資料加密機制等等的子系統
系統呼叫：可視為核心提供的一系列函式庫，程式設計師只要參考此部份的系統呼叫即可設計相關的應用程式，而不用去考慮核心所提供的子系統。
* 應用程式：就是在該系統呼叫的環境中，撰寫程式碼編譯而成的 binary code 程式。
例題：

運用圖 1.1-1 的四個同心圓，嘗試說明當年為何從 windows XP 轉到 Vista 時，很多應用程式無法運作？

例題：
除了雲端軟體之外 (一般雲端軟體，如 office 365) ，大部分的作業系統軟體在販售時，會告知適合的硬體等級， 而一般應用軟體則會告知適用的作業系統，其主要的原因為何？
現代的作業系統主要的目的就是在控管硬體的資源，並且提供一組開發環境讓其他第三方協力廠商可以方便的在該作業系統上面開發相關的軟體。 故作業系統主要包含的部份是：『核心+系統呼叫』。

現代的 Linux 作業系統主要以可跨硬體平台的 C 程式語言所寫成，且 Linux 自從 3.x 以來的核心版本已經支援了 ARM 的 CPU 架構， 因此 Linux 可以輕鬆的在不同的硬體平台間編譯後安裝。但你依舊不可以直接拿 x86 架構的編譯好的 Linux 去安裝在 ARM 的平台上！ 因為兩者對個別硬體的設計還是不太相同的！


##### 1.1.2：Linux 作業系統的發展沿革

Linux 並非憑空撰寫而來，其發展有一定的歷史背景。由於這些歷史背景，目前 Linux 是自由軟體，可以自由的使用、學習、修改、編譯、再發行， 而且是相對穩定的作業系統。

* 1965年以前的電腦系統：
最早的硬體沒有作業系統的概念，後來為了管理方便，因此有了『多元程式處理系統』， 更於後來以多元程式處理系統的概念再開發出了分時相容系統。當時的硬體主要是透過大型主機系統，內含分時相容系統，並提供大約 16 個文字終端機連線。不過當使用者過多時，需要等待才能夠使用電腦系統。
* 1969年以前：一個偉大的夢想--Bell,MIT與GE的『Multics』系統：
Multics 計畫希望能夠改善以前的大型主機系統，提供至少 300 個以上的文字終端機。最終雖然成功的開發出 Multics 系統， 但是相對於 Unix 而言，Multics 的使用率並不高。
* 1969年：Ken Thompson的小型file server system
參與過 Multics 計畫的 Thompson 為了移植一套遊戲，透過組合語言程式撰寫一套暱稱 Unics 的軟體，該軟體可以控制 PDP-7 這個硬體主機， 提供了小型的檔案系統管理功能等。
* 1973年：Unix的正式誕生，Ritchie等人以C語言寫出第一個正式Unix核心
Thompson 與 Ritchie 合作，Ritchie 撰寫 C 程式語言後，再以 C 改寫 Thompson 的 Unics ，最後編譯成為一套作業系統。 此系統就被稱為 Unix。由於使用 C 高階程式語言撰寫，人們很容易看得懂程式碼，因此改寫、移植程式就變得很簡單。
* 1977年：重要的Unix分支--BSD的誕生
柏克萊大學的Bill Joy 在取得了Unix的核心原始碼後，著手修改成適合自己機器的版本， 並且同時增加了很多工具軟體與編譯程式，最終將它命名為Berkeley Software Distribution (BSD)。
* 1979年：重要的 System V 架構與版權宣告
Bell lab. (貝爾實驗室) 的母企業為 AT&T 公司，AT&T 在 1979 開發最新的 SystemV 之 Unix 作業系統。這個系統最特別的地方是， SystemV 可以支援當時沒有多工環境的 x86 個人電腦。此外，AT&T在1979年發行的第七版Unix中，特別提到了『不可對學生提供原始碼』的嚴格限制！
* 1984年之一：x86架構的Minix作業系統開始撰寫並於兩年後誕生
因為 SystemV 之後，大學老師不可以教授 Unix 核心原始碼，因此 Andrew Tanenbaum 自己動手寫了 Minix 這個 Unix Like 的核心程式！ 同時搭配 BBS 新聞群組與相關書籍來販售 Unix Like 的程式碼。因為強調的是學習程式碼，因此改版的速度相當緩慢。
* 1984年之二：GNU計畫與FSF基金會的成立
Richard Mathew Stallman(史托曼)在1984年發起的 GNU 計畫，目的是想要恢復以前『知識分享的駭客文化』，因此強調程式碼需要公開以利學習的自由軟體概念， 並開發出 bash, gcc, glibc, emacs 等膾炙人口的軟體。Stallman 將所有的軟體都上網，但是沒有網路的朋友也能夠透過郵件請 Stallman 寄送軟體磁帶，Stallman 經由這樣販售 emacs 的『服務費用』(Stallman 認為協助人們燒錄軟體，花費他很多的時間成本) 賺了點錢，然後成立了自由軟體基金會 (FSF, Free Software Foundation)，同時與律師共同簽署了 GNU 的通用公共許可證(General Public License, GPL)， 該授權讓使用者可以自由的使用軟體，且軟體的授權可以永續的存在。
* 1988年：圖形介面XFree86計畫
為了解決圖形使用者界面 (Graphical User Interface, GUI) 的需求，於是有 XFree86 這個組織的形成。XFree86 是由 X Window System + Free + x86 所組成的，目的在提供 server/client 的圖形畫界面。
* 1991年：芬蘭大學生Linus Torvalds的一則簡訊
Torvalds 在 1991 年於 BBS 上面公告他透過 GNU 的 bash, gcc 等，透過學習 Minix 系統，在 x86 (386) 上面成功的開發一個小型的作業系統， 並且放在 Internet 上面提供提供大家自由下載。同時，還鼓勵大家告知 Torvalds 自己，這個系統還有哪些部份可以值得繼續修改等的訊息。 這就是 Linux 的起源！
* 1992年：Linux distributions 發行：
為了讓使用者更方便安裝與操作 Linux，於是有了 Linux 開發套件的軟體釋出，就稱為 Linux distribution 了。 一開始於 1992 年就有 Softlanding Linux System(SLS), Yggdrasil Linux 等版本。
* 1994年：Linux kernel version 1.0 釋出：
1994 年 Linux 核心釋出 1.0 版本，同時目前世上最知名的 Linux 商業公司 Red Hat 也在當時成立。
* 2005年：Google 收購 Android 公司
從 2003 年開始，加州的一家公司開始發展 Android 系統在手機上面。後來 Google 於 2005 年收購該公司，並將 Android 在 Linux 核心上開發， 以發展可以讓手持式裝置使用的作業系統。首個商用手機 Android 作業系統則在 2008 年由 HTC 推出！
* 2012年：教育市場的 Raspberry pi
為了讓小朋友能夠輕鬆愉快的學習程式語言，一個小型的單板電腦製造基金會依據 ARM 的架構開發了一版大約與筆記型硬碟差不多大小的主機板， 內嵌入所有電腦系統所需要的硬體，這就是樹莓派 (Raspberry pi)。Raspberry pi 的預設作業系統即是搭配 Linux 核心所開發的小型作業系統。

例題：
上網找出多元程式處理系統需要可以 I/O 與 CPU 分離運作的主要架構，是透過記憶體內的哪些程序狀態達成的？ 且這些程序的狀態運作情況為何？

例題：
暱稱『最純種的 UNIX 』指的是那兩套 Unix 作業系統？

例題：
上網找出： (1)GNU 計畫的全名； (2)GNU 計畫的官網； (3)GNU 的吉祥物； (4)GNU 的核心名稱為何？


##### 1.1.3：GNU 的 GPL 與 Opensource 開放原始碼授權

GNU 的 GPL 授權主要強調自由的學習，Free Software(自由軟體)是一種自由的權力，並非是『價格！』 

舉例來說，你可以擁有自由呼吸的權力、你擁有自由發表言論的權力，但是，這並不代表你可以到處喝『免費的啤酒！(free beer)』， 也就是說，自由軟體的重點並不是指『免費』的，而是指具有『自由度, freedom』的軟體，史托曼進一步說明了自由度的意義是： 使用者可以自由的執行、複製、再發行、學習、修改與強化自由軟體。

GNU 的 GPL 授權有底下的權力與義務：
* 取得軟體與原始碼：你可以根據自己的需求來執行這個自由軟體；
* 複製：你可以自由的複製該軟體；
* 修改：你可以將取得的原始碼進行程式修改工作，使之適合你的工作；
* 再發行：你可以將你修改過的程式，再度的自由發行，而不會與原先的撰寫者衝突；
* 回饋：你應該將你修改過的程式碼回饋於社群！
* 不可修改授權：你不能將一個GPL授權的自由軟體，在你修改後而將他取消GPL授權～
* 不可單純販賣：你不能單純的販賣自由軟體。

由於自由軟體使用的英文為 free software，這個 free 在英文是有兩種以上不同的意義，除了自由之外，免費也是這個單字！ 因為有這些額外的聯想，因此許多的商業公司對於投入自由軟體方面確實是有些疑慮存在的！許多人對於這個情況總是有些擔心～

為了解決這個困擾，1998 年成立的『開放原始碼促進會 (Open Source Initiative)』提出了開放原始碼 (Open Source，亦可簡稱開源軟體) 這一名詞！ 另外，並非軟體可以被讀取原始碼就可以被稱為開源軟體喔！該軟體的授權必須要符合底下的基本需求，才可以算是 open source 的軟體。
* 公佈原始碼且用戶具有修改權：用戶可以任意的修改與編譯程式碼，這點與自由軟體差異不大；
* 任意的再散佈：該程式碼全部或部份可以被販售，且程式碼可成為其他軟體的元件之一，作者不該宣稱具有擁有權或收取其他額外費用。
* 必須允許修改或衍生的作品，且可讓再發佈的軟體使用相似的授權來發表即可。
* 承上，用戶可使用與原本軟體不同的名稱或編號來散佈。
* 不可限制某些個人或團體的使用權
* 不可限制某些領域的應用：例如不可限制不能用於商業行為或者是學術行為等特殊領域等等
* 不可限制在某些產品當中，亦即程式碼可以應用於多種不同產品中。
* 不可具有排他條款，例如不可限制本程式碼不能用於教育類的研究中，諸如此類。

例題：
* 如果你自己開發的軟體未來可能會有商業化的可能，但目前你希望使用 Open source 的方式來提供大家使用。 另外，也希望未來能夠有一支保有開放源碼軟體的分支，那最好使用 GPL 還是 BSD 呢？


##### 1.1.4：Linux kernel

Linux kernel 主要由 http://www.kernel.org 維護，目前的版本已經出現到 4.x 版。Linux kernel 1.0 在 1994 年釋出， 在 1996 年釋出 2.0 版，在 2.0 之後，核心的開發分為兩個部份，以廣為使用的 2.6 來說明的話，主要的分類有：

* 2.6.x：所謂的偶數版，為穩定版，適用於商業套件上；
* 2.5.x：所謂的奇數版，為發展測試版，提供工程師一些先進開發的功能。

這種奇數、偶數的編號格式在 2011 年 3.0 核心推出之後就失效了。從 3.0 版開始，核心主要依據主線版本 (MainLine) 來開發，開發完畢後會往下一個主線版本進行。例如 4.9 就是在 4.8 的架構下繼續開發出來的新的主線版本。

舊的版本在新的主線版本出現之後，會有兩種機制來處理，一種機制為結束開發 (End of Live, EOL)，亦即該程式碼已經結束， 不會有繼續維護的狀態。 另外一種機制為保持該版本的持續維護，亦即為長期維護版本 (Longterm)！例如 4.9 即為一個長期維護版本，這個版本的程式碼會被持續維護，若程式碼有 bug 或其他問題， 核心維護者會持續進行程式碼的更新維護。

例題：
使用 google 搜尋引擎或 wiki 等，找出底下的相關資料：
Android 的版本搭配的 Linux 核心版本為何？
由 Linux kernel 官網的『Releases』相關說明，找出現階段的 Linux Mainline, Stable, Longterm 版本各有哪些？


##### 1.1.5：Linux distributions
為了讓使用者能夠接觸到Linux，於是很多的商業公司或非營利團體，就將Linux Kernel(含tools)與可運行的軟體整合起來， 加上自己具有創意的工具程式，這個工具程式可以讓使用者以光碟/DVD或者透過網路直接安裝/管理Linux系統。 這個『Kernel + Softwares + Tools + 可完整安裝程序』的咚咚，我們稱之為Linux distribution， 一般中文翻譯成可完整安裝套件，或者Linux發佈商套件等。

常見的 Linux distributions 分類有：

RPM 軟體管理	DPKG 軟體管理	其他未分類
商業公司	RHEL (Red Hat 公司)
SuSE (Micro Focus)	Ubuntu (Canonical Ltd.)	
社群單位	Fedora
CentOS
OpenSuSE	Debian
B2D	Gentoo
一般用途在個人電腦 (包括筆記型電腦) 的使用，建議可以使用 Ubuntu / Fedora / OpenSuSE 等，若用在 Server 上， 建議可以使用 CentOS 或 Debian。

CentOS 的產生較為有趣，他是取自 Red Hat 的 RHEL 作業系統，將原始碼中與 Red Hat 相關的註冊商標或其他著作相關的資料移除， 改以自己的『企業商用社群版本作業系統』取名，然後再次發行。因此 CentOS 的版本與 RHEL 是亦步亦趨的！ (包括 Oracle Linux 與 Scientific Linux 也是同樣的作法)。

例題：
為什麼 CentOS 社群可以直接取用 RHEL 的程式碼來修改後釋出？這樣做有沒有任何法律的保護呢？


1.1.6：Linux 的常見用途
用在企業環境與學術環境中，最常見到的應用有：

網路伺服器
關鍵任務的應用(金融資料庫、大型企業網管環境)
學術機構的高效能運算任務
個人的使用則有：

桌上型電腦
手持系統(PDA、手機、平板電腦、精簡電腦等)
嵌入式系統 (如 raspberry pi / Xapple pi 等內建的 Linux 系統)
例題：
超級電腦可以說是一個國力的展現，而 top500 每年會有兩次去調查全世界跑得最快的超級電腦。請上網查詢後回答下列問題： (1) top500 的官網網址？ (2)超級電腦的比較排序方式，是以那一種計算來考慮的？ (3)根據現在的時間，找到最近一次排序的結果， 第一名的超級電腦使用了多少個 CPU 核心 (cores)， (4)該系統最快可達到多快的計算 (說明其單位)？ (5)若以一度電 5 元台幣計算， 該系統開機一天要花費多少錢？

例題：
前往 Dell 官網，調查其支援的 Linux distribution 主要是那幾種？另外，請思考這個查詢的意義為何？ (http://linux.dell.com/files/supportmatrix/)


1.2：登入與操作 Gocloud 雲端系統 (鳥哥教室專用)
為方便教師/學生可以在任何地方學習 Linux 作業系統，一個教學環境是需要事先建置的。除了使用實體機器原生的 Linux 之外， 虛擬化的環境更方便教師製作教學單元。因為虛擬化的環境軟/硬體可以模擬的完全一致，對於教師與學生的實作練習以及錯誤重現，都有很大的幫助。

本教材預設使用的 Gocloud 雲端系統為鳥哥在自己的課堂上面搭建的小型雲伺服器，對於同學無間斷的學習是很有幫助的。不過因為系統硬體資源太少了， 所以僅開放給鳥哥實際課程的同學們使用，實際並未對網際網路開放，在此跟大家說聲抱歉！如果您是自學的朋友，那只好請參考書上的光碟資料， 使用 VirtualBox 軟體作為自學磁碟的系統了！

(ps. 除了 Gocloud 系統之外，老師們也可以選擇 Ovirt (https://ovirt.org/) 作為教學訓練的環境建置， 或者單純在原有的教室 windows 系統上面建置 virtualbox 的環境來教學即可。關於 virtualbox 的建置，可以參考光碟附件。如果是預計使用 ovirt， 可以參考如下的連結：https://www.ovirt.org/documentation/install-guide/Installation_Guide.html)

1.2.1：註冊 gocloud 與登入
除非貴單位有購買與安裝 Gocloud 系統，否則請以光碟內容的 virtualbox 環境取代底下的說明。若有安裝 Gocloud 系統， 請依據貴單位的環境設定 (網際網路 IP 或 主機名稱)，直接以瀏覽器來連線到 Gocloud 系統，系統示意圖如下所示：

Goucloud 畫面示意圖
圖1.2.1、Goucloud 畫面示意圖
如果是第一次使用的學生，那就請先來註冊一下！按下如上圖的箭頭指向的地方，點下去就會出現註冊的項目了，如下所示：

Goucloud 畫面示意圖
圖1.2.2、Goucloud 註冊畫面示意圖
一般來說，如果是學校單位，鳥哥建議如上述畫面所示，最好請學生依據自己的學號作為帳號，真實姓名作為姓名填寫， 這樣老師比較知道學生與帳號的對應，在考試出題與作答時，會比較清楚對應。如果沒有強調這一點，那學生註冊的姓名可能會比較傷腦筋。 等到註冊完畢後，還要等老師將你的帳號開通之後才能夠使用。因此，此時請稍微等待一小段時間喔！

等到老師將你的帳號開通，並且假設老師已經將硬碟製作好給你了，此時請回到圖 1.2.1 去輸入帳號與密碼欄位， 並按下登入系統或 [Enter]，那就能夠登入系統了。登入系統會出現如下的圖示：

Goucloud 畫面示意圖
圖1.2.3、Goucloud 登入後的畫面示意圖
畫面中最上方為學生可以操作的系統功能，其中比較常用的是：

啟動/關閉主機：讓學生可以 (1)啟動雲端虛擬機器，並打開 gocloud 的防火牆，取得連線的 URL； (2)虛擬機器運作中，可以抽換光碟； (3)可以強制關機 (直接斷電)。
課程磁碟復原：在虛擬機器關機的狀態下，可以將個人的磁碟復原到最原始的狀態，所以學生可以實際多操作數次，做完直接復原即可。
軟體下載：其實主要是針對 Windows 系統喔！可以安裝連線軟體，如此你的 windows/Linux 就可以使用 remote-viewer 這套軟體來取得雲端虛擬機器的終端界面。
例題：
除非貴單位有購買與安裝 Gocloud 系統，否則請以光碟內容的 virtualbox 環境取代底下的說明。若有安裝 Gocloud 系統， 請登入系統後，根據你自己家用 (或電腦教室中) 的作業系統，下載正確的 remote-viewer 軟體，並且安裝後啟動該軟體。
答：
Windows 作業系統：如果你目前操作的系統是 Windows 作業系統，那麼可以直接到 Gocloud 的『軟體下載』畫面中， 選擇『用戶端 Windows 為 64 位元版本』的超連結來下載。最好不要使用 IE 來下載，因為 IE 會自動更改安裝檔的檔名， 所以下載後還需要更改副檔名成為 .msi 才能夠安裝。使用 chrome 或 firefox 則無此問題。 此外，你也可以自行到 internet 下載最新版的軟體： https://virt-manager.org/download/
Linux 作業系統：如果是 Red Hat 系列的 (RHEL/Fedora/CentOS) ，直接安裝 virt-viewer 軟體即可。(yum install virt-viewer)
Mac OSX 作業系統：現在 remote-viewer 也支援 OSX 了！詳情請參考底下的網址。目前 (2017) 最新版為 RemoteViewer-0.5.7-1.dmg，請自行下載安裝。
https://www.spice-space.org/page/OSX_Client
https://people.freedesktop.org/~teuf/spice-gtk-osx/dmg/
Android 平板：目前 Android 平板也能夠支援 gocloud 的連線了，不過需要於 play.google.com 下載 aSpice 才能夠連線 (不是 remote-viewer 軟體)。
這裡假設學校的電腦大多為 windows 作業系統，因此當安裝完軟體後，可以在『開始』-->『所有程式』-->『VirtViewer』找到『 Remote Viewer 』這套軟體。 點選此軟體後，就可以得到如下的畫面：
Goucloud 畫面示意圖
圖1.2.4、學生端電腦連線到 Gocloud 的 remote viewer 軟體示意圖
當學生開啟虛擬機器後，將虛擬機器所在的網址複製到上述箭頭所指定的方框中，即可達成連線。


1.2.2：啟動與管理虛擬機器
除非貴單位有購買與安裝 Gocloud 系統，否則請以光碟內容的 virtualbox 環境取代底下的說明。若有安裝 Gocloud 系統， 在你登入 Gocloud 網站系統後，點選『啟動/關閉主機』後，應該會得到如下的畫面。如果一切順利的話，那麼你應該會取得至少一個以上的硬碟環境。 如下圖的 2 號箭頭處。如果找不到任何硬碟，請與您的授課教師聯繫。選擇正確的磁碟後，請按下『開啟機器』的按鈕來啟動雲端虛擬機器。

Goucloud 畫面示意圖
圖1.2.5、利用 Gocloud 系統啟動雲端虛擬機器的示意圖
如果一切順利，那麼你就會得到如下的畫面示意圖，基本上，我們最重要的是取得如下圖 1 號箭頭指的方框處的 URL (spice 開頭那項)， 請複製該項目，並且將他貼上 圖1.2.4 所需要指定的 URL 方框中，按下連線 (Connect) 即可取得如 圖1.2.7 的雲端虛擬機器視窗了！

Goucloud 畫面示意圖
圖1.2.6、Gocloud 系統上面已經啟動了雲端虛擬機器的示意圖

Goucloud 畫面示意圖
圖1.2.7、以 Remote viewer 軟體取得 Gocloud 上的雲端虛擬機器
remote viewer 軟體左上方主要有兩個基本功能可以選擇：

View：可以將整個畫面放大到『全螢幕(Full Screen)』，要取消只要按下鍵盤功能鍵 [F11] 即可復原，也能夠放大、縮小畫面。
Send key：可以傳送組合按鍵給虛擬機器，避免由於直接按下按鍵導致 windows 或用戶端自己其他作業系統的困擾。
另外請注意，由於目前你應該有兩個完全獨立的系統，一個是你自己的系統，一個是 Gocloud 的雲端虛擬機器， 若要操作 Gocloud 的雲端虛擬機器時，你應該要將滑鼠移動到 remote viewer 的視窗內，這樣才能夠完整的使用虛擬機器的資源！


1.3：第一次登入 CentOS 7
取得雲端 Linux 機器後，就能夠開始操作 Linux 系統了。接下來先來學習如何登入 Linux、了解圖形界面、文字界面的操作差異， 並建立好『良好的操作行為』，這對於未來的幫助會很大的

本教材預計在訓練學員們了解 Linux 在伺服器的使用上，應該如何操作與學習，因此使用了 CentOS 這套 Linux 作業系統來學習。 請大家依據教材的內容慢慢實做練習，以理解整個系統的使用！

1.3.1：圖形界面操作 CentOS
在圖1.2.7 的畫面中，使用滑鼠左鍵將螢幕向上拉動，就會出現等待登入的畫面，如下所示：

CentOS 7 圖形界面登入示意圖
圖1.3.1、CentOS 7 圖形界面登入示意圖
你可以：

點選出現的人名 (你的帳號)，然後輸入密碼，即可登入系統；
點選『Not listed?』：接下來出現『Username』請填寫帳號，按下 [Next] 出現『Password:』請輸入正確的密碼， 然後按下 [Sign In] 即可登入系統。
本教材提供虛擬機的帳號與密碼為『student/student@linux』，請依據此帳號密碼來登入系統。

例題：
請第一次登入系統，並且處理好中文的操作界面！同時，家目錄底下的檔案檔名，最好不要有中文存在。
答：
根據教材提供的帳號密碼登入系統：選擇 student 帳號，然後輸入密碼；
第一次登入時，會出現選擇用戶語系的畫面，請點選最底下的未知(三個直立的小數點)，然後將畫面拉動到最下方，即可看到『漢語 台灣』，選擇後， 在畫面的右上方按下 [下一步]；
選擇預設的輸入法為『英語(美式)』即可按下 [下一步]；
點選『開始使用 CentOS Linux』
出現第一次的使用說明 (Getting Started)，可以直接忽略按下右上方的關閉 (X) 即可。
此時畫面依舊是英文，請選擇螢幕右上方的三角形按鈕，點選『Student』這個身份按鈕，畫面會出現『 Log out 』的項目，點選『Log Out』登出；
再次以 student 帳號登入系統，即可取得正確的中文操作環境。
如果一切處理順利，那就可以出現圖形化視窗。你可以先到『應用程式』-->『喜好』-->『終端機』點選，點出一個終端機界面， 然後再到畫面右上角的三角形點選，就能夠看到一些設定值的項目，如下所示：

CentOS 7 圖形界面操作示意圖
圖1.3.2、CentOS 7 圖形界面操作示意圖

例題：
在圖形界面下先嘗試進行目錄與檔案的管理，這時請使用在最上方工作列『應用程式』隔壁的『位置』選單，點選『家目錄』的項目，之後進行如下的動作測試：
改變顯示的檔案資訊，在『縮圖』與『詳細資料』當中切換測試；
在『詳細資料』的畫面中，如果要顯示更多的資料，可以勾選哪些設定？
若需要離開家目錄到其他目錄，勾選左側『電腦』的項目，看看有哪些基本的目錄存在
依序點選『var』-->『spool』-->『mail』，看看出現什麼資料呢？檔案總管最上方出現的檔名方式排列為何呢？
嘗試找到『電腦-->etc-->passwd』這個檔案，將他複製後，變更路徑到『電腦-->tmp』底下，然後貼上去！
承上題，你能不能將『電腦-->etc-->shadow』複製到『電腦-->tmp』呢？

例題：
預設的中文輸入法似乎怪怪的，沒有辦法正確的輸入中文。你該如何設定中文輸入法呢？
點選右上方三角形按鈕，出現的視窗中左下角的螺絲工具圖案點選下；
在『個人』的項目中，點選『地區和語言』的項目；
一開始只會看到『英語(美式)』與『漢語』，點選『＋』之後，選擇『漢語(台灣)』，再選『漢語(Chewing)』，最終按『加入』
將原本的『漢語』項目移除
之後就可以正常的使用注音輸入法了。

例題：
如何關掉進入螢幕保護程式的狀態？
如何觀察與啟動網路？
將 student 登出系統

Tips
鳥哥的圖示由於使用圖形界面時，會在使用者的家目錄建立相當多的圖形界面操作設定檔與暫存檔。不過在系統管理員 (root) 的角色下， 我們希望不要有太多雜亂的資料，因此建議『不要在圖形環境下使用 root 的帳號登入系統』喔！你可以在其他的登入界面使用 root 的帳號！ 如下一個小節的純文字模式介紹～


1.3.2：文字/圖形界面的切換
Linux預設的情況下會提供六個Terminal來讓使用者登入， 切換的方式為使用：[Ctrl] + [Alt] + [F1]~[F6]的組合按鈕。

系統會將[F1] ~ [F6]命名為tty1 ~ tty6的操作介面環境。 也就是說，當你按下[ctrl] + [Alt] + [F1]這三個組合按鈕時 (按著[ctrl]與[Alt]不放，再按下[F1]功能鍵)， 就會進入到tty1的terminal介面中了。同樣的[F2]就是tty2！ 按下[Ctrl] + [Alt] + [F1]就可以回到原本的 X 圖形界面中。整理一下登入的環境如下：

[Ctrl] + [Alt] + [F2] ~ [F6] ：文字介面登入 tty2 ~ tty6 終端機；
[Ctrl] + [Alt] + [F1] ：圖形介面桌面。
例題：
請使用 student 的身份在 tty2 的畫面中登入系統
CentOS Linux 7 (Core)
Kernel 3.10.0-327.el7.x86_64 on an x86_64

localhost login: student
Password: <==這裡輸入你的密碼
Last login: Thu Apr 14 19:46:30 on :0 <==上次登入的情況
[student@localhost ~]$ _ <==游標閃爍，等待你的指令輸入
上面顯示的內容為：

CentOS Linux 7 (Core)
顯示Linux distribution 的名稱 (CentOS) 與版本(7)；
Kernel 3.10.0-327.el7.x86_64 on an x86_64
顯示 Linux 核心的版本為3.10.0-327.el7.x86_64，且目前這部主機的硬體等級為x86_64。
localhost login:
localhost 是主機名稱。至於login:則是一支可以讓用戶登入的程式。 你可以在login:後面輸入你的帳號後，按下 [enter] 就可以開始準備下個動作。
Password:
這一行的出現必須要在上個動作按 [enter] 之後才會出現。 在輸入密碼的時候，螢幕上面『不會顯示任何的字樣！』 這是為了擔心使用者輸入密碼時，被偷看到『輸入的密碼長度』之故。
Last login: Thu Apr 14 19:46:30 on :0
當使用者登入系統後，系統會列出上一次這個帳號登入系統的時間與終端機名稱！
[student@localhost ~]$ _：
這一行則是正確登入之後才顯示的訊息， 最左邊的 student 顯示的是『目前使用者的帳號』，而@之後接的 localhost 則是『主機名稱』，至於最右邊的『 ~ 』則指的是 『目前所在的目錄』，那個 $ 則是『提示字元』
上述比較重要的資料在第 6 行，CentOS 的 bash 提示字元通常的格式就是『 [使用者帳號@本主機名 工作目錄]提示字元 』。 其中比較重要的項目是：

~ 符號代表的是『使用者的家目錄』的意思，他是個『變數！』。舉例來說，root的家目錄在/root， 所以 ~ 就代表/root的意思。而student的家目錄在/home/student， 所以如果你以student登入時，他看到的 ~ 就會等於/home/student
提示字元方面，在Linux當中，預設root的提示字元為 # ，而一般身份使用者的提示字元為 $ 。
另外，文字界面等待登入畫面的第一、第二行的內容其實是來自於/etc/issue這個檔案！

那麼如何離開系統呢？其實應該說『登出Linux』才對！登出很簡單，直接這樣做：

[student@localhost ~]$ exit
就能夠登出Linux了。但是請注意：『離開系統並不是關機！』 基本上，Linux本身已經有相當多的工作在進行，你的登入也僅是其中的一個『工作』而已， 所以當你離開時，這次這個登入的工作就停止了，但此時Linux其他的工作是還是繼續在進行的！

例題：
請分別以圖形界面以及文字界面登入系統 (使用 tty1 及 tty2 登入)，登入後，請使用 w 這個指令查詢誰在系統上？ 並請以你看到的資料說明哪些使用者透過哪些 tty 登入系統。(有個 :0 的終端機，那個是什麼？)

1.4：簡易的文字指令操作
站在伺服器角度的立場來看，使用純文字模式來進行系統的操作是很重要的！畢竟伺服器通常不會啟用圖形界面。 因此，第一堂課接觸過 Linux 與登入過 Linux 之後，讓我們來使用簡單的指令查詢一下用戶家目錄裡面有哪些資料，以及如何查詢自己曾經下達過的指令吧！

1.4.1：ls 與 ll 檢查自己目錄的檔名資料
請使用一般用戶的身份登入 Linux 系統，同時啟動一個終端機在桌面上。現在讓我們來執行兩隻指令，確認一下如何操作系統與觀察輸出的資料。

[student@localhost ~]$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
使用 ls 可以單純的列出檔名，就是上面列出的『Desktop Documents Downloads...』等等的資料。 不過並沒有顯示這個檔名相關的各項檔案權限資訊，包括時間、容量等等。若需要查閱比較詳細的資訊，需要使用 ll (LL 的小寫) 來處置。

[student@localhost ~]$ ll
drwxr-xr-x. 2 student student 6  3月  7 19:18 Desktop
drwxr-xr-x. 2 student student 6  3月  7 19:18 Documents
drwxr-xr-x. 2 student student 6  3月  7 19:18 Downloads
drwxr-xr-x. 2 student student 6  3月  7 19:18 Music
drwxr-xr-x. 2 student student 6  3月  7 19:18 Pictures
drwxr-xr-x. 2 student student 6  3月  7 19:18 Public
drwxr-xr-x. 2 student student 6  3月  7 19:18 Templates
drwxr-xr-x. 2 student student 6  3月  7 19:18 Videos
第一堂課的此時，你需要注意的是最右邊的三個參數，分別是檔案容量、檔案最後被修改的日期、檔名資訊。 以『Pictures』檔名為例，該檔名的容量有 6bytes，而最後被修改的日期為『 3月 7 19:18 』。至於年份則是本年度的意思。

如果想要查閱根目錄 (類似 windows 的『電腦』項目)，則使用如下的指令：

[student@localhost ~]$ ll /
總計 32
lrwxrwxrwx.   1 root root    7  2月 18 02:54 bin -> usr/bin
dr-xr-xr-x.   4 root root 4096  2月 18 03:01 boot
drwxr-xr-x.  20 root root 3320  4月 19 03:59 dev
drwxr-xr-x. 129 root root 8192  4月 19 03:59 etc
drwxr-xr-x.   3 root root   20  4月 14 19:46 home
lrwxrwxrwx.   1 root root    7  2月 18 02:54 lib -> usr/lib
lrwxrwxrwx.   1 root root    9  2月 18 02:54 lib64 -> usr/lib64
......
此時螢幕上顯示的為根目錄底下的檔名，而不是 student 的家目錄了。這個練習在讓操作者了解到，指令後面可以加參數 (parameters)。 而如果想要知道 student 家目錄底下有沒有『隱藏檔』時，可以使用如下的指令：

[student@localhost ~]$ ll -a
總計 24
drwx------. 14 student student 4096  3月  7 21:32 .
drwxr-xr-x.  3 root    root      21  1月  3 22:27 ..
-rw-r--r--.  1 student student   18  8月  3  2016 .bash_logout
-rw-r--r--.  1 student student  193  8月  3  2016 .bash_profile
-rw-r--r--.  1 student student  231  8月  3  2016 .bashrc
drwx------. 11 student student  226  3月  7 22:12 .cache
drwxr-xr-x. 15 student student  276  3月  7 21:29 .config
drwxr-xr-x.  2 student student    6  3月  7 19:18 Desktop
......
可以發現多了相當多以小數點開頭的檔名，這些檔名在 ls 或 ll 時並不會出現，但加上『 -a 』這個『 選項 (Option) 』之後， 就會開始出現了。這個練習在讓操作者了解到，指令後面可以加『選項』來改變指令的處理行為。

最後，如果你想要知道根目錄本身的權限，而不是根目錄底下的檔名，則應該要使用底下的指令：

[student@localhost ~]$ ll -d /
dr-xr-xr-x. 17 root root 4096  2月 18 03:01 /
你將在螢幕上發現到只有根目錄 (/) 這個檔名存在，而不像剛剛『 ll / 』出現一堆檔名資料。 亦即一般情況下，ll 是『瀏覽目錄內的檔名資訊』，而不是看目錄本身。

Tips
鳥哥的圖示以 windows 的檔案總管來說，通常檔名的瀏覽畫面中，左側為『目錄』而右側為『該目錄下的檔名』，所以，『 ll 』代表滑鼠點左邊的目錄， 而螢幕輸出右邊的檔名資料之意。

例題：
在終端機界面中輸入『 clear 』會有什麼效果？

例題：
檢查一下 /var/spool/mail 這個目錄 (1)裡面有幾個檔案？ (2)這個目錄本身所修改的時間是什麼時候？

1.4.2：歷史命令功能
Linux 的文字界面中，可以用幾個簡單的方式去檢查你曾經下達過的指令，最簡單的方法就是使用方向鍵『上與下』， 不但能夠呼叫出之前的指令，也能夠再透過方向鍵『左與右』，與鍵盤上的『home/end』按鍵，直接在一行指令的最前面與最後面直接再修改。 熟悉這個作法，可以讓你快速的編輯一行指令。

但是如果是太久之前做的指令，此時就能夠透過歷史命令『 history 』來呼叫出來。

例題：
讓 student 呼叫出歷史命令，觀察一下曾經執行過 ll / 的指令是『第幾個』，若想要再次執行，應該如何處理？
除了『 !數字 』可以重複執行某個指令外，也能夠直接透過底下的方式來重複執行歷史命令：

例題：
student 曾經輸入過 ls 這個指令，那我想要重新執行一次以 ls 為開頭的指令該如何處理？
在 CentOS 7 底下，預設歷史命令會紀錄 1000 筆，你下次登入後，系統會將上次的歷史命令匯入，亦即，上次你下達過 50 筆紀錄， 則下次啟用終端機後，第一個指令會紀錄在 51 筆。因此，經常查詢 history 可以讓操作者了解以前曾經下達過哪些指令。


1.4.3：離開系統與關閉系統
離開系統，以終端機界面來說，直接輸入 exit 或者 logout 都可以。以圖形界面來說，畫面中右上角三角形部份點選後， 出現登入者 (student) 的文字，點選後選擇『登出』即可。但登出不是關機。關機時，最好能夠確認系統上面沒有其他工作的用戶。 因此關機前，建議檢查系統上面的用戶狀態。

[student@localhost ~]$ w
 04:59:07 up  1:53,  3 users,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
student  :0       :0               03:59   ?xdm?  23.56s  0.14s gdm-session-worker
student  pts/0    :0               03:59   59:31   0.03s  0.03s bash
上面表格中，『USER』欄位為登入的使用者，『TTY』就是前面小節談到的終端機，通常為 tty1~tty6。但是在 tty1 使用圖形界面登入時， 會顯示為『 :0 』，亦即圖形界面使用終端機名稱為 :0 之意。另外，每行最後的『WHAT』為該終端機目前使用的指令為何。 所以圖形界面為透過 gdm-session-worker 指令而來，而終端機則使用 bash 這個程式。

至於 pts/0 則可能是 (1)在圖形界面啟動的終端機，或 (2)透過網路連線進來的終端機。並非本機的 tty1~tty6 。

從上表看來，目前確實僅有 student 在線上，若本機器並非伺服器，則此時應該可以進行關機的行為。關機可以使用如下的指令：

[student@localhost ~]$ poweroff
[student@localhost ~]$ halt
[student@localhost ~]$ shutdown -h now
[student@localhost ~]$ systemctl poweroff
上述的任何一個指令均可關機。但無論使用哪個指令關機，其實最終都是呼叫最後一個，亦即『 systemctl poweroff 』進行關機的行為。

Tips
鳥哥的圖示在本機 tty1~tty6 登入系統的帳號，無論系統管理員或一般帳號，均可 poweroff 本機。但如果是透過網路連線進來的，則無法關閉 Linux ， 除非使用管理員帳號，才有辦法透過網路關機。


1.5：課後練習操作
前置動作：請使用 unit01 的硬碟進入作業環境，並請先以 root 身分執行 vbird_book_setup_ip 指令設定好你的學號與 IP 之後，再開始底下的作業練習。

簡答題：請使用 student 的身份登入系統，然後在應用程式中找尋一個名為 gedit 的指令，打開該軟體之後，依據底下的題目寫下答案。 儲存時，請選擇檔名為 /home/student/ans01.txt
電腦組成的五大單元中，(a)指的是哪五個單元？(b)CPU 主要包含那兩個單元？
消費性市場的 CPU 當中，(a)桌上型電腦與(b)手機常用的 CPU 分別是哪種類型？
由圖1.1-1的資料中，請以『Linux』、『X86個人電腦』、『POSIX』、『Open Office』說明個四個東西各屬那一層？
用組合語言開發出第一個 Unics 系統的，是貝爾實驗室 (Bell lab.) 的那一位高級駭客？
貝爾實驗室的那兩個高級駭客用 C 寫成了第一版的 unix 作業系統？
從那一個 Unix 版本開始，Unix 終於可以支援 x86 個人電腦？
號稱自由軟體之父是哪位先生？而自由軟體 (free software) 又是那一個授權的名稱？
Torvalds 是參考那一個 Unix-like 的系統而撰寫 Linux 的？
查一下網路資料，列出三種以上的 Open source 授權
所謂的 Linux distributions 大概包括那四個元件？
Raspberry pi 的主要作業系統名稱為 Raspbian，這個作業系統是基於哪一個 Linux distribution 改版而來？
在 CentOS 7 的預設情況下，你可以輸入哪些組合按鈕來進入不同的終端界面 (TTY)
登入取得終端機後，要離開終端機應該使用哪些指令？(至少寫兩個)
查詢列出隱藏檔時，可以使用什麼指令搭配什麼選項？
想要查詢自己輸入的歷史命令，可以使用什麼指令？
關機可以使用哪些指令？(至少寫兩個)
在 /tmp/checking 目錄下，有個隱藏檔，(a)哪一個指令搭配選項與參數可以列出該檔名(寫出完整指令)， (b)寫下該檔名
作業結果傳輸：請以 root 的身分執行 vbird_book_check_unit 指令上傳作業結果。 正常執行完畢的結果應會出現【XXXXXX;aa:bb:cc:dd:ee:ff;unitNN】字樣。若需要查閱自己上傳資料的時間， 請在作業系統上面使用： http://192.168.251.250 檢查相對應的課程檔案。

<span class="hr"></span>

-----

#### Footer
Copyrights | EZMarkDown Studio &copy; 2021

-----

<span class="d-block mt-5"></span>