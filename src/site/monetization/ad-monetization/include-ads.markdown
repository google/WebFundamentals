---
layout: article
title: "Include Ads in Your Site"
description: "Follow the steps in this guide to learn how to include ads in your site. Submit an application, create ad units and place them in your site, and see ads live."
introduction: "Follow the steps in this guide to learn how to include ads in your site. Submit an application, create ad units and place them in your site, and see ads live."
article:
  written_on: 2014-07-17
  updated_on: 2014-07-17
  order: 2
id: include-ads
collection: ad-monetization
key-takeaways:
  tldr: 
    -  To submit a Google AdSense application, you must be 18, have a Google Account, and address.
    -  Your website must be live before submitting an application, and the website content must comply with Adsense policies.
    - 
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

## Build this sample app with ads

To see ads in action,
this guide walks you through the steps required to include ads
in the web starter kit using
[Google AdSense]({{site.baseurl}}/monetization/ad-monetization/how-ads-work.html#available-platforms).
Here's how the ads look on mobile and desktop
(check out the
[website](http://meggin.github.io/)
yourself and see how the ad content changes):

<img src="images/ads_sample.png" class="center" alt="Sample website with ads on desktop and mobile">

If you've never used the web starter kit,
follow [these instructions]({{site.baseurl}}/tools/setup/setup_kit.html)
to get set up.

## Submit your application

To submit an application for Google Adsense,
you must meet these
[requirements](https://support.google.com/adsense/answer/9724?hl=en&ref_topic=1319756):

* Be at least 18 years old and have a verified Google Account.
* Own a live website or other online content that complies with
[Google AdSense program policies](https://support.google.com/adsense/answer/48182);
ads are hosted on this site.
* Have a postal address and a mailing address associated with your bank account
so you can receive payments.

To initiate the application process,
go to the [Google AdSense site](www.google.com/adsense).
This is the same site you will log into once your application's been approved.
Everything you need to know about getting your application approved
is covered in [this Google AdSense help topic](https://support.google.com/adsense/answer/75109?hl=en&ref_topic=1319758). 

## Create ad units

[Responsive ad units](https://support.google.com/adsense/answer/3213689?hl=en&ref_topic=3641113)
allow you to control the size of the ads on your page,
in line with how you control the layout of the rest of your page across devices.

To create a responsive ad unit
(see also [Create an ad unit]https://support.google.com/adsense/answer/6002575?rd=1() and
[https://support.google.com/adsense/answer/3543893?hl=en&ref_topic=3641113](Create a responsive ad unit):

1. Visit the [My ads tab](https://www.google.com/adsense/app#myads-springboard).
2. Click <strong>+New ad unit</strong>.
3. Give your ad unit a unique name. This name appears in the ad code that's pasted into your site,
so be descriptive.
4. Select <strong>Responsive</a> from the Ad size drop-down.
5. Select <strong>Text & display ads</strong> from the Ad type drop-down.
6. Click <strong>Save and get code</strong>.
7. In the <strong>Ad code</strong> box that appears,
select the <strong>Smart sizing (recommended)</strong> option from the Mode drop-down.
This is the recommended mode and doesn’t require you to make any changes to your ad code.

The ad code for the responsive ad unit looks something like this:

TODO: put sample code in here.

## Include ad units in your site

TBD. Cover placement and related policy here.

## Grant crawlers access

TBD.

## Configure payment settings

TBD.

{% endwrap %}
