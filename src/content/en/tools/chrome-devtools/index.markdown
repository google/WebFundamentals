---
layout: shared/wide
description: "The Chrome DevTools are Chrome's built-in authoring and debugging tool."
title: "Chrome DevTools"
order: 3
translation_priority: 1
---

<div class="wf-devtools-wrapper">

  <div class="wf-subheading wf-devtools-header">
    <div class="page-content">
        <h1><img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/chrome_devtools.svg" alt="Chrome DevTools Logo">Chrome DevTools</h1>
    </div>

    <div class="page-content mdl-grid">
      <div class="mdl-cell mdl-cell--6-col">
        <p>The Chrome DevTools are a set of web authoring and debugging tools built into Google Chrome. Use the DevTools to iterate, debug and profile your site.</p>
        <div class="note">
          <a href="https://tools.google.com/dlpage/chromesxs">Chrome Canary</a> always has the latest DevTools.
        </div>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <ul>
          <li>Select <strong>More Tools &gt; Developer Tools</strong> from the Chrome Menu.</li>
          <li>Right-click on a page element and select Inspect</li>
          <li>
            Use <a href="/web/tools/chrome-devtools/iterate/inspect-styles/shortcuts">shortcuts</a>
            <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows)
            or <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>I</kbd> (Mac)
          </li>
        </ul>
      </div>
    </div>
  </div>

  {% include page-structure/site-promo-banner.liquid %}

  <div class="wf-devtools-panels">
    
    <h2 class="page-content mdl-typography--font-light">Discover the Panels</h2>

    <div class="mdl-tabs mdl-js-tabs page-content">

      <div class="mdl-tabs__tab-bar">
          <a href="#elements" class="mdl-tabs__tab is-active">Elements</a>
          <a href="#console" class="mdl-tabs__tab">Console</a>
          <a href="#sources" class="mdl-tabs__tab">Sources</a>
          <a href="#network" class="mdl-tabs__tab">Network</a>
          <a href="#timeline" class="mdl-tabs__tab">Timeline</a>
          <a href="#profiles" class="mdl-tabs__tab">Profiles</a>
          <a href="#resources" class="mdl-tabs__tab">Resources</a>
          <a href="#security" class="mdl-tabs__tab">Security</a>
          <a href="#devicemode" class="mdl-tabs__tab wf-devtools-tabdivider">Device Mode</a>
          <a href="#remotedebugging" class="mdl-tabs__tab">Remote Debugging</a>
          <a href="#settings" class="mdl-tabs__tab">Settings</a>
      </div>

      <div class="mdl-tabs__panel" id="settings">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/settings.png" alt="Device Mode">
        <p>Learn how to customize the DevTools to suit your workflow.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/shortcuts">Keyboard shortcuts</a></li>
          <li><a href="/web/tools/chrome-devtools/settings">Settings</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="remotedebugging">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/remotedebugging.png" alt="Remote Debugging">
        <p>Remote Debugging allows you to remotely debug and screencast any device running Chrome on your Desktop.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging">Remote Debugging Devices</a></li>
          <li><a href="/web/tools/chrome-devtools/debug/remote-debugging/local-server">Remote Access to Your Local Site</a></li>
          <li><a href="/web/tools/chrome-devtools/debug/remote-debugging/webviews">Remote Debugging WebViews</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="devicemode">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/devicemode.png" alt="Device Mode">
        <p>Use the Device Mode to build fully responsive, mobile-first web experiences.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/iterate/device-mode/">Device Mode</a></li>
          <li><a href="/web/tools/chrome-devtools/iterate/device-mode/emulate-mobile-viewports">Test Responsive and Device-specific Viewports</a></li>
          <li><a href="/web/tools/chrome-devtools/iterate/device-mode/device-input-and-sensors">Emulate Sensors: Geolocation &amp; Accelerometer</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel is-active" id="elements">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/elements.png" alt="Elements Panel">
        <p>Use the Elements panel to iterate on the layout and design of your site by freely manipulating the DOM and CSS.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/">Inspect and Tweak Your Pages</a></li>
          <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/edit-styles">Edit Styles</a></li>
          <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/edit-dom">Edit the DOM</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="console">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/console.png" alt="Console Panel">
        <p>Use the Console to log diagnostic information during development or use it as a shell to interact with the JavaScript on the page.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/debug/console/">Using the Console</a></li>
          <li><a href="/web/tools/chrome-devtools/debug/command-line/">Interact from Command Line</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="sources">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/sources.png" alt="Sources Panel">
        <p>Debug your JavaScript using breakpoints in the Sources Panel or connect your local files via Workspaces to use DevTools live editor.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/debug/breakpoints/">Debugging with Breakpoints</a></li>
          <li><a href="/web/tools/chrome-devtools/debug/readability/">Debug Obfuscated Code</a></li>
          <li><a href="/web/tools/setup/setup-workflow">Set Up Persistence with DevTools Workspaces</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="network">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/network.png" alt="Network Panel">
        <p>Use the Network panel to get insights into requested and downloaded resources and optimize your page load performance.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/profile/network-performance/resource-loading">Network Panel Basics</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/network-performance/understanding-resource-timing">Understanding Resource Timing</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/network-performance/network-conditions">Network Throttling</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="timeline">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/timeline.png" alt="Timeline Panel">
        <p>Use the Timeline to improve the run time performance of your page by recording and exploring the various events that happen during the lifecycle of a site.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/profile/evaluate-performance/">How to look at performance</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime">Analyze runtime performance</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/forced-synchronous-layouts">Diagnose Forced Synchronous Layouts</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="profiles">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/profiles.png" alt="Profiles Panel">
        <p>Use the Profiles panel if you need more information than the Timeline provide, for instance to track down memory leaks.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/js-execution">JavaScript CPU Profiler</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/memory-problems">Heap Profiler</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="resources">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/resources.png" alt="Resources Panel">
        <p>Use the Resources panel to inspect all resources that are loaded, including IndexedDB or Web SQL databases, local and session storage, cookies, Application Cache, images, fonts, and stylesheets.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/iterate/manage-data/">Manage data</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="security">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/security.png" alt="Security Panel">
        <p>Use the Security Panel to debug mixed content issues, problems with your certificate and more.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/security/">Security</a></li>
        </ul>
      </div>

    </div>

  </div>


  <div class="wf-devtools-alternate wf-secondaryheading">
    <div class="page-content">
      <h2 class="mdl-typography--font-light">Solutions for your Workflow</h2>
      <div class="mdl-grid">
      {% for subdirectory in page.context.subdirectories %}
        {% if subdirectory.subdirectories.size > 0 %}
        <div class="mdl-cell mdl-cell--4-col wf-tools-guide">
          <h3 class="wf-tools-guide__title"><a href="{{subdirectory.index.relative_url}}">{{subdirectory.index.title}}</a></h3>
          <p class="wf-tools-guide__description">{{subdirectory.index.description}}</p>
          {% if subdirectory.subdirectories %}
              {% for sub in subdirectory.subdirectories %}
                <p class="wf-tools-guide__section-link"><a href="{{sub.index.relative_url}}">{{sub.index.title}}</a></p>
              {% endfor %}
          {% endif %}
        </div>
        {% endif %}
      {% endfor %}
      </div>
    </div>
  </div>



  <div class="wf-devtools-alternate">
    <div class="page-content">
      <h2 class="mdl-typography--font-light">Hot Off the Press</h2>

        <div class="android-card-container mdl-grid">
            <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
                <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/teaser1.png" alt="DevTools Tonight">
              </div>
              <div class="mdl-card__title">
                 <h4 class="mdl-card__title-text">DevTools Tonight</h4>
              </div>
              <div class="mdl-card__supporting-text">
                <span class="mdl-typography--font-light mdl-typography--subhead">Watch our late-night show pilot and learn all about colors.</span>
              </div>
              <div class="mdl-card__actions">
                 <a class="mdl-button mdl-js-button mdl-typography--text-uppercase" href="https://www.youtube.com/watch?v=nLpNHNlonMs">
                   Watch
                 </a>
              </div>
            </div>

            <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
                <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/teaser2.png" alt="Inspect Devices">
              </div>
              <div class="mdl-card__title">
                 <h4 class="mdl-card__title-text">Inspect Devices</h4>
              </div>
              <div class="mdl-card__supporting-text">
                <span class="mdl-typography--font-light mdl-typography--subhead">Inspect Devices right within DevTools with our revamped UI.</span>
              </div>
              <div class="mdl-card__actions">
                 <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="/web/updates/2016/02/devtools-digest-supercharged-remote-debugging">
                   Learn more
                 </a>
              </div>
            </div>

            <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
                <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/teaser3.png" alt="Class Toggles">
              </div>
              <div class="mdl-card__title">
                 <h4 class="mdl-card__title-text">Class Toggles</h4>
              </div>
              <div class="mdl-card__supporting-text">
                <span class="mdl-typography--font-light mdl-typography--subhead">Quickly enable, disable or add new classes to elements.</span>
              </div>
              <div class="mdl-card__actions">
                 <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="/web/updates/2016/02/devtools-digest-supercharged-remote-debugging">
                   Start toggling
                 </a>
              </div>
            </div>

          </div>

    </div>
    
  </div>

  <div class="wf-devtools-alternate wf-secondaryheading">
    <div class="page-content">
      <h2 class="mdl-typography--font-light">Get Involved</h2>

      <div class="mdl-grid wf-devtools-getinvolved">

        <div class="mdl-cell--4-col mdl-cell">
          <h3>Connect</h3>
          <ul>
            <li><a href="https://twitter.com/ChromeDevTools">Twitter</a></li>
            <li><a href="https://stackoverflow.com/questions/tagged/google-chrome-devtools">StackOverflow</a></li>
            <li><a href="https://plus.google.com/+GoogleChromeDevelopers">Google+</a></li>
            <li><a href="https://www.youtube.com/user/ChromeDevelopers">YouTube</a></li>
            <li><a href="https://chromiumdev.slack.com/messages/devtools/">Slack</a></li>
          </ul>
        </div>

        <div class="mdl-cell--4-col mdl-cell">
          <h3>Contribute</h3>
          <ul>
            <li><a href="https://crbug.com/new">File a bug</a></li>
            <li><a href="https://developer.chrome.com/devtools/docs/contributing">How to Contribute</a></li>
          </ul>
        </div>

        <div class="mdl-cell--4-col mdl-cell">
          <h3>Extend</h3>
          <ul>
            <li><a href="https://developer.chrome.com/devtools/docs/integrating">Integrating with DevTools and Chrome</a></li>
            <li><a href="https://developer.chrome.com/extensions/devtools">DevTools Extensions API</a></li>
            <li><a href="https://developer.chrome.com/devtools/docs/debugger-protocol">Debugger protocol</a></li>
          </ul>
        </div>
      </div>

    </div>
    
  </div>

</div>


