project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Say goodbye to shadow-piercing CSS selectors.

{# wf_updated_on: 2017-12-14 #}
{# wf_published_on: 2017-10-24 #}
{# wf_tags: webcomponents,shadowdom,style,css,deprecations,removals #}
{# wf_featured_image: /web/updates/images/generic/styles.png #}
{# wf_featured_snippet: Say goodbye to shadow-piercing CSS selectors. #}
{# wf_blink_components: Blink>DOM #}

<<../../_deprecation-blurb.md>>

# Removing ::shadow and /deep/ in Chrome 63 {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}

Starting in Chrome 63, you cannot use the shadow-piercing selectors `::shadow`
and `/deep/` to style content inside of a shadow root.

- The `/deep/` combinator will act as a descendant selector. `x-foo /deep/ div`
will work like `x-foo div`.
- The `::shadow` pseudo-element will not match any elements.

Note: If your site uses Polymer, the team has put together [a thorough guide](https://www.polymer-project.org/blog/2017-10-18-upcoming-changes.html)
walking through steps to migrate off of `::shadow` and `/deep/`.

## The decision to remove

The `::shadow` and `/deep/` were deprecated in Chrome version 45. This was
decided by all of the participants at the [April 2015 Web Components
meetup](https://www.w3.org/wiki/Webapps/WebComponentsApril2015Meeting).

The primary concern with shadow-piercing selectors is that they violate
encapsulation and create situations where a component can no longer change its
internal implementation.

Note: For the moment, `::shadow` and `/deep/` will continue to work with
JavaScript APIs like `querySelector()` and `querySelectorAll()`. Ongoing support
for these APIs is being [discussed on
GitHub](https://github.com/w3c/webcomponents/issues/78).

The [CSS Shadow Parts](https://tabatkins.github.io/specs/css-shadow-parts/) spec
is being advanced as an alternative to shadow piercing selectors. Shadow Parts
will allow a component author to expose named elements in a way that preserves
encapsulation and still allows page authors the ability to style multiple
properties at once.

## What should I do if my site uses ::shadow and /deep/?

The `::shadow` and `/deep/` selectors only affect legacy Shadow DOM v0
components. If you're using Shadow DOM v1, you should not need to change
anything on your site.

You can use [Chrome Canary](https://www.google.com/chrome/browser/canary.html)
to verify your site does not break with these new changes. If you notice issues,
try and remove any usage of `::shadow` and `/deep/`. If it's too difficult to
remove usage of these selectors, consider switching from native shadow DOM over
to the shady DOM polyfill. You should only need to make this change if your site
relies on native shadow DOM v0.

## More information

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/HX5Y8Ykr5Ns/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6750456638341120) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=489954)

{% include "comment-widget.html" %}
