project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 您可以用 CSS 或 JavaScript 進行動畫處理。 您應該使用哪一種，以及為什麼？

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# CSS vs JavaScript 動畫 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}


網頁環境中，有兩種主要方式可以建立動畫：以 CSS 或 JavaScript。 選擇哪一種取決於您專案的相依性，以及您想實現的效果。

### TL;DR {: .hide-from-toc }
- 針對簡單的「一次性」轉換，像切換 UI 元素狀態等，請使用 CSS 動畫。
- 當您想要擁有進階的效果，像彈跳、停止、暫停、倒帶或減速時，請使用 JavaScript 動畫。
- 如果您選擇使用 JavaScript 進行動畫處理，請採用 TweenMax，或者較輕量級的解決方案 TweenLite。


最基本的動畫可以使用 CSS 或 JavaScript 建立，但差別在於投入的時間和精力多寡 (也請參閱 [CSS vs JavaScript 效能](animations-and-performance#css-vs-javascript-performance))。 兩種各有其優點和缺點，但以下是經驗法則：

* **針對 UI 元素若是擁有較小、自成一體的狀態，使用 CSS。** CSS 轉換和動畫最適合從側面帶進導覽功能表，或顯示工具提示。 您最終可能會使用 JavaScript 來控制狀態，但動畫本身會存在於您的 CSS 內。
* **當您想有效控制您的動畫時，請使用 JavaScript。** 會動態追蹤一輕觸位置的東西，您必須停止、暫停、減速或倒轉的動畫，通常會要求您使用 JavaScript。

如果您已經在使用包含動畫功能的 jQuery 或 JavaScript 架構，您會發現整體上而言，堅守此技術處理動畫比較方便，而非切換為 CSS。

### 以 CSS 進行動畫處理

毫無疑問，以 CSS 進行動畫處理是讓東西在螢幕上移動的最簡單方法。

下面的 CSS 會在 X 與 Y 軸上將元素移動 100px 的距離。 它是使用設定耗時 500ms 的 CSS 轉換完成。 當新增 `move` 類別時，`transform` 值會變更且轉換開始。


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
    

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-simple.html">請見範例</a>

除了轉換的持續時間之外，同時也提供緩動的選項；緩動基本上是指動畫的操作感。 在 [「緩動基本知識」](the-basics-of-easing.html) 指南中，您可以取得更多相關資訊。

如以上摘要，如果您建立單獨的 CSS 類別來管理您的動畫，那麼就可以使用 JavaScript 來開關每個動畫：


    box.classList.add('move');
    

這樣做將可為您的應用程式提供很好的平衡。 您可以專注於以 JavaScript 管理狀態，並只要在目標元素上設定適當的類別即可，讓瀏覽器自己去處理動畫。 如果您選擇這條路線，您可以聆聽元素上的 `transitionend` 事件，但只有您能夠放棄對舊版本 Internet Explorer 的支援時；版本 10 是支援這些事件的第一個版本。 其他所有的瀏覽器都已支援此事件有一段時間了。

聆聽轉換結束所需的 JavaScript 如下所示：


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

除了使用 CSS 轉換之外，您還可以使用 CSS 動畫，這可允許您更進一步控制個別動畫的主要畫面格、持續時間與和反覆運算。

Note: 如果您是動畫新手，主要畫面格是手繪動畫界的一個古老術語。 動畫師會針對一段行為建立特定的畫面，稱之主要畫面格，這部分納入了某些動作中最極端的部分，然後動畫師再開始繪製主要畫面格之間的所有個別畫面。 目前的 CSS 動畫，我們也有類似程序 -- 我們向瀏覽器指示 CSS 屬性在特定點必需具備的值，然後它會自動補上空白部分。

例如，您可以與轉換相同的方式，動畫處理方塊，但動畫處理時讓它不需要如點擊等使用者互動動作，並帶有無限重複功能。 您還可以同時變更多個屬性：


    /**
     * This is a simplified version without
     * vendor prefixes. With them included
     * (which you will need) things get far
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
    

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-keyframes.html">請見範例</a>

使用 CSS 動畫時，您獨立於目標元素之外來定義動畫本身，然後使用 animation-name 屬性來選擇所需的動畫。

CSS 動畫大部分仍是廠商預先指定選擇導向，`-webkit-` 用於 Chrome、Safari、Opera、Safari Mobile 和 Android 瀏覽器中。 Internet Explorer 與 Firefox 出廠並無預先指定。 許多工具將協助您建立所需的 CSS 預先指定版本，讓您在原始碼檔案中撰寫未預先指定的版本。

### 以 JavaScript 進行動畫處理

相較之下，以 JavaScript 建立動畫比撰寫 CSS 轉換或動畫來得複雜，但它確實能為身為開發人員的您，提供高出許多的功能。 一般的做法是使用 `requestAnimationFrame` ，並在動畫的每一畫面上手動決定要動畫處理的元素的每一個屬性值。

Note: 您可能會在網頁上看到針對動畫使用 setInterval 或 setTimeout 的程式碼。 這是一個可怕的主意，因為動畫不會針對螢幕重新整理頻率同步處理，且極有可能出現顫抖和略過現象。 您應該一律避免這樣的程式碼，改為使用會適當同步處理的 requestAnimationFrame。

以下是重新建立我們先前討論過的 CSS 轉換所需撰寫的 JavaScript。


    function Box () {
    
      var animationStartTime = 0;
      var animationDuration = 500;
      var target = document.querySelector('.box');
    
      this.startAnimation = function() {
        animationStartTime = Date.now();
        requestAnimationFrame(update);
      };
    
      function update() {
        var currentTime = Date.now();
        var positionInAnimation = (currentTime - animationStartTime) / animationDuration;
    
        var xPosition = positionInAnimation * 100;
        var yPosition = positionInAnimation * 100;
    
        target.style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';
    
        if (positionInAnimation <= 1)
          requestAnimationFrame(update);
      }
    }
    
    var box = new Box();
    box.startAnimation();
    

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-js.html">請見範例</a>

當您嘗試將它擴大到包含更多情況時，程式碼開始變得非常複雜並難以管理，所以一般來說，從可供動畫使用的眾多 JavaScript 程式庫擇一個來使用，將有助於您。 如果您已經在專案中使用 jQuery，您將受益於堅守使用它以及使用 [`.animate()`](http://api.jquery.com/animate/){: .external } 功能。 在另一方面，如果您需要一個專用的程式庫，那麼就試一下 [Greensock 的 TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)，它的功能非常強大。 它也備有輕量級版本，叫 TweenLite，就檔案大小的角度而言，它耗用的資源較少。

由於在使用 JavaScript 動畫時，您可在每一步驟完全控制元素樣式，因此可以按您的想法減緩、暫停、停止、倒轉與操縱動畫。


