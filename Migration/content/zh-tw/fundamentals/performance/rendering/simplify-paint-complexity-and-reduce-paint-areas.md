---
title: "簡化繪製複雜性並降低繪製區域"
description: "繪製是填入最終會合成到使用者螢幕上的像素之過程。 這往往是管道中所有任務耗時最長的一項，也是該儘可能避免的一項。"
updated_on: 2015-03-20
notes:
  highdpi:
    - 「在固定的高 DPI 螢幕元素上，位置會自動升階至本身的合成器層。 但低 DPI 裝置則非如此，因為升階會將文字轉譯從次像素變更為灰階，而且層升階必須以手動完成。」

key-takeaways:
  - 變更變形或透明度之外的任何屬性，一定會觸發繪製。
  - 繪製往往是像素管道中最高成本的一部分；儘可能避免這個動作。
  - 透過層升階和動畫的協調流程，以減少繪製區域。
  - 使用 Chrome DevTools 繪製分析工具以評估繪製複雜性和成本；儘可能減少這個動作。


---
<p class="intro">
  繪製是填入最終會合成到使用者螢幕上的像素之過程。 這往往是管道中所有任務耗時最長的一項，也是該儘可能避免的一項。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

如果您觸發版面配置，就 _一定會觸發器繪製_，因為變更任何元素的幾何形狀代表其像素需要修正！

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg" class="g--centered" alt="完整的像素管道。">

如果您變更非幾何形狀的屬性，如背景、文字顏色或陰影，也可能會觸發繪製。 在這些情況下不需要版面配置，而管道看起來會像這樣：

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg" class="g--centered" alt="無版面配置的像素管道。">

## 使用 Chrome DevTools，以迅速識別出繪製瓶頸

您可以使用 Chrome DevTools 以快速識別正在被繪製的區域。 前往 DevTools 並按您鍵盤上的 Esc 鍵。 前往出現的面板中的轉譯標籤，並選擇「顯示繪製長方形」：

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" class="g--centered" alt="這會在 DevTools 中顯示繪製長方形選項。">

在此選項開啟的情況下，每當發生繪製時，Chrome 都會閃綠色螢幕。 如果您看到整個螢幕閃綠色，或是看到您認為不應繪製的螢幕區域，那麼您應該再深入探究問題。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg" class="g--centered" alt="每當繪製時，網頁就會閃綠色。">

Chrome DevTools 的時間軸中有一個選項會提供您更多資訊：繪製分析工具。 若要啟用它，前往「時間軸」，並核取頂部的「繪製」方塊。 _只有試圖分析繪製問題時，才開啟此功能_，因為這麼做會帶來額外負荷，並扭曲您的效能分析，這點很重要。 當您想進一步瞭解正在繪製的內容時，最適合使用它。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" class="g--centered" alt="啟用 Chrome DevTools 中繪製分析的切換。">

從這裡，您現在可以執行「時間軸」錄製，而繪製記錄將提供多出許多的詳細資料。 點擊在一個畫面中的繪製記錄，現在您可以存取得該畫面的繪製分析工具：

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" class="g--centered" alt="叫出繪製分析工具的按鈕。">

按一下繪製分析工具會叫出檢視，讓您看到正在繪製什麼、其所費時間，以及所需的個別繪製呼叫：

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg" class="g--centered" alt="Chrome DevTools Paint Profiler。">

此分析工具會讓您瞭解區域和複雜性 (事實上是繪製的所費時間) ，要是無法避免繪製，這兩個都是您可以試圖修正的地方。

## 將移動或淡化的元素升階

繪製不一定是儲存至記憶體中的單一影像中。 事實上，有必要的話，有可能瀏覽器會繪製進多個影像中 -- 或稱合成器層。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg" class="g--centered" alt="合成器層的代表。">

這種方法的好處在於，元素會定期重新繪製，或帶變形在螢幕上移動的元素，可以在不影響其他元素的情況下進行處理。 這是跟美術套裝程式一樣，如 Sketch、GIMP 或 Photoshop ，個別層可在其他層之上處理和合成，以建立最終的影像。

建立一個新層的最好方法是使用 `will-change` CSS 屬性。 這方法在 Chrome、Opera、Firefox 瀏覽器中可行，而以 `transform` 的值，它會建立新的合成器層：

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

針對不支援 `will-change` 但得益於層建立的瀏覽器，例如 Safari 和 Mobile Safari，您需要(誤)用 3D 變形，以強制一個新層：

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

然而必須小心避免建立過多的層，因為每一個層都需要記憶體與管理。 在 [堅守純合成器屬性和管理層數目](stick-to-compositor-only-properties-and-manage-layer-count) 一節中裡，有更多的相關資訊。

如果您已經將一個元素升階到新層，請使用 DevTools 以確認如此做會帶給您效能好處。 **未先分析，請勿將元素升階。**

## 減少繪製區域

然而有時候元素已升階，但繪製工作仍有必要進行。 繪製問題的一個重大挑戰在於，瀏覽器會聯合需要繪製的兩個區域，而這可能會導致整個螢幕重新繪製。 因此比方說，如果您在網頁頂部有一個固定標頭，而在畫面底部繪製某樣項目，則整個螢幕最終可能會被重新繪製。

{% include shared/remember.liquid title="Note" list=page.notes.highdpi %}

減少繪製區域往往是協調您的動畫和轉換不要經常重疊，或設法避免對網頁的某些部分進行動畫處理的流程。

## 簡化繪製複雜性 
 提到繪製的過程，有些項目比其他項目來得高成本。 例如，任何涉及模糊 (像陰影) 的項目會花更長時間才能繪製 -- 例如 -- 繪製一個紅色方塊。 就 CSS 而言，這個現象不一定顯而易見：`background: red;` 和 `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` 看起來不一定有相當大的效能特性，但實際上卻是。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" class="g--centered" alt="繪製螢幕一部分所需的時間。">

以上的繪製分析工具可讓您判斷，是否需要尋找其他方式來達到您的最終效果。 問問您自己，是否可以使用更低成本的一組樣式或替代方式，實現您的最終結果。

儘可能在過程中避免繪製動作，尤其是動畫的過程，因為每個畫面所需的 **10ms** 通常不足以讓繪製工作完成，尤其是在行動裝置上。


