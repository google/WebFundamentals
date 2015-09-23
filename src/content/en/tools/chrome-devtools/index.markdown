---
layout: shared/wide
description: "The Chrome DevTools are Chrome's built-in authoring and debugging tool."
title: Chrome DevTools
order: 5
---


<div class="wf-subheading">
  <div class="page-content mdl-grid">
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
  </div>
</div>

<div class="wf-secondaryheading">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--6-col">
      <p>The Chrome DevTools are a set of web authoring and debugging tools built into Google Chrome. They provide web developers deep access into the internals of the browser and their web application. Use the DevTools to efficiently track down layout issues, set JavaScript breakpoints, and get insights for code optimization.</p>
      <div class="note">
        Note: If you are a web developer and want to get the latest version of DevTools, you should use <a href="https://tools.google.com/dlpage/chromesxs">Google Chrome Canary</a>.
      </div>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <p>To open the DevTools, open a site or app in Chrome, then:</p>
      <ul>
        <li>Select the <strong>Chrome menu</strong> at the top-right of your browser window, then select <strong>Tools > Developer Tools</strong>.</li>
        <li>Right-click on any page element and select Inspect Element.</li>
        <li>Use <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">I</kbd> (or <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">I</kbd> on Mac) (<a href="https://developer.chrome.com/devtools/docs/shortcuts">more shortcuts</a>)</li>
      </ul>
    </div>
  </div>
</div>

<div class="page-content mdl-grid">

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/elements.jpg">
    <h3>Elements</h3>
    <p>The Elements panel lets you see everything in one DOM tree, and allows inspection and on-the-fly editing of DOM elements. Use the Elements panel to identify the HTML snippet for some aspect of the page.</p>
    <ul>
      <li><a href="/web/tools/iterate/inspect-styles/">Inspect and edit pages and styles</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/network.jpg">
    <h3>Network</h3>
    <p>The Network panel provides insights into resources that are requested and downloaded over the network in real time. Identify requests taking longer than expected to optimize your page.</p>
    <ul>
      <li><a href="/web/tools/profile-performance/network-performance/">Page load performance</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/sources.jpg">
    <h3>Sources</h3>
    <p>The Sources panel lets you debug your JavaScript code using breakpoints. As the complexity of JavaScript applications increase, developers need powerful debugging tools to help quickly discover the cause of an issue and fix it efficiently.</p>
    <ul>
      <li><a href="/web/tools/setup/workspace/">Set up your workspace</a></li>
      <li><a href="/web/tools/javascript/breakpoints/">Debug with breakpoints</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/timeline.jpg">
    <h3>Timeline</h3>
    <p>The Timeline panel gives you a complete overview of where time is spent when loading and using your web app or page. All events, from loading resources to parsing JavaScript, calculating styles, and repainting are plotted on a timeline.</p>
    <ul>
      <li><a href="/web/tools/profile-performance/evaluate-performance/">How to look at performance</a></li>
      <li><a href="/web/tools/profile-performance/rendering-tools/">Runtime performance</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/profiles.jpg">
    <h3>Profiles</h3>
    <p>The Profiles panel lets you profile the execution time and memory usage of a web app or page.</p>
    <ul>
      <li><a href="/web/tools/profile-performance/memory-problems/">Fix memory problems</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/resources.jpg">
    <h3>Resources</h3>
    <p>The Resources panel lets you inspect resources that are loaded in the inspected page including IndexedDB or Web SQL databases, local and session storage, cookies, Application Cache, images, fonts, and style sheets.</p>
    <ul>
      <li><a href="/web/tools/iterate/manage-data/">Manage your local data resources</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/console.jpg">
    <h3>Console</h3>
    <p>The Console panel provides two primary functions, first to og diagnostic information in the development process, and second provide a shell prompt which can be used to interact with the document and DevTools.</p>
    <ul>
      <li><a href="/web/tools/javascript/console/">Using the console</a></li>
      <li><a href="/web/tools/javascript/command-line/">Interact from the command line</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/devicemode.jpg">
    <h3>Device mode</h3>
    <p>Device mode lets you can change the size of the display to simulate a variety of existing devices, or set it to a size of your own choosing.</p>
    <ul>
      <li><a href="/web/tools/setup/remote-debugging/">Setup remote deubgging</a></li>
      <li><a href="/web/tools/setup/device-testing/">Setup virtual device testing</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/console.jpg">
    <h3>Settings &amp; commands</h3>
    <p>Whee</p>
    <ul>
      <li><a href="/web/tools/javascript/command-line/command-line-reference">Command line API</a></li>
      <li><a href="/web/tools/iterate/inspect-styles/shortcuts">Keyboard shortcut</a></li>
      <li><a href="https://developer.chrome.com/devtools/docs/settings">Settings</a></li>
    </ul>
  </div>

  <div class="mdl-cell--4-col mdl-cell wf-tools-panel">
    <img src="/web/tools/chrome-devtools/images/timeline.jpg">
    <h3>Extending DevTools</h3>
    <p>Whee</p>
    <ul>
      <li><a href="https://developer.chrome.com/devtools/docs/integrating">Integrating with DevTools and Chrome</a></li>
      <li><a href="https://developer.chrome.com/extensions/devtools">DevTools Extensions API</a></li>
      <li><a href="https://developer.chrome.com/devtools/docs/debugger-protocol">Remote deubgging protocol</a></li>
    </ul>
  </div>

  <div class="mdl-cell--12-col mdl-cell">
    <h4>Why are some docs on another site?</h4>
    <p>While you'll get plenty of information of how to use DevTools here, our old home will stay around for a bit and provide you with info on how to extend DevTools.</p>
  </div>
</div>





