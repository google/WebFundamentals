project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 另闢蹊徑，為您的專案建立完全自訂的動畫。

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# 自訂緩動 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}


有時您不會想使用 CSS 內建的緩動關鍵字，或您將會使用 JavaScript 架構的動畫程式庫。 在這兩種情況，通常可以定義您自己的曲線 (或方程式)，而這可讓您高度控制您專案動畫的操作感。

### TL;DR {: .hide-from-toc }
- 自訂緩動將可讓您為專案帶來更多個性。
- 您可以建立類似於預設動畫曲線 (緩出、緩入等) 的三次方貝茲曲線，兩者的著重在於不同地方。
- 當您需要進一步控制權動畫的計時和行為時，請使用 JavaScript（例如 彈性或彈跳動畫）。


如果您正以 CSS 進行動畫處理，您會發現可以定義三次方貝茲曲線來定義計時。 事實上，關鍵字`ease` 、`ease-in`、`ease-out` 和 `linear` 對應至預先定義的貝茲曲線，這在 [CSS 轉換規格](http://www.w3.org/TR/css3-transitions/)中有詳述。

在 CSS 中，這些貝茲曲線會取四個值或 2 組數字，每一組都描述一條三次方貝茲曲線控制點的 X 和 Y 座標。  貝茲曲線的起始點座標為 (0, 0)，結束座標是 (1, 1)；您可以設定這兩個控制點的 X 和 Y 值。 兩個控制點的 X 值必須介於 0 和 1 之間，而每個控制點的 Y 值可以超出 [0, 1] 限制，不過規格對於其幅度並未明確說明！

變更每個控制點的 X 和 Y 值會呈現出非常不同的曲線，因此對您動畫也會有相當大差別的操作感。 例如，如果第一個控制點是在右下角，動畫將緩慢啟動。 如果是在左上方，它會快速啟動。 反之，如果第二個控制點位於格線右下角，結束時就會很快，要是在左上角，結束時將會緩慢。

做為對照，這裡有兩條曲線：一般的緩入緩出動畫曲線和自訂曲線：

<img src="images/ease-in-out-markers.png" style="display: inline; max-width: 300px" alt="緩入緩出動畫曲線。" />
<img src="images/custom.png" style="display: inline; max-width: 300px" alt="自訂動畫曲線。" />

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-custom-curve.html">請見帶自訂緩動的動畫。</a>

自訂曲線的 CSS 為：


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

第一組數字是第一個控制點的 X 和 Y 座標，第二組數字是第二個控制點的 X 和 Y 座標。

製作自訂曲線很有趣，並可讓您有效控制動畫的操作感。 例如，以上述曲線而言，您可以看到曲線類似於一般的緩入緩出曲線，但緩入較短 (或稱「開展」部分)，而結束則為拉長的減速。

以此動畫曲線工具實驗， <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html">看看曲線</a> 對動畫操作感的影響。

## 使用 JavaScript 以進一步控制

有時候您會需要超過一條三次方貝茲曲線所能提供的控制力。 也許您想要彈性彈跳的操作感，或者您想要停止動畫部分的執行，這兩個功能若是使用 CSS 會比較難以達成。 在這種情況下，您應該使用 JavaScript 動畫程式庫。 目前最好的程式庫之一就是 [Greensock 的 TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (或 TweenLite，如果您想要保持超輕量)，因為您可以一個小小的 JavaScript 程式庫即可獲得高度控制能力，而且這是非常成熟的程式碼基底。

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-elastic.html">請見彈性緩動動畫。</a>

要使用如 TweenMax 的技術，請在您的網頁中納入以下指令碼：


    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

一旦安裝好，您可以呼叫 TweenMax 作用於您的元素上，並告訴它您要使用哪些屬性，搭配您要使用的任何緩動。 您可以使用的緩動選項多不勝數；以下的程式碼使用一種彈性緩出：


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

[TweenMax 文件](http://greensock.com/docs/#/HTML5/GSAP/TweenMax/) 重點提示了此處的所有選項，它非常值得一讀。



