---
layout: article
title: "Optimizing the Critical Rendering Path"
description: "In order to deliver the fastest possible time to first render, we need to optimize three variables: minimize the number of critical resources, minimize the number of critical bytes, and minimize the critical path length."
introduction: ""
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 7
collection: critical-rendering-path
rel:
  gplusauthor: https://plus.google.com/+IlyaGrigorik
---
{% wrap content%}

In order to deliver the fastest possible time to first render, we need to optimize three variables:

* **Minimize the number of critical resources.**
* **Minimize the number of critical bytes.**
* **Minimize the critical path length.**

A critical resource is any resource that may block initial rendering of the page. The fewer of these resources there are on the page, the less work the browser has to do to get content on the screen, and the less contention there is for CPU and other resources.

Similarly, the fewer critical bytes the browser has to download, the faster it can get to processing the content and get it visible on the screen. To reduce the number of bytes we can reduce the number of resources (eliminate them or make them non-critical), and also ensure that we minimize the transfer size by compressing and optimizing each resource.

Finally, the critical path length is a function of the dependency graph between all the critical resources required by the page and their bytesize: some resource downloads can only be initiated once a previous resource has been processed, and the larger the resource the more roundtrips it will take us to download it.

In other words, the number of resources, their bytesize, and the critical path length are related to each other, but they are not exactly the same. For example, you may not be able to reduce the number of critical resources, or shorten the critical path length, but reducing the number of critical bytes is still an important optimization &mdash; and vice versa.

**The general sequence of steps to optimize the critical rendering path is:**

1. Analyze and characterize your critical path: number of resources, bytes, length.
1. Minimize number of critical resources: eliminate them, defer their download, mark them as async, etc.
1. Optimize the order in which the remaining critical resources are loaded: you want to download all critical assets as early as possible to shorten the critical path length.
1. Optimize the number of critical bytes to reduce the download time (number of roundtrips).

{% include modules/nextarticle.liquid %}

{% endwrap%}
