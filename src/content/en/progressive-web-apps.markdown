---
layout: shared/root
published: false
description: "Progressive Web Apps"
title: "Progressive Web Apps"
translation_priority: 0
---

<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet">
      <h2>Progressive Web Apps</h2>
      <p>
        A Progressive Web App uses modern web capabilities to deliver an 
        app-like user experience. They evolve from pages in 
        browser tabs to immersive, top-level apps, leveraging the web's low 
        friction.
      </p>
      <p>
        <a href="#getstarted" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          Get Started
        </a>
        <a href="#learnmore" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored pwa-left-margin">
          Learn more
        </a>
      </p>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--hide-phone">
      <img src="/web/imgs/pwa-voice-memos_framed.png">
    </div>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div id="getstarted" class="wf-landing-section wf-pwa-gs wf-secondaryheading">
  <div class="page-content mdl-grid">
    <h2 class="mdl-cell mdl-cell--12-col">
      Get Started
    </h2>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
      {% ytvideo MyQ8mtR9WxI %}
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
      <h4>Guides and Code Labs</h4>
      <ul>
        <li><a href="/web/fundamentals/getting-started/your-first-progressive-web-app/">Your first Progressive Web App</a></li>
        <li><a href="/web/fundamentals/getting-started/your-first-offline-web-app/">Your first offline web app</a></li>
        <li><a href="/web/fundamentals/getting-started/push-notifications/">Your first push notification web app</a></li>
      </ul>
      <h4>Components</h4>
      <ul>
        <li><a href="/web/updates/2015/11/app-shell">App Shell</a></li>
        <li><a href="https://slightlyoff.github.io/ServiceWorker/spec/service_worker/">Service Workers</a></li>
        <li><a href="/web/fundamentals/engage-and-retain/simplified-app-installs/">Add to Home Screen</a></li>
        <li><a href="/web/fundamentals/engage-and-retain/push-notifications/">Push and Notifications</a></li>
      </ul>
      <h4>Get Support</h4>
      <ul>
        <li><a href="http://stackoverflow.com/questions/tagged/progressive-web-apps">Stack Overflow</a></li>
      </ul>
    </div>
  </div>
</div>

<div id="learnmore" class="wf-landing-section">
  <div class="page-content">
    <h2>What is a Progressive Web App?</h2>
    <p>
      Progressive Web Apps are experiences that combine the best of the web and 
      the best of apps. They are useful to users from the very first visit in 
      a browser tab, no install required. As the user progressively builds a 
      relationship with the App over time, it becomes more and more powerful. 
      It loads quickly, even on flaky networks, sends relevant push 
      notifications, has an icon on the home screen and loads as top-level, 
      full screen experience.
    </p>

    <h3>Progressive Web Apps are:</h3>
    <ul>
      <li>
        <b>Progressive</b> - Work for every user, regardless of browser 
        choice because they’re built with progressive enhancement as a core 
        tenet.
      </li>
      <li>
        <b>Responsive</b> - Fit any form factor: desktop, mobile, tablet, or 
        whatever is next.
      </li>
      <li>
        <b>Connectivity independent</b> - Enhanced with service workers to 
        work offline or on low quality networks.
      </li>
      <li>
        <b>App-like</b> - Feel like an app to the user with app-style
        interactions and navigation because it's built on the app shell model.
      </li>
      <li>
        <b>Fresh</b> - Always up-to-date thanks to the service worker update 
        process.
      </li>
      <li>
        <b>Safe</b> - Served via HTTPS to prevent snooping and ensure content 
        hasn’t been tampered with.
      </li>
      <li>
        <b>Discoverable</b> - Are identifiable as “applications” thanks to 
        W3C manifests and service worker registration scope allowing search 
        engines to find them.
      </li>
      <li>
        <b>Re-engageable</b> - Make re-engagement easy through features like 
        push notifications.
      </li>
      <li>
        <b>Installable</b> - Allow users to “keep” apps they find most useful 
        on their home screen without the hassle of an app store.
      </li>
      <li>
        <b>Linkable</b> - Easily share via URL and not require complex 
        installation.
      </li>
    </ul>
  </div>
</div>

<style>
  .pwa-image {
    max-width: 300px;
  }
</style>

<div class="wf-landing-section wf-secondaryheading">
  <div class="page-content mdl-grid">
    <h2 class="mdl-cell mdl-cell--12-col">
      Progressive Web Apps in Action
    </h2>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-typography--text-center">
      <h3>Air Horner</h3>
      <a href="https://airhorner.com/">
        <img src="/web/imgs/pwa-airhorner.png" class="pwa-image">
      </a>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-typography--text-center">
      <h3>Voice Memos</h3>
      <a href="https://voice-memos.appspot.com/">
        <img src="/web/imgs/pwa-voice-memos.png" class="pwa-image">
      </a>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-typography--text-center">
      <h3>Weather</h3>
      <a href="https://weather-pwa-sample.firebaseapp.com/final/">
        <img src="/web/imgs/pwa-weather.png" class="pwa-image">
      </a>
    </div>
  </div>
</div>
