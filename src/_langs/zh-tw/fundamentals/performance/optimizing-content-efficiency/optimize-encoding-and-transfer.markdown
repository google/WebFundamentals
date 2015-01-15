---
layout: article
title: "最佳化文字資產的編碼和傳輸大小"
description: "在我們消除了任何不必要的資源之後，下一步就是將瀏覽器必須下載的剩餘資源總大小縮減至最小，也就是透過套用內容類型專用和通用的壓縮 (GZip) 演算法，壓縮這些資源。"
introduction: "我們的網路應用程式在範圍、目標和功能上都在不斷增長。這是值得開心的現象！ 但是在邁向內容日趨豐富的網路時代時，過程中也產生了另一種趨勢：每個應用程式所下載的資料量也在持續穩步增長。為了提供卓越的效能，我們需要從小處著手，確保每一個位元組的放送過程最佳化！"
article:
  written_on: 2014-04-01
  updated_on: 2014-09-12
  order: 2
collection: optimizing-content-efficiency
authors:
  - ilyagrigorik
key-takeaways:
  compression-101:
    - 壓縮就是使用更少的位元對資訊進行編碼的過程
    - 消除不必要的資料總是會產生最好的結果
    - 有許多不同的壓縮技術和演算法供您選用
    - 您將需要各式各樣的技術來達成最佳壓縮比例
  minification:
    - 內容專屬的最佳化作業可以顯著縮減交付的資源大小。
    - 最好在您的內部版本/發行版本週期套用內容專屬的最佳化作業。
  text-compression:
    - "GZIP 對於文字資產的壓縮效果最好：CSS、JavaScript、HTML"
    - 所有現代瀏覽器都支援 GZIP 壓縮並會自動請求壓縮
    - 您的伺服器需要設定為支援 GZIP 壓縮
    - 需要特別注意某些 CDN 已啟用 GZIP
notes:
  jquery-minify:
    - "提供一個典型的例證，JQuery 程式庫的未壓縮開發版本現在即將達到 ~300KB。相同程式庫經過壓縮後 (移除了備註等資訊) 大約為三分之一：~100KB。"
  gzip:
    - "無論您相信與否，有時候 GZIP 會使資產大小增加。當資產非常小且 GZIP 字典大於壓縮省下的位元組數時，或者當資源已獲得妥善壓縮時，通常就會發生這種情形。為避免這個問題，部分伺服器允許您指定「最小檔案大小臨界值」。"
---

{% wrap content%}

{% include modules/toc.liquid %}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  pre {
    background-color: #f0f0f0;
    padding: 1em 3em;
  }
</style>

## 資料壓縮

在我們消除了任何不必要的資源之後，下一步就是將瀏覽器必須下載的剩餘資源總大小縮減至最小，也就是進行壓縮程序。根據資源類型 (文字、圖片、字型等)，我們有許多不同的技術可以選用，例如可以在伺服器上啟用的通用工具、適用於特定內容類型的預先處理最佳化，以及需要開發人員輸入的特定資源最佳化。

如要實現最佳的效能，您需要混合使用所有技術。

{% include modules/takeaway.liquid list=page.key-takeaways.compression-101 %}

減小資料大小的過程稱為「資料壓縮」，而這本身就是一個需要深入研究的領域：許多人終其一生致力於演算法、技術和最佳化以提高各種壓縮工具的壓縮比例、速度和記憶體要求。想當然，我們無法對這個主題進行全面討論，但是大略瞭解壓縮的運作方式，以及用於縮減網頁所需的各種資源大小所能使用的技術，仍是很重要的一環。

為了說明這些技術的核心原則實際的運作情況，讓我們看看如何最佳化一個簡單的簡訊格式 (此格式是我們為這個示例所編造的)：

    # 下面是一則秘密訊息，它由一組標題組成
    # 這組標題採用後面跟著一個新行和加密訊息的鍵/值格式。
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. 訊息可能包含任意註解，這些註解帶有「#」前置字元。註解不會影響訊息的含義或訊息的任何其他行為。
2. 訊息可能會包含「標題」，這些標題是一些鍵/值組合 (用「:」分隔)，且必須出現在訊息的開頭。
3. 訊息帶有文字裝載。

我們如何能縮減上述訊息的大小 (這則訊息的長度目前為 200 個字元)？

