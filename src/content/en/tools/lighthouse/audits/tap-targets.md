project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to pass the "Tap targets are not sized appropriately" Lighthouse audit.

{# wf_updated_on: 2019-03-07 #}
{# wf_published_on: 2019-03-07 #}
{# wf_blink_components: Platform>DevTools #}

# Tap targets are not sized appropriately {: .page-title }

## Overview {: #overview }

[webmasters]: https://webmasters.googleblog.com/2015/04/rolling-out-mobile-friendly-update.html
[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#Value

Tap targets are interactive elements, like buttons or links, that users frequently tap.
Appropriately-sized tap targets make pages more mobile-friendly and accessible. Google Search
started boosting the ranking of mobile-friendly pages on mobile search results back in 2015.
See [Rolling out the mobile-friendly update][webmasters].

A tap target is inappropriately-sized when it's too small, or too close to other tap targets.

## Recommendations {: #recommendations }

To pass this audit:

* Increase the size of the failing tap targets. Tap targets that are 48 pixels wide
  and 48 pixels tall never fail.

    <figure>
      <img src="/web/fundamentals/accessibility/imgs/touch-target.jpg"
           alt="Appropriately-sized tap targets"/>
      <figcaption>
        <b>Figure 1</b>. Appropriately-sized tap targets
      </figcaption>
    </figure>

* Increase the spacing between tap targets, using properties such as `padding` or `margin`.
  There should be at least 8 pixels of space between tap targets. In practice Lighthouse provides
  some leniency on the size, so tap targets as small as 40 pixels by 40 pixels usually pass.

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


[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/tap-targets.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
