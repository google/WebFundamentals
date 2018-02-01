project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Performance Monitor, Console Sidebar, and Console groupings.

{# wf_updated_on: 2018-02-01 #}
{# wf_published_on: 2017-11-28 #}
{# wf_tags: chrome64,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Performance Monitor, Console Sidebar, and Console groupings. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 64) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around
late-January 2018.

Welcome back! New features coming to DevTools in Chrome 64 include:

* [Performance Monitor](#perf-monitor). View a page's performance in real-time.
* [Console Sidebar](#console-sidebar). Reduce Console noise and focus on the messages that are
  important to you.
* [Group similar Console messages](#group-similar). The Console now groups similar messages
  together by default.

Read on, or watch the video version of these release notes below.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="90wNAn05Cf4"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

## Performance Monitor {: #perf-monitor }

Use the **Performance Monitor** to get a real-time view of various aspects of a page's load
or runtime performance, including:

* CPU usage.
* JavaScript heap size.
* The total number of DOM nodes, JavaScript event listeners, documents, and frames on the page.
* Layouts and style recalculations per second.

If users are reporting that your app feels slow or janky, check the **Performance Monitor** for
clues.

<aside class="success"><b>Why load perf matters</b>: BookMyShow achieved an 80% increase
in conversions when they built a Progressive Web App that focused on speed.
<a href="/web/showcase/2017/bookmyshow">Learn more</a>.</aside>

To use the **Performance Monitor**:

1. Open the [Command Menu](/web/tools/chrome-devtools/ui#command-menu).
1. Start typing `Performance` then select `Show Performance Monitor`.

     <figure>
       <img src="/web/updates/images/2017/11/perf-monitor.png"
            alt="The Performance Monitor"
       <figcaption>
         <b>Figure 1</b>. The Performance Monitor
       </figcaption>
     </figure>

1. Click a metric to show or hide it. In Figure 1 the **CPU Usage**, **JS heap size**, and
   **JS event listeners** charts are shown.

Related features:

* **Performance** panel. Walk through a critical user journey and record everything that
  happens on the page, including JavaScript activity, network requests, CPU usage, and much more.
  Can also be used to analyze load performance. 
  [Learn more][runtime].
* **Audits** panel. Run a suite of automated load and runtime performance tests against any URL.
  [Learn more][audits].

If you're just starting out with analyzing performance, the recommended path is to first use
the **Audits** panel, and then investigate further using the **Performance** panel or
**Performance** monitor.

[runtime]: /web/tools/chrome-devtools/evaluate-performance/
[audits]: /web/tools/lighthouse/#devtools

## Console Sidebar {: #console-sidebar }

On large sites, the Console can quickly get flooded with irrelevant messages. Use the new
**Console Sidebar** to reduce the noise and focus on the messages that are important to you.

<figure>
  <img src="/web/updates/images/2017/11/console-sidebar.png"
       alt="Using the Console Sidebar to show error messages only"
  <figcaption>
    <b>Figure 2</b>. Using the Console Sidebar to show error messages only
  </figcaption>
</figure>

The Console Sidebar is hidden by default. Click **Show Console Sidebar** ![Show Console
Sidebar](/web/updates/images/2017/11/show-console-sidebar.png){:.cdt-inl} to show it.

Related features:

* **Filter** text box. Enter some text and the **Console** only shows messages that include
  that text. Also supports regex patterns, [negative filters][neg], and [URL filters][url].

[neg]: /web/updates/2017/08/devtools-release-notes#negative-filters
[url]: /web/updates/2017/08/devtools-release-notes#url-filters

## Group similar Console messages {: #group-similar }

The Console now groups similar messages together by default. For example, in Figure 3
there are 27 instances of the message `[Violation] Avoid using document.write()`.

<figure>
  <img src="/web/updates/images/2017/11/group-similar.png"
       alt="An example of the Console grouping similar messages together"
  <figcaption>
    <b>Figure 3</b>. An example of the Console grouping similar messages together
  </figcaption>
</figure>

Click on a group to expand it and see each instance of the message.

<figure>
  <img src="/web/updates/images/2017/11/group-expanded.png"
       alt="An example of an expanded group of Console messages"
  <figcaption>
    <b>Figure 4</b>. An example of an expanded group of Console messages
  </figcaption>
</figure>

Uncheck the **Group Similar** checkbox to disable this feature.

Related features:

* You can group your own Console messages with [`console.group()`][group].

[group]: /web/tools/chrome-devtools/console/console-reference#group

## Local Overrides {: #overrides }

Whoops! We originally scheduled this feature to launch in Chrome 64, but pulled it close to
the deadline in order to smooth out some rough edges. Apparently, the What's New UI didn't
update in time.

This feature is shipping in Chrome 65, which will land approximately 6 weeks after Chrome 64.
Check out [Local Overrides][LO] to learn more.

[LO]: /web/updates/2018/01/devtools#overrides

## Feedback {: #feedback }

The best place to discuss any of the features or changes you see here is
the [google-chrome-developer-tools@googlegroups.com mailing list][ML]. You
can also tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools) if
you're short on time. If you're sure that you've encountered a bug in
DevTools, please [open an issue](https://crbug.com/new).

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Links to previous release notes {: #links }

See the [devtools-whatsnew][tag] tag for links to all previous DevTools
release notes.

[tag]: /web/updates/tags/devtools-whatsnew
