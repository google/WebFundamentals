project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest's short_name won't be truncated when displayed on homescreen" Lighthouse audit.

{# wf_updated_on: 2016-09-21 #}
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

Check out the [How to pass the audit section](manifest-exists#how) of the
"Manifest Exists" audit for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

## What the audit tests for {: #what }

*Use this information to determine if the audit is relevant to your needs
or is returning incorrect results.*

Lighthouse fetches the manifest and verifies that the `short_name` property is
less than 12 characters. Note that since the `name` property can be used as a
fallback for `short_name`, Lighthouse also tests this property as a fallback.
So, if you don't include a `short_name` in your manifest, but your `name` is
less than 12 characters, then the audit passes. The manifest that Lighthouse
fetches is separate from the one that Chrome is using on the page, which can
possibly cause inaccurate results.
