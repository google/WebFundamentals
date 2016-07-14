---
title: "Redirect HTTP to HTTPS"
updated_on: 2015-03-27
key-takeaways:
  - 您需要在頁面的頁首 (head) 放置一標準連結，以告之搜尋引擎 https 是到達您網站的最佳方法。
---


{% include shared/takeaway.liquid list=page.key-takeaways %}

在您頁面中設定 &lt; link rel="canonical" href="https://…"/&gt; 標籤。 [這有助於搜尋引擎]
(https://support.google.com/webmasters/answer/139066?hl=en)知道前往您網站的最佳方法。


大多數網頁伺服器提供了一個簡單的重新導向功能。 使用 301 (永久移動) 是向搜尋引擎和瀏覽器表示，HTTPS 版本為標準，並將您的使用者從 HTTP 重新導向至您的 HTTPS 版本。


