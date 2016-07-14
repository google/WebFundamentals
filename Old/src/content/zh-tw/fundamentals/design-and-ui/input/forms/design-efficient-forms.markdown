---
title: "設計高效率表單"
description: "要設計高效率表單，請避免重複行為、只要求必要資訊，並向使用者展示其在多部分表單中的進度以引導使用者。"
updated_on: 2014-10-21
key-takeaways:
  tldr:
    - 使用現有資料預先填入欄位，並確保啟用自動填寫。
    - 使用標記清楚的進度列，以協助使用者完成多部分表單。
    - 提供視覺化日曆，讓使用者無需離開您的網站，以跳至智慧手機上的日曆應用程式。
comments:
  # 注意：如果區段標題或 URL 變更，以下短連結則必須更新
  - g.co/mobilesiteprinciple16
  - g.co/mobilesiteprinciple18
---

<p class="intro">
  要設計高效率表單，請避免重複行為、只要求必要資訊，並向使用者展示其在多部分表單中的進度以引導使用者。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 儘量減少重複行為和欄位

請確保您的表單沒有重複行為、
只加入必要的欄位數目，
並善用 [自動填寫](/web/fundamentals/input/form/label-and-name-inputs.html#use-metadata-to-enable-auto-complete)，以便使用者可以利用預先填入資料，
輕鬆完成表單。

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分表單中顯示進度">
  <figcaption>
    在 Progressive.com 網站上，會先要求使用者提供 ZIP 郵遞區號，然後區號會預先填入到表單的下一部分。
  </figcaption>
</figure>

尋找機會預先填寫您已知或預期的資訊，
讓使用者省掉提供資訊的必要性。  例如，以使用者提供的上一次交貨地址，
預先填入交貨地址。


## 向使用者顯示已完成的進度

進度列和功能表應該透過多步驟表單和程序，
精確傳達整體進度。

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分表單中顯示進度">
  <figcaption>
    使用標記清楚的進度列，以協助使用者完成多部分表單。
  </figcaption>
</figure>

如果您將一個不成比例的複雜表單放在初期步驟，
使用者更有可能在完成整個程序之前，就放棄您的網站。 


## 在選擇日期時提供視覺化日曆

排程約會和旅行日期時，
使用者經常需要更多的前後文資訊。要簡化過程，
並避免使用者離開您的網站以查看其日曆應用程式，請提供一個帶有明確標籤的視覺化日曆，
以選擇開始和結束日期。 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="具有易用日曆的旅館網站">
  <figcaption>
    具有易用日曆小工具的旅館預約網站，方便選擇日期。
  </figcaption>
</figure>


