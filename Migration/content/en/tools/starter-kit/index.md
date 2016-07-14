---
layout: shared/wide
description: "Web Starter Kit is boilerplate and tooling for multi-device development"
title: Web Starter Kit
order: 4
feedName: Web Starter Kit Releases
feedURL: https://github.com/google/web-starter-kit/releases.atom
---

<style>
.mdl-cell h3 {
  height: 48px;
  line-height: 24px;
}
</style>

<div class="wf-subheading">
  <div class="page-content mdl-typography--text-center mdl-grid">
    <div class="mdl-cell mdl-cell--1-col"></div>
    <div class="mdl-cell mdl-cell--10-col">
      <h3>Your starting point for building great multi-device web experiences</h3>
      <p>Start your project with the Web Starter Kit and ensure you're following the <a href="/web/fundamentals/">Web Fundamentals</a> guidelines out of the box.</p>
      <a class="mdl-button mdl-js-button mdl-button--raised" href="https://github.com/google/web-starter-kit/releases/latest">Download Web Starter Kit (beta)</a>
    </div>
    <div class="mdl-cell mdl-cell--1-col"></div>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content">

  <h3>What is Web Starter Kit?</h3>

  <p>Web Starter Kit is an easy way to start a new project. It comes
  with all the files you could need to start a new web project including
  a build process, boilerplate HTML and styles.</p>

  <p>
    A responsive layout is included with the kit that adapts to fit the device your user is viewing it on. This helps you hit the ground running with an experience that looks good everywhere. <a href="http://google.github.io/web-starter-kit/hello-world/">Try a sample layout</a>.
  </p>

  <p>
    Web Starter Kit strives to give you a high performance starting point out of the box and we actively work on delivering the best <a href="https://developers.google.com/speed/pagespeed/insights/">PageSpeed Insights</a> score and frame-rate possible.
  </p>

  <p>
    We hope that you tailor Web Starter Kit by deleting anything that you don't want or need. It's a starting point - nothing more.
  </p>

  <div class="mdl-grid mdl-typography--text-center">
    <div class="mdl-cell mdl-cell--4-col">
      <div class="icon">
        {% include svgs/responsive.svg %}
      </div>
      <h3 class="mdl-typography--title">Multi-device responsive boilerplate</h3>
      <p>A responsive boilerplate optimized for the multi-screen web, with a high PageSpeed Insights performance score.</p>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <div class="icon">
        {%include svgs/device-sync.svg %}
      </div>
      <h3 class="mdl-typography--title">Cross-device Synchronization</h3>
      <p>Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by BrowserSync.</p>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <div class="icon">
        {%include svgs/live-reload.svg %}
      </div>
      <h3 class="mdl-typography--title">Live Browser Reloading</h3>
      <p>Reload the browser in real-time anytime an edit is made without the need for an extension.</p>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <div class="icon">
        {%include svgs/code.svg %}
      </div>
      <h3 class="mdl-typography--title">Performance optimization</h3>
      <p>Minify and concatenate JavaScript, CSS, HTML and Images to help keep your pages lean.</p>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <div class="icon">
        {%include svgs/http.svg %}
      </div>
      <h3 class="mdl-typography--title">Built in HTTP Server</h3>
      <p>A built in server for previewing your site means you can test your pages without messing with other tools.</p>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <div class="icon">
        {%include svgs/tick.svg %}
      </div>
      <h3 class="mdl-typography--title">PageSpeed Insights Reporting</h3>
      <p>Web performance metrics showing how well your site performs on mobile and desktop.</p>
    </div>

    <div class="mdl-cell mdl-cell--4-col">
      <div class="icon">
        {%include svgs/sass-dollar.svg %}
      </div>
      <h3 class="mdl-typography--title">Sass support</h3>
      <p>Compile Sass into CSS with ease, bringing support for variables, mixins and more.</p>
    </div>
  </div>
</div>
