project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Render-blocking stylesheets" and "Render-blocking scripts" Lighthouse audits.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-12-01 #}

# Render-Blocking Resources {: .page-title }

## Why the audit is important {: #why }

Fast page loads result in higher user engagement, more pageviews, and
improved conversion.

You can improve your page load speed by inlining links and scripts that
are required for first paint, and deferring those that aren't.

## How to pass the audit {: #how }

In your report, Lighthouse lists all of the render-blocking links or scripts
that it has detected. The goal is to reduce this number.

As mentioned in [How the audit is implemented](#implementation), Lighthouse
flags three types of render-blocking links: scripts, stylesheets, and HTML
imports. How you optimize depends on what type of resource you're working with.

Note: When a resource is referred to as "critical" below, it means that the
resource is required for first paint or is crucial to the page's core
functionality.

* For critical scripts, consider inlining them in your HTML. For non-critical
  scripts, consider marking them with the `async` or `defer` attributes.
  See [Adding Interactivity with JavaScript][js] to learn more.
* For stylesheets, consider splitting up your styles into different files,
  organized by media query, and then adding a `media` attribute to each
  stylesheet link. When loading a page, the browser only blocks the first
  paint to retrieve the stylesheets that match the user's device. See
  [Render-Blocking CSS][css] to learn more.
* For non-critical HTML imports, mark them with the `async` attribute. As a
  general rule, `async` should be used with HTML imports as much as possible.

[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse identifies three types of blocking resources.

A `<script>` tag that:

* Is in the `<head>` of the document.
* Does not have a `defer` attribute.
* Does not have an `async` attribute.

A `<link rel="stylesheet">` tag that:

* Does not have a `disabled` attribute. When this attribute is present,
  the browser does not download the stylesheet.
* Does not have a `media` attribute that matches the user's device.

A `<link rel="import">` tag that:

* Does not have an `async` attribute.


{% include "web/tools/lighthouse/audits/_feedback/blocking-resources.html" %}
