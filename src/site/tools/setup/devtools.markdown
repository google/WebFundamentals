---
layout: article
title: "Set Up Developer Tools"
description: "Find out which developer tools are essential to your development workflow, including build, live reloading, device emulation, and remote debugging tools."
introduction: "Find out which developer tools are essential to your development workflow, including build, live reloading, device emulation, and remote debugging tools."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 2
collection: set-up
key-takeaways:
  tbd:
    - TBD.
notes:
  tbd:
    - TBD.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.tbd %}

{% include modules/toc.liquid %}

## Tools you need and why

Link to tooling slideck.

## Set up build tools

Build tooling-- lots out there, we've chosen Gulp in WSK
(others include Grunt, Broccoli, Make)

## Set up live reloading

LiveReload. Navigate to same URL, synchronize scrolls, clicks, navigation (GhostLab),
and test across devices, actual, real devices.

Get Live Reloads on edit - Grunt + LiveReload (Web Starter Kit)

## Set up device emulation

Emulation tool needs to be covered here-- set up anyway.
Should be used at all times.

Emulate viewport, touch events, orientation, user agent, geolocation

## Set up remote debugging

Chrome DevTools, Weinre comparison?
Firefox for Android + ADB, Safari remote debugging

chrome://inspect Raw USB debugging

Remote debugging + timeline
Rendering performance tooling

## Set up screencast and recording tools

Take screenshots so that you can meticulously check the same
page on different devices. Do we want to include link to Remote Preview?

Tool to get device screenshots
Adobe Edge for screenshots (what about new DevTools screencasting?)
Related to this-- record traffic sessions and playback to check performance, etc.

{% include modules/nextarticle.liquid %}

{% endwrap %}
