project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Render-blocking stylesheets" and "Render-blocking scripts" Lighthouse audits.

{# wf_updated_on: 2018-12-17 #}
{# wf_published_on: 2016-12-01 #}
{# wf_blink_components: N/A #}

# Render-Blocking Resources {: .page-title }

## Overview {: #overview }

Fast page loads result in higher user engagement, more pageviews, and
improved conversion.

You can improve your page load speed by inlining links and scripts that
are required for first paint, and deferring those that aren't.

## Recommendations {: #recommendations }

In your report, Lighthouse lists all of the render-blocking links or scripts
that it has detected. The goal is to reduce this number.

Lighthouse flags three types of render-blocking links: scripts, stylesheets, and HTML
imports. How you optimize depends on what type of resource you're working with.

Note: When a resource is referred to as "critical" below, it means that the
resource is required for first paint or is crucial to the page's core
functionality.

[addy]: https://github.com/addyosmani/critical/

* For critical scripts, consider inlining them in your HTML. For non-critical
  scripts, consider marking them with the `async` or `defer` attributes.
  See [Adding Interactivity with JavaScript][js] to learn more.
* For stylesheets, consider splitting up your styles into different files,
  organized by media query, and then adding a `media` attribute to each
  stylesheet link. When loading a page, the browser only blocks the first
  paint to retrieve the stylesheets that match the user's device. See
  [Render-Blocking CSS][css] to learn more. Build tools like [critical][addy] can help you
  extract and inline critical CSS.
* For non-critical HTML imports, mark them with the `async` attribute. As a
  general rule, `async` should be used with HTML imports as much as possible.

[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

### Identify render-blocking code {: #coverage }

Use the [Coverage](/web/updates/2017/04/devtools-release-notes#coverage) tab in Chrome
DevTools to identify non-critical CSS and JS.

<figure>
  <img src="/web/updates/images/2017/04/coverage.png"
       alt="The Coverage tab."/>
  <figcaption>
    <b>Figure 1</b>. The Coverage tab
  </figcaption>
</figure>

## More information {: #more-info }

Lighthouse identifies three types of blocking resources.

A `<script>` tag that:

* Is in the `<head>` of the document.
* Does not have a `defer` attribute.
* Does not have an `async` attribute.

A `<link rel="stylesheet">` tag that:

* Does not have a `disabled` attribute. When this attribute is present,
  some browsers do not download the stylesheet. Note that this attribute is not
  supported in all browsers.
* Does not have a `media` attribute that matches the user's device.

A `<link rel="import">` tag that:

* Does not have an `async` attribute.

[Audit source](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/render-blocking-resources.js){: .external }

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
