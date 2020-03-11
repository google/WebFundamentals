project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: Trusted Web Activity

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-03-06 #}
{# wf_blink_components: N/A #}

# Trusted Web Activity Integration Guide {: .page-title }

Note: A simpler
[quick start guide for Trusted Web Activities](/web/updates/2019/08/twas-quickstart)
is now available.

Setting up a Trusted Web Activity doesn’t require developers to author
Java code, but [Android Studio](https://developer.android.com/studio/) is
required. This guide was created using *Android Studio 3.3*. Check the [docs on
how to install it](https://developer.android.com/studio/install).

## Create a Trusted Web Activity Project {: #create-project }

When using Trusted Web Activities, the project must target API 16 or higher.

Note: This section will guide you on setting up a new project on Android
Studio. If you are already familiar with the tool feel free to skip to the
[Getting the Trusted Web Activity Library](#get-support-lib) section.

Open Android Studio and click on _Start a new Android Studio project_.

Android Studio will prompt to choose an Activity type. Since Trusted Web Activities use an
Activity provided by support library, choose _Add No Activity_ and click
_Next_.

Next step, the wizard will prompt for configurations for the project. Here's a
short description of each field:

* **Name:** The name that will be used for your application on the
  _Android Launcher_.
* **Package Name:** An unique identifier for Android Applications on the
  Play Store and on Android devices. Check the
  [documentation](https://developer.android.com/guide/topics/manifest/manifest-element#package)
  for more information on requirements and best practices for creating package
  names for Android apps.
* **Save location:** Where Android Studio will create the project in the file
  system.
* **Language:** The project doesn't require writing any Java or Kotlin code.
  Select Java, as the default.
* **Minimum API Level:** The Support Library requires at least _API Level 16_.
  Select API 16 any version above.

Leave the remaining checkboxes unchecked, as we will not be using Instant Apps
or AndroidX artifacts, and click _Finish_.

## Get the Trusted Web Activity Support Library {: #get-support-lib }

To setup the Trusted Web Activity library in the project you will need to edit the Application
build file. Look for the _Gradle Scripts_ section in the _Project Navigator_.
There are two files called `build.gradle`, which may be a bit confusing and the
descriptions in parenthesis help identifying the correct one.

The file we are are looking for is the one with module **Module** next to its
name.

The Trusted Web Activities library uses
[Java 8 features](https://developer.android.com/studio/write/java8-support)
and the first change enables Java 8. Add a `compileOptions` section to the
bottom of the `android` section, as below:

```
android {
        ...
    compileOptions {
       sourceCompatibility JavaVersion.VERSION_1_8
       targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

The next step will add the Trusted Web Activity Support Library to the project. Add a new
dependency to the `dependencies` section:

```
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:1.1.0'
}
```

Android Studio will show prompt asking to synchronize the project once more.
Click on the _Sync Now_ link and synchronize it.

## Launch the Trusted Web Activity {: #add-activity }

Setting up the Trusted Web Activity is achieved by editing the
[Android App Manifest](https://developer.android.com/guide/topics/manifest/manifest-intro).

On the _Project Navigator_, expand the _app_ section, followed by the
_manifests_ and double click on `AndroidManifest.xml` to open the file.

Since we asked Android Studio not to add any Activity to our project when
creating it, the manifest is empty and contains only the application tag.

Add the Trusted Web Activity by inserting an `activity` tag into the `application` tag:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.twa.myapplication">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        tools:ignore="GoogleAppIndexingWarning">
        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity">

           <!-- Edit android:value to change the url opened by the Trusted Web Activity -->
           <meta-data
               android:name="android.support.customtabs.trusted.DEFAULT_URL"
               android:value="https://airhorner.com" />

           <!-- This intent-filter adds the Trusted Web Activity to the Android Launcher -->
           <intent-filter>
               <action android:name="android.intent.action.MAIN" />
               <category android:name="android.intent.category.LAUNCHER" />
           </intent-filter>

           <!--
             This intent-filter allows the Trusted Web Activity to handle Intents to open
             airhorner.com.
           -->
           <intent-filter>
               <action android:name="android.intent.action.VIEW"/>
               <category android:name="android.intent.category.DEFAULT" />
               <category android:name="android.intent.category.BROWSABLE"/>

               <!-- Edit android:host to handle links to the target URL-->
               <data
                 android:scheme="https"
                 android:host="airhorner.com"/>
           </intent-filter>
        </activity>
    </application>
</manifest>
```

The tags added to the XML are standard
[Android App Manifest](https://developer.android.com/guide/topics/manifest/manifest-intro).
There are two relevant pieces of information for the context of Trusted Web
Activities:

1. The `meta-data` tag tells the Trusted Web Activity which URL it should open. Change
   the `android:value` attribute with the URL of the PWA you want to open. In
   this example, it is `https://airhorner.com`.
2. The **second** `intent-filter` tag allows the Trusted Web Activity to intercept Android
   Intents that open `https://airhorner.com`. The `android:host` attribute
   inside the `data` tag must point to the domain being opened by the Trusted Web Activity.

Note: When running the project at this stage, the URL Bar from Custom Tabs will
still show on the top of the screen. **This is not a bug**.

The next section will show how to setup
[Digital AssetLinks](/digital-asset-links/v1/getting-started)
to verify relationship between the website and the app, and remove the URL bar.

## Remove the URL bar {: #remove-url-bar }

Trusted Web Activities require an association between the Android application
and the website to be established to remove the URL bar.

This association is created via
[Digital Asset Links](/digital-asset-links/v1/getting-started)
and the association must be established in both ways, linking
[from the app to the website](/digital-asset-links/v1/create-statement)
and
[from the website to the app](https://developer.android.com/training/app-links/verify-site-associations#web-assoc).

It is possible to setup the app to website validation and setup Chrome to skip
the website to app validation, for debugging purposes.

### Establish an association from app to the website {: #link-app-to-site }

Open the string resources file `app > res > values > strings.xml` and add the
Digital AssetLinks statement below:

```xml
<resources>
    <string name="app_name">AirHorner Trusted Web Activity</string>
    <string name="asset_statements">
        [{
            \"relation\": [\"delegate_permission/common.handle_all_urls\"],
            \"target\": {
                \"namespace\": \"web\",
                \"site\": \"https://airhorner.com\"}
        }]
    </string>
</resources>
```

Change the contents for the `site` attribute to match the schema and domain
opened by the Trusted Web Activity.

Back in the Android App Manifest file, `AndroidManifest.xml`, link to the
statement by adding a new `meta-data` tag, but this time as a child of the
`application` tag:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.twa.myapplication">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <meta-data
            android:name="asset_statements"
            android:resource="@string/asset_statements" />

        <activity>
            ...
        </activity>

    </application>
</manifest>
```

We have now established a relationship from the Android application to the
website. It is helpful to debug this part of the relationship without creating
the website to application validation.

Here’s how to test this on a development device:

### Enable debug mode {: #debugging }

1. Open Chrome on the development device, navigate to `chrome://flags`, search
   for an item called _Enable command line on non-rooted devices_ and change it
   to **ENABLED** and then restart the browser.
2. Next, on the Terminal application of your operating system, use the
   [Android Debug Bridge](https://developer.android.com/studio/command-line/adb)
   (installed with Android Studio), and run the following command:

<pre class="devsite-terminal devsite-click-to-copy">
adb shell "echo '_ --disable-digital-asset-link-verification-for-url=\"https://airhorner.com\"' > /data/local/tmp/chrome-command-line"
</pre>

Close Chrome and re-launch your application from Android Studio. The
application should now be shown in full-screen.

Note: It may needed to force close Chrome so it restarts with the correct
command line. Go to _Android Settings > Apps & notifications > Chrome_,
and click on _Force stop_.

## Establish an association from the website to the app {: #link-site-to-app }

There are 2 pieces of information that the developer needs to collect from the
app in order to create the association:

* **Package Name:** The first information is the package name for the app. This
  is the same package name generated when creating the app. It can also be found
  inside the **Module** `build.gradle`, under
  _Gradle Scripts > build.gradle (Module: app)_, and is the value of the
  `applicationId` attribute.
* **SHA-256 Fingerprint:** Android applications must be signed in order to be
  uploaded to the Play Store. The same signature is used to establish the
  connection between the website and the app through the SHA-256 fingerprint of
  the upload key.

The Android documentation [explains in detail how to generate a key using Android
Studio](https://developer.android.com/studio/publish/app-signing#generate-key).
Make sure to take note the _path_, _alias_ and _passwords_ for the key store, as
you will need it for the next step.

Extract the SHA-256 fingerprint using the
[keytool](https://docs.oracle.com/javase/6/docs/technotes/tools/windows/keytool.html),
with the following command:

<pre class="devsite-terminal devsite-click-to-copy">
keytool -list -v -keystore <path> -alias <alias> -storepass <password> -keypass <password>
</pre>

The value for the *SHA-256 fingerprint* is printed under the *Certificate*
fingerprints section. Here’s an example output:

<pre>
<code class="devsite-terminal">keytool -list -v -keystore ./mykeystore.ks -alias test -storepass password -keypass password</code>

Alias name: key0
Creation date: 28 Jan 2019
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Test Test, OU=Test, O=Test, L=London, ST=London, C=GB
Issuer: CN=Test Test, OU=Test, O=Test, L=London, ST=London, C=GB
Serial number: ea67d3d
Valid from: Mon Jan 28 14:58:00 GMT 2019 until: Fri Jan 22 14:58:00 GMT 2044
Certificate fingerprints:
   SHA1: 38:03:D6:95:91:7C:9C:EE:4A:A0:58:43:A7:43:A5:D2:76:52:EF:9B
   SHA256: F5:08:9F:8A:D4:C8:4A:15:6D:0A:B1:3F:61:96:BE:C7:87:8C:DE:05:59:92:B2:A3:2D:05:05:A5:62:A5:2F:34
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3
</pre>

With both pieces of information at hand, head over to the [assetlinks
generator](/digital-asset-links/tools/generator),
fill-in the fields and hit _Generate Statement_. Copy the generated statement
and serve it from your domain, from the URL `/.well-known/assetlinks.json`.

Note: The `AssetLinks` file must be under `/.well-known/assetlinks.json`, at the
root of the domain, as that's only the place Chrome will look for it.

### Creating an Icon {: #create-icon}

When Android Studio creates a new project, it will come with a default Icon.
As a developer, you will want to create your own icon and differentiate your
application from others on the Android Launcher.

Android Studio contains the [Image Asset Studio](https://developer.android.com/studio/write/image-asset-studio),
which provides the tools necessary to create the correct icons, for every
resolution and shape your application needs.

Inside Android Studio, navigate to `File > New > Image Asset`, select
`Launcher Icons (Adaptative and Legacy)` and follow the steps from the Wizard.
to create a custom icon for the application.

### Generating a signed APK {: #create-signed-apk }

With the `assetlinks` file in place in your domain and the `asset_statements` tag
configured in the Android application, the next step is generating a signed app.
Again, the steps for this are widely
[documented](https://developer.android.com/studio/publish/app-signing#sign-apk).

The output APK can be installed into a test device, using adb:

<pre class="devsite-terminal devsite-click-to-copy">
adb install app-release.apk
</pre>

If the verification step fails it is possible to check for error
messages using the Android Debug Bridge, from your OS’s terminal and with the
test device connected.

<pre class="devsite-terminal devsite-click-to-copy">
adb logcat | grep -e OriginVerifier -e digital_asset_links
</pre>

With the upload APK generated, you can now [upload the app to the Play
Store](https://developer.android.com/studio/publish/upload-bundle).

## Adding a Splash Screen {: #making-a-splash }

Starting on **Chrome 75**, Trusted Web Activities have support for Splash Screens.
The Splash Screen can be set up by adding a few new image files and configurations to the
project.

Make sure to update to **Chrome 75 or above** and use the
[latest version of Trusted Web Activity Support Library](https://jitpack.io/#GoogleChrome/custom-tabs-client).

### Generating the images for the Splash Screen {: #create-images }

Android devices can have different [screen sizes](https://developer.android.com/training/multiscreen/screensizes)
and [pixel densities](https://developer.android.com/training/multiscreen/screendensities).
To ensure the Splash Screen looks good on all devices, you will need to generate
the image for each pixel density.

A full explanation of [display-independent pixels (dp or dip)](https://developer.android.com/training/multiscreen/screendensities#TaskUseDP)
is beyond the scope of this article, but one example would be to create an image that
is 320x320dp, which represents a square of 2x2 inches on a device screen of any density
and is equivalent to 320x320 **pixels** at the *mdpi* density.

From there we can derive the sizes needed for other pixel densities. Below is a list
with the pixel densities, the multiplier applied to the base size (320x320dp), the
resulting size in pixels and the location where the image should be added in the
Android Studio project.

| Density          | Multiplier | Size         | Project Location       |
|------------------|------------|--------------|------------------------|
| mdpi (baseline)  | 1.0x       | 320x320 px   | /res/drawable-mdpi/    |
| ldpi             | 0.75x      | 240x240 px   | /res/drawable-ldpi/    |
| hdpi             | 1.5x       | 480x480 px   | /res/drawable-hdpi/    |
| xhdpi            | 2.0x       | 640x640 px   | /res/drawable-xhdpi/   |
| xxhdpi           | 3.0x       | 960x960 px   | /res/drawable-xxhdpi/  |
| xxxhdpi          | 4.0x       | 1280x1280 px | /res/drawable-xxxhdpi/ |

Note: An alternative to creating all the images sizes is to use one [Vector Drawable](https://developer.android.com/reference/android/graphics/drawable/VectorDrawable).
The [Vector Asset Studio](https://developer.android.com/studio/write/vector-asset-studio)
offers tools to help developers to transform SVGs into Android Vector Drawables.

### Updating the application {: #add-splash-markup }

With the images for the splash screen generated, it's time to add the necessary
configurations to the project.

First, add a [content-provider](https://developer.android.com/guide/topics/providers/content-provider-basics)
to the Android Manifest (`AndroidManifest.xml`).

```xml
<application>
    ...
    <provider
        android:name="androidx.core.content.FileProvider"
        android:authorities="com.example.twa.myapplication.fileprovider"
        android:grantUriPermissions="true"
        android:exported="false">
        <meta-data
            android:name="android.support.FILE_PROVIDER_PATHS"
            android:resource="@xml/filepaths" />
    </provider>
</application>
```

Note: Make sure to change the `android:authorities` attribute when creating the provider,
as two applications cannot have the same authority on a device.

Then, add `res/xml/filepaths.xml` resource, and specify the path to the twa splash screen:

```xml
<paths>
    <files-path path="twa_splash/" name="twa_splash" />
</paths>
```

Finally, add `meta-tags` to the Android Manifest to customize the LauncherActivity:

```xml
<activity android:name="com.google.androidbrowserhelper.trusted.LauncherActivity">
    ...
    <meta-data android:name="android.support.customtabs.trusted.SPLASH_IMAGE_DRAWABLE"
               android:resource="@drawable/splash"/>
    <meta-data android:name="android.support.customtabs.trusted.SPLASH_SCREEN_BACKGROUND_COLOR"
               android:resource="@color/colorPrimary"/>
    <meta-data android:name="android.support.customtabs.trusted.SPLASH_SCREEN_FADE_OUT_DURATION"
               android:value="300"/>
    <meta-data android:name="android.support.customtabs.trusted.FILE_PROVIDER_AUTHORITY"
               android:value="com.example.twa.myapplication.fileprovider"/>
    ...
</activity>
```

Ensure that the value of the `android.support.customtabs.trusted.FILE_PROVIDER_AUTHORITY`
tag matches the value defined of the `android:authorities` attribute inside the
`provider` tag.

### Making the LauncherActivity transparent {: #transparent-launcher }

Additionally, make sure the LauncherActivity is transparent to avoid a white screen
showing before the splash.

Add a new theme to `res/styles.xml`:

```xml
<style name="Theme.LauncherActivity" parent="Theme.AppCompat.NoActionBar">
     <item name="android:windowAnimationStyle">@null</item>
     <item name="android:windowIsTranslucent">true</item>
     <item name="android:windowNoTitle">true</item>
     <item name="android:windowBackground">@android:color/transparent</item>
     <item name="android:backgroundDimEnabled">false</item>
 </style>
```

Then, add a reference to the new style in the Android Manifest:

```xml
<application>
    ...
    <activity android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
              android:theme="@style/Theme.LauncherActivity">
    ...
    </activity>
</application>
```

We are looking forward to see what developers build with Trusted Web
Activities. To drop any feedback, reach out to us at
[@ChromiumDev](https://twitter.com/ChromiumDev).

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}