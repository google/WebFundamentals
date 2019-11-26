project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 78 for developers?

{# wf_published_on: 2019-10-22 #}
{# wf_updated_on: 2019-10-22 #}
{# wf_featured_image: /web/updates/images/2019/10/new-78.jpg #}
{# wf_tags: chrome78,new-in-chrome,chromedevsummit,css,serviceworker,origintrials,native-file-system,sms-receiver #}
{# wf_featured_snippet: Chrome 78 is rolling out now! You can now provide “types” for CSS variables. You get fresher service workers because byte-for-byte checks are now performed for scripts imported by <code>importScripts()</code>. And I’ve got details for two new origin trials that provide some neat new functionality including the Native File System and the SMS Receiver. Plus the Chrome DevSummit is happening November 11-12, 2019. Let’s dive in and see what’s new for developers in Chrome 78! #}
{# wf_blink_components: N/A #}

# New in Chrome 78 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 78 is rolling out now!

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Q81403HNZRc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

I’m [Pete LePage](https://twitter.com/petele), let’s dive in and see what’s
new for developers in Chrome 78!

<div class="clearfix"></div>

## CSS Properties and Values API {: #css-prop-val }

CSS variables, technically called custom properties, are awesome. They let
you define and use your own properties throughout your CSS. But, custom
properties are not much more than a simple search and replace.

```css
html {
  --my-color: green;
}
.thing {
  color: var(--my-color);
}
```

If you used a variable for a color, but assigned a URL as a value, the
rule would just be silently discarded. With the CSS Properties and Values
API, you can define a type and default fallback value for your custom
properties.

```css
html {
  --my-color: url(‘not-a-color’); // Oops, not a color!
}
.thing {
  color: var(--my-color);
}
```

Registering a property is as easy as calling `window.CSS.registerProperty()`
and providing the name of the property you’re defining the type of property
it is, if it should inherit, and it’s initial value.

```js
window.CSS.registerProperty({
  name: '--my-color',
  syntax: '<color>',
  inherits: false,
  initialValue: 'black',
});
```

Take a look at Sam Richard's
[Smarter custom properties with Houdini’s new API][prop-val-web-dev] article
on web.dev for complete details.

[prop-val-web-dev]: https://web.dev/css-props-and-vals/

<div class="clearfix"></div>

## Fresher service workers {: #fresher-service-workers }

Byte-for-byte checks are now performed for service worker scripts imported by
`importScripts()`. In the past, the only way to force an installed service
worker to pick up changes to an imported script was to change the imported
script's URL, usually either by adding in a semver value or hash in the URL.

```js
importScripts('https://example.com/v1.1.0/index.js');
importScripts('https://example.com/index.abcd1234.js');
```

Starting in Chrome 78, each time an update check is performed for a top-level
service worker file, Chrome will also check whether or not the contents of
any imported scripts have changed. If they have, it will trigger the full
service worker update flow. This brings Chrome into conformance with the
spec, and matches what Firefox and Safari do.

Jeff has all the details in [Fresher service workers, by default][fresher],
including some important things to know about how the HTTP cache impacts the
update cycle.

[fresher]: /web/updates/2019/09/fresher-sw

<div class="clearfix"></div>

## New origin trials {: #origin-trials }

Origin trials provide an opportunity for us to validate experimental features
and APIs, and make it possible for you to provide feedback on their usability
and effectiveness in broader deployment.

<a href="https://developers.chrome.com/origintrials/#/trials/active">
  <img src="/web/updates/images/2019/10/ot-landing.png" class="attempt-right">
</a>

Experimental features are typically only available behind a flag, but when we
offer an Origin Trial for a feature, you can register for that origin trial
to enable the feature for all users on your origin.

Opting into an origin trial allows you to build demos and prototypes that
your beta testing users can try for the duration of the trial without
requiring them to flip any special flags in Chrome.

There’s more info on origin trials in the
[Origin Trials Guide for Web Developers][ot-for-web-devs]. You can see a list
of active origin trials, and sign up for them on the
[Chrome Origin Trials][ot-listing] page.

[ot-for-web-devs]: https://googlechrome.github.io/OriginTrials/developer-guide.html
[ot-listing]: https://developers.chrome.com/origintrials/#/trials/active

<div class="clearfix"></div>

### Native File System {: #native-file-system }

*An [Origin Trial for the Native File System API][fs-ot] starts in Chrome 78
and is expected to run through Chrome 80.*

<img src="/web/updates/images/2019/10/fs-open.jpg" class="attempt-right">

The Native File System API enables developers to build powerful web apps that
interact with files on the user's local device. After a user grants a web app
access, this API allows web apps to read or save changes directly to files
and folders on the user's device.

I’m really excited about all of the new experiences this enables, no more
having to “upload” or “download” files I want to work with. Check out my post
about the [Native File System][native-fs] for all the details, including
code, a demo, and how we’re working to keep users safe.

[fs-ot]: https://developers.chrome.com/origintrials/#/view_trial/3868592079911256065
[native-fs]: /web/updates/2019/08/native-file-system

<div class="clearfix"></div>

### SMS Receiver {: #sms-receiver }

*An [Origin Trial for the SMS Receiver API][smsr-ot] starts in Chrome 78 and is
expected to run through Chrome 80.*

The SMS Receiver API, now available as an origin trial, lets your web app
receive specially formatted SMS messages for your app's origin. From this,
you can programmatically obtain an OTP from an SMS message and verify a phone
number for the user more easily.

Eiji wrote [Verify phone numbers on the web with the SMS Receiver API][sms-r]
with all the details, and how to sign up for the origin trial.

[smsr-ot]: https://developers.chrome.com/origintrials/#/view_trial/607985949695016961
[sms-r]: https://web.dev/sms-receiver-api-announcement/

<div class="clearfix"></div>

## Chrome Dev Summit 2019 {: #cds2019 }

<a href="https://developer.chrome.com/devsummit/">
  <img src="/web/updates/images/2019/10/cds-2019.png" class="attempt-left">
</a>

Don’t forget to tune into the [Chrome Dev Summit][cds-site] on November
11th and 12th,  it’ll be streaming live, on the
[Chrome Developers YouTube channel][cr-yt].

[cds-site]: https://developer.chrome.com/devsummit/
[cr-yt]: https://www.youtube.com/user/ChromeDevelopers/

<div class="clearfix"></div>

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 78.

* [What's new in Chrome DevTools (78)](/web/updates/2019/09/devtools)
* [Chrome 78 deprecations & removals](/web/updates/2019/09/chrome-78-deps-rems)
* [ChromeStatus.com updates for Chrome 78](https://www.chromestatus.com/features#milestone%3D78)
* [What's new in JavaScript in Chrome 78](https://v8.dev/blog/v8-release-78)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/77.0.3865.75..78.0.3904.72)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and as soon as Chrome 79 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
