project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 在預設情況下，CSS 會被視為禁止轉譯的資源，只要 CSSOM 還未建構完成，即使內容已經過處理，瀏覽器也不會進行轉譯。請務必保持 CSS 簡潔、儘快提供 CSS，並使用媒體類型和媒體查詢來解除對轉譯作業的禁止令。

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# 禁止轉譯的 CSS {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


在預設情況下，CSS 會被視為禁止轉譯的資源，只要 CSSOM 還未建構完成，即使內容已經過處理，瀏覽器也不會進行轉譯。請務必保持 CSS 簡潔、儘快提供 CSS，並使用媒體類型和媒體查詢來解除對轉譯作業的禁止令。



在上一節中，我們看到關鍵轉譯路徑要求同時具備 DOM 和 CSSOM 才能打造轉譯樹狀結構，這對效能有很重要的含義：**HTML 和 CSS 都是禁止轉譯的資源。** 對 HTML 的要求顯而易見，因為如果沒有 DOM，就沒有任何可呈現的內容，但是對 CSS 的要求也許沒那麼顯而易見。如果我們嘗試呈現一個普通網頁，而不讓 CSS 禁止轉譯，會發生什麼情況？

### TL;DR {: .hide-from-toc }
- 在預設情況下，CSS 會被視為禁止轉譯的資源。
- 透過媒體類型和媒體查詢，我們可以將一些 CSS 資源標記為不禁止轉譯的資源。
- 無論禁止與否，瀏覽器都會下載所有 CSS 資源。


<div class="attempt-left">
  <figure>
    <img src="images/nytimes-css-device.png" alt="NYTimes with CSS">
    <figcaption>The New York Times with CSS</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes without CSS">
    <figcaption>The New York Times without CSS (FOUC)</figcaption>
  </figure>
</div>

{% comment %}
<table>
<tr>
<td>具備 CSS 的 NYTimes</td>
<td>不具備 CSS 的 NYTimes (FOUC)</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="具備 CSS 的 NYTimes" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="不具備 CSS 的 NYTimes" class="center"></td>
</tr>
</table>
{% endcomment %}

上述示例分別顯示了具備 CSS 和沒有 CSS 的紐約時報網站，目的是說明為什麼要在 CSS 可用之前禁止轉譯，因為沒有 CSS 的網頁根本無法使用。實際上，右側的體驗通常稱為「內容樣式短暫失效」(FOUC)。有鑑於此，在同時具備 DOM 和 CSSOM 之前，瀏覽器會禁止轉譯。

> **_CSS 是禁止轉譯的資源，您必須儘快將 CSS 提供給用戶端，以便縮短初次轉譯的時間。_**

但是，如果部分 CSS 樣式只能在特定條件下使用 (例如，在列印網頁時，或者在將網頁投影到大螢幕時)，應該怎麼辦？。如果我們不需要禁止轉譯這些資源，那就太棒了！

我們可以透過 CSS「媒體類型」和「媒體查詢」處理這類使用情況：


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

[媒體查詢](/web/fundamentals/design-and-ux/responsive/#use-media-queries)由媒體類型以及零個或多個運算式組成，用於檢查特定媒體特徵的條件。舉例來說，我們的第一個樣式表聲明沒有提供任何媒體類型或媒體查詢。因此，這些樣式將適用於所有情況，也就是說一律禁止網頁轉譯。另一方面，第二個樣式表將只適用於列印內容 (也許您希望重新配置版面、變更字型等等)。因此，在首次載入網頁時，這個樣式表不需要禁止網頁的轉譯。最後一個樣式表聲明提供了由瀏覽器執行的媒體查詢：如果符合條件，在該樣式表下載並處理完成之前，瀏覽器將禁止轉譯。

透過使用媒體查詢，我們可以根據具體用途 (例如顯示還是列印) 來量身打造顯示外觀，也可以根據動態條件 (例如螢幕方向改變、大小調整等事件) 來量身打造顯示外觀。**在聲明樣式表資產時，請務必留意媒體類型和媒體查詢，因為它們對於關鍵轉譯路徑的效能會產生巨大影響！**

{# include shared/related_guides.liquid inline=true list=page.related-guides.media-queries #}

接下來，就讓我們看看一些簡單的例子：


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* 第一個聲明是禁止轉譯的，並且符合所有條件。
* 第二個聲明也是禁止轉譯的：「all」是預設的類型，如果未指定任何類型，則預設設定為「all」。因此，第一個聲明和第二個聲明實際上是一樣的。
* 第三個聲明包含動態媒體查詢，在網頁載入時將評估該查詢。根據載入網頁時裝置的方向，決定 portrait.css 是否禁止轉譯。
* 最後一個聲明只適用於列印網頁，因此在瀏覽器中初次載入網頁時，不會禁止轉譯。

最後，請注意「禁止轉譯」僅指該資源是否會阻止瀏覽器初次轉譯網頁。無論是否禁止，瀏覽器仍會下載 CSS 資產，只是非禁止性資產的優先順序較低而已。



