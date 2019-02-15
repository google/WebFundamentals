project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to pass the "Tap targets are not sized appropriately" Lighthouse audit.

{# wf_updated_on: 2019-02-15 #}
{# wf_published_on: 2019-02-15 #}
{# wf_blink_components: Platform>DevTools #}

# Tap targets are not sized appropriately {: .page-title }

## Overview {: #overview }

[webmasters]: https://webmasters.googleblog.com/2015/04/rolling-out-mobile-friendly-update.html
[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#Value

Tap targets are interactive elements, like buttons or links, that users frequently tap.
Appropriately-sized tap targets make pages more mobile-friendly and accessible. Google Search
started boosting the ranking of mobile-friendly pages on mobile search results back in 2015.
See [Rolling out the mobile-friendly update][webmasters].

A tap target is inappropriately-sized when its bounding rectangle is less than 48 pixels. 48
pixels is about the size of a human finger. Any target smaller than a finger requires a
lot of precision to tap. The bounding rectangle is the target's `width` (or `height`) +
`padding` + `border` + `margin`. Both of the icons in **Figure 2** are appropriately-sized.

<figure>
  <img src="/web/fundamentals/accessibility/imgs/touch-target.jpg"
       alt="Appropriately-sized tap targets"/>
  <figcaption>
    <b>Figure 1</b>. Appropriately-sized tap targets
  </figcaption>
</figure>

A tap target is also inappropriately-sized when there's another tap target less than 8 pixels
away from it in any direction. This is referred to as overlapping. When tap targets overlap,
it increases the chances that a user will tap the wrong target by mistake.

## Recommendations {: #recommendations }

To pass this audit, increase the width and height of each tap target's bounding rectangle to
at least 48 pixels each, and put at least 8 pixels of spacing between each tap target. Remember
that the bounding rectangle is `width` (or `height`) + `padding` + `border` + `margin`. A target
is appropriately-sized once the sum of these 4 properties exceeds 48 pixels.

Click the audit to see which tap targets are causing the audit to fail. The **Tap Target** column
tells you which tap target is inappropriately-sized. The **Size** column tells you the size of
the target's bounding rectangle, in pixels. The **Overlapping Target**
column tells you which other tap target is too close.

<figure>
  <img src="/web/tools/lighthouse/audits/images/tap-targets.png"
       alt="The tap targets audit"/>
  <figcaption>
    <b>Figure 2</b>. The tap targets audit
  </figcaption>
</figure>

## More information {: #more-info }

Sources:

* [Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/tap-targets.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
