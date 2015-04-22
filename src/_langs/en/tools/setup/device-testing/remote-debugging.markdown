---
layout: article
title: "Access Your Site From Devices Using Remote Debugging"
seotitle: "Access Your Development Site From Devices Using Remote Debugging"
description: "Web content behaves differently on mobile than on desktop. Debug live content on your device from your development machine using remote debugging."
introduction: "Web content behaves differently on mobile than on desktop. Debug live content on your device from your development machine using remote debugging."
authors:
  - megginkearney
article:
  written_on: 2015-04-14
  updated_on: 2015-04-22
  order: 2
collection: device-testing
key-takeaways:
  real: 
    - There's no substitute for running your site on a real device. You must try your site on real devices.
    - Something on remote debugging.
    - Something on screen casting.
---
{% wrap content%}

![Debugging Chrome for Android using the Chrome Developer Tools](imgs/remote-debug-banner.png)

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.real %}

## Access Site on Android Device

Learn how to use the Chrome DevTools to debug your site live on your Android device.

### 3 Requirements

To begin remote debugging, you need:

* Chrome 32 or later installed on your development machine.
* A USB cable to connect your Android device.
* Android 4.0+ and [Chrome for Android](https://play.google.com/store/apps/details?id=com.android.chrome&hl=en).

**Note**: Remote debugging requires your version of desktop Chrome to be newer than the version of Chrome for Android on your device. For best results, use [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) (Mac/Windows) or the Chrome [Dev channel](http://www.chromium.org/getting-involved/dev-channel) release (Linux) on desktop.

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

**Note**: If you are developing on **Windows**, install the appropriate USB driver for your device. See [OEM USB Drivers](http://developer.android.com/tools/extras/oem-usb.html) on the Android Developers' site.

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

### Ready to Debug your site in a browser tab!

On your computer, the **chrome://inspect** page displays every connected device, along with its open tabs and debug-enabled WebViews (**TBD. Eventually link to WebView content in Android docs).

![The chrome://inspect page.](imgs/chrome-inspect-devices.png)

To start debugging, click **inspect** below the browser tab you want to debug.

![Click inspect to start remote debugging](imgs/chrome-inspect-tabs.png)

A new instance of Chrome DevTools launches on your computer. From this instance, you can interact with the selected browser tab on your device in real time.

![Debugging Chrome for Android using the Chrome Developer Tools](remote-debugging/remote-debug-overview.jpg)

For example, you can use DevTools to inspect web page elements on your device:

*   When you mouse over an element in the **Elements** panel, DevTools highlights the element on your device.
*   You can also click the **Inspect Element** ![inspect element icon](imgs/inspect-icon.png)icon in DevTools and tap your device screen. DevTools highlights the tapped element in the **Elements** panel.

**Note**: The version of Chrome on your device determines the version of DevTools used during remote debugging. For this reason, the remote debugging DevTools might differ from the version that you normally use.

## Access Site on iOS or Windows Device

To debug Safari for iOS, follow these steps:

1. Open Safari on your iOS device.
2. Connect it to your computer via USB.
3. Open Safari on your computer.
4. In Safari's menu, go to `Develop` and, look for your devices name.
5. Select the tab you want to debug.

[Safari iOS Debugging Menu]> (imgs/ios-safari-debugging.png)

Unfortunately there is no way to debug a site on Windows Phone, but you can  
[emulate a mobile browser on the desktop version of IE
11](http://msdn.microsoft.com/en-us/library/ie/dn255001%28v=vs.85%29.aspx).
We'll cover this in the [next article](device-emulators.markdown).

## Screencast From Android Device to Development Machine

TBD. This covers https://developer.chrome.com/devtools/docs/remote-debugging#screencasting

TBD. I think I'm going to make this it's own doc in the same section, but just to break up content a bit-- and besides, this is slightly away from main topic of accessing the content.

{% include modules/nextarticle.liquid %}

{% endwrap %}
