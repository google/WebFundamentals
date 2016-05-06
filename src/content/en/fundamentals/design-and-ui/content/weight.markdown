---
layout: shared/narrow-pages-list
title: "Understand data cost"
description: "Page weight affects performance and costs money. Learn how to calculate the data cost of your site."
published_on: 2016-05-10
updated_on: 2016-05-10
order: 4
translation_priority: 1
authors:
  - samdutton
---

<p class="intro">
Web pages are getting bigger. <br><br>According to <a href="http://httparchive.org/trends.php#bytesTotal&reqTotal">HTTP Archive</a>, the average page weight for the [top one million sites](http://httparchive.org/about.php#listofurls) is now over 2MB.

</p>

![HTTP Archive graph showing increasing total transfer size and total requests](images/http-archive-graph-total-transfer-size-and-requests.png)

Users avoid sites or apps perceived to be slow or expensive, so it's crucial to understand the cost of loading page and app components.

Reducing page weight can also be profitable. [Chris Zacharias from YouTube](http://blog.chriszacharias.com/page-weight-matters) found that when they reduced the watch-page size from 1.2MB to 250KB:

> Large numbers of people who were previously unable to use YouTube before were suddenly able to.

In other words, reducing page weight **can open up whole new markets**.

## Calculate page weight

There are a number of tools for calculating page weight. The Chrome DevTools Network panel shows the total byte size for all resources, and can be used to ascertain weights for individual asset types. You can also check which items have been retrieved from the browser cache.

![Chrome DevTools Network panel showing resource sizes](images/chrome-dev-tools.png)

Firefox and other browsers offer similar tools.

[WebPagetest](http://webpagetest.org) provides the ability to test first and subsequent page loads. You can automate testing with [scripts](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (for example, to log in to a site) or by using their [RESTful APIs](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis). The following example (loading [developers.google.com/web](https://developers.google.com/web/)) shows that caching was successful and that subsequent page loads required no additional resources.

![WebPagetest results showing total byte size for first and repeat page visits](images/webpagetest-first-and-repeat.png)

WebPagetest also gives a size and request breakdown by MIME type.

![WebPagetest pie charts showing requests and bytes by MIME type](images/webpagetest-requests-and-bytes-pie-charts.png)

## Calculate page cost

For many users, data doesn't just cost bytes and performance — it costs money.

The site [What Does My Site Cost?](https://whatdoesmysitecost.com/) enables you to estimate the actual financial cost of loading your site. The histogram below shows how much it costs (using a prepaid data plan) to load [amazon.com](https://www.amazon.com/).

![Estimated data cost (in 20 countries) of loading the amazon.com homepage](images/what-does-my-site-cost.png)

Bare in mind that this doesn't take into account affordability relative to income. The following chart from [blog.jana.com](https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/) shows the cost of data.

![Comparative data for relative data cost in India, Indonesia and Brazil](images/relative-data-cost-india-indonesia-brazil.png)

Page weight isn't just a problem for emerging markets. In many countries, people use mobile plans with limited data, and will avoid your site or app if they perceive it to be heavy and expensive. Even "unlimited" cell and wifi data plans generally have a data limit beyond which they are blocked or throttled.

The bottom line: page weight affects performance and costs money. [Optimizing content efficiency](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/?hl=en]) shows how to reduce that cost.

