---
layout: shared/narrow
title: "Include AdSense ads on your site"
description: "Follow the steps in this guide to learn how to include ads in your site. Create an AdSense account, create ad units, place the units in your site, configure payment settings, and get paid."
published_on: 2014-07-31
updated_on: 2014-07-31
order: 2
translation_priority: 0
authors:
  - megginkearney
  - petelepage
key-takeaways:
  tldr: 
    - "To create an AdSense account, you must be 18, have a Google Account, and address."
    - "Your website must be live before submitting an application, and the website content must comply with AdSense policies."
    - "Create responsive ad units to ensure that your ads fit, no matter what device a user views them on."
    - "Verify payment settings and wait for the money to start rolling in."
notes:
  crawler:
    - "Make sure you're not blocking the AdSense crawler from accessing your site (see <a href='https://support.google.com/adsense/answer/10532'>this help topic</a>)." 
  body:
    - "Paste all ad code within the body tag; otherwise the ads won't work."
  smarttag:
    - "The <code>data-ad-client</code> and <code>data-ad-slot</code> will be unique for each ad you generate."
    - "The <code>data-ad-format=auto</code> tag in the generated ad code enables the smart sizing behavior for the responsive ad unit."
---

<p class="intro">
  Follow the steps in this guide to learn how to include ads in your site. Create an AdSense account, create ad units, place the units in your site, configure payment settings, and get paid.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Build sample page with ads

In this walk-through, you'll build a simple page that includes responsive ads
using Google AdSense and the Web Starter Kit:

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="Sample website with ads on desktop and mobile">

If you're unfamiliar with the Web Start Kit, refer to the
[Set Up Web Starter Kit](/web/fundamentals/getting-started/web-starter-kit/setting-up) documentation.

In order to include ads in your site and get paid, you'll need to follow these simple steps:

1. Create an AdSense account.
2. Create ad units.
3. Place ad units on a page.
4. Configure payment settings.

## Create an AdSense account
In order to serve ads on your site, you'll need an active AdSense account. If
you don't already have one, you'll need to [create one](https://www.google.com/adsense/) and agree to the
AdSense terms of service.  When you create your account, you'll need to verify:

* You are at least 18 years old and have a verified Google Account.
* You own a live website or other online content that complies with
[Google AdSense program policies](https://support.google.com/adsense/answer/48182);
ads are hosted on this site.
* You have a postal address and a mailing address associated with your bank account
so you can receive payments.

## Create ad units

An ad unit is a set of ads that are displayed on your page as a result of 
JavaScript you add to your page.  You have three options for sizing your ad
units:

* **[Responsive (Recommended)](https://support.google.com/adsense/answer/3213689)**. 
* [Pre-defined](https://support.google.com/adsense/answer/6002621).
* [Custom-sized](https://support.google.com/adsense/answer/3289364).

You are building a responsive site; use responsive ad units.
Responsive ads automatically resize based on the size of the device
and the width of the parent container.
Responsive ads work in line with your responsive layout,
ensuring your site looks great on any device.

If you don't use responsive ad units, you will have to write a lot more code 
to control how ads appear based on a user's device. Even if you must specify 
the exact size of your ad units, use responsive ad units in 
[advanced mode](/web/fundamentals/discovery-and-monetization/monetization-with-ads/customize-ads#what-if-responsive-sizing-isnt-enough).

To make your code simpler and save you time and effort,
the responsive ad code automatically adapts the ad unit size to your page layout.
The code calculates the required size dynamically based on the width of the ad unit’s parent container,
then picks the best-performing ad size that fits in the container.
For example, a mobile-optimized site with a width of 360px might show a 320x50 ad unit.

Track the current
[top performing ad sizes](https://support.google.com/adsense/answer/6002621#top)
in the Google AdSense
[Guide to ad sizes](https://support.google.com/adsense/answer/6002621#top).

### To create a responsive ad unit

1. Visit the [My ads tab](https://www.google.com/adsense/app#myads-springboard).
2. Click <strong>+New ad unit</strong>.
3. Give your ad unit a unique name. This name appears in the ad code that's
pasted into your site, so be descriptive.
4. Select <strong>Responsive</strong> from the Ad size drop-down.
5. Select <strong>Text & display ads</strong> from the Ad type drop-down.
6. Click <strong>Save and get code</strong>.
7. In the <strong>Ad code</strong> box that appears, select the 
<strong>Smart sizing (recommended)</strong> option from the Mode drop-down. 
This is the recommended mode and doesn’t require you to make any changes to
your ad code.

After creating your ad unit, AdSense provide a snippet of code to include 
on your site, similar to the code below:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Include ad units in your site

To include the ad on the page, we need to paste the provided AdSense snippet
into our markup.  If you want to include multiple ads, you can either 
re-use the same ad unit, or create multiple ad units.

1. Open the `index.html` in the `app` folder.
2. Paste the provided snippet into the `main` tag.
3. Save the file and try viewing it in your browser, then try opening it on a 
mobile device or via the Chrome emulator.

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="Sample website with ads on desktop and mobile">
    <br>
    Try it
  </a>
</div>

## Configure payment settings

Wondering when your AdSense payment will arrive? Trying to figure out whether
you'll be paid this month or next month? Be sure you've completed all of
the steps below:

1. Verify you've provided any required tax information in the [payee profile](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE). 
2. Confirm your payee name and address are correct.
3. Select your form of payment on the [Payment settings page](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Enter your [personal identification number (PIN)](https://support.google.com/adsense/answer/157667). This PIN verifies the accuracy of your account information.
5. Check to see if your balance reaches the [payment threshold](https://support.google.com/adsense/answer/1709871). 

Refer to [Intro to AdSense payments](https://support.google.com/adsense/answer/1709858)
for any additional questions.

