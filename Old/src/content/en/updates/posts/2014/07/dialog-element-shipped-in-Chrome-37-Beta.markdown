---
layout: updates/post
title: "dialog element shipped in Chrome 37 Beta"
description: "Chrome Beta has landed its native support for &lt;dialog&gt; element"
published_on: 2014-07-24
updated_on: 2014-07-24
authors:
  - agektmr
tags:
  - news
  - dialog
  - semantics
---
Chrome Beta has landed its native support for &lt;dialog&gt; element without needing "Enable experimental Web Platform features." flag turned on.

{% comment %}
include_code dialog code-block
{% endcomment %}

Check out more sample codes and how it works in detail with [a live demo](http://demo.agektmr.com/dialog/).

There are a few changes applied to the implementation since [the last announcement](http://updates.html5rocks.com/2013/09/dialog-element-Modals-made-easy) but notable one is:

* Non-modal &lt;dialog&gt; is no longer vertically centered in the viewport. It has no special positioning behavior beyond its default CSS styling.

If you are curious about further details on the spec update, check out diffs [here](http://html5.org/r/8448) and [here](http://html5.org/r/8457).
