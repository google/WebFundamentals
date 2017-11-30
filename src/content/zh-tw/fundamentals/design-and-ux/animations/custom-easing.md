project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:不走尋常路，爲項目創建完全自定義的動畫。

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# 自定義緩動 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

有時您不想使用 CSS 隨附的緩動關鍵字，或者要使用 Web Animations 或 JavaScript 框架。在這些情況下，一般可以定義自己的曲線（或公式），這讓您能更好地控制項目動畫的感覺。

### TL;DR {: .hide-from-toc }
* 自定義緩動使您能夠給項目提供更多個性。
* 您可以創建與默認動畫曲線（緩出、緩入等）相似的三次貝塞爾曲線，只是重點放在不同的地方。
* 當需要對動畫時間和行爲（例如彈性或彈跳動畫）進行更多控制時，請使用 JavaScript。


如果使用 CSS 編寫動畫，您將發現可以通過定義三次貝塞爾曲線來定義時間。事實上，關鍵字 `ease`、`ease-in`、`ease-out` 和 `linear` 映射到預定義的貝塞爾曲線，詳細說明請參考 [CSS 變換規範](http://www.w3.org/TR/css3-transitions/) 和 [Web Animations 規範](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve)。

這些貝塞爾曲線有四個值，即 2 對數字，每對數字描述三次貝塞爾曲線的控制點的 X 和 Y 座標。貝塞爾曲線的起點座標爲 (0, 0)，終點座標爲 (1, 1)；由您設置兩個控制點的 X 和 Y 值。兩個控制點的 X 值必須在 0 到 1 之間，每個控制點的 Y 值可以超過 [0, 1] 限制，但此規範未說明可超過多少。

更改每個控制點的 X 和 Y 值將實現截然不同的曲線，從而使動畫有截然不同的感覺。例如，如果第一個控制點在右下角，則動畫在開頭緩慢。如果它在左上角，動畫在開頭會顯得很快。相反，如果第二控制點在網格的右下角，則動畫在結尾處變快；而在左上角時，動畫將在結尾處變慢。

爲了對比，以下有兩條曲線：一條典型的緩入緩出曲線和一條自定義曲線：

<div class="attempt-left">
  <figure>
    <img src="images/ease-in-out-markers.png" alt="緩入緩出動畫的曲線。" />
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/custom.png" alt="自定義動畫的曲線。" />
  </figure>
</div>

[查看自定義緩動的動畫](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-custom-curve.html){: target="_blank" .external }

此自定義曲線的 CSS 爲：


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

前兩個數字是第一個控制點的 X 和 Y 座標，後兩個數字是第二個控制點的 X 和 Y 座標。

製作自定義曲線很有趣，您可以有效控制對動畫的感覺。以上述曲線爲例，您可以看到曲線與經典的緩入緩出曲線相似，但緩入即“開始”部分縮短，而結尾減速部分拉長。

使用此[動畫曲線工具](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html){: target="_blank" .external }進行試驗，並查看此曲線如何影響動畫的感覺。

## 使用 JavaScript 框架實現更多控制

有時您需要三次貝塞爾曲線未能提供的更多控制。如果您需要彈跳的感覺，您可以考慮使用 JavaScript 框架，因爲使用 CSS 或 Web Animations 很難實現這個效果。

### TweenMax

[GreenSock 的 TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)（或 TweenLite，如果您想要超輕量版本）是一個強大的框架，您可以在小型 JavaScript 庫中獲得很多控制，它是一個非常成熟的代碼庫。

[查看彈性緩動的動畫](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-elastic.html){: target="_blank" .external }

要使用 TweenMax，請在頁面中包括此腳本：


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

將該腳本放到合適位置後，您可以對元素調用 TweenMax，並且告訴它您想要的任何緩動，以及您想要哪些屬性。有大量緩動選項可供使用；以下代碼使用一個彈性緩出：


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

[TweenMax 文檔](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/)重點說明了您使用的所有選項，非常值得一讀。





{# wf_devsite_translation #}
