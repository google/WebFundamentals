---
layout: shared/narrow
title: "What are the Criteria?"
description: "Chrome will automatically display the banner when your app meets the right criteria."
published_on: 2014-12-17
updated_on: 2016-03-01
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
  - a 144x144 png icon (the icon declarations must include a mime type of `image/png`)
  - a `start_url` that loads
* Has a [service worker](/web/fundamentals/primers/service-worker/)
  registered on your site.
* Is served over [HTTPS](/web/fundamentals/security/encrypt-in-transit/)
  (a requirement for using Service Worker).
* Is visited at least twice, with at least five minutes between visits.

## Testing the App Install Banner

The app install banner is only shown after the user has visited the page at least
twice within 5 minutes. You can disable the visit frequency check by enabling
the Chrome flag `#bypass-app-banner-engagement-checks`. You can also enable the
Chrome flag `#enable-add-to-shelf` to test on desktop Chrome.

Then, as long as you have a manifest (configured correctly), are on HTTPS (or `localhost`)
and have a service worker, you should see the install prompt.
