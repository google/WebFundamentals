project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains background_color" Lighthouse audit.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifest Contains background_color  {: .page-title }

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

Check out the [How to pass the audit section](manifest-exists#how) of the
"Manifest Exists" audit for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

## What the audit tests for {: #what }

*Use this information to determine if the audit is relevant to your needs
or is returning incorrect results.*

Audit passes if the manifest contains a `background_color` property.
The manifest that Lighthouse fetches is separate from the one that Chrome is
using on the page, which can possibly cause inaccurate results. Lighthouse does
not validate that the value is a valid CSS color.
