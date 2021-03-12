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

[anchor](CH4-Linux-BASIC-File-Authority-And-Account-Manage)
![banner](images/1.jpg)
### 鳥哥Linux基礎篇 - 第 4 堂課：Linux 基礎檔案權限與基礎帳號管理

<span class="hr"></span>

第 4 堂課：Linux 基礎檔案權限與基礎帳號管理
最近更新日期：2017/03/09
從前幾節課的練習中發現，使用 student 進行一些任務時，總是發現無法順利的複製或者是進行其他的檔案管理任務，這是因為『權限不足』所致。 本堂課要來介紹 Linux 基礎檔案系統，藉以了解為何 student 的任務會成功或失敗。此外，為了管理權限，有時也需要管理使用者帳號， 故基礎帳號管理也在本堂課介紹。

4.1：Linux 傳統權限
4.1.1：使用者、群組與其他人
4.1.2：檔案屬性與權限的修改方式
4.2：基礎帳號管理
4.2.1：簡易帳號管理
4.2.2：帳號與群組關聯性管理
4.3：帳號與權限用途
4.3.1：單一用戶所有權
4.3.2：群組共用功能
4.4：課後練習操作
4.1：Linux 傳統權限
Linux 權限的目的是在『保護某些人的檔案資料』，因此，讀者在認識『權限』的角度上，應該要思考的是『這個檔案的權限設定後， 會造成哪個個人？或某群人的讀寫開放或保護』。所以，這些權限最終都是『應用在某個/某群帳號』上面！而且，權限都是『設定在檔案/目錄』上， 不是設定在帳號上面的，這也要先釐清。

4.1.1：使用者、群組與其他人
Linux 的檔案權限在設定上，主要依據三種身份來決定，包括：

user / owner / 檔案擁有者 / 使用者：就是檔案所屬人
group / 群組：這個檔案附屬於那一個群組團隊
others / 其他人：不是 user 也沒加入 group 的帳號，就是其他人。
底下以一個小案例來說明這三種身份的用法。

假設讀者還在學校當老師，你有一本書要讓班上同學借閱，但你又不想管，此時你會如何決定『這本書 (檔案)』的命運？ 通常的作法是：

使用者：讓某個學生當小老師，這本書就歸他管 (使用者)，同學要借得要透過這位小老師
群組：任何加入本班的同學 (一群帳號) 都是本班群組，這本書對本班群組的同學來說，大家都能借閱。
其他人：不是本班的同學，例如隔壁班的阿花與阿咪，對這本書來說，他們都是屬於『其他人』，其他人沒有權限可以借閱這本書。
由上面這個簡單的小案例，讀者應該能夠知道，Linux 上面的檔案『都是針對帳號』來進行管理的， 只是為了方便管理上的設定 (班級同學與非本班其他同學) ，因此又將非本人的所有帳號分為兩類，一類是加入使用者所設定的群組， 一個則是沒有加入群組的其他人。

檔案權限的觀察
單純的檔案權限觀察，可以使用 ls -l 或 ll 來查閱，底下為查詢系統 /var/spool/mail 這個目錄的權限方式：

[student@localhost ~]$ ls -ld /var/spool/mail
drwxrwxr-x. 2 root mail 4096  6月 29 03:29 /var/spool/mail
[    A    ][B][C ] [D ] [E ]  [    F     ] [    G        ]
簡單的分析，上述的資料共有七個欄位，每個欄位的意義為：

檔案類型與權限，第 1 個字元為檔案類型，後續 9 個字元每 3 個一組，共分 3 組，為三種身份的權限；
檔案連結數，這與檔案系統有關，讀者可暫時略過；
該檔案的擁有者，本例當中，擁有者身份為 root
該檔案的所屬群組，本例當中這個檔案屬於 mail 這個群組底下
這個檔案的容量
該檔案最後一次被修改/修訂的日期時間
這個檔案的檔名。
讀者首先可以分析一下這個『檔案』的『類型』。之前讀者應該看過第一個字元為 - 以及 d 的表示方式，事實上還有很多常見的檔案類型， 底下僅為常見的類型介紹：

