---
layout: section
title: "Responsive Web Design Patterns"
description: "Responsive web design patterns are quickly evolving, but there
              are a handful of established patterns that work well across the
              desktop and mobile devices"
introduction: "Responsive web design patterns are quickly evolving, but there
              are a handful of established patterns that work well across the
              desktop and mobile devices."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-10-21
  order: 2
id: rwd-patterns
priority: 1
collection: multi-device-layouts
---

{% wrap content%}


Most layouts used by responsive web pages can be categorized into one of five
patterns: mostly fluid, column drop, layout shifter, tiny tweaks and off canvas.
In some cases, a page may use a combination of patterns, for example column drop
and off canvas.  These patterns, originally identified by [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), provide a solid starting
point for any responsive page.

## The patterns

To create simple, easy-to-understand samples, each the samples
below were created with real markup using
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
typically with three content `div`'s contained within a primary container `div`.
 Each sample was written starting with the smallest view first and breakpoints
were added when necessary.  The [flexbox layout mode is well
supported](http://caniuse.com/#search=flexbox) for modern browsers, though may
still require vendor prefixing for optimal support.

{% include modules/nextarticle.liquid %}

{% endwrap %}
