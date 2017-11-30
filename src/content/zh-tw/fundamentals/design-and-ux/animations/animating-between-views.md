project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:瞭解如何在應用的兩個視圖之間設置動畫。

{# wf_updated_on:2016-08-23 #}
{# wf_published_on:2014-08-08 #}

# 在視圖之間設置動畫 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

您常常需要讓用戶在應用的各視圖之間切換，不管是從列表換到詳情視圖，還是顯示邊欄導航。在這些視圖之間設置動畫可以吸引用戶，並讓您的項目更生動活潑。

### TL;DR {: .hide-from-toc }
* 使用變換來切換不同視圖；避免使用 `left`、`top` 或任何其他會觸發佈局的屬性。
* 確保使用的所有動畫簡潔明快，並且設置較短的持續時間。
* 考慮在屏幕尺寸增大時您的動畫和佈局如何變化；考慮哪些適合小屏幕的動畫用在桌面環境時可能看起來很怪。

這些視圖變換的外觀及行爲在很大程度上取決於您所處理的視圖類型。例如，給視圖上層的模態疊加層設置動畫，會帶來一種與在列表和詳情視圖之間變換不同的體驗。

成功：力求使所有動畫保持 60fps。這樣，用戶不會覺得動畫卡頓，從而不會影響其使用體驗。確保任何動畫元素爲您打算在動畫開始之前更改的任何內容設置了 `will-change`。對於視圖變換，您很可能要使用 `will-change: transform`。

## 使用變換來切換不同視圖

<div class="attempt-left">
  <figure>
    <img src="images/view-translate.gif" alt="在兩個視圖之間變換" />
  </figure>
</div>

爲簡單起見，我們假定有兩個視圖：一個列表視圖和一個詳情視圖。當用戶點按列表視圖內的列表項時，詳情視圖將滑入屏幕，並且列表視圖滑出。

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views.svg" alt="視圖層次。" />
  </figure>
</div>

要實現此效果，您需要一個容納這兩個視圖的容器，併爲容器設置 `overflow: hidden`。這樣兩個視圖可以並排放在容器內，而不顯示任何水平滾動條，並且每個視圖可以按需在容器內側向滑動。

<div style="clear:both;"></div>

此容器的 CSS 代碼爲：


    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    

容器的位置被設置爲 `relative`。這意味着，其中的每個視圖可以絕對定位在左上角，然後通過變形移動位置。此方法比使用 `left` 屬性性能更佳（因爲該屬性會觸發佈局和繪圖），並且通常更容易合理化。


    .view {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    
      /* let the browser know we plan to animate
         each view in and out */
      will-change: transform;
    }
    

在 `transform` 屬性上添加 `transition` 可實現不錯的滑動效果。爲實現不錯的感覺，它使用了自定義的 `cubic-bezier` 曲線，我們在[自定義緩動指南](custom-easing)中討論了該曲線。


    .view {
      /* Prefixes are needed for Safari and other WebKit-based browsers */
      transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }
    

屏幕之外的視圖應變換到右側，因此在這種情況下需要移動詳情視圖：


    .details-view {
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    

現在，需要少量 JavaScript 來處理類。這將切換視圖上相應的類。


    var container = document.querySelector('.container');
    var backButton = document.querySelector('.back-button');
    var listItems = document.querySelectorAll('.list-item');
    
    /**
     * Toggles the class on the container so that
     * we choose the correct view.
     */
    function onViewChange(evt) {
      container.classList.toggle('view-change');
    }
    
    // When you click a list item, bring on the details view.
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', onViewChange, false);
    }
    
    // And switch it back again when you click the back button
    backButton.addEventListener('click', onViewChange);
    

最後，我們爲這些類添加 CSS 聲明。


    .view-change .list-view {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    
    .view-change .details-view {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    
[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/inter-view-animation.html){: target="_blank" .external }

您可以擴展此示例以包括多個視圖，基本概念仍是一樣；每個不可見視圖應在屏幕之外，並按需進入屏幕，同時當前屏幕視圖應移走。

注意：以跨瀏覽器的方式設計此類層次結構可能很難。例如，iOS 需要額外的 CSS 屬性 <code>-webkit-overflow-scrolling: touch</code> 來“重新啓用”拋式滾動，但是您不能像使用標準溢出屬性一樣，控制動作所針對的軸。一定要在各種設備上測試您的實現方法！

除了在視圖之間變換之外，此技術還能應用於其他滑入元素，例如邊欄導航元素。唯一差異是不需要移動其他視圖。

## 確保動畫在較大屏幕上正常顯示

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views-ls.svg" alt="大屏幕上的視圖層次。" />
  </figure>
</div>

對於較大屏幕，始終應讓列表視圖留在周圍，而不是將其移除，並且從右側滑入詳情視圖。它與處理導航視圖幾乎一樣。






{# wf_devsite_translation #}
