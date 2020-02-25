project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: When the user adds your Progressive Web App to their home screen on Android, Chrome automatically generates an APK for you, which we sometimes call a WebAPK. Being installed via an APK makes it possible for your app to show up in the app launcher, in Android's app settings and to register a set of intent filters.

{# wf_updated_on: 2020-02-21 #}
{# wf_published_on: 2017-05-21 #}
{# wf_blink_components: Mobile>WebAPKs #}
{# wf_previous_url: /web/updates/2017/02/improved-add-to-home-screen #}

# WebAPKs on Android {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

_This article contains contributions from Jeff Posnick and
[Peter Kotwicz](https://groups.google.com/a/chromium.org/forum/#!msg/chromium-discuss/NUjaM4QtFrU/gTJ1kSONBAAJ)_.

[Installing a PWA](https://web.dev/progressive-web-apps/) on Android does
more than just add the Progressive Web App to the user's Home Screen. Chrome
automatically generates and installs a special APK of your app. We sometimes
refer to this as a **WebAPK**. Being installed via an APK makes it possible
for your app to show up in the app launcher, in Android's app settings and
to register a set of intent filters.

To
[generate the WebAPK](https://chromium.googlesource.com/chromium/src/+/master/chrome/android/webapk/README),
Chrome looks at the [web app manifest](https://web.dev/add-manifest/) and
other metadata. [When an update to the manifest is detected](#update-webapk),
Chrome will need to generate a new APK.

Note: Since the WebAPK is regenerated each time an updated manifest is detected,
we recommend changing it only when necessary. Don't use the manifest to store
user specific identifiers, or other other data that might be customized.
Frequently changing the manifest will increase the overall install time.

## Android intent filters

When a Progressive Web App is installed on Android, it will register a set of
[intent filters](https://developer.android.com/guide/components/intents-filters)
for all URLs within the scope of the app. When a user clicks on a link that
is within the scope of the app, the app will be opened, rather than opening
within a browser tab.

Consider the following partial `manifest.json`:

```text
"start_url": "/",
"display": "standalone",
```

When a web app using it is launched from the app launcher, it would open
`https://example.com/` as a standalone app, without any browser chrome.

The WebAPK would include the following intent filters:

```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data
    android:scheme="https"
    android:host="example.com"
    android:pathPrefix="/" />
</intent-filter>
```

If the user clicks on a link within an installed app to
`https://example.com/read`, it would be caught by the intent and opened
in the Progressive Web App.

Note: Navigating directly to `https://example.com/app/` from the address bar in
Chrome will work exactly the same as it does for native apps that have an
intent filter. Chrome assumes the user <b>intended</b> to visit the site and
will open this site.

### Using `scope` to restrict intent filters

If you don't want your Progressive Web App to handle all URLs within your site,
you can add the [`scope`](/web/fundamentals/web-app-manifest/#scope) property to
your web app manifest. The `scope` property tells Android to only open your web
app if the URL matches the `origin` + `scope`. It gives you control over which
URLs will be handled by your app, and which should be opened in the browser.
This is helpful when you have your app and other non-app content on the same
domain.

Consider the following partial `manifest.json`:

```text
"scope": "/app/",
"start_url": "/app/",
"display": "standalone",
```

When launched from the app launcher, it would open `https://example.com/app/`
as a standalone app, without any browser chrome.

Like before, the generated WebAPK would include an intent filter, but with a
different `android:pathPrefix` attribute in the APK's `AndroidManifest.xml`:

```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data
    android:scheme="https"
    android:host="example.com"
    android:pathPrefix="/app/" />
</intent-filter>
```

Let's take a look at a few examples:<br>
<span class="compare-yes"></span> `https://example.com/app/` - within `/app/`<br>
<span class="compare-yes"></span> `https://example.com/app/read/book` - within `/app/`<br>
<span class="compare-no"></span> `https://example.com/help/` - not in `/app/`<br>
<span class="compare-no"></span> `https://example.com/about/` - not in `/app/`

See [`scope`](https://web.dev/add-manifest/#scope) for more information about
`scope`, what happens when you don't set it, and how you can use it to define
the scope of your app.

## Managing permissions

Permissions work in the same way as other web apps and cannot be requested at
install time. Instead, they must be requested at run time, ideally only when
you really need them. For example, don't ask for camera permission on first
load, but instead wait until the user attempts to take a picture.

Note: Android normally grants immediate permission to show notifications for
installed apps, but apps installed via WebAPKs are not granted this at install
time; you must request it at runtime within your app.

## Managing storage and app state

Even though the progressive web app is installed via an APK, Chrome uses the
current profile to store any data, and it will not be segregated away. This
allows a shared experience between the browser and the installed app. Cookies
are shared and active, any client side storage is accessible and the service
worker is installed and ready to go.

Note: Keep in mind that if the user clears their Chrome profile, or chooses
to delete site data, that will apply to the WebAPK as well.

## Updating the WebAPK {: #update-webapk }

Chrome will periodically compare the locally installed manifest against a copy
of the manifest fetched from the network. If any of the properties in the
manifest required to add the PWA to the home screen have changed in the network
copy, Chrome will request an updated WebAPK, reflecting those new values.

There are a number of rules that govern how these update checks are triggered:

- Update checks only happen when a WebAPK is launched. Launching Chrome directly
  will not a trigger an update check for a given WebAPK.
- Chrome checks for updates either every 1 day or every 30 days. Checking for
  updates every day happens the large majority of the time. It switches to
  the 30 day interval in unlikely cases where the update server cannot provide
  an update.
- Clearing Chrome's data (via "CLEAR ALL DATA" in Android settings) resets the update timer.
- Chrome will only update a WebAPK if the Web Manifest URL does not change. If
  you change the web page from referencing `/manifest.json` to
  reference `/manifest2.json`, the WebAPK will no longer update.
  (Don't do this!)
- Chrome will only update a WebAPK if the WebAPK is not running. Moving the
  WebAPK to the background is not sufficient if it keeps running.
- Only WebAPKs created by an official version of Chrome (Stable/Beta/Dev/Canary)
  will be updated. It does not work with Chromium (`org.chromium.chrome`).
- The update check may be delayed until the device is plugged in and has a WiFi
  connection.

Note: The update interval was reduced to 1 day (from 3 days) in Chrome 76.
For behavior in Chrome 75 and earlier, refer to
[Updating WebAPKs More Frequently][webapk-update-cr75].

For Chrome 76 (July 2019) and later, here's a hypothetical example of how
WebAPK update scheduling works over time:

- **January 1**: Install WebAPK
- **January 1**: Launch WebAPK → No update check (0 days have passed)
- **January 2**: Launch WebAPK → Check whether update is needed (1 day has passed)
- **January 4**: Launch Chrome → No update check (Launching Chrome has no effect)
- **January 4**: Launch WebAPK → Check whether update is needed (1+ days have passed)
- **January 6**: Clear Chrome's data in Android settings
- **January 9**: Launch WebAPK → No update check (From Chrome's perspective this
  is the first WebAPK launch)
- **January 10**: Launch WebAPK → Check whether update is needed (1 day has passed)

See the
[`UpdateReason`](https://cs.chromium.org/chromium/src/chrome/browser/android/webapk/webapk.proto?l=35)
enum in `message WebApk` for the reasons a WebAPK may be updated.

Icons may be [cached](/web/fundamentals/performance/optimizing-content-efficiency/http-caching),
so it may be helpful to change the filenames when updating icons or other
graphics.

[webapk-update-cr75]: /web/updates/2019/06/webapk-update-frequency#chrome_75_and_earlier

## Frequently asked questions

<dl>
  <dt>
    What icons are used to generate the splash screen?
  </dt>
  <dd>
    We recommend you provide at least two icons:
    <a href="/web/fundamentals/web-app-manifest/#splash-screen">
    192px and 512px</a> for the splash screen.
    <br><br>We heard from you that icons
    on the splash screen were too small. WebAPKs generated in Chrome 71 or later
    will show a larger icon on the splash screen. No action is required, as
    long as the recommended icons are provided.
  </dd>

  <dt>
    What happens if the user has already installed the native app for the site?
  </dt>
  <dd>
    Like add to home screen today, users will be able to add a site independent
    of any native apps. If you expect users to potentially install both, we
    recommend differentiating the icon or name of your site from your native
    app.
  </dd>

  <dt>
    When a user opens a site installed via improved add to Home screen, will
    Chrome be running?
  </dt>
  <dd>
    Yes, once the site is opened from the home screen the primary activity is
    still Chrome. Cookies, permissions, and all other browser state will be
    shared.
  </dd>

  <dt>
    Will my installed site's storage be cleared if the user clears Chrome's
    cache?
  </dt>
  <dd>Yes.</dd>

  <dt>
    Will my app be re-installed when I get a new device?
  </dt>
  <dd>
    Not at this time, but we think it is an important area and we are
    investigating ways to make it work.
  </dd>

  <dt>
    Will I be able to register to handle custom URL schemes and protocols?
  </dt>
  <dd>No.</dd>

  <dt>
    How are permissions handled? Will I see the Chrome prompt or Android's?
  </dt>
  <dd>
    Permissions will still be managed through Chrome. Users will see the Chrome
    prompts to grant permissions and will be able to edit them in Chrome
    settings.
  </dd>

  <dt>
    What versions of Android will this work on?
  </dt>
  <dd>
    Progressive web apps can be installed on all versions of Android that
    run Chrome for Android, specifically Jelly Bean and above.
  </dd>

  <dt>
    Does this use the WebView?
  </dt>
  <dd>
    No, the site opens in the version of Chrome the user added the site from.
  </dd>

  <dt>
    Can we upload the APKs that are created to the Play Store?
  </dt>
  <dd>
    No. There is no key signing information supplied to enable you to create
    your own PWA that can be in the store.
  </dd>

  <dt>
    Are these listed in the Play Store?
  </dt>
  <dd>No.</dd>

  <dt>
    I am a developer of another browser on Android, can I have this seamless
    install process?
  </dt>
  <dd>
    We are working on it. We are committed to making this available to all
    browsers on Android and we will have more details soon.
  </dd>

</dl>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
