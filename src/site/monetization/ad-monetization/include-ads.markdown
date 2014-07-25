---
layout: article
title: "Include Ads in Your Site"
description: "Follow the steps in this guide to learn how to include ads in your site. Submit an application, create ad units and place them in your site, and get paid."
introduction: "Follow the steps in this guide to learn how to include ads in your site. Submit an application, create ad units and place them in your site, and get paid."
article:
  written_on: 2014-07-17
  updated_on: 2014-07-17
  order: 2
id: include-ads
collection: ad-monetization
key-takeaways:
  tldr: 
    - To submit a Google AdSense application, you must be 18, have a Google Account, and address.
    - Your website must be live before submitting an application, and the website content must comply with Adsense policies.
    - Make sure your ads match the user's device; create responsive ad units.
    - Configure your payment settings so that you are eligible to receive payments.
    - You will only receive payments once your account reaches the payment threshold.
notes:
  multipleunits:
    - To include more than one ad on a page in your site, create responsive ad units for each ad.
  body:
    - Paste all ad code within the body tag; otherwise the ads won't work.
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
If you've never used the web starter kit,
follow [these instructions]({{site.baseurl}}/tools/setup/setup_kit.html)
to get set up.

Here's how the ads look on mobile and desktop:

<img src="images/ads_sample.png" class="center" alt="Sample website with ads on desktop and mobile">

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
(see also [Create an ad unit](https://support.google.com/adsense/answer/6002575?rd=1()) and
[Create a responsive ad unit](https://support.google.com/adsense/answer/3543893?hl=en&ref_topic=3641113):

1. Visit the [My ads tab](https://www.google.com/adsense/app#myads-springboard).
2. Click <strong>+New ad unit</strong>.
3. Give your ad unit a unique name. This name appears in the ad code that's pasted into your site,
so be descriptive.
4. Select <strong>Responsive</strong> from the Ad size drop-down.
5. Select <strong>Text & display ads</strong> from the Ad type drop-down.
6. Click <strong>Save and get code</strong>.
7. In the <strong>Ad code</strong> box that appears,
select the <strong>Smart sizing (recommended)</strong> option from the Mode drop-down. This is the recommended mode and doesn’t require you to make any changes to your ad code.

The `data-ad-format=auto` tag in the generated ad code enables
the smart sizing behavior for the responsive ad unit.
Past the generated code into your site:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-5163983549070020"
     data-ad-slot="1452382795"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include modules/remember.liquid title="Important" list=page.notes.multipleunits %}

## Include ad units in your site

Copy and paste the ad code into the HTML source code of your page
where you'd like the ad to appear,
keeping in mind that it will dynamically inherit the size
of the parent container.

{% include modules/remember.liquid title="Remember" list=page.notes.body %}

In the web starter kit sample:

1. Open the `index.html` in the `app` folder.
2. Include both ad units in the `main` tag:

{% highlight html %}
<main>
  <div>
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<!-- Top ad in web starter kit sample -->
	<ins class="adsbygoogle"
	     style="display:block"
	     data-ad-client="ca-pub-5163983549070020"
	     data-ad-slot="1452382795"
	     data-ad-format="auto"></ins>
	<script>
	(adsbygoogle = window.adsbygoogle || []).push({});
	</script>
  </div>
  <h1 id="hello">Hello!</h1>
  <p>Welcome to Web Starter Kit.</p>
  <h2 id="get-started">Get Started.</h2>
  <p>Read how to <a href="http://developers.google.com/web/starter-kit">Get Started</a> or check out the <a href="styleguide/index.html">Style Guide</a>.
  </p>
  <div>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- Bottom ad in web starter kit sample -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-5163983549070020"
         data-ad-slot="1901537998"
         data-ad-format="auto"></ins>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
</main>
{% endhighlight %}

There are several options for customizing the way your ads look so that they are more inline with your site design (see [Customize Your Ads]({{site.baseurl}}/monetization/ad-monetization/customize-ads.html)).

## Give access to the crawler

The Google AdSense crawler must be able index your site's content.
Make sure your `robot.txt` doesn't exclude `User-agent: Mediaparners-Google`
(see also [this help topic](https://support.google.com/adsense/answer/10532?hl=en)).

By default, `robot.txt` in the web starter kit allows all crawlers
access to the site's content:

{% highlight html %}
# Allow crawling of all content
User-agent: *
Disallow:
{% endhighlight %}

## Configure payment settings

You must complete all the steps below before you can receive your first payment
(see also the [Intro to AdSense payments](https://support.google.com/adsense/answer/1709858?hl=en&ref_topic=1727160)):

1. Go to your [payee profile](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE) and select <strong>Submit tax information</strong>. Follow the guided steps to submit the appropriate tax forms and requirements. 
2. Confirm the payee name and address. If you need to correct any information, follow [these instructions](https://support.google.com/adsense/answer/2498454?ctx=billing&rd=1).
3. Select your form of payment on the [Payment settings page](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Enter your [personal identification number (PIN)](https://support.google.com/adsense/answer/157667), once you receive it. This PIN verifies the accuracy of your account information.
5. If your current balance reaches the [payment threshold](https://support.google.com/adsense/answer/1709871#p) by the end of themonth, a 21-day payment processing period begins. After the processing period ends, you will receive a payment. 

{% endwrap %}