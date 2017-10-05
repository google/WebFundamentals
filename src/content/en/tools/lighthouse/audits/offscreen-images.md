project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Offscreen Images" Lighthouse audit.

{# wf_updated_on: 2017-05-31 #}
{# wf_published_on: 2017-05-31 #}

# Offscreen Images  {: .page-title }

## Why the audit is important {: #why }

Offscreen images are images that appear [below the fold][BTF]. Since users can't
see offscreen images when they load a page, there's no reason to download the
offscreen images as part of the initial page load. In other words, deferring the
load of offscreen images can speed up page load time and time to interactive.

[BTF]: https://en.wikipedia.org/wiki/Above_the_fold#Below_the_fold

## How to pass the audit {: #how }

To pass this audit, refactor your pages to only download above-the-fold images
during the initial request. Applying this strategy to your JS, HTML, CSS, and
other resources can also speed up page load time. See [Critical Rendering
Path][CRP] to learn more.

[CRP]: /web/fundamentals/performance/critical-rendering-path/

Consider using an [IntersectionObserver][IO] to intelligently determine when to
lazy-load offscreen images. For example, suppose you have some images at the
bottom of a very long page. With an IntersectionObserver, you can load the
images only when the user has scrolled halfway down the page. See [Intersect
all the things!][IATT] for more on this approach.

[IATT]: /web/updates/2016/04/intersectionobserver#intersect_all_the_things
[IO]: https://developers.google.com/web/updates/2016/04/intersectionobserver

If you do use an IntersectionObserver, make sure to include the
[polyfill][polyfill], because native browser support is limited.

[polyfill]: https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse flags offscreen images that were requested before the
Time To Interactive (TTI) event.

{% include "web/tools/lighthouse/audits/_feedback/offscreen-images.html" %}