1. 嗯，註解很有趣，但我們知道它實際上不會影響訊息的含義，因此我們在傳送訊息時會清除註解。
2. 也許有一些智慧技術，可以有效的方式對標題進行編碼，例如，我們不知道是否所有訊息一律都有「格式」和「日期」。但如果有，我們可以將它們轉換為短整數 ID 並僅傳送這些 ID！ 不過，我們不確信是否是這種情況，因此我們現在先放一邊。
3. 裝載僅限文字，而我們不知道其內容真正是什麼 (很明顯，裝載使用一種「秘密訊息」)，看一眼文字可以得知其中存在大量多餘的資訊。如果不傳送重複的字母，也許我們可以計算重複字母的數量，更有效地對其進行編碼，您覺得如何？
    * 例如，「AAA」變為「3A」，或者三個 A 的序列。


結合我們的技術，我們實現了下面的結果：

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

新訊息的長度為 56 個字元，這表示我們將原始訊息壓縮了令人驚艷的 72%。這個結果還不錯，畢盡我們才剛始小試牛刀而已！

當然，您也許會懷疑，這已經非常好了，但這如何能協助我們最佳化網頁呢？ 我們本來就不打算要創造我們的壓縮演算法，不是嗎？ 當然不了！我們不會這麼做，但接下來您將看到，在最佳化網頁上的各種資源時，我們將使用幾乎相同的技術和思考方式：預先處理，內容專屬的最佳化，以及不同的內容採用不同的演算法。


## 迷你化：預先處理和內容專屬的最佳化

{% include modules/takeaway.liquid list=page.key-takeaways.minification %}

當您要壓縮多餘或不必要的資料時，最佳方式是直接消除。當然，我們不能只是隨意刪除資料。但在某些情況下，我們可能清楚掌握資料格式及其屬性的內容專屬資訊，這時刪除資料經常可能顯著縮減裝載的大小，且不影響其實際意義。

{% include_code _code/minify.html full %}

請想想上述的簡單 HTML 網頁和其中包含的三種內容類型：HTML 標記、CSS 樣式和 JavaScript。對於構成有效 HTML 標記、CSS 規則和 JavaScript 內容的元素，其中每種內容類型都有不同的規則，用於指示註解的規則也各有不同。我們如何可以縮減這個網頁的大小？

* 程式碼註解是開發人員的最佳夥伴，但瀏覽器不需要這項資訊 只要除去 CSS  (`/* ... */`)、HTML  (`<!-- ... -->`)  和 JavaScript  (`// ...`)  註解，即可大幅縮減網頁的總大小。
* 「智慧型」CSS 壓縮工具可以察覺到我們正在使用一種效率不彰的方式為 `.awesome-container` 定義規則，並將兩個聲明合併為一個而不影響任何其他樣式，因此節省更多位元組。
* 在 HTML、CSS 和 JavaScript 中，空白 (空格和定位字元) 僅僅是為了開發人員方便。另外有一種壓縮工具可以除去所有定位字元和空格。

^
{% include_code _code/minified.html full %}

在套用上述步驟之後，我們的網頁從 406 個字元變為 150 個字元，達到 63% 的壓縮比例！ 確實，我們因此犧牲了訊息可讀性，但其實也不一定要這樣：我們可以保留原始網頁做為我們的「開發版本」，當我們準備在網站上發佈該網頁時，再套用上述步驟。

讓我們稍退一步，上述示例傳達了很重要的一點：一般用途的壓縮工具 (主要用於壓縮任意文字) 在壓縮上述網頁時可能也會有很壓縮比例，但它可能無法除去註解、收合 CSS 規則，或進行許多其他內容專屬的最佳化作業。這就是綜合預先處理/迷你壓縮/內容感知的最佳化作業如此強大的原因所在。

{% include modules/remember.liquid list=page.notes.jquery-minify %}

同樣地，您可以將上述技術擴展到超越文字以外的資產。圖片、影片和其他內容類型都包含中繼資料形式和各種裝載。例如，當您使用相機拍攝相片時，相片通常也會嵌入許多額外的資訊，例如相機設定、位置等。根據您的應用程式，這項資料可能會很重要 (例如，相片分享網站)，或者完全派不上用場，這時您應該考慮是否該刪除。實際上，每張圖片的中繼資料加起來可能高達數十 KB！

總歸一句，最佳化資產效率的第一步，就是建構不同內容類型的資源，並考慮您可以套用哪類的內容專屬最佳化作業以縮減其大小，這樣做即可大幅節省成本！ 確定可套用的最佳化作業之後，請立即將作業新增到內部版本和發行版本流程，來自動執行這些最佳化作業，這是確保貫徹最佳化作業的唯一方式。

## 使用 GZIP 進行文字壓縮

{% include modules/takeaway.liquid list=page.key-takeaways.text-compression %}

