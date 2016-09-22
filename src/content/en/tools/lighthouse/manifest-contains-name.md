project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains name" Lighthouse audit.

{# wf_updated_on: 2016-09-21 #}
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

Check out the [How to pass the audit section](manifest-exists#how) of the
"Manifest Exists" audit for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

## What the audit tests for {: #what }

*Use this information to determine if the audit is relevant to your needs
or is returning incorrect results.*

Lighthouse fetches the manifest and verifies that it has a `name` property.
The manifest that Lighthouse fetches is separate from the one that Chrome is
using on the page, which can possibly cause inaccurate results.
