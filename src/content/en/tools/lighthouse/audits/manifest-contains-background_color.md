project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains background_color" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2016-09-21 #}
{# wf_blink_components: N/A #}

# Manifest Contains background_color  {: .page-title }

## Overview {: #overview }

When your web app is loading from a user's homescreen, the browser uses the
`background_color` property to draw the background color of the browser while
the app loads. This creates a smooth transition between launching the app and
loading the app's content.

## Recommendations {: #recommendations }

Add a `background_color` property in your Web App Manifest. The value can be any
valid CSS color.

    {
      ...
      "background_color": "cornflowerblue",
      ...
    }

Check out [Manifest Exists](manifest-exists#recommendations)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

## More information {: #more-info }

Audit passes if the manifest contains a `background_color` property.
The manifest that Lighthouse fetches is separate from the one that Chrome is
using on the page, which can possibly cause inaccurate results. Lighthouse does
not validate that the value is a valid CSS color.


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
