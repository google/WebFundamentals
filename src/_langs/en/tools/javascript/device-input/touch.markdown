---
rss: false
layout: article
title: "Test Touch Input"
seotitle: "Test Device Input using Chrome DevTools Device Sensors"
description: "The Chrome DevTools touch screen emulator lets you accurately test touch events and sequences as if you were using a touch-enabled device."
introduction: "The Chrome DevTools touch screen emulator lets you accurately test touch events and sequences as if you were using a touch-enabled device."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 1
authors:
  - megginkearney
priority: 0
collection: device-input
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  ontouch-handlers:
    - To trigger `elem.ontouch_*_` handlers, you must run Chrome with the `‑‑touch‑events` <a href="http://www.chromium.org/developers/how-tos/run-chromium-with-flags">command line flag</a>. Touch emulation currently <a href="https://code.google.com/p/chromium/issues/detail?id=133915">does not trigger</a> these handlers by default.
---
{% wrap content %}

{% include modules/toc.liquid %}

## Enable touch emulation

Enable touch emulation by selecting the **Emulate touch screen** checkbox in the sensors pane of the emulation drawer.

When you interact with the emulated viewport, the cursor changes into a fingertip-sized circle and touch events (such as `touchstart`, `touchmove`, and `touchend`) fire as they would on a mobile device.

Hold <kbd class="kbd">Shift</kbd> while dragging the mouse to emulate a pinch gesture. 
Because mouse events can still fire on touch devices, the touch emulator does not disable mouse events entirely.

{% include modules/remember.liquid title="Note" list=page.remember.ontouch-handlers %}

![Emulating pinch to zoom](https://zippy.gfycat.com/DiligentEducatedAfricanhornbill.webm)

## Simulate multi-touch

You can simulate multi-touch events on devices that support multi-touch input, such as laptops with trackpads. For more information about setting up multi-touch simulation, see the "Developer Tools" section of the Multi-touch web development guide [on HTML5 Rocks](http://www.html5rocks.com/en/mobile/touch/#toc-touchdev).

Try out the DevTools debugger in combination with touch emulation using this [fingerpaint touch screen demo](http://www.paulirish.com/demo/multi).

{% include modules/nextarticle.liquid %}

{% endwrap %}
