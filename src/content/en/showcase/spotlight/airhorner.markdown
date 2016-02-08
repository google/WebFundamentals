---
layout: showcase/spotlight
title: "Airhorner.com"
description: "A simple airhorn."
published_on: 2015-10-16
updated_on: 2015-10-16
authors:
  - paulkinlan
tags: 
  - airhorn
featured_image: images/airhorner/card.jpg
showcase:
  key_image: images/airhorner/screenshot.png
  scores:
    pagespeed:
      speed: 97
      ux: 100
    webpagetest:
      value: 1590
      result: http://www.webpagetest.org/result/151016_D7_MK5/
  link: https://airhorner.com/
  developer: Paul Kinlan
  our_views:
    good: |
      There is a little bit of bias here, the author of this post wrote the app.  But in summary, it is installable and works offline.
    bad: |
      Is the fact that it is incredibly annoying not enough?
  interview:
    - question: Why the web?
      answer: |
        I built this app because I wanted to show users and developers that not every single app needs to be a native app, and for an experience
        such as this where it is only meant to be used once in while, but feel like it should be installed. The web is an ideal distribution platform for this.
    - question: Are you worried that service worker is not yet in all browsers?
      answer: |
        No. I made this app to load quickly irrespective of the browser being used, service worker for installability and
        offline is an added bonus that should delight users. My thought at the time was that if a user adds this app to the
        home screen then it *must* work where ever the user is irrespective of the conncetivity.
    - question: If you could have any API to improve your app, what would it be?
      answer: |
        **Web Intents** but everyone knows that.  Actually, Web Intents wouldn't have been useful for this app.  One area
        that I would love to see expanded is Payments, I could quite easily see that having a quick way to buy new
        sounds etc would be quite nice.

related-guides:
-
    title: "Web App Manifest"
    href: fundamentals/engage-and-retain/simplified-app-installs/
    section:
      id: stickyness
      title: "Engage and Retain users"
      href: fundamentals/engage-and-retain/
-
    title: "Theme Color"
    href: fundamentals/design-and-ui/browser-customization/theme-color
    section:
      id: stickyness
      title: "Browser Customization"
      href: fundamentals/design-and-ui/browser-customization/
      
-
    title: "Using App Install Banners"
    href: fundamentals/engage-and-retain/simplified-app-installs/
    section:
      id: stickyness
      title: "Engage and Retain users"
      href: fundamentals/engage-and-retain/

-
    title: "Getting Started with offline and Service Worker"
    href: fundamentals/getting-started/your-first-offline-web-app/
    section:
      id: stickyness
      title: "Getting Started"
      href: fundamentals/getting-started/
---
