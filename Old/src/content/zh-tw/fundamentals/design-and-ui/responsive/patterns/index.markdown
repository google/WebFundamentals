---
title: "回應式網頁設計模式"
description: "回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式"
updated_on: 2014-10-21
---

<p class="intro">
  回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式
</p>


回應式網頁使用的大多數版面配置可以分成五大外觀設計模式：主體為流動 (mostly fluid)、欄內容下排 (column drop)、版面配置位移 (layout shifter)、微小調整 (tiny tweaks) 和畫布外空間利用 (off canvas)。

在某些情況下，網頁可能會使用不同模式組合，例如欄內容下排與畫布外空間利用。
  最初是由
 [Luke Wroblewski](http://www.lukew.com/ff/entry.asp?1514) 識別出來的這些模式，可為任何回應式網頁提供紮實的起點。


## 模式

若要建立簡單、容易理解的範例，
以下每個範例是以真正標記使用
 [`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)建立
 -- 通常是使用`div`包含於一主要容器中`div`的三個內容。
 每個範例都是以最小檢視起頭撰寫，
而中斷點是在必要時加入。  就最新瀏覽器而言，
[彈性方塊版面配置模式已廣受支援](http://caniuse.com/#search=flexbox)，儘管最佳化支援仍需要廠商首碼設定。



