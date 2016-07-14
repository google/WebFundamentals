---
title: "避免大型、複雜的版面配置和版面配置輾轉"
description: "版面配置是瀏覽器弄清楚元素幾何形狀資訊之處：也就是它們在頁面中的大小和位置。 根據使用的 CSS、元素內容，或父系元素，每個元素將具有明確或隱含的大小資訊。 在 Blink、WebKit 瀏覽器和 Internet Explorer 中，這個過程叫做版面配置。 在例如 Firefox 的 Gecko 架構瀏覽器中，它被稱為自動重排，但實際上這些過程都是相同的。"
updated_on: 2015-03-20
notes:
  tree:
    - "對瀏覽器而言，內部有一個從 DOM 建立的轉譯樹狀結構，代表了必須被繪製到裝置螢幕上的所有項目。 它包含有關元素的所有視覺資訊：顏色、維度、位置等。 不過如果元素具有顯示樣式：none，它將不會在轉譯樹狀結構中。 同樣的，如果一個元素具有一個虛擬元素 (:after、:before)，那麼那些元素將不存在於 DOM 中，但會存在於轉譯樹狀結構中。"
  csstriggers:
    - 需要哪些 CSS 屬性會觸發版面配置、繪製或合成的明確清單嗎？請查閱 <a href="http://csstriggers.com/">CSS 觸發器</a>。

key-takeaways:
  - 版面配置的作用範圍通常是整個文件。
  - DOM 元素的數量會影響效能；您應該儘可能避免觸發版面配置。
  - 評估版面配置模型的效能；新版彈性方塊通常比舊版彈性方塊或浮動架構的版面配置模型來得快。
  - 避免強制性同步版面配置和版面配置輾轉；請讀取樣式值，然後進行樣式變更。


---
<p class="intro">
  版面配置是瀏覽器弄清楚元素幾何形狀資訊之處：也就是它們在頁面中的大小和位置。 根據使用的 CSS、元素內容，或父系元素，每個元素將具有明確或隱含的大小資訊。 在 Chrome、Opera、Safari 和 Internet Explorer 中，這個過程叫做版面配置。 在 Firefox 中，它被稱為自動重排，但實際上過程都是相同的。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

類似於樣式計算，版面配置成本目前的顧慮在於：

1. 需要版面配置的元素數量。
2. 這些版面配置的複雜性。

## 儘可能避免版面配置

當您變更樣式時，瀏覽器會檢查是否有任何變更需要計算版面配置，以及是否需要更新轉譯樹狀結構。 例如寬度、高度，左側或頂部的「幾何形狀屬性」，都需要版面配置。

{% highlight css %}
.box {
  width: 20px;
  height: 20px;
}

/**
 * Changing width and height
 * triggers layout.
 */
.box--expanded {
  width: 200px;
  height: 350px;
}
{% endhighlight %}

**版面配置的作用範圍通常是整個文件。**如果您有大量的元素，將會需要很長的時間，才能弄清楚全部項目的位置和大小。

如果不可能避開版面配置，那麼關鍵在於再度使用 Chrome DevTools，來查看它需要多長時間，並判斷版面配置是否是瓶頸的原因所在。 首先，開啟 DevTools、前往「時間軸」標籤、點擊「錄製」，並和您的網站互動。 當停止錄製時，您會看到您網站效能的分類細項：

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" class="g--centered" alt="DevTools 在版面配置中顯示出一段長時間" />

當探究上例的框架時，我們發現到版面配置內花了超過 20ms 的時間；但我們在動畫內只有 16ms 的時間來將一個畫面放上螢幕，20ms 太高了。 您還可以看到，DevTools 會告訴您樹狀結構大小 (在本例中的 1,618 個元素)，以及多少節點需要版面配置。

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

##捨舊版面配置模型而使用彈性方塊
網路上有各種版面配置模型，某些模型較受人廣泛支援。 最古老的 CSS 版面配置模型可使我們能夠在螢幕上，根據相對方式、絕對方式或根據浮動元素，來定位元素。

