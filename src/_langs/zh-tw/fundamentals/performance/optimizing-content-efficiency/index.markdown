---
layout: section
title: "最佳化內容效率"
description: "每個應用程式所下載的資料數量不斷增加。為了提供卓越的效能，我們需要從小處著手，確保每一個位元組的放送過程最佳化！"
introduction: "我們的網路應用程式在範圍、目標和功能上都在不斷增長。這是值得開心的現象！ 但是在邁向內容日趨豐富的網路時代時，過程中也產生了另一種趨勢：每個應用程式所下載的資料量也在持續穩步增長。為了提供卓越的效能，我們需要從小處著手，確保每一個位元組的放送過程最佳化！"
article:
  written_on: 2014-04-01
  updated_on: 2014-04-29
  order: 2
id: optimizing-content-efficiency
authors:
  - ilyagrigorik
collection: performance
---

{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

現代網路應用程式是什麼呢？ [HTTP Archive](http://httparchive.org/) 可以協助我們回答這個問題。這項專案的用意在於追蹤網路的建構過程，方法是透過定期檢索最受歡迎的網站 (Alexa 百萬熱門網站清單中的前 30 萬個)， 並記錄及匯總每個單獨目標的資源數量、內容類型和其他中繼資料的分析資料。

<img src="images/http-archive-trends.png" class="center" alt="HTTP Archive 趨勢">

<table class="table-4">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th></th>
    <th>第 50 百分位</th>
    <th>第 75 百分位</th>
    <th>第 90 百分位</th>
  </tr>
</thead>
<tr>
  <td data-th="類型">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="類型">圖片</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="類型">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="類型">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="類型">其他</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="類型"><strong>總計</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

以上資料呈現了 2013 年 1 月到 2014 年 1 月間，熱門網站使用者下載的資料位元組數量的增長趨勢。當然，並非每個網站都以相同的速率增長，也不是每個網站都需要相同數量的資料，我們也因此重點標出了分佈範圍內幾個不同的分位數：第 50 (中位數)、第 75 和第 90。

2014 年初，處於中位數的網站需要進行 75 次請求，共傳輸 1054 KB 位元組的資料。總位元組和請求數量在上一年中穩步增長。這項資訊並不值得意外，但其中蘊藏了重要的效能意涵：的確，網際網路速度越來越快，但在不同國家/地區的增長速度並不一致，而許多使用者仍受制於資料流上限和昂貴的按傳輸量計費方案，尤其在行動裝置上。

與電腦上的應用程式不同，網路應用程式不需要獨立的安裝過程：只要輸入網址，然後就會啟動及執行了。這是網路時代的一個關鍵特徵。但是，要做到這一點，**我們通常需要擷取幾十個、有時是幾百個不同的資源，相加起來可高達幾百萬位元組的資料量，並且必須在幾百毫秒內彙聚資訊，以實現我們追求的即時搜尋網路體驗。**

看看這些要件，要實現即時搜尋網路體驗確實是不小的壯舉，這也正是為什麼最佳化內容效率如此關鍵：消除不必要的下載，透過各種壓縮技術來最佳化資源的傳輸編碼，並利用快取來消除多餘的下載。

{% endwrap %}