-: 代表後面的檔名為一般檔案
d: 代表後面的檔名為目錄檔
l: 代表後面的檔名為連結檔 (有點類似 windows 的捷徑概念)
b: 代表後面的檔名為一個裝置檔，該裝置主要為區塊裝置，亦即儲存媒體的裝置較多
c: 代表後面的檔名為一個週邊裝置檔，例如滑鼠、鍵盤等
所以讀者可以知道 /var/spool/mail 為一個目錄檔案 (d 開頭，為 directory 的縮寫)。確定了檔案類型後，接下來的 9 個字元都是 rwx 與減號而已， 從這 9 個字元判斷，讀者大概可以猜出 rwx 的意義為：

r: read，可讀的意思
w: write，可寫入/編輯/修改的意思
x: eXecutable，可以執行的意思
只不過 rwx 該如何與 root, mail 這個使用者與群組套上關係？我們可以使用下圖來查閱第 1, 3, 4 個欄位的相關性：

使用者、群組與權限的相關性
圖4.1-1、使用者、群組與權限的相關性
如上圖所示，第一組為檔案擁有者的權限，第二組為檔案擁有群組的權限，第三組為不是擁有者也沒有加入該群組的其他人權限。 所以上述的檔案權限為：

擁有者為 root，root 具有 rwx 的權限 (第一組權限)
群組設定為 mail，則所有加入 mail 這個群組的帳號可以具有 rwx 的權限 (第二組權限)
不是 root 也沒有加入 mail 的其他人 (例如 student 這個帳號) 具有 rx 的權限 (第三組權限)
例題：
若有一個檔案的類型與權限資料為『-rwxr-xr--』，請說明其意義為何？
答：
先將整個類型與權限資料分開查閱，並將十個字元整理成為如下所示：
[-][rwx][r-x][r--]
 1  234  567  890
 1 為：代表這個檔名為目錄或檔案，本例中為檔案(-)；
234為：擁有者的權限，本例中為可讀、可寫、可執行(rwx)；
567為：同群組使用者權限，本例中為可讀可執行(rx)；
890為：其他使用者權限，本例中為可讀(r)，就是唯讀之意

同時注意到，rwx所在的位置是不會改變的，有該權限就會顯示字元，沒有該權限就變成減號(-)。

例題：
假設有帳號資料如下：
帳號名稱  加入的群組
test1     test1, testgroup
test2     test2, testgroup
test3     test3, testgroup
test4     test4
如果有下面兩個檔案，請分別說明 test1, test2, test3, test4 針對底下兩個檔案的權限各為何？
-rw-r--r--  1 root     root          238 Jun 18 17:22 test.txt 
-rwxr-xr--  1 test1    testgroup    5238 Jun 19 10:25 ping_tsai
答：
檔案test.txt的擁有者為root，所屬群組為root。至於權限方面則只有root這個帳號可以存取此檔案，其他人則僅能讀此檔案。 由於 test1, test2, test3, test4 既不是 root 本人，也沒有加入 root 群組，因此四個人針對這個 test.txt 的檔案來說，都屬於其他人， 僅有可讀 (r) 的權限。

另一個檔案ping_tsai的擁有者為test1，而所屬群組為testgroup。其中：
test1 就是這個 ping_tsai 的擁有者，因此具有可讀、可寫、可執行的權力(rwx)
test2 與 test3 都不是 test1，但是兩個都有加入 testgroup 群組，因此 test2 與 test3 參考的權限為群組權限，亦即可讀與可執行 (rx)，但不可修改 (沒有 w 的權限)
test4 不是 test1 也沒有加入 testgroup 群組，因此 test4 參考其他人的權限，亦即可讀 (r)
觀察帳號與權限的相關指令
如上面例題，讀者可以知道 test1 屬於 test1 及 testgroup 群組，所以可以理解帳號與權限的相關性。不過在實際的系統操作中， 若想知道帳號所屬的群組，可以使用 id 這個指令來觀察即可理解。

