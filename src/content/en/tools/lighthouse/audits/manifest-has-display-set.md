project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest's display Property Is Set" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2016-09-21 #}
{# wf_blink_components: N/A #}

# Manifest's display Property Is Set  {: .page-title }

## Overview {: #overview }

When your app is launched from the homescreen, you can use the `display`
property in your Web App Manifest to specify the display mode for the app.

## Recommendations {: #recommendations }

Add a `display` property to your Web App Manifest and set it to one of the
following values: `fullscreen`, `standalone`, or `browser`.

    {
      ...
      "display": "fullscreen",
      ...
    }

See [MDN's reference for the display
property](https://developer.mozilla.org/en-US/docs/Web/Manifest#display) for
more information on each of these values.

Check out [Manifest Exists](manifest-exists#recommendations)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

## More information {: #more-info }

Lighthouse fetches the manifest and verifies that the `display` property
exists and that it's value is `fullscreen`, `standalone`, or `browser`.

The manifest that Lighthouse fetches is separate from the one that Chrome
is using on the page, which can possibly cause inaccurate results.


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
