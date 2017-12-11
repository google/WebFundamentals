project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains name" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-09-21 #}

# Manifest Contains name  {: .page-title }

## Why the audit is important {: #why }

The `name` property of the Web App Manifest is a human-readable name of your
application as it is intended to be displayed to the user's mobile device.

If a `short_name` is not provided, then the `name` is the label that will be
used on the mobile device's homescreen, next to your app's icon.

## How to pass the audit {: #how }

Add a `name` property in your Web App Manifest.

    {
      ...
      "name": "Air Horner",
      ...
    }

Chrome's [maximum
length](https://developer.chrome.com/apps/manifest/name) is 45 characters.

Check out [Manifest Exists](manifest-exists#how)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse fetches the manifest and verifies that it has a `name` property.
The manifest that Lighthouse fetches is separate from the one that Chrome is
using on the page, which can possibly cause inaccurate results.


{% include "web/tools/lighthouse/audits/_feedback/manifest-contains-name.html" %}
