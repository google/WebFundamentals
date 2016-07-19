project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Progressive Web Apps are experiences that combine the best of the web and the best of apps. In this step-by-step guide, you'll build your own Progressive Web App and learn the the fundamentals needed for building Progressive Web Apps, including the app shell model, how to use service workers to cache the App Shell and your key application data and more.

<p class="intro">
<a href="/web/progressive-web-apps">Progressive Web Apps</a> are experiences
that combine the best of the web and the best of apps. They are useful to users
from the very first visit in a browser tab, no install required. As the user
progressively builds a relationship with the App over time, it becomes more
and more powerful. It loads quickly, even on flaky networks, sends relevant
push notifications, has an icon on the home screen and loads as a top-level,
full screen experience.
</p>



## What is a Progressive Web App?

Progressive Web Apps are:

* **Progressive** - Work for every user, regardless of browser choice because
  they're built with progressive enhancement as a core tenet.
* **Responsive** - Fit any form factor: desktop, mobile, tablet, or whatever is
  next.
* **Connectivity independent** - Enhanced with service workers to work offline
  or on low quality networks.
* **App-like** - Feel like an app to the user with app-style interactions and
  navigation because they're built on the app shell model.
* **Fresh** - Always up-to-date thanks to the service worker update process.
* **Safe** - Served via HTTPS to prevent snooping and ensure content hasn't been
  tampered with.
* **Discoverable** - Are identifiable as "applications" thanks to W3C manifests
  and service worker registration scope allowing search engines to find them.
* **Re-engageable** - Make re-engagement easy through features like push
  notifications.
* **Installable** - Allow users to "keep" apps they find most useful on their
  home screen without the hassle of an app store.
* **Linkable** - Easily share via URL and not require complex installation.

This getting started guide will walk you through creating your own Progressive
Web App, including the design considerations, as well as implementation details
to ensure that your app meets the key principles of a Progressive Web App.



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## What are we going to be building?

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p>
      In this getting started guide, you're going to build a Weather Web
      App using Progressive Web App techniques.
    </p>
    <p>
      Let's consider the properties of a Progressive Web App:
      <ul>
        <li><b>Progressive</b> - we'll use progressive enhancement throughout</li>
        <li><b>Responsive</b> - we'll ensure it fits any form factor</li>
        <li><b>Connectivity independent</b> - we'll cache the app shell with service workers.</li>
        <li><b>App-like</b> - we'll use app-style interactions to add cities and refresh the data.</li>
        <li><b>Fresh</b> - we'll cache the latest data with service workers.</li>
        <li><b>Safe</b> - we'll deploy the app to a host that support HTTPS.</li>
        <li><b>Discoverable and installable</b> - we'll include a manifest making it
          easy for search engines to find our app.</li>
        <li><b>Linkable</b> - it's the web!</li>
      </ul>
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <a href="https://weather-pwa-sample.firebaseapp.com/final/">
      <img src="images/weather-ss.png">
    </a>
    <p>
      <a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Try it</a>
    </p>
  </div>
</div>

## What will you learn

* How to design and construct an app using the "app shell" method
* How to make your app work offline
* How to store data for use offline later

## Topics covered

<ol>

  <li>
    <a href="/web/fundamentals/getting-started/your-first-progressive-web-app/step-02?hl=en">
      Implement the App Shell
    </a>
  </li>

  <li>
    <a href="/web/fundamentals/getting-started/your-first-progressive-web-app/step-01?hl=en">
      Architect the App Shell
    </a>
  </li>

  <li>
    <a href="/web/fundamentals/getting-started/your-first-progressive-web-app/step-03?hl=en">
      Start with a Fast First Load
    </a>
  </li>

  <li>
    <a href="/web/fundamentals/getting-started/your-first-progressive-web-app/step-04?hl=en">
      Use Service Workers to Pre-cache the App Shell
    </a>
  </li>

  <li>
    <a href="/web/fundamentals/getting-started/your-first-progressive-web-app/step-05?hl=en">
      Use Service Workers to Cache Application Data
    </a>
  </li>

  <li>
    <a href="/web/fundamentals/getting-started/your-first-progressive-web-app/step-07?hl=en">
      Support Native Integration
    </a>
  </li>

  <li>
    <a href="/web/fundamentals/getting-started/your-first-progressive-web-app/step-08?hl=en">
      Deploy to a Secure Host and Celebrate!
    </a>
  </li>

</ol>

## What you'll need

* Chrome 47 or above
* A knowledge of HTML, CSS and JavaScript

This getting started guide is focused on Progressive Web Apps. Some concepts are
glossed over or code blocks (for example styles or non-relevant JavaScript) or
are provided for you to simply copy and paste.

