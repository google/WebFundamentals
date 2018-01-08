project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# 回應式網頁設計模式 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式


回應式網頁使用的大多數版面配置可以分成五大外觀設計模式：主體為流動 (mostly fluid)、欄內容下排 (column drop)、版面配置位移 (layout shifter)、微小調整 (tiny tweaks) 和畫布外空間利用 (off canvas)。

在某些情況下，網頁可能會使用不同模式組合，例如欄內容下排與畫布外空間利用。
  最初是由
 [Luke Wroblewski](http://www.lukew.com/ff/entry.asp?1514) 識別出來的這些模式，可為任何回應式網頁提供紮實的起點。


## 模式

若要建立簡單、容易理解的範例，
以下每個範例是以真正標記使用
 [`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)建立
 -- 通常是使用`div`包含於一主要容器中`div`的三個內容。
 每個範例都是以最小檢視起頭撰寫，
而中斷點是在必要時加入。  就最新瀏覽器而言，
[彈性方塊版面配置模式已廣受支援](http://caniuse.com/#search=flexbox)，儘管最佳化支援仍需要廠商首碼設定。





## 主體為流動 




主體為流動模式主要包含一個流動網格。  在大型或中型螢幕上，它通常保持為相同的大小，只是會在較寬螢幕上調整邊界。

在小螢幕上，
流動網格會導致內容自動重排，而欄則是是垂直堆疊。  這種模式的一大主要優勢是它在小螢幕與大螢幕之間，
只需要一個中斷點。



  <img src="imgs/mostly-fluid.svg">
  嘗試一下


在最小的檢視中，每個內容 `div` 都垂直堆疊。  一旦螢幕寬度達到 600px，
主要內容 `div` 會保持在 `width: 100%`，
而次要 `div` 會在主要 `div` 下顯示為兩欄。  超過 800px 時，
容器 `div` 變成固定寬度，並在螢幕上居中。

使用這種模式的網站包括：

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/mostly-fluid.html" region_tag="mfluid"   adjust_indentation="auto" %}
</pre>




## 欄內容下排 




針對全寬度多欄版面配置，視窗寬度之於內容變得太窄時，欄內容下排只是會垂直堆疊所有欄而已。  

最後結果是所有欄會被垂直堆疊。
  為這種版面配置模式選擇中斷點，
視內容而定，也會因每一種設計而變動。



  <img src="imgs/column-drop.svg">
  嘗試一下



就像主體為流動的範例，
內容被垂直堆疊於最小檢視中，但在螢幕擴展超出 600px 時，主要與次要內容 
`div` 會佔據整個螢幕寬度。  `div` 的順序是以舊 CSS 屬性來設定。
  在 800px 時，所有三個內容 `div` 都會顯示，使用完整螢幕寬度。


使用這種模式的網站包括：

 * [Modernizr](http://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/column-drop.html" region_tag="cdrop"   adjust_indentation="auto" %}
</pre>




## 版面配置位移 




版面配置位移模式是最為回應式的模式，帶有跨數個螢幕寬度的多個中斷點。

這種版面配置的關鍵在於內容四處移動的方式，
而非自動重排或欄內容下排。  由於每個主要中斷點之間的顯著差異，
它的維護更複雜，並可能涉及元素內的變更，
而非整體的內容版面配置。


  <img src="imgs/layout-shifter.svg">
  嘗試一下


以下的簡化範例會顯示版面配置位移模式。
在較小的螢幕上，內容會垂直堆疊，
但在螢幕變得較大時大幅變更，帶有一個左 `div` ，和兩個堆疊的 `div` 在右邊。

使用這種模式的網站包括：

 * [Food Sense](http://foodsense.is/){: .external }
 * [基本回應式設計
範例](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/layout-shifter.html" region_tag="lshifter"   adjust_indentation="auto" %}
</pre>




## 微小調整 




微小調整只是對版面配置做出小小變更，例如調整字型大小 、調整影像大小，或小幅移動內容。  

它適用於單欄版面配置，例如單網頁線性網站、大量文字
的文章。


  <img src="imgs/tiny-tweaks.svg">
  嘗試一下


顧名思義，螢幕大小變更時，此範例也沒什麼變化。
螢幕寬度越大，字型和邊框間距也是如此。

使用這種模式的網站包括：

 * [Opera's Shiny Demos](http://shinydemos.com/){: .external }
 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/tiny-tweaks.html" region_tag="ttweaks"   adjust_indentation="auto" %}
</pre>




## 畫布外空間利用 




它不會垂直堆疊內容，畫布外空間利用模式會將較不常用的內容 -- 可能是導覽或應用程式功能表 -- 放在螢幕外，當螢幕足夠大時才顯示，而且在較小的螢幕上，內容只需按一下就會顯示。


  <img src="imgs/off-canvas.svg">
  嘗試一下


不垂直堆疊內容，本範例使用一個 `transform: translate(-250px, 0)`，
以將兩個內容 `div` 隱藏於螢幕之外。  透過新增一個開放類別給元素，
以使其可見，這裡使用了 JavaScript 來顯示 div。  在螢幕變更寬的同時，
螢幕外的定位會從元素移除，而元素會在可見檢視區中顯示。


注意在此範例中，
iOS 6 版本 Safari 和 Android 瀏覽器不支援 `flexbox` 的 `flex-flow: row nowrap` 功能，所以我們必須退回到絕對定位方式。


使用這種模式的網站包括：

 * [HTML5Rocks
 文章](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/){: .external }
 * [臉書行動版網站](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/off-canvas.html" region_tag="ocanvas"   adjust_indentation="auto" %}
</pre>


