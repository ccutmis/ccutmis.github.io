# CSS3 學習筆記

## 目錄
1. 雜記
2. 項目二
3. 項目三

### 雜記

#### margin 的相互抵消
* 區塊層級(block level)元素之間上margin會相互抵消，行內區塊元素(inline-block)或與float相關的元素不會抵消。
* 若要在父元素與子元素之間留白，不建議在子元素用margin-top而是在父元素指定padding-top以避免抵消。

#### HTML5 元素分類
* Meta Data
* Flow
* Section
* Heading
* Phrasing
* Embedded
* Interactive
* 詳搜 HTML5 官網

#### Selector 使用
* `A B` :select all B's in A
* `A>B` : select A元素的子元素階層的B元素
* `A+B` : select A同層相鄰的B
* `A~B` : select A同層的B's

#### 子元素設為 display:inline-block 時
* 會因換行造成多餘空白格
* 此時在父元素設 font-size:0px 即可

#### 在 VisualStudioCode 裡面輸入 Lorem ipsum 可以快速建立假文字段落

#### Selector 的優先權
1. html的 style="...;"
2. id (#id)
3. class (.class)
4. 擬類別 (:hover)
5. 屬性 ([type="submit"])
6. 元素擬元素 (::before, ::after)

#### 儘量別用 id 作 css 選擇器的原因:
1. id無法重覆
2. 很難覆寫
3. 減少影響範圍
4. 總之 id 儘量只給 javascript 處理

#### normalize.css 與 reset.css 的差異與用法

#### 用 CSS 簡單實現 scroll-smooth 特效!(某些瀏覽器不支援，例如 safiri)
`html{scroll-behavior:smooth;}`

-----