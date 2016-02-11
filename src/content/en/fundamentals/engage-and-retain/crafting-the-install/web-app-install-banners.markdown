---
layout: shared/narrow
title: "Web app install banner"
description: "Web app install Banners give you the ability to have your users quickly and seamlessly add your web app to their home screen, making it easy to launch and return to your app."
published_on: 2014-12-17
updated_on: 2016-02-12
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 2
---

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p class="intro">
      App Install Banners give you the ability to have your users quickly and 
      seamlessly add your web app to their home screen, or install your native
      app, without ever leaving the browser.
    </p>
    <p>
      <i>"This looks great, I want it on my site!"</i>
    </p>
    <p>
      <i>"Please tell me how to add it!"</i>
    </p>
    <p>
      Adding app install banners is easy, and Chrome handles most of the heavy
      lifting for you. You'll need to include a web app manifest file in
      your site with details about your app.
    </p>
    <p>
      Chrome then uses a set of criteria and visit frequency heuristics to 
      determine when to show the banner. Read on for more details.
    </p>
  </div>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/add-to-home-screen.gif" alt="Web app install banner">
    <figcaption>Web app install banner flow</figcaption>
  </figure>
</div>

Chrome will automatically display the banner when your app meets the following
criteria:

* Has a [web app manifest](.) file with:
  - a `short_name`
  - a 144x144 png icon (the icon declarations must include a mime type of `image/png`).
* Has a [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
  registered on your site.
* Is served over [HTTPS](/web/fundamentals/security/encrypt-in-transit/) (you 
  need a service worker after all).
* Is visited by the user twice, over two separate days during the course
  of two weeks.

## Testing the app install banner

The app install banner is only shown after the user has visited the page at least twice over two different days, making testing difficult. You can disable the visit frequency check by enabling the Chrome flag `#bypass-app-banner-engagement-checks`.

Then, as long as you have a manifest (configured correctly), are on HTTPS and have a service worker, you should see the install prompt.

