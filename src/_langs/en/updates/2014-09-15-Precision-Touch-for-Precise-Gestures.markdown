---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2014-09-15

title: "Precision Touch for Precise Gestures"
description: "TouchEvents have changed in Chrome to return float values, instead of integers, to account for varying screen densities. This leads to more detailed feedback during slow gestures."
article:
  written_on: 2014-09-15
  updated_on: 2014-09-15
authors:
  - mattgaunt
tags:
  - touchevent
permalink: /updates/2014/09/Precision-Touch-for-Precise-Gestures.html
---
A [change landed](https://code.google.com/p/chromium/issues/detail?id=323935) in
the implementation of Chrome's [TouchEvents](https://dvcs.w3.org/hg/webevents/raw-file/v1-errata/touchevents.html#attributes)
as of M37 (stable in 08/2014), which alters the reported co-ordinates to floats
instead of integers.

<table style="font-family: monospace; ">
<thead>
<tr>
<th style="padding-right: 24px;">Before</th>
<th>After</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding-right: 24px;">
clientX: 167<br />
clientY: 196<br />
pageX: &nbsp;&nbsp;167<br />
pageY: &nbsp;&nbsp;196<br />
radiusX: 26<br />
radiusY: 26<br />
screenX: 167<br />
screenY: 277<br />
</td>
<td>
clientX: 167.33299255371094<br />
clientY: 195.66700744628906<br />
pageX: &nbsp;&nbsp;167.33299255371094<br />
pageY: &nbsp;&nbsp;195.66700744628906<br />
radiusX: 25.843116760253906<br />
radiusY: 25.843116760253906<br />
screenX: 167.33334350585938<br />
screenY: 276.66668701171875
</td>
</tr>
</tbody>
</table>

The result of this change means you have a smoother response to the users
gestures as it gives you higher accuracy of the fingers position.

Using [Rick Byers' demo](http://www.rbyers.net/paint.html#points%20), you can
see what a huge difference this can make when slowly drawing a swirl.

<p style="text-align: center;"><img src="//drive.google.com/uc?export=view&id=0B55F0MBQPca4V2dkdXdlRUVlQjQ" alt="Differences in Touch Events" style="max-width: 600px; width: 100%;" /></p>

This will only make affect screens which have a pixel density greater than 1. To
understand why, let's step through an example.

Imagine you have a 3x3 grid of **CSS pixels** and the screen density is 3,
meaning we have a grid of 9x9 **physical pixels** and the user gestures from the
top left to the bottom right.

<p style="text-align: center;"><img src="//drive.google.com/uc?export=view&id=0B55F0MBQPca4WDEzalBaRmMzUHM" alt="CSS Pixel and Screen Pixel Grid" style="max-width: 600px; width: 100%;" /></p>

Originally, we were rounding the touches position to the nearest CSS pixel,
which meant in this gesture you would end up with the following steps.

<p style="text-align: center;"><img src="//drive.google.com/uc?export=view&id=0B55F0MBQPca4YkZlVEhwQ24wX28" alt="CSS Pixel Precision During Gesture" style="max-width: 600px; width: 100%;" /></p>

We miss out on drawing any of the intermediate steps that the physical pixels
could show as the user moves their finger.

Now that we've switched to floats, our gesture can look like this.

<p style="text-align: center;"><img src="//drive.google.com/uc?export=view&id=0B55F0MBQPca4MGdDS1VvVEpfZjQ" alt="Float Precision During Gesture" style="max-width: 600px; width: 100%;" /></p>

In most cases, this won't require any changes in your code, but does mean any
animations or movements you do as a result of TouchEvents, will be smoother,
especially for slow gestures.

There is also plan to bring this improvement to mobile Safari as well: [https://bugs.webkit.org/show_bug.cgi?id=133180](https://bugs.webkit.org/show_bug.cgi?id=133180).
