---
layout: shared/narrow
title: "Remote Debugging Devices"
description: "Web content behaves differently on mobile than on desktop. Debug live content on your device from your development machine using remote debugging."
authors:
  - megginkearney
published_on: 2015-04-14
updated_on: 2015-04-22
order: 1
translation_priority: 1
key-takeaways:
  real: 
    - "There's no substitute for debugging your site on a real device. Debug browser tabs on your device from your development workspace using remote debugging."
    - "You don't have to shift attention between your device and development screens. Use screencasting to display your device's screen along side your developer tools."
---

<p class="intro">
  Web content behaves differently on mobile than on desktop. Debug live content on your device from your development machine using remote debugging.
</p>

![Debugging Chrome for Android using the Chrome Developer Tools](imgs/remote-debug-banner.png)

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.real %}

## Remote debugging on Android with Chrome DevTools

Learn how to use the Chrome DevTools to debug your site live on your Android device.

### Requirements

To begin remote debugging, you need:

* Chrome 32 or later installed on your development machine.
* A USB cable to connect your Android device.
* Android 4.0+ and [Chrome for Android](https://play.google.com/store/apps/details?id=com.android.chrome&hl=en).

**Note**: Remote debugging requires your version of desktop Chrome to be newer than the version of Chrome for Android on your device. For best results, use [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) (Mac/Windows) or the Chrome [Dev channel](https://www.chromium.org/getting-involved/dev-channel) release (Linux) on desktop.

If at any time you encounter problems with remote debugging, refer to the [Troubleshooting](#troubleshooting) section.

### Set up your Android device

On your Android device, select **Settings > Developer options**.

![developer options](imgs/settings-dev-options-on.png)

**Note**: On **Android 4.2** and later, the developer options are hidden by default. To enable the developer options, select **Settings > About phone** and tap **Build number** seven times.

![About phone screen](imgs/about-phone-build-num.png)

In **Developer options**, select the **USB debugging** checkbox:

![USB debugging settings in Developer options](imgs/usb-debugging-on.png)

An alert prompts you to allow USB debugging. Tap **OK**.

![allow USB debugging message](imgs/allow-usb-debugging.png)

### Connect and discover your device

Connect the Android device to your development machine using a USB cable.

**Note**: If you are developing on **Windows**, install the appropriate USB driver for your device. See [OEM USB Drivers](https://developer.android.com/tools/extras/oem-usb.html) on the Android Developers' site.

Now that you've set up remote debugging and connected your device, you need to discover that device in Chrome.

On your desktop Chrome browser, navigate to **chrome://inspect**. Confirm that **Discover USB devices** is checked:

![Discover USB Devices in chrome://inspect](imgs/chrome-discover-usb.png)

**Tip**: You can also get to **chrome://inspect** by selecting **Chrome menu > More tools > Inspect Devices**.

On your device, an alert prompts you to allow USB debugging from your computer. Tap **OK**.

![USB debugging permission alert](imgs/rsa-fingerprint.png)

**Tip**: To skip this alert in the future, check **Always allow from this computer**.

The message **USB debugging connected** displays in the device's notification drawer.

**Note**: During remote debugging, Chrome prevents your device’s screen from going to sleep. This feature is useful for debugging, but is also less secure. So be sure to keep an eye on your device!

If you have problems finding your device on the **chrome://inspect page**, see the [Troubleshooting](#troubleshooting) section.

### Ready to debug your site in a browser tab!

On your computer, the **chrome://inspect** page displays every connected device, along with its open tabs and debug-enabled [WebViews](/web/tools/chrome-devtools/debug/remote-debugging/webviews).

![The chrome://inspect page.](imgs/chrome-inspect-devices.png)

To start debugging, click **inspect** below the browser tab you want to debug.

![Click inspect to start remote debugging](imgs/chrome-inspect-tabs.png)

A new instance of Chrome DevTools launches on your computer. From this instance, you can interact with the selected browser tab on your device in real time.

![Debugging Chrome for Android using the Chrome Developer Tools](imgs/remote-debug-overview.jpg)

For example, you can use DevTools to inspect web page elements on your device:

* When you mouse over an element in the **Elements** panel, DevTools highlights the element on your device.
* You can also click the **Inspect Element** ![inspect element icon](imgs/inspect-icon.png){:.inline} icon in DevTools and tap your device screen. DevTools highlights the tapped element in the **Elements** panel.

**Note**: The version of Chrome on your device determines the version of DevTools used during remote debugging. For this reason, the remote debugging DevTools might differ from the version that you normally use.

## Remote debugging on iOS with Safari Web Inspector

To debug Safari for iOS, follow these steps:

1. In your iOS device go to Settings > Safari > Advanced > Web Inspector to enable Web Inspector
2. Open Safari on your iOS device.
3. Connect it to your computer via USB.
4. Open Safari on your computer.
5. In Safari's menu, go to `Develop` and, look for your device's name.
6. Select the tab you want to debug.

![Safari iOS Debugging Menu](imgs/ios-safari-debugging.png)

Unfortunately there is no way to debug a site on Windows Phone, but you can  
[emulate a mobile browser on the desktop version of IE
11](https://msdn.microsoft.com/en-us/library/ie/dn255001%28v=vs.85%29.aspx).
See also [Emulate beyond Chrome](/web/tools/chrome-devtools/iterate/device-mode/testing-other-browsers).

## Screencast from Android device to development machine

Shifting your attention between screens isn’t always convenient. Screencast displays your device's screen right alongside DevTools on your development machine. You can interact with the content on your device from the screencast too.

### Start a screencast session

To start screencasting, click the **Screencast** ![screencast icon](imgs/icon-screencast.png){:.inline} icon in the upper right corner of your remote debugging DevTools window.

![screencast location in DevTools](imgs/screencast-icon-location.png)

The **Screencast** panel opens on the left and displays a live view of your device's screen.

![Open a new remote tab](imgs/screencast.png)

Screencast only displays page content. Transparent portions of the screencast are covered by the omnibox, device keyboard, and other device interfaces.

**Note**: Because screencast continuously captures frames, it has some performance overhead. If your tests are sensitive to frame rate, disable screencast.

### Interact with your device using the screencast

When you interact with the screencast, clicks are translated into taps, firing proper touch events on the device. Keystrokes from your computer are sent to the device, so you can avoid typing with your thumbs.

Other DevTools work with the screencast too. For example, to inspect an element, click the **Inspect Element** ![inspect element icon](imgs/inspect-icon.png){:.inline} icon and then click inside the screencast.

**Tips**: To simulate a pinch gesture, hold **Shift** while dragging. To scroll, use your trackpad or mouse wheel or fling with your pointer.

## Troubleshooting

### I can't see my device on the **chrome://inspect page**.

* If you are developing on **Windows**, verify that the appropriate USB driver for your device is installed. See [OEM USB Drivers](https://developer.android.com/tools/extras/oem-usb.html) on the Android Developers' site.
* Verify that the device is connected directly to your machine, bypassing any hubs.
* Verify that **USB debugging** is enabled on your device. Remember to accept the USB debugging permission alerts on your device.
* On your desktop browser, navigate to **chrome://inspect** and verify that **Discover USB devices** is checked.
* Remote debugging requires your version of desktop Chrome to be newer than the version of Chrome for Android on your device. Try using [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) (Mac/Windows) or the Chrome [Dev channel](https://www.chromium.org/getting-involved/dev-channel) release (Linux) on desktop.

If you still can't see your device, unplug it. On your device, select **Settings > Developer options**. Tap **Revoke USB debugging authorizations**. Then, retry the [device setup and discovery process](#access-site-on-android-device).

### I can't see my browser tabs on the **chrome://inspect** page.

* On your device, open the Chrome browser and navigate to the web page you want to debug. Then, refresh the **chrome://inspect** page.


