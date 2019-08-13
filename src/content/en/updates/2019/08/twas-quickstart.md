project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A guide to get started building a basic, bare-bones Trusted Web Activity.

{# wf_published_on: 2019-08-13 #}
{# wf_updated_on: 2019-08-13 #}
{# wf_tags: trusted-web-activity #}
{# wf_blink_components: N/A #}

# Trusted Web Activities Quick Start Guide {: .page-title }

Trusted Web Activities can be a bit tricky to set up, especially if all you want to do is display
your website.
This guide will take you through creating a basic TWA, covering all the gotchas.

First off, you’ll need:

* [Android Studio Installed](https://developer.android.com/studio/install)
* An Android phone or emulator connected and set up for development
([enable USB debugging](https://developer.android.com/studio/debug/dev-options.html#enable)if
you’re using a physical phone).
* A browser that supports Trusted Web Activities on your development phone. Chrome 72+ will work,
support in other browsers is on its way.

## Clone and customize the example repo {: #clone-and-customize-the-example-repo }

The [svgomg-twa](https://github.com/GoogleChromeLabs/svgomg-twa) repo contains an example TWA that
you can customize to launch your website:

Clone the project (`git clone https://github.com/GoogleChromeLabs/svgomg-twa.git`).
Import the Project into Android Studio, using File > New > Import Project, and select the folder to
which the project was cloned.

Open the app’s `build.gradle` (there are two, you want the module one at app/build.gradle, not the
top level one) and modify the values in `twaManifest`:

* Change `hostName` to point to your website.
* Your website must be available on HTTPS, though you omit that from the hostName field.
  Change `name` to whatever you want.
* Change `applicationId` to something specific to your project.
  This translates into the app’s package name and is how the app is identified on the Play Store -
  no two apps can share the `applicationId` and if you change it you’ll need to create a new Play
  Store listing.

## Build and run {: #build-and-run }

In Android Studio hit Run, Run ‘app’ (replace ‘app’ with your module name if you’ve changed it) and
the TWA will be built and run on your device!
You’ll notice that the top bar is still visible, this is because we haven’t set up our Digital Asset
Links yet, but first...

### A note on signing keys {: #a-note-on-signing-keys }

**Digital Asset Links** take into account the key that an APK has been signed with and a common
cause for verification failing is to have the signature wrong.
When you hit *Run* or *Build APK* in Android Studio, the APK will be created with your developer
**debug key**, which Android Studio automatically generated for you.

If you deploy your app to the Play Store you’ll hit *Build > Generate Signed APK*, which will use a
different signature, one that you’ll have created yourself (and protected with a password).
That means that if your **Digital Asset Links** file specifies your **production key**, verification
will fail when you build with your **debug key**.
This also can happen the other way around - if the Digital Asset Links file has your **debug key**
your TWA will work fine locally, then when you sign it and upload it to Play it will fail to verify.

You can put both your debug and production key in your asset link file (see Adding More Keys below),
but your debug key is less secure (anyone who gets a copy of the file can use it).
Finally, if you have your app installed on your device with one key, you can’t install the version
with the other key - you must uninstall the previous version first.

### Building with debug keys {: #building-with-debug-keys }

Just hit *Run ‘app’* (replace ‘app’ with your module name if you’ve changed it).

### Building with release keys {: #building-with-release-keys }

Hit *Build > Generate Signed APK*, choose APK and on the next page hit “Create New” to create a new
key.
There’s more information on creating a key
[here](https://developer.android.com/studio/publish/app-signing#generate-key).
Once you created your key, hit next and pick the “release” build variant.
Make sure you tick both the V1 and the V2 signatures (the Play Store won’t let you upload the APK
otherwise).
Hit Finish.

After a few seconds a pop up will appear in the bottom right corner giving you the option to locate
or analyze the APK (if you miss it, you can press on the *Event Log* in the bottom right).
Annoyingly you’ll need to use adb manually to install the signed APK with
`adb install app-release.apk`.

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
      <li><i>Run 'app'</i>.</li>
      <li><i>Debug 'app'</i>.</li>
      <li><i>Build APK</i>.</li>
    </ul></td>
    <td><ul>
      <li><i>Generate Signed APK</i>.</li>
      <li>When the app is downloaded from the Play Store.</li>
    </ul></td>
  </tr>
</table>

## Creating your asset link file {: #creating-your-asset-link-file }

Now that you have your app installed (with either the debug or release key) we can go about
generating the Digital Asset Link file.
I’ve created the
[Asset Link Tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool) to help you
do this - download that app and run it.

When the app launches, you’ll be given a list of all applications installed on your device by
`applicationId`.
Filter the list by the `applicationId` you chose earlier and click on that entry.
You’ll see a page listing your app’s signature and with a generated Digital Asset Link.
Click on the Copy or Share buttons at the bottom to export it however you like (eg, save to Google
Keep, email it to yourself).

Put that JSON in a file called `assetlinks.json` and upload it to your website at
`.well-known/assetlinks.json` (relative to the root).

### Ensuring your asset link file is accessible {: #ensuring-your-asset-link-file-is-accessible }

Now that you’ve uploaded it, make sure you can access your asset link file on a browser - check that
`https://yourwebsite.com/.well-known/assetlinks.json` resolves to the file you just uploaded.

Jekyll based websites
If your website is generated by Jekyll (such as GitHub Pages), you’ll need to add a line of
configuration so that the `.well-known` directory is included in the output.
Create a file called `_config.yml` at the root of your site (or add to it if it already exists) and
enter (more information
[here](https://help.github.com/en/articles/files-that-start-with-an-underscore-are-missing)):

```yml
# Folders with dotfiles are ignored by default.
include: [.well-known]
```

### Adding more keys {: #adding-more-keys }

A Digital Asset Link file can contain multiple apps that are verified for your website and can allow
multiple signing keys for your app.
For example, to add a second key just use the
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

## Next Steps {: #next-steps }

Hopefully if you’ve followed this guide, you:

* Have built a Trusted Web Activity that verifies correctly.
* Understand when your debug keys and your release keys are used.
* Can determine the signature your TWA is being built with.
* Know how to create a basic Digital Asset Links file.

If not, please have a look at the Troubleshooting section below or file a GitHub issue against
[these docs](https://github.com/google/WebFundamentals/issues).

For your next steps, I’d recommend you start off by creating an icon for your app. With that done
you can consider deploying your app to the Play Store.

## Troubleshooting {: trouble-shooting }

### Viewing relevant  {: viewing-relevant-logs }
Chrome logs the reason that Digital Asset Links verification fails and you can view the logs on an
Android device with `adb logcat`.
If you’re on Linux/Mac you can see the relevant logs with:

```shell
> adb logcat -v brief | grep -e OriginVerifier -e digital_asset_links
```

For example if you see the message `Statement failure matching fingerprint.` you should use the
Asset Link Tool to see your app’s signature and make sure it matches that in your `assetlinks.json`
file (be wary of confusing your debug and release keys - look at the
[A note on signing keys](#a-note-on-signing-keys) section).

### Checking your browser {: #checking-your-browser }

A Trusted Web Activity will try to adhere to the user’s default choice of browser - if the user’s
default browser supports TWAs, it will be launched.
Failing that if any installed browser supports TWAs, they will be chosen.
Finally, the default behavior is to fall back to a Custom Tabs mode.

This means that if you’re trying to debug something to do with Trusted Web Activities you should
check to make sure you’re using the browser you think that you are.
You can use the following command to check which browser is being used:

```
> adb logcat -v brief | grep -e TWAProviderPicker
D/TWAProviderPicker(17168): Found TWA provider, finishing search: com.google.android.apps.chrome
```

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}