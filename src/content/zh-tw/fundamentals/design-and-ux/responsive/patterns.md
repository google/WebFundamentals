project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:自適應網頁設計模式正在快速發展，但只有少數幾種成熟的模式可以跨桌面設備和移動設備流暢運行

{# wf_updated_on:2014-10-20 #}
{# wf_published_on:2014-04-29 #}

# 自適應網頁設計模式 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

自適應網頁設計模式正在快速發展，但只有少數幾種成熟的模式可以跨桌面設備和移動設備流暢運行。

自適應網頁所用的大部分佈局可以歸類爲五種模式之一：mostly fluid、column drop、layout shifter、tiny tweaks 和 off canvas。在某些情況下，頁面可能使用組合模式，例如 column drop 和 off canvas。這些模式最初由 [Luke Wroblewski](http://www.lukew.com/ff/entry.asp?1514) 確定，爲任何自適應頁面提供了可靠的起點。



### 模式

出於簡單易懂上的考慮，下面每個示例都是使用 [`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes) 通過真實標記創建的，一般在主要容器 `div` 內容納了三個內容 `div`。每個示例都先從最小的視圖開始，然後在必要時加上斷點。
現代瀏覽器[能很好地支持 flexbox 佈局模式](http://caniuse.com/#search=flexbox)，儘管可能仍需要供應商前綴才能實現最佳支持。



## Mostly Fluid

Mostly fluid 模式主要由流動網格組成。在較大和中等屏幕上，它通常保持相同大小，只在更寬的屏幕上調整邊距。



在較小屏幕上，流動網格使主內容自動重排，同時各列垂直排列。
此模式的一個主要優點是，在小屏幕和大屏幕之間通常只需要一個視圖斷點。



<img src="imgs/mostly-fluid.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/mostly-fluid.html" class="button button-primary">試一下</a>

在最小的視圖中，每個內容 `div` 都垂直排列。在屏幕寬度達到 600px 時，主要內容 `div` 保持 `width: 100%`，而輔助 `div` 在主要 `div` 下面顯示爲兩列。寬度超過 800px 時，容器 `div` 變爲固定寬度並在屏幕上居中。


使用此模式的網站包括：

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>

## Column drop 

對於全寬度的多列布局，當窗口寬度太窄不能容納內容時，Column drop 就將各列垂直排列。


最終使所有列都垂直排列。爲此佈局模式選擇視圖斷點時要依據內容，並隨不同設計而改變。



<img src="imgs/column-drop.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/column-drop.html" class="button button-primary">試一下</a>

與 Mostly fluid 示例類似，內容在最小視圖中垂直排列，但當屏幕寬度超過 600px 時，主要內容和輔助內容 `div` 佔用屏幕的全寬度。`div` 的順序是使用 CSS 屬性的順序進行設置的。
在 800px 時，使用全屏寬度來顯示全部三個內容 `div`。


使用此模式的網站包括：

 * [Modernizr](https://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>

## Layout shifter

Layout shifter 模式是自適應性最強的模式，在多種屏幕寬度上採用多個斷點。


此佈局的關鍵是內容移動的方式，而不是自動重排並放到其他列下面。
由於每個主要視圖斷點之間的顯著差異，其維護更復雜，並且可能涉及元素內的更改，而不只是總體內容佈局的更改。



<img src="imgs/layout-shifter.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/layout-shifter.html" class="button button-primary">試一下</a>

這個簡化示例顯示了 Layout shifter 模式，在較小的屏幕上內容垂直排列，但在屏幕變大時就會發生顯著變化，左側一個 `div`，右側排列兩個 `div`。



使用此模式的網站包括：

 * [Food Sense](http://foodsense.is/){: .external }
 * [Seminal 自適應設計示例](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>

## Tiny tweaks

Tiny tweaks 只對佈局進行細微的更改，例如調整字體大小、調整圖像大小或對內容進行極其細微的移動。


它在單列布局上表現很好，例如單頁面線性網站和文本爲主的文章。

<img src="imgs/tiny-tweaks.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/tiny-tweaks.html" class="button button-primary">試一下</a>

顧名思義，使用本示例時，屏幕大小改變時發生的變化不大。當屏幕寬度增加時，字體大小和內邊距也變大。


使用此模式的網站包括：

 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto" %}
</pre>


## Off canvas

Off canvas 模式不是垂直排列內容，而是將不常用的內容（可能是導航或應用的菜單）放在屏幕之外，只在屏幕足夠大時才顯示。在較小屏幕上，只需點擊就能顯示內容。




<img src="imgs/off-canvas.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/off-canvas.html" class="button button-primary">試一下</a>

此示例不是垂直排列內容，而是使用 `transform: translate(-250px, 0)` 將兩個內容 `div` 隱藏在屏幕之外。然後通過給元素添加 open 類來使其可見，使用 JavaScript 來顯示這些 div。
當屏幕變寬時，從元素中去掉屏幕外的定位，並且讓它顯示在可見視口內。



注意，在本示例中，Safari for iOS 6 和 Android 瀏覽器不支持 `flexbox` 的 `flex-flow: row nowrap` 功能，因此我們必須回退到絕對定位。



使用此模式的網站包括：

 * [HTML5Rocks 文章](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](https://www.google.com/nexus/){: .external }
 * [Facebook 的移動網站](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>


{# wf_devsite_translation #}
