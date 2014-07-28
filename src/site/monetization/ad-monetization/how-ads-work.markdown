---
layout: article
title: "How Ads Work"
description: "At a glance, you make ad spaces (also known as ad inventory) available on your site. Advertisers bid to show their ads on your site and the highest bid wins. You get paid when users click on the ads."
introduction: "At a glance, you make ad spaces (also known as ad inventory) available on your site. Advertisers bid to show their ads on your site and the highest bid wins. You get paid when users click on the ads. Read on to dive deeper into how ads work."
article:
  written_on: 2014-07-17
  updated_on: 2014-07-17
  order: 1
id: how-ads-work
collection: ad-monetization
key-takeaways:
  tldr: 
    - Choose the ads platform best suited to your site. We recommend the AdSense platform for most sites, and the DoubleClick platform for sites with their own advertising teams.
    - Ads work best when they integrate nicely in your site; their color, content, size, and location enhance user experience. 
    - Users click on ads that are relevant to the content they are looking for; understand how ads targeting works so that you can maximize your revenue.
notes:
  placement:
    - Understanding how ad targeting works can help you to maximize your revenue.
  targeting:
    - If you'd like to display ads related to specific topics, include complete sentences and paragraphs about these topics.
---

{% wrap content %}

This guide covers the basics of how ads work,
but to learn more, refer to the
<a href="https://support.google.com/adsense/answer/181947?hl=en">Google AdSense</a> and
<a href="https://support.google.com/dfp_sb/?utm_medium=et&utm_source=dfp_sb_support_tab&utm_campaign=dfp_sb#topic=13148">Google DoubleClick</a>
help centers.

<style type="text/css">
  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.tldr %}

## Choose the best ads platform for your site

