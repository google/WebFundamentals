---
layout: article
title: "Optimizing the Critical Rendering Path"
description: "Delivering a fast web experience requires a lot of work by the browser.
  Most of this work is hidden from us as web developers: we write the markup, and a nice
  looking page comes out on the screen. But how exactly does the browser go from
  consuming our HTML, CSS, and JavaScript to rendered pixels on the screen?"
introduction: "Delivering a fast web experience requires a lot of work by the browser.
  Most of this work is hidden from us as web developers: we write the markup, and a nice
  looking page comes out on the screen. But how exactly does the browser go from
  consuming our HTML, CSS, and JavaScript to rendered pixels on the screen?"
article:
  written_on: 2014-01-01
  updated_on: 2014-01-05
  order: 6
collection: critical-rendering-path
---
{% wrap content%}

{% include modules/toc.liquid %}

In order to deliver the fastest possible time to first render, we need to
optimize three variables:

1. **Minimize the number of critical resources.**
1. **Minimize the number of critical bytes.**
1. **Minimize the critical path length. **

A critical resource is any resource that may block initial rendering of the
page. The fewer of these resources there are on the page, the less work the
browser has to do to get content on the screen, and the less contention there is
for CPU and other resources.

Similarly, the fewer critical bytes the browser has to download, the faster it
can get to processing the content and get it visible on the screen. To reduce
the number of bytes we can reduce the number of resources (eliminate them or
make them non-critical), and also ensure that we minimize the transfer size by
compressing and optimizing each resource.

Finally, the critical path length is a function of the dependency graph between
all the critical resources required by the page and their bytesize: some
resource downloads can only be initiated once a previous resource has been
processed, and the larger the resource the more roundtrips it will take us to
download it.

In other words, the number of resources, their bytesize, and the critical path
length are related to each other, but they are not exactly the same. For
example, you may not be able to reduce the number of critical resources, or
shorten the critical path length, but reducing the number of critical bytes is
still an important optimization -- and vice versa.

**The general sequence of steps to optimize the critical rendering path is:**

1. Analyze and characterize your critical path: number of resources, bytes,
   length.
1. Eliminate any critical resources which do not need to critical: eliminate
   them, defer their download, mark them as async, etc.
1. Optimize the order in which the remaining critical resources are loaded: you
   want to download all critical assets as early as possible to shorten the
   critical path length.
1. Optimize the number of critical bytes to reduce the download time (number of
   roundtrips).

{% include modules/nextarticle.liquid %}

{% endwrap%}
