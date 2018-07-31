project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: You won't be able to build a PWA without HTTPS. Serving your site over HTTPS is fundamental for security, and many APIs won't work without it. If you need to justify implementation costs, find out why HTTPS matters.

{# wf_updated_on: 2017-07-25 #}
{# wf_published_on: 2015-03-20 #}
{# wf_blink_components: Blink>JavaScript #}

# Check site security {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}


### TL;DR {: .hide-from-toc }

* Avoid setTimeout or setInterval for visual updates; always use requestAnimationFrame instead.
* Move long-running JavaScript off the main thread to Web Workers.
* Use micro-tasks to make DOM changes over several frames.
* Use Chrome DevTools’ Timeline and JavaScript Profiler to assess the impact of JavaScript.

## Second level head


    /**
     * Some
     * code.
     */
    function func(arg) {
      // Blah
    }

    foo(bar);


<img src="images/optimize-javascript-execution/settimeout.jpg" alt="An image">
