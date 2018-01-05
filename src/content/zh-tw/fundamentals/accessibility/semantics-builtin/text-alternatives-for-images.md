project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 利用 alt 屬性提供圖像的替代文本


{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# 圖像的替代文本 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



圖像是大多數網頁的重要組成部分，當然也是對弱視用戶造成阻礙的一個特定因素。
我們必須考慮圖像在網頁中發揮的作用，才能知道應該爲其使用什麼類型的替代文本。請看下面這幅圖像。



    <article>
      <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
      <img src="imgs/160204193356-01-cat-500.jpg">
    </article>

<article>
  <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
  <img src="imgs/160204193356-01-cat-500.jpg">
</article>

我們在網頁中看到的是一幅貓的圖片，是一篇有關貓著名的審判行爲的文章插圖。
屏幕閱讀器可以利用這幅圖像的文字名稱 `"/160204193356-01-cat-500.jpg"` 敘述對其的說明。
這樣做雖然準確，卻毫無用處。


可以利用 `alt` 屬性爲這幅圖像提供有用的替代文本，例如“一隻目光洶洶凝視遠方的貓”。


    <img src="/160204193356-01-cat-500.jpg" alt="一隻目光洶洶凝視遠方的貓">

然後屏幕閱讀器就可以敘述對圖像的簡潔說明（可在黑色旁白欄中看到），用戶可以選擇是否繼續閱讀下一篇文章。



![一幅包含經過改善的替代文本的圖像](imgs/funioncat2.png)

以下是有關 `alt` 的兩個註解：

 - `alt` 允許指定在圖像不可用時（例如圖像加載失敗、被網絡爬蟲訪問或被屏幕閱讀器讀取時）使用的簡單字符串。
 - `alt` 不同於 `title` 或任何類型的字幕，因爲它*只*在圖像不可用時使用。


編寫有用的替代文本算得上是門學問。要想讓字符串成爲有用的替代文本，它必須在同一環境下傳達與圖像相同的概念。



以上圖所示網頁報頭中的鏈接徽標圖像爲例。我們可以將這幅圖像相當準確地描述成“The Funion 徽標”。


    <img class="logo" src="logo.jpg" alt="The Funion 徽標">

可能很容易爲它指定一個“首頁”或“主頁”這樣更簡單的替代文本，但這樣做對弱視和正常視力的用戶都不夠周到。


但假使一位屏幕閱讀器用戶想要找到網頁上的報頭徽標；如果爲其指定的 alt 值是“首頁”，實際帶來的體驗會更令人困惑。視力正常的用戶也面臨同樣的挑戰，與屏幕閱讀器用戶一樣，他們也要弄明白點擊網站徽標的作用。


另一方面，描述圖像並不總是有用。例如，假定在一個包含文本“搜索”的搜索按鈕內有一幅放大鏡圖像。如果其中不包含文本，您肯定會指定“搜索”作爲這幅圖像的 alt 值。
但由於文本處於可見狀態，屏幕閱讀器將拾取並朗讀“搜索”一詞；因此，圖像上完全相同的 `alt` 值就成了多餘的內容。



不過，我們也知道，如果將 `alt` 省略，我們聽到的很可能不是替代文本，而是圖像文件名，這不僅毫無用處，還可能令人困惑。
在這種情況下，只需使用空的 `alt` 屬性就可讓屏幕閱讀器將圖像整個跳過。



    <img src="magnifying-glass.jpg" alt="">

總結一下，所有圖像都應有 `alt` 屬性，但它們無需都包含文本。
重要的圖像應使用描述性替代文本簡潔地說明圖像內容，而裝飾性圖像應使用空的 alt 屬性，即 `alt=""`。




{# wf_devsite_translation #}
