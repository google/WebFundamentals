---
layout: article
title: "How Ads Work"
description: "Learn how ads work. At a glance, you make ad spaces available on your site. Adversiters bid to show their ads on your site and the highest bid wins. You get paid when users click on the ads."
introduction: "Learn how ads work. At a glance, you make ad spaces available on your site. Adversiters bid to show their ads on your site and the highest bid wins. You get paid when users click on the ads."
article:
  written_on: 2014-07-17
  updated_on: 2014-07-17
  order: 1
id: how-ads-work
collection: ad-monetization
key-takeaways:
  tldr: 
    - Choose the ads platform best for your site; the Adsense platform is free and available to all websites; the DoubleClick platform suit large sites with adversiting teams.
    - The best ads improve user experience; format ads so they don't look out of place on your site; resize ads in response to the user's device.
    - Ads should be placed where users can choose to see them; never place ads where they might interfere with a user's intended experience on your site.
    - Users click on ads that are relevant to the content they are looking for; understand how ads targeting works so that you can maximize your revenue.
---

{% wrap content %}

Read on to dive deeper into the fundamentals of ads monetization.
If you want to get started including ads in your site,
jump to 
[Include Ads in Your Site]({{site.baseurl}}/monetization/ad-monetization/include_ads.html).
And if you want to learn everything there is to know about ads,
the help centers for the ads platforms,
<a href="https://support.google.com/adsense/answer/181947?hl=en">Google AdSense</a> and
<a href="https://support.google.com/dfp_sb/?utm_medium=et&utm_source=dfp_sb_support_tab&utm_campaign=dfp_sb#topic=13148">Google DoubleClick</a>
include getting starting guides and much more.

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

Choose the ads platform best for your site.
Most websites use the
[Google AdSense platform](https://support.google.com/adsense/answer/9712?hl=en&ref_topic=1319753&rd=1);
it's free and available to all websites.
The <a href="http://www.google.com/doubleclick/publishers/solutions/">DoubleClick platform</a>
is an ad management platform for large sites with advertising teams.

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

Though Ad Exchange currently doesn’t offer a responsive ad tag,
developers can integrate with DoubleClick for Publishers and
then run Ad Exchange through the GPT API.

## Ad formatting

The best ads improve user experience.
While the actual ad content comes from advertisers,
you have control over the content type, color, and size of those ads.
Ad formatting best practices are described in detail in
[Optimize ad formatting]({{site.baseurl}}/monetization/ad-monetization/optimize_ads.html#optimize-ad-formatting).
Here's a quick summary of ad formatting options.

### Supported content types

To maximize the advertisers bidding for ad space,
we recommend allowing
[text](https://support.google.com/adsense/answer/185665?hl=en&ref_topic=29561)
and [display ads](https://support.google.com/adsense/answer/185666?hl=en&ref_topic=29561)
for each ad unit.

Sample text ad for mobile:

<img src="images/mobiletext_withoutcolor.png" class="center" alt="Sample mobile text ad">

Sample display ad for mobile:

<img src="images/mobileimage.png" class="center" alt="Sample mobile image ad">

### Ad styles

With Google Adsense,
you can create combinations of colors and fonts that compliment your site.
either using
<a href="https://support.google.com/adsense/answer/6002585">predefined ad styles<a/>
or by create your own combinations of colors and fonts
and applying these custom styles to ad units.

For example, add color to ad links so that users can better see the website
they will go to when they click on the ad:

<img src="images/mobiletext_withcolor.png" class="center" alt="Sample mobile text ad with links in color">

### Ad sizes

The simplest and most effective way to size your ads so that they respond
to a user's device is to
[create responsive ad units]({{site.baseurl}}/monetization/ad-monetization/include-ads.html#create-ad-units).

To make your code simpler and save you time and effort,
the responsive ad code automatically adapts the ad unit size to your page layout.
The code calculates the required size dynamically based on the width of the ad unit’s parent container,
then determines what's the best standard height to go with that width.

For example,
if you have a <div> with a width of 30% and you place responsive ad code within the <div>,
then depending on the width of the user's screen, the ad is automatically sized differently.
If your page is viewed on a tablet with a width of 1024px,
the code serves a 307x250 ad, and if it's viewed on a 21" desktop PC with a 1680px width,
the code serves a 504x60 ad.

TODO: Insert image here that shows the above example using web starter kit.

If the smart sizing isn't exactly what you want in your site,
you can change the ad unit code to specify sizing.
For example, 
you may want a vertical ad on desktop
to be horizontal on mobile
(see [Advanced features in this help topic](https://support.google.com/adsense/answer/3543893?hl=en&ref_topic=3641113)).

To choose the ad sizes best for your content,
see the
<a href="https://support.google.com/adsense/answer/6002621?hl=en&ref_topic=1307421">Google AdSense guide to ad sizes</a>.

## Ad placement

When it comes to deciding where to place ads on your site,
and how many ads to include,
always put the user first:

* Use ads to augment site content; not the other way around.
* Always follow the [Google AdSense program policies](https://support.google.com/adsense/answer/48182?hl=en()). Pages with excessive ads, ads that push the content down below the fold, ads clustered together that dominate the viewable space or ads without clear labeling against ad policies.
* Avoid adding too many units which distract users from content.
* Ensure ads provide value to users.  If you have ad units that generate significantly less revenue or drive less clicks or views, it’s likely they are not providing value to users.
* Maintain a balance between ads and content. Avoid adding too many units which distract users from content.

Here are some placement options for mobile ads (see also [sample code for ads placement]({{site.baseurl}}/monetization/ad-monetization/include-ads.html#include-ad-units-in-your-site)):

<img src="images/mobile_ads_placement.png" class="center" alt="Sample mobile image ad">

## Ad targeting

Users click on ads that are relevant to the content they are looking for;
understand how ads targeting works so that you can maximize your revenue.

{% endwrap %}
