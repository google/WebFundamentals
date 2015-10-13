---
layout: updates/post
title: "DevTools Digest: Tab reordering, framework event listeners and easier remote debugging"
published_on: 2015-10-05
updated_on: 2015-10-05
authors:
  - pbakaus
tags:
  - devtools
  - digest
  - update
description: "Re-order DevTools tabs which ever way suits you best; see exactly where framework events were bound and block network requests to see which third party scripts slow you down."
featured_image: /web/updates/images/2015-08-24-devtools-digest/featured.jpg
---

<p class="intro">Re-order DevTools tabs which ever way suits you best; see exactly where framework events were bound and block network requests to see which third party scripts slow you down.</p>

## Better Panel Navigation: Console on #2, Tab Reordering and Sexy Underlines

After investigating which areas of DevTools are used the most, it became clear that the full-screen Console panel didn’t deserve the last position in the main tab bar. As second-most used panel, *it’s now the second tab*. This especially matters on lower resolutions when we can’t show all tabs at once.

But look, we get it. The classic order is part of your muscle memory and you’ll feel dizzy for a while. Or maybe, gasp, you just hate the full screen console! Fear not, we’ve got you covered. The tabs can now be *reordered by dragging them around*, like so:

<video src="/web/updates/images/2015-10-05/reordering_tabs.mp4" autoplay loop></video>

The changes you make to the tab bar persist, and it works with both native tabs and extension-provided tabs. And as a bonus, we’ve thrown in smooth, animated underlines. Because we’re nice like that.


## Support for Framework Event Listeners

Events created by JS Frameworks such as jQuery have sometimes been a pain when working with DevTools. That’s because most frameworks wrap the native DOM events into their custom event API, so looking at the event listener doesn’t really reveal much about what’s happening:

![Framework Listeners Off](/web/updates/images/2015-10-05/listeners_off.png)

But with the new “Framework Listeners” option in the Event Listener tab, DevTools becomes aware of the framework wrapping portion and automatically resolves it. Now, events bound by frameworks look and behave exactly like their native counterparts, telling you where it was actually bound:

![Framework Listeners On](/web/updates/images/2015-10-05/listeners_on.png)

## Blocked Requests to help you understand the impact of third party requests

<img src="/web/updates/images/2015-10-05/blocked_requests_1.png" alt="New main menu" style="float: left;max-width: 230px;margin-right: 1em;margin-bottom: 1em;width: 40%;">You can now block network requests in the Network Panel by either right-clicking on a request and choose “Block Request URL” or choose “Block Request Domain” to block everything from that domain.

Doing this will show open the “Request Blocking” tab in the drawer at the bottom of your DevTools to show you the things you’ve blocked. This tab allows you to unblock them again or add wildcard patterns via the “plus” icon.

![Blocked Requests Panel](/web/updates/images/2015-10-05/blocked_requests_2.png)

If you close the tab, don’t worry: You can always bring it back by clicking on the icon in the toolbar. To make sure you didn’t forget about requests you’ve previously blocked, we’ll also show them in the Console.

![Blocked Requests in Console](/web/updates/images/2015-10-05/blocked_requests_3.png)

## The Best of the Rest

  * [Custom Object Formatters](https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview?usp=sharing) allow transpiled languages such as CoffeeScript [to better format their objects](https://github.com/binaryage/cljs-devtools) in the DevTools Console.
  * The Timeline has a new better looking dialog during recording that shows you status, time and buffer usage at a glance. <br>![Timeline Hint](/web/updates/images/2015-10-05/timeline_hint.png)
  * Along the same lines, the Network Panel shows a helpful hint when empty now: ![Network Hint](/web/updates/images/2015-10-05/network_hint.png)
  * You can now filter for mixed content in the Network Panel by using the filter input and set it to “mixed-content:true”

- - -

As always, [let us know what you think via 
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the 
comments below, and submit bugs to [crbug.com/new](http://crbug.com/new).

Until next month!  
Paul Bakaus & the DevTools team
