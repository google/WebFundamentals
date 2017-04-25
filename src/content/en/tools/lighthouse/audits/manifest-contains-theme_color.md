project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains theme_color" Lighthouse audit.

{# wf_updated_on: 2017-04-25 #}
{# wf_published_on: 2016-09-21 #}

# Manifest Contains theme_color  {: .page-title }

## Why the audit is important {: #why }

When a user accesses your app on Chrome for Android, the `theme_color` property
of your Web App Manifest determines the color of the address bar. This takes
effect whether or not the user has added your app to the homescreen.

Note that the [Has A &lt;meta name="theme-color" Tag&gt;][theme-color] is
similar to this one. You may be wondering what the difference is between
`<meta name="theme-color">` and the `theme_color` manifest attribute. The
difference is that `<meta name="theme-color">` styles the browser UI even
when a user visits the page as a normal URL, whereas the manifest
`theme_color` attribute only takes effect when a user launches your app
from the homescreen.

[theme-color]: /web/tools/lighthouse/audits/theme-color

## How to pass the audit {: #how }

Add a `theme_color` property in your Web App Manifest. The value can be any
valid CSS color.

    {
      ...
      "theme_color": "cornflowerblue",
      ...
    }

Check out [Manifest Exists](manifest-exists#how)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Audit passes if the manifest contains a `theme_color` property.
The manifest that Lighthouse fetches is separate from the one that Chrome is
using on the page, which can possibly cause inaccurate results. Lighthouse does
not validate that the value is a valid CSS color.

{% include "web/tools/lighthouse/audits/_feedback/manifest-contains-theme_color.html" %}
