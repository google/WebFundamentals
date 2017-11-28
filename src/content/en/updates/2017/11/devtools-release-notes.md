project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local overrides, Performance Monitor, Console Sidebar, and Console groupings.

{# wf_updated_on: 2017-11-28 #}
{# wf_published_on: 2017-11-28 #}
{# wf_tags: chrome64,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local overrides, Performance Monitor, Console Sidebar, and Console groupings. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 64) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around
late-January 2018.

Welcome back! New features coming to DevTools in Chrome 64 include:

* [Local Overrides](#overrides). Make changes to a page's HTML, CSS, or JavaScript that
  persist across page loads.
* [Performance Monitor](#perf-monitor). View a page's performance in real-time.
* [Console Sidebar](#console-sidebar). Reduce Console noise and focus on the messages that are
  important to you.
* [Group similar Console messages](#group-similar). The Console now groups similar messages
  together by default.

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

## Local Overrides {: #overrides }

Suppose you're using DevTools to change a site's HTML, CSS, or JavaScript. When you reload
the page, the changes are lost. Local Overrides make it possible to persist the changes
across page loads. To use Local Overrides:

1. Open the **Sources** panel.
1. Open the **Overrides** tab.

     <figure>
       <img src="/web/updates/images/2017/11/overrides-tab.png"
            alt="Opening the Overrides tab."
       <figcaption>
         <b>Figure 1</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Click **Setup Overrides**.
1. Select the directory where you want to save the changes.
1. Click **Allow** to give DevTools write access to the directory. The **Overrides** tab
   now shows the mapping between the site and your local directory.

     <figure>
       <img src="/web/updates/images/2017/11/overrides-created.png"
            alt="DevTools showing the local override mapping."
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab shows the mapping between the site
         <code>developers.google.com</code> and the local directory <code>test</code>
       </figcaption>
     </figure>

1. Make some changes to the site's code via the **Styles** pane or the **Sources** panel.
   These changes now persist across page loads.
   
     <aside class="caution">
       **Caution!** Changes made via the **DOM Tree** in the **Elements** panel do not
       persist. Make HTML changes via the **Sources** panel.
     </aside>

     <figure>
       <img src="/web/updates/images/2017/11/style-change.png"
            alt="Changing the style of an element."
       <figcaption>
         <b>Figure 3</b>. Setting the <code>color</code> property of the selected
         <code>h1</code> element to <code>crimson</code>
       </figcaption>
     </figure>

1. Open the local directory that you mapped to the site. For every change you make, DevTools
   saves a copy of the modified file to this directory.

     <figure>
       <img src="/web/updates/images/2017/11/local-change.png"
            alt="Viewing the local copy of a modified file"
       <figcaption>
         <b>Figure 4</b>. Viewing the local copy of a modified file
       </figcaption>
     </figure>

Check out Paul Irish's talk from Chrome Dev Summit 2017 for a video example of this workflow.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="7-XnEMrQnn4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="158" allowfullscreen>
  </iframe>
</div>

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
         <b>Figure 5</b>. The Performance Monitor
       </figcaption>
     </figure>

1. Click a metric to show or hide it. In Figure 5 the **CPU Usage**, **JS heap size**, and
   **JS event listeners** charts are shown.

## Console Sidebar {: #console-sidebar }

On large sites, the Console can quickly get flooded with irrelevant messages. Use the new
**Console Sidebar** to reduce the noise and focus on the messages that are important to you.

<figure>
  <img src="/web/updates/images/2017/11/console-sidebar.png"
       alt="Using the Console Sidebar to show error messages only"
  <figcaption>
    <b>Figure 6</b>. Using the Console Sidebar to show error messages only
  </figcaption>
</figure>

The Console Sidebar is hidden by default. Click **Show Console Sidebar** ![Show Console
Sidebar](/web/updates/images/2017/11/show-console-sidebar.png){:.cdt-inl} to show it.

## Group similar Console messages {: #group-similar }

The Console now groups similar messages together by default. For example, in Figure 7
there are 27 instances of the message `[Violation] Avoid using document.write()`.

<figure>
  <img src="/web/updates/images/2017/11/group-similar.png"
       alt="An example of the Console grouping similar messages together"
  <figcaption>
    <b>Figure 8</b>. An example of the Console grouping similar messages together
  </figcaption>
</figure>

Click on a group to expand it and see each instance of the message.

<figure>
  <img src="/web/updates/images/2017/11/group-expanded.png"
       alt="An example of an expanded group of Console messages"
  <figcaption>
    <b>Figure 9</b>. An example of an expanded group of Console messages
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
