# 網頁爬蟲 使用 Python + Selenium

## 大綱
* 網路教學資源
* 實作練習
* 將webdriver寫成模組(物件)

### 網路教學資源
* [LUFOR129-手把手python爬蟲教學(二): Selenium](https://lufor129.medium.com/%E6%89%8B%E6%8A%8A%E6%89%8Bpython%E7%88%AC%E8%9F%B2%E6%95%99%E5%AD%B8-%E4%BA%8C-selenium-666a9fca0bd0)
* [bbb](bbb)

### 實作練習

底下是一個單純開啟pchome24H網站並輸入關鍵字按下搜尋的範例，可以用來測試python+selenium環境是否能正常運作
```
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
options = Options()
options.add_argument("--disable-notifications")
# 輸入chrome driver 路徑
chromedriver = r'C:\chromedriver\chromedriver.exe'
# 啟動 chrome driver
dirver = webdriver.Chrome(chromedriver, chrome_options=options)
# 指定開啟網址
dirver.get("https://shopping.pchome.com.tw")
key_word = dirver.find_element_by_id("keyword")
send_btn = dirver.find_element_by_id("doSearch")
time.sleep(1)
key_word.send_keys('apple M1')
time.sleep(1)
send_btn.click()
#dirver.find_element_by_link_text("24h購物").click()
```

參考 LUFOR129-手把手python爬蟲教學(二) 的練習
```
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
options = Options()
options.add_argument("--disable-notifications")
# 輸入chrome driver 路徑
chromedriver = r'C:\chromedriver\chromedriver.exe'
# 啟動 chrome driver
dirver = webdriver.Chrome(chromedriver, chrome_options=options)
# 指定開啟網址
dirver.get("https://shopping.pchome.com.tw")

```

### 將webdriver寫成模組(物件)

模組: WebDriver.py

```
""" 將selenium 常用的功能寫成物件 方便日後使用 """
VERSION="0.01A"
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
"""Encapsulates some calls to the winapi for window management"""
class WebDriver:
    """ 建構式 """
    def __init__ (self,driver_loc=r'C:\chromedriver\chromedriver.exe'):
        self.driver_loc = driver_loc
        self.options = Options()
        self.options.add_argument("--disable-notifications")
        self.wd_obj=webdriver.Chrome(driver_loc, chrome_options=self.options)
    """ 轉址 """
    def url_get(self,url=""):
        if url!="":
            self.wd_obj.get(url)
    """ 結束程式 """
    def close_wd(self):
        self.wd_obj.quit()
        os._exit(0)
```

調用範例:

```
import time,os
import WebDriver

wd=WebDriver.WebDriver()
time.sleep(1)
wd.url_get("https://shopping.pchome.com.tw")
time.sleep(5)
wd.url_get("https://github.com/ccutmis/")
time.sleep(5)
wd.close_wd()
```