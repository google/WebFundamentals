---
rss: false
layout: tools-article
title: "Test Device Input"
seotitle: "Test Device Input using Chrome DevTools Device Sensors"
description: "Touch screens, GPS chips, and accelerometers can be difficult to test since most desktops don't have them. The Chrome DevTools sensor emulators reduce the overhead of testing by emulating common mobile device sensors."
introduction: "Touch screens, GPS chips, and accelerometers can be difficult to test since most desktops don't have them. The Chrome DevTools sensor emulators reduce the overhead of testing by emulating common mobile device sensors."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 3
authors:
  - megginkearney
collection: device-testing
key-takeaways:
  input:
    - Emulate the touch screen to test touch events and sequences.
    - Emulate geolocation coordinates to test geolocation overrides.
    - Simulate device orientation to test accelerometer data.
remember:
  ontouch-handlers:
    - To trigger <code>elem.ontouch</code> handlers, you must run Chrome with the ‑‑touch‑event <a href="http://www.chromium.org/developers/how-tos/run-chromium-with-flags">command line flag</a>. Touch emulation currently <a href="https://code.google.com/p/chromium/issues/detail?id=133915">does not trigger</a> these handlers by default.
  sensors:
    - If your app detects sensors onload using JavaScript (such as Modernizr), make sure that you reload the page after enabling sensor emulators.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.input %}

## Access sensor controls

To access the Chrome DevTools sensor controls:

1. Open the DevTools emulation drawer by clicking the **More overrides** ![open emulation drawer](imgs/icon-open-emulator-drawer.png){:.inline} icon in the top right corner of the browser viewport.
2. Select **Sensors** in the emulation drawer.

![sensors pane in the DevTools emulation drawer](imgs/emulation-drawer-sensors.png)

{% include modules/remember.liquid title="Remember" list=page.remember.sensors %}

## Test touch input

The Chrome DevTools touch screen emulator lets you accurately test touch events and sequences as if you were using a touch-enabled device.

### Enable touch emulation

Enable touch emulation by selecting the **Emulate touch screen** checkbox in the sensors pane of the emulation drawer.

When you interact with the emulated viewport, the cursor changes into a fingertip-sized circle and touch events (such as `touchstart`, `touchmove`, and `touchend`) fire as they would on a mobile device.

Hold <kbd class="kbd">Shift</kbd> while dragging the mouse to emulate a pinch gesture. 
Because mouse events can still fire on touch devices, the touch emulator does not disable mouse events entirely.

{% include modules/remember.liquid title="Note" list=page.remember.ontouch-handlers %}

### Simulate multi-touch

You can simulate multi-touch events on devices that support multi-touch input, such as laptops with trackpads. For more information about setting up multi-touch simulation, see the "Developer Tools" section of the Multi-touch web development guide [on HTML5 Rocks](http://www.html5rocks.com/en/mobile/touch/#toc-touchdev).

Try out the DevTools debugger in combination with touch emulation using this [fingerpaint touch screen demo](http://www.paulirish.com/demo/multi).

## Override geolocation data

Unlike desktops, mobile devices commonly use GPS hardware to detect location. In device mode, you can simulate geolocation coordinates to use with the <a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a>.

Enable the geolocation emulator by selecting the **Emulate geolocation coordinates** checkbox in the sensors pane of the emulation drawer.

![geolocation emulator enabled](imgs/emulation-drawer-geolocation.png)

You can use this emulator to override position values for `navigator.geolocation`, as well as to simulate cases when geolocation data is unavailable.

Try out the geolocation emulator using this [maps demo](http://html5demos.com/geo).

## Simulate device orientation

Test accelerometer data used with the <a href='http://www.w3.org/TR/screen-orientation/'>Orientation API</a>.

Enable the accelerometer emulator by selecting the **Accelerometer** checkbox in the sensors pane of the emulation drawer.

![Accelerometer control](imgs/emulation-drawer-accelerometer.png)

You can manipulate the following orientation parameters:

<dl>

<dt><abbr title="alpha">α</abbr></dt>

<dd>Rotation around the z-axis.</dd>

<dt><abbr title="beta">β</abbr></dt>

<dd>Left-to-right tilt.</dd>

<dt><abbr title="gamma">γ</abbr></dt>

<dd>Front-to-back tilt.</dd>

</dl>

You can also click and drag the model accelerometer to the desired orientation.

Try out the accelerometer emulator using this [device orientation demo](http://www.html5rocks.com/en/tutorials/device/orientation/deviceorientationsample.html).

{% include modules/nextarticle.liquid %}

{% endwrap %}
