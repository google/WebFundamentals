project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: A guide to get started building a basic, bare-bones Trusted Web Activity.

{# wf_published_on: 2019-08-28 #}
{# wf_updated_on: 2020-03-06 #}
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

* Have built an application that uses Trusted Web Activity and passes verification.
* Understand when your debug keys and your release keys are used.
* Be able to determine the signature your Android Application is being built with.
* Know how to create a basic [Digital Asset Links](/digital-asset-links/v1/getting-started) file.

To follow this guide you'll need:

* [Android Studio Installed](https://developer.android.com/studio/install)
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
[Custom Tab](https://developer.chrome.com/multidevice/android/customtabs).

## Clone and customize the example repo {: #clone-and-customize-the-example-repo }

The [svgomg-twa](https://github.com/GoogleChromeLabs/svgomg-twa) repo contains an example
Android application that launches a Trusted Web Activity. You can customize to launch your website:

1. Clone the project (`git clone https://github.com/GoogleChromeLabs/svgomg-twa.git`).
2. Import the Project into Android Studio, using **File** > **New** > **Import Project**, and select
   the folder to which the project was cloned.
3. Open the app's `build.gradle` and modify the values in `twaManifest`.
   There are two `build.gradle` files.
   You want the module one at `app/build.gradle`.

    * Change `hostName` to point to your website.
      Your website must be available on HTTPS, though you omit that from the `hostName` field.
    * Change `name` to whatever you want.
    * Change `applicationId` to something specific to your project.
      This translates into the app’s package name and is
      [how the app is identified](https://developer.android.com/studio/build/application-id) on the
      Play Store - no two apps can share the `applicationId` and if you change it you’ll need to
      create a new Play Store listing.

## Build and run {: #build-and-run }

In Android Studio hit **Run**, **Run ‘app’** (where ‘app’ is your module name, if you’ve changed it)
and the application will be built and run on your device!
You’ll notice that your website is launched as a Custom Tab, not a Trusted Web Activity, this is
because we haven’t set up our Digital Asset Links validation yet, but first...

### A note on signing keys {: #a-note-on-signing-keys }

Digital Asset Links take into account the key that an APK has been signed with and a common
cause for verification failing is to use the wrong signature.
(Remember, failing verification means you'll launch your website as a Custom Tab with
browser UI at the top of the page.)
When you hit **Run** or **Build APK** in Android Studio, the APK will be created with your developer
*debug key*, which Android Studio automatically generated for you.

If you deploy your app to the Play Store, you’ll hit **Build** > **Generate Signed APK**, which will
use a different signature, one that you’ll have created yourself (and protected with a password).
That means that if your Digital Asset Links file specifies your *production key*, verification
will fail when you build with your *debug key*.
This also can happen the other way around - if the Digital Asset Links file has your *debug key*,
your Trusted Web Activity will work fine locally, but then when you download the signed version
from the Play Store, verification will fail.

You can put both your *debug key* and *production key* in your asset link file
(see [Adding More Keys](#adding-more-keys) below),
but your debug key is less secure.
Anyone who gets a copy of the file can use it.
Finally, if you have your app installed on your device with one key, you can’t install the version
with the other key. You must uninstall the previous version first.

### Building your app {: #building }

* To build with debug keys:
    1. Click **Run 'app'** where 'app' is the name of your module if you changed it.
* To build with release keys:
    1. Click **Build**, then **Generate Signed APK**.
    2. Choose **APK**.
    3. If you're doing this for the first time, on the next page press **Create New**
       to create a new key and follow the
       [Android documentation](https://developer.android.com/studio/publish/app-signing#generate-key).
       Otherwise, select your previously created key.
    4. Press **Next** and pick the *release* build variant.
    5. Make sure you check both the V1 and the V2 signatures (the Play Store won’t let you upload
       the APK otherwise).
    6. Click **Finish**.

If you built with debug keys, your app will be automatically deployed to your device.
On the other hand if you built with release keys, after a few seconds a pop up will appear in the
bottom right corner giving you the option to locate or analyze the APK.
(If you miss it, you can press on the *Event Log* in the bottom right.)
You’ll need to use [adb](https://developer.android.com/studio/command-line/adb#move) manually to
install the signed APK with `adb install app-release.apk`.

This table shows which key is used based on how you create your APK.

<table>
  <tr><th>Key</th><th>Debug</th><th>Release</th></tr>
  <tr>
    <td>When is it created?</td>
    <td>Automatically by Android Studio.</td>
    <td>Manually by you.</td>
  </tr>
  <tr>
    <td>When is it used?</td>
    <td><ul>
      <li><b>Run 'app'</b>.</li>
      <li><b>Debug 'app'</b>.</li>
      <li><b>Build APK</b>.</li>
    </ul></td>
    <td><ul>
      <li><b>Generate Signed APK</b>.</li>
      <li>When the app is downloaded from the Play Store.</li>
    </ul></td>
  </tr>
</table>

## Creating your asset link file {: #creating-your-asset-link-file }

Now that your app is installed (with either the debug or release key), you can generate the Digital
Asset Link file.
I’ve created the
[Asset Link Tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool) to help you
do this.
If you'd prefer not to download the Asset Link Tool, you can
[determine your app's signature manually](/web/updates/2019/02/using-twa#link-site-to-app).

1. Download the [Asset Link Tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool).
2. When the app launches, you’ll be given a list of all applications installed on your device by
   `applicationId`.
   Filter the list by the `applicationId` you chose earlier and click on that entry.
3. You’ll see a page listing your app’s signature and with a generated Digital Asset Link.
   Click on the Copy or Share buttons at the bottom to export it however you like (e.g., save to
   Google Keep, email it to yourself).

Put the Digital Asset Link in a file called `assetlinks.json` and upload it to your website at
`.well-known/assetlinks.json` (relative to the root).

### Play Store Signing {: #play-store-signing }

If you opt in to
[App signing by Google Play](https://developer.android.com/studio/publish/app-signing#app-signing-google-play),
Google manages your app's signing key.
There are two ways you can get the correct Digital Asset Link file for a Google managed app signing
key:

* With the [Asset Link Tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool):
    1. Download your app from the Google Play Store.
    2. Repeat [Creating your asset link file](#creating-your-asset-link-file).
* Manually:
    1. Open the [Google Play Console](https://play.google.com/apps/publish/).
    2. Select your app.
    3. Choose **Release management** and then **App signing** from the panel on the left.
    4. Copy the **SHA-256 certificate fingerprint** from under the **App signing certificate**
       section.
    5. Use this value in your Digital Asset Link file.

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
      "4F:FF:49:FF:C6:1A:22:E3:BB:6F:E6:E1:E6:5B:40:17:55:C0:A9:F9:02:D9:BF:28:38:0B:AE:A7:46:A0:61:8C"

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
