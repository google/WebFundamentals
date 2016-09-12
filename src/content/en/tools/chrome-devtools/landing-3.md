project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: 

{# wf_updated_on: 2016-07-26 #}
{# wf_published_on: 2016-03-28 #}

# Chrome DevTools {: .page-title }

The Chrome DevTools are a set of web authoring and debugging tools built
into Google Chrome. Use the DevTools to iterate, debug and profile your site.

Note: Looking for the latest, [Chrome Canary](https://tools.google.com/dlpage/chromesxs) always has the latest DevTools.

## Opening the Chrome DevTools

* Select **More Tools** > **Developer Tools** from the Chrome Menu.
* Right-click on a page element and select Inspect
* Use the [keyboard shortcuts](/web/tools/chrome-devtools/iterate/inspect-styles/shortcuts)
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows) or <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>I</kbd> (Mac)

## Discover the Panels

<section class="kd-tabbed-vert" id="horzTab">
  <article>
    <header>i</header>
    <img src="/web/tools/chrome-devtools/images/devicemode.png" alt="Device Mode" class="attempt-right">
    <p>Use the Device Mode to build fully responsive, mobile-first web experiences.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/iterate/device-mode/">Device Mode</a></li>
      <li><a href="/web/tools/chrome-devtools/iterate/device-mode/emulate-mobile-viewports">Test Responsive and Device-specific Viewports</a></li>
      <li><a href="/web/tools/chrome-devtools/iterate/device-mode/device-input-and-sensors">Emulate Sensors: Geolocation &amp; Accelerometer</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
  <article class="selected">
    <header>Elements</header>
    <img src="/web/tools/chrome-devtools/images/elements.png" alt="Elements Panel" class="attempt-right">
    <p>Use the Elements panel to iterate on the layout and design of your site by freely manipulating the DOM and CSS.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/">Inspect and Tweak Your Pages</a></li>
      <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/edit-styles">Edit Styles</a></li>
      <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/edit-dom">Edit the DOM</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
  <article>
    <header>Console</header>
    <img src="/web/tools/chrome-devtools/images/console.png" alt="Console Panel" class="attempt-right">
    <p>Use the Console to log diagnostic information during development or use it as a shell to interact with the JavaScript on the page.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/debug/console/">Using the Console</a></li>
      <li><a href="/web/tools/chrome-devtools/debug/command-line/">Interact from Command Line</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
  <article>
    <header>Sources</header>
    <img src="/web/tools/chrome-devtools/images/sources.png" alt="Sources Panel" class="attempt-right">
    <p>Debug your JavaScript using breakpoints in the Sources Panel or connect your local files via Workspaces to use DevTools live editor.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/debug/breakpoints/">Debugging with Breakpoints</a></li>
      <li><a href="/web/tools/chrome-devtools/debug/readability/">Debug Obfuscated Code</a></li>
      <li><a href="/web/tools/setup/setup-workflow">Set Up Persistence with DevTools Workspaces</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
  <article>
    <header>Network</header>
    <img src="/web/tools/chrome-devtools/images/network.png" alt="Network Panel" class="attempt-right">
    <p>Use the Network panel to get insights into requested and downloaded resources and optimize your page load performance.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/profile/network-performance/resource-loading">Network Panel Basics</a></li>
      <li><a href="/web/tools/chrome-devtools/profile/network-performance/understanding-resource-timing">Understanding Resource Timing</a></li>
      <li><a href="/web/tools/chrome-devtools/profile/network-performance/network-conditions">Network Throttling</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
  <article>
    <header>Timeline</header>
    <img src="/web/tools/chrome-devtools/images/timeline.png" alt="Timeline Panel" class="attempt-right">
    <p>Use the Timeline to improve the run time performance of your page by recording and exploring the various events that happen during the lifecycle of a site.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/profile/evaluate-performance/">How to look at performance</a></li>
      <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime">Analyze runtime performance</a></li>
      <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/forced-synchronous-layouts">Diagnose Forced Synchronous Layouts</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
  <article>
    <header>Profiles</header>
    <img src="/web/tools/chrome-devtools/images/profiles.png" alt="Profiles Panel" class="attempt-right">
    <p>Use the Profiles panel if you need more information than the Timeline provide, for instance to track down memory leaks.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/js-execution">JavaScript CPU Profiler</a></li>
      <li><a href="/web/tools/chrome-devtools/profile/memory-problems">Heap Profiler</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
  <article>
    <header>Application</header>
    <img src="/web/tools/chrome-devtools/images/resources.png" alt="Application Panel" class="attempt-right">
    <p>Use the Resources panel to inspect all resources that are loaded, including IndexedDB or Web SQL databases, local and session storage, cookies, Application Cache, images, fonts, and stylesheets.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/iterate/manage-data/">Manage data</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
  <article>
    <header>Security</header>
    <img src="/web/tools/chrome-devtools/images/security.png" alt="Security Panel" class="attempt-right">
    <p>Use the Security Panel to debug mixed content issues, problems with your certificate and more.</p>
    <ul>
      <li><a href="/web/tools/chrome-devtools/security/">Security</a></li>
    </ul>
    <div style="clear:both;"></div>
  </article>
</section>

## Get Involved

[Twitter](https://twitter.com/ChromeDevTools){: .button .button-white}
[Stack Overflow](https://stackoverflow.com/questions/tagged/google-chrome-devtools){: .button .button-white}
[Slack](https://chromiumdev.slack.com/messages/devtools/){: .button .button-white}
