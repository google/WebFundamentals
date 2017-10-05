project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Learn the key factors in optimizing the critical rendering path.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Optimizing the Critical Rendering Path {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


  To deliver the fastest possible time to first render, we need 
  to minimize three variables:

  <ul>
    <li>The number of critical resources.</li>
    <li>The critical path length.</li>
    <li>The number of critical bytes.</li>
  </ul>

A critical resource is a resource that could block initial rendering of the page. The fewer of these resources, the less work for the browser, the CPU, and other resources.

Similarly, the critical path length is a function of the dependency graph between the critical resources and their bytesize: some resource downloads can only be initiated after a previous resource has been processed, and the larger the resource the more roundtrips it takes to download.

Finally, the fewer critical bytes the browser has to download, the faster it can process content and render it visible on the screen. To reduce the number of bytes, we can reduce the number of resources (eliminate them or make them non-critical) and ensure that we minimize the transfer size by compressing and optimizing each resource.

**The general sequence of steps to optimize the critical rendering path is:**

1. Analyze and characterize your critical path: number of resources, bytes, length.
1. Minimize number of critical resources: eliminate them, defer their download, mark them as async, and so on.
1. Optimize the number of critical bytes to reduce the download time (number of roundtrips).
1. Optimize the order in which the remaining critical resources are loaded: download all critical assets as early as possible to shorten the critical path length.

<a href="page-speed-rules-and-recommendations" class="gc-analytics-event"
    data-category="CRP" data-label="Next / PageSpeed">
  <button>Next Up: PageSpeed Rules and Recommendations</button>
</a>
