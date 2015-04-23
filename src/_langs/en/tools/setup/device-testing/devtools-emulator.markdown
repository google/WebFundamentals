---
layout: article
title: "Mimic Development Site in Production Using Chrome DevTools Device Mode"
seotitle: "Mimic Development Site in Production Using Chrome DevTools Device Mode"
description: "Chrome DevTools device mode lets you mimic how your development site will look in production on a range of devices."
introduction: "Chrome DevTools device mode lets you mimic how your development site will look in production on a range of devices. Bring the insights of mobile testing to your browser tab through the power of mobile emulation."
authors:
  - megginkearney
article:
  written_on: 2015-04-14
  updated_on: 2015-04-23
  order: 4
collection: device-testing
related-guides:
  device-emulators:
    -
      title: Types of Device Emulators and Simulators
      href: tools/setup/device-testing/device-emulators
      section:
        title: "Types of Device Emulators and Simulators"
        href: tools/setup/device-testing/device-emulators
key-takeaways:
  device-mode: 
    - TBD.
---

{% wrap content%}

<object width="425" height="355"><param name="movie" value="https://www.youtube.com/v/FrAZWiMWRa4"><param name="wmode" value="transparent"><embed src="https://www.youtube.com/v/FrAZWiMWRa4" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></object>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.device-mode %}

## About device mode

As your mobile audience grows,
responsive mobile-friendly web design becomes all the more important.
Web content needs to look and feel great across a wide variety of devices and network conditions. But testing the quality of your mobile experiences takes longer and makes debugging more complex.

You can use Chrome DevTools device mode to:

* Test your responsive designs by [emulating different screen sizes and resolutions](tools/iterate/test-layout/test-layouts), including Retina displays.
* Visualize and [inspect CSS media queries](tools/iterate/test-layout/media-queries).
* Evaluate your site's performance using the [network emulator](tools/profile-performance/network-performance/network-conditions), without affecting traffic to other tabs.
* Accurately [simulate device input](tools/javascript/device-input/index) for touch events, geolocation, and device orientation.
* Enhance your current debugging workflow by combining device mode with the existing DevTools.

**Note**: Some of this documentation might be ahead of the stable version of Chrome. If you are unable to locate a feature, try using [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html), which contains the latest version of the DevTools.

{% include modules/related_guides.liquid inline=true list=page.related-guides.device-emulators %}

## Enable device mode

Turn on device mode by pressing the **Toggle device mode** ![toggle device mode icon off](imgs/icon-device-mode-off.png)icon. When device mode is enabled, the icon turns blue and the viewport transforms into a device emulator.

You can also toggle device mode on and off using the keyboard shortcut:  
 <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">M</kbd> (or <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">M</kbd> on Mac).

![Initial start for device mode](imgs/device-mode-initial-view.png)

## Using the screen emulator

Device mode's screen emulator helps you test the responsiveness of your site, without the hassle of switching between multiple devices.

### Get started with device presets

To jump-start your debugging process, device mode has a variety of emulation presets. Quickly emulate a particular device by selecting a model from the preset dropdown.

![device presets](imgs/device-and-network-tools.png)

Each preset automatically configures device emulation in the following ways:

* Specifies the <abbr title="User Agent">UA</abbr> string for requests.
* Sets the device resolution and pixel ratio.
* Enables touch emulation (if applicable).
* Emulates mobile scrollbar overlays and meta viewport.
* Autosizes (boosts) text for pages without a defined viewport.

**Tips:** Toggle the screen resolution emulator on and off using the **Emulate screen resolution** ![emulate resolution icon](imgs/icon-emulate-resolution.png)checkbox. Alternate between portrait and landscape views by clicking the **Swap dimensions** ![swap dimensions icon](imgs/icon-swap-dimensions.png)icon. Select the **Fit** checkbox to ensure that the emulated screen remains fully visible inside your browser viewport, shrinking to fit if necessary. (This setting is for convenience and does not emulate the device differently.)

### Customize the screen settings

To get more granular control over the screen emulator, you can tune the resolution settings below the device preset dropdown.

![screen controls](imgs/screen-controls.png)

To emulate a custom screen size, manually set the CSS pixel dimensions of the device in the width and height fields.

If you want to emulate a Retina device from a non-Retina machine or vice versa, adjust the **Device pixel ratio** ![emulate DPR icon](imgs/icon-DPR.png)field. The **device pixel ratio** (DPR) is the ratio between logical pixels and physical pixels. Devices with Retina displays, such as the iPhone 5, have higher pixel density than standard devices, which can affect the sharpness and size of visual content.

Some examples of <abbr title="Device Pixel Ratio">DPR</abbr>-sensitivity on the web are:

* CSS media queries such as `@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { ... }`
* CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) rules.
* The [srcset](http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-srcset) attribute on images.
* The `window.devicePixelRatio` property.

**Note:** If you have a native Retina display, you'll notice that low <abbr title="Dots Per Inch">dpi</abbr> assets look pixelated while higher-dpi assets are sharp. To simulate this effect on a standard display, set the <abbr title="Device Pixel Ratio">DPR</abbr> to 2 and scale the viewport by zooming. A 2x asset will continue to look sharp, while a 1x one will look pixelated.

### Save custom presets

Save custom emulations as presets so that you can easily return to them later.

To save your current screen settings as a preset, open the DevTools emulation drawer by clicking the **More overrides** ![more overrides icon](imgs/icon-open-emulator-drawer.png)icon in the top right corner of the browser viewport.

![opening the emulation drawer](imgs/emulation-drawer-UI-location.png)

In the device pane of the emulation drawer, click **Save as** and give your preset a name.

![sensors pane in the DevTools emulation drawer](imgs/emulation-drawer-device.png)

Now you can quickly select your custom screen emulation from the device preset dropdown.

## Custom Devices

Device Mode offers a wide array of devices for emulation. You can add a custom device if you find an edge-case or niche device that isn't covered. To add a custom device do the following:

1. Go to the DevTools Settings.
2. Activate the Devices tab.
3. Click on the "Add custom device" button at the bottom of the panel.
4. Fill in the form that appears at the top of the list.
5. Press "Add Device"
6. Enable Device Mode and find your custom device in the device menu.

![Adding a custom device](imgs/custom-device-settings.png)

## Limitations

Although Chrome's device mode offers many powerful emulation tools, it does have some limitations. Currently known issues are described below.

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

Despite these limitations, the device mode emulators are robust enough for most tasks. When you need to test on a real device, you can use the [remote debugging](tools/setup/device-testing/remote-debugging) DevTools for additional insight.

{% include modules/nextarticle.liquid %}

{% endwrap %}
