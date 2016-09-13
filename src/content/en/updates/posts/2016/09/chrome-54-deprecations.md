---
layout: updates/post
title: "API Deprecations and Removals in Chrome 53"
description: "An round up of the deprecations and removals in Chrome to help you plan."
published_on: 2016-09-15
updated_on: 2016-09-15
authors:
  - josephmedley
tags:
  - deprecations
  - removals
  - chrome54
featured_image: /web/updates/images/misc/deps-rems.png
---

<p class="intro">
In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the changes in Chrome 52, which is in beta as 
of June 9. This list is subject to change at any time.
</p>

{% include shared/toc.liquid %}

## Deprecation policy

To keep the platform healthy, we sometimes remove APIs from the Web Platform which
have run their course.  There can be many reasons why we would remove an API, such
as: they are superseded by newer APIs, are updated to reflect changes to
specifications to bring alignment and consistency with other browsers, or they are
early experiments that never came to fruition in other browsers and thus 
can increase the burden of support for web developers.

Some of these changes might have an effect on a very small number of sites.
To mitigate issues ahead of time, we try to give developers advanced notice so
that if needed, they can make the required changes to keep their sites running.

Chrome currently has a
[process for deprecations and removals of API's](http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation)
and the TL;DR is:

* Announce on [blink-dev](https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev).
* Set warnings and give time scales in the developer console of the browser when
  usage is detected on a page.
* Wait, monitor, and then remove feature as usage drops.

You can find a list of all deprecated features in
[chromestatus.com using the deprecated filter](https://www.chromestatus.com/features#deprecated)
and removed features by applying the
[removed filter](https://www.chromestatus.com/features#removed). We will also 
try to summarize some of the changes, reasoning, and migration paths in 
these posts.
