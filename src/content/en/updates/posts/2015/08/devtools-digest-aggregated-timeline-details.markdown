---
layout: updates/post
title: "DevTools Digest: Aggregated Timeline Details, Color Palettes and More"
published_on: 2015-08-24
updated_on: 2015-08-24
authors:
  - pbakaus
tags:
  - devtools
  - digest
  - update
description: "Find out which third-party scripts cause perf issues with the Aggregated Details in Timeline, how to choose consistent colors with the new color palette and much more."
featured_image: /web/updates/images/2015-08-24-devtools-digest/featured.jpg
---

It's been a feature-rich month in Chrome Canary. Read on to learn which third party 
scripts cause perf issues on your site with the 
[Aggregated Details in Timeline](#heading=h.ygoxqwis9ean), how to choose 
consistent colors with the [new color palette](#heading=h.pty4fqjm0wri), how to 
simulate conference WiFi with [customizable network 
profiles](#heading=h.jlf8cle6q2eq) and how to get more out of the DevTools UI 
with the [new main menu](#heading=h.i5v8nj67xss6) and [better 
tooltips](#heading=h.mtnvakflivsg).

- - -

## Better blame perf issues: Aggregated details in Timeline

![Aggregated Details in Timeline](/web/updates/images/2015-08-24-devtools-digest/aggregated_details.png)

On today's websites we are using more and more beacons, analytics, social, 
font-loading and advertising services from third parties, sometimes a [few too 
many](https://www.youtube.com/watch?v=TBIM9zPuL-k). To ensure this doesn't 
happen and to give you visibility into the problem, we are introducing 
aggregated details to the Timeline.

In the **Aggregated Details** tab, you can focus on just costly functions or the 
entire call tree, then break down the selected data by domain, sub-domain or 
distinct URLs. For example, in the above Timeline of a page load, you can now 
attribute slow-downs easily to third party scripts coming from domains such as 
facebook.net or twitter.com.

## New, dedicated main menu

<img src="/web/updates/images/2015-08-24-devtools-digest/new_main_menu.png" alt="New main menu" style="float: left;max-width: 230px;margin-right: 1em;margin-bottom: 1em;width: 40%;">To unclutter the main toolbar, we've moved drawer, settings and docking icons 
into a new, dedicated main menu.

In particular docking got much simpler. Instead of having to long-press on the 
previous icon, each docking position features it's own icon.

In addition to docking, we've added quick access file search, shortcuts and help 
(which leads to [our new 
homepage](/web/tools/chrome-devtools/)).

## Discover DevTools through improved tooltips

![New Tooltips](/web/updates/images/2015-08-24-devtools-digest/tooltips.png)

We've got lots of buttons in DevTools, and we know that not all of them are 
self-explaining. We've now made discovering actions and their shortcuts easier 
by replacing the system-native tooltips with custom, platform-consistent 
tooltips.

The new tooltips appears much more quickly and includes keyboard shortcuts (if 
there is one).

## Create custom network throttling profiles

![Custom Network Profiles](/web/updates/images/2015-08-24-devtools-digest/network_throttling_profiles.png)

If the default options for the Network Throttler are too limiting for your use 
cases, and you need a "Conference WiFi" option or, for the sake of nostalgia, 
want to go old school and emulate a ["110 Baud" line](https://en.wikipedia.org/wiki/Bell_101), 
I have good news for you. We've added a new Settings panel that allows you to 
do any of those things.

## Automatic, Material and custom color palettes

{% animation /web/updates/images/2015-08-24-devtools-digest/color_palettes.mp4 %}

Whether you want to recreate [the colors of 
magic](http://www.colourlovers.com/blog/2008/04/19/octarine-the-imaginary-color-of-magic) 
or work with an [existing color 
palette](https://www.google.com/design/spec/style/color.html), the improved 
Colorpicker helps you to pick a consistent color palette for your site.

By clicking on the little switcher icon next to the palette, you can choose from 
the following:

1. **Page Colors** &mdash; This palette is auto-generated from the colors we find 
   in your CSS, making it a great option if you're extending an existing site.
1. **Material Design** &mdash; The [Material Design 
   palette](https://www.google.com/design/spec/style/color.html) offers 
   beautiful colors out of the box and is an ideal choice when starting a 
   new project. Right now you'll find all of the primary colors but we're 
   bringing all shades to it soon.
1. **Custom** &mdash; That's your own playground. Add new colors by picking one 
   in the picker, then click the "plus" icon next to the palette. Reorder by dragging 
   them around and right-click to reveal more options, such as remove.

[Tell us what you 
think](https://twitter.com/intent/tweet?text=%40ChromeDevTools), and how we 
could extend the color story further.

## The best of the rest

* Requests made using the **fetch() API** are now shown in the Network Panel
* **Automatic panel layouting** ensures that when you resize your DevTools  
  panels adapt to the new space constraints.
* **Inspect Element & Device Mode** has a set of new icons.
* **Attributes in the DOM panel** are now differently colored even when the node 
  is highlighted. (They where all white before.)
* **Hidden elements** (activated by pressing "h" on a selected DOM node) now show 
  a grey circle indicator on the left, and **DOM breakpoints** do the same with 
  a blue circle. (This is analogous to the orange indicators we already have for 
  forcing an element state like :hover).

- - -

As always, [let us know what you think via 
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the 
comments below, and submit bugs to [crbug.com/new](https://crbug.com/new).

Until next month!  
Paul Bakaus & the DevTools team
