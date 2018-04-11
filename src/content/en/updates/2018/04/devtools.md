project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Search across network headers, copy requests as fetch, audit pages using desktop conditions, and much more.

{# wf_updated_on: 2018-04-11 #}
{# wf_published_on: 2018-04-10 #}
{# wf_tags: chrome67,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Search across network headers, copy requests as fetch, audit pages using desktop conditions, and much more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 67) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around early June 2018.

New features and major changes coming to DevTools in Chrome 67 include:

* [Search across all network headers](#network-search)
* [Copy as fetch](#fetch)
* [New audits, desktop configuration options, and viewing traces](#audits)
* [Stop infinite loops](#stop)
* [JavaScript VM instances clearly listed in the **Memory** panel](#vm)
* [The **Network** tab in the **Sources** panel has been renamed to the **Page** tab](#page)
* [Dark theme updates](#dark)
* [Total memory usage in the **Performance Monitor**](#monitor)
* [Certificate transparency information in the **Security** panel](#security)
* [Site isolation features in the **Performance** and **Memory** panels](#site-isolation)

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

## Search across all network headers and responses {: #network-search }

Open the **Network** panel then press <kbd>Command</kbd>+<kbd>F</kbd> (Mac) or
<kbd>Control</kbd>+F</kbd> (Windows, Linux, Chrome OS) to open the new **Network Search** pane.
DevTools searches the headers and bodies of all network requests for the query that you provide.

<figure>
  <img alt="Searching for the text 'cache-control' with the new Network Search pane."
       src="/web/updates/images/2018/04/network-search.png"/>
  <figcaption>
    <b>Figure X</b>. Searching for the text <code>cache-control</code> with the new Network
    Search pane
  </figcaption>
</figure>

Click **Match Case** ![Match Case][Case]{.cdt-inl} to make your query case-sensitive. Click
**Use Regular Expression** ![Use Regular Expression][RegEx]{.cdt-inl} to show any results that
match the pattern you provide. You don't need to wrap your RegEx in forward slashes.

[Case]: /web/updates/images/2018/04/match-case.png
[RegEx]: /web/updates/images/2018/04/use-regex.png

<figure>
  <img alt="A regular expression query in the Network Search pane."
       src="/web/updates/images/2018/04/regex.png"/>
  <figcaption>
    <b>Figure X</b>. A regular expression query in the Network Search pane.
  </figcaption>
</figure>

### Search pane UI updates {: #search }

The UI of the **Global Search** pane now matches the UI of the new **Network Search** pane. It
now also pretty-prints results to aid scannability.

<figure>
  <img alt="The old and new UI."
       src="/web/updates/images/2018/04/search-ui.png"/>
  <figcaption>
    <b>Figure X</b>. The old UI on the left, and the new UI on the right
  </figcaption>
</figure>

Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>F</kbd> (Mac) or
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> (Windows, Linux, Chrome OS) to open **Global
Search**. You can also open it via the [Command Menu][CM].

[CM]: /web/tools/chrome-devtools/shortcuts#command-menu

## Copy as fetch {: #fetch }

Right-click a network request then select **Copy** > **Copy As Fetch** to copy the
`fetch()`-equivalent code for that request to your clipboard.

<figure>
  <img alt="Copying the fetch()-equivalent code for a request."
       src="/web/updates/images/2018/04/fetch.png"/>
  <figcaption>
    <b>Figure X</b>. Copying the <code>fetch()</code>-equivalent code for a request
  </figcaption>
</figure>

DevTools produces code like the following:

    fetch("https://preload.glitch.me/styles.css", {
      "credentials": "omit",
      "headers": {},
      "referrer": "https://preload.glitch.me/after/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": null,
      "method": "GET",
      "mode": "cors"
    });

## Audits panel updates {: #audits }

### New audits {: #new-audits }

The **Audits** panel has 2 new audits, including:

* [Preload key requests](/web/tools/lighthouse/audits/preload). Preloading requests can
  speed up page load time by giving hints to the browser to download resources that are important
  for your Critical Rendering Path as soon as possible.
* [Avoid invisible text while webfonts are loading](/web/updates/2016/02/font-display). Ensuring
  that text is visible while webfonts load makes the page more useful to users faster.

### New configuration options {: #audit-config }

You can now configure the **Audits** panel to:

* Preserve desktop viewport and user agent settings. In other words, you can prevent the **Audits**
  panel from simulating a mobile device.
* Disable network and CPU throttling.
* Preserve storage, such as LocalStorage and IndexedDB, across audits.

<figure>
  <img alt="New audit configuration options."
       src="/web/updates/images/2018/04/audit-config.png"/>
  <figcaption>
    <b>Figure X</b>. New audit configuration options
  </figcaption>
</figure>

### View traces {: #traces }

After auditing a page, click **View Trace** to view the load performance data that your audit
is based off of in the **Performance** panel.

<figure>
  <img alt="The View Trace button."
       src="/web/updates/images/2018/04/view-trace.png"/>
  <figcaption>
    <b>Figure X</b>. The <b>View Trace</b> button
  </figcaption>
</figure>

## Stop infinite loops {: #stop }

If you work with `for` loops, `do...while` loops, or recursion a lot, you've probably executed
an infinite loop by mistake while developing your site. To stop the infinite loop, you can now:

1. Open the **Sources** panel.
1. Click **Pause** ![Pause][Pause]{: .cdt-inl }. The button changes to **Resume Script
   Execution** ![Resume][Resume]{:.cdt-inl}.
1. Hold **Resume Script Execution** ![Resume][Resume]{: .cdt-inl } then select **Stop Current
   JavaScript Call** ![Stop][Stop]{:.cdt-inl}.

[Pause]: /web/updates/images/2018/04/pause.png
[Resume]: /web/tools/chrome-devtools/images/resume-script-execution.png
[Stop]: /web/updates/images/2018/04/stop.png

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="haFYwEBjaTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div> 

In the video above, the clock is being updated via a `setInterval()` timer. Clicking
**Start Infinite Loop** runs a `do...while` loop that never stops. The interval resumes because
it wasn't running when **Stop Current JavaScript Call** ![Stop][Stop]{:.cdt-inl} was selected.

## Performance tabs now list activity by thread {: #tabs }

When viewing a Performance recording, click a section 

## Select JavaScript VM instances in the Memory panel {: #vm }

The **Memory** panel now clearly lists out all JavaScript VM instances associated with a page,
rather than hiding them behind the **Target** dropdown menu as before.

<figure>
  <img alt="."
       src="/web/updates/images/2018/04/js-vm.png"/>
  <figcaption>
    <b>Figure X</b>. In the old UI on the left, the JavaScript VM instances are hidden behind
    the <b>Target</b> dropdown menu, whereas in the new UI on the right they are shown in the
    <b>Select JavaScript VM Instance</b> table
  </figcaption>
</figure>

Next to the `developers.google.com` instance there are 2 values: `8.7 MB` and `13.3 MB`.
The left value represents memory allocated because of JavaScript. The right value represents all
OS memory that is being allocated because of that VM instance. The right value is inclusive
of the left value. In Chrome's Task Manager, the left value corresponds to `JavaScript Memory`
and the right value corresponds to `Memory Footprint`.

## Network tab renamed to Page tab {: #page }

On the **Sources** panel, the **Network** tab is now called the **Page** tab.

<figure>
  <img alt="Two DevTools windows side-by-side, demonstrating the name change."
       src="/web/updates/images/2018/04/page.png"/>
  <figcaption>
    <b>Figure X</b>. In the old UI on the left, the tab showing the page's resources is called
    <b>Network</b>, whereas in the new UI on the right it's called <b>Page</b>
  </figcaption>
</figure>

## Dark theme updates {: #dark }

Chrome 67 ships with a number of minor changes to the dark theme color scheme. For example,
the breakpoint icons and the current line of execution are now green.

<figure>
  <img alt="A screenshot of the new breakpoint icon and current line of execution color scheme."
       src="/web/updates/images/2018/04/dark-theme.png"/>
  <figcaption>
    <b>Figure X</b>. A screenshot of the new breakpoint icon and current line of execution
    color scheme
  </figcaption>
</figure>

## Certificate transparency in the Security panel {: #security }

The **Security** panel now reports [certificate transparency][transparency]{:.external}
information.

[transparency]: https://www.certificate-transparency.org/

<figure>
  <img alt="Certificate transparency information in the Security panel."
       src="/web/updates/images/2018/04/certificate-transparency.png"/>
  <figcaption>
    <b>Figure X</b>. Certification transparency information in the Security panel
  </figcaption>
</figure>

## Site Isolation in the Performance panel {: #site-isolation }

If you've got [Site Isolation][SI]{:.external} enabled, the **Performance** panel now provides
a flame chart for each process so that you can see the total work that each process is causing.

<figure>
  <img alt="Per-process flame charts in a Performance recording."
       src="/web/updates/images/2018/04/perf-isolation.png"/>
  <figcaption>
    <b>Figure X</b>. Per-process flame charts in a Performance recording
  </figcaption>
</figure>

[SI]: https://www.chromium.org/Home/chromium-security/site-isolation

## Feedback {: #feedback }

* File bug reports at [Chromium Bugs](https://crbug.com){:.external}.
* Discuss features and changes on the [Mailing List][ML]{:.external}. Please don't use this
  channel for support questions. Use Stack Overflow, instead.
* Get help on how to use DevTools on [Stack Overflow][SO]{:.external}. Please don't file bugs
  here. Use Chromium Bugs, instead.
* Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
* File bugs on this doc in the [Web Fundamentals][WF]{:.external} repository.

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[WF]: https://github.com/google/webfundamentals/issues/new
[SO]: https://stackoverflow.com/questions/tagged/google-chrome-devtools

## Consider Canary {: #canary }

If you're on Mac or Windows, please consider using [Chrome Canary][canary] as your default
development browser. If you report a bug or a change that you don't like while it's still in
Canary, the DevTools team can address your feedback significantly faster.

Note: Canary is the bleeding-edge version of Chrome. It's released as soon as its built, without
testing. This means that Canary breaks from time-to-time, about once-a-month, and it's usually
fixed within a day. You can go back to using Chrome Stable while Canary is broken.

[canary]: https://www.google.com/chrome/browser/canary.html

## Previous release notes {: #links }

See the [devtools-whatsnew][tag] tag for links to all previous DevTools
release notes.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}
