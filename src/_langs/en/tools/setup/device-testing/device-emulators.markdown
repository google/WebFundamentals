---
rss: false
layout: tools-article
title: "Types of Device Emulators and Simulators"
seotitle: "Types of Device Emulators and Simulators"
description: "Device emulators and simulators let you mimic your development site on a range of devices from your workstation. Learn about the different types of device emulators and simulators available."
introduction: "Device emulators and simulators let you mimic your development site on a range of devices from your workstation. Learn about the different types of device emulators and simulators available."
authors:
  - megginkearney
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 2
collection: device-testing
key-takeaways:
  emulator: 
    - When you don’t have a particular device, or want to do a spot check on something, the best option is to emulate the device right inside your browser.
    - Device emulators and simulators let you mimic your development site on a range of devices from your workstation.
    - Cloud-based emulators let you automate unit tests for your site across different platforms.
---

{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.emulator %}

## Browser emulation

Browser emulators are great for testing a site's responsiveness, but they don’t
emulate differences in API, CSS support, and certain behaviors that you'd see
on a mobile browser. Test your site on browsers running on real devices to be
certain everything behaves as expected.

### Chrome DevTools emulation

Chome DevTools has a [Device emulation tool](/web/tools/setup/device-testing/devtools-emulator) that creates a viewport with the right width and height to match a selected device and accounts for the screen density.

You can activate device emulation by following these four steps:

1. With Chrome DevTools open,
click the arrow icon with three horizontal lines.
2. Click the mobile device in the top left.
3. Select the `Emulation` tab at the bottom.
4. Then select the device you want to test against from the drop down.

<img src="imgs/chrome-devtools-emulation.png" alt="Chrome DevTools Emulation Guide" />

### Firefox responsive view

Firefox has a [responsive design view](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)
that encourages you to stop thinking in terms of specific devices and instead
explore how your design changes at common screen sizes or your own size by
dragging the edges.

To use the responsive view, open the developer tools in Firefox and click the
icon illustrated in step 1 below and use the handles at the side of the web page
to resize it, illustrated in step 2.

<img src="imgs/ff-responsive-design-mode.png" alt="Firefox Responsive Design View" />

### IE device emulation

