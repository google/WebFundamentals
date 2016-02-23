---
layout: shared/narrow
title: "What are the Criteria?"
description: "Chrome will automatically display the banner when your app meets the right criteria."
published_on: 2014-12-17
updated_on: 2016-02-12
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 2
---

Chrome will automatically display the banner when your app meets the following
criteria:

* Has a [web app manifest](.) file with:
  - a `short_name` (used on the home screen)
  - a `name` (used in the banner)
  - a 144x144 png icon (the icon declarations must include a mime type of `image/png`).
* Has a [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
  registered on your site.
* Is served over [HTTPS](/web/fundamentals/security/encrypt-in-transit/) (you
  need a service worker after all).
* Is visited by the user twice within 5 minutes

## Testing the App Install Banner

The app install banner is only shown after the user has visited the page at least twice over two
different days, making testing difficult. You can disable the visit frequency check by enabling
the Chrome flag `#bypass-app-banner-engagement-checks`.

Then, as long as you have a manifest (configured correctly), are on HTTPS and have a service worker,
you should see the install prompt.

