---
rss: false
layout: article
title: "Simulate Device Orientation"
seotitle: "Simulate Device Orientation using Chrome DevTools Device Sensors"
description: "Test accelerometer data used with the <a href="http://www.w3.org/TR/screen-orientation/">Orientation API</a>."
introduction: "Test accelerometer data used with the <a href="http://www.w3.org/TR/screen-orientation/">Orientation API</a>."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 3
authors:
  - megginkearney
priority: 0
collection: device-input
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD.
---
{% wrap content %}

{% include modules/toc.liquid %}

Enable the accelerometer emulator by selecting the **Accelerometer** checkbox in the sensors pane of the emulation drawer.

![Accelerometer control](imgs/emulation-drawer-accelerometer.png)

You can manipulate the following orientation parameters:

<dl>

<dt>**<abbr title="alpha">α</abbr>**</dt>

<dd>Rotation around the _z_-axis.</dd>

<dt>**<abbr title="beta">β</abbr>**</dt>

<dd>Left-to-right tilt.</dd>

<dt>**<abbr title="gamma">γ</abbr>**</dt>

<dd>Front-to-back tilt.</dd>

</dl>

You can also click and drag the model accelerometer to the desired orientation.

Try out the accelerometer emulator using this [device orientation demo](http://www.html5rocks.com/en/tutorials/device/orientation/deviceorientationsample.html).

{% include modules/nextarticle.liquid %}

{% endwrap %}
