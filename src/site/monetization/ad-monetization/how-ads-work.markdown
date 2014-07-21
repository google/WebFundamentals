---
layout: article
title: "How Ads Work"
description: "In the most simplest terms, choose how your ads look and where they are placed. Advertisers bid to show their ads in your ad spaces. Users click on the ads; you receive payments."
introduction: "In the most simplest terms, choose how your ads look and where they are placed. Advertisers bid to show their ads in your ad spaces. Users click on the ads; you receive payments."
article:
  written_on: 2014-07-17
  updated_on: 2014-07-17
  order: 1
id: how-ads-work
collection: ad-monetization
key-takeaways:
  tldr: 
    -  Choose the ads platform best for your site: the Adsense platform is free and available to all websites; the Double-click platform suits large sites with adversiting teams.
    -  The best ads improve user experience: ads shouldn't look out of place on your site, they should respond in size to your user's device, and they should never block user experience.
    -  Ads targeting is a combination of determining which ads most compliment your site and which advertiser bids the highest to show an ad on your site.
---

{% wrap content %}
<style type="text/css">
  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr %}

## Available platforms

<a href="https://support.google.com/adsense/answer/9712?hl=en&ref_topic=1319753&rd=1">Google AdSense<a/> is a free product available to all websites.
The Double-click platform is an ad management platform for large sites with adversiting teams.

You need to <a href="rms/publishergeneral/#utm_medium=et&utm_campaign=en&utm_source=ww-ww-et-nelson_doubleclick">contact DoubleClick's Solutions for Publishers</a>
to get started with DoubleClick for Publishers (DFP).
DoubleClick Ad Exchange is an invite only product
that provides publishers detailed and finely-tuned controls for advertising savvy organizations.

### Adsense

Adsense integrates with Google ads, targeting ads specific to your site content,
and comes with these tools:

* Customization tools to change the look and feel of your ads.
* Performance tools to monitor your ad performance.
* Payment tools to manage ad payments.

Create <a href="https://support.google.com/adsense/answer/3213689?hl=en">AdSense responsive ad units</a>,
copy/paste JavaScript into your site, and begin showing ads and accruing revenue.
When you use responsive ad units,
the AdSense crawler is intelligent enough to detect which device
a user is on and adjust an ad to fit that device accordingly.


### Double-click for Publishers

help
publishers sell, schedule, deliver, and measure all of their ad inventory,

DFP allows publishers who have direct relationships with advertisers
to reserve their inventory but also the flexibility to integrate
with other auction-based services (like AdSense or Ad Exchange).

DoubleClick for Publishers offers a Google Publisher Tag (GPT) API
which is an ad tagging library for DFP that can dynamically build ad requests.
GPT takes key details such as ad unit name, ad size, and custom targeting,
builds the request, and displays the ad on web pages.
This API can be used to setup
<a href="https://support.google.com/dfp_premium/answer/3423562?hl=en">responsive ad units</a>
to be served on a responsive site.

### Double-click Ad Exchange



DoubleClick Ad Exchange currently doesn’t offer a responsive ad tag but we encourage developers to integrate with DoubleClick for Publishers and then run Ad Exchange through the GPT API

## How ads look

TBD.

### Ads style and content

TBD.

### Ads placement

TBD.

## How ads targeting works

TBD. 

{% endwrap %}
