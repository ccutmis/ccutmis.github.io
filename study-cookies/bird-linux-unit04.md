# 鳥哥 Linux CH4 基礎檔案權限與基礎帳號管理

## 4.1 Linux 傳統權限
* user / owner / 檔案擁有者 / 使用者 : 就是檔案所屬人
* group / 群組 : 這個檔案附屬於哪一個群組團隊
* others / 其它人 : 不是 user 也沒加入 group 的帳號就是其它人

單純的檔案權限觀察:可以用 `ls -l` 或 `ll` 來查詢，底下是查詢系統 /var/spool/mail 這個目錄的權限方式:

```
$ ls -ld /var/spool/mail
drwxrwxr-x. 2 root mail 4096 6月 29 03:29 /var/spool/mail
[   a     ][b] [c] [d]  [e]  [     f    ] [      g      ]
```
* a: 檔案類型與權限
	* 檔案類型: -代表一般檔案 d代表目錄檔 l代表連結檔 b代表裝置檔 c代表週邊裝置檔
	* r:read w:write x:eXectuable
* b: 檔案連結數
* c: 檔案的擁有者
* d: 檔案所屬群組
* e: 這個檔案的容量
* f: 該檔案最後一次被修改/修訂的時間
* g: 檔案的檔名

要了解帳號所屬群組，可以透過 id 這個指令來查詢，例如:

`id aloha3307`

結果:

`uid=1001(aloha3307) gid=1001(aloha3307) groups=1001(aloha3307)`

用 ls -l 可以很快速查詢檔案權限，不過也可以透過 getfacl 這個指令來了解檔案相關屬性，例如:
```
$ getfacl /var/spool/mail
getfacl: Removing leading '/' from absolute path names
# file: var/spool/mail   <==檔名
# owner: root            <==檔案擁有者
# group: mail            <==檔案群組
user::rwx                <==使用者的權限
group::rwx               <==同群組帳號的權限
other::r-x               <==其他人的權限
```

一般帳號只能修改自己檔案檔名時間與權限等，無法隨意切換使用者與群組的設定。因此底下的例題中，我們切換身份到root，並將工作目錄切換到 /dev/shm

## 4-2 簡易帳號管理:

### 新增帳號:

```
# useradd myuser1
# myuser1 passwd myuser1
Changing password for user myuser1.
New password:          <==此處輸入密碼
BAD PASSWORD: The password fails the dictionary check - it is based on a dictionary word
Retype new password:   <==再輸入密碼一次
passwd: all authentication tokens updated successfully.

# id myuser1
uid=1014(myuser1) gid=1015(myuser1) groups=1015(myuser1)
```

### 刪除帳號:


```
# userdel -r myuser1
```

加上 -r 的目的是要該帳號連同家目錄與電子垂件新件夾通通刪除的意思，如果忘記加上 -r 的話，那就要手動刪除用戶的家目錄跟郵件檔案。

### 帳號與群組關聯性管理

若需要建立帳號時，給予帳號一個次要的群組支援，就需要先行建置群組。舉例而言，以學校專題製作為例，有三個帳號 prouser1, prouser2, prouser3 加入共有的群組 progroup 時，該如何建立？首先，應該要先建立群組，透過 groupadd 來處理，再來則是透過 useradd --help 找到次要群組支援的選項為 -G 的項目， 即可建立好群組、帳號與密碼。同時，管理員可以透過 passwd --help 找到 --stdin 的選項來操作密碼的給予。整體流程如下：

```
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
```

## 4-3 帳號與權限用途

使用者能使用系統上面的資源與權限有關，因此簡易的帳號管理之後，就需要與權限搭配設計。

### 單一用戶所有權

一般用戶只能夠修改屬於自己的檔案的 rwx 權限，因此，若 root 要協助複製資料給一般用戶時，需要特別注意該資料的權限。 例如底下的範例中，管理員要將 /etc/scuretty 複製給 student 時，需要注意相關的事宜如下：

```
[root@localhost ~]# ls -l /etc/securetty
-rw-------. 1 root root 221 Aug 12  2015 /etc/securetty  <==一般用戶根本沒權限

[root@localhost ~]# cp /etc/securetty ~student/
[root@localhost ~]# ls -l ~student/securetty
-rw-------. 1 root root 221 Jul  1 19:33 /home/student/securetty

[root@localhost ~]# chown student.student ~student/securetty
[root@localhost ~]# ls -l ~student/securetty
-rw-------. 1 student student 221 Jul  1 19:33 /home/student/securetty
```

原本 root 複製資料給 student 時，若沒有考量到權限，則 student 依舊無法讀取該檔案的內容，這在資料的複製行為上，需要特別注意才行。

另外，如果使用者想要自己複製指令，或者是進行額外的工作任務，可以將指令移動到自己的家目錄來處理， 例如 student 想要將 ls 複製成為 myls 並且直接執行 myls 來運作系統，可以這樣處理：

```
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
```

若僅想要讓自己執行，可以將權限改為 700 之類的模樣。而『在本目錄執行』則需要使用『 ./command 』的型態來執行， 若想要直接輸入指令即可，那需要放入使用者自己家目錄下的 bin 子目錄才行 (與 $PATH 變數有關)。因此本範例中，最終將 myls 移動到 /home/student/bin/ 目錄下。


### 群組共用功能

某些情境下，群組可能需要共享某些檔案資料。舉例來說，在學校做專題時，同組專題成員可能需要個別的帳號，不過卻需要一個共享的目錄， 讓大家可以共同分享彼此的專題成果。舉例來說， progroup 成員 prouser1, prouser2, prouser3 (前小節建置的帳號資料)，需要共用 /srv/project1/ 的目錄， 則該目錄的建置與共享可以使用如下的方式來達成：

```
[root@localhost ~]# mkdir /srv/project1
[root@localhost ~]# chgrp progroup /srv/project1
[root@localhost ~]# chmod 770 /srv/project1
[root@localhost ~]# ls -ld /srv/project1
drwxrwx---. 2 root progroup 6  7月  1 19:46 /srv/project1
```

此時 progroup 的成員即可在 project1 目錄內進行任何動作。但 770 並非最好的處理方式，下一堂課讀者們將會學習到 SGID 的功能， 屆時才會學到較為正確的權限設定。

除了共享目錄之外，在執行檔的可執行權限設計上，也能夠針對群組來給予可執行權，讓其他人不可隨意執行共用的指令。 例如讓 mycat 執行與 cat 相同的結果，但是僅有 progroup 的用戶能夠執行，可以這樣執行：

```
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
```

接下來，請讀者分別以 student 與 prouser1 的身份執行一次『 mycat /etc/hosts 』，即可發現不同點了。


