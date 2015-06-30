---
layout: article
title: "當從主螢幕啟動時偵測"
description: "有時候了解應用程式是從主螢幕 或網頁瀏覽器中啟動，非常實用。"
introduction: "有時候了解應用程式是從主螢幕 或網頁瀏覽器中啟動，非常實用。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 5
id: detect-when-launched
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

有時候了解應用程式是否從主螢幕啟動，
非常實用， 或是當它從網頁瀏覽器啟動時。 要示範一個使用案例，您可能會想在使用者來自瀏覽器時顯示橫幅，
建議安裝應用程式至使用者的主螢幕，但又要在安裝後隱藏橫幅。


在 Mobile Safari 中，查詢 `window.navigator.standalone` 後會告訴您應用程式是以主螢幕圖示形式，
或只是在瀏覽器中運作。 在 Internet Explorer 中，
您可以查詢 
[`window.external.msIsSiteMode()`](http://msdn.microsoft.com/en-us/library/ie/gg491733(v=vs.85).aspx)，以達到相同目的。 這是一個組合檢查：

{% highlight js %}
var fromHomescreen = window.navigator.standalone || window.external.msIsSiteMode();
if(!fromHomescreen) {
    // show them a guide on how to install the web app
    ...
}
{% endhighlight %}

遺憾的是，在安卓版 Chrome 中，無法偵測相同的目標。

{% include modules/nextarticle.liquid %}

{% endwrap %}
