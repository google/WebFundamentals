---
layout: article
title: "Include AdSense Ads on Your Site"
description: "Follow the steps in this guide to learn how to include ads in your site. Create an AdSense application, create ad units and place them in your site, and get paid."
introduction: "Follow the steps in this guide to learn how to include ads in your site. Create an AdSense application, create ad units and place them in your site, and get paid."
article:
  written_on: 2014-07-17
  updated_on: 2014-07-17
  order: 2
id: include-ads
collection: ad-monetization
key-takeaways:
  tldr: 
    - To submit a Google AdSense application, you must be 18, have a Google Account, and address. If you don't already have one, create an AdSense account.
    - Your website must be live before submitting an application, and the website content must comply with Adsense policies.
    - Create responsive ad units to ensure that your ads fit, no matter what device a user views them on.
    - Verify payment settings and wait for the money to start rolling in.
notes:
  crawler:
    - Make sure you're not blocking the AdSense crawler from accessing your site (see <a href="https://support.google.com/adsense/answer/10532?hl=en">this help topic</a>). 
  body:
    - Paste all ad code within the body tag; otherwise the ads won't work.
  smarttag:
    - The data-ad-format=auto tag in the generated ad code enables the smart sizing behavior for the responsive ad unit.
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

In this walk-through,
you'll build a simple page that includes responsive ads
using Google AdSense and the Web Starter Kit:

<img src="images/ads_sample.png" class="center" alt="Sample website with ads on desktop and mobile">

If you're unfamiliar with the Web Start Kit,
refer to the
[Set Up Web Starter Kit]({{site.baseurl}}/tools/setup/setup_kit.html) documentation.

In order to include ads in your site and get paid,
you'll need to follow these simple steps:

1. Create an AdSense account.
2. Create ad units.
3. Place ad units on a page.
4. Configure payment settings.

## Create an AdSense account

In order to serve ads on your site, you need to create AdSense account,
and agree to their terms of service.
You'll need to verify:

* You are at least 18 years old and have a verified Google Account.
* You own a live website or other online content that complies with
[Google AdSense program policies](https://support.google.com/adsense/answer/48182);
ads are hosted on this site.
* You have a postal address and a mailing address associated with your bank account
so you can receive payments.

If you don't already have an account, you can create one at 
[Google AdSense site](www.google.com/adsense).
Use this same site to manage your ads once your application's been approved.

## Create ad units

You have three options for sizing your ad units:

* Use specific ad sizes recommended by Google AdSense (see also the [Guide to ad sizes](https://support.google.com/adsense/answer/6002621?hl=en&ref_topic=1307421)).
* Create [custom-sized ad units](https://support.google.com/adsense/answer/3289364?hl=en&ref_topic=3640746).
* Create [responsive ad units](https://support.google.com/adsense/answer/3213689?hl=en&ref_topic=3641113).

You are building a responsive site; use respoonsive ad units.
Responsive ad units allow you to control the size of the ads on your page,
in line with how you control the layout of the rest of your page across devices.
Ads automatically resize based on the width of the device's parent container.

If you don't use responsive ad units,
you will have to write a lot more code to control
how ads appear based on a user's device,
and there's no need to write extra code.
Even if you must specify the exact size of your ad units,
use responsive ad units in [advanced mode]({{site.baseurl}}/monetization/ad-monetization/customize-ads.html#what-if-responsive-sizing-isnt-enough).

To create a responsive ad unit
(see also [Create an ad unit](https://support.google.com/adsense/answer/6002575?rd=1()) and
[Create a responsive ad unit](https://support.google.com/adsense/answer/3543893?hl=en&ref_topic=3641113)):

1. Visit the [My ads tab](https://www.google.com/adsense/app#myads-springboard).
2. Click <strong>+New ad unit</strong>.
3. Give your ad unit a unique name. This name appears in the ad code that's pasted into your site,
so be descriptive.
4. Select <strong>Responsive</strong> from the Ad size drop-down.
5. Select <strong>Text & display ads</strong> from the Ad type drop-down.
6. Click <strong>Save and get code</strong>.
7. In the <strong>Ad code</strong> box that appears,
select the <strong>Smart sizing (recommended)</strong> option from the Mode drop-down. This is the recommended mode and doesn’t require you to make any changes to your ad code.

After creating your ad unit,
AdSense provide a snippet of code to include on your site,
similar to the code below:

{% include_code _code/ad.html adunit html%}

{% include modules/remember.liquid title="Note" list=page.notes.smarttag %}

## Include ad units in your site

Paste the snippet provided by AdSense into your markup
to include the ad unit on your page.
To include multiple ads,
either re-use the same ad unit or create multiple ad units.

{% include modules/remember.liquid title="Remember" list=page.notes.body %}

In the Web Starter Kit sample,
we created two responsive units:

1. Open the `index.html` in the `app` folder.
2. Include both ad units in the `main` tag:

{% include_code _code/index.html main html%}

{% include modules/remember.liquid title="Important" list=page.notes.crawler %}

## Configure payment settings

You must complete all the steps below before you can receive your first payment
(see also the [Intro to AdSense payments](https://support.google.com/adsense/answer/1709858?hl=en&ref_topic=1727160)):

1. Go to your [payee profile](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE) and select <strong>Submit tax information</strong>. Follow the guided steps to submit the appropriate tax forms and requirements. 
2. Confirm the payee name and address. If you need to correct any information, follow [these instructions](https://support.google.com/adsense/answer/2498454?ctx=billing&rd=1).
3. Select your form of payment on the [Payment settings page](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Enter your [personal identification number (PIN)](https://support.google.com/adsense/answer/157667), once you receive it. This PIN verifies the accuracy of your account information.
5. If your current balance reaches the [payment threshold](https://support.google.com/adsense/answer/1709871#p) by the end of themonth, a 21-day payment processing period begins. After the processing period ends, you will receive a payment. 

{% endwrap %}
