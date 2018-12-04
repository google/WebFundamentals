project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains short_name" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2016-09-21 #}
{# wf_blink_components: N/A #}

# Manifest Contains short_name  {: .page-title }

## Overview {: #overview }

After a user adds your app to the homescreen, the `short_name` is the text that
is displayed on the homescreen next to your app icon. In general, it is used
wherever there is insufficient space to display the full name of your app.

## Recommendations {: #recommendations }

Add a `short_name` property in your Web App Manifest.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

Chrome's [maximum recommended
length](https://developer.chrome.com/apps/manifest/name#short_name) is 12
characters.

Check out [Manifest Exists](manifest-exists#recommendations)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

## More information {: #more-info }

Audit passes if the manifest contains either `short_name` or `name` property.
The manifest that Lighthouse fetches is separate from the one that Chrome is
using on the page, which can possibly cause inaccurate results.


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
