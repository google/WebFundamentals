project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:動畫必須表現良好，否則將對用戶體驗產生負面影響。

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# 動畫與性能 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

在設置動畫時應保持 60fps，因爲任何卡頓或停頓都會引起用戶注意，並對其體驗產生負面影響。

### TL;DR {: .hide-from-toc }
* 注意您的動畫不能導致性能問題；確保瞭解對指定 CSS 屬性設置動畫的影響。
* 改變頁面（佈局）結構或導致繪圖的動畫屬性特別消耗資源。
* 儘可能堅持改變變形和透明度。
* 使用  <code>will-change</code> 來確保瀏覽器知道您打算對什麼設置動畫。


給屬性設置動畫不是不受約束的，不過，給某些屬性設置動畫的開銷比其他屬性要小。例如，給元素的 `width` 和 `height` 設置動畫會改變其幾何形狀，並且可能導致頁面上的其他元素移動或改變大小。此過程稱爲*佈局*（在 Firefox 等基於 Gecko 的瀏覽器中稱爲*自動重排*），如果頁面有很多元素，則可能開銷很大。每當觸發佈局時，頁面或其一部分通常需要進行繪製，這一般比佈局操作本身更消耗資源。

應儘可能避免給觸發佈局或繪製的屬性設置動畫。對於大部分現代瀏覽器，這意味着將動畫限制爲 `opacity` 或 `transform`，兩種都可經瀏覽器高度優化；動畫是由 JavaScript 還是由 CSS 處理並不重要。

有關單個 CSS 屬性觸發的動作的完整列表，請參考 [CSS 觸發器](http://csstriggers.com)。您可以找到有關[在 HTML5 Rocks 上創建高性能動畫](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)的完整指南。

### 使用 will-change 屬性

使用 [`will-change`](https://dev.w3.org/csswg/css-will-change/) 來確保瀏覽器知道您打算改變元素的屬性。這使瀏覽器能夠在您做出更改之前進行最合適的優化。但是，請勿過度使用 `will-change`，因爲過度使用可能導致瀏覽器浪費資源，進而引起其他性能問題。

一般經驗法則是，如果動畫可能在接下來的 200 毫秒內觸發（由用戶交互觸發或由應用的狀態觸發），則對動畫元素使用 `will-change` 是個好主意。對於大多數情況，在應用的當前視圖中您打算設置動畫的任何元素都應啓用 `will-change`，無論您打算改變哪個屬性。在我們在之前的指南中一直使用的方框示例中，爲變形和透明度加上 `will-change` 屬性將產生如下結果：


    .box {
      will-change: transform, opacity;
    }
    

現在支持此屬性的瀏覽器有 [Chrome、Firefox 和 Opera](http://caniuse.com/#feat=will-change)，這些瀏覽器將在後臺進行相應的優化，以支持這些屬性的更改或動畫設置。

## CSS 對比 JavaScript 的性能

網絡上有很多網頁和評論從性能的角度討論了 CSS 和 JavaScript 動畫的相對優點。以下是要記住的幾個要點：

* 基於 CSS 的動畫以及原生支持的網絡動畫通常由一個名爲“合成器線程”的線程處理。這不同於在其中執行樣式、佈局、繪製和 JavaScript 的瀏覽器“主線程”。這意味着，如果瀏覽器正在主線程上運行一些高開銷任務，則這些動畫可以繼續運行而不中斷。

* 在許多情況下，變形和透明度的其他更改還可由合成器線程來處理。

* 如果任何動畫觸發繪製、佈局或同時觸發這兩者，則“主線程”將必須執行工作。這點同時適用於基於 CSS 和 JavaScript 的動畫，並且佈局或繪製的開銷可能拖慢與 CSS 或 JavaScript 執行相關的任何工作，使問題變得無意義。

有關對指定的屬性設置動畫會觸發哪個動作的詳細信息，請參閱 [CSS 觸發器](http://csstriggers.com)。




{# wf_devsite_translation #}
