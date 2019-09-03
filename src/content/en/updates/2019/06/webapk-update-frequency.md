project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Starting in Chrome 76, WebAPKs will be updated more frequently.

{# wf_published_on: 2019-06-13 #}
{# wf_updated_on: 2019-07-25 #}
{# wf_featured_image: /web/updates/images/2019/06/webapk.png #}
{# wf_tags: chrome76,mobile,install,addtohomescreen,progressive-web-apps,webapk #}
{# wf_featured_snippet: When a Progressive Web App is installed on Android, Chrome automatically requests and installs a WebAPK of your app. Starting in Chrome 76, Chrome will check for updates more frequently, ensuring icons, titles, colors, and other key properties to rolled out to your users faster. #}
{# wf_blink_components: Mobile>WebAPKs #}

# Updating WebAPKs More Frequently {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

When a Progressive Web App is installed on Android, Chrome automatically
requests and installs a [WebAPK][webapk] of your app. Being installed via an
APK makes it possible for your app to show up in the app launcher, in
Android's app settings and to register a set of intent filters.

<aside class="note">
  Chrome periodically checks to see if the manifest has changed, and if a new
  WebAPK is required. <b>Starting in Chrome 76 (July 2019), Chrome will check
  the manifest more frequently: checking every 1 day, instead of every 3
  days.</b> If any of the key properties have changed, Chrome will request
  and install a new WebAPK.
</aside>

## Chrome 76 and later

Chrome checks for updates either every **1 day** or every 30 days. Checking for
updates every day happens the large majority of the time. It switches to
the 30 day interval in unlikely cases where the update server cannot provide
an update.

### Hypothetical update check for Chrome 76 and later

* **January 1**: Install WebAPK
* **January 1**: Launch WebAPK → No update check (0 days have passed)
* **January 2**: Launch WebAPK → Check whether update is needed (1 day has passed)
* **January 4**: Launch Chrome → No update check (Launching Chrome has no effect)
* **January 4**: Launch WebAPK → Check whether update is needed (1+ days have passed)
* **January 6**: Clear Chrome's data in Android settings
* **January 9**: Launch WebAPK → No update check (From Chrome's perspective this
  is the first WebAPK launch)
* **January 10**: Launch WebAPK → Check whether update is needed (1 day has passed)

## Chrome 75 and earlier

Chrome checks for updates either every **3 days** or every 30 days. Checking for
updates every 3 days happens the large majority of the time. It switches to
the 30 day interval in unlikely cases where the update server cannot provide
an update.

### Hypothetical update check for Chrome 75 and earlier

* **January 1**: Install WebAPK
* **January 1**: Launch WebAPK → No update check (0 days have passed)
* **January 2**: Launch WebAPK → No update check (1 day has passed)
* **January 4**: Launch Chrome → No update check (Launching Chrome has no effect)
* **January 4**: Launch WebAPK → Check whether update is needed (3+ days have passed)
* **January 6**: Clear Chrome's data in Android settings
* **January 9**: Launch WebAPK → No update check (From Chrome's perspective this
  is the first WebAPK launch)
* **January 12**: Launch WebAPK → Check whether update is needed (3+ days have passed)

## Further reading

For complete details, including additional triggers that cause Chrome to check
the manifest, and potentially request and install a new WebAPK, refer to the
[Updating the WebAPK][webapk-update] section of the [WebAPK][webapk]
docs.

[webapk]: /web/fundamentals/integration/webapks
[webapk-update]: /web/fundamentals/integration/webapks#update-webapk

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
