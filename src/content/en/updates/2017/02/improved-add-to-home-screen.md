project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Progressive Web Apps are becoming more integrated with your device. Learn how.

{# wf_updated_on: 2017-02-02 #}
{# wf_published_on: 2017-02-02 #}
{# wf_tags: addtohomescreen,progressive-web-apps,chrome57 #}
{# wf_featured_image: /web/updates/images/generic/devices.png #}
{# wf_featured_snippet: Progressive Web Apps are becoming more integrated with your device. Learn how. #}

# The New and Improved Add to Home screen {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Chrome first introduced the ["Add to Home screen"
banners](/web/fundamentals/engage-and-retain/app-install-banners/) in Chrome 51.
This was a big step for the web as it provided users the ability to easily keep
a favorite site on their Home screen, much like native apps. We've heard from
developers like [Alibaba that users re-engage 4 times more
often](/web/showcase/2016/alibaba) with their site added to Home screen. We've
also seen that tuning the heuristics for add to Home screen to prompt sooner
yields to 48% more installs.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="xkme8WFyoXw"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

We are happy to share that the team has worked on an improved add to Home 
screen experience that makes web apps first-class citizens of Android. 
Instead of simply being a shortcut icon, web apps will now be integrated with 
Android. This means that users that add a PWA to their Home screen will be able 
to find it anywhere they see other apps (e.g. in the app drawer or searching for 
apps), and open the site from intents. We see this as the first step among a 
number of improvements to come and intend to make it the default experience for 
add to Home screen in the coming months.


The improved add to Home screen experience is already available in Chrome Canary 
and will be rolling out to Chrome 57 beta over the next few weeks.

**You can test your site by following these steps:**

1. Install the latest [Chrome
   Dev](https://play.google.com/store/apps/details?id=com.chrome.dev) or [Chrome
   Beta](https://play.google.com/store/apps/details?id=com.chrome.beta) from the
   Play Store if you don't have it already.
1. Enable improved add to Home screen. These steps are only needed during the 
   developer preview.
    1. Open chrome://flags in Chrome dev and enable the flag 
       `#enable-improved-a2hs` ("Find in page" in the triple-dot menu is helpful 
       for finding it.) You'll be prompted to restart Chrome.
    1. Once Chrome is restarted, you'll be prompted to go to settings to turn on 
       "Unknown sources" if it's not enabled already. (In general you shouldn't 
       have this enabled, so we recommend disabling it when you're done 
       testing.) If you don't see the prompt you can find it in Android Settings 
       &gt; Security &gt; Device Administration.
1. Visit your PWA. You can start install from the three dot menu &gt; "Add to 
   Home screen" or through the Add to Home screen banner.
    1. In the developer preview you'll additionally see a prompt from the 
       package installer to confirm.

This new experience is a huge improvement over the original version of Add to
Home screen, but there are some differences between these installed Progressive
Web Apps and Android Apps.

## Updating your App's icon and name

You now have the ability to update your Progressive Web App's icon and name and 
have it reflected to the user. Changing your icon or name in the manifest will 
update the icon on the Home screen after the user has subsequently opened the 
site.

## Android Intent Filters

When a Progressive Web App is installed via this new Improved Add to Home screen
experience it will be registered with the system to be a target for the URL
space for its domain. This means that the when a user clicks on a link that is
contained within the scope of your Progressive Web App, your app will be opened
instead of Chrome openning with your PWA running.

When you install a Progressive Web App, we look at your Web App Manifest and
other meta-data and create the APK that is installed on to the user's device. In
that APK we define an [Android Intent
Filter](https://developer.android.com/guide/components/intents-filters.html)
that defines when your web application should be opened. For example, to
open the [https://airhorner.com](https://airhorner.com/) app whenever that link
is clicked, Chrome would create the following `<intent-filter>`.

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
is where the `scope` [Web App
manifest](https://www.w3.org/TR/appmanifest/#scope-member) property comes in to
play. The `scope` defines a sub path (essentially it alters the
`android:pathPrefix` attribute in the APK's `AndroidManifest.xml`) defaults to
the origin. You can set it to an path that is relative to your origin and
subsequently when a user navigates to a URL contained by the scope your
installed Progressive Web App will be open.

Note: directly navigating to your site from the address bar will work exactly 
the same as it does for native apps that have an intent filter, Chrome assumes 
that the user intended to visit the site and will open the site.

A specific example, is that of a large web site, that has many different content
sections (/tech-news/ , /celebs/, /business/) and the they would like to have a
PWA just for their '/tech-news/' section, they would set the scope to be `scope:
'/tech-news/',` in the manifest to ensure that only links to that part of the
site open up the Progressive Web App.

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

## Navigating outside of my Progresive Web App

When 

## Managing Permissions

By Installing your Progressive Web App it now becomes part of the system. Added 
sites show up on the Home screen, app drawer and throughout the Android 
System-UI as a user would expect. Permissions are handled differently, by 
default your app can only have the same permissions surface as Chrome would 
normally have when installed - you can't ask for Camera access at install time 
for example. This means that as developer you must request permission for 
sensitive API's such as Camera and Microphone access, notifications etc at 
runtime as you would for any normal web site and the Chrome runtime will prompt 
you for access.

Android normally gives instant access notifications, Installed Progressive Web 
Apps do not have this permission granted by default and your user must 
explicitly opt-in to receiving notifications

## Storage and App State

When the user adds your Progressive Web App to their system Chrome will use the 
same profile and will not segregate the data. This means your service worker 
will already be installed, your cookies still active any client-side storage 
will be still stored the next time that the user opens the App.

This can cause some issues because if the user clears the Chrome profile, then 
your data in your app will also be cleared. To ensure that your user data is 
held more permanently, please use the [Persistent 
Storage API](/web/updates/2016/06/persistent-storage).

Please let us know if you have any feedback or questions. If you encounter a 
bug, you can file it on the Chromium bug tracker 
[here](https://bugs.chromium.org/p/chromium/issues/entry?components=Mobile%3EWebAPKs&labels=OS-Android,Type-Bug,Pri-2,Source-devpreview-feedback&cc=sbirch@google.com&comment=Android%20version%3A%0AChrome%20version%3A%20%0A%0ASite%3A%20%0A%0ASteps%20to%20reproduce%3A%0A(1)%0A(2)%0A(3)%0A%0AExpected%20result%3A%0A%0A%0AActual%20result%3A%0A). 
Please also take a look at **FAQs below** that aim to answer any additional 
questions you might have.

- - -

## FAQs 
### What are the requirements for a site to use improved add to Home screen?

The requirements are designed to be the same as the [technical requirements for
the add to Home screen
banner](/web/fundamentals/engage-and-retain/app-install-banners/).

We recommend using [Lighthouse](/web/tools/lighthouse/) to audit your PWA.

Note though that there is no engagement threshold for improved add to Home 
screen from the menu.

### Does this change the triggering of the add to Home screen banner?

Improved add to Home screen does not itself change the triggering or behavior of 
the banner. Nevertheless, Chrome has recently lowered the site-engagement 
threshold for the banner to trigger and is constantly experimenting with 
improvements to this system. (See [the 
keynote](https://www.youtube.com/watch?v=eI3B6x0fw9s#t=18m54s) from Chrome Dev 
Summit.)

### What happens to users who have already added a site to their Home screen?

Users will continue to get the existing add to Home screen experience, though if 
they add it again manually via the menu button, the new icon will use improved 
add to Home screen.

### What will happen to the current add to Home screen experience?

Improved add to Home screen will replace add to Home screen for PWAs. There is 
no change to the existing functionality of add to Home screen for non-PWAs. 

### What happens if the user has already installed the native app for the site?

Like add to Home screen today, users will be able to add a site independent of 
any native apps. If you expect users to potentially install both, we recommend 
differentiating the icon or name of your site from your native app.

### When a user opens a site installed via improved add to Home screen, will Chrome be running?

Yes, once the site is opened from the Home screen the primary activity is still 
Chrome. Cookies, permissions, and all other browser state will be shared.

### Will my installed site's storage be cleared if the user clears Chrome's cache?

Yes.

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

The feature is supported wherever Chrome is, back to Android Jelly Bean.

### Does this use the WebView?

No, the site opens in the version of Chrome the user added the site from.

### If I update my site's service worker, will this update automatically in the background even without the user visiting the site?

No. The update to the SW will be processed the next time that the user visits 
the page.

### When will the "Unknown sources" restriction be removed?

It is being removed right now in a staged manner.  We anticipate that when 
this hits stable channel of Chrome this will not be needed at all.

### Can we upload the APKs that are created to the Play Store?

No. There is no key signing information supplied to enable you to create your
own PWA that can be in the store.

### Are these listed in the Play Store?

No.

### What versions of Android will this work on?

The Progressive Web Apps will be able to be installed on all versions of
Android that Chrome for Android runs on (Jelly Bean and above).

### I am developer of another browser on Android, can I have this seamless install process?

We are working on it. We are comitted to making this available to browsers
on Android and we will have more details soon.

{% include "comment-widget.html" %}
