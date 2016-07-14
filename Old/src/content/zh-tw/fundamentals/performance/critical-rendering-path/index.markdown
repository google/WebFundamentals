---
title: "關鍵轉譯路徑"
description: "透過優先顯示與使用者要在網頁上執行的主要操作有關的內容，將關鍵轉譯路徑最佳化。"
updated_on: 2014-04-28
udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
---
<p class="intro">
  將關鍵轉譯路徑最佳化，對於改善網頁效能至關重要：我們的目標是優先顯示與使用者要在網頁上執行的主要操作有關的內容。
</p>

如要提供快速的網路使用者體驗，瀏覽器需要完成許多工作。網站開發人員其實看不到這當中的大多數工作：我們只要編寫標記，螢幕上就會顯示出漂亮的網頁。但是，瀏覽器究竟是如何使用我們的 HTML、CSS 和 JavaScript 在螢幕上呈現像素呢？

從收到 HTML、CSS 和 JavaScript 位元組，再對程式碼進行必需的處理，到最後轉變為顯示像素的過程中還有許多中間步驟。將效能最佳化其實就是瞭解這些步驟中所有的活動，這就是所謂的**關鍵轉譯路徑**。

<img src="images/progressive-rendering.png" class="center" alt="漸進式網頁轉譯">

透過將關鍵轉譯路徑最佳化，我們可以大幅縮短初次轉譯網頁的時間。另外，瞭解關鍵轉譯路徑之後，還可以為您要建構的高成效互動式應用程式打下基礎。其實，處理互動式更新的過程是相同的，只是在連續迴圈中完成，理想情況下每秒播放 60 個畫面！ 但是，我們還是按部就班來學習吧。首先，我們從頭開始快速介紹一下瀏覽器如何顯示簡單網頁。

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}


