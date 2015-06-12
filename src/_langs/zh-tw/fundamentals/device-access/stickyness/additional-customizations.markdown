---
layout: article
title: "其他自訂"
description: "以下是非常實用的自訂，但只適用於瀏覽器的一個子集中。 它們都為選用，但強烈建議使用，因為它們會進一步加強應用程式體驗。"
introduction: "以下是非常實用的自訂，但只適用於瀏覽器的一個子集中。 它們都為選用，但強烈建議使用，因為它們會進一步加強應用程式體驗。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 6
id: additional-customizations
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

{% include modules/toc.liquid %}

## 將瀏覽器元素著色

Chrome、Firefox OS、Safari、Internet Explorer 和 Opera Coast，允許您使用中繼標籤來定義瀏覽器和／或平臺的元素之顏色。

{% highlight html %}
<!-- Chrome & Firefox OS -->
<meta name="theme-color" content="#4285f4">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="#4285f4">
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-status-bar-style" content="#4285f4">
{% endhighlight %}


<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/theme-color.png" alt="使用風格主題色彩中繼標籤的網站之範例">

        <figcaption>使用風格主題色彩中繼標籤的網站之範例</figcaption>
    </figure>
</div>

## Safari:啟動影像，狀態列外觀

Safari 允許您設定狀態列的樣式，並指定啟動影像。

### 指定啟動影像

Safari 載入時預設會顯示一個空白螢幕，並在數次
載入之後顯示應用程式先前狀態的螢幕擷取畫面。 您可以避免這個行為，
方法是要求 Safari 顯示明確的啟動影像
，以 `rel=apple-touch-startup-image` 新增一個連結標籤。 例如：

{% highlight html %}
<link rel="apple-touch-startup-image" href="icon.png">
{% endhighlight %}

影像必須要是目標裝置螢幕的特定大小，否則它
不會被採用。 進一步的詳細資訊，
請參閱 [Safari 網頁內容方針](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
。

雖然關於此主題的 Apple 文件稀少，
開發人員社群已想出辦法來鎖定所有裝置，方法是使用先進的媒體查詢，
以選擇適當的裝置，然後指定正確的影像。 以下是可用的解決方案，
感謝 [tfausak's gist] 提供 (//gist.github.com/tfausak/2222823)：

{% highlight html %}
<!-- iOS 6 & 7 iPad (retina, portrait) -->
<link href="/static/images/apple-touch-startup-image-1536x2008.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPad (retina, landscape) -->
<link href="/static/images/apple-touch-startup-image-1496x2048.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (portrait) -->
<link href="/static/images/apple-touch-startup-image-768x1004.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (landscape) -->
<link href="/static/images/apple-touch-startup-image-748x1024.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone 5 -->
<link href="/static/images/apple-touch-startup-image-640x1096.png"
     media="(device-width: 320px) and (device-height: 568px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone (retina) -->
<link href="/static/images/apple-touch-startup-image-640x920.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPhone -->
<link href="/static/images/apple-touch-startup-image-320x460.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">
{% endhighlight %}

### 變更狀態列外觀

您可以變更預設狀態列外觀為 `black` 或 
`black-translucent`。 使用 `black-translucent` 時，
狀態列會浮動在全螢幕內容之下，而不是把它向下推。 這會給版面配置更多高度，
但也會妨礙頂部。  以下是所需的程式碼：

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

而以下是不同模式外觀的預覽：

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/status-bar-translucent.png" srcset="images/status-bar-translucent.png 1x, images/status-bar-translucent-2x.png 2x" alt="black-translucent">
      <figcaption>使用<code>black-translucent</code>的螢幕截圖</figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/status-bar-black.png" srcset="images/status-bar-black.png 1x, images/status-bar-black-2x.png 2x" alt="black-black">
      <figcaption>使用<code>black</code>的螢幕截圖</figcaption>
      </figure>
  </div>
</div>

## Internet Explorer：Live Tile、通知和釘選的網站

微軟的「釘選網站」和其旋轉的「Live Tile」遠遠超出其他實作，
而本方針礙於篇幅，無法此討論。 如果您想瞭解更多，
[請學習如何在 MSDN 上建立 Live Tile]
(//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx)。

{% include modules/nextarticle.liquid %}

{% endwrap %}
