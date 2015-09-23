---
layout: shared/wide
description: "The Chrome DevTools are Chrome's built-in authoring and debugging tool."
title: Chrome DevTools
order: 5
panels:
  - title: Elements
    img: /web/tools/chrome-devtools/images/elements.jpg
    anchor: elements-panel-inspect-dom-and-styles
  - title: Network
    img: /web/tools/chrome-devtools/images/network.jpg
    anchor: network-panel-monitor-network-performance
  - title: Sources
    img: /web/tools/chrome-devtools/images/sources.jpg
    anchor: sources-panel-debug-javascript-with-breakpoints
  - title: Timeline
    img: /web/tools/chrome-devtools/images/timeline.jpg
    anchor: timeline-panel-record-and-analyze-page-activity
  - title: Profiles
    img: /web/tools/chrome-devtools/images/profiles.jpg
    anchor: profiles-panel-profile-execution-time-and-memory-usage
  - title: Resources
    img: /web/tools/chrome-devtools/images/resources.jpg
    anchor: resources-panel-inspect-storage
  - title: Console
    img: /web/tools/chrome-devtools/images/console.jpg
    anchor: console-panel-interact-with-page
  - title: Device Mode
    img: /web/tools/chrome-devtools/images/devicemode.jpg
    anchor: work-in-device-mode
---

<div class="wf-subheading">
  <div class="page-content">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--6-col">
        <h2>Chrome DevTools</h2>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <p>Chrome's built-in authoring and debugging tool.</p>
        <p>
          <a class="mdl-button mdl-js-button mdl-button--icon wf-header__small-btn" href="https://github.com/GoogleChrome">{% include svgs/github-mark.svg %}</a>
          <a class="mdl-button mdl-js-button mdl-button--icon wf-header__small-btn" href="https://plus.google.com/+GoogleChromeDevelopers">{% include svgs/gplus.svg %}</a>
          <a class="mdl-button mdl-js-button mdl-button--icon wf-header__small-btn" href="https://twitter.com/ChromeDevTools">{% include svgs/twitter.svg %}</a>
          <a class="mdl-button mdl-js-button mdl-button--icon wf-header__small-btn" href="http://stackoverflow.com/questions/tagged/google-chrome-devtools">{% include svgs/stackoverflow.svg %}</a>
          <a class="mdl-button mdl-js-button mdl-button--icon wf-header__small-btn" href="https://www.youtube.com/user/ChromeDevelopers">{% include svgs/youtube.svg %}</a>
        </p>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <p>The Chrome DevTools are a set of web authoring and debugging tools built into Google Chrome. They provide web developers deep access into the internals of the browser and their web application. Use the DevTools to efficiently track down layout issues, set JavaScript breakpoints, and get insights for code optimization.</p>
        <div class="note">Note: If you are a web developer and want to get the latest version of DevTools, you should use <a href="https://tools.google.com/dlpage/chromesxs">Google Chrome Canary</a>.</div>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <p>To open the DevTools, open a site or app in Chrome, then:</p>
        <ul>
          <li>Select the <strong>Chrome menu</strong> at the top-right of your browser window, then select <strong>Tools > Developer Tools</strong>.</li>
          <li>Right-click on any page element and select Inspect Element.</li>
          <li>Use <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">I</kbd> (or <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">I</kbd> on Mac) (<a href="https://developer.chrome.com/devtools/docs/shortcuts">more shortcuts</a>)</li>
        </ul>
        <a class="mdl-button mdl-js-button mdl-button--raised" href="/web/tools/setup/workspace/setup-devtools">CONTINUE READING</a>
      </div>
    </div>
  </div>
</div>


<div class="page-content mdl-grid">
  <h3 class="mdl-cell mdl-cell--12-col">
    Documentation by panel
  </h3>
  {% for panel in page.panels %}
  <div class="mdl-cell mdl-cell--4-col">
    <h3>{{panel.title}}</h3>
    <a href="{{panel.anchor}}">
      <img src="{{panel.img}}">
    </a>
  </div>
  {% endfor %}
</div>

<hr />

<div class="page-content">
  <div class="tools-home">

    <div class="container tools-docs-listing">
      <div>
        <h3>Reference / Configuration</h3>
        <ul class="doclist">
          <li>
            <h4>Settings &amp; Commands</h4>
            <ul>
              <li><a href="/web/tools/javascript/command-line/command-line-reference">Command Line API</a></li>
              <li><a href="/web/tools/iterate/inspect-styles/shortcuts">Keyboard Shortcuts</a></li>
              <li><a href="https://developer.chrome.com/devtools/docs/settings">Settings</a></li>
            </ul>
          </li>
          <li>
            <h4>Extending DevTools</h4>
            <ul>
              <li><a href="https://developer.chrome.com/devtools/docs/integrating">Integrating with DevTools &amp; Chrome</a></li>
              <li><a href="https://developer.chrome.com/extensions/devtools">DevTools Extensions API</a></li>
              <li><a href="https://developer.chrome.com/devtools/docs/debugger-protocol">Remote Debugging Protocol</a></li>
            </ul>
          </li>
          <li class="note-why">
            <h4>Why are some docs on another site?</h4>
            <p>While you'll get plenty of information of how to use DevTools here, our old home will stay around for a bit and provide you with info on how to extend DevTools.</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
