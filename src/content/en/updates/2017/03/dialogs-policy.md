project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Synchronous, app-modal JavaScript dialogs are commonly (and unfortunately) used to harm users. Because of this, the Chromium team highly recommends that you not use JavaScript dialogs.

{# wf_updated_on: 2017-03-24 #}
{# wf_published_on: 2017-03-24 #}
{# wf_tags: policy,dialog,javascript #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: Synchronous, app-modal JavaScript dialogs are commonly (and unfortunately) used to harm users. Because of this, the Chromium team highly recommends that you not use JavaScript dialogs. #}

# Proposed Chromium policy on JavaScript dialogs {: .page-title }

## History of JavaScript dialogs

JavaScript was introduced in 1995, and in the very first version of JavaScript
were methods on the window object named
[`alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert),
[`confirm()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm),
and [`prompt()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt).

While they fit into the JavaScript of the time, their synchronous API is
problematic for modern browsers. Because the JavaScript engine needs to pause
until a user response is obtained, the JavaScript dialogs are app-modal. And
because the dialogs are app-modal, they commonly (and unfortunately) are used to
[harm](https://twitter.com/fugueish/status/702684718303588352)
[our](https://blog.malwarebytes.org/fraud-scam/2016/02/tech-support-scammers-use-new-browser-trick-to-defeat-blocking/)
[users](https://blog.malwarebytes.com/cybercrime/2013/12/android-pop-ups-warn-of-infection/).

Because of this, the Chromium team highly recommends that you not use JavaScript dialogs.

## Alternatives

There are many options for dialog replacement.

There are several choices for `alert()/confirm()/prompt()`. For notifying the
user of events (e.g. calendaring sites), the
[Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
should be used. For obtaining user input, the
[HTML &lt;dialog&gt; element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
should be used. For XSS proofs-of-concept, devtool’s
`console.log(document.origin)` can be used.

As for `onbeforeunload`, it should be noted that it is _already_ unreliable. As
Ilya Grigorik [points out](https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/),
“You _cannot rely_ on `pagehide`, `beforeunload`, and `unload` events to fire on
mobile platforms.” If you need to save state, you should use the
[Page Visibility API](https://w3c.github.io/page-visibility/#introduction).

## Changes

The ability for a page to specify the `onbeforeunload` string was
[removed in Chrome 51](https://www.chromestatus.com/feature/5349061406228480).
(It was also removed by Safari starting with Safari 9.1 and in Firefox 4.)

It is planned that `alert()/confirm()/prompt()` dialogs will not be app-modal,
but rather [will be dismissed when their tab is switched from](https://crbug.com/629964).
(Safari 9.1 already does this.)

We are investigating the possibility of
[gating `alert()/confirm()/prompt()/onbeforeunload` dialogs on site engagement](https://groups.google.com/a/chromium.org/d/msg/blink-dev/waPXPhKqbJ0/wYVJlFKkBgAJ),
so if the user isn’t engaging with the page, the page’s dialogs will not be
shown. Details have yet to be ironed out.

Because of these changes, if your site uses dialogs, it is highly recommended
that you move to using the earlier-mentioned alternatives so that this will not
affect you.

{% include "comment-widget.html" %}
