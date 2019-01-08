project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn how DevTools is going mobile first with a new, streamlined Device Mode that’s always on. Use the color buttons to quickly add colors to your selectors and find out what’s coming to DevTools soon.

{# wf_updated_on: 2015-11-23 #}
{# wf_published_on: 2015-11-23 #}
{# wf_tags: devtools,digest,update #}
{# wf_featured_image: /web/updates/images/2015/11/devtools-digest/animations.png #}

# DevTools Digest (CDS Edition): A Glimpse into the Future and RAIL Profiling {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}



Learn how DevTools is going mobile first with a new, streamlined Device Mode that’s always on. Use the color buttons to quickly add colors to your selectors and find out what’s coming to DevTools soon.

## A glimpse into the future of authoring

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="dJR-n8szgBc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

We’re just coming back from the Chrome Dev Summit where I showed you what working with DevTools looks like today and in the future. I usually don’t mention any features that are still experiments or heavy works of progress in this digest but I’m making an exception this time. If you don’t have time to watch the whole talk, here’s the gist:

### Device Mode version 2

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="r-uc-fENa7w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

We’re still heavily working on this new, bold iteration of the **Device Mode** but wanted to give everyone an opportunity to try it out, so we’ve enabled it in your Canary today. With the changes, we are pushing DevTools into a mobile-first future where mobile development is the default, and Desktop development is the “add-on”. Expect more iteration over the next few weeks with an extended blog post when we’re done.

### Powerful animation inspection

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="MjaYjUram14"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

The work-in-progress **Animation Inspection** gives you a full, detailed picture over what’s happening on anything moving. Instead of showing you a transition on one element at a time, we added heuristics that group complex animations so you can focus on all you’re seeing. Have a look at the video. We’ll offer a bigger, standalone blog post when we’re fully launched.

### Layout Mode (sneak peek)

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="fL1KjPMnEuI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Not quite ready for prime time but very promising is the new Layout Mode, a feature I can’t wait to see fully built out. The Layout Mode adds WYSIWYG editing capabilities to DevTools for any element on the page. So far, the height, width, paddings and margins can be edited in context. It’s going to take a little longer until we’re ready to let you try but we’ll keep you updated.

## Performance profiling with the updated Timeline panel

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="w0O2znkSBXA"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

As part of a bigger push of introducing the new [RAIL performance model](https://www.youtube.com/watch?v=wO9GGY17NXY), there have been hundreds of smaller and bigger changes to the Timeline panel, and together they transform and improve the performance profiling story quite a bit. So instead of showing every individual change in isolation, our own Paul Irish showed us how to properly debug the performance of a site, in this case the mobile site of Hotel Tonight, live on stage. Among the newly announced features are the [load and performance film strips](/web/updates/2015/07/devtools-digest-film-strip-and-a-new-home-for-throttling), the **included network waterfall**, the **treeview summary** and the ability to view **perf costs by domain & file**.

## Easily add foreground and background colors to any element

Whenever you wanted to add a background-color or color property to your element, you couldn’t just open the color picker. Instead, most of you type in something like “background: red;” each time so the color picker icon appears, then choose the actual color you wanted.

We thought we could simplify this. We added two nifty buttons that appear when hovering over the bottom right corner of a selector, allowing you to add a color and bring up the picker with a single click:

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="63hJtFXbToc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## The best of the rest

  * We’ve wasted a lot of previous real estate in the Style panel by showing **generic media types**. We now hide that stuff before your selectors if it’s not unusual!
  * You can now **long hover over a CSS selector** in the Style panel to see how many elements on the page it applies to.
  * Didn’t give up on printing yet? **Print media emulation** is still around to see how your page would look like when printed – we just moved it to the Rendering Settings.
  * When choosing an element to inspect, we now auto-expand and close the relevant DOM sub tree. Hard to explain, [seeing is believing](https://twitter.com/ChromeDevTools/status/661234102025121792).

- - -

As always, [let us know what you think via 
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the 
comments below, and submit bugs to [crbug.com/new](https://crbug.com/new).

Until next month!  
Paul Bakaus & the DevTools team


