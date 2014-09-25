---
layout: article
title: "Putting It All Together"
description: "Let's take all that we discussed and bring it into one big form."
introduction: "Let's take all that we discussed and bring it into one big form."
article:
  written_on: 2014-09-22
  updated_on: 2014-09-24
  order: 5
id: putting-it-together
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

Our own [Web Starter Kit](//developers.google.com/web/starter-kit) includes
support for the most common options and is great as starting point, but if you
are curious as to how a more complete implementation looks like, here’s the
portion of the `<head>` of Web Starter Kit that we expanded with more
`<meta>` tags:

{% highlight html %}
<!-- hide the browser UI -->
<meta name="mobile-web-app-capable" content="yes">
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