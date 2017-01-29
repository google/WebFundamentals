project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains background_color" Lighthouse audit.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifest Contains Background Color  {: .page-title }

## Why the audit is important {: #why }

When your web app is loading from a user's homescreen, the browser uses the
`background_color` property to draw the background color of the browser while
the app loads. This creates a smooth transition between launching the app and
loading the app's content.

## How to pass the audit {: #how }

Add a `background_color` property in your Web App Manifest. The value can be any
valid CSS color.

    {
      ...
      "background_color": "cornflowerblue",
      ...
    }

Check out [Manifest Exists](manifest-exists#how)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Audit passes if the manifest contains a `background_color` property.
The manifest that Lighthouse fetches is separate from the one that Chrome is
using on the page, which can possibly cause inaccurate results. Lighthouse does
not validate that the value is a valid CSS color.
