---
title: "解彈跳您的輸入處理常式"
description: "輸入處理常式可能是您的應用程式效能問題的潛在原因，因為它們可以阻止畫面完成，也會導致額外的 (且不必要的) 版面配置工作。"
updated_on: 2015-03-20
notes:
  highdpi:
    - "在固定的高 DPI 螢幕元素上，位置會自動升階至本身的合成器層。 但低 DPI 裝置則非如此，因為升階會將文字轉譯從次像素變更為灰階，而且層升階必須以手動完成。"
  csstriggers:
    - 需要哪些 CSS 屬性會觸發版面配置、繪製或合成的明確清單嗎？請查閱 <a href="http://csstriggers.com/">CSS 觸發器</a>。

key-takeaways:
  - 避免長時間執行的輸入處理常式；它們可能會封鎖捲動。
  - 請不要在輸入處理常式中進行樣式變更。
  - 解彈跳您的處理常式；在下一次 requestAnimationFrame 回呼中，儲存事件值並處理樣式變更。


---
<p class="intro">
  輸入處理常式可能是您的應用程式效能問題的潛在原因，因為它們可以阻止畫面完成，也會導致額外的 (且不必要的) 版面配置工作。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

## 避免長時間執行的輸入處理常式

在速度最快的情況下，當使用者與頁面進行互動時，頁面的合成執行緒可以接受使用者輕觸輸入，而四處移動內容。 這部份不需要執行 JavaScript、版面配置、樣式或繪製的主執行緒來負責。

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" class="center" alt="輕度捲動；僅限合成器。">

然而，如果您附加如 `touchstart`、`touchmove` 或 `touchend` 等輸入處理常式，合成執行緒必須等待此處理常式完成執行，因為您可能選擇呼叫 `preventDefault()` 並停止輕觸捲動發生。 即使您不呼叫 `preventDefault()`，合成器也必須等待，而如此一來使用者的捲動就被封鎖了，這可能會導致斷斷續續和錯失的畫面。

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" class="center" alt="重度捲動；合成器是在 JavaScript 上被封鎖。">

總之，您應確保執行的任何輸入處理常式快速執行，並且允許合成器完成它的工作。

## 在輸入處理常式中避免樣式變更

如捲動和輕觸等輸入處理常式，被排程在緊臨 `requestAnimationFrame` 回呼之前執行。

如果您在這些處理常式之一的內部進行視覺變更，那麼在 `requestAnimationFrame` 開頭就會有等候中的樣式變更。 如「[避免大型、複雜的版面配置和版面配置輾轉](avoid-large-complex-layouts-and-layout-thrashing)」所建議，如果 _然後_ 您讀取 requestAnimationFrame 回呼開頭的視覺屬性，將會觸發強制性同步版面配置！

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" class="center" alt="重度捲動；合成器是在 JavaScript 上被封鎖。">

## 解彈跳您的捲動處理常式

上述兩項問題的解決方案是一樣的：您應該總是針對下一個 `requestAnimationFrame` 回呼，解彈跳視覺變更：

{% highlight javascript %}
function onScroll (evt) {

  // Store the scroll value for laterz.
  lastScrollY = window.scrollY;

  // Prevent multiple rAF callbacks.
  if (scheduledAnimationFrame)
    return;

  scheduledAnimationFrame = true;
  requestAnimationFrame(readAndUpdatePage);
}

window.addEventListener('scroll', onScroll);
{% endhighlight %}

這樣做也有另一好處，那就是讓您的輸入處理常式保持輕重量，現在你就不必以高運算成本的程式碼，來封鎖捲動或輕觸等事件了，太好了！


