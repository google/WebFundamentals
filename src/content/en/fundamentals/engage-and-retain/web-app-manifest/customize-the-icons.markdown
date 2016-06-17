---
layout: shared/narrow
title: "Customize the Icons"
description: "When a user adds your site to their home screen, you can define a set of icons for the 
browser to use."
published_on: 2014-12-17
updated_on: 2016-02-12
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 3
notes:
  icons: "When saving an icon to the home screen, Chrome first looks for icons that match the density of the display and are sized to 48dp * screen density. If none are found it searches for the icon that most closely matches the device characteristics. If, for whatever reason, you want be specific about targetting an icon at a particular-pixel density, you can use the optional <code>density</code> member which takes a number. When you don’t declare density, it defaults to 1.0. This means “use this icon for screen densities 1.0 and up”, which is normally what you want."
---

When a user adds your site to their home screen, you can define a set of icons for the 
browser to use. The icons for your web app can be defined as shown below, with a type, size, and optional
density.

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "type": "image/png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "type": "image/png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "type": "image/png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "type": "image/png",
    "sizes": "192x192"
  }],
{% endhighlight %}

{% include shared/note.liquid list=page.notes.icons %}

<figure>
  <img src="images/homescreen-icon.png" alt="Add to Home Screen Icon">
  <figcaption>Add to Home Screen Icon</figcaption>
</figure>
