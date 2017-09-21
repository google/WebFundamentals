project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 學習如何在您應用程式中動畫處理強制回應檢視。

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# 動畫處理強制回應檢視 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


強制回應檢視是針對重要訊息使用，而且您必須有很好的理由，才能如此封鎖使用者介面。 慎用之，因為它們具有中斷性，過度使用的話，很容易破壞使用者體驗。 但在某些情況下，這卻是該使用的正確檢視方式，而且加入動畫會帶來一些活力。

### TL;DR {: .hide-from-toc }
- 強制回應檢視應慎用；如果您非必要地打斷了他們的體驗，使用者會感到失望。
- 為動畫加入拓展，可提供不錯的「意想不到」效果。
- 要記得在使用者關閉強制回應檢視時，快速清除它，但是您應該用慢一點的速度把它帶進螢幕，以免嚇到使用者。


<img src="images/dont-press.gif" alt="動畫處理強制回應檢視。" />

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/modal-view-animation.html">請參閱範例。</a>

強制回應重疊應對齊檢視區，所以它需要將其 `position` 設定為 `fixed`：


    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    
      pointer-events: none;
      opacity: 0;
    
      will-change: transform, opacity;
    }
    

它的初始 `opacity` 為 0，所以它會隱藏而無法看到，但然而它還需要 `pointer-events` 設定為 `none`，讓點擊和輕觸能穿越。 如果不這樣，它會封鎖所有互動，讓整個頁面無法回應。 最後，因為它將會動畫處理其 `opacity` 、 `transform` 以及那些必須以 `will-change` 標記為變動的項目 (也請參閱 [使用 will-change 屬性](animations-and-performance#using-the-will-change-property))。

當檢視可見時，它將需要接受互動，並具有值為 1 的 `opacity`：


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

現在每當需要強制回應檢視時，您可以使用 JavaScript 來切換「可見」類別：


    modal.classList.add('visible');
    

在此時，強制回應檢視將不帶任何動畫出現，所以它現在可以新增於
 (也請參閱 [自訂緩動](custom-easing))：


    .modal {
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    
      -webkit-transition:
        -webkit-transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

新增 `scale` 於變形，會讓檢視看來就像輕輕丟到螢幕上，這是一個不錯的效果。 預設轉換會以自訂曲線和 0.1 秒的持續時間，套用於變形和透明度屬性。

持續時間很短，不過這很適合當使用者關閉檢視，並想要回到您的應用程式時。 缺點在於當強制回應檢視出現時，這又可能過於侵略性。 若要修復此問題，您應該覆寫 `visible` 類別的轉換值：


    .modal.visible {
    
      -webkit-transform: scale(1);
      transform: scale(1);
    
      -webkit-transition:
        -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

現在強制回應檢視會以 0.3 秒以登上螢幕，降低了侵略性，但它會很快關閉，而有些使用者較喜歡這種設計。



