project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Trusted Web activities are a new way to integrate your web-app content such as your PWA with your Android app using a similar protocol to Chrome Custom Tabs.

{# wf_updated_on: 2017-10-24 #}
{# wf_published_on: 2017-10-24 #}
{# wf_tags: trusted-web-activity #}
{# wf_featured_image: /web/updates/images/generic/devices.png  #}
{# wf_featured_snippet: Trusted Web activities are a new way to integrate your web-app content such as your PWA with your Android app using a similar protocol to Chrome Custom Tabs. #}


# Using Trusted Web Activity {: .page-title }

Note: Looking for the code? The support library and a sample using Trusted Web
activity will be available soon, in the Android support library version 27.

There are many different ways to integrate web content on Android, each having
their own unique benefits and drawbacks. Developers have frequently asked for a
simple way to launch content fullscreen like a WebView, which is run using the
latest and preferred browser of the user.

At the Chrome Developer Summit 2017 (October 2017) we’ve announced a new
technology called Trusted Web activities which are now available in Chrome’s
[Canary channel](https://play.google.com/store/apps/details?id=com.chrome.canary).
Trusted Web activities are a new way to integrate your web-app content such as
your PWA with your Android app using a similar protocol to Chrome Custom Tabs.

There are a few things that make Trusted Web activities different from other
ways to integrate web content with your app:

1. Content in a Trusted Web activity is **trusted** -- the app and the site it
   opens are expected to come from the same developer. (This is verified using
   [Digital Asset Links](/digital-asset-links/v1/getting-started).) 
1. Trusted Web activities come from the **web**: they’re rendered by the user’s
   browser, in exactly the same way as a user would see it in their browser
   except they are run fullscreen. Web content should be accessible and useful
   in the browser first.
1. Browsers are also updated independent of Android and your app -- Chrome is
   available back to Android Jelly Bean. That saves on APK size and ensures
   you can use a modern web runtime. (Note that since Lollipop, WebView has
   also been updated independent of Android, but there a
   [significant number](https://developer.android.com/about/dashboards/index.html)
   of pre-Lollipop Android users.)
1. The host app doesn’t have direct access to web content in a Trusted Web
   activity or any other kind of web state, like cookies and `localStorage`.
   Nevertheless, you can coordinate with the web content by passing data to
   and from the page in URLs (e.g. through query parameters.)
1. Transitions between web and native content are between activities. Each
   activity (i.e. screen) of your app is either completely provided by the
   web, or by an Android activity

To make it easier to test, there are currently no qualifications for content
opened in the preview of Trusted Web activities. You can expect, however, that
Trusted Web activities will ultimately have need to
[meet requirements similar to improved Add to Home screen](/web/fundamentals/app-install-banners/#what_are_the_criteria),
which is designed to be a baseline of interactivity and performance. You can
audit your site for these requirements using the
[Lighthouse](/web/tools/lighthouse/) “user can be prompted to Add to Home
screen” audit.

Today, if the user’s version of Chrome doesn’t support Trusted Web activities,
we’ll fall back to a simple toolbar like the one you’d see in a Custom Tab. It
is also possible for other browsers to implement the same protocol that Trusted
Web activities use. While the host app has the final say on what browser get
opened, this means that today the best practice for Trusted Web activities is to
follow the same best practice for Custom Tabs: use the user’s default browser,
so long as that browser provides Custom Tabs.

We hope that you can experiment with this API and give us feedback at
[@ChromiumDev](https://twitter.com/ChromiumDev)