例題：
承上題，student 這個帳號對於 ping_tsai 來說，具有什麼權限？
答：
首先需要了解 student 的所屬群組，可使用 id 這個指令來查詢即可 (直接於指令列輸入 id 即可)
id 的輸出結果為『uid=1000(student) gid=1000(student) groups=1000(student),10(wheel)』，其中 groups 指的就是所有支援的群組。
由 id 的輸出中，發現 student 並沒有加入 testgroup 群組，因此 student 針對 ping_tsai 為『其他人』亦即僅有 r 的權限。
而除了 id 可以觀察帳號與權限的相關性，在檔案類型部份，可以使用前一堂課談到的 file 來查詢。

例題：
請使用 file 查詢 /etc/rc1.d, /etc/passwd, /dev/vda, /dev/zero 個別代表什麼類型的檔案？ 同時使用 ls -l 搭配看最前面的檔案類型字元為何。
使用 ls -l 可以很快速的看到檔案屬性、權限的概觀，不過，其實讀者也能使用 getfacl 這個指令來了解檔案的相關屬性與權限。 如下所示，同樣使用 /var/spool/mail 作為範本：

[student@localhost ~]$ getfacl /var/spool/mail
getfacl: Removing leading '/' from absolute path names
# file: var/spool/mail   <==檔名
# owner: root            <==檔案擁有者
# group: mail            <==檔案群組
user::rwx                <==使用者的權限
group::rwx               <==同群組帳號的權限
other::r-x               <==其他人的權限
透過 getfacl 可以更清楚的查詢到檔案的擁有者與相關的權限設定，只不過就沒有檔案的類型、修改的時間等參數。


4.1.2：檔案屬性與權限的修改方式
檔案的權限與屬性的修改，若以 ls -l 的輸出來說，則每個部份可以修改的指令參照大致如下：

[student@localhost ~]$ cd /dev/shm/
[student@localhost shm]$ touch checking
[student@localhost shm]$ ls -l checking
-rw-rw-r--. 1 student student 0  6月 30 15:16 checking
 [ chmod ]    [chown] [chgrp]    [   touch  ] [  mv  ]
由於一般帳號僅能修改自己檔案的檔名、時間與權限，無法隨意切換使用者與群組的設定。因此底下的例題中， 讀者應該使用 root 的身份來進行處理，方可順利進行。首先，切換身份成為 root ，並且將工作目錄切換到 /dev/shm。

[student@localhost shm]$ su -
password:
[root@localhost ~]# cd /dev/shm
[root@localhost shm]# ll checking
-rw-rw-r--. 1 student student 0  6月 30 15:16 checking
使用 chown 修改檔案擁有者
查詢系統中是否有名為 daemon 的帳號，如果存在該帳號，請將 checking 的使用者改為 daemon 所擁有，而非 student 所擁有。

[root@localhost shm]# id daemon
uid=2(daemon) gid=2(daemon) groups=2(daemon)

[root@localhost shm]# chown daemon checking
[root@localhost shm]# ll checking
-rw-rw-r--. 1 daemon student 0  6月 30 15:16 checking
其實 chown 的功能非常多，chown 也可以用來進行群組的修改，也能同時修改檔案擁有者與群組。建議讀者們應該 man chown 查詢相關語法。

使用 chgrp 修改檔案擁有的群組
系統的群組都紀錄在 /etc/group 檔案內，若想要了解系統是否存在某個群組，可以使用 grep 這個關鍵字擷取指令來查詢。 舉例來說，當系統內有 bin 這個群組時，就將 checking 的群組改為 bin 所有，否則就不予修改。

[root@localhost shm]# grep myname /etc/group
# 不會出現任何資訊，因為沒有這個群組存在的意思。

[root@localhost shm]# grep bin /etc/group
bin:x:1:        <==代表確實有這個群組存在！

[root@localhost shm]# chgrp bin checking
[root@localhost shm]# ll checking
-rw-rw-r--. 1 daemon bin 0  6月 30 15:16 checking
使用 chmod 搭配數字法修改權限
由於檔案紀錄了三種身份，每種身份都擁有 rwx 的最大權限與 --- 沒權限的情況。為了搭配性的方便，於是使用 2 位元的方法來記憶！ 亦即是 2 進位的情況：

