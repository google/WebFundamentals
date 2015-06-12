---
layout: article
title: "隱藏瀏覽器的 UI"
description: "您的使用者可不需任何特殊的程式碼，即可新增您的網站至主螢幕，但我們建議讓您的網頁應用程式從主螢幕啟動時，不需瀏覽器 UI 即可顯示 (全螢幕時有效)。"
introduction: "您的使用者可不需任何特殊的程式碼，即可新增您的網站至主螢幕，但我們建議讓您的網頁應用程式從主螢幕啟動時，不需瀏覽器 UI 即可顯示 (全螢幕時有效)。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 2
id: hide-browser-ui
collection: stickyness
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

新增以下程式碼至您網頁的 `<head>`：

{% highlight html %}
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


這將告之 Mobile Safari，
正在處理的是網頁應用程式。

針對這個動作，Internet Explorer 不需要指示，
預設情況下，網站會以全螢幕開啟。

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/web-app-capable.png" alt="web-app-capable">
        
        <figcaption>以網頁應用程式功能的中繼標籤啟動</figcaption>
    </figure>
</div>

<div class="clear"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
