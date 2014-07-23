---
layout: article
title: "Customize Your Ads"
description: "The best ads improve user experience; format ads so they don't look out of place on your site. While the actual ad content comes from advertisers, you have control over the content type, color, size, and placement of those ads."
introduction: "The best ads improve user experience; format ads so they don't look out of place on your site. While the actual ad content comes from advertisers, you have control over the content type, color, size, and placement of those ads."
article:
  written_on: 2014-07-17
  updated_on: 2014-07-17
  order: 3
id: customize-ads
collection: ad-monetization
key-takeaways:
  tldr:
    - Style your ads so they don't look out of place on your site; 
    - Resize ads in response to the user's device.
    - Never place ads where they might interfere with a user's intended experience on your site.
notes:
  targeting:
    - Ads are targeted based on overall site content, not keywords or categories. If you'd like to display ads related to specific topics, include complete sentences and paragraphs about these topics.
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

## Allow text and images in your ads

To maximize the advertisers bidding for ad space,
allow [text](https://support.google.com/adsense/answer/185665?hl=en&ref_topic=29561)
and [display ads](https://support.google.com/adsense/answer/185666?hl=en&ref_topic=29561)
for each ad unit.

Sample text ad for mobile:

<img src="images/mobiletext_withoutcolor.png" class="center" alt="Sample mobile text ad">

Sample display ad for mobile:

<img src="images/mobileimage.png" class="center" alt="Sample mobile image ad">

## Style ads to compliment your site

With Google Adsense,
you can create combinations of colors and fonts that compliment your site.
either using
<a href="https://support.google.com/adsense/answer/6002585">predefined ad styles<a/>
or by create your own combinations of colors and fonts
and applying these custom styles to ad units.

For example, add color to ad links so that users can better see the website
they will go to when they click on the ad:

<img src="images/mobiletext_withcolor.png" class="center" alt="Sample mobile text ad with links in color">

## Size ads in relation to the user's device

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

## What if responsive sizing isn't enough?

If the smart sizing isn't exactly what you want in your site,
you can change the ad unit code to specify sizing.
For example, 
you may want a vertical ad on desktop
to be horizontal on mobile
(see [Advanced features in this help topic](https://support.google.com/adsense/answer/3543893?hl=en&ref_topic=3641113)).

To choose the ad sizes best for your content,
see the
<a href="https://support.google.com/adsense/answer/6002621?hl=en&ref_topic=1307421">Google AdSense guide to ad sizes</a>.

## Place ads where users benefit the most

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

See also these [best practices for ads placement](https://support.google.com/adsense/answer/1282097?ref_topic=3001646&rd=1).

{% endwrap %}