We recommend the
[Google AdSense platform](https://support.google.com/adsense/answer/9712?hl=en&ref_topic=1319753&rd=1)
for most sites; it's free and available to all.
The [DoubleClick platform](http://www.google.com/doubleclick/publishers/solutions/">DoubleClick platform)
is best for sites with their own adversiting teams.

### AdSense

Google Adsense integrates with Google ads, targeting ads specific to your site content.
The platform also comes with these tools:

* <a href="https://support.google.com/adsense/answer/160374?hl=en&ref_topic=1307421">Customization tools</a> to change the look and feel of your ads.
* <a href="https://support.google.com/adsense/answer/2973289?hl=en&ref_topic=2717009">Performance tools</a> to monitor and optimize your ad performance.
* <a href="https://support.google.com/adsense/answer/2569265?hl=en&ref_topic=1727160">Payment tools</a> to manage ad payments.

The simplest way to use Google Adsense is to create
<a href="https://support.google.com/adsense/answer/3213689?hl=en">responsive ad units</a>.
When you use responsive ad units,
the ad code is intelligent enough to determine how big the parent container is
and dynamically change the ad size that's shown.
Learn more about how to use responsive ad units in
[Include Ads in Your Site]({{site.baseurl}}/monetization/ad-monetization/include_ads.html).

### DoubleClick

The DoubleClick platform helps publishers manage their ad inventory.
There's two tiers to the platform:
<a href="http://www.google.com/doubleclick/publishers/solutions/ad-serving.html">Double-click for Publishers (DFP)</a>
and <a href="http://www.google.com/doubleclick/publishers/solutions/yield-management.html">DoubleClick Ad Exchange</a>.
<a href="rms/publishergeneral/#utm_medium=et&utm_campaign=en&utm_source=ww-ww-et-nelson_doubleclick">Contact DoubleClick sales</a>
to get started with DFP or Ad Exchange.

#### DoubleClick for Publishers

DoubleClick for Publishers (DFP) is an ad management platform
that helps publishers sell, schedule, deliver,
and measure all of their ad inventory.
It allows publishers who have direct relationships with advertisers
to reserve their inventory but also the flexibility to integrate
with other auction-based services (like AdSense or Ad Exchange).

Similar to Google Adsense,
DFP lets you create responsive ad units using the
<a href="https://developers.google.com/doubleclick-gpt/reference?rd=1">Google Publisher Tag (GPT) API</a>,
an ad tagging library for DFP that can dynamically build ad requests.
GPT takes key details such as ad unit name, ad size, and custom targeting,
builds the request, and displays the ad on web pages.
See <a href="https://support.google.com/dfp_premium/answer/3423562?hl=en">Double-click's Building responsive ads</a>
to learn how to use this API.

If you’re a large site with a dedicated advertising sales team,
this is the product for you.

#### DoubleClick Ad Exchange

DoubleClick Ad Exchange is an invite only product
that provides publishers detailed and finely-tuned controls for advertising savvy organizations.

Though Ad Exchange currently doesn’t offer a responsive ad tag,
developers can integrate with DoubleClick for Publishers and
then run Ad Exchange through the GPT API.

## How ads look

You've seen ads and know what they look like.
But you may not yet be aware of how much of an ad's appearance is controlled
by the advertiser versus how much control you have over how ads look on your site.

How ads look depends ad size, ad placement, the type of ad content delivered,
and how ad content is styled.
The following table describes the attributes that control an ad's appearance
(learn more in
[Customize Your Ads]({{site.baseurl}}/monetization/ad-monetization/customize_ads.html)).

<table class="table-2">
  <thead>
    <tr>
      <th data-th="Attribute">Attribute</th>
      <th data-th="Example">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute">
        <strong>Placement:</strong><br> You have full control over where ads are placed on your site. Place ads where they are visible, but don't detract from the main user experience. Here are some common examples of where to place (and size) ads based on how the content is laid out on mobile (see also these <a href="https://support.google.com/adsense/answer/1282097?hl=en&ref_topic=1307438">best practices for ads placement</a>).
      </td>
      <td data-th="Example">
        <img src="images/mobile_ads_placment.png" srcset="images/mobile_ads_placement.png 1x, images/mobile_ads_placement.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Attribute">
        <strong>Size:</strong><br> You have full control over how ads are sized; however, we recommend using responsive ads. Responsive ads are automatically sized based on the user's device. If smart sizing doesn't match your needs, follow this <a href="https://support.google.com/adsense/answer/6002621?hl=en&ref_topic=1307421">guide to ad sizes</a>.
      </td>
      <td data-th="Example">
        <img src="images/ads_sample.png" srcset="images/ads_sample.png 1x, images/ads_sample.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Attribute">
        <strong>Content type:</strong><br> Some ads are text-only; many advertisers include images in their ads. Make sure to support text and display ads in your site so that you are attracting a wider range of advertisers.
      </td>
      <td data-th="Example">
        <img src="images/mobileimage.png" srcset="images/mobileimage.png 1x, images/mobileimage.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Attribute">
        <strong>Content style:</strong><br> You have full control over the color, font, and font-sizing for text ads. Choose styles that match or contrast the styles on your site. For example, you can change the color of URL text so that users see clearly where the link will take them.
      </td>
      <td data-th="Example">
        <img src="images/mobiletext_withcolor.png" srcset="images/mobiletext_withcolor.png 1x, images/mobiletext_withcolor.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Attribute">
        <strong>Actual content:</strong><br> Advertisers write their own ad content. Ad targeting determines which ads appear based on matching the ad content to your site's content and a user's common browsing behaviors. For example, house-hunting users may see real estate ads. The next section covers ads targeting in detail.
      </td>
      <td data-th="Example">
        <img src="images/ads_desktop.png" srcset="images/ads_desktop.png 1x, images/ads_desktop.png 2x">        
      </td>
    </tr>
  </tbody>
</table>

## How ads are targeted

Google AdSense automatically targets ads most relevant
to the content user's are looking for when they go to your site
using the following markers
(see also the [ads targeting help](https://support.google.com/adsense/answer/9713?hl=en&ref_topic=1628432)):

* Content and language: users will see ads that match your site's content and language.
* Placement: advertisers can target sites that have ad units placed where they want their ads to appear, and matched to the size they want their ads to be displayed in on targeted devices.
* User's interest: your website and advertisers can target specific user groups, for example, sports enthusiasts.

Ads are targeted based on overall site content, not keywords or categories.

{% include modules/remember.liquid title="Important" list=page.notes.targeting %}

## How the ad auction works

The ad auction determines which ads will appear on your pages
and how much you'll earn from those ads
([see also the ad auction help](https://support.google.com/adsense/answer/160525?hl=en&ref_topic=1628432)).

Google places relevant
[cost-per-click (CPC)](https://support.google.com/adsense/answer/32725)
and [cost-per-thousand-impressions (CPM)](https://support.google.com/adsense/answer/18196)
ads in the same auction, lets them compete against one another, and
automatically picks the advertisers who are willing to pay the most.

{% endwrap %}
