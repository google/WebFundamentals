project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Performance Monitor, Console Sidebar, and Console groupings.

{# wf_updated_on: 2018-01-18 #}
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

Use the Performance Monitor to get a real-time view of various aspects of a page's performance,
including:

* CPU usage.
* JavaScript heap size.
* The total number of DOM nodes, JavaScript event listeners, documents, and frames on the page.
* Layouts and style recalculations per second.

To use the Performance Monitor:

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

## Feedback {: #feedback }

The best place to discuss any of the features or changes you see here is
the [google-chrome-developer-tools@googlegroups.com mailing list][ML]. You
can also tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools) if
you're short on time. If you're sure that you've encountered a bug in
DevTools, please [open an issue](https://crbug.com/new).

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Previous release notes {: #links }

See the [devtools-whatsnew][tag] tag for links to all previous DevTools
release notes.

[tag]: /web/updates/tags/devtools-whatsnew
