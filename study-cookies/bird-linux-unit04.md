# 鳥哥 Linux 基礎檔案權限與基礎帳號管理

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

新增帳號:
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

刪除帳號:

```
# userdel -r myuser1
```

加上 -r 的目的是要該帳號連同家目錄與電子垂件新件夾通通刪除的意思，如果忘記加上 -r 的話，那就要手動刪除用戶的家目錄跟郵件檔案。



