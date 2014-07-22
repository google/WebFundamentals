---
layout: article
title: "How Ads Work"
description: "Learn how ads work. At a glance, you create ads and place them in your site. Adversiters bid to show their ads on your site and the highest bid wins. Users click on the ads and you receive payments."
introduction: "Learn how ads work. At a glance, you create ads and place them in your site. Adversiters bid to show their ads on your site and the highest bid wins. Users click on the ads and you receive payments. Read on to dive deeper into how ads work."
article:
  written_on: 2014-07-17
  updated_on: 2014-07-17
  order: 1
id: how-ads-work
collection: ad-monetization
key-takeaways:
  tldr: 
    -  Choose the ads platform best for your site: the Adsense platform is free and available to all websites; the Double-click platform suits large sites with adversiting teams.
    -  The best ads improve user experience: ads shouldn't look out of place on your site, they should respond in size to your user's device, and they should never block a user's experience.
    -  Users click on ads that are relevant to the content they are looking for; understand how ads targeting works so that you can maximize your revenue.
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

Most websites use the
<a href="https://support.google.com/adsense/answer/9712?hl=en&ref_topic=1319753&rd=1">Google AdSense platform<a/>;
it's free and available to all websites.
The <a href="http://www.google.com/doubleclick/publishers/solutions/">DoubleClick platform</a>
is an ad management platform for large sites with advertising teams.

The help centers for the ads platforms,
<a href="https://support.google.com/adsense/answer/181947?hl=en">Google AdSense</a> and 
<a href="https://support.google.com/dfp_sb/?utm_medium=et&utm_source=dfp_sb_support_tab&utm_campaign=dfp_sb#topic=13148">Google DoubleClick</a>
include getting starting guides and much more.


### Adsense

Google Adsense integrates with Google ads, targeting ads specific to your site content.
The platform also comes with these tools:

* <a href="https://support.google.com/adsense/answer/160374?hl=en&ref_topic=1307421">Customization tools</a> to change the look and feel of your ads.
* <a href="https://support.google.com/adsense/answer/2973289?hl=en&ref_topic=2717009">Performance tools</a> to monitor and optimize your ad performance.
* <a href="https://support.google.com/adsense/answer/2569265?hl=en&ref_topic=1727160">Payment tools</a> to manage ad payments.

The simplest way to use Google Adsense is to create
<a href="https://support.google.com/adsense/answer/3213689?hl=en">responsive ad units</a>.
When you use responsive ad units,
the AdSense crawler is intelligent enough to detect which device
a user is on and adjust an ad to fit that device accordingly.
Learn more about how to use responsive ad units in
[Include Ads in Your Site]({{site.baseurl}}/monetization/ad-monetization/include_ads.html).

### DoubleClick

The DoubleClick platform helps publishers sell, schedule, deliver,
and measure all of their ad inventory.
There's two tiers to the platform:
<a href="http://www.google.com/doubleclick/publishers/solutions/ad-serving.html">Double-click for Publishers (DFP)</a>
and <a href="http://www.google.com/doubleclick/publishers/solutions/yield-management.html">DoubleClick Ad Exchange</a>.
<a href="rms/publishergeneral/#utm_medium=et&utm_campaign=en&utm_source=ww-ww-et-nelson_doubleclick">Contact DoubleClick sales</a>
to get started with DFP or Ad Exchange.

#### DoubleClick for Publishers

DoubleClick for Publishers (DFP) allows publishers who have direct relationships
with advertisers to reserve their inventory but also the flexibility to integrate
with other auction-based services (like AdSense or Ad Exchange).

Similar to Google Adsense,
DFP lets you create responsive ad units using the
<a href="https://developers.google.com/doubleclick-gpt/reference?rd=1">Google Publisher Tag (GPT) API</a>,
an ad tagging library for DFP that can dynamically build ad requests.
GPT takes key details such as ad unit name, ad size, and custom targeting,
builds the request, and displays the ad on web pages.
See <a href="https://support.google.com/dfp_premium/answer/3423562?hl=en">Double-click's Building responsive ads</a> to learn how to use this API.

#### DoubleClick Ad Exchange

DoubleClick Ad Exchange is an invite only product
that provides publishers detailed and finely-tuned controls for advertising savvy organizations.

DoubleClick Ad Exchange currently doesn’t offer a responsive ad tag but we encourage developers to integrate with DoubleClick for Publishers and
then run Ad Exchange through the GPT API.

## How ads look

The best ads improve user experience:
ads shouldn't look out of place on your site,
they should respond in size to your user's device,
and they should never block a user's experience.

### Ads style

TBD.

### Ads content

TBD.

## Where ads are placed

TBD.

## How ads targeting works

Users click on ads that are relevant to the content they are looking for;
understand how ads targeting works so that you can maximize your revenue.

{% endwrap %}
