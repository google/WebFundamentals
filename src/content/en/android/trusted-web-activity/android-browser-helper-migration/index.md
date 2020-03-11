project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: Introduces android-browser-helper, a new library to build Trusted Web Activities.

{# wf_published_on: 2020-01-10 #}
{# wf_updated_on: 2020-03-06 #}
{# wf_tags: trusted-web-activity #}
{# wf_featured_image: /web/updates/images/generic/devices.png #}
{# wf_blink_components: N/A #}

# Introducing android-browser-helper, a library for building Trusted Web Activities {: .page-title }

{% include "web/_shared/contributors/andreban.html" %}

We have released version [1.0.0][9] of, [android-browser-helper][1], a new Android Library for
[Trusted Web Activity][8] which, besides being built on top of the modern
[Android JetPack][2] libraries, makes it easier for developers to use Trusted Web Activity to build
their Android applications.

**android-browser-helper is now the recommended library to build applications that use Trusted Web
Activity.**

The library is hosted on the official [Google Maven repository][11], which works out of the box in
Android Projects, and is also compatible with AndroidX, which was a common [issue][12] with the
previous library.

More features and development experience improvements will be added this library. This is a short
list of what has already been added:

 - Handles opening the content in a browser that supports Trusted Web Activities and, if one is not
installed, implements a fallback strategy.
 - Makes the fallback strategy customizable, so developers can customize how their application
 behaves when a browser the supports Trusted Web Activities is not installed. The
 [twa-webview-fallback][3] demo shows how to use a fallback strategy that uses the
 [Android WebView][6], for example.
 - Makes configuring Trusted Web Actitivities that work with multiple origins easier, as
 illustrated on the twa-multi-domain][4] demo.

The library can be added to Android application by using the following dependency to the
appllication `build.gradle`:

```gradle
dependencies {
    //...
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:1.0.0'
}
```

## Migrating from the custom-tabs-client
Developers who were using the previous [`custom-tabs-client`][5] will have to implement a few
changes in their application, when migrating to `android-browser-helper`.

Fortunately, besides replacing using the old library with the new library, those changes mainly
involve changing searching and replacing a few strings throughout `AndroidManifest.xml`. 

Here’s a summary of the names changed:

| Name on custom-tabs-client (Old Library)                     | Name on android-browser-helper (New Library)              |
|--------------------------------------------------------------|-----------------------------------------------------------|
| android.support.customtabs.trusted.LauncherActivity          | com.google.androidbrowserhelper.trusted.LauncherActivity  |
| android.support.v4.content.FileProvider                      | androidx.core.content.FileProvider                        |
| android.support.customtabs.trusted.TrustedWebActivityService | com.google.androidbrowserhelper.trusted.DelegationService |

The [svgomg-twa demo][10] has been updated to use android-browser-helper. this [diff][7] shows all
the changes required when migrating an existing project using `custom-tabs-client` to
`android-browser-helper`.

## Are we missing anything?

android-browser-helper has the goal of simplifying the development of applications using Trusted
Web Activities. The library will continue to evolve as Trusted Web Activity get more features.

If you are missing a feature in Trusted Web Activities, think of ways that
android-browser-helper could make make the development work simpler, or have a question on how to
use the library, make sure to pop by the [GitHub repository][1] and file an [issue][13].

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[1]: https://github.com/GoogleChrome/android-browser-helper
[2]: https://developer.android.com/jetpack/
[3]: https://github.com/GoogleChrome/android-browser-helper/tree/master/demos/twa-webview-fallback
[4]: https://github.com/GoogleChrome/android-browser-helper/tree/master/demos/twa-multi-domain
[5]: https://jitpack.io/#GoogleChrome/custom-tabs-client
[6]: https://developer.android.com/guide/webapps/webview
[7]: https://github.com/GoogleChromeLabs/svgomg-twa/pull/76/files
[8]: https://developers.google.com/web/updates/2019/02/using-twa
[9]: https://github.com/GoogleChrome/android-browser-helper/releases/tag/1.0.0
[10]: https://github.com/GoogleChromeLabs/svgomg-twa
[11]: https://maven.google.com/
[12]: https://bugs.chromium.org/p/chromium/issues/detail?id=983378#c4
[13]: https://github.com/GoogleChrome/android-browser-helper/issues
