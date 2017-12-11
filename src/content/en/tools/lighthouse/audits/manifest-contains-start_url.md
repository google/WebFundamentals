project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains start_url" Lighthouse audit.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifest Contains Start URL  {: .page-title }

## Why the audit is important {: #why }

After your web app has been added to a user's homescreen, the `start_url`
property in the Web App Manifest determines what page of your app loads first
when the user launches your app from the homescreen.

If the `start_url` property is absent, then the browser defaults to whatever
page was active when the user decided to add the app to the homescreen.

## How to pass the audit {: #how }

Add a `start_url` property in your Web App Manifest.

    {
      ...
      "start_url": ".",
      ...
    }

Check out [Manifest Exists](manifest-exists#how)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse fetches the manifest and verifies that it has a `start_url` property.
The manifest that Lighthouse fetches is separate from the one that Chrome is
using on the page, which can possibly cause inaccurate results.


{% include "web/tools/lighthouse/audits/_feedback/manifest-contains-start_url.html" %}
