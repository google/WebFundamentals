project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Multi-client remote debugging, push notifications with custom data, and Workspaces 2.0.

{# wf_updated_on: 2017-10-11 #}
{# wf_published_on: 2017-10-11 #}
{# wf_tags: chrome63,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Multi-client remote debugging, push notifications with custom data, and Workspaces 2.0. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 63) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around
early-December 2017.

Welcome back! New features coming to DevTools in Chrome 63 include:

* [Multi-client remote debugging support](#multi-client).
* [Workspaces 2.0](#workspaces).
* [Simulate push notifications with custom data](#push).
* [Trigger background sync events with custom tags](#sync).

Note: You can check what version of Chrome you're running at
`chrome://version`. Chrome auto-updates to a new major version about every 6
weeks.

## Multi-client remote debugging support {: #multi-client }

If you've ever tried debugging an app from an IDE like VS Code or WebStorm,
you've probably discovered that opening DevTools messes up your debug session.
This issue also made it impossible to use DevTools to debug WebDriver tests.
See the video below for an example of the issue in VS Code.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="OJlOU6UecFU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

As of Chrome 63, this problem is no more. DevTools now supports multiple
remote debugging clients. Watch the video below to see an example of VS Code
and DevTools in action, side-by-side.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="tTWs0ZyXI-0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Workspaces 2.0 {: #workspaces }

Workspaces have been around for some time in DevTools. This feature enables
you to use DevTools as your IDE. You make some changes to your source code
within DevTools, and the changes persist to the local version of your
project on your file system.

Workspaces 2.0 builds off of 1.0, adding a more helpful UX and improved
auto-mapping of transpiled code.
This feature was originally scheduled to be released shortly after
Chrome Developer Summit (CDS) 2016, but the team postponed it to sort out
some issues.

Check out the "Authoring" part (around 14:28) of the DevTools talk from
CDS 2016 to see Workspaces 2.0 in action.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="HF1luRD4Qmk"
          data-autohide="1" data-showinfo="0" frameborder="0" 
          data-start="868" allowfullscreen>
  </iframe>
</div>

## Simulate push notifications with custom data {: #push }

Simulating push notifications has been around for a while in DevTools,
with one limitation: you couldn't send custom data. But with
the new **Push** text box coming to the **Service Worker** pane in Chrome 63,
now you can. Try it now:

1. Go to [Simple Push Demo](https://gauntface.github.io/simple-push-demo/).
1. Click **Enable Push Notifications**.
1. Click **Allow** when Chrome prompts you to allow notifications.
1. Open DevTools.
1. Go to the **Service Workers** pane.
1. Write something in the **Push** text box.

     <figure>
       <img src="/web/updates/images/2017/10/push-text.png"
            alt="Simulating a push notification with custom data."
       <figcaption>
         <b>Figure 1</b>. Simulating a push notification with custom data
         via the <b>Push</b> text box in the <b>Service Worker</b> pane
       </figcaption>
     </figure>

1. Click **Push** to send the notification.

     <figure>
       <img src="/web/updates/images/2017/10/push-result.png"
            alt="The simulated push notification"/>
       <figcaption>
         <b>Figure 2</b>. The simulated push notification
       </figcaption>
     </figure>

## Trigger background sync events with custom tags {: #sync }

Triggering background sync events has also been in the **Service Workers**
pane for some time, but now you can send custom tags:

1. Open DevTools.
1. Go to the **Service Workers** pane.
1. Enter some text in the **Sync** text box.
1. Click **Sync**.

<figure>
  <img src="/web/updates/images/2017/10/sync.png"
       alt="Triggering a custom background sync event"/>
  <figcaption>
    <b>Figure 3</b>. After clicking <b>Sync</b>, DevTools sends a background
    sync event with the custom tag <code>update-content</code> to the service
    worker
  </figcaption>
</figure>

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
