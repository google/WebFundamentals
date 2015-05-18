---
rss: false
layout: article
title: "Override Geolocation Data"
seotitle: "Override Geolocation Data from Chrome DevTools Device Sensors"
description: "Unlike desktops, mobile devices commonly use GPS hardware to detect location. In device mode, you can simulate geolocation coordinates to use with the <a href="http://www.w3.org/TR/geolocation-API/">Geolocation API</a>."
introduction: "Unlike desktops, mobile devices commonly use GPS hardware to detect location. In device mode, you can simulate geolocation coordinates to use with the <a href="http://www.w3.org/TR/geolocation-API/">Geolocation API</a>."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 2
authors:
  - megginkearney
priority: 0
collection: device-input
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd
    - TBD.
---
{% wrap content %}

Enable the geolocation emulator by selecting the **Emulate geolocation coordinates** checkbox in the sensors pane of the emulation drawer.

![geolocation emulator enabled](device-mode-files/emulation-drawer-geolocation.png)

You can use this emulator to override position values for `navigator.geolocation`, as well as simulate cases when geolocation data is unavailable.

Try out the geolocation emulator using this [maps demo](http://html5demos.com/geo).

{% include modules/nextarticle.liquid %}

{% endwrap %}
