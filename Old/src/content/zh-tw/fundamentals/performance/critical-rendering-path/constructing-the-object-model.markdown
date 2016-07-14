---
title: "建構物件模型"
description: "瀏覽器需要先建構 DOM 和 CSSOM 樹狀結構，才能在螢幕上轉譯內容。因此，我們必須儘快將 HTML 和 CSS 提供給瀏覽器。"
updated_on: 2014-09-12
key-takeaways:
  建構物件模型:
    - 位元組 → 字元 → 權杖 → 節點 → 物件模型。
    - HTML 標記會轉換為文件物件模型 (DOM)，而 CSS 標記會轉換為 CSS 物件模型 (CSSOM)。
    - DOM 和 CSSOM 是獨立的資料結構。
    - 使用 Chrome DevTools Timeline 可以捕捉及檢查 DOM 和 CSSOM 的建構和處理成本。
notes:
  devtools:
    - 我們假設您對 Chrome DevTools 有基本的瞭解，也就是說，您知道如何捕捉網路瀑布流或記錄時間軸。如果您需要快速重溫相關知識，請參閱 <a href="https://developer.chrome.com/devtools">Chrome DevTools 文件</a>。如果您是第一次使用 DevTools，建議先完成 Codeschool 的 <a href="http://discover-devtools.codeschool.com/">Discover DevTools</a> 課程。
---
<p class="intro">
  瀏覽器需要先建構 DOM 和 CSSOM 樹狀結構，才能轉譯網頁。因此，我們必須儘快將 HTML 和 CSS 提供給瀏覽器。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## 文件物件模型 (DOM)

