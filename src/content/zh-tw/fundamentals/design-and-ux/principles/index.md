project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:Google 和 AnswerLab 進行的一項研究對用戶與各類移動網站的交互方式做了調查。其目標是回答一個問題，‘怎樣纔算出色的移動網站？’

{# wf_published_on:2014-08-08 #}
{# wf_updated_on:2015-09-17 #}

# 怎樣纔算出色的移動網站？ {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Google 和 AnswerLab 執行了一項[調查研究](https://www.google.com/think/multiscreen/whitepaper-sitedesign.html?utm_source=web-fundamentals&utm_term=chrome&utm_content=ux-landing&utm_campaign=web-fundamentals)來回答這一問題。 

> 移動用戶具有很強的目標導向。他們期望能夠根據自身情況立即獲得所需內容。
 

這項研究是通過與美國參與者進行長達 119 小時的親自易用性實驗來完成的。
研究要求參與者在各類移動網站上執行關鍵任務。iOS 和 Android 用戶都包括在內，用戶在其自己的手機上測試網站。對於每個網站，研究都要求參與者在完成側重於轉化的任務（如購物或預訂）時明確表達自己的想法。



這項研究發現了 25 個移動網站設計原則，並將它們分成五個類別。


## 首頁和網站導航

成功：讓您的移動首頁側重於將用戶與他們要尋找的內容聯繫起來。

### 讓吸引注意力的元素前置居中

通過[菜單](/web/fundamentals/design-and-ux/responsive/)或“首屏線以下空間”（網頁中不向下滾動便無法看到的部分）提供二級任務。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-cta-good.png">
    <figcaption class="success">
      <b>宜</b>：將用戶所有最常見的任務安排在便於訪問的位置。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-cta-bad.png">
    <figcaption class="warning">
      <b>忌</b>：使用“瞭解詳情”之類含糊的吸引注意力的元素浪費寶貴的首屏空間。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

### 讓菜單保持簡短和親切

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-menus-good.png">
    <figcaption class="success">
      <b>宜</b>：讓菜單保持簡短和親切。</figcaption>

  </figure>
</div>

移動用戶沒有耐心通過瀏覽冗長的選項列表查找自己需要的內容。
請重新組織您的菜單，在不犧牲易用性的情況下儘可能減少菜單項。


<div style="clear:both;"></div>

### 簡化返回首頁的操作

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-hp-good.png">
    <figcaption class="success">
      <b>宜</b>：簡化返回首頁的操作。</figcaption>

  </figure>
</div>

用戶期望在其點按移動頁面左上角的徽標時能夠返回首頁，如果未提供該徽標或者徽標不起作用，會令他們感到失望。


<div style="clear:both;"></div>

### 別讓推廣信息喧賓奪主

大型應用安裝插頁廣告（例如，隱藏內容並提示用戶安裝應用的整頁推廣信息）令用戶反感，讓他們難以執行任務。除了讓用戶反感外，使用應用安裝插頁廣告的網站還無法通過 [Google 移動易用性測試](https://search.google.com/test/mobile-friendly)，這可能對其搜索排名產生不良影響。




<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-promo-good.png">
    <figcaption class="success">
      <b>宜</b>：推廣信息應能輕鬆關閉，並且不應讓用戶在使用網站時分心。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-promo-bad.png">
    <figcaption class="warning">
      <b>忌</b>：插頁廣告（有時稱作關門廣告）常常令用戶反感，讓用戶在使用網站時平添煩惱。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

## 網站搜索

成功：幫助移動用戶找到其正在急切尋找的內容。

### 讓網站搜索可見

尋找信息的用戶通常求助於搜索，因此搜索字段應是他們在您的頁面上率先看到的內容。
不要將搜索框隱藏在菜單中。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-search-good.jpg">
    <figcaption class="success">
      <b>宜</b>：讓搜索可見</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-search-bad.jpg">
    <figcaption class="warning">
      <b>忌</b>：將搜索隱藏在溢出菜單中</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

### 確保網站搜索結果相關

別讓用戶爲了查找要尋找的內容而瀏覽多個頁面的結果。
通過自動完成查詢、更正錯誤拼寫和提供相關查詢建議簡化用戶的搜索操作。
爲免於重複勞動，可以考慮使用 [Google 自定義搜索](https://cse.google.com/cse/){: .external }之類的穩健產品。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-relevant-good.png">
    <figcaption class="success">
      <b>宜</b>：Macy's 只返回兒童商品。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-relevant-bad.png">
    <figcaption class="warning">
      <b>忌</b>：返回任何包含兒童一詞的商品的搜索結果。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>


### 實現過濾條件來縮小結果範圍

研究參與者依靠[過濾條件](/custom-search/docs/structured_search)查找他們要尋找的內容，他們會放棄不提供有效過濾條件的網站。對搜索結果應用過濾條件，通過顯示應用特定過濾條件時將會返回多少結果來幫助用戶。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-filters-good.jpg">
    <figcaption class="success">
      <b>宜</b>：爲過濾提供便利。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-filters-bad.jpg">
    <figcaption class="warning">
      <b>忌</b>：隱藏過濾功能。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

### 引導用戶獲得更相關的網站搜索結果

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-guide-good.png" alt="Zappos 通過詢問用戶的尋找內容來對其進行引導。">
    <figcaption class="success">
      <b>宜</b>：通過沿正確方向引導用戶來幫助他們查找其要尋找的內容。</figcaption>

  </figure>
</div>

對於具有多樣化客戶羣的網站，請先提出幾個問題，然後再呈現搜索框，並利用客戶的回答作爲搜索查詢過濾條件來確保用戶獲得來自最相關客戶羣的結果。



<div style="clear:both;"></div>

## 商務和轉化

成功：瞭解客戶之旅，讓用戶根據自身情況進行轉化。 

### 讓用戶先探索、後表態

研究參與者對那些要求先行註冊才能查看內容的網站感到失望，尤其是在他們不熟悉網站品牌的情況下。
儘管對您的業務而言客戶信息不可或缺，但過早索要可能導致註冊量減少。



<div class="attempt-left">
  <figure id="fig1">
    <img src="images/cc-gates-good.png">
    <figcaption class="success">
      <b>宜</b>：允許用戶在不登錄的情況下瀏覽網站。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-gates-bad.png">
    <figcaption class="warning">
      <b>忌</b>：在網站上過早提出登錄或註冊要求。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>


### 讓用戶以訪客身份購買

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-purchase-guest-good.png">
    <figcaption class="success">
      <b>宜</b>：允許用戶使用訪客帳號購物。</figcaption>

  </figure>
</div>

研究參與者對訪客結賬的看法是“方便”、“簡單”、“輕鬆”和“快速”。
用戶對購物時強制他們註冊帳號的網站感到惱火，尤其是在註冊帳號的好處並不明確的情況下。



<div style="clear:both;"></div>

### 利用現有信息最大限度提高便利性

爲註冊用戶記憶並[預填首選項](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly)。爲新用戶提供熟悉的第三方結賬服務。

### 爲複雜任務使用點擊呼叫按鈕

在具備呼叫能力的設備上，[點擊呼叫鏈接](/web/fundamentals/native-hardware/click-to-call/)可讓用戶通過簡單地觸按鏈接來撥打電話。在大多數移動設備上，用戶會在撥號前收到確認，或者爲用戶提供一個菜單，詢問用戶應如何處理號碼。



### 爲在其他設備上完成任務提供便利

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-other-device-good.png">
    <figcaption class="success">
      <b>宜</b>：讓用戶能夠方便地繼續在其他設備上瀏覽或購物。</figcaption>

  </figure>
</div>

用戶經常想在其他設備上完成任務。例如，他們可能想在更大的屏幕上查看某個項目。
或者他們可能工作繁忙，需要稍後完成任務。
通過讓用戶能夠[在社交網絡上分享項目](/web/fundamentals/discovery-and-monetization/social-discovery/)，或允許用戶直接在網站內通過電子郵件向自己發送鏈接，爲這些客戶之旅提供支持。



<div style="clear:both;"></div>

## 表單輸入

成功：通過易用型表單提供順暢的無縫式轉化體驗。


### 精簡信息輸入

用戶按回車鍵時自動前進到下一字段。一般而言，用戶必須執行的觸按越少，體驗越佳。


### 選擇最簡單的輸入

爲每個情境使用最[合適的輸入類型](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type)。
使用 [`datalist`](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist) 之類的元素爲字段提供建議值。



### 爲日期選擇提供可視化日曆

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-calendar-good.png">
    <figcaption class="success">
      <b>宜</b>：儘可能使用日曆小部件。</figcaption>

  </figure>
</div>

明確標示開始日期和結束日期。用戶應不必單純爲了安排日期而離開網站去查看日曆應用。


<div style="clear:both;"></div>

### 通過標示和實時驗證最大限度減少表單錯誤

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-multipart-good.png">
    <figcaption class="success">
      <b>宜</b>：儘可能預填充內容。</figcaption>

  </figure>
</div>

正確標示輸入並實時驗證輸入。

<div style="clear:both;"></div>

### 設計高效的表單

充分利用[自動填充](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly#use-metadata-to-enable-auto-complete)，讓用戶能借助預填充的數據輕鬆填寫表單。
使用已知信息預先填充字段。
例如，在檢索收貨和賬單地址時，嘗試使用 [`requestAutocomplete`](/web/fundamentals/design-and-ux/input/forms/use-request-auto-complete)，或讓用戶能夠將其收貨地址複製到其賬單地址（反之亦然）。


 

## 易用性和機型

成功：通過可增強移動用戶使用體驗的微小改進來取悅他們。

### 對您的整個網站進行移動優化

使用可隨用戶設備的尺寸和能力而變化的[自適應佈局](/web/fundamentals/design-and-ux/responsive/)。
研究參與者發現混合使用桌面和移動優化頁面的網站甚至比單純使用桌面頁面的網站還要難以使用。



### 別讓用戶進行捏拉縮放

用戶對垂直滾動網站感到順手，水平滾動則不然。
避免使用大型、固定寬度的元素。利用 [CSS 媒體查詢](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)爲不同屏幕應用不同的樣式。

不要創建只能在特定[視口寬度](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)下正常顯示的內容。強制用戶水平滾動的網站無法通過 [Google 移動易用性測試](https://search.google.com/test/mobile-friendly)，可能對其搜索排名產生不良影響。






### 讓產品圖像可擴展

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="success">
      <b>宜</b>：讓產品圖像可擴展並便於查看細節。</figcaption>

  </figure>
</div>

零售客戶期望網站允許其[查看產品的高分辨率特寫](/web/fundamentals/design-and-ux/media/images#make-product-images-expandable)。研究參與者對無法查看所購買的產品感到失望。


<div style="clear:both;"></div>

### 告訴用戶哪個方向效果最好

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/us-orientation.jpg">
    <figcaption class="success">
      <b>宜</b>：告訴用戶哪個方向效果最好。</figcaption>

  </figure>
</div>

研究參與者往往一直使用同一屏幕方向，直至系統提示其進行切換。
同時採用橫向和縱向設計，或鼓勵用戶切換至最佳方向。
確保即使用戶忽略切換方向的建議，仍可完成您的重要行爲召喚。



<div style="clear:both;"></div>

### 將您的用戶留在單一瀏覽器窗口內

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="success">
      <b>宜</b>：Macy's 通過在網站上提供優惠券將用戶留在其網站上。</figcaption>

  </figure>
</div>

用戶可能難以在窗口之間切換，並且可能找不到返回網站的路徑。
避免啓動新窗口的行爲召喚。識別任何可能導致用戶離開您的網站的流程，並提供相應功能將他們留在您的網站上。例如，如果您接受優惠券，請直接在網站上提供，而不要讓用戶被迫前往其他網站尋找優惠。



<div style="clear:both;"></div>

### 避免使用“完整網站”標示

當研究參與者看到用於切換“完整網站”（即桌面網站）和“移動網站”的選項時，會認爲移動網站缺少內容而改爲選擇“完整”網站，這會將他們導向桌面網站。




### 明確您爲何需要用戶的位置

用戶應始終明瞭您爲何索要其[位置](/web/fundamentals/native-hardware/user-location/)。
研究參與者試圖預訂其他城市的酒店，而旅行網站卻在檢測到其位置後改爲提供其所在城市的酒店，這令他們感到困惑。默認情況下將位置字段留空，讓用戶通過“Find Near Me”之類的明確行爲召喚選擇填充這些字段。


<div class="attempt-left">
  <figure id="fig1">
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>宜</b>：始終在手勢操作時請求獲取用戶的位置。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>忌</b>：在網站加載首頁時立即請求提供位置會導致不好的用戶體驗。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>


{# wf_devsite_translation #}
