---
layout: shared/narrow
title: "Emulate Mobile Viewports"
description: "Chrome DevTools' Device Mode lets you mimic how your development 
site will look in production on a range of devices."
authors:
  - megginkearney
  - kaycebasques
published_on: 2015-04-14
updated_on: 2016-02-01
order: 1
translation_priority: 1
key-takeaways:
  device-mode:
    - "Enable Device Mode and turn your viewport into a device emulator."
    - "Test your site's responsiveness using the Device Mode's screen emulator."
    - "Save custom presets so you can easily access them later."
    - "Device mode isn't a replacement for real device testing. Be aware of 
       its limitations."
---

<p class="intro">As your mobile audience grows, responsive mobile-friendly 
web design becomes all the more important. Web content needs to look and feel 
great across a wide variety of devices and network conditions.</p>

But testing the quality of your mobile experiences on a multitude of devices 
takes longer and makes debugging more complex. Chrome DevTools' Device Mode 
lets you mimic how your development site will look in production on a range of 
devices.

![device mode enabled](imgs/device-mode.png)

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.device-mode %}

## Enable Device Mode

1. Open DevTools.

1. Press the **Toggle Device Mode** button. When Device Mode is off, the 
   button is grey
   (![device mode off](imgs/device-mode-off.png){:.inline}). 
   When Device Mode is on, the button is blue
   (![device mode on](imgs/device-mode-on.png){:.inline}). 

   Alternatively, you can toggle Device Mode on and off using the keyboard 
   shortcut <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + 
   <kbd class="kbd">M</kbd> (Windows) or <kbd class="kbd">Cmd</kbd> +
   <kbd class="kbd">Shift</kbd> + <kbd class="kbd">M</kbd> (Mac).

If you see a yellow triangle with an exclamation point next to the Device Mode
button 
(![device mode reload needed](imgs/device-mode-reload-needed.png){:.inline}), 
it means you need to reload the page to get proper user agent spoofing and 
viewport rendering. 

## Using the screen emulator

Device mode's screen emulator helps you test the responsiveness of your site, without the hassle of switching between multiple devices.

### Get started with device presets

Select a device from the **Device** dropdown menu. 

![select a device](imgs/select-device.png)

Each preset automatically configures device emulation in the following ways:

* Specifies the "User Agent" (UA) string for requests.
* Sets the device resolution and pixel ratio.
* Enables touch emulation (if applicable).
* Emulates mobile scrollbar overlays and meta viewport.
* Autosizes (boosts) text for pages without a defined viewport.

Use these set of actions to control device mode:

* Click the checkbox next to **Screen** to toggle the mobile viewport emulator
  on and off. 

  Emulator on:

  ![mobile emulator on](imgs/emulator-on.png)

  Emulator off:

  ![mobile emulator off](imgs/emulator-off.png)

* Click the **change dimensions** button 
  (![change dimensions button](imgs/change-dimensions.png){:.inline})
  to alternate between landscape and portrait views. 

  Portrait:

  ![portrait view](imgs/portrait.png)

  Landscape:

  ![landscape view](imgs/landscape.png)

* Enable the **Zoom to fit** checkbox to automatically increase or decrease
  the size of the emulated screen whenever you resize your Chrome window 
  or DevTools window. This setting is for your convenience and does not affect
  the emulation.

### Customize the screen settings

You can manually set the screen emulator width and height in the width and
height text fields
(![width and height fields](imgs/width-height-fields.png){:.inline}).
The left field is the width, and the right field is the height.

#### Retina displays

If you want to emulate a Retina device from a non-Retina machine or vice 
versa, adjust the **Device pixel ratio** 
(![emulate DPR icon](imgs/icon-DPR.png){:.inline}) field. The **device pixel 
ratio** (DPR) is the ratio between logical pixels and physical pixels. 
Devices with Retina displays, such as the iPhone 5, have higher pixel density 
than standard devices, which can affect the sharpness and size of visual 
content.

Some examples of "Device Pixel Ratio" (DPR) sensitivity on the web are:

* CSS media queries such as:

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 
  rules.

* The [srcset](http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-srcset) 
  attribute on images.

* The `window.devicePixelRatio` property.

If you have a native Retina display, you'll notice that low "Dots Per Inch" 
(DPI) assets look pixelated while higher-DPI assets are sharp. To simulate 
this effect on a standard display, set the DPR to 2 and scale the viewport 
by zooming. A 2x asset will continue to look sharp, while a 1x one will look 
pixelated.

## Custom devices

Device Mode offers a wide array of devices for emulation. You can add a 
custom device if you find an edge-case or niche device that isn't covered. 

![adding a custom device](imgs/custom-device.png)

To add a custom device:

1. Go to DevTools Settings.
1. Click the **Devices** tab.
1. Click **Add custom device**.
1. Enter a device name, width, height, device pixel ratio, and 
   user agent string.
1. Click **Add**.

Your custom device is now available in the **Device** dropdown menu.

## Limitations

Device Mode has some limitations.

* **Device hardware**
  * GPU and CPU behavior are not emulated.
* **Browser UI**
  * System displays, such as the address bar, are not emulated.
  * Native displays, such as `<select>` elements, are not emulated as a modal list.
  * Some enhancements, such as number inputs opening a keypad, might vary from actual device behavior.
* **Browser functionality**
  * WebGL operates in the emulator, but is not supported on iOS 7 devices.
  * MathML is not supported in Chrome, but is supported on iOS 7 devices.
  * The [iOS 5 orientation zoom bug](https://github.com/scottjehl/device-bugs/issues/2) is not emulated.
  * The line-height CSS property operates in the emulator, but is not supported in Opera Mini.
  * CSS rule limits, such as those in [Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx), are not emulated.
* **AppCache**
  * The emulator does not override the <abbr title="User Agent">UA</abbr> for AppCache [manifest files](https://code.google.com/p/chromium/issues/detail?id=334120) or [view source requests](https://code.google.com/p/chromium/issues/detail?id=119767).

Despite these limitations, the Device Mode is robust enough for most tasks. 
When you need to test on a real device, you can use 
[Remote Debugging](/web/tools/chrome-devtools/debug/remote-debugging) 
for additional insight.
