# Golang 學習筆記
-----
## 目錄 :
1. Golang教學資源列表
2. 學習筆記
3. 備註
-----
## Golang教學資源列表 :
1. [彭彭的課程:Golang入門教學課程](https://www.youtube.com/playlist?list=PL-g0fdC5RMbo9bdRzbKaCWYC2mXg2eEZE)
2. [土妹編程:Go語言10分鐘入門知識點總結](https://www.youtube.com/watch?v=Ws92ms0JASE)
3. [MichaelChen:程式設計教學](https://michaelchen.tech/golang-programming/)
4. []()
-----

## 學習筆記 :

### 第一個程式範例 : Hello哪次不Hello
#### 步奏一: 建立一個文件命名為 hello.go 貼入下列內容
```
// 這是單行註解
// 第一個程式範例 hello.go
package main

import "fmt"

func main() {
	fmt.Println("Hello World")
}

```
#### 步奏二: 在終端機(cmd)輸入下列內容然後按[enter]
```
$ go run hello.go
```
執行結果 :
```
$ go run hello.go
Hello World

```

### 資料型態 :

語法 | 說明 | 範例 | 備註
:-----|:-----|:-----|:-----
int | 整數 | 3 | 
float64 | 浮點數 | 3.14 | 
string | 字串 | "Hello" | 
rune | 字元 | "a" | 
``` 
// 這是單行註解
// 變數宣告不指定初始值
var x int
// 變數宣告並指定初始值
var y int = 100
// 偷懶的語法 := 讓程式自動依照等號(=)右邊的內容來宣告變數
// 即 z := 200 等同於 var z int = 200
z := 200

```

### 基本輸入與輸出 :

語法 | 說明 | 範例 | 備註
:-----|:-----|:-----|:-----
fmt.Println | 印在螢幕上-會換行 | fmt.Println("印在螢幕上-會換行") | 
fmt.Print | 印在螢幕上-不換行 | fmt.Print("印在螢幕上-不換行") | 
```
// 這是單行註解

```

### 基本運算符號 :
語法 | 說明 | 範例 | 備註
:-----|:-----|:-----|:-----
&#43; &#45; &#42; &#47; | 四則運算 | 3&#43;4 | 
&#61; | 指定運算 | a&#61;1 | 
&#43;&#61; &#45;&#61; &#42;&#61; &#47;&#61; | 指定加四則運算 | a&#43;&#61;4 | 等同 a&#61;a&#43;4 
&#43;&#43; &#45;&#45; | 遞增 遞減 | a++ | 等同 a&#61;a&#43;1 
&#60; &#62; &#61;&#61; | 大於 小於 等於 | a &#60; b | 用於邏輯運算 
&#33; &#38;&#38; &#124;&#124; | 否(NOT) 且(AND) 或(OR) | a&#33;&#61;1 | 用於邏輯運算 
```

```

### 流程控制 :
1. FOR 迴圈語法範例:
```
// 這是單行註解
var x int
for x=0;x<3;x++ {
    fmt.Println(x)
}
```
2. IF...ELSE IF...ELSE... 多條件判斷語法範例:
```
if cond==true {
    fmt.Println("cond true")
}else if cond2==true {
    fmt.Println("cond2 true")
}else{
    fmt.Println("others true")
}
```

### 指標基礎筆記 :

說明 | 範例 | 備註 
:-----|:-----|:-----
建立資料變數 | var x int &#61; 3 | 
取得記憶體位置 | fmt.Println(&#38;x) | 
宣告指標變數 | var xPtr &#42;int =&#38;x | 
反解指標變數(取原值) | &#42;xPtr | 

```

```

### 函式 :

#### 先定義函式，才能呼叫函式
````
/* 這是多行註解開始
格式:
func 函式名(參數){
    程式執行區塊
}
這是多行註解結束 */
// 這是單行註解 底下是範例
func printScreen(msg string){
    fmt.Println(msg)
}

/*
帶回傳值的函式格式:
func 函式名(參數) 回傳值類型{
    程式執行區塊
    return 回傳值(類型必需與宣告相同)
}
*/
// 這是單行註解 底下是範例
func printScreen(msg string) string{
    fmt.Println(msg)
    return msg
}
````

