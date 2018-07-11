project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New features and changes coming to DevTools in Chrome 58.

{# wf_updated_on: 2018-07-02 #}
{# wf_published_on: 2017-03-06 #}
{# wf_tags: chrome58,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New features and changes coming to DevTools in Chrome 58. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 58) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Welcome to the first installment of the DevTools release notes! From here on
out, the first time you open a new version of Chrome, DevTools opens the
**What's New** drawer with a link to the release notes for that version.

## Highlights

* The Timeline panel has been renamed to the Performance panel.
* The Profiles panel has been renamed to the Memory panel.
* Cookie values are now editable.
* DevTools now automatically pauses before out-of-memory errors.

## New features

### Editable cookies {: #cookies }

Double-click on a cell in the **Cookies** tab to edit that value.

<figure>
  <img src="/web/updates/images/2017/03/editable-cookies.png"/>
  <figcaption>
    <b>Figure 1</b>. Editing a cookie
  </figcaption>
</figure>

Thanks to [kdzwinel](https://twitter.com/kdzwinel) for the contribution!

### Inspectable and editable CSS variables in the Styles pane {: #css-variables }

You can now inspect and edit CSS variables in the Styles pane. See [CSS
Variables Demo][css vars] to try it out yourself.

[css vars]: https://googlechrome.github.io/devtools-samples/author/css-vars

### Out-of-memory breakpoints {: #out-of-memory-breakpoints }

When an app allocates a lot of memory in a short amount of time, DevTools now
automatically pauses and increases the heap limit. This enables you to inspect
the heap, execute commands on the Console to free up memory, and continue
debugging the issue. See [One Small Step For Chrome, One Giant Heap For
V8][heap] for more information.

<figure>
  <img src="/web/updates/images/2017/03/out-of-memory-breakpoint.png"/>
  <figcaption>
    <b>Figure 2</b>. Paused on an out-of-memory breakpoint
  </figcaption>
</figure>

[heap]: https://v8project.blogspot.com/2017/02/one-small-step-for-chrome-one-giant.html

### Breakpoints on canvas creation {: #canvas-creation-breakpoints }

You can now create [event listener breakpoints][event-listener-breakpoint]
that are triggered whenever a new canvas context is created.

<figure>
  <img src="/web/updates/images/2017/03/canvas-breakpoint.png"/>
  <figcaption>
    <b>Figure 3</b>. Canvas creation breakpoints via the <b>Create canvas
    context</b> checkbox in the <b>Event Listener Breakpoints</b> pane
  </figcaption>
</figure>

[event-listener-breakpoint]: /web/tools/chrome-devtools/javascript/breakpoints#event-listeners

### Start time stats in the Timing tab {: #start-stats }

At the top of the Timing tab, you can now see when a request was queued and
started.

<figure>
  <img src="/web/updates/images/2017/03/request-start-times.svg"/>
  <figcaption>
    <b>Figure 4</b>. Start time stats in the Timing tab
  </figcaption>
</figure>

### Server stats in the Timing tab {: #server-stats }

You can now insert custom server statistics into the Timing tab. See
[Demo of server timing values][server] for an example.

[server]: https://gist.github.com/paulirish/a76ac17fc211b019e538c09d8d827691

<figure>
  <img src="/web/updates/images/2017/03/server-stats.svg"/>
  <figcaption>
    <b>Figure 5</b>. Server stats in the <b>Timing</b> tab
  </figcaption>
</figure>

Thanks to [sroussey](https://twitter.com/sroussey) for the contribution!

## Changes

### The Timeline panel is now the Performance panel {: #performance-panel }

The Timeline panel has been renamed to the Performance panel, to better
reflect its purpose.

### The Profiles panel is now the Memory panel {: #memory-panel }

The Profiles panel has been renamed to the Memory panel, to better
reflect its purpose.

### The CPU Profiler is behind a hidden panel {: #cpu-profiler }

Now that the Profiles panel is called the Memory panel, it doesn't really
make sense to have the CPU profiler on that panel anymore. Furthermore,
the long-term goal is to get all users profiling from the Performance panel.
In the meantime, you can still access the old CPU profiler from
[**Settings**][settings] > **More Tools** > **JavaScript Profiler**.

See [Chrome DevTools: JavaScript CPU Profiling in Chrome 58][migration]
to learn how to profile CPU in the Performance panel.

[settings]: /web/tools/chrome-devtools/ui#settings
[migration]: /web/updates/2016/12/devtools-javascript-cpu-profile-migration

### New Console UI {: #console }

The Console panel and drawer have undergone some UI changes. Some unpopular features
have been moved to more hidden locations, and popular features are now more
easily accessible.

* Click **Console Settings** ![Console Settings][console settings]{:.devtools-inline} to
  access settings for customizing the Console's behavior.
* **Preserve log** is now hidden in **Console Settings**.
* The **Filters** button and pane is gone. Use the dropdown menu instead.
* The text box for filtering logs is now always shown. It was previously
  hidden in the Filters pane.
* The filtering text box automatically accepts RegEx, so the
  **Regex** checkbox is gone.
* The **Hide violations** checkbox is gone. Set the logging level dropdown to
  **Verbose** to see violations.
* Unchecking the **Show all messages** checkbox in the old UI is equivalent
  to checking the **Selected context only** checkbox in **Console Settings**
  in the new UI.

<figure>
  <img src="/web/updates/images/2017/03/console.png"/>
  <figcaption>
    <b>Figure 6</b>. The new Console UI
  </figcaption>
</figure>

[console settings]: /web/updates/images/2017/03/console-settings.png

### WebGL event listener breakpoints have moved {: #webgl }

The WebGL [event listener breakpoints][event-listener-breakpoint]
have moved from the **WebGL** category to the **Canvas** category. The
**WebGL** category has been removed.

{% include "comment-widget.html" %}
