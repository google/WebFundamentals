---
rss: false
layout: article
title: "Test Different Layouts"
seotitle: "Test Different Layouts using the Chrome DevTools Device Emulator."
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 1
authors:
  - megginkearney
priority: 0
collection: test-layout
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

Device mode's screen emulator helps you test the responsiveness of your site, without the hassle of switching between multiple devices.

## Get started with device presets

To jump-start your debugging process, device mode has a variety of emulation presets. Quickly emulate a particular device by selecting a model from the preset dropdown.

![device presets](imgs/device-and-network-tools.png)

Each preset automatically configures device emulation in the following ways:

*   Specifies the <abbr title="User Agent">UA</abbr> string for requests.
*   Sets the device resolution and pixel ratio.
*   Enables touch emulation (if applicable).
*   Emulates mobile scrollbar overlays and meta viewport.
*   Autosizes (boosts) text for pages without a defined viewport.

**Tips:** Toggle the screen resolution emulator on and off using the **Emulate screen resolution** ![emulate resolution icon](device-mode-files/icon-emulate-resolution.png)checkbox. Alternate between portrait and landscape views by clicking the **Swap dimensions** ![swap dimensions icon](device-mode-files/icon-swap-dimensions.png)icon. Select the **Fit** checkbox to ensure that the emulated screen remains fully visible inside your browser viewport, shrinking to fit if necessary. (This setting is for convenience and does not emulate the device differently.)

## Customize the screen settings

To get more granular control over the screen emulator, you can tune the resolution settings below the device preset dropdown.

![screen controls](imgs/screen-controls.png)

To emulate a custom screen size, manually set the CSS pixel dimensions of the device in the width and height fields.

If you want to emulate a Retina device from a non-Retina machine or vice versa, adjust the **Device pixel ratio** ![emulate DPR icon](device-mode-files/icon-DPR.png)field. The **device pixel ratio** (DPR) is the ratio between logical pixels and physical pixels. Devices with Retina displays, such as the iPhone 5, have higher pixel density than standard devices, which can affect the sharpness and size of visual content.

Some examples of Device Pixel Ration (DPR) sensitivity on the web are:

* CSS media queries such as `@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { ... }`
* CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) rules.
* The [srcset](http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-srcset) attribute on images.
* The `window.devicePixelRatio` property.

**Note:** If you have a native Retina display, you'll notice that low dpi assets look pixelated while higher-dpi assets are sharp. To simulate this effect on a standard display, set the DPR to 2 and scale the viewport by zooming. A 2x asset will continue to look sharp, while a 1x one will look pixelated.

## Save custom presets

Save custom emulations as presets so that you can easily return to them later.

To save your current screen settings as a preset, open the DevTools emulation drawer by clicking the **More overrides** ![more overrides icon](device-mode-files/icon-open-emulator-drawer.png)icon in the top right corner of the browser viewport.

![opening the emulation drawer](device-mode-files/emulation-drawer-UI-location.png)

**Tip:** You can also use the keyboard shortcut, **Esc**.

In the device pane of the emulation drawer, click **Save as** and give your preset a name.

![sensors pane in the DevTools emulation drawer](imgs/emulation-drawer-device.png)

Now you can quickly select your custom screen emulation from the device preset dropdown.

**Tip:** The emulation drawer contains the same controls as the main device mode interface, plus some extras ([media type](#more-media-types) and [sensor](#device-sensors) controls).

## Visualize page layout

The Metrics pane resides just below the Styles pane and allows you to examine and edit the current element’s box model parameters found in the computed style.*   The concentric rectangles contain the values for the **padding**, **border**, and **margin** properties (top, right, bottom, and left values for each of them.)*   For non-statically positioned elements, a **position** rectangle will be additionally displayed in the pane, containing the values of the **top**, **right**, **bottom**, and **left** properties.

![Metrics panel](imgs/metrics.png)

    *   For `position: fixed` and `position: absolute` elements, the central field contains the actual <nobr>**offsetWidth × offsetHeight**</nobr> pixel dimensions of the selected element.*   All values can be modified by double-clicking them, like property values in the Styles pane (the changes are not, however, guaranteed to take effect, as this is subject to the concrete element positioning specifics.)

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
