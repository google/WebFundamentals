project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:瞭解如何爲應用中的模態視圖設置動畫。

{# wf_updated_on:2016-08-24 #}
{# wf_published_on:2014-08-08 #}

# 給模態視圖設置動畫 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/dont-press.gif" alt="給模態視圖設置動畫。" />
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/modal-view-animation.html" target="_blank" class="external">試一下</a>
    </figcaption>
  </figure>
</div>

模態視圖用於重要消息，並且您有很好的理由來阻止用戶界面。應謹慎使用模態視圖，因爲它們具有破壞性，如果過度使用，會很容易破壞用戶體驗。但是，在某些情況下，它們是適合使用的視圖，並且加上一些動畫將使其變得生動。

### TL;DR {: .hide-from-toc }
* 應謹慎使用模態視圖；如果不必要地打斷用戶的體驗，他們會感到失望。
* 給動畫加上縮放可實現不錯的“掉落”效果。
* 當用戶關閉模態視圖時，應迅速將其清除。但是，應讓模態視圖以較慢的速度進入屏幕，以防使用戶感到突然。

<div class="clearfix"></div>

模態疊加層應與視口對齊，因此需要將其 `position` 設置爲 `fixed`：


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
    

其初始 `opacity` 爲 0，因此在視圖中被隱藏，而且還需要將 `pointer-events` 設置爲 `none`，使點擊和觸摸事件能夠穿過。若不設置，它將阻止所有交互，使整個頁面無響應。最後，由於它將對其 `opacity` 和 `transform` 設置動畫，因此需要使用 `will-change` 將這些屬性標記爲“即將更改”（另請參考[使用 will-change 屬性](animations-and-performance#using-the-will-change-property)）。

當視圖可見時，需要接受交互並且將 `opacity` 設置爲 1：


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

現在，每當需要模態視圖時，可以使用 JavaScript 來切換“visible”類：


    modal.classList.add('visible')；
    

此時，模態視圖出現時沒有任何動畫，因此您現在可以在以下位置加入動畫（另請參考[自定義緩動](custom-easing)）：



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
    

給變形屬性加上 `scale` 使視圖好像輕輕掉到屏幕上，這是一種不錯的效果。同時給變形和透明度屬性應用默認變換，採用自定義曲線和 0.1 秒持續時間。

這個持續時間很短，但在用戶消除視圖並且希望返回應用時，效果非常好。缺點是：模態視圖在出現時可能會太突然。要修復此問題，應替換 `visible` 類的變換值：


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
    

現在模態視圖用 0.3 秒時間進入屏幕，沒那麼突然，但是會快速消除，這樣用戶會喜歡。





{# wf_devsite_translation #}
