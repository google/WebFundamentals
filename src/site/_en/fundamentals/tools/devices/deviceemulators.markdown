---
layout: article
title: "Use Device Emulators"
description: ""
introduction: ""
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
there is no way to install Chrome on an Android emulator. You can test the
Android Browser, which ships by default on older versions of Android and the
Android emulator.

To test for Chrome on Android, you can use the Chromium Content Shell, which
uses the same Chrome rendering engine, but comes without any of the browser
specific features, which we'll demonstrate below.
<!-- No converter for: PAGE_BREAK -->
The Android emulator comes with the Android SDK which you need to [download from
here](http://developer.android.com/sdk/installing/studio.html).

Start by opening Android Studio and go to Tools &gt; Android &gt; AVD Manager
(Android Virtual Device Manager). AVD is the place where you set up the
emulators you'd like to use.

<img src="imgs/android-emulator-adv-manager.png" alt="Android Virtual Device (AVD) Manager Menu" />

To start off, you'll have no emulators set-up so click Create and we'll get
set-up to emulate a Nexus 5.

<img src="imgs/android-avd-empty.png" alt="Android Virtual Devices Empty Screenshot" />

Initially you'll be present with a somewhat scary form, but most items are
simple:

1. AVD Name: What would you like to call the emulator. Include the device name
   as well as what version of Android you apply to it
2. Device: This will give you a set of default devices you can use.
3. CPU/ABI: To test the Chrome Content Shell you need to select ARM.
4. Use Host GPU: This is important as it can drastically improve the emulators
   performance.
5. The other fields are optional as to whether you fill them in or not.

<img src="imgs/android-avd-filled-in.png" alt="Android AVD Filled In" />

Once you've clicked OK you'll see a pop-up dialog covering the options used.

<img src="imgs/android-avd-listed.png" alt="Android AVD List" />

Another click on OK and you'll be back to the start with your new emulator
listed. Select it and click start.

<img src="imgs/android-avd-result.png" alt="Android AVD Confirmation Dialog" />

A dialog will pop with some options.You may wish to select the \`scale display
to real size\` so that the emulator doesn't fill up your computer screen;
otherwise click \`Launch\`.

<img src="imgs/android-avd-launch.png" alt="Android AVD Launch Dialog" />

Once you're emulator is booted, click on the Browser icon and you'll be able to
test your site on the old Stock Browser for Android.

<img src="imgs/android-emulator-stock-browser.png" alt="Android Emulator Stock Browser Screenshot" />

## Chromes Content Shell on Android

To install the Chromium Content Shell for Android, leave your emulator running
and run the following commands in a terminal:

git clone
[https://github.com/PaulKinlan/chromium-android-installer.git](https://github.com/PaulKinlan/chromium-android-installer.git)
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

adb install &lt;path to apk&gt;/fennec-XX.X.XX.android-arm.apk

<img src="imgs/ff-on-android-emulator.png" alt="Firefox Icon on Android Emulator" />

## iOS Simulator

The iOS simulator for Mac OS X comes with XCode, which you can [install from the
App Store](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12).

To open the iOS Simulator, open Xcode, go to \`Xcode\` in the top menu &gt;
\`Open Developer Tool\` and select iOS Simulator.

<img src="imgs/xcode-ios-simulator.png" alt="Xcode Menu for iOS Simulator" />

Once the simulator is open you can fire up Safari and you're good to go.

<img src="imgs/ios-simulator.png" alt="iOS Simulator Screenshot" />

One useful tip: to avoid having to open Xcode every time you want to use the iOS
Simulator, open the iOS simulator as above, then right click the iOS Simulator
icon in your dock and select 'Keep in Dock'. Just click this icon whenever you
need it.

## Modern.IE

The final set of emulators worth mentioning are the Modern.IE Virtual Machines
which give you access different versions of IE on your computer via VirtualBox
(or VMWare). Head over to the [download page
here](https://modern.ie/en-us/virtualization-tools#downloads) to get up and
running.

It's worth mentioning that in the IE11 VM, you can actually test different
versions of IE by changing the 'Document Mode'. They may not be perfect
representation's but they are fairly close.

<img src="imgs/modern-ie-simulator.png" alt="Modern IE VM" />

{% include modules/nextarticle.liquid %}

{% endwrap %}
