project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest's short_name won't be truncated when displayed on homescreen" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-09-21 #}

# Manifest's short_name Won't Be Truncated When Displayed on Homescreen {: .page-title }

## Why the audit is important {: #why }

When a user adds your web app to the homescreen, the `short_name` property is
displayed as the label next to your app's icon. If the `short_name` is longer
than 12 characters, it'll be truncated on the homescreen.

Note that, if the `short_name` is not present, Chrome can fall back to the
`name` property if it's short enough.

## How to pass the audit {: #how }

Make the `short_name` property in your Web App Manifest less than 12 characters.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

Or, if you don't specify a `short_name` property in your manifest, make the
`name` property less than 12 characters.

Check out [Manifest Exists](manifest-exists#how)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse fetches the manifest and verifies that the `short_name` property is
less than 12 characters. Note that since the `name` property can be used as a
fallback for `short_name`, Lighthouse also tests this property as a fallback.
So, if you don't include a `short_name` in your manifest, but your `name` is
less than 12 characters, then the audit passes. The manifest that Lighthouse
fetches is separate from the one that Chrome is using on the page, which can
possibly cause inaccurate results.


{% include "web/tools/lighthouse/audits/_feedback/manifest-short_name-is-not-truncated.html" %}
