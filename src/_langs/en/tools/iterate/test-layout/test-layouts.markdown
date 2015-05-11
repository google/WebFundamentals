---
rss: false
layout: article
title: "Test Different Layouts"
seotitle: "Test Different Layouts using the Chrome DevTools Device Emulator."
description: "See how your site renders across different devices without ever leaving the browser."
introduction: "See how your site renders across different devices without ever leaving the browser. Using the Chrome DevTools device mode, load any page, pick any device, and see how your site's layout is rendered on that device."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 1
authors:
  - megginkearney
priority: 0
collection: test-layout
key-takeaways:
  layout:
    - Enable device mode, pick a device, and see how your site's layout responds to the device's dimensions.
    - Test your site on any screen size: create your own custom device settings in device mode.
remember:
  native-retina:
    - If you have a native Retina display, you'll notice that low dpi assets look pixelated while higher-dpi assets are sharp. To simulate this effect on a standard display, set the DPR to 2 and scale the viewport by zooming. A 2x asset will continue to look sharp, while a 1x one will look pixelated.
---
{% wrap content %}

To jump-start your debugging process, device mode has a variety of emulation presets.
Quickly emulate a particular device by selecting a model from the preset drop-down.

![device presets](imgs/device-and-network-tools.png)

The screen emulator automatically:

* Specifies the User Agent (UA) string for requests.
* Sets the device resolution and pixel ratio.
* Enables touch emulation (if applicable).
* Emulates mobile scrollbar overlays and meta viewport.
* Autosizes (boosts) text for pages without a defined viewport.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.layout %}

## Enable device mode

Turn on device mode by pressing the **Toggle device mode** ![toggle device mode icon off](imgs/icon-device-mode-off.png)icon. When device mode is enabled, the icon turns blue and the viewport transforms into a device emulator.

You can also toggle device mode on and off using the keyboard shortcut: **Ctrl + M** (or **Cmd + Shift + M** on Mac).

![Initial start for device mode](imgs/device-mode-initial-view.png)

Toggle the screen resolution emulator on and off using the **Emulate screen resolution** ![emulate resolution icon](imgs/icon-emulate-resolution.png)checkbox.

Alternate between portrait and landscape views by clicking the **Swap dimensions** ![swap dimensions icon](imgs/icon-swap-dimensions.png)icon. 

Select the **Fit** checkbox to ensure that the emulated screen remains fully visible inside your browser viewport, shrinking to fit if necessary. (This setting is for convenience and does not emulate the device differently.)

## Customize the screen settings

To get more granular control over the screen emulator, you can tune the resolution settings below the device preset dropdown.

![screen controls](imgs/screen-controls.png)

To emulate a custom screen size, manually set the CSS pixel dimensions of the device in the width and height fields.

If you want to emulate a Retina device from a non-Retina machine or vice versa, adjust the **Device pixel ratio** ![emulate DPR icon](imgs/icon-DPR.png)field. The **device pixel ratio** (DPR) is the ratio between logical pixels and physical pixels. Devices with Retina displays, such as the iPhone 5, have higher pixel density than standard devices, which can affect the sharpness and size of visual content.

Some examples of Device Pixel Ration (DPR) sensitivity on the web are:

* CSS media queries such as `@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { ... }`
* CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) rules.
* The [srcset](http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-srcset) attribute on images.
* The `window.devicePixelRatio` property.

{% include modules/remember.liquid title="Note" list=page.remember.native-retina %}

## Save custom presets

Save custom emulations as presets so that you can easily return to them later.

To save your current screen settings as a preset, open the DevTools emulation drawer by clicking the **More overrides** ![more overrides icon](imgs/icon-open-emulator-drawer.png)icon in the top right corner of the browser viewport (or use the keyboard shortcut, **Esc**).

![opening the emulation drawer](imgs/emulation-drawer-UI-location.png)

In the device pane of the emulation drawer, click **Save as** and give your preset a name.

![sensors pane in the DevTools emulation drawer](imgs/emulation-drawer-device.png)

Now you can quickly select your custom screen emulation from the device preset dropdown.

{% include modules/nextarticle.liquid %}

{% endwrap %}
