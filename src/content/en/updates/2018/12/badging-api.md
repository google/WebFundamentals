project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Badging API is a new web platform API that allows installed web apps to set an application-wide badge, shown in an operating-system-specific place associated with the application, such as the shelf or home screen.

{# wf_published_on: 2018-12-11 #}
{# wf_updated_on: 2019-03-07 #}
{# wf_featured_image: /web/updates/images/generic/notifications.png #}
{# wf_tags: capabilities,badging,install,progressive-web-apps,serviceworker,notifications,origintrials #}
{# wf_featured_snippet: The Badging API is a new web platform API that allows installed web apps to set an application-wide badge, shown in an operating-system-specific place associated with the application, such as the shelf or home screen. Badging makes it easy to subtly notify the user that there is some new activity that might require their attention, or it can be used to indicate a small amount of information, such as an unread count. #}
{# wf_blink_components: UI>Browser>WebAppInstalls #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# Badging for App Icons {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">
  We’re currently working on this API as part of the new
  <a href="/web/updates/capabilities">capabilities project</a>, and starting
  in Chrome 73 is available as an <a href="#ot"><b>origin trial</b></a>.
  This post will be updated as the Badging API evolves.<br>
  <b>Last Updated:</b> March 12th, 2019
</aside>

## What is the Badging API? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
  <figcaption>
    Example of Twitter with 8 notifications and another app showing a flag
    type badge.
  </figcaption>
</figure>

The Badging API is a new web platform API that allows installed web apps to
set an application-wide badge, shown in an operating-system-specific place
associated with the application (such as the shelf or home screen).

Badging makes it easy to subtly notify the user that there is some new
activity that might require their attention, or it can be used to indicate a
small amount of information, such as an unread count.

Badges tend to be more user friendly than notifications, and can be updated
with a much higher frequency, since they don’t interrupt the user. And,
because they don’t interrupt the user, there’s no special permission needed
to use them.

[Read explainer][explainer]{: .button .button-primary }

<div class="clearfix"></div>

### Suggested use cases for the badging API {: #use-cases }

Examples of sites that may use this API include:

* Chat, email and social apps, to signal that new messages have arrived, or
  show the number of unread items
* Productivity apps, to signal that a long-running background task (such as
  rendering an image or video) has completed.
* Games, to signal that a player action is required (e.g., in Chess, when it
  is the player's turn).

## Current status {: #status }

| Step                                       | Status                       |
| ------------------------------------------ | ---------------------------- |
| 1. Create explainer                        | [Complete][explainer]        |
| 2. Create initial draft of specification   | [Complete][spec]             |
| **3. Gather feedback & iterate on design** | [**In progress**](#feedback) |
| **4. Origin trial**                        | [**In progress**](#ot)       |
| 5. Launch                                  | Not started                  |

### See it in action

1. Using Chrome 73 or later on Windows or Mac, open the [Badging API demo][demo].
2. When prompted, click **Install** to install the app , or use the Chrome
   menu to install it, then open it as an installed PWA. Note, it must be
   running as an installed PWA (in your task bar or dock).
3. Click the **Set** or **Clear** button to set or clear the badge from the app
   icon. You can also provide a number for the *Badge value*.

## How to use the badging API {: #use }

Starting in Chrome 73, the Badging API is available as an origin trial
for Windows (7+) and macOS.
[Origin trials][ot-what-is] allow you to try out new features and give
feedback on usability, practicality, and effectiveness to us, and the web
standards community. For more information, see the
[Origin Trials Guide for Web Developers][ot-dev-guide].

### Support for badging across platforms

The badging API is supported (in an origin trial) on Windows and macOS.
Android is not supported because it requires you to show a notification,
though this may change in the future.
Chrome OS support is pending implementation of badging on the platform.

### Register for the origin trial {: #ot }

1. [Request a token][ot-request] for your origin.
2. Add the token to your pages, there are two ways to provide this token on
   any pages in your origin:
     - Add an `origin-trial` `<meta>` tag to the head of any page. For example,
       this may look something like:
       `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">`
     - If you can configure your server, you can also provide the token on pages
       using an `Origin-Trial` HTTP header. The resulting response header should
       look something like: `Origin-Trial: TOKEN_GOES_HERE`

### Alternatives to the origin trial

If you want to experiment with the badging API locally, without an origin trial,
enable the `#enable-experimental-web-platform-features` flag in `chrome://flags`.

### Using the badging API during the origin trial

Dogfood: During the origin trial, the API will be available via
`window.ExperimentalBadge`. The below code is based on the current design,
and will change before it lands in the browser as a standardized API.

To use the badging API, your web app needs to meet
[Chrome’s installability criteria](/web/fundamentals/app-install-banners/#criteria),
and a user must add it to their home screen.

The `ExperimentalBadge` interface is a member object on `window`. It contains
two methods:

* `set([number])`: Sets the app's badge. If a value is provided, set the badge
  to the provided value otherwise, display a plain white dot (or other flag as
  appropriate to the platform).
* `clear()`: Removes app's badge.

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

`ExperimentalBadge.set()` and `ExperimentalBadge.clear()` can be called from
a foreground page, or potentially in the future, a service worker. In either
case, it affects the whole app, not just the current page.

In some cases, the OS may not allow the exact representation of the badge,
in this case, the browser will attempt to provide the best representation for
that device. For example, while the Badging API isn’t supported on Android,
Android only ever shows a dot instead of a numeric value.

## Feedback {: #feedback }

We need your help to ensure that the Badging API works in a way that meets your
needs and that we’re not missing any key scenarios.

<aside class="key-point">
  <b>We need your help!</b> - Will the current design (allowing an integer
  from 1-99, 99+, or a white dot/flag) meet your needs? If it won’t, please
  file an issue in the <a href="https://github.com/WICG/badging/issues">
  WICG/badging repo</a> and provide as much detail as you can. In addition,
  there are a number of <a href="https://github.com/WICG/badging/blob/master/choices.md">
  open questions</a> that are still being discussed, and we’d be interested to
  hear your feedback.
</aside>

We’re also interested to hear how you plan to use the Badging API:

* Have an idea for a use case or an idea where you'd use it?
* Do you plan to use this?
* Like it, and want to show your support?

Share your thoughts on the [Badging API WICG Discourse][wicg-discourse]
discussion.

{% include "web/_shared/helpful.html" %}

## Helpful Links {: #helpful }

* [Public explainer][explainer]
* [Badging API Demo][demo] | [Badging API Demo source][demo-source]
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* Request an [origin trial token][ot-request]
* [How to use an origin trial token][ot-use]
* Blink Component: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://wicg.github.io/badging/
[issues]: https://github.com/WICG/badging/issues
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=719176
[cr-status]: https://www.chromestatus.com/features/6068482055602176
[demo]: https://badging-api.glitch.me/
[demo-source]: https://glitch.com/edit/#!/badging-api?path=demo.js
[explainer]: https://github.com/WICG/badging/blob/master/explainer.md
[wicg-discourse]: https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900
[ot-what-is]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md
[ot-dev-guide]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md
[ot-use]: https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin
[ot-request]: https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481
