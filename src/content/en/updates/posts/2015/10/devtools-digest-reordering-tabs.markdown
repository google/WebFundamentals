---
layout: updates/post
title: "DevTools Digest: Tab reordering, Console is #2 and framework event listeners"
published_on: 2015-10-15
updated_on: 2015-10-15
authors:
  - pbakaus
tags:
  - devtools
  - digest
  - update
description: "Re-order DevTools tabs which ever way suits you best and see exactly where framework events were bound."
featured_image: /web/updates/images/2015-08-24-devtools-digest/featured.jpg
---

<p class="intro">Re-order DevTools tabs which ever way suits you best; see exactly where framework events were bound and block network requests to see which third party scripts slow you down.</p>

## Better Panel Navigation: Console on #2, Tab Reordering and Nifty Underlines

After investigating which areas of DevTools are used the most, it became clear that the full-screen Console panel didn’t deserve the last position in the main tab bar. As second-most used panel, *it’s now the second tab*. This especially matters on lower resolutions when we can’t show all tabs at once.

But look, we get it. The classic order is part of your muscle memory and you’ll feel dizzy for a while. Or maybe, gasp, you just hate the full screen console! Fear not, we’ve got you covered. The tabs can now be *reordered by dragging them around*, like so:

<video src="/web/updates/images/2015-10-05/reordering_tabs.mp4" autoplay loop></video>

The changes you make to the tab bar persist, and it works with both native tabs and extension-provided tabs. And as a bonus, we’ve thrown in smooth, animated underlines. Because we’re nice like that.


## Support for Framework Event Listeners

Events created by JS Frameworks such as jQuery have sometimes been a pain when working with DevTools. That’s because most frameworks wrap the native DOM events into their custom event API, so looking at the event listener doesn’t really reveal much about what’s happening:

![Framework Listeners Off](/web/updates/images/2015-10-05/listeners_off.png)

But with the new “Framework Listeners” option in the Event Listener tab, DevTools becomes aware of the framework wrapping portion and automatically resolves it. Now, events bound by frameworks look and behave exactly like their native counterparts, telling you where it was actually bound:

![Framework Listeners On](/web/updates/images/2015-10-05/listeners_on.png)

## The Best of the Rest

  * [Custom Object Formatters](https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview?usp=sharing) allow transpiled languages such as CoffeeScript [to better format their objects](https://github.com/binaryage/cljs-devtools) in the DevTools Console.
  * The Timeline has a new better looking dialog during recording that shows you status, time and buffer usage at a glance. <br>![Timeline Hint](/web/updates/images/2015-10-05/timeline_hint.png)
  * Along the same lines, the Network Panel shows a helpful hint when empty now: ![Network Hint](/web/updates/images/2015-10-05/network_hint.png)
  * You can now filter for mixed content in the Network Panel by using the filter input and set it to `mixed-content:displayed`

- - -

As always, [let us know what you think via 
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the 
comments below, and submit bugs to [crbug.com/new](https://crbug.com/new).

Until next month!  
Paul Bakaus & the DevTools team
