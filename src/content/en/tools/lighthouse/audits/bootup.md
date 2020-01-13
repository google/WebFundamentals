project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "JavaScript Bootup Time Is Too High" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2018-02-14 #}
{# wf_blink_components: N/A #}

# JavaScript Bootup Time Is Too High  {: .page-title }

## Overview {: #overview }

This audit measures the total impact of JavaScript on your page's load performance. JavaScript
can slow down your page in many ways:

* Network cost. More bytes equals longer download times.
* Parse and compile cost. JavaScript gets parsed and compiled on the main thread. When the
  main thread is busy, the page can't respond to user input.
* Execution cost. JavaScript is also executed on the main thread. If your page runs a lot of
  code before it's really needed, that also delays your [Time To Interactive][TTI], which
  is one of the key metrics related to how users perceive your page speed.
* Memory cost. If your JavaScript holds on to a lot of references, it can potentially consume a
  lot of memory. Pages appear janky or slow when they consume a lot of memory. Memory leaks
  can cause your page to freeze up completely.

See [JavaScript Start-Up Optimization][AO] by Addy Osmani for more data.

[AO]: /web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/
[TTI]: /web/tools/lighthouse/audits/time-to-interactive

## Recommendations {: #recommendations }

<blockquote>
  <b>Transmission size is critical for low-end networks. Parse time is important for
  CPU-bound devices. Keeping these low matters.</b> ---
  <cite><a href="/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/#conclusions">JavaScript Start-Up Optimization</a></cite>
</blockquote>

* Only send the code that your users need.
* Minify your code.
* Compress your code.
* Remove unused code.
* Cache your code to reduce network trips.

See [JavaScript Start-Up Optimization][N] by Addy Osmani for more guidance.

[N]: /web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/#network

## More information {: #more-info }

[Audit source][S]{:.external}

[S]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/bootup-time.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
