---
layout: article
title: "Use Device Emulators"
description: "While nothing can replace the real thing, emulators and simulators can be used to check API and CSS support when you don't have access to a device."
introduction: "While nothing can replace the real thing, emulators and simulators can be used to check API and CSS support when you don't have access to a device."
article:
  written_on: 2014-09-25
  updated_on: 2014-09-25
  order: 3
collection: devices
authors:
  - mattgaunt
key-takeaways:
notes:
    - TBD.
---
{% wrap content %}

{% include modules/toc.liquid %}

## Android Emulator

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
        improve the emulators performance.
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

Once you're emulator is booted, click on the Browser icon and you'll be able to
test your site on the old Stock Browser for Android.

<img src="imgs/android-emulator-stock-browser.png" alt="Android Emulator Stock Browser Screenshot" />

## Chromium Content Shell on Android

To install the Chromium Content Shell for Android, leave your emulator running
and run the following commands in a terminal:

    git clone https://github.com/PaulKinlan/chromium-android-installer.git
    chmod u+x ./chromium-android-installer/\*.sh
    ./chromium-android-installer/install-chromeandroid.sh

Now you can test your site with the Chromium Content Shell.

<img src="imgs/android-avd-contentshell.png" alt="Android Emulator Content Shell" />

## Firefox on Android

Similar to Chromium's Content Shell, you can get an APK to install Firefox onto
the emulator.

Open the URL below, select the right language and download the  .apk file.

[https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/android/](https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/android/)

From here, you can install the file onto an open emulator or connected Android
device with the following command:

    adb install <path to APK>/fennec-XX.X.XX.android-arm.apk

<img src="imgs/ff-on-android-emulator.png" alt="Firefox Icon on Android Emulator" />

## iOS Simulator

The iOS simulator for Mac OS X comes with XCode, which you can [install from the
App Store](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12).

To use the iOS Simulator, open XCode, in the top menu go to `XCode >
 Open Developer Tool` and select `iOS Simulator`.

<img src="imgs/xcode-ios-simulator.png" alt="Xcode Menu for iOS Simulator" />

Once the simulator is open you can fire up Safari and you're good to go.

<img src="imgs/ios-simulator.png" alt="iOS Simulator Screenshot" />

**Tip**  
To avoid having to open XCode every time you want to use the iOS
Simulator, open the iOS simulator once, as above, then right click the iOS Simulator
icon in your dock and select `Keep in Dock`. Just click this icon whenever you
need it.

## Modern.IE

Modern.IE Virtual Machines let you access different versions of IE on your
computer via VirtualBox (or VMWare). Choose a virtual machine on the [download page
here](https://modern.ie/en-us/virtualization-tools#downloads).

It's worth mentioning that in the IE11 VM, you can test different
versions of IE by changing the `Document Mode`, see [this section for more info.]({{site.baseurl}}/fundamentals/tools/devices/browseremulation.html#ie-device-emulation)

<img src="imgs/modern-ie-simulator.png" alt="Modern IE VM" />

{% include modules/nextarticle.liquid %}

{% endwrap %}