以下的螢幕擷取畫面顯示出在 1,300 個方塊上使用浮動時的版面配置成本。 無可否認，這是一個很特意的例子，因為大多數應用程式會使用不同方法來定位元素。

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" class="g--centered" alt="使用浮動做為版面配置" />

如果我們更新範例以使用彈性方塊 (網頁平台的最新功能)，我們會得到不同的畫面：

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" class="g--centered" alt="使用彈性方塊做為版面配置" />

針對 _相同數目的元素_ 和相同的視覺外觀，現在我們在版面配置中所花的時間少多了 (此例中為 3.5ms 對 14ms) 很重要的是要記住，在某些情況下，您可能無法選擇彈性方塊，因為它 [比浮動的支援度低](http://caniuse.com/#search=flexbox)，不過您應該儘可能地至少探究一下版面配置模型對您的效能的影響，然後選擇能將執行成本降至最低的方案。

無論是您選擇有無彈性方塊的任一方案，您仍然應該在應用程式的高壓力時機，**試著避免一次性觸發版面配置**！

## 避免強制性同步版面配置
將一個畫面送到螢幕上的順序如下：

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" class="g--centered" alt="使用彈性方塊做為版面配置" />

首先是 JavaScript 執行、_然後_ 樣式計算，_然後_ 版面配置。 然而，是可以利用 JavaScript 強制瀏覽器早一點執行版面配置。 它稱為 **強制性同步版面配置**。

要牢記的第一件事是，在 JavaScript 執行的同時，前一畫面的所有舊版面配置值都已知曉，並可供您查詢。 比方說，如果您想要在畫面的開始寫出元素 (讓我們稱之為「方塊」) 的高度，則可以撰寫如下的程式碼：

{% highlight javascript %}
// Schedule our function to run at the start of the frame.
requestAnimationFrame(logBoxHeight);

function logBoxHeight() {
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

在您要求取得高度 _之前_，如果您已變更方塊的樣式，就會出現問題：

{% highlight javascript %}
function logBoxHeight() {

  box.classList.add('super-big');

  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

現在，若要回答高度問題，瀏覽器必須 _先_ 套用樣式變更 (由於新增了 `super-big` 類別)，_然後_ 執行版面配置。 只有到那時候，它才能夠傳回正確的高度。 這是非必要且可能成本昂貴的工作。

因為如此，您應該一律批次處理您的樣式讀取並先處理它們 (讓瀏覽器可在此使用前一個畫面的版面配置值)，然後再執行任何寫入：

若是正確完成，以上功能會變成：

{% highlight javascript %}
function logBoxHeight() {
  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);

  box.classList.add('super-big');
}
{% endhighlight %}

大多數情況下，您不需要套用樣式，然後查詢值；使用前一個畫面值就應足夠了。 比瀏覽器早一步同步執行樣式計算和版面配置，是潛在瓶頸所在，這不會是您想要做的事。

## 避免版面配置輾轉
 比強制性同步版面配置更糟的是：_接二連三的執行_。 看看這段程式碼：

{% highlight javascript %}
function resizeAllParagraphsToMatchBlockWidth() {

  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
{% endhighlight %}

此程式碼在一組段落上迴圈執行，並設定每個段落的寬度以符合稱為「方塊」的元素之寬度。 這看起來似乎無害，但問題在於每次迴圈反覆會讀取樣式值 (`box.offsetWidth`)，然後立即用它來更新段落的 (`paragraphs[i].style.width`) 的寬度。 在下一次迴圈反覆時，瀏覽器必須考慮一件事實：因為最後一次要求了 `offsetWidth` (在前一次反覆中)時造成樣式已改變，因此它必須套用樣式變更，並執行版面配置。 這個情況會在 _每一次反覆_ 時發生！

此範例的修正方式是再次 _讀取_ 然後 _寫入_ 值：

{% highlight javascript %}
// Read.
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + 'px';
  }
}
{% endhighlight %}

如果您想要確保安全，您應該檢查 [FastDOM](https://github.com/wilsonpage/fastdom)，它會為您自動批次處理讀取與寫入，也應該能避免您意外觸發強制同步版面配置或版面配置輾轉。


