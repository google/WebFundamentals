project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Has A &lt;meta name="viewport"&gt; Tag With width Or initial-scale" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-10-04 #}

# Has A Viewport Meta Tag With width Or initial-scale {: .page-title }

## Why the audit is important {: #why }

Without a viewport meta tag, mobile devices render pages at typical desktop
screen widths, and then scale the pages to fit the mobile screens. Setting
the viewport enables you to control the width and scaling of the viewport.
Check out the following links to learn more:

* [Configure the Viewport](/speed/docs/insights/ConfigureViewport)
* [Set the Viewport](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)

## How to pass the audit {: #how }

Add a viewport `<meta>` tag in the `<head>` of your HTML.

    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ...
    </head>

The `width=device-width` key-value pair sets the width of the viewport to
the width of the device. The `initial-scale=1` key-value pair sets the initial
zoom level when visiting the page.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse checks that there's a `<meta name="viewport">` tag in the `<head>`
of the document. It also checks that the node contains a `content` attribute
and that the value of this attribute contains the text `width=`. However,
it does not check that `width` equals `device-width`. Lighthouse also does not
check for a `initial-scale` key-value pair.


{% include "web/tools/lighthouse/audits/_feedback/has-viewport-meta-tag.html" %}
