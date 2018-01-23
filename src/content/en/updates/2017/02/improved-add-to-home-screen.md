project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Progressive Web Apps are becoming more integrated with your device. Learn how.

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on: 2017-02-02 #}
{# wf_tags: addtohomescreen,progressive-web-apps,chrome57 #}
{# wf_featured_image: /web/updates/images/generic/devices.png #}
{# wf_featured_snippet: Progressive Web Apps are becoming more integrated with your device. Learn how. #}

# The New and Improved Add to Home screen {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Chrome first introduced the ["Add to Home screen"
banners](/web/fundamentals/app-install-banners) in [Chrome
42](https://blog.chromium.org/2015/03/chrome-42-beta-push-notifications_12.html).
This was a big step for the web as it provided users the ability to easily keep
a favorite site on their home screen, much like native apps. We've heard from
developers like [Alibaba that users re-engage 4 times more
often](/web/showcase/2016/alibaba) with their site added to home screen. We've
also seen that tuning the heuristics for add to home screen to prompt sooner
yields to 48% more installs.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="xkme8WFyoXw"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

We are happy to share that the team has worked on an improved add to home screen
experience that makes web apps first-class citizens of Android. Instead of
simply being a shortcut icon, web apps will now be integrated with Android. This
means that users that add a PWA to their home screen will be able to find it
anywhere they see other apps (e.g. in the app drawer or searching for apps), and
open the site from intents. We see this as the first step among a number of
improvements to come and intend to make it the default experience for add to
home screen in the coming months.


The improved add to home screen experience is already available in Chrome Canary
and will be rolling out to Chrome 57 beta over the next few weeks.

Note: it has been rolled to all users on Chrome's stable channel as of Chrome
59.

To test your site, visit your PWA. You can start install from the three dot menu
&gt; "Add to Home screen" or through the add to home screen banner.

This new experience is a huge improvement over the original version of add to
home screen, but there are some differences between these installed Progressive
Web Apps and Android Apps.

## Updating your app's icon and name

You now have the ability to update your Progressive Web App's icon and name and
have it reflected to the user. Changing your icon or name in the manifest will
update the icon on the home screen after the user has subsequently opened the
site.

## Android Intent Filters

When a Progressive Web App is installed via this new improved add to home screen
experience it will be registered with the system to be a target for the URL
space for its domain. This means that the when a user clicks on a link that is
contained within the scope of your Progressive Web App, your app will be opened
instead of Chrome opening with your PWA running.

When you install a Progressive Web App, we look at your Web App Manifest and
other meta-data and create an [APK](https://chromium.googlesource.com/chromium/src/+/master/chrome/android/webapk/README)
(Android Package Kit) that is installed on to the user's device, which may take
a short moment the first time any user installs your Web App.

Note: Whenever the Web App Manifest changes we need to genearate a new APK, it
is thus *not* a good idea to have frequently updating manifests. It is 
especially important to ensure that you don't use user specific identifiers 
in the manifest (such as a custom `start_url` per user) as this generate an
unique APK which means that your install time will be a lot longer than you 
expect.

In that APK we define an [Android Intent
Filter](https://developer.android.com/guide/components/intents-filters.html)
that defines when your web application should be opened. For example, to open
the [https://airhorner.com](https://airhorner.com/) app whenever that link is
clicked, Chrome would create the following `<intent-filter>`.

    <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data
        android:scheme="https"
        android:host="airhorner.com"
        android:pathPrefix="/" />
    </intent-filter>

This is incredibly powerful, but not very flexible. This `<intent-filter>`
simply says when a link that is clicked or intercepted in Android for the entire
domain of `https://airhorner.com/` open the App.

But what if you don't want your PWA to open for all paths on your domain? That
is where the `scope` [web app
manifest](https://www.w3.org/TR/appmanifest/#scope-member) property comes in to
play. The `scope` is a string that defines the URL path that encompasses your
web app. It tells the Android system to only open your web app if the URL being
navigated to matches the `origin` + `scope` (essentially it alters the
`android:pathPrefix` attribute in the APK's `AndroidManifest.xml`.) For example,
a `scope` of `/paul/` on `https://airhorner.com` would only launch AirHorner if
the URL was `https://airhorner.com/paul/`.

Note: directly navigating to your site from the address bar will work exactly 
the same as it does for native apps that have an intent filter, Chrome assumes 
that the user intended to visit the site and will open the site.

A specific example is that of a large web site that has many different content
sections (/tech-news/ , /celebs/, /business/) and the they would like to have a
PWA just for their '/tech-news/' section. The site would set the scope to be
`scope: '/tech-news/',` in the manifest to ensure that only links to that part
of the site open the Progressive Web App.

If you were to define a `scope` in your Web App Manifest, you would see an
updated `pathPrefix` in the `<intent-filter>` in your apps
`AndroidManifest.xml`.

    <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data
        android:scheme="https"
        android:host="kinlansnewssite.com"
        android:pathPrefix="/tech-news/" />
    </intent-filter>

Note: The `scope` in the Web App Manifest, is not the same as the `scope` of
your Service Worker. It is possible for one installed Web Application to be
controlled by several different Service Workers.

## Navigating outside of your progressive web app

It is important for users to feel like they are using an app-like experience
when using your progressive web app. This means that we need to handle
navigations sensitively. If the user navigates to another origin then your
progressive web app should not act like a container. Instead, a new context will
be opened for the user.

The `scope` attribute also is used to define the reach of your web application
within the origin and is different to the `scope` property of your service
worker. Any navigation to a url inside your origin, but outside the scope will
cause a new web context to be opened for the user. This allows you to have
multiple progressive web apps per origin.

## Effectively managing your app's scope

The `scope` attribute in your web app manifest is one of the most important
things that you will need to do to ensure your app functions as expected.

The `scope` controls the url structure that encompasses all the entry and exit
points in your web app. Your `start_url` needs to reside in the your `scope`.

Here are some simple rules:

* If you don't include a `scope` in your manifest, then the default implied
  `scope` is the directory that your web app manifest resides in.
* The `scope` attr can be "../" or any higher level path ('/' origin) which
  would allow for an increase in coverage of navigations in your web app.
* The `start_url` must be in the scope.
* The `start_url` is relative to the path defined in the `scope` attribute.
* A `start_url` starting with '/' will always be the root of the origin.

Some examples:

|  `manifest url` | `start_url` | `scope attr` | `calculated scope` | `calculated start_url` | `valid?` |
|  ------ | ------ | ------ | ------ | ------ | ------ |
|  /tech-today/manifest.json | ./index.html | undefined | /tech-today/ | /tech-today/index.html | valid |
|  /tech-today/manifest.json | ./index.html | ../ | / | /index.html | valid - but scope leaks to higher level |
|  /tech-today/manifest.json | / | / | / | /index.html | valid - but scope leaks to higher level |
|  /tech-today/manifest.json | / | undefined | /tech-today/ | / | invalid - start url out of scope |
|  /tech-today/manifest.json | ./tech-today/index.html | undefined | /tech-today/ | /tech-today/tech-today/index.html | valid - but undesired |
|  /manifest.json | ./tech-today/index.html | undefined | / | /tech-today/index.html | valid - broad scope |
|  /manifest.json | /tech-today/index.html | tech-today | /tech-today/ | /tech-today/index.html | valid - tight scope |

Note: The `scope` attribute is still being specified and implemented in Chrome.

## Managing permissions

By Installing your Progressive Web App it now becomes part of the system. Added
sites show up on the home screen, app drawer and throughout the Android
System UI as a user would expect. Permissions are handled differently, by
default your app can only have the same permissions surface as Chrome would
normally have when installed - you can't ask for camera access at install time
for example. This means that as developer you must request permission for
sensitive API's such as camera and microphone access, notifications etc. at
runtime as you would for any normal web site and the Chrome runtime will prompt
you for access.

Android normally grants immediate access to notifications. Installed Progressive
Web Apps do not have access to the notifications permission granted unless the
user has explicitly opted to receiving notifications.

## Storage and app state

When the user adds your Progressive Web App to their system Chrome will use the
same profile and will not segregate the data. This means your service worker
will already be installed, your cookies are still active and any client-side
storage will be still stored the next time that the user opens the App.

This can cause some issues because if the user clears the Chrome profile, then
your data in your app will also be cleared. To ensure that your user data is
held more permanently, please use the [Persistent Storage
API](/web/updates/2016/06/persistent-storage).

Please let us know if you have any feedback or questions. If you encounter a
bug, you can file it on the Chromium bug tracker
[here](https://bugs.chromium.org/p/chromium/issues/entry?components=Mobile%3EWebAPKs&labels=OS-Android,Type-Bug,Pri-2,Source-devpreview-feedback&cc=sbirch@google.com&comment=Android%20version%3A%0AChrome%20version%3A%20%0A%0ASite%3A%20%0A%0ASteps%20to%20reproduce%3A%0A(1)%0A(2)%0A(3)%0A%0AExpected%20result%3A%0A%0A%0AActual%20result%3A%0A).
Please also take a look at **FAQs below** that aim to answer any additional
questions you might have.

- - -

## FAQs 
### What are the requirements for a site to use improved add to Home screen?

The requirements are designed to be the same as the [technical requirements for
the add to home screen
banner](/web/fundamentals/app-install-banners).

We recommend using [Lighthouse](/web/tools/lighthouse/) to audit your PWA.

Note: There is no engagement threshold for improved add to home screen from the
menu. It is only used to determine when to prompt users to install directly.

### Does this change the triggering of the add to Home screen banner?

Improved add to home screen does not itself change the triggering or behavior of 
the banner. Nevertheless, Chrome has recently lowered the site-engagement 
threshold for the banner to trigger and is constantly experimenting with 
improvements to this system. (See [the 
keynote](https://www.youtube.com/watch?v=eI3B6x0fw9s#t=18m54s) from Chrome Dev 
Summit.)

### What happens to users who have already added a site to their Home screen?

Users will continue to get the existing add to home screen experience, though if 
they add it again manually via the menu button, the new icon will use improved 
add to home screen.

### What will happen to the current add to Home screen experience?

Improved add to home screen will replace add to home screen for PWAs. There is 
no change to the existing functionality of add to home screen for non-PWAs. 

### What happens if the user has already installed the native app for the site?

Like add to home screen today, users will be able to add a site independent of 
any native apps. If you expect users to potentially install both, we recommend 
differentiating the icon or name of your site from your native app.

### When a user opens a site installed via improved add to Home screen, will Chrome be running?

Yes, once the site is opened from the home screen the primary activity is still 
Chrome. Cookies, permissions, and all other browser state will be shared.

### Will my installed site's storage be cleared if the user clears Chrome's cache?

Yes.

### Will my app be re-installed when I get a new device?

Not at this time, but we think it is an important area and we are investigating
ways to make it work.

### Will I get auto granted Push Notifications permissions like I do in Android?

No, but we intend to experiment with this at a later date. (See [the 
keynote](https://www.youtube.com/watch?v=eI3B6x0fw9s#t=18m54s) from Chrome Dev 
Summit.)

### Will I be able to register to handle custom URL schemes and protocols?

No.

### Will I be able to register to open files of a specific type (i.e, PDF)?

No, but we are exploring that independently with the [Web Share Target
API](https://discourse.wicg.io/t/web-share-target-api-for-websites-to-receive-shared-content/1854).

### How are permissions handled? Will I see the Chrome prompt or Android's?

Permissions will still be managed through Chrome. Users will see the Chrome 
prompts to grant permissions and will be able to edit them in Chrome settings.

### What versions of Android will this work on?

Progressive web apps can be installed on all versions of Android that run Chrome
for Android, specifically Jelly Bean and above.

### Does this use the WebView?

No, the site opens in the version of Chrome the user added the site from.

### If I update my site's service worker, will this update automatically in the background even without the user visiting the site?

No. The update to the service worker will be processed the next time that the
user visits the page.

### Can we upload the APKs that are created to the Play Store?

No. There is no key signing information supplied to enable you to create your
own PWA that can be in the store.

### Are these listed in the Play Store?

No.

### I am developer of another browser on Android, can I have this seamless install process?

We are working on it. We are committed to making this available to all browsers
on Android and we will have more details soon.

{% include "comment-widget.html" %}
