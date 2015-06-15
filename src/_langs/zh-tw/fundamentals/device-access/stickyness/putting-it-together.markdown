---
layout: article
title: "組合起來"
description: "讓我們將已討論過的內容全帶入一個大表單中。"
introduction: "讓我們將已討論過的內容全帶入一個大表單中。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-18
  order: 7
id: putting-it-together
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

[Web Starter Kit](//developers.google.com/web/starter-kit) 包含最常見選項的支援，
很適合當做相關學習的起點，
但如果您好奇更完整實作的外觀，
以下是`<head>`  Web Starter Kit 的另一部分，我們會以更多的 
`<meta>` 標籤來深入討論：

{% highlight html %}
<!-- WebApp Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- hide the browser UI when launched from the home screen -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- set the correct name -->
<meta name="application-name" content="Web Starter Kit" />
<meta name="apple-mobile-web-app-title" content="Web Starter Kit">

<!-- Icons -->
  <!-- icon in the highest resolution we need it for -->
  <link rel="icon" sizes="228x228" href="images/touch/icon-228x228.png">
  <link rel="apple-touch-icon" href="images/touch/icon-228x228.png">

  <!-- multiple icons for IE11 on Win8 (actual images are 1.8 larger, per MS recommendation) -->
  <meta name="msapplication-square70x70logo" content="images/touch/icon-smalltile-128x128.png">
  <meta name="msapplication-square150x150logo" content="images/touch/icon-mediumtile-270x270.png">
  <meta name="msapplication-wide310x150logo" content="images/touch/icon-widetile-558x270.png">
  <meta name="msapplication-square310x310logo" content="images/touch/icon-largetile-558x558.png">

  <!-- Tile icon for IE10 on Win8 (144x144 + tile color) -->
  <meta name="msapplication-TileImage" content="images/touch/icon-144x144.png">
  <meta name="msapplication-TileColor" content="#3372DF">

<!-- Safari specific -->

  <!-- Status bar style -->
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <!-- Startup Image-->

    <!-- iOS 6 & 7 iPad (retina, portrait) -->
    <link href="images/touch/apple-touch-startup-image-1536x2008.png"
         media="(device-width: 768px) and (device-height: 1024px)
            and (orientation: portrait)
            and (-webkit-device-pixel-ratio: 2)"
         rel="apple-touch-startup-image">

    <!-- iOS 6 & 7 iPad (retina, landscape) -->
    <link href="images/touch/apple-touch-startup-image-1496x2048.png"
         media="(device-width: 768px) and (device-height: 1024px)
            and (orientation: landscape)
            and (-webkit-device-pixel-ratio: 2)"
         rel="apple-touch-startup-image">

    <!-- iOS 6 iPad (portrait) -->
    <link href="images/touch/apple-touch-startup-image-768x1004.png"
         media="(device-width: 768px) and (device-height: 1024px)
            and (orientation: portrait)
            and (-webkit-device-pixel-ratio: 1)"
         rel="apple-touch-startup-image">

    <!-- iOS 6 iPad (landscape) -->
    <link href="images/touch/apple-touch-startup-image-748x1024.png"
         media="(device-width: 768px) and (device-height: 1024px)
            and (orientation: landscape)
            and (-webkit-device-pixel-ratio: 1)"
         rel="apple-touch-startup-image">

    <!-- iOS 6 & 7 iPhone 5 -->
    <link href="images/touch/apple-touch-startup-image-640x1096.png"
         media="(device-width: 320px) and (device-height: 568px)
            and (-webkit-device-pixel-ratio: 2)"
         rel="apple-touch-startup-image">

    <!-- iOS 6 & 7 iPhone (retina) -->
    <link href="images/touch//apple-touch-startup-image-640x920.png"
         media="(device-width: 320px) and (device-height: 480px)
            and (-webkit-device-pixel-ratio: 2)"
         rel="apple-touch-startup-image">

    <!-- iOS 6 iPhone -->
    <link href="images/touch/apple-touch-startup-image-320x460.png"
         media="(device-width: 320px) and (device-height: 480px)
            and (-webkit-device-pixel-ratio: 1)"
         rel="apple-touch-startup-image">

<!-- MS specific -->

  <!-- Tooltip (Desktop) -->
  <meta name="msapplication-tooltip" content="Start the Web Starter Kit app">

  <!-- Start url when pinned (Desktop) -->
  <meta name="msapplication-starturl" content="./">

  <!-- Color of navigation buttons (back/forward) (Desktop) -->
  <meta name="msapplication-navbutton-color" content="#FF3300" />

{% endhighlight %}

{% endwrap %}
