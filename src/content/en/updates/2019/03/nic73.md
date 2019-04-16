project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 73 for developers?

{# wf_published_on: 2019-03-12 #}
{# wf_updated_on: 2019-04-15 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome73,new-in-chrome,desktop,progressive-web-apps,webpackage,css,regex #}
{# wf_featured_snippet: Chrome 73 makes creating portable content easier with signed HTTP exchanges. Dynamically changing styles becomes way easier with constructable style sheets. And adds support for Progressive Web Apps on Mac, bringing support for PWAs to all desktop and mobile platforms, making it easy to create installable apps, delivered through the web. Let’s dive in and see what’s new for developers in Chrome 73! #}
{# wf_blink_components: N/A #}

# New in Chrome 73 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ksWDVurubwE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

In Chrome 73, we've added support for:

* Creating portable content easier with [signed HTTP exchanges](#sxg).
* Dynamically changing styles becomes way easier with
  [constructable style sheets](#constructable-style-sheets).
* Support for Progressive Web Apps arrives for on Mac, bringing support for
  PWAs to [all desktop and mobile platforms](#pwas-everywhere), making it easy
  to create installable apps, delivered through the web.

And there’s [plenty more](#more)!

I’m [Pete LePage](https://mobile.twitter.com/petele). Let’s dive in and see
what’s new for developers in Chrome 73!

<div class="clearfix"></div>

### Change log {: .hide-from-toc }

This covers only some of the key highlights, check the links below for
additional changes in Chrome 73.

* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/72.0.3626.82..73.0.3683.74)
* [ChromeStatus.com updates for Chrome 73](https://www.chromestatus.com/features#milestone%3D73)
* [Chrome 73 deprecations & removals](/web/updates/2019/02/chrome-73-deps-rems)
* [Chrome 73 media updates](/web/updates/2019/02/chrome-73-media-updates)
* [What's new in JavaScript in Chrome 73](https://v8.dev/blog/v8-release-73)

## Progressive Web Apps work everywhere {: #pwas-everywhere }

Progressive Web Apps provide an installable, app-like experience, built and
delivered directly via the web. In Chrome 73, we’ve added support for macOS,
bringing support for
[Progressive Web Apps to all desktop platforms](/web/progressive-web-apps/desktop) -
Mac, Windows, Chrome OS and Linux, as well as mobile, simplifying web app
development.

A Progressive Web App is fast, and reliably so; always loading and performing
at the same speed, regardless of network connection. They provide rich,
engaging experiences via modern web features that take full advantage of the
device capabilities.

<img src="/web/updates/images/2019/03/twitter-installed.jpg" class="attempt-right">

Users can install your PWA from Chrome’s context menu, or you can directly
promote the installation experience using the
[`beforeinstallprompt`](/web/fundamentals/app-install-banners/) event. Once
installed, a PWA integrates with the OS to behave like a native application:
users find and launch them from the same place as other apps, they run in
their own window, they appear in the task switcher, their icons can show
notification badging, and so on.

We want to [close the capability gap](/web/updates/capabilities)
between the web and native to provide a solid foundation for modern
applications delivered on the web. We’re working to add new web platform
capabilities that give you access to things like the
[file system](/web/updates/2018/11/writable-files),
[wake lock](/web/updates/2018/12/wakelock), adding an
[ambient badge to the address bar](https://bugs.chromium.org/p/chromium/issues/detail?id=782120)
to let users know your PWA can be installed, policy installation for enterprises,
and [plenty more](/web/updates/capabilities#in-flight).

If you’re already building a mobile PWA, a desktop PWA is no different. In fact,
if you’ve used responsive design, you’re likely good to go already. Your single
codebase will work across desktop and mobile. If you’re just starting out with
PWAs, you’ll be surprised at how easy it is to create them!

1. [Add a manifest](/web/fundamentals/web-app-manifest/)
2. [Create a set of icons](/web/fundamentals/web-app-manifest/#icons)
3. [Add a boilerplate service worker](/web/tools/workbox/)

Then, iterate from there.

<div class="clearfix"></div>

## Signed HTTP Exchanges {: #sxg }

Signed HTTP Exchanges (SXG), part of an emerging technology called
[Web Packages](https://github.com/WICG/webpackage) is now available in Chrome 73.
A Signed HTTP Exchange makes it possible to create “portable” content that can
be delivered by other parties, and this is the key aspect, it retains the
integrity and attribution of the original site.

<img src="/web/updates/images/2018/11/signed-exchanges.svg"
     alt="Signed Exchange: The essence" class="attempt-left">

This decouples the origin of the content from the server that delivers it,
but because it’s signed, it’s like it’s being delivered from your server.
When the browser loads this Signed Exchange, it can safely show your URL in the
address bar because the signature in the exchange indicates the content
originally came from your origin.

Signed HTTP exchanges enables faster content delivery for users, making it
possible to get the benefits of a CDN without having to cede control of your
certificate’s private key. The AMP team is planning to use signed HTTP
exchanges on Google search result pages to improve AMP URLs and speed up clicks
on search results.

Check out Kinuko’s [Signed HTTP Exchanges](/web/updates/2018/11/signed-exchanges)
post for details on how to get started.

<div class="clearfix"></div>

## Constructable style sheets {: #constructable-style-sheets }

Constructable Stylesheets, new in Chrome 73, gives us a new way to create and
distribute reusable styles, which is particularly important when using
Shadow DOM.

It’s always been possible to create stylesheets using JavaScript. Create a
`<style>` element using `document.createElement('style')`. Then access its
sheet property to obtain a reference to the underlying `CSSStyleSheet` instance,
and set the style.

<img src="/web/updates/images/2019/02/constructable-stylesheets/overview.png"
    alt="Diagram showing preparation and application of CSS"
    class="attempt-right">

Using this method tends to lead to style sheet bloat. Even worse, it causes a
flash of unstyled content. Constructable Stylesheets make it possible to define
and prepare shared CSS styles, and then apply those styles to multiple Shadow
Roots or the Document easily and without duplication.

Updates to a shared `CSSStyleSheet` are applied to all roots where it’s been
adopted, and adopting a stylesheet is fast and synchronous once the sheet has
been loaded.

Getting started is simple, create a new instance of `CSSStyleSheet`, then use
either `replace` or `replaceSync` to update the stylesheet rules.

<div class="clearfix"></div>

```js
const sheet = new CSSStyleSheet();

// replace all styles synchronously:
sheet.replaceSync('a { color: red; }');

// this throws an exception:
try {
  sheet.replaceSync('@import url("styles.css")');
} catch (err) {
  console.error(err); // imports are not allowed
}

// replace all styles, allowing external resources:
sheet.replace('@import url("styles.css")')
  .then(sheet => {
    console.log('Styles loaded successfully');
  })
  .catch(err => {
    console.error('Failed to load:', err);
  });
```

Check out Jason Miller’s
[Constructable Stylesheets: seamless reusable styles](/web/updates/2019/02/constructable-stylesheets)
post for more details and code samples!

<div class="clearfix"></div>

## And more! {: #more }

These are just a few of the changes in Chrome 73 for developers, of course,
there’s plenty more.

* [`matchAll()`](https://tc39.github.io/proposal-string-matchall/), is a new
  regular expression matching method on the string prototype, and returns an
  array containing the complete matches.
* The `<link>` element now supports `imagesrcset` and `imagesizes` properties
  to correspond to `srcset` and `sizes` attributes of `HTMLImageElement`.
* Blink's shadow blur radius implementation, now matches Firefox and Safari.
* Dark mode for Chrome's UI is now supported on Mac, and Windows support is on
  the way. In addition, there's work on a CSS media query:
  [`prefers-color-scheme`](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme),
  that can be used to detect if the user has requested the system use a light
  or dark color theme. The tracking bug for this is
  **Add support for CSS `prefers-color-scheme` media feature**
  For [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=889087),
  and [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1494034).

<div class="clearfix"></div>

### Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and as soon as Chrome 74 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