[GZIP](http://en.wikipedia.org/Wiki//Gzip)  是一種可套用於任何位元組串流的通用壓縮工具：啟動之後，該工具會記住先前看到的內容並嘗試以有效率的方式尋找並替換重複的資料片段。好奇的使用者可以觀看 [優異詳盡的 GZIP 深入解說] (https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s)。但是，實際上，GZIP 對文字內容的壓縮效果最好。對於較大的檔案，通常可達成高達 70-90% 的壓縮率。如果資產已透過其他替代演算法壓縮過 (例如，大多數圖片格式)，再執行 GZIP 後幾乎沒有任何效果。

所有現代瀏覽器都支援並會自動協定將 GZIP 壓縮用於所有 HTTP 請求：我們的工作是確保伺服器得到正確設定，以在用戶端請求時提供壓縮的資源。


<table class="table-4">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>程式庫</th>
    <th>大小</th>
    <th>壓縮後的大小</th>
    <th>壓縮比</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="程式庫">jquery-1.11.0.js</td>
  <td data-th="大小">276 KB</td>
  <td data-th="已壓縮">82 KB</td>
  <td data-th="節省">70%</td>
</tr>
<tr>
  <td data-th="程式庫">jquery-1.11.0.min.js</td>
  <td data-th="大小">94 KB</td>
  <td data-th="已壓縮">33 KB</td>
  <td data-th="節省">65%</td>
</tr>
<tr>
  <td data-th="程式庫">angular-1.2.15.js</td>
  <td data-th="大小">729 KB</td>
  <td data-th="已壓縮">182 KB</td>
  <td data-th="節省">75%</td>
</tr>
<tr>
  <td data-th="程式庫">angular-1.2.15.min.js</td>
  <td data-th="大小">101 KB</td>
  <td data-th="已壓縮">37 KB</td>
  <td data-th="節省">63%</td>
</tr>
<tr>
  <td data-th="程式庫">bootstrap-3.1.1.css</td>
  <td data-th="大小">118 KB</td>
  <td data-th="已壓縮">18 KB</td>
  <td data-th="節省">85%</td>
</tr>
<tr>
  <td data-th="程式庫">bootstrap-3.1.1.min.css</td>
  <td data-th="大小">98 KB</td>
  <td data-th="已壓縮">17 KB</td>
  <td data-th="節省">83%</td>
</tr>
<tr>
  <td data-th="程式庫">foundation-5.css</td>
  <td data-th="大小">186 KB</td>
  <td data-th="已壓縮">22 KB</td>
  <td data-th="節省">88%</td>
</tr>
<tr>
  <td data-th="程式庫">foundation-5.min.css</td>
  <td data-th="大小">146 KB</td>
  <td data-th="已壓縮">18 KB</td>
  <td data-th="節省">88%</td>
</tr>
</tbody>
</table>

上述表格說明了許多最常見的 JavaScript 程式庫和 CSS 框架，套用 GZIP 後所能節省的比例。節省的範圍從 60% 到 88% 不等。請注意迷你檔案 (檔名中包含「.min」字樣) 加上 GZIP 的組合可提供更大的節省比例。

1. **首先套用內容專屬的最佳化：CSS、JS 和 HTML 壓縮器。**
2. **套用 GZIP 以壓縮迷你化的輸出。**

最棒的是，啟用 GZIP 實施起來最簡單並且是回報最高的最佳化措施，只不過許多人仍會忘記進行最佳化。大多數網路伺服器會代表您壓縮內容，而您僅需要確認伺服器已正確設定，可使用 GZIP 壓縮所有內容類型。

什麼是您的伺服器最佳設定？ HTML5 Boilerplate 專案包含了所有主流伺服器的[設定檔範例](https://github.com/h5bp/server-configs)，並且為每個配置旗標和設定都提供了詳細的備註：請在清單中找到您喜歡的伺服器，尋找適合的設定，然後複製/確認您的伺服器配置了推薦的設定。

<img src="images/transfer-vs-actual-size.png" class="center" alt="DevTools 實際示範與傳輸大小">

如要查看 GZIP 實際運作，最快速簡單的方法就是開啟 Chrome DevTools 並檢查「網路」面板中的「大小/內容」列：「大小」表示資產的傳輸大小，而「內容」表示資產的未壓縮大小。對於上述示例中的 HTML 資產，GZIP 在傳輸過程中節省了 24.8 KB！

{% include modules/remember.liquid list=page.notes.gzip %}

最後，在此提醒您：大多數伺服器將資產提供給使用者時會自動為您壓縮資產，但是某些 CDN 需要特別小心，並需要手動操作以確保提供 GZIP 資產 審查您的網站，並確認您的資產確實[已進行壓縮] (http://www.whatsmyip.org/http-compression-test/)！



{% include modules/nextarticle.liquid %}

{% endwrap %}

