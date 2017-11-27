project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Manifest Contains Icons at Least 192px" Lighthouse audit.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# Manifest Contains Icons at Least 192px  {: .page-title }

## Why the audit is important {: #why }

When a user adds your app to the homescreen, the mobile device needs an icon to
display. That icon is specified in the `icons` array of the Web App Manifest.

The presence of a 192-pixel icon ensures that your icon displays well on the
largest Android devices. For smaller devices that need a smaller icon, Android
can scale down the 192-pixel icon with reasonable accuracy. In other words,
although you can provide smaller-sized icons in your Web App Manifest, it's
unnecessary.

## How to pass the audit {: #how }

Add a 192-pixel icon to your Web App Manifest.

    {
      ...
      "icons": [{
        "src": "images/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
      }],
      ...
    }

Check out [Manifest Exists](manifest-exists#how)
for a list of guides that teach you how to properly
implement and test "Add to Homescreen" support in your app.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

This audit can only guarantee that your icon displays well on Android devices.
Other operating systems may require a different icon size for optimal
presentation.

Lighthouse fetches the manifest and verifies that the `icons` property
references a 192-pixel icon. The manifest that Lighthouse fetches is
separate from the one that Chrome is using on the page, which can possibly
cause inaccurate results. Note also that Lighthouse does not check whether
the icon actually exists in the cache. It just makes sure that the Web App
Manifest defines a 192-pixel icon.


{% include "web/tools/lighthouse/audits/_feedback/manifest-contains-192px-icon.html" %}
