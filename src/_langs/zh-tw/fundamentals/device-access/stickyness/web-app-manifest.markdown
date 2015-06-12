---
layout: article
title: "新增網頁應用程式宣示說明"
description: "網頁應用程式的宣示說明是一個簡單的 JSON 檔案，可讓您的開發人員控制在使用者預期見到應用程式的區域中呈現給使用者的方式 (例如手機主螢幕)、指導使用者可以啟動的功能，以及更重要的是如何啟動。 未來這個宣示說明將讓您進一步控制您的應用程式，但現在我們只專注於您的應用程式如何啟動。"
introduction: "網頁應用程式的宣示說明是一個簡單的 JSON 檔案，可讓您的開發人員控制在使用者預期見到應用程式的區域中呈現給使用者的方式 (例如手機主螢幕)、指導使用者可以啟動的功能，以及更重要的是如何啟動。 未來這個宣示說明將讓您進一步控制您的應用程式，但現在我們只專注於您的應用程式如何啟動。"
article:
  written_on: 2014-12-17
  updated_on: 2014-12-17
  order: 1
id: wapp-app-manifest
collection: stickyness
authors:
  - mattgaunt
  - paulkinlan
collection: stickyness
priority: 1
key-takeaways:
  manifest:
    - 定義一系列的圖示，以使它們可跨所有裝置尺寸運作
    - 選擇一個好的 `short_name`，因為這是使用者將會看到的部分
    - 新增啟動 URL 和 Querystring (查詢字串) 參數，以追蹤有多少使用者啟動您的應用程式
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.manifest %}

新增網頁應用程式宣示說明真的很容易。 您只要建立 manifest.json 檔案，
它包含您網頁應用程式的設定和資源，
然後從您的 html 網頁新增其 *連結*。

## 建立宣示說明

此宣示說明，您可以隨意取其名稱。 大多數人可能只會使用 manifest.json。 以下提供一範例。

{% highlight json %}
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-0-75x.png",
      "sizes": "36x36"
    },
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-1-5x.png",
      "sizes": "72x72"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html",
  "display": "standalone"
}
{% endhighlight %}

您應包含一 *short_name*，因為它將用於應用啟動組件文字。

如果您不提供 *start_url*，那麼將會使用目前頁面，但這不太可能是您使用者想要的。

## 對瀏覽器告知您的宣示說明

一旦您已經建立宣示說明，並放在您網站上，您只需要做的是，新增一連結標籤至如以下包含您網頁應用程式的所有網頁。

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}

## 為裝置建立很棒的應用程式圖示

當使用者新增您的網站至其主螢幕時，您可以針對要使用的瀏覽器，定義一組圖示。

您網頁應用程式的圖示可以類型、大小和密度，照以上方式定義，但您不必定義全部，您可以只定義大小和影像 src (來源)。

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "sizes": "192x192"
  }],
{% endhighlight %}

<div class="clear g-wide--full">
    <figure>
        <img src="images/homescreen-icon.png" alt="「新增至主螢幕」圖示">

        <figcaption>「新增至主螢幕」圖示</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 組態您網站的啟動方式

您定義 *顯示* 類型為 *單獨*，可讓您的網頁應用程式隱藏瀏覽器 UI。

{% highlight json %}
"display": "standalone"
{% endhighlight %}

別擔心，如果您認為使用者偏好在瀏覽器中以一般網站的角度來檢視您的網頁站，則可以使用瀏覽器的顯示字型。

{% highlight json %}
"display": "browser"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-display-options.png" alt="web-app-capable">

        <figcaption>宣示說明顯示選項</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 定義頁面的初始方向

您可以強制使用特定的方向，對於像只能橫向運作的某些遊戲，這方式很實用。 然而，這應該小心使用。 使用者更偏好能夠以兩種方向檢視應用程式。

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-orientation-options.png" alt="網頁應用程式宣示說明方向選項">

        <figcaption>網頁應用程式宣示說明方向選項</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 立即使用安全嗎。 亦即「瀏覽器支援」

是。  如果您能支援，這是個漸進式的功能，
可以處理此功能的使用者瀏覽器，將獲得更佳的體驗。  如果瀏覽器不支援該宣示說明，
網站也不會阻止使用者使用。

從 2014 年 11 月開始，Chrome 已建置此宣示說明。 Mozilla 正在建置，而 [IE 正在探索該領域]。(https://status.modern.ie/webapplicationmanifest?term=manifest)

{% include modules/nextarticle.liquid %}

{% endwrap %}