r ==> read    ==> 22 ==> 4
w ==> write   ==> 21 ==> 2
x ==> eXecute ==> 20 ==> 1
於是每種身份最低為 0 分，最高則為 r+w+x --> 4+2+1 --> 7 分！而因為有 3 種身份，因此使用者,群組,其他人的身份， 最多為 777 最少為 000 。以上述 checking 的分數來說，使用者為 rw=6, 群組為 rw=6，其他人為 r=4，亦即該檔案權限為 664。

例題：讓 daemon 可讀、可寫、可執行 checking，讓加入 bin 群組的用戶可唯讀該檔案，讓其他人沒有權限！
daemon 為使用者，可讀可寫可執行則為 rwx = 7
加入 bin 的群組為唯讀，亦即為 r-- = 4
其他人沒權限，因此為 --- = 0
最終可以使用『 chmod 740 checking 』修改權限
[root@localhost shm]# chmod 740 checking
[root@localhost shm]# ll checking
-rwxr-----. 1 daemon bin 0  6月 30 15:16 checking
使用 chmod 搭配符號法修改權限
另外，讀者也能夠透過直觀的方式來進行權限的設定，亦即使用 u,g,o 代表使用者、群組與其他人， 然後使用 +, -, = 來加入/減少/直接設定權限，使用表列方式說明如下：

chmod	u(user)
g(group)
o(other)
a(all)	+(加入)
-(減去)
=(設定)	r
w
x	檔案或目錄
舉例來說，讓 daemon 可讀可寫可執行 checking 檔案，bin 群組的用戶們為可讀可寫，其他人則為可讀，使用符號法的處理方式：

[root@localhost shm]# chmod u=rwx,g=rw,o=r checking
[root@localhost shm]# ll checking
-rwxrw-r--. 1 daemon bin 0  6月 30 15:16 checking
其他屬性的修改
假如讀者需要修改時間參數與檔名，就得要使用 touch 與 mv 這兩個指令了。舉例來說，讓 checking 的修改日期改到 5 月 5 日的中午 12 點， 實驗的方式如下：

[root@localhost shm]# touch -t 05051200 checking
[root@localhost shm]# ll checking
-rwxrw-r--. 1 daemon bin 0  5月  5 12:00 checking
至於檔名的修改則是前一堂課談到的 mv 這個指令。

例題：
使用 root 身份，並且移動工作目錄到 /dev/shm
將 /etc/fstab 複製到 /dev/shm 底下
將 /dev/shm/fstab 更改檔名成為 newfs
讓 newfs 的用戶成為 sshd 、群組成為 wheel
sshd 這個帳號可讀、可寫 newfs，wheel 群組成員僅可讀，其他人則無任何權限
讓這個檔案的日期設定為前一天的 13:30 (日期請依據實際日期來指定)。
讓所有的人都可以執行 newfs 這個檔案 (請使用符號法，同時不要更動到既有的權限！)

4.2：基礎帳號管理
帳號管理是系統管理員很重要的一個任務，例如學校的教學環境中，教師通常需要預先建置學生的帳號，以方便學期間上課使用。 公司行號一樣也需要讓管理員建置好員工的帳號密碼，才能讓員工順利的辦公。此外，『將帳號分組』也是很重要的一項工作。

4.2.1：簡易帳號管理
讀者應該還記得，要登入系統的時候，需要輸入兩個資料，一個是點選帳號名稱，再來則是輸入該帳號的密碼。 因此，最簡單的帳號管理，即是建立帳號與給予密碼的任務。

請讀者嘗試建立一個名為 myuser1 的帳號，以及給予 MypassworD 的密碼，方式如下：

[root@localhost ~]# useradd  myuser1
[root@localhost ~]# passwd  myuser1
Changing password for user myuser1.
New password:          <==此處輸入密碼
BAD PASSWORD: The password fails the dictionary check - it is based on a dictionary word
Retype new password:   <==再輸入密碼一次
passwd: all authentication tokens updated successfully.

[root@localhost ~]# id myuser1
uid=1014(myuser1) gid=1015(myuser1) groups=1015(myuser1)
由於系統管理員可以給予帳號任意的密碼，因此雖然 MypassworD 並不是一個好密碼，不過系統還是予以接受。 而若帳號設定錯誤，可以使用 userdel 刪除帳號，例如：

