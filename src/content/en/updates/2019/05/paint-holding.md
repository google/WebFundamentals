project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A quick overview of paint holding. A Chrome feature for reducing the flash of white on same-origin navigations

{# wf_updated_on: 2019-05-24 #}
{# wf_published_on: 2019-05-06 #}
{# wf_tags: performance, chrome76 #}
{# wf_blink_components: Blink,Internals>Network #}
{# wf_featured_image: /web/updates/images/generic/visibility.png #}
{# wf_featured_snippet: A quick overview of paint holding. A Chromium feature for reducing the flash of white on same-origin navigations #}

# Paint Holding - reducing the flash of white on same-origin navigations {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

For a while now, Chrome has eagerly cleared the screen when transitioning to a
new page to give users the reassurance that the page is loading. This "flash of
white" is this brief moment during which the browser shows a white paint while
loading a page. This can be distracting in-between navigations, especially when
the page is reasonably fast in reaching a more interesting state.

But for pages that load lightning fast, this approach is actually detrimental
to the user experience. In the following animation, you see an example of what
this looks like today. 

<video autoplay loop muted playsinline width="600"
poster="../../images/2019/05/paint-holding-poster.jpg">
<source src="../../images/2019/05/paint-holding.mp4" type="video/mp4">
<source src="../../images/2019/05/paint-holding.webm" type="video/webm">
</video>

We are big fans of this website and it kills us that their quality experience
has a flash of white, and we wanted to fix it. We did so with a new behavior
that we're calling Paint Holding, where the browser waits briefly before
starting to paint, especially if the page is fast enough. This ensures that the
page renders as a whole delivering a truly instant experience.

The way this works is that we defer compositor commits until a given page load
signal (PLS) (e.g. first contentful paint / fixed timeout) is reached. We
distinguish between main-thread rendering work and commit to the impl thread
(only the latter is deferred). Waiting until a PLS occurs reduces likelihood of
flashes of white/solid-color.

Our goal with this work was for navigations in Chrome between two pages that
are of the same origin to be seamless and thus deliver a fast default navigation
experience with no flashes of white/solid-color background between old and new
content.

Try Paint Holding in Chrome Canary (Chrome 76) and let us know what you think.
Developers shouldn't have to worry about making any modifications to their
pages to take advantage of it.


{% include "web/_shared/rss-widget-updates.html" %}
