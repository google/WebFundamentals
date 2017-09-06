project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Hiding the URL bar no longer resizes mobile pages.

{# wf_updated_on: 2016-12-16 #}
{# wf_published_on: 2016-12-16 #}
{# wf_tags: chrome56,android,ux #}
{# wf_featured_image: /web/updates/images/generic/quilt.png #}
{# wf_featured_snippet: Hiding the URL bar no longer resizes mobile pages. #}

# URL Bar Resizing {: .page-title }

{% include "web/_shared/contributors/bokan.html" %}

The resizing behavior of the URL bar is changing in Chrome on Android starting
in version 56. Here's what you should know:

Lengths defined in viewport units (i.e. `vh`) will not resize in response
to the URL bar being shown or hidden. Instead, `vh` units will be sized to the
viewport height as if the URL bar is always hidden. That is, `vh` units will be
sized to the "largest possible viewport". This means `100vh` will be larger
than the visible height when the URL bar is shown.

The Initial Containing Block (ICB) is the root containing block used when
sizing elements relative to their parents. For example, giving the `<html>`
element a style of `width: 100%; height: 100%` will make it the same size as
the ICB. With this change, the ICB will not resize when the URL bar is hidden.
Instead, it will remain the same height, as if the URL bar were always showing
("smallest possible viewport"). This means an Element sized to the ICB height
will not completely fill the visible height while the URL bar is hidden.

There is one exception to the above changes and that is for elements that are
`position: fixed`. Their behavior remains unchanged. That is, a `position:
fixed` element whose containing block is the ICB will resize in response to the
URL bar showing or hiding. For example, if its height is `100%` it will always fill
exactly the visible height, whether or not the URL bar is shown. Similarly for
`vh` lengths, they will also resize to match the visible height taking the URL
bar position into account.

There are a few reasons for this change:

* Usable `vh` units on mobile. Prior to this, using `vh`
units meant a page would reflow jarringly everytime the user changed scroll
direction.

* Improved user experience. If a page reflows while the user is reading they
may lose their relative location in the document. This is frustrating but also
incurs additional processor usage and battery drain to relayout and repaint
the page.

* Improved interoperability with Safari on iOS. The new model should match how
Safari behaves, making life easier for web developers. The unintuitive choice
of making `vh` units the largest possible viewport but the ICB the smallest
possible is to match Safari's behavior.

## Demo
* Here's a [demonstration](https://googlechrome.github.io/samples/image-capture/index.html).
The four bars on the right of the page are all possible combinations of `99%`,
`99vh`, `position:fixed` and `position:absolute` provided on a scrollable page.
Hiding the URL bar shows how it affects each. Resize events are printed down
the page.

## Support
* Chrome 56 on Android.

{% include "comment-widget.html" %}
