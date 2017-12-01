project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在針對各類用戶和設備進行構建時，要考慮內容以及佈局和圖形設計。

{# wf_updated_on: 2016-05-10 #}
{# wf_published_on: 2016-05-10 #}

# 多設備內容 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

## 人們在網絡上如何閱讀

[美國政府寫作指南](http://www.usability.gov/how-to-and-tools/methods/writing-for-the-web.html)總結了人們對網頁寫作的需求：

> 進行網頁寫作時，使用通俗易懂的語言有利於用戶找到他們需要的內容、理解他們找到的內容，然後利用這些內容來滿足自己的需求。>> 網頁寫作應可操作、可查找並且可分享。



研究顯示，[人們不會閱讀網頁，他們只是瀏覽一下](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)。一般來說，[人們只閱讀網頁內容的 20–28%](https://www.nngroup.com/articles/how-little-do-users-read/)。從屏幕上閱讀的速度比從紙上閱讀的速度要慢。除非信息易於獲取和理解，否則人們會放棄閱讀並退出您的網站。

## 如何爲移動設備撰寫內容

關注手頭的主題，表述應簡明扼要。爲撰寫可在各種設備和視口上運行的內容，一開始就必須闡明重點：通常，理想的情況是[前四段大約 70 個字](http://www.bbc.co.uk/academy/journalism/article/art20130702112133610)。

問問您自己人們想從您的網站獲得什麼。他們是否在嘗試找到一些信息？如果人們訪問您的網站是爲了查找信息，請確保您的所有文本都旨在幫助他們實現其目標。寫作時使用[主動語態](https://learnenglish.britishcouncil.org/en/english-grammar/verbs/active-and-passive-voice)，提供操作和解決方案。

只發布訪問者需要的內容，僅此而已。

[英國政府調查](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)還表明：

> 80% 的人偏好使用淺顯英語書寫的句子，並且問題越複雜，這種偏好就越明顯（例如，97% 的人在“among > other things”與拉丁文“inter alia”之間更偏好前者）。>> 人們的受教育程度越高，他們的知識就越專業，也 > 越傾向於使用簡明的英文。






換句話說：應使用通俗易懂的語言、較短的詞語和簡單的句子結構，即使是針對有文化懂技術的受衆。始終使用交談式語氣，除非有非常好的理由不這麼做。新聞業的一個老規則是以像是在與一個聰明的 11 歲孩子交流的方式進行寫作。

## 下一批十億用戶

這種最簡明的寫作方法對移動設備上的讀者尤爲重要，在針對具有小視口的低成本手機（需要更多滾動、顯示屏質量較差且屏幕響應不太靈敏）創建內容時，採用這種方法尤爲重要。

在將使用網絡的下一批十億用戶中，大多數用戶會使用廉價的設備。他們不想將自己的數據預算花在導航冗長的並且可能無法以其第一語言閱讀的內容上。調整您的文本：使用較短的句子、最大程度減少標點的使用、每段不超過五行，且具有單行標題。考慮自適應文本（例如，針對較小的視口使用較短的標題）但也要[注意這樣做的弊端](https://www.smashingmagazine.com/2012/02/ever-justification-for-responsive-text/)。

使用極簡的文字也讓您的內容更易於本地化和國際化，並且您的內容被社交媒體用戶引用的可能性更大。

最低要求：

* 保持內容簡單
* 減少雜亂無章
* 直接切入重點


## 消除不必要的內容

就字節大小而言，網頁[很大並且越來越大](http://httparchive.org/trends.php#bytesTotal&reqTotal)。

利用[自適應設計技巧](/web/fundamentals/design-and-ux/responsive/)，可以爲多個較小視口提供不同的內容，但先精簡文本、圖像和其他內容始終是明智之舉。

> 網絡用戶通常以行動爲導向，在尋找他們當前問題的答案時“身體向前傾”而不是向後傾，以消化一本好書。>> — [Jakob Nielsen](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)



問問您自己：用戶在訪問我的網站時嘗試獲得什麼？

每個頁面組件是否可幫助用戶實現他們的目標？

### 移除多餘的頁面元素

根據 [HTTP Archive](http://httparchive.org/trends.php#bytesHtml&reqHtml)，對於普通的網頁，HTML 文件構成近 70k 大小和九次以上的請求。

許多受歡迎的網站每個頁面使用幾千個 HTML 元素和幾千行代碼，即使在移動設備上也是如此。HTML 文件過大[可能不會減慢頁面加載速度](http://jsbin.com/zofavunapo/1/edit?html,js,output)，但 HTML 負載沉重可能表示內容臃腫：.html 文件越大，意味着元素越多和/或文本內容越多。

降低 HTML 複雜性也將減少頁面重量，幫助實現本地化和國際化，並使響應式設計更容易計劃和調試。有關編寫更多有效 HTML 的信息，請參閱[高性能 HTML](https://samdutton.wordpress.com/2015/04/02/high-performance-html/)。

> 在用戶通過您的應用獲得價值之前，讓用戶執行的每一個步驟都會讓您失去 20% 的用戶 >>— [Gabor Cselle，來自 Twitter](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)



這同樣適用於內容：儘快幫助用戶獲得他們需要的內容。

不要只是向移動用戶隱藏內容。以[內容對等](http://bradfrost.com/blog/mobile/content-parity/)爲目標，因爲對某人來說，猜測移動用戶不會錯過哪些功能註定會失敗。如果您有資源，可針對不同的視口大小創建相同內容的備用版本，即使是僅針對高優先級頁面元素。

考慮內容管理和工作流：舊版系統是否會導致內容老舊？

### 精簡文本

隨着網絡走向移動化，您需要改變您撰寫內容的方式。保持內容簡單，減少雜亂無章並直接切入重點。

### 移除冗餘圖像

<div class="attempt-right">
<figure>
    <img src="imgs/http-archive-images.png" alt="HTTP Archive 數據顯示圖像傳輸大小和圖像請求" />
    <figcaption>根據 <a href="http://httparchive.org/trends.php#bytesImg&reqImg">HTTP Archive 數據</a>，網頁平均發送 54 次圖像請求。</figcaption>
</figure>
</div>

圖像很美觀、有趣並且可以提供豐富的信息，但是它們也在使用頁面空間，增加頁面重量，並增加文件請求的數量。[當連接性變得糟糕時，延遲也變得更嚴重](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)，這意味着隨着網絡走向移動化，過多的圖片文件請求成爲日益嚴重的問題。


<div style="clear:both;"></div>

<div class="attempt-right">
<figure>
    <img src="imgs/http-archive-content-type-pie-chart.png" alt="HTTP Archive 餅圖按內容類型顯示平均每頁面字節數，其中圖像大約佔 60%。">
    <figcaption>圖像構成頁面重量的 60% 以上。</figcaption>
</figure>
</div>

圖像也會耗電。繼屏幕之後，無線電成爲第二大耗電項目。圖像請求越多，無線電使用就越多，需要的電量也就越多。即使只呈現圖像也會耗電，且與大小和數量成比例。請參閱 Stanford 報告[誰謀殺了我的電池？(Who Killed My Battery?)](http://cdn.oreillystatic.com/en/assets/1/event/79/Who%20Killed%20My%20Battery_%20Analyzing%20Mobile%20Browser%20Energy%20Consumption%20Presentation.pdf)

如果可以，請去除圖像！

下面是一些建議：

* 考慮避免帶圖像的設計，或謹慎使用圖像。[僅文本也可以很美觀](https://onepagelove.com/tag/text-only)！問問您自己，“訪問我的網站的用戶嘗試獲得什麼？圖像對此過程有幫助嗎？"
* 在過去，將標題和其他文本另存爲圖形的做法很普遍。該方法不能很好地響應視口大小變化，並且會增加頁面重量和延遲時間。以圖形方式使用文本還意味着文本不能被搜索引擎找到，且無法通過屏幕閱讀器和其他輔助性技術訪問。儘可能使用“真實”文本，網絡字體和 CSS 可實現美觀的字體。
* 使用 CSS 而非圖像來設置漸變色、陰影、圓角和[背景紋理](http://lea.verou.me/css3patterns/){: .external }，[所有現代瀏覽器均支持](http://caniuse.com/#search=shadows)這些功能。但是，請謹記，CSS 可能是比圖像更好，但仍存在[處理和渲染不利因素](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/)，特別是在移動設備上。
* 背景圖片很少能夠在移動設備上流暢運行。您可以[使用媒體查詢](http://udacity.github.io/responsive-images/examples/2-06/backgroundImageConditional/)來避免在小視口上使用背景圖片。
* 避免啓動畫面圖像。
* [使用 CSS 設置 UI 動畫](/web/fundamentals/design-and-ux/animations/)。
* 瞭解您的字形；使用 [Unicode 符號和圖標](https://en.wikipedia.org/wiki/List_of_Unicode_characters)替代圖像，如有需要，可使用網絡字體。
* 考慮[圖標字體](http://weloveiconfonts.com/#zocial)；它們是可以無限縮放的矢量圖形，可將整個圖像集以一種字體進行下載。（但請注意[這些問題](https://sarasoueidan.com/blog/icon-fonts-to-svg/)。）
* 在 JavaScript 中，可使用 `<canvas>` 元素通過行、曲線、文本和其他圖像來構建圖像。
* [內聯 SVG 或數據 URI 圖像](http://udacity.github.io/responsive-images/examples/2-11/svgDataUri/)不會減少頁面重量，但它們可以通過減少資源請求的數量縮短延遲時間。內聯 SVG [在移動設備和桌面設備瀏覽器上能夠得到很好的支持](http://caniuse.com/#feat=svg-html5)，[優化工具](http://petercollingridge.appspot.com/svg-optimiser)可以大大減少 SVG 尺寸。同樣，數據 URI [也得到了很好的支持](http://caniuse.com/datauri)。這兩者都可以內聯到 CSS 中。
* 考慮使用 `<video>` 代替 GIF 動畫。[移動設備上的所有瀏覽器均支持 video 元素](http://caniuse.com/video)（除 Opera Mini 以外）。

如需瞭解詳細信息，請參閱[圖像優化](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)和[消除並替換圖像](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization#eliminating-and-replacing-images)。


## 可以在不同視口尺寸上良好顯示的設計內容{: #viewport }

>“創造適用於小屏幕的產品，而不是針對小屏幕重新設想一個。出色的移動 > 產品是創造出來的，而絕不是移植出來的。

>>— <a href="https://goo.gl/KBAXj0">移動設計與開發</a>，Brian Fling



"偉大的設計者不會“專門爲移動設備進行優化”，而是考慮以自適應方式構建可在各種設備上使用的網站。文本結構和其他頁面內容對於成功構建跨設備網站非常重要。

在將使用網絡的下一批十億用戶中，有許多用戶使用具有小視口的低成本設備。在低分辨率的 3.5 英寸或 4 英寸屏幕上閱讀可能很困難。

下面是兩個屏幕截圖放在一起的照片：

![在高端智能手機和低成本智能手機上展示博文的比較圖](imgs/devices-photo.jpg)

在較大的屏幕上，文本小但可以閱讀。

在較小的屏幕上，瀏覽器可以正確渲染布局，但是文本難以閱讀，即使放大後也很難閱讀。顯示屏很模糊，並且存在“色偏”，同時白色也不是很白，使得內容難以辨認。

### 爲移動設備設計內容

在針對各種視口進行構建時，要考慮內容以及佈局和圖形設計，[使用真實文本和圖像進行設計，而不是使用虛擬內容](http://uxmyths.com/post/718187422/myth-you-dont-need-the-content-to-design-a-website)。


>“內容比設計重要。缺乏內容的設計不能叫設計，只能叫裝飾。”
>>— Jeffrey Zeldman


* 將最重要的內容置於頂部，因爲[用戶往往以 F 形模式閱讀網頁](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)。
* 用戶訪問您的網站以實現一個目標。問問您自己，爲實現該目標他們需要什麼，並去除其他內容。果斷去除視覺和文本裝飾、老舊的內容、過多的鏈接和其他雜亂無章的內容。
* 慎用社交分享圖標；它們會讓佈局變得雜亂，其代碼會拖慢頁面加載速度。
* 針對內容（而不是固定設備尺寸）設計[自適應佈局](/web/fundamentals/design-and-ux/responsive/)。

### 測試內容

成功：不管做什麼，**一定要測試**！

* 使用 Chrome DevTools 和其他[模擬工具](/web/fundamentals/performance/poor-connectivity/)檢查較小視口的可讀性。
* [在低帶寬和長延遲時間下測試您的內容](/web/fundamentals/performance/poor-connectivity/)；在各種連接場景中試用內容。
* 嘗試在低成本手機上閱讀內容並與內容進行交互。
* 請朋友和同事試用您的應用或網站。
* 構建簡單的設備測試實驗室。面向 Google 迷你移動設備實驗室的 [GitHub 存儲區](https://github.com/GoogleChrome/MiniMobileDeviceLab)提供了有關如何構建您自己的實驗室的說明。[OpenSTF](https://github.com/openstf/stf) 是一個用於在多個 Android 設備上測試網站的簡單網絡應用。

下面是 OpenSTF 實例：

[![OpenSTF 界面](imgs/stf.png)](https://github.com/openstf/stf)

人們越來越多地使用移動設備吸收內容和獲取信息，移動設備不再只是用於通訊、遊戲和媒體的設備。

這使得在考慮跨設備佈局、界面和交互設計時，計劃可在各種視口上順暢運行的內容並確定內容的優先級變得越來越重要。


## 瞭解數據成本

網頁變得越來越大。<br><br>根據 <a href="http://httparchive.org/trends.php#bytesTotal&reqTotal">HTTP Archive</a>，<a href="http://httparchive.org/about.php#listofurls">前一百萬網站</a>的平均頁面重量現已超過 2MB。


用戶會避免訪問他們認爲較慢或非常消耗流量的網站或應用，因此，瞭解加載頁面和應用組件的成本至關重要。

減少頁面重量還可以提高盈利。[來自 YouTube 的 Chris Zacharias](http://blog.chriszacharias.com/page-weight-matters) 發現，當他們將觀看頁面大小從 1.2MB 減少到 250KB 時可以提高盈利：

> 以前無法使用 YouTube 的大量用戶突然能夠使用了。

換句話說，減少頁面重量**可以開闢全新的市場**。

### 計算頁面重量{: #weight }

計算頁面重量的工具有很多。Chrome DevTools Network 面板顯示所有資源的總字節大小，可用於確定具體資產類型的重量。您還可以從瀏覽器緩存查看已檢索到哪些項目。

![顯示資源大小的 Chrome DevTools Network 面板](imgs/chrome-dev-tools.png)

Firefox 和其他瀏覽器提供相似的工具。

[WebPagetest](http://webpagetest.org) 可用於測試第一個頁面加載和後續頁面加載。您可以使用[腳本](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)（例如，登錄到某個網站）或通過使用其 [RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis) 實現自動化測試。以下示例（加載 [developers.google.com/web](/web/)）顯示緩存已成功，後續頁面加載不需要額外的資源。

![顯示第一次頁面訪問和重複頁面訪問總字節數的 WebPagetest 結果](imgs/webpagetest-first-and-repeat.png)

WebPagetest 還可以按 MIME 類型提供大小和請求的詳細分析。

![顯示按 MIME 類型列出的請求數和字節數的 WebPagetest 餅圖](imgs/webpagetest-requests-and-bytes-pie-charts.png)

### 計算頁面成本

對許多用戶而言，數據不只消耗字節和性能，還很費錢。

網站 [What Does My Site Cost?](https://whatdoesmysitecost.com/){: .external } 讓您可以預估加載您的網站的實際財務成本。下面的直方圖展示加載 [amazon.com] 所需的成本（使用預付數據計劃）(https://www.amazon.com/)。

![在 12 個國家/地區加載 amazon.com 首頁的估計數據成本](imgs/what-does-my-site-cost.png)

請記住，這沒有考慮相對於收入的支付能力。來自 [blog.jana.com](https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/) 的數據展示了數據的成本。

<table>
<tr>
    <td></td>
    <td><strong>500MB 數據計劃<br>成本（美元）</strong></td>
    <td><strong>每小時最低<br>工資（美元）</strong></td>
    <td><strong>爲支付 <br>500MB 數據計劃需要工作的小時數</strong></td>
</tr>
<tr>
    <td>印度</td>
    <td>3.38 美元</td>
    <td>0.20 美元</td>
    <td>17 小時</td>
</tr>
<tr>
    <td>印度尼西亞</td>
    <td>2.39 美元</td>
    <td>0.43 美元</td>
    <td>6 小時</td>
</tr>
<tr>
    <td>巴西</td>
    <td>13.77 美元</td>
    <td>1.04 美元</td>
    <td>13 小時</td>
</tr>
</table>


頁面重量不只是新興市場的問題。在許多國家/地區，人們使用數據有限的移動計劃，如果他們認爲您的網站或應用很重並且非常耗費流量，則會避免使用它們。即使“無限”蜂窩網絡和 WiFi 數據計劃也通常會有數據限制，超出這個限制就會被阻止或被節流。

根本問題：頁面重量會影響性能並且費錢。[優化內容效率](/web/fundamentals/performance/optimizing-content-efficiency/)介紹瞭如何降低該成本。


{# wf_devsite_translation #}
