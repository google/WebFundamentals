---
layout: shared/narrow
title: "Add a manifest"
description: "Add a manifest file to provide configuration for Push Notifications."
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 1
order: 5
authors:
  - samdutton
---

{% include shared/toc.liquid %}

A completed version of this step is in the completed/step5 directory.

A manifest is a JSON file that provides information about your web app, including Push Notifications configuration.

## 1. Create a manifest file

At the top level of your _app_ directory, create a file named
_manifest.json_ (you can give it any name you like).

Include the following code. The _gcm\_sender\_id_ value should be the
Project Number you saved earlier:

{% highlight json %}
{
  "name": "Push Notifications codelab",
  "gcm_sender_id": "593836075156"
}
{% endhighlight %}

There are lots more useful options for web manifests, such as setting an app icon and enabling Add to home screen on mobile.

Find out more from the Web Fundamentals article [Installable Web Apps](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android).

## 2. Tell the browser where to find the manifest for your web app

Add the following to the head element in the _index.html_ file you created earlier:

{% highlight html %}
<link rel="manifest" href="manifest.json">
{% endhighlight %}
