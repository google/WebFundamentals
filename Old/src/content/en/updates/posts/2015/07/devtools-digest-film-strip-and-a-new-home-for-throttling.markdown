---
layout: updates/post
title: "DevTools Digest: Film strip and a new home for throttling"
published_on: 2015-07-23
updated_on: 2015-07-24
authors:
  - pbakaus
tags:
  - devtools
  - digest
  - update
description: "Discover the new film strip functionality and more in this first of many DevTools Digest updates."
featured_image: /web/updates/images/2015-07-23-devtools-bi-weekly-film-strip-and-a-new-home-for-throttling/featured.png

---
## DevTools news, as fresh as it gets

The first news item in this post is a little meta – it's this update 
itself! Every now and then but at least once a month, I'll summarize what's happening in the world of Chrome 
DevTools, fresh off the press.

And when I say fresh, I mean it: I'll talk about new features that have just 
arrived in [Chrome Canary](https://www.google.com/chrome/browser/canary.html), 
so if you'd rather stay in stable land, that's cool too. But if you're 
adventurous and want to stay on top, these posts are for you. In addition to the 
latest features and bugfixes, you will find a **Community Heartbeat** section at 
the end of each post, highlighting the greatest you, our beloved users, have 
contributed.

Without further ado, let's dive into actual news.

- - -

## New in DevTools

### Film strip-like screenshots in Network and Timeline

Just a week ago, we've moved a significant new feature out of experimentation: 
The ability of capturing screenshots of the page in both Network and Timeline 
tab.

{% animation /web/updates/images/2015-07-23-devtools-bi-weekly-film-strip-and-a-new-home-for-throttling/filmstrip_network.mp4 %}

In the **Network panel**, click on the little camera icon to enable the 
capturing of frames, then reload the page to trigger the capture. Other than 
screenshots captured with other tools like 
[WebPageTest](https://webpagetest.org), we currently only show frames that 
actually came from a paint.

While double-clicking on one of the frames shows a zoomed view (then use 
left/right arrows to navigate), hovering over them shows lines across the panel 
and timeline to visualize exactly when the frame was captured, allowing you to 
correlate to the load sequence. This makes debugging common load issues such as 
render-blocking web fonts much simpler.

{% animation /web/updates/images/2015-07-23-devtools-bi-weekly-film-strip-and-a-new-home-for-throttling/filmstrip_timeline.mp4 %}

In the **Timeline panel**, you can enable screenshot capturing by toggling the 
"Screenshots" checkbox in the top toolbar. Things work a little differently 
here, compared to the Network panel: In this case, we try to capture as often as 
we can – regardless of actual paints – to be able to drop said screenshots on a 
linear timescale that correlates with the other rows in Timeline. Instead of 
needing to double-click to show a preview, zoomed in frames appear on hover.

As the two are a little out of sync in terms of functionality and UX, we'd like 
to encourage you to try out the feature(s) and provide any feedback you have 
through tickets on [crbug.com/new](https://crbug.com/new) or via tweet to 
[@ChromeDevTools](https://twitter.com/ChromeDevTools).

### Network Throttling in the Network panel

[Network 
throttling](https://developer.chrome.com/devtools/docs/device-mode#network-conditions), 
a feature we've added when introducing our [Device 
Mode](https://developer.chrome.com/devtools/docs/device-mode), found its second 
home in the Network panel toolbar so you can focus on network optimizations in a 
single place.

![Network throttling in action](/web/updates/images/2015-07-23-devtools-bi-weekly-film-strip-and-a-new-home-for-throttling/network_throttling.png)

This new home is just a mirror though: It's still available out of Device Mode, 
as simulating bad connectivity is still highly important when working on making 
your site responsive.

Finally, are you one of these poor souls that have wondered why your internet 
connection is broken after a long day at work, only to discover that you forgot 
to disable network throttling? The Network panel tab **now shows a warning 
icon** when network throttling is enabled.

### Various tidbits

* Hated those weird circles on the network timeline? So did we. These are **the 
  points in time when a frame** (in the new film strip) **was captured**. [Now 
  they appear as lines when you hover](https://src.chromium.org/viewvc/blink?revision=198505&view=revision). 
* **Device Mode** [now preserves orientation](https://src.chromium.org/viewvc/blink?revision=198513&view=revision) when you switch between devices

- - -

## Community Heartbeat

### Down and dirty with Chrome DevTools

[![Network throttling in action](/web/updates/images/2015-07-23-devtools-bi-weekly-film-strip-and-a-new-home-for-throttling/down_and_dirty.png)](https://blittle.github.io/chrome-dev-tools/)

[Bret Little](https://twitter.com/little_bret) released this [nice little 
walkthrough course](https://blittle.github.io/chrome-dev-tools/) that acquaints you with basic DevTools functionality but also 
offers a lot of in-depth tips and tricks. Definitely useful info in there, and 
more DevTools docs never hurt!

### A DevTools IDE…?!

Kenneth Auchenberg, web developer and DevTools aficionado,  developed a 
proof-of-concept standalone DevTools app few months ago, and somehow his [blog 
post](https://kenneth.io/blog/2014/12/28/taking-chrome-devtools-outside-the-browser) 
made (hacker) news again this week.

{% ytvideo 4oBSlY9J-iA %}

Turning DevTools into a full blown IDE is a fun idea, one that many of our team 
members have dreamed about before, but it would also be a project of epic 
proportions.

- - -

What do you think? Is the DevTools IDE a pipe-dream or could you see it work 
out? How should it looks like? Let us know in the comments!

See you soon!  
Paul Bakaus & the DevTools team
