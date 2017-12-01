project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:瞭解如何緩和或加強您的動畫。

{# wf_updated_on:2016-08-23 #}
{# wf_published_on:2014-08-08 #}

# 緩動的基礎知識 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

自然界中沒有東西是從一點呈線性地移動到另一點。現實中，物體在移動時往往會加速或減速。我們的大腦習慣於期待這種運動，因此在做動畫時，應利用此規律。自然的運動會讓用戶對您的應用感覺更舒適，從而產生更好的總體體驗。

### TL;DR {: .hide-from-toc }
* 緩動使您的動畫感覺更自然。
* 爲 UI 元素選擇緩出動畫。
* 避免緩入或緩入緩出動畫，除非可以使其保持簡短；這類動畫可能讓最終用戶覺得很遲鈍。


在經典動畫中，緩慢開始然後加速的動畫術語是“慢入”，快速開始然後減速的動畫被稱爲“慢出”。網絡上對於這些動畫最常用的術語分別是“緩入”和“緩出”。有時兩種動畫相組合，稱爲“緩入緩出”。緩動實際上是使動畫不再那麼尖銳或生硬的過程。

## 緩動關鍵字

CSS 變換和動畫都允許您[選擇要爲動畫使用的緩動類型](choosing-the-right-easing)。您可以使用影響相關動畫的緩動（或有時稱爲 `timing`）的關鍵字。還可以[完全自定義您的緩動](custom-easing)，藉此方式更自由地表達應用的個性。

以下是可在 CSS 中使用的一些關鍵字：

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

資料來源：[CSS 變換，W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

還可以使用 `steps` 關鍵字，它允許您創建具有離散步驟的變換，但上面列出的關鍵字對於創建感覺自然的動畫最有用，並且這絕對是您要的效果。

## 線性動畫

<div class="attempt-right">
  <figure>
    <img src="images/linear.png" alt="線性緩動動畫的曲線。" />
  </figure>
</div>

沒有任何緩動的動畫稱爲**線性**動畫。線性變換的圖形看起來像這樣：

隨着時間推移，其值以等量增加。採用線性運動時，動畫內容往往顯得很僵硬，不自然，讓用戶覺得不協調。一般來說，應避免線性運動。

不管通過 CSS 還是 JavaScript 來編寫動畫代碼，您將發現始終有線性運動的選項。 

[查看線性動畫](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-linear.html){: target="_blank" .external }

<div style="clear:both;"></div>

要通過 CSS 實現上述效果，代碼將類似下面這樣：


    transition: transform 500ms linear;
    


## 緩出動畫

<div class="attempt-right">
  <figure>
    <img src="images/ease-out.png" alt="緩出動畫的曲線。" />
  </figure>
</div>

緩出使動畫在開頭處比線性動畫更快，還會在結尾處減速。

緩出一般最適合界面，因爲開頭時快速使動畫有反應快的感覺，同時在結尾仍允許有一點自然的減速。

[查看緩出動畫](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-out.html){: target="_blank" .external }

<div style="clear:both;"></div>

有很多方法來實現緩出效果，但最簡單的方法是 CSS 中的 `ease-out` 關鍵字：


    transition: transform 500ms ease-out;
    


## 緩入動畫

<div class="attempt-right">
  <figure>
     <img src="images/ease-in.png" alt="緩入動畫的曲線。" />
  </figure>
</div>

緩入動畫開頭慢結尾快，與緩出動畫正好相反。

這種動畫像沉重的石頭掉落一樣，開始時很慢，然後快速地重重撞擊地面，突然沉寂下來。

但是，從交互的角度來看，緩入可能讓人感覺有點不尋常，因爲結尾很突然；在現實中移動的物體往往是減速，而不是突然停止。緩入還有讓人感覺行動遲緩的不利效果，這會對網站或應用的響應速度給人的感覺產生負面影響。

[查看緩入動畫](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in.html){: target="_blank" .external }

<div style="clear:both;"></div>

要使用緩入動畫，與緩出和線性動畫類似，可以使用其關鍵字：


    transition: transform 500ms ease-in;
    

## 緩入緩出動畫

<div class="attempt-right">
  <figure>
    <img src="images/ease-in-out.png" alt="緩入緩出動畫的曲線。" />
  </figure>
</div>

緩入並緩出與汽車加速和減速相似，使用得當時，可以實現比單純緩出更生動的效果。

由於緩入開頭讓動畫有遲鈍感，因此動畫持續時間不要過長。300-500 毫秒的時間範圍通常比較合適，但實際的數量主要取決於項目的感覺。也就是說，由於開頭慢、中間快和結尾慢，動畫將有更強的對比，可能讓用戶感到非常滿意。

[查看緩入緩出動畫](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in-out.html){: target="_blank" .external }

<div style="clear:both;"></div>


要設置緩入緩出動畫，可以使用 `ease-in-out` CSS 關鍵字：


    transition: transform 500ms ease-in-out;
    




{# wf_devsite_translation #}
