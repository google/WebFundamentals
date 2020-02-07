project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 80 for developers?

{# wf_published_on: 2020-02-04 #}
{# wf_updated_on: 2020-02-05 #}
{# wf_featured_image: /web/updates/images/2020/02/new-80.jpg #}
{# wf_tags: chrome80,new-in-chrome,chromedevsummit,forms,formdata,lazy-loading,performance #}
{# wf_featured_snippet: Chrome 80 is rolling out now, and there’s a ton of new stuff in it for developers! There’s support for modules in workers, optional chaining in JavaScript, new origin trials, features that have graduated from origin trial, and so much more. Let’s dive in and see what’s new for developers in Chrome 80! #}
{# wf_blink_components: N/A #}

# New in Chrome 80 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 80 is rolling out now, and there’s a ton of new stuff in it for
developers!

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lM0qZpxu0Fg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

There’s support for:

* [Modules in workers](#module-workers)
* [Optional chaining](#opt-chaining) in JavaScript
* [New origin trials](#ot-new)
* Features that have [graduated from origin trial](#ot-graduation)
* And so much [more](#more).

I’m [Pete LePage](https://twitter.com/petele), let’s dive in and see what’s
new for developers in Chrome 80!

<div class="clearfix"></div>

## Module workers {: #module-workers }

Module Workers, a new mode for web workers - with the ergonomics, and
performance benefits of JavaScript modules is now available. The Worker
constructor accepts a new `{type: "module"}` option, which changes the way
scripts are loaded and executed, to match `<script type="module">`

```js
const worker = new Worker('worker.js', {
  type: 'module'
});
```

Moving to JavaScript modules, also enables the use of dynamic import for
lazy-loading code, without blocking the execution of the worker. Check out
Jason’s post
[Threading the web with module workers](https://web.dev/module-workers/) on
web.dev for more details.


## Optional chaining {: #opt-chaining }

Trying to read deeply nested properties in an object can be error-prone,
especially if there’s a chance something might not evaluate.

```js
// Error prone-version, could throw.
const nameLength = db.user.name.length;
```

Checking each value before proceeding easily turns into a deeply nested `if`
statement, or requires a `try` / `catch` block.

```js
// Less error-prone, but harder to read.
let nameLength;
if (db && db.user && db.user.name)
  nameLength = db.user.name.length;
```

Chrome 80 adds support for a new JavaScript feature called
[optional chaining](https://v8.dev/features/optional-chaining).
With optional chaining, if one of the properties returns a null, or undefined,
instead of throwing an error, the whole thing simply returns undefined.

```js
// Still checks for errors and is much more readable.
const nameLength = db?.user?.name?.length;
```

Check out the [Optional Chainging](https://v8.dev/features/optional-chaining)
blog post on the v8 blog for all the details!

<div class="clearfix"></div>

## Origin trial graduations {: #ot-graduation }

There are three new capabilities that graduated from Origin Trial to stable,
allowing them to be used by any site, without a token.

### Periodic background sync

First up, is [periodic background sync](https://web.dev/periodic-background-sync/),
it periodically synchronizes data in the background, so that when a user
opens your installed PWA, they always have the freshest data.

### Contact picker

Next up, is the [Contact Picker API](https://web.dev/contact-picker/), an
on-demand API that allows users to select entries from their contact list
and share limited details of the selected entries with a website.

It allows users to share only what they want, when they want, and makes it
easier for users to reach and connect with their friends and family.

### Get installed related apps

And finally, the [Get Installed Related Apps](https://web.dev/get-installed-related-apps/)
method allows your web app to check if your native app is installed on a user's
device.

One of the most common uses cases is for deciding whether to promote the
installation of your PWA, if your native app isn’t installed. Or, you might
want to disable some functionality of one app if it’s provided by the other app.

## New origin trials {: #ot-new }

### Content indexing API

How do you let users know about content you’ve cached in your PWA?  There’s a
discovery problem here. Will they know to open your app? Or what content is
available?

The Content Indexing API, is a new origin trial, that allows you to add URLs
and metadata of offline-capable content, to a local index, maintained by
the browser, and easily visible to the user.

```js
const registration = await navigator.serviceWorker.ready;
await registration.index.add({
  id: 'article-123',
  launchUrl: '/articles/123',
  title: 'Article title',
  description: 'Amazing article about things!',
  icons: [{
    src: '/img/article-123.png',
    sizes: '64x64',
    type: 'image/png',
  }],
});
```

To add something to the index, I need to get the service worker registration,
then call `index.add`, and provide metadata about the content.

Once the index is populated, it’s shown in a dedicated area of Chrome for
Android’s Downloads page. Check out Jeff’s post [Indexing your offline-capable
pages with the Content Indexing API](https://web.dev/content-indexing-api/)
on web.dev for complete details.

### Notification triggers


Notifications are a critical part of many apps. But, push notifications are
only as reliable as the network you’re connected to. While that works in most
cases, it sometimes breaks. For example, if a calendar reminder, notifying
you of an important event doesn’t come through because you’re in airplane
mode, you might miss the event.

Notification Triggers let you schedule notifications in advance, so that the
operating system will deliver the notification at the right time - even if
there is no network connectivity, or the device is in battery saver mode.

```js
const swReg = await navigator.serviceWorker.getRegistration();
swReg.showNotification(title, {
  tag: tag,
  body: "This notification was scheduled 30 seconds ago",
  showTrigger: new TimestampTrigger(timestamp + 30 * 1000)
});
```

To schedule a notification, call `showNotification` on the service worker
registration. In the notification options, add a `showTrigger` property with a
`TimestampTrigger`. Then, when the time arrives, the browser will show the
notification.

The origin trial is planned to run through Chrome 83, so check out Tom’s
[Notification Triggers](https://web.dev/notification-triggers/) post on web.dev
for complete details.

### Other origin trials

There are a few other origin trials starting in Chrome 80:

* Web Serial
* The ability for PWAs to register as file handlers
* New properties for the contact picker

Check <https://developers.chrome.com/origintrials/#/trials/active> for
a a complete list of features in origin trial.

## And more {: #more }

Of course, there’s plenty more!

* You can now link directly to text fragments on a page, by using
  `#:~:text=something`. Chrome will scroll to and highlight the first instance
  of that text fragment. For example <https://en.wikipedia.org/wiki/Rickrolling#:~:text=New%20York>
* Setting `display: minimal-ui` on a Desktop PWA adds a back and reload
  button to the title bar of the installed PWA.
* And Chrome now supports using SVG images as favicons.


## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 80.

* [What's new in Chrome DevTools (80)](/web/updates/2019/12/devtools)
* [Chrome 80 deprecations & removals](/web/updates/2019/12/chrome-80-deps-rems)
* [ChromeStatus.com updates for Chrome 80](https://www.chromestatus.com/features#milestone%3D80)
* [What's new in JavaScript in Chrome 80](https://v8.dev/blog/v8-release-80)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/79.0.3945.82..80.0.3987.87)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and as soon as Chrome 81 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
