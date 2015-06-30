---
rss: false
layout: article
title: "Breakpoints Reference"
title: "Breakpoints Reference"
description: "Use this quick reference table to get just the basics of the DevTools breakpoints."
introduction: "
Use this quick reference table to get just the basics of the DevTools breakpoints. "
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 4
authors:
  - megginkearney
priority: 0
collection: breakpoints
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

Click the breakpoint type for the full explanation.

<table>
  <tr>
    <td><b>Breakpoint type</b></td>
    <td><b>Breaks before...</b></td>
    <td><b>Use to...</b></td>
  </tr>
  <tr>
    <td>Line</td>
    <td>...the specified line is executed</td>
    <td>...examine current variable or parameter values</td>
  </tr>
  <tr>
    <td>DOM mutation</td>
    <td>...the DOM node is modified</td>
    <td>...isolate and observe the DOM change</td>
  </tr>
  <tr>
    <td>XMLHttpRequest</td>
    <td>...the request is sent</td>
    <td>...view the request’s prepared data</td>
  </tr>
  <tr>
    <td>Event listener</td>
    <td>...the listener is fired</td>
    <td>...follow how an event is processed</td>
  </tr>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
