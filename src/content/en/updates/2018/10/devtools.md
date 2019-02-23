project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Highlight DOM nodes from Live expressions, store nodes as global variables, and more.

{# wf_updated_on: 2018-12-03 #}
{# wf_published_on: 2018-10-10 #}
{# wf_tags: chrome71,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Highlight DOM nodes from Live expressions, store nodes as global variables, and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 71) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

New features and major changes coming to Chrome DevTools in Chrome 71 include:

* [Hover over a Live Expression to highlight a DOM node](#hover)
* [Store DOM nodes as global variables](#store)
* [Initiator and priority information now in HAR imports and exports](#HAR)
* [Access the Command Menu from the Main Menu](#command-menu)
* [Picture-in-Picture breakpoints](#picture-in-picture)
* [(Bonus Tip) Run monitorEvents() in the Console to watch an element's events fire](#bonus)

Read on, or watch the video version of this page:

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="fJxFZO8OEEs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Hover over a Live Expression to highlight a DOM node {: #hover }

When a [Live Expression][LE] evaluates to a DOM node, hover over the Live Expression result to
highlight that node in the viewport.

[LE]: /web/updates/2018/08/devtools#watch

<figure>
  <img src="/web/updates/images/2018/10/hover1.png"
       alt="Hovering over a Live Expression result to highlight the node in the viewport."/>
  <figcaption>
    <b>Figure 1</b>. Hovering over a Live Expression result to highlight the node in the viewport
  </figcaption>
</figure>

## Store DOM nodes as global variables {: #store }

To store a DOM node as a global variable, run an expression in the Console that evaluates to
a node, right-click the result, and then select **Store as global variable**.

<figure>
  <img src="/web/updates/images/2018/10/store1.png"
       alt="Store as global variable in the Console."/>
  <figcaption>
    <b>Figure 2</b>. Store as global variable in the Console
  </figcaption>
</figure>

Or, right-click the node in the **DOM Tree** and select **Store as global variable**.

<figure>
  <img src="/web/updates/images/2018/10/store2.png"
       alt="Store as global variable in the DOM Tree."/>
  <figcaption>
    <b>Figure 3</b>. Store as global variable in the DOM Tree
  </figcaption>
</figure>

## Initiator and priority information now in HAR imports and exports {: #HAR }

If you'd like to diagnose network logs with colleagues, you can [export the network requests
to a HAR file][export].

[export]: /web/tools/chrome-devtools/network-performance/reference#save-as-har

<figure>
  <img src="/web/tools/chrome-devtools/network-performance/imgs/save-as-har.png"
       alt="Exporting network requests to a HAR file."/>
  <figcaption>
    <b>Figure 8</b>. Exporting network requests to a HAR file
  </figcaption>
</figure>

To import the file back into the Network panel, just drag and drop it.

When you export a HAR file, DevTools now includes initiator and priority information in
the HAR file. When you import HAR files back into DevTools, the **Initiator** and **Priority** columns
are now populated.

The `_initiator` field provides more context around what caused the resource to be requested.
This maps to the **Initiator** column in the Requests table.

<figure>
  <img src="/web/updates/images/2018/10/HAR1.png"
       alt="The initiator column."/>
  <figcaption>
    <b>Figure 9</b>. The initiator column
  </figcaption>
</figure>

You can also [hold <kbd>Shift</kbd> and hover over a request][initiator] to view its initiator and dependencies.

[initiator]: /web/tools/chrome-devtools/network-performance/reference#initiators-dependencies

<figure>
  <img src="/web/tools/chrome-devtools/network-performance/imgs/initiators-dependencies.png"
       alt="Viewing initiators and dependencies."/>
  <figcaption>
    <b>Figure 10</b>. Viewing initiators and dependencies
  </figcaption>
</figure>

The `_priority` field states what priority level the browser assigned to the resource. This maps to the
**Priority** column in the Requests table, which is hidden by default.

<figure>
  <img src="/web/updates/images/2018/10/HAR2.png"
       alt="The Priority column."/>
  <figcaption>
    <b>Figure 11</b>. The Priority column
  </figcaption>
</figure>

Right-click the header of the Requests table and select **Priority** to show the **Priority** column.

<figure>
  <img src="/web/updates/images/2018/10/HAR3.png"
       alt="How to show the Priority column."/>
  <figcaption>
    <b>Figure 12</b>. How to show the <b>Priority</b> column
  </figcaption>
</figure>

Note: The `_initiator` and `_priority` fields begin with underscores because the [HAR spec][spec]{: .external }
states that custom fields must begin with underscores.

[spec]: https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html

## Access the Command Menu from the Main Menu {: #command-menu }

Use the [Command Menu](/web/tools/chrome-devtools/ui#command-menu) for a fast way to access DevTools panels,
tabs, and features.

<figure>
  <img src="/web/tools/chrome-devtools/images/command-menu.png"
       alt="The Command Menu."/>
  <figcaption>
    <b>Figure 13</b>. The Command Menu
  </figcaption>
</figure>

You can now open the Command Menu from the Main Menu. Click the **Main Menu** ![main][main]{: .inline-icon }
button and select **Run command**.

[main]: /web/tools/chrome-devtools/images/shared/main-menu.png

<figure>
  <img src="/web/updates/images/2018/10/command-menu1.png"
       alt="Opening the Command Menu from the Main Menu."/>
  <figcaption>
    <b>Figure 14</b>. Opening the Command Menu from the Main Menu
  </figcaption>
</figure>

## Picture-in-Picture breakpoints {: #picture-in-picture }

[Picture-in-Picture][PiP]{: .external } is a new experimental API that enables a page to create
a floating video window over the desktop.

[PiP]: https://github.com/WICG/picture-in-picture

Enable the `enterpictureinpicture`, `leavepictureinpicture`, and `resize` checkboxes in the
[Event Listener Breakpoints pane][ELBs] to pause whenever one of these picture-in-picture events
fires. DevTools pauses on the first line of the handler.

[ELBs]: /web/tools/chrome-devtools/javascript/breakpoints#event-listeners

<figure>
  <img src="/web/updates/images/2018/10/pip1.png"
       alt="Picture-in-Picture events in the Event Listener Breakpoints pane."/>
  <figcaption>
    <b>Figure 16</b>. Picture-in-Picture events in the Event Listener Breakpoints pane
  </figcaption>
</figure>

## (Bonus Tip) Run monitorEvents() in the Console to watch an element's events fire {: #bonus }

[monitorevents]: /web/tools/chrome-devtools/console/command-line-reference#monitorevents
[unmonitorevents]: /web/tools/chrome-devtools/console/command-line-reference#unmonitorevents

Note: This section covers a lesser-known feature that has been in DevTools for a long time.

Suppose you want to add a red border around a button after focusing it and pressing `R`, `E`, `D`,
but you don't know what events to add listeners to. Use [`monitorEvents()`][monitorevents] to log
all of the element's events to the Console.

1. Get a reference to the node.

     <figure>
       <img src="/web/updates/images/2018/10/bonus1.png"
            alt="Using 'Store as global variable' to get a reference to the node."/>
       <figcaption>
         <b>Figure 17</b>. Using <b>Store as global variable</b> to get a reference to the node
       </figcaption>
     </figure>

1. Pass the node as the first argument to `monitorEvents()`.

     <figure>
       <img src="/web/updates/images/2018/10/bonus2.png"
            alt="Passing the node to monitorEvents()."/>
       <figcaption>
         <b>Figure 18</b>. Passing the node to <code>monitorEvents()</code>
       </figcaption>
     </figure>

1. Interact with the node. DevTools logs all of the node's events to the Console.

     <figure>
       <img src="/web/updates/images/2018/10/bonus3.png"
            alt="The node's events in the Console."/>
       <figcaption>
         <b>Figure 19</b>. The node's events in the Console
       </figcaption>
     </figure>

Call [`unmonitorEvents()`][unmonitorevents] to stop logging events to the Console.

    unmonitorEvents(temp1);

Pass an array as the second argument to `monitorEvents()` if you only want to monitor certain events or
types of events:

    monitorEvents(temp1, ['mouse', 'focus']);

The `mouse` type tells DevTools to log all mouse-related events, such as `mousedown` and `click`.
Other supported types are `key`, `touch`, and `control`.

Check out [Command Line Reference](/web/tools/chrome-devtools/console/command-line-reference) for
other handy functions that you can call from the Console.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}

To discuss the new features and changes in this post, or anything else related to DevTools:

* File bug reports at [Chromium Bugs](https://crbug.com){:.external}.
* Discuss features and changes on the [Mailing List][ML]{:.external}. Please don't use the mailing
  list for support questions. Use Stack Overflow, instead.
* Get help on how to use DevTools on [Stack Overflow][SO]{:.external}. Please don't file bugs
  on Stack Overflow. Use Chromium Bugs, instead.
* Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
* File bugs on this doc in the [Web Fundamentals][WF]{:.external} repository.

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[WF]: https://github.com/google/webfundamentals/issues/new
[SO]: https://stackoverflow.com/questions/tagged/google-chrome-devtools

## Consider Canary {: #canary }

If you're on Mac or Windows, consider using [Chrome Canary][canary] as your default
development browser. Canary gives you access to the latest DevTools features.

Note: Canary is released as soon as its built, without testing. This means that Canary
breaks about once-a-month. It's usually fixed within a day. You can go back to using Chrome
Stable while Canary is broken.

[canary]: https://www.google.com/chrome/browser/canary.html

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
