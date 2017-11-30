project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:爲項目選擇合適的緩動，無論是緩入、緩出還是緩入緩出。或許還可使用彈跳方式獲取更多樂趣！

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# 選擇合適的緩動 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

前面已經討論了可在動畫中實現緩動的各種選項，您應當在項目中使用哪種？您的動畫應採用哪種持續時間？

### TL;DR {: .hide-from-toc }
* 爲 UI 元素使用緩出動畫；Quintic 緩出是一個非常好（雖然比較快速）的緩動。
* 一定要使用動畫持續時間；緩出和緩入應爲 200 毫秒 - 500 毫秒，而彈跳和彈性緩動的持續時間應更長，爲 800 毫秒 - 1200 毫秒。


<img src="images/quintic-ease-out-markers.png" alt="Quintic 緩出動畫的曲線。" style="max-width: 300px" class="attempt-right"/>

一般來說，**緩出**將是正確的選擇，當然也是很好的默認選擇。它開頭較快，使動畫有反應快速的感覺，這一點很受歡迎，但在結尾有一個不錯的減速。

除了在 CSS 中通過 `ease-out` 關鍵字指定的公式之外，還有一組知名的緩出公式，它們按其“攻擊性”排列。想要快速的緩出效果，請考慮 [Quintic 緩出](http://easings.net/#easeOutQuint)。


[查看 Quintic 緩出動畫](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-quintic-ease-out.html){: target="_blank" .external }

其他緩動公式應謹慎使用，特別是彈跳或彈性緩動，並且僅在適合於項目時才使用。很少有東西會像不協調的動畫那樣讓用戶體驗很差。如果您的項目不是爲了追求樂趣，那麼就無需使元素在 UI 周圍進行彈跳。相反，如果您將要創建一個輕鬆歡樂的網站，那麼請務必使用彈跳！

試試各種緩動，看看哪些與項目的個性匹配，然後以此爲起點。關於緩動類型的完整列表及其演示，請參閱 [easings.net](http://easings.net)。

## 選擇合適的動畫持續時間

給項目添加的任何動畫均須有正確的持續時間。若太短，動畫讓人感覺有攻擊性和突然；若太長，則讓人覺得很卡和討厭。

* **緩出：約 200 毫秒 - 500 毫秒**。這讓眼睛有機會看到動畫，但不會覺得卡頓。
* **緩入：約 200 毫秒 - 500 毫秒**。請記住，它在結尾將晃動，沒有時間量變化將緩和這種影響。
* **彈跳或彈性效果：約 800 毫秒 - 1200 毫秒**。您需要留出時間讓彈性或彈跳效果“停下”。若沒有這點額外時間，動畫的彈性跳動部分看上去比較有攻擊性，讓人感覺不舒服。

當然，這些只是指導原則。用您自己的緩動做試驗，然後選擇覺得適合於項目的緩動。




{# wf_devsite_translation #}
