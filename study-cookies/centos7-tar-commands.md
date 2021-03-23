# CentOS7 常用文件操作與壓縮命令

在鳥哥的Linux私房菜 Ch8-8 開始介紹 tar 指令相關運用

## 打包指令: tar

這邊列出最常用的相關參數，更多選項可自行 man tar 查看:
* -c : 建立打包文件 可搭配 -v 來查看過程中被打包的檔名(filename)
* -t : 查看打包檔案的內容包含哪些檔名，重點在查看"檔名"就是了
* -x : 解打包或解壓縮的功能，可搭配 -C (大寫) 在特定目錄解開
* **特別注意的是，-c,-t,-x不可同時出現在一串指令中**
* -z : 透過 gzip 的支援進行壓縮/解壓縮，檔名最好為 *.tar.gz
* -j : 透過 bzip2 的支援進行壓縮/解壓縮，檔名最好為 *.tar.bz2
* -J : 透過 xz 的支援進行壓縮/解壓縮，檔名最好為 *.tar.xz
* **特別注意的是，-z,-j,-J不可同時出現在一串指令中**
* -v : 在壓縮/解壓的過程中，將正在處理的檔名顯示出來
* -f filename : 在 -f 的後面立刻接要被處理的檔名(例如 `-f ./test.tar.gz` )
* -C 目錄 : 這個選項用在解壓縮，若要在特定的目錄解壓縮可以使用這個選項。
* -p(小寫) : 保留備份資料的原本權限與屬性，常用於備份(-c)重要的設定檔。
* -P(大寫) : 保留絕對路徑，亦即允許備份資料中含有根目錄存在之意。
* --exclude=FILE : 在壓縮的過程中，不要將 FILE 打包!

## tar 指令範例:
1. 壓縮: `tar -jcv -f filename.tar.bz2 要被壓縮的檔案或目錄名`
2. 查詢: `tar -jtv -f filename.tar.bz2`
3. 解壓縮: `tar -jxv -f filename.tar.bz2 要解壓縮的目錄`

-----

reference url : [https://www.imydl.tech/linux/87.html](https://www.imydl.tech/linux/87.html)

管理centos服务器的时候常会对文件进行一些常规操作，除了ftp之外了解在ssh下必要的文件操作命令那也是必不可少的，以下摘录一些常用的文件操作命令：

## 文件操作：
* `ls` 查看目录中的文件
* `ls -F` 查看目录中的文件
* `ls -l` 显示文件和目录的详细资料
* `ls -a` 显示隐藏文件
* `ls *[0-9]*` 显示包含数字的文件名和目录名
* `rm go.tar` 删除go.tar文件
* `find mt.cgi` 查找文件名为mt.cgi的文件
* `df ?h` 查看磁盘剩余空间
* `find / -name xxx -print` 查找xxx文件

## 压缩与解压缩：
* `tar xvf wordpress.tar` 解压tar格式的文件
* `tar -tvf myfile.tar` 查看tar文件中包含的文件
* `tar cf toole.tar tool` 把tool目录打包为toole.tar文件
* `tar cfz xwyme.tar.gz tool` 把tool目录打包且压缩为xwyme.tar.gz文件，因为.tar文件几乎是没有压缩过的，MT的.tar.gz文件解压成.tar文件后差不多是10MB
* `tar jcvf /var/bak/www.tar.bz2 /var/www/` ####创建.tar.bz2文件，压缩率高
* `tar xjf www.tar.bz2` 解压tar.bz2格式
* `gzip -d ge.tar.gz` 解压.tar.gz文件为.tar文件
* `unzip phpbb.zip` 解压zip文件，windows下要压缩出一个.tar.gz格式的文件还是有点麻烦的####
* `bunzip2 file1.bz2` 解压一个叫做 ‘file1.bz2′的文件
* `bzip2 file1` 压缩一个叫做 ‘file1′ 的文件
* `gunzip file1.gz` 解压一个叫做 ‘file1.gz’的文件
* `gzip file1` 压缩一个叫做 ‘file1′的文件
* `gzip -9 file1` 最大程度压缩
* `rar a file1.rar test_file` 创建一个叫做 ‘file1.rar’ 的包
* `rar a file1.rar file1 file2 dir1` 同时压缩 ‘file1′, ‘file2′ 以及目录 ‘dir1′
* `rar x file1.rar` 解压rar包
* `unrar x file1.rar` 解压rar包
* `tar -cvf archive.tar file1` 创建一个非压缩的 tarball
* `tar -cvf archive.tar file1 file2 dir1` 创建一个包含了 ‘file1′, ‘file2′ 以及 ‘dir1′的档案文件
* `tar -tf archive.tar` 显示一个包中的内容
* `tar -xvf archive.tar` 释放一个包
* `tar -xvf archive.tar -C /tmp` 将压缩包释放到 /tmp目录下
* `tar -cvfj archive.tar.bz2 dir1` 创建一个bzip2格式的压缩包
* `tar -xvfj archive.tar.bz2` 解压一个bzip2格式的压缩包
* `tar -cvfz archive.tar.gz dir1` 创建一个gzip格式的压缩包
* `tar -xvfz archive.tar.gz` 解压一个gzip格式的压缩包
* `zip file1.zip file1` 创建一个zip格式的压缩包
* `zip -r file1.zip file1 file2 dir1` 将几个文件和目录同时压缩成一个zip格式的压缩包
* `unzip file1.zip` 解压一个zip格式压缩包