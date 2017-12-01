project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:您可以通過 CSS 或 JavaScript 編寫動畫。應使用哪種方式，爲什麼？

{# wf_updated_on: 2016-08-25 #}
{# wf_published_on: 2014-08-08 #}

# CSS 對比 JavaScript 動畫 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

在網頁上創建動畫有兩種主要方法：使用 CSS 和使用 JavaScript。您選擇哪種方法實際上取決於項目的其他依賴關係，以及您嘗試實現什麼類型的效果。

### TL;DR {: .hide-from-toc }
* 使用 CSS 動畫來實現較簡單的“一次性”轉換，例如切換 UI 元素狀態。
* 當您需要高級效果（例如彈跳、停止、暫停、倒退或減速）時，請使用 JavaScript 動畫。
* 如果選擇使用 JavaScript 來編寫動畫，可選用 Web Animations API 或用起來順手的現代框架。


大多數基本動畫可以使用 CSS 或 JavaScript 來創建，但工作量和時間將有所不同（另請參考 [CSS 對比 JavaScript 的性能](animations-and-performance#css-vs-javascript-performance)）。每一種方法都有其優點和缺點，但以下內容是很好的指導原則：

* **當您爲 UI 元素採用較小的獨立狀態時，使用 CSS。** CSS 變換和動畫非常適合於從側面引入導航菜單，或顯示工具提示。最後，可以使用 JavaScript 來控制狀態，但動畫本身是採用 CSS。
* **在需要對動畫進行大量控制時，使用 JavaScript。** Web Animations API 是一個基於標準的方法，現已在 Chrome 和 Opera 中提供。該方法可提供實際對象，非常適合複雜的對象導向型應用。在需要停止、暫停、減速或倒退時，JavaScript 也非常有用。
* **如果您需要手動協調整個場景，可直接使用 `requestAnimationFrame`。**這屬於高級 JavaScript 方法，但如果您構建遊戲或繪製到 HTML 畫布，則該方法非常有用。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WaNoqBAp8NI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

或者，如果您已使用包括動畫功能的 JavaScript 框架，比如通過 jQuery 的 [`.animate()`](https://api.jquery.com/animate/){: .external } 方法或 [GreenSock 的 TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)，則可能發現繼續使用該方法實現動畫在總體上更方便。

<div class="clearfix"></div>

## 使用 CSS 編寫動畫

使用 CSS 編寫動畫是使內容在屏幕上移動的最簡單方式。此方法被稱爲*聲明式*，因爲您可以指定您想要的結果。

以下是一些 CSS 代碼，讓一個元素同時在 X 軸和 Y 軸上移動 100px。其實現方法是使用 CSS 變換，用時設置爲 500 毫秒。當添加了 `move` 類時，`transform` 值被改變並且變換開始。


    .box {
      -webkit-transform: translate(0, 0);
      -webkit-transition: -webkit-transform 500ms;
    
      transform: translate(0, 0);
      transition: transform 500ms;
    }
    
    .box.move {
      -webkit-transform: translate(100px, 100px);
      transform: translate(100px, 100px);
    }
    
[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-simple.html){: target="_blank" .external }

除了變換的持續時間之外，還有針對*緩動*的選項，緩動基本上是動畫表現的方式。如需詳細瞭解關於緩動的信息，請參閱[緩動基礎知識](the-basics-of-easing)指南。

如果在上述代碼段中，您創建單獨的 CSS 類來管理動畫，則可以使用 JavaScript 來打開和關閉每個動畫：


    box.classList.add('move')；
    

此操作將給您的應用帶來良好的平衡。您可以側重於使用 JavaScript 來管理狀態，只需在目標元素上設置相應的類，讓瀏覽器去處理動畫。如果您按照這種方法，則可以偵聽元素的 `transitionend` 事件，但前提是您能夠放棄對 Internet Explorer 較舊版本的支持；IE 10 是支持這些事件的首個版本。所有其他瀏覽器均已支持此事件有一段時間了。

偵聽變換結束所需的 JavaScript 如下所示：


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

除了使用 CSS 變換之外，還可以使用 CSS 動畫，這允許您對單個動畫關鍵幀、持續時間和迭代進行更多控制。

注：如果您是動畫初學者，那麼說明一下，關鍵幀是來自手繪動畫的老術語。動畫設計者爲一個片段創建多個特定幀，稱爲關鍵幀，關鍵幀將提供某個動作的起止狀態，然後它們開始繪出關鍵幀之間的所有單個幀。現在我們使用 CSS 動畫也有相似的過程，我們指示瀏覽器，CSS 屬性在指定時點需要什麼值，然後瀏覽器填充其中的間隔。

例如，可以使用與變換相同的方式爲方框設置動畫，但是設置動畫時沒有任何用戶交互（例如點擊），而是採用無限重複。還可以同時更改多個屬性：


    /**
     * This is a simplified version without
     * vendor prefixes.With them included
     * (which you will need), things get far
     * more verbose!
     */
    .box {
      /* Choose the animation */
      animation-name: movingBox;
    
      /* The animation’s duration */
      animation-duration: 1300ms;
    
      /* The number of times we want
          the animation to run */
      animation-iteration-count: infinite;
    
      /* Causes the animation to reverse
          on every odd iteration */
      animation-direction: alternate;
    }
    
    @keyframes movingBox {
      0% {
        transform: translate(0, 0);
        opacity: 0.3;
      }
    
      25% {
        opacity: 0.9;
      }
    
      50% {
        transform: translate(100px, 100px);
        opacity: 0.2;
      }
    
      100% {
        transform: translate(30px, 30px);
        opacity: 0.8;
      }
    }
    

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-keyframes.html){: target="_blank" .external }

藉助 CSS 動畫，可獨立於目標元素來定義動畫本身，並且使用 animation-name 屬性來選擇所需的動畫。

CSS 動畫在某種程度上仍採用供應商前綴，在 Safari、Safari Mobile 和 Android 瀏覽器中使用`-webkit-`。Chrome、Opera、Internet Explorer 和 Firefox 均不採用前綴。許多工具可幫助您創建所需的 CSS 前綴版本，使您能夠在源文件中編寫無前綴的版本。

## 使用 JavaScript 和 Web Animations API 編寫動畫

比較而言，使用 JavaScript 創建動畫比編寫 CSS 變換或動畫更復雜，但它一般可爲開發者提供更多功能。您可以使用 [Web Animations API](https://w3c.github.io/web-animations/) 給特定的 CSS 屬性設置動畫，或構建可組合的效果對象。

JavaScript 動畫是*命令式*，因爲您將它們作爲代碼的一部分嵌入代碼中。您還可以將它們封裝在其他對象內。以下是在重新創建我們之前所討論的 CSS 變換時需要編寫的 JavaScript：


    var target = document.querySelector('.box');
    var player = target.animate([
      {transform: 'translate(0)'},
      {transform: 'translate(100px, 100px)'}
    ], 500);
    player.addEventListener('finish', function() {
      target.style.transform = 'translate(100px, 100px)';
    });
    

默認情況下，Web Animations 僅修改元素的呈現形式。如果您想讓您的對象保持在它已移動到的位置，則應在動畫完成時，按照我們的示例修改其底層樣式。

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-wa.html){: target="_blank" .external }

Web Animations API 是來自 W3C 的新標準，在 Chrome 和 Opera 中受原生支持，且[正在進行鍼對 Firefox 的開發](https://birtles.github.io/areweanimatedyet/){: .external }。對於其他的現代瀏覽器，[提供 polyfill](https://github.com/web-animations/web-animations-js)。

使用 JavaScript 動畫，您可以完全控制元素在每個步驟的樣式。這意味着您可以在您認爲合適時減慢動畫、暫停動畫、停止動畫、倒退動畫和操縱元素。如果您正在構建複雜的對象導向型應用，則此方法特別有用，因爲您可以正確封裝您的行爲。


{# wf_devsite_translation #}