IE11 has a feature where you can [change the viewport to match a Windows Phone](http://msdn.microsoft.com/en-gb/library/ie/dn255001(v=vs.85).aspx)
as well as view your site on older versions of IE.

To change the emulated browser, do the following:

1. Select the emulation tab.
2. Click the drop down labelled **Browser profile** and select your device.

<img src="imgs/ie-device-emulation.png" alt="IE Device Emulation" />

## Device emulators and simulators

While nothing can replace the real thing,
device emulators and simulators can be used to check API and CSS support
when you don't have access to a device.

### Android Emulator

There is a word of warning to be said about the Android emulator. At the moment,
there is no way to install Chrome on an Android emulator. However, you can use the
Android Browser, the Chromium Content Shell and Firefox for Android which we'll cover
later in this guide.

Chromium Content Shell uses the same Chrome rendering engine, but comes without any of the browser
specific features.

The Android emulator comes with the Android SDK which you need to [download from
here](http://developer.android.com/sdk/installing/studio.html).

Start by opening Android Studio and go to `Tools > Android > AVD Manager
(Android Virtual Device Manager)`. AVD is the place where you set up the
emulators you'd like to use.

<img src="imgs/android-emulator-adv-manager.png" alt="Android Virtual Device (AVD) Manager Menu" />

To start off, you'll have no emulators set-up so click `Create` and we'll get
set-up to emulate a Nexus 5.

<img src="imgs/android-avd-empty.png" alt="Android Virtual Devices Empty Screenshot" />

Initially you'll be presented with a somewhat scary form, but most items are
simple:

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Label">Label</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Label">
        AVD Name
      </td>
      <td data-th="Description">
        What would you like to call the emulator. Include the device name
           as well as what version of Android you apply to it
      </td>
    </tr>
    <tr>
      <td data-th="Label">
        Device
      </td>
      <td data-th="Description">
        This will give you a set of default devices you can use.
      </td>
    </tr>
    <tr>
      <td data-th="Label">
        CPU/ABI
      </td>
      <td data-th="Description">
        You need to select ARM to test your site with the Chromium Content Shell.
      </td>
    </tr>
    <tr>
      <td data-th="Label">
        Use Host GPU
      </td>
      <td data-th="Description">
        Make sure you <strong>check this</strong> field as it can drastically
        improve the emulator's performance.
      </td>
    </tr>
    <tr>
      <td data-th="Label">
        Other
      </td>
      <td data-th="Description">
        The other fields are optional as to whether you fill them in or not.
      </td>
    </tr>
  </tbody>
</table>

<img src="imgs/android-avd-filled-in.png" alt="Android AVD Filled In" />

Once you've clicked OK you'll see a pop-up dialog covering the options used.

<img src="imgs/android-avd-result.png" alt="Android AVD Confirmation Dialog" />

Another click on OK and you'll be back to the start with your new emulator
listed. Select it and click start.

<img src="imgs/android-avd-listed.png" alt="Android AVD List" />

A dialog will pop up with some options. You may wish to select the `scale display
to real size` so that the emulator doesn't fill up your computer screen;
otherwise click `Launch`.

<img src="imgs/android-avd-launch.png" alt="Android AVD Launch Dialog" />

Once your emulator is booted, click on the Browser icon and you'll be able to
test your site on the old Stock Browser for Android.

<img src="imgs/android-emulator-stock-browser.png" alt="Android Emulator Stock Browser Screenshot" />

### Chromium Content Shell on Android

To install the Chromium Content Shell for Android, leave your emulator running
and run the following commands at a command prompt:

    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

Now you can test your site with the Chromium Content Shell.

<img src="imgs/android-avd-contentshell.png" alt="Android Emulator Content Shell" />

### Firefox on Android

Similar to Chromium's Content Shell, you can get an APK to install Firefox onto
the emulator.

Open the URL below, select the right language and download the  .apk file.

[https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/](https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/)

From here, you can install the file onto an open emulator or connected Android
device with the following command:

    adb install <path to APK>/fennec-XX.X.XX.android-arm.apk

<img src="imgs/ff-on-android-emulator.png" alt="Firefox Icon on Android Emulator" />

### iOS Simulator

The iOS simulator for Mac OS X comes with Xcode, which you can [install from the
App Store](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12).

To use the iOS Simulator, open Xcode, in the top menu go to `Xcode >
 Open Developer Tool` and select `iOS Simulator`.

<img src="imgs/xcode-ios-simulator.png" alt="Xcode Menu for iOS Simulator" />

Once the simulator is open you can fire up Safari and you're good to go.

<img src="imgs/ios-simulator.png" alt="iOS Simulator Screenshot" />

**Tip**  
To avoid having to open Xcode every time you want to use the iOS
Simulator, open the iOS simulator once, as above, then right click the iOS Simulator
icon in your dock and select `Keep in Dock`. Just click this icon whenever you
need it.

### Modern.IE

Modern.IE Virtual Machines let you access different versions of IE on your
computer via VirtualBox (or VMWare). Choose a virtual machine on the [download page
here](https://modern.ie/en-us/virtualization-tools#downloads).

It's worth mentioning that in the IE11 VM, you can test different
versions of IE by changing the `Document Mode`, see [this section for more info.]({{site.baseurl}}/fundamentals/tools/devices/browseremulation.html#ie-device-emulation)

<img src="imgs/modern-ie-simulator.png" alt="Modern IE VM" />

## Cloud-based emulators and simulators

If you can’t use the emulators for whatever reason and don't have access to real devices, then cloud-based emulators are the next best thing.

The one big advantage of cloud-based emulators over real devices and local
emulators is that you can automate unit tests for your site across different
platforms.

### BrowserStack

[BrowserStack (commercial)](https://www.browserstack.com/automate) is the
easiest to use for manual testing. You select an operating system,
select your browser version and device type, select a URL to browse, and it
spins up a hosted virtual machine that you can interact with.

You can also fire up multiple emulators in the same screen, letting you test how
your app looks and feels across multiple devices at the same time.

### SauceLabs

[SauceLabs (commercial)](https://saucelabs.com/) allows you to run unit tests
inside of an emulator, which can be really useful for scripting a flow through
your site and watch the video recording of this afterwards on various devices.

You can also do manual testing with your site.

### Device Anywhere

Unlike BrowserStack and SauceLabs, [Device Anywhere
(commercial)](http://www.keynote.com/solutions/testing/mobile-testing) doesn't
use emulators, it uses real devices which you can control remotely.

This is very useful in the event where you need to reproduce a problem on a
specific device and can't see the bug on any of the options in the previous guides.

{% include modules/nextarticle.liquid %}

{% endwrap %}

