project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 了解如何柔化並為您的動畫加權。

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# 緩動基礎 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


自然界中沒有樣一東西是從一個點直線移動到另一個點。 在現實中，事物在移動時總會加速或減速。 我們的大腦設計會期待這類動作，所以在動畫處理時，應該加以利用它。 自然動作會讓您的使用者更適應您的應用程式，反過來會帶來更好的整體使用者體驗。

### TL;DR {: .hide-from-toc }
- 緩動會讓您的動畫感覺更自然。
- 為 UI 元素選擇緩出動畫。
- 除非您可以保持動畫持續時間短，否則請避免緩動或緩入緩出動畫；對最終使用者而言，它們往往令人感到遲鈍。


在傳統動畫中，慢慢開始並加快的運動之字眼是「慢入」，而快速開始並減速的動作被稱為「慢出」，但網頁上最常用的字眼分別是「緩入」和「緩出」。 有時兩者合併在一起，稱為「緩入緩出」。 因此，緩動事實上是指讓動畫降低劇烈或顯著感的過程。

## 緩動關鍵字

CSS 轉換和動畫均可讓您 [針對您的動畫選擇想要的緩動種類](choosing-the-right-easing)。 您可以使用影響動畫的緩動 (或有時候稱為計時) 之關鍵字。 您還可以 [完全自訂您的緩動](custom-easing)，給您更多自由以表達您應用程式的個性。

以下是您可以在 CSS 中使用的關鍵字：

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

資料來源： [CSS Transitions, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

您也可以使用一個 `steps` 關鍵字，讓您建立具有分離步驟的轉換，但以上的關鍵字對於建立感覺自然的動畫才最實用，而這正是您想要達成的。

## 線性動畫

不帶任何緩動的動畫被稱為 **線性**。 線性轉換的圖形看似這樣：

<img src="images/linear.png" style="max-width: 300px" alt="線性緩動動畫曲線。" />

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-linear.html">請參閱線性動畫。</a>

隨著時間的推移，值會以等量增加。 直線動作的東西往往感覺很機器化且不自然，而這是使用者會覺得格格不入的東西。 一般而言，您應該要避免直線動作。

無論您是以 CSS 或 JavaScript 來編寫動畫，您會發現總存在著直線動作的選項。 要以 CSS 達成以上效果，程式碼必須如下所示：


    transition: transform 500ms linear;
    


## 緩出動畫

緩出會使動畫比直線動畫更快速地開始，但結尾會減速。

<img src="images/ease-out.png" style="max-width: 300px" alt="緩出動畫曲線。" />

有多種途徑可以達成緩出效果，但最簡單的是 CSS 中的 `ease-out` 關鍵字：


    transition: transform 500ms ease-out;
    

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-out.html">請參閱緩出動畫。</a>

緩出通常最適合使用者介面的工作，因為快速開始給您的動畫回應性的感覺，同時可在結束時允許些許自然減速。

## 緩入動畫

緩入動畫是慢慢開始，快速結束；緩出則相反。

<img src="images/ease-in.png" style="max-width: 300px" alt="緩入動畫曲線。" />

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in.html">請參閱段緩入動畫。</a>

這種動畫就像一塊沉重的石頭落下，它慢慢地開始，並砰地一聲快速落地。

類似緩出和線性動畫，要使用緩入動畫，您可以使用它的關鍵字：


    transition: transform 500ms ease-in;
    

然而從互動的角度來看，緩入因為其突兀的結束而感覺有點不尋常；現實世界中移動的東西傾向於減速，而非突然停止不動。 緩入也有一開始就感覺遲鈍的不利影響，而這會負面影響在您網站或應用程式給人的回應能力印象。

## 緩入緩出動畫

緩入緩出類似一輛汽車加速和減速，若是明智使用，可以提供比純緩出更戲劇性的效果。

<img src="images/ease-in-out.png" style="max-width: 300px" alt="緩入緩出動畫曲線。" />

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in-out.html">請參閱段緩入緩出動畫。</a>

在此必須小心，不要採用過長的動畫持續時間，因為緩入開始對動畫會有遲鈍感。 通常在 300-500ms 的範圍左右會比較適合，但實際數字視您專案的感覺而定。 有鑑於此，由於起步緩慢、中間快速及結束緩慢，您將可創造動畫的強烈對照感，讓使用者相當滿意。

要使用緩入緩出動畫，您可以使用 `ease-in-out` CSS 關鍵字：


    transition: transform 500ms ease-in-out;
    


