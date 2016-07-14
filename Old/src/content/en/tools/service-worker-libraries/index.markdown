---
layout: shared/wide
description: "Service Worker Libraries."
title: "Service Worker Libraries"
order: 6
translation_priority: 1
feedName: sw-toolbox Releases
feedURL: https://github.com/googlechrome/sw-toolbox/releases.atom
---

<div class="wf-subheading">
  <div class="page-content mdl-typography--text-center mdl-grid">
    <div class="mdl-cell mdl-cell--1-col"></div>
    <div class="mdl-cell mdl-cell--10-col">
      <h3>Service workers, without the work.</h3>
      <p>
        Free your web app from the network without writing boilerplate service worker code.
      </p>
      <div class="page-content mdl-grid">
        <div class="mdl-cell mdl-cell--6-col">
          <a class="mdl-button mdl-js-button mdl-button--raised" href="https://github.com/GoogleChrome/sw-precache#install">Get sw-precache</a>
        </div>
        <div class="mdl-cell mdl-cell--6-col">
          <a class="mdl-button mdl-js-button mdl-button--raised" href="https://github.com/GoogleChrome/sw-toolbox#installing-service-worker-toolbox">Get sw-toolbox</a>
        </div>
      </div>
    </div>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content">
  <h2>Ship your shell with sw-precache</h2>
  <p>
    Add <code>sw-precache</code> to your build process and get always-up-to-date caching of your web
    app's most important resources.
  </p>

  <div class="mdl-grid mdl-typography--text-center">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="icon">
        {%include svgs/design-and-ui.svg %}
      </div>
      <h3 class="mdl-typography--title">Precache Your Shell</h3>
      <p>
         Your web app's shell—its core HTML, JavaScript, and CSS—can be precached when a
         user visits your page.
      </p>
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      <div class="icon">
        {%include svgs/build-chain.svg %}
      </div>
      <h3 class="mdl-typography--title">Build-time Integration</h3>
      <p>
        Drop it into your existing build process:
        <a href="https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js">Gulp</a>,
        <a href="https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js">Grunt</a>, or
        <a href="https://github.com/GoogleChrome/sw-precache#command-line-interface">command-line</a>.
      </p>
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      <div class="icon">
        {%include svgs/live-reload.svg %}
      </div>
      <h3 class="mdl-typography--title">Stay Fresh</h3>
      <p>
        Changes in your build update the service worker script. Users get updates, but you don't
        have to manually version your content or caches.
      </p>
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      <div class="icon">
        {%include svgs/offline.svg %}
      </div>
      <h3 class="mdl-typography--title">No Network, No Problem</h3>
      <p>
        Your static resources are served
        <a href="https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network">cache-first</a>,
        quickly, whether or not there's a network available.
      </p>
    </div>
  </div>

  <h2>Dynamic caching with sw-toolbox</h2>
  <p>
    <code>sw-toolbox</code> provides common
    <a href="https://github.com/GoogleChrome/sw-toolbox#built-in-handlers">caching patterns</a>
    and a
    <a href="https://github.com/GoogleChrome/sw-toolbox#toolboxrouterheadurlpattern-handler-options">expressive approach</a>
    to using those strategies for runtime requests.
  </p>

  <div class="mdl-grid mdl-typography--text-center">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="icon">
        {%include svgs/ic_image_black_48px.svg %}
      </div>
      <h3 class="mdl-typography--title">Runtime Caching</h3>
      <p>
        Cache large or infrequently used resources, like images, at runtime, when they're
        first used.
      </p>
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      <div class="icon">
        {%include svgs/offline.svg %}
      </div>
      <h3 class="mdl-typography--title">Offline Fallbacks</h3>
      <p>
         Load fresh images, API responses, or other dynamic content from the network while online,
         but fall back to a cached placeholder while offline.
      </p>
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      <div class="icon">
        {%include svgs/ic_signal_cellular_connected_no_internet_4_bar_black_48px.svg %}
      </div>
      <h3 class="mdl-typography--title">Goodbye Lie-Fi</h3>
      <p>
        Fight <a href="https://www.youtube.com/watch?v=oRcxExzWlc0">lie-fi</a> by automatically
        falling back to a cached response when the network is too slow.
      </p>
    </div>

    <div class="mdl-cell mdl-cell--6-col">
      <div class="icon">
        {%include svgs/ic_disc_full_black_48px.svg %}
      </div>
      <h3 class="mdl-typography--title">Battle Cache Bloat</h3>
      <p>
        That image from last month doesn't need to be cached forever. Least-recently used
        and age-based cache expiration helps free up space.
      </p>
    </div>
  </div>

  <h2>Learn More</h2>
  <p>
    The <a href="{{site.WFBaseUrl}}/showcase/case-study/service-workers-iowa">"Service Workers in
    Production" case study</a> takes a close look at how the <code>sw-precache</code> and
    <code>sw-toolbox</code> libraries were used together to power the
    <a href="https://events.google.com/io2015/">Google I/O 2015 web app</a>.
  </p>
  <p>
    <a href="https://twitter.com/jeffposnick">Jeff Posnick</a>'s
    <a href="https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15">presentation</a>
    from the Chrome Dev Summit 2015, <em>Instant Loading with Service
    Workers</em>, describes how to effectively use <code>sw-precache</code>
    alongside <code>sw-toolbox</code> to build web apps that load quickly and
    work offline.
  </p>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/jCKZDTtUA2A" frameborder="0" allowfullscreen></iframe>
</div>