[root@localhost ~]# userdel -r myuser1
加上 -r 的目的是要該帳號連同家目錄與電子郵件新件夾通通刪除的意思。如果忘記加上 -r 的話，那就需要手動刪除用戶的家目錄與郵件檔案。 底下的例題為重要的帳號管理注意事項，請依序進行下列例題，並自行嘗試解決錯誤。

例題：
建立名為 myuser2 的帳號，該帳號密碼為 mypassWORD
建立名為 myuser3 的帳號，該帳號密碼為 mypassWORD
觀察 myuser2 與 myuser3 的 id 情況
觀察 /home 與 /var/spool/mail 這兩個目錄的內容，是否有名為 myuser2 及 myuser3 的檔名存在？
使用 userdel myuser2 刪除帳號 (注意，不要加上 -r 的參數)
再次觀察 /home 與 /var/spool/mail 的內容，myuser2 檔名是否存在？該檔名的權限為何？
重新建立名為 myuser2 的帳號，密碼亦同為 mypassWORD，嘗試討論 (1)建立過程中出現的問題原因為何？ (2)是否能夠順利建立該帳號？
承上，請在 tty2 以後的終端機，使用 myuser2 登入系統，登入後是否出現問題？為什麼？
再次使用 userdel -r 的方式刪除 myuser2 與 myuser3，是否能夠順利刪除？
承上，若無法順利刪除帳號，請以手動的方式自行刪除餘留的使用者家目錄與郵件檔案。

4.2.2：帳號與群組關聯性管理
若需要建立帳號時，給予帳號一個次要的群組支援，就需要先行建置群組。舉例而言，以學校專題製作為例，有三個帳號 prouser1, prouser2, prouser3 加入共有的群組 progroup 時，該如何建立？首先，應該要先建立群組，透過 groupadd 來處理，再來則是透過 useradd --help 找到次要群組支援的選項為 -G 的項目， 即可建立好群組、帳號與密碼。同時，管理員可以透過 passwd --help 找到 --stdin 的選項來操作密碼的給予。整體流程如下：

[root@localhost ~]# groupadd progroup
[root@localhost ~]# grep progroup /etc/group
progroup:x:1016:   <==確定有 progroup 在設定檔當中了

[root@localhost ~]# useradd -G progroup prouser1
[root@localhost ~]# useradd -G progroup prouser2
[root@localhost ~]# useradd -G progroup prouser3
[root@localhost ~]# id prouser1
uid=1015(prouser1) gid=1017(prouser1) groups=1017(prouser1),1016(progroup)

[root@localhost ~]# echo mypassword
mypassword    <== echo 會將訊息從螢幕上輸出

[root@localhost ~]# echo mypassword | passwd --stdin prouser1
Changing password for user prouser1.
passwd: all authentication tokens updated successfully.
[root@localhost ~]# echo mypassword | passwd --stdin prouser2
[root@localhost ~]# echo mypassword | passwd --stdin prouser3
讀者可以發現到使用 passwd --stdin 的方式來給予密碼時，密碼會紀錄到螢幕與 history 的環境中，因此不見得適用於所有需要資安的系統中。 不過對於大量建置帳號時，會是一個很好用的工具。

另外，如果建立好帳號之後才想到要修改群組資源時，不需要刪除帳號再重建，此時可以透過 usermod 來進行修改。舉例來說，當 prouser1 還需要加入 student 群組時， 可以使用 usermod -G 的方式來處理！不過需要留意到 -a 的選項才行。

例題：
使用 usermod -G student prouser1 將 prouser1 加入 student 群組的支援
使用 id prouser1 發現什麼？原本的 progroup 是否依舊存在？
請使用 usermod --help 查詢 -a 的選項功能為何？
請使用 usermod -a -G progroup prouser1 來延伸給予群組
再次使用 id prouser1 查閱目前 prouser1 是否有支援三個群組？

4.3：帳號與權限用途
使用者能使用系統上面的資源與權限有關，因此簡易的帳號管理之後，就需要與權限搭配設計。

