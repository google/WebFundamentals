project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Scrolling responsiveness is critical to the user's engagement with a website on mobile, yet wheel event listeners often cause serious scrolling performance problems. Learn how we are helping users and developers to be fast by default.

{# wf_updated_on: 2019-09-14 #}
{# wf_published_on: 2019-02-07 #}
{# wf_tags: interventions,chrome73 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: Scrolling responsiveness is critical to the user's engagement with a website on mobile, yet <code>wheel</code> event listeners often cause serious scrolling performance problems. Learn how we are helping users and developers to be fast by default. #}
{# wf_blink_components: N/A #}

# Making wheel scrolling fast by default {: .page-title }

{% include "web/_shared/contributors/sahel.html" %}

To improve `wheel` scrolling/zooming performance, developers are encouraged to
register `wheel` and `mousewheel` [event listeners as
passive](/web/updates/2016/06/passive-event-listeners)
by passing the `{passive: true}` option to `addEventListener()`. Registering
the event listeners as passive tells the browser that the wheel listeners will
not call `preventDefault()` and the browser can safely perform scrolling and
zooming without blocking on the listeners.

The problem is that most often the wheel event listeners are conceptually
passive (do not call `preventDefault()`) but are not explicitly specified as
such, requiring the browser to wait for the JS event handling to finish before
it starts scrolling/zooming even though waiting is not necessary. In Chrome 56,
[we fixed this issue for `touchstart` and `touchmove`](/web/updates/2017/01/scrolling-intervention),
and that change was later adopted by both Safari and Firefox. As you can see
from the demonstration video we made at that time, leaving the behavior as it
was produced a noticeable delay in scroll response. Now in Chrome 73, we've
applied the same intervention to `wheel` and `mousewheel` events.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="65VMej8n23A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## The Intervention

Our goal with this change is to reduce the time it takes to update the display
after the user starts scrolling by wheel or touchpad without developers needing
to change code. Our metrics show that 75% of the `wheel` and `mousewheel` event
listeners that are registered on root targets (window, document, or body) do
not specify any values for the passive option and more than 98% of such
listeners do not call `preventDefault()`. In Chrome 73, we are changing the
`wheel` and `mousewheel` listeners registered on root targets (window,
document, or body) to be passive by default. It means that an event listener
like:

```js
window.addEventListener("wheel", func);
```

becomes equivalent to:

```js
window.addEventListener("wheel", func, {passive: true});
```

And calling `preventDefault()` inside the listener will be ignored with the
following DevTools warning:

    [Intervention] Unable to preventDefault inside passive event listener due
    to target being treated as passive. See https://www.chromestatus.com/features/6662647093133312

## Breakage and Guidance

In the vast majority of cases, no breakage will be observed. Only in rare cases
(less than 0.3% of pages according to our metrics), unintended scrolling/zooming
might happen due to the `preventDefault()` call getting ignored inside the
listeners that are treated as passive by default. Your application can
determine whether it may be hitting this in the wild by checking if calling
`preventDefault()` had any effect via the `defaultPrevented` property. The fix
for the affected cases is relatively easy: pass `{passive: false}` to
`addEventListener()` to override the default behavior and preserve the event
listener as blocking.

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
