project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Badging API is a new web platform API that allows installed web apps to set an application-wide badge, shown in an operating-system-specific place associated with the application, such as the shelf or home screen.

{# wf_published_on: 2018-12-11 #}
{# wf_updated_on: 2018-12-10 #}
{# wf_featured_image: /web/updates/images/generic/file.png #}
{# wf_tags: capabilities,badging,install,progressive-web-apps,serviceworker,notifications #}
{# wf_featured_snippet: The Badging API is a new web platform API that allows installed web apps to set an application-wide badge, shown in an operating-system-specific place associated with the application, such as the shelf or home screen. Badging makes it easy to subtly notify the user that there is some new activity that might require their attention, or it can be used to indicate a small amount of information, such as an unread count. #}
{# wf_blink_components: UI>Browser>WebAppInstalls #}

# Badging for App Icons {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

{% include "web/updates/_shared/capabilities.html" %}


## What is the Badging API? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges.png">
  <figcaption>
    Examples of badges on launch icons across different platforms.
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
| **2. Create initial draft of specification** | [**In Progress**][spec]    |
| **3. Gather feedback & iterate on design** | [**In progress**](#feedback) |
| 4. Origin trial                            | Not started                  |
| 5. Launch                                  | Not started                  |

## How to use the badging API {: #use }

Dogfood: We are still iterating on the design of the Badging API, and it’s
**not** available in the browser yet. The sample code you see is based on
the current design, and will likely change between now and the time it lands
in the browser.

To use the badging API, your web app needs to meet
[Chrome’s installability criteria](/web/fundamentals/app-install-banners/#criteria),
and a user must add it to their home screen.

The `Badge` interface is a member object on `Window` and `Worker`. It contains
two methods:

* `set([number])`: Sets the app's badge. If a value is provided, set the
  badge to the provided value.
* `clear()`: Removes app's badge.


```js
// In a web page
const unreadCount = 24;
window.Badge.set(unreadCount);

// In a service worker
self.addEventListener('sync', () => {
  self.Badge.set(getUnreadCount());
});
```


`Badge.set()` and `Badge.clear()` can be called from either a foreground page
or potentially a service worker. In either case, it affects the whole app, not
just the current page.

Caution: The spec and explainer currently allow for strings in the badge, but
that is being removed. Only numbers will be permitted.

In some cases, the OS may not allow the exact representation of the badge, in
this case, the browser will attempt to provide the best representation for
that device. For example, Android only shows a white dot, instead of the
numeric value.


## Feedback {: #feedback }

We need your help to ensure that the Badging API works in a way that meets your
needs and that we’re not missing any key scenarios.

<aside class="key-point">
  <b>We need your help!</b> - Will the current design (allowing an integer
  from 1-99, 99+, or a white dot) meet your needs? If it won’t, please file an
  issue in the <a href="https://github.com/WICG/badging/issues">
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
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* Blink Component: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://wicg.github.io/badging/
[issues]: https://github.com/WICG/badging/issues
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=719176
[cr-status]: https://www.chromestatus.com/features/6068482055602176
[explainer]: https://github.com/WICG/badging/blob/master/explainer.md
[wicg-discourse]: https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900