4.3.1：單一用戶所有權
一般用戶只能夠修改屬於自己的檔案的 rwx 權限，因此，若 root 要協助複製資料給一般用戶時，需要特別注意該資料的權限。 例如底下的範例中，管理員要將 /etc/scuretty 複製給 student 時，需要注意相關的事宜如下：

[root@localhost ~]# ls -l /etc/securetty
-rw-------. 1 root root 221 Aug 12  2015 /etc/securetty  <==一般用戶根本沒權限

[root@localhost ~]# cp /etc/securetty ~student/
[root@localhost ~]# ls -l ~student/securetty
-rw-------. 1 root root 221 Jul  1 19:33 /home/student/securetty

[root@localhost ~]# chown student.student ~student/securetty
[root@localhost ~]# ls -l ~student/securetty
-rw-------. 1 student student 221 Jul  1 19:33 /home/student/securetty
原本 root 複製資料給 student 時，若沒有考量到權限，則 student 依舊無法讀取該檔案的內容，這在資料的複製行為上，需要特別注意才行。

另外，如果使用者想要自己複製指令，或者是進行額外的工作任務，可以將指令移動到自己的家目錄來處理， 例如 student 想要將 ls 複製成為 myls 並且直接執行 myls 來運作系統，可以這樣處理：

[student@localhost ~]$ cp /bin/ls myls
[student@localhost ~]$ ls -l myls
-rwxr-xr-x. 1 student student 117616  7月  1 19:37 myls

[student@localhost ~]$ chmod 700 myls
[student@localhost ~]$ ls -l myls
-rwx------. 1 student student 117616  7月  1 19:37 myls

[student@localhost ~]$ myls
bash: myls: 找不到指令...

[student@localhost ~]$ ./myls
bin  myipshow.txt  myls  securetty  下載  公共  圖片  影片  文件  桌面  模板  音樂

[student@localhost ~]$ mkdir bin
[student@localhost ~]$ mv myls bin
[student@localhost ~]$ myls
bin  myipshow.txt  securetty  下載  公共  圖片  影片  文件  桌面  模板  音樂
若僅想要讓自己執行，可以將權限改為 700 之類的模樣。而『在本目錄執行』則需要使用『 ./command 』的型態來執行， 若想要直接輸入指令即可，那需要放入使用者自己家目錄下的 bin 子目錄才行 (與 $PATH 變數有關)。因此本範例中，最終將 myls 移動到 /home/student/bin/ 目錄下。

例題：
讓 student 帳號直接執行 mymore 即可達成與 more 相同功能的目的 (亦即將 more 複製成為 mymore ，並放置到正確的位置即可)

4.3.2：群組共用功能
某些情境下，群組可能需要共享某些檔案資料。舉例來說，在學校做專題時，同組專題成員可能需要個別的帳號，不過卻需要一個共享的目錄， 讓大家可以共同分享彼此的專題成果。舉例來說， progroup 成員 prouser1, prouser2, prouser3 (前小節建置的帳號資料)，需要共用 /srv/project1/ 的目錄， 則該目錄的建置與共享可以使用如下的方式來達成：

[root@localhost ~]# mkdir /srv/project1
[root@localhost ~]# chgrp progroup /srv/project1
[root@localhost ~]# chmod 770 /srv/project1
[root@localhost ~]# ls -ld /srv/project1
drwxrwx---. 2 root progroup 6  7月  1 19:46 /srv/project1
此時 progroup 的成員即可在 project1 目錄內進行任何動作。但 770 並非最好的處理方式，下一堂課讀者們將會學習到 SGID 的功能， 屆時才會學到較為正確的權限設定。

除了共享目錄之外，在執行檔的可執行權限設計上，也能夠針對群組來給予可執行權，讓其他人不可隨意執行共用的指令。 例如讓 mycat 執行與 cat 相同的結果，但是僅有 progroup 的用戶能夠執行，可以這樣執行：

[root@localhost ~]# which cat
/bin/cat
[root@localhost ~]# echo $PATH
/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
[root@localhost ~]# cp /bin/cat /usr/local/bin/mycat
[root@localhost ~]# ll /usr/local/bin/mycat
-rwxr-xr-x. 1 root root 54048  7月  1 22:16 /usr/local/bin/mycat

