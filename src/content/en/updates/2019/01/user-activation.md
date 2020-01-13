project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: In version 72, Chrome ships User Activation v2 which makes user activation availability complete for all activation-gated APIs, resolving many user activation inconsistencies.

{# wf_published_on: 2019-01-14 #}
{# wf_updated_on: 2019-09-21 #}
{# wf_featured_image: /web/updates/images/misc/first-input-delay.png #}
{# wf_tags: chrome72,user-activation,user-gesture #}
{# wf_featured_snippet: In version 72, Chrome ships User Activation v2 which makes user activation availability complete for all activation-gated APIs, resolving many user activation inconsistencies. #}
{# wf_blink_components: Blink>Input #}

# Making user activation consistent across APIs {: .page-title }

{% include "web/_shared/contributors/mustaqahmed.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}

To prevent malicious scripts from abusing sensitive APIs like popups,
fullscreen etc., browsers control access to those APIs through user
activation.  _User activation_ is the state of a browsing session with respect
to user actions: an "active" state typically implies either the user is
currently interacting with the page, or has completed an interaction since page
load.  _User gesture_ is a popular but misleading term for the same idea. For
example, a swipe or flick gesture by a user does not activate a page and hence
is not, from a script standpoint, a user activation.

Major browsers today show widely divergent behavior around how user activation
controls the _activation-gated APIs_.  In Chrome, the implementation was based
on a token-based model that turned out to be too complex to define a consistent
behavior across all activation-gated APIs.  For example, Chrome has been
allowing incomplete access to activation-gated APIs through
[`postMessage()`](https://crbug.com/161068) and
[`setTimeout()` calls](https://crbug.com/802291); and user activation wasn't
supported with [Promises](https://crbug.com/404161),
[XHR](https://crbug.com/760848),
[Gamepad interaction](https://crbug.com/381596), etc.  Note that some of these
are popular yet long-standing bugs.

In version 72, Chrome ships User Activation v2 which makes user
activation availability complete for all activation-gated APIs.  This resolves
the inconsistencies mentioned above (and a few more, like
[MessageChannels](https://crbug.com/851493)), which we believe would ease web
development around user activation.  Moreover, the new implementation provides
a reference implementation for a proposed
[new specification](https://whatpr.org/html/3851/interaction.html#tracking-user-activation)
that aims to bring all browsers together in the long run.

## How does User Activation v2 work?

The new API maintains a two-bit user activation state at every `window` object
in the frame hierarchy: a sticky bit for historical user activation state (if a
frame has ever seen a user activation), and a transient bit for current state
(if a frame has seen a user activation in about a second).  The sticky bit
never resets during the frame's lifetime after it gets set.  The transient bit
gets set on every user interaction, and is reset either after an expiry
interval (about a second) or through a call to an activation-consuming API
(e.g. `window.open()`).

Note that different activation-gated APIs rely on user activation in different
ways; the new API is not changing any of these API-specific behaviors.  E.g.
only one popup is allowed per user activation because `window.open()` consumes
user activation as it used to be, `Navigator.prototype.vibrate()` continues to
be effective if a frame (or any of its subframes) has ever seen user action,
and so on.

## What's changing?

+   User Activation v2 formalizes the notion of user activation visibility
across frame boundaries: a user interaction with a particular frame will now
activate all containing frames (and only those frames) regardless of their
origin. (In Chrome 72, we have a temporary workaround in place to expand the
visibility to all same-origin frames.  We will remove this workaround once we
have a way to
[explicitly pass user activation to sub-frames](https://crbug.com/728334).)
+   When an activation-gated API is called from an activated frame but from
outside an event handler code, it will work as long as the user activation
state is "active" (e.g. has neither expired nor been consumed).  Before User
Activation v2, it would unconditionally fail.
+   Multiple unused user interactions within the expiry time interval fuses
into a single activation corresponding to the last interaction.

## Examples of consistency in activation-gated APIs

Here are two examples with popup windows (opened using `window.open()`) that
show how User Activation v2 makes the behavior of activation-gated APIs
consistent.

### Chained `setTimeout()` calls

This example is from
[our `setTimeout()` demo](https://mustaqahmed.github.io/user-activation-v2/api-consistency/setTimeout.html).
If a `click` handler tries to open a popup within a second, it is expected to
succeed no matter how the code "composes" the delay.  User Activation v2 meets
this expectation, so each of the following event handlers opens a popup on a
`click` (with a 100ms delay):

    function popupAfter100ms() {
      setTimeout(callWindowOpen, 100);
    }

    function asyncPopupAfter100ms() {
      setTimeout(popupAfter100ms, 0);
    }

    someButton.addEventListener("click", popupAfter100ms);
    someButton.addEventListener("click", asyncPopupAfter100ms);

Without User Activation v2, the second event handler fails in all browsers we
tested. (Even the first one fails
[in some cases](https://docs.google.com/document/d/1hYRTEkfWDl-KO4Y6cG469FBC3nyBy9_SYItZ1EEsXUA/edit#bookmark=id.7fb3jwz3is2s).)

### Cross-domain `postMessage()` calls

Here's an example from
[our `postMessage()` demo](https://mustaqahmed.github.io/user-activation-v2/api-consistency/postMessages.html).
Suppose a `click` handler in a cross-origin subframe sends two messages directly
to the parent frame.  The parent frame should be able to open a popup upon
receiving either of these messages (but not both):

    // Parent frame code
    window.addEventListener("message", (e) => {
      if (e.data === "open_popup" && e.origin === child_origin)
        window.open("about:blank");
    });

    // Child frame code:
    someButton.addEventListener("click", () => {
      parent.postMessage("hi_there", parent_origin);
      parent.postMessage("open_popup", parent_origin);
    });

Without User Activation v2, the parent frame can't open a popup upon receiving
the second message.  Even the first message fails if it is "chained" to another
cross-origin frame (in other words, if the first receiver forwards the message
to another).

This works with User Activation v2, both in the original form and with the
chaining.  

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