{% include fundamentals/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

{% include_code src=_code/basic_dom.html snippet=full %}

首先，我們從最簡單的情況開始講解：一個純 HTML 網頁，只包含一些文字和一張圖片。瀏覽器需要做什麼才能處理這個簡單的網頁呢？

<img src="images/full-process.png" alt="DOM 建構程序">

1. **轉換：**瀏覽器從硬碟或網路讀取 HTML 的原始位元組，然後根據指定的檔案編碼格式 (例如 UTF-8)，將其轉換為相應字元。
1. **權杖化：**瀏覽器將字串轉換為 [W3C HTML5 標準](http://www.w3.org/TR/html5/)指定的不同權杖，例如"<html>"、"<body>"以及其他帶有「角括號」的字串。每個權杖都具有特殊的含義和一套規則。
1. **詞法分析：**發出的權杖轉換為定義其屬性和規則的「物件」。
1. **DOM 建構：**最後，因為 HTML 標記定義不同標記之間的關係 (某些標記嵌套在其他標籤中)，建立的物件會在樹狀資料結構中連結起來，而樹狀資料結構也會捕捉原始標記中定義的上下層級關係：例如 _HTML_ 物件是 _body_ 物件的上層物件，_body_ 是 _paragraph_ 物件的上層物件等等。

<img src="images/dom-tree.png" class="center" alt="DOM 樹狀結構">

**上述整個流程的最終輸出產物是文件物件模型，也就是這個簡單網頁的「DOM」。瀏覽器會使用 DOM 完成對相應網頁的所有後續處理。**

每次瀏覽器處理 HTML 標記時，都必須完成上述所有步驟：將位元組轉換為字元、標示權杖、將權杖轉換為節點，然後建構 DOM 樹狀結構。整個過程可能需要一段時間，尤其在處理大量 HTML 時更是如此。

<img src="images/dom-timeline.png" class="center" alt="在 DevTools 中追蹤 DOM 建構流程">

{% include shared/remember.liquid title="Note" list=page.notes.devtools %}

如果您開啟 Chrome DevTools，並在網頁載入時記錄時間軸，就可以看到執行這個步驟所需的實際時間。在上例中，將 HTML 位元組轉換為 DOM 樹狀結構大約需要 5 毫秒。當然，如果網頁更大 (大多數網頁都是如此)，這個過程需要的時間可能會明顯拉長。在後續關於建立流暢動畫的章節中，您會看到如果瀏覽器必須處理大量 HTML，這很容易就演變成效能瓶頸的問題。

DOM 樹狀結構準備就緒後，我們是否就有足夠的資訊在螢幕上轉譯網頁了？ 請稍安勿躁！ DOM 樹狀結構會捕捉文件標記的屬性和關係，但是不會告訴我們元素在呈現時的樣式。這是 CSSOM 的任務，也就是我們接下來要說明的部分！

## CSS 物件模型 (CSSOM)

瀏覽器建構這個簡單網頁的 DOM 時，在文件的 head 區段會遇到一個 link 標記，用於參照外部 CSS 樣式表 style.css。瀏覽器預期將會需要這項資源來轉譯網頁，因此會立即發出對這項資源的請求，而系統會傳回以下內容：

{% include_code src=_code/style.css snippet=full lang=css %}

當然，我們本來可以直接在 HTML 標記中聲明樣式 (內嵌)，但是如果將 CSS 與 HTML 分開，我們就可以將內容和設計分別進行處理：設計人員可以處理 CSS，開發人員則可以處理 HTML 等等。

與 HTML 相同，我們需要將收到的 CSS 規則轉換為瀏覽器可以理解及處理的內容。因此，我們再重複一次與處理 HTML時非常類似的過程：

<img src="images/cssom-construction.png" class="center" alt="CSSOM 建構步驟">

CSS 位元組會轉換為字元，然後轉換為權杖和節點，最後連結到樹狀結構上，稱為「CSS 物件模型」，或縮寫為 CSSOM：

<img src="images/cssom-tree.png" class="center" alt="CSSOM 樹狀結構">

CSSOM 為什麼採用樹狀結構？ 為網頁上的任何物件計算最終的樣式集時，瀏覽器會先從適用於該節點的通用規則開始 (例如，如果是 body 元素的子元素，則會套用所有 body 樣式)，然後透過套用更加具體的規則 (即規則向下串聯)，類推調整計算的樣式。

為了讓解說更具體，讓我們看一下上述的 CSSOM 樹狀結構。body 元素中 _span_ 標記內包含的任何文字都採用 16 像素的字型大小，採用紅色文字，font-size 指令從 body 向下串聯到 span。但是，如果 span 標記是 paragraph (p) 標記的子標記，則不會顯示其內容。

此外請注意，上述的樹狀結構不是完整的 CSSOM 樹狀結構，只顯示了我們決定在樣式表中覆蓋的樣式。每個瀏覽器都會提供一套預設的樣式，也稱為「使用者代理樣式」，也就是不提供任何自訂樣式時看到的樣式。我們的樣式只是覆蓋這些預設樣式集 (例如 [預設 IE 樣式](http://www.iecss.com/))。如果您曾在 Chrome DevTools 中檢查過「計算的樣式」，並且想知道所有樣式從何而來，現在真相大白了！

想知道 CSS 處理所需的時間嗎？ 您可以在 DevTools 中記錄時間軸，並查詢「Recalculate Style」事件：與 DOM 剖析不同，時間軸不會顯示單獨的「Parse CSS」項目，而是捕捉剖析和 CSSOM 樹狀結構建構作業，加上此事件下計算的樣式遞迴計算。

<img src="images/cssom-timeline.png" class="center" alt="在 DevTools 中追蹤 CSSOM 建構流程">

處理我們的小小樣式表需要大約 0.6 毫秒，而且會影響網頁上的 8 個元素，雖然時間不長，但也會產生成本。不過，這 8 個元素是從哪來的？ CSSOM 和 DOM 是獨立的資料結構！ 原來，瀏覽器隱藏了一個重要的步驟。接下來，我們會探討將 DOM 和 CSSOM 連結在一起的轉譯樹狀結構。