[root@localhost ~]# chgrp progroup /usr/local/bin/mycat
[root@localhost ~]# chmod 750 /usr/local/bin/mycat
[root@localhost ~]# ll /usr/local/bin/mycat
-rwxr-x---. 1 root progroup 54048  7月  1 22:16 /usr/local/bin/mycat
接下來，請讀者分別以 student 與 prouser1 的身份執行一次『 mycat /etc/hosts 』，即可發現不同點了。

例題：student 有個群組名為 student，任何加入 student 的用戶可以在 /srv/mystudent/ 目錄中進行任何動作，但沒加入 student 的用戶，僅能讀與執行，不能寫入。
先建立 /srv/mystudent 目錄
修改上述目錄的群組成為 student，並觀察有沒有執行成功
最後權限應該更改為幾分才對？

4.4：課後練習操作
前置動作：請使用 unit04 的硬碟進入作業環境，並請先以 root 身分執行 vbird_book_setup_ip 指令設定好你的學號與 IP 之後，再開始底下的作業練習。

請使用 root 的身份進行如下實做的任務。直接在系統上面操作，操作成功即可，上傳結果的程式會主動找到你的實做結果。

請將底下的答案寫入 /root/ans04.txt 的檔案中：
系統內有名為 /examdata/exam.check 的檔案，這個檔案的 (1)擁有者、 (2)群組 各為何？且 (3)權限是幾分？
承上，該檔案的檔案類型是什麼？
承上，請問 student 對於 exam.check 這個檔案來說，具有什麼權限？(寫下 rwx 或 --- 等權限標誌即可)
請『依序』進行如下的帳號管理任務：
建立三個用戶，帳號名稱分別為： examuser1, examuser2, examuser3 ，三個人都加入 examgroup 的次要群組支援，同時三個用戶的密碼都是『 ItIsExam 』。 (i 與 e 都是大寫字元)
建立一個用戶，帳號名稱為 examuser4，密碼為『 ItIsExam 』但這個帳號沒加入 examgroup 群組
請刪除系統中的 examuser5 這個帳號，同時將這個帳號的家目錄與郵件檔案同步刪除。
有個帳號 myuser1 不小心被管理員刪除了，但是這個帳號的家目錄與相關郵件都還存在。請參考這個帳號可能的家目錄所保留的 UID 與 GID， 並嘗試以該帳號原有的 UID/GID 資訊來重建該帳號。而這個帳號的密碼請給予 ItIsExam 的樣式。(相關建置帳號的指令，請參考 man useradd 等線上文件的說明)
讓 examuser1 額外加入 student 這個群組，亦即 examuser1 至少有加入 examgroup 與 student 群組
請進行如下的權限管理任務：
使用 root 將 /etc/securetty 複製給 examuser4，且這個帳號要能夠完整使用該檔案才行。
建立一個空的檔案，檔名為 /srv/examcheck.txt，這個檔案可以讓 examuser1 完整的使用，而 examuser2 與 examuser3 可以讀取，但不能執行與寫入， 至於 examuser4 什麼權限都沒有。
examgroup 群組的成員想要共用 /srv/examdir 目錄，而沒有加入 examgroup 的其他人不具備任何權限，應該如何處理？
/usr/local/bin/mymore 複製來自 /bin/more，但我只想要讓 examgroup 的成員能夠執行 /usr/local/bin/mymore 這個指令，其他人不能執行這個指令。
建立一個名為 /examdata/change.txt 的空檔案，這個檔案的擁有者為 sshd，擁有群組為 users，sshd 可讀可寫，users 群組成員可讀， 其他人沒權限。且這個檔案的修改日期請調整成 2012 年 12 月 21 日 (日期正確即可，時間隨便)
作業結果傳輸：請以 root 的身分執行 vbird_book_check_unit 指令上傳作業結果。 正常執行完畢的結果應會出現【XXXXXX;aa:bb:cc:dd:ee:ff;unitNN】字樣。若需要查閱自己上傳資料的時間， 請在作業系統上面使用： http://192.168.251.250 檢查相對應的課程檔案。

-----

#### Footer
Copyrights | EZMarkDown Studio &copy; 2021

-----

<span class="d-block mt-5"></span>