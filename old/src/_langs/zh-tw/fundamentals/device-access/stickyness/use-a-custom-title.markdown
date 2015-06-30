---
layout: article
title: "使用自訂標題"
description: "Internet Explorer 和 Safari 允許您指定一個自訂標題，以當做您圖示旁或頂部的應用程式名稱。"
introduction: "Internet Explorer 和 Safari 允許您指定一個自訂標題，以當做您圖示旁或頂部的應用程式名稱。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 4
id: use-a-custom-title
authors:
  - pbakaus
collection: stickyness
notes:
  undocumented:
    - 此標籤在 Mobile Safari 中並無文件說明，可以隨時變更或移除。
---

{% wrap content %}

將此程式碼加入您的頁頭`<head>`：

{% highlight html %}
<meta name="application-name" content="Web Fundamentals">
<meta name="apple-mobile-web-app-title" content="Web Fundamentals">
{% endhighlight %}

如果附近沒有額外的標籤，所有三套瀏覽器都使用預設 `<title>` 屬性。


{% include modules/remember.liquid title="Note" list=page.notes.undocumented %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
