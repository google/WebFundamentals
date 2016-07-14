---
layout: shared/narrow
title: "Congratulations"
description: "Congratulations! You built a web app that enables Push Notifications."
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
translation_priority: 1
order: 12
authors:
  - samdutton
---

{% include shared/toc.liquid %}

Pat yourself on the back. You built a web app that enables Push Notifications!

## Frequently Asked Questions

* **My service worker didn't update!**<br>
Are you sure? Check the source tab in _chrome://serviceworker-internals_. If it
really didn't update, restart Chrome.

* **I tried everything, but my service worker's still not updating :^|**<br>
Did you check and validate your code? If your service worker code can't be
parsed, it won't install.

* **My request to GCM is failing**<br>
Check the project on [console.developers.google.com](https://console.developers.google.com/). Make sure that the _gcm\_sender\_id_ matches the Project Number and the Authorization
key value matches the API key. Make sure you're looking at the right project!

* **The request to GCM is working, but no push event is fired**<br>
Check the subscription ID from the console for _main.js_. Is the subscription
ID in the array of IDs for your request correctly? Make sure you you have the
messaging API enabled on
[console.developers.google.com](https://console.developers.google.com/).

* **I'm getting errors I don't understand**<br>
Try using Chrome Canary: this often gives more informative error messages about
service worker woes.

* **I'm not seeing console logs for events in my service worker**<br>
You'll only get installed and activated events the first time you use the
service worker or when the code is changed. The started event will only be fired
once for each service worker session.

* **What about Firefox?**<br>
[As of Firefox
42](https://groups.google.com/forum/#!topic/mozilla.dev.platform/BL6TrHN73dY) the Push API is turned on by default.

## What we've covered

* Install a service worker and handle events
* Set up a Google Cloud Messaging (GCM) account
* Add a web manifest
* Enable a service worker to handle push message events
* Send a request to GCM via cURL or XHR
* Display notifications
* Handle notification clicks

## Next Steps

* Service worker codelab (if you haven't already done it!)

## Learn More

* [Push Notifications on the Open
  Web](/web/updates/2015/03/push-notifications-on-the-open-web)
* [Google Cloud Messaging](https://developers.google.com/cloud-messaging/)
* [Best Practices for Push Notifications Permission
  UX](https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/edit)
* [Do's and Don'ts for
  Notifications](http://android-developers.blogspot.co.uk/2015/08/get-dos-and-donts-for-notifications.html)
* [Notifications
  guidelines](https://www.google.com/design/spec/patterns/notifications.html)
* [Service Worker
  API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
