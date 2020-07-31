project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: A guide to get started building a basic, bare-bones Trusted Web Activity.

{# wf_published_on: 2019-08-28 #}
{# wf_updated_on: 2020-07-31 #}
{# wf_tags: trusted-web-activity #}
{# wf_featured_image: /web/updates/images/generic/devices.png #}
{# wf_blink_components: N/A #}

# Trusted Web Activities Quick Start Guide {: .page-title }

{% include "web/_shared/contributors/peconn.html" %}

<div class="clearfix"></div>

Trusted Web Activities can be a bit tricky to set up, especially if all you want to do is
display your website.
This guide will take you through creating a basic project that uses Trusted Web Activities,
covering all the gotchas.

By the end of this guide, you will:

* Have used [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) to build an application
that uses a Trusted Web Activity and passes verification.
* Understand when your signing keys are used.
* Be able to determine the signature your Android Application is being built with.
* Know how to create a basic [Digital Asset Links](/digital-asset-links/v1/getting-started) file.

To follow this guide you'll need:

* [Node.js](https://nodejs.org/en/) 10 or above installed on the development computer.
* An Android phone or emulator connected and set up for development
([Enable USB debugging](https://developer.android.com/studio/debug/dev-options.html#enable) if
you’re using a physical phone).
* A browser that supports Trusted Web Activity on your development phone.
  Chrome 72 or later will work. Support in other browsers is on its way.
* A website you'd like to view in the Trusted Web Activity.

A Trusted Web Activity lets your Android App launch a full screen Browser Tab without
any browser UI.
This capability is restricted to websites that you own, and you prove this by setting
up Digital Asset Links.
Digital Asset Links consist essentially of a file on your website that points to your app and some
metadata in your app that points to your website.
We'll talk [more about them later](#a-note-on-signing-keys).

When you launch a Trusted Web Activity, the browser will check that the Digital Asset Links check
out, this is called **verification**.
If verification fails, the browser will fall back to displaying your website as a
[Custom Tab](/web/android/custom-tabs).

## Install and configure Bubblewrap {: #install-and-configure-bubblewrap }

[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) is a set of libraries and a command
line tool (CLI) for Node.js that helps developers generate, build and run Progressive Web Apps
inside Android applications, using Trusted Web Activity.

The CLI can be installed with the following command:

```shell
npm i -g @bubblewrap/cli
```

### Setting up the Environment

#### Get the Java Development Kit (JDK) 8.
The Android Command line tools requires the correct version of the JDK to run. To prevent version
conflicts with a JDK version that is already installed, Bubblewrap uses a JDK that can unzipped in
a separate folder.

Warning: Using a version lower than 8 will make it impossible to compile the project and higher
versions are incompatible with the Android command line tools.

Download a version of JDK 8 that is compatible with your OS from
[AdoptOpenJDK](https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=hotspot)
and extract it in its own folder.

#### Get the Android command line tools
Download a version of Android command line tools that is compatible with your OS from
[https://developer.android.com/studio#command-tools](https://developer.android.com/studio#command-tools).
Create a folder and extract the downloaded file into it. The tool will further install its
dependencies, without the need to install the whole Android IDE.

When running `bubblewrap` for the first time, it will ask where it can find the JDK and Android
command line tools. So, take note of the location where both were decompressed.

## Initialize and build project {: initialize-and-build}

Initializing an Android project that wraps a PWA is done by running the init command:

```shell
bubblewrap init --manifest=https://my-twa.com/manifest.json
```

Bubblewrap will read the [Web Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest),
ask developers to confirm values to be used in the Android project, and generate the project using
those values. Once the project has been generated, generate an APK by running:

```shell
bubblewrap build
```

## Run {: #build-and-run }

The build step will output a file called `app-release-signed.apk`. This file can be installed on a
development device for testing or uploaded to the Play Store for release.

Bubblewrap provides a command to install and test the application on a local device. With the
development device connected to the computer run:

```
bubblewrap install
```

Alternatively, the [adb](https://developer.android.com/studio/command-line/adb#move) tool can be
used.

```
adb install app-release-signed.apk
```

Note: the `adb` command-line tool is located inside the Android command-line tools in
`android_sdk/platform-tools/`.

The application should now be available on the device launcher. When opening the application you’ll
notice that your website is launched as a Custom Tab, not a Trusted Web Activity, this is
because we haven’t set up our Digital Asset Links validation yet, but first...

### Graphical User Interface (GUI) alternatives for Bubblewrap

[PWA Builder](https://www.pwabuilder.com/) provides a GUI interface that uses the Bubblewrap
library to power the generation of Trusted Web Activity projects. Find more instructions on how to
use PWA Builder to create an Android App that opens your PWA in
[this blogpost](https://www.davrous.com/2020/02/07/publishing-your-pwa-in-the-play-store-in-a-couple-of-minutes-using-pwa-builder/).

### A note on signing keys {: #a-note-on-signing-keys }

Digital Asset Links take into account the key that an APK has been signed with and a common
cause for verification failing is to use the wrong signature.
(Remember, failing verification means you'll launch your website as a Custom Tab with
browser UI at the top of the page.)
When Bubblewrap builds the application, an APK will be created with a key setup during the `init`
step.

## Setting up your asset link file {: #creating-your-asset-link-file }

Besides the APK file, Bubblewrap output an `assetlinks.json` file that matches the key used to sign
the APK.

Upload the `assetlinks.json` file generated by Bubblewrap to your website at
`.well-known/assetlinks.json` (relative to the root).

### Play Store Signing {: #play-store-signing }

If you opt in to
[App signing by Google Play](https://developer.android.com/studio/publish/app-signing#app-signing-google-play),
Google manages your app's signing key.

When opted in, the key used to sign the APK that is downloaded from the Play Store
will be different from the key that Bubblewrap used when building the APK. This means that the
`assetlinks.json` file will need to be updated with the new signature.

There are two ways you can get the correct Digital Asset Link file for a Google managed app signing
key:

* With the [Asset Link Tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool):
    1. Install the
     [Asset Link Tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool) from
     the Play Store.
    2. Download your app from the Google Play Store and open launch.
    3. When the app launches, you’ll be given a list of all applications installed on your device by
   `applicationId`.
     Filter the list by the `applicationId` you chose earlier and click on that entry.
    4. You’ll see a page listing your app’s signature and with a generated Digital Asset Link.
     Click on the Copy or Share buttons at the bottom to export it however you like (e.g., save to
     Google Keep, email it to yourself).
* Manually:
    1. Open the [Google Play Console](https://play.google.com/apps/publish/).
    2. Select your app.
    3. Choose **Release management** and then **App signing** from the panel on the left.
    4. Copy the **SHA-256 certificate fingerprint** from under the **App signing certificate**
       section.
    5. Use this value in your Digital Asset Link file.

It is possible to have both keys in the `assetlinks.json`. See
[Adding More Keys](#adding-more-keys) below for more information on how to do it.

### Ensuring your asset link file is accessible {: #ensuring-your-asset-link-file-is-accessible }

Now that you’ve uploaded it, make sure you can access your asset link file in a browser.
Check that `https://example.com/.well-known/assetlinks.json` resolves to the file you just uploaded.

#### Jekyll based websites

If your website is generated by Jekyll (such as GitHub Pages), you’ll need to add a line of
configuration so that the `.well-known` directory is included in the output.
GitHub help has [more information on this topic](https://help.github.com/en/articles/files-that-start-with-an-underscore-are-missing).
Create a file called `_config.yml` at the root of your site (or add to it if it already exists) and
enter:

```yml
# Folders with dotfiles are ignored by default.
include: [.well-known]
```

### Adding more keys {: #adding-more-keys }

A Digital Asset Link file can contain more than one app, and for each app, it can contain more than
one key.
For example, to add a second key, just use the
[Asset Link Tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool) to
determine the key and add it as a second entry to the `sha256_cert_fingerprints` field.
The code in Chrome that parses this JSON is quite strict, so make sure you don’t accidentally add an
extra comma at the end of the list.

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.appspot.pwa_directory",
    "sha256_cert_fingerprints": [
      "FA:2A:03:CB:38:9C:F3:BE:28:E3:CA:7F:DA:2E:FA:4F:4A:96:F3:BC:45:2C:08:A2:16:A1:5D:FD:AB:46:BC:9D",
    ]
  }
},{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.appspot.pwa_directory",
    "sha256_cert_fingerprints": [
      "4F:FF:49:FF:C6:1A:22:E3:BB:6F:E6:E1:E6:5B:40:17:55:C0:A9:F9:02:D9:BF:28:38:0B:AE:A7:46:A0:61:8C",
    ]
  }
}]
```

## Troubleshooting {: trouble-shooting }

### Viewing relevant logs {: viewing-relevant-logs }
Chrome logs the reason that Digital Asset Links verification fails and you can view the logs on an
Android device with `adb logcat`.
If you’re developing on Linux/Mac, you can see the relevant logs from a connected device
with:

```shell
> adb logcat -v brief | grep -e OriginVerifier -e digital_asset_links
```

For example, if you see the message `Statement failure matching fingerprint.`, you should use the
Asset Link Tool to see your app’s signature and make sure it matches that in your `assetlinks.json`
file (Be wary of confusing your debug and release keys. Look at the
[A note on signing keys](#a-note-on-signing-keys) section.)

### Checking your browser {: #checking-your-browser }

A Trusted Web Activity will try to adhere to the user’s default choice of browser.
If the user’s default browser supports Trusted Web Activities, it will be launched.
Failing that, if any installed browser supports Trusted Web Activities, it will be chosen.
Finally, the default behavior is to fall back to a Custom Tabs mode.

This means that if you’re debugging something to do with Trusted Web Activities, you should
make sure you’re using the browser you think that you are.
You can use the following command to check which browser is being used:

```
> adb logcat -v brief | grep -e TWAProviderPicker
D/TWAProviderPicker(17168): Found TWA provider, finishing search: com.google.android.apps.chrome
```

## Next Steps {: #next-steps }

Hopefully, if you’ve followed this guide, you'll have a working Trusted Web Activity and have enough
knowledge to debug what's going on when verification fails.
If not, please have a look at the Troubleshooting section or file a GitHub issue against
[these docs](https://github.com/google/WebFundamentals/issues).

For your next steps, I’d recommend you start off by
[creating an icon for your app](https://developer.android.com/studio/write/image-asset-studio#launcher).
With that done, you can consider deploying your app to the Play Store.

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
