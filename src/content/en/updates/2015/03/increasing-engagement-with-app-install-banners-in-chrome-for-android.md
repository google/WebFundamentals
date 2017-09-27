project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Web App Manifest ✔︎, Service Worker ✔.Get ready for Web App Install banners 


{# wf_updated_on: 2017-09-27 #}
{# wf_published_on: 2015-03-11 #}
{# wf_tags: news,addtohomescreen,webapp,install #}

# Increasing Engagement with Web App Install Banners {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Warning: This article is out of date. The <a
href="/web/fundamentals/engage-and-retain/app-install-banners/">latest guidance
for Add to Homescreen can be found in Web Fundamentals.</a>

<img src="/web/updates/images/2015-03-03/add-to-home-screen.gif" 
     alt="IO Site with install banner" class="attempt-right" />

We recently enhanced the "Add to Home Screen" function in Chrome which allows
users to add your Web App to their home screen with the addition of the
standards-based "[web app
manifest](http://updates.html5rocks.com/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android)".
The manifest gives you extra control over the "Add to home screen" experience,
allowing you to tell the browser what to launch, how to launch your app
(fullscreen or in a browser window) and how it should appear to users on the
home screen.

This improved things for users, but the ability to Add to home screen is still
hidden behind a menu, meaning that your apps still aren't as discoverable as
they should be. To increase the chance of a user adding their app to the home
screen, a developer would have to try and guess if the site was already running
as an "Added to home screen" app and if not, then tactically decide to give them
an overlay that asked them to work around our poor UX. This wasn't great for
users, and it was not good for developers.

In Chrome 42, we introduced "App Install Banners". App Install Banners give you
the ability to have your users quickly and seamlessly install your Web App as
per the images below.

<span id="criteria">"This looks great, I want it on my site"</span> I hear you
shout. "Please tell me how to add it!". The good news is if you currently meet
the following criteria Chrome will manage the prompting of users:

* You have a [web app manifest
  file](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android), which defines how your app appears on the user's system and how it should be launched
  - The manifest must have a \`short\_name\`, a `name` for
  display in the banner,
  - A start URL (e.g. `/` or `index.html`) which must be loadable,
  - *At least* an \`192x192\` PNG icon
  - Your icon declarations should include a mime type of `image/png`
* You have a [service
  worker](/web/fundamentals/primers/service-worker/)
  registered on your site. We recommend a [simple custom offline page](https://github.com/GoogleChrome/samples/blob/gh-pages/service-worker/custom-offline-page/service-worker.js)
  service worker
* Your site is served over
  [HTTPS](https://docs.google.com/document/d/1oRXJUIttqQxuxmjj2tgYjj096IKw4Zcw6eAoIKWZ2oQ/edit)
  (service worker requires HTTPS for security)
* The user has visited your site at least twice, with at least five minutes between visits.

Note: The criteria will change over time. For more information read the
[FAQ](#criteria-faq).

A sample manifest is [provided in our
samples](https://github.com/GoogleChrome/samples/tree/gh-pages/app-install-banner)
and one here for quick reference:

    {
      "short_name": "Kinlan's Amaze App",
      "name": "Kinlan's Amazing Application ++",
      "icons": [
        {
          "src": "launcher-icon-4x.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ],
      "start_url": "index.html",
      "display": "standalone"
    }
    

If you are interested in the implementation, check out [crbug
452825](https://bugs.chromium.org/p/chromium/issues/detail?id=452825).

## <span id="cancel">Canceling the prompt</span>

Chrome manages when to trigger the prompt and for some sites this might not be ideal.

Since Chrome 43, you can now [cancel the
prompt](http://googlechrome.github.io/samples/app-install-banner/cancelable-banner/index.html)
by intercepting the `onbeforeinstallprompt` event and preventing default on the
event.


    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    

One use case is to defer the prompt until later in the page lifecycle, for
example just after a user has performed an action, or hit the bottom of the page
(something to indicate that they are engaging with your site).

## <span id="action">Did a user install our web app</span>

Another addition in Chrome 43 was the ability to discern if the user clicked
"Yes" or "No" to the App install banner.

The `beforeinstallprompt` event will return a promise called `userChoice` that
will resolve when the user actions the prompt. The promise will return an object
with a value of `dismissed` on the `outcome` attribute or `accepted` if the user
added the web page to the home screen.


    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired

      // e.userChoice will return a Promise.
      e.userChoice.then(function(choiceResult) {

        console.log(choiceResult.outcome);

        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });


This is a good tool for understanding how your users interact with your app
install prompt.

## <span id="native">Native app install banner</span>

<img class="attempt-right" 
     src="/web/updates/images/2015-03-03/inlineinstall.gif" 
     alt="Native app install banner" />

A new powerful feature for native app developers also landed in Chrome 44 Beta.
Native App install banners are similar to Web app install banners, but instead
of adding to the home screen will let the user inline install your native app.

The criteria are similar to the Web App install banner except for the need of a
Service Worker:

* You have a [web app manifest
  file](http://updates.html5rocks.com/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android)
  - The manifest defines how your app appears on the user's system and how it
  should be launched - and you are required to have a \`short\_name\` and a
  \`192x192\` png icon
  - Your icon declarations should include a mime type of `image/png`
* Your site is served over
  [HTTPS](https://docs.google.com/document/d/1oRXJUIttqQxuxmjj2tgYjj096IKw4Zcw6eAoIKWZ2oQ/edit)
* The user has visited your site twice over two separate days during the course
  of two weeks.

It is simple to integrate into any manifest. Just add a `related_applications`
array with the platforms of `play` (for Google Play) and the App Id, and then
add `"prefer_related_applications": true` to always show the native app banner
before the Web App Install banner.


    "prefer_related_applications": true,
    "related_applications": [
      {
        "platform": "play",
        "id": "com.google.samples.apps.iosched"
      }
    ],
    

## <span id="criteria-faq">Frequently Asked Questions</span>

### My app meets all the criteria, but I don't want the banner to display. Can I control this?

Yes, you can prevent the banner from displaying.  See "[Canceling the
prompt](#cancel)".

### Can I detect if a user tapped "Add" at the prompt and added to home screen?

Yes you can, see "[Did a user install our web app](#action)".

### If a user dismisses the banner, will it appear again?

No. Not unless the user clears their history. We want to make sure users have a
good experience. We will likely be changing all the heuristics over time.

###Can I decide when to prompt the user?

No, we are not letting developers actively prompt the user to "Add to Home
Screen".

###You said that I will only get the banner if I visit the site over a certain
period of time. How can I test this faster?

Enable chrome://flags/\#bypass-app-banner-engagement-checks and you will see the
banner as long as you have a manifest (configured correctly) and are on HTTPS
and have a service worker.

### Why do I need a service worker?

We believe that when you add to the user's home screen you should be providing
an app-like experience. A service worker, especially one that supports push
messaging or offline, is a strong indicator that you are developing a first
class device experience. We recommend the following [simple service worker as a
starting
point](https://github.com/GoogleChrome/samples/blob/gh-pages/app-install-banner/basic-banner/service-worker.js).

###Will the criteria for App Banner activation change over time?

Yes.

###How will the criteria for App Banner activation change over time?

We can't give specifics right now but as we better understand what makes an
experience the user will want to install we will want to make sure the criteria
are updated and also well understood for developers.

##What could one of the criteria for App Banner activation be?

Again, it is hard to say. One example could be: supporting offline scenarios in
your app could indicate that your app is more resilient to connectivity issues
and therefore would offer a better launchable experience.

##Why do I need SSL?

Because you need a service worker, and since service workers can completely
redirect any HTTP requests, we wouldn't want a man-in-the-middle attack to
insert a different service worker than the one your app and user expects.

### Are there any good examples of this in action?

Yes, Glad you asked:

* [Google I/O 2015 web app](https://events.google.com/io2015/){: .external }
* [Chrome Dev Summit](https://developer.chrome.com/devsummit/){: .external }
* [SVG OMG](https://jakearchibald.github.io/svgomg/){: .external }
  [[Code](https://github.com/jakearchibald/svgomg)]
* [QR Snapper](https://qrsnapper.appspot.com)
  [[Code](https://github.com/PaulKinlan/qrcode)]

### Examples are great, but do you have anything I can just copy and paste?

Yes. We have made a [minimal app install banner
example](https://github.com/GoogleChrome/samples/tree/gh-pages/app-install-banner/)
that you can copy, paste and change.

{% include "comment-widget.html" %}
